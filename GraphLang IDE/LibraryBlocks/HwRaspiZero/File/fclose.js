// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwRaspiZero.File.fclose = GraphLang.UserDefinedNode.extend({

   NAME: "HwRaspiZero.File.fclose",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:86, height:60.928, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // fileRef
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0.6911860093023385, 23.81205378151276));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("fileRef");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "FILE*";
     port.userData.allowMultipleConnections = false;
     port.userData.connectionMandatory = false;

     // errorIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0.6911860093023385, 89.01762016806744));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3E957");
     port.setName("errorIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";
     port.userData.allowMultipleConnections = false;
     port.userData.connectionMandatory = false;

     // errorOut
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(101.66661626046512, 89.01762016806744));
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
      this.originalWidth = 86;
      this.originalHeight= 60.928;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L86,0 L86,60.928 L0,60.928");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path('M11.824910591999924 0L72.75291059199992 0L72.75291059199992 60.928L11.824910591999924 60.928Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        
        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({"rx":8.72415232000003,"ry":8.72415232000003,"cx":56.750493952000056,"cy":47.578832895999994,"stroke":"none","stroke-width":0,"fill":"#C02626","dasharray":null,"opacity":1});
        shape.data("name","Circle");
        
        // Line_shadow
        shape = this.canvas.paper.path('M29.5 15.5L49.5,15.5L55.5,21.5L54.5,48.5L29.5,48.5L29.5,16.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M29.5 15.5L49.5,15.5L55.5,21.5L54.5,48.5L29.5,48.5L29.5,16.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M31.5 23.5L45.5,23.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M31.5 23.5L45.5,23.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M33.5 26.5L44.5,26.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M33.5 26.5L44.5,26.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M33.5 29.5L49.5,28.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M33.5 29.5L49.5,28.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M32.5 31.5L46.5,30.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M32.5 31.5L46.5,30.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M34.5 33.5L46.5,34.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M34.5 33.5L46.5,34.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M34.5 35.5L46.5,35.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M34.5 35.5L46.5,35.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M34.5 39.5L46.5,40.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M34.5 39.5L46.5,40.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M54.5 20.5L49.5,21.5L48.5,15.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M54.5 20.5L49.5,21.5L48.5,15.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M74.5 51.5L86.5,51.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M74.5 51.5L86.5,51.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M13.5 51.5L0.5,51.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M13.5 51.5L0.5,51.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M13.5 11.5L0.5,12.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M13.5 11.5L0.5,12.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M53.5 44.5L62.5,51.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":2,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M53.5 44.5L62.5,51.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#FFFFFF","stroke-width":2,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M61.5 43.5L55.5,50.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":2,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M61.5 43.5L55.5,50.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#FFFFFF","stroke-width":2,"stroke-dasharray":null,"opacity":1});
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
    
    symbolPicture: "data:image/png;base64,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",
    
    jsonDocument: [],
    
    translateToCppCodeImport: function(){
        return "#include<cstdlib>\n";
    },

translateToCppCode: function(){
        let connectionsIn = this.getInputPort("fileRef").getConnections();

        let cCode = "";
        connections = this.getInputPort("fileRef").getConnections().each(function(connIndex, connObj){
            cCode += `fclose(wire_${connObj.getId()});\n`;
        });
        return cCode;
    },


});