/**
 *  @author LuboJ
 *  @description This was proposed by Claude AI as way how to do local synchronization of javascript variables between different tabs from
 *  same origin (localhost server)
 */

class LocalBrowserTabSync{
    constructor() {
        this.bc = new BroadcastChannel('graphlang_sync');
        this.state = {
            project: null,
            schematics: {},
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
            const stored = localStorage.getItem('graphlang_state');
            if (stored) {
                this.state = JSON.parse(stored);
            }
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    }

    saveState() {
        try {
            localStorage.setItem('graphlang_state', JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save state:', e);
        }
    }

    handleMessage(message) {
        const { type, data } = message;

        switch (type) {
            case 'UPDATE_SCHEMATIC':
                this.state.schematics[data.id] = data.content;
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
        if (e.key === 'graphlang_state' && e.newValue) {
            this.state = JSON.parse(e.newValue);
            this.trigger('stateChanged', this.state);
        }
    }

    syncWithStorage() {
        const stored = localStorage.getItem('graphlang_state');
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
        this.state.schematics[id] = content;
        this.saveState();
        this.bc.postMessage({
            type: 'UPDATE_SCHEMATIC',
            data: { id, content }
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

/*
 *  TODO: Uncomment things below to make this working and verify that it's working!
 */

// // Usage
// const sync = new LocalBrowserTabSync();
//
// // Listen for updates
// sync.on('schematicUpdated', (data) => {
//     console.log('Schematic updated:', data);
//     renderSchematic(data.id);
// });
//
// sync.on('variableUpdated', (data) => {
//     console.log('Variable updated:', data);
//     updateVariableDisplay(data.name, data.value);
// });
//
// sync.on('projectLoaded', (data) => {
//     console.log('Project loaded:', data);
//     initializeProject(data);
// });
//
// // Update from this tab
// sync.updateSchematic('schematic1', { nodes: [...], edges: [...] });
// sync.updateVariable('counter', 42);
// sync.loadProject({ name: 'MyProject', version: '1.0' });
//
// // Read data
// const schematic = sync.getSchematic('schematic1');
// const counter = sync.getVariable('counter');
// const project = sync.getProject();
