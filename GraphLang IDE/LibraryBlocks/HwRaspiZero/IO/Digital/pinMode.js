// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.IO.Digital.pinMode = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.IO.Digital.pinMode",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // errorIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("errorIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

     // in2
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 53.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in2");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";

     // in1
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";

     // errorOut
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 73.333333));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("errorOut");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

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
        shape = this.canvas.paper.path('M0,44L20,44');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,32L20,32');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,20L20,20');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,44L100,44');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M42,18L58,18L58,40L42,40Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#303030","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M36,22L42,22');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M36,29L42,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M36,36L42,36');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M58,22L64,22');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M58,29L64,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M58,36L64,36');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'GPIO');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"GPIO","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'pinMode');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"pinMode","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
       var in1 = this.getInputPort("in2"); if (in1.getConnections().getSize() > 0) in1 = in1.getConnections().get(0).getVariableName(); else in1 = "/*in1 default value*/";
       var in2 = this.getInputPort("in1"); if (in2.getConnections().getSize() > 0) in2 = in2.getConnections().get(0).getVariableName(); else in2 = "/*in2 default value*/";
       cCode += "pinMode(" + in1 + "," + in2 + ");\n";
       return cCode;
     },


});