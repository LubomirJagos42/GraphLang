// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.File.fread = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.File.fread",

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

     // bytesCountToRead
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 53.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("bytesCountToRead");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
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

     // fileContent
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 33.333333));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#F300AA");
     port.setName("fileContent");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "String";
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
        shape = this.canvas.paper.path('M0,32L20,32');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,44L100,44');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,20L100,20');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M30,16L42,16L48,22L48,42L30,42Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M42,16L42,22L48,22');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M33,27L44,27');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M33,31L44,31');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M33,35L44,35');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M52,29L72,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M68,25L72,29L68,33');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'File');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"File","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'read');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"read","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
        let connectionsOut = this.getOutputPort("fileContent").getConnections();

        let cCode = "";
        if (connectionsIn.getSize() > 0 && connectionsOut.getSize() > 0){
            let filePtr = connectionsIn.first().getVariableName();

            cCode += "// Allocate a buffer to hold the file content\n";
            cCode += `char* fileContentBuffer_internal = new char[${this.getInputPort("bytesCountToRead").getConnections().first().getVariableName()} + 1];\n`;
            cCode += `fileSize = ${this.getInputPort("bytesCountToRead").getConnections().first().getVariableName()};\n`;
            cCode += `// Read the file content into the buffer\n`;
            cCode += `fread(fileContentBuffer_internal, 1, fileSize, ${filePtr});\n`
            this.getOutputPort("fileContent").getConnections().each(function(connIndex, connObj){
                cCode += `${connObj.getVariableName()} = fileContentBuffer_internal;\n`;
            });
        }
        return cCode;
    },


});