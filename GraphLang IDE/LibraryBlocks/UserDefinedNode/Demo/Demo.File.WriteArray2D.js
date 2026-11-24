Demo.File.WriteArray2D = GraphLang.UserDefinedNode.extend({
NAME: 'Demo.File.WriteArray2D',
init: function(attr)
{
    this._super($.extend({width: 42, height: 42, flagAutoCreatePorts: true}, attr));
},
jsonDocument: [
 {
  "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
  "id": "056b03ed-c011-4559-9004-64577d1d7632",
  "x": 420,
  "y": 160,
  "width": 560,
  "height": 330,
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
    "id": "a00b498e-5ceb-4abe-9f89-93a1751c595f",
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
    "id": "9e1978bf-5ba7-4015-add8-8119542c07c7",
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
    "id": "583e0271-2055-45e4-b1ad-992463226a1c-in0",
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
    "name": "583e0271-2055-45e4-b1ad-992463226a1c-in0",
    "port": "draw2d.InputPort",
    "locator": "draw2d.layout.locator.InputPortLocator"
   },
   {
    "type": "draw2d.OutputPort",
    "id": "583e0271-2055-45e4-b1ad-992463226a1c-out0",
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
    "name": "583e0271-2055-45e4-b1ad-992463226a1c-out0",
    "port": "draw2d.OutputPort",
    "locator": "draw2d.layout.locator.OutputPortLocator"
   },
   {
    "type": "draw2d.InputPort",
    "id": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-in0",
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
    "name": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-in0",
    "port": "draw2d.InputPort",
    "locator": "draw2d.layout.locator.InputPortLocator"
   },
   {
    "type": "draw2d.OutputPort",
    "id": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-out0",
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
    "name": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-out0",
    "port": "draw2d.OutputPort",
    "locator": "draw2d.layout.locator.OutputPortLocator"
   },
   {
    "type": "draw2d.InputPort",
    "id": "23de2c70-16cb-4642-ba3b-b70330231339-in0",
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
    "name": "23de2c70-16cb-4642-ba3b-b70330231339-in0",
    "port": "draw2d.InputPort",
    "locator": "draw2d.layout.locator.InputPortLocator"
   },
   {
    "type": "draw2d.OutputPort",
    "id": "23de2c70-16cb-4642-ba3b-b70330231339-out0",
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
    "name": "23de2c70-16cb-4642-ba3b-b70330231339-out0",
    "port": "draw2d.OutputPort",
    "locator": "draw2d.layout.locator.OutputPortLocator"
   },
   {
    "type": "draw2d.InputPort",
    "id": "7e21a435-4814-4a6d-bd3e-41550a43e06b-in0",
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
    "name": "7e21a435-4814-4a6d-bd3e-41550a43e06b-in0",
    "port": "draw2d.InputPort",
    "locator": "draw2d.layout.locator.InputPortLocator"
   },
   {
    "type": "draw2d.OutputPort",
    "id": "7e21a435-4814-4a6d-bd3e-41550a43e06b-out0",
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
    "name": "7e21a435-4814-4a6d-bd3e-41550a43e06b-out0",
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
    "type": "draw2d.shape.basic.Label",
    "id": "8815f625-121f-4ac5-aeb6-8a37610fc1b9",
    "x": 256.1577,
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
    "id": "583e0271-2055-45e4-b1ad-992463226a1c",
    "x": -15,
    "y": 70,
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
      "id": "583e0271-2055-45e4-b1ad-992463226a1c-in0",
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
      "name": "583e0271-2055-45e4-b1ad-992463226a1c-in0",
      "port": "draw2d.InputPort",
      "locator": "draw2d.layout.locator.InputPortLocator"
     },
     {
      "type": "draw2d.OutputPort",
      "id": "583e0271-2055-45e4-b1ad-992463226a1c-out0",
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
      "name": "583e0271-2055-45e4-b1ad-992463226a1c-out0",
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
    "locatorY": 23.484848484848484
   },
   {
    "type": "GraphLang.Shapes.Basic.LeftTunnel",
    "id": "e09c7673-07bd-40e0-b7c4-1025a09d39c7",
    "x": -15,
    "y": 120,
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
      "id": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-in0",
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
      "name": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-in0",
      "port": "draw2d.InputPort",
      "locator": "draw2d.layout.locator.InputPortLocator"
     },
     {
      "type": "draw2d.OutputPort",
      "id": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-out0",
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
      "name": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-out0",
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
    "locatorY": 38.63636363636363
   },
   {
    "type": "GraphLang.Shapes.Basic.LeftTunnel",
    "id": "23de2c70-16cb-4642-ba3b-b70330231339",
    "x": -15,
    "y": 250,
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
      "id": "23de2c70-16cb-4642-ba3b-b70330231339-in0",
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
      "name": "23de2c70-16cb-4642-ba3b-b70330231339-in0",
      "port": "draw2d.InputPort",
      "locator": "draw2d.layout.locator.InputPortLocator"
     },
     {
      "type": "draw2d.OutputPort",
      "id": "23de2c70-16cb-4642-ba3b-b70330231339-out0",
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
      "name": "23de2c70-16cb-4642-ba3b-b70330231339-out0",
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
    "locatorY": 78.03030303030303
   },
   {
    "type": "GraphLang.Shapes.Basic.RightTunnel",
    "id": "7e21a435-4814-4a6d-bd3e-41550a43e06b",
    "x": 545,
    "y": 120,
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
      "id": "7e21a435-4814-4a6d-bd3e-41550a43e06b-in0",
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
      "name": "7e21a435-4814-4a6d-bd3e-41550a43e06b-in0",
      "port": "draw2d.InputPort",
      "locator": "draw2d.layout.locator.InputPortLocator"
     },
     {
      "type": "draw2d.OutputPort",
      "id": "7e21a435-4814-4a6d-bd3e-41550a43e06b-out0",
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
      "name": "7e21a435-4814-4a6d-bd3e-41550a43e06b-out0",
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
    "locatorY": 38.63636363636363
   }
  ]
 },
 {
  "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
  "id": "833c4c1c-0408-4d11-87b4-7912d976701b",
  "x": 590,
  "y": 220,
  "width": 330,
  "height": 230,
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
    "id": "97e1a018-3ed5-4a95-96ed-fa10cdb45239",
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
    "id": "a1c537c2-f850-4345-b46a-7e2c993c5898",
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
    "id": "3d636149-3a38-4f4b-b09d-f1089b327efa-in0",
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
    "name": "3d636149-3a38-4f4b-b09d-f1089b327efa-in0",
    "port": "draw2d.InputPort",
    "locator": "draw2d.layout.locator.InputPortLocator"
   },
   {
    "type": "draw2d.OutputPort",
    "id": "3d636149-3a38-4f4b-b09d-f1089b327efa-out0",
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
    "name": "3d636149-3a38-4f4b-b09d-f1089b327efa-out0",
    "port": "draw2d.OutputPort",
    "locator": "draw2d.layout.locator.OutputPortLocator"
   },
   {
    "type": "draw2d.InputPort",
    "id": "788349e6-9a25-401c-9f38-1abf1111e45e-in0",
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
    "name": "788349e6-9a25-401c-9f38-1abf1111e45e-in0",
    "port": "draw2d.InputPort",
    "locator": "draw2d.layout.locator.InputPortLocator"
   },
   {
    "type": "draw2d.OutputPort",
    "id": "788349e6-9a25-401c-9f38-1abf1111e45e-out0",
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
    "name": "788349e6-9a25-401c-9f38-1abf1111e45e-out0",
    "port": "draw2d.OutputPort",
    "locator": "draw2d.layout.locator.OutputPortLocator"
   },
   {
    "type": "draw2d.InputPort",
    "id": "9181121a-ecdc-4317-836c-be517b6ce737-in0",
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
    "name": "9181121a-ecdc-4317-836c-be517b6ce737-in0",
    "port": "draw2d.InputPort",
    "locator": "draw2d.layout.locator.InputPortLocator"
   },
   {
    "type": "draw2d.OutputPort",
    "id": "9181121a-ecdc-4317-836c-be517b6ce737-out0",
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
    "name": "9181121a-ecdc-4317-836c-be517b6ce737-out0",
    "port": "draw2d.OutputPort",
    "locator": "draw2d.layout.locator.OutputPortLocator"
   },
   {
    "type": "draw2d.InputPort",
    "id": "8da61021-1118-44d1-9082-c17fc7b8a9fb-in0",
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
    "name": "8da61021-1118-44d1-9082-c17fc7b8a9fb-in0",
    "port": "draw2d.InputPort",
    "locator": "draw2d.layout.locator.InputPortLocator"
   },
   {
    "type": "draw2d.OutputPort",
    "id": "8da61021-1118-44d1-9082-c17fc7b8a9fb-out0",
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
    "name": "8da61021-1118-44d1-9082-c17fc7b8a9fb-out0",
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
    "type": "draw2d.shape.basic.Label",
    "id": "76d19758-f33f-4d10-a861-69b6cfddeff3",
    "x": 141.1577,
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
    "id": "3d636149-3a38-4f4b-b09d-f1089b327efa",
    "x": -15,
    "y": 10,
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
      "id": "3d636149-3a38-4f4b-b09d-f1089b327efa-in0",
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
      "name": "3d636149-3a38-4f4b-b09d-f1089b327efa-in0",
      "port": "draw2d.InputPort",
      "locator": "draw2d.layout.locator.InputPortLocator"
     },
     {
      "type": "draw2d.OutputPort",
      "id": "3d636149-3a38-4f4b-b09d-f1089b327efa-out0",
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
      "name": "3d636149-3a38-4f4b-b09d-f1089b327efa-out0",
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
    "locatorY": 7.608695652173914
   },
   {
    "type": "GraphLang.Shapes.Basic.LeftTunnel",
    "id": "788349e6-9a25-401c-9f38-1abf1111e45e",
    "x": -15,
    "y": 60,
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
      "id": "788349e6-9a25-401c-9f38-1abf1111e45e-in0",
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
      "name": "788349e6-9a25-401c-9f38-1abf1111e45e-in0",
      "port": "draw2d.InputPort",
      "locator": "draw2d.layout.locator.InputPortLocator"
     },
     {
      "type": "draw2d.OutputPort",
      "id": "788349e6-9a25-401c-9f38-1abf1111e45e-out0",
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
      "name": "788349e6-9a25-401c-9f38-1abf1111e45e-out0",
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
    "locatorY": 29.347826086956523
   },
   {
    "type": "GraphLang.Shapes.Basic.LeftTunnel",
    "id": "9181121a-ecdc-4317-836c-be517b6ce737",
    "x": -15,
    "y": 180,
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
      "id": "9181121a-ecdc-4317-836c-be517b6ce737-in0",
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
      "name": "9181121a-ecdc-4317-836c-be517b6ce737-in0",
      "port": "draw2d.InputPort",
      "locator": "draw2d.layout.locator.InputPortLocator"
     },
     {
      "type": "draw2d.OutputPort",
      "id": "9181121a-ecdc-4317-836c-be517b6ce737-out0",
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
      "name": "9181121a-ecdc-4317-836c-be517b6ce737-out0",
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
    "locatorY": 81.52173913043478
   },
   {
    "type": "GraphLang.Shapes.Basic.RightTunnel",
    "id": "8da61021-1118-44d1-9082-c17fc7b8a9fb",
    "x": 315,
    "y": 60,
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
      "id": "8da61021-1118-44d1-9082-c17fc7b8a9fb-in0",
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
      "name": "8da61021-1118-44d1-9082-c17fc7b8a9fb-in0",
      "port": "draw2d.InputPort",
      "locator": "draw2d.layout.locator.InputPortLocator"
     },
     {
      "type": "draw2d.OutputPort",
      "id": "8da61021-1118-44d1-9082-c17fc7b8a9fb-out0",
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
      "name": "8da61021-1118-44d1-9082-c17fc7b8a9fb-out0",
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
    "locatorY": 29.347826086956523
   }
  ],
  "composite": "056b03ed-c011-4559-9004-64577d1d7632"
 },
 {
  "type": "GraphLang.Shapes.Basic.ConstantNode",
  "id": "94facc79-0adf-4760-a6f2-220d1b28f6a4",
  "x": 110,
  "y": 200,
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
  "text": "array2d_output.txt",
  "outlineStroke": 0,
  "outlineColor": "none",
  "fontSize": 12,
  "fontColor": "#000000",
  "fontFamily": null,
  "editor": "draw2d.ui.LabelInplaceEditor"
 },
 {
  "type": "GraphLang.Shapes.Basic.ConstantNode",
  "id": "d94e3563-9c5f-4303-b20c-783a74a2abe7",
  "x": 380,
  "y": 120,
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
  "type": "GraphLang.Shapes.Basic.ConstantNode",
  "id": "3b0837f9-bce0-4d64-9ee1-3f10e7170d7f",
  "x": 560,
  "y": 185,
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
  "text": "4",
  "outlineStroke": 0,
  "outlineColor": "none",
  "fontSize": 12,
  "fontColor": "#FFFFFF",
  "fontFamily": null,
  "editor": "draw2d.ui.LabelInplaceEditor",
  "composite": "056b03ed-c011-4559-9004-64577d1d7632"
 },
 {
  "type": "HwRaspiZero.File.fopen",
  "id": "ff16f2f7-880a-4326-b087-92dc6dda7c5e",
  "x": 270,
  "y": 200,
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
  "id": "3c866923-29fc-4faf-8907-bb8d28ef035e",
  "x": 1040,
  "y": 200,
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
  "type": "HwRaspiZero.File.fwrite",
  "id": "df1d3114-df0a-40cb-81a1-e129eadc876d",
  "x": 790,
  "y": 280,
  "width": 81,
  "height": 60.928,
  "alpha": 1,
  "angle": 0,
  "userData": {
   "executionOrder": -1
  },
  "cssClass": "HwRaspiZero_File_fwrite",
  "bgColor": "none",
  "color": "#1B1B1B",
  "stroke": 0,
  "radius": 0,
  "dasharray": null,
  "labels": [],
  "composite": "833c4c1c-0408-4d11-87b4-7912d976701b"
 },
 {
  "type": "GraphLang.Shapes.Basic.ArrayIndex",
  "id": "82ba46d6-14ed-40a6-aaee-c33a568fa327",
  "x": 480,
  "y": 400,
  "width": 54.975581388799924,
  "height": 22.861321011200232,
  "alpha": 1,
  "angle": 0,
  "userData": {
   "executionOrder": -1
  },
  "cssClass": "GraphLang_Shapes_Basic_ArrayIndex",
  "bgColor": "none",
  "color": "#1B1B1B",
  "stroke": 0,
  "radius": 0,
  "dasharray": null,
  "composite": "056b03ed-c011-4559-9004-64577d1d7632"
 },
 {
  "type": "GraphLang.Shapes.Basic.ArrayIndex",
  "id": "84a94898-b709-4c60-84f9-ccc169d4a355",
  "x": 670,
  "y": 390,
  "width": 54.975581388799924,
  "height": 22.861321011200232,
  "alpha": 1,
  "angle": 0,
  "userData": {
   "executionOrder": -1
  },
  "cssClass": "GraphLang_Shapes_Basic_ArrayIndex",
  "bgColor": "none",
  "color": "#1B1B1B",
  "stroke": 0,
  "radius": 0,
  "dasharray": null,
  "composite": "833c4c1c-0408-4d11-87b4-7912d976701b"
 },
 {
  "type": "GraphLang.Shapes.Basic.ArrayNode2D",
  "id": "46c3938d-d099-404a-a807-fc07ec8740b7",
  "x": 200,
  "y": 380,
  "width": 126,
  "height": 102,
  "alpha": 1,
  "angle": 0,
  "userData": {
   "isTerminal": false,
   "nodeLabel": "letters",
   "datatype": "string**",
   "executionOrder": -1
  },
  "cssClass": "GraphLang_Shapes_Basic_ArrayNode2D",
  "bgColor": "none",
  "color": "#1B1B1B",
  "stroke": 1,
  "radius": 0,
  "dasharray": null,
  "cells": [
   [
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "A",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    },
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "B",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    },
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "C",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    },
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "D",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    }
   ],
   [
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "E",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    },
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "F",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    },
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "G",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    },
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "H",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    }
   ],
   [
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "I",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    },
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "J",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    },
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "K",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    },
    {
     "type": "draw2d.shape.basic.Label",
     "alpha": 1,
     "angle": 0,
     "userData": {
      "datatype": "string"
     },
     "cssClass": "draw2d_shape_basic_Label",
     "bgColor": "#FF3385",
     "color": "#1B1B1B",
     "stroke": 1,
     "radius": 0,
     "dasharray": null,
     "text": "L",
     "outlineStroke": 0,
     "outlineColor": "none",
     "fontSize": 12,
     "fontColor": "#000000",
     "fontFamily": null,
     "editor": "draw2d.ui.LabelInplaceEditor"
    }
   ]
  ]
 },
 {
  "type": "HoverConnection",
  "id": "9a4345fa-74c3-4d94-aa10-f8ce1a102080",
  "alpha": 1,
  "angle": 0,
  "userData": {},
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#FF0000",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "94facc79-0adf-4760-a6f2-220d1b28f6a4",
   "port": "out1"
  },
  "target": {
   "node": "ff16f2f7-880a-4326-b087-92dc6dda7c5e",
   "port": "fileName"
  }
 },
 {
  "type": "HoverConnection",
  "id": "ac4e9187-4c75-488c-b1c0-f0d025adb55a",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "targetTunnel": "583e0271-2055-45e4-b1ad-992463226a1c",
   "targetPortName": "583e0271-2055-45e4-b1ad-992463226a1c-in0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#636363",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "ff16f2f7-880a-4326-b087-92dc6dda7c5e",
   "port": "fileRef"
  },
  "target": {
   "node": "056b03ed-c011-4559-9004-64577d1d7632",
   "port": "583e0271-2055-45e4-b1ad-992463226a1c-in0"
  }
 },
 {
  "type": "HoverConnection",
  "id": "80718fc3-ea4f-49ef-a4c4-12063a5c8fc8",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "sourceTunnel": "583e0271-2055-45e4-b1ad-992463226a1c",
   "sourcePortName": "583e0271-2055-45e4-b1ad-992463226a1c-out0",
   "targetTunnel": "3d636149-3a38-4f4b-b09d-f1089b327efa",
   "targetPortName": "3d636149-3a38-4f4b-b09d-f1089b327efa-in0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#636363",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "056b03ed-c011-4559-9004-64577d1d7632",
   "port": "583e0271-2055-45e4-b1ad-992463226a1c-out0"
  },
  "target": {
   "node": "833c4c1c-0408-4d11-87b4-7912d976701b",
   "port": "3d636149-3a38-4f4b-b09d-f1089b327efa-in0"
  }
 },
 {
  "type": "HoverConnection",
  "id": "46d8c46b-8ac1-4fa3-b78e-a961c65c6d17",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "sourceTunnel": "3d636149-3a38-4f4b-b09d-f1089b327efa",
   "sourcePortName": "3d636149-3a38-4f4b-b09d-f1089b327efa-out0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#636363",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "833c4c1c-0408-4d11-87b4-7912d976701b",
   "port": "3d636149-3a38-4f4b-b09d-f1089b327efa-out0"
  },
  "target": {
   "node": "df1d3114-df0a-40cb-81a1-e129eadc876d",
   "port": "fileRef"
  }
 },
 {
  "type": "HoverConnection",
  "id": "964ca2cf-5a71-4397-b0c0-43c85899e613",
  "alpha": 1,
  "angle": 0,
  "userData": {},
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#636363",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "ff16f2f7-880a-4326-b087-92dc6dda7c5e",
   "port": "fileRef"
  },
  "target": {
   "node": "3c866923-29fc-4faf-8907-bb8d28ef035e",
   "port": "fileRef"
  }
 },
 {
  "type": "HoverConnection",
  "id": "72706674-05fb-4a22-af04-0856f6f7c17f",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "targetTunnel": "e09c7673-07bd-40e0-b7c4-1025a09d39c7",
   "targetPortName": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-in0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#636363",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "ff16f2f7-880a-4326-b087-92dc6dda7c5e",
   "port": "errorOut"
  },
  "target": {
   "node": "056b03ed-c011-4559-9004-64577d1d7632",
   "port": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-in0"
  }
 },
 {
  "type": "HoverConnection",
  "id": "ef13a630-6848-48e3-88b1-bd02b0fe5c30",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "sourceTunnel": "e09c7673-07bd-40e0-b7c4-1025a09d39c7",
   "sourcePortName": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-out0",
   "targetTunnel": "788349e6-9a25-401c-9f38-1abf1111e45e",
   "targetPortName": "788349e6-9a25-401c-9f38-1abf1111e45e-in0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#636363",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "056b03ed-c011-4559-9004-64577d1d7632",
   "port": "e09c7673-07bd-40e0-b7c4-1025a09d39c7-out0"
  },
  "target": {
   "node": "833c4c1c-0408-4d11-87b4-7912d976701b",
   "port": "788349e6-9a25-401c-9f38-1abf1111e45e-in0"
  }
 },
 {
  "type": "HoverConnection",
  "id": "ac1e7e73-46a0-4620-8c94-eb10847055ca",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "sourceTunnel": "788349e6-9a25-401c-9f38-1abf1111e45e",
   "sourcePortName": "788349e6-9a25-401c-9f38-1abf1111e45e-out0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#636363",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "833c4c1c-0408-4d11-87b4-7912d976701b",
   "port": "788349e6-9a25-401c-9f38-1abf1111e45e-out0"
  },
  "target": {
   "node": "df1d3114-df0a-40cb-81a1-e129eadc876d",
   "port": "errorIn"
  }
 },
 {
  "type": "HoverConnection",
  "id": "8d72d4d0-d949-42ce-b08c-a47162234fc6",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "targetTunnel": "8da61021-1118-44d1-9082-c17fc7b8a9fb",
   "targetPortName": "8da61021-1118-44d1-9082-c17fc7b8a9fb-in0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#636363",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "df1d3114-df0a-40cb-81a1-e129eadc876d",
   "port": "errorOut"
  },
  "target": {
   "node": "833c4c1c-0408-4d11-87b4-7912d976701b",
   "port": "8da61021-1118-44d1-9082-c17fc7b8a9fb-in0"
  }
 },
 {
  "type": "HoverConnection",
  "id": "59bf413e-dfac-4754-b70a-05817cb5955e",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "sourceTunnel": "8da61021-1118-44d1-9082-c17fc7b8a9fb",
   "sourcePortName": "8da61021-1118-44d1-9082-c17fc7b8a9fb-out0",
   "targetTunnel": "7e21a435-4814-4a6d-bd3e-41550a43e06b",
   "targetPortName": "7e21a435-4814-4a6d-bd3e-41550a43e06b-in0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#636363",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "833c4c1c-0408-4d11-87b4-7912d976701b",
   "port": "8da61021-1118-44d1-9082-c17fc7b8a9fb-out0"
  },
  "target": {
   "node": "056b03ed-c011-4559-9004-64577d1d7632",
   "port": "7e21a435-4814-4a6d-bd3e-41550a43e06b-in0"
  }
 },
 {
  "type": "HoverConnection",
  "id": "47591802-3a9f-4403-a5db-2977f35c4cbd",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "sourceTunnel": "7e21a435-4814-4a6d-bd3e-41550a43e06b",
   "sourcePortName": "7e21a435-4814-4a6d-bd3e-41550a43e06b-out0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#636363",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "056b03ed-c011-4559-9004-64577d1d7632",
   "port": "7e21a435-4814-4a6d-bd3e-41550a43e06b-out0"
  },
  "target": {
   "node": "3c866923-29fc-4faf-8907-bb8d28ef035e",
   "port": "errorIn"
  }
 },
 {
  "type": "HoverConnection",
  "id": "3267d1c5-ea17-43af-a161-42c4ea39a791",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "targetTunnel": "23de2c70-16cb-4642-ba3b-b70330231339",
   "targetPortName": "23de2c70-16cb-4642-ba3b-b70330231339-in0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#FF0000",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "46c3938d-d099-404a-a807-fc07ec8740b7",
   "port": "out1"
  },
  "target": {
   "node": "056b03ed-c011-4559-9004-64577d1d7632",
   "port": "23de2c70-16cb-4642-ba3b-b70330231339-in0"
  }
 },
 {
  "type": "HoverConnection",
  "id": "2f80d2e5-2a2e-48f6-94e3-ee3bc876b80d",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "sourceTunnel": "23de2c70-16cb-4642-ba3b-b70330231339",
   "sourcePortName": "23de2c70-16cb-4642-ba3b-b70330231339-out0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#FF0000",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "056b03ed-c011-4559-9004-64577d1d7632",
   "port": "23de2c70-16cb-4642-ba3b-b70330231339-out0"
  },
  "target": {
   "node": "82ba46d6-14ed-40a6-aaee-c33a568fa327",
   "port": "array_in"
  }
 },
 {
  "type": "HoverConnection",
  "id": "11ac9e76-dfba-4592-82ae-05c17b73afc0",
  "alpha": 1,
  "angle": 0,
  "userData": {},
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#4286F4",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "056b03ed-c011-4559-9004-64577d1d7632",
   "port": "iterationTerminalOutput"
  },
  "target": {
   "node": "82ba46d6-14ed-40a6-aaee-c33a568fa327",
   "port": "index_in"
  }
 },
 {
  "type": "HoverConnection",
  "id": "f6efc871-db48-4d7c-9989-79ac149046be",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "targetTunnel": "9181121a-ecdc-4317-836c-be517b6ce737",
   "targetPortName": "9181121a-ecdc-4317-836c-be517b6ce737-in0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#FF0000",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "82ba46d6-14ed-40a6-aaee-c33a568fa327",
   "port": "arrayElement_out"
  },
  "target": {
   "node": "833c4c1c-0408-4d11-87b4-7912d976701b",
   "port": "9181121a-ecdc-4317-836c-be517b6ce737-in0"
  }
 },
 {
  "type": "HoverConnection",
  "id": "f7cd2eff-ff49-49ac-934a-7660262cdcee",
  "alpha": 1,
  "angle": 0,
  "userData": {
   "sourceTunnel": "9181121a-ecdc-4317-836c-be517b6ce737",
   "sourcePortName": "9181121a-ecdc-4317-836c-be517b6ce737-out0"
  },
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#FF0000",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "833c4c1c-0408-4d11-87b4-7912d976701b",
   "port": "9181121a-ecdc-4317-836c-be517b6ce737-out0"
  },
  "target": {
   "node": "84a94898-b709-4c60-84f9-ccc169d4a355",
   "port": "array_in"
  }
 },
 {
  "type": "HoverConnection",
  "id": "0837993b-4660-4490-aa89-7d65baeac70c",
  "alpha": 1,
  "angle": 0,
  "userData": {},
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#4286F4",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "833c4c1c-0408-4d11-87b4-7912d976701b",
   "port": "iterationTerminalOutput"
  },
  "target": {
   "node": "84a94898-b709-4c60-84f9-ccc169d4a355",
   "port": "index_in"
  }
 },
 {
  "type": "HoverConnection",
  "id": "afa71014-17ad-4680-b3f4-3552c7b39ddb",
  "alpha": 1,
  "angle": 0,
  "userData": {},
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#FF0000",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "84a94898-b709-4c60-84f9-ccc169d4a355",
   "port": "arrayElement_out"
  },
  "target": {
   "node": "df1d3114-df0a-40cb-81a1-e129eadc876d",
   "port": "stringToWrite"
  },
  "composite": "833c4c1c-0408-4d11-87b4-7912d976701b"
 },
 {
  "type": "HoverConnection",
  "id": "cc8a2918-284e-41ab-b19e-215230ef3b30",
  "alpha": 1,
  "angle": 0,
  "userData": {},
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#4286F4",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "d94e3563-9c5f-4303-b20c-783a74a2abe7",
   "port": "out1"
  },
  "target": {
   "node": "056b03ed-c011-4559-9004-64577d1d7632",
   "port": "iterationTerminal"
  }
 },
 {
  "type": "HoverConnection",
  "id": "b54c3ef8-80e9-49c1-bbad-6faf2e051183",
  "alpha": 1,
  "angle": 0,
  "userData": {},
  "cssClass": "HoverConnection",
  "stroke": 1.35,
  "color": "#4286F4",
  "outlineStroke": 0,
  "outlineColor": "none",
  "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
  "vertex": [],
  "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
  "radius": 5,
  "routingMetaData": {
   "routedByUserInteraction": false,
   "fromDir": 1,
   "toDir": 3
  },
  "source": {
   "node": "3b0837f9-bce0-4d64-9ee1-3f10e7170d7f",
   "port": "out1"
  },
  "target": {
   "node": "833c4c1c-0408-4d11-87b4-7912d976701b",
   "port": "iterationTerminal"
  },
  "composite": "056b03ed-c011-4559-9004-64577d1d7632"
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
