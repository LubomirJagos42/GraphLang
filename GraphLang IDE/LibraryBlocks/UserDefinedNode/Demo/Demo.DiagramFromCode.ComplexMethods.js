Demo.DiagramFromCode.ComplexMethods = GraphLang.UserDefinedNode.extend({
NAME: 'Demo.DiagramFromCode.ComplexMethods',
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
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#F2F7FD","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'a+bi');
        shape.attr({"x":21,"y":21,"text-anchor":"middle","text":"a+bi","font-family":"Arial","font-size":11,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },
/**
 *  Diagram reconstructed from generated C++ code (getCppCodeUsingTemplate_desktop): all GraphLang.Math.Complex nodes (std::complex<double>), each result printed to console.
 *  Inputs: zA = 1.5 + 0.5i, zB = 0.3 - 0.8i, Create(3.0, 4.0), Polar(2.0, pi/4).
 */
jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_zA",
    "x": 30,
    "y": 300,
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
    "text": "1.5 + 0.5i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_zB",
    "x": 30,
    "y": 500,
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
    "text": "0.3 - 0.8i",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_re",
    "x": 30,
    "y": 40,
    "width": 30,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "double",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "3.0",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_im",
    "x": 30,
    "y": 90,
    "width": 30,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "double",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "4.0",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_r",
    "x": 30,
    "y": 150,
    "width": 30,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "double",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "2.0",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "const_th",
    "x": 30,
    "y": 200,
    "width": 126,
    "height": 21,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "double",
      "isTerminal": false
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#FFFFFF",
    "color": "#AA2200",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "0.7853981633974483",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Math.Complex.Create",
    "id": "node_cplx_create",
    "x": 260,
    "y": 30,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Create",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_create",
    "x": 420,
    "y": 33.0,
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
    "type": "GraphLang.Math.Complex.Polar",
    "id": "node_cplx_polar",
    "x": 260,
    "y": 105,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Polar",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_polar",
    "x": 420,
    "y": 108.0,
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
    "type": "GraphLang.Math.Complex.Real",
    "id": "node_cplx_real",
    "x": 260,
    "y": 180,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Real",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_real",
    "x": 420,
    "y": 178.0,
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
    "type": "GraphLang.Math.Complex.Imag",
    "id": "node_cplx_imag",
    "x": 260,
    "y": 255,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Imag",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_imag",
    "x": 420,
    "y": 253.0,
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
    "type": "GraphLang.Math.Complex.Abs",
    "id": "node_cplx_abs",
    "x": 260,
    "y": 330,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Abs",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_abs",
    "x": 420,
    "y": 328.0,
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
    "type": "GraphLang.Math.Complex.Arg",
    "id": "node_cplx_arg",
    "x": 260,
    "y": 405,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Arg",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_arg",
    "x": 420,
    "y": 403.0,
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
    "type": "GraphLang.Math.Complex.Norm",
    "id": "node_cplx_norm",
    "x": 260,
    "y": 480,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Norm",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_norm",
    "x": 420,
    "y": 478.0,
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
    "type": "GraphLang.Math.Complex.Conj",
    "id": "node_cplx_conj",
    "x": 260,
    "y": 555,
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
    "id": "node_out_conj",
    "x": 420,
    "y": 553.0,
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
    "type": "GraphLang.Math.Complex.Proj",
    "id": "node_cplx_proj",
    "x": 260,
    "y": 630,
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
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_proj",
    "x": 420,
    "y": 628.0,
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
    "type": "GraphLang.Math.Complex.Exp",
    "id": "node_cplx_exp",
    "x": 260,
    "y": 705,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Exp",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_exp",
    "x": 420,
    "y": 703.0,
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
    "type": "GraphLang.Math.Complex.Log",
    "id": "node_cplx_log",
    "x": 590,
    "y": 30,
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
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_log",
    "x": 750,
    "y": 28.0,
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
    "type": "GraphLang.Math.Complex.Log10",
    "id": "node_cplx_log10",
    "x": 590,
    "y": 105,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Log10",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_log10",
    "x": 750,
    "y": 103.0,
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
    "type": "GraphLang.Math.Complex.Sqrt",
    "id": "node_cplx_sqrt",
    "x": 590,
    "y": 180,
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
    "id": "node_out_sqrt",
    "x": 750,
    "y": 178.0,
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
    "type": "GraphLang.Math.Complex.Add",
    "id": "node_cplx_add",
    "x": 590,
    "y": 255,
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
    "id": "node_out_add",
    "x": 750,
    "y": 258.0,
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
    "type": "GraphLang.Math.Complex.Subtract",
    "id": "node_cplx_subtract",
    "x": 590,
    "y": 330,
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
    "id": "node_out_subtract",
    "x": 750,
    "y": 333.0,
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
    "type": "GraphLang.Math.Complex.Multiply",
    "id": "node_cplx_multiply",
    "x": 590,
    "y": 405,
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
    "id": "node_out_multiply",
    "x": 750,
    "y": 408.0,
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
    "type": "GraphLang.Math.Complex.Divide",
    "id": "node_cplx_divide",
    "x": 590,
    "y": 480,
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
    "id": "node_out_divide",
    "x": 750,
    "y": 483.0,
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
    "type": "GraphLang.Math.Complex.Pow",
    "id": "node_cplx_pow",
    "x": 590,
    "y": 555,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Pow",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_pow",
    "x": 750,
    "y": 558.0,
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
    "type": "GraphLang.Math.Complex.Sin",
    "id": "node_cplx_sin",
    "x": 590,
    "y": 630,
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
    "id": "node_out_sin",
    "x": 750,
    "y": 628.0,
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
    "type": "GraphLang.Math.Complex.Cos",
    "id": "node_cplx_cos",
    "x": 590,
    "y": 705,
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
    "id": "node_out_cos",
    "x": 750,
    "y": 703.0,
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
    "type": "GraphLang.Math.Complex.Tan",
    "id": "node_cplx_tan",
    "x": 920,
    "y": 30,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Tan",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_tan",
    "x": 1080,
    "y": 28.0,
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
    "type": "GraphLang.Math.Complex.Asin",
    "id": "node_cplx_asin",
    "x": 920,
    "y": 105,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Asin",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_asin",
    "x": 1080,
    "y": 103.0,
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
    "type": "GraphLang.Math.Complex.Acos",
    "id": "node_cplx_acos",
    "x": 920,
    "y": 180,
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
    "id": "node_out_acos",
    "x": 1080,
    "y": 178.0,
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
    "type": "GraphLang.Math.Complex.Atan",
    "id": "node_cplx_atan",
    "x": 920,
    "y": 255,
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
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_atan",
    "x": 1080,
    "y": 253.0,
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
    "type": "GraphLang.Math.Complex.Sinh",
    "id": "node_cplx_sinh",
    "x": 920,
    "y": 330,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Sinh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_sinh",
    "x": 1080,
    "y": 328.0,
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
    "type": "GraphLang.Math.Complex.Cosh",
    "id": "node_cplx_cosh",
    "x": 920,
    "y": 405,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Cosh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_cosh",
    "x": 1080,
    "y": 403.0,
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
    "type": "GraphLang.Math.Complex.Tanh",
    "id": "node_cplx_tanh",
    "x": 920,
    "y": 480,
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
    "id": "node_out_tanh",
    "x": 1080,
    "y": 478.0,
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
    "type": "GraphLang.Math.Complex.Asinh",
    "id": "node_cplx_asinh",
    "x": 920,
    "y": 555,
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
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_asinh",
    "x": 1080,
    "y": 553.0,
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
    "type": "GraphLang.Math.Complex.Acosh",
    "id": "node_cplx_acosh",
    "x": 920,
    "y": 630,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Acosh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_acosh",
    "x": 1080,
    "y": 628.0,
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
    "type": "GraphLang.Math.Complex.Atanh",
    "id": "node_cplx_atanh",
    "x": 920,
    "y": 705,
    "width": 100,
    "height": 50,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Math_Complex_Atanh",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HwRaspiZero.Console.output",
    "id": "node_out_atanh",
    "x": 1080,
    "y": 703.0,
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
    "id": "conn_node_cplx_create_out1_to_node_out_create_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_create",
      "port": "out1"
    },
    "target": {
      "node": "node_out_create",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_re_out1_to_node_cplx_create_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_re",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_create",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_im_out1_to_node_cplx_create_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_im",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_create",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_polar_out1_to_node_out_polar_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_polar",
      "port": "out1"
    },
    "target": {
      "node": "node_out_polar",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_r_out1_to_node_cplx_polar_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_r",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_polar",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_th_out1_to_node_cplx_polar_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_th",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_polar",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_real_out1_to_node_out_real_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_real",
      "port": "out1"
    },
    "target": {
      "node": "node_out_real",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_real_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_real",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_imag_out1_to_node_out_imag_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_imag",
      "port": "out1"
    },
    "target": {
      "node": "node_out_imag",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_imag_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_imag",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_abs_out1_to_node_out_abs_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_abs",
      "port": "out1"
    },
    "target": {
      "node": "node_out_abs",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_abs_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_abs",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_arg_out1_to_node_out_arg_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_arg",
      "port": "out1"
    },
    "target": {
      "node": "node_out_arg",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_arg_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_arg",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_norm_out1_to_node_out_norm_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_norm",
      "port": "out1"
    },
    "target": {
      "node": "node_out_norm",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_norm_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_norm",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_conj_out1_to_node_out_conj_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_conj",
      "port": "out1"
    },
    "target": {
      "node": "node_out_conj",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_conj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_conj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_proj_out1_to_node_out_proj_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_proj",
      "port": "out1"
    },
    "target": {
      "node": "node_out_proj",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_proj_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_proj",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_exp_out1_to_node_out_exp_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_exp",
      "port": "out1"
    },
    "target": {
      "node": "node_out_exp",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_exp_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_exp",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_log_out1_to_node_out_log_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_log",
      "port": "out1"
    },
    "target": {
      "node": "node_out_log",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_log_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_log",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_log10_out1_to_node_out_log10_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_log10",
      "port": "out1"
    },
    "target": {
      "node": "node_out_log10",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_log10_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_log10",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_sqrt_out1_to_node_out_sqrt_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_sqrt",
      "port": "out1"
    },
    "target": {
      "node": "node_out_sqrt",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_sqrt_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_sqrt",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_add_out1_to_node_out_add_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_add",
      "port": "out1"
    },
    "target": {
      "node": "node_out_add",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_add_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_add",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_add_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_add",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_subtract_out1_to_node_out_subtract_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_subtract",
      "port": "out1"
    },
    "target": {
      "node": "node_out_subtract",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_subtract_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_subtract",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_subtract_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_subtract",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_multiply_out1_to_node_out_multiply_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_multiply",
      "port": "out1"
    },
    "target": {
      "node": "node_out_multiply",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_multiply_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_multiply",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_multiply_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_multiply",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_divide_out1_to_node_out_divide_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_divide",
      "port": "out1"
    },
    "target": {
      "node": "node_out_divide",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_divide_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_divide",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_divide_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_divide",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_pow_out1_to_node_out_pow_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_pow",
      "port": "out1"
    },
    "target": {
      "node": "node_out_pow",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zA_out1_to_node_cplx_pow_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zA",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_pow",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_pow_in2",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_pow",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_sin_out1_to_node_out_sin_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_sin",
      "port": "out1"
    },
    "target": {
      "node": "node_out_sin",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_sin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_sin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_cos_out1_to_node_out_cos_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_cos",
      "port": "out1"
    },
    "target": {
      "node": "node_out_cos",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_cos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_cos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_tan_out1_to_node_out_tan_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_tan",
      "port": "out1"
    },
    "target": {
      "node": "node_out_tan",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_tan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_tan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_asin_out1_to_node_out_asin_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_asin",
      "port": "out1"
    },
    "target": {
      "node": "node_out_asin",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_asin_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_asin",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_acos_out1_to_node_out_acos_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_acos",
      "port": "out1"
    },
    "target": {
      "node": "node_out_acos",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_acos_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_acos",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_atan_out1_to_node_out_atan_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_atan",
      "port": "out1"
    },
    "target": {
      "node": "node_out_atan",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_atan_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_atan",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_sinh_out1_to_node_out_sinh_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_sinh",
      "port": "out1"
    },
    "target": {
      "node": "node_out_sinh",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_sinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_sinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_cosh_out1_to_node_out_cosh_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_cosh",
      "port": "out1"
    },
    "target": {
      "node": "node_out_cosh",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_cosh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_cosh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_tanh_out1_to_node_out_tanh_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_tanh",
      "port": "out1"
    },
    "target": {
      "node": "node_out_tanh",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_tanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_tanh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_asinh_out1_to_node_out_asinh_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_asinh",
      "port": "out1"
    },
    "target": {
      "node": "node_out_asinh",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_asinh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_asinh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_acosh_out1_to_node_out_acosh_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_acosh",
      "port": "out1"
    },
    "target": {
      "node": "node_out_acosh",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_acosh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_acosh",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_node_cplx_atanh_out1_to_node_out_atanh_Port",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "node_cplx_atanh",
      "port": "out1"
    },
    "target": {
      "node": "node_out_atanh",
      "port": "Port"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_const_zB_out1_to_node_cplx_atanh_in1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "const_zB",
      "port": "out1"
    },
    "target": {
      "node": "node_cplx_atanh",
      "port": "in1"
    }
  }
],
});
