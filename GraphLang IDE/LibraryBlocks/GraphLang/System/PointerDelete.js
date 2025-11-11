// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
GraphLang.Shapes.Basic.PointerDelete = GraphLang.UserDefinedNode.extend({            

   NAME: "GraphLang.Shapes.Basic.PointerDelete",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:67.37100799999996, height:43, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // errorOut
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100.0285939019942, 88.37209302325581));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#F3E300");
     port.setName("errorOut");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // errorIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-1.9169313898346896, 88.37209302325581));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3E300");
     port.setName("errorIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // pointerIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-1.9169313898346896, 25.7467534883726));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#FFFFFF");
     port.setName("pointerIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "polymorphic";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 67.37100799999996;
      this.originalHeight= 43;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L67.37100799999996,0 L67.37100799999996,43 L0,43");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path('M10.815039999999726 0L57.815039999999726 0L57.815039999999726 43L10.815039999999726 43Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        
        // Line_shadow
        shape = this.canvas.paper.path('M58.5 37.5L62.5,37.5L67.5,37.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M58.5 37.5L62.5,37.5L67.5,37.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M9.5 37.5L0.5,37.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M9.5 37.5L0.5,37.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M10.5 10.5L0.5,10.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M10.5 10.5L0.5,10.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M37.5 6.5L44.5,12.5L47.5,15.5L50.5,19.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":3,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M37.5 6.5L44.5,12.5L47.5,15.5L50.5,19.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#FF0000","stroke-width":3,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M49.5 5.5L36.5,18.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":3,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M49.5 5.5L36.5,18.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#FF0000","stroke-width":3,"stroke-dasharray":null,"opacity":1});
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
        this._super(memento);

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
        this.getInputPort("pointerIn").getConnections().each(function(connectionIndex, connectionObj){
          cCode += `delete ${connectionObj.getVariableName()};\n`;
        });

        /*
         *  TODO: need to implement look at datatype and when it's array use delete[].
         *        in C++ there is delete and delete[]
         */

        return cCode;
    },

});