Demo.ZeroMQ.Server_string_1 = GraphLang.UserDefinedNode.extend({
NAME: 'Demo.ZeroMQ.Server_string_1',
init: function(attr, setter, getter)
    {
        this._super( $.extend({stroke:0, bgColor:null, width:51.524223999999776, height:42, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // in2
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-8.686741211280044, 80.95238095238095));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("in2");
        port.setMaxFanOut(20);
        port.userData = {datatype: "int"};
        // in1
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-8.686741211280044, 28.57142857142857));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("in1");
        port.setMaxFanOut(20);
        port.userData = {datatype: "float"};
        // return
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(105.82250399346144, 54.76190476190476));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("return");
        port.setMaxFanOut(20);
        port.userData = {datatype: "undefined"};
        this.persistPorts=false;
    },
createShapeElement: function()
    {
        var shape = this._super();
        this.originalWidth = 51.524223999999776;
        this.originalHeight= 42;
        return shape;
    },
createSet: function()
    {
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L51.524223999999776,0 L51.524223999999776,42 L0,42");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M9.524223999999776 0L51.524223999999776 0L51.524223999999776 42L9.524223999999776 42Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Line_shadow
        shape = this.canvas.paper.path('M20.5 38.5L23.5,26.5L36.5,34.5L28.5,7.5L42.5,10.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M20.5 38.5L23.5,26.5L36.5,34.5L28.5,7.5L42.5,10.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        // Line_shadow
        shape = this.canvas.paper.path('M0.5 9.5L9.5,9.5L9.5,9.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M0.5 9.5L9.5,9.5L9.5,9.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        // Line_shadow
        shape = this.canvas.paper.path('M0.5 33.5L9.5,33.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M0.5 33.5L9.5,33.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");


        return this.canvas.paper.setFinish();
    },
applyAlpha: function()
    {
    },
layerGet: function(name, attributes)
    {
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
layerAttr: function(name, attributes)
    {
        if(this.svgNodes===null) return;

        this.svgNodes.forEach(function(shape){
            if(shape.data("name")===name){
                shape.attr(attributes);
            }
        });
    },
layerShow: function(name, flag, duration)
    {
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
getParameterSettings: function()
    {
        return [];
    },
addPort: function(port, locator)
    {
        this._super(port, locator);
        return port;
    },
getPersistentAttributes: function()
    {
        var memento = this._super();

        // add all decorations to the memento
        //
        memento.labels = [];
        this.children.each(function(i,e){
            var labelJSON = e.figure.getPersistentAttributes();
            labelJSON.locator=e.locator.NAME;
            memento.labels.push(labelJSON);
        });

        return memento;
    },
setPersistentAttributes: function(memento)
    {
        this._super(memento);

        // remove all decorations created in the constructor of this element
        //
        this.resetChildren();

        // and add all children of the JSON document.
        //
        $.each(memento.labels, $.proxy(function(i,json){
            // create the figure stored in the JSON
            var figure =  eval("new "+json.type+"()");

            // apply all attributes
            figure.attr(json);

            // instantiate the locator
            var locator =  eval("new "+json.locator+"()");

            // add the new figure as child to this figure
            this.add(figure, locator);
        },this));
    },
symbolPicture: "data:image/png;base64,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",
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.Loop2.WhileLayer",
    "id": "89ac5494-e389-7572-917c-cb0b86e60a4b",
    "x": 647,
    "y": 76,
    "width": 610,
    "height": 330,
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
        "id": "f44d547e-4a2d-1b91-1219-5080353cd3f2",
        "x": -15,
        "y": 203.39108910891088,
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
            "id": "f44d547e-4a2d-1b91-1219-5080353cd3f2-in0",
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
            "name": "f44d547e-4a2d-1b91-1219-5080353cd3f2-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "f44d547e-4a2d-1b91-1219-5080353cd3f2-out0",
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
            "name": "f44d547e-4a2d-1b91-1219-5080353cd3f2-out0",
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
        "locatorY": 61.633663366336634
      },
      {
        "type": "GraphLang.Shapes.Basic.LeftTunnel",
        "id": "40df04f5-c487-e0ab-b31e-785c7468aa30",
        "x": -15,
        "y": 98.49999999999999,
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
            "id": "40df04f5-c487-e0ab-b31e-785c7468aa30-in0",
            "width": 8,
            "height": 8,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "zmq::socket_t*",
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
            "name": "40df04f5-c487-e0ab-b31e-785c7468aa30-in0",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.InputPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "40df04f5-c487-e0ab-b31e-785c7468aa30-out0",
            "width": 8,
            "height": 8,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "zmq::socket_t*",
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
            "name": "40df04f5-c487-e0ab-b31e-785c7468aa30-out0",
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
        "locatorY": 29.848484848484848
      }
    ]
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "9d81ac06-c8c7-ff8b-ba9d-08c50b5a9a31",
    "x": 975,
    "y": 196,
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
    "composite": "89ac5494-e389-7572-917c-cb0b86e60a4b",
    "bgColor": "#0000FF",
    "color": "#0000FF",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "1000000",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwRaspiZero.Time.waitUntilNextMs",
    "id": "8abc3c12-4066-5177-97e5-7f7c90feb9e1",
    "x": 1058,
    "y": 251,
    "width": 135,
    "height": 71,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwRaspiZero_Time_waitUntilNextMs",
    "composite": "89ac5494-e389-7572-917c-cb0b86e60a4b",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "3fda1024-1bd8-57f1-3cf8-9ea32a221a48",
    "x": 856,
    "y": 363,
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
    "composite": "89ac5494-e389-7572-917c-cb0b86e60a4b",
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
    "type": "GraphLang.ZeroMQ.Message",
    "id": "82273904-b1ba-e65f-5838-5160c1cb6583",
    "x": 762,
    "y": 261,
    "width": 101.97364425000035,
    "height": 77.1947193145752,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ZeroMQ_Message",
    "composite": "89ac5494-e389-7572-917c-cb0b86e60a4b",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.ZeroMQ.send",
    "id": "a89c84f8-fc92-faf7-a9c4-c62024e43d9e",
    "x": 896,
    "y": 241,
    "width": 103.59375,
    "height": 84,
    "alpha": 0.4,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ZeroMQ_send",
    "composite": "89ac5494-e389-7572-917c-cb0b86e60a4b",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "eb95d493-f1d6-aa3f-be9c-484a56ff66d2",
    "x": 718,
    "y": 222,
    "width": 68.01953125,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "string",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "composite": "89ac5494-e389-7572-917c-cb0b86e60a4b",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "Hello world...",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.ZeroMQ.Context",
    "id": "7b0e9167-958c-f4ed-4ce6-e3ef79d5bb44",
    "x": 236,
    "y": 148,
    "width": 119.50751495361328,
    "height": 84.6947193145752,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ZeroMQ_Context",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "e893d7e6-65be-1b3f-e95e-bffb7e0bdc0c",
    "x": 209,
    "y": 137,
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
    "text": "1",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.ZeroMQ.bind",
    "id": "76ec041c-04ab-d752-d3cc-65d372e1f1bc",
    "x": 434,
    "y": 322,
    "width": 103.59375,
    "height": 84,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ZeroMQ_bind",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "167059a8-2f73-1b3f-67a7-684135398aca",
    "x": 243,
    "y": 325,
    "width": 97.60546875,
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
    "text": "tcp://localhost:5555",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.ZeroMQ.Socket",
    "id": "c257bc92-49dd-097b-5db1-323e2dac4e48",
    "x": 421,
    "y": 151,
    "width": 100.5,
    "height": 76.8473596572876,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_ZeroMQ_Socket",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HoverConnection",
    "id": "8ba94d76-2f41-dc88-9e8c-ab44ab0d1b96",
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
        "x": 525.8384000000004,
        "y": 182.7109760000002
      },
      {
        "x": 560.8384000000004,
        "y": 182.7109760000002
      },
      {
        "x": 560.8384000000004,
        "y": 273.0425280000002
      },
      {
        "x": 419,
        "y": 273.0425280000002
      },
      {
        "x": 419,
        "y": 363.37408000000016
      },
      {
        "x": 439,
        "y": 363.37408000000016
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
      "node": "c257bc92-49dd-097b-5db1-323e2dac4e48",
      "port": "socket_ref_out"
    },
    "target": {
      "node": "76ec041c-04ab-d752-d3cc-65d372e1f1bc",
      "port": "socket_ref_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "600db151-3006-67e6-583e-1d119ae2c6ef",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "40df04f5-c487-e0ab-b31e-785c7468aa30",
      "targetPortName": "40df04f5-c487-e0ab-b31e-785c7468aa30-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 525.8384000000004,
        "y": 182.7109760000002
      },
      {
        "x": 578.9192000000003,
        "y": 182.7109760000002
      },
      {
        "x": 578.9192000000003,
        "y": 182
      },
      {
        "x": 632,
        "y": 182
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
      "node": "c257bc92-49dd-097b-5db1-323e2dac4e48",
      "port": "socket_ref_out"
    },
    "target": {
      "node": "89ac5494-e389-7572-917c-cb0b86e60a4b",
      "port": "40df04f5-c487-e0ab-b31e-785c7468aa30-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "0123e53d-5484-32d6-d448-5591d048eccd",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#009900",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 894.50751953125,
        "y": 375
      },
      {
        "x": 1072.703759765625,
        "y": 375
      },
      {
        "x": 1072.703759765625,
        "y": 373
      },
      {
        "x": 1250.9,
        "y": 373
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
      "node": "3fda1024-1bd8-57f1-3cf8-9ea32a221a48",
      "port": "out1"
    },
    "target": {
      "node": "89ac5494-e389-7572-917c-cb0b86e60a4b",
      "port": "stopTerminal"
    }
  },
  {
    "type": "HoverConnection",
    "id": "41c0831f-456a-c00e-489e-87ca74744655",
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
        "x": 360.6664343852034,
        "y": 220.92094429997098
      },
      {
        "x": 398.8517771926019,
        "y": 220.92094429997098
      },
      {
        "x": 398.8517771926019,
        "y": 217.16447965728776
      },
      {
        "x": 437.0371200000004,
        "y": 217.16447965728776
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
      "node": "7b0e9167-958c-f4ed-4ce6-e3ef79d5bb44",
      "port": "error_out"
    },
    "target": {
      "node": "c257bc92-49dd-097b-5db1-323e2dac4e48",
      "port": "error_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "2f2af3ed-1c89-802b-b5d9-b409c9b223b6",
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
        "x": 360.6664343852034,
        "y": 182.94918008229251
      },
      {
        "x": 398.8517771926019,
        "y": 182.94918008229251
      },
      {
        "x": 398.8517771926019,
        "y": 186.22143965728776
      },
      {
        "x": 437.0371200000004,
        "y": 186.22143965728776
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
      "node": "7b0e9167-958c-f4ed-4ce6-e3ef79d5bb44",
      "port": "context_ref"
    },
    "target": {
      "node": "c257bc92-49dd-097b-5db1-323e2dac4e48",
      "port": "context_ref_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "30a963fd-7fad-2701-89d7-4416a186f9f2",
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
        "x": 525.8384000000004,
        "y": 217.16447965728776
      },
      {
        "x": 545.8384000000004,
        "y": 217.16447965728776
      },
      {
        "x": 545.8384000000004,
        "y": 247.74079982864396
      },
      {
        "x": 220,
        "y": 247.74079982864396
      },
      {
        "x": 220,
        "y": 394.31712000000016
      },
      {
        "x": 439,
        "y": 394.31712000000016
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
      "node": "c257bc92-49dd-097b-5db1-323e2dac4e48",
      "port": "error_out"
    },
    "target": {
      "node": "76ec041c-04ab-d752-d3cc-65d372e1f1bc",
      "port": "error_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "18b48498-a2b6-e568-87fb-cce40899d360",
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
        "x": 226.521875,
        "y": 149
      },
      {
        "x": 246.521875,
        "y": 149
      },
      {
        "x": 246.521875,
        "y": 186.81811891693724
      },
      {
        "x": 255.07021251953174,
        "y": 186.81811891693724
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
      "node": "e893d7e6-65be-1b3f-e95e-bffb7e0bdc0c",
      "port": "out1"
    },
    "target": {
      "node": "7b0e9167-958c-f4ed-4ce6-e3ef79d5bb44",
      "port": "context_number"
    }
  },
  {
    "type": "HoverConnection",
    "id": "357222c1-a742-2923-01bc-6a57dcd06412",
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
        "x": 363.462890625,
        "y": 337
      },
      {
        "x": 383.462890625,
        "y": 337
      },
      {
        "x": 383.462890625,
        "y": 380.1740800000002
      },
      {
        "x": 439,
        "y": 380.1740800000002
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
      "node": "167059a8-2f73-1b3f-67a7-684135398aca",
      "port": "out1"
    },
    "target": {
      "node": "76ec041c-04ab-d752-d3cc-65d372e1f1bc",
      "port": "bind_str_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "59df0137-286d-d9ef-304a-4f0946da71a7",
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
        "x": 866.8384000000004,
        "y": 296.56879931457536
      },
      {
        "x": 883.9192000000003,
        "y": 296.56879931457536
      },
      {
        "x": 883.9192000000003,
        "y": 299.1740800000002
      },
      {
        "x": 901,
        "y": 299.1740800000002
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
      "node": "82273904-b1ba-e65f-5838-5160c1cb6583",
      "port": "message_ref"
    },
    "target": {
      "node": "a89c84f8-fc92-faf7-a9c4-c62024e43d9e",
      "port": "message_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "948ff75d-cc45-8c58-eab6-fc60373e3911",
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
        "x": 989.80128,
        "y": 313.31712000000016
      },
      {
        "x": 1026.65064,
        "y": 313.31712000000016
      },
      {
        "x": 1026.65064,
        "y": 303
      },
      {
        "x": 1063.5,
        "y": 303
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
      "node": "a89c84f8-fc92-faf7-a9c4-c62024e43d9e",
      "port": "error_out"
    },
    "target": {
      "node": "8abc3c12-4066-5177-97e5-7f7c90feb9e1",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "76826a4a-04e2-a55b-e446-4d6784fdc6e9",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "f44d547e-4a2d-1b91-1219-5080353cd3f2",
      "sourcePortName": "f44d547e-4a2d-1b91-1219-5080353cd3f2-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 662,
        "y": 286.8910891089109
      },
      {
        "x": 683.0371200000004,
        "y": 286.8910891089109
      },
      {
        "x": 683.0371200000004,
        "y": 327.51183931457535
      },
      {
        "x": 778.0371200000004,
        "y": 327.51183931457535
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
      "node": "89ac5494-e389-7572-917c-cb0b86e60a4b",
      "port": "f44d547e-4a2d-1b91-1219-5080353cd3f2-out0"
    },
    "target": {
      "node": "82273904-b1ba-e65f-5838-5160c1cb6583",
      "port": "error_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "f5abd992-8c5e-cd02-f53a-62090488ccde",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "targetTunnel": "f44d547e-4a2d-1b91-1219-5080353cd3f2",
      "targetPortName": "f44d547e-4a2d-1b91-1219-5080353cd3f2-in0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 527.80128,
        "y": 394.31712000000016
      },
      {
        "x": 579.9006400000001,
        "y": 394.31712000000016
      },
      {
        "x": 579.9006400000001,
        "y": 286.8910891089109
      },
      {
        "x": 632,
        "y": 286.8910891089109
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
      "node": "76ec041c-04ab-d752-d3cc-65d372e1f1bc",
      "port": "error_out"
    },
    "target": {
      "node": "89ac5494-e389-7572-917c-cb0b86e60a4b",
      "port": "f44d547e-4a2d-1b91-1219-5080353cd3f2-in0"
    }
  },
  {
    "type": "HoverConnection",
    "id": "31ce3d04-31d2-f87b-d3c7-186678018164",
    "alpha": 1,
    "angle": 0,
    "userData": {
      "sourceTunnel": "40df04f5-c487-e0ab-b31e-785c7468aa30",
      "sourcePortName": "40df04f5-c487-e0ab-b31e-785c7468aa30-out0"
    },
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 662,
        "y": 182
      },
      {
        "x": 878,
        "y": 182
      },
      {
        "x": 878,
        "y": 282.37408000000016
      },
      {
        "x": 901,
        "y": 282.37408000000016
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
      "node": "89ac5494-e389-7572-917c-cb0b86e60a4b",
      "port": "40df04f5-c487-e0ab-b31e-785c7468aa30-out0"
    },
    "target": {
      "node": "a89c84f8-fc92-faf7-a9c4-c62024e43d9e",
      "port": "socket_ref_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "e2263ed3-5d9e-75d4-641a-a6a2f324a802",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "89ac5494-e389-7572-917c-cb0b86e60a4b",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 866.8384000000004,
        "y": 327.51183931457535
      },
      {
        "x": 883.9192000000003,
        "y": 327.51183931457535
      },
      {
        "x": 883.9192000000003,
        "y": 313.31712000000016
      },
      {
        "x": 901,
        "y": 313.31712000000016
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
      "node": "82273904-b1ba-e65f-5838-5160c1cb6583",
      "port": "error_out"
    },
    "target": {
      "node": "a89c84f8-fc92-faf7-a9c4-c62024e43d9e",
      "port": "error_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "d1ac7088-5aea-7d1a-74b3-841464cfa8a8",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "89ac5494-e389-7572-917c-cb0b86e60a4b",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 801.32734375,
        "y": 234
      },
      {
        "x": 849.32734375,
        "y": 234
      },
      {
        "x": 849.32734375,
        "y": 261.2843996572877
      },
      {
        "x": 719.0371200000004,
        "y": 261.2843996572877
      },
      {
        "x": 719.0371200000004,
        "y": 296.56879931457536
      },
      {
        "x": 778.0371200000004,
        "y": 296.56879931457536
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
      "node": "eb95d493-f1d6-aa3f-be9c-484a56ff66d2",
      "port": "out1"
    },
    "target": {
      "node": "82273904-b1ba-e65f-5838-5160c1cb6583",
      "port": "message_str"
    }
  },
  {
    "type": "HoverConnection",
    "id": "3bb5a509-06e1-d629-007a-0b49ace96e92",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "composite": "89ac5494-e389-7572-917c-cb0b86e60a4b",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 1034.8951171875,
        "y": 208
      },
      {
        "x": 1049.19755859375,
        "y": 208
      },
      {
        "x": 1049.19755859375,
        "y": 276
      },
      {
        "x": 1063.5,
        "y": 276
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
      "node": "9d81ac06-c8c7-ff8b-ba9d-08c50b5a9a31",
      "port": "out1"
    },
    "target": {
      "node": "8abc3c12-4066-5177-97e5-7f7c90feb9e1",
      "port": "in1"
    }
  }
],
translateToCppCode: function(){

        /*
         *  First translate this node function as spearate function, call IDE method for this, THIS IDE METHOD MUST BE DEFINED!
         *  Passing reference to this object. Schematic in jsonDocument is used.
         */
        let cCode = "";

        let paramsCounter = 0;
        let paramsStr = "";
        this.getInputPorts().each(function(portIndex, portObj){
            let connections = portObj.getConnections();
            if (paramsCounter > 0) paramsStr += ', ';

            if (connections.getSize() > 0){
                paramsStr += 'wire_' + connections.first().getId();
            }else{
                paramsStr += 'null';
            }

            paramsCounter++;
        });

        let functionCallStr = this.translateToCppCodeFunctionName() + '(' + paramsStr + ')';

        if (this.getOutputPorts().getSize() > 0){
            /*
             *  Node output translation process defined just for first output port! This is for C/C++ there is nothing like multiple rturn values.
             */
            let connections = this.getOutputPorts().first().getConnections()
            if (connections.getSize() > 0){
                connections.each(function(connectionIndex, connectionObj){
                    cCode += 'wire_' + connectionObj.getId() + ' = ' + functionCallStr + ";\n";
                });
            }else{
                cCode += functionCallStr + "; /* output not assigned */ \n";
            }

        }else{
            cCode += functionCallStr + "; /* node has no output port */ \n";
        }

        return cCode;
    },
});
