/**
 *  @author LuboJ
 *  @description Converts 1D array of any numeric item type (ie. uint8_t samples) to array of double (C++ vector<double>, python list of float).
 */
GraphLang.Shapes.Basic.ArrayToDouble = GraphLang.UserDefinedNode.extend({

   NAME: "GraphLang.Shapes.Basic.ArrayToDouble",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;

     // array_in
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(2, 50.0));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3A07C");
     port.setName("array_in");
     port.setMaxFanOut(20);
     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
     port.userData.connectionMandatory = true;

     // array_out
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(98, 50.0));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#F3A07C");
     port.setName("array_out");
     port.setMaxFanOut(20);
     if (!port.userData) port.userData = {}
     port.userData.datatype = "vector<double>";

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 100;
      this.originalHeight= 60;
      return shape;
   },

   createSet: function()
   {
        this.canvas.paper.setStart();
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L100,0 L100,60 L0,60");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M20 0L80 0L80 60L20 60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFF7E6","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        shape = this.canvas.paper.path('M0.5 30.5L20.5,30.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        shape = this.canvas.paper.text(0,0,'[ ]');
        shape.attr({"x":2,"y":24.5,"text-anchor":"start","text":"[ ]","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.path('M80.5 30.5L99.5,30.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        shape = this.canvas.paper.text(0,0,'[ ]');
        shape.attr({"x":82,"y":24.5,"text-anchor":"start","text":"[ ]","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.text(0,0,'double[]');
        shape.attr({"x":50.0,"y":27.0,"text-anchor":"middle","text":"double[]","font-family":"Arial","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.text(0,0,'array');
        shape.attr({"x":50.0,"y":53,"text-anchor":"middle","text":"array","font-family":"Arial","font-size":8,"stroke":"none","fill":"#606060","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
      this.svgNodes.forEach(function(node){
          if(node.data("name")===name){
               if(flag){node.show();}
               else{node.hide();}
           }
       });
   },

    getParameterSettings: function()
    {
        return [];
    },

    addPort: function(port, locator)
    {
        this._super(port, locator);
        return port;
    },

    getPersistentAttributes : function()
    {
        var memento = this._super();
        memento.labels = [];
        this.children.each(function(i,e){
            var labelJSON = e.figure.getPersistentAttributes();
            labelJSON.locator=e.locator.NAME;
            memento.labels.push(labelJSON);
        });
        return memento;
    },

    setPersistentAttributes : function(memento)
    {
        this._super(memento);
        this.resetChildren();
        $.each(memento.labels, $.proxy(function(i,json){
            var figure =  eval("new "+json.type+"()");
            figure.attr(json);
            var locator =  eval("new "+json.locator+"()");
            this.add(figure, locator);
        },this));
    },

    symbolPicture: "data:image/png;base64,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",

    jsonDocument: [],

    translateToCppCodeImport: function(){
        return "#include <vector>";
    },

    translateToCppCode: function(){
        let inConnections = this.getInputPort("array_in").getConnections();
        if (inConnections.getSize() == 0) return "/* ERROR: ArrayToDouble input array_in not connected */\n";
        let arrayName = inConnections.first().getVariableName();
        let cCode = "";
        this.getOutputPort("array_out").getConnections().each(function(wireIndex, wireObj){
            cCode += wireObj.getVariableName() + " = vector<double>(" + arrayName + ".begin(), " + arrayName + ".end());\n";
        });
        return cCode;
    },

    translateToPythonCode: function(){
        let inConnections = this.getInputPort("array_in").getConnections();
        if (inConnections.getSize() == 0) return "# ERROR: ArrayToDouble input array_in not connected\n";
        let arrayName = inConnections.first().getVariableName();
        let pythonCode = "";
        this.getOutputPort("array_out").getConnections().each(function(wireIndex, wireObj){
            pythonCode += wireObj.getVariableName() + " = [float(v) for v in " + arrayName + "]\n";
        });
        return pythonCode;
    },
});
