HwArduino.Demo.NestedLoops3 = GraphLang.UserDefinedNode.extend({
NAME: "HwArduino.Demo.NestedLoops3",
init: function(attr)
{
    this._super($.extend({width: 42, height: 42, flagAutoCreatePorts: true}, attr));
},
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
    "id": "c80da269-52b9-5b2c-3b98-75af25afd288",
    "x": 478,
    "y": 129,
    "width": 432,
    "height": 328,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false,
      "isLoop": true
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_ForLoop",
    "bgColor": "#F0F0F0",
    "color": "#0000FF",
    "stroke": 3,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "draw2d.shape.basic.Label",
        "id": "fae33300-5d3d-b819-9e31-41521be7c7b9",
        "x": 188.4892578125,
        "y": -26,
        "width": 47.6845703125,
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
        "text": "ForLoop",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#080808",
        "fontFamily": null,
        "locator": "draw2d.layout.locator.TopLocator"
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "6bb74a15-d503-0f64-5e64-1b79037ff747",
        "x": -15,
        "y": 254.5,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "isTunnel": true,
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "6bb74a15-d503-0f64-5e64-1b79037ff747-in0",
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
            "name": "6bb74a15-d503-0f64-5e64-1b79037ff747-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "6bb74a15-d503-0f64-5e64-1b79037ff747-out0",
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
            "name": "6bb74a15-d503-0f64-5e64-1b79037ff747-out0",
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
        "locatorY": 77.59146341463415
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "337890a8-fa6f-dd3b-f2ee-32d72838c407",
        "x": -15,
        "y": 214.49999999999997,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "isTunnel": true,
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "337890a8-fa6f-dd3b-f2ee-32d72838c407-in0",
            "width": 8,
            "height": 8,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "FILE*",
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
            "name": "337890a8-fa6f-dd3b-f2ee-32d72838c407-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "337890a8-fa6f-dd3b-f2ee-32d72838c407-out0",
            "width": 8,
            "height": 8,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "FILE*",
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
            "name": "337890a8-fa6f-dd3b-f2ee-32d72838c407-out0",
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
        "locatorY": 65.39634146341463
      },
      {
        "type": "GraphLang.Shapes.Basic.RightTunnel",
        "id": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70",
        "x": 417,
        "y": 261.49999999999994,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "isTunnel": true,
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_RightTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70-in0",
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
            "name": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70-out0",
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
            "name": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#636363",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "locator": "GraphLang.Utils.RightRelPortLocator",
        "locatorX": 15,
        "locatorY": 79.72560975609755
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.Loop2.Multilayered3_enhanced",
    "id": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
    "x": 549,
    "y": 219,
    "width": 125,
    "height": 91,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": true,
      "isLoop": false,
      "isMultilayered": true,
      "activeLayer": 2
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_Multilayered3_enhanced",
    "composite": "c80da269-52b9-5b2c-3b98-75af25afd288",
    "ports": [
      {
        "type": "GraphLang.InputPort",
        "id": "4778306b-2331-43d1-0ab7-6fbf188662cc",
        "width": 8,
        "height": 8,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "allowMultipleConnections": false,
          "connectionMandatory": false,
          "value": 0,
          "status": 0,
          "executionOrder": -1
        },
        "cssClass": "GraphLang_InputPort",
        "bgColor": "#00FF00",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 20,
        "name": "layerSelector",
        "locatorX": -0.7,
        "locatorY": 17
      }
    ],
    "bgColor": "#F0F0F0",
    "color": "#333333",
    "stroke": 2,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "GraphLang.Shapes.Basic.RightTunnel",
        "id": "db969af2-3cac-2253-91b0-738815adc2ce",
        "x": 110,
        "y": 36.5,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "isTunnel": true
        },
        "cssClass": "GraphLang_Shapes_Basic_RightTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "db969af2-3cac-2253-91b0-738815adc2ce-in0",
            "width": 8,
            "height": 8,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "string",
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
            "name": "db969af2-3cac-2253-91b0-738815adc2ce-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "db969af2-3cac-2253-91b0-738815adc2ce-out0",
            "width": 8,
            "height": 8,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "string",
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
            "name": "db969af2-3cac-2253-91b0-738815adc2ce-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#FF3385",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "locator": "GraphLang.Utils.RightRelPortLocator",
        "locatorX": 15,
        "locatorY": 40.10989010989011
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2_jailhouseLayer0",
    "x": 551,
    "y": 221,
    "width": 121,
    "height": 87,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
      "layerText": "0",
      "enableAutoresize": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
    "ports": [],
    "bgColor": "#D64ED6",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "fa8ec93d-b623-001c-a9c0-1f445b3ea9bf",
    "x": 599,
    "y": 251,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "string",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "multilayered_9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2_jailhouseLayer0",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "zero",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2_jailhouseLayer1",
    "x": 551,
    "y": 221,
    "width": 121,
    "height": 87,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
      "layerText": "1",
      "enableAutoresize": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
    "ports": [],
    "bgColor": "#D212B5",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "79798cca-7c8a-b8a0-dbe7-d80dced828f8",
    "x": 590,
    "y": 251,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "string",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "multilayered_9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2_jailhouseLayer1",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "one",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwRaspiZero.File.fwrite",
    "id": "b4086f8c-0434-8d2c-a7b8-24344849c5fe",
    "x": 760,
    "y": 340,
    "width": 81,
    "height": 60.928,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwRaspiZero_File_fwrite",
    "composite": "c80da269-52b9-5b2c-3b98-75af25afd288",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.File.fopen",
    "id": "c0c3f703-a6df-060a-ff32-3908caef4597",
    "x": 233,
    "y": 64,
    "width": 86,
    "height": 60.928,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwRaspiZero_File_fopen",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.File.fclose",
    "id": "27fdd4b6-1b99-25de-59ab-42973f422e6a",
    "x": 1056,
    "y": 346,
    "width": 86,
    "height": 60.928,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwRaspiZero_File_fclose",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2_jailhouseLayer2",
    "x": 551,
    "y": 221,
    "width": 121,
    "height": 87,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
      "layerText": "2",
      "enableAutoresize": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
    "ports": [],
    "bgColor": "#820FB8",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "314787f0-cfa3-fa43-7a3e-ad3360a0b2f1",
    "x": 584,
    "y": 251,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "string",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "multilayered_9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2_jailhouseLayer2",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "two",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "a853b053-1468-f0bb-cb42-3ca2d4eccaf3",
    "x": 424,
    "y": 149,
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
    "text": "3",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HoverConnection",
    "id": "5effd713-ae8c-627b-742a-32baad7dd5b3",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "db969af2-3cac-2253-91b0-738815adc2ce",
      "targetPortName": "db969af2-3cac-2253-91b0-738815adc2ce-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 615.5,
        "y": 263
      },
      {
        "x": 659,
        "y": 263
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
      "node": "314787f0-cfa3-fa43-7a3e-ad3360a0b2f1",
      "port": "out1"
    },
    "target": {
      "node": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
      "port": "db969af2-3cac-2253-91b0-738815adc2ce-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "79e9ba0c-f3b9-0205-58f4-6bc1c5c8ac14",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "db969af2-3cac-2253-91b0-738815adc2ce",
      "targetPortName": "db969af2-3cac-2253-91b0-738815adc2ce-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 621.8650390625,
        "y": 263
      },
      {
        "x": 659,
        "y": 263
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
      "node": "79798cca-7c8a-b8a0-dbe7-d80dced828f8",
      "port": "out1"
    },
    "target": {
      "node": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
      "port": "db969af2-3cac-2253-91b0-738815adc2ce-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "8d6567aa-7892-743b-1e72-4cf5b5f83cc6",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "db969af2-3cac-2253-91b0-738815adc2ce",
      "targetPortName": "db969af2-3cac-2253-91b0-738815adc2ce-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 635.40341796875,
        "y": 263
      },
      {
        "x": 659,
        "y": 263
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
      "node": "fa8ec93d-b623-001c-a9c0-1f445b3ea9bf",
      "port": "out1"
    },
    "target": {
      "node": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
      "port": "db969af2-3cac-2253-91b0-738815adc2ce-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "0c90f2d0-3916-7c14-6419-e790ff4b9caa",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "db969af2-3cac-2253-91b0-738815adc2ce",
      "sourcePortName": "db969af2-3cac-2253-91b0-738815adc2ce-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 689,
        "y": 263
      },
      {
        "x": 725.8810960640001,
        "y": 263
      },
      {
        "x": 725.8810960640001,
        "y": 376.46399999999994
      },
      {
        "x": 762.762192128,
        "y": 376.46399999999994
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
      "node": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
      "port": "db969af2-3cac-2253-91b0-738815adc2ce-out0"
    },
    "target": {
      "node": "b4086f8c-0434-8d2c-a7b8-24344849c5fe",
      "port": "stringToWrite"
    }
  },
  {
    "type": "HoverConnection",
    "id": "9b7e5ffe-638c-34d5-83f9-5ed6b2ff2b18",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceMultilayered": "c80da269-52b9-5b2c-3b98-75af25afd288",
      "sourcePortName": "iterationTerminalOutput"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 486.64,
        "y": 161.8
      },
      {
        "x": 517.47,
        "y": 161.8
      },
      {
        "x": 517.47,
        "y": 236
      },
      {
        "x": 548.3,
        "y": 236
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
      "node": "c80da269-52b9-5b2c-3b98-75af25afd288",
      "port": "iterationTerminalOutput"
    },
    "target": {
      "node": "9aa3ffd0-7126-12a2-1b81-521e4bbfd7f2",
      "port": "layerSelector"
    }
  },
  {
    "type": "HoverConnection",
    "id": "1772ca39-c8ce-d61c-be29-5cfcc11c0aa7",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "6bb74a15-d503-0f64-5e64-1b79037ff747",
      "sourcePortName": "6bb74a15-d503-0f64-5e64-1b79037ff747-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 493,
        "y": 391
      },
      {
        "x": 627.8810960640001,
        "y": 391
      },
      {
        "x": 627.8810960640001,
        "y": 398.2366556160001
      },
      {
        "x": 762.762192128,
        "y": 398.2366556160001
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
      "node": "c80da269-52b9-5b2c-3b98-75af25afd288",
      "port": "6bb74a15-d503-0f64-5e64-1b79037ff747-out0"
    },
    "target": {
      "node": "b4086f8c-0434-8d2c-a7b8-24344849c5fe",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "55b2fb52-7641-8af7-e121-ea565d030fcd",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70",
      "targetPortName": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 844.064580864,
        "y": 398.2366556160001
      },
      {
        "x": 895,
        "y": 397.99999999999994
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
      "node": "b4086f8c-0434-8d2c-a7b8-24344849c5fe",
      "port": "errorOut"
    },
    "target": {
      "node": "c80da269-52b9-5b2c-3b98-75af25afd288",
      "port": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "55692344-e265-27f7-0e16-b2e2a0ce6a00",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70",
      "sourcePortName": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 925,
        "y": 397.99999999999994
      },
      {
        "x": 990.797209984,
        "y": 397.99999999999994
      },
      {
        "x": 990.797209984,
        "y": 400.2366556160001
      },
      {
        "x": 1056.594419968,
        "y": 400.2366556160001
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
      "node": "c80da269-52b9-5b2c-3b98-75af25afd288",
      "port": "96f9e8e7-e893-7fe5-6cc5-f5b21ef40a70-out0"
    },
    "target": {
      "node": "27fdd4b6-1b99-25de-59ab-42973f422e6a",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "73a56254-c967-275b-a7c3-30099d8527d1",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "6bb74a15-d503-0f64-5e64-1b79037ff747",
      "targetPortName": "6bb74a15-d503-0f64-5e64-1b79037ff747-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 320.9332899840001,
        "y": 119.23665561600012
      },
      {
        "x": 356.96664499200006,
        "y": 119.23665561600012
      },
      {
        "x": 356.96664499200006,
        "y": 391
      },
      {
        "x": 463,
        "y": 391
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": true,
      "fromDir": 1,
      "toDir": 3
    },
    "source": {
      "node": "c0c3f703-a6df-060a-ff32-3908caef4597",
      "port": "errorOut"
    },
    "target": {
      "node": "c80da269-52b9-5b2c-3b98-75af25afd288",
      "port": "6bb74a15-d503-0f64-5e64-1b79037ff747-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "4efb1045-5569-fe68-6576-bdcd1d6a6ea0",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "337890a8-fa6f-dd3b-f2ee-32d72838c407",
      "targetPortName": "337890a8-fa6f-dd3b-f2ee-32d72838c407-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 320.9332899840001,
        "y": 79.50820812800009
      },
      {
        "x": 391.96664499200006,
        "y": 79.50820812800009
      },
      {
        "x": 391.96664499200006,
        "y": 351
      },
      {
        "x": 463,
        "y": 351
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
      "node": "c0c3f703-a6df-060a-ff32-3908caef4597",
      "port": "fileRef"
    },
    "target": {
      "node": "c80da269-52b9-5b2c-3b98-75af25afd288",
      "port": "337890a8-fa6f-dd3b-f2ee-32d72838c407-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "af4bdd93-319f-e456-c15a-e2049b9abe85",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 320.9332899840001,
        "y": 79.50820812800009
      },
      {
        "x": 961.7638549760001,
        "y": 79.50820812800009
      },
      {
        "x": 961.7638549760001,
        "y": 360.5082081280001
      },
      {
        "x": 1056.594419968,
        "y": 360.5082081280001
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": true,
      "fromDir": 1,
      "toDir": 3
    },
    "source": {
      "node": "c0c3f703-a6df-060a-ff32-3908caef4597",
      "port": "fileRef"
    },
    "target": {
      "node": "27fdd4b6-1b99-25de-59ab-42973f422e6a",
      "port": "fileRef"
    }
  },
  {
    "type": "HoverConnection",
    "id": "3ba5d9da-ae0e-c462-95a8-d65dcabb174e",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "337890a8-fa6f-dd3b-f2ee-32d72838c407",
      "sourcePortName": "337890a8-fa6f-dd3b-f2ee-32d72838c407-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 493,
        "y": 351
      },
      {
        "x": 627.8810960640001,
        "y": 351
      },
      {
        "x": 627.8810960640001,
        "y": 356.008208128
      },
      {
        "x": 762.762192128,
        "y": 356.008208128
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
      "node": "c80da269-52b9-5b2c-3b98-75af25afd288",
      "port": "337890a8-fa6f-dd3b-f2ee-32d72838c407-out0"
    },
    "target": {
      "node": "b4086f8c-0434-8d2c-a7b8-24344849c5fe",
      "port": "fileRef"
    }
  },
  {
    "type": "HoverConnection",
    "id": "ef4bbefa-c356-b0b5-2785-6df1dd752677",
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
        "x": 441.85,
        "y": 161
      },
      {
        "x": 458.413,
        "y": 161
      },
      {
        "x": 458.413,
        "y": 161.8
      },
      {
        "x": 474.976,
        "y": 161.8
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
      "node": "a853b053-1468-f0bb-cb42-3ca2d4eccaf3",
      "port": "out1"
    },
    "target": {
      "node": "c80da269-52b9-5b2c-3b98-75af25afd288",
      "port": "iterationTerminal"
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
