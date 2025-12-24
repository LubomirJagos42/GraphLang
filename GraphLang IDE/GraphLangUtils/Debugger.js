/*******************************************************************************
 *  Debugger.js by LuboJ
 */

/**
 *  @class GraphLang.Utils
 *  @description Base class for GraphLang utils
 */
GraphLang.Debugger = Class.extend({
    NAME: "GraphLang.Debuger",

    init:function(attr, setter, getter){
        this._super(attr, setter, getter);

    }
});

GraphLang.Debugger.Cpp = {};

GraphLang.Debugger.websocket = {};
GraphLang.Debugger.websocketPort = 8888;

GLOBAL_DEBUGGER_CPP_RESPONSE = null;
GLOBAL_DEBUGGER_CPP_WEBSOCKET_CALLBACK = null;

/**
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
 * @param options
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
 *  @method startDebuggerServer
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
         *  Rerecreate websocket as in endDebuggerServer there is created customized websocket.
         */
        GraphLang.Debugger.Cpp.createWebSocket();

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
            function () {
                clearInterval(intervalIdentifierForServerDebuggerToStart);
                document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>>debugger server RUNNING<pre/><hr/>");
            }
        );

        //For embedded target wait here till there is message from gdb: "PlatformIO: Initialization completed"
        let codeTemplate = await GraphLang.Utils.getProjectCodeTemplate();
        if (codeTemplate === "embedded") {
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
                    ) {
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
                    }
                } catch (e) {
                    document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>${e.message}<pre/><hr/>");
                }
            }, 2000);
        } else if (codeTemplate === "desktop") {
            resolve("debbuger running for desktop app");
        } else {
            reject(`undefined codeTemplate: ${codeTemplate}, python debugger layer running`);
        }
    });
}

/**
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
 *  @method compileCurrentNode
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
            }
        );

        /*
         *  Evaluate compilation output
         */
        let compileErrorLines = new draw2d.util.ArrayList();
        let errorLinesByLineNumbers = [];

        let compileCommandOutputStr = ajaxResponse.compileCommandOutput;
        // console.log(`--> compileCommandOutputStr:`);
        // console.log(compileCommandOutputStr);
        let compileCommandOutputObj = JSON.parse(compileCommandOutputStr);
        // console.log(`--> compileCommandOutputObj:`);
        // console.log(compileCommandOutputObj);
        if (compileCommandOutputObj.status == -1) {
            /*
             *  This was for previous g++ compile whne used as:
             *      > g++ -fdiagnostic-fomrat=json
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
            let compileErrorStr = compileCommandOutputObj.errorMsg;//.replaceAll('\\"', '"'); //.replaceAll('\\n', '\n').split('\n'); //THIS DOESN'T HAVE TO BE USED

            let compileErrorObj = null;
            try {
                compileErrorObj = JSON.parse(compileErrorStr);
                console.log(`--> compileErrorObj json answer from G++:`);
                console.log(compileErrorObj);
            } catch (e) {
                console.warn(`Error parsing compile error message: ${e.message}`);
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
                            outputMsg += `<span onclick="GraphLang.Utils.animateBlinkObject(appCanvas, '${errorCanvasObj.getId()}', {color: '#b43500'}, (obj) => obj.setStroke(0))">&nbsp;&nbsp;&nbsp;&nbsp;${errorCanvasObj.NAME}&nbsp;&nbsp;-->&nbsp;&nbsp;${errorCanvasObj.getId()}</span><br/>`;
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
         *  Return output
         */
        resolve(ajaxResponse);
    });
}

/**
 *  @method debugSchematic
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
    GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`file ${compiledFileFullPath}`);

    /*
     *  Check there is breakpoint list variable from CPP translate process.
     */
    if (GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList()){
        GraphLang.Utils.TranslateToGeneralCodeObj.getBreakpointList().each(function(breakpointIndex, breakpointObj){
            GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`b ${breakpointObj.lineNumber}`);
        });
    }

    GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`start`);
}

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
 *  @method debugGetWireValue
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
 *  @method putWireValueOnScreen
 *  @param {Object}   watchObj    - info about breakpoint which should contain these attributes: objectId {String}
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
 *  @param {Object}   breakpointObj - info about breakpoint which should contain these attributes: objectId {String}
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

    GraphLang.Utils.animateDotAlongWire(wireObj, {userData: {isDebugBreakpointAnimated: true}});
}

/**
 *  @method breakpointAnimateDotAlongWireDeleteAll
 *  @param {Object}   wireObj - wire connection object
 *  @description Delete all red dots assigned to wire which are moving along wire from source to target
 */
GraphLang.Debugger.Cpp.breakpointAnimateDotAlongWireDeleteAll = function(wireObj) {
    if (wireObj === undefined || wireObj === null){
        console.log(`> breakpointAnimateDotAlongWireDeleteAll - entered - wire not found`);
        return;
    }

    //find all debug red dots on wires and stops them
    wireObj.getChildren().each(function(childIndex, childObj){
        if (childObj.userData && childObj.userData.isDebugBreakpointAnimated){
            // childObj.off("timer");
            wireObj.remove(childObj);
        }
    });
}

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

    GraphLang.Utils.animateBlinkObject(nodeObj.getCanvas(), nodeObj.getId(), {userData: {isDebugBreakpointAnimated: true}}, null, true);
}

