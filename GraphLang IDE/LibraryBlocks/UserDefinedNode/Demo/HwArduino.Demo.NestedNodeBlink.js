HwArduino.Demo.NestedNodeBlink = GraphLang.UserDefinedNode.extend({
NAME: 'HwArduino.Demo.NestedNodeBlink',
init: function(attr)
{
    this._super($.extend({width: 42, height: 42, flagAutoCreatePorts: true}, attr));
},
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.Loop2.WhileLayer",
    "id": "5a9e7fdd-2119-1f01-adba-0f797c95a2db",
    "x": 509,
    "y": 208,
    "width": 312,
    "height": 221,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false,
      "isLoop": true
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_WhileLayer",
    "ports": [],
    "bgColor": "#F0F0F0",
    "color": "#333333",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "d1a56e22-b39c-160c-4019-b389436cb3df",
        "x": -15,
        "y": 122.5,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "d1a56e22-b39c-160c-4019-b389436cb3df-in0",
            "width": 8,
            "height": 8,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "errorDatatype",
              "value": 0,
              "status": 0,
              "executionOrder": -1
            },
            "cssClass": "draw2d_InputPort",
            "bgColor": "#4F6870",
            "color": "#1B1B1B",
            "stroke": 1,
            "dasharray": null,
            "maxFanOut": 9007199254740991,
            "name": "d1a56e22-b39c-160c-4019-b389436cb3df-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "d1a56e22-b39c-160c-4019-b389436cb3df-out0",
            "width": 8,
            "height": 8,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "errorDatatype",
              "value": 0,
              "status": 0,
              "executionOrder": -1
            },
            "cssClass": "draw2d_OutputPort",
            "bgColor": "#4F6870",
            "color": "#1B1B1B",
            "stroke": 3,
            "dasharray": null,
            "maxFanOut": 9007199254740991,
            "name": "d1a56e22-b39c-160c-4019-b389436cb3df-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#636363",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "locator": "GraphLang.Utils.LeftRelPortLocator",
        "locatorX": 15,
        "locatorY": 55.42986425339367
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "c11c61cc-8957-1ef4-d122-d310358c6a9f",
    "x": 720,
    "y": 371,
    "width": 32.5615234375,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "bool",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "5a9e7fdd-2119-1f01-adba-0f797c95a2db",
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
  },
  {
    "type": "HwArduino.Demo.DoLedOneBlink",
    "id": "6bfcec55-9a16-7b63-16c0-0a3bf67980ba",
    "x": 726,
    "y": 300,
    "width": 42,
    "height": 42,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_Demo_DoLedOneBlink",
    "composite": "5a9e7fdd-2119-1f01-adba-0f797c95a2db",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduino.Time.delay",
    "id": "f4f9fae2-88c7-2cd1-2bfc-506e95399fcd",
    "x": 597,
    "y": 281,
    "width": 68,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_Time_delay",
    "composite": "5a9e7fdd-2119-1f01-adba-0f797c95a2db",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "a68887ff-a958-ea53-74ca-be2379745e2d",
    "x": 552,
    "y": 248,
    "width": 25.203125,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "5a9e7fdd-2119-1f01-adba-0f797c95a2db",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "111",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwRaspiZero.IO.Digital.pinMode",
    "id": "dae96f27-0271-8cde-c67c-f6a743317452",
    "x": 350,
    "y": 260,
    "width": 93,
    "height": 87.02859020233154,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwRaspiZero_IO_Digital_pinMode",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.EnumSelectOption",
    "id": "138ecb1b-5c88-a3ec-bd47-ea44d439c6bb",
    "x": 42,
    "y": 300,
    "width": 111.546875,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "nodeLabel": "enumValue",
      "sourceFigureId": "361198de-365a-43a3-a597-1aa30798c78e",
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_EnumSelectOption",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "arduino_LED_BUILTIN",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "draw2d.ui.SelectOptionInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "3ee6b4ac-1ac6-b22b-02a5-1933007545c8",
    "x": 236,
    "y": 246,
    "width": 28.669921875,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "bool",
      "isTerminal": false,
      "executionOrder": -1
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
    "type": "ConvertDatatype",
    "id": "04de4f3b-6d0f-be65-595a-03d44726ceed",
    "x": 219,
    "y": 343,
    "width": 68,
    "height": 38.467302572204574,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "ConvertDatatype",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "ecd64b56-adc7-1a04-460e-b2943aec8504",
    "x": 221,
    "y": 292,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "uint",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#4286F4",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HoverConnection",
    "id": "8c2306f2-e9ef-fe4c-ab9a-715d56b52114",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#009900",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 758.50751953125,
        "y": 383
      },
      {
        "x": 788.1937597656249,
        "y": 383
      },
      {
        "x": 788.1937597656249,
        "y": 406.9
      },
      {
        "x": 817.88,
        "y": 406.9
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
      "node": "c11c61cc-8957-1ef4-d122-d310358c6a9f",
      "port": "out1"
    },
    "target": {
      "node": "5a9e7fdd-2119-1f01-adba-0f797c95a2db",
      "port": "stopTerminal"
    }
  },
  {
    "type": "HoverConnection",
    "id": "dc891502-5368-386a-e064-059a34f72a22",
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
        "x": 668.7700031999999,
        "y": 325.4079616000002
      },
      {
        "x": 697.3850015999999,
        "y": 325.4079616000002
      },
      {
        "x": 697.3850015999999,
        "y": 321
      },
      {
        "x": 726,
        "y": 321
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
      "node": "f4f9fae2-88c7-2cd1-2bfc-506e95399fcd",
      "port": "error_out"
    },
    "target": {
      "node": "6bfcec55-9a16-7b63-16c0-0a3bf67980ba",
      "port": "clusterOutput"
    }
  },
  {
    "type": "HoverConnection",
    "id": "de8f7c2a-3f16-d44f-df58-98a338921bab",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "d1a56e22-b39c-160c-4019-b389436cb3df",
      "sourcePortName": "d1a56e22-b39c-160c-4019-b389436cb3df-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 524,
        "y": 338
      },
      {
        "x": 562.6208544,
        "y": 338
      },
      {
        "x": 562.6208544,
        "y": 325.4079616000002
      },
      {
        "x": 601.2417088,
        "y": 325.4079616000002
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
      "node": "5a9e7fdd-2119-1f01-adba-0f797c95a2db",
      "port": "d1a56e22-b39c-160c-4019-b389436cb3df-out0"
    },
    "target": {
      "node": "f4f9fae2-88c7-2cd1-2bfc-506e95399fcd",
      "port": "error_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "faaba5e9-2e66-122a-2d14-51392ed97798",
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
        "x": 581.6625,
        "y": 260
      },
      {
        "x": 591.4521044,
        "y": 260
      },
      {
        "x": 591.4521044,
        "y": 296.8866944000002
      },
      {
        "x": 601.2417088,
        "y": 296.8866944000002
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
      "node": "a68887ff-a958-ea53-74ca-be2379745e2d",
      "port": "out1"
    },
    "target": {
      "node": "f4f9fae2-88c7-2cd1-2bfc-506e95399fcd",
      "port": "delay_ms"
    }
  },
  {
    "type": "HoverConnection",
    "id": "7473f208-3eeb-e4bc-1467-00b1a6bdce1f",
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
        "x": 238.85,
        "y": 304
      },
      {
        "x": 253.010088,
        "y": 304
      },
      {
        "x": 253.010088,
        "y": 341.440422
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 0
    },
    "source": {
      "node": "ecd64b56-adc7-1a04-460e-b2943aec8504",
      "port": "out1"
    },
    "target": {
      "node": "04de4f3b-6d0f-be65-595a-03d44726ceed",
      "port": "castDatatype"
    }
  },
  {
    "type": "HoverConnection",
    "id": "7877d78e-28c1-e297-6f74-cd128552d25d",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#009900",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 269.6041015625,
        "y": 258
      },
      {
        "x": 310.29490294300723,
        "y": 258
      },
      {
        "x": 310.29490294300723,
        "y": 293.8251383292727
      },
      {
        "x": 350.9857043235145,
        "y": 293.8251383292727
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
      "node": "3ee6b4ac-1ac6-b22b-02a5-1933007545c8",
      "port": "out1"
    },
    "target": {
      "node": "dae96f27-0271-8cde-c67c-f6a743317452",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "dbbb7a40-65bf-bbde-1314-fa68db882423",
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
        "x": 289.26788,
        "y": 363.067302
      },
      {
        "x": 320.12679216175724,
        "y": 363.067302
      },
      {
        "x": 320.12679216175724,
        "y": 315.52859020233154
      },
      {
        "x": 350.9857043235145,
        "y": 315.52859020233154
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
      "node": "04de4f3b-6d0f-be65-595a-03d44726ceed",
      "port": "convertedVariable"
    },
    "target": {
      "node": "dae96f27-0271-8cde-c67c-f6a743317452",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "dd7c3919-f7ba-d486-7166-ac4fcaa9a158",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "d1a56e22-b39c-160c-4019-b389436cb3df",
      "targetPortName": "d1a56e22-b39c-160c-4019-b389436cb3df-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 448.65864714201916,
        "y": 338.96809509412776
      },
      {
        "x": 471.3293235710096,
        "y": 338.96809509412776
      },
      {
        "x": 471.3293235710096,
        "y": 338
      },
      {
        "x": 494,
        "y": 338
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
      "node": "dae96f27-0271-8cde-c67c-f6a743317452",
      "port": "errorOut"
    },
    "target": {
      "node": "5a9e7fdd-2119-1f01-adba-0f797c95a2db",
      "port": "d1a56e22-b39c-160c-4019-b389436cb3df-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "0eba097b-b070-2487-7219-9790d8c4723f",
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
        "x": 174.32386575095737,
        "y": 310.60043356950547
      },
      {
        "x": 196.2999368754787,
        "y": 310.60043356950547
      },
      {
        "x": 196.2999368754787,
        "y": 363.067302
      },
      {
        "x": 218.27600800000005,
        "y": 363.067302
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
      "node": "138ecb1b-5c88-a3ec-bd47-ea44d439c6bb",
      "port": "out1"
    },
    "target": {
      "node": "04de4f3b-6d0f-be65-595a-03d44726ceed",
      "port": "variableIn"
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
