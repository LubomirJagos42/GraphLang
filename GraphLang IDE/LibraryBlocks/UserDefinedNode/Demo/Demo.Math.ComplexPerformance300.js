Demo.Math.ComplexPerformance300 = GraphLang.UserDefinedNode.extend({
NAME: 'Demo.Math.ComplexPerformance300',
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
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FDF2F2","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'300');
        shape.attr({"x":21,"y":21,"text-anchor":"middle","text":"300","font-family":"Arial","font-size":11,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },
/**
 *  Performance demo: 300 nodes on canvas (10 rows x (1 complex constant + 28 GraphLang.Math.Complex nodes + 1 Console.output)), 366 wires.
 *  Each row is a chain of complex operations, binary nodes take outputs of the two previous nodes in the row.
 *  Expected console output (python cmath):
 *    row 0: (2.6288938063340477+0.7658607095111917j)
 *    row 1: (0.42831292548017524+0.6064204130462616j)
 *    row 2: (0.7054587849522387+1.3539121349023864j)
 *    row 3: (1.7914551302670538-0.009847646277299563j)
 *    row 4: (5.687574181140646+0.05714647070920428j)
 *    row 5: (0.9999506487850803+3.2989810619171667e-06j)
 *    row 6: (-4.681084022875158+0.22380889064671003j)
 *    row 7: (-4.676547046349957+0.01863001332286933j)
 *    row 8: (-0.2911434118292993+0.09780658019244749j)
 *    row 9: (0.19984698333090212-0.0027982161956954087j)
 */
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r0",
    "x": 20,
    "y": 45,
    "width": 70,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.20 + 0.35i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r0_c0_sin",
    "x": 120,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r0_c1_add",
    "x": 260,
    "y": 35,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r0_c2_sqrt",
    "x": 400,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r0_c3_multiply",
    "x": 540,
    "y": 35,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r0_c4_tanh",
    "x": 680,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r0_c5_subtract",
    "x": 820,
    "y": 35,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r0_c6_conj",
    "x": 960,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r0_c7_cos",
    "x": 1100,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r0_c8_divide",
    "x": 1240,
    "y": 35,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r0_c9_log",
    "x": 1380,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r0_c10_atan",
    "x": 1520,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r0_c11_proj",
    "x": 1660,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r0_c12_asinh",
    "x": 1800,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r0_c13_acos",
    "x": 1940,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r0_c14_sin",
    "x": 2080,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r0_c15_add",
    "x": 2220,
    "y": 35,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r0_c16_sqrt",
    "x": 2360,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r0_c17_multiply",
    "x": 2500,
    "y": 35,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r0_c18_tanh",
    "x": 2640,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r0_c19_subtract",
    "x": 2780,
    "y": 35,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r0_c20_conj",
    "x": 2920,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r0_c21_cos",
    "x": 3060,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r0_c22_divide",
    "x": 3200,
    "y": 35,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r0_c23_log",
    "x": 3340,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r0_c24_atan",
    "x": 3480,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r0_c25_proj",
    "x": 3620,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r0_c26_asinh",
    "x": 3760,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r0_c27_acos",
    "x": 3900,
    "y": 40,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_r0",
    "x": 4040,
    "y": 37,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r1",
    "x": 20,
    "y": 145,
    "width": 70,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.30 + 0.25i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r1_c0_sin",
    "x": 120,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r1_c1_sqrt",
    "x": 260,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r1_c2_multiply",
    "x": 400,
    "y": 135,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r1_c3_tanh",
    "x": 540,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r1_c4_subtract",
    "x": 680,
    "y": 135,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r1_c5_conj",
    "x": 820,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r1_c6_cos",
    "x": 960,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r1_c7_divide",
    "x": 1100,
    "y": 135,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r1_c8_log",
    "x": 1240,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r1_c9_atan",
    "x": 1380,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r1_c10_proj",
    "x": 1520,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r1_c11_asinh",
    "x": 1660,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r1_c12_acos",
    "x": 1800,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r1_c13_sin",
    "x": 1940,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r1_c14_add",
    "x": 2080,
    "y": 135,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r1_c15_sqrt",
    "x": 2220,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r1_c16_multiply",
    "x": 2360,
    "y": 135,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r1_c17_tanh",
    "x": 2500,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r1_c18_subtract",
    "x": 2640,
    "y": 135,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r1_c19_conj",
    "x": 2780,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r1_c20_cos",
    "x": 2920,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r1_c21_divide",
    "x": 3060,
    "y": 135,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r1_c22_log",
    "x": 3200,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r1_c23_atan",
    "x": 3340,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r1_c24_proj",
    "x": 3480,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r1_c25_asinh",
    "x": 3620,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r1_c26_acos",
    "x": 3760,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r1_c27_sin",
    "x": 3900,
    "y": 140,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_r1",
    "x": 4040,
    "y": 137,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r2",
    "x": 20,
    "y": 245,
    "width": 70,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.40 + 0.15i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r2_c0_sqrt",
    "x": 120,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r2_c1_multiply",
    "x": 260,
    "y": 235,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r2_c2_tanh",
    "x": 400,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r2_c3_subtract",
    "x": 540,
    "y": 235,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r2_c4_conj",
    "x": 680,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r2_c5_cos",
    "x": 820,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r2_c6_divide",
    "x": 960,
    "y": 235,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r2_c7_log",
    "x": 1100,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r2_c8_atan",
    "x": 1240,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r2_c9_proj",
    "x": 1380,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r2_c10_asinh",
    "x": 1520,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r2_c11_acos",
    "x": 1660,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r2_c12_sin",
    "x": 1800,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r2_c13_add",
    "x": 1940,
    "y": 235,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r2_c14_sqrt",
    "x": 2080,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r2_c15_multiply",
    "x": 2220,
    "y": 235,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r2_c16_tanh",
    "x": 2360,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r2_c17_subtract",
    "x": 2500,
    "y": 235,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r2_c18_conj",
    "x": 2640,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r2_c19_cos",
    "x": 2780,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r2_c20_divide",
    "x": 2920,
    "y": 235,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r2_c21_log",
    "x": 3060,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r2_c22_atan",
    "x": 3200,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r2_c23_proj",
    "x": 3340,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r2_c24_asinh",
    "x": 3480,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r2_c25_acos",
    "x": 3620,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r2_c26_sin",
    "x": 3760,
    "y": 240,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r2_c27_add",
    "x": 3900,
    "y": 235,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_r2",
    "x": 4040,
    "y": 237,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r3",
    "x": 20,
    "y": 345,
    "width": 70,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.50 + 0.05i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r3_c0_sin",
    "x": 120,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r3_c1_tanh",
    "x": 260,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r3_c2_subtract",
    "x": 400,
    "y": 335,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r3_c3_conj",
    "x": 540,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r3_c4_cos",
    "x": 680,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r3_c5_divide",
    "x": 820,
    "y": 335,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r3_c6_log",
    "x": 960,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r3_c7_atan",
    "x": 1100,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r3_c8_proj",
    "x": 1240,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r3_c9_asinh",
    "x": 1380,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r3_c10_acos",
    "x": 1520,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r3_c11_sin",
    "x": 1660,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r3_c12_add",
    "x": 1800,
    "y": 335,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r3_c13_sqrt",
    "x": 1940,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r3_c14_multiply",
    "x": 2080,
    "y": 335,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r3_c15_tanh",
    "x": 2220,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r3_c16_subtract",
    "x": 2360,
    "y": 335,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r3_c17_conj",
    "x": 2500,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r3_c18_cos",
    "x": 2640,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r3_c19_divide",
    "x": 2780,
    "y": 335,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r3_c20_log",
    "x": 2920,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r3_c21_atan",
    "x": 3060,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r3_c22_proj",
    "x": 3200,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r3_c23_asinh",
    "x": 3340,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r3_c24_acos",
    "x": 3480,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r3_c25_sin",
    "x": 3620,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r3_c26_add",
    "x": 3760,
    "y": 335,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r3_c27_sqrt",
    "x": 3900,
    "y": 340,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_r3",
    "x": 4040,
    "y": 337,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r4",
    "x": 20,
    "y": 445,
    "width": 70,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.60 - 0.05i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r4_c0_tanh",
    "x": 120,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r4_c1_subtract",
    "x": 260,
    "y": 435,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r4_c2_conj",
    "x": 400,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r4_c3_cos",
    "x": 540,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r4_c4_divide",
    "x": 680,
    "y": 435,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r4_c5_log",
    "x": 820,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r4_c6_atan",
    "x": 960,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r4_c7_proj",
    "x": 1100,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r4_c8_asinh",
    "x": 1240,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r4_c9_acos",
    "x": 1380,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r4_c10_sin",
    "x": 1520,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r4_c11_add",
    "x": 1660,
    "y": 435,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r4_c12_sqrt",
    "x": 1800,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r4_c13_multiply",
    "x": 1940,
    "y": 435,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r4_c14_tanh",
    "x": 2080,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r4_c15_subtract",
    "x": 2220,
    "y": 435,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r4_c16_conj",
    "x": 2360,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r4_c17_cos",
    "x": 2500,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r4_c18_divide",
    "x": 2640,
    "y": 435,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r4_c19_log",
    "x": 2780,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r4_c20_atan",
    "x": 2920,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r4_c21_proj",
    "x": 3060,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r4_c22_asinh",
    "x": 3200,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r4_c23_acos",
    "x": 3340,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r4_c24_sin",
    "x": 3480,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r4_c25_add",
    "x": 3620,
    "y": 435,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r4_c26_sqrt",
    "x": 3760,
    "y": 440,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r4_c27_multiply",
    "x": 3900,
    "y": 435,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_r4",
    "x": 4040,
    "y": 437,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r5",
    "x": 20,
    "y": 545,
    "width": 70,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.70 - 0.15i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r5_c0_sin",
    "x": 120,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r5_c1_conj",
    "x": 260,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r5_c2_cos",
    "x": 400,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r5_c3_divide",
    "x": 540,
    "y": 535,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r5_c4_log",
    "x": 680,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r5_c5_atan",
    "x": 820,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r5_c6_proj",
    "x": 960,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r5_c7_asinh",
    "x": 1100,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r5_c8_acos",
    "x": 1240,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r5_c9_sin",
    "x": 1380,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r5_c10_add",
    "x": 1520,
    "y": 535,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r5_c11_sqrt",
    "x": 1660,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r5_c12_multiply",
    "x": 1800,
    "y": 535,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r5_c13_tanh",
    "x": 1940,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r5_c14_subtract",
    "x": 2080,
    "y": 535,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r5_c15_conj",
    "x": 2220,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r5_c16_cos",
    "x": 2360,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r5_c17_divide",
    "x": 2500,
    "y": 535,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r5_c18_log",
    "x": 2640,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r5_c19_atan",
    "x": 2780,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r5_c20_proj",
    "x": 2920,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r5_c21_asinh",
    "x": 3060,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r5_c22_acos",
    "x": 3200,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r5_c23_sin",
    "x": 3340,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r5_c24_add",
    "x": 3480,
    "y": 535,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r5_c25_sqrt",
    "x": 3620,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r5_c26_multiply",
    "x": 3760,
    "y": 535,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r5_c27_tanh",
    "x": 3900,
    "y": 540,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_r5",
    "x": 4040,
    "y": 537,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r6",
    "x": 20,
    "y": 645,
    "width": 70,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.80 - 0.25i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r6_c0_conj",
    "x": 120,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r6_c1_cos",
    "x": 260,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r6_c2_divide",
    "x": 400,
    "y": 635,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r6_c3_log",
    "x": 540,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r6_c4_atan",
    "x": 680,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r6_c5_proj",
    "x": 820,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r6_c6_asinh",
    "x": 960,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r6_c7_acos",
    "x": 1100,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r6_c8_sin",
    "x": 1240,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r6_c9_add",
    "x": 1380,
    "y": 635,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r6_c10_sqrt",
    "x": 1520,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r6_c11_multiply",
    "x": 1660,
    "y": 635,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r6_c12_tanh",
    "x": 1800,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r6_c13_subtract",
    "x": 1940,
    "y": 635,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r6_c14_conj",
    "x": 2080,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r6_c15_cos",
    "x": 2220,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r6_c16_divide",
    "x": 2360,
    "y": 635,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r6_c17_log",
    "x": 2500,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r6_c18_atan",
    "x": 2640,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r6_c19_proj",
    "x": 2780,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r6_c20_asinh",
    "x": 2920,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r6_c21_acos",
    "x": 3060,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r6_c22_sin",
    "x": 3200,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r6_c23_add",
    "x": 3340,
    "y": 635,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r6_c24_sqrt",
    "x": 3480,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r6_c25_multiply",
    "x": 3620,
    "y": 635,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r6_c26_tanh",
    "x": 3760,
    "y": 640,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r6_c27_subtract",
    "x": 3900,
    "y": 635,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_r6",
    "x": 4040,
    "y": 637,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r7",
    "x": 20,
    "y": 745,
    "width": 70,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.90 - 0.35i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r7_c0_cos",
    "x": 120,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r7_c1_divide",
    "x": 260,
    "y": 735,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r7_c2_log",
    "x": 400,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r7_c3_atan",
    "x": 540,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r7_c4_proj",
    "x": 680,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r7_c5_asinh",
    "x": 820,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r7_c6_acos",
    "x": 960,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r7_c7_sin",
    "x": 1100,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r7_c8_add",
    "x": 1240,
    "y": 735,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r7_c9_sqrt",
    "x": 1380,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r7_c10_multiply",
    "x": 1520,
    "y": 735,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r7_c11_tanh",
    "x": 1660,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r7_c12_subtract",
    "x": 1800,
    "y": 735,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r7_c13_conj",
    "x": 1940,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r7_c14_cos",
    "x": 2080,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r7_c15_divide",
    "x": 2220,
    "y": 735,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r7_c16_log",
    "x": 2360,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r7_c17_atan",
    "x": 2500,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r7_c18_proj",
    "x": 2640,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r7_c19_asinh",
    "x": 2780,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r7_c20_acos",
    "x": 2920,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r7_c21_sin",
    "x": 3060,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r7_c22_add",
    "x": 3200,
    "y": 735,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r7_c23_sqrt",
    "x": 3340,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r7_c24_multiply",
    "x": 3480,
    "y": 735,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r7_c25_tanh",
    "x": 3620,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r7_c26_subtract",
    "x": 3760,
    "y": 735,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r7_c27_conj",
    "x": 3900,
    "y": 740,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_r7",
    "x": 4040,
    "y": 737,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r8",
    "x": 20,
    "y": 845,
    "width": 70,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "1.00 - 0.45i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r8_c0_sin",
    "x": 120,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r8_c1_log",
    "x": 260,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r8_c2_atan",
    "x": 400,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r8_c3_proj",
    "x": 540,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r8_c4_asinh",
    "x": 680,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r8_c5_acos",
    "x": 820,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r8_c6_sin",
    "x": 960,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r8_c7_add",
    "x": 1100,
    "y": 835,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r8_c8_sqrt",
    "x": 1240,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r8_c9_multiply",
    "x": 1380,
    "y": 835,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r8_c10_tanh",
    "x": 1520,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r8_c11_subtract",
    "x": 1660,
    "y": 835,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r8_c12_conj",
    "x": 1800,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r8_c13_cos",
    "x": 1940,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r8_c14_divide",
    "x": 2080,
    "y": 835,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r8_c15_log",
    "x": 2220,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r8_c16_atan",
    "x": 2360,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r8_c17_proj",
    "x": 2500,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r8_c18_asinh",
    "x": 2640,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r8_c19_acos",
    "x": 2780,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r8_c20_sin",
    "x": 2920,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r8_c21_add",
    "x": 3060,
    "y": 835,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r8_c22_sqrt",
    "x": 3200,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r8_c23_multiply",
    "x": 3340,
    "y": 835,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r8_c24_tanh",
    "x": 3480,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r8_c25_subtract",
    "x": 3620,
    "y": 835,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r8_c26_conj",
    "x": 3760,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r8_c27_cos",
    "x": 3900,
    "y": 840,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_r8",
    "x": 4040,
    "y": 837,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r9",
    "x": 20,
    "y": 945,
    "width": 70,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "std::complex<double>",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "1.10 - 0.55i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r9_c0_log",
    "x": 120,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r9_c1_atan",
    "x": 260,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r9_c2_proj",
    "x": 400,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r9_c3_asinh",
    "x": 540,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r9_c4_acos",
    "x": 680,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r9_c5_sin",
    "x": 820,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r9_c6_add",
    "x": 960,
    "y": 935,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r9_c7_sqrt",
    "x": 1100,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r9_c8_multiply",
    "x": 1240,
    "y": 935,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r9_c9_tanh",
    "x": 1380,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r9_c10_subtract",
    "x": 1520,
    "y": 935,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r9_c11_conj",
    "x": 1660,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r9_c12_cos",
    "x": 1800,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r9_c13_divide",
    "x": 1940,
    "y": 935,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_r9_c14_log",
    "x": 2080,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_r9_c15_atan",
    "x": 2220,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_r9_c16_proj",
    "x": 2360,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Proj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_r9_c17_asinh",
    "x": 2500,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_r9_c18_acos",
    "x": 2640,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_r9_c19_sin",
    "x": 2780,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_r9_c20_add",
    "x": 2920,
    "y": 935,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_r9_c21_sqrt",
    "x": 3060,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sqrt",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_r9_c22_multiply",
    "x": 3200,
    "y": 935,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Multiply",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_r9_c23_tanh",
    "x": 3340,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_r9_c24_subtract",
    "x": 3480,
    "y": 935,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Subtract",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_r9_c25_conj",
    "x": 3620,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Conj",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_r9_c26_cos",
    "x": 3760,
    "y": 940,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cos",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_r9_c27_divide",
    "x": 3900,
    "y": 935,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Divide",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_r9",
    "x": 4040,
    "y": 937,
    "width": 69,
    "height": 55,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HwRaspiZero_Console_output",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r0_out1_to_node_r0_c0_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r0",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c0_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c0_sin_out1_to_node_r0_c1_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c0_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c1_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r0_out1_to_node_r0_c1_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r0",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c1_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c1_add_out1_to_node_r0_c2_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c1_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c2_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c2_sqrt_out1_to_node_r0_c3_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c2_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c3_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c1_add_out1_to_node_r0_c3_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c1_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c3_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c3_multiply_out1_to_node_r0_c4_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c3_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c4_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c4_tanh_out1_to_node_r0_c5_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c4_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c5_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c3_multiply_out1_to_node_r0_c5_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c3_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c5_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c5_subtract_out1_to_node_r0_c6_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c5_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c6_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c6_conj_out1_to_node_r0_c7_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c6_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c7_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c7_cos_out1_to_node_r0_c8_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c7_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c8_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c6_conj_out1_to_node_r0_c8_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c6_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c8_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c8_divide_out1_to_node_r0_c9_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c8_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c9_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c9_log_out1_to_node_r0_c10_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c9_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c10_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c10_atan_out1_to_node_r0_c11_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c10_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c11_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c11_proj_out1_to_node_r0_c12_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c11_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c12_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c12_asinh_out1_to_node_r0_c13_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c12_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c13_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c13_acos_out1_to_node_r0_c14_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c13_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c14_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c14_sin_out1_to_node_r0_c15_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c14_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c15_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c13_acos_out1_to_node_r0_c15_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c13_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c15_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c15_add_out1_to_node_r0_c16_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c15_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c16_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c16_sqrt_out1_to_node_r0_c17_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c16_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c17_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c15_add_out1_to_node_r0_c17_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c15_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c17_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c17_multiply_out1_to_node_r0_c18_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c17_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c18_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c18_tanh_out1_to_node_r0_c19_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c18_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c19_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c17_multiply_out1_to_node_r0_c19_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c17_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c19_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c19_subtract_out1_to_node_r0_c20_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c19_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c20_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c20_conj_out1_to_node_r0_c21_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c20_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c21_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c21_cos_out1_to_node_r0_c22_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c21_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c22_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c20_conj_out1_to_node_r0_c22_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c20_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c22_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c22_divide_out1_to_node_r0_c23_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c22_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c23_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c23_log_out1_to_node_r0_c24_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c23_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c24_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c24_atan_out1_to_node_r0_c25_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c24_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c25_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c25_proj_out1_to_node_r0_c26_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c25_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c26_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c26_asinh_out1_to_node_r0_c27_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c26_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r0_c27_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r0_c27_acos_out1_to_node_out_r0_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r0_c27_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_out_r0",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r1_out1_to_node_r1_c0_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r1",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c0_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c0_sin_out1_to_node_r1_c1_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c0_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c1_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c1_sqrt_out1_to_node_r1_c2_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c1_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c2_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c0_sin_out1_to_node_r1_c2_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c0_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c2_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c2_multiply_out1_to_node_r1_c3_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c2_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c3_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c3_tanh_out1_to_node_r1_c4_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c3_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c4_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c2_multiply_out1_to_node_r1_c4_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c2_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c4_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c4_subtract_out1_to_node_r1_c5_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c4_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c5_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c5_conj_out1_to_node_r1_c6_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c5_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c6_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c6_cos_out1_to_node_r1_c7_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c6_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c7_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c5_conj_out1_to_node_r1_c7_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c5_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c7_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c7_divide_out1_to_node_r1_c8_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c7_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c8_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c8_log_out1_to_node_r1_c9_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c8_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c9_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c9_atan_out1_to_node_r1_c10_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c9_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c10_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c10_proj_out1_to_node_r1_c11_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c10_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c11_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c11_asinh_out1_to_node_r1_c12_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c11_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c12_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c12_acos_out1_to_node_r1_c13_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c12_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c13_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c13_sin_out1_to_node_r1_c14_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c13_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c14_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c12_acos_out1_to_node_r1_c14_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c12_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c14_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c14_add_out1_to_node_r1_c15_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c14_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c15_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c15_sqrt_out1_to_node_r1_c16_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c15_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c16_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c14_add_out1_to_node_r1_c16_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c14_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c16_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c16_multiply_out1_to_node_r1_c17_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c16_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c17_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c17_tanh_out1_to_node_r1_c18_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c17_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c18_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c16_multiply_out1_to_node_r1_c18_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c16_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c18_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c18_subtract_out1_to_node_r1_c19_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c18_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c19_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c19_conj_out1_to_node_r1_c20_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c19_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c20_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c20_cos_out1_to_node_r1_c21_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c20_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c21_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c19_conj_out1_to_node_r1_c21_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c19_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c21_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c21_divide_out1_to_node_r1_c22_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c21_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c22_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c22_log_out1_to_node_r1_c23_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c22_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c23_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c23_atan_out1_to_node_r1_c24_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c23_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c24_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c24_proj_out1_to_node_r1_c25_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c24_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c25_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c25_asinh_out1_to_node_r1_c26_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c25_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c26_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c26_acos_out1_to_node_r1_c27_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c26_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r1_c27_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r1_c27_sin_out1_to_node_out_r1_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r1_c27_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_out_r1",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r2_out1_to_node_r2_c0_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r2",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c0_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c0_sqrt_out1_to_node_r2_c1_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c0_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c1_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r2_out1_to_node_r2_c1_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r2",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c1_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c1_multiply_out1_to_node_r2_c2_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c1_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c2_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c2_tanh_out1_to_node_r2_c3_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c2_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c3_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c1_multiply_out1_to_node_r2_c3_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c1_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c3_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c3_subtract_out1_to_node_r2_c4_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c3_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c4_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c4_conj_out1_to_node_r2_c5_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c4_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c5_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c5_cos_out1_to_node_r2_c6_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c5_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c6_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c4_conj_out1_to_node_r2_c6_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c4_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c6_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c6_divide_out1_to_node_r2_c7_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c6_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c7_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c7_log_out1_to_node_r2_c8_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c7_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c8_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c8_atan_out1_to_node_r2_c9_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c8_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c9_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c9_proj_out1_to_node_r2_c10_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c9_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c10_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c10_asinh_out1_to_node_r2_c11_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c10_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c11_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c11_acos_out1_to_node_r2_c12_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c11_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c12_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c12_sin_out1_to_node_r2_c13_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c12_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c13_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c11_acos_out1_to_node_r2_c13_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c11_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c13_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c13_add_out1_to_node_r2_c14_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c13_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c14_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c14_sqrt_out1_to_node_r2_c15_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c14_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c15_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c13_add_out1_to_node_r2_c15_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c13_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c15_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c15_multiply_out1_to_node_r2_c16_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c15_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c16_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c16_tanh_out1_to_node_r2_c17_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c16_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c17_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c15_multiply_out1_to_node_r2_c17_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c15_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c17_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c17_subtract_out1_to_node_r2_c18_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c17_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c18_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c18_conj_out1_to_node_r2_c19_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c18_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c19_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c19_cos_out1_to_node_r2_c20_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c19_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c20_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c18_conj_out1_to_node_r2_c20_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c18_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c20_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c20_divide_out1_to_node_r2_c21_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c20_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c21_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c21_log_out1_to_node_r2_c22_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c21_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c22_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c22_atan_out1_to_node_r2_c23_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c22_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c23_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c23_proj_out1_to_node_r2_c24_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c23_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c24_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c24_asinh_out1_to_node_r2_c25_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c24_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c25_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c25_acos_out1_to_node_r2_c26_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c25_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c26_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c26_sin_out1_to_node_r2_c27_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c26_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c27_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c25_acos_out1_to_node_r2_c27_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c25_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r2_c27_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r2_c27_add_out1_to_node_out_r2_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r2_c27_add",
      "port": "out1"
    },
    "target": {
      "node": "node_out_r2",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r3_out1_to_node_r3_c0_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r3",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c0_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c0_sin_out1_to_node_r3_c1_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c0_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c1_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c1_tanh_out1_to_node_r3_c2_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c1_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c2_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c0_sin_out1_to_node_r3_c2_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c0_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c2_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c2_subtract_out1_to_node_r3_c3_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c2_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c3_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c3_conj_out1_to_node_r3_c4_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c3_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c4_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c4_cos_out1_to_node_r3_c5_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c4_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c5_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c3_conj_out1_to_node_r3_c5_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c3_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c5_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c5_divide_out1_to_node_r3_c6_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c5_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c6_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c6_log_out1_to_node_r3_c7_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c6_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c7_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c7_atan_out1_to_node_r3_c8_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c7_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c8_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c8_proj_out1_to_node_r3_c9_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c8_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c9_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c9_asinh_out1_to_node_r3_c10_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c9_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c10_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c10_acos_out1_to_node_r3_c11_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c10_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c11_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c11_sin_out1_to_node_r3_c12_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c11_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c12_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c10_acos_out1_to_node_r3_c12_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c10_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c12_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c12_add_out1_to_node_r3_c13_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c12_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c13_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c13_sqrt_out1_to_node_r3_c14_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c13_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c14_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c12_add_out1_to_node_r3_c14_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c12_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c14_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c14_multiply_out1_to_node_r3_c15_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c14_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c15_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c15_tanh_out1_to_node_r3_c16_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c15_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c16_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c14_multiply_out1_to_node_r3_c16_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c14_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c16_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c16_subtract_out1_to_node_r3_c17_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c16_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c17_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c17_conj_out1_to_node_r3_c18_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c17_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c18_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c18_cos_out1_to_node_r3_c19_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c18_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c19_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c17_conj_out1_to_node_r3_c19_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c17_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c19_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c19_divide_out1_to_node_r3_c20_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c19_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c20_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c20_log_out1_to_node_r3_c21_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c20_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c21_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c21_atan_out1_to_node_r3_c22_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c21_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c22_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c22_proj_out1_to_node_r3_c23_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c22_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c23_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c23_asinh_out1_to_node_r3_c24_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c23_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c24_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c24_acos_out1_to_node_r3_c25_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c24_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c25_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c25_sin_out1_to_node_r3_c26_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c25_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c26_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c24_acos_out1_to_node_r3_c26_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c24_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c26_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c26_add_out1_to_node_r3_c27_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c26_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r3_c27_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r3_c27_sqrt_out1_to_node_out_r3_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r3_c27_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_out_r3",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r4_out1_to_node_r4_c0_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r4",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c0_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c0_tanh_out1_to_node_r4_c1_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c0_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c1_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r4_out1_to_node_r4_c1_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r4",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c1_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c1_subtract_out1_to_node_r4_c2_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c1_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c2_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c2_conj_out1_to_node_r4_c3_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c2_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c3_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c3_cos_out1_to_node_r4_c4_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c3_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c4_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c2_conj_out1_to_node_r4_c4_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c2_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c4_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c4_divide_out1_to_node_r4_c5_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c4_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c5_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c5_log_out1_to_node_r4_c6_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c5_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c6_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c6_atan_out1_to_node_r4_c7_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c6_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c7_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c7_proj_out1_to_node_r4_c8_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c7_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c8_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c8_asinh_out1_to_node_r4_c9_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c8_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c9_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c9_acos_out1_to_node_r4_c10_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c9_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c10_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c10_sin_out1_to_node_r4_c11_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c10_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c11_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c9_acos_out1_to_node_r4_c11_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c9_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c11_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c11_add_out1_to_node_r4_c12_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c11_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c12_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c12_sqrt_out1_to_node_r4_c13_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c12_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c13_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c11_add_out1_to_node_r4_c13_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c11_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c13_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c13_multiply_out1_to_node_r4_c14_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c13_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c14_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c14_tanh_out1_to_node_r4_c15_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c14_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c15_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c13_multiply_out1_to_node_r4_c15_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c13_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c15_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c15_subtract_out1_to_node_r4_c16_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c15_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c16_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c16_conj_out1_to_node_r4_c17_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c16_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c17_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c17_cos_out1_to_node_r4_c18_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c17_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c18_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c16_conj_out1_to_node_r4_c18_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c16_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c18_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c18_divide_out1_to_node_r4_c19_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c18_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c19_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c19_log_out1_to_node_r4_c20_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c19_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c20_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c20_atan_out1_to_node_r4_c21_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c20_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c21_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c21_proj_out1_to_node_r4_c22_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c21_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c22_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c22_asinh_out1_to_node_r4_c23_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c22_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c23_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c23_acos_out1_to_node_r4_c24_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c23_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c24_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c24_sin_out1_to_node_r4_c25_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c24_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c25_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c23_acos_out1_to_node_r4_c25_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c23_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c25_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c25_add_out1_to_node_r4_c26_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c25_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c26_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c26_sqrt_out1_to_node_r4_c27_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c26_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c27_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c25_add_out1_to_node_r4_c27_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c25_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r4_c27_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r4_c27_multiply_out1_to_node_out_r4_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r4_c27_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_out_r4",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r5_out1_to_node_r5_c0_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r5",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c0_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c0_sin_out1_to_node_r5_c1_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c0_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c1_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c1_conj_out1_to_node_r5_c2_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c1_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c2_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c2_cos_out1_to_node_r5_c3_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c2_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c3_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c1_conj_out1_to_node_r5_c3_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c1_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c3_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c3_divide_out1_to_node_r5_c4_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c3_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c4_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c4_log_out1_to_node_r5_c5_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c4_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c5_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c5_atan_out1_to_node_r5_c6_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c5_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c6_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c6_proj_out1_to_node_r5_c7_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c6_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c7_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c7_asinh_out1_to_node_r5_c8_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c7_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c8_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c8_acos_out1_to_node_r5_c9_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c8_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c9_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c9_sin_out1_to_node_r5_c10_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c9_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c10_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c8_acos_out1_to_node_r5_c10_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c8_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c10_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c10_add_out1_to_node_r5_c11_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c10_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c11_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c11_sqrt_out1_to_node_r5_c12_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c11_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c12_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c10_add_out1_to_node_r5_c12_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c10_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c12_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c12_multiply_out1_to_node_r5_c13_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c12_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c13_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c13_tanh_out1_to_node_r5_c14_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c13_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c14_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c12_multiply_out1_to_node_r5_c14_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c12_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c14_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c14_subtract_out1_to_node_r5_c15_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c14_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c15_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c15_conj_out1_to_node_r5_c16_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c15_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c16_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c16_cos_out1_to_node_r5_c17_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c16_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c17_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c15_conj_out1_to_node_r5_c17_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c15_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c17_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c17_divide_out1_to_node_r5_c18_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c17_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c18_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c18_log_out1_to_node_r5_c19_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c18_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c19_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c19_atan_out1_to_node_r5_c20_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c19_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c20_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c20_proj_out1_to_node_r5_c21_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c20_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c21_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c21_asinh_out1_to_node_r5_c22_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c21_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c22_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c22_acos_out1_to_node_r5_c23_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c22_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c23_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c23_sin_out1_to_node_r5_c24_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c23_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c24_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c22_acos_out1_to_node_r5_c24_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c22_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c24_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c24_add_out1_to_node_r5_c25_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c24_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c25_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c25_sqrt_out1_to_node_r5_c26_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c25_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c26_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c24_add_out1_to_node_r5_c26_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c24_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c26_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c26_multiply_out1_to_node_r5_c27_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c26_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r5_c27_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r5_c27_tanh_out1_to_node_out_r5_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r5_c27_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_out_r5",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r6_out1_to_node_r6_c0_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r6",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c0_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c0_conj_out1_to_node_r6_c1_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c0_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c1_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c1_cos_out1_to_node_r6_c2_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c1_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c2_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c0_conj_out1_to_node_r6_c2_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c0_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c2_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c2_divide_out1_to_node_r6_c3_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c2_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c3_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c3_log_out1_to_node_r6_c4_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c3_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c4_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c4_atan_out1_to_node_r6_c5_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c4_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c5_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c5_proj_out1_to_node_r6_c6_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c5_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c6_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c6_asinh_out1_to_node_r6_c7_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c6_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c7_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c7_acos_out1_to_node_r6_c8_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c7_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c8_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c8_sin_out1_to_node_r6_c9_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c8_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c9_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c7_acos_out1_to_node_r6_c9_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c7_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c9_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c9_add_out1_to_node_r6_c10_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c9_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c10_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c10_sqrt_out1_to_node_r6_c11_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c10_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c11_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c9_add_out1_to_node_r6_c11_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c9_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c11_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c11_multiply_out1_to_node_r6_c12_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c11_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c12_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c12_tanh_out1_to_node_r6_c13_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c12_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c13_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c11_multiply_out1_to_node_r6_c13_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c11_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c13_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c13_subtract_out1_to_node_r6_c14_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c13_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c14_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c14_conj_out1_to_node_r6_c15_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c14_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c15_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c15_cos_out1_to_node_r6_c16_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c15_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c16_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c14_conj_out1_to_node_r6_c16_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c14_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c16_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c16_divide_out1_to_node_r6_c17_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c16_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c17_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c17_log_out1_to_node_r6_c18_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c17_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c18_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c18_atan_out1_to_node_r6_c19_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c18_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c19_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c19_proj_out1_to_node_r6_c20_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c19_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c20_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c20_asinh_out1_to_node_r6_c21_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c20_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c21_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c21_acos_out1_to_node_r6_c22_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c21_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c22_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c22_sin_out1_to_node_r6_c23_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c22_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c23_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c21_acos_out1_to_node_r6_c23_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c21_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c23_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c23_add_out1_to_node_r6_c24_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c23_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c24_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c24_sqrt_out1_to_node_r6_c25_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c24_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c25_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c23_add_out1_to_node_r6_c25_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c23_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c25_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c25_multiply_out1_to_node_r6_c26_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c25_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c26_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c26_tanh_out1_to_node_r6_c27_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c26_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c27_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c25_multiply_out1_to_node_r6_c27_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c25_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r6_c27_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r6_c27_subtract_out1_to_node_out_r6_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r6_c27_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_out_r6",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r7_out1_to_node_r7_c0_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r7",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c0_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c0_cos_out1_to_node_r7_c1_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c0_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c1_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r7_out1_to_node_r7_c1_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r7",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c1_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c1_divide_out1_to_node_r7_c2_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c1_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c2_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c2_log_out1_to_node_r7_c3_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c2_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c3_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c3_atan_out1_to_node_r7_c4_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c3_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c4_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c4_proj_out1_to_node_r7_c5_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c4_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c5_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c5_asinh_out1_to_node_r7_c6_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c5_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c6_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c6_acos_out1_to_node_r7_c7_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c6_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c7_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c7_sin_out1_to_node_r7_c8_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c7_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c8_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c6_acos_out1_to_node_r7_c8_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c6_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c8_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c8_add_out1_to_node_r7_c9_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c8_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c9_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c9_sqrt_out1_to_node_r7_c10_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c9_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c10_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c8_add_out1_to_node_r7_c10_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c8_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c10_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c10_multiply_out1_to_node_r7_c11_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c10_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c11_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c11_tanh_out1_to_node_r7_c12_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c11_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c12_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c10_multiply_out1_to_node_r7_c12_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c10_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c12_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c12_subtract_out1_to_node_r7_c13_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c12_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c13_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c13_conj_out1_to_node_r7_c14_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c13_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c14_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c14_cos_out1_to_node_r7_c15_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c14_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c15_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c13_conj_out1_to_node_r7_c15_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c13_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c15_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c15_divide_out1_to_node_r7_c16_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c15_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c16_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c16_log_out1_to_node_r7_c17_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c16_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c17_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c17_atan_out1_to_node_r7_c18_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c17_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c18_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c18_proj_out1_to_node_r7_c19_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c18_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c19_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c19_asinh_out1_to_node_r7_c20_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c19_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c20_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c20_acos_out1_to_node_r7_c21_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c20_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c21_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c21_sin_out1_to_node_r7_c22_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c21_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c22_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c20_acos_out1_to_node_r7_c22_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c20_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c22_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c22_add_out1_to_node_r7_c23_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c22_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c23_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c23_sqrt_out1_to_node_r7_c24_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c23_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c24_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c22_add_out1_to_node_r7_c24_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c22_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c24_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c24_multiply_out1_to_node_r7_c25_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c24_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c25_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c25_tanh_out1_to_node_r7_c26_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c25_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c26_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c24_multiply_out1_to_node_r7_c26_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c24_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c26_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c26_subtract_out1_to_node_r7_c27_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c26_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r7_c27_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r7_c27_conj_out1_to_node_out_r7_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r7_c27_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_out_r7",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r8_out1_to_node_r8_c0_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r8",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c0_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c0_sin_out1_to_node_r8_c1_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c0_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c1_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c1_log_out1_to_node_r8_c2_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c1_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c2_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c2_atan_out1_to_node_r8_c3_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c2_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c3_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c3_proj_out1_to_node_r8_c4_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c3_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c4_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c4_asinh_out1_to_node_r8_c5_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c4_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c5_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c5_acos_out1_to_node_r8_c6_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c5_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c6_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c6_sin_out1_to_node_r8_c7_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c6_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c7_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c5_acos_out1_to_node_r8_c7_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c5_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c7_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c7_add_out1_to_node_r8_c8_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c7_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c8_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c8_sqrt_out1_to_node_r8_c9_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c8_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c9_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c7_add_out1_to_node_r8_c9_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c7_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c9_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c9_multiply_out1_to_node_r8_c10_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c9_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c10_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c10_tanh_out1_to_node_r8_c11_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c10_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c11_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c9_multiply_out1_to_node_r8_c11_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c9_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c11_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c11_subtract_out1_to_node_r8_c12_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c11_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c12_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c12_conj_out1_to_node_r8_c13_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c12_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c13_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c13_cos_out1_to_node_r8_c14_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c13_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c14_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c12_conj_out1_to_node_r8_c14_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c12_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c14_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c14_divide_out1_to_node_r8_c15_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c14_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c15_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c15_log_out1_to_node_r8_c16_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c15_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c16_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c16_atan_out1_to_node_r8_c17_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c16_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c17_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c17_proj_out1_to_node_r8_c18_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c17_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c18_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c18_asinh_out1_to_node_r8_c19_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c18_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c19_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c19_acos_out1_to_node_r8_c20_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c19_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c20_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c20_sin_out1_to_node_r8_c21_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c20_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c21_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c19_acos_out1_to_node_r8_c21_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c19_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c21_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c21_add_out1_to_node_r8_c22_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c21_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c22_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c22_sqrt_out1_to_node_r8_c23_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c22_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c23_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c21_add_out1_to_node_r8_c23_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c21_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c23_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c23_multiply_out1_to_node_r8_c24_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c23_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c24_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c24_tanh_out1_to_node_r8_c25_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c24_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c25_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c23_multiply_out1_to_node_r8_c25_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c23_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c25_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c25_subtract_out1_to_node_r8_c26_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c25_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c26_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c26_conj_out1_to_node_r8_c27_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c26_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r8_c27_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r8_c27_cos_out1_to_node_out_r8_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r8_c27_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_out_r8",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r9_out1_to_node_r9_c0_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r9",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c0_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c0_log_out1_to_node_r9_c1_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c0_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c1_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c1_atan_out1_to_node_r9_c2_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c1_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c2_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c2_proj_out1_to_node_r9_c3_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c2_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c3_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c3_asinh_out1_to_node_r9_c4_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c3_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c4_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c4_acos_out1_to_node_r9_c5_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c4_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c5_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c5_sin_out1_to_node_r9_c6_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c5_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c6_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c4_acos_out1_to_node_r9_c6_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c4_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c6_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c6_add_out1_to_node_r9_c7_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c6_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c7_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c7_sqrt_out1_to_node_r9_c8_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c7_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c8_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c6_add_out1_to_node_r9_c8_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c6_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c8_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c8_multiply_out1_to_node_r9_c9_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c8_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c9_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c9_tanh_out1_to_node_r9_c10_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c9_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c10_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c8_multiply_out1_to_node_r9_c10_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c8_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c10_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c10_subtract_out1_to_node_r9_c11_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c10_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c11_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c11_conj_out1_to_node_r9_c12_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c11_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c12_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c12_cos_out1_to_node_r9_c13_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c12_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c13_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c11_conj_out1_to_node_r9_c13_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c11_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c13_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c13_divide_out1_to_node_r9_c14_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c13_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c14_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c14_log_out1_to_node_r9_c15_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c14_log",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c15_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c15_atan_out1_to_node_r9_c16_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c15_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c16_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c16_proj_out1_to_node_r9_c17_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c16_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c17_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c17_asinh_out1_to_node_r9_c18_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c17_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c18_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c18_acos_out1_to_node_r9_c19_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c18_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c19_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c19_sin_out1_to_node_r9_c20_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c19_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c20_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c18_acos_out1_to_node_r9_c20_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c18_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c20_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c20_add_out1_to_node_r9_c21_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c20_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c21_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c21_sqrt_out1_to_node_r9_c22_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c21_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c22_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c20_add_out1_to_node_r9_c22_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c20_add",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c22_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c22_multiply_out1_to_node_r9_c23_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c22_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c23_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c23_tanh_out1_to_node_r9_c24_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c23_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c24_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c22_multiply_out1_to_node_r9_c24_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c22_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c24_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c24_subtract_out1_to_node_r9_c25_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c24_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c25_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c25_conj_out1_to_node_r9_c26_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c25_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c26_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c26_cos_out1_to_node_r9_c27_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c26_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c27_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c25_conj_out1_to_node_r9_c27_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c25_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_r9_c27_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_r9_c27_divide_out1_to_node_out_r9_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_r9_c27_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_out_r9",
      "port": "Port"
    }
  }
],
});
