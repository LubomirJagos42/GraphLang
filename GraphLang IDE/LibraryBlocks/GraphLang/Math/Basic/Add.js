// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
GraphLang.Math.Basic.Add = GraphLang.Math.Basic.CommonParent.extend({

   NAME: "GraphLang.Math.Basic.Add",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:80, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // in1
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 23.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "polymorphic";
     port.userData.connectionMandatory = true;

     // in2
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 76.666667));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in2");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "polymorphic";
     port.userData.connectionMandatory = true;

     // out1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 50));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "polymorphic";
     port.userData.connectionMandatory = true;
     port.getDatatype = function(){
         let resultDatatype = this.userData.datatype;

         let inputWire = null;
         this.getParent().getInputPorts().each((index, inPort) => {
             if (inputWire == null && inPort.getConnections().getSize() > 0) inputWire = inPort.getConnections().first();    //set input wire as first connected wire
         });
         if (inputWire) resultDatatype = inputWire.getDatatype();

         return resultDatatype;
     };

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

        // Line
        shape = this.canvas.paper.path('M33,24L33,36');
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
               cCode += out1 + " = " + in1 + " + " + in2 + ";\n";
           });
       }else{
           cCode += "/* MISSING OUTPUT WIRES CONNECTED TO ADD OUTPUT, NO CODE GENERATED. */\n";
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
        if (in1 === null || in2 === null) return "# ERROR: Add node has unconnected input\n";
        var expr = in1 + " + " + in2;
        var pythonCode = "";
        this.getOutputPort("out1").getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = " + expr + "\n";
        });
        if (pythonCode == "") pythonCode = "# Add output not connected, no code generated\n";
        return pythonCode;
    },

});
