// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
ConvertDatatype = GraphLang.UserDefinedNode.extend({            

   NAME: "ConvertDatatype",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:36, height:22, flagAutoCreatePorts: false},attr), setter, getter);
     var port;

     // variableIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 59.090909));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3F3F3");
     port.setName("variableIn");
     port.setMaxFanOut(20);
     port.userData = {datatype: "void*"};

     // castDatatype
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(41.666667, 0));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#FFFFFF");
     port.setName("castDatatype");
     port.setMaxFanOut(20);
     port.userData = {datatype: "polymorphic"};

     // convertedVariable
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 59.090909));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#FFFFFF");
     port.setName("convertedVariable");
     port.setMaxFanOut(20);
     port.userData = {datatype: "polymorphic"};
     this.persistPorts=false;
     port.getDatatype = function(){
       let resultDatatype = this.userData.datatype;

       let inPort = this.getParent().getInputPort("castDatatype");
       let inputWire = (inPort.getConnections().getSize() > 0) ? inPort.getConnections().first() : null;
       if (inputWire) resultDatatype = inputWire.getDatatype();

       return resultDatatype;
     };
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 36;
      this.originalHeight= 22;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L36,0 L36,22 L0,22");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Line
        shape = this.canvas.paper.path('M0,13L6,13');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M15,0L15,5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M29,13L36,13');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M6,5L23,5L29,13L23,21L6,21Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'conv');
        shape.attr({"x":16,"y":13,"text-anchor":"middle","text":"conv","font-size":8,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
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
        // keep compact size from init also for schematics saved with the old bigger symbol
        var w = this.getWidth(), h = this.getHeight();
        this._super(memento);
        this.setDimension(w, h);

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
        let cCode = "";

        /*
         *  General implementation for all output and just first input wire as they cannot be more than one
         */
        let outputDatatype = "undefined";
        try {
            outputDatatype = this.getInputPort("castDatatype").getConnections().first().getDatatype();
        }catch(e){
        }

        let outputPort = this.getOutputPort("convertedVariable");
        let inputWire = this.getInputPort(0).getConnections().first();  //get just first connected wire
        outputPort.getConnections().each(function(outputPortWireIndex, outputPortWireObj){
            cCode += `${outputPortWireObj.getVariableName()} = static_cast<${outputDatatype}>(${inputWire.getVariableName()});\n`;
        });

        return cCode;
    },

});