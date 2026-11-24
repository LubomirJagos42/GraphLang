HwArduino.Demo.NestedLoops2 = GraphLang.UserDefinedNode.extend({
NAME: "HwArduino.Demo.NestedLoops2",
init: function(attr)
{
    this._super($.extend({width: 42, height: 42, flagAutoCreatePorts: true}, attr));
},
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.Loop2.Multilayered3",
    "id": "31804323-ca14-1b39-165a-8fadde5059d8",
    "x": 1039,
    "y": 27,
    "width": 387,
    "height": 240,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": 1,
      "wasTranslatedToCppCode": false,
      "isLoop": false,
      "isMultilayered": true,
      "activeLayer": 3
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_Multilayered3",
    "ports": [
      {
        "type": "GraphLang.InputPort",
        "id": "2cc0a2a3-d9cb-d9d2-0c56-a22a4e101fff",
        "width": 8,
        "height": 8,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "allowMultipleConnections": false,
          "connectionMandatory": false
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
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.Loop2.Multilayered3_enhanced",
    "id": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
    "x": 371,
    "y": 54,
    "width": 601,
    "height": 430,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false,
      "isLoop": false,
      "isMultilayered": true,
      "activeLayer": 0
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_Multilayered3_enhanced",
    "ports": [
      {
        "type": "GraphLang.InputPort",
        "id": "e99a354c-ee31-18c1-b903-a97a8175abcd",
        "width": 8,
        "height": 8,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "allowMultipleConnections": false,
          "connectionMandatory": false
        },
        "cssClass": "GraphLang_InputPort",
        "bgColor": "#00FF00",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "layerSelector",
        "locatorX": -0.7,
        "locatorY": 17,
        "locator": "draw2d.layout.locator.XYAbsPortLocator"
      }
    ],
    "bgColor": "#F0F0F0",
    "color": "#333333",
    "stroke": 2,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "82f20d25-220a-4bd2-6af2-f59cf1b70c55",
        "x": -15,
        "y": 217.5,
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
            "id": "82f20d25-220a-4bd2-6af2-f59cf1b70c55-in0",
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
            "name": "82f20d25-220a-4bd2-6af2-f59cf1b70c55-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "82f20d25-220a-4bd2-6af2-f59cf1b70c55-out0",
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
            "name": "82f20d25-220a-4bd2-6af2-f59cf1b70c55-out0",
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
        "locatorY": 50.58139534883721
      },
      {
        "type": "GraphLang.Shapes.Basic.RightTunnel",
        "id": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626",
        "x": 586,
        "y": 325.5,
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
            "id": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-in0",
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
            "name": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-out0",
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
            "name": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-out0",
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
        "locatorY": 75.69767441860465
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "4c700a77-f94d-1d01-e048-54f75bb4a385",
    "x": 171,
    "y": 64,
    "width": 21.5615234375,
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
    "text": "33",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwArduino.Serial.begin",
    "id": "eb0c6af7-8898-1074-435b-dfdf1372758e",
    "x": 162,
    "y": 212,
    "width": 88.701171875,
    "height": 80.91549715073495,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_Serial_begin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduino.Serial.begin",
    "id": "8e561b47-38ab-6931-49e6-8e154bdfb17f",
    "x": 1101,
    "y": 321,
    "width": 88.701171875,
    "height": 80.91549715073495,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwArduino_Serial_begin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_31804323-ca14-1b39-165a-8fadde5059d8_jailhouseLayer0",
    "x": 1041,
    "y": 29,
    "width": 383,
    "height": 236,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "31804323-ca14-1b39-165a-8fadde5059d8",
      "layerText": "---"
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "31804323-ca14-1b39-165a-8fadde5059d8",
    "ports": [],
    "bgColor": "#C6FFCE",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "GraphLang.Shapes.Basic.Loop2.Multilayered3_enhanced",
    "id": "2ceed082-d123-8941-9e36-fb8d4e570294",
    "x": 1124,
    "y": 76,
    "width": 206,
    "height": 101,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": 1,
      "wasTranslatedToCppCode": false,
      "isLoop": false,
      "isMultilayered": true,
      "activeLayer": 0
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_Multilayered3_enhanced",
    "composite": "multilayered_31804323-ca14-1b39-165a-8fadde5059d8_jailhouseLayer0",
    "ports": [
      {
        "type": "GraphLang.InputPort",
        "id": "c8e96c26-19da-1c2b-da51-6cf6aaed0971",
        "width": 8,
        "height": 8,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "allowMultipleConnections": false,
          "connectionMandatory": false
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
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_2ceed082-d123-8941-9e36-fb8d4e570294_jailhouseLayer0",
    "x": 1129,
    "y": 81,
    "width": 196,
    "height": 91,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "2ceed082-d123-8941-9e36-fb8d4e570294",
      "layerText": "---",
      "enableAutoresize": false
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "2ceed082-d123-8941-9e36-fb8d4e570294",
    "ports": [],
    "bgColor": "#889BA2",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "GraphLang.Shapes.Basic.Loop2.WhileLayer",
    "id": "bddb94b9-d6c6-7933-4623-a451cf03e4cb",
    "x": 1180,
    "y": 116,
    "width": 89,
    "height": 42,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": 1,
      "wasTranslatedToCppCode": false,
      "isLoop": true
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_WhileLayer",
    "composite": "multilayered_2ceed082-d123-8941-9e36-fb8d4e570294_jailhouseLayer0",
    "bgColor": "#F0F0F0",
    "color": "#333333",
    "stroke": 3,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "draw2d.shape.basic.Label",
        "id": "d4db64d9-2096-c1d2-ca96-565b11b9fbc2",
        "x": 10.486328125,
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
      }
    ],
    "ports": []
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_31804323-ca14-1b39-165a-8fadde5059d8_jailhouseLayer1",
    "x": 1041,
    "y": 29,
    "width": 383,
    "height": 236,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "31804323-ca14-1b39-165a-8fadde5059d8",
      "layerText": "---"
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "31804323-ca14-1b39-165a-8fadde5059d8",
    "ports": [],
    "bgColor": "#A1A644",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_55ecd103-10e9-d2c9-290c-cd4a28af9488_jailhouseLayer0",
    "x": 373,
    "y": 56,
    "width": 597,
    "height": 426,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
      "layerText": "33",
      "enableAutoresize": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
    "ports": [],
    "bgColor": "#388AC0",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "HwArduino.Time.delay",
    "id": "1b84d453-8035-24a6-8925-b332528dcf19",
    "x": 502,
    "y": 100,
    "width": 68,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_Time_delay",
    "composite": "multilayered_55ecd103-10e9-d2c9-290c-cd4a28af9488_jailhouseLayer0",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduino.Serial.println",
    "id": "88ed89fe-729f-1123-5824-3c5cf528c039",
    "x": 739,
    "y": 219,
    "width": 86,
    "height": 78.21264823944955,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_Serial_println",
    "composite": "multilayered_55ecd103-10e9-d2c9-290c-cd4a28af9488_jailhouseLayer0",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_55ecd103-10e9-d2c9-290c-cd4a28af9488_jailhouseLayer1",
    "x": 373,
    "y": 56,
    "width": 597,
    "height": 426,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
      "layerText": "71",
      "enableAutoresize": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
    "ports": [],
    "bgColor": "#75FE49",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "GraphLang.Shapes.Basic.Loop2.Multilayered3_enhanced",
    "id": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
    "x": 514,
    "y": 143,
    "width": 390,
    "height": 310,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false,
      "isLoop": false,
      "isMultilayered": true,
      "activeLayer": 1
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_Multilayered3_enhanced",
    "composite": "multilayered_55ecd103-10e9-d2c9-290c-cd4a28af9488_jailhouseLayer1",
    "ports": [
      {
        "type": "GraphLang.InputPort",
        "id": "a484ddd9-7068-658c-a9f0-aaadaf7425ee",
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
        "maxFanOut": 9007199254740991,
        "name": "layerSelector",
        "locatorX": -0.7,
        "locatorY": 17,
        "locator": "draw2d.layout.locator.XYAbsPortLocator"
      }
    ],
    "bgColor": "#F0F0F0",
    "color": "#333333",
    "stroke": 2,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "3b012112-53b4-77b7-5264-cc0689386515",
        "x": -15,
        "y": 193.5,
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
            "id": "3b012112-53b4-77b7-5264-cc0689386515-in0",
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
            "name": "3b012112-53b4-77b7-5264-cc0689386515-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "3b012112-53b4-77b7-5264-cc0689386515-out0",
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
            "name": "3b012112-53b4-77b7-5264-cc0689386515-out0",
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
        "locatorY": 62.41935483870967
      },
      {
        "type": "GraphLang.Shapes.Basic.RightTunnel",
        "id": "09f89d22-66bf-30d9-5964-1fcabda4c7ac",
        "x": 375,
        "y": 99.50000000000001,
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
            "id": "09f89d22-66bf-30d9-5964-1fcabda4c7ac-in0",
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
            "name": "09f89d22-66bf-30d9-5964-1fcabda4c7ac-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "09f89d22-66bf-30d9-5964-1fcabda4c7ac-out0",
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
            "name": "09f89d22-66bf-30d9-5964-1fcabda4c7ac-out0",
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
        "locatorY": 32.09677419354839
      },
      {
        "type": "GraphLang.Shapes.Basic.RightTunnel",
        "id": "328dc0fe-9bec-78d8-2681-489f63b2a0b1",
        "x": 375,
        "y": 235.5,
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
            "id": "328dc0fe-9bec-78d8-2681-489f63b2a0b1-in0",
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
            "name": "328dc0fe-9bec-78d8-2681-489f63b2a0b1-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "328dc0fe-9bec-78d8-2681-489f63b2a0b1-out0",
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
            "name": "328dc0fe-9bec-78d8-2681-489f63b2a0b1-out0",
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
        "locatorY": 75.96774193548387
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_60b9d819-82a0-d86d-865b-7ebaaa66341b_jailhouseLayer1",
    "x": 516,
    "y": 145,
    "width": 386,
    "height": 306,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
      "layerText": "mode B",
      "enableAutoresize": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
    "ports": [],
    "bgColor": "#106EA7",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "HwArduino.Time.delay",
    "id": "89ca5726-61d2-2ef9-cc31-5009c691daf1",
    "x": 614,
    "y": 300,
    "width": 68,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_Time_delay",
    "composite": "multilayered_60b9d819-82a0-d86d-865b-7ebaaa66341b_jailhouseLayer1",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "cf18c9e6-ea9b-46d0-16a4-377959545084",
    "x": 566,
    "y": 238,
    "width": 27.123046875,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "multilayered_60b9d819-82a0-d86d-865b-7ebaaa66341b_jailhouseLayer1",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "220",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwArduino.Serial.println",
    "id": "718f44b8-45e4-85fe-fc2d-56d75a2aa9b9",
    "x": 716,
    "y": 186,
    "width": 86,
    "height": 78.21264823944955,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_Serial_println",
    "composite": "multilayered_60b9d819-82a0-d86d-865b-7ebaaa66341b_jailhouseLayer1",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_60b9d819-82a0-d86d-865b-7ebaaa66341b_jailhouseLayer0",
    "x": 516,
    "y": 145,
    "width": 386,
    "height": 306,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
      "layerText": "mode A",
      "enableAutoresize": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
    "ports": [],
    "bgColor": "#6FE023",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
    "id": "cbd94ae8-4f5f-a3e4-893e-fe92de322b52",
    "x": 580,
    "y": 274,
    "width": 257,
    "height": 155,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false,
      "isLoop": true
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_ForLoop",
    "composite": "multilayered_60b9d819-82a0-d86d-865b-7ebaaa66341b_jailhouseLayer0",
    "ports": [
      {
        "type": "draw2d.InputPort",
        "id": "d77c8409-4b17-1fe0-f81c-612349188516",
        "width": 8,
        "height": 8,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int"
        },
        "cssClass": "draw2d_InputPort",
        "bgColor": "#0000FF",
        "color": "#1B1B1B",
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 20,
        "name": "iterationTerminal",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.XYRelPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "e53593be-3897-a6af-f294-3d65173cc322",
        "width": 8,
        "height": 8,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int"
        },
        "cssClass": "draw2d_OutputPort",
        "bgColor": "#0000FF",
        "color": "#1B1B1B",
        "stroke": 3,
        "dasharray": null,
        "maxFanOut": 20,
        "name": "iterationTerminalOutput",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.XYRelPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "5996e14d-30af-6b80-3aea-6870b967d702-in0",
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
        "name": "5996e14d-30af-6b80-3aea-6870b967d702-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "5996e14d-30af-6b80-3aea-6870b967d702-out0",
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
        "name": "5996e14d-30af-6b80-3aea-6870b967d702-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      }
    ],
    "bgColor": "#F0F0F0",
    "color": "#0000FF",
    "stroke": 3,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "draw2d.shape.basic.Label",
        "id": "a5431904-4bd6-780c-6481-f1884364667b",
        "x": 100.9892578125,
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
        "type": "GraphLang.Shapes.Basic.RightTunnel",
        "id": "5996e14d-30af-6b80-3aea-6870b967d702",
        "x": 242,
        "y": 109.5,
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
            "id": "5996e14d-30af-6b80-3aea-6870b967d702-in0",
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
            "name": "5996e14d-30af-6b80-3aea-6870b967d702-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "5996e14d-30af-6b80-3aea-6870b967d702-out0",
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
            "name": "5996e14d-30af-6b80-3aea-6870b967d702-out0",
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
        "locatorY": 70.64516129032258
      }
    ]
  },
  {
    "type": "HwArduino.Serial.println",
    "id": "8ae8ff80-5075-3a46-0ec2-d0ada6e7d239",
    "x": 670,
    "y": 327,
    "width": 86,
    "height": 78.21264823944955,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_Serial_println",
    "composite": "cbd94ae8-4f5f-a3e4-893e-fe92de322b52",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "6210b774-3aed-8d38-fd5e-3920fcf84e05",
    "x": 535,
    "y": 242,
    "width": 21.5615234375,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "multilayered_60b9d819-82a0-d86d-865b-7ebaaa66341b_jailhouseLayer0",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "17",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwArduino.Time.delay",
    "id": "7775ee68-75ff-cb1b-b95c-421c8f25d602",
    "x": 660,
    "y": 172,
    "width": 68,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_Time_delay",
    "composite": "multilayered_60b9d819-82a0-d86d-865b-7ebaaa66341b_jailhouseLayer0",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "7dc5164a-5ca7-f102-9dd4-5a115ec12f5e",
    "x": 421,
    "y": 91,
    "width": 44.79296875,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "string",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "multilayered_55ecd103-10e9-d2c9-290c-cd4a28af9488_jailhouseLayer1",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "mode B",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_31804323-ca14-1b39-165a-8fadde5059d8_jailhouseLayer2",
    "x": 1041,
    "y": 29,
    "width": 383,
    "height": 236,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "31804323-ca14-1b39-165a-8fadde5059d8",
      "layerText": "---"
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "31804323-ca14-1b39-165a-8fadde5059d8",
    "ports": [],
    "bgColor": "#817964",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "GraphLang.Shapes.Basic.Jailhouse",
    "id": "multilayered_31804323-ca14-1b39-165a-8fadde5059d8_jailhouseLayer3",
    "x": 1041,
    "y": 29,
    "width": 383,
    "height": 236,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "owner": "31804323-ca14-1b39-165a-8fadde5059d8",
      "layerText": "---"
    },
    "cssClass": "GraphLang_Shapes_Basic_Jailhouse",
    "composite": "31804323-ca14-1b39-165a-8fadde5059d8",
    "ports": [],
    "bgColor": "#3A6211",
    "color": "#EB34C6",
    "stroke": 1,
    "radius": 0,
    "dasharray": null
  },
  {
    "type": "HoverConnection",
    "id": "4133f995-7ecb-56f0-e97b-c5d401d398fd",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626",
      "targetPortName": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 824.0234375,
        "y": 283.4391773146493
      },
      {
        "x": 890.51171875,
        "y": 283.4391773146493
      },
      {
        "x": 890.51171875,
        "y": 387
      },
      {
        "x": 957,
        "y": 387
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
      "node": "88ed89fe-729f-1123-5824-3c5cf528c039",
      "port": "errorOut"
    },
    "target": {
      "node": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
      "port": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "03490b8a-a1c7-83ff-41f7-7e9ed58949bb",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "328dc0fe-9bec-78d8-2681-489f63b2a0b1",
      "sourcePortName": "328dc0fe-9bec-78d8-2681-489f63b2a0b1-out0",
      "targetTunnel": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626",
      "targetPortName": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#129CE4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 919,
        "y": 386
      },
      {
        "x": 938,
        "y": 386
      },
      {
        "x": 938,
        "y": 387
      },
      {
        "x": 957,
        "y": 387
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
      "node": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
      "port": "328dc0fe-9bec-78d8-2681-489f63b2a0b1-out0"
    },
    "target": {
      "node": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
      "port": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "ef49cad9-1440-01a4-fc38-bce03a39baea",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "09f89d22-66bf-30d9-5964-1fcabda4c7ac",
      "sourcePortName": "09f89d22-66bf-30d9-5964-1fcabda4c7ac-out0",
      "targetTunnel": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626",
      "targetPortName": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#129CE4",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 919,
        "y": 250
      },
      {
        "x": 938,
        "y": 250
      },
      {
        "x": 938,
        "y": 387
      },
      {
        "x": 957,
        "y": 387
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
      "node": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
      "port": "09f89d22-66bf-30d9-5964-1fcabda4c7ac-out0"
    },
    "target": {
      "node": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
      "port": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "3b9e5fcd-813d-afce-f51a-6e44392895be",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "82f20d25-220a-4bd2-6af2-f59cf1b70c55",
      "sourcePortName": "82f20d25-220a-4bd2-6af2-f59cf1b70c55-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 386,
        "y": 279
      },
      {
        "x": 446.1208544,
        "y": 279
      },
      {
        "x": 446.1208544,
        "y": 144.4079616000002
      },
      {
        "x": 506.24170879999997,
        "y": 144.4079616000002
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
      "node": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
      "port": "82f20d25-220a-4bd2-6af2-f59cf1b70c55-out0"
    },
    "target": {
      "node": "1b84d453-8035-24a6-8925-b332528dcf19",
      "port": "error_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "a3c069e7-b4db-7c3c-244d-9d55cc803461",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "82f20d25-220a-4bd2-6af2-f59cf1b70c55",
      "sourcePortName": "82f20d25-220a-4bd2-6af2-f59cf1b70c55-out0",
      "targetTunnel": "3b012112-53b4-77b7-5264-cc0689386515",
      "targetPortName": "3b012112-53b4-77b7-5264-cc0689386515-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 386,
        "y": 279
      },
      {
        "x": 442.5,
        "y": 279
      },
      {
        "x": 442.5,
        "y": 344
      },
      {
        "x": 499,
        "y": 344
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
      "node": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
      "port": "82f20d25-220a-4bd2-6af2-f59cf1b70c55-out0"
    },
    "target": {
      "node": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
      "port": "3b012112-53b4-77b7-5264-cc0689386515-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "1c1efece-18fe-d073-81aa-ffb23a39cfdd",
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
        "x": 585.14,
        "y": 289.5
      },
      {
        "x": 629.0699999999999,
        "y": 289.5
      },
      {
        "x": 629.0699999999999,
        "y": 354.0477960154494
      },
      {
        "x": 673,
        "y": 354.0477960154494
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
      "node": "cbd94ae8-4f5f-a3e4-893e-fe92de322b52",
      "port": "iterationTerminalOutput"
    },
    "target": {
      "node": "8ae8ff80-5075-3a46-0ec2-d0ada6e7d239",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "a4d76781-fd51-8a93-2a34-4fb5e742377d",
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
        "x": 597.8650390625,
        "y": 250
      },
      {
        "x": 608.05337393125,
        "y": 250
      },
      {
        "x": 608.05337393125,
        "y": 315.8866944000002
      },
      {
        "x": 618.2417088,
        "y": 315.8866944000002
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
      "node": "cf18c9e6-ea9b-46d0-16a4-377959545084",
      "port": "out1"
    },
    "target": {
      "node": "89ca5726-61d2-2ef9-cc31-5009c691daf1",
      "port": "delay_ms"
    }
  },
  {
    "type": "HoverConnection",
    "id": "b0c75803-1a14-7bd3-43ee-d024f499a0d2",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceMultilayered": "4c700a77-f94d-1d01-e048-54f75bb4a385",
      "sourcePortName": "out1"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 195.85751953125,
        "y": 76
      },
      {
        "x": 283.078759765625,
        "y": 76
      },
      {
        "x": 283.078759765625,
        "y": 71
      },
      {
        "x": 370.3,
        "y": 71
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
      "node": "4c700a77-f94d-1d01-e048-54f75bb4a385",
      "port": "out1"
    },
    "target": {
      "node": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
      "port": "layerSelector"
    }
  },
  {
    "type": "HoverConnection",
    "id": "5dd55b1d-9bc5-14a3-444a-ae3a31603db7",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626",
      "sourcePortName": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#129CE4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 987,
        "y": 387
      },
      {
        "x": 1045.75,
        "y": 387
      },
      {
        "x": 1045.75,
        "y": 387.44002606920776
      },
      {
        "x": 1104.5,
        "y": 387.44002606920776
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
      "node": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
      "port": "bcc92bc8-61bb-71bc-46b3-cf79a05f7626-out0"
    },
    "target": {
      "node": "8e561b47-38ab-6931-49e6-8e154bdfb17f",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "ba9ed310-2ce2-3f2e-acb0-95119a246cf7",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "82f20d25-220a-4bd2-6af2-f59cf1b70c55",
      "targetPortName": "82f20d25-220a-4bd2-6af2-f59cf1b70c55-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 246.62328387499997,
        "y": 278.44002606920776
      },
      {
        "x": 301.3116419375,
        "y": 278.44002606920776
      },
      {
        "x": 301.3116419375,
        "y": 279
      },
      {
        "x": 356,
        "y": 279
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
      "node": "eb0c6af7-8898-1074-435b-dfdf1372758e",
      "port": "errorOut"
    },
    "target": {
      "node": "55ecd103-10e9-d2c9-290c-cd4a28af9488",
      "port": "82f20d25-220a-4bd2-6af2-f59cf1b70c55-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "7a4cb753-294b-78be-0924-3b871c033992",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "5996e14d-30af-6b80-3aea-6870b967d702",
      "sourcePortName": "5996e14d-30af-6b80-3aea-6870b967d702-out0",
      "targetTunnel": "328dc0fe-9bec-78d8-2681-489f63b2a0b1",
      "targetPortName": "328dc0fe-9bec-78d8-2681-489f63b2a0b1-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#129CE4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 852,
        "y": 391
      },
      {
        "x": 870.5,
        "y": 391
      },
      {
        "x": 870.5,
        "y": 386
      },
      {
        "x": 889,
        "y": 386
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
      "node": "cbd94ae8-4f5f-a3e4-893e-fe92de322b52",
      "port": "5996e14d-30af-6b80-3aea-6870b967d702-out0"
    },
    "target": {
      "node": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
      "port": "328dc0fe-9bec-78d8-2681-489f63b2a0b1-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "50cae99c-6761-dd04-d593-60c67efb79c0",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "09f89d22-66bf-30d9-5964-1fcabda4c7ac",
      "targetPortName": "09f89d22-66bf-30d9-5964-1fcabda4c7ac-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 801.0234375,
        "y": 250.43917731464933
      },
      {
        "x": 845.01171875,
        "y": 250.43917731464933
      },
      {
        "x": 845.01171875,
        "y": 250
      },
      {
        "x": 889,
        "y": 250
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
      "node": "718f44b8-45e4-85fe-fc2d-56d75a2aa9b9",
      "port": "errorOut"
    },
    "target": {
      "node": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
      "port": "09f89d22-66bf-30d9-5964-1fcabda4c7ac-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "65cd82e8-2c33-dd51-7f5b-f3605bc5cd99",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "3b012112-53b4-77b7-5264-cc0689386515",
      "sourcePortName": "3b012112-53b4-77b7-5264-cc0689386515-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#666666",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 529,
        "y": 344
      },
      {
        "x": 573.6208544,
        "y": 344
      },
      {
        "x": 573.6208544,
        "y": 344.4079616000002
      },
      {
        "x": 618.2417088,
        "y": 344.4079616000002
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
      "node": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
      "port": "3b012112-53b4-77b7-5264-cc0689386515-out0"
    },
    "target": {
      "node": "89ca5726-61d2-2ef9-cc31-5009c691daf1",
      "port": "error_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "7b575171-89ee-2dc5-a13a-715d34c8ac22",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "5996e14d-30af-6b80-3aea-6870b967d702",
      "targetPortName": "5996e14d-30af-6b80-3aea-6870b967d702-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 755.0234375,
        "y": 391.4391773146493
      },
      {
        "x": 788.51171875,
        "y": 391.4391773146493
      },
      {
        "x": 788.51171875,
        "y": 391
      },
      {
        "x": 822,
        "y": 391
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
      "node": "8ae8ff80-5075-3a46-0ec2-d0ada6e7d239",
      "port": "errorOut"
    },
    "target": {
      "node": "cbd94ae8-4f5f-a3e4-893e-fe92de322b52",
      "port": "5996e14d-30af-6b80-3aea-6870b967d702-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "0bb5459d-483b-da5c-dee0-79490437d96e",
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
        "x": 559.85751953125,
        "y": 254
      },
      {
        "x": 569.029259765625,
        "y": 254
      },
      {
        "x": 569.029259765625,
        "y": 289.5
      },
      {
        "x": 578.201,
        "y": 289.5
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
      "node": "6210b774-3aed-8d38-fd5e-3920fcf84e05",
      "port": "out1"
    },
    "target": {
      "node": "cbd94ae8-4f5f-a3e4-893e-fe92de322b52",
      "port": "iterationTerminal"
    }
  },
  {
    "type": "HoverConnection",
    "id": "9e84cc67-55c2-e653-7716-6f885bb6f231",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceMultilayered": "7dc5164a-5ca7-f102-9dd4-5a115ec12f5e",
      "sourcePortName": "out1"
    },
    "cssClass": "HoverConnection",
    "composite": "multilayered_55ecd103-10e9-d2c9-290c-cd4a28af9488_jailhouseLayer1",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 474.92734375,
        "y": 103
      },
      {
        "x": 494.11367187499997,
        "y": 103
      },
      {
        "x": 494.11367187499997,
        "y": 160
      },
      {
        "x": 513.3,
        "y": 160
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
      "node": "7dc5164a-5ca7-f102-9dd4-5a115ec12f5e",
      "port": "out1"
    },
    "target": {
      "node": "60b9d819-82a0-d86d-865b-7ebaaa66341b",
      "port": "layerSelector"
    }
  },
  {
    "type": "HoverConnection",
    "id": "42228dbe-cffc-000b-cb3c-b95539a0337a",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "multilayered_55ecd103-10e9-d2c9-290c-cd4a28af9488_jailhouseLayer0",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 573.7700031999999,
        "y": 144.4079616000002
      },
      {
        "x": 657.8850015999999,
        "y": 144.4079616000002
      },
      {
        "x": 657.8850015999999,
        "y": 283.4391773146493
      },
      {
        "x": 742,
        "y": 283.4391773146493
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
      "node": "1b84d453-8035-24a6-8925-b332528dcf19",
      "port": "error_out"
    },
    "target": {
      "node": "88ed89fe-729f-1123-5824-3c5cf528c039",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "82d4088e-0a71-914b-387b-292761339b45",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "multilayered_60b9d819-82a0-d86d-865b-7ebaaa66341b_jailhouseLayer1",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 685.7700031999999,
        "y": 344.4079616000002
      },
      {
        "x": 702.3850015999999,
        "y": 344.4079616000002
      },
      {
        "x": 702.3850015999999,
        "y": 250.43917731464933
      },
      {
        "x": 719,
        "y": 250.43917731464933
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
      "node": "89ca5726-61d2-2ef9-cc31-5009c691daf1",
      "port": "error_out"
    },
    "target": {
      "node": "718f44b8-45e4-85fe-fc2d-56d75a2aa9b9",
      "port": "errorIn"
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
