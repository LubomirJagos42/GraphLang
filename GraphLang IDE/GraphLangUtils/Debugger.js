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

GraphLang.Debugger.Cpp.createWebSocket = function(options = null){
    let websocketHost = window.location.host ? window.location.host : "localhost";
    console.log("Connecting to websocket ws://"+ websocketHost +":"+ GraphLang.Debugger.websocketPort);
    GraphLang.Debugger.websocket = new WebSocket("ws://"+ websocketHost +":"+ GraphLang.Debugger.websocketPort);

    GraphLang.Debugger.websocket.onmessage = (event) => {
        console.log(event.data);
        //document.querySelector('#generatedContent').append(event.data);
        //document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', event.data.replaceAll("\n","<br/>\n") + "<hr />");
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>" + event.data + "<pre/><hr/>");
    };

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

/**
 * @param options
 * @description This function is tied to button and after click it try to send message to websocket port, if not opened try to reopen it.
 */
GraphLang.Debugger.Cpp.onclickSendButton = function(options = null){
    function sendMessageAndAddToLog(){
        let message = document.querySelector('#cmdStr').value;
        GraphLang.Debugger.websocket.send(message);
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>>" + message + "<pre/><hr/>");
    }

    console.log(`send button clicked`);
    if (GraphLang.Debugger.websocket.readyState === WebSocket.CLOSED){
        /*
         *  socket is close, trying to open it and as open function use send message to have smooth UI experience for user
         */
        console.warn(`re-open websocket`);
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>>trying to reopen connection<pre/><hr/>");
        createWebSocket({
            onopen: sendMessageAndAddToLog
        });
    }else if (GraphLang.Debugger.websocket.readyState === WebSocket.OPEN){
        sendMessageAndAddToLog();
    }else{
        document.querySelector('#generatedContent').insertAdjacentHTML('afterbegin', "<pre/>WEBSOCKET NOT OPENED<pre/><hr/>");
    }
}

/**
 * @param options - {targetElementId: string}
 * @descritption Open debugger in target element, start websocket.
 */
GraphLang.Debugger.Cpp.open = function(options = null){
    //erase target element content
    document.querySelector('#'+options.targetElementId).innerHTML = "";

    //add control elements for debugging
    document.querySelector('#'+options.targetElementId).insertAdjacentHTML(
        'afterbegin',
        `<input name="createWebsocketButton" type="button" value="OPEN WEBSOCKET" onclick="GraphLang.Debugger.Cpp.createWebSocket()" />
        <input name="sendButton" type="button" value="SEND MESSAGE" onclick="GraphLang.Debugger.Cpp.onclickSendButton()" />
        <input id="cmdStr" name="cmdStr" type="text" value="" />
        <input name="clearDebugMesaages" type="button" value="CLEAR MESSAGES" onclick="document.querySelector('#generatedContent').innerHTML=''" />
        <hr/>
        <div id="generatedContent"></div><div id="generatedContent"></div>`
    );
}


