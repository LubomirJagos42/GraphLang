// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwArduino.String.toStr = GraphLang.UserDefinedNode.extend({

   NAME: "HwArduino.String.toStr",

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
     port.userData.datatype = "string";
     port.userData.allowMultipleConnections = false;
     port.userData.connectionMandatory = false;

     // out1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 50));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "string";
     port.userData.allowMultipleConnections = true;
     port.userData.connectionMandatory = false;

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
        shape = this.canvas.paper.path('M0,15L19,15');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M64,15L80,15');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M12,3L52,3L55.1,3.4L58,4.6L60.5,6.5L62.4,9L63.6,11.9L64,15L63.6,18.1L62.4,21L60.5,23.5L58,25.4L55.1,26.6L52,27L12,27L17,21L19,15L17,9Z');
        shape.attr({"stroke":"#303030","stroke-width":1.5,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'toStr');
        shape.attr({"x":39,"y":15,"text-anchor":"middle","text":"toStr","font-size":11,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
       var out1 = this.getOutputPort("out1"); if (out1.getConnections().getSize() > 0) out1 = out1.getConnections().get(0).getVariableName(); else out1 = "/*out1 default value*/";
       cCode += out1 + " = String(" + in1 + ");\n";
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
        if (in1 === null) return "# ERROR: toStr node has unconnected input\n";
        var pythonCode = "";
        this.getOutputPort("out1").getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = str(" + in1 + ")\n";
        });
        if (pythonCode == "") pythonCode = "# toStr output not connected, no code generated\n";
        return pythonCode;
    },

});
