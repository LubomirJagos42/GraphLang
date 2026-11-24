// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.File.fwrite = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.File.fwrite",

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

     // stringToWrite
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 53.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#E300F3");
     port.setName("stringToWrite");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "String";
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

        // Rectangle
        shape = this.canvas.paper.path('M26,40L28,34L38,22L42,26L32,38Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#F3EC24","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M28,34L32,38');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'File');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"File","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
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

    docString: "write into file provided by reference",

    translateToCppCodeImport: function(){
        return "#include<cstdlib>\n";
    },

    translateToCppCode: function(){
        let cCode = "";
        let filePtr = this.getInputPort("fileRef").getConnections().first().getVariableName();
        let stringIn = this.getInputPort("stringToWrite").getConnections().first().getVariableName();

        cCode += `fwrite(${stringIn}.data(), sizeof(char), ${stringIn}.length(), ${filePtr});\n`

        return cCode;
    },

    translateToPythonCode: function(){
        let fileConnections = this.getInputPort("fileRef").getConnections();
        let stringConnections = this.getInputPort("stringToWrite").getConnections();
        if (fileConnections.getSize() == 0 || stringConnections.getSize() == 0){
            return "# ERROR: fwrite has not connected file reference or string to write\n";
        }
        let filePtr = fileConnections.first().getVariableName();
        let stringIn = stringConnections.first().getVariableName();

        return `${filePtr}.write(str(${stringIn}))\n`;
    },


});