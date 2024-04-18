Test.WhileLoop_1 = GraphLang.UserDefinedNode.extend({
NAME: "Test.WhileLoop_1",
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
    "type": "GraphLang.Shapes.Basic.Loop2.WhileLayer",
    "id": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
    "x": 472,
    "y": 136,
    "width": 290,
    "height": 250,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false
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
        "id": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c",
        "x": -15,
        "y": 158.22259136212625,
        "width": 30,
        "height": 15,
        "alpha": 0.4,
        "angle": -360,
        "userData": {
          "executionOrder": -1,
          "parentLoop": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b"
        },
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c-in0",
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
            "name": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c-out0",
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
            "name": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c-out0",
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
        "locatorY": 63.2890365448505
      },
      {
        "type": "GraphLang.Shapes.Basic.RightTunnel",
        "id": "de2a5d11-6086-9257-8238-0263a2db70ca",
        "x": 275,
        "y": 168.18936877076413,
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
            "id": "de2a5d11-6086-9257-8238-0263a2db70ca-in0",
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
            "name": "de2a5d11-6086-9257-8238-0263a2db70ca-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "de2a5d11-6086-9257-8238-0263a2db70ca-out0",
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
            "name": "de2a5d11-6086-9257-8238-0263a2db70ca-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#000000",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "locator": "GraphLang.Utils.RightRelPortLocator",
        "locatorX": 15,
        "locatorY": 67.27574750830566
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "2a021282-1f98-93c3-46c7-374d24c413d1",
        "x": 26.295336787564768,
        "y": -7.5,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 90,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "2a021282-1f98-93c3-46c7-374d24c413d1-in0",
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
            "name": "2a021282-1f98-93c3-46c7-374d24c413d1-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "2a021282-1f98-93c3-46c7-374d24c413d1-out0",
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
            "name": "2a021282-1f98-93c3-46c7-374d24c413d1-out0",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.OutputPortLocator"
          }
        ],
        "bgColor": "#4286F4",
        "color": "#000000",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "locator": "GraphLang.Utils.TopRelPortLocator",
        "locatorX": 9.067357512953368,
        "locatorY": 7.5
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "f51a0052-7d74-f433-2f40-1654800c1787",
    "x": 611,
    "y": 219,
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
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "300",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.ArduinoLib.Node.waitUntilNextMs",
    "id": "a5040677-38d5-d6ee-791b-eb76d0a76e5e",
    "x": 627,
    "y": 268,
    "width": 135,
    "height": 71,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ArduinoLib_Node_waitUntilNextMs",
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.FeedbackNode",
    "id": "18140c92-087c-0e0d-ebec-e7bd9fe74122",
    "x": 565,
    "y": 176,
    "width": 40,
    "height": 26,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_FeedbackNode",
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "257caf10-e0dd-048c-1c8a-7e29568ece91",
    "x": 554,
    "y": 209,
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
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
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
    "type": "GraphLang.ArduinoLib.Node.Add",
    "id": "52ded0bc-1857-d00b-886d-78490bd9ba1b",
    "x": 554,
    "y": 136,
    "width": 55,
    "height": 33,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ArduinoLib_Node_Add",
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "ec5478f0-39f8-f601-0345-a43452ec469c",
    "x": 472,
    "y": 362,
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
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
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
    "type": "Test.MultipleSerialPrint_1",
    "id": "16a24004-33ce-9842-74a3-699a7d6a384b",
    "x": 507,
    "y": 256,
    "width": 101,
    "height": 66,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "Test_MultipleSerialPrint_1",
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.Loop2.ClusterDatatypeNode2",
    "id": "c543e3e8-fc58-418f-eb78-9e7f9d8cb7c4",
    "x": 67,
    "y": 45,
    "width": 183,
    "height": 145,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1,
      "wasTranslatedToCppCode": false,
      "isTerminal": true,
      "datatype": "clusterDatatype_c543e3e8fc58418feb789e7f9d8cb7c4_CustomSettings_1",
      "nodeLabel": "CustomSettings_1"
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_ClusterDatatypeNode2",
    "bgColor": "#F0F0F0",
    "color": "#DD2241",
    "stroke": 3,
    "radius": 0,
    "dasharray": "-",
    "labels": [
      {
        "type": "GraphLang.Shapes.Basic.Label",
        "id": "ec062034-6e1c-4d68-42a0-fbb6999a7f64",
        "x": 37.46875,
        "y": 147,
        "width": 91.71875,
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
        "text": "CustomSettings_1",
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
    "id": "d27581ce-63f7-9395-1ea8-a24cfbacbe30",
    "x": 154,
    "y": 139,
    "width": 32.6845703125,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false,
      "executionOrder": -1,
      "clusterItemIndex": "2",
      "nodeLabel": "serial_speed"
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "c543e3e8-fc58-418f-eb78-9e7f9d8cb7c4",
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
    "id": "694dd9be-1f92-89c8-4efc-f5e1cbeaab6c",
    "x": 115,
    "y": 84,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false,
      "clusterItemIndex": "1",
      "nodeLabel": "start_counter",
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "c543e3e8-fc58-418f-eb78-9e7f9d8cb7c4",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "7",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.ArduinoLib.Node.Serial.begin",
    "id": "83271b08-197f-7833-d810-c6f2bf35abe4",
    "x": 290,
    "y": 246,
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
    "type": "GraphLang.Shapes.Basic.TerminalOutput",
    "id": "54f1c2ea-bbf9-695e-6c99-cd8bfb66061c",
    "x": 879,
    "y": 331,
    "width": 79.59375,
    "height": 25,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "isTerminal": true,
      "datatype": "errorDatatype"
    },
    "cssClass": "GraphLang_Shapes_Basic_TerminalOutput",
    "bgColor": "#626262",
    "color": "#FF0000",
    "stroke": 3,
    "radius": 0,
    "dasharray": "-",
    "text": "errorOutput_1",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HoverConnection",
    "id": "2360242e-353a-8307-f513-b2ccbac08ea1",
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
        "x": 510.50751953125,
        "y": 374
      },
      {
        "x": 634.8037597656249,
        "y": 374
      },
      {
        "x": 634.8037597656249,
        "y": 361
      },
      {
        "x": 759.0999999999999,
        "y": 361
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
      "node": "ec5478f0-39f8-f601-0345-a43452ec469c",
      "port": "out1"
    },
    "target": {
      "node": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
      "port": "stopTerminal"
    }
  },
  {
    "type": "HoverConnection",
    "id": "43017cf0-3185-8e0d-e050-aff17b678e3e",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "de2a5d11-6086-9257-8238-0263a2db70ca",
      "sourcePortName": "de2a5d11-6086-9257-8238-0263a2db70ca-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 777,
        "y": 311.68936877076413
      },
      {
        "x": 828,
        "y": 311.68936877076413
      },
      {
        "x": 828,
        "y": 345
      },
      {
        "x": 879,
        "y": 345
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
      "node": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
      "port": "de2a5d11-6086-9257-8238-0263a2db70ca-out0"
    },
    "target": {
      "node": "54f1c2ea-bbf9-695e-6c99-cd8bfb66061c",
      "port": "out1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "e933a441-f54f-bc74-8652-1bd25bc4fc09",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c",
      "targetPortName": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 374.62328387499997,
        "y": 312.44002606920776
      },
      {
        "x": 415.8116419375,
        "y": 312.44002606920776
      },
      {
        "x": 415.8116419375,
        "y": 301.72259136212625
      },
      {
        "x": 457,
        "y": 301.72259136212625
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
      "node": "83271b08-197f-7833-d810-c6f2bf35abe4",
      "port": "errorOut"
    },
    "target": {
      "node": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
      "port": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "3ed38ca6-18e7-f3fa-8b82-80555cfc3fd3",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c",
      "sourcePortName": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#666666",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 487,
        "y": 301.72259136212625
      },
      {
        "x": 507.47326595170125,
        "y": 301.72259136212625
      },
      {
        "x": 507.47326595170125,
        "y": 309
      },
      {
        "x": 527.9465319034025,
        "y": 309
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
      "node": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
      "port": "5a8a5c56-19dc-ed1d-c0e2-a856adbd111c-out0"
    },
    "target": {
      "node": "16a24004-33ce-9842-74a3-699a7d6a384b",
      "port": "errorInput_1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "64df7fe7-c520-2af6-7b00-40e3c4de9e20",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "2a021282-1f98-93c3-46c7-374d24c413d1",
      "sourcePortName": "2a021282-1f98-93c3-46c7-374d24c413d1-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#666666",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 513.2953367875648,
        "y": 143.5
      },
      {
        "x": 513.2953367875648,
        "y": 289
      },
      {
        "x": 527.9465319034025,
        "y": 289
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
      "node": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
      "port": "2a021282-1f98-93c3-46c7-374d24c413d1-out0"
    },
    "target": {
      "node": "16a24004-33ce-9842-74a3-699a7d6a384b",
      "port": "numberInput_2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "af783b48-d578-f854-5725-a82760768e1c",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "2a021282-1f98-93c3-46c7-374d24c413d1",
      "sourcePortName": "2a021282-1f98-93c3-46c7-374d24c413d1-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#666666",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 513.2953367875648,
        "y": 143.5
      },
      {
        "x": 513.2953367875648,
        "y": 145.09615384615384
      },
      {
        "x": 568.9099427052008,
        "y": 145.09615384615384
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
      "node": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
      "port": "2a021282-1f98-93c3-46c7-374d24c413d1-out0"
    },
    "target": {
      "node": "52ded0bc-1857-d00b-886d-78490bd9ba1b",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "83c8bd0a-b698-0463-0345-034544987415",
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
        "x": 581.8090425121518,
        "y": 303
      },
      {
        "x": 607.1545212560759,
        "y": 303
      },
      {
        "x": 607.1545212560759,
        "y": 320
      },
      {
        "x": 632.5,
        "y": 320
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
      "node": "16a24004-33ce-9842-74a3-699a7d6a384b",
      "port": "outputTerminal"
    },
    "target": {
      "node": "a5040677-38d5-d6ee-791b-eb76d0a76e5e",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "e4ea5acd-97bd-a304-d3e8-f63de7b7e074",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "de2a5d11-6086-9257-8238-0263a2db70ca",
      "targetPortName": "de2a5d11-6086-9257-8238-0263a2db70ca-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 763.5,
        "y": 324
      },
      {
        "x": 783.5,
        "y": 324
      },
      {
        "x": 783.5,
        "y": 317.84468438538204
      },
      {
        "x": 727,
        "y": 317.84468438538204
      },
      {
        "x": 727,
        "y": 311.68936877076413
      },
      {
        "x": 747,
        "y": 311.68936877076413
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
      "node": "a5040677-38d5-d6ee-791b-eb76d0a76e5e",
      "port": "out1"
    },
    "target": {
      "node": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
      "port": "de2a5d11-6086-9257-8238-0263a2db70ca-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "97648df3-b026-a1df-5782-95fffd000d37",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "2a021282-1f98-93c3-46c7-374d24c413d1",
      "targetPortName": "2a021282-1f98-93c3-46c7-374d24c413d1-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7D1A4C",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 250,
        "y": 117.5
      },
      {
        "x": 513.2953367875648,
        "y": 117.5
      },
      {
        "x": 513.2953367875648,
        "y": 128.5
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
      "node": "c543e3e8-fc58-418f-eb78-9e7f9d8cb7c4",
      "port": "clusterOutput"
    },
    "target": {
      "node": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
      "port": "2a021282-1f98-93c3-46c7-374d24c413d1-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "ace4fe7c-249f-c185-6597-2d0ee58af792",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 564.9083328000002,
        "y": 180.2622950819672
      },
      {
        "x": 544.9083328000002,
        "y": 180.2622950819672
      },
      {
        "x": 544.9083328000002,
        "y": 154.40384615384616
      },
      {
        "x": 568.9099427052008,
        "y": 154.40384615384616
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
      "node": "18140c92-087c-0e0d-ebec-e7bd9fe74122",
      "port": "out1"
    },
    "target": {
      "node": "52ded0bc-1857-d00b-886d-78490bd9ba1b",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "6a146549-bc38-cf4c-177f-29f1773ec6c2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 571.85,
        "y": 221
      },
      {
        "x": 585,
        "y": 221
      },
      {
        "x": 585,
        "y": 200.7
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
      "node": "257caf10-e0dd-048c-1c8a-7e29568ece91",
      "port": "out1"
    },
    "target": {
      "node": "18140c92-087c-0e0d-ebec-e7bd9fe74122",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "f577d91b-ca1f-f9d8-0a03-6dba065a6dc1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 642.8650390625,
        "y": 231
      },
      {
        "x": 662.8650390625,
        "y": 231
      },
      {
        "x": 662.8650390625,
        "y": 262
      },
      {
        "x": 612.5,
        "y": 262
      },
      {
        "x": 612.5,
        "y": 293
      },
      {
        "x": 632.5,
        "y": 293
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
      "node": "f51a0052-7d74-f433-2f40-1654800c1787",
      "port": "out1"
    },
    "target": {
      "node": "a5040677-38d5-d6ee-791b-eb76d0a76e5e",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "a1d41866-6fa5-1f3b-1571-eae1fad6fb6c",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "b71c0003-2f7e-a9f3-7c74-e7d847a37e1b",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 603.2285777594884,
        "y": 149.75
      },
      {
        "x": 624.9639360000001,
        "y": 149.75
      },
      {
        "x": 624.9639360000001,
        "y": 180.2622950819672
      },
      {
        "x": 604.9639360000001,
        "y": 180.2622950819672
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
      "node": "52ded0bc-1857-d00b-886d-78490bd9ba1b",
      "port": "out1"
    },
    "target": {
      "node": "18140c92-087c-0e0d-ebec-e7bd9fe74122",
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
