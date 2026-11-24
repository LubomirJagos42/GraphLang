// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.File.fclose = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.File.fclose",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // fileRef
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("fileRef");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "FILE*";
     port.userData.allowMultipleConnections = false;
     port.userData.connectionMandatory = false;

     // errorIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3E957");
     port.setName("errorIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";
     port.userData.allowMultipleConnections = false;
     port.userData.connectionMandatory = false;

     // errorOut
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 73.333333));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#F3E957");
     port.setName("errorOut");
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
        shape = this.canvas.paper.path('M0,20L20,20');
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

        // Rectangle
        shape = this.canvas.paper.path('M44,16L56,16L62,22L62,42L44,42Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M56,16L56,22L62,22');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M47,27L58,27');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M47,31L58,31');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M47,35L58,35');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M28,22L40,36');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M28,36L40,22');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'File');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"File","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'close');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"close","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
    
    translateToCppCodeImport: function(){
        return "#include<cstdlib>\n";
    },

translateToCppCode: function(){
        let connectionsIn = this.getInputPort("fileRef").getConnections();

        let cCode = "";
        connections = this.getInputPort("fileRef").getConnections().each(function(connIndex, connObj){
            cCode += `fclose(${connObj.getVariableName()});\n`;
        });
        return cCode;
    },

    translateToPythonCode: function(){
        let pythonCode = "";
        this.getInputPort("fileRef").getConnections().each(function(connIndex, connObj){
            pythonCode += `${connObj.getVariableName()}.close()\n`;
        });
        if (pythonCode === "") pythonCode = "# ERROR: fclose has not connected file reference\n";
        return pythonCode;
    },


});