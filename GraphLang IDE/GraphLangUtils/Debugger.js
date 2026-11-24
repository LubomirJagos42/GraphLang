/*******************************************************************************
 *  Debugger.js by LuboJ
 */

/**
 *  @namespace GraphLang.Debugger
 *  @description Base class for GraphLang utils
 */
GraphLang.Debugger = Class.extend({
    NAME: "GraphLang.Debugger",

    init:function(attr, setter, getter){
        this._super(attr, setter, getter);

    }
});

/**
 * @namespace GraphLang.Debugger.Cpp
 * @description C++ debugger class, creates websocket to communicate with python script and control trhough it GDB, can makes steps through code, search for code breakpoint lines and other things.
 */
GraphLang.Debugger.Cpp = {};

/**
 * Browser websocket object - used to communicate with backend python script to control GDB
 * @memberOf GraphLang.Debugger
 * @var {Object}
 */
GraphLang.Debugger.websocket = {};

/**
 * Websocket port number, hardwired to be <b>8888</b> for now
 * @memberOf GraphLang.Debugger
 * @var {number}
 */
GraphLang.Debugger.websocketPort = 8888;

/**
 * Response from GDB obtained from python backend script using browser websocket.
 * @var {string}
 */
GLOBAL_DEBUGGER_CPP_RESPONSE = null;
/**
 * Response from GDB obtained from python backend script using browser websocket.
 * @function
 */
GLOBAL_DEBUGGER_CPP_WEBSOCKET_CALLBACK = null;

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @method createWebScoket
 * @param options
 * @description Opens websocket on javascript side, looking for python opened port, if python server script is not running this will not connect and display it for user.
 */
GraphLang.Debugger.Cpp.createWebSocket = function(options = null){
    let websocketHost = window.location.host ? window.location.host : "localhost";
    console.log("Connecting to websocket ws://"+ websocketHost +":"+ GraphLang.Debugger.websocketPort);
    GraphLang.Debugger.websocket = new WebSocket("ws://"+ websocketHost +":"+ GraphLang.Debugger.websocketPort);

    /*
     *  websocket received message handler
     */
    GraphLang.Debugger.websocket.onmessage = (event) => GraphLang.Debugger.Cpp.logResponse(event);

    /*
     *  if callback func onopen available use that one
     *      otherwise use some default
     */
    console.log(`result: ${options != null && Object.getOwnPropertyNames(options).includes('onopen')}`);
    if (options != null && Object.getOwnPropertyNames(options).includes('onopen')){
        GraphLang.Debugger.websocket.onopen = options.onopen;
    }else{
        GraphLang.Debugger.websocket.onopen = function(){
            console.log("Connection is Established");
            document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<span>CONNECTION ESTABLISHED</span><br/><hr/>\n");
        };
    }

    if (options != null && Object.getOwnPropertyNames(options).includes('onerror')){
        GraphLang.Debugger.websocket.onerror = options.onerror;
    }else{
        GraphLang.Debugger.websocket.onerror = function(event){
            console.log(`Connection ERROR`);
            console.log(event);
            document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<span>CONNECTION ERROR</span><br/><hr/>\n");
        };
    }

    if (options != null && Object.getOwnPropertyNames(options).includes('onclose')){
        GraphLang.Debugger.websocket.onclose = options.onclose;
    }else{
        GraphLang.Debugger.websocket.onclose = function(event){
            console.log(`Connection is CLOSED`);
            console.log(event);
            document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<span>CONNECTION CLOSED</span><br/><hr/>\n");
        };
    }
}

/**
 * @method
 * @memberOf GraphLang.Debugger.Cpp
 * @param event
 */
