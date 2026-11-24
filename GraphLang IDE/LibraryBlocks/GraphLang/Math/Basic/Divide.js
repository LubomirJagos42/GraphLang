// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
GraphLang.Math.Basic.Divide = GraphLang.Math.Basic.CommonParent.extend({

   NAME: "GraphLang.Math.Basic.Divide",

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
     port.userData.datatype = "int";
     // in2
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 76.666667));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in2");
     port.setMaxFanOut(20);
     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";
     // out1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 50));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
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

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({"rx":2,"ry":2,"cx":33,"cy":24,"stroke":"#303030","stroke-width":1,"fill":"#303030","opacity":1});
        shape.data("name","Circle");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({"rx":2,"ry":2,"cx":33,"cy":36,"stroke":"#303030","stroke-width":1,"fill":"#303030","opacity":1});
        shape.data("name","Circle");

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
               cCode += out1 + " = " + in1 + " / " + in2 + ";\n";
           });
       }else{
           cCode += "/* MISSING OUTPUT WIRES CONNECTED TO DIVIDE OUTPUT, NO CODE GENERATED. */\n";
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
        if (in1 === null || in2 === null) return "# ERROR: Divide node has unconnected input\n";
        var expr = (function(node){
            //C++ int / int truncates toward zero, python int() keeps same behaviour; float division otherwise
            var intTypes = ["int", "uint", "long", "short", "char", "int8_t", "int16_t", "int32_t", "int64_t", "uint8_t", "uint16_t", "uint32_t", "uint64_t", "unsigned int", "unsigned long", "size_t"];
            var isInt = function(portName){
                var dt = node.getInputPort(portName).getConnections().first().getDatatype();
                return intTypes.indexOf(dt) > -1;
            };
            return (isInt("in1") && isInt("in2")) ? "int(" + in1 + " / " + in2 + ")" : in1 + " / " + in2;
        })(this);
        var pythonCode = "";
        this.getOutputPort("out1").getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = " + expr + "\n";
        });
        if (pythonCode == "") pythonCode = "# Divide output not connected, no code generated\n";
        return pythonCode;
    },

});
