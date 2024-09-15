GraphLang.ArduinoLib.Node.digitalRead = GraphLang.UserDefinedNode.extend({
NAME: "GraphLang.ArduinoLib.Node.digitalRead",

   init:function(attr, setter, getter)
   {
       this._super( $.extend({stroke:0, bgColor:null, width:96, height:79, flagAutoCreatePorts: false},attr), setter, getter);
       var port;
       // in2
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-1.9205729166666667, 79.11392405063292));
       port.setConnectionDirection(3);
       port.setBackgroundColor("#37B1DE");
       port.setName("in2");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "errorDatatype";
       port.userData.allowMultipleConnections = false;
       port.userData.connectionMandatory = false;

       // in1
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-1.9205729166666667, 48.368211335773715));
       port.setConnectionDirection(3);
       port.setBackgroundColor("#37B1DE");
       port.setName("in1");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "int";
       port.userData.allowMultipleConnections = false;
       port.userData.connectionMandatory = false;

       // out1
       port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(103.28776041666667, 48.368211335773715));
       port.setConnectionDirection(1);
       port.setBackgroundColor("#37B1DE");
       port.setName("out1");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "bool";
       port.userData.allowMultipleConnections = true;
       port.userData.connectionMandatory = false;

       // out2
       port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(103.28776041666667, 79.38086956362181));
       port.setConnectionDirection(1);
       port.setBackgroundColor("#37B1DE");
       port.setName("out2");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "errorDatatype";
       port.userData.allowMultipleConnections = true;
       port.userData.connectionMandatory = false;

       this.persistPorts=false;
   },

   createShapeElement : function()
   {
       var shape = this._super();
       this.originalWidth = 96;
       this.originalHeight= 79;
       return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L96,0 L96,79 L0,79");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M18.15625 23L77.15625 23L77.15625 79L18.15625 79Z');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":10.5,"ry":10.5,"cx":34.65625,"cy":62.5,"stroke":"none","stroke-width":0,"fill":"#000000","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Circle
       shape = this.canvas.paper.ellipse();
       shape.attr({"rx":8.5,"ry":8.5,"cx":34.65625,"cy":62.5,"stroke":"none","stroke-width":0,"fill":"#FFFF14","dasharray":null,"opacity":1});
       shape.data("name","Circle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'?');
       shape.attr({"x":57.15625,"y":62.5,"text-anchor":"start","text":"?","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Label
       shape = this.canvas.paper.text(0,0,'digitalRead');
       shape.attr({"x":16,"y":11,"text-anchor":"start","text":"digitalRead","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line_shadow
       shape = this.canvas.paper.path('M19.5 61.5L0.5,61.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M19.5 61.5L0.5,61.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M77.5 61.5L93.5,61.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M77.5 61.5L93.5,61.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M19.5 38.5L0.5,38.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M19.5 38.5L0.5,38.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M80.5 36.5L86.5,36.5L96.5,36.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M80.5 36.5L86.5,36.5L96.5,36.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M30.5 70.5L45.5,55.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M30.5 70.5L45.5,55.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M29.5 56.5L42.5,69.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M29.5 56.5L42.5,69.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

       return this.canvas.paper.setFinish();
   },

   symbolPicture: "data:image/png;base64,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",applyAlpha: function()
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
translateToCppCode: function(){
     cCode = "";
     var in1 = this.getInputPort("in1"); if (in1.getConnections().getSize() > 0) in1 = "wire_" + in1.getConnections().get(0).getId(); else in1 = "/*in1 default value*/";
     var out1 = this.getOutputPort("out1"); if (out1.getConnections().getSize() > 0) out1 = "wire_" + out1.getConnections().get(0).getId(); else out1 = null;
     if (out1 != null) cCode += out1 + " = digitalRead(" + in1 + ")";
     else  cCode += "digitalRead(" + in1 + ");\n";
     return cCode;
   },
});
