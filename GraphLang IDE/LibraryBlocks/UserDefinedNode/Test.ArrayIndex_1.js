Test.ArrayIndex_1 = GraphLang.UserDefinedNode.extend({
NAME: "Test.ArrayIndex_1",
init: function(attr)
{
    this._super($.extend({width: 42, height: 42, flagAutoCreatePorts: true}, attr));
},
jsonDocument: [
  {
    "type": "GraphLang.Basic.Shapes.ArrayIndex",
    "id": "ceef2f14-360c-1e5d-13cf-eaf897b26944",
    "x": 634,
    "y": 246,
    "width": 54.975581388799924,
    "height": 22.861321011200232,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Basic_Shapes_ArrayIndex",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "GraphLang.Shapes.Basic.ArrayNode",
    "id": "dabb66a2-3c6c-ae65-e332-4e67d2f71d0e",
    "x": 475,
    "y": 138,
    "width": 37,
    "height": 89,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "isTerminal": false,
      "nodeLabel": "nodeLabel",
      "datatype": "int*",
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ArrayNode",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "draw2d.shape.basic.Label",
        "id": "ab03f898-ca39-5630-5a6f-6d649c63c3be",
        "x": 10,
        "y": 10,
        "width": 17,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#0000FF",
        "color": "#1B1B1B",
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
        "type": "draw2d.shape.basic.Label",
        "id": "e5068788-5f1d-6f9d-3fe6-7208edbea484",
        "x": 10,
        "y": 34,
        "width": 17,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#0000FF",
        "color": "#1B1B1B",
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
        "type": "draw2d.shape.basic.Label",
        "id": "01b945c3-cb4f-8af2-0ccb-b1efb0c86e62",
        "x": 10,
        "y": 58,
        "width": 17,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#0000FF",
        "color": "#1B1B1B",
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
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "233f52a9-d148-7f1d-8b14-a54808fe6e8d",
    "x": 382,
    "y": 287,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "7",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Basic.Divide",
    "id": "c6075da4-1fda-77ce-326e-e5cd7ad51ea3",
    "x": 805,
    "y": 253,
    "width": 84,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Math_Basic_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HoverConnection",
    "id": "d3d5e312-d870-e07f-8907-17804c22f893",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 512,
        "y": 182.5
      },
      {
        "x": 572.7082712576,
        "y": 182.5
      },
      {
        "x": 572.7082712576,
        "y": 256.5
      },
      {
        "x": 633.4165425152,
        "y": 256.5
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
      "node": "dabb66a2-3c6c-ae65-e332-4e67d2f71d0e",
      "port": "out1"
    },
    "target": {
      "node": "ceef2f14-360c-1e5d-13cf-eaf897b26944",
      "port": "array_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "a2f78017-c3b9-941b-e6e6-7aa091176195",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 399.85,
        "y": 299
      },
      {
        "x": 516.6332712576,
        "y": 299
      },
      {
        "x": 516.6332712576,
        "y": 268.9184
      },
      {
        "x": 633.4165425152,
        "y": 268.9184
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
      "node": "233f52a9-d148-7f1d-8b14-a54808fe6e8d",
      "port": "out1"
    },
    "target": {
      "node": "ceef2f14-360c-1e5d-13cf-eaf897b26944",
      "port": "index_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "06542a42-5186-2ea4-5dc0-d593277914fe",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF0000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "dasharray": "-",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 692.9018395648,
        "y": 256.5
      },
      {
        "x": 748.8555039488,
        "y": 256.5
      },
      {
        "x": 748.8555039488,
        "y": 264.81287695360027
      },
      {
        "x": 804.8091683328,
        "y": 264.81287695360027
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
      "node": "ceef2f14-360c-1e5d-13cf-eaf897b26944",
      "port": "arrayElement_out"
    },
    "target": {
      "node": "c6075da4-1fda-77ce-326e-e5cd7ad51ea3",
      "port": "in1"
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
getPersistentAttributes : function(){
    var memento = this._super();
    memento.labels = [];
    this.children.each(function(i,e){
        var labelJSON = e.figure.getPersistentAttributes();
        labelJSON.locator=e.locator.NAME;
        memento.labels.push(labelJSON);
    });
    return memento;
},
setPersistentAttributes : function(memento){
    this._super(memento);
    this.resetChildren();
    $.each(memento.labels, $.proxy(function(i,json){
        var figure =  eval("new "+json.type+"()");
        figure.attr(json);
        var locator =  eval("new "+json.locator+"()");
        this.add(figure, locator);
    },this));
}
});
