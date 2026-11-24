// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
GraphLang.Math.Basic.Not = GraphLang.Math.Basic.CommonParent.extend({

   NAME: "GraphLang.Math.Basic.Not",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:80, height:30, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // in1
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 50));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "bool";

     // out1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 50));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "bool";

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 80;
      this.originalHeight= 30;
      return shape;
   },

   createSet: function(){
        this.canvas.paper.setStart();
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L80,0 L80,30 L0,30");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Line
        shape = this.canvas.paper.path('M0,15L14,15');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M62,15L80,15');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M14,3L50,3L53.1,3.4L56,4.6L58.5,6.5L60.4,9L61.6,11.9L62,15L61.6,18.1L60.4,21L58.5,23.5L56,25.4L53.1,26.6L50,27L14,27Z');
        shape.attr({"stroke":"#303030","stroke-width":1.5,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'not');
        shape.attr({"x":36,"y":15,"text-anchor":"middle","text":"not","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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

      inputVariable = "false";
      if (this.getInputPort("in1").getConnections().getSize() > 0) inputVariable = this.getInputPort("in1").getConnections().first().getVariableName();
      this.getOutputPort("out1").getConnections().each(function(connectionIndex, connectionObj){
        cCode += connectionObj.getVariableName() + " = !" + inputVariable + ";\n";
      });

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
        if (in1 === null) return "# ERROR: Not node has unconnected input\n";
        var pythonCode = "";
        this.getOutputPort("out1").getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = not " + in1 + "\n";
        });
        if (pythonCode == "") pythonCode = "# Not output not connected, no code generated\n";
        return pythonCode;
    },

});
