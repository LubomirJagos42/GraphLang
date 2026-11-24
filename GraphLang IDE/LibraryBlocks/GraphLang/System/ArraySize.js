/**
 *  @author LuboJ
 *  @description Number of items in 1D array (C++ vector size(), python len()). Output is int, so it can be connected to ForLoop iteration count.
 */
GraphLang.Shapes.Basic.ArraySize = GraphLang.UserDefinedNode.extend({

   NAME: "GraphLang.Shapes.Basic.ArraySize",

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

     // size_out
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(98, 50.0));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#0000FF");
     port.setName("size_out");
     port.setMaxFanOut(20);
     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";

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
        shape = this.canvas.paper.text(0,0,'n');
        shape.attr({"x":82,"y":24.5,"text-anchor":"start","text":"n","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.text(0,0,'size');
        shape.attr({"x":50.0,"y":27.0,"text-anchor":"middle","text":"size","font-family":"Arial","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"bold","stroke-width":0,"opacity":1});
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

    translateToCppCode: function(){
        let inConnections = this.getInputPort("array_in").getConnections();
        if (inConnections.getSize() == 0) return "/* ERROR: ArraySize input array_in not connected */\n";
        let arrayName = inConnections.first().getVariableName();
        let cCode = "";
        this.getOutputPort("size_out").getConnections().each(function(wireIndex, wireObj){
            cCode += wireObj.getVariableName() + " = (int)" + arrayName + ".size();\n";
        });
        return cCode;
    },

    translateToPythonCode: function(){
        let inConnections = this.getInputPort("array_in").getConnections();
        if (inConnections.getSize() == 0) return "# ERROR: ArraySize input array_in not connected\n";
        let arrayName = inConnections.first().getVariableName();
        let pythonCode = "";
        this.getOutputPort("size_out").getConnections().each(function(wireIndex, wireObj){
            pythonCode += wireObj.getVariableName() + " = len(" + arrayName + ")\n";
        });
        return pythonCode;
    },
});
