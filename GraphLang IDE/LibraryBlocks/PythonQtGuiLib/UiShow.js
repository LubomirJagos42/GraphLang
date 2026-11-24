/**
 *  @author LuboJ
 *  @description Show widget (window) loaded from .ui file, window is passed to output so next nodes (ie. UiExec) run after it.
 *  Python (PySide6): window.show()
 *  Node has only python translation (no C/C++). Shape is simple and editable in shape designer
 *  (init/createShapeElement/createSet are in shape designer format), helpers are in PythonQtGuiLib.CommonParent.
 */
PythonQtGuiLib.UiShow = PythonQtGuiLib.CommonParent.extend({

    NAME: "PythonQtGuiLib.UiShow",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // window
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 53.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#2F8FD8");
        port.setName("window");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "QtUiObject";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // window_out
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 53.333333));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#2F8FD8");
        port.setName("window_out");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "QtUiObject";
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
        shape = this.canvas.paper.path('M0,32L20,32');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,32L100,32');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M30,16L70,16L70,42L30,42Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M30,16L70,16L70,21L30,21Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#2F8FD8","opacity":1});
        shape.data("name","Rectangle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({"rx":11,"ry":6,"cx":50,"cy":32,"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({"rx":3,"ry":3,"cx":50,"cy":32,"stroke":"#303030","stroke-width":1,"fill":"#303030","opacity":1});
        shape.data("name","Circle");

        // Label
        shape = this.canvas.paper.text(0,0,'Qt');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Qt","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'show');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"show","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

    symbolPicture: "data:image/png;base64,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",

    jsonDocument: [],

    translateToPythonCode: function(){
        let windowWireName = this.qtInputWireName("window");
        if (windowWireName === null) return "# ERROR: PythonQtGuiLib.UiShow input window must be connected\n";

        let pythonCode = "";
        pythonCode += `${windowWireName}.show()\n`;
        pythonCode += this.qtAssignOutput("window_out", windowWireName);
        return pythonCode;
    },

});
