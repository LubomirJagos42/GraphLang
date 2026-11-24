// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.String.replace = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.String.replace",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // in1
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 20));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "string";

     // errorIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 80));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("errorIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

     // in2
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 40));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in2");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "string";

     // in3
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 60));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in3");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "string";

     // errorOut
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 80));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("errorOut");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

     // out1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 20));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "string";

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
        shape = this.canvas.paper.path('M0,12L20,12');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,48L20,48');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,24L20,24');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,36L20,36');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,48L100,48');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,12L100,12');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'a');
        shape.attr({"x":34,"y":29,"text-anchor":"middle","text":"a","font-size":14,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Line
        shape = this.canvas.paper.path('M41,29L59,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M55,25L59,29L55,33');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'b');
        shape.attr({"x":66,"y":29,"text-anchor":"middle","text":"b","font-size":14,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'String');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"String","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'replace');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"replace","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
       var in2 = this.getInputPort("in2"); if (in2.getConnections().getSize() > 0) in2 = in2.getConnections().get(0).getVariableName(); else in2 = "/*in2 default value*/";
       var in3 = this.getInputPort("in3"); if (in3.getConnections().getSize() > 0) in3 = in3.getConnections().get(0).getVariableName(); else in3 = "/*in3 default value*/";
       var out1 = this.getOutputPort("out1"); if (out1.getConnections().getSize() > 0) out1 = out1.getConnections().get(0).getVariableName(); else out1 = "/*out1 default value*/";
       cCode += out1 + " = " + in1 + ".replace("+ in2 + "," + in3 + ");";
       return cCode;
     },


});
