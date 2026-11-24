/**
 *  @author LuboJ
 *  @description Discrete Fourier Transform magnitude |X[k]| COMPOSED FROM GRAPHLANG SCHEMATIC (double click / open node to see it), no hand written code.
 *  X[k] = sum_n x[n] * (cos(2*pi*k*n/N) - j*sin(2*pi*k*n/N)),  |X[k]| = sqrt(Re^2 + Im^2),  k, n = 0..N-1, works for any N (O(N^2)).
 *  Schematic: ArraySize -> outer ForLoop over k (angle step w = 2*pi*k/N), inner ForLoop over n with FeedbackNode accumulators for Re and Im,
 *  after inner loop sqrt(Re*Re + Im*Im) is appended (ArrayAppend + FeedbackNode holding array) to output array.
 *  Built from nodes: GraphLang.Math.Double.*, ArraySize, ArrayIndex, ArrayAppend, FeedbackNode, ForLoop, ConstantNode, ArrayNode (input terminal x), TerminalOutput (magnitude).
 *  Input x is vector<double>, use GraphLang.Shapes.Basic.ArrayToDouble for other item types (ie. uint8_t samples).
 *  Result is same as GraphLang.SignalProcessing.FFT out1 (FFT node is hand coded and faster O(N log N)).
 */