GraphLang.Debugger.Cpp.logResponse = function(event){
    console.log(event.data);

    try {
        let jsonMsg = JSON.parse(event.data);

        /*
         *  WAY 1 - print raw data JSON response, this is quite long
         */
        // document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre>" + JSON.stringify(jsonMsg, undefined, 2) + "<pre/><hr/>");

        /*
         *  WAY 2 - evaluate response from gdb and try to print it on one line
         */
        let msgColor = "";
        let msgPrefix = "";
        let msgContent = "";
        for (let gdbLine of jsonMsg){
            if (gdbLine.type == "log"){
                msgColor = "rgb(255,238,192)";
            }else if (gdbLine.type == "console"){
                msgColor = "#b8d2ff";
            }else if (gdbLine.type == "notify"){
                msgColor = "#ffcca9";
            }else if (gdbLine.type == "result") {
                msgColor = "#bbfff4";
            }else if (gdbLine.type == "output") {
                msgColor = "#b0ddff";
            }

            if (["console", "log", "result"].includes(gdbLine.type)) {
                msgContent += `<span style="font-color: #000000; background-color: ${msgColor}">`;
                msgContent += `${msgPrefix}`;

                //correct text output, if there is "some text...\\n" remove ending newline symbol as it is at the end of text inside apostophes
                //replace newline symbol in gdb text output \\n -> <br /> as br tag is one which is displayed in html as newline
                if (gdbLine.message !== null) msgContent += `message: ${JSON.stringify(gdbLine.message, undefined, 2)}<br />`.replace(/(\\n")/g, '"').replaceAll('\\n', '<br />');
                msgContent += `${JSON.stringify(gdbLine.payload, undefined, 2)}`.replace(/(\\n")/g, '"').replaceAll('\\n', '<br />');

                msgContent += `</span>`;
                msgContent += `<br />`;
                // msgContent += `</hr>`;
            }else if (["output"].includes(gdbLine.type)){
                /*
                 *  This is for platformio gdb output, message type is "output"
                 */
                msgContent += `<pre style="font-color: #000000; background-color: ${msgColor}">`;
                msgContent += `${msgPrefix}`;
                if (gdbLine.message !== null) msgContent += `message: ${JSON.stringify(gdbLine.message, undefined, 2)}\n`;
                msgContent += `${JSON.stringify(gdbLine.payload, undefined, 2)}`;
                msgContent += `</pre>`;

                //here using regular expression to extract current line number for further evaluation

            }else{
                msgContent += `<pre style="font-color: #000000; background-color: ${msgColor}">`;
                msgContent += `${msgPrefix}`;
                if (gdbLine.message !== null) msgContent += `message: ${JSON.stringify(gdbLine.message, undefined, 2)}\n`;
                msgContent += `${JSON.stringify(gdbLine.payload, undefined, 2)}`;
                msgContent += `</pre>`;
                // msgContent += `</hr>`;
            }
        }
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', msgContent);

    }catch(e){
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre>" + event.data + "<pre/><hr/>");
    }

    GLOBAL_DEBUGGER_CPP_RESPONSE = event.data;

    if (GLOBAL_DEBUGGER_CPP_WEBSOCKET_CALLBACK){
        let callbackFunction = GLOBAL_DEBUGGER_CPP_WEBSOCKET_CALLBACK;
        GLOBAL_DEBUGGER_CPP_WEBSOCKET_CALLBACK = null;

        callbackFunction(event.data);
    }
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Cpp
 * @param message
 * @param callbackFunction
 * @return {Promise<unknown>}
 */
GraphLang.Debugger.Cpp.sendMessageAndAddToLog = async function(message = null, callbackFunction = null){
    return new Promise((resolve, reject) => {
        GLOBAL_DEBUGGER_CPP_RESPONSE = null;

        //if message is not provided in parameter look into <input> tag
        if (!message) message = document.querySelector('#cmdStr').value;

        GraphLang.Debugger.websocket.onmessage = (event) => {
            GraphLang.Debugger.Cpp.logResponse(event);
            resolve(event.data);
        }

        GraphLang.Debugger.websocket.onerror = (event) => {
            GraphLang.Debugger.Cpp.logResponse(event);
            reject(event.data);
        }

        GLOBAL_DEBUGGER_CPP_WEBSOCKET_CALLBACK = callbackFunction;
        if (typeof GraphLang.Debugger.websocket.send === "function"){
            GraphLang.Debugger.websocket.send(message);
        }else{
            document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "Error: websocket not created, can't send message<hr/>");
            //reject("GraphLang.Debugger.Cpp.sendMessageAndAddToLog(): message not sent");
            resolve("GraphLang.Debugger.Cpp.sendMessageAndAddToLog(): message not sent");
        }

        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>>" + message + "<pre/><hr/>");
    });
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @param {Object} options
 * @description This function is tied to button and after click it try to send message to websocket port, if not opened try to reopen it.
 */
GraphLang.Debugger.Cpp.onclickSendButton = function(options = null){
    console.log(`send button clicked`);
    if (GraphLang.Debugger.websocket.readyState === WebSocket.CLOSED){
        /*
         *  socket is close, trying to open it and as open function use send message to have smooth UI experience for user
         */
        console.warn(`re-open websocket`);
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>>trying to reopen connection<pre/><hr/>");
        createWebSocket({
            onopen: GraphLang.Debugger.Cpp.sendMessageAndAddToLog
        });
    }else if (GraphLang.Debugger.websocket.readyState === WebSocket.OPEN){
        GraphLang.Debugger.Cpp.sendMessageAndAddToLog();
    }else{
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>WEBSOCKET NOT OPENED<pre/><hr/>");
    }
}

/**
 *  @async
 *  @memberOf GraphLang.Debugger.Cpp
 *  @param {Object} options
 *  @description This will start python script which acts as debugger server, asking interface between GDB and websocket and send and receive messages betweeen them.
 */
GraphLang.Debugger.Cpp.startDebuggerServer = async function(options = null){
    return new Promise(async (resolve, reject) => {
        let url_string = window.location.href;
        let url = new URL(url_string);
        let projectId = url.searchParams.get("projectId");

        console.log(`start CPP debugger button clicked, projectId: ${projectId}`);
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>> start debugger server button clicked<pre/><hr/>");

        /*
         *  End debugger if there is some previously running.
         */
        await GraphLang.Debugger.Cpp.endDebuggerServer();

        /*
         *  Websocket is (re)created after python layer is started (below), creating it here causes only connection error
         *  since old python layer is just shutting down and new one is not running yet.
         */

        /*
         *  Writing message while waiting for server debugger python interface to start
         */
        let intervalIdentifierForServerDebuggerToStart;

        intervalIdentifierForServerDebuggerToStart = setInterval(async () => {
            let currTime = (new Date()).toLocaleTimeString('eo', { hour12: false });
            document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<pre/>${currTime} -> waiting to start debugger python layer<pre/><hr/>`);
        }, 2000);

        await GraphLang.Utils.serverAjaxPostSendReceive(
            ["q", "runPythonCppDebugServer", "projectId", projectId],
            null,
            function (response) {
                clearInterval(intervalIdentifierForServerDebuggerToStart);
                document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>>debugger server RUNNING<pre/><hr/>");
            }
        );

        //For embedded target wait here till there is message from gdb: "PlatformIO: Initialization completed"
        let codeTemplate = await GraphLang.Utils.getProjectCodeTemplate();
        if (codeTemplate === "embedded") {

            /*
             *  Create websocket connection to debugger layer
             */
            GraphLang.Debugger.Cpp.createWebSocket();

            let timeoutResponsesCounter = 0;
            let MAX_INTERVAL_TIMEOUTS_COUNT = 3;
            let intervalIdentifier = setInterval(async () => {
                let gdbResponse = await GraphLang.Debugger.Cpp.sendMessageAndAddToLog('.');
                try {
                    let parsedJsonGdbResponse = JSON.parse(gdbResponse);
                    if (
                        gdbResponse.search("PlatformIO: Initialization completed") > -1 ||
                        (parsedJsonGdbResponse.hasOwnProperty("error") && parsedJsonGdbResponse.error.length > 0)
                    ){
                        timeoutResponsesCounter++;
                        if (gdbResponse.search("PlatformIO: Initialization completed") > -1 || timeoutResponsesCounter > MAX_INTERVAL_TIMEOUTS_COUNT) {
                            if (gdbResponse.search("PlatformIO: Initialization completed") > -1) {
                                document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<pre/>DEBUG PLATFORMIO INITIALIZATION COMPLETE<pre/><hr/>`);
                                resolve("platformio init finished");
                            } else {
                                document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<pre/>intervalIdentifier reach max consecutive timeouts (${MAX_INTERVAL_TIMEOUTS_COUNT}), stopping refresh<pre/><hr/>`);
                                reject("platformio init fail, max timeouts reached");
                            }
                            clearInterval(intervalIdentifier);
                        } else {
                            if (gdbResponse.toLowerCase().search("undefined command") === -1) timeoutResponsesCounter = 0;  //"undefined command" is response for gdb command "."
                        }
                    }else{
                        console.log(`--> no platformio init message yet`);
                    }
                } catch (e) {
                    document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>${e.message}<pre/><hr/>");
                }
            }, 2000);
        } else if (codeTemplate === "desktop") {

            /*
             *  Websocket created above (right after "end debugging") is usually already CLOSED, it was created while old python layer
             *  was shutting down and new one was not listening yet. Waiting on it would hang forever as its 'open' event never fires.
             *  Also PHP returns before python layer + gdb are listening, therefore connect with retries here.
             */
            try {
                await GraphLang.Debugger.Cpp.connectWebSocketWithRetry();
            } catch (e) {
                document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<span style="color: #ff0000">ERROR: ${e}</span><hr/>`);
                reject(e);
                return;
            }

            resolve("debbuger running for desktop app");
        } else {
            reject(`undefined codeTemplate: ${codeTemplate}, python debugger layer running`);
        }
    });
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Cpp
 * @param {number} maxAttempts - how many times try to connect
 * @param {number} delayMs - delay between attempts in milliseconds
 * @returns {Promise<WebSocket>}
 * @description Create websocket to python debugger layer and resolve when it is OPEN, if connection fails (python layer not listening yet)
 * try it again after delay. Rejects after maxAttempts failed tries.
 */
GraphLang.Debugger.Cpp.connectWebSocketWithRetry = function(maxAttempts = 20, delayMs = 500){
    return new Promise((resolve, reject) => {
        let attempt = 0;
        let tryConnect = () => {
            attempt++;
            let opened = false;
            GraphLang.Debugger.Cpp.createWebSocket({
                onopen: (event) => {
                    opened = true;
                    document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<span>CONNECTION ESTABLISHED (attempt ${attempt})</span><br/><hr/>\n`);
                    resolve(GraphLang.Debugger.websocket);
                },
                onerror: (event) => {
                    console.log(`websocket connect attempt ${attempt} failed`);
                },
                onclose: (event) => {
                    if (opened) {
                        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<span>CONNECTION CLOSED</span><br/><hr/>\n");
                        return;
                    }
                    if (attempt < maxAttempts) {
                        setTimeout(tryConnect, delayMs);
                    } else {
                        reject(`cannot connect to python debugger layer websocket after ${attempt} attempts`);
                    }
                },
            });
        };
        tryConnect();
    });
}

/**
 * @async
 * @method GraphLang.Debugger.Cpp.endDebuggerServer
 * @param options
 * @param options.onopen - function(event) to be called when websocket opens
 * @param options.onerror - function(event) to be called when websocket error occures
 * @param options.close - function(event) to be called when websocket closes
 * @returns {Promise<unknown>}
 * @description This safely finish python script which create layer between browser and gdb, it sends string "end debugging" which
 * indicates python script to close and close websocket. This method calls at beginning to createWebsocket() to be sure that websocket
 * is created (even in case user just opened page and there is no websocket at beginning). Please call this method with "await... " as
 * it is asynchronous method returning Promise<>.
 */
GraphLang.Debugger.Cpp.endDebuggerServer = async function(options = null) {
    return new Promise(async (resolve, reject) => {
        let PYTHON_LAYER_DEBUGGER_END_COMMAND = "end debugging";
        let debuggerLayerResponse = "";
        GraphLang.Debugger.Cpp.createWebSocket({
            onopen: async (event) => {
                let debuggerLayerResponse = await GraphLang.Debugger.Cpp.sendMessageAndAddToLog("test echo debug layer is running");
                if (debuggerLayerResponse === "debug layer is running"){
                    await GraphLang.Debugger.Cpp.sendMessageAndAddToLog(PYTHON_LAYER_DEBUGGER_END_COMMAND);
                }
            },
            onerror: async (event) => {
                if (debuggerLayerResponse === "debug layer is running") {
                    reject("python debugger still running");
                }else{
                    resolve("python debugger end");
                }
            },
            onclose: async (event) => {
                if (debuggerLayerResponse === "debug layer is running") {
                    reject("python debugger still running");
                }else{
                    resolve("python debugger end");
                }
            },
        });
    });
}

/**
 *  @async
 *  @method compileCurrentNode
 *  @memberOf GraphLang.Debugger.Cpp
 *  @description This will send AJAX request to PHP server to run compile process of current generated code.
 */
GraphLang.Debugger.Cpp.compileCurrentNode = async function(options = null){
    return new Promise(async(resolve, reject) => {
        console.log(`compile current node button clicked`);

        /*
         *  TODO getting current node and sent it to server
         */
        let url_string = window.location.href;
        let url = new URL(url_string);

        let projectId = url.searchParams.get("projectId");
        let outputFileName = "main.exe";

        /*
         *  ATTENTION THIS IS USING getCppCode4() which is template for C++ desktop code
         */
        let nodeCodeContent = await GraphLang.Utils.TranslateToGeneralCodeObj.getCode(appCanvas, false);
        nodeCodeContent = GraphLang.Utils.toHex(nodeCodeContent);

        let nodeCodeAdditionalLibraries = "";
        if (GraphLang.Utils.TranslateToGeneralCodeObj.getLibrariesList()) {
            nodeCodeAdditionalLibraries = GraphLang.Utils.TranslateToGeneralCodeObj.getLibrariesList().data.join();
        }

        /*
         *  TODO: Experimental message while waiting to compile code, it takes time!
         */
        let intervalIdentifierForServerToCompile;
        intervalIdentifierForServerToCompile = setInterval(async () => {
            let currTime = (new Date()).toLocaleTimeString('eo', { hour12: false });
            document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<pre/>${currTime} -> waiting for server to compile codebase<pre/><hr/>`);
        }, 2000);

        /*
         *  Send AJAX request to server to compile code
         */
        let outputElement = document.querySelector('#generatedContent');
        outputElement.insertAdjacentHTML('afterbegin', "<pre/>> compile current node button clicked<pre/><hr/>");
        let ajaxResponse = await GraphLang.Utils.serverAjaxPostSendReceive(
            ["q", "compileProject"],
            ["projectId", projectId, "outputFileName", outputFileName, "nodeCodeAdditionalLibraries", nodeCodeAdditionalLibraries, "nodeCodeContent", nodeCodeContent],
            function () {
                clearTimeout(intervalIdentifierForServerToCompile);

                if (GLOBAL_AJAX_RESPONSE.errorMsg && GLOBAL_AJAX_RESPONSE.errorMsg.toLowerCase().search("not logged") > -1){
                    outputElement.insertAdjacentHTML('afterbegin', `<pre/>> message: ${GLOBAL_AJAX_RESPONSE.message}\nerror: ${GLOBAL_AJAX_RESPONSE.errorMsg}<pre/><hr/>`);
                    throw new Error(GLOBAL_AJAX_RESPONSE.errorMsg);
                }

                let compilationOutput = JSON.parse(GLOBAL_AJAX_RESPONSE.compileCommandOutput);
                outputElement.insertAdjacentHTML('afterbegin', `<pre/>error: ${GLOBAL_AJAX_RESPONSE.errorMsg}\ncompilation output:\n\tstatus: ${compilationOutput.status}\n\tmessage: ${compilationOutput.message}<pre/><hr/>`);

                //THERE IS ERROR IN COMPILATION
                if (compilationOutput.status === 1){
                    outputElement.insertAdjacentHTML('afterbegin', `<span style="color: #ff0000">ERROR DURING COMPILATION!</span><hr/>`);
                }else{
                    outputElement.insertAdjacentHTML('afterbegin', `<span style="color: #00ff00">COMPILATION OK!</span><hr/>`);
                }
            }
        );

        /*
         *  Evaluate compilation output, compile status use linux convention:
         *      0 = no error
         *      1 = there is ERROR
         */
        let compileErrorLines = new draw2d.util.ArrayList();
        let errorLinesByLineNumbers = [];

        let compileCommandOutputStr = ajaxResponse.compileCommandOutput;
        let compileCommandOutputObj = JSON.parse(compileCommandOutputStr);
        if (compileCommandOutputObj.status === 1) {

            let codeTemplateUsed = await GraphLang.Utils.getProjectCodeTemplate();

            /*
             *  Analyze error output from g++, it's in JSON format since -fdianostic-format=json is used
             */
            if (codeTemplateUsed === "desktop") {
                /*
                 *  This was for previous g++ compile whne used as:
                 *      > g++ -fdiagnostic-format=json
                 *  Now there is used cmake so this need to be re-done.
                 *
                 *  If there is status -1 it means there is whole error obj str in output json format
                 *  Error object structure:
                 *      - array[0..n]
                 *        |__children: array[0..n]
                 *           |__locations: array[0..n]
                 *              |__caret:
                 *                 |__line: number
                 *
                 *  This will extract just caret object information into array:
                 *      - array[lineNumber]
                 *        |__array["...error message..."]
                 *           |__array[0..n]
                 *              |__byte-column
                 *              |__column
                 *              |__display-column
                 *              |__file
                 *              |__line
                 */
                let compileErrorStr = compileCommandOutputObj.errorMsg;

                /*
                 *  TODO: Need check target device, if desktop it's working on raspi now as there is errors logged in json into file
                 *        If embedded need manually go through compilation output and look for errors as all output is going to stdout now!!!
                 */
                let compileErrorObj = null;
                try {
                    compileErrorObj = JSON.parse(compileErrorStr);
                    console.log(`--> compileErrorObj json answer from G++:`);
                    console.log(compileErrorObj);
                } catch (e) {
                    console.warn(`Error parsing compile error message: ${e.message}`);
                    throw e;
                }

                for (let errorObj of compileErrorObj) {
                    // console.log(`----> compileErrorObj one:`);
                    for (let errorLocation of errorObj.locations) {
                        // console.log(errorLocation);
                        compileErrorLines.add(errorLocation.caret);

                        //create new array at line number key
                        let arrayKey = String(errorLocation.caret.line);    //output of this is object with properties, NO ARRAY
                        if (!errorLinesByLineNumbers[arrayKey]) {
                            errorLinesByLineNumbers[arrayKey] = [];
                        }

                        //this will group message into
                        let lineError = errorLocation.caret;
                        let lineErrorMessage = errorObj.message;
                        if (!errorLinesByLineNumbers[arrayKey][lineErrorMessage]) {
                            errorLinesByLineNumbers[arrayKey][lineErrorMessage] = [];
                        }
                        errorLinesByLineNumbers[arrayKey][lineErrorMessage].push(errorLocation.caret);  //add line error into array under line number and error message key
                    }
                }
            }

            /*
             *  Analyze error output from stderr from platformio and webassembly
             *      - seems like compiler parameter -fdiagnostic-format=json doesn't work for these compiler therefore errors are parsed from standard text output
             */
            if (codeTemplateUsed === "embedded" || codeTemplateUsed === "webassembly") {
                console.log(`--> COMPILER ERROR EVALUATION FOR "${codeTemplateUsed}" USED!!!`);
                console.log(compileCommandOutputObj);

                let compileErrorStr = compileCommandOutputObj.errorMsg;
                let errorOutputSplitByNewline = compileErrorStr.split("\n");
                console.log(errorOutputSplitByNewline);

                let errorLineInfoList = [];
                for (let errorLineStr of errorOutputSplitByNewline){
                    let regexpResult = {};

                    if (codeTemplateUsed === "embedded") {
                        regexpResult = errorLineStr.match(/src[\\,/]main.*:([0-9]*):([0-9]*):(.*)/i);
                    }else{
                        regexpResult = errorLineStr.match(/[\\,/]main.*:([0-9]*):([0-9]*):(.*)/i);
                    }

                    if (regexpResult){
                        let lineNumber = regexpResult[1];
                        let columnNumber = regexpResult[2];
                        let message = regexpResult[3].trim();

                        //this is simplified structure just for info, not used, can be removed
                        errorLineInfoList.push({
                            lineNumber: lineNumber,
                            columnNumber: columnNumber,
                            message: message
                        });

                        //output structure for graphlang web IDE
                        if (!errorLinesByLineNumbers[lineNumber]) errorLinesByLineNumbers[lineNumber] = [];
                        if (!errorLinesByLineNumbers[lineNumber][message]) errorLinesByLineNumbers[lineNumber][message] = [];
                        errorLinesByLineNumbers[lineNumber][message].push(columnNumber);
                    }
                }
                console.log(errorLineInfoList);
            }   //end platformio error embedded output

            /*
             *  Follows errors evaluation to be able interactive highlight place on diagram where error occurs.
             */

            //ASSIGN OBJECTS ON CANVAS TO EACH ERROR
            GraphLang.Utils.TranslateToGeneralCodeObj.initTranslateBuffers();
            GraphLang.Utils.TranslateToGeneralCodeObj.translateCanvasToCode({
                canvas: appCanvas,
                translateTerminalsDeclaration: true,
                compileErrorLines: errorLinesByLineNumbers,
                codeLinesOffset: GraphLang.Utils.TranslateToGeneralCodeObj.getCurrentTranslateLineOffset(),
            });

            /*
             *  I wanted to use for (let obj in ...) but it doesn't seems to get indexes as line number, don't know why in Utils this is running and here no.
             *      - therefore using this approach using normal loop to index array, non defined elements are undefined
             */
            for (let k = 0; k < errorLinesByLineNumbers.length; k++) {
                errorObj = errorLinesByLineNumbers[k];
                if (errorObj === null || errorObj === undefined) continue;

                let outputMsg = "";
                let errorMessages = Object.getOwnPropertyNames(errorObj);
                for (let message of errorMessages) {
                    if (message == "length") continue;
                    if (message !== "sourceObjects") {
                        /*
                         *  This will put together message for user
                         */
                        outputMsg += `<b>compile error (line ${k}):</b>&nbsp;${message}<br/>`;
                    } else {
                        /*
                         *  Here are accessed problematic objects
                         */
                        for (let errorCanvasObj of errorObj["sourceObjects"]) {
                            // errorCanvasObj.setStroke(4).setColor("#b43500");                         //this will set stroke for each error object in stacktrace
                            outputMsg += `<span onclick="GraphLang.Utils.animateBlinkObject(appCanvas, '${errorCanvasObj.getId()}', {color: '#b43500'}, (obj) => obj.setStroke(0))"><b>&nbsp;&nbsp;&nbsp;&nbsp;CLICK TO LOCATE: ${errorCanvasObj.NAME}&nbsp;&nbsp;-->&nbsp;&nbsp;${errorCanvasObj.getId()}</b></span><br/>`;
                        }
                    }
                }
                document.querySelector("#generatedContent").insertAdjacentHTML(
                    'afterbegin',
                    `<span>${outputMsg}</span><hr/>`
                );
            }
        }   //end compile error lines evaluation

        //put extracted information into output ajax structure
        ajaxResponse.compileErrorByLineNumbers = errorLinesByLineNumbers;
        console.log(ajaxResponse);

        /*********************************************************************************************************
         *  REFRESH BREAKPOINTS and WATCH from code into #breakpointList, #variablesWatch
         *********************************************************************************************************/
        GraphLang.Debugger.Cpp.refreshBreakpointList();
        GraphLang.Debugger.Cpp.refreshWatchList();

        /*
         *  Resolve promise using standard linux return codes 0 = OK, 1 and more = FAILURE
         */
        if (compileCommandOutputObj.status === 0) {
            resolve(ajaxResponse);
        }else{
            reject(ajaxResponse);
        }
    });
}

/**
 *  @async
 *  @method debugSchematic
 *  @memberOf GraphLang.Debugger.Cpp
 *  @description This will set breakpoints into loaded code, load coad and run it.
 */
GraphLang.Debugger.Cpp.debugSchematic = async function(options = null){
    console.log(`debug schematic button clicked`);

    /*
     *  This will uncheck rewrite ID for compilation due for debugging there is needed to have in generated code original code with original IDs
     */
    var codeRewriteIdHtmlElement = document.querySelector("#codeRewriteIdFlag");
    if (codeRewriteIdHtmlElement) codeRewriteIdHtmlElement.checked = false;

    /*
     *  ATTENTION, WE SUPPOSE THAT Compile button was clicked first.
     *  This will run debugger, there are 2 different platforms:
     *      - desktop run: gdb <filename>  ...run gdb through python layer
     *      - embedded run platformio debugger
     */
    let currentCodeTemplate = await GraphLang.Utils.getProjectCodeTemplate();
    if (currentCodeTemplate === "desktop"){
        await GraphLang.Debugger.Cpp.debugSchematicDesktop(options);
    }else if (currentCodeTemplate === "embedded"){
        await GraphLang.Debugger.Cpp.debugSchematicEmbedded(options)
    }else{
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<span>ERROR: Unknown code template "${currentCodeTemplate}", cannot debug schematic!</span><br/><hr/>\n`);
    }
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Cpp
 * @param {Object} options
 * @return {Promise<void>}
 */
GraphLang.Debugger.Cpp.debugSchematicDesktop = async function(options = null){
    document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `START DEBUGGING DESKTOP APP<hr/>`);

    /*
     *  First compile current schematic
     */
    let ajaxResponse = await GraphLang.Debugger.Cpp.compileCurrentNode();

    /*
     *  Here MUST BE WAITING TILL GDB is fully initialized, it takes time!
     */
    let startDebuggerServerResult = await GraphLang.Debugger.Cpp.startDebuggerServer();
    document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `start desktop debugger server result: ${startDebuggerServerResult}<hr/>`);

    let compiledFileFullPath = ajaxResponse.outputFileAbsolutePath.replaceAll('\\', '\\\\');
    await GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`file ${compiledFileFullPath}`);

    /*
     *  Check there is breakpoint list variable from CPP translate process.
     */
    if (GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList()){
        //each() doesn't await async callbacks, use for cycle so breakpoints are set one by one before "start"
        for (const breakpointObj of GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList().asArray()){
            await GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`b ${breakpointObj.lineNumber}`);
        }
    }

    await GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`start`);
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Cpp
 * @param {Object} options
 * @return {Promise<unknown>}
 */
GraphLang.Debugger.Cpp.debugSchematicEmbedded = async function(options = null){
    return new Promise(async (resolve, reject) => {
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `START DEBUGGING EMBEDDED APP<hr/>`);

        /*
         *  First compile current schematic
         */
        let ajaxResponse = await GraphLang.Debugger.Cpp.compileCurrentNode();

        /*
         *  Here MUST BE WAITING TILL GDB is fully initialized, it takes time!
         */
        let platformioResult = await GraphLang.Debugger.Cpp.startDebuggerServer();
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `Platformio result: ${platformioResult}<hr/>`);

        /*
         *  Check there is breakpoint list variable from CPP translate process.
         */
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>Start setting breakpoints to code<pre/><hr/>");
        if (GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList()){
            GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList().each(function(breakpointIndex, breakpointObj){
                let gdbCommand = `b main.cpp:${breakpointObj.lineNumber}`;  //main.cpp:lineNumber IS SUPER IMPORTANT, tried without it but it put breakpoint into arduino mangled main.cpp file, this is working

                document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<pre>automatic set breakpoint using command: ${gdbCommand}</pre><hr/>`);
                GraphLang.Debugger.Cpp.sendMessageAndAddToLog(gdbCommand);
            });
        }
    });
}

