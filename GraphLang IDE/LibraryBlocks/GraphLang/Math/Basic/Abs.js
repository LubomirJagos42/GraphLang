// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
GraphLang.Math.Basic.Abs = GraphLang.Math.Basic.CommonParent.extend({

   NAME: "GraphLang.Math.Basic.Abs",

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
     port.userData.datatype = "numeric";

     // out1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 33.333333));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "numeric";

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
        shape = this.canvas.paper.path('M80,20L100,20');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M37,18L37,40');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M63,18L63,40');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'x');
        shape.attr({"x":50,"y":29,"text-anchor":"middle","text":"x","font-size":16,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Math');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Math","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'abs');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"abs","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
       cCode += out1 + " = abs(" + in1 + ");\n";
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
        if (in1 === null) return "# ERROR: Abs node has unconnected input\n";
        var pythonCode = "";
        this.getOutputPort("out1").getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = abs(" + in1 + ")\n";
        });
        if (pythonCode == "") pythonCode = "# Abs output not connected, no code generated\n";
        return pythonCode;
    },

});
