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
     *  websocket recevied message handler
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

    GraphLang.Debugger.websocket.onclose = function(event){
        console.log(`Connection is CLOSED`);
        console.log(event);
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<span>CONNECTION CLOSED</span><br/><hr/>\n");
    };
}

GraphLang.Debugger.Cpp.logResponse = function(event){
    console.log(event.data);

    //document.querySelector('#generatedContent').append(event.data);
    //document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', event.data.replaceAll("\n","<br/>\n") + "<hr />");

    // document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre>" + event.data + "<pre/><hr/>");

    try {
        let jsonMsg = JSON.parse(event.data);
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre>" + JSON.stringify(jsonMsg, undefined, 2) + "<pre/><hr/>");
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

GraphLang.Debugger.Cpp.sendMessageAndAddToLog = function(message = null, callbackFunction = null){
    GLOBAL_DEBUGGER_CPP_RESPONSE = null;

    //if message is not provided in parameter look into <input> tag
    if (!message) message = document.querySelector('#cmdStr').value;

    GLOBAL_DEBUGGER_CPP_WEBSOCKET_CALLBACK = callbackFunction;
    GraphLang.Debugger.websocket.send(message);

    document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>>" + message + "<pre/><hr/>");
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
 *  @description This will start python script which acts as debugger server, aking interface between GDB and websocket and send and receive messages betweeen them.
 */
GraphLang.Debugger.Cpp.startDebuggerServer = function(options = null){
    let url_string = window.location.href;
    let url = new URL(url_string);
    let projectId = url.searchParams.get("projectId");

    console.log(`start CPP debugger button clicked, projectId: ${projectId}`);
    GraphLang.Utils.serverAjaxPostSendReceive(
        ["q", "runPythonCppDebugServer", "projectId", projectId],
        null,
        function(){
            document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>> start debugger server button clicked<pre/><hr/>");
        }
    );
}

/**
 *  @method compileCurrentNode
 *  @description This will sen AJAX request to PHP server to run compile process of current generated code.
 */
GraphLang.Debugger.Cpp.compileCurrentNode = async function(options = null){
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
    let nodeCodeContent = GraphLang.Utils.getCppCode4(appCanvas, false);
    nodeCodeContent = GraphLang.Utils.toHex(nodeCodeContent);

    /*
     *  Send AJAX request to server to compile code
     */
    let ajaxResponse = await GraphLang.Utils.serverAjaxPostSendReceive(
        ["q", "compileProject"],
        ["projectId", projectId, "outputFileName", outputFileName, "nodeCodeContent", nodeCodeContent],
        function(){
            let outputElement = document.querySelector('#generatedContent');
            let compilationOutput = JSON.parse(GLOBAL_AJAX_RESPONSE.compileCommandOutput);
            outputElement.insertAdjacentHTML('afterbegin', "<pre/>> compile current node button clicked<pre/><hr/>");
            outputElement.insertAdjacentHTML('afterbegin', `<pre/>> message: ${GLOBAL_AJAX_RESPONSE.message}\nerror: ${GLOBAL_AJAX_RESPONSE.errorMsg}\ncompilation output:\n\tstatus: ${compilationOutput.status}\n\tmessage: ${compilationOutput.message}<pre/><hr/>`);
        }
    );

    return ajaxResponse;
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
     *  First compile current schematic
     */
    let ajaxResponse = await GraphLang.Debugger.Cpp.compileCurrentNode();

    /*
     *  ATTENTION, WE SUPPOSE THAT Compile button was clicked first.
     */
    let compiledFileFullPath = ajaxResponse.outputFileAbsolutePath.replaceAll('\\', '\\\\');
    GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`file ${compiledFileFullPath}`);

    /*
     *  Check there is breakpoint list variable from CPP translate process.
     */
    if (translateToCppCodeBreakpointList){
        translateToCppCodeBreakpointList.each(function(breakpointIndex, breakpointObj){
            GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`b ${breakpointObj.lineNumber}`);
        });
    }

    GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`start`);
}

/**
 *  @method debugGetWireValue
 *  @description This will set breakpoints into loaded code, load coad and run it.
 */
GraphLang.Debugger.Cpp.debugGetWireValue = function(options = null){
    console.log(`debugGetWireValue executed`);
    if (options){
        let wireName = 'wire_' + options.wireId.replaceAll('-', '_');
        GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`print ${wireName}`);
    }else{
        console.log(`no options provided`);
    }
}

