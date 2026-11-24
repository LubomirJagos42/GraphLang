/**
 *  @author LuboJ
 *  @description Returns copy of 1D array with element added at the end (C++ vector push_back, python list + [item]). Output datatype is same as array connected to array_in, ie. vector<double>.
 */
GraphLang.Shapes.Basic.ArrayAppend = GraphLang.UserDefinedNode.extend({

   NAME: "GraphLang.Shapes.Basic.ArrayAppend",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;

     // array_in
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(2, 25.0));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3A07C");
     port.setName("array_in");
     port.setMaxFanOut(20);
     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
     port.userData.connectionMandatory = true;

     // element_in
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(2, 75.0));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F08A24");
     port.setName("element_in");
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
     port.getDatatype = function(){
         //same datatype as array connected to input, this is needed ie. for feedback node holding array
         let inPort = this.getParent().getInputPort("array_in");
         if (inPort.getConnections().getSize() > 0){
             let sourcePort = inPort.getConnections().first().getSource();
             let sourceParent = sourcePort.getParent();
             if (sourceParent && sourceParent.NAME.toLowerCase().search('tunnel') > -1 && sourceParent.getDatatype) return sourceParent.getDatatype();
             if (typeof sourcePort.getDatatype === "function") return sourcePort.getDatatype();
             if (sourcePort.userData && sourcePort.userData.datatype) return sourcePort.userData.datatype;
         }
         return this.userData.datatype;
     };

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
        shape = this.canvas.paper.path('M0.5 15.5L20.5,15.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        shape = this.canvas.paper.text(0,0,'[ ]');
        shape.attr({"x":2,"y":9.5,"text-anchor":"start","text":"[ ]","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.path('M0.5 45.5L20.5,45.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        shape = this.canvas.paper.text(0,0,'e');
        shape.attr({"x":2,"y":39.5,"text-anchor":"start","text":"e","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.path('M80.5 30.5L99.5,30.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        shape = this.canvas.paper.text(0,0,'[ ]');
        shape.attr({"x":82,"y":24.5,"text-anchor":"start","text":"[ ]","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.text(0,0,'append');
        shape.attr({"x":50.0,"y":27.0,"text-anchor":"middle","text":"append","font-family":"Arial","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"bold","stroke-width":0,"opacity":1});
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
        let arrayConnections = this.getInputPort("array_in").getConnections();
        let elementConnections = this.getInputPort("element_in").getConnections();
        if (arrayConnections.getSize() == 0 || elementConnections.getSize() == 0) return "/* ERROR: ArrayAppend inputs array_in and element_in must be connected */\n";
        let arrayName = arrayConnections.first().getVariableName();
        let elementName = elementConnections.first().getVariableName();
        let cCode = "";
        this.getOutputPort("array_out").getConnections().each(function(wireIndex, wireObj){
            cCode += wireObj.getVariableName() + " = " + arrayName + ";\n";
            cCode += wireObj.getVariableName() + ".push_back(" + elementName + ");\n";
        });
        return cCode;
    },

    translateToPythonCode: function(){
        let arrayConnections = this.getInputPort("array_in").getConnections();
        let elementConnections = this.getInputPort("element_in").getConnections();
        if (arrayConnections.getSize() == 0 || elementConnections.getSize() == 0) return "# ERROR: ArrayAppend inputs array_in and element_in must be connected\n";
        let arrayName = arrayConnections.first().getVariableName();
        let elementName = elementConnections.first().getVariableName();
        let pythonCode = "";
        this.getOutputPort("array_out").getConnections().each(function(wireIndex, wireObj){
            pythonCode += wireObj.getVariableName() + " = list(" + arrayName + ") + [" + elementName + "]\n";
        });
        return pythonCode;
    },
});