/**
 *  @memberOf GraphLang.Debugger.Cpp
 *  @description Send message to GDB debugger to get wire variable value, evaluate output message and try to put it's value on screen on wire.
 */
GraphLang.Debugger.Cpp.debugGetWireValue = function(options = null){
    return new Promise(async (resolve, reject) => {
        console.log(`> GraphLang.Debugger.Cpp.debugGetWireValue - executed`);
        if (options){
            let codeTemplate = await GraphLang.Utils.getProjectCodeTemplate();

            let wireName = options.objectVariableName; //newer implementation using option parameter with wire name which must be pushed from compiler

            /*  WAY 0 - Intial experiment, this will not be used, left it here for now just to show how to obtain wire value from GDB
             *  This is first way, but this output structure is too complex
             */
            // GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`print ${wireName}`);

            let wireValue = "NOT EVALUATED!";
            // let wireDatatype = appCanvas.getLine(options.objectId).getSource().getUserData().datatype;
            let wireDatatype = appCanvas.getLine(options.objectId).getDatatype();

            /*
             *  ARRAY - gdb output for array is too long and tells user nothing, therefore there is just its datatype displayed
             *  ie. Array<int>, Array<Array<string>>, nothing is sent to gdb
             */
            let wireArrayDatatype = GraphLang.Debugger.Cpp.getWireArrayDatatype(appCanvas.getLine(options.objectId));
            if (wireArrayDatatype !== null){
                resolve(wireArrayDatatype);
                return;
            }

            //extract wire value from response based on its datatype, for number it's easy for string little more complicated
            if (wireDatatype === "string"){

                // /*
                //  *  WAY 1 - using too complex output for string
                //  *  This is example output from GDB from python:
                //         [
                //           {
                //             "type": "result",
                //             "message": "done",
                //             "payload": {
                //               "value": "{_M_dataplus = {> = {> = {}, }, _M_p = 0x5ffda0 \"AAABBB\"}, _M_string_length = 6, {_M_local_buf = \"AAABBB\\000\\000\\\"\\322`\\254\\376\\177\\000\", _M_allocated_capacity = 72852346847553}}"
                //             },
                //             "token": null,
                //             "stream": "stdout"
                //           }
                //         ]
                //  *
                //  */
                //
                //     /*
                //      *  This will evaluate expression and return address where variable is stored along its value
                //      *  Here try to extract value from output payload and put it's value on screen on wire
                //      *
                //      *  Output parsing is done in provided callback function.
                //      */
                //     let gdbOutputStr = await GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`-data-evaluate-expression ${wireName}`)
                //
                //     console.log(`> parsing gdb output`);
                //     console.log(gdbOutputStr);
                //
                //     let gdbOutputJson = JSON.parse(gdbOutputStr);
                //     if (gdbOutputJson[0].payload.value === undefined){ resolve("__undefined__"); }
                //
                //     const valueString = gdbOutputJson[0].payload.value;
                //     let wireValue = "NOT EVALUATED!";
                //
                //     // Use a regular expression to match the string inside the quotes
                //     const regex = /"([^"]*)"/; // This will match the string between quotes
                //     const match = valueString.match(regex);
                //
                //     if (match && match[1]) {
                //         wireValue = match[1]; // "AAABBB"
                //         document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>>" + wireValue + "<pre/><hr/>");
                //     } else {
                //         document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>> no wire value extracted!<pre/><hr/>");
                //     }

                /*  WAY 2 - simpler way to get string value only directly from gdb using command
                 *        - this will print just string value also char[] value, tested in msys2 in gdb
                 */
                let gdbOutputStr = await GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`printf "%s",${wireName}.c_str()`);
                let gdbOutputJson = JSON.parse(gdbOutputStr);
                for (const key in gdbOutputJson) {
                    if (gdbOutputJson[key].type == "console") {
                        wireValue = gdbOutputJson[key].payload;
                    }
                }

            }else{
                /*
                 *  This will evaluate expression and return address where variable is stored along its value
                 *  Here try to extract value from output payload and put it's value on screen on wire
                 *
                 *  Output parsing is done in provided callback function.
                 */
                let gdbOutputStr = "";
                if (codeTemplate === "desktop"){
                    /*
                     *  Reading variable value using gbd command, tested on raspberrypi
                     */
                    gdbOutputStr = await GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`-data-evaluate-expression ${wireName}`)

                    console.log(`> parsing gdb output`);
                    console.log(gdbOutputStr);

                    let gdbOutputJson = JSON.parse(gdbOutputStr);
                    if (gdbOutputJson[0].payload.value === undefined){ resolve("__undefined__"); }

                    wireValue = gdbOutputJson[0].payload.value;
                }else if (codeTemplate === "embedded"){
                    /*
                     *  Reading variable value using platformio gbd, tested on nucleo-64 board
                     */
                    gdbOutputStr = await GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`print ${wireName}`);

                    console.log(`> parsing gdb output`);
                    console.log(gdbOutputStr);

                    let gdbOutputJson = JSON.parse(gdbOutputStr);
                    if (gdbOutputJson[0].payload === undefined){ resolve("__undefined__"); }

                    try {
                        /*
                         *  manualy tested catching platfomrio gdb output from print using regular expression, output is in form: "$3 = ...something..."
                         */
                        wireValue = (gdbOutputJson[0].payload).match(/\$.*=\s(.*)/)[1].trim();
                    }catch(e){
                        /*
                         *  it seems that during stepping on first try there is response with breakpoint line number, so try one more time
                         */
                        try {
                            gdbOutputStr = await GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`print ${wireName}`);
                            let gdbOutputJson = JSON.parse(gdbOutputStr);
                            if (gdbOutputJson[0].payload === undefined) {
                                resolve("__undefined__");
                            }
                            wireValue = (gdbOutputJson[0].payload).match(/\$.*=\s(.*)/)[1].trim();
                        }catch(e){
                            throw new Error(`Error during reading watch, trying to evaluate value from platformio gdb: ${gdbOutputStr}`);
                        }
                    }
                } else{
                    throw new Error(`Cannot handle codeTemplate: "${codeTemplate}"`);
                }

                document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>> no wire datatype recognized, gdb value response:\n" + wireValue + "<pre/><hr/>");
            }

            /*
             *  RESULT - resolve with string value which will be displayed on wire in GraphLang Schematic Editor
             */
            resolve(wireValue);  //return received data
        }else{
            console.log(`> GraphLang.Debugger.Cpp.debugGetWireValue - no input options provided`);
            reject("no options provided");
        }
    });
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @param {draw2d.Connection} wireObj - wire
 * @return {string|null} array datatype description for user ie. "Array<int>", "Array<Array<string>>" or null if wire doesn't carry array
 * @description Wire carries array when it goes out of array node (node.isArray() === true) or when its datatype is C++ vector
 * (ie. array going through tunnel or out of ArrayIndex from 2D array). Array node output port has just item datatype, vector is
 * converted into Array<...> notation.
 */
