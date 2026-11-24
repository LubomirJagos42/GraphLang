/**
 *  @author LuboJ
 *  @description Run Qt application event loop, blocks until last window is closed, output is application exit code.
 *  Python (PySide6): exitCode = app.exec()
 *  Input window is used only to order execution (connect it from UiShow so window is shown before event loop starts).
 *  When app is not connected QApplication.instance() is used.
 *  Node has only python translation (no C/C++). Shape is simple and editable in shape designer
 *  (init/createShapeElement/createSet are in shape designer format), helpers are in PythonQtGuiLib.CommonParent.
 */
PythonQtGuiLib.UiExec = PythonQtGuiLib.CommonParent.extend({

    NAME: "PythonQtGuiLib.UiExec",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // app
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#70DB70");
        port.setName("app");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "QtUiApplication";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // window
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#2F8FD8");
        port.setName("window");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "QtUiObject";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // exitCode
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 53.333333));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("exitCode");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "int";
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

        // Rectangle
        shape = this.canvas.paper.path('M45,25L45,39L57,32Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#3CB043","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'Qt');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Qt","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'exec');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"exec","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

    symbolPicture: "data:image/png;base64,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",

    jsonDocument: [],

    translateToPythonCode: function(){
        let appWireName = this.qtInputWireName("app");
        let appExpr = appWireName !== null ? appWireName : "(QApplication.instance() or QApplication(sys.argv))";
        let exitCodeVar = this.qtVariableName("qtExitCode");

        let pythonCode = "";
        pythonCode += `${exitCodeVar} = ${appExpr}.exec()\n`;
        pythonCode += this.qtAssignOutput("exitCode", exitCodeVar);
        return pythonCode;
    },

});
