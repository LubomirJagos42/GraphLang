// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
XXddXX = GraphLang.UserDefinedNode.extend({            

   NAME: "XXddXX",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:73, height:53, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // Port
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(95.8904109589041, 41.509433962264154));
     port.setConnectionDirection();
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // Port
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(63.013698630136986, 86.79245283018868));
     port.setConnectionDirection();
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // Port
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(36.986301369863014, 41.509433962264154));
     port.setConnectionDirection();
     port.setBackgroundColor("#37B1DE");
     port.setName("Port");
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
      this.originalWidth = 73;
      this.originalHeight= 53;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L73,0 L73,53 L0,53");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path('M0 0L58 0L58 53L0 53Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        
        // Rectangle
        shape = this.canvas.paper.path('M73 29L51 29L51 9L73 9Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        

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
    
    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAABJCAYAAABfNipOAAAAAXNSR0IArs4c6QAAA1hJREFUeF7t3L9vEmEYB/CHaNTJzcQfuywdGBzUPwAW4+DmWBMCUcLmogmeTdrFjaABGTrqZEzjAnHQpXWAhKELGINGuWpME6MmtijWHHrmoHA8770v99D2y0Thvfd578PDc+/deyVCeIQuEAk9IgIS0AWSAOhAFxAQCIlMB7qAgEBIZDrQBQQEQrIyPRaLWQJjc0PuEA1Mbb1/D783apjc9v/bNRqNqe4vGz2VSt0RhA8tdKlUujtT6Ol0OrSdlwhULBYJ6CHLAz1kcCcc0IEes5wDKWq6mUxQmr0AHehmBDy9oKYbJ/3boQM77lGr1aher78gopeeNs5Jk/NwqoL73Pu3+3q/anDm+AeuvPih637O3Dn+gUU3fXxSKU1A103vf9sD3QfSLS/IdEPZxukG6Bwlw22AbhiU0x3Qh5QqlQo1m83+q9FolBKJBMdRqY0p9OGxtttt9mXhmZi9VKtVupWz6NCJ09Q9dbaPeGSjRb3PNi0tWBSPx5Vg/Rrroo8b67d3r6m3vfW41WpdnTRYcXRnJ9I3MnR83qJjcxcGxru1vkZfly0q3i8Yg9dBnzTWzYe3e79/dq/Ytr3iBy+Ofu78Rfp1ObML3B20A394pUC1V6uTEoj1vg46Z6yb5Zz94e2bMzOL7tTFXKFMkeQ9X7Cd8k1ayCSN1Pig6Nyxflq6ttF937pu2/bTcTslmun5fJ6W1z/S0UtJX/TtZ2WanztJ2WyWlc3TqOncsX558uDH9+ePFjudziLQPafrzlPVM9J9g879yqK8aH/BBzvgHJxwIDWMPmkahinjlG42wsnRiEx27mUM424AXAbw4IeFbrhyjewOy3VhKA/FCLAwrTRKLEwrceG2OkUuM81V1jl1IopeBtAZ+DS2Bfo0VCf0CXSghzNPF3AeCIlMF/gEgA50lBeTOYApo0cT5UUztYJcPAN6QHSdy8RAD4CuuyAC9ADoukt/QFdEN7HIDXRFdO4tEn730AAd6LN/coTyopilpprjQGpKUqEfTBkVsEw2xcmRSU3FvvbNZQDF/d6Tzbn/aq6zc+yrjDpBDG3r/poc5xfqvCE57Qf65ty7orNPLHSdANh2twDQBbIC6EAXEBAIiUwHuoCAQEhkOtAFBARCItMF0P8AR/jQdwDJ5xIAAAAASUVORK5CYII=",
    
    jsonDocument: [],
    
    
});