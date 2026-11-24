// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.File.fileSize = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.File.fileSize",

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

     // fileSize
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 33.333333));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#0028F3");
     port.setName("fileSize");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "uint";
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

        // Line
        shape = this.canvas.paper.path('M80,20L100,20');
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
        shape = this.canvas.paper.path('M34,17L34,41');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M30,21L34,17L38,21');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M30,37L34,41L38,37');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'File');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"File","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'size');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"size","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
        let connections = this.getInputPort("fileRef").getConnections();

        let cCode = "";
        if (connections.getSize() > 0){
            let fileRef = connections.first().getVariableName();
            cCode = `
// Determine the file size
fseek(${fileRef}, 0, SEEK_END);
long fileSize = ftell(${fileRef});
rewind(${fileRef});
`;

            connections = this.getOutputPort("fileSize").getConnections().each(function(connIndex, connObj){
                cCode += `${connObj.getVariableName()} = fileSize;\n`;
            });
        }
        return cCode;
    },


});