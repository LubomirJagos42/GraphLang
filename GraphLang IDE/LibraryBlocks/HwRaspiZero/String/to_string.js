HwRaspiZero.String.to_string = GraphLang.UserDefinedNode.extend({
NAME: "HwRaspiZero.String.to_string",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:88, height:24.873195781284153, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // in1
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(2.707852450909214, 68.346665822458));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("in1");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "polymorphic";
        port.userData.allowMultipleConnections = false;
        port.userData.connectionMandatory = false;

        // out1
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(103.99648104727288, 75.9011763426293));
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

    createShapeElement : function(){
        var shape = this._super();
        this.originalWidth = 88;
        this.originalHeight= 24.873195781284153;
        return shape;
    },

    createSet: function(){
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L88,0 L88,24.873195781284153 L0,24.873195781284153");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Label
        shape = this.canvas.paper.text(0,0,'to_string');
        shape.attr({"x":19.658735479687266,"y":11,"text-anchor":"start","text":"to_string","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Line_shadow
        shape = this.canvas.paper.path('M0.5 13.5L10.5,14.5L20.5,14.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M0.5 13.5L10.5,14.5L20.5,14.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        // Line_shadow
        shape = this.canvas.paper.path('M70.5 15.5L88.5,14.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M70.5 15.5L88.5,14.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        // Line_shadow
        shape = this.canvas.paper.path('M13.5 2.5L58.5,3.5L65.5,7.5L69.5,11.5L69.5,17.5L65.5,20.5L58.5,24.5L12.5,24.5L17.5,21.5L20.5,17.5L20.5,11.5L17.5,8.5L12.5,3.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M13.5 2.5L58.5,3.5L65.5,7.5L69.5,11.5L69.5,17.5L65.5,20.5L58.5,24.5L12.5,24.5L17.5,21.5L20.5,17.5L20.5,11.5L17.5,8.5L12.5,3.5');
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
translateToCppCode: function(){
       cCode = "";
       var in1 = this.getInputPort("in1"); if (in1.getConnections().getSize() > 0) in1 = in1.getConnections().get(0).getVariableName(); else in1 = "/*in1 default value*/";
       var out1 = this.getOutputPort("out1"); if (out1.getConnections().getSize() > 0) out1 = out1.getConnections().get(0).getVariableName(); else out1 = "/*out1 default value*/";
       cCode += out1 + " = std::to_string(" + in1 + ");\n";
       return cCode;
     },
});
