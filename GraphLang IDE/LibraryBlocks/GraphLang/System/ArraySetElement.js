// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
GraphLang.Shapes.Basic.ArraySetElement = GraphLang.UserDefinedNode.extend({            

   NAME: "GraphLang.Shapes.Basic.ArraySetElement",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:81.25732217673897, height:52, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // arrayRefIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0.5977360691976168, 16.627951568739263));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#FFFFFF");
     port.setName("arrayRefIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // arrayIndexIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0.5977360691976168, 37.78179772258542));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("arrayIndexIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "uint";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // errorIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0.5977360691976168, 90.38461538461539));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3F320");
     port.setName("errorIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // errorOut
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.92433539579687, 90.38461538461539));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#F3F320");
     port.setName("errorOut");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // arrayRefOut
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(99.92433539579687, 16.627951568739263));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#FFFFFF");
     port.setName("arrayRefOut");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // arrayElementIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0.5977360691976168, 58.93564387643157));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("arrayElementIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 81.25732217673897;
      this.originalHeight= 52;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L81.25732217673897,0 L81.25732217673897,52 L0,52");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path('M13.890632252786304 0L68.8906322527863 0L68.8906322527863 52L13.890632252786304 52Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        
        // Rectangle
        shape = this.canvas.paper.path('M20.355031612786775 7.977039360000276L62.29807161278677 7.977039360000276L62.29807161278677 17.204508160000273L20.355031612786775 17.204508160000273Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        
        // Rectangle
        shape = this.canvas.paper.path('M20.57224958378208 25.646534815744417L26.949417024882905 25.646534815744417L26.949417024882905 32.84833597767715L20.57224958378208 32.84833597767715Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        
        // Line_shadow
        shape = this.canvas.paper.path('M55.5 16.5L55.5,8.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M55.5 16.5L55.5,8.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M48.5 8.5L48.5,16.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M48.5 8.5L48.5,16.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M41.5 8.5L41.5,16.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M41.5 8.5L41.5,16.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M33.5 8.5L33.5,16.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M33.5 8.5L33.5,16.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M26.5 8.5L26.5,16.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M26.5 8.5L26.5,16.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M27.5 29.5L36.5,29.5L45.5,29.5L45.5,17.5L43.5,21.5L47.5,21.5L45.5,17.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M27.5 29.5L36.5,29.5L45.5,29.5L45.5,17.5L43.5,21.5L47.5,21.5L45.5,17.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M68.5 46.5L80.5,46.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M68.5 46.5L80.5,46.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M69.5 8.5L74.5,8.5L81.5,8.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M69.5 8.5L74.5,8.5L81.5,8.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M13.5 47.5L1.5,47.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M13.5 47.5L1.5,47.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M13.5 7.5L1.5,7.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M13.5 7.5L1.5,7.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M13.5 19.5L1.5,19.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M13.5 19.5L1.5,19.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M13.5 29.5L0.5,29.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M13.5 29.5L0.5,29.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
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
    
    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABICAYAAADvTjsnAAABX0lEQVR4AeyTUWoDUQzEQu9/6B7AMBBKkLZRPu2wnicxP69+OgJJ0Sl5vZKSFCEBYaSakhQhAWGkmpIUIQFhpJqSFCEBYaT3miJ8wH+MlBSh1aQkRUhAGKmmJEVIQBippiRFSEAYqaYkRUhAGOmTTRE+9xmRkiL0lJSkCAkII9WUpAgJCCPVlKQICQgj1ZSkCAkII3maIoRDRUoKRX7cTcqAQ62SQpEfd5My4FCrpFDkx92kDDjUKikU+XE3KQMOtUoKRX7cfaqU8aTnr5IidJiUpAgJCCPVlKQICQgj1ZSkCAkII9WUpAgJCCN9R1OE4FekpCw60C4pEPh1NimLDrRLCgR+nU3KogPtkgKBX2eTsuhAu6RA4NfZpCw60C4pFzw+SQqu4AZIymWCT5KCK7gBknKZ4JOk4ApugKRcJvgkKbiCGyAplwk+SQqu4AZIymXy3uQD/07KB6D+9ZO/AAAA//+aaH7WAAAABklEQVQDAO7wAJGyDo1nAAAAAElFTkSuQmCC",
    
    jsonDocument: [],
    
    
});