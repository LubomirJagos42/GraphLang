// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.String.replace2 = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.String.replace2",

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
     port.setBackgroundColor("#F3C200");
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
     port.setBackgroundColor("#F3C200");
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
        shape = this.canvas.paper.text(0,0,'replace2');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"replace2","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
    
    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAACICAYAAADtXaciAAAQAElEQVR4AeydCbzVY/7Hv7cpkbQQLbfRoo3+iDGZhnkNKkqkRTTWikZlRBgqKSpZXtFEaWGUQbSoZJIWNQwvjKXEiGi5bUjLLWmo2z3/5/04z+l3zz3L7957zr33nPPt1fc8+/b5/T6/77Pd56kg+k8RUATKLQJK0HL7aLRiioCIElTfAkWgHCOgBC3HD0erpggoQcvuHdCSFYG4CChB40KkERSBskNACVp22GvJikBcBNKaoK1atQqopD8Gcd/yFI6Q1gRN4eeiVU8uAimTe0YQdOXKlaKSfhikDMtKUNGMIGgJ8NGkikCZIqAELVP4tXBFIDYCStDY+GioIlCmCKQhQcsUTy1cEUgoAkrQhMKpmSkCiUVACZpYPDU3RSChCChBEwqnZqYIJBYBJWhi8czw3LT5iUZACZpoROPkFwgE5O2335YLLrhAjj76aDnqqKOkWrVq0rZtW+tPeHgWa9askXHjxoV7R3SzIeO4446TG2+8MWK4eqYWAkrQUnxeeXl5MmzYMGnfvr18+OGH0qlTJ+nTp4906NBBPvjgA+v/8MMPC/Fctb799lu57LLL5L///a/zUrOMEcjOzp5cv379pqVRDSVoaaAcLOOjjz6SCRMmyPnnny+bN2+WWbNmycSJE6351VdfyTnnnCOjRo2SN998M5ii6MYZZ5whO3fulKeffrroiTWFXwRuMj2dtYaok5JNVCWo30eSgHh0bQ8cOCA333yzVK9evUCOtWvXlrvuukvMg5eZM2das0AEdZRHBPqZ55VUosYkaL169XqHUFFLwhDYtWtXxLxatmwp5osse/bskf3798vChQulUaNGVtu+8MILdrz66KOPyr59++TCCy+UG264QaZOnSrHHnusHc8+9NBDtqscPgZlPEr8L774Qq655hobl7Hvb37zG/nXv/5V6GOQk5MjPXr0CMVr166d/Oc//7Flkg/lR2xA5nomjagxCZqVlfWMUeOfKlET8+ade+65csQRR1gNSlcWIpgvcChzg7WsXbvWalAmkOiu0gWuUaOG7f7OmDHDjltdgvnz58vo0aPlvvvukxEjRsgf//hHqVixogsuYNKFZqybm5srf//734X4W7ZssfktX748FHf16tW2rMWLF0u/fv1k2rRpNk8msSBp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",
    
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
