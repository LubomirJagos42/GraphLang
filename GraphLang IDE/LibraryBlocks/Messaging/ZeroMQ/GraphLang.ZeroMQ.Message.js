/**
 *  @author LuboJ
 *  @description ZeroMQ message created from string.
 *  C++: zmq::message_t* (cppzmq), Python: bytes (string encoded as UTF-8), pyzmq sends bytes directly
 *  Shape is simple and editable in shape designer (init/createShapeElement/createSet are in shape designer format),
 *  translation helpers are in GraphLang.ZeroMQ.CommonParent.
 */
GraphLang.ZeroMQ.Message = GraphLang.ZeroMQ.CommonParent.extend({

    NAME: "GraphLang.ZeroMQ.Message",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // message_str
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#F307F3");
        port.setName("message_str");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "string";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // error_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#F3EC24");
        port.setName("error_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // message_ref
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 33.333333));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#00F3AA");
        port.setName("message_ref");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "zmq::message_t*";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // error_out
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 73.333333));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#F3DE22");
        port.setName("error_out");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        this.persistPorts=false;
    },

    createShapeElement : function(){
        var shape = this._super();
        this.originalWidth = 100;
        this.originalHeight= 60;
        return shape;
    },

    createSet: function(){
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L100,0 L100,60 L0,60");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Line
        shape = this.canvas.paper.path('M0,20L20,20');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,44L20,44');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,20L100,20');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,44L100,44');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'zeroMQ');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"zeroMQ","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Message');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"Message","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

    symbolPicture: "data:image/png;base64,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",

    jsonDocument: [],



    translateToCppCode: function(){
        let messageStrWireName = this.zmqInputWireName("message_str");
        if (messageStrWireName === null) return "//ERROR: GraphLang.ZeroMQ.Message input string not connected\n";

        let cCode = "";
        let messageVariableName = this.zmqVariableName("zmqMessage");
        cCode += `zmq::message_t* ${messageVariableName} = new zmq::message_t(${messageStrWireName}.begin(), ${messageStrWireName}.end());\n`;
        cCode += this.zmqAssignOutput("message_ref", messageVariableName, ";\n");
        cCode += this.zmqErrorPassThrough(";\n", "0");
        return cCode;
    },

    translateToPythonCode: function(){
        let messageStrWireName = this.zmqInputWireName("message_str");
        if (messageStrWireName === null) return "# ERROR: GraphLang.ZeroMQ.Message input string not connected\n";

        let pythonCode = "";
        let messageVariableName = this.zmqVariableName("zmqMessage");
        pythonCode += `${messageVariableName} = str(${messageStrWireName}).encode("utf-8")\n`;
        pythonCode += this.zmqAssignOutput("message_ref", messageVariableName, "\n");
        pythonCode += this.zmqErrorPassThrough("\n", "None");
        return pythonCode;
    },
});
