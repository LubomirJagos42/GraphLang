// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.IO.Digital.digitalWrite = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.IO.Digital.digitalWrite",

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
     port.userData.datatype = "int";

     // in2
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 53.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in2");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "bool";

     // errorIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("errorIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

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
        shape = this.canvas.paper.path('M0,20L20,20');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,32L20,32');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,44L20,44');
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

        // Line
        shape = this.canvas.paper.path('M26,29L44,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M40,25L44,29L40,33');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M48,36L54,36L54,22L62,22L62,36L68,36L68,22L74,22');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'GPIO');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"GPIO","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'write');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"write","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
      cCode += "digitalWrite(" + in1 + ", " + in2 + ");\n";
      return cCode;
    },


});