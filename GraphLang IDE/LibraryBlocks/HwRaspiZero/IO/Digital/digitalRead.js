HwRaspiZero.IO.Digital.digitalRead = GraphLang.UserDefinedNode.extend({
    NAME: "HwRaspiZero.IO.Digital.digitalRead",

   init:function(attr, setter, getter)
   {
       this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
       var port;
       // in2
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
       port.setConnectionDirection(3);
       port.setBackgroundColor("#37B1DE");
       port.setName("in2");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "errorDatatype";
       port.userData.allowMultipleConnections = false;
       port.userData.connectionMandatory = false;

       // in1
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
       port.setConnectionDirection(3);
       port.setBackgroundColor("#37B1DE");
       port.setName("in1");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "int";
       port.userData.allowMultipleConnections = false;
       port.userData.connectionMandatory = false;

       // out1
       port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 33.333333));
       port.setConnectionDirection(1);
       port.setBackgroundColor("#37B1DE");
       port.setName("out1");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "bool";
       port.userData.allowMultipleConnections = true;
       port.userData.connectionMandatory = false;

       // out2
       port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 73.333333));
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
        shape = this.canvas.paper.path('M0,20L20,20');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,20L100,20');
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
        shape = this.canvas.paper.path('M26,36L32,36L32,22L40,22L40,36L46,36L46,22L52,22');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M56,29L74,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M70,25L74,29L70,33');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'GPIO');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"GPIO","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'read');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"read","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

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
jsonDocument: [],
translateToCppCode: function(){
     cCode = "";
     var in1 = this.getInputPort("in1"); if (in1.getConnections().getSize() > 0) in1 = in1.getConnections().get(0).getVariableName(); else in1 = "/*in1 default value*/";
     var out1 = this.getOutputPort("out1"); if (out1.getConnections().getSize() > 0) out1 = out1.getConnections().get(0).getVariableName(); else out1 = null;
     if (out1 != null) cCode += out1 + " = digitalRead(" + in1 + ")";
     else  cCode += "digitalRead(" + in1 + ");\n";
     return cCode;
   },
});
