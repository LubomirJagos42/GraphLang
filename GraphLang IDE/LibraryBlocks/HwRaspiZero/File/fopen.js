// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.File.fopen = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.File.fopen",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // fileName
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("fileName");
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

     // fileRef
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 33.333333));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("fileRef");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "FILE*";
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
        shape = this.canvas.paper.path('M26,29L41,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M37,25L41,29L37,33');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'File');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"File","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'open');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"open","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
        let connectionsIn = this.getInputPort("fileName").getConnections();
        let connectionsOut = this.getOutputPort("fileRef").getConnections();

        let cCode = "";
        if (connectionsIn.getSize() > 0 && connectionsOut.getSize() > 0){
            let fileName = connectionsIn.first().getVariableName();
            let filePtr = "filePtr_" + connectionsOut.first().getVariableName();
            cCode = `FILE* ${filePtr} = fopen(${fileName}.c_str(), "w+");\n`

            connections = this.getOutputPort("fileRef").getConnections().each(function(connIndex, connObj){
                cCode += `${connObj.getVariableName()} = ${filePtr};\n`;
            });
        }
        return cCode;
    },

    /*
     *  Python: file object is returned by open(), it's same reference as FILE* in C
     */
    translateToPythonCode: function(){
        let connectionsIn = this.getInputPort("fileName").getConnections();
        let connectionsOut = this.getOutputPort("fileRef").getConnections();

        let pythonCode = "";
        if (connectionsIn.getSize() > 0 && connectionsOut.getSize() > 0){
            let fileName = connectionsIn.first().getVariableName();
            let filePtr = "filePtr_" + connectionsOut.first().getVariableName();
            pythonCode = `${filePtr} = open(${fileName}, "w+")\n`;

            connectionsOut.each(function(connIndex, connObj){
                pythonCode += `${connObj.getVariableName()} = ${filePtr}\n`;
            });
        }else{
            pythonCode = "# ERROR: fopen has not connected file name or file reference\n";
        }
        return pythonCode;
    },


});