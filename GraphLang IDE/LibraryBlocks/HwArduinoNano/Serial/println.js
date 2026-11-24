// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwArduinoNano.Serial.println = GraphLang.UserDefinedNode.extend({

   NAME: "HwArduinoNano.Serial.println",

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

        // Rectangle
        shape = this.canvas.paper.path('M28,17L72,17L72,41L28,41Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#303030","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'Hi_');
        shape.attr({"x":50,"y":30,"text-anchor":"middle","text":"Hi_","font-size":12,"stroke":"none","fill":"#7CFC00","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Nano');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Nano","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'println');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"println","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
      cCode += "Serial.println(" + in1 + ");\n";
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
        var in1 = inputWireName(this, "in1", "\"\"");
        var pythonCode = "print(" + in1 + ")\n";
        //error cluster pass through
        var errIn = inputWireName(this, "errorIn", "None");
        var errOutPort = this.getOutputPort("errorOut");
        if (errOutPort) errOutPort.getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = " + errIn + "\n";
        });
        return pythonCode;
    },

});
