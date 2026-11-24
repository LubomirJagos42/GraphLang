// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.Time.waitUntilNextMs = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.Time.waitUntilNextMs",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // in1
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";
     port.userData.allowMultipleConnections = false;
     port.userData.connectionMandatory = false;

     // in2
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in2");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";
     port.userData.allowMultipleConnections = false;
     port.userData.connectionMandatory = false;

     // out1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 73.333333));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";
     port.userData.allowMultipleConnections = true;
     port.userData.connectionMandatory = false;

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
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
        shape = this.canvas.paper.path('M80,44L100,44');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({"rx":12,"ry":12,"cx":50,"cy":29,"stroke":"#303030","stroke-width":2,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Circle");

        // Line
        shape = this.canvas.paper.path('M50,29L50,20');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M50,29L57,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'Time');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Time","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'wait');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"wait","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

   applyAlpha: function()
   {
   },

   layerGet: function(name, attributes)
   {
      if(this.svgNodes===null) return null;

      var result=null;
      this.svgNodes.some(function(shape){
         if(shape.data("name")===name){
            result=shape;
         }
         return result!==null;
      });

      return result;
   },

   layerAttr: function(name, attributes)
   {
     if(this.svgNodes===null) return;

     this.svgNodes.forEach(function(shape){
             if(shape.data("name")===name){
                  shape.attr(attributes);
             }
     });
   },

   layerShow: function(name, flag, duration)
   {
      if(this.svgNodes===null) return;

      if(duration){
        this.svgNodes.forEach(function(node){
            if(node.data("name")===name){
                if(flag){
                    node.attr({ opacity : 0 }).show().animate({ opacity : 1 }, duration);
                }
                else{
                    node.animate({ opacity : 0 }, duration, function () { this.hide() });
                }
            }
        });
      }
      else{
          this.svgNodes.forEach(function(node){
              if(node.data("name")===name){
                   if(flag){node.show();}
                   else{node.hide();}
               }
           });
      }
   },

    getParameterSettings: function()
    {
        return [];
    },

    /**
     * @method
     */
    addPort: function(port, locator)
    {
        this._super(port, locator);
        return port;
    },

    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        var memento = this._super();

        // add all decorations to the memento
        //
        memento.labels = [];
        this.children.each(function(i,e){
            var labelJSON = e.figure.getPersistentAttributes();
            labelJSON.locator=e.locator.NAME;
            memento.labels.push(labelJSON);
        });

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes : function(memento)
    {
        var symbolWidth = this.getWidth(), symbolHeight = this.getHeight();  //size from init(), older schematics stored different sizes which would stretch current shape
        this._super(memento);
        this.setDimension(symbolWidth, symbolHeight);

        // remove all decorations created in the constructor of this element
        //
        this.resetChildren();

        // and add all children of the JSON document.
        //
        $.each(memento.labels, $.proxy(function(i,json){
            // create the figure stored in the JSON
            var figure =  eval("new "+json.type+"()");

            // apply all attributes
            figure.attr(json);

            // instantiate the locator
            var locator =  eval("new "+json.locator+"()");

            // add the new figure as child to this figure
            this.add(figure, locator);
        },this));
    },
    
    symbolPicture: "data:image/png;base64,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",
    
    jsonDocument: [],

    translateToCppCodeImport: function(){
        return "#include <unistd.h>";
    },

    translateToCppCode: function(){
      cCode = "";
      var in1 = this.getInputPort("in1"); if (in1.getConnections().getSize() > 0) in1 = in1.getConnections().get(0).getVariableName(); else in1 = "/*in1 default value*/";
      cCode += "usleep(" + in1 + ");\n";
      return cCode;
    },

    translateToPythonCodeImport: function(){
        return "import time";
    },

    /**
     *  @description same as C++ usleep(in1): in1 is wait time in microseconds, error in2 is passed to out1
     */
    translateToPythonCode: function(){
      let pythonCode = "";
      let in1Connections = this.getInputPort("in1").getConnections();
      if (in1Connections.getSize() > 0) pythonCode += "time.sleep(" + in1Connections.first().getVariableName() + " / 1000000.0)\n";
      else pythonCode += "# ERROR: HwRaspiZero.Time.waitUntilNextMs input in1 (wait time in us) not connected\n";

      let in2Connections = this.getInputPort("in2").getConnections();
      let errorValue = in2Connections.getSize() > 0 ? in2Connections.first().getVariableName() : "None";
      this.getOutputPort("out1").getConnections().each(function(wireIndex, wireObj){
        pythonCode += wireObj.getVariableName() + " = " + errorValue + "\n";
      });
      return pythonCode;
    },


});