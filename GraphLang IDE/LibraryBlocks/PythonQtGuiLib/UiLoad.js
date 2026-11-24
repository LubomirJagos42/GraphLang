/**
 *  @author LuboJ
 *  @description Load Qt Designer .ui file and create widget (window) from it, creates QApplication when it does not exist yet.
 *  Python (PySide6): app = QApplication.instance() or QApplication(sys.argv); window = QUiLoader().load(QFile(fileName))
 *  Relative fileName is searched in current working directory and then in directory of generated script.
 *  Node has only python translation (no C/C++). Shape is simple and editable in shape designer
 *  (init/createShapeElement/createSet are in shape designer format), helpers are in PythonQtGuiLib.CommonParent.
 */
PythonQtGuiLib.UiLoad = PythonQtGuiLib.CommonParent.extend({

    NAME: "PythonQtGuiLib.UiLoad",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // fileName
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 53.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#F307F3");
        port.setName("fileName");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "string";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // app
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 33.333333));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#70DB70");
        port.setName("app");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "QtUiApplication";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // window
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 73.333333));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#2F8FD8");
        port.setName("window");
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

        // Rectangle
        shape = this.canvas.paper.path('M27,17L37,17L41,21L41,41L27,41Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M37,17L37,21L41,21');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'ui');
        shape.attr({"x":34,"y":33,"text-anchor":"middle","text":"ui","font-size":8,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Line
        shape = this.canvas.paper.path('M43,29L50,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M47,26L50,29L47,32');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M52,18L73,18L73,40L52,40Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M52,18L73,18L73,23L52,23Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#2F8FD8","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'Qt');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Qt","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'load');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"load","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

    symbolPicture: "data:image/png;base64,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",

    jsonDocument: [],

    translateToPythonCode: function(){
        let fileNameWireName = this.qtInputWireName("fileName");
        if (fileNameWireName === null) return "# ERROR: PythonQtGuiLib.UiLoad input fileName (path to .ui file) must be connected\n";

        let appVar = this.qtVariableName("qtApp");
        let pathVar = this.qtVariableName("qtUiPath");
        let fileVar = this.qtVariableName("qtUiFile");
        let windowVar = this.qtVariableName("qtUiWindow");

        let pythonCode = "";
        pythonCode += `${appVar} = QApplication.instance() or QApplication(sys.argv)\n`;
        pythonCode += `${pathVar} = str(${fileNameWireName})\n`;
        pythonCode += `if not os.path.isfile(${pathVar}):\n`;
        pythonCode += `    ${pathVar} = os.path.join(os.path.dirname(os.path.abspath(sys.argv[0])), ${pathVar})\n`;
        pythonCode += `${fileVar} = QFile(${pathVar})\n`;
        pythonCode += `if not ${fileVar}.open(QIODevice.ReadOnly):\n`;
        pythonCode += `    raise RuntimeError("PythonQtGuiLib.UiLoad cannot open .ui file: " + ${pathVar})\n`;
        pythonCode += `${windowVar} = QUiLoader().load(${fileVar})\n`;
        pythonCode += `${fileVar}.close()\n`;
        pythonCode += `if ${windowVar} is None:\n`;
        pythonCode += `    raise RuntimeError("PythonQtGuiLib.UiLoad cannot load .ui file: " + ${pathVar})\n`;
        pythonCode += this.qtAssignOutput("app", appVar);
        pythonCode += this.qtAssignOutput("window", windowVar);
        return pythonCode;
    },

});
