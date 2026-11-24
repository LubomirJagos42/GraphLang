HwArduino.Demo.NestedNodeBlink = GraphLang.UserDefinedNode.extend({
NAME: 'HwArduino.Demo.NestedNodeBlink',
init: function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        this.persistPorts=false;
    },
createShapeElement: function(){
        var shape = this._super();
        this.originalWidth = 100;
        this.originalHeight= 60;
        return shape;
    },
createSet: function(){
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L100,0 L100,60 L0,60");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M37,33L37,40');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M43,33L43,40');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({"rx":7,"ry":7,"cx":40,"cy":26,"stroke":"#303030","stroke-width":1,"fill":"#E53935","opacity":1});
        shape.data("name","Circle");

        // Line
        shape = this.canvas.paper.path('M49,21L53,17');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M50,26L55,26');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M58,20L70,20L70,38L60,38');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M63,35L60,38L63,41');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M58,20L58,24');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'Arduino');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Arduino","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Blinky');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"Blinky","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },
symbolPicture: "data:image/png;base64,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",
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.Loop2.WhileLayer",
    "id": "5a9e7fdd-2119-1f01-adba-0f797c95a2db",
    "x": 509,
    "y": 208,
    "width": 480,
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
    "stroke": 3,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "draw2d.shape.basic.Label",
        "id": "7c1e2f40-5b3a-4d8e-9f21-6a0b3c4d5e61",
        "x": 210.6552734375,
        "y": -26,
        "width": 58.689453125,
        "height": 21,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "WhileLoop",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#080808",
        "fontFamily": null,
        "locator": "draw2d.layout.locator.TopLocator"
      },
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
              "datatype": "undefined"
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
              "datatype": "undefined"
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
    "type": "HwArduino.Demo.DoLedOneBlink",
    "id": "6bfcec55-9a16-7b63-16c0-0a3bf67980ba",
    "x": 700,
    "y": 290,
    "width": 100,
    "height": 60,
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
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "c11c61cc-8957-1ef4-d122-d310358c6a9f",
    "x": 760,
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
    "type": "HwArduino.Time.delay",
    "id": "cadce46b-1cdc-32de-8cc3-13c5554f23d6",
    "x": 840,
    "y": 278,
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
    "x": 236,
    "y": 352,
    "width": 36,
    "height": 22,
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
    "id": "3a1b07a6-fcc6-2e44-7b49-f33752e25c4d",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 581.6625,
        "y": 260
      },
      {
        "x": 805.2417088,
        "y": 260
      },
      {
        "x": 805.2417088,
        "y": 293.8866944000002
      },
      {
        "x": 825.2417088,
        "y": 293.8866944000002
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
      "node": "cadce46b-1cdc-32de-8cc3-13c5554f23d6",
      "port": "delay_ms"
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
    "outlineColor": "#303030",
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
    "id": "ded0269b-1d69-9e64-d8e6-47b36522308a",
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
        "x": 694.3850015999999,
        "y": 325.4079616000002
      },
      {
        "x": 694.3850015999999,
        "y": 332
      },
      {
        "x": 720,
        "y": 332
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
      "port": "error_in"
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
    "id": "fd265f84-9a9d-f087-f7a3-4b9da4fb0a86",
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
        "x": 774,
        "y": 332
      },
      {
        "x": 799.6208544,
        "y": 332
      },
      {
        "x": 799.6208544,
        "y": 322.4079616000002
      },
      {
        "x": 825.2417088,
        "y": 322.4079616000002
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
      "node": "6bfcec55-9a16-7b63-16c0-0a3bf67980ba",
      "port": "error_out"
    },
    "target": {
      "node": "cadce46b-1cdc-32de-8cc3-13c5554f23d6",
      "port": "error_in"
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
        "x": 841.1587597656251,
        "y": 383
      },
      {
        "x": 841.1587597656251,
        "y": 406.9
      },
      {
        "x": 923.8100000000001,
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
    var w = this.getWidth(), h = this.getHeight();
    this._super(memento);
    this.setDimension(w, h);
    this.resetChildren();
    $.each(memento.labels, $.proxy(function(i,json){
        var figure =  eval("new "+json.type+"()");
        figure.attr(json);
        var locator =  eval("new "+json.locator+"()");
        this.add(figure, locator);
    },this));
},
});
