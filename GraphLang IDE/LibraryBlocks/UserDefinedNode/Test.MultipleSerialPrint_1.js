Test.MultipleSerialPrint_1 = GraphLang.UserDefinedNode.extend({
NAME: "Test.MultipleSerialPrint_1",
/******************************************* STORED FROM PREVIOUS NODE **********************************/
init: function(attr,setter,getter){
	this._super( $.extend({stroke:0, bgColor:null, width:101.2578125, height:66, flagAutoCreatePorts: false},attr), setter, getter);
	var port;
	port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(20.739140498418333, 80.3030303030303));
	port.setConnectionDirection(3);
	port.setBackgroundColor("#37B1DE");
	port.setName("errorInput_1");
	port.setMaxFanOut(20);

	port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(20.739140498418333, 50));
	port.setConnectionDirection(3);
	port.setBackgroundColor("#37B1DE");
	port.setName("numberInput_2");
	port.setMaxFanOut(20);

	port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(74.06835892292261, 71.21212121212122));
	port.setConnectionDirection(1);
	port.setBackgroundColor("#37B1DE");
	port.setName("outputTerminal");
	port.setMaxFanOut(20);

	this.persistPorts=false;
},
createShapeElement: function(){
	var shape = this._super();
	this.originalWidth = 101.2578125;
	this.originalHeight = 66;
	return shape;
},

createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L101.2578125,0 L101.2578125,66 L0,66");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path('M27 24L69 24L69 66L27 66Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        
        // Label
        shape = this.canvas.paper.text(0,0,'multiple print');
        shape.attr({"x":5,"y":13.5,"text-anchor":"start","text":"multiple print","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        

        return this.canvas.paper.setFinish();
   },


/********************************************************************************************************/
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
    "id": "3b13b484-3846-1104-d0f5-7464f06ffecd",
    "x": 341,
    "y": 178,
    "width": 172,
    "height": 190,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": 1,
      "wasTranslatedToCppCode": false
    },
    "cssClass": "GraphLang_Shapes_Basic_Loop2_ForLoop",
    "ports": [
      {
        "type": "draw2d.InputPort",
        "id": "4b5fe2ed-6dc5-37bb-9cf8-1cbc45ea7d45",
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
        "id": "c26fba40-8494-e752-8069-c0ca4e0661fd",
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
        "id": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-in0",
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
        "name": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-out0",
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
        "name": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-in0",
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
        "name": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-out0",
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
        "name": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-out0",
        "port": "draw2d.OutputPort",
        "locator": "draw2d.layout.locator.OutputPortLocator"
      },
      {
        "type": "draw2d.InputPort",
        "id": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-in0",
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
        "name": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-in0",
        "port": "draw2d.InputPort",
        "locator": "draw2d.layout.locator.InputPortLocator"
      },
      {
        "type": "draw2d.OutputPort",
        "id": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-out0",
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
        "name": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-out0",
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
        "type": "GraphLang.Shapes.Basic.RightTunnel",
        "id": "69ca29f8-2ac2-eff3-f8e8-e079934eacce",
        "x": 157,
        "y": 121.49999999999999,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "GraphLang_Shapes_Basic_RightTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-in0",
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
            "name": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-out0",
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
            "name": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-out0",
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
        "locatorY": 63.94736842105263
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "89e725c0-cddd-a0af-f2bb-360321b5b6d0",
        "x": -15,
        "y": 121.49999999999999,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-in0",
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
            "name": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-out0",
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
            "name": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-out0",
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
        "locatorY": 63.94736842105263
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c",
        "x": -15,
        "y": 83.5,
        "width": 30,
        "height": 15,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-in0",
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
            "name": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-out0",
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
            "name": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-out0",
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
        "locatorY": 43.94736842105263
      }
    ]
  },
  {
    "type": "GraphLang.ArduinoLib.Node.Serial.println",
    "id": "f180b3e2-d36b-cb6f-27cb-bf867a259c4e",
    "x": 394,
    "y": 242,
    "width": 86,
    "height": 78.21264823944955,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_ArduinoLib_Node_Serial_println",
    "composite": "3b13b484-3846-1104-d0f5-7464f06ffecd",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.Loop2.ClusterDatatypeNode2",
    "id": "5faebde8-533c-4fec-995d-8b211c8a3856",
    "x": 174,
    "y": 272,
    "width": 120,
    "height": 70,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": 1,
      "wasTranslatedToCppCode": false,
      "isTerminal": true,
      "datatype": "clusterDatatype_5faebde8533c4fec995d8b211c8a3856_errorInput_1",
      "nodeLabel": "errorInput_1"
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
        "id": "d2748d1c-4558-d03f-c0c1-a14a3bd461d1",
        "x": 22.3125,
        "y": 72,
        "width": 64.484375,
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
        "text": "errorInput_1",
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
    "id": "252b61da-4d43-a115-6637-e919ec2da5ae",
    "x": 190,
    "y": 311,
    "width": 67.453125,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "String",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "5faebde8-533c-4fec-995d-8b211c8a3856",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "NO_ERROR",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "9b50e801-b5e2-0859-d8ae-e3e3fee6b3ab",
    "x": 191,
    "y": 282,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "5faebde8-533c-4fec-995d-8b211c8a3856",
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
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "8656abb4-d110-2a74-172f-b4f97ce73d24",
    "x": 275,
    "y": 149,
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
    "text": "3",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.ArduinoLib.Node.Serial.println",
    "id": "6d4ff5d7-2512-9da5-a01b-5cf335270236",
    "x": 587,
    "y": 241,
    "width": 86,
    "height": 78.21264823944955,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_ArduinoLib_Node_Serial_println",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "a2e0898e-5e1d-daec-5759-0f14fa75d062",
    "x": 559,
    "y": 195,
    "width": 106.0859375,
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
    "text": "==> END OF BLOCK",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "e31bb224-daca-3b97-3123-cee23b4fbfbc",
    "x": 186,
    "y": 208,
    "width": 22.90625,
    "height": 25,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": true,
      "nodeLabel": "numberInput_2"
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#0000FF",
    "color": "#DD2241",
    "stroke": 3,
    "radius": 0,
    "dasharray": "-",
    "text": "-1",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.TerminalOutput",
    "id": "c85349af-7aa2-930c-0dd1-7196f43cc856",
    "x": 772,
    "y": 284,
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
    "text": "outputTerminal",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HoverConnection",
    "id": "51de1aec-77bf-2c7e-061b-056b42aaae08",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "69ca29f8-2ac2-eff3-f8e8-e079934eacce",
      "targetPortName": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 479.0234375,
        "y": 306.4391773146493
      },
      {
        "x": 488.51171875,
        "y": 306.4391773146493
      },
      {
        "x": 488.51171875,
        "y": 307
      },
      {
        "x": 498,
        "y": 307
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
      "node": "f180b3e2-d36b-cb6f-27cb-bf867a259c4e",
      "port": "errorOut"
    },
    "target": {
      "node": "3b13b484-3846-1104-d0f5-7464f06ffecd",
      "port": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "2fd2af70-36f4-0630-3745-4f98022edd99",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "89e725c0-cddd-a0af-f2bb-360321b5b6d0",
      "sourcePortName": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#129CE4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 356,
        "y": 307
      },
      {
        "x": 376.5,
        "y": 307
      },
      {
        "x": 376.5,
        "y": 306.4391773146493
      },
      {
        "x": 397,
        "y": 306.4391773146493
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
      "node": "3b13b484-3846-1104-d0f5-7464f06ffecd",
      "port": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-out0"
    },
    "target": {
      "node": "f180b3e2-d36b-cb6f-27cb-bf867a259c4e",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "534d7797-e32b-c405-122d-eb2806a781a3",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c",
      "sourcePortName": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#129CE4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 356,
        "y": 269
      },
      {
        "x": 397,
        "y": 269.0477960154494
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
      "node": "3b13b484-3846-1104-d0f5-7464f06ffecd",
      "port": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-out0"
    },
    "target": {
      "node": "f180b3e2-d36b-cb6f-27cb-bf867a259c4e",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "88caac5f-eb3e-62ba-4405-4491e8254f28",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "69ca29f8-2ac2-eff3-f8e8-e079934eacce",
      "sourcePortName": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#666666",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 528,
        "y": 307
      },
      {
        "x": 559,
        "y": 307
      },
      {
        "x": 559,
        "y": 305.4391773146493
      },
      {
        "x": 590,
        "y": 305.4391773146493
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
      "node": "3b13b484-3846-1104-d0f5-7464f06ffecd",
      "port": "69ca29f8-2ac2-eff3-f8e8-e079934eacce-out0"
    },
    "target": {
      "node": "6d4ff5d7-2512-9da5-a01b-5cf335270236",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "8f0bd049-50c0-3c06-6a13-56999ed1a97f",
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
        "x": 689.93828125,
        "y": 207
      },
      {
        "x": 709.93828125,
        "y": 207
      },
      {
        "x": 709.93828125,
        "y": 237.5238980077247
      },
      {
        "x": 570,
        "y": 237.5238980077247
      },
      {
        "x": 570,
        "y": 268.0477960154494
      },
      {
        "x": 590,
        "y": 268.0477960154494
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
      "node": "a2e0898e-5e1d-daec-5759-0f14fa75d062",
      "port": "out1"
    },
    "target": {
      "node": "6d4ff5d7-2512-9da5-a01b-5cf335270236",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "41f87a10-67ba-0844-8d35-9d6437730930",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c",
      "targetPortName": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 211.90546875,
        "y": 222
      },
      {
        "x": 268.952734375,
        "y": 222
      },
      {
        "x": 268.952734375,
        "y": 269
      },
      {
        "x": 326,
        "y": 269
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
      "node": "e31bb224-daca-3b97-3123-cee23b4fbfbc",
      "port": "out1"
    },
    "target": {
      "node": "3b13b484-3846-1104-d0f5-7464f06ffecd",
      "port": "8bad97e2-44c7-b5ed-7177-b5f2efc3e99c-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "a8d44a0a-9011-faf5-7509-18a5c8b4761b",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "89e725c0-cddd-a0af-f2bb-360321b5b6d0",
      "targetPortName": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7D1A4C",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 294,
        "y": 307
      },
      {
        "x": 326,
        "y": 307
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
      "node": "5faebde8-533c-4fec-995d-8b211c8a3856",
      "port": "clusterOutput"
    },
    "target": {
      "node": "3b13b484-3846-1104-d0f5-7464f06ffecd",
      "port": "89e725c0-cddd-a0af-f2bb-360321b5b6d0-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "f21467a7-cb1e-363b-bf28-0319ebb2dd70",
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
        "x": 292.85,
        "y": 161
      },
      {
        "x": 316.323,
        "y": 161
      },
      {
        "x": 316.323,
        "y": 197
      },
      {
        "x": 339.796,
        "y": 197
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
      "node": "8656abb4-d110-2a74-172f-b4f97ce73d24",
      "port": "out1"
    },
    "target": {
      "node": "3b13b484-3846-1104-d0f5-7464f06ffecd",
      "port": "iterationTerminal"
    }
  },
  {
    "type": "HoverConnection",
    "id": "7d94ebd9-2592-7c6c-ca6d-eee86ed4df04",
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
        "x": 672.0234375,
        "y": 305.4391773146493
      },
      {
        "x": 722.01171875,
        "y": 305.4391773146493
      },
      {
        "x": 722.01171875,
        "y": 298
      },
      {
        "x": 772,
        "y": 298
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
      "node": "6d4ff5d7-2512-9da5-a01b-5cf335270236",
      "port": "errorOut"
    },
    "target": {
      "node": "c85349af-7aa2-930c-0dd1-7196f43cc856",
      "port": "out1"
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
