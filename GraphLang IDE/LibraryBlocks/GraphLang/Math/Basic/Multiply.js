// Generated Code for the Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
// Go to the Designer http://www.draw2d.org
// to design your own shape or download user generated
//
GraphLang.Math.Basic.Multiply = GraphLang.Math.Basic.CommonParent.extend({

   NAME: "GraphLang.Math.Basic.Multiply",

      init:function(attr, setter, getter)
      {
        this._super( $.extend({stroke:0, bgColor:null, width:80, height:60},attr), setter, getter);
        var port;
        // in1
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 23.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("in1");
        port.setMaxFanOut(20);

        port.userData = {};
        port.userData.datatype = "int";

        // in2
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 76.666667));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("in2");
        port.setMaxFanOut(20);

        port.userData = {};
        port.userData.datatype = "int";

        // out1
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 50));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("out1");
        port.setMaxFanOut(20);

        port.userData = {};
        port.userData.datatype = "int";

        this.persistPorts=false;
      },

      createShapeElement : function()
      {
         var shape = this._super();
         this.originalWidth = 80;
         this.originalHeight= 60;
         return shape;
      },

      createSet: function(){
        this.canvas.paper.setStart();
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L80,0 L80,60 L0,60");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Line
        shape = this.canvas.paper.path('M0,14L20,14');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,46L20,46');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M60,30L80,30');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,2L60,30L20,58Z');
        shape.attr({"stroke":"#303030","stroke-width":1.5,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M29,26L37,34');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2.5,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M29,34L37,26');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2.5,"opacity":1});
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

       calculate: function()
       {
       },

       onStart: function()
       {
       },

       onStop:function()
       {
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

    /*****************************************************************************************
     * NEXT PART ADDED BY LuboJ TO MAKE IT RUNNABLE IN GraphLangUtils
     *****************************************************************************************/
     translateToCppCode: function(){
       cCode = "";
       var in1 = this.getInputPort("in1"); if (in1.getConnections().getSize() > 0) in1 = in1.getConnections().get(0).getVariableName(); else in1 = "/*in1 default value*/";
       var in2 = this.getInputPort("in2"); if (in2.getConnections().getSize() > 0) in2 = in2.getConnections().get(0).getVariableName(); else in2 = "/*in2 default value*/";
       var out1 = this.getOutputPort("out1");

       if (out1.getConnections().getSize() > 0){
           out1.getConnections().each(function(connIndex, connObj){
               out1 = connObj.getVariableName();
               cCode += out1 + " = " + in1 + " * " + in2 + ";\n";
           });
       }else{
           cCode += "/* MISSING OUTPUT WIRES CONNECTED TO MULTIPLY OUTPUT, NO CODE GENERATED. */\n";
       }

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
        var in2 = inputWireName(this, "in2", null);
        if (in1 === null || in2 === null) return "# ERROR: Multiply node has unconnected input\n";
        var expr = in1 + " * " + in2;
        var pythonCode = "";
        this.getOutputPort("out1").getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = " + expr + "\n";
        });
        if (pythonCode == "") pythonCode = "# Multiply output not connected, no code generated\n";
        return pythonCode;
    },

});
