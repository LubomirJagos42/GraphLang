// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwArduinoNano.Serial.begin = GraphLang.UserDefinedNode.extend({

   NAME: "HwArduinoNano.Serial.begin",

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
     port.userData.datatype = "string";

     // errorIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3D957");
     port.setName("errorIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

     // errorOut
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 73.333333));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#F3D957");
     port.setName("errorOut");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

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

        // Line
        shape = this.canvas.paper.path('M27,29L38,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M38,23L47,23L47,35L38,35Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#303030","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M47,26L52,26');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M47,32L52,32');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M55,19L72,19L72,39L55,39Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M59,25L67,25L67,33L59,33Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#303030","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'Nano');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Nano","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'begin');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"begin","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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

translateToCppCode: function(){
      cCode = "";
      var in1 = this.getInputPort("in1"); if (in1.getConnections().getSize() > 0) in1 = in1.getConnections().get(0).getVariableName(); else in1 = "/*in1 default value*/";
      cCode += "Serial.begin(" + in1 + ");\n";
      return cCode;
    },

    /**
     * @description Python translation of this node, assigns result to every connected output wire.
     */
    translateToPythonCode: function(funcParams){
        var inputWireName = function(node, portName, defaultValue){
            var port = node.getInputPort(portName);
            return (port && port.getConnections().getSize() > 0) ? port.getConnections().first().getVariableName() : defaultValue;
        };
        var in1 = inputWireName(this, "in1", "9600");
        //desktop python has no arduino serial port, Serial.begin() only marks the place, println() goes to stdout
        var pythonCode = "# Serial.begin(" + in1 + ") - on desktop python output goes to stdout\n";
        //error cluster pass through
        var errIn = inputWireName(this, "errorIn", "None");
        var errOutPort = this.getOutputPort("errorOut");
        if (errOutPort) errOutPort.getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = " + errIn + "\n";
        });
        return pythonCode;
    },

});
