HwArduino.Demo.DoLedOneBlink = GraphLang.UserDefinedNode.extend({
NAME: 'HwArduino.Demo.DoLedOneBlink',
init: function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // error_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#F3D302");
        port.setName("error_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // error_out
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 73.333333));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#F3D302");
        port.setName("error_out");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        this.persistPorts=false;
    },
createShapeElement: function(){
        var shape = this._super();
        this.originalWidth = 100;
        this.originalHeight= 60;
        return shape;
    },
createSet: function(){
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L100,0 L100,60 L0,60");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Line
        shape = this.canvas.paper.path('M0,44L20,44');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,44L100,44');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M37,33L37,40');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M43,33L43,40');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Circle
        shape = this.canvas.paper.ellipse();
        shape.attr({"rx":7,"ry":7,"cx":40,"cy":26,"stroke":"#303030","stroke-width":1,"fill":"#E53935","opacity":1});
        shape.data("name","Circle");

        // Line
        shape = this.canvas.paper.path('M49,21L53,17');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M50,26L55,26');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M54,40L58,40L58,32L65,32L65,40L72,40');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Label
        shape = this.canvas.paper.text(0,0,'Arduino');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Arduino","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Blink');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"Blink","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },
symbolPicture: "data:image/png;base64,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",
jsonDocument: [
  {
    "type": "HwRaspiZero.IO.Digital.digitalWrite",
    "id": "0b149ff8-8919-bdf4-88ad-63d4abf71978",
    "x": 341,
    "y": 241,
    "width": 98,
    "height": 76.78911304473877,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_IO_Digital_digitalWrite",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.IO.Digital.digitalWrite",
    "id": "491c77ce-dc45-993b-845e-3a38866cdb47",
    "x": 619,
    "y": 238,
    "width": 98,
    "height": 76.78911304473877,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_IO_Digital_digitalWrite",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduino.Time.delay",
    "id": "c97d9557-f639-37d3-2946-ffb06f22f367",
    "x": 487,
    "y": 262,
    "width": 68,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwArduino_Time_delay",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduino.Time.delay",
    "id": "a5acfee2-0722-db05-705b-3ea3a228638e",
    "x": 784,
    "y": 261,
    "width": 68,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwArduino_Time_delay",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.TerminalOutput",
    "id": "c1fa5b4f-da33-08d1-497f-9d0505781c0f",
    "x": 921,
    "y": 291,
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
    "text": "error_out",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.EnumSelectOption",
    "id": "0ce2c2a8-fa95-9670-59cb-ff842ebe9aba",
    "x": 30,
    "y": 226,
    "width": 111.546875,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "nodeLabel": "enumValue",
      "sourceFigureId": "361198de-365a-43a3-a597-1aa30798c78e"
    },
    "cssClass": "GraphLang_Shapes_Basic_EnumSelectOption",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "arduino_LED_BUILTIN",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#080808",
    "fontFamily": null,
    "editor": "draw2d.ui.SelectOptionInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "14bcf3f7-3b64-be6e-16c2-91d5bae55ca7",
    "x": 300,
    "y": 173,
    "width": 28.669921875,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "bool",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#009900",
    "color": "#009900",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "true",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "d11c6de0-9745-9ae5-6ca4-d74619e8e1fc",
    "x": 537,
    "y": 171,
    "width": 32.5615234375,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "bool",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
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
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "848de6d1-46c9-4ea9-e327-f44486dc3f04",
    "x": 432,
    "y": 185,
    "width": 27.123046875,
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
    "text": "300",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "a5a7cbeb-9aa2-d13d-1903-72633d008460",
    "x": 730,
    "y": 210,
    "width": 27.123046875,
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
    "text": "300",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "ConvertDatatype",
    "id": "378d5c2c-4b32-125f-0c50-0528b3b0302f",
    "x": 199,
    "y": 215,
    "width": 36,
    "height": 22,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "ConvertDatatype",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "5c788cd0-1798-4bf7-d82a-92183a0ec8c6",
    "x": 188,
    "y": 162,
    "width": 16,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "uint",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#4286F4",
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
    "type": "GraphLang.Shapes.Basic.ClusterSelectOption",
    "id": "4489adeb-8422-08c1-e306-d6266df7f882",
    "x": 121,
    "y": 329,
    "width": 99.369140625,
    "height": 25,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "nodeLabel": "error_in",
      "sourceFigureId": "a69cb9cb-aeb7-f240-cb0e-a4ad59661926",
      "isClusterRef": true,
      "isTerminal": true
    },
    "cssClass": "GraphLang_Shapes_Basic_ClusterSelectOption",
    "bgColor": "none",
    "color": "#DD2241",
    "stroke": 3,
    "radius": 0,
    "dasharray": "-",
    "text": "errorDatatype",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#080808",
    "fontFamily": null
  },
  {
    "type": "HoverConnection",
    "id": "6ea99d57-c709-83fe-7e10-0a9a051aad4c",
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
        "x": 209.01073898563766,
        "y": 341.3671724977564
      },
      {
        "x": 277.7220366681118,
        "y": 341.3671724977564
      },
      {
        "x": 277.7220366681118,
        "y": 308.78911304473877
      },
      {
        "x": 346.43333435058594,
        "y": 308.78911304473877
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
      "node": "4489adeb-8422-08c1-e306-d6266df7f882",
      "port": "out1"
    },
    "target": {
      "node": "0b149ff8-8919-bdf4-88ad-63d4abf71978",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "1199fb11-46cc-84a2-b6bc-5383f3438b67",
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
        "x": 162.32386575095737,
        "y": 236.6004335695055
      },
      {
        "x": 180.2999368754787,
        "y": 236.6004335695055
      },
      {
        "x": 180.2999368754787,
        "y": 235.06730199999998
      },
      {
        "x": 198.27600800000005,
        "y": 235.06730199999998
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
      "node": "0ce2c2a8-fa95-9670-59cb-ff842ebe9aba",
      "port": "out1"
    },
    "target": {
      "node": "378d5c2c-4b32-125f-0c50-0528b3b0302f",
      "port": "variableIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "0e3f243c-dc4a-75dd-a044-9678bbfdc6f7",
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
        "x": 855.7700031999999,
        "y": 305.4079616000002
      },
      {
        "x": 888.3850015999999,
        "y": 305.4079616000002
      },
      {
        "x": 888.3850015999999,
        "y": 305
      },
      {
        "x": 921,
        "y": 305
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
      "node": "a5acfee2-0722-db05-705b-3ea3a228638e",
      "port": "error_out"
    },
    "target": {
      "node": "c1fa5b4f-da33-08d1-497f-9d0505781c0f",
      "port": "out1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "29972891-2c85-8267-fe01-fc62ad9d83a3",
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
        "x": 438.43333435058594,
        "y": 308.78911304473877
      },
      {
        "x": 464.83752157529295,
        "y": 308.78911304473877
      },
      {
        "x": 464.83752157529295,
        "y": 306.4079616000002
      },
      {
        "x": 491.24170879999997,
        "y": 306.4079616000002
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
      "node": "0b149ff8-8919-bdf4-88ad-63d4abf71978",
      "port": "errorOut"
    },
    "target": {
      "node": "c97d9557-f639-37d3-2946-ffb06f22f367",
      "port": "error_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "1550f0ee-a38d-39d7-74df-d10b272bd761",
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
        "x": 463.8650390625,
        "y": 197
      },
      {
        "x": 477.55337393125,
        "y": 197
      },
      {
        "x": 477.55337393125,
        "y": 277.8866944000002
      },
      {
        "x": 491.24170879999997,
        "y": 277.8866944000002
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
      "node": "848de6d1-46c9-4ea9-e327-f44486dc3f04",
      "port": "out1"
    },
    "target": {
      "node": "c97d9557-f639-37d3-2946-ffb06f22f367",
      "port": "delay_ms"
    }
  },
  {
    "type": "HoverConnection",
    "id": "bbde3504-27fc-ca91-5b68-5f6202b43939",
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
        "x": 333.6041015625,
        "y": 185
      },
      {
        "x": 340.01871795654296,
        "y": 185
      },
      {
        "x": 340.01871795654296,
        "y": 273.78911304473877
      },
      {
        "x": 346.43333435058594,
        "y": 273.78911304473877
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
      "node": "14bcf3f7-3b64-be6e-16c2-91d5bae55ca7",
      "port": "out1"
    },
    "target": {
      "node": "0b149ff8-8919-bdf4-88ad-63d4abf71978",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "d9c2d447-f587-7cf5-23b6-545f30456618",
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
        "x": 761.8650390625,
        "y": 222
      },
      {
        "x": 775.05337393125,
        "y": 222
      },
      {
        "x": 775.05337393125,
        "y": 276.8866944000002
      },
      {
        "x": 788.2417088,
        "y": 276.8866944000002
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
      "node": "a5a7cbeb-9aa2-d13d-1903-72633d008460",
      "port": "out1"
    },
    "target": {
      "node": "a5acfee2-0722-db05-705b-3ea3a228638e",
      "port": "delay_ms"
    }
  },
  {
    "type": "HoverConnection",
    "id": "9deb0078-cf97-f9fa-0998-c14c28da0133",
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
        "x": 269.26788,
        "y": 235.06730199999998
      },
      {
        "x": 307.85060717529296,
        "y": 235.06730199999998
      },
      {
        "x": 307.85060717529296,
        "y": 292.78911304473877
      },
      {
        "x": 346.43333435058594,
        "y": 292.78911304473877
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
      "node": "378d5c2c-4b32-125f-0c50-0528b3b0302f",
      "port": "convertedVariable"
    },
    "target": {
      "node": "0b149ff8-8919-bdf4-88ad-63d4abf71978",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "5c82b999-fc8e-86ff-8e4b-eff4aa318787",
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
        "x": 269.26788,
        "y": 235.06730199999998
      },
      {
        "x": 586.8506071752929,
        "y": 235.06730199999998
      },
      {
        "x": 586.8506071752929,
        "y": 289.78911304473877
      },
      {
        "x": 624.4333343505859,
        "y": 289.78911304473877
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
      "node": "378d5c2c-4b32-125f-0c50-0528b3b0302f",
      "port": "convertedVariable"
    },
    "target": {
      "node": "491c77ce-dc45-993b-845e-3a38866cdb47",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "befea2ef-71b7-5c1e-6c67-2022963e70c8",
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
        "x": 205.85,
        "y": 174
      },
      {
        "x": 233.010088,
        "y": 174
      },
      {
        "x": 233.010088,
        "y": 213.440422
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
      "node": "5c788cd0-1798-4bf7-d82a-92183a0ec8c6",
      "port": "out1"
    },
    "target": {
      "node": "378d5c2c-4b32-125f-0c50-0528b3b0302f",
      "port": "castDatatype"
    }
  },
  {
    "type": "HoverConnection",
    "id": "d408a41d-883c-f313-6d46-3274ce33a2d4",
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
        "x": 558.7700031999999,
        "y": 306.4079616000002
      },
      {
        "x": 591.6016687752929,
        "y": 306.4079616000002
      },
      {
        "x": 591.6016687752929,
        "y": 305.78911304473877
      },
      {
        "x": 624.4333343505859,
        "y": 305.78911304473877
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
      "node": "c97d9557-f639-37d3-2946-ffb06f22f367",
      "port": "error_out"
    },
    "target": {
      "node": "491c77ce-dc45-993b-845e-3a38866cdb47",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "a28f8360-0615-8cae-8804-3cb3a2593c86",
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
        "x": 716.4333343505859,
        "y": 305.78911304473877
      },
      {
        "x": 752.337521575293,
        "y": 305.78911304473877
      },
      {
        "x": 752.337521575293,
        "y": 305.4079616000002
      },
      {
        "x": 788.2417088,
        "y": 305.4079616000002
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
      "node": "491c77ce-dc45-993b-845e-3a38866cdb47",
      "port": "errorOut"
    },
    "target": {
      "node": "a5acfee2-0722-db05-705b-3ea3a228638e",
      "port": "error_in"
    }
  },
  {
    "type": "HoverConnection",
    "id": "3eeed80c-0931-602b-b3a4-51c7acd45503",
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
        "x": 575.50751953125,
        "y": 183
      },
      {
        "x": 604.4333343505859,
        "y": 183
      },
      {
        "x": 604.4333343505859,
        "y": 270.78911304473877
      },
      {
        "x": 624.4333343505859,
        "y": 270.78911304473877
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
      "node": "d11c6de0-9745-9ae5-6ca4-d74619e8e1fc",
      "port": "out1"
    },
    "target": {
      "node": "491c77ce-dc45-993b-845e-3a38866cdb47",
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
    var w = this.getWidth(), h = this.getHeight();
    this._super(memento);
    this.setDimension(w, h);
    this.resetChildren();
    $.each(memento.labels, $.proxy(function(i,json){
        var figure =  eval("new "+json.type+"()");
        figure.attr(json);
        var locator =  eval("new "+json.locator+"()");
        this.add(figure, locator);
    },this));
},
});
