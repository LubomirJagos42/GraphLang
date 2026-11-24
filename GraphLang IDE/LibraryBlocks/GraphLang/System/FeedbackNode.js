// Generated Code for the Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
// Go to the Designer http://www.draw2d.org
// to design your own shape or download user generated
//
GraphLang.Shapes.Basic.FeedbackNode = draw2d.SetFigure.extend({

   NAME: "GraphLang.Shapes.Basic.FeedbackNode",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:36,height:26},attr), setter, getter);
     var port;
     // Port
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(0, 42.307692));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#3F81F3");
     port.setName("out1");
     port.setMaxFanOut(20);
     port.userData = {datatype: "undefined", executionOrder: 1};
     port.getDatatype = function(){
         return this.getParent().getInputPort("in2").getDatatype(); //use default value port function to get datatype
     };

     // Port
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(100, 42.307692));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#F3D92E");
     port.setName("in1");
     port.setMaxFanOut(20);
     port.userData = {datatype: "undefined",  executionOrder: 0};
     port.getDatatype = function(){
         return this.getParent().getInputPort("in2").getDatatype(); //use default value port function to get datatype
     };

     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(50, 100));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#F3D92E");
     port.setName("in2");
     port.setMaxFanOut(20);
     port.userData = {datatype: "undefined",  executionOrder: 0};
     port.getDatatype = function(){     //this will look at wire connected to default value port, TODO: look also for value input in case there is no default value connected
         let datatypeStr = "undefined";
         try {
             if (this.getConnections().getSize() > 0) {
                 let sourceConnectionPort = this.getConnections().get(0).getSource();
                 if (sourceConnectionPort.getDatatype) datatypeStr = sourceConnectionPort.getDatatype();
                 else datatypeStr = this.getConnections().get(0).getSource().userData.datatype;
             }else if (this.getInputPort("in1").getConnections().getSize() > 0){
                 let sourceConnectionPort = this.getInputPort("in1").getConnections().get(0).getSource();
                 if (sourceConnectionPort.getDatatype) datatypeStr = sourceConnectionPort.getDatatype();
                 else datatypeStr = this.getConnections().get(0).getSource().userData.datatype;
             }
         }catch (e){
             console.log("Feedback node datatype error.");
         }
         return datatypeStr;
     };

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 36;
      this.originalHeight= 26;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L36,0 L36,26 L0,26");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Line
        shape = this.canvas.paper.path('M0,11L5,11');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M31,11L36,11');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M18,20L18,26');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M5,2L31,2L31,20L5,20Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M10,8L7,11L10,14');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'z');
        shape.attr({"x":17,"y":13,"text-anchor":"middle","text":"z","font-size":11,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'-1');
        shape.attr({"x":24,"y":8,"text-anchor":"middle","text":"-1","font-size":7,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
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
        // keep compact size from init also for schematics saved with the old bigger symbol
        var w = this.getWidth(), h = this.getHeight();
        this._super(memento);
        this.setDimension(w, h);

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

    /**
     *  @name getDeclaration
     *  @desc Just feedback declaration to define its datatype.
     *  @returns {string} C code string, each line is finished with newline symbol \n
     */
    translateToCppCodeDeclaration:function(){
      cCode = "";
      var inDefault = this.getInputPort(1);
      
      //var feedbackDatatype = inDefault.getConnections().get(0).getSource().userData.datatype;
      var feedbackDatatype = inDefault.getDatatype();

      cCode += "bool feedBackNodeFlag_" + this.getId() + " = false;\n";
      cCode += feedbackDatatype + " feedBackNode_" + this.getId() + ";\n";

      return cCode;
    },

    translateToCppCode: function(){
        //get all necessary port to have more readable code
        var out0 = this.getOutputPort(0);                               //for right numbering have to take look at init part and think how numbers are :)
        var in0 = this.getInputPort(0);
        var inDefault = this.getInputPort(1);

        //var feedbackDatatype = inDefault.getConnections().get(0).getSource().userData.datatype;
        var feedbackDatatype = inDefault.getDatatype();

        in0.userData.datatype = feedbackDatatype;
        out0.userData.datatype = feedbackDatatype;

        cCode = "";

        //assign default value to feeback node value, this is little fiddling with C/C++ preprocessor
        cCode += "if(!feedBackNodeFlag_" + this.getId() + "){\n";
        cCode += "\tfeedBackNodeFlag_" + this.getId() + " = true;\n";

        //TODO: this is wrong but still better than nothing
        if (inDefault.getConnections().getSize() > 0) {
            cCode += "\tfeedBackNode_" + this.getId() + " = " + inDefault.getConnections().get(0).getVariableName() + ";\n";
        }else{
            cCode += "\tfeedBackNode_" + this.getId() + " = null;\n";
        }

        cCode += "}else{\n";
        cCode += "\tfeedBackNode_" + this.getId() + " = " + in0.getConnections().get(0).getVariableName() + ";\n"; //assign input value for feedback node value, this makes buffer effect
        cCode += "}\n";

        //assign output value to output wire
        feedbackObj = this;
        out0.getConnections().each(function(wireIndex, wireObj){
            //cCode += out0.getConnections().get(0).getVariableName() + " = feedBackNode_" + feedbackObj.getId() + ";\n";
            cCode += wireObj.getVariableName() + " = feedBackNode_" + feedbackObj.getId() + ";\n";
        });

        return cCode;
    },

    /*****************************************************************************************************************************************************
     *    TRANSLATE TO Python code functions, same logic as C++: first iteration takes default value (in2), next iterations value from in1
     *    stored in previous iteration. Declaration is placed by loop before loop starts (see Loop2 python tunnels declaration).
     *****************************************************************************************************************************************************/

    translateToPythonCodeDeclaration: function(){
        let pythonCode = "";
        pythonCode += "feedBackNodeFlag_" + this.getId() + " = False\n";
        pythonCode += "feedBackNode_" + this.getId() + " = None\n";
        return pythonCode;
    },

    translateToPythonCode: function(){
        let in0 = this.getInputPort(0);
        let inDefault = this.getInputPort(1);
        let out0 = this.getOutputPort(0);
        let id = this.getId();
        let pythonCode = "";

        pythonCode += `if not feedBackNodeFlag_${id}:\n`;
        pythonCode += `    feedBackNodeFlag_${id} = True\n`;
        if (inDefault.getConnections().getSize() > 0){
            pythonCode += `    feedBackNode_${id} = ${inDefault.getConnections().get(0).getVariableName()}\n`;
        }else{
            pythonCode += `    feedBackNode_${id} = None\n`;
        }
        pythonCode += "else:\n";
        if (in0.getConnections().getSize() > 0){
            pythonCode += `    feedBackNode_${id} = ${in0.getConnections().get(0).getVariableName()}\n`;
        }else{
            pythonCode += `    pass  # ERROR: feedback node input in1 not connected\n`;
        }

        out0.getConnections().each(function(wireIndex, wireObj){
            pythonCode += `${wireObj.getVariableName()} = feedBackNode_${id}\n`;
        });
        return pythonCode;
    },

});
