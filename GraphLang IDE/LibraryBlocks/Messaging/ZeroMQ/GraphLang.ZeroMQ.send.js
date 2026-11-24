/**
 *  @author LuboJ
 *  @description Send ZeroMQ message through socket.
 *  C++: socket->send(*message, zmq::send_flags::none), Python: socket.send(message)
 *  Shape is simple and editable in shape designer (init/createShapeElement/createSet are in shape designer format),
 *  translation helpers are in GraphLang.ZeroMQ.CommonParent.
 */
GraphLang.ZeroMQ.send = GraphLang.ZeroMQ.CommonParent.extend({

    NAME: "GraphLang.ZeroMQ.send",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // socket_ref_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#4DFAFF");
        port.setName("socket_ref_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "zmq::socket_t*";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // message_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 53.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#00F3AA");
        port.setName("message_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "zmq::message_t*";
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
        shape = this.canvas.paper.text(0,0,'send');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"send","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

    symbolPicture: "data:image/png;base64,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",

    jsonDocument: [],



    translateToCppCode: function(){
        let socketWireName = this.zmqInputWireName("socket_ref_in");
        let messageWireName = this.zmqInputWireName("message_in");
        if (socketWireName === null || messageWireName === null) return "//ERROR: GraphLang.ZeroMQ.send inputs socket and message must be connected\n";

        let cCode = "";
        cCode += `${socketWireName}->send(*${messageWireName}, zmq::send_flags::none);\n`;     //message wire contains pointer, send() takes message itself
        cCode += this.zmqErrorPassThrough(";\n", "0");
        return cCode;
    },

    translateToPythonCode: function(){
        let socketWireName = this.zmqInputWireName("socket_ref_in");
        let messageWireName = this.zmqInputWireName("message_in");
        if (socketWireName === null || messageWireName === null) return "# ERROR: GraphLang.ZeroMQ.send inputs socket and message must be connected\n";

        let pythonCode = "";
        pythonCode += `${socketWireName}.send(${messageWireName})\n`;
        pythonCode += this.zmqErrorPassThrough("\n", "None");
        return pythonCode;
    },
});