GraphLang.Debugger.Cpp.getWireArrayDatatype = function(wireObj){
    if (!wireObj) return null;

    let wireDatatype = String(wireObj.getDatatype() || "").trim();
    let vectorToArray = (datatype) => datatype.replace(/(std::)?vector\s*</g, "Array<").replace(/\s+/g, "");

    //C++ vector datatype, ie. vector<vector<string>> -> Array<Array<string>>
    if (/(std::)?vector\s*</.test(wireDatatype)) return vectorToArray(wireDatatype);

    //wire going out of array node, its port has just array item datatype
    let sourceNode = wireObj.getSource() ? wireObj.getSource().getParent() : null;
    if (sourceNode && typeof sourceNode.isArray === "function" && sourceNode.isArray() === true){
        return `Array<${wireDatatype.replace(/\*+$/, "") || "?"}>`;
    }

    return null;
}

/**
 *  @memberOf GraphLang.Debugger.Cpp
 *  @param {Object}   watchObj    - info about breakpoint which should contain these attributes: objectId {string}
 *  @param {string}   wireValue   - value which will be placed as label on wire
 *  @param {boolean}  doAnimation - default true, indicate if label after placement on wire should blink for moment to be more easily recognized
 *  @description Put label on wire on screen if node is opened on main screen.
 */
GraphLang.Debugger.Cpp.putWireValueOnScreen = function(watchObj, wireValue, doAnimation = true) {
    //check input watch object if is right and if wire was found
    if (watchObj === null || !(typeof watchObj === "object" && typeof watchObj.objectId === "string")){
        console.log(`> putWireValueOnScreen - entered - input parameter watchObj is not object or watchObj.objectId is not string`);
        return;
    }
    console.log(`> putWireValueOnScreen - entered - using appCanvas to search object id: ${watchObj.objectId}`);
    let wireObj = appCanvas.getLine(watchObj.objectId);
    if (wireObj === undefined || wireObj === null){
        console.log(`> putWireValueOnScreen - entered - wire not found`);
        return;
    }

    //delete all watch labels placed on wire, they are recognized based on userData.isDebugWatchObject flag
    wireObj.getChildren().each(function(childIndex, childObj){
        if (childObj.userData && childObj.userData.isDebugWatchObject){
            wireObj.remove(childObj);
        }
    });

    //add new label with current value
    let labelWithWireValueRef = new draw2d.shape.basic.Label({
        text: wireValue,
        bgColor: "#ffffff",
        color: "#63a1ff",
        userData: {isDebugWatchObject: true}    //this indicates that this object is for watch
    });
    wireObj.add(
        labelWithWireValueRef,
        new draw2d.layout.locator.ManhattanMidpointLocator()
    );

    //if flag set to do animation there will be blinking of text label
    if (doAnimation){
        GraphLang.Utils.animateBlinkObject(wireObj, labelWithWireValueRef.getId());
    }
},

/**
 *  @method breakpointAnimateDotAlongWire
 *  @memberOf GraphLang.Debugger.Cpp
 *  @param {Object}   breakpointObj - info about breakpoint which should contain these attributes: objectId {string}
 *  @description Infinite animation of dot along wire, this will highlight wire during debugging when breakpoint was reached. Breakpoint object must be set on wire, this will do nothing
 *  in case that breakpoint is set on figure.
 */
GraphLang.Debugger.Cpp.breakpointAnimateDotAlongWire = function(breakpointObj) {
    //check input breakpoint object if is right and if wire was found
    if (breakpointObj === null || !(typeof breakpointObj === "object" && typeof breakpointObj.objectId === "string")){
        console.log(`> breakpointAnimateDotAlongWire - entered - input parameter breakpointObj is not object or breakpointObj.objectId is not ID string`);
        return;
    }
    console.log(`> breakpointAnimateDotAlongWire - entered - ${breakpointObj.objectId}`);
    let wireObj = appCanvas.getLine(breakpointObj.objectId);
    if (wireObj === undefined || wireObj === null){
        console.log(`> breakpointAnimateDotAlongWire - entered - wire not found`);
        return;
    }

    //remove previous dots on this wire so animations never pile up
    GraphLang.Debugger.Cpp.breakpointAnimateDotAlongWireDeleteAll(wireObj);

    GraphLang.Utils.animateDotAlongWire(wireObj, {userData: {isDebugBreakpointAnimated: true}});

    //register stop function, dot is last added child of wire
    let dotObj = null;
    wireObj.getChildren().each(function(childIndex, childObj){
        if (childObj.userData && childObj.userData.isDebugBreakpointAnimated) dotObj = childObj;
    });
    GraphLang.Debugger.Cpp.activeBreakpointAnimations.push({
        objectId: wireObj.getId(),
        stop: () => {
            if (dotObj){
                try { dotObj.stopTimer(); } catch (e) {}
                try { dotObj.off("timer"); } catch (e) {}
            }
            GraphLang.Debugger.Cpp.breakpointAnimateDotAlongWireDeleteAll(wireObj);
        }
    });
}

/**
 * List of currently running breakpoint highlight animations, each item is {objectId: string, stop: function}, stop() stops
 * timer and puts object back into its original state. Used to reliably clear all breakpoint animations.
 * @memberOf GraphLang.Debugger.Cpp
 * @var {Array}
 */
GraphLang.Debugger.Cpp.activeBreakpointAnimations = [];

