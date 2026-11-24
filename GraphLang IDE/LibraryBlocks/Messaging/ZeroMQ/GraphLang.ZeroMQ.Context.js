/**
 *  @author LuboJ
 *  @description ZeroMQ context. Creates context with given number of I/O threads (default 1 when not connected).
 *  C++: zmq::context_t* (cppzmq), Python: zmq.Context (pyzmq)
 *  Shape is simple and editable in shape designer (init/createShapeElement/createSet are in shape designer format),
 *  translation helpers are in GraphLang.ZeroMQ.CommonParent.
 */
GraphLang.ZeroMQ.Context = GraphLang.ZeroMQ.CommonParent.extend({

    NAME: "GraphLang.ZeroMQ.Context",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // context_number
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("context_number");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "uint";
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

        // context_ref
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 33.333333));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#16F3EC");
        port.setName("context_ref");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "zmq::context_t*";
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
        shape = this.canvas.paper.text(0,0,'Context');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"Context","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

    symbolPicture: "data:image/png;base64,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",

    jsonDocument: [],



    translateToCppCode: function(){
        let cCode = "";
        let contextVariableName = this.zmqVariableName("zmqContext");
        let ioThreadsWireName = this.zmqInputWireName("context_number");

        if (ioThreadsWireName !== null) cCode += `zmq::context_t* ${contextVariableName} = new zmq::context_t(${ioThreadsWireName});\n`;
        else cCode += `zmq::context_t* ${contextVariableName} = new zmq::context_t(1);\n`;

        cCode += this.zmqAssignOutput("context_ref", contextVariableName, ";\n");
        cCode += this.zmqErrorPassThrough(";\n", "0");
        return cCode;
    },

    translateToPythonCode: function(){
        let pythonCode = "";
        let contextVariableName = this.zmqVariableName("zmqContext");
        let ioThreadsWireName = this.zmqInputWireName("context_number");

        if (ioThreadsWireName !== null) pythonCode += `${contextVariableName} = zmq.Context(int(${ioThreadsWireName}))\n`;
        else pythonCode += `${contextVariableName} = zmq.Context(1)\n`;

        pythonCode += this.zmqAssignOutput("context_ref", contextVariableName, "\n");
        pythonCode += this.zmqErrorPassThrough("\n", "None");
        return pythonCode;
    },
});
