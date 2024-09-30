GraphLangTestShape57 = GraphLang.UserDefinedNode.extend({
  NAME: "GraphLangTestShape57",
  init: function(attr,setter,getter){
    this._super( $.extend({stroke:0, bgColor:null, width:60, height:49, flagAutoCreatePorts: false},attr), setter, getter);
    var port;
    port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-25, 32.6530612244898));
    port.setConnectionDirection(3);
    port.setBackgroundColor("#37B1DE");
    port.setName("in1");
    port.setMaxFanOut(20);

    port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-18.333333333333336, 81.63265306122449));
    port.setConnectionDirection(3);
    port.setBackgroundColor("#37B1DE");
    port.setName("in2");
    port.setMaxFanOut(20);

    port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(120, 57.142857142857146));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#37B1DE");
    port.setName("out1");
    port.setMaxFanOut(20);

    port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(125, 93.87755102040816));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#37B1DE");
    port.setName("out2");
    port.setMaxFanOut(20);

    this.persistPorts=false;
  },
  createShapeElement: function(){
    var shape = this._super();
    this.originalWidth = 60;
    this.originalHeight = 49;
    return shape;
  },
  createSet: function()
  {
    this.canvas.paper.setStart();

    // BoundingBox
    shape = this.canvas.paper.path("M0,0 L60,0 L60,49 L0,49");
    shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
    shape.data("name","BoundingBox");

    // Rectangle
    shape = this.canvas.paper.path('M60 49L0 49L0 0L60 0Z');
    shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
    shape.data("name","Rectangle");


    return this.canvas.paper.setFinish();
  },
  jsonDocument: [{"type":"GraphLang.Shapes.Basic.Loop2.ForLoop","id":"36aee09b-f076-cd03-88b0-169cd352f9c8","x":225,"y":67,"width":456,"height":273,"alpha":1,"angle":0,"userData":{"executionOrder":-1,"wasTranslatedToCppCode":false},"cssClass":"GraphLang_Shapes_Basic_Loop2_ForLoop","ports":[{"type":"draw2d.InputPort","id":"24050697-5589-9ff8-4ffc-14de6f1cc377","width":8,"height":8,"alpha":1,"angle":0,"userData":{"datatype":"int","value":0,"status":0,"executionOrder":-1},"cssClass":"draw2d_InputPort","bgColor":"#0000FF","color":"#1B1B1B","stroke":1,"dasharray":null,"maxFanOut":20,"name":"iterationTerminal","port":"draw2d.InputPort","locator":"draw2d.layout.locator.XYRelPortLocator"},{"type":"draw2d.OutputPort","id":"bae715d2-d217-79a8-7320-ae182e7d552a","width":8,"height":8,"alpha":1,"angle":0,"userData":{"datatype":"int","value":0,"status":0,"executionOrder":-1},"cssClass":"draw2d_OutputPort","bgColor":"#0000FF","color":"#1B1B1B","stroke":3,"dasharray":null,"maxFanOut":20,"name":"iterationTerminalOutput","port":"draw2d.OutputPort","locator":"draw2d.layout.locator.XYRelPortLocator"}],"bgColor":"#F0F0F0","color":"#0000FF","stroke":1,"radius":0,"dasharray":null,"labels":[]},{"type":"GraphLang.Shapes.Basic.ConstantNode","id":"64b52f3b-fc61-5adf-90cf-0233ea040e5c","x":325,"y":168,"width":16,"height":21,"alpha":1,"angle":0,"userData":{"datatype":"int","isTerminal":false},"cssClass":"GraphLang_Shapes_Basic_ConstantNode","composite":"36aee09b-f076-cd03-88b0-169cd352f9c8","bgColor":"#0000FF","color":"#0000FF","stroke":1,"radius":0,"dasharray":null,"text":"5","outlineStroke":0,"outlineColor":"none","fontSize":12,"fontColor":"#FFFFFF","fontFamily":null,"editor":"draw2d.ui.LabelInplaceEditor"},{"type":"GraphLang.Shapes.Basic.Loop2.ForLoop","id":"3863b447-5240-5751-d20a-d53bbe3ce07f","x":414,"y":152,"width":214,"height":155,"alpha":1,"angle":0,"userData":{"executionOrder":1,"wasTranslatedToCppCode":false},"cssClass":"GraphLang_Shapes_Basic_Loop2_ForLoop","composite":"36aee09b-f076-cd03-88b0-169cd352f9c8","bgColor":"#F0F0F0","color":"#0000FF","stroke":1,"radius":0,"dasharray":null,"labels":[]},{"type":"GraphLang.Shapes.Basic.ConstantNode","id":"67842ea1-dc53-03ad-2fe8-0be89dda69c7","x":435,"y":170,"width":16,"height":21,"alpha":1,"angle":0,"userData":{"datatype":"string","isTerminal":false},"cssClass":"GraphLang_Shapes_Basic_ConstantNode","composite":"3863b447-5240-5751-d20a-d53bbe3ce07f","bgColor":"#FF3385","color":"#FF3385","stroke":1,"radius":0,"dasharray":null,"text":"hello world.","outlineStroke":0,"outlineColor":"none","fontSize":12,"fontColor":"#000000","fontFamily":null,"editor":"draw2d.ui.LabelInplaceEditor"},{"type":"ConsoleLog2","id":"340f6309-2e2c-67cc-fcbe-a6bb3ae648b0","x":515,"y":209,"width":69,"height":55,"alpha":1,"angle":0,"userData":{"isSetBreakpoint":true},"cssClass":"ConsoleLog2","composite":"3863b447-5240-5751-d20a-d53bbe3ce07f","bgColor":"none","color":"#DD2241","stroke":3,"radius":0,"dasharray":null,"labels":[]},{"type":"ConsoleLog2","id":"8522c52f-87ae-571d-3657-75b636fe7821","x":279,"y":92,"width":69,"height":55,"alpha":1,"angle":0,"userData":{"isSetBreakpoint":true,"executionOrder":-1},"cssClass":"ConsoleLog2","composite":"36aee09b-f076-cd03-88b0-169cd352f9c8","bgColor":"none","color":"#DD2241","stroke":3,"radius":0,"dasharray":null,"labels":[]},{"type":"GraphLang.Shapes.Basic.ConstantNode","id":"12d52de0-4764-f77c-ae0e-0b01a2d60d78","x":149,"y":31,"width":21.5615234375,"height":21,"alpha":1,"angle":0,"userData":{"datatype":"int","isTerminal":false,"executionOrder":-1},"cssClass":"GraphLang_Shapes_Basic_ConstantNode","bgColor":"#0000FF","color":"#0000FF","stroke":1,"radius":0,"dasharray":null,"text":"3","outlineStroke":0,"outlineColor":"none","fontSize":12,"fontColor":"#FFFFFF","fontFamily":null,"editor":"draw2d.ui.LabelInplaceEditor"},{"type":"HoverConnection","id":"58737046-490d-5e40-2915-52f3300f49f9","alpha":1,"angle":0,"userData":{},"cssClass":"HoverConnection","stroke":1.35,"color":"#FF3385","outlineStroke":0,"outlineColor":"none","policy":"draw2d.policy.line.OrthogonalSelectionFeedbackPolicy","vertex":[{"x":516.58212890625,"y":182},{"x":536.58212890625,"y":182},{"x":536.58212890625,"y":208.5},{"x":483,"y":208.5},{"x":483,"y":235},{"x":503,"y":235}],"router":"draw2d.layout.connection.InteractiveManhattanConnectionRouter","radius":5,"routingMetaData":{"routedByUserInteraction":false,"fromDir":1,"toDir":3},"source":{"node":"67842ea1-dc53-03ad-2fe8-0be89dda69c7","port":"out1"},"target":{"node":"340f6309-2e2c-67cc-fcbe-a6bb3ae648b0","port":"Port"}},{"type":"HoverConnection","id":"2c7236d3-abd6-0e1e-16d2-95795083da95","alpha":1,"angle":0,"userData":{},"cssClass":"HoverConnection","stroke":1.35,"color":"#FF0000","outlineStroke":0,"outlineColor":"none","dasharray":"-","policy":"draw2d.policy.line.OrthogonalSelectionFeedbackPolicy","vertex":[{"x":234.12,"y":94.3},{"x":250.56,"y":94.3},{"x":250.56,"y":118},{"x":267,"y":118}],"router":"draw2d.layout.connection.InteractiveManhattanConnectionRouter","radius":5,"routingMetaData":{"routedByUserInteraction":false,"fromDir":1,"toDir":3},"source":{"node":"36aee09b-f076-cd03-88b0-169cd352f9c8","port":"iterationTerminalOutput"},"target":{"node":"8522c52f-87ae-571d-3657-75b636fe7821","port":"Port"}},{"type":"HoverConnection","id":"7b707b0c-50be-8e30-cb1a-c9a0a10ac09b","alpha":1,"angle":0,"userData":{"isSetBreakpoint":true},"cssClass":"HoverConnection","stroke":3,"color":"#4286F4","outlineStroke":0,"outlineColor":"#303030","policy":"draw2d.policy.line.OrthogonalSelectionFeedbackPolicy","vertex":[{"x":166.85,"y":43},{"x":194.329,"y":43},{"x":194.329,"y":94.3},{"x":221.808,"y":94.3}],"router":"draw2d.layout.connection.InteractiveManhattanConnectionRouter","radius":5,"routingMetaData":{"routedByUserInteraction":false,"fromDir":1,"toDir":3},"source":{"node":"12d52de0-4764-f77c-ae0e-0b01a2d60d78","port":"out1"},"target":{"node":"36aee09b-f076-cd03-88b0-169cd352f9c8","port":"iterationTerminal"}},{"type":"HoverConnection","id":"5d4b7d6f-fc9c-8fff-17e0-75370c1eeda9","alpha":1,"angle":0,"userData":{},"cssClass":"HoverConnection","composite":"36aee09b-f076-cd03-88b0-169cd352f9c8","stroke":1.35,"color":"#4286F4","outlineStroke":0,"outlineColor":"none","policy":"draw2d.policy.line.OrthogonalSelectionFeedbackPolicy","vertex":[{"x":342.85,"y":180},{"x":377.67600000000004,"y":180},{"x":377.67600000000004,"y":167.5},{"x":412.502,"y":167.5}],"router":"draw2d.layout.connection.InteractiveManhattanConnectionRouter","radius":5,"routingMetaData":{"routedByUserInteraction":false,"fromDir":1,"toDir":3},"source":{"node":"64b52f3b-fc61-5adf-90cf-0233ea040e5c","port":"out1"},"target":{"node":"3863b447-5240-5751-d20a-d53bbe3ce07f","port":"iterationTerminal"}}],
  applyAlpha: function(){},
  layerGet: function(name, attributes){
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
  layerAttr: function(name, attributes){
    if(this.svgNodes===null) return;
    this.svgNodes.forEach(function(shape){
      if(shape.data("name")===name){
        shape.attr(attributes);
      }
    });
  },
  layerShow: function(name, flag, duration){
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
  getParameterSettings: function(){
    return [];
  },
  addPort: function(port, locator){
    this._super(port, locator);
    return port;
  },
  getPersistentAttributes: function(){
    var memento = this._super();
    memento.labels = [];
    this.children.each(function(i,e){
      var labelJSON = e.figure.getPersistentAttributes();
      labelJSON.locator=e.locator.NAME;
      memento.labels.push(labelJSON);
    });
    return memento;
  },
  setPersistentAttributes: function(memento){
    this._super(memento);
    this.resetChildren();
    $.each(memento.labels, $.proxy(function(i,json){
      var figure =  eval("new "+json.type+"()");
      figure.attr(json);
      var locator =  eval("new "+json.locator+"()");
      this.add(figure, locator);
    },this));
  },
});
