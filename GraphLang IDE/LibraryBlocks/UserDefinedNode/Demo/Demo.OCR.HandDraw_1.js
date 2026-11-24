Demo.OCR.HandDraw_1 = GraphLang.UserDefinedNode.extend({
NAME: 'Demo.OCR.HandDraw_1',
init: function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:42, height:42, flagAutoCreatePorts: false},attr), setter, getter);
        this.persistPorts=false;
    },
createShapeElement: function(){
        var shape = this._super();
        this.originalWidth = 42;
        this.originalHeight= 42;
        return shape;
    },
createSet: function(){
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L42,0 L42,42 L0,42");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M0 0L42 0L42 42L0 42Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        return this.canvas.paper.setFinish();
    },
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "node_const_4_2",
    "x": 30,
    "y": 60,
    "width": 29,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "double",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "4.2",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "node_const_77_19",
    "x": 30,
    "y": 130,
    "width": 43,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "float",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFC300",
    "color": "#FAB700",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "77.19",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Basic.Add",
    "id": "node_add",
    "x": 140,
    "y": 55,
    "width": 123.40234375,
    "height": 78,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Basic_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "node_const_3_3",
    "x": 30,
    "y": 245,
    "width": 29,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "double",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "3.3",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Basic.Divide",
    "id": "node_divide",
    "x": 320,
    "y": 190,
    "width": 84,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Basic_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "node_const_int_0",
    "x": 470,
    "y": 120,
    "width": 15,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "ConvertDatatype",
    "id": "node_to_int",
    "x": 455,
    "y": 190,
    "width": 68,
    "height": 38.467302572204574,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "ConvertDatatype",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduino.Time.delay",
    "id": "node_delay",
    "x": 590,
    "y": 185,
    "width": 68,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwArduino_Time_delay",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "node_const_800",
    "x": 720,
    "y": 70,
    "width": 29,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "800",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwRaspiZero.Time.waitUntilNextMs",
    "id": "node_raspi_delay",
    "x": 760,
    "y": 170,
    "width": 135,
    "height": 71,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Time_waitUntilNextMs",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "node_const_9",
    "x": 30,
    "y": 340,
    "width": 15,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "9",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "node_const_true",
    "x": 30,
    "y": 400,
    "width": 36,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "bool",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#009900",
    "color": "#009900",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "true",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwRaspiZero.IO.Digital.digitalWrite",
    "id": "node_digital_write",
    "x": 150,
    "y": 335,
    "width": 98,
    "height": 76.78911304473877,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_IO_Digital_digitalWrite",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_const_4_2_out1_to_node_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_const_4_2",
      "port": "out1"
    },
    "target": {
      "node": "node_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_const_77_19_out1_to_node_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_const_77_19",
      "port": "out1"
    },
    "target": {
      "node": "node_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_add_out1_to_node_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_add",
      "port": "out1"
    },
    "target": {
      "node": "node_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_const_3_3_out1_to_node_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_const_3_3",
      "port": "out1"
    },
    "target": {
      "node": "node_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_divide_out1_to_node_to_int_variableIn",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_to_int",
      "port": "variableIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_const_int_0_out1_to_node_to_int_castDatatype",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_const_int_0",
      "port": "out1"
    },
    "target": {
      "node": "node_to_int",
      "port": "castDatatype"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_to_int_convertedVariable_to_node_delay_delay_ms",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_to_int",
      "port": "convertedVariable"
    },
    "target": {
      "node": "node_delay",
      "port": "delay_ms"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_digital_write_errorOut_to_node_delay_error_in",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_digital_write",
      "port": "errorOut"
    },
    "target": {
      "node": "node_delay",
      "port": "error_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_delay_error_out_to_node_raspi_delay_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_delay",
      "port": "error_out"
    },
    "target": {
      "node": "node_raspi_delay",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_const_800_out1_to_node_raspi_delay_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_const_800",
      "port": "out1"
    },
    "target": {
      "node": "node_raspi_delay",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_const_9_out1_to_node_digital_write_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_const_9",
      "port": "out1"
    },
    "target": {
      "node": "node_digital_write",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_const_true_out1_to_node_digital_write_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_const_true",
      "port": "out1"
    },
    "target": {
      "node": "node_digital_write",
      "port": "in2"
    }
  }
],
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
