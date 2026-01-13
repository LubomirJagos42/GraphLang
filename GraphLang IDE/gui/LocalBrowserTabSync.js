/**
 *  @author LuboJ
 *  @description This was proposed by Claude AI as way how to do local synchronization of javascript variables between different tabs from
 *  same origin (localhost server)
 */

class LocalBrowserTabSync{
    constructor() {
        this.projectId = GraphLang.Utils.getCurrentProjectId();
        this.stateName = "graphlang_projectId_" + this.projectId + "_state";
        let broadcastChannelName = 'graphlang_sync_project_' + this.projectId;
        this.bc = new BroadcastChannel(broadcastChannelName);
        this.state = {
            project: this.projectId,
            broadcastChannelName: broadcastChannelName,
            schematics: {},     //this stores raw node javasript code as string
            schematicsHex: {},  //this is auxiliar node JS code encoded in HEX because not sure if there is some escaping of special characters done during message broadcast or so
            variables: {}
        };

        this.init();
    }

    init() {
        // Load from localStorage
        this.loadState();

        // Listen for changes from other tabs
        this.bc.onmessage = (event) => this.handleMessage(event.data);

        // Listen for localStorage changes (fallback)
        window.addEventListener('storage', (e) => this.handleStorageChange(e));

        // Periodic sync (backup)
        setInterval(() => this.syncWithStorage(), 5000);
    }

    loadState() {
        try {
            const stored = localStorage.getItem(this.stateName);
            if (stored) {
                this.state = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    }

    saveState() {
        try {
            localStorage.setItem(this.stateName, JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save state:', e);
        }
    }

    handleMessage(message) {
        const { type, data } = message;

        switch (type) {
            case 'UPDATE_SCHEMATIC':
                this.state.schematics[data.id] = data.content;
                this.state.schematicsHex[data.id] = data.contentHex;
                this.trigger('schematicUpdated', data);
                break;

            case 'UPDATE_VARIABLE':
                this.state.variables[data.name] = data.value;
                this.trigger('variableUpdated', data);
                break;

            case 'LOAD_PROJECT':
                this.state.project = data;
                this.trigger('projectLoaded', data);
                break;
        }

        this.saveState();
    }

    handleStorageChange(e) {
        if (e.key === this.stateName && e.newValue) {
            this.state = JSON.parse(e.newValue);
            this.trigger('stateChanged', this.state);
        }
    }

    syncWithStorage() {
        const stored = localStorage.getItem(this.stateName);
        if (stored) {
            const storedState = JSON.parse(stored);
            if (JSON.stringify(storedState) !== JSON.stringify(this.state)) {
                this.state = storedState;
                this.trigger('stateSynced', this.state);
            }
        }
    }

    // Public API
    updateSchematic(id, content) {
        let contentHex = GraphLang.Utils.toHex(content);

        this.state.schematics[id] = content;
        this.state.schematicsHex[id] = contentHex;
        this.saveState();
        this.bc.postMessage({
            type: 'UPDATE_SCHEMATIC',
            data: { id, content, contentHex }
        });
    }

    updateVariable(name, value) {
        this.state.variables[name] = value;
        this.saveState();
        this.bc.postMessage({
            type: 'UPDATE_VARIABLE',
            data: { name, value }
        });
    }

    loadProject(projectData) {
        this.state.project = projectData;
        this.saveState();
        this.bc.postMessage({
            type: 'LOAD_PROJECT',
            data: projectData
        });
    }

    getSchematic(id) {
        return this.state.schematics[id];
    }

    getVariable(name) {
        return this.state.variables[name];
    }

    getProject() {
        return this.state.project;
    }

    // Event system
    listeners = {};

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    trigger(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }
}

/********************************************************************************************************************
 *  Heartbeat checking tabs and clear local storage
 *  Each tab sends heartbeat every 2 seconds
 ********************************************************************************************************************/
const TAB_ID = Math.random().toString(36);
const HEARTBEAT_INTERVAL = 2000;
const TIMEOUT = 5000;

// Send heartbeat
setInterval(() => {
    const tabs = JSON.parse(localStorage.getItem('activeTabs') || '{}');
    tabs[TAB_ID] = Date.now();
    localStorage.setItem('activeTabs', JSON.stringify(tabs));
}, HEARTBEAT_INTERVAL);

// Check for dead tabs
setInterval(() => {
    const tabs = JSON.parse(localStorage.getItem('activeTabs') || '{}');
    const now = Date.now();

    // Remove dead tabs
    Object.keys(tabs).forEach(id => {
        if (now - tabs[id] > TIMEOUT) {
            delete tabs[id];
        }
    });

    // If no tabs left, clear data
    if (Object.keys(tabs).length === 0) {
        localStorage.clear();
    } else {
        localStorage.setItem('activeTabs', JSON.stringify(tabs));
    }
}, HEARTBEAT_INTERVAL);

// Cleanup on unload
window.addEventListener('beforeunload', () => {
    const tabs = JSON.parse(localStorage.getItem('activeTabs') || '{}');
    delete tabs[TAB_ID];

    if (Object.keys(tabs).length === 0) {
        localStorage.clear();
    } else {
        localStorage.setItem('activeTabs', JSON.stringify(tabs));
    }
});


/********************************************************************************************************************
 *  Setting action on broadcast message
 ********************************************************************************************************************/

/*
 *  TODO: Uncomment things below to make this working and verify that it's working!
 */

try {
    // Usage
    GraphLang.Utils.Sync = new LocalBrowserTabSync();

    // Listen for updates
    GraphLang.Utils.Sync.on('schematicUpdated', (data) => {
        console.log('Schematic updated:', data.id);
        eval(data.content);
    });

    GraphLang.Utils.Sync.on('variableUpdated', (data) => {
        console.log('Variable updated:', data);
        // updateVariableDisplay(data.name, data.value);
        // alert("sync variableUpdated");
    });

    GraphLang.Utils.Sync.on('projectLoaded', (data) => {
        console.log('Project loaded:', data);
        // initializeProject(data);
        // alert("sync projectLoaded");
    });

    // Update from this tab
    // GraphLang.Utils.Sync.updateSchematic('schematic1', {nodes: [...], edges: [...]});
    // GraphLang.Utils.Sync.updateVariable('counter', 42);
    // GraphLang.Utils.Sync.loadProject({name: 'MyProject', version: '1.0'});

    // Read data
    // const schematic = GraphLang.Utils.Sync.getSchematic('schematic1');
    // const counter = GraphLang.Utils.Sync.getVariable('counter');
    // const project = GraphLang.Utils.Sync.getProject();
}catch(e){
    console.error(e);
}