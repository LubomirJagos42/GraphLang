/**
 *  @author LuboJ
 *  @description ZeroMQ socket created in given context.
 *  Input mode is ZeroMQ socket type number (ZMQ_PAIR=0, ZMQ_PUB=1, ZMQ_SUB=2, ZMQ_REQ=3, ZMQ_REP=4, ZMQ_PULL=7, ZMQ_PUSH=8, ...),
 *  when not connected ZMQ_PUB is used.
 *  C++: zmq::socket_t* (cppzmq), Python: zmq.Socket (pyzmq)
 *  Shape is simple and editable in shape designer (init/createShapeElement/createSet are in shape designer format),
 *  translation helpers are in GraphLang.ZeroMQ.CommonParent.
 */
GraphLang.ZeroMQ.Socket = GraphLang.ZeroMQ.CommonParent.extend({

    NAME: "GraphLang.ZeroMQ.Socket",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // context_ref_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#16F3EC");
        port.setName("context_ref_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "zmq::context_t*";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // socket_mode_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 53.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#3769DE");
        port.setName("socket_mode_in");
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

        // socket_ref_out
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 33.333333));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#4DFAFF");
        port.setName("socket_ref_out");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "zmq::socket_t*";
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
        shape = this.canvas.paper.path('M0,32L20,32');
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
        shape = this.canvas.paper.text(0,0,'Socket');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"Socket","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

    symbolPicture: "data:image/png;base64,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",

    jsonDocument: [],



    translateToCppCode: function(){
        let contextWireName = this.zmqInputWireName("context_ref_in");
        if (contextWireName === null) return "//ERROR: GraphLang.ZeroMQ.Socket input context not connected\n";

        let cCode = "";
        let socketVariableName = this.zmqVariableName("zmqSocket");
        let modeWireName = this.zmqInputWireName("socket_mode_in");
        let socketMode = modeWireName !== null ? `(int)${modeWireName}` : "ZMQ_PUB";

        cCode += `zmq::socket_t* ${socketVariableName} = new zmq::socket_t(*${contextWireName}, ${socketMode});\n`;
        cCode += this.zmqAssignOutput("socket_ref_out", socketVariableName, ";\n");
        cCode += this.zmqErrorPassThrough(";\n", "0");
        return cCode;
    },

    translateToPythonCode: function(){
        let contextWireName = this.zmqInputWireName("context_ref_in");
        if (contextWireName === null) return "# ERROR: GraphLang.ZeroMQ.Socket input context not connected\n";

        let pythonCode = "";
        let socketVariableName = this.zmqVariableName("zmqSocket");
        let modeWireName = this.zmqInputWireName("socket_mode_in");
        let socketMode = modeWireName !== null ? `int(${modeWireName})` : "zmq.PUB";

        pythonCode += `${socketVariableName} = ${contextWireName}.socket(${socketMode})\n`;
        pythonCode += this.zmqAssignOutput("socket_ref_out", socketVariableName, "\n");
        pythonCode += this.zmqErrorPassThrough("\n", "None");
        return pythonCode;
    },
});