/**
 *  @method breakpointAnimateDotAlongWireDeleteAll
 *  @memberOf GraphLang.Debugger.Cpp
 *  @param {Object}   wireObj - wire connection object
 *  @description Delete all red dots assigned to wire which are moving along wire from source to target
 */
GraphLang.Debugger.Cpp.breakpointAnimateDotAlongWireDeleteAll = function(wireObj) {
    if (wireObj === undefined || wireObj === null){
        console.log(`> breakpointAnimateDotAlongWireDeleteAll - entered - wire not found`);
        return;
    }

    //find all debug red dots on wires and stops them, collect them first as removing while iterating skips items
    let dotsToRemove = [];
    wireObj.getChildren().each(function(childIndex, childObj){
        if (childObj.userData && childObj.userData.isDebugBreakpointAnimated) dotsToRemove.push(childObj);
    });
    for (let childObj of dotsToRemove){
        try { childObj.stopTimer(); } catch (e) {}      //without this the timer keeps running even after removal
        try { childObj.off("timer"); } catch (e) {}
        wireObj.remove(childObj);
    }
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @param {Object} breakpointObj
 * @param {string} breakpointObj.objectId
 */
GraphLang.Debugger.Cpp.breakpointAnimateNodeBlinking = function(breakpointObj) {
    //check input breakpoint object if is right and if wire was found
    if (breakpointObj === null || !(typeof breakpointObj === "object" && typeof breakpointObj.objectId === "string")){
        console.log(`> breakpointAnimateNodeBlinking - entered - input parameter breakpointObj is not object or breakpointObj.objectId is not ID string`);
        return;
    }
    console.log(`> breakpointAnimateNodeBlinking - entered - ${breakpointObj.objectId}`);
    let nodeObj = appCanvas.getFigure(breakpointObj.objectId);
    if (nodeObj === undefined || nodeObj === null){
        console.log(`> breakpointAnimateNodeBlinking - entered - node not found`);
        return;
    }

    /*
     *  Own blinking, GraphLang.Utils.animateBlinkObject() with blinkForever was used before but it overwrote node userData
     *  (so stop never recognized node), never stopped timer and left node half transparent -> animation got stuck.
     *  Here original state is saved and stop function registered which restores it.
     */
    GraphLang.Debugger.Cpp.breakpointAnimateNodeBlinkingStop(nodeObj);

    let originalAlpha = typeof nodeObj.getAlpha === "function" ? nodeObj.getAlpha() : 1;
    let originalStroke = typeof nodeObj.getStroke === "function" ? nodeObj.getStroke() : null;
    let toggle = true;

    let timerHandler = function(){
        nodeObj.setAlpha(toggle ? 0.3 : originalAlpha);
        if (typeof nodeObj.setStroke === "function") nodeObj.setStroke(toggle ? 4 : (originalStroke === null ? 0 : originalStroke));
        toggle = !toggle;
    };
    nodeObj.on("timer", timerHandler);
    nodeObj.startTimer(250);

    nodeObj.isDebugBreakpointAnimated = true;
    GraphLang.Debugger.Cpp.activeBreakpointAnimations.push({
        objectId: nodeObj.getId(),
        stop: () => {
            try { nodeObj.stopTimer(); } catch (e) {}
            try { nodeObj.off("timer", timerHandler); } catch (e) {}
            nodeObj.setAlpha(originalAlpha);
            if (typeof nodeObj.setStroke === "function" && originalStroke !== null) nodeObj.setStroke(originalStroke);
            nodeObj.isDebugBreakpointAnimated = false;
        }
    });
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @param nodeObj
 * @description Stops breakpoint blinking of node (if it is blinking) and puts node into original state.
 */
GraphLang.Debugger.Cpp.breakpointAnimateNodeBlinkingStop = function(nodeObj) {
    if (nodeObj === undefined || nodeObj === null){
        console.log(`> breakpointAnimateNodeBlinkingStop - entered - node not found`);
        return;
    }

    let remaining = [];
    for (let animation of GraphLang.Debugger.Cpp.activeBreakpointAnimations){
        if (animation.objectId === nodeObj.getId()){
            try { animation.stop(); } catch (e) { console.warn(e); }
        }else{
            remaining.push(animation);
        }
    }
    GraphLang.Debugger.Cpp.activeBreakpointAnimations = remaining;
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @description Stops all breakpoint animations (blinking nodes, dots moving along wires) and put objects into original state.
 */
GraphLang.Debugger.Cpp.breakpointAnimateStopAll = function() {
    //stop all registered animations, they restore original state of objects
    for (let animation of GraphLang.Debugger.Cpp.activeBreakpointAnimations){
        try { animation.stop(); } catch (e) { console.warn(e); }
    }
    GraphLang.Debugger.Cpp.activeBreakpointAnimations = [];

    //delete leftover animated dots from all wires (ie. when schematic was reloaded and registry lost references)
    appCanvas.getLines().each((wireIndex, wireObj) => {
        GraphLang.Debugger.Cpp.breakpointAnimateDotAlongWireDeleteAll(wireObj);
    });
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @param {string} gdbResponseStr - raw string received from python layer
 * @return {Array} list of gdb MI records, empty array if response is not gdb JSON list
 */
GraphLang.Debugger.Cpp.parseGdbResponse = function(gdbResponseStr){
    try {
        let parsed = JSON.parse(gdbResponseStr);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @param {Array} gdbRecords - parsed gdb MI records
 * @return {Object|null} payload of last "*stopped" async record or null
 */
GraphLang.Debugger.Cpp.findStoppedRecord = function(gdbRecords){
    let stopped = null;
    for (let record of gdbRecords){
        if (record.type === "notify" && record.message === "stopped") stopped = record.payload || {};
    }
    return stopped;
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @var {boolean}
 * @description True while step to next breakpoint is running, prevents concurrent gdb commands which would mix up responses.
 */
GraphLang.Debugger.Cpp.stepToNextBreakpointRunning = false;

/**
 *  @async
 *  @memberOf GraphLang.Debugger.Cpp
 *  @description Continue program in GDB until it hits next breakpoint, find which object in schematic is responsible
 *  for that code line, stop all current breakpoint animations and highlight that object.
 *      1. send "-exec-continue" and wait for "*stopped" record (poll gdb if program still runs)
 *      2. stopped.bkptno -> gdb breakpoint original line (from -break-list) -> GraphLang breakpoint list item
 *      3. if nothing found use stopped frame line and search object which generated that code line
 *      4. stop all animations, highlight object (wire: dot moving along, node: blinking)
 *      5. if there are watches on canvas renew their values (see renewWatchValues())
 *  @return {Promise<Object>} {status: "breakpoint"|"exited"|"stopped"|"error", lineNumber, breakpointInfo, watchValues}
 */
GraphLang.Debugger.Cpp.stepToNextBreakpoint = async function(){
    let result = await GraphLang.Debugger.Cpp.continueToNextBreakpoint();

    /*
     *  Program is paused, renew values of all watches on canvas, done after step finished (busy flag cleared) so gdb
     *  commands are not mixed. Skipped silently when there is no watch on canvas.
     */
    if (["breakpoint", "stopped"].includes(result.status)){
        let hasWatch = false;
        appCanvas.getLines().each((wireIndex, wireObj) => {
            if (wireObj.getUserData() && wireObj.getUserData().isSetWatch) hasWatch = true;
        });
        if (hasWatch) result.watchValues = await GraphLang.Debugger.Cpp.renewWatchValues();
    }

    return result;
}

/**
 *  @async
 *  @memberOf GraphLang.Debugger.Cpp
 *  @description Continue in GDB until next breakpoint and highlight responsible object, without renewing watch values.
 *  Used by stepToNextBreakpoint(), see its description.
 *  @return {Promise<Object>} {status: "breakpoint"|"exited"|"stopped"|"running"|"busy"|"error", lineNumber, breakpointInfo}
 */
GraphLang.Debugger.Cpp.continueToNextBreakpoint = async function(){
    let log =(msg) => document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<span style="background-color: #e0ffe0"><b>step to next breakpoint:</b> ${msg}</span><br/><hr/>\n`);

    if (GraphLang.Debugger.Cpp.stepToNextBreakpointRunning || GraphLang.Debugger.Cpp.renewWatchValuesRunning){
        log("debugger busy, click ignored");
        return {status: "busy"};
    }
    if (!(GraphLang.Debugger.websocket && GraphLang.Debugger.websocket.readyState === WebSocket.OPEN)){
        log("websocket not opened, click on debug schematic first");
        return {status: "error"};
    }

    let stepButton = document.querySelector('button[name="stepToNextBreakpointButton"]');
    GraphLang.Debugger.Cpp.stepToNextBreakpointRunning = true;
    if (stepButton) stepButton.disabled = true;

    try {
        /*
         *  1. continue and wait for program to stop
         */
        let records = GraphLang.Debugger.Cpp.parseGdbResponse(await GraphLang.Debugger.Cpp.sendMessageAndAddToLog('-exec-continue'));
        for (let record of records){
            if (record.type === "result" && record.message === "error"){
                let errorMsg = record.payload && record.payload.msg ? record.payload.msg : JSON.stringify(record.payload);
                log(`gdb error: ${errorMsg}`);
                return {status: "error", message: errorMsg};
            }
        }

        let stopped = GraphLang.Debugger.Cpp.findStoppedRecord(records);
        const MAX_POLLS = 60;  //pygdbmi reads ~1s per command, so this is about one minute
        for (let poll = 0; stopped === null && poll < MAX_POLLS; poll++){
            //harmless command allowed while target runs, gives python layer another read window to catch "*stopped"
            records = GraphLang.Debugger.Cpp.parseGdbResponse(await GraphLang.Debugger.Cpp.sendMessageAndAddToLog('-gdb-show confirm'));
            stopped = GraphLang.Debugger.Cpp.findStoppedRecord(records);
        }
        if (stopped === null){
            log("program is still running, no breakpoint hit yet");
            return {status: "running"};
        }

        let reason = stopped.reason || "";
        if (reason.startsWith("exited")){
            GraphLang.Debugger.Cpp.breakpointAnimateStopAll();
            log(`PROGRAM EXITED (${reason}${stopped["exit-code"] ? ", exit code " + stopped["exit-code"] : ""})`);
            return {status: "exited"};
        }

        let frameLine = stopped.frame && stopped.frame.line ? parseInt(stopped.frame.line) : -1;

        /*
         *  2. map gdb breakpoint number to line used in "b <line>" command, gdb can move breakpoint to next code line
         *     (ie. programStart 27 -> 28) therefore stopped frame line can differ from GraphLang breakpoint list line
         */
        let requestedLine = -1;
        if (stopped.bkptno){
            let breakListRecords = GraphLang.Debugger.Cpp.parseGdbResponse(await GraphLang.Debugger.Cpp.sendMessageAndAddToLog('-break-list'));
            for (let record of breakListRecords){
                if (record.type !== "result" || !record.payload || !record.payload.BreakpointTable) continue;
                for (let bkpt of record.payload.BreakpointTable.body || []){
                    if (String(bkpt.number) === String(stopped.bkptno)){
                        let match = /:([0-9]+)\s*$/.exec(bkpt["original-location"] || "");
                        if (match) requestedLine = parseInt(match[1]);
                    }
                }
            }
        }

        let breakpointInfo = null;
        let breakpointList = GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList();
        if (breakpointList){
            for (let breakpointObj of breakpointList.asArray()){
                if (requestedLine > -1 && breakpointObj.lineNumber == requestedLine) breakpointInfo = breakpointObj;
            }
            if (breakpointInfo === null){
                for (let breakpointObj of breakpointList.asArray()){
                    if (breakpointObj.lineNumber == frameLine) breakpointInfo = breakpointObj;
                }
            }
        }

        /*
         *  3. not a GraphLang breakpoint (ie. user typed "b ..." manually), find object which generated this code line
         */
        if (breakpointInfo === null && frameLine > -1){
            let codeLineResponsibleObject = await GraphLang.Utils.TranslateToGeneralCodeObj.getObjectWhichGenerateCodeAtLine(frameLine);
            if (codeLineResponsibleObject){
                breakpointInfo = {
                    lineNumber: frameLine,
                    objectId: codeLineResponsibleObject.getId(),
                    type: codeLineResponsibleObject instanceof draw2d.Connection ? "wire" : "node",
                    parentId: null,
                    parentName: null
                };
            }
        }

        /*
         *  4. clear all animations and highlight responsible object
         */
        GraphLang.Debugger.Cpp.breakpointAnimateStopAll();

        if (breakpointInfo === null){
            log(`stopped at line ${frameLine} (${reason}), can't find object responsible for this line`);
            return {status: "stopped", lineNumber: frameLine, breakpointInfo: null};
        }

        if (breakpointInfo.type === "programStart"){
            log(`PROGRAM AT BEGINNING (line ${frameLine})`);
            return {status: "breakpoint", lineNumber: frameLine, breakpointInfo: breakpointInfo};
        }

        //if breakpoint is in subnode load it into main canvas
        if (breakpointInfo.parentName){
            let nodeWithBreakpointObj = eval("new " + breakpointInfo.parentName + "();");
            GraphLang.Utils.displayContents(nodeWithBreakpointObj.jsonDocument);
        }

        if (appCanvas.getLine(breakpointInfo.objectId)){
            GraphLang.Debugger.Cpp.breakpointAnimateDotAlongWire(breakpointInfo);
        }else{
            GraphLang.Debugger.Cpp.breakpointAnimateNodeBlinking(breakpointInfo);
        }

        log(`stopped at line ${frameLine} (gdb breakpoint ${stopped.bkptno || "-"}), highlighted ${breakpointInfo.type} ${breakpointInfo.objectId}`);
        return {status: "breakpoint", lineNumber: frameLine, breakpointInfo: breakpointInfo};

    } catch (e) {
        console.error(e);
        log(`ERROR: ${e && e.message ? e.message : e}`);
        return {status: "error", message: String(e)};
    } finally {
        GraphLang.Debugger.Cpp.stepToNextBreakpointRunning = false;
        if (stepButton) stepButton.disabled = false;
    }
}

/**
 *  @async
 *  @memberOf GraphLang.Debugger.Cpp
 *  @description ???This will blink on current code location, it scans source code, ask debugger
 *  on which line it is and find it in schematic and focus screen on it, should work on nested nodes.
 */
GraphLang.Debugger.Cpp.getCodeLocation = async function(){

    await GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`frame`, async function(response) {
        let gdbMessages = JSON.parse(response);
        let lineNumber = -1;
        let breakpointInfo = {};

        //get current line
        for (let k = 0; k < gdbMessages.length; k++) {
            let result = /:([0-9]+)/g.exec(gdbMessages[k].payload);
            if (result) lineNumber = result[1];
        }

        //log info
        GraphLang.Debugger.Cpp.logResponse({data: `code current line: ${lineNumber}, breakpoint: ${JSON.stringify(breakpointInfo)}`});

        //check if current line is on some breakpoint
        GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList().each(function(breakpointIndex, breakpointObj){
            if (breakpointObj.lineNumber == lineNumber){
                breakpointInfo = breakpointObj;
            }
        });

        //breakpoint was not found, need to evaluate where code is from generator and create breakpointInfo on the fly
        if (Object.keys(breakpointInfo).length == 0 && lineNumber > -1){
            let codeLineResponsibleObject = await GraphLang.Utils.TranslateToGeneralCodeObj.getObjectWhichGenerateCodeAtLine(lineNumber);

            /*  This is structure of breakpointInfo object:
                 {
                    lineNumber: currentLineNumber,
                    objectId:   figureObj.getId(),
                    type:       "node" || "wire",
                    parentId:   SUB_NODE_ID || null,
                    parentName: SUB_NODE_NAME || null
                 }
             */
            if (codeLineResponsibleObject === undefined || codeLineResponsibleObject === null){
                document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<span>can't find object responsible for breakpoint</span><br/><hr/>\n");
                return;
            }

            breakpointInfo.lineNumber = lineNumber;
            breakpointInfo.objectId = codeLineResponsibleObject.getId();
            breakpointInfo.objectParentId = null;       //TODO: developing now, testing on top most canvas now
            breakpointInfo.objectParentName = null;     //TODO: developing now, testing on top most canvas now
        }

        // line number -1 means program is not executed
        if (lineNumber == -1){
            GraphLang.Debugger.Cpp.logResponse({data: `PROGRAM NOT EXECUTED`});
            return;
        }

        if (breakpointInfo.type == "programStart"){
            GraphLang.Debugger.Cpp.logResponse({data: `PROGRAM AT BEGINNING`});
            return;
        }

        //TODO: NEED TO REMEMBER WHAT IS MAIN CANVAS, WHAT SCHEMATIC WAS THERE LOADED!!!

        //go through all lines and nodes and stop animation
        GraphLang.Debugger.Cpp.breakpointAnimateStopAll();

        //if breakpoint is in subnode load it into main canvas
        if (breakpointInfo.parentName != null){
            let nodeWithBreakpointObj = eval("new " + breakpointInfo.parentName + "();")
            GraphLang.Utils.displayContents(nodeWithBreakpointObj.jsonDocument);                //this will load schematic into main appCanvas
        }

        GraphLang.Debugger.Cpp.breakpointAnimateDotAlongWire(breakpointInfo); //animate dot along wire
        GraphLang.Debugger.Cpp.breakpointAnimateNodeBlinking(breakpointInfo); //animate blinking node
    });
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @param {Object} options
 * @param {string} options.targetElementId
 * @descritption Open debugger in target element, start websocket, creates GUI for user ie. buttons to control debugging process and also output for messages from GDB and others sources (it creates HTML element for messages)
 */
GraphLang.Debugger.Cpp.open = function(options = null){
    /*
     *  DEBUGGER BUTTON GRAPHICS
     *      Inline SVG icons (24x24 viewBox, drawn with currentColor so they follow button text color).
     *      Any of them can be replaced by base64 image, ie. '<img src="data:image/png;base64,iVBORw0..." width="20" height="20"/>'
     */
    const SVG_START = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
    const SVG_END = '</svg>';
    const COLOR_GREEN = '#2e7d32';
    const COLOR_RED = '#d32f2f';

    //svg images for buttons
    const BUTTON_IMAGE_START_DEBUGGER = SVG_START + '<rect x="3" y="3" width="18" height="7" rx="1.5"/><rect x="3" y="14" width="18" height="7" rx="1.5"/><path d="M7 6.5h.01M7 17.5h.01"/><path d="M14 4.8v3.4l3-1.7z" fill="' + COLOR_GREEN + '" stroke="' + COLOR_GREEN + '" stroke-width="1.2"/>' + SVG_END;
    const BUTTON_IMAGE_OPEN_WEBSOCKET = SVG_START + '<path d="M9 2v6M15 2v6"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v5"/>' + SVG_END;
    const BUTTON_IMAGE_RUN_CURRENT = SVG_START + '<path d="M6 3.5v17L20 12z" fill="' + COLOR_GREEN + '" stroke="' + COLOR_GREEN + '"/>' + SVG_END;
    const BUTTON_IMAGE_COMPILE = SVG_START + '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' + SVG_END;
    const BUTTON_IMAGE_SEND_MESSAGE = SVG_START + '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>' + SVG_END;
    const BUTTON_IMAGE_CLEAR_MESSAGES = SVG_START + '<path d="m7 21-4.3-4.3a1 1 0 0 1 0-1.4l10-10a1 1 0 0 1 1.4 0l5.6 5.6a1 1 0 0 1 0 1.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/>' + SVG_END;
    const BUTTON_IMAGE_DEBUG_SCHEMATIC = SVG_START + '<rect x="5" y="7" width="8" height="13" rx="4"/><path d="M6.5 7.5 5 4M11.5 7.5 13 4M5 12H2M5 17H2.5M13 12h1"/><path d="M9 11v7"/><path d="M15.5 13v8l6-4z" fill="' + COLOR_GREEN + '" stroke="' + COLOR_GREEN + '" stroke-width="1.5"/>' + SVG_END;
    const BUTTON_IMAGE_CONTINUE = SVG_START + '<path d="M5 4v16" stroke-width="2.6"/><path d="M10 4v16l11-8z" fill="' + COLOR_GREEN + '" stroke="' + COLOR_GREEN + '"/>' + SVG_END;
    const BUTTON_IMAGE_END_DEBUGGING = SVG_START + '<rect x="5" y="5" width="14" height="14" rx="1.5" fill="' + COLOR_RED + '" stroke="' + COLOR_RED + '"/>' + SVG_END;
    const BUTTON_IMAGE_FRAME = SVG_START + '<rect x="3" y="3" width="18" height="5" rx="1"/><rect x="3" y="10" width="18" height="5" rx="1" fill="currentColor"/><rect x="3" y="17" width="18" height="4" rx="1"/>' + SVG_END;
    const BUTTON_IMAGE_GET_CODE_LOCATION = SVG_START + '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>' + SVG_END;
    const BUTTON_IMAGE_KILL_PROGRAM = SVG_START + '<circle cx="12" cy="12" r="10" stroke="' + COLOR_RED + '"/><path d="m15 9-6 6M9 9l6 6" stroke="' + COLOR_RED + '"/>' + SVG_END;
    const BUTTON_IMAGE_RANDOM_NUMBER = SVG_START + '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.3" fill="currentColor"/><circle cx="16" cy="8" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="8" cy="16" r="1.3" fill="currentColor"/><circle cx="16" cy="16" r="1.3" fill="currentColor"/>' + SVG_END;
    const BUTTON_IMAGE_BREAKPOINT_LIST = SVG_START + '<circle cx="5" cy="6" r="2.2" fill="' + COLOR_RED + '" stroke="' + COLOR_RED + '"/><circle cx="5" cy="12" r="2.2" fill="' + COLOR_RED + '" stroke="' + COLOR_RED + '"/><circle cx="5" cy="18" r="2.2" fill="' + COLOR_RED + '" stroke="' + COLOR_RED + '"/><path d="M10 6h11M10 12h11M10 18h11"/>' + SVG_END;
    const BUTTON_IMAGE_WATCH_LIST = SVG_START + '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>' + SVG_END;
    const BUTTON_IMAGE_STEP_FORWARD = SVG_START + '<path d="M3 14a8 8 0 0 1 15-3.9"/><path d="M19 4v6h-6"/><circle cx="12" cy="19" r="2.2" fill="currentColor"/>' + SVG_END;
    const BUTTON_IMAGE_INFO_BREAKPOINT = SVG_START + '<circle cx="12" cy="12" r="10" fill="' + COLOR_RED + '" stroke="' + COLOR_RED + '"/><path d="M12 11v6" stroke="#fff" stroke-width="2.4"/><path d="M12 7.5h.01" stroke="#fff" stroke-width="2.8"/>' + SVG_END;
    const BUTTON_IMAGE_RENEW_WATCH_VALUES = SVG_START + '<path d="M1.5 10s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6S1.5 10 1.5 10z"/><circle cx="11" cy="10" r="2.5"/><path d="M14 21a5 5 0 0 0 8-3.5" stroke="' + COLOR_GREEN + '"/><path d="M22 21.5v-4h-4" stroke="' + COLOR_GREEN + '"/>' + SVG_END;
    const BUTTON_IMAGE_STEP_TO_NEXT_BREAKPOINT = SVG_START + '<path d="M2 12h11"/><path d="m9 8 4 4-4 4"/><circle cx="18.5" cy="12" r="3.5" fill="' + COLOR_RED + '" stroke="' + COLOR_RED + '"/>' + SVG_END;

    //use text for buttons
    // const BUTTON_IMAGE_START_DEBUGGER = 'start debugger';
    // const BUTTON_IMAGE_OPEN_WEBSOCKET = 'open websocket';
    // const BUTTON_IMAGE_RUN_CURRENT = 'run current schematic';
    // const BUTTON_IMAGE_COMPILE = 'compile';
    // const BUTTON_IMAGE_SEND_MESSAGE = 'send';
    // const BUTTON_IMAGE_CLEAR_MESSAGES = 'clear';
    // const BUTTON_IMAGE_DEBUG_SCHEMATIC = 'debug schematic';
    // const BUTTON_IMAGE_CONTINUE = 'continue';
    // const BUTTON_IMAGE_END_DEBUGGING = 'end debugging';
    // const BUTTON_IMAGE_FRAME = 'frame';
    // const BUTTON_IMAGE_GET_CODE_LOCATION = 'get code location';
    // const BUTTON_IMAGE_KILL_PROGRAM = 'kill program';
    // const BUTTON_IMAGE_RANDOM_NUMBER = 'random number';
    // const BUTTON_IMAGE_BREAKPOINT_LIST = 'breakpoint list';
    // const BUTTON_IMAGE_WATCH_LIST = 'watch list';
    // const BUTTON_IMAGE_RENEW_WATCH_VALUES = 'renew watch values';
    // const BUTTON_IMAGE_STEP_FORWARD = 'step forward';
    // const BUTTON_IMAGE_STEP_TO_NEXT_BREAKPOINT = 'step to next breakpoint';
    // const BUTTON_IMAGE_INFO_BREAKPOINT = 'info breakpoint';

    //erase target element content
    document.querySelector('#'+options.targetElementId).innerHTML = "";

    //add control elements for debugging, button text is displayed as tooltip when mouse hover over it
    document.querySelector('#'+options.targetElementId).insertAdjacentHTML(
        'afterbegin',
        `<b>Interactive debugger:</b><br/><br />
        <b>C++:</b><br />
        <button class="debugger_icon_button" name="startDebuggerServerButton" type="button" title="Start debugger" onclick="GraphLang.Debugger.Cpp.startDebuggerServer()">${BUTTON_IMAGE_START_DEBUGGER}</button>
        <button class="debugger_icon_button" name="createWebsocketButton" type="button" title="Open websocket" onclick="GraphLang.Debugger.Cpp.createWebSocket()">${BUTTON_IMAGE_OPEN_WEBSOCKET}</button>
        <button class="debugger_icon_button" name="runCurrentNode" type="button" title="Run current" onclick="GraphLang.Debugger.Cpp.runCurrentNode()">${BUTTON_IMAGE_RUN_CURRENT}</button>
        <button class="debugger_icon_button" name="compileCurrentNode" type="button" title="Compile" onclick="GraphLang.Debugger.Cpp.compileCurrentNode()">${BUTTON_IMAGE_COMPILE}</button>
        <span class="debugger_icon_delimiter"></span>
        <button class="debugger_icon_button" name="setBreakpointsButton" type="button" title="Debug schematic" onclick="GraphLang.Debugger.Cpp.debugSchematic()">${BUTTON_IMAGE_DEBUG_SCHEMATIC}</button>
        <button class="debugger_icon_button" name="nextStepButton" type="button" title="Continue" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('c')">${BUTTON_IMAGE_CONTINUE}</button>
        <button class="debugger_icon_button" name="stepForwardButton" type="button" title="Step forward" onclick="GraphLang.Debugger.Cpp.stepForward({stepUntilBreakpoint: false})">${BUTTON_IMAGE_STEP_FORWARD}</button>
        <button class="debugger_icon_button" name="stepToNextBreakpointButton" type="button" title="Step to next breakpoint" onclick="GraphLang.Debugger.Cpp.stepToNextBreakpoint()">${BUTTON_IMAGE_STEP_TO_NEXT_BREAKPOINT}</button>
        <button class="debugger_icon_button" name="endDebuggingButton" type="button" title="End debugging" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('end debugging')">${BUTTON_IMAGE_END_DEBUGGING}</button>
        <button class="debugger_icon_button" name="killProgramButton" type="button" title="Kill program" onclick="GraphLang.Debugger.Cpp.killProgram()">${BUTTON_IMAGE_KILL_PROGRAM}</button>
        <span class="debugger_icon_delimiter"></span>
        <button class="debugger_icon_button" name="frameButton" type="button" title="Frame" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('frame')">${BUTTON_IMAGE_FRAME}</button>
        <button class="debugger_icon_button" name="getCodeLocationButton" type="button" title="Get code location" onclick="GraphLang.Debugger.Cpp.getCodeLocation()">${BUTTON_IMAGE_GET_CODE_LOCATION}</button>
        <button class="debugger_icon_button" name="codeBreakpointListButton" type="button" title="Breakpoint list" onclick="GraphLang.Debugger.Cpp.refreshBreakpointList()">${BUTTON_IMAGE_BREAKPOINT_LIST}</button>
        <button class="debugger_icon_button" name="codeWatchListButton" type="button" title="Watch list" onclick="GraphLang.Debugger.Cpp.refreshWatchList()">${BUTTON_IMAGE_WATCH_LIST}</button>
        <button class="debugger_icon_button" name="renewWatchValuesButton" type="button" title="Renew watch values" onclick="GraphLang.Debugger.Cpp.renewWatchValues()">${BUTTON_IMAGE_RENEW_WATCH_VALUES}</button>
        <button class="debugger_icon_button" name="gdbBreakpointListButton" type="button" title="Info breakpoint (GDB)" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('info breakpoint')">${BUTTON_IMAGE_INFO_BREAKPOINT}</button>
        <button class="debugger_icon_button" name="randomNumberButton" type="button" title="Test random number" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('get random number')">${BUTTON_IMAGE_RANDOM_NUMBER}</button>
        <br/>
        ${GraphLang.Debugger.Python ? GraphLang.Debugger.Python.getButtonsHtml() : ""}
        <b>General debugger message:</b><br />
        <input id="cmdStr" name="cmdStr" type="text" value="" title="Message for debugger" />
        <button class="debugger_icon_button" name="sendButton" type="button" title="Send message" onclick="GraphLang.Debugger.Cpp.onclickSendButton()">${BUTTON_IMAGE_SEND_MESSAGE}</button>
        <button class="debugger_icon_button" name="clearDebugMesaages" type="button" title="Clear messages" onclick="document.querySelector('#generatedContent').innerHTML=''">${BUTTON_IMAGE_CLEAR_MESSAGES}</button>
        <hr/>
        <div id="generatedContent"></div>`
    );
}

/******************************************************************************************************************************
 *  BREAKPONTS - Functions to open breakpoint list to see variables current value
 ******************************************************************************************************************************/

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @description Clear all breakpoints in right debugger list and create new one which match current canvas.
 * @param funcParams
 */
GraphLang.Debugger.Cpp.refreshBreakpointList = function(funcParams){
    console.log(`REFRESHING BREAKPOINT LIST obtained during C++ code translation, breakpoint list content:`);
    console.log(GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList());
    document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<span>&gt; breakpoint list button clicked</span><br/><hr/>\n");

    let outputElement = document.querySelector("#breakpointList");

    // for (let breakpointRow of document.querySelectorAll("#breakpointList span")){
    //     breakpointRow.remove();
    // }

    let htmlStr = "";
    htmlStr += "<b>Code breakpoint list:</b>";
    htmlStr += "<input type='button' value='REFRESH BREAKPOINTS' onclick='GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList()' />";
    htmlStr += "<br /><br/>";
    outputElement.innerHTML = htmlStr;

    GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList().each(function(breakpointIndex, breakpointObj){
        outputElement.insertAdjacentHTML("beforeend", `<span onclick="GraphLang.Utils.animateBlinkObject(appCanvas, '${breakpointObj.objectId}')">${JSON.stringify(breakpointObj)}</span><br /><hr />`)
    });
}

GraphLang.Debugger.Cpp.toggleBreakpointList = function(funcParams = null){
    alert("display breakpoint on canvas - not implemented yet");
}



/******************************************************************************************************************************
 *  Functions to open watch list to see variables current value
 ******************************************************************************************************************************/


/**
 * @memberOf GraphLang.Debugger.Cpp
 * @param funcParams
 */
GraphLang.Debugger.Cpp.toggleVariablesWatch = function(funcParams = null){
    alert('watch open - not implemented yet');
    let outputElement = document.querySelector("#variablesWatch");
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @param funcParams
 */
GraphLang.Debugger.Cpp.refreshWatchList = function(funcParams = null){
    console.log(`REFRESHING WATCH LIST obtained during C++ code translation, watch list content:`);
    console.log(GraphLang.Utils.TranslateToGeneralCodeObj.getWatchList());
    document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<span>&gt; watch list button clicked</span><br/><hr/>\n");

    let outputElement = document.querySelector("#variablesWatch");

    outputElement.innerHTML = "<b>Variables watch list:</b>&nbsp;&nbsp;&nbsp;&nbsp;<input name='readAllWatchButton' type='button' value='READ ALL WATCH' onclick='GraphLang.Debugger.Cpp.readAllWatchValues()' /><br /><br/>";

    GraphLang.Utils.TranslateToGeneralCodeObj.getWatchList().each(function(watchIndex, watchObj){
        outputElement.insertAdjacentHTML("beforeend", `<span onclick='GraphLang.Debugger.Cpp.readGdbWatchValueAndDisplayOnScreen(${JSON.stringify(watchObj)})'>${JSON.stringify(watchObj)}</span><br /><hr />`)
    });
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Cpp@method readGdbWatchValueAndDisplayOnScreen
 * @param {Object}  watchObj    - JSON watch object
 * @param {bool}    doAnimation - if true label placed on wire blink for moment to show where it is placed on screen
 * @returns {Promise<void>}
 */
GraphLang.Debugger.Cpp.readGdbWatchValueAndDisplayOnScreen = async function(watchObj, doAnimation = true) {
    /*
     *  This handles wire value, read and display.
     *
     *  TODO: Function name is general, so need to add also case when watch type is 'node' or something else
     */
    let wireValue = await GraphLang.Debugger.Cpp.debugGetWireValue(watchObj)
    await GraphLang.Debugger.Cpp.putWireValueOnScreen(watchObj, wireValue, doAnimation);
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Cpp
 * @description Go through current all watch list and read their values from GDB and put them on screen.
 * @param {Object} funcParams
 */
GraphLang.Debugger.Cpp.readAllWatchValues = async function(funcParams = null) {
    GraphLang.Debugger.Cpp.logResponse({data: `> readAllWatchValues - entered`});

    //there is await used and each() doesn't support await therefore it must be done using for cycle
    for (const watchObj of GraphLang.Utils.TranslateToGeneralCodeObj.getWatchList().asArray()){
        await GraphLang.Debugger.Cpp.readGdbWatchValueAndDisplayOnScreen(watchObj, true);
    }

    GraphLang.Debugger.Cpp.logResponse({data: `> readAllWatchValues - finished`});
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @description Remove all watch value labels from all wires on canvas.
 * @return {number} count of removed labels
 */
GraphLang.Debugger.Cpp.clearWatchValuesFromCanvas = function(){
    let removedCount = 0;
    appCanvas.getLines().each((wireIndex, wireObj) => {
        let labelsToRemove = [];
        wireObj.getChildren().each((childIndex, childObj) => {
            if (childObj.userData && childObj.userData.isDebugWatchObject) labelsToRemove.push(childObj);
        });
        for (let labelObj of labelsToRemove){
            try { labelObj.stopTimer(); } catch (e) {}     //label can be still blinking after renew
            try { labelObj.off("timer"); } catch (e) {}
            wireObj.remove(labelObj);
            removedCount++;
        }
    });
    return removedCount;
}

/**
 * @async
 * @memberOf GraphLang.Debugger.Cpp
 * @description Kill currently debugged program in GDB, remove all watch values and breakpoint highlights from canvas.
 * GDB and python layer keep running, so program can be started again (ie. by "debug schematic").
 * @return {Promise<Object>} {status: "killed"|"notRunning"|"busy"|"error", message}
 */
GraphLang.Debugger.Cpp.killProgram = async function(){
    let log = (msg) => document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<span style="background-color: #ffe0e0"><b>kill program:</b> ${msg}</span><br/><hr/>\n`);

    if (GraphLang.Debugger.Cpp.stepToNextBreakpointRunning || GraphLang.Debugger.Cpp.renewWatchValuesRunning){
        log("debugger busy, click ignored");
        return {status: "busy"};
    }

    //canvas cleanup is done always, also when websocket is not opened, user wants to have clear schematic
    let cleanupCanvas = () => {
        GraphLang.Debugger.Cpp.breakpointAnimateStopAll();
        return GraphLang.Debugger.Cpp.clearWatchValuesFromCanvas();
    };

    if (!(GraphLang.Debugger.websocket && GraphLang.Debugger.websocket.readyState === WebSocket.OPEN)){
        let removed = cleanupCanvas();
        log(`websocket not opened, nothing to kill, ${removed} watch value(s) removed from canvas`);
        return {status: "error", message: "websocket not opened"};
    }

    let result = {status: "killed", message: ""};
    try {
        let records = GraphLang.Debugger.Cpp.parseGdbResponse(await GraphLang.Debugger.Cpp.sendMessageAndAddToLog('kill'));
        for (let record of records){
            if (record.type === "result" && record.message === "error"){
                result.message = record.payload && record.payload.msg ? record.payload.msg : JSON.stringify(record.payload);
                result.status = result.message.toLowerCase().search("not being run") > -1 ? "notRunning" : "error";
            }
        }
    } catch (e) {
        result = {status: "error", message: String(e)};
    }

    let removed = cleanupCanvas();
    if (result.status === "killed") log(`PROGRAM KILLED, ${removed} watch value(s) removed from canvas`);
    else if (result.status === "notRunning") log(`program is not running, ${removed} watch value(s) removed from canvas`);
    else log(`gdb error: ${result.message}, ${removed} watch value(s) removed from canvas`);

    return result;
}

/**
 * @memberOf GraphLang.Debugger.Cpp
 * @var {boolean}
 * @description True while watch values are renewed, prevents concurrent gdb commands which would mix up responses.
 */
GraphLang.Debugger.Cpp.renewWatchValuesRunning = false;

/**
 * @async
 * @memberOf GraphLang.Debugger.Cpp
 * @description Look on current canvas for wires with watch set (userData.isSetWatch), read their current values from GDB
 * and update value labels on wires. Wires are taken from canvas, not from translated watch list, so it works also for
 * watches set after compilation and for wires inside loops. Variable which can't be read at current program location
 * (ie. out of scope) is displayed as "n/a".
 * @return {Promise<Array>} list of {objectId, objectVariableName, value}
 */
GraphLang.Debugger.Cpp.renewWatchValues = async function(){
    let log = (msg) => document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', `<span style="background-color: #e0ecff"><b>renew watch values:</b> ${msg}</span><br/><hr/>\n`);

    if (GraphLang.Debugger.Cpp.renewWatchValuesRunning || GraphLang.Debugger.Cpp.stepToNextBreakpointRunning){
        log("debugger busy, click ignored");
        return [];
    }
    if (!(GraphLang.Debugger.websocket && GraphLang.Debugger.websocket.readyState === WebSocket.OPEN)){
        log("websocket not opened, click on debug schematic first");
        return [];
    }

    //collect wires with watch from canvas
    let watchWires = [];
    appCanvas.getLines().each((wireIndex, wireObj) => {
        if (wireObj.getUserData() && wireObj.getUserData().isSetWatch) watchWires.push(wireObj);
    });
    if (watchWires.length === 0){
        log("no watch set on any wire on canvas");
        return [];
    }

    let renewButton = document.querySelector('button[name="renewWatchValuesButton"]');
    GraphLang.Debugger.Cpp.renewWatchValuesRunning = true;
    if (renewButton) renewButton.disabled = true;

    let results = [];
    try {
        //one by one, gdb answers must not be mixed
        for (let wireObj of watchWires){
            let watchObj = {
                lineNumber: null,
                objectId: wireObj.getId(),
                objectVariableName: wireObj.getVariableName(),
                type: "wire",
                parentId: null,
                parentName: null
            };

            let wireValue;
            try {
                wireValue = await GraphLang.Debugger.Cpp.debugGetWireValue(watchObj);
            } catch (e) {
                console.warn(e);
                wireValue = undefined;
            }
            if (wireValue === undefined || wireValue === null || wireValue === "__undefined__" || wireValue === "NOT EVALUATED!"){
                wireValue = "n/a";
            }

            GraphLang.Debugger.Cpp.putWireValueOnScreen(watchObj, String(wireValue), true);
            results.push({objectId: watchObj.objectId, objectVariableName: watchObj.objectVariableName, value: String(wireValue)});
        }

        log(`${results.length} watch value(s) renewed<br/>` + results.map(r => `&nbsp;&nbsp;${r.objectVariableName} = ${r.value}`).join("<br/>"));
    } finally {
        GraphLang.Debugger.Cpp.renewWatchValuesRunning = false;
        if (renewButton) renewButton.disabled = false;
    }

    return results;
}

/**
 *  @async
 *  @memberOf GraphLang.Debugger.Cpp
 *  @description This will sen AJAX request to PHP server to run compile process of current generated code.
 */
GraphLang.Debugger.Cpp.runCurrentNode = async function(options = null){
    console.log(`run current node button clicked`);

    /*
     *  TODO getting current node and sent it to server
     */
    let url_string = window.location.href;
    let url = new URL(url_string);
    let projectId = url.searchParams.get("projectId");
    let outputFileName = "main.exe";

    /*
     *  ATTENTION THIS IS USING getCppCode4() which is template for C++ desktop code
     */
    let nodeCodeContent = await GraphLang.Utils.TranslateToGeneralCodeObj.getCode(appCanvas, false);
    nodeCodeContent = GraphLang.Utils.toHex(nodeCodeContent);

    let nodeCodeAdditionalLibraries = "";
    if (GraphLang.Utils.TranslateToGeneralCodeObj.getLibrariesList()){
        nodeCodeAdditionalLibraries = GraphLang.Utils.TranslateToGeneralCodeObj.getLibrariesList().data.join();
    }

    /*
     *  Send AJAX request to server to compile code
     */
    let outputElement = document.querySelector('#generatedContent');
    outputElement.insertAdjacentHTML('afterbegin', "<pre/>> run current node button clicked<pre/><hr/>");
    let ajaxResponse = await GraphLang.Utils.serverAjaxPostSendReceive(
        ["q", "runProject"],
        ["projectId", projectId, "outputFileName", outputFileName, "nodeCodeContent", nodeCodeContent, "nodeCodeAdditionalLibraries", nodeCodeAdditionalLibraries],
        function(){
            outputElement.insertAdjacentHTML('afterbegin', `<pre/>> message: ${GLOBAL_AJAX_RESPONSE.message}\nerror: ${GLOBAL_AJAX_RESPONSE.errorMsg}\n<pre/><hr/>`);
        }
    );
    console.log(ajaxResponse);

    /*
     *  Return output
     */
    return ajaxResponse;
}

/**
 *  @async
 *  @memberOf GraphLang.Debugger.Cpp
 *  @description Do step in GDB and try to animate where application is at moment.
 *  In GDB stepping is done:
 *      step (s) - step to next instruction, stepping into subroutines
 *      next (n) - step over soubroutines
 */
GraphLang.Debugger.Cpp.stepForward = async function(options = null) {
    let stepUntilBreakpoint = true;

    if (typeof options === "object" && Object.hasOwn(options, "stepUntilBreakpoint")) stepUntilBreakpoint = options.stepUntilBreakpoint;

    if (stepUntilBreakpoint === true || (typeof stepUntilBreakpoint == "string" && (stepUntilBreakpoint.toLowerCase() === "t" || stepUntilBreakpoint == "true"))){
        await GraphLang.Debugger.Cpp.sendMessageAndAddToLog('c');
    }else{
        // await GraphLang.Debugger.Cpp.sendMessageAndAddToLog('s');
        await GraphLang.Debugger.Cpp.sendMessageAndAddToLog('next');
    }

    await GraphLang.Debugger.Cpp.getCodeLocation();
    await GraphLang.Debugger.Cpp.readAllWatchValues();
}
