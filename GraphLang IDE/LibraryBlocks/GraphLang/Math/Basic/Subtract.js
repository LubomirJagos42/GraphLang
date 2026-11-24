// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
GraphLang.Math.Basic.Subtract = GraphLang.Math.Basic.CommonParent.extend({

   NAME: "GraphLang.Math.Basic.Subtract",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:80, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // in1
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 23.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#4F6870");
     port.setName("in1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";

     // in2
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 76.666667));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#4F6870");
     port.setName("in2");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";

     // out1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 50));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#4F6870");
     port.setName("out1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 60;
      return shape;
   },

   createSet: function(){
        this.canvas.paper.setStart();
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L80,0 L80,60 L0,60");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Line
        shape = this.canvas.paper.path('M0,14L20,14');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,46L20,46');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M60,30L80,30');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,2L60,30L20,58Z');
        shape.attr({"stroke":"#303030","stroke-width":1.5,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M27,30L39,30');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2.5,"opacity":1});
        shape.data("name","Line");

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
         var out1 = this.getOutputPort("out1");

         if (out1.getConnections().getSize() > 0){
             out1.getConnections().each(function(connIndex, connObj){
                 out1 = connObj.getVariableName();
                 cCode += out1 + " = " + in1 + " - " + in2 + ";\n";
             });
         }else{
             cCode += "/* MISSING OUTPUT WIRES CONNECTED TO SUBTRACT OUTPUT, NO CODE GENERATED. */\n";
         }
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
        var in1 = inputWireName(this, "in1", null);
        var in2 = inputWireName(this, "in2", null);
        if (in1 === null || in2 === null) return "# ERROR: Subtract node has unconnected input\n";
        var expr = in1 + " - " + in2;
        var pythonCode = "";
        this.getOutputPort("out1").getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = " + expr + "\n";
        });
        if (pythonCode == "") pythonCode = "# Subtract output not connected, no code generated\n";
        return pythonCode;
    },

});
