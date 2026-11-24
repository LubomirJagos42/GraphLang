/**
 *  Here is important difference between inheritance in this framework, because, here is not created class but new class is inheriting first prototype, so NO WORD 'new', just assignements of object with parameter extend({...})
 */
HwRaspiZero.File.OpenFolderNode = draw2d.SetFigure.extend({
  NAME: "HwRaspiZero.File.OpenFolderNode",

  init:function(attr, setter, getter)
  {
    this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);

    var port;
    // Port
    port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 33.333333));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#37B1DE");
    port.setName("out1");
    port.setMaxFanOut(20);
    if (!port.userData) port.userData = {};
    port.userData.datatype = "int";

    // Port
    port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
    port.setConnectionDirection(3);
    port.setBackgroundColor("#37B1DE");
    port.setName("in1");
    port.setMaxFanOut(20);
    if (!port.userData) port.userData = {};
    port.userData.datatype = "int";

    // Port
    port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
    port.setConnectionDirection(3);
    port.setBackgroundColor("#37B1DE");
    port.setName("in2");
    port.setMaxFanOut(20);
    if (!port.userData) port.userData = {};
    port.userData.datatype = "errorDatatype";

    this.setPersistPorts(false);
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

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M32,18L42,18L46,22L68,22L68,41L32,41Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#F3DE22","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M32,26L68,26');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'File');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"File","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'folder');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"folder","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

  setPersistentAttributes : function(memento){
        var symbolWidth = this.getWidth(), symbolHeight = this.getHeight();  //size from init(), older schematics stored different sizes which would stretch current shape
        this._super(memento);
        this.setDimension(symbolWidth, symbolHeight);
    },

  symbolPicture: "data:image/png;base64,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",

   /*****************************************************************************************
    * NEXT PART ADDED BY LuboJ TO MAKE IT RUNNABLE IN GraphLangUtils
    *****************************************************************************************/
    translateToCppCode: function(){
      cCode = "";

      var in1 = this.getInputPort("in1"); if (in1.getConnections().getSize() > 0) in1 = in1.getConnections().get(0).getVariableName(); else in1 = "/*in1 default value*/";
      var in2 = this.getInputPort("in2"); if (in2.getConnections().getSize() > 0) in2 = in2.getConnections().get(0).getVariableName(); else in2 = "/*in2 default value*/";
      var out1 = this.getOutputPort("out1"); if (out1.getConnections().getSize() > 0) out1 = out1.getConnections().get(0).getVariableName(); else out1 = "/*out1 default value*/";

      //cCode += "/* OpenFolder(...) */";
      cCode += out1 + " = FileLib.OpenFolder(" + in1 + ", " + in2 + ");";

      return cCode;
    }

});
