SubNodes.TopBlock_1 = GraphLang.UserDefinedNode.extend({
NAME: "SubNodes.TopBlock_1",
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
    "id": "f1d47159-60b4-0226-be96-e3974715d4fe",
    "x": 105,
    "y": 408,
    "width": 209,
    "height": 130,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false,
      "isTerminal": false,
      "datatype": "clusterDatatype_f1d4715960b40226be96e3974715d4fe_ahoj",
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
        "id": "3d5574f1-20f8-ddb7-9423-e57553727618",
        "x": 87.9892578125,
        "y": 132,
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
    "id": "770e006f-5c80-d8ad-8db8-89a7726cce2d",
    "x": 166,
    "y": 477,
    "width": 74.92578125,
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
    "composite": "f1d47159-60b4-0226-be96-e3974715d4fe",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "defaultString 2",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "595b37ca-1a67-0b9a-6598-e78b23015666",
    "x": 165,
    "y": 426,
    "width": 74.5,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "String",
      "isTerminal": false,
      "nodeLabel": "item_0",
      "executionOrder": -1,
      "clusterItemIndex": "1"
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "f1d47159-60b4-0226-be96-e3974715d4fe",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "defaultString 1",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
    "id": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
    "x": 923,
    "y": 43,
    "width": 574,
    "height": 336,
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
        "id": "30caa7ba-7f69-ecb1-36e6-ec489674a617",
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
        "id": "dd0d3872-9e78-a48c-8da6-682c83163c1d",
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
        "id": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-in0",
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
        "name": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-out0",
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
        "name": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-in0",
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
        "name": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-out0",
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
        "name": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-in0",
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
        "name": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-out0",
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
        "name": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "5d801b49-7919-6323-34c1-561ef9fc8ef4-in0",
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
        "name": "5d801b49-7919-6323-34c1-561ef9fc8ef4-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "5d801b49-7919-6323-34c1-561ef9fc8ef4-out0",
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
        "name": "5d801b49-7919-6323-34c1-561ef9fc8ef4-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-in0",
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
        "name": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-out0",
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
        "name": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-out0",
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
        "id": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd",
        "x": -15,
        "y": 66.32853025936599,
        "width": 30,
        "height": 15,
        "alpha": 0.4,
        "angle": -360,
        "userData": {
          "parentLoop": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-in0",
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
            "name": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-out0",
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
            "name": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#4286F4",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": "",
        "locator": "GraphLang.Utils.LeftRelPortLocator",
        "locatorX": 15,
        "locatorY": 19.740634005763688
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64",
        "x": -15,
        "y": 132.1729106628242,
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
            "id": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-in0",
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
            "name": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-out0",
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
            "name": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#4286F4",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "locator": "GraphLang.Utils.LeftRelPortLocator",
        "locatorX": 15,
        "locatorY": 39.3371757925072
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a",
        "x": -15,
        "y": 238.81958458560862,
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
            "id": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-in0",
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
            "name": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-out0",
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
            "name": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#7D1A4C",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "locator": "GraphLang.Utils.LeftRelPortLocator",
        "locatorX": 15,
        "locatorY": 71.07725731714542
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "5d801b49-7919-6323-34c1-561ef9fc8ef4",
        "x": -15,
        "y": 191.53813147573055,
        "width": 30,
        "height": 15,
        "alpha": 0.4,
        "angle": -360,
        "userData": {
          "executionOrder": -1,
          "parentLoop": "ce29e9d8-36d1-37ab-afe7-d98a9580e654"
        },
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "5d801b49-7919-6323-34c1-561ef9fc8ef4-in0",
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
            "name": "5d801b49-7919-6323-34c1-561ef9fc8ef4-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "5d801b49-7919-6323-34c1-561ef9fc8ef4-out0",
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
            "name": "5d801b49-7919-6323-34c1-561ef9fc8ef4-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#000000",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": "",
        "locator": "GraphLang.Utils.LeftRelPortLocator",
        "locatorX": 15,
        "locatorY": 57.00539627253885
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc",
        "x": 221,
        "y": 328.5,
        "width": 30,
        "height": 15,
        "alpha": 0.4,
        "angle": -90,
        "userData": {
          "parentLoop": "ce29e9d8-36d1-37ab-afe7-d98a9580e654"
        },
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-in0",
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
            "name": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-out0",
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
            "name": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#FDC11D",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": "",
        "locator": "GraphLang.Utils.BottomRelPortLocator",
        "locatorX": 38.501742160278745,
        "locatorY": 7.5
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.UnbundleByName",
    "id": "7674cf27-9522-291a-6624-5c0e2c5b862f",
    "x": 1225,
    "y": 306,
    "width": 50,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false
    },
    "cssClass": "GraphLang_Shapes_Basic_UnbundleByName",
    "composite": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
    "bgColor": "#DBDDDE",
    "color": "#D7D7D7",
    "stroke": 1,
    "radius": 3,
    "dasharray": null,
    "bundleItems": [
      {
        "name": "item_1",
        "inputPortName": "output_417580a1-bda0-b453-746e-9f23c15da5ed"
      }
    ]
  },
  {
    "type": "GraphLang.ArduinoLib.Node.Serial.println",
    "id": "55d59580-1d8d-3f08-35ac-92d5abfb80bf",
    "x": 1319,
    "y": 210,
    "width": 86,
    "height": 78.21264823944955,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_ArduinoLib_Node_Serial_println",
    "composite": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.UnbundleByName",
    "id": "81ee209a-117b-3d93-47ca-aafbb86276ff",
    "x": 973,
    "y": 334,
    "width": 61.34375,
    "height": 24,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false
    },
    "cssClass": "GraphLang_Shapes_Basic_UnbundleByName",
    "composite": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
    "bgColor": "#DBDDDE",
    "color": "#D7D7D7",
    "stroke": 1,
    "radius": 3,
    "dasharray": null,
    "bundleItems": [
      {
        "name": "item_0",
        "inputPortName": "output_97f86b30-08a5-fd3d-dc00-145effe14a9c"
      }
    ]
  },
  {
    "type": "GraphLang.ArduinoLib.Node.Serial.println",
    "id": "8559e404-7256-5194-844a-6dd6f179d20a",
    "x": 1158,
    "y": 208,
    "width": 86,
    "height": 78.21264823944955,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ArduinoLib_Node_Serial_println",
    "composite": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.ArduinoLib.Node.Serial.println",
    "id": "f255dc40-1acb-f16c-cd31-a269659c93f7",
    "x": 1024,
    "y": 214,
    "width": 86,
    "height": 78.21264823944955,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ArduinoLib_Node_Serial_println",
    "composite": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "SubNodes.Block_1",
    "id": "d7a096f0-0bc9-e849-e3a0-fd9b49d59700",
    "x": 983,
    "y": 136,
    "width": 42,
    "height": 42,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "SubNodes_Block_1",
    "composite": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.ArduinoLib.Node.waitUntilNextMs",
    "id": "22d84876-1cf7-4cf0-eefb-afe736b2a44d",
    "x": 1091,
    "y": 77,
    "width": 135,
    "height": 71,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ArduinoLib_Node_waitUntilNextMs",
    "composite": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "2354acca-ea7e-0f97-33dd-1d08c329d278",
    "x": 974,
    "y": 43,
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
    "composite": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
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
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "af378c7a-5179-88de-9362-db1dfd3c2641",
    "x": 303,
    "y": 127,
    "width": 20.390625,
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
    "text": "11",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "39440516-49c5-6df9-5a36-d927b5ec551f",
    "x": 303,
    "y": 170,
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
    "text": "12",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.ArduinoLib.Node.Serial.begin",
    "id": "a7561923-3d39-99bc-a1b9-664156692378",
    "x": 269,
    "y": 283,
    "width": 88.701171875,
    "height": 80.91549715073495,
    "alpha": 1,
    "angle": 0,
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
    "id": "2c076ab4-a791-6d3a-b230-3b77d5ee9b92",
    "x": 150,
    "y": 282,
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
    "id": "709c533c-9d7f-e224-18d3-7c84c7528dbc",
    "x": 269,
    "y": 46,
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
    "text": "6",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.BundleByName",
    "id": "9310bb0a-dd76-4c0a-d36e-c3501722f214",
    "x": 628,
    "y": 495,
    "width": 64.34375,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false
    },
    "cssClass": "GraphLang_Shapes_Basic_BundleByName",
    "bgColor": "#DBDDDE",
    "color": "#D7D7D7",
    "stroke": 1,
    "radius": 3,
    "dasharray": null,
    "bundleItems": [
      {
        "name": "item_1",
        "inputPortName": "input_445"
      },
      {
        "name": "item_0",
        "inputPortName": "input_206"
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "a370e11b-1c28-1044-5fec-7991950aacca",
    "x": 550,
    "y": 557,
    "width": 75.046875,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "String",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "modified text 1",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.UnbundleByName",
    "id": "717e2386-0888-6dff-48f7-c8fa6c40a6e8",
    "x": 368,
    "y": 537,
    "width": 54.34375,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false
    },
    "cssClass": "GraphLang_Shapes_Basic_UnbundleByName",
    "bgColor": "#DBDDDE",
    "color": "#D7D7D7",
    "stroke": 1,
    "radius": 3,
    "dasharray": null,
    "bundleItems": [
      {
        "name": "item_0",
        "inputPortName": "output_e3972314-993c-c4ed-ab3d-40eb8685e799"
      }
    ]
  },
  {
    "type": "HoverConnection",
    "id": "034d7506-085a-522a-6797-9e77458e0010",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#666666",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 1269.03125,
        "y": 317
      },
      {
        "x": 1295.515625,
        "y": 317
      },
      {
        "x": 1295.515625,
        "y": 237.04779601544942
      },
      {
        "x": 1322,
        "y": 237.04779601544942
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
      "node": "7674cf27-9522-291a-6624-5c0e2c5b862f",
      "port": "output_417580a1-bda0-b453-746e-9f23c15da5ed"
    },
    "target": {
      "node": "55d59580-1d8d-3f08-35ac-92d5abfb80bf",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "5e77fbab-f677-e137-d79b-90bac1deb18c",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc",
      "sourcePortName": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#129CE4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 1159,
        "y": 364
      },
      {
        "x": 1159,
        "y": 331
      },
      {
        "x": 1224.65,
        "y": 331
      }
    ],
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "routingMetaData": {
      "routedByUserInteraction": false,
      "fromDir": 0,
      "toDir": 3
    },
    "source": {
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-out0"
    },
    "target": {
      "node": "7674cf27-9522-291a-6624-5c0e2c5b862f",
      "port": "clusterInput"
    }
  },
  {
    "type": "HoverConnection",
    "id": "1c957092-614b-f893-19a4-6de03fba6975",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7D1A4C",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 314,
        "y": 473
      },
      {
        "x": 340.80979687499996,
        "y": 473
      },
      {
        "x": 340.80979687499996,
        "y": 562
      },
      {
        "x": 367.61959375,
        "y": 562
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
      "node": "f1d47159-60b4-0226-be96-e3974715d4fe",
      "port": "clusterOutput"
    },
    "target": {
      "node": "717e2386-0888-6dff-48f7-c8fa6c40a6e8",
      "port": "clusterInput"
    }
  },
  {
    "type": "HoverConnection",
    "id": "0d0574ee-ed53-1813-c2a8-c17f1c625874",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a",
      "targetPortName": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7D1A4C",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 314,
        "y": 473
      },
      {
        "x": 611,
        "y": 473
      },
      {
        "x": 611,
        "y": 289.3195845856086
      },
      {
        "x": 908,
        "y": 289.3195845856086
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
      "node": "f1d47159-60b4-0226-be96-e3974715d4fe",
      "port": "clusterOutput"
    },
    "target": {
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "8326e165-4f39-78e8-c94e-f33e9c84be38",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7D1A4C",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 314,
        "y": 473
      },
      {
        "x": 673.040625,
        "y": 473
      },
      {
        "x": 673.040625,
        "y": 495
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
      "node": "f1d47159-60b4-0226-be96-e3974715d4fe",
      "port": "clusterOutput"
    },
    "target": {
      "node": "9310bb0a-dd76-4c0a-d36e-c3501722f214",
      "port": "clusterType"
    }
  },
  {
    "type": "HoverConnection",
    "id": "9305fe3c-d25f-d97d-ccf1-b61a44b82cb6",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 1404.0234375,
        "y": 274.4391773146493
      },
      {
        "x": 1424.0234375,
        "y": 274.4391773146493
      },
      {
        "x": 1424.0234375,
        "y": 201.71958865732466
      },
      {
        "x": 1076.5,
        "y": 201.71958865732466
      },
      {
        "x": 1076.5,
        "y": 129
      },
      {
        "x": 1096.5,
        "y": 129
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
      "node": "55d59580-1d8d-3f08-35ac-92d5abfb80bf",
      "port": "errorOut"
    },
    "target": {
      "node": "22d84876-1cf7-4cf0-eefb-afe736b2a44d",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "43598698-0201-5c09-c77f-28d1f7b1884f",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 1243.0234375,
        "y": 272.4391773146493
      },
      {
        "x": 1282.51171875,
        "y": 272.4391773146493
      },
      {
        "x": 1282.51171875,
        "y": 274.4391773146493
      },
      {
        "x": 1322,
        "y": 274.4391773146493
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
      "node": "8559e404-7256-5194-844a-6dd6f179d20a",
      "port": "errorOut"
    },
    "target": {
      "node": "55d59580-1d8d-3f08-35ac-92d5abfb80bf",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "1b027009-7ed5-345f-34f6-58f0890c5381",
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
        "x": 1017.34375,
        "y": 345
      },
      {
        "x": 1072.34375,
        "y": 345
      },
      {
        "x": 1072.34375,
        "y": 235.04779601544942
      },
      {
        "x": 1161,
        "y": 235.04779601544942
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
      "node": "81ee209a-117b-3d93-47ca-aafbb86276ff",
      "port": "output_97f86b30-08a5-fd3d-dc00-145effe14a9c"
    },
    "target": {
      "node": "8559e404-7256-5194-844a-6dd6f179d20a",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "4e1d804a-50be-6b4b-c072-b9bf8d4023de",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a",
      "sourcePortName": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#666666",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 938,
        "y": 289.3195845856086
      },
      {
        "x": 955.285296875,
        "y": 289.3195845856086
      },
      {
        "x": 955.285296875,
        "y": 346
      },
      {
        "x": 972.57059375,
        "y": 346
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
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "6f507ce4-66f0-0aa9-ba96-ae5b7326b22a-out0"
    },
    "target": {
      "node": "81ee209a-117b-3d93-47ca-aafbb86276ff",
      "port": "clusterInput"
    }
  },
  {
    "type": "HoverConnection",
    "id": "646180c1-c667-29ce-0ec2-cf178850fd33",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "5d801b49-7919-6323-34c1-561ef9fc8ef4",
      "sourcePortName": "5d801b49-7919-6323-34c1-561ef9fc8ef4-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 938,
        "y": 242.03813147573055
      },
      {
        "x": 982.5,
        "y": 242.03813147573055
      },
      {
        "x": 982.5,
        "y": 278.4391773146493
      },
      {
        "x": 1027,
        "y": 278.4391773146493
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
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "5d801b49-7919-6323-34c1-561ef9fc8ef4-out0"
    },
    "target": {
      "node": "f255dc40-1acb-f16c-cd31-a269659c93f7",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "f3cca16f-cf13-d9fd-5006-587418dcff81",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd",
      "sourcePortName": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 938,
        "y": 116.82853025936599
      },
      {
        "x": 957.5,
        "y": 116.82853025936599
      },
      {
        "x": 957.5,
        "y": 146
      },
      {
        "x": 977,
        "y": 146
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
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-out0"
    },
    "target": {
      "node": "d7a096f0-0bc9-e849-e3a0-fd9b49d59700",
      "port": "input_2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "8e54571c-c618-1801-b1ca-b1e70abace28",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64",
      "sourcePortName": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 938,
        "y": 182.6729106628242
      },
      {
        "x": 957.5,
        "y": 182.6729106628242
      },
      {
        "x": 957.5,
        "y": 165
      },
      {
        "x": 977,
        "y": 165
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
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-out0"
    },
    "target": {
      "node": "d7a096f0-0bc9-e849-e3a0-fd9b49d59700",
      "port": "input_1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "f11f3606-9e42-04ea-b2dc-1c936708d689",
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
        "x": 1012.87255859375,
        "y": 55
      },
      {
        "x": 1054.686279296875,
        "y": 55
      },
      {
        "x": 1054.686279296875,
        "y": 102
      },
      {
        "x": 1096.5,
        "y": 102
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
      "node": "2354acca-ea7e-0f97-33dd-1d08c329d278",
      "port": "out1"
    },
    "target": {
      "node": "22d84876-1cf7-4cf0-eefb-afe736b2a44d",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "5140fcea-da9b-a963-e0a7-5d3248a667b2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 412.34375,
        "y": 548
      },
      {
        "x": 520.171875,
        "y": 548
      },
      {
        "x": 520.171875,
        "y": 528
      },
      {
        "x": 628,
        "y": 528
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
      "node": "717e2386-0888-6dff-48f7-c8fa6c40a6e8",
      "port": "output_e3972314-993c-c4ed-ab3d-40eb8685e799"
    },
    "target": {
      "node": "9310bb0a-dd76-4c0a-d36e-c3501722f214",
      "port": "input_206"
    }
  },
  {
    "type": "HoverConnection",
    "id": "d26d601b-142e-8cfe-e172-c484b35e793f",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64",
      "targetPortName": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 327.85751953125,
        "y": 182
      },
      {
        "x": 617.928759765625,
        "y": 182
      },
      {
        "x": 617.928759765625,
        "y": 182.6729106628242
      },
      {
        "x": 908,
        "y": 182.6729106628242
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
      "node": "39440516-49c5-6df9-5a36-d927b5ec551f",
      "port": "out1"
    },
    "target": {
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "306d4e4c-93e3-7284-b3f5-09a4fcb12a64-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "949dc217-80a9-475a-fc12-cb033a1956e0",
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
        "x": 188.87255859375,
        "y": 294
      },
      {
        "x": 230.686279296875,
        "y": 294
      },
      {
        "x": 230.686279296875,
        "y": 311.1100420692077
      },
      {
        "x": 272.5,
        "y": 311.1100420692077
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
      "node": "2c076ab4-a791-6d3a-b230-3b77d5ee9b92",
      "port": "out1"
    },
    "target": {
      "node": "a7561923-3d39-99bc-a1b9-664156692378",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "e40565ea-99cf-575f-e164-59ff337d9440",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc",
      "targetPortName": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7D1A4C",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 692.79415625,
        "y": 520
      },
      {
        "x": 1159,
        "y": 520
      },
      {
        "x": 1159,
        "y": 394
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
      "node": "9310bb0a-dd76-4c0a-d36e-c3501722f214",
      "port": "clusterOutput"
    },
    "target": {
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "5d2bcb05-db8a-ec5a-e439-45f3d7d17ccc-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "5f26767d-c34e-bd3b-7354-a21dbaaa30bc",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd",
      "targetPortName": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 326.5921875,
        "y": 139
      },
      {
        "x": 617.29609375,
        "y": 139
      },
      {
        "x": 617.29609375,
        "y": 116.82853025936599
      },
      {
        "x": 908,
        "y": 116.82853025936599
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
      "node": "af378c7a-5179-88de-9362-db1dfd3c2641",
      "port": "out1"
    },
    "target": {
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "a33f18cd-ff8d-1c11-a7f2-4036e096a7dd-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "1c505754-2aed-e937-5cfb-3d65303ae5fc",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "5d801b49-7919-6323-34c1-561ef9fc8ef4",
      "targetPortName": "5d801b49-7919-6323-34c1-561ef9fc8ef4-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 353.62328387499997,
        "y": 349.44002606920776
      },
      {
        "x": 630.8116419375,
        "y": 349.44002606920776
      },
      {
        "x": 630.8116419375,
        "y": 242.03813147573055
      },
      {
        "x": 908,
        "y": 242.03813147573055
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
      "node": "a7561923-3d39-99bc-a1b9-664156692378",
      "port": "errorOut"
    },
    "target": {
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "5d801b49-7919-6323-34c1-561ef9fc8ef4-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "be66cdb6-ed58-8028-7f6b-3e8c6c8944a2",
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
        "x": 642.44921875,
        "y": 569
      },
      {
        "x": 662.44921875,
        "y": 569
      },
      {
        "x": 662.44921875,
        "y": 537.5
      },
      {
        "x": 608,
        "y": 537.5
      },
      {
        "x": 608,
        "y": 506
      },
      {
        "x": 628,
        "y": 506
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
      "node": "a370e11b-1c28-1044-5fec-7991950aacca",
      "port": "out1"
    },
    "target": {
      "node": "9310bb0a-dd76-4c0a-d36e-c3501722f214",
      "port": "input_445"
    }
  },
  {
    "type": "HoverConnection",
    "id": "d53edc8a-4221-ce3c-6390-2aff47c279b8",
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
        "x": 286.85,
        "y": 58
      },
      {
        "x": 602.9159999999999,
        "y": 58
      },
      {
        "x": 602.9159999999999,
        "y": 76.6
      },
      {
        "x": 918.982,
        "y": 76.6
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
      "node": "709c533c-9d7f-e224-18d3-7c84c7528dbc",
      "port": "out1"
    },
    "target": {
      "node": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
      "port": "iterationTerminal"
    }
  },
  {
    "type": "HoverConnection",
    "id": "5188cbdc-2a16-a68a-ba07-ffce0a5e6c01",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 1031,
        "y": 157
      },
      {
        "x": 1051,
        "y": 157
      },
      {
        "x": 1051,
        "y": 199.0238980077247
      },
      {
        "x": 1007,
        "y": 199.0238980077247
      },
      {
        "x": 1007,
        "y": 241.04779601544942
      },
      {
        "x": 1027,
        "y": 241.04779601544942
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
      "node": "d7a096f0-0bc9-e849-e3a0-fd9b49d59700",
      "port": "output_numbers_add"
    },
    "target": {
      "node": "f255dc40-1acb-f16c-cd31-a269659c93f7",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "451dc0ba-dc48-e9d4-6fad-10e93d3b8f4c",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "ce29e9d8-36d1-37ab-afe7-d98a9580e654",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 1109.0234375,
        "y": 278.4391773146493
      },
      {
        "x": 1135.01171875,
        "y": 278.4391773146493
      },
      {
        "x": 1135.01171875,
        "y": 272.4391773146493
      },
      {
        "x": 1161,
        "y": 272.4391773146493
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
      "node": "f255dc40-1acb-f16c-cd31-a269659c93f7",
      "port": "errorOut"
    },
    "target": {
      "node": "8559e404-7256-5194-844a-6dd6f179d20a",
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
