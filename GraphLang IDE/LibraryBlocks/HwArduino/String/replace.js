// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwArduino.String.replace = GraphLang.UserDefinedNode.extend({

   NAME: "HwArduino.String.replace",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // in1
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 20));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "string";

     // errorIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 80));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("errorIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

     // in2
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 40));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in2");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "string";

     // in3
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 60));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in3");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "string";

     // errorOut
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 80));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("errorOut");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

     // out1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 20));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "string";

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
        shape = this.canvas.paper.path('M0,12L20,12');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,48L20,48');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,24L20,24');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,36L20,36');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,48L100,48');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,12L100,12');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'a');
        shape.attr({"x":34,"y":29,"text-anchor":"middle","text":"a","font-size":14,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Line
        shape = this.canvas.paper.path('M41,29L59,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M55,25L59,29L55,33');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'b');
        shape.attr({"x":66,"y":29,"text-anchor":"middle","text":"b","font-size":14,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'String');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"String","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'replace');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"replace","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
       var in2 = this.getInputPort("in2"); if (in2.getConnections().getSize() > 0) in2 = in2.getConnections().get(0).getVariableName(); else in2 = "/*in2 default value*/";
       var in3 = this.getInputPort("in3"); if (in3.getConnections().getSize() > 0) in3 = in3.getConnections().get(0).getVariableName(); else in3 = "/*in3 default value*/";
       var out1 = this.getOutputPort("out1"); if (out1.getConnections().getSize() > 0) out1 = out1.getConnections().get(0).getVariableName(); else out1 = "/*out1 default value*/";
       cCode += out1 + " = " + in1 + ".replace("+ in2 + "," + in3 + ");";
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
        var in2 = inputWireName(this, "in2", "\"\"");
        var in3 = inputWireName(this, "in3", "\"\"");
        var pythonCode = "";
        this.getOutputPort("out1").getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = str(" + in1 + ").replace(str(" + in2 + "), str(" + in3 + "))\n";
        });
        //error cluster pass through
        var errIn = inputWireName(this, "errorIn", "None");
        var errOutPort = this.getOutputPort("errorOut");
        if (errOutPort) errOutPort.getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = " + errIn + "\n";
        });
        if (pythonCode == "") pythonCode = "# replace output not connected, no code generated\n";
        return pythonCode;
    },

});
