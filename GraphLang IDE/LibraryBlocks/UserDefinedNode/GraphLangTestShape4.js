GraphLangTestShape = GraphLang.UserDefinedNode.extend({
NAME: "GraphLangTestShape",
/******************************************* STORED FROM PREVIOUS NODE **********************************/
init: function(attr,setter,getter){
	this._super( $.extend({stroke:0, bgColor:null, width:42, height:42, flagAutoCreatePorts: false},attr), setter, getter);
	var port;
	this.persistPorts=false;
},
createShapeElement: function(){
	var shape = this._super();
	this.originalWidth = 42;
	this.originalHeight = 42;
	return shape;
},

createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L"+this.width+",0 L"+this.width+","+this.height+" L0,"+this.height);
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path("M0,0 L"+this.width+",0 L"+this.width+","+this.height+" L0,"+this.height+"Z");
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        return this.canvas.paper.setFinish();
   },


/********************************************************************************************************/
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.Loop2.ClusterDatatypeNode2",
    "id": "1168ec5f-c80d-1a8c-bb32-5bba2a7a8ee9",
    "x": 321,
    "y": 127,
    "width": 136.703125,
    "height": 91,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false,
      "isTerminal": false,
      "datatype": "clusterDatatype_1168ec5fc80d1a8cbb325bba2a7a8ee9_ahoj*",
      "nodeLabel": "ahoj"
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
        "id": "b1cc18bc-9d32-51dd-941e-4412146e012c",
        "x": 51.8408203125,
        "y": 93,
        "width": 28.90625,
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
        "text": "ahoj",
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
    "id": "2c153b69-56bd-d0e9-3e7b-b3ecb7f8981a",
    "x": 338,
    "y": 159,
    "width": 66.5859375,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "String",
      "isTerminal": false,
      "nodeLabel": "item_1",
      "executionOrder": -1,
      "clusterItemIndex": "2"
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "1168ec5f-c80d-1a8c-bb32-5bba2a7a8ee9",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "defaultString",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "e1bc8ef6-2f10-0945-6afd-d9657b556b6e",
    "x": 321,
    "y": 127,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false,
      "clusterItemIndex": "1",
      "nodeLabel": "item_0",
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "1168ec5f-c80d-1a8c-bb32-5bba2a7a8ee9",
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
    "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
    "id": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
    "x": 508,
    "y": 327,
    "width": 444,
    "height": 241,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_ForLoop",
    "ports": [
      {
        "type": "draw2d.InputPort",
        "id": "3bf3d6c0-5d45-5bd6-8227-d9876dbd2600",
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
        "id": "d615e2cf-6887-ce9b-9257-7dfd8250bf81",
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
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 20,
        "name": "iterationTerminalOutput",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.XYRelPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-in0",
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
        "name": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-out0",
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
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "a770633c-24bc-753d-57c4-1e527fd49416-in0",
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
        "name": "a770633c-24bc-753d-57c4-1e527fd49416-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "a770633c-24bc-753d-57c4-1e527fd49416-out0",
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
        "stroke": 1,
        "dasharray": null,
        "maxFanOut": 9007199254740991,
        "name": "a770633c-24bc-753d-57c4-1e527fd49416-out0",
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
        "id": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340",
        "x": -15,
        "y": 152.5,
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
            "id": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-in0",
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
            "name": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-out0",
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
            "stroke": 1,
            "dasharray": null,
            "maxFanOut": 9007199254740991,
            "name": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#000000",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "locator": "GraphLang.Utils.LeftRelPortLocator",
        "locatorX": 15,
        "locatorY": 63.27800829875518
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "a770633c-24bc-753d-57c4-1e527fd49416",
        "x": 106.00000000000001,
        "y": -7.5,
        "width": 30,
        "height": 15,
        "alpha": 0.4,
        "angle": -270,
        "userData": {
          "executionOrder": -1,
          "parentLoop": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7"
        },
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "a770633c-24bc-753d-57c4-1e527fd49416-in0",
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
            "name": "a770633c-24bc-753d-57c4-1e527fd49416-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "a770633c-24bc-753d-57c4-1e527fd49416-out0",
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
            "stroke": 1,
            "dasharray": null,
            "maxFanOut": 9007199254740991,
            "name": "a770633c-24bc-753d-57c4-1e527fd49416-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#7D1A4C",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": "",
        "locator": "GraphLang.Utils.TopRelPortLocator",
        "locatorX": 23.873873873873876,
        "locatorY": 7.5
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.UnbundleByName",
    "id": "282acdfa-660e-8919-4972-5a38020873d2",
    "x": 739,
    "y": 364,
    "width": 43.03125,
    "height": 24,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false
    },
    "cssClass": "GraphLang_Shapes_Basic_UnbundleByName",
    "composite": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
    "bgColor": "#DBDDDE",
    "color": "#D7D7D7",
    "stroke": 1,
    "radius": 3,
    "dasharray": null,
    "bundleItems": [
      {
        "name": "item_1",
        "inputPortName": "output_fd7a168e-587c-7484-55a7-5960917794dd"
      }
    ]
  },
  {
    "type": "GraphLang.ArduinoLib.Node.Serial.println",
    "id": "9956fbdd-5a89-721a-965d-b98da7d63f61",
    "x": 731,
    "y": 475,
    "width": 86,
    "height": 78.21264823944955,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ArduinoLib_Node_Serial_println",
    "composite": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.ArduinoLib.Node.waitUntilNextMs",
    "id": "a8f7138d-93f6-27ff-f34d-ba47fa1fdf62",
    "x": 845,
    "y": 468,
    "width": 62,
    "height": 38,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ArduinoLib_Node_waitUntilNextMs",
    "composite": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "b7b8ee59-28ba-db02-c1ac-e69140990be8",
    "x": 854,
    "y": 355,
    "width": 32.6845703125,
    "height": 21,
    "alpha": 1,
    "angle": 30,
    "userData": {
      "datatype": "int",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "1000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.Unbundle",
    "id": "ff85a37f-5e5b-70eb-2cc5-e946bea09c8b",
    "x": 624,
    "y": 399,
    "width": 49.673828125,
    "height": 44,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false
    },
    "cssClass": "GraphLang_Shapes_Basic_Unbundle",
    "composite": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
    "bgColor": "#DBDDDE",
    "color": "#D7D7D7",
    "stroke": 1,
    "radius": 3,
    "dasharray": null,
    "bundleItems": [
      {
        "name": "int",
        "inputPortName": "output_1af879a2-74e5-967f-2444-231c0e6bc6ee"
      },
      {
        "name": "String",
        "inputPortName": "output_c00d3a72-edff-0939-c9d2-c66aab86871b"
      }
    ]
  },
  {
    "type": "GraphLang.ArduinoLib.Node.Serial.begin",
    "id": "a47817bf-fb49-a048-5961-972d93ee0ec8",
    "x": 281,
    "y": 317,
    "width": 88.701171875,
    "height": 80.91549715073495,
    "alpha": 1,
    "angle": 100,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ArduinoLib_Node_Serial_begin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "f46d8f5f-f710-1bac-59f7-6e65543860fc",
    "x": 162,
    "y": 141,
    "width": 32.6845703125,
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
    "text": "9600",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "3e35cba9-69b6-a68c-1fca-0551ccd06cbb",
    "x": 393,
    "y": 76,
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
    "type": "GraphLang.Shapes.Basic.ArrayNode",
    "id": "02c26f94-d281-8142-d66a-17baa5f55a02",
    "x": 168,
    "y": 315,
    "width": 50,
    "height": 92,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "isTerminal": false,
      "nodeLabel": "experimentalName_1",
      "datatype": "float*"
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
        "id": "82d9dc58-e0e1-10a5-0c2a-3eb77701d397",
        "x": 10,
        "y": 10,
        "width": 16,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "float"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFC300",
        "color": "#FAB700",
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
        "id": "58cafdcf-9e3a-7555-8e87-03b5ede5c664",
        "x": 10,
        "y": 34,
        "width": 16,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "float"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFC300",
        "color": "#1B1B1B",
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
        "id": "2f48448b-3521-92e9-c4d4-61778c7468ff",
        "x": 10,
        "y": 58,
        "width": 16,
        "height": 24,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "float"
        },
        "cssClass": "draw2d_shape_basic_Label",
        "ports": [],
        "bgColor": "#FFC300",
        "color": "#1B1B1B",
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
    "type": "HoverConnection",
    "id": "f18ea47e-aac3-7169-2270-fb660e7072a3",
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
        "x": 200.87255859375,
        "y": 153
      },
      {
        "x": 272.738445724282,
        "y": 153
      },
      {
        "x": 272.738445724282,
        "y": 319.3719315667981
      },
      {
        "x": 344.604332854814,
        "y": 319.3719315667981
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
      "node": "f46d8f5f-f710-1bac-59f7-6e65543860fc",
      "port": "out1"
    },
    "target": {
      "node": "a47817bf-fb49-a048-5961-972d93ee0ec8",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "d164529d-569e-574e-1acf-bb944cc6579a",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340",
      "targetPortName": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 292.76975700097745,
        "y": 392.6068385913488
      },
      {
        "x": 392.88487850048875,
        "y": 392.6068385913488
      },
      {
        "x": 392.88487850048875,
        "y": 487
      },
      {
        "x": 493,
        "y": 487
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
      "node": "a47817bf-fb49-a048-5961-972d93ee0ec8",
      "port": "errorOut"
    },
    "target": {
      "node": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
      "port": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "b39fd0ff-59a3-e2bb-776b-40aedcfa8cab",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "a770633c-24bc-753d-57c4-1e527fd49416",
      "targetPortName": "a770633c-24bc-753d-57c4-1e527fd49416-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7D1A4C",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 457.703125,
        "y": 172.5
      },
      {
        "x": 629,
        "y": 172.5
      },
      {
        "x": 629,
        "y": 312
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
      "node": "1168ec5f-c80d-1a8c-bb32-5bba2a7a8ee9",
      "port": "clusterOutput"
    },
    "target": {
      "node": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
      "port": "a770633c-24bc-753d-57c4-1e527fd49416-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "61e7b4f9-d94d-6eb6-5439-2b51ae1cb336",
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
        "x": 410.85,
        "y": 88
      },
      {
        "x": 457.871,
        "y": 88
      },
      {
        "x": 457.871,
        "y": 351.1
      },
      {
        "x": 504.892,
        "y": 351.1
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
      "node": "3e35cba9-69b6-a68c-1fca-0551ccd06cbb",
      "port": "out1"
    },
    "target": {
      "node": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
      "port": "iterationTerminal"
    }
  },
  {
    "type": "HoverConnection",
    "id": "863f2fa2-ca7b-c57d-fd7c-92142bc8a72d",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "a770633c-24bc-753d-57c4-1e527fd49416",
      "sourcePortName": "a770633c-24bc-753d-57c4-1e527fd49416-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7D1A4C",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 629,
        "y": 342
      },
      {
        "x": 629,
        "y": 381.5
      },
      {
        "x": 603.652283203125,
        "y": 381.5
      },
      {
        "x": 603.652283203125,
        "y": 421
      },
      {
        "x": 623.652283203125,
        "y": 421
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 2,
      "toDir": 3
    },
    "source": {
      "node": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
      "port": "a770633c-24bc-753d-57c4-1e527fd49416-out0"
    },
    "target": {
      "node": "ff85a37f-5e5b-70eb-2cc5-e946bea09c8b",
      "port": "clusterInput"
    }
  },
  {
    "type": "HoverConnection",
    "id": "94e264bf-7ff3-12c7-cd19-71bb7d28151f",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "a770633c-24bc-753d-57c4-1e527fd49416",
      "sourcePortName": "a770633c-24bc-753d-57c4-1e527fd49416-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7D1A4C",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 629,
        "y": 342
      },
      {
        "x": 629,
        "y": 376
      },
      {
        "x": 738.69878125,
        "y": 376
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 2,
      "toDir": 3
    },
    "source": {
      "node": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
      "port": "a770633c-24bc-753d-57c4-1e527fd49416-out0"
    },
    "target": {
      "node": "282acdfa-660e-8919-4972-5a38020873d2",
      "port": "clusterInput"
    }
  },
  {
    "type": "HoverConnection",
    "id": "af1243a9-cda9-623f-fccf-3ffe3fb18459",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340",
      "sourcePortName": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 523,
        "y": 487
      },
      {
        "x": 628.5,
        "y": 487
      },
      {
        "x": 628.5,
        "y": 539.4391773146493
      },
      {
        "x": 734,
        "y": 539.4391773146493
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
      "node": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
      "port": "d6da86fd-5cc4-6fa7-fe94-8a024c80a340-out0"
    },
    "target": {
      "node": "9956fbdd-5a89-721a-965d-b98da7d63f61",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "6f45455b-fddd-4cf0-957f-9a79a3caa355",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 783.03125,
        "y": 375
      },
      {
        "x": 803.03125,
        "y": 375
      },
      {
        "x": 803.03125,
        "y": 438.5238980077247
      },
      {
        "x": 714,
        "y": 438.5238980077247
      },
      {
        "x": 714,
        "y": 502.0477960154494
      },
      {
        "x": 734,
        "y": 502.0477960154494
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
      "node": "282acdfa-660e-8919-4972-5a38020873d2",
      "port": "output_fd7a168e-587c-7484-55a7-5960917794dd"
    },
    "target": {
      "node": "9956fbdd-5a89-721a-965d-b98da7d63f61",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "688c0206-da21-c9a2-c3bb-8f1fd2e8a497",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 816.0234375,
        "y": 539.4391773146493
      },
      {
        "x": 831.774681712963,
        "y": 539.4391773146493
      },
      {
        "x": 831.774681712963,
        "y": 495.83098591549293
      },
      {
        "x": 847.5259259259259,
        "y": 495.83098591549293
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
      "node": "9956fbdd-5a89-721a-965d-b98da7d63f61",
      "port": "errorOut"
    },
    "target": {
      "node": "a8f7138d-93f6-27ff-f34d-ba47fa1fdf62",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "57d532fd-546c-90ff-6f07-b6559782faef",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "2167ebe0-4247-f7a6-14e5-749b85ec6cd7",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 890.1445924668965,
        "y": 377.180908203125
      },
      {
        "x": 910.1445924668965,
        "y": 377.180908203125
      },
      {
        "x": 910.1445924668965,
        "y": 429.28059494663296
      },
      {
        "x": 827.5259259259259,
        "y": 429.28059494663296
      },
      {
        "x": 827.5259259259259,
        "y": 481.38028169014086
      },
      {
        "x": 847.5259259259259,
        "y": 481.38028169014086
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
      "node": "b7b8ee59-28ba-db02-c1ac-e69140990be8",
      "port": "out1"
    },
    "target": {
      "node": "a8f7138d-93f6-27ff-f34d-ba47fa1fdf62",
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
