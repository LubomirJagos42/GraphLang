// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
GraphLang.Shapes.Basic.ArrayIndex = GraphLang.UserDefinedNode.extend({

   NAME: "GraphLang.Basic.Shapes.ArrayIndex",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({width:54.975581388799924, height:22.861321011200232},attr), setter, getter);
     var port;

     // arrayElement_out
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(107.14182201772935, 45.92910442426243));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#FFFFFF");
     port.setName("arrayElement_out");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "undefined";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // index_in
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-1.061302982270655, 100.24967493685875));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#FFFFFF");
     port.setName("index_in");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // array_in
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-1.061302982270655, 45.92910442426243));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#0CCDF3");
     port.setName("array_in");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "polymorphic";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 54.975581388799924;
      this.originalHeight= 22.861321011200232;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L54.975581388799924,0 L54.975581388799924,22.861321011200232 L0,22.861321011200232");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path('M10.584250163199613 4.91840000000002L45.58425016319961 4.91840000000002L45.58425016319961 16.91840000000002L10.584250163199613 16.91840000000002Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        

        // Label
        shape = this.canvas.paper.text(0,0,'index');
        shape.attr({"x":17.076437663199613,"y":10.5,"text-anchor":"start","text":"index","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        
        // Line_shadow
        shape = this.canvas.paper.path('M45.5 10.5L54.5,10.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M45.5 10.5L54.5,10.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M10.5 10.5L1.5,10.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M10.5 10.5L1.5,10.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M0.5 22.5L19.5,22.5L19.5,17.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M0.5 22.5L19.5,22.5L19.5,17.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        return this.canvas.paper.setFinish();
   },

    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAAqCAYAAAAUJM0rAAAAn0lEQVR4AezSMQrAIBQFwU/uf+j0qRaCojB2whY6vGecJAAqMc2AAhUFYmZRoKJAzCwKVBSImUWBigIxsyhQUSBmFgXqK/DvblHRDxSoKBAziwIVBWJmUaCiQMwsClQUiJlFgYoCMbMoUFEgZlctKv5pSQYqsoICFQViZlGgokDMLApUFIiZRYGKAjGzKFBRIGYWBSoKxGzzouKrDsxeAAAA//9qPLB3AAAABklEQVQDAGBwAFXCtFFGAAAAAElFTkSuQmCC",
    
    jsonDocument: [],
    
    translateToCppCode: function(){
        let cCode = "";
        let arrayName = this.getInputPort("array_in").getConnections().first().getVariableName();    //TODO: takes just first connection
        let indexVariableName = this.getInputPort("index_in").getConnections().first().getVariableName();    //TODO: takes just first connection

        this.getOutputPort("arrayElement_out").getConnections().each(function(outWireIndex, outWireObj){
            cCode += `${outWireObj.getVariableName()} = ${arrayName}[${indexVariableName}];\n`;
        });

        return cCode;
    },

});