GraphLang.Debugger.Cpp.breakpointAnimateNodeBlinkingStop = function(nodeObj) {
    if (nodeObj === undefined || nodeObj === null){
        console.log(`> breakpointAnimateNodeBlinkingStop - entered - node not found`);
        return;
    }

    if (nodeObj.userData && nodeObj.userData.isDebugBreakpointAnimated){
        nodeObj.off("timer");
        //nodeObj.stopTimer();
    }
}

GraphLang.Debugger.Cpp.breakpointAnimateStopAll = function() {
    //delete animated dots from all wires
    appCanvas.getLines().each((wireIndex, wireObj) => {
        console.log(`> remove animated dot for wire id: ${wireObj.getId()}`);
        GraphLang.Debugger.Cpp.breakpointAnimateDotAlongWireDeleteAll(wireObj);
    });

    //delete all animated nodes for breakpoint
    appCanvas.getFigures().each((figureIndex, figureObj) => {
        console.log(`> remove blinking for figure id: ${figureObj.getId()}`);
        GraphLang.Debugger.Cpp.breakpointAnimateNodeBlinkingStop(figureObj);
    });
}

/**
 *  @method getCodeLocation
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
 * @method open
 * @param options - {targetElementId: string}
 * @descritption Open debugger in target element, start websocket, creates GUI for user ie. buttons to control debugging process and also output for messages from GDB and others sources (it creates HTML element for messages)
 */
GraphLang.Debugger.Cpp.open = function(options = null){
    //erase target element content
    document.querySelector('#'+options.targetElementId).innerHTML = "";

    //add control elements for debugging
    document.querySelector('#'+options.targetElementId).insertAdjacentHTML(
        'afterbegin',
        `<b>Interactive debugger:</b><br/><br />
        <input name="startDebuggerServerButton" type="button" value="START DEBUGGER" onclick="GraphLang.Debugger.Cpp.startDebuggerServer()" />
        <input name="createWebsocketButton" type="button" value="OPEN WEBSOCKET" onclick="GraphLang.Debugger.Cpp.createWebSocket()" />
        <input name="runCurrentNode" type="button" value="RUN CURRENT" onclick="GraphLang.Debugger.Cpp.runCurrentNode()" />
        <input name="compileCurrentNode" type="button" value="COMPILE" onclick="GraphLang.Debugger.Cpp.compileCurrentNode()" />
        <input id="cmdStr" name="cmdStr" type="text" value="" />
        <input name="sendButton" type="button" value="SEND MESSAGE" onclick="GraphLang.Debugger.Cpp.onclickSendButton()" />
        <input name="clearDebugMesaages" type="button" value="CLEAR MESSAGES" onclick="document.querySelector('#generatedContent').innerHTML=''" />
        <input name="setBreakpointsButton" type="button" value="DEBUG SCHEMATIC" onclick="GraphLang.Debugger.Cpp.debugSchematic()" />
        <input name="nextStepButton" type="button" value="CONTINUE" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('c')" />
        <input name="endDebuggingButton" type="button" value="END DEBUGGING" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('end debugging')" />
        <input name="frameButton" type="button" value="FRAME" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('frame')" />
        <input name="getCodeLocationButton" type="button" value="?" onclick="GraphLang.Debugger.Cpp.getCodeLocation()" />
        <input name="killProgramButton" type="button" value="KILL" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('kill')" />
        <input name="randomNumberButton" type="button" value="test random number" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('get random number')" />
        <input name="codeBreakpointListButton" type="button" value="breakpoint list" onclick="GraphLang.Debugger.Cpp.refreshBreakpointList()" />
        <input name="codeWatchListButton" type="button" value="watch list" onclick="GraphLang.Debugger.Cpp.refreshWatchList()" />
        <input name="stepForwardButton" type="button" value="step >" onclick="GraphLang.Debugger.Cpp.stepForward({stepUntilBreakpoint: false})" />
        <input name="gdbBreakpointListButton" type="button" value="info breakpoint" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('info breakpoint')" />
        <hr/>
        <div id="generatedContent"></div>`
    );
}





/**
 *  Functions to open breakpoint list to see variables current value
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





/**
 *  Functions to open watch list to see variables current value
 */
GraphLang.Debugger.Cpp.toggleVariablesWatch = function(funcParams = null){
    alert('watch open - not implemented yet');
    let outputElement = document.querySelector("#variablesWatch");
}

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
 * @method readGdbWatchValueAndDisplayOnScreen
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
 * @method readAllWatchValues
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
 *  @method runCurrentNode
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
    let nodeCodeContent = GraphLang.Utils.TranslateToGeneralCodeObj.getCode(appCanvas, false);
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
 *  @method stepForward
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
