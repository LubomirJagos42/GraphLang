GraphLang.Shapes.Basic.ArrayInit = GraphLang.UserDefinedNode.extend({
NAME: "GraphLang.Shapes.Basic.ArrayInit",

   init:function(attr, setter, getter)
   {
       this._super( $.extend({stroke:0, bgColor:null, width:91, height:58, flagAutoCreatePorts: false},attr), setter, getter);
       var port;
       // arrayRefOut
       port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.83965538461543, 21.168353103448602));
       port.setConnectionDirection(1);
       port.setBackgroundColor("#FFFFFF");
       port.setName("arrayRefOut");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "undefined";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       // elementIn
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(2.587112087912004, 21.168353103448602));
       port.setConnectionDirection(3);
       port.setBackgroundColor("#37B1DE");
       port.setName("elementIn");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "undefined";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       // arraySizeIn
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(2.587112087912004, 51.72413793103448));
       port.setConnectionDirection(3);
       port.setBackgroundColor("#37B1DE");
       port.setName("arraySizeIn");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "uint";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       // errorIn
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(2.587112087912004, 86.61395862069));
       port.setConnectionDirection(3);
       port.setBackgroundColor("#F3DF29");
       port.setName("errorIn");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "undefined";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       // errorOut
       port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.83965538461543, 86.61395862069));
       port.setConnectionDirection(1);
       port.setBackgroundColor("#F3DF29");
       port.setName("errorOut");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "undefined";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       this.persistPorts=false;
   },

   createShapeElement : function()
   {
       var shape = this._super();
       this.originalWidth = 91;
       this.originalHeight= 58;
       return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L91,0 L91,58 L0,58");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M13.416044799999668 0L77.41604479999967 0L77.41604479999967 58L13.416044799999668 58Z');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Rectangle
       shape = this.canvas.paper.path('M24.246393600000033 32.4920448000002L68.28658559999997 32.4920448000002L68.28658559999997 47.38182400000022L24.246393600000033 47.38182400000022Z');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Line_shadow
       shape = this.canvas.paper.path('M78.5 49.5L84.5,49.5L90.5,49.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M78.5 49.5L84.5,49.5L90.5,49.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M13.5 49.5L0.5,49.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M13.5 49.5L0.5,49.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M13.5 9.5L1.5,9.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M13.5 9.5L1.5,9.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M13.5 24.5L2.5,24.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M13.5 24.5L2.5,24.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M78.5 9.5L91.5,9.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M78.5 9.5L91.5,9.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M59.5 7.5L63.5,7.5L65.5,2.5L67.5,7.5L71.5,7.5L67.5,10.5L69.5,14.5L65.5,11.5L62.5,14.5L63.5,10.5L59.5,7.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M59.5 7.5L63.5,7.5L65.5,2.5L67.5,7.5L71.5,7.5L67.5,10.5L69.5,14.5L65.5,11.5L62.5,14.5L63.5,10.5L59.5,7.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#EDFF4D","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M59.5 46.5L60.5,32.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M59.5 46.5L60.5,32.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M50.5 32.5L50.5,46.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M50.5 32.5L50.5,46.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M39.5 47.5L39.5,32.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M39.5 47.5L39.5,32.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M30.5 32.5L29.5,46.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M30.5 32.5L29.5,46.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

       return this.canvas.paper.setFinish();
   },

   symbolPicture: "data:image/png;base64,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",

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
addPort: function(port, locator)
    {
        this._super(port, locator);
        return port;
    },
getPersistentAttributes: function()
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
setPersistentAttributes: function(memento)
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
jsonDocument: [],
});
