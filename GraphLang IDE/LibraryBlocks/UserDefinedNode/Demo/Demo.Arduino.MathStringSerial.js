Demo.Arduino.MathStringSerial = GraphLang.UserDefinedNode.extend({
NAME: 'Demo.Arduino.MathStringSerial',
init: function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:42, height:42, flagAutoCreatePorts: false},attr), setter, getter);
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
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FDF6EC","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'+-*/');
        shape.attr({"x":21,"y":21,"text-anchor":"middle","text":"+-*/","font-family":"Arial","font-size":11,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },
/**
 *  Demo using all restyled operator and Arduino nodes: GraphLang.Math.Basic Add, Subtract, Multiply, Divide, Abs, Not,
 *  HwArduino.String toStr, replace, replace2, HwArduino.Serial begin/println and HwArduinoNano.Serial begin/println.
 *  Computes |(7 + -3) * (7 - -3) / -3| = 13 and not false = true, converts them to text, puts them into template strings and prints them.
 *  Python output: "|7 + -3| * |7 - -3| / -3 = 13" and "not false = True" (C++/Arduino prints the same over Serial).
 */
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "k_baud1",
    "x": 40,
    "y": 40,
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
    "color": "#4286F4",
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
    "type": "HwArduino.Serial.begin",
    "id": "ser_begin",
    "x": 160,
    "y": 20,
    "width": 100,
    "height": 60,
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
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "k_baud2",
    "x": 40,
    "y": 460,
    "width": 43.0654296875,
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
    "color": "#4286F4",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "115200",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwArduinoNano.Serial.begin",
    "id": "nano_begin",
    "x": 160,
    "y": 440,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduinoNano_Serial_begin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "k_seven",
    "x": 40,
    "y": 140,
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
    "color": "#4286F4",
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
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "k_minus3",
    "x": 40,
    "y": 200,
    "width": 19.330078125,
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
    "color": "#4286F4",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "-3",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "k_flag",
    "x": 40,
    "y": 380,
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
    "type": "GraphLang.Math.Basic.Add",
    "id": "op_add",
    "x": 200,
    "y": 110,
    "width": 80,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Math_Basic_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Basic.Subtract",
    "id": "op_sub",
    "x": 200,
    "y": 190,
    "width": 80,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Math_Basic_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Basic.Multiply",
    "id": "op_mul",
    "x": 320,
    "y": 150,
    "width": 80,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Math_Basic_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Basic.Divide",
    "id": "op_div",
    "x": 440,
    "y": 190,
    "width": 80,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Math_Basic_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Basic.Abs",
    "id": "op_abs",
    "x": 560,
    "y": 190,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Math_Basic_Abs",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Basic.Not",
    "id": "op_not",
    "x": 200,
    "y": 385,
    "width": 80,
    "height": 30,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Math_Basic_Not",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduino.String.toStr",
    "id": "s_tostr1",
    "x": 700,
    "y": 205,
    "width": 80,
    "height": 30,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_String_toStr",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduino.String.toStr",
    "id": "s_tostr2",
    "x": 320,
    "y": 385,
    "width": 80,
    "height": 30,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_String_toStr",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "k_tmpl1",
    "x": 560,
    "y": 60,
    "width": 147.251953125,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "String",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "|7 + -3| * |7 - -3| / -3 = VALUE",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "k_key1",
    "x": 560,
    "y": 110,
    "width": 49.6005859375,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "String",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "VALUE",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "k_tmpl2",
    "x": 420,
    "y": 330,
    "width": 92.8671875,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "String",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "not false = FLAG",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "k_key2",
    "x": 420,
    "y": 360,
    "width": 43.66796875,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "String",
      "isTerminal": false,
      "executionOrder": -1
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FF3385",
    "color": "#FF3385",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "FLAG",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HwArduino.String.replace",
    "id": "s_replA",
    "x": 820,
    "y": 60,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_String_replace",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduino.Serial.println",
    "id": "ser_print",
    "x": 980,
    "y": 40,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_Serial_println",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduino.String.replace2",
    "id": "s_replB",
    "x": 600,
    "y": 330,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduino_String_replace2",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwArduinoNano.Serial.println",
    "id": "nano_print",
    "x": 980,
    "y": 320,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "HwArduinoNano_Serial_println",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HoverConnection",
    "id": "61dcd9de-5332-f138-a990-c53b08583011",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 91.95244140625,
        "y": 472
      },
      {
        "x": 125.976220703125,
        "y": 472
      },
      {
        "x": 125.976220703125,
        "y": 459.9999998
      },
      {
        "x": 160,
        "y": 459.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_baud2",
      "port": "out1"
    },
    "target": {
      "node": "nano_begin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "d49f52b0-25fa-a97b-c50f-8cc73bb14deb",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 260,
        "y": 483.9999998
      },
      {
        "x": 430,
        "y": 483.9999998
      },
      {
        "x": 430,
        "y": 378
      },
      {
        "x": 600,
        "y": 378
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "nano_begin",
      "port": "errorOut"
    },
    "target": {
      "node": "s_replB",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "c82a1463-8b9f-eec2-1121-71302aa87f36",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 700,
        "y": 378
      },
      {
        "x": 840,
        "y": 378
      },
      {
        "x": 840,
        "y": 363.9999998
      },
      {
        "x": 980,
        "y": 363.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "s_replB",
      "port": "errorOut"
    },
    "target": {
      "node": "nano_print",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "714a423d-1138-aa58-da06-f3d6998195f4",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 700,
        "y": 342
      },
      {
        "x": 840,
        "y": 342
      },
      {
        "x": 840,
        "y": 339.9999998
      },
      {
        "x": 980,
        "y": 339.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "s_replB",
      "port": "out1"
    },
    "target": {
      "node": "nano_print",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "a9dc3f87-3669-f3f7-62e6-9fcd55718f85",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 400,
        "y": 400
      },
      {
        "x": 590,
        "y": 400
      },
      {
        "x": 590,
        "y": 366
      },
      {
        "x": 600,
        "y": 366
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "s_tostr2",
      "port": "out1"
    },
    "target": {
      "node": "s_replB",
      "port": "in3"
    }
  },
  {
    "type": "HoverConnection",
    "id": "9bcf00de-f233-9ddd-7a24-22a9960ee41e",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 920,
        "y": 72
      },
      {
        "x": 960,
        "y": 72
      },
      {
        "x": 960,
        "y": 60
      },
      {
        "x": 980,
        "y": 59.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "s_replA",
      "port": "out1"
    },
    "target": {
      "node": "ser_print",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "9698c609-10d8-1775-b6e6-b191c272ebff",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 780,
        "y": 220
      },
      {
        "x": 810,
        "y": 220
      },
      {
        "x": 810,
        "y": 96
      },
      {
        "x": 820,
        "y": 96
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "s_tostr1",
      "port": "out1"
    },
    "target": {
      "node": "s_replA",
      "port": "in3"
    }
  },
  {
    "type": "HoverConnection",
    "id": "fa1f3cee-dc8b-f6fe-542c-13f4d4b90bd4",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#009900",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 78.50751953125001,
        "y": 392
      },
      {
        "x": 180,
        "y": 392
      },
      {
        "x": 180,
        "y": 400
      },
      {
        "x": 200,
        "y": 400
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_flag",
      "port": "out1"
    },
    "target": {
      "node": "op_not",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "85a4fc90-0996-8857-feee-1c1b10718bd2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 520,
        "y": 220
      },
      {
        "x": 540,
        "y": 220
      },
      {
        "x": 540,
        "y": 210
      },
      {
        "x": 560,
        "y": 209.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "op_div",
      "port": "out1"
    },
    "target": {
      "node": "op_abs",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "0ec45d15-3c42-fa95-2d0b-0b477e3bc463",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 400,
        "y": 180
      },
      {
        "x": 420,
        "y": 180
      },
      {
        "x": 420,
        "y": 204
      },
      {
        "x": 440,
        "y": 203.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "op_mul",
      "port": "out1"
    },
    "target": {
      "node": "op_div",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "c1721233-d028-a889-25f0-c033bba6caca",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 280,
        "y": 140
      },
      {
        "x": 300,
        "y": 140
      },
      {
        "x": 300,
        "y": 164
      },
      {
        "x": 320,
        "y": 163.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "op_add",
      "port": "out1"
    },
    "target": {
      "node": "op_mul",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "ac7558a9-cdff-1d50-fbc1-68f4ca977972",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 57.85,
        "y": 152
      },
      {
        "x": 180,
        "y": 152
      },
      {
        "x": 180,
        "y": 204
      },
      {
        "x": 200,
        "y": 203.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_seven",
      "port": "out1"
    },
    "target": {
      "node": "op_sub",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "5a8fa8e7-1122-0622-1233-db45e04fbc5a",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 57.85,
        "y": 152
      },
      {
        "x": 180,
        "y": 152
      },
      {
        "x": 180,
        "y": 124
      },
      {
        "x": 200,
        "y": 123.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_seven",
      "port": "out1"
    },
    "target": {
      "node": "op_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "c29ff09f-a1f8-f1e8-3278-5462125140b2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 78.87255859375,
        "y": 52
      },
      {
        "x": 140,
        "y": 52
      },
      {
        "x": 140,
        "y": 40
      },
      {
        "x": 160,
        "y": 39.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_baud1",
      "port": "out1"
    },
    "target": {
      "node": "ser_begin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "3e1a99a9-19df-9d98-f98d-2eb82bc69135",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 280,
        "y": 220
      },
      {
        "x": 300,
        "y": 220
      },
      {
        "x": 300,
        "y": 196
      },
      {
        "x": 320,
        "y": 196.0000002
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "op_sub",
      "port": "out1"
    },
    "target": {
      "node": "op_mul",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "6e16cb77-230d-c0fe-8261-99fe25518b79",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 62.0458984375,
        "y": 212
      },
      {
        "x": 190,
        "y": 212
      },
      {
        "x": 190,
        "y": 156.0000002
      },
      {
        "x": 200,
        "y": 156.0000002
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_minus3",
      "port": "out1"
    },
    "target": {
      "node": "op_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "c12fd43c-dcad-5dbd-740d-1fa2cf384d76",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 62.0458984375,
        "y": 212
      },
      {
        "x": 180,
        "y": 212
      },
      {
        "x": 180,
        "y": 236
      },
      {
        "x": 200,
        "y": 236.0000002
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_minus3",
      "port": "out1"
    },
    "target": {
      "node": "op_sub",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "59944838-83aa-01f0-4cff-15be1a3fce35",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#4286F4",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 62.0458984375,
        "y": 212
      },
      {
        "x": 180,
        "y": 212
      },
      {
        "x": 180,
        "y": 257
      },
      {
        "x": 430,
        "y": 257
      },
      {
        "x": 430,
        "y": 236.0000002
      },
      {
        "x": 440,
        "y": 236.0000002
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_minus3",
      "port": "out1"
    },
    "target": {
      "node": "op_div",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "719b0e32-aacb-e659-74fd-01957ebafa3e",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 660,
        "y": 209.9999998
      },
      {
        "x": 680,
        "y": 210
      },
      {
        "x": 680,
        "y": 220
      },
      {
        "x": 700,
        "y": 220
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "op_abs",
      "port": "out1"
    },
    "target": {
      "node": "s_tostr1",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "96af1cc9-6689-e8e7-8d17-407b340a6124",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#009900",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 280,
        "y": 400
      },
      {
        "x": 320,
        "y": 400
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "op_not",
      "port": "out1"
    },
    "target": {
      "node": "s_tostr2",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "5fb99920-1e3f-d2ab-c602-78391b4a9881",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 260,
        "y": 63.9999998
      },
      {
        "x": 553,
        "y": 64
      },
      {
        "x": 553,
        "y": 103
      },
      {
        "x": 790,
        "y": 103
      },
      {
        "x": 790,
        "y": 108
      },
      {
        "x": 820,
        "y": 108
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "ser_begin",
      "port": "errorOut"
    },
    "target": {
      "node": "s_replA",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "ceebe81f-1282-e89a-6d20-2c22734e0faf",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 920,
        "y": 108
      },
      {
        "x": 960,
        "y": 108
      },
      {
        "x": 960,
        "y": 84
      },
      {
        "x": 980,
        "y": 83.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "s_replA",
      "port": "errorOut"
    },
    "target": {
      "node": "ser_print",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "e2ad06bd-c1fb-7ec7-6127-ea29c8eefc81",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 733.9390625,
        "y": 72
      },
      {
        "x": 820,
        "y": 72
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_tmpl1",
      "port": "out1"
    },
    "target": {
      "node": "s_replA",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "a0a79d91-b85a-2741-61c7-027b2abc82b6",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 610.8921875,
        "y": 122
      },
      {
        "x": 800,
        "y": 122
      },
      {
        "x": 800,
        "y": 84
      },
      {
        "x": 820,
        "y": 84
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_key1",
      "port": "out1"
    },
    "target": {
      "node": "s_replA",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "c2b5ac36-485e-a562-c6b4-6b446b7e33e9",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 525.41015625,
        "y": 342
      },
      {
        "x": 600,
        "y": 342
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_tmpl2",
      "port": "out1"
    },
    "target": {
      "node": "s_replB",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "75a40d2e-f796-c253-0c45-3a4f2028b9c6",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FF3385",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 463.4109375,
        "y": 372
      },
      {
        "x": 570,
        "y": 372
      },
      {
        "x": 570,
        "y": 354
      },
      {
        "x": 600,
        "y": 354
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "k_key2",
      "port": "out1"
    },
    "target": {
      "node": "s_replB",
      "port": "in2"
    }
  }
],
});