GraphLang.SignalProcessing.DFT = GraphLang.UserDefinedNode.extend({

   NAME: "GraphLang.SignalProcessing.DFT",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;

     // in1 (samples array)
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(2, 30.0));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3A07C");
     port.setName("x");
     port.setMaxFanOut(20);
     if (!port.userData) port.userData = {}
     port.userData.datatype = "vector<double>";
     port.userData.connectionMandatory = true;

     // out1 (magnitude)
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(98, 30.0));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#F3A07C");
     port.setName("magnitude");
     port.setMaxFanOut(20);
     if (!port.userData) port.userData = {}
     port.userData.datatype = "vector<double>";


     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 100;
      this.originalHeight= 60;
      return shape;
   },

   createSet: function()
   {
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L100,0 L100,60 L0,60");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M20 0L80 0L80 60L20 60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#F2FDF4","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Lines to ports
        shape = this.canvas.paper.path('M0.5 18.5L20.5,18.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        shape = this.canvas.paper.path('M80.5 18.5L99.5,18.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        // Port labels
        shape = this.canvas.paper.text(0,0,'x[n]');
        shape.attr({"x":1,"y":11,"text-anchor":"start","text":"x[n]","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.text(0,0,'|X|');
        shape.attr({"x":83,"y":11,"text-anchor":"start","text":"|X|","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.text(0,0,'schematic');
        shape.attr({"x":50,"y":36,"text-anchor":"middle","text":"schematic","font-family":"Arial","font-size":8,"stroke":"none","fill":"#606060","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Title
        shape = this.canvas.paper.text(0,0,'DFT');
        shape.attr({"x":50,"y":22,"text-anchor":"middle","text":"DFT","font-family":"Arial","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Spectrum bars
        var bars = [4, 6, 22, 6, 3, 2];
        for (var i = 0; i < bars.length; i++){
            shape = this.canvas.paper.path('M' + (29 + i*8) + ' 54L' + (29 + i*8) + ' ' + (54 - bars[i]));
            shape.attr({"stroke":"#3778C8","stroke-width":4,"opacity":1});
            shape.data("name","Bar");
        }

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
      this.svgNodes.forEach(function(node){
          if(node.data("name")===name){
               if(flag){node.show();}
               else{node.hide();}
           }
       });
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

    getPersistentAttributes : function()
    {
        var memento = this._super();
        memento.labels = [];
        this.children.each(function(i,e){
            var labelJSON = e.figure.getPersistentAttributes();
            labelJSON.locator=e.locator.NAME;
            memento.labels.push(labelJSON);
        });
        return memento;
    },

    setPersistentAttributes : function(memento)
    {
        this._super(memento);
        this.resetChildren();
        $.each(memento.labels, $.proxy(function(i,json){
            var figure =  eval("new "+json.type+"()");
            figure.attr(json);
            var locator =  eval("new "+json.locator+"()");
            this.add(figure, locator);
        },this));
    },

    symbolPicture: "__SYMBOL_PICTURE__",

    jsonDocument: [
      {
        "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
        "id": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "x": 260,
        "y": 20,
        "width": 1660,
        "height": 600,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1,
          "wasTranslatedToCppCode": false,
          "isLoop": true
        },
        "cssClass": "GraphLang_Shapes_Basic_Loop2_ForLoop",
        "bgColor": "#F0F0F0",
        "color": "#0000FF",
        "stroke": 3,
        "radius": 0,
        "dasharray": null,
        "labels": [
          {
            "type": "draw2d.shape.basic.Label",
            "id": "31c92eae-e3cd-8f4f-9185-14c45f01c998",
            "x": 802.4892578125,
            "y": -26,
            "width": 47.6845703125,
            "height": 21,
            "alpha": 1,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_shape_basic_Label",
            "ports": [],
            "bgColor": "none",
            "color": "#1B1B1B",
            "stroke": 1,
            "radius": 0,
            "dasharray": null,
            "text": "ForLoop",
            "outlineStroke": 0,
            "outlineColor": "none",
            "fontSize": 12,
            "fontColor": "#080808",
            "fontFamily": null,
            "locator": "draw2d.layout.locator.TopLocator"
          },
          {
            "type": "GraphLang.Shapes.Basic.LeftTunnel",
            "id": "6ce1fca1-7a49-c087-df71-0a7ac31377d0",
            "x": -15,
            "y": 90,
            "width": 30,
            "height": 15,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "isTunnel": true,
              "executionOrder": -1
            },
            "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
            "ports": [
              {
                "type": "draw2d.InputPort",
                "id": "6ce1fca1-7a49-c087-df71-0a7ac31377d0-in0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "int",
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
                "name": "6ce1fca1-7a49-c087-df71-0a7ac31377d0-in0",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.InputPortLocator"
              },
              {
                "type": "draw2d.OutputPort",
                "id": "6ce1fca1-7a49-c087-df71-0a7ac31377d0-out0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "int",
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
                "name": "6ce1fca1-7a49-c087-df71-0a7ac31377d0-out0",
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
            "locatorY": 15
          },
          {
            "type": "GraphLang.Shapes.Basic.LeftTunnel",
            "id": "53d96403-918b-381d-1191-dfd89ec4a477",
            "x": -15,
            "y": 90,
            "width": 30,
            "height": 15,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "isTunnel": true,
              "executionOrder": -1
            },
            "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
            "ports": [
              {
                "type": "draw2d.InputPort",
                "id": "53d96403-918b-381d-1191-dfd89ec4a477-in0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "int",
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
                "name": "53d96403-918b-381d-1191-dfd89ec4a477-in0",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.InputPortLocator"
              },
              {
                "type": "draw2d.OutputPort",
                "id": "53d96403-918b-381d-1191-dfd89ec4a477-out0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "int",
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
                "name": "53d96403-918b-381d-1191-dfd89ec4a477-out0",
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
            "locatorY": 15
          },
          {
            "type": "GraphLang.Shapes.Basic.LeftTunnel",
            "id": "bdb062df-55c2-1685-fe3b-5b946ca79478",
            "x": -15,
            "y": 292.5,
            "width": 30,
            "height": 15,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "isTunnel": true,
              "executionOrder": -1
            },
            "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
            "ports": [
              {
                "type": "draw2d.InputPort",
                "id": "bdb062df-55c2-1685-fe3b-5b946ca79478-in0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "vector<double>",
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
                "name": "bdb062df-55c2-1685-fe3b-5b946ca79478-in0",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.InputPortLocator"
              },
              {
                "type": "draw2d.OutputPort",
                "id": "bdb062df-55c2-1685-fe3b-5b946ca79478-out0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "vector<double>",
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
                "name": "bdb062df-55c2-1685-fe3b-5b946ca79478-out0",
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
            "locatorY": 48.75
          },
          {
            "type": "GraphLang.Shapes.Basic.RightTunnel",
            "id": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52",
            "x": 1645,
            "y": 456.50000000000006,
            "width": 30,
            "height": 15,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "isTunnel": true,
              "executionOrder": -1
            },
            "cssClass": "GraphLang_Shapes_Basic_RightTunnel",
            "ports": [
              {
                "type": "draw2d.InputPort",
                "id": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52-in0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "vector<double>",
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
                "name": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52-in0",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.InputPortLocator"
              },
              {
                "type": "draw2d.OutputPort",
                "id": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52-out0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "vector<double>",
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
                "name": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52-out0",
                "port": "draw2d.OutputPort",
                "locator": "draw2d.layout.locator.OutputPortLocator"
              }
            ],
            "bgColor": "#636363",
            "color": "#000000",
            "stroke": 1,
            "radius": 0,
            "dasharray": null,
            "locator": "GraphLang.Utils.RightRelPortLocator",
            "locatorX": 15,
            "locatorY": 76.08333333333334
          }
        ]
      },
      {
        "type": "GraphLang.Shapes.Basic.ArrayAppend",
        "id": "c2c9c1f6-7b49-e0d1-b5c9-3d14542fbb14",
        "x": 1720,
        "y": 450,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_ArrayAppend",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Math.Double.Sqrt",
        "id": "352696c7-ab67-911c-1cb1-cbe285fb3c93",
        "x": 1720,
        "y": 205,
        "width": 100,
        "height": 50,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Sqrt",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Math.Double.Add",
        "id": "c17f383a-04b9-0b40-26c0-4f64295b4564",
        "x": 1600,
        "y": 200,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Add",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Math.Double.Multiply",
        "id": "00a7de79-a995-70c4-a183-9b12011e4cb8",
        "x": 1470,
        "y": 270,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Multiply",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Math.Double.Multiply",
        "id": "56a26bbf-20f7-cd2e-77a3-279123a6de22",
        "x": 1470,
        "y": 150,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Multiply",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Shapes.Basic.FeedbackNode",
        "id": "11ce256a-88a7-a353-76b5-9d9f87b6ce8c",
        "x": 1500,
        "y": 440,
        "width": 80,
        "height": 61,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_FeedbackNode",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Shapes.Basic.ArrayNode",
        "id": "567ada09-31be-b9f3-fa94-57f673f0b97f",
        "x": 300,
        "y": 560,
        "width": 50,
        "height": 30,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "isTerminal": false,
          "nodeLabel": "emptyArray",
          "datatype": "double*",
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_ArrayNode",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "labels": [
          {
            "type": "draw2d.shape.basic.Label",
            "id": "36072a5e-82ad-c212-752b-23e65bd1913f",
            "x": 0,
            "y": 30,
            "width": 31.783203125,
            "height": 19,
            "alpha": 1,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_shape_basic_Label",
            "ports": [],
            "bgColor": "none",
            "color": "#1B1B1B",
            "stroke": 0,
            "radius": 0,
            "dasharray": null,
            "text": "array",
            "outlineStroke": 0,
            "outlineColor": "none",
            "fontSize": 12,
            "fontColor": "#080808",
            "fontFamily": null,
            "locator": "draw2d.layout.locator.XYRelPortLocator",
            "locatorX": 0,
            "locatorY": 100
          }
        ]
      },
      {
        "type": "GraphLang.Math.Double.Divide",
        "id": "f03e7b2e-3fe8-de78-f3a4-9c3091b9b3d3",
        "x": 530,
        "y": 130,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Divide",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Math.Double.Multiply",
        "id": "16c68a25-de90-e2be-aa60-21e090f86c07",
        "x": 400,
        "y": 90,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Multiply",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Shapes.Basic.ConstantNode",
        "id": "5bd2989c-7a3e-e5e3-1186-129546428bbe",
        "x": 290,
        "y": 40,
        "width": 16,
        "height": 21,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "double",
          "isTerminal": false,
          "nodeLabel": "twoPi",
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "#FFFFFF",
        "color": "#AA2200",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "6.283185307179586",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#000000",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
        "id": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "x": 660,
        "y": 90,
        "width": 760,
        "height": 430,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1,
          "wasTranslatedToCppCode": false,
          "isLoop": true
        },
        "cssClass": "GraphLang_Shapes_Basic_Loop2_ForLoop",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "bgColor": "#F0F0F0",
        "color": "#0000FF",
        "stroke": 3,
        "radius": 0,
        "dasharray": null,
        "labels": [
          {
            "type": "draw2d.shape.basic.Label",
            "id": "a8b91f82-8098-e3d4-fdb5-f3ba6b3d0f76",
            "x": 352.4892578125,
            "y": -26,
            "width": 47.6845703125,
            "height": 21,
            "alpha": 1,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_shape_basic_Label",
            "ports": [],
            "bgColor": "none",
            "color": "#1B1B1B",
            "stroke": 1,
            "radius": 0,
            "dasharray": null,
            "text": "ForLoop",
            "outlineStroke": 0,
            "outlineColor": "none",
            "fontSize": 12,
            "fontColor": "#080808",
            "fontFamily": null,
            "locator": "draw2d.layout.locator.TopLocator"
          },
          {
            "type": "GraphLang.Shapes.Basic.LeftTunnel",
            "id": "0474f593-4424-87e7-b268-baf9c6af709a",
            "x": -15,
            "y": 72.5,
            "width": 30,
            "height": 15,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "isTunnel": true,
              "executionOrder": -1
            },
            "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
            "ports": [
              {
                "type": "draw2d.InputPort",
                "id": "0474f593-4424-87e7-b268-baf9c6af709a-in0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "vector<double>",
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
                "name": "0474f593-4424-87e7-b268-baf9c6af709a-in0",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.InputPortLocator"
              },
              {
                "type": "draw2d.OutputPort",
                "id": "0474f593-4424-87e7-b268-baf9c6af709a-out0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "vector<double>",
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
                "name": "0474f593-4424-87e7-b268-baf9c6af709a-out0",
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
            "locatorY": 16.86046511627907
          },
          {
            "type": "GraphLang.Shapes.Basic.LeftTunnel",
            "id": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9",
            "x": -15,
            "y": 102.5,
            "width": 30,
            "height": 15,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "isTunnel": true,
              "executionOrder": -1
            },
            "cssClass": "GraphLang_Shapes_Basic_LeftTunnel",
            "ports": [
              {
                "type": "draw2d.InputPort",
                "id": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9-in0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "double",
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
                "name": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9-in0",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.InputPortLocator"
              },
              {
                "type": "draw2d.OutputPort",
                "id": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9-out0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "double",
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
                "name": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9-out0",
                "port": "draw2d.OutputPort",
                "locator": "draw2d.layout.locator.OutputPortLocator"
              }
            ],
            "bgColor": "#AA2200",
            "color": "#000000",
            "stroke": 1,
            "radius": 0,
            "dasharray": null,
            "locator": "GraphLang.Utils.LeftRelPortLocator",
            "locatorX": 15,
            "locatorY": 23.837209302325583
          },
          {
            "type": "GraphLang.Shapes.Basic.RightTunnel",
            "id": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0",
            "x": 745,
            "y": 67.5,
            "width": 30,
            "height": 15,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "isTunnel": true,
              "executionOrder": -1
            },
            "cssClass": "GraphLang_Shapes_Basic_RightTunnel",
            "ports": [
              {
                "type": "draw2d.InputPort",
                "id": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0-in0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "double",
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
                "name": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0-in0",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.InputPortLocator"
              },
              {
                "type": "draw2d.OutputPort",
                "id": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0-out0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "double",
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
                "name": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0-out0",
                "port": "draw2d.OutputPort",
                "locator": "draw2d.layout.locator.OutputPortLocator"
              }
            ],
            "bgColor": "#AA2200",
            "color": "#000000",
            "stroke": 1,
            "radius": 0,
            "dasharray": null,
            "locator": "GraphLang.Utils.RightRelPortLocator",
            "locatorX": 15,
            "locatorY": 15.69767441860465
          },
          {
            "type": "GraphLang.Shapes.Basic.RightTunnel",
            "id": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb",
            "x": 745,
            "y": 97.5,
            "width": 30,
            "height": 15,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "isTunnel": true,
              "executionOrder": -1
            },
            "cssClass": "GraphLang_Shapes_Basic_RightTunnel",
            "ports": [
              {
                "type": "draw2d.InputPort",
                "id": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb-in0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "double",
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
                "name": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb-in0",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.InputPortLocator"
              },
              {
                "type": "draw2d.OutputPort",
                "id": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb-out0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "double",
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
                "name": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb-out0",
                "port": "draw2d.OutputPort",
                "locator": "draw2d.layout.locator.OutputPortLocator"
              }
            ],
            "bgColor": "#AA2200",
            "color": "#000000",
            "stroke": 1,
            "radius": 0,
            "dasharray": null,
            "locator": "GraphLang.Utils.RightRelPortLocator",
            "locatorX": 15,
            "locatorY": 22.674418604651162
          },
          {
            "type": "GraphLang.Shapes.Basic.RightTunnel",
            "id": "4b238725-3cb3-fa6a-9733-980929f1444f",
            "x": 745,
            "y": 187.49999999999997,
            "width": 30,
            "height": 15,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "isTunnel": true,
              "executionOrder": -1
            },
            "cssClass": "GraphLang_Shapes_Basic_RightTunnel",
            "ports": [
              {
                "type": "draw2d.InputPort",
                "id": "4b238725-3cb3-fa6a-9733-980929f1444f-in0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "double",
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
                "name": "4b238725-3cb3-fa6a-9733-980929f1444f-in0",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.InputPortLocator"
              },
              {
                "type": "draw2d.OutputPort",
                "id": "4b238725-3cb3-fa6a-9733-980929f1444f-out0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "double",
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
                "name": "4b238725-3cb3-fa6a-9733-980929f1444f-out0",
                "port": "draw2d.OutputPort",
                "locator": "draw2d.layout.locator.OutputPortLocator"
              }
            ],
            "bgColor": "#AA2200",
            "color": "#000000",
            "stroke": 1,
            "radius": 0,
            "dasharray": null,
            "locator": "GraphLang.Utils.RightRelPortLocator",
            "locatorX": 15,
            "locatorY": 43.604651162790695
          },
          {
            "type": "GraphLang.Shapes.Basic.RightTunnel",
            "id": "bc06972f-aa27-7149-f3c5-021e190816ab",
            "x": 745,
            "y": 217.5,
            "width": 30,
            "height": 15,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "isTunnel": true,
              "executionOrder": -1
            },
            "cssClass": "GraphLang_Shapes_Basic_RightTunnel",
            "ports": [
              {
                "type": "draw2d.InputPort",
                "id": "bc06972f-aa27-7149-f3c5-021e190816ab-in0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "double",
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
                "name": "bc06972f-aa27-7149-f3c5-021e190816ab-in0",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.InputPortLocator"
              },
              {
                "type": "draw2d.OutputPort",
                "id": "bc06972f-aa27-7149-f3c5-021e190816ab-out0",
                "width": 8,
                "height": 8,
                "alpha": 1,
                "angle": 0,
                "userData": {
                  "datatype": "double",
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
                "name": "bc06972f-aa27-7149-f3c5-021e190816ab-out0",
                "port": "draw2d.OutputPort",
                "locator": "draw2d.layout.locator.OutputPortLocator"
              }
            ],
            "bgColor": "#AA2200",
            "color": "#000000",
            "stroke": 1,
            "radius": 0,
            "dasharray": null,
            "locator": "GraphLang.Utils.RightRelPortLocator",
            "locatorX": 15,
            "locatorY": 50.58139534883721
          }
        ]
      },
      {
        "type": "GraphLang.Math.Double.Subtract",
        "id": "116d6f05-ac49-6854-b6c2-29d58cc38954",
        "x": 1250,
        "y": 350,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Subtract",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Math.Double.Add",
        "id": "952f322c-8349-0101-72be-443966de387d",
        "x": 1250,
        "y": 140,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Add",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Shapes.Basic.FeedbackNode",
        "id": "9382e4e4-138b-f92a-4907-fd5f472f72b0",
        "x": 1090,
        "y": 330,
        "width": 80,
        "height": 61,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_FeedbackNode",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Shapes.Basic.FeedbackNode",
        "id": "38462935-fbbc-7f06-6f14-ea2550c07556",
        "x": 1090,
        "y": 120,
        "width": 80,
        "height": 61,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_FeedbackNode",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Shapes.Basic.ConstantNode",
        "id": "c5647707-f767-6115-67ea-dbca8eabede0",
        "x": 1110,
        "y": 460,
        "width": 16,
        "height": 21,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "double",
          "isTerminal": false,
          "nodeLabel": "zeroIm",
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "#FFFFFF",
        "color": "#AA2200",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "0.0",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#000000",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "GraphLang.Shapes.Basic.ConstantNode",
        "id": "2510ee8f-1848-5238-4afc-9e3df4e76de0",
        "x": 1110,
        "y": 250,
        "width": 16,
        "height": 21,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "double",
          "isTerminal": false,
          "nodeLabel": "zeroRe",
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "#FFFFFF",
        "color": "#AA2200",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "0.0",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#000000",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "GraphLang.Math.Double.Multiply",
        "id": "709e6abc-4157-e471-6328-3d7ef408b8fc",
        "x": 960,
        "y": 320,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Multiply",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Math.Double.Multiply",
        "id": "9a03f1ec-6d84-b7c1-9be7-982c20f946b2",
        "x": 960,
        "y": 150,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Multiply",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Math.Double.Sin",
        "id": "a96775f9-cb70-a39b-d10b-076cbb35194c",
        "x": 830,
        "y": 300,
        "width": 100,
        "height": 50,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Sin",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Math.Double.Cos",
        "id": "c6545d49-62e0-1440-295c-b4a8e75d9d3d",
        "x": 830,
        "y": 200,
        "width": 100,
        "height": 50,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Cos",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Math.Double.Multiply",
        "id": "227c2611-bfd8-0a01-0356-1587911d02bf",
        "x": 700,
        "y": 230,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Math_Double_Multiply",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Shapes.Basic.ArrayIndex",
        "id": "ec9f8086-501e-b1ff-59a7-a3b3985246a4",
        "x": 700,
        "y": 120,
        "width": 54.975581388799924,
        "height": 22.861321011200232,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_ArrayIndex",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null
      },
      {
        "type": "GraphLang.Shapes.Basic.ArrayNode",
        "id": "cee7f2d7-2f55-9885-2282-2c0f29d0bc53",
        "x": 30,
        "y": 300,
        "width": 36,
        "height": 41,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "isTerminal": true,
          "nodeLabel": "x",
          "datatype": "double*",
          "executionOrder": -1
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
            "id": "fd84d872-32c0-b2b2-e725-22446aba7174",
            "x": 0,
            "y": 41,
            "width": 31.783203125,
            "height": 19,
            "alpha": 1,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_shape_basic_Label",
            "ports": [],
            "bgColor": "none",
            "color": "#1B1B1B",
            "stroke": 0,
            "radius": 0,
            "dasharray": null,
            "text": "array",
            "outlineStroke": 0,
            "outlineColor": "none",
            "fontSize": 12,
            "fontColor": "#080808",
            "fontFamily": null,
            "locator": "draw2d.layout.locator.XYRelPortLocator",
            "locatorX": 0,
            "locatorY": 100
          },
          {
            "type": "draw2d.shape.basic.Label",
            "id": "a2bcba2d-d303-324e-cac9-eba5ba14353b",
            "x": 10,
            "y": 10,
            "width": 27.0078125,
            "height": 24,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "double"
            },
            "cssClass": "draw2d_shape_basic_Label",
            "ports": [],
            "bgColor": "#FFFFFF",
            "color": "#1B1B1B",
            "stroke": 1,
            "radius": 0,
            "dasharray": null,
            "text": "0.0",
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
        "type": "GraphLang.Shapes.Basic.ArraySize",
        "id": "266ad692-1433-2bbc-594e-25f05ff0b126",
        "x": 120,
        "y": 40,
        "width": 100,
        "height": 60,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": -1
        },
        "cssClass": "GraphLang_Shapes_Basic_ArraySize",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Shapes.Basic.TerminalOutput",
        "id": "e4ddf880-86c4-9cff-2245-0384646e3744",
        "x": 1980,
        "y": 470,
        "width": 79.59375,
        "height": 25,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "isTerminal": true,
          "nodeLabel": "magnitude",
          "executionOrder": -1,
          "datatype": "vector<double>"
        },
        "cssClass": "GraphLang_Shapes_Basic_TerminalOutput",
        "bgColor": "#626262",
        "color": "#FF0000",
        "stroke": 3,
        "radius": 0,
        "dasharray": "-",
        "text": "magnitude",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#FFFFFF",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "HoverConnection",
        "id": "654b9fe8-15ee-f67d-6515-5a013802abef",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "sourceTunnel": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52",
          "sourcePortName": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52-out0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#636363",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1935,
            "y": 484.00000000000006
          },
          {
            "x": 1980,
            "y": 484
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "23223f51-3763-cd17-3e9d-cc8111d01106",
          "port": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52-out0"
        },
        "target": {
          "node": "e4ddf880-86c4-9cff-2245-0384646e3744",
          "port": "out1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "16c1092e-3980-0295-bb04-a4eaa5a5563d",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "targetTunnel": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52",
          "targetPortName": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52-in0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#636363",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1818,
            "y": 480
          },
          {
            "x": 1895,
            "y": 480
          },
          {
            "x": 1895,
            "y": 484.00000000000006
          },
          {
            "x": 1905,
            "y": 484.00000000000006
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "c2c9c1f6-7b49-e0d1-b5c9-3d14542fbb14",
          "port": "array_out"
        },
        "target": {
          "node": "23223f51-3763-cd17-3e9d-cc8111d01106",
          "port": "4d429e7f-d3d0-0cf2-dc1d-5fcf7f883e52-in0"
        }
      },
      {
        "type": "HoverConnection",
        "id": "264a803e-2314-dda4-0d3c-33d1f96e308d",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "targetTunnel": "bdb062df-55c2-1685-fe3b-5b946ca79478",
          "targetPortName": "bdb062df-55c2-1685-fe3b-5b946ca79478-in0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#636363",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 66,
            "y": 320.5
          },
          {
            "x": 245,
            "y": 320
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "cee7f2d7-2f55-9885-2282-2c0f29d0bc53",
          "port": "out1"
        },
        "target": {
          "node": "23223f51-3763-cd17-3e9d-cc8111d01106",
          "port": "bdb062df-55c2-1685-fe3b-5b946ca79478-in0"
        }
      },
      {
        "type": "HoverConnection",
        "id": "5172dbf8-8b64-68a3-5790-454c34c801ff",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "sourceTunnel": "bdb062df-55c2-1685-fe3b-5b946ca79478",
          "sourcePortName": "bdb062df-55c2-1685-fe3b-5b946ca79478-out0",
          "targetTunnel": "0474f593-4424-87e7-b268-baf9c6af709a",
          "targetPortName": "0474f593-4424-87e7-b268-baf9c6af709a-in0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#636363",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 275,
            "y": 320
          },
          {
            "x": 645,
            "y": 320
          },
          {
            "x": 644.5,
            "y": 140
          },
          {
            "x": 637,
            "y": 140
          },
          {
            "x": 637,
            "y": 123
          },
          {
            "x": 635,
            "y": 123
          },
          {
            "x": 635,
            "y": 130
          },
          {
            "x": 645,
            "y": 130
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "23223f51-3763-cd17-3e9d-cc8111d01106",
          "port": "bdb062df-55c2-1685-fe3b-5b946ca79478-out0"
        },
        "target": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "0474f593-4424-87e7-b268-baf9c6af709a-in0"
        }
      },
      {
        "type": "HoverConnection",
        "id": "c102fa74-d912-da50-2d04-e5c25b89928a",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "targetTunnel": "53d96403-918b-381d-1191-dfd89ec4a477",
          "targetPortName": "53d96403-918b-381d-1191-dfd89ec4a477-in0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#4286F4",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 218,
            "y": 70
          },
          {
            "x": 245,
            "y": 70
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "266ad692-1433-2bbc-594e-25f05ff0b126",
          "port": "size_out"
        },
        "target": {
          "node": "23223f51-3763-cd17-3e9d-cc8111d01106",
          "port": "53d96403-918b-381d-1191-dfd89ec4a477-in0"
        }
      },
      {
        "type": "HoverConnection",
        "id": "ed9044c0-dab3-0f3a-8a54-89d4e1781b88",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "sourceTunnel": "53d96403-918b-381d-1191-dfd89ec4a477",
          "sourcePortName": "53d96403-918b-381d-1191-dfd89ec4a477-out0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#4286F4",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 275,
            "y": 70
          },
          {
            "x": 285,
            "y": 70
          },
          {
            "x": 285,
            "y": 50
          },
          {
            "x": 510,
            "y": 50
          },
          {
            "x": 510,
            "y": 175
          },
          {
            "x": 532,
            "y": 175
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "23223f51-3763-cd17-3e9d-cc8111d01106",
          "port": "53d96403-918b-381d-1191-dfd89ec4a477-out0"
        },
        "target": {
          "node": "f03e7b2e-3fe8-de78-f3a4-9c3091b9b3d3",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "3aa738d8-76fd-fbbf-74ea-eebd9c1f3696",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "targetTunnel": "6ce1fca1-7a49-c087-df71-0a7ac31377d0",
          "targetPortName": "6ce1fca1-7a49-c087-df71-0a7ac31377d0-in0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#4286F4",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 218,
            "y": 70
          },
          {
            "x": 245,
            "y": 70
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "266ad692-1433-2bbc-594e-25f05ff0b126",
          "port": "size_out"
        },
        "target": {
          "node": "23223f51-3763-cd17-3e9d-cc8111d01106",
          "port": "6ce1fca1-7a49-c087-df71-0a7ac31377d0-in0"
        }
      },
      {
        "type": "HoverConnection",
        "id": "fd847b15-5550-e838-9fde-c16c74fa8cff",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "sourceTunnel": "6ce1fca1-7a49-c087-df71-0a7ac31377d0",
          "sourcePortName": "6ce1fca1-7a49-c087-df71-0a7ac31377d0-out0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#4286F4",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 275,
            "y": 70
          },
          {
            "x": 285,
            "y": 70
          },
          {
            "x": 285,
            "y": 60
          },
          {
            "x": 293,
            "y": 60
          },
          {
            "x": 293,
            "y": 40
          },
          {
            "x": 644.5,
            "y": 40
          },
          {
            "x": 644.5,
            "y": 133
          },
          {
            "x": 654.68,
            "y": 133
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "23223f51-3763-cd17-3e9d-cc8111d01106",
          "port": "6ce1fca1-7a49-c087-df71-0a7ac31377d0-out0"
        },
        "target": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "iterationTerminal"
        }
      },
      {
        "type": "HoverConnection",
        "id": "5e4898da-f2a3-7837-ff82-2b2a23b0c6e2",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "sourceTunnel": "bc06972f-aa27-7149-f3c5-021e190816ab",
          "sourcePortName": "bc06972f-aa27-7149-f3c5-021e190816ab-out0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1435,
            "y": 315
          },
          {
            "x": 1472,
            "y": 315
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "bc06972f-aa27-7149-f3c5-021e190816ab-out0"
        },
        "target": {
          "node": "00a7de79-a995-70c4-a183-9b12011e4cb8",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "9e29761c-b44e-4a49-c363-2f1b18e434d2",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "targetTunnel": "bc06972f-aa27-7149-f3c5-021e190816ab",
          "targetPortName": "bc06972f-aa27-7149-f3c5-021e190816ab-in0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1348,
            "y": 380
          },
          {
            "x": 1390,
            "y": 380
          },
          {
            "x": 1390,
            "y": 315
          },
          {
            "x": 1405,
            "y": 315
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "116d6f05-ac49-6854-b6c2-29d58cc38954",
          "port": "out1"
        },
        "target": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "bc06972f-aa27-7149-f3c5-021e190816ab-in0"
        }
      },
      {
        "type": "HoverConnection",
        "id": "98938270-9652-3281-9e7f-a613531570f3",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "targetTunnel": "4b238725-3cb3-fa6a-9733-980929f1444f",
          "targetPortName": "4b238725-3cb3-fa6a-9733-980929f1444f-in0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1348,
            "y": 380
          },
          {
            "x": 1390,
            "y": 380
          },
          {
            "x": 1390,
            "y": 285
          },
          {
            "x": 1405,
            "y": 285
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "116d6f05-ac49-6854-b6c2-29d58cc38954",
          "port": "out1"
        },
        "target": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "4b238725-3cb3-fa6a-9733-980929f1444f-in0"
        }
      },
      {
        "type": "HoverConnection",
        "id": "e094c37a-1d5d-c5e3-e38f-beb679550b3b",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "sourceTunnel": "4b238725-3cb3-fa6a-9733-980929f1444f",
          "sourcePortName": "4b238725-3cb3-fa6a-9733-980929f1444f-out0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1435,
            "y": 285
          },
          {
            "x": 1472,
            "y": 285
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "4b238725-3cb3-fa6a-9733-980929f1444f-out0"
        },
        "target": {
          "node": "00a7de79-a995-70c4-a183-9b12011e4cb8",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "268d1e59-cfb2-a4d8-c440-37c19587aca4",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "targetTunnel": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb",
          "targetPortName": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb-in0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1348,
            "y": 170
          },
          {
            "x": 1390,
            "y": 170
          },
          {
            "x": 1390,
            "y": 195
          },
          {
            "x": 1405,
            "y": 195
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "952f322c-8349-0101-72be-443966de387d",
          "port": "out1"
        },
        "target": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb-in0"
        }
      },
      {
        "type": "HoverConnection",
        "id": "5c0506e7-1341-91ab-94d7-a636f9dfde9d",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "sourceTunnel": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb",
          "sourcePortName": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb-out0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1435,
            "y": 195
          },
          {
            "x": 1472,
            "y": 195
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "5de37f4e-3ca7-5a8f-04b5-1c04b31764cb-out0"
        },
        "target": {
          "node": "56a26bbf-20f7-cd2e-77a3-279123a6de22",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "261aa26c-f94a-bf4b-f3ab-89fa655a84ee",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "targetTunnel": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0",
          "targetPortName": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0-in0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1348,
            "y": 170
          },
          {
            "x": 1390,
            "y": 170
          },
          {
            "x": 1390,
            "y": 165
          },
          {
            "x": 1405,
            "y": 165
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "952f322c-8349-0101-72be-443966de387d",
          "port": "out1"
        },
        "target": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0-in0"
        }
      },
      {
        "type": "HoverConnection",
        "id": "204e56e7-bc36-5766-f0f0-fec343fb898d",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "sourceTunnel": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0",
          "sourcePortName": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0-out0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1435,
            "y": 165
          },
          {
            "x": 1472,
            "y": 165
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "de7c3e0b-b4f7-27dc-0fa7-c5b68e7911e0-out0"
        },
        "target": {
          "node": "56a26bbf-20f7-cd2e-77a3-279123a6de22",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "81713bbc-cf42-cb6a-093f-d817a136b2e6",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "targetTunnel": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9",
          "targetPortName": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9-in0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 628,
            "y": 160
          },
          {
            "x": 638,
            "y": 160
          },
          {
            "x": 638,
            "y": 157
          },
          {
            "x": 637,
            "y": 157
          },
          {
            "x": 637,
            "y": 160
          },
          {
            "x": 645,
            "y": 160
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "f03e7b2e-3fe8-de78-f3a4-9c3091b9b3d3",
          "port": "out1"
        },
        "target": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9-in0"
        }
      },
      {
        "type": "HoverConnection",
        "id": "c30b9359-e221-174f-cb92-6db82e9c497d",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "sourceTunnel": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9",
          "sourcePortName": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9-out0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 675,
            "y": 160
          },
          {
            "x": 692,
            "y": 160
          },
          {
            "x": 692,
            "y": 245
          },
          {
            "x": 702,
            "y": 245
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "ce48ac01-8e7f-6832-2afd-a1c1f81b25b9-out0"
        },
        "target": {
          "node": "227c2611-bfd8-0a01-0356-1587911d02bf",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "1c2b972d-7b37-fc12-0d68-0f6ecab46bf6",
        "alpha": 1,
        "angle": 0,
        "userData": {
          "sourceTunnel": "0474f593-4424-87e7-b268-baf9c6af709a",
          "sourcePortName": "0474f593-4424-87e7-b268-baf9c6af709a-out0"
        },
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#636363",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 675,
            "y": 130
          },
          {
            "x": 699.4165425152,
            "y": 130.5
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "0474f593-4424-87e7-b268-baf9c6af709a-out0"
        },
        "target": {
          "node": "ec9f8086-501e-b1ff-59a7-a3b3985246a4",
          "port": "array_in"
        }
      },
      {
        "type": "HoverConnection",
        "id": "e11d8405-2f04-f30c-6a84-0ea3d366998e",
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
            "x": 66,
            "y": 320.5
          },
          {
            "x": 112,
            "y": 320
          },
          {
            "x": 112,
            "y": 70
          },
          {
            "x": 122,
            "y": 70
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "cee7f2d7-2f55-9885-2282-2c0f29d0bc53",
          "port": "out1"
        },
        "target": {
          "node": "266ad692-1433-2bbc-594e-25f05ff0b126",
          "port": "array_in"
        }
      },
      {
        "type": "HoverConnection",
        "id": "fb9478ac-b248-245d-2f37-c428692b3fef",
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
            "x": 218,
            "y": 70
          },
          {
            "x": 238.5,
            "y": 70
          },
          {
            "x": 238.5,
            "y": 80
          },
          {
            "x": 248.38,
            "y": 80
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "266ad692-1433-2bbc-594e-25f05ff0b126",
          "port": "size_out"
        },
        "target": {
          "node": "23223f51-3763-cd17-3e9d-cc8111d01106",
          "port": "iterationTerminal"
        }
      },
      {
        "type": "HoverConnection",
        "id": "89eb27d4-fad1-1532-b3ca-59377436c225",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#4286F4",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 675.2,
            "y": 133
          },
          {
            "x": 685,
            "y": 133
          },
          {
            "x": 685,
            "y": 143
          },
          {
            "x": 699.4165425152,
            "y": 142.91840000000002
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "iterationTerminalOutput"
        },
        "target": {
          "node": "ec9f8086-501e-b1ff-59a7-a3b3985246a4",
          "port": "index_in"
        }
      },
      {
        "type": "HoverConnection",
        "id": "0f749222-04d1-4942-251b-799d039ee3ea",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 798,
            "y": 260
          },
          {
            "x": 822,
            "y": 260
          },
          {
            "x": 822,
            "y": 325
          },
          {
            "x": 832,
            "y": 325
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "227c2611-bfd8-0a01-0356-1587911d02bf",
          "port": "out1"
        },
        "target": {
          "node": "a96775f9-cb70-a39b-d10b-076cbb35194c",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "d49937e5-bbce-9539-8825-de1370942a6d",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 798,
            "y": 260
          },
          {
            "x": 822,
            "y": 260
          },
          {
            "x": 822,
            "y": 225
          },
          {
            "x": 832,
            "y": 225
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "227c2611-bfd8-0a01-0356-1587911d02bf",
          "port": "out1"
        },
        "target": {
          "node": "c6545d49-62e0-1440-295c-b4a8e75d9d3d",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "29bed746-de59-e64e-9b97-71916e7c503e",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 498,
            "y": 120
          },
          {
            "x": 522,
            "y": 120
          },
          {
            "x": 522,
            "y": 145
          },
          {
            "x": 532,
            "y": 145
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "16c68a25-de90-e2be-aa60-21e090f86c07",
          "port": "out1"
        },
        "target": {
          "node": "f03e7b2e-3fe8-de78-f3a4-9c3091b9b3d3",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "248f83c4-03b5-9477-80cd-4889a99d6c59",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1348,
            "y": 170
          },
          {
            "x": 1358,
            "y": 170
          },
          {
            "x": 1358,
            "y": 130
          },
          {
            "x": 1169.9278720000002,
            "y": 130
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "952f322c-8349-0101-72be-443966de387d",
          "port": "out1"
        },
        "target": {
          "node": "38462935-fbbc-7f06-6f14-ea2550c07556",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "6d8af82c-c300-01c5-edee-a12439608ca2",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1568,
            "y": 180
          },
          {
            "x": 1592,
            "y": 180
          },
          {
            "x": 1592,
            "y": 215
          },
          {
            "x": 1602,
            "y": 215
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "56a26bbf-20f7-cd2e-77a3-279123a6de22",
          "port": "out1"
        },
        "target": {
          "node": "c17f383a-04b9-0b40-26c0-4f64295b4564",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "85d93f9e-7db5-dde8-bb53-169346e988c1",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1138.358203125,
            "y": 262
          },
          {
            "x": 1148.5,
            "y": 262
          },
          {
            "x": 1148.5,
            "y": 207
          },
          {
            "x": 1130,
            "y": 207
          },
          {
            "x": 1130,
            "y": 177.95
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "2510ee8f-1848-5238-4afc-9e3df4e76de0",
          "port": "out1"
        },
        "target": {
          "node": "38462935-fbbc-7f06-6f14-ea2550c07556",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "b1e6e11c-5515-cd8c-49ba-ded6151536f1",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1138.358203125,
            "y": 472
          },
          {
            "x": 1148.5,
            "y": 472
          },
          {
            "x": 1148.5,
            "y": 398
          },
          {
            "x": 1130,
            "y": 398
          },
          {
            "x": 1130,
            "y": 387.95
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "c5647707-f767-6115-67ea-dbca8eabede0",
          "port": "out1"
        },
        "target": {
          "node": "9382e4e4-138b-f92a-4907-fd5f472f72b0",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "17b15c2e-96a3-5644-5bde-76347e1de7c4",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1058,
            "y": 180
          },
          {
            "x": 1083,
            "y": 180
          },
          {
            "x": 1083,
            "y": 188
          },
          {
            "x": 1242,
            "y": 188
          },
          {
            "x": 1242,
            "y": 185
          },
          {
            "x": 1252,
            "y": 185
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "9a03f1ec-6d84-b7c1-9be7-982c20f946b2",
          "port": "out1"
        },
        "target": {
          "node": "952f322c-8349-0101-72be-443966de387d",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "cb2eca66-9a46-4cf8-d630-d11787b6a9fb",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1818,
            "y": 230
          },
          {
            "x": 1828,
            "y": 230
          },
          {
            "x": 1828,
            "y": 420
          },
          {
            "x": 1700,
            "y": 420
          },
          {
            "x": 1700,
            "y": 495
          },
          {
            "x": 1722,
            "y": 495
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "352696c7-ab67-911c-1cb1-cbe285fb3c93",
          "port": "out1"
        },
        "target": {
          "node": "c2c9c1f6-7b49-e0d1-b5c9-3d14542fbb14",
          "port": "element_in"
        }
      },
      {
        "type": "HoverConnection",
        "id": "3a3091ab-055e-888d-1965-62aa6e9a3898",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "stroke": 1.35,
        "color": "#636363",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 350,
            "y": 575
          },
          {
            "x": 1540,
            "y": 575
          },
          {
            "x": 1540,
            "y": 497.95
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "567ada09-31be-b9f3-fa94-57f673f0b97f",
          "port": "out1"
        },
        "target": {
          "node": "11ce256a-88a7-a353-76b5-9d9f87b6ce8c",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "4971ec78-03e3-ec1c-651f-4c6191ca98bb",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1089.8166656000003,
            "y": 130
          },
          {
            "x": 1080,
            "y": 130
          },
          {
            "x": 1080,
            "y": 113
          },
          {
            "x": 1242,
            "y": 113
          },
          {
            "x": 1242,
            "y": 155
          },
          {
            "x": 1252,
            "y": 155
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "38462935-fbbc-7f06-6f14-ea2550c07556",
          "port": "out1"
        },
        "target": {
          "node": "952f322c-8349-0101-72be-443966de387d",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "a6574519-aa0b-c1d9-c311-8ab9cee6647b",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1058,
            "y": 350
          },
          {
            "x": 1083,
            "y": 350
          },
          {
            "x": 1083,
            "y": 410
          },
          {
            "x": 1242,
            "y": 410
          },
          {
            "x": 1242,
            "y": 395
          },
          {
            "x": 1252,
            "y": 395
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "709e6abc-4157-e471-6328-3d7ef408b8fc",
          "port": "out1"
        },
        "target": {
          "node": "116d6f05-ac49-6854-b6c2-29d58cc38954",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "d9ae1ae0-740a-29c4-6c75-ff9e6cb910f0",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1698,
            "y": 230
          },
          {
            "x": 1722,
            "y": 230
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "c17f383a-04b9-0b40-26c0-4f64295b4564",
          "port": "out1"
        },
        "target": {
          "node": "352696c7-ab67-911c-1cb1-cbe285fb3c93",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "2b16015b-4f1d-0c24-27bd-3d92cd567ded",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 416.4634765625,
            "y": 82
          },
          {
            "x": 426.5,
            "y": 82
          },
          {
            "x": 426.5,
            "y": 63
          },
          {
            "x": 275,
            "y": 63
          },
          {
            "x": 275,
            "y": 105
          },
          {
            "x": 402,
            "y": 105
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "5bd2989c-7a3e-e5e3-1186-129546428bbe",
          "port": "out1"
        },
        "target": {
          "node": "16c68a25-de90-e2be-aa60-21e090f86c07",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "6ccdd9f2-c9ac-8e6d-0393-309c6e3360b6",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 928,
            "y": 325
          },
          {
            "x": 952,
            "y": 325
          },
          {
            "x": 952,
            "y": 365
          },
          {
            "x": 962,
            "y": 365
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "a96775f9-cb70-a39b-d10b-076cbb35194c",
          "port": "out1"
        },
        "target": {
          "node": "709e6abc-4157-e471-6328-3d7ef408b8fc",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "dbebc143-48fa-5132-0b52-f19e082204c5",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 758.9018395648,
            "y": 130.5
          },
          {
            "x": 940,
            "y": 130.5
          },
          {
            "x": 940,
            "y": 335
          },
          {
            "x": 962,
            "y": 335
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "ec9f8086-501e-b1ff-59a7-a3b3985246a4",
          "port": "arrayElement_out"
        },
        "target": {
          "node": "709e6abc-4157-e471-6328-3d7ef408b8fc",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "c9459009-0d77-ffaa-8d80-09dc690010a3",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1348,
            "y": 380
          },
          {
            "x": 1358,
            "y": 380
          },
          {
            "x": 1358,
            "y": 340
          },
          {
            "x": 1169.9278720000002,
            "y": 340
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "116d6f05-ac49-6854-b6c2-29d58cc38954",
          "port": "out1"
        },
        "target": {
          "node": "9382e4e4-138b-f92a-4907-fd5f472f72b0",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "63cd9211-8c56-29d3-9d42-7513ea1c24e3",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 928,
            "y": 225
          },
          {
            "x": 950,
            "y": 225
          },
          {
            "x": 950,
            "y": 195
          },
          {
            "x": 962,
            "y": 195
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "c6545d49-62e0-1440-295c-b4a8e75d9d3d",
          "port": "out1"
        },
        "target": {
          "node": "9a03f1ec-6d84-b7c1-9be7-982c20f946b2",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "b55f9baf-a80b-d233-4267-0be3b7d68797",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "stroke": 1.35,
        "color": "#636363",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1499.8166656000003,
            "y": 450
          },
          {
            "x": 1490,
            "y": 450
          },
          {
            "x": 1490,
            "y": 433
          },
          {
            "x": 1712,
            "y": 433
          },
          {
            "x": 1712,
            "y": 465
          },
          {
            "x": 1722,
            "y": 465
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "11ce256a-88a7-a353-76b5-9d9f87b6ce8c",
          "port": "out1"
        },
        "target": {
          "node": "c2c9c1f6-7b49-e0d1-b5c9-3d14542fbb14",
          "port": "array_in"
        }
      },
      {
        "type": "HoverConnection",
        "id": "8b0ea157-591a-02a9-8a64-1fb1492c5293",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "stroke": 1.35,
        "color": "#4286F4",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 293.2,
            "y": 80
          },
          {
            "x": 347.6,
            "y": 80
          },
          {
            "x": 347.6,
            "y": 135
          },
          {
            "x": 402,
            "y": 135
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "23223f51-3763-cd17-3e9d-cc8111d01106",
          "port": "iterationTerminalOutput"
        },
        "target": {
          "node": "16c68a25-de90-e2be-aa60-21e090f86c07",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "aad2e676-1915-6920-e0c6-b4c2016cb990",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#4286F4",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 675.2,
            "y": 133
          },
          {
            "x": 685,
            "y": 133
          },
          {
            "x": 685,
            "y": 275
          },
          {
            "x": 702,
            "y": 275
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
          "port": "iterationTerminalOutput"
        },
        "target": {
          "node": "227c2611-bfd8-0a01-0356-1587911d02bf",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "33041e04-0de1-71e1-5a11-887aa388ef94",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 758.9018395648,
            "y": 130.5
          },
          {
            "x": 940,
            "y": 130.5
          },
          {
            "x": 940,
            "y": 165
          },
          {
            "x": 962,
            "y": 165
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "ec9f8086-501e-b1ff-59a7-a3b3985246a4",
          "port": "arrayElement_out"
        },
        "target": {
          "node": "9a03f1ec-6d84-b7c1-9be7-982c20f946b2",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "c5c5f1ba-12de-1c9e-5436-c4f9511c6760",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "stroke": 1.35,
        "color": "#636363",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1818,
            "y": 480
          },
          {
            "x": 1828,
            "y": 480
          },
          {
            "x": 1828,
            "y": 443
          },
          {
            "x": 1590,
            "y": 443
          },
          {
            "x": 1590,
            "y": 450
          },
          {
            "x": 1579.9278720000002,
            "y": 450
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "c2c9c1f6-7b49-e0d1-b5c9-3d14542fbb14",
          "port": "array_out"
        },
        "target": {
          "node": "11ce256a-88a7-a353-76b5-9d9f87b6ce8c",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "a146cc39-f5b9-f2d8-3281-b9961bb281b7",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "23223f51-3763-cd17-3e9d-cc8111d01106",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1568,
            "y": 300
          },
          {
            "x": 1590,
            "y": 300
          },
          {
            "x": 1590,
            "y": 245
          },
          {
            "x": 1602,
            "y": 245
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "00a7de79-a995-70c4-a183-9b12011e4cb8",
          "port": "out1"
        },
        "target": {
          "node": "c17f383a-04b9-0b40-26c0-4f64295b4564",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "edfa4c97-3337-fb9c-513a-776d7996c041",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "composite": "1ec7fa92-ccb2-7179-a595-6f264548c56a",
        "stroke": 1.35,
        "color": "#AA2200",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 1089.8166656000003,
            "y": 340
          },
          {
            "x": 1080,
            "y": 340
          },
          {
            "x": 1080,
            "y": 323
          },
          {
            "x": 1242,
            "y": 323
          },
          {
            "x": 1242,
            "y": 365
          },
          {
            "x": 1252,
            "y": 365
          }
        ],
        "router": "AI_Router_1",
        "radius": 5,
        "source": {
          "node": "9382e4e4-138b-f92a-4907-fd5f472f72b0",
          "port": "out1"
        },
        "target": {
          "node": "116d6f05-ac49-6854-b6c2-29d58cc38954",
          "port": "in1"
        }
      }
    ],
});
