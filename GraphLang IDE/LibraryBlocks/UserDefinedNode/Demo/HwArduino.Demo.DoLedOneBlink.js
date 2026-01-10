HwArduino.Demo.DoLedOneBlink = GraphLang.UserDefinedNode.extend({
NAME: 'HwArduino.Demo.DoLedOneBlink',
init: function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:42, height:42, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // error_out
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(114.28571428571428, 76.19047619047619));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#F3D302");
        port.setName("error_out");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // error_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-14.285714285714285, 76.19047619047619));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#F3D302");
        port.setName("error_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        this.persistPorts=false;
    },
createShapeElement: function(){
        var shape = this._super();
        this.originalWidth = 42;
        this.originalHeight= 42;
        return shape;
    },
createSet: function(){
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L42,0 L42,42 L0,42");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path('M0 0L42 0L42 42L0 42Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        

        return this.canvas.paper.setFinish();
    },
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAYAAABzwahEAAADOUlEQVR4AeyUQUwTQRSGp9Mui6U9iqUVSBYjkXCgAQme1EA0MZqQ0AtRE+RCiUc9wMFYPCgHPQrlIkajHARDotGQQMJJDQGzFzEaqYG0a+Xa1nRpt+u8GrnQYffQbGbbmfRlJ++9zvzf+7fFqEoXB68247nj3PEqmQB/1avE6H1M7vj+KEpsgsHg2Y6Ojrs2iXMlEA6kTDmu6/r5zs7OyMjICNMBGhFC5QNHZHV1daFwOMx0gEZkcply3ORZtmrj4LayqwxiueNlGKKZI5jp4Y4zY4VFQrjjFg2amWu448xYYZEQ7rhFg2bmGu44M1ZYJIQ7btGgmbmGO86MFRYJ4Y5bNGirr6Hexx2njqZCC9XtuM/n65Yk32hjY+AOBOwhZ3ezCcNpYAEmCNiTXDdw4VMnG663NOm3QheykdHBdDFCF7MRyEENmuwYba0N1wjDbRoXPtGsjYUHU5duDGTqb15NYYhhsocc1AKBwGW7gfv9/istTdp4eDBTkqulOT+Oh0Ipqb8v6znu0xAmv3iIwDENQQ5qgksfz+fzbmSTRbTW1QiOsaFQWurv+1OSa3ggLeG+HrUWURbUWqV8u6qqAUoLc+lcLudvlXLtvT1ZKlfvGVXE4DBNPdSCbaqoadpRWg9reeJ4fbBtT3SSt5emDbgOKf/7moM8HGSRR0V9cEGn80Dt86aoulyuXXoXWxXQKm/WqFqBrgu48MoHUaW1QO3bT+GLIAgKrYe1PGgFzSufxCxN28pHUcWzC96txeXadDzpRAUyJYjEbyeCHNRyOXSfTDFDO4S1PGhV9/QHT+e9scVld0muJ/OeGP6x7ZyMznnfzb5270698BQgZhfcu9Nz3vdQSyQSb1mDM9KjKMob0B6dqyvJtbVdM4m/fv/1fGvH8Wh+6Ujk8UvPBMSrpbqJHUV4CDWjS1itg3Y6V+JZ8V89mUyuxWLJ6XhcuQcRiylT8Xh8jVUos7oO4yqCmz3IfB/7nRzcyKONjQ00MzPDdIBGI47/dbOOr66vr09Eo1GmAzQSsFUShh9T4LIsr8qyHJHtEeUDNxyfDRtMOW5DLkPJHNxwRBXWwB2vMEMNcbjjhiOqsIa/AAAA///PVUJlAAAABklEQVQDAGJFD6rgh030AAAAAElFTkSuQmCC",
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
    "width": 68,
    "height": 38.467302572204574,
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
      "nodeLabel": "cluster ref. name",
      "sourceFigureId": "6f5f1bdc-a90c-5762-ec75-ee32ab1a6e73",
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
      "routedByUserInteraction": true,
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
      "routedByUserInteraction": true,
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
