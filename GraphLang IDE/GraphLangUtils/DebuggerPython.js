/*******************************************************************************
 *  DebuggerPython.js by LuboJ
 *
 *  Python version of C++ debugger (Debugger.js). Browser communicates over websocket with python layer
 *  python_tools/DebuggerPythonInterface.py, which runs generated python script (main.py in project temp dir)
 *  under bdb debugger:
 *
 *      browser (GraphLang.Debugger.Python) <--websocket 8889--> DebuggerPythonInterface.py <--TCP--> main.py (bdb)
 *
 *  Python layer accepts gdb like commands (file, b, start, c, next, step, p, kill, ...) and answers with JSON list
 *  of records in same format as pygdbmi does, so responses look same as from C++ debugger.
 *  Breakpoint and watch lists are taken from python translator GraphLang.Utils.TranslateToPythonCodeObj.
 *  Highlighting of objects on canvas reuses GraphLang.Debugger.Cpp animation helpers.
 */

/**
 * @namespace GraphLang.Debugger.Python
 * @description Python debugger, creates websocket to communicate with python layer DebuggerPythonInterface.py which runs
 * generated python code under debugger, can step through code, stop on breakpoints and read wire values.
 */
GraphLang.Debugger.Python = {};

/**
 * Browser websocket object connected to python debugger layer
 * @memberOf GraphLang.Debugger.Python
 * @var {WebSocket|null}
 */
GraphLang.Debugger.Python.websocket = null;

/**
 * Websocket port of python debugger layer (C++ debugger uses 8888)
 * @memberOf GraphLang.Debugger.Python
 * @var {number}
 */
GraphLang.Debugger.Python.websocketPort = 8889;

/**
 * True while some debugger command is waiting for answer, prevents mixing of responses
 * @memberOf GraphLang.Debugger.Python
 * @var {boolean}
 */
GraphLang.Debugger.Python.busy = false;

/**
 * Map of python layer breakpoint number -> line requested by GraphLang (line from python breakpoint list),
 * python layer can move breakpoint to next code line (ie. from comment line).
 * @memberOf GraphLang.Debugger.Python
 * @var {Object}
 */
GraphLang.Debugger.Python.breakpointNumberToLine = {};

/**
 * Last stopped payload received from python layer, null when program is not stopped
 * @memberOf GraphLang.Debugger.Python
 * @var {Object|null}
 */
GraphLang.Debugger.Python.lastStopped = null;

/**
 * @memberOf GraphLang.Debugger.Python
 * @param {string} msg - html message
 * @param {string} bgColor - background color
 * @description Write message on top of debugger output (#generatedContent).
 */
GraphLang.Debugger.Python.log = function(msg, bgColor = "#fff3c4"){
    let outputElement = document.querySelector('#generatedContent');
    if (outputElement) outputElement.insertAdjacentHTML('afterbegin', `<span style="background-color: ${bgColor}"><b>python debugger:</b> ${msg}</span><br/><hr/>\n`);
    console.log(`python debugger: ${msg}`);
}

/**
 * @memberOf GraphLang.Debugger.Python
 * @param {string} text
 * @return {string} text with escaped html characters
 */