GraphLang.Debugger.Cpp.getCodeLocation = function(){
    function animateBlinkObject(obj){
        let errorOpacityToggle = true;
        let errorOpacityToggleCounter = 0;
        obj.on("timer", function(emitter){
            obj.attr({opacity: (errorOpacityToggle ? 0.1 : 1)});
            errorOpacityToggle = !errorOpacityToggle;
            errorOpacityToggleCounter++;
            if (errorOpacityToggleCounter > 6){
                obj.stopTimer();
                obj.attr({opacity: 1});
                errorOpacityToggleCounter = 0;
            }
        });
        obj.startTimer(120);
    }

    GraphLang.Debugger.Cpp.sendMessageAndAddToLog(`frame`, function(response) {
        let gdbMessages = JSON.parse(response);
        let lineNumber = -1;
        let breakpointInfo = {};

        //get current line
        for (let k = 0; k < gdbMessages.length; k++) {
            let result = /:([0-9]+)/g.exec(gdbMessages[k].payload);
            if (result) lineNumber = result[1];
        }

        //check if current line is on some breakpoint
        translateToCppCodeBreakpointList.each(function(breakpointIndex, breakpointObj){
            if (breakpointObj.lineNumber == lineNumber){
                breakpointInfo = breakpointObj;
            }
        });

        //log info
        GraphLang.Debugger.Cpp.logResponse({data: `code current line: ${lineNumber}, breakpoint: ${JSON.stringify(breakpointInfo)}`});

        //TODO: NEED TO REMEMBER WHAT IS MAIN CANVAS, WHAT SCHEMATIC WAS THERE LOADED!!!

        //if breakpoint is in subnode load it into main canvas
        if (breakpointInfo.parentName != null){
            let nodeWithBreakpointObj = eval("new " + breakpointInfo.parentName + "();")
            GraphLang.Utils.displayContents(nodeWithBreakpointObj.jsonDocument);                //this will load schematic into main appCanvas
        }

        let currentObj = appCanvas.getFigure(breakpointInfo.objectId);
        animateBlinkObject(currentObj);    //animate node to make visible where is breakpoint or scroll to it to make it visible
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
        <input name="compileCurrentNode" type="button" value="COMPILE" onclick="GraphLang.Debugger.Cpp.compileCurrentNode()" />
        <input id="cmdStr" name="cmdStr" type="text" value="" />
        <input name="sendButton" type="button" value="SEND MESSAGE" onclick="GraphLang.Debugger.Cpp.onclickSendButton()" />
        <input name="clearDebugMesaages" type="button" value="CLEAR MESSAGES" onclick="document.querySelector('#generatedContent').innerHTML=''" />
        <input name="setBreakpointsButton" type="button" value="DEBUG SCHEMATIC" onclick="GraphLang.Debugger.Cpp.debugSchematic()" />
        <input name="nextStepButton" type="button" value="CONTINUE" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('c')" />
        <input name="endDebuggingButton" type="button" value="END DEBUGGING" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('end debugging')" />
        <input name="frameButton" type="button" value="FRAME" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('frame')" />
        <input name="getCodeLocationButton" type="button" value="?" onclick="GraphLang.Debugger.Cpp.getCodeLocation()" />
        <input name="randomNumberButton" type="button" value="test random number" onclick="GraphLang.Debugger.Cpp.sendMessageAndAddToLog('get random number')" />
        <input name="codeBreakpointListButton" type="button" value="breakpoint list" onclick="GraphLang.Debugger.Cpp.refreshBreakpointList()" />
        <hr/>
        <div id="generatedContent"></div>`
    );
}





/**
 *  Functions to open breakpoint list to see variables current value
 */

GraphLang.Debugger.Cpp.refreshBreakpointList = function(funcParams){
    let outputElement = document.querySelector("#breakpointList");

    // for (let breakpointRow of document.querySelectorAll("#breakpointList span")){
    //     breakpointRow.remove();
    // }

    outputElement.innerHTML = "<b>Code breakpoint list:</b><br /><br/>";
    translateToCppCodeBreakpointList.each(function(breakpointIndex, breakpointObj){
        outputElement.insertAdjacentHTML("beforeend", `<span>${JSON.stringify(breakpointObj)}</span><br />`)
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
