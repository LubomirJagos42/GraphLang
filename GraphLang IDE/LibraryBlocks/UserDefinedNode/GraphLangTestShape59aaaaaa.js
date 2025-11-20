GraphLangTestShape = GraphLang.UserDefinedNode.extend({
NAME: 'GraphLangTestShape',
init: function(attr)
{
    this._super($.extend({width: 42, height: 42, flagAutoCreatePorts: true}, attr));
},
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.EnumNode",
    "id": "ce9034e8-9382-1d6b-2893-01cf6b7a2380",
    "x": 345,
    "y": 155,
    "width": 91.365234375,
    "height": 92,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "isTerminal": false,
      "isEnum": true,
      "nodeLabel": "COLORS",
      "datatype": "int*",
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_EnumNode",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "draw2d.shape.basic.Label",
        "id": "7b772fc2-2b6e-2d8c-cbd1-65a62de4f907",
        "x": 10,
        "y": 10,
        "width": 26.6875,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int",
          "isInternalEnumItem": true
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFFFFF",
        "color": "#1B1B1B",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "101",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#000000",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "draw2d.shape.basic.Label",
        "id": "0a1f9073-163f-488c-e386-b5d1b0b33b96",
        "x": 40.34765625,
        "y": 10,
        "width": 24.8916015625,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int",
          "isInternalEnumItem": true
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#0000FF",
        "color": "#1B1B1B",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "red",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#FFFFFF",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "draw2d.shape.basic.Label",
        "id": "8625189e-5089-4bb9-8bd1-d35bd95b1620",
        "x": 10,
        "y": 34,
        "width": 10,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int",
          "isInternalEnumItem": true
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFFFFF",
        "color": "#1B1B1B",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#000000",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "draw2d.shape.basic.Label",
        "id": "9b18bfcf-786e-3371-7b61-9cd693dab1e0",
        "x": 40.34765625,
        "y": 34,
        "width": 36.0146484375,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int",
          "isInternalEnumItem": true
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#0000FF",
        "color": "#1B1B1B",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "green",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#FFFFFF",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "draw2d.shape.basic.Label",
        "id": "77b3a174-24c4-c955-faa0-f0b337500e5c",
        "x": 10,
        "y": 58,
        "width": 27.123046875,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int",
          "isInternalEnumItem": true
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFFFFF",
        "color": "#1B1B1B",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "303",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#000000",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "draw2d.shape.basic.Label",
        "id": "103b949f-ddb7-0f29-8aef-82a3b8f91d52",
        "x": 40.34765625,
        "y": 58,
        "width": 29.3447265625,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int",
          "isInternalEnumItem": true
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#0000FF",
        "color": "#1B1B1B",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "blue",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#FFFFFF",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.EnumSelectOption",
    "id": "b6619d4a-806e-cc48-504c-8ac6d79bdead",
    "x": 529,
    "y": 316,
    "width": 93.8173828125,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "nodeLabel": "enumValue",
      "executionOrder": -1,
      "sourceFigureId": "ce9034e8-9382-1d6b-2893-01cf6b7a2380"
    },
    "cssClass": "GraphLang_Shapes_Basic_EnumSelectOption",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "blue",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "draw2d.ui.SelectOptionInplaceEditor"
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "26435177-df74-3265-94c5-c05387101c91",
    "x": 735,
    "y": 250,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HoverConnection",
    "id": "c179931c-c99f-34d2-7dad-1509b081b28b",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 562.1338928476599,
        "y": 326.60043356950547
      },
      {
        "x": 642.5669464238299,
        "y": 326.60043356950547
      },
      {
        "x": 642.5669464238299,
        "y": 276
      },
      {
        "x": 723,
        "y": 276
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 3
    },
    "source": {
      "node": "b6619d4a-806e-cc48-504c-8ac6d79bdead",
      "port": "out1"
    },
    "target": {
      "node": "26435177-df74-3265-94c5-c05387101c91",
      "port": "Port"
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
