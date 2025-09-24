Demo.SignalProcessing.SimpleFilter_1 = GraphLang.UserDefinedNode.extend({
NAME: "Demo.SignalProcessing.SimpleFilter_1",
init: function(attr)
{
    this._super($.extend({width: 42, height: 42, flagAutoCreatePorts: true}, attr));
},
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
    "id": "2132d488-ece4-09a5-a530-bc3117c68582",
    "x": 479,
    "y": 178,
    "width": 736,
    "height": 313,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": 1,
      "wasTranslatedToCppCode": false
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_ForLoop",
    "bgColor": "#F0F0F0",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "GraphLang.Shapes.Basic.RightTunnel",
        "id": "3b22ab4a-0168-7aa7-da16-2b2077deb391",
        "x": 721,
        "y": 161.49999999999997,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "GraphLang_Shapes_Basic_RightTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "3b22ab4a-0168-7aa7-da16-2b2077deb391-in0",
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
            "name": "3b22ab4a-0168-7aa7-da16-2b2077deb391-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "3b22ab4a-0168-7aa7-da16-2b2077deb391-out0",
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
            "name": "3b22ab4a-0168-7aa7-da16-2b2077deb391-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#FDC11D",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "locator": "GraphLang.Utils.RightRelPortLocator",
        "locatorX": 15,
        "locatorY": 51.597444089456864
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "1b4e6d61-0746-1908-5043-d386fec1031a",
        "x": -15,
        "y": 173.5,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "1b4e6d61-0746-1908-5043-d386fec1031a-in0",
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
            "name": "1b4e6d61-0746-1908-5043-d386fec1031a-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "1b4e6d61-0746-1908-5043-d386fec1031a-out0",
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
            "name": "1b4e6d61-0746-1908-5043-d386fec1031a-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#FDC11D",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "locator": "GraphLang.Utils.LeftRelPortLocator",
        "locatorX": 15,
        "locatorY": 55.43130990415336
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "55c7e13d-cbf1-1568-a771-d498ac58e8be",
    "x": 992,
    "y": 428,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "#636363",
    "color": "#636363",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.0 + 0.0i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "52145610-cc2c-66fb-5d9c-715cfe9171c5",
    "x": 815,
    "y": 411,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "#636363",
    "color": "#636363",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.0 + 0.0i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "f0590880-f498-4f9e-70e8-937c13d2e74a",
    "x": 619,
    "y": 409,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "#636363",
    "color": "#636363",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.0 + 0.0i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.FeedbackNode",
    "id": "424ab2c8-39ed-dec5-e2a5-30cca1c6ecc3",
    "x": 1098,
    "y": 363,
    "width": 50,
    "height": 49,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Shapes_Basic_FeedbackNode",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.FeedbackNode",
    "id": "d6330a68-df6e-f32f-673d-6be1b24ca349",
    "x": 887,
    "y": 357,
    "width": 35,
    "height": 27,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Shapes_Basic_FeedbackNode",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.FeedbackNode",
    "id": "4837a662-de17-6466-1679-8e079855df98",
    "x": 704,
    "y": 358,
    "width": 24,
    "height": 22,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Shapes_Basic_FeedbackNode",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "145d117b-ac93-15a1-392d-aa19069d7fe7",
    "x": 889,
    "y": 241,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "#636363",
    "color": "#636363",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "1.0 + 1.0i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "72ef9438-b346-ccc1-8d8b-eec82726782b",
    "x": 729,
    "y": 244,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "#636363",
    "color": "#636363",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "1.0 + 1.0i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "65ee8e64-0ab0-e799-9f7b-04ccbd333db5",
    "x": 568,
    "y": 243,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "#636363",
    "color": "#636363",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "1.0 + 1.0i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Basic.Multiply",
    "id": "da918d49-23de-1b2a-1d9b-b8f1f4e1c9d3",
    "x": 982,
    "y": 294,
    "width": 84.39610736639997,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Basic_Multiply",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Basic.Multiply",
    "id": "23771c07-98b6-a92f-0d90-8607504d7234",
    "x": 789,
    "y": 299,
    "width": 84.39610736639997,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Basic_Multiply",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Basic.Multiply",
    "id": "592e6c9f-7524-436e-3af7-240d5aa3cf08",
    "x": 604,
    "y": 300,
    "width": 84.39610736639997,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Basic_Multiply",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.VectorNode",
    "id": "ff6a4403-07f4-faa9-7caf-ccc0b50bfa00",
    "x": 323,
    "y": 279,
    "width": 37,
    "height": 161,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "isTerminal": false,
      "nodeLabel": "nodeLabel",
      "datatype": "double*"
    },
    "cssClass": "GraphLang_Shapes_Basic_VectorNode",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "draw2d.shape.basic.Label",
        "id": "807c3e53-669b-8a34-c298-88ad2f1f28cc",
        "x": 10,
        "y": 10,
        "width": 17,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "double"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFFFFF",
        "color": "#AA2200",
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
        "type": "draw2d.shape.basic.Label",
        "id": "196a58b1-e3ef-8c1b-ddc6-b08c9b0711b8",
        "x": 10,
        "y": 34,
        "width": 17,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "double"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFFFFF",
        "color": "#AA2200",
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
        "type": "draw2d.shape.basic.Label",
        "id": "d19c5c45-6740-e0fe-2eb7-e98b22472372",
        "x": 10,
        "y": 58,
        "width": 17,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "double"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFFFFF",
        "color": "#AA2200",
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
        "type": "draw2d.shape.basic.Label",
        "id": "a6bfa4db-482c-ba8d-9c65-5fb80f3715a6",
        "x": 10,
        "y": 82,
        "width": 17,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "double"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFFFFF",
        "color": "#AA2200",
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
        "type": "draw2d.shape.basic.Label",
        "id": "6ecf8cfa-2a2f-7710-a77f-563df4a86d97",
        "x": 10,
        "y": 106,
        "width": 17,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "double"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFFFFF",
        "color": "#AA2200",
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
        "type": "draw2d.shape.basic.Label",
        "id": "374d8677-46c8-74eb-57a2-6702f326304c",
        "x": 10,
        "y": 130,
        "width": 17,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "double"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFFFFF",
        "color": "#AA2200",
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
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "50a4bc87-5ddf-8837-ea76-8dd1fc0718f9",
    "x": 425,
    "y": 176,
    "width": 16,
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
    "text": "10",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "44b3ce60-bae4-182a-a943-6cd4a447ae74",
    "x": 1303,
    "y": 321,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
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
    "id": "7e06e118-0b5e-efb1-f895-8b79619f53a9",
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
        "x": 682.041015625,
        "y": 421
      },
      {
        "x": 716,
        "y": 421
      },
      {
        "x": 716,
        "y": 378.9
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 2
    },
    "source": {
      "node": "f0590880-f498-4f9e-70e8-937c13d2e74a",
      "port": "out1"
    },
    "target": {
      "node": "4837a662-de17-6466-1679-8e079855df98",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "41b43ea5-f4e0-e554-83db-e0a401d1bdec",
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
        "x": 874.4232626176,
        "y": 328.3517395968002
      },
      {
        "x": 941.9684440000001,
        "y": 328.3517395968002
      },
      {
        "x": 941.9684440000001,
        "y": 361.42622950819674
      },
      {
        "x": 921.9684440000001,
        "y": 361.42622950819674
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 1
    },
    "source": {
      "node": "23771c07-98b6-a92f-0d90-8607504d7234",
      "port": "out1"
    },
    "target": {
      "node": "d6330a68-df6e-f32f-673d-6be1b24ca349",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "e31ee2fe-6835-5edf-d53f-6fd430ce4274",
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
        "x": 689.4232626176,
        "y": 329.3517395968002
      },
      {
        "x": 747.9783616000001,
        "y": 329.3517395968002
      },
      {
        "x": 747.9783616000001,
        "y": 361.60655737704917
      },
      {
        "x": 727.9783616000001,
        "y": 361.60655737704917
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 1
    },
    "source": {
      "node": "592e6c9f-7524-436e-3af7-240d5aa3cf08",
      "port": "out1"
    },
    "target": {
      "node": "4837a662-de17-6466-1679-8e079855df98",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "9d837772-d9d3-1cbf-42a7-a2fe5bb28a5a",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#666666",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 703.94499968,
        "y": 361.60655737704917
      },
      {
        "x": 683.94499968,
        "y": 361.60655737704917
      },
      {
        "x": 683.94499968,
        "y": 348.7528342528002
      },
      {
        "x": 788.3091683328,
        "y": 348.7528342528002
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 3,
      "toDir": 3
    },
    "source": {
      "node": "4837a662-de17-6466-1679-8e079855df98",
      "port": "out1"
    },
    "target": {
      "node": "23771c07-98b6-a92f-0d90-8607504d7234",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "a5a6a447-4b55-8a45-9310-a564a68c2157",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "3b22ab4a-0168-7aa7-da16-2b2077deb391",
      "targetPortName": "3b22ab4a-0168-7aa7-da16-2b2077deb391-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#666666",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 1097.885416,
        "y": 371.0327868852459
      },
      {
        "x": 1077.885416,
        "y": 371.0327868852459
      },
      {
        "x": 1077.885416,
        "y": 347
      },
      {
        "x": 1200,
        "y": 347
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 3,
      "toDir": 3
    },
    "source": {
      "node": "424ab2c8-39ed-dec5-e2a5-30cca1c6ecc3",
      "port": "out1"
    },
    "target": {
      "node": "2132d488-ece4-09a5-a530-bc3117c68582",
      "port": "3b22ab4a-0168-7aa7-da16-2b2077deb391-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "ced5dbfb-4625-3c9f-a954-17b6ec1e985f",
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
        "x": 449.85751953125,
        "y": 188
      },
      {
        "x": 461.852759765625,
        "y": 188
      },
      {
        "x": 461.852759765625,
        "y": 209.3
      },
      {
        "x": 473.848,
        "y": 209.3
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
      "node": "50a4bc87-5ddf-8837-ea76-8dd1fc0718f9",
      "port": "out1"
    },
    "target": {
      "node": "2132d488-ece4-09a5-a530-bc3117c68582",
      "port": "iterationTerminal"
    }
  },
  {
    "type": "HoverConnection",
    "id": "e8d88d10-88de-8671-b88f-3eaafed65b96",
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
        "x": 878.041015625,
        "y": 423
      },
      {
        "x": 904.5,
        "y": 423
      },
      {
        "x": 904.5,
        "y": 382.65
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 2
    },
    "source": {
      "node": "52145610-cc2c-66fb-5d9c-715cfe9171c5",
      "port": "out1"
    },
    "target": {
      "node": "d6330a68-df6e-f32f-673d-6be1b24ca349",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "252a3c0f-1d1f-888d-0a8e-748a2240f410",
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
        "x": 1055.041015625,
        "y": 440
      },
      {
        "x": 1123,
        "y": 440
      },
      {
        "x": 1123,
        "y": 409.55
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 2
    },
    "source": {
      "node": "55c7e13d-cbf1-1568-a771-d498ac58e8be",
      "port": "out1"
    },
    "target": {
      "node": "424ab2c8-39ed-dec5-e2a5-30cca1c6ecc3",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "f98ad9e8-0a41-9d2b-bdfc-2e1fde641367",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "1b4e6d61-0746-1908-5043-d386fec1031a",
      "sourcePortName": "1b4e6d61-0746-1908-5043-d386fec1031a-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#129CE4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 494,
        "y": 359
      },
      {
        "x": 548.6545841664,
        "y": 359
      },
      {
        "x": 548.6545841664,
        "y": 349.7528342528002
      },
      {
        "x": 603.3091683328,
        "y": 349.7528342528002
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
      "node": "2132d488-ece4-09a5-a530-bc3117c68582",
      "port": "1b4e6d61-0746-1908-5043-d386fec1031a-out0"
    },
    "target": {
      "node": "592e6c9f-7524-436e-3af7-240d5aa3cf08",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "f95cfdec-e0a6-160c-7111-cb8ba6ea6c92",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "1b4e6d61-0746-1908-5043-d386fec1031a",
      "targetPortName": "1b4e6d61-0746-1908-5043-d386fec1031a-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#AA2200",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 360,
        "y": 359.5
      },
      {
        "x": 412,
        "y": 359.5
      },
      {
        "x": 412,
        "y": 359
      },
      {
        "x": 464,
        "y": 359
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
      "node": "ff6a4403-07f4-faa9-7caf-ccc0b50bfa00",
      "port": "out1"
    },
    "target": {
      "node": "2132d488-ece4-09a5-a530-bc3117c68582",
      "port": "1b4e6d61-0746-1908-5043-d386fec1031a-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "48eab88c-3f68-fe49-a4a5-65a052d4a5dc",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "3b22ab4a-0168-7aa7-da16-2b2077deb391",
      "sourcePortName": "3b22ab4a-0168-7aa7-da16-2b2077deb391-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#129CE4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 1230,
        "y": 347
      },
      {
        "x": 1291,
        "y": 347
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
      "node": "2132d488-ece4-09a5-a530-bc3117c68582",
      "port": "3b22ab4a-0168-7aa7-da16-2b2077deb391-out0"
    },
    "target": {
      "node": "44b3ce60-bae4-182a-a943-6cd4a447ae74",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "86cbe2a3-0422-f901-a9e1-d708e646f49b",
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
        "x": 631.041015625,
        "y": 255
      },
      {
        "x": 651.041015625,
        "y": 255
      },
      {
        "x": 651.041015625,
        "y": 283.1564384768001
      },
      {
        "x": 583.3091683328,
        "y": 283.1564384768001
      },
      {
        "x": 583.3091683328,
        "y": 311.3128769536002
      },
      {
        "x": 603.3091683328,
        "y": 311.3128769536002
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
      "node": "65ee8e64-0ab0-e799-9f7b-04ccbd333db5",
      "port": "out1"
    },
    "target": {
      "node": "592e6c9f-7524-436e-3af7-240d5aa3cf08",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "fcbb8767-f26b-2548-de34-c48e9dbd40fc",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 792.041015625,
        "y": 256
      },
      {
        "x": 812.041015625,
        "y": 256
      },
      {
        "x": 812.041015625,
        "y": 283.1564384768001
      },
      {
        "x": 768.3091683328,
        "y": 283.1564384768001
      },
      {
        "x": 768.3091683328,
        "y": 310.3128769536002
      },
      {
        "x": 788.3091683328,
        "y": 310.3128769536002
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
      "node": "72ef9438-b346-ccc1-8d8b-eec82726782b",
      "port": "out1"
    },
    "target": {
      "node": "23771c07-98b6-a92f-0d90-8607504d7234",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "43dc4d13-259c-cd9c-a1de-1c46bd1fc066",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 952.041015625,
        "y": 253
      },
      {
        "x": 966.6750919789,
        "y": 253
      },
      {
        "x": 966.6750919789,
        "y": 305.3128769536002
      },
      {
        "x": 981.3091683328,
        "y": 305.3128769536002
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
      "node": "145d117b-ac93-15a1-392d-aa19069d7fe7",
      "port": "out1"
    },
    "target": {
      "node": "da918d49-23de-1b2a-1d9b-b8f1f4e1c9d3",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "aed8a4f6-28a4-5260-26b3-607a67967d7d",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 1067.4232626176,
        "y": 323.3517395968002
      },
      {
        "x": 1167.9549200000001,
        "y": 323.3517395968002
      },
      {
        "x": 1167.9549200000001,
        "y": 371.0327868852459
      },
      {
        "x": 1147.9549200000001,
        "y": 371.0327868852459
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 1,
      "toDir": 1
    },
    "source": {
      "node": "da918d49-23de-1b2a-1d9b-b8f1f4e1c9d3",
      "port": "out1"
    },
    "target": {
      "node": "424ab2c8-39ed-dec5-e2a5-30cca1c6ecc3",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "8450a8d0-ca97-bf00-3780-5af76398fa6b",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "2132d488-ece4-09a5-a530-bc3117c68582",
    "stroke": 1.35,
    "color": "#666666",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 886.9197912000001,
        "y": 361.42622950819674
      },
      {
        "x": 866.9197912000001,
        "y": 361.42622950819674
      },
      {
        "x": 866.9197912000001,
        "y": 343.7528342528002
      },
      {
        "x": 981.3091683328,
        "y": 343.7528342528002
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 3,
      "toDir": 3
    },
    "source": {
      "node": "d6330a68-df6e-f32f-673d-6be1b24ca349",
      "port": "out1"
    },
    "target": {
      "node": "da918d49-23de-1b2a-1d9b-b8f1f4e1c9d3",
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
