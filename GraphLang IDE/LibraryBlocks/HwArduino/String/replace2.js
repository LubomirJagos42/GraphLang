// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwArduino.String.replace2 = GraphLang.UserDefinedNode.extend({

   NAME: "HwArduino.String.replace2",

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
     port.setBackgroundColor("#F3C200");
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
     port.setBackgroundColor("#F3C200");
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
        shape = this.canvas.paper.text(0,0,'replace2');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"replace2","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
