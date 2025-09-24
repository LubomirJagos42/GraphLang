Demo.File.WriteToFile = GraphLang.UserDefinedNode.extend({
NAME: 'Demo.File.WriteToFile',
init: function(attr)
{
    this._super($.extend({width: 42, height: 42, flagAutoCreatePorts: true}, attr));
},
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
    "id": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
    "x": 576,
    "y": 357,
    "width": 189,
    "height": 147,
    "alpha": 0.4,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_ForLoop",
    "ports": [
      {
        "type": "draw2d.InputPort",
        "id": "661e2313-2534-212a-b785-0309d01103a7",
        "width": 8,
        "height": 8,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int",
          "value": 0,
          "status": 0,
          "executionOrder": -1
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
        "id": "1e1a159c-6e77-0e72-e2a0-2f8cdea74a5a",
        "width": 8,
        "height": 8,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int",
          "value": 0,
          "status": 0,
          "executionOrder": -1
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
        "id": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-in0",
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
        "name": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-out0",
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
        "name": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "05824722-035e-a6d2-58e6-79338a3cdca0-in0",
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
        "name": "05824722-035e-a6d2-58e6-79338a3cdca0-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "05824722-035e-a6d2-58e6-79338a3cdca0-out0",
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
        "name": "05824722-035e-a6d2-58e6-79338a3cdca0-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-in0",
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
        "name": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-out0",
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
        "name": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      }
    ],
    "bgColor": "#F0F0F0",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "labels": [
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "b46e4b9d-292f-e021-184d-f0c81e7c57b0",
        "x": -15,
        "y": 91.5,
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
            "id": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-in0",
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
            "name": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-out0",
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
            "name": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-out0",
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
        "locatorY": 62.244897959183675
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "05824722-035e-a6d2-58e6-79338a3cdca0",
        "x": -15,
        "y": 49.49999999999999,
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
            "id": "05824722-035e-a6d2-58e6-79338a3cdca0-in0",
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
            "name": "05824722-035e-a6d2-58e6-79338a3cdca0-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "05824722-035e-a6d2-58e6-79338a3cdca0-out0",
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
            "name": "05824722-035e-a6d2-58e6-79338a3cdca0-out0",
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
        "locatorY": 33.6734693877551
      },
      {
        "type": "GraphLang.Shapes.Basic.RightTunnel",
        "id": "b99a7a77-319d-2b93-5b46-2b9b4a51855a",
        "x": 174,
        "y": 91.5,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_RightTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-in0",
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
            "name": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-out0",
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
            "name": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-out0",
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
        "locatorY": 62.244897959183675
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "d6825f97-a635-4f68-4af5-4b739be061b7",
    "x": 619,
    "y": 368,
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
    "composite": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "-->some text<--",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwRaspiZero.File.fwrite",
    "id": "84eb251d-cac5-3785-5a96-672a4c16be18",
    "x": 641,
    "y": 419,
    "width": 81,
    "height": 60.928,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwRaspiZero_File_fwrite",
    "composite": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.File.fopen",
    "id": "4c9f57d0-8d0c-39c3-5fe9-d21e32519a92",
    "x": 369,
    "y": 306,
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
    "id": "88e75b9d-5fd8-44bc-659a-fe0eb4e612cc",
    "x": 830,
    "y": 301,
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
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "2e794993-e2c8-619a-dd44-e2bb0c2d327c",
    "x": 469,
    "y": 248,
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
    "text": "5",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "9fa1626a-21cf-1eb8-f453-38bc71214a73",
    "x": 215,
    "y": 252,
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
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "fwrite_output_file.txt",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HoverConnection",
    "id": "af62f432-b0c7-a404-8a35-d9f90c58365d",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "b46e4b9d-292f-e021-184d-f0c81e7c57b0",
      "targetPortName": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 456.9332899840001,
        "y": 361.2366556160001
      },
      {
        "x": 508.96664499200006,
        "y": 361.2366556160001
      },
      {
        "x": 508.96664499200006,
        "y": 456
      },
      {
        "x": 561,
        "y": 456
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
      "node": "4c9f57d0-8d0c-39c3-5fe9-d21e32519a92",
      "port": "errorOut"
    },
    "target": {
      "node": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
      "port": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "44a91f3d-4441-949d-0cbd-f96bdbbd976c",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "b99a7a77-319d-2b93-5b46-2b9b4a51855a",
      "sourcePortName": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 780,
        "y": 456
      },
      {
        "x": 805.297209984,
        "y": 456
      },
      {
        "x": 805.297209984,
        "y": 355.2366556160001
      },
      {
        "x": 830.594419968,
        "y": 355.2366556160001
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
      "node": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
      "port": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-out0"
    },
    "target": {
      "node": "88e75b9d-5fd8-44bc-659a-fe0eb4e612cc",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "d3a0b2dd-2620-1c14-6984-c6fc8ae06ae0",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "b46e4b9d-292f-e021-184d-f0c81e7c57b0",
      "sourcePortName": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 591,
        "y": 456
      },
      {
        "x": 617.3810960640001,
        "y": 456
      },
      {
        "x": 617.3810960640001,
        "y": 477.2366556160001
      },
      {
        "x": 643.762192128,
        "y": 477.2366556160001
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
      "node": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
      "port": "b46e4b9d-292f-e021-184d-f0c81e7c57b0-out0"
    },
    "target": {
      "node": "84eb251d-cac5-3785-5a96-672a4c16be18",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "f62d854f-920a-2eff-121c-2ea621ff9783",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "b99a7a77-319d-2b93-5b46-2b9b4a51855a",
      "targetPortName": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 725.064580864,
        "y": 477.2366556160001
      },
      {
        "x": 737.5322904320001,
        "y": 477.2366556160001
      },
      {
        "x": 737.5322904320001,
        "y": 456
      },
      {
        "x": 750,
        "y": 456
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
      "node": "84eb251d-cac5-3785-5a96-672a4c16be18",
      "port": "errorOut"
    },
    "target": {
      "node": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
      "port": "b99a7a77-319d-2b93-5b46-2b9b4a51855a-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "fce20df7-0f3c-80fb-7c41-4c1023b756e7",
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
        "x": 486.85,
        "y": 260
      },
      {
        "x": 530.7635,
        "y": 260
      },
      {
        "x": 530.7635,
        "y": 371.7
      },
      {
        "x": 574.677,
        "y": 371.7
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
      "node": "2e794993-e2c8-619a-dd44-e2bb0c2d327c",
      "port": "out1"
    },
    "target": {
      "node": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
      "port": "iterationTerminal"
    }
  },
  {
    "type": "HoverConnection",
    "id": "83ed695d-49fa-6dc0-37c1-ff45e29588e0",
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
        "x": 456.9332899840001,
        "y": 321.5082081280001
      },
      {
        "x": 645.7638549760001,
        "y": 321.5082081280001
      },
      {
        "x": 645.7638549760001,
        "y": 315.5082081280001
      },
      {
        "x": 830.594419968,
        "y": 315.5082081280001
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
      "node": "4c9f57d0-8d0c-39c3-5fe9-d21e32519a92",
      "port": "fileRef"
    },
    "target": {
      "node": "88e75b9d-5fd8-44bc-659a-fe0eb4e612cc",
      "port": "fileRef"
    }
  },
  {
    "type": "HoverConnection",
    "id": "3ae7cb8e-d539-d643-4f61-9db0c33cc5f3",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "05824722-035e-a6d2-58e6-79338a3cdca0",
      "targetPortName": "05824722-035e-a6d2-58e6-79338a3cdca0-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 456.9332899840001,
        "y": 321.5082081280001
      },
      {
        "x": 521,
        "y": 321.5082081280001
      },
      {
        "x": 521,
        "y": 414
      },
      {
        "x": 561,
        "y": 414
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
      "node": "4c9f57d0-8d0c-39c3-5fe9-d21e32519a92",
      "port": "fileRef"
    },
    "target": {
      "node": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
      "port": "05824722-035e-a6d2-58e6-79338a3cdca0-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "421822e3-97f2-afab-c0c0-63f290ec9df7",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "05824722-035e-a6d2-58e6-79338a3cdca0",
      "sourcePortName": "05824722-035e-a6d2-58e6-79338a3cdca0-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 591,
        "y": 414
      },
      {
        "x": 617.3810960640001,
        "y": 414
      },
      {
        "x": 617.3810960640001,
        "y": 435.008208128
      },
      {
        "x": 643.762192128,
        "y": 435.008208128
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
      "node": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
      "port": "05824722-035e-a6d2-58e6-79338a3cdca0-out0"
    },
    "target": {
      "node": "84eb251d-cac5-3785-5a96-672a4c16be18",
      "port": "fileRef"
    }
  },
  {
    "type": "HoverConnection",
    "id": "1a003e57-f7f3-1ade-0f3b-43a5707fc099",
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
        "x": 339.30810546875,
        "y": 264
      },
      {
        "x": 354.701262718375,
        "y": 264
      },
      {
        "x": 354.701262718375,
        "y": 321.5082081280001
      },
      {
        "x": 370.094419968,
        "y": 321.5082081280001
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
      "node": "9fa1626a-21cf-1eb8-f453-38bc71214a73",
      "port": "out1"
    },
    "target": {
      "node": "4c9f57d0-8d0c-39c3-5fe9-d21e32519a92",
      "port": "fileName"
    }
  },
  {
    "type": "HoverConnection",
    "id": "d10f91e7-b7b7-419c-3256-b79e4c47e73c",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "9f6bc574-e5c8-2239-a79c-d40c02bf6909",
    "stroke": 1.35,
    "color": "#FF0000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "dasharray": "-",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 715.6328125,
        "y": 380
      },
      {
        "x": 735.6328125,
        "y": 380
      },
      {
        "x": 735.6328125,
        "y": 417.73199999999997
      },
      {
        "x": 623.762192128,
        "y": 417.73199999999997
      },
      {
        "x": 623.762192128,
        "y": 455.46399999999994
      },
      {
        "x": 643.762192128,
        "y": 455.46399999999994
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
      "node": "d6825f97-a635-4f68-4af5-4b739be061b7",
      "port": "out1"
    },
    "target": {
      "node": "84eb251d-cac5-3785-5a96-672a4c16be18",
      "port": "stringToWrite"
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