GraphLang.Debugger.Python.escapeHtml = function(text){
    return String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/**
 * @memberOf GraphLang.Debugger.Python
 * @param {string} responseStr - raw string received from python layer
 * @return {Array} list of records, empty array if response is not JSON list
 */
GraphLang.Debugger.Python.parseResponse = function(responseStr){
    try {
        let parsed = JSON.parse(responseStr);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

/**
 * @memberOf GraphLang.Debugger.Python
 * @param {string} responseStr - raw response from python layer
 * @description Display response in debugger output, records are colored by type like C++ debugger output, program output is shown as is.
 */
GraphLang.Debugger.Python.logResponse = function(responseStr){
    let outputElement = document.querySelector('#generatedContent');
    if (!outputElement) return;

    let records = GraphLang.Debugger.Python.parseResponse(responseStr);
    if (records.length === 0){
        outputElement.insertAdjacentHTML('afterbegin', `<pre>${GraphLang.Debugger.Python.escapeHtml(responseStr)}</pre><hr/>`);
        return;
    }

    const COLORS = {console: "#b8d2ff", notify: "#ffcca9", result: "#bbfff4", output: "#e8e8e8"};
    let html = "";
    for (let record of records){
        let color = COLORS[record.type] || "#ffffff";
        if (record.type === "output" || record.type === "console"){
            let prefix = record.type === "output" ? "program output:\n" : "";
            html += `<pre style="background-color: ${color}; margin: 0">${prefix}${GraphLang.Debugger.Python.escapeHtml(record.payload)}</pre>`;
        }else{
            let message = record.message !== null ? `message: ${GraphLang.Debugger.Python.escapeHtml(JSON.stringify(record.message))}<br/>` : "";
            html += `<span style="background-color: ${color}">${message}${GraphLang.Debugger.Python.escapeHtml(JSON.stringify(record.payload, undefined, 2))}</span><br/>`;
        }
    }
    outputElement.insertAdjacentHTML('afterbegin', html + "<hr/>");
}

/**
 * @memberOf GraphLang.Debugger.Python
 * @return {boolean} true if websocket to python layer is opened
 */
GraphLang.Debugger.Python.isConnected = function(){
    return GraphLang.Debugger.Python.websocket !== null && GraphLang.Debugger.Python.websocket.readyState === WebSocket.OPEN;
}

/**
 * @memberOf GraphLang.Debugger.Python
 * @param {Object} options - optional handlers {onopen, onerror, onclose}
 * @description Create websocket to python debugger layer.
 */
GraphLang.Debugger.Python.createWebSocket = function(options = null){
    let websocketHost = window.location.hostname ? window.location.hostname : "localhost";
    let websocket = new WebSocket(`ws://${websocketHost}:${GraphLang.Debugger.Python.websocketPort}`);
    GraphLang.Debugger.Python.websocket = websocket;

    websocket.onopen = options && options.onopen ? options.onopen : () => GraphLang.Debugger.Python.log("CONNECTION ESTABLISHED");
    websocket.onerror = options && options.onerror ? options.onerror : () => GraphLang.Debugger.Python.log("CONNECTION ERROR");
    websocket.onclose = options && options.onclose ? options.onclose : () => GraphLang.Debugger.Python.log("CONNECTION CLOSED");
    websocket.onmessage = (event) => GraphLang.Debugger.Python.logResponse(event.data);
    return websocket;
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @param {number} maxAttempts - how many times try to connect
 * @param {number} delayMs - delay between attempts in milliseconds
 * @returns {Promise<WebSocket>}
 * @description Connect to python debugger layer, retry when it is not listening yet (PHP returns before python starts).
 */
GraphLang.Debugger.Python.connectWebSocketWithRetry = function(maxAttempts = 20, delayMs = 500){
    return new Promise((resolve, reject) => {
        let attempt = 0;
        let tryConnect = () => {
            attempt++;
            let opened = false;
            GraphLang.Debugger.Python.createWebSocket({
                onopen: () => {
                    opened = true;
                    GraphLang.Debugger.Python.log(`CONNECTION ESTABLISHED (attempt ${attempt})`);
                    resolve(GraphLang.Debugger.Python.websocket);
                },
                onerror: () => console.log(`python debugger websocket connect attempt ${attempt} failed`),
                onclose: () => {
                    if (opened){
                        GraphLang.Debugger.Python.log("CONNECTION CLOSED");
                        return;
                    }
                    if (attempt < maxAttempts) setTimeout(tryConnect, delayMs);
                    else reject(`cannot connect to python debugger layer websocket after ${attempt} attempts`);
                },
            });
        };
        tryConnect();
    });
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @param {string} message - command for python layer, if null value from #cmdStr input is used
 * @param {number} timeoutMs - max time to wait for answer
 * @return {Promise<string>} raw answer from python layer
 * @description Send command to python layer, log it and its answer into debugger output.
 */
GraphLang.Debugger.Python.sendMessageAndAddToLog = function(message = null, timeoutMs = 60000){
    return new Promise((resolve, reject) => {
        if (message === null){
            let inputElement = document.querySelector('#cmdStr');
            message = inputElement ? inputElement.value : "";
        }
        if (!GraphLang.Debugger.Python.isConnected()){
            GraphLang.Debugger.Python.log("websocket not opened, can't send message, click on debug python code first");
            reject("python debugger websocket not opened");
            return;
        }

        let websocket = GraphLang.Debugger.Python.websocket;
        let timeoutId = setTimeout(() => {
            websocket.onmessage = (event) => GraphLang.Debugger.Python.logResponse(event.data);
            reject(`no answer from python debugger layer for: ${message}`);
        }, timeoutMs);

        websocket.onmessage = (event) => {
            clearTimeout(timeoutId);
            websocket.onmessage = (event) => GraphLang.Debugger.Python.logResponse(event.data);
            GraphLang.Debugger.Python.logResponse(event.data);
            resolve(event.data);
        };

        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<pre>py&gt; ${GraphLang.Debugger.Python.escapeHtml(message)}</pre><hr/>`);
        websocket.send(message);
    });
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @return {Promise<string>}
 * @description Finish previously running python debugger layer (if any), sends "end debugging" and waits for websocket close.
 */
GraphLang.Debugger.Python.endDebuggerServer = function(){
    return new Promise((resolve) => {
        let finished = false;
        let websocket = null;
        let finish = (result) => {
            if (finished) return;
            finished = true;
            /*
             *  Detach and close this socket: on a remote server (e.g. raspberry pi) the connect attempt can still be
             *  pending after the timeout and would otherwise open later and send "end debugging" to the NEWLY started layer.
             */
            if (websocket){
                websocket.onopen = null;
                websocket.onmessage = null;
                if (websocket.readyState === WebSocket.CONNECTING || websocket.readyState === WebSocket.OPEN) websocket.close();
            }
            GraphLang.Debugger.Python.breakpointAnimateStopAll();
            resolve(result);
        };
        //on localhost connection fails fast when nothing listens, on remote host it can hang, timeout is safety
        setTimeout(() => finish("python debugger end timeout"), 5000);

        websocket = GraphLang.Debugger.Python.createWebSocket({
            onopen: () => {
                websocket.onmessage = (event) => {
                    if (event.data === "debug layer is running") websocket.send("end debugging");
                };
                websocket.send("test echo debug layer is running");
            },
            onerror: () => finish("python debugger end"),
            onclose: () => finish("python debugger end"),
        });
    });
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @return {Promise<string>}
 * @description Start python debugger layer on server (PHP ?q=runPythonDebugServer) and connect websocket to it.
 * Previously running layer is finished first.
 */
GraphLang.Debugger.Python.startDebuggerServer = async function(){
    let projectId = (new URL(window.location.href)).searchParams.get("projectId");
    GraphLang.Debugger.Python.log("starting python debugger layer");

    await GraphLang.Debugger.Python.endDebuggerServer();

    let waitingIntervalId = setInterval(() => {
        GraphLang.Debugger.Python.log(`${(new Date()).toLocaleTimeString('eo', {hour12: false})} -> waiting to start python debugger layer`);
    }, 2000);
    try {
        await GraphLang.Utils.serverAjaxPostSendReceive(["q", "runPythonDebugServer", "projectId", projectId], null);
    } finally {
        clearInterval(waitingIntervalId);
    }

    await GraphLang.Debugger.Python.connectWebSocketWithRetry();
    GraphLang.Debugger.Python.log("python debugger layer RUNNING");
    return "python debugger running";
}

/**
 * @memberOf GraphLang.Debugger.Python
 * @return {Array} breakpoint list from last python translation [{lineNumber, objectId, objectVariableName, type, parentId, parentName}]
 */
GraphLang.Debugger.Python.getBreakpointList = function(){
    let breakpointList = GraphLang.Utils.TranslateToPythonCodeObj ? GraphLang.Utils.TranslateToPythonCodeObj.getBreakpointList() : null;
    return breakpointList ? breakpointList.asArray() : [];
}

/**
 *  @async
 *  @method compilePythonCurrentNode
 *  @memberOf GraphLang.Debugger.Python
 *  @description Python version of compileCurrentNode(). Generates python code from current canvas and sends it to PHP server (q=compileProjectPython),
 *  server writes __init__.py and main.py into project folder, there is no compilation as python is interpreted.
 *  @returns {Promise<Object>} server response {status, message, errorMsg, outputDir, outputFileAbsolutePath, compileCommandOutput}
 */
GraphLang.Debugger.Python.compilePythonCurrentNode = async function(){
    let outputElement = document.querySelector('#generatedContent');
    outputElement.insertAdjacentHTML('afterbegin', "<pre/>> compile python button clicked<pre/><hr/>");

    let url = new URL(window.location.href);
    let projectId = url.searchParams.get("projectId");

    let nodeCodeContent = await GraphLang.Utils.TranslateToPythonCodeObj.getCode(appCanvas, false, "desktop");
    nodeCodeContent = GraphLang.Utils.toHex(nodeCodeContent);

    let ajaxResponse = await GraphLang.Utils.serverAjaxPostSendReceive(
        ["q", "compileProjectPython"],
        ["projectId", projectId, "outputFileName", "main.py", "nodeCodeContent", nodeCodeContent]
    );

    if (ajaxResponse.errorMsg && ajaxResponse.errorMsg.toLowerCase().search("not logged") > -1){
        outputElement.insertAdjacentHTML('afterbegin', `<pre/>> message: ${ajaxResponse.message}\nerror: ${ajaxResponse.errorMsg}<pre/><hr/>`);
        throw new Error(ajaxResponse.errorMsg);
    }

    let compilationOutput = ajaxResponse.compileCommandOutput ? JSON.parse(ajaxResponse.compileCommandOutput) : {status: 1, message: "", errorMsg: "no output from server"};
    outputElement.insertAdjacentHTML('afterbegin', `<pre/>error: ${ajaxResponse.errorMsg}\nmessage: ${ajaxResponse.message}\npython project output:\n\tstatus: ${compilationOutput.status}\n\tmessage: ${compilationOutput.message}\n\tfile: ${ajaxResponse.outputFileAbsolutePath}<pre/><hr/>`);

    if (ajaxResponse.status === 1 && compilationOutput.status === 0){
        outputElement.insertAdjacentHTML('afterbegin', `<span style="color: #00ff00">PYTHON PROJECT GENERATED OK!</span><hr/>`);
    }else{
        outputElement.insertAdjacentHTML('afterbegin', `<span style="color: #ff0000">ERROR GENERATING PYTHON PROJECT!</span><hr/>`);
    }

    return ajaxResponse;
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @return {Promise<Object>} {status, lineNumber, breakpointInfo}
 * @description Button "debug python code": generates python code from current schematic and saves it on server as main.py
 * (GraphLang.Debugger.Python.compilePythonCurrentNode()), starts python debugger layer, sets breakpoints from python breakpoint
 * list and runs script, it stops at beginning of main().
 */
GraphLang.Debugger.Python.debugPythonCode = async function(){
    if (GraphLang.Debugger.Python.busy){
        GraphLang.Debugger.Python.log("debugger busy, click ignored");
        return {status: "busy"};
    }
    GraphLang.Debugger.Python.log("START DEBUGGING PYTHON CODE", "#e0ffe0");

    /*
     *  Generated code must contain original IDs, wire variable names are read using wire.getVariableName()
     */
    let codeRewriteIdHtmlElement = document.querySelector("#codeRewriteIdFlag");
    let codeRewriteIdOriginal = codeRewriteIdHtmlElement ? codeRewriteIdHtmlElement.checked : false;
    if (codeRewriteIdHtmlElement) codeRewriteIdHtmlElement.checked = false;

    let ajaxResponse;
    try {
        ajaxResponse = await GraphLang.Debugger.Python.compilePythonCurrentNode();
    } finally {
        if (codeRewriteIdHtmlElement) codeRewriteIdHtmlElement.checked = codeRewriteIdOriginal;
    }
    if (!ajaxResponse || ajaxResponse.status !== 1 || !ajaxResponse.outputFileAbsolutePath){
        GraphLang.Debugger.Python.log("ERROR: python code was not generated on server, cannot debug", "#ffe0e0");
        return {status: "error"};
    }

    try {
        await GraphLang.Debugger.Python.startDebuggerServer();
    } catch (e) {
        GraphLang.Debugger.Python.log(`ERROR: ${e}`, "#ffe0e0");
        return {status: "error", message: String(e)};
    }

    GraphLang.Debugger.Python.busy = true;
    try {
        await GraphLang.Debugger.Python.sendMessageAndAddToLog(`file ${ajaxResponse.outputFileAbsolutePath}`);

        //set breakpoints one by one, programStart is not needed since start stops at beginning of main()
        GraphLang.Debugger.Python.breakpointNumberToLine = {};
        let lines = [];
        for (let breakpointObj of GraphLang.Debugger.Python.getBreakpointList()){
            if (breakpointObj.type === "programStart" || lines.includes(breakpointObj.lineNumber)) continue;
            lines.push(breakpointObj.lineNumber);
        }
        for (let line of lines){
            let records = GraphLang.Debugger.Python.parseResponse(await GraphLang.Debugger.Python.sendMessageAndAddToLog(`b ${line}`));
            for (let record of records){
                if (record.type === "result" && record.message === "done" && record.payload && record.payload.bkpt){
                    GraphLang.Debugger.Python.breakpointNumberToLine[record.payload.bkpt.number] = line;
                }else if (record.type === "result" && record.message === "error"){
                    GraphLang.Debugger.Python.log(`breakpoint at line ${line} not set: ${record.payload.msg}`, "#ffe0e0");
                }
            }
        }

        let records = GraphLang.Debugger.Python.parseResponse(await GraphLang.Debugger.Python.sendMessageAndAddToLog(`start`));
        return await GraphLang.Debugger.Python.processStopRecords(records, false);
    } finally {
        GraphLang.Debugger.Python.busy = false;
    }
}

/**
 * @memberOf GraphLang.Debugger.Python
 * @param {Array} records - records from python layer
 * @return {Object|null} payload of last stopped notify record
 */
GraphLang.Debugger.Python.findStoppedRecord = function(records){
    let stopped = null;
    for (let record of records){
        if (record.type === "notify" && record.message === "stopped") stopped = record.payload || {};
    }
    return stopped;
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @param {Array} records - answer of resume command (start, continue, next, step)
 * @param {boolean} pollWhileRunning - when program still runs ask layer for status until it stops
 * @return {Promise<Object>} {status: "breakpoint"|"stopped"|"exited"|"running"|"error", lineNumber, breakpointInfo, watchValues}
 * @description Evaluate where program stopped, find object in schematic responsible for that line, highlight it and renew watch values.
 */
GraphLang.Debugger.Python.processStopRecords = async function(records, pollWhileRunning = true){
    let log = GraphLang.Debugger.Python.log;

    for (let record of records){
        if (record.type === "result" && record.message === "error"){
            log(`error: ${record.payload && record.payload.msg ? record.payload.msg : JSON.stringify(record.payload)}`, "#ffe0e0");
            return {status: "error", message: record.payload ? record.payload.msg : ""};
        }
    }

    let stopped = GraphLang.Debugger.Python.findStoppedRecord(records);
    const MAX_POLLS = 30;
    for (let poll = 0; stopped === null && pollWhileRunning && poll < MAX_POLLS; poll++){
        records = GraphLang.Debugger.Python.parseResponse(await GraphLang.Debugger.Python.sendMessageAndAddToLog('status'));
        stopped = GraphLang.Debugger.Python.findStoppedRecord(records);
    }
    if (stopped === null){
        log("program is still running, no breakpoint hit yet");
        return {status: "running"};
    }

    GraphLang.Debugger.Python.breakpointAnimateStopAll();

    let reason = stopped.reason || "";
    if (reason.startsWith("exited")){
        GraphLang.Debugger.Python.lastStopped = null;
        log(`PROGRAM EXITED (${reason}, exit code ${stopped["exit-code"]})`, "#e0ffe0");
        return {status: "exited", exitCode: stopped["exit-code"]};
    }
    GraphLang.Debugger.Python.lastStopped = stopped;

    let frameLine = stopped.frame && stopped.frame.line ? parseInt(stopped.frame.line) : -1;
    let result = {status: "stopped", lineNumber: frameLine, breakpointInfo: null};

    if (reason === "start"){
        result.status = "breakpoint";
        result.breakpointInfo = GraphLang.Debugger.Python.getBreakpointList().find((bp) => bp.type === "programStart") || {type: "programStart", lineNumber: frameLine, objectId: null};
        log(`PROGRAM AT BEGINNING (line ${frameLine})`, "#e0ffe0");
    }else{
        /*
         *  breakpoint number -> line requested by GraphLang -> object from python breakpoint list, fallback stopped line
         */
        let requestedLine = stopped.bkptno !== undefined ? GraphLang.Debugger.Python.breakpointNumberToLine[stopped.bkptno] : undefined;
        let breakpointList = GraphLang.Debugger.Python.getBreakpointList().filter((bp) => bp.type !== "programStart");
        let breakpointInfo = breakpointList.find((bp) => requestedLine !== undefined && bp.lineNumber == requestedLine) || breakpointList.find((bp) => bp.lineNumber == frameLine) || null;

        if (breakpointInfo === null){
            log(`stopped at line ${frameLine} (${reason}), no schematic object has breakpoint on this line`);
        }else{
            result.status = "breakpoint";
            result.breakpointInfo = breakpointInfo;

            //if breakpoint is in subnode load it into main canvas
            if (breakpointInfo.parentName){
                let nodeWithBreakpointObj = eval("new " + breakpointInfo.parentName + "();");
                GraphLang.Utils.displayContents(nodeWithBreakpointObj.jsonDocument);
            }
            if (appCanvas.getLine(breakpointInfo.objectId)){
                GraphLang.Debugger.Cpp.breakpointAnimateDotAlongWire(breakpointInfo);
            }else if (appCanvas.getFigure(breakpointInfo.objectId)){
                GraphLang.Debugger.Cpp.breakpointAnimateNodeBlinking(breakpointInfo);
            }
            log(`stopped at line ${frameLine} (breakpoint ${stopped.bkptno || "-"}), highlighted ${breakpointInfo.type} ${breakpointInfo.objectId}`, "#e0ffe0");
        }
    }

    result.watchValues = await GraphLang.Debugger.Python.renewWatchValues(true);
    return result;
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @param {string} command - python layer resume command: c | next | step | finish
 * @return {Promise<Object>} see processStopRecords()
 * @description Resume program and process where it stopped.
 */
GraphLang.Debugger.Python.resume = async function(command){
    if (GraphLang.Debugger.Python.busy){
        GraphLang.Debugger.Python.log("debugger busy, click ignored");
        return {status: "busy"};
    }
    if (!GraphLang.Debugger.Python.isConnected()){
        GraphLang.Debugger.Python.log("websocket not opened, click on debug python code first");
        return {status: "error"};
    }
    GraphLang.Debugger.Python.busy = true;
    try {
        let records = GraphLang.Debugger.Python.parseResponse(await GraphLang.Debugger.Python.sendMessageAndAddToLog(command));
        return await GraphLang.Debugger.Python.processStopRecords(records, true);
    } catch (e) {
        GraphLang.Debugger.Python.log(`ERROR: ${e}`, "#ffe0e0");
        return {status: "error", message: String(e)};
    } finally {
        GraphLang.Debugger.Python.busy = false;
    }
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @return {Promise<Object>} see processStopRecords()
 * @description Continue program to next breakpoint, highlight responsible object and renew watch values.
 */
GraphLang.Debugger.Python.stepToNextBreakpoint = function(){
    return GraphLang.Debugger.Python.resume("c");
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @return {Promise<Object>} see processStopRecords()
 * @description Execute one line of python code (step over function calls).
 */
GraphLang.Debugger.Python.stepOver = function(){
    return GraphLang.Debugger.Python.resume("next");
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @return {Promise<Object>} see processStopRecords()
 * @description Execute one line of python code, steps into called functions (subnodes).
 */
GraphLang.Debugger.Python.stepInto = function(){
    return GraphLang.Debugger.Python.resume("step");
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @param {Object} wireObj - wire on canvas
 * @return {Promise<string>} wire value as text, "n/a" when it can't be evaluated (ie. variable not defined yet)
 * @description Read current value of wire variable from python layer.
 */
GraphLang.Debugger.Python.getWireValue = async function(wireObj){
    let records = GraphLang.Debugger.Python.parseResponse(await GraphLang.Debugger.Python.sendMessageAndAddToLog(`p ${wireObj.getVariableName()}`));
    for (let record of records){
        if (record.type === "result" && record.message === "done" && record.payload && record.payload.value !== undefined) return String(record.payload.value);
    }
    return "n/a";
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @param {boolean} calledInternally - true when called while busy flag is already held by caller (after step)
 * @return {Promise<Array>} list of {objectId, objectVariableName, value}
 * @description Read values of all wires with watch set on canvas (userData.isSetWatch) and put them as labels on wires.
 * Python values are readable (lists are displayed as python lists), unlike C++ arrays they are displayed.
 */
GraphLang.Debugger.Python.renewWatchValues = async function(calledInternally = false){
    let log = (msg) => GraphLang.Debugger.Python.log(`renew watch values: ${msg}`, "#e0ecff");

    if (!calledInternally && GraphLang.Debugger.Python.busy){
        log("debugger busy, click ignored");
        return [];
    }
    if (!GraphLang.Debugger.Python.isConnected() || GraphLang.Debugger.Python.lastStopped === null){
        if (!calledInternally) log("program is not stopped, click on debug python code first");
        return [];
    }

    let watchWires = [];
    appCanvas.getLines().each((wireIndex, wireObj) => {
        if (wireObj.getUserData() && wireObj.getUserData().isSetWatch) watchWires.push(wireObj);
    });
    if (watchWires.length === 0){
        if (!calledInternally) log("no watch set on any wire on canvas");
        return [];
    }

    if (!calledInternally) GraphLang.Debugger.Python.busy = true;
    let results = [];
    try {
        for (let wireObj of watchWires){
            let value;
            try {
                value = await GraphLang.Debugger.Python.getWireValue(wireObj);
            } catch (e) {
                console.warn(e);
                value = "n/a";
            }
            let watchObj = {lineNumber: null, objectId: wireObj.getId(), objectVariableName: wireObj.getVariableName(), type: "wire", parentId: null, parentName: null};
            GraphLang.Debugger.Cpp.putWireValueOnScreen(watchObj, value, true);
            results.push({objectId: watchObj.objectId, objectVariableName: watchObj.objectVariableName, value: value});
        }
        log(`${results.length} watch value(s) renewed<br/>` + results.map(r => `&nbsp;&nbsp;${r.objectVariableName} = ${GraphLang.Debugger.Python.escapeHtml(r.value)}`).join("<br/>"));
    } finally {
        if (!calledInternally) GraphLang.Debugger.Python.busy = false;
    }
    return results;
}

/**
 * @memberOf GraphLang.Debugger.Python
 * @description Stop all breakpoint highlights and remove watch labels from canvas.
 */
GraphLang.Debugger.Python.breakpointAnimateStopAll = function(){
    if (typeof appCanvas === "undefined" || !appCanvas) return;
    GraphLang.Debugger.Cpp.breakpointAnimateStopAll();
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @return {Promise<Object>} {status: "killed"|"notRunning"|"error", message}
 * @description Kill debugged python program, python layer keeps running so program can be started again.
 */
GraphLang.Debugger.Python.killProgram = async function(){
    let cleanupCanvas = () => {
        GraphLang.Debugger.Python.breakpointAnimateStopAll();
        GraphLang.Debugger.Python.lastStopped = null;
        return GraphLang.Debugger.Cpp.clearWatchValuesFromCanvas();
    };
    if (!GraphLang.Debugger.Python.isConnected()){
        let removed = cleanupCanvas();
        GraphLang.Debugger.Python.log(`websocket not opened, nothing to kill, ${removed} watch value(s) removed from canvas`);
        return {status: "error", message: "websocket not opened"};
    }

    let result = {status: "killed", message: ""};
    try {
        let records = GraphLang.Debugger.Python.parseResponse(await GraphLang.Debugger.Python.sendMessageAndAddToLog('kill'));
        for (let record of records){
            if (record.type === "result" && record.message === "error"){
                result.message = record.payload ? record.payload.msg : "";
                result.status = result.message.toLowerCase().search("not being run") > -1 ? "notRunning" : "error";
            }
        }
    } catch (e) {
        result = {status: "error", message: String(e)};
    }
    let removed = cleanupCanvas();
    GraphLang.Debugger.Python.log(`${result.status === "killed" ? "PROGRAM KILLED" : result.status === "notRunning" ? "program is not running" : "error: " + result.message}, ${removed} watch value(s) removed from canvas`, "#ffe0e0");
    return result;
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Python
 * @description End debugging, kills program and finishes python debugger layer.
 */
GraphLang.Debugger.Python.endDebugging = async function(){
    GraphLang.Debugger.Python.lastStopped = null;
    GraphLang.Debugger.Cpp.clearWatchValuesFromCanvas();
    let result = await GraphLang.Debugger.Python.endDebuggerServer();
    GraphLang.Debugger.Python.log("debugging ended");
    return result;
}

/**
 * @memberOf GraphLang.Debugger.Python
 * @description Send command typed in #cmdStr input directly to python layer (ie. "p wire_x", "locals", "frame").
 */
GraphLang.Debugger.Python.onclickSendButton = async function(){
    try {
        await GraphLang.Debugger.Python.sendMessageAndAddToLog(null);
    } catch (e) {
        console.warn(e);
    }
}

/**
 * @memberOf GraphLang.Debugger.Python
 * @return {string} html with python debugger buttons, inserted into debugger pane by GraphLang.Debugger.Cpp.open()
 */
GraphLang.Debugger.Python.getButtonsHtml = function(){
    /*
     *  PYTHON DEBUGGER BUTTON GRAPHICS
     *      Inline SVG icons (24x24 viewBox, drawn with currentColor so they follow button text color), same style as in C++ debugger.
     *      Any of them can be replaced by base64 image, ie. '<img src="data:image/png;base64,iVBORw0..." width="20" height="20"/>'
     */
    const SVG_START = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
    const SVG_END = '</svg>';
    const COLOR_GREEN = '#2e7d32';
    const COLOR_RED = '#d32f2f';

    //svg images for buttons
    const BUTTON_IMAGE_COMPILE_PYTHON = SVG_START + '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' + SVG_END;
    const BUTTON_IMAGE_DEBUG_PYTHON_CODE = SVG_START + '<rect x="5" y="7" width="8" height="13" rx="4"/><path d="M6.5 7.5 5 4M11.5 7.5 13 4M5 12H2M5 17H2.5M13 12h1"/><path d="M9 11v7"/><path d="M15.5 13v8l6-4z" fill="' + COLOR_GREEN + '" stroke="' + COLOR_GREEN + '" stroke-width="1.5"/>' + SVG_END;
    const BUTTON_IMAGE_STEP_TO_NEXT_BREAKPOINT = SVG_START + '<path d="M2 12h11"/><path d="m9 8 4 4-4 4"/><circle cx="18.5" cy="12" r="3.5" fill="' + COLOR_RED + '" stroke="' + COLOR_RED + '"/>' + SVG_END;
    const BUTTON_IMAGE_STEP_OVER = SVG_START + '<path d="M3 14a8 8 0 0 1 15-3.9"/><path d="M19 4v6h-6"/><circle cx="12" cy="19" r="2.2" fill="currentColor"/>' + SVG_END;
    const BUTTON_IMAGE_STEP_INTO = SVG_START + '<path d="M12 2v11"/><path d="m8 9 4 4 4-4"/><circle cx="12" cy="19" r="2.2" fill="currentColor"/>' + SVG_END;
    const BUTTON_IMAGE_RENEW_WATCH_VALUES = SVG_START + '<path d="M1.5 10s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S1.5 10 1.5 10z"/><circle cx="11" cy="10" r="2.5"/><path d="M14 21a5 5 0 0 0 8-3.5" stroke="' + COLOR_GREEN + '"/><path d="M22 21.5v-4h-4" stroke="' + COLOR_GREEN + '"/>' + SVG_END;
    const BUTTON_IMAGE_KILL_PROGRAM = SVG_START + '<circle cx="12" cy="12" r="10" stroke="' + COLOR_RED + '"/><path d="m15 9-6 6M9 9l6 6" stroke="' + COLOR_RED + '"/>' + SVG_END;
    const BUTTON_IMAGE_END_DEBUGGING = SVG_START + '<rect x="5" y="5" width="14" height="14" rx="1.5" fill="' + COLOR_RED + '" stroke="' + COLOR_RED + '"/>' + SVG_END;
    const BUTTON_IMAGE_SEND_MESSAGE = SVG_START + '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>' + SVG_END;

    //use text for buttons
    // const BUTTON_IMAGE_COMPILE_PYTHON = 'compile python';
    // const BUTTON_IMAGE_DEBUG_PYTHON_CODE = 'debug python code';
    // const BUTTON_IMAGE_STEP_TO_NEXT_BREAKPOINT = 'py continue';
    // const BUTTON_IMAGE_STEP_OVER = 'py step over';
    // const BUTTON_IMAGE_STEP_INTO = 'py step into';
    // const BUTTON_IMAGE_RENEW_WATCH_VALUES = 'py renew watch';
    // const BUTTON_IMAGE_KILL_PROGRAM = 'py kill';
    // const BUTTON_IMAGE_END_DEBUGGING = 'py end debugging';
    // const BUTTON_IMAGE_SEND_MESSAGE = 'py send';

    return `<b>Python:</b><br />
        <button class="debugger_icon_button" name="compilePython" type="button" title="Compile python (generate main.py on server)" onclick="GraphLang.Debugger.Python.compilePythonCurrentNode()">${BUTTON_IMAGE_COMPILE_PYTHON}</button>
        <button class="debugger_icon_button" name="debugPythonCodeButton" type="button" title="Debug python code (generate main.py, start python debugger layer and run it)" onclick="GraphLang.Debugger.Python.debugPythonCode()">${BUTTON_IMAGE_DEBUG_PYTHON_CODE}</button>
        <button class="debugger_icon_button" name="pythonStepToNextBreakpointButton" type="button" title="Python: continue to next breakpoint" onclick="GraphLang.Debugger.Python.stepToNextBreakpoint()">${BUTTON_IMAGE_STEP_TO_NEXT_BREAKPOINT}</button>
        <button class="debugger_icon_button" name="pythonStepOverButton" type="button" title="Python: step over (next line)" onclick="GraphLang.Debugger.Python.stepOver()">${BUTTON_IMAGE_STEP_OVER}</button>
        <button class="debugger_icon_button" name="pythonStepIntoButton" type="button" title="Python: step into" onclick="GraphLang.Debugger.Python.stepInto()">${BUTTON_IMAGE_STEP_INTO}</button>
        <button class="debugger_icon_button" name="pythonRenewWatchValuesButton" type="button" title="Python: renew watch values" onclick="GraphLang.Debugger.Python.renewWatchValues()">${BUTTON_IMAGE_RENEW_WATCH_VALUES}</button>
        <button class="debugger_icon_button" name="pythonKillProgramButton" type="button" title="Python: kill program" onclick="GraphLang.Debugger.Python.killProgram()">${BUTTON_IMAGE_KILL_PROGRAM}</button>
        <button class="debugger_icon_button" name="pythonEndDebuggingButton" type="button" title="Python: end debugging (stop python debugger layer)" onclick="GraphLang.Debugger.Python.endDebugging()">${BUTTON_IMAGE_END_DEBUGGING}</button>
        <button class="debugger_icon_button" name="pythonSendButton" type="button" title="Send message from input to python debugger" onclick="GraphLang.Debugger.Python.onclickSendButton()">${BUTTON_IMAGE_SEND_MESSAGE}</button>
        <br/>`;
}
