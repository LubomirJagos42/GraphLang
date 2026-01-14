HwArduino.SystemConstants = GraphLang.UserDefinedNode.extend({
NAME: "HwArduino.SystemConstants",
init: function(attr)
{
    this._super($.extend({width: 42, height: 42, flagAutoCreatePorts: true}, attr));
},
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.Loop2.ClusterDatatypeNode2",
    "id": "a69cb9cb-aeb7-f240-cb0e-a4ad59661926",
    "x": 103,
    "y": 92,
    "width": 111.34955978393555,
    "height": 151.6397352218628,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": 1,
      "wasTranslatedToCppCode": false,
      "isTerminal": false,
      "isStruct": true,
      "isCluster": true,
      "datatype": "clusterDatatype_a69cb9cbaeb7f240cb0ea4ad59661926_errorDatatype",
      "isDatatypeSameAsNodeLabel": true,
      "nodeLabel": "errorDatatype"
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_ClusterDatatypeNode2",
    "bgColor": "#F0F0F0",
    "color": "#AA4A4C",
    "stroke": 2,
    "radius": 0,
    "dasharray": "",
    "labels": [
      {
        "type": "GraphLang.Shapes.Basic.Label",
        "id": "8f45a84e-be38-732e-f4d0-486c1b61f0d5",
        "x": 13.829076766967773,
        "y": 153.6397352218628,
        "width": 66.56640625,
        "height": 21,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "type": "clusterDatatypeName"
        },
        "cssClass": "GraphLang_Shapes_Basic_Label",
        "ports": [],
        "bgColor": "#000000",
        "color": "#1B1B1B",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "errorDatatype",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#FFFFFF",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor",
        "locator": "draw2d.layout.locator.BottomLocator"
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "3baf2f23-079a-0ead-f262-edfc773b0b91",
    "x": 171,
    "y": 147,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false,
      "clusterItemIndex": "2",
      "nodeLabel": "code"
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "a69cb9cb-aeb7-f240-cb0e-a4ad59661926",
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
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "0a585ae2-5d04-587e-605c-4337e8b3e6ac",
    "x": 173,
    "y": 220,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "String",
      "isTerminal": false,
      "clusterItemIndex": "3",
      "nodeLabel": "message"
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "a69cb9cb-aeb7-f240-cb0e-a4ad59661926",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "String",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "6b60f43c-386b-ad99-890e-9718fc1f6622",
    "x": 103,
    "y": 92,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "bool",
      "isTerminal": false,
      "clusterItemIndex": "1",
      "nodeLabel": "status"
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "a69cb9cb-aeb7-f240-cb0e-a4ad59661926",
    "bgColor": "#009900",
    "color": "#009900",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "false",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
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
