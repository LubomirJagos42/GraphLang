/**
 *  @author LuboJ
 *  @description Demo: load Qt Designer file Demo.Python.UiLoad.ui, show window and run Qt event loop (python only, PySide6).
 *  Nodes: string constant (path to .ui) -> PythonQtGuiLib.UiLoad -> PythonQtGuiLib.UiShow -> PythonQtGuiLib.UiExec.
 *  Copy Demo.Python.UiLoad.ui (stored next to this file) into working directory or next to generated main.py before running.
 */
Demo.Python.UiLoad = GraphLang.UserDefinedNode.extend({
NAME: 'Demo.Python.UiLoad',
init: function(attr, setter, getter)
    {
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        this.persistPorts=false;
    },
createShapeElement: function()
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
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M30,16L70,16L70,42L30,42Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M30,16L70,16L70,21L30,21Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#2F8FD8","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M34,25L66,25L66,29L34,29Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M46,33L54,33L54,38L46,38Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#E0E0E0","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'Demo');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Demo","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'UiLoad');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"UiLoad","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

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
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "b3999528-6479-46d2-fcbb-b344522843f4",
    "x": 20,
    "y": 139,
    "width": 16,
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
    "text": "Demo.Python.UiLoad.ui",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "PythonQtGuiLib.UiLoad",
    "id": "1993d8a6-b84a-c856-55d3-11cbc7480f3c",
    "x": 190,
    "y": 110,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "PythonQtGuiLib_UiLoad",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "PythonQtGuiLib.UiShow",
    "id": "71214bf3-b36b-69ed-54c7-800ff414b17f",
    "x": 330,
    "y": 140,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "PythonQtGuiLib_UiShow",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "PythonQtGuiLib.UiExec",
    "id": "0439da01-c661-649d-afd9-2777d1e7894b",
    "x": 470,
    "y": 110,
    "width": 100,
    "height": 60,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "executionOrder": -1
    },
    "cssClass": "PythonQtGuiLib_UiExec",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "HoverConnection",
    "id": "30a7c2de-9966-6de4-f233-4fc91c74e69f",
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
        "x": 163.92587890624998,
        "y": 151
      },
      {
        "x": 174,
        "y": 151
      },
      {
        "x": 174,
        "y": 142
      },
      {
        "x": 190,
        "y": 141.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "b3999528-6479-46d2-fcbb-b344522843f4",
      "port": "out1"
    },
    "target": {
      "node": "1993d8a6-b84a-c856-55d3-11cbc7480f3c",
      "port": "fileName"
    }
  },
  {
    "type": "HoverConnection",
    "id": "f8a37500-6477-5cbb-0476-269c3f002d10",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7C2FE3",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 290,
        "y": 153.9999998
      },
      {
        "x": 320,
        "y": 154
      },
      {
        "x": 320,
        "y": 171.9999998
      },
      {
        "x": 330,
        "y": 171.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "1993d8a6-b84a-c856-55d3-11cbc7480f3c",
      "port": "window"
    },
    "target": {
      "node": "71214bf3-b36b-69ed-54c7-800ff414b17f",
      "port": "window"
    }
  },
  {
    "type": "HoverConnection",
    "id": "da5afe0c-2d71-631f-1f61-086a8485ad80",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#70DB70",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 290,
        "y": 129.9999998
      },
      {
        "x": 470,
        "y": 129.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "1993d8a6-b84a-c856-55d3-11cbc7480f3c",
      "port": "app"
    },
    "target": {
      "node": "0439da01-c661-649d-afd9-2777d1e7894b",
      "port": "app"
    }
  },
  {
    "type": "HoverConnection",
    "id": "0701bdd6-4a7b-0dd9-19ac-cec3e8222257",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#7C2FE3",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 430,
        "y": 171.9999998
      },
      {
        "x": 450,
        "y": 172
      },
      {
        "x": 450,
        "y": 154
      },
      {
        "x": 470,
        "y": 153.9999998
      }
    ],
    "router": "AI_Router_1",
    "radius": 5,
    "source": {
      "node": "71214bf3-b36b-69ed-54c7-800ff414b17f",
      "port": "window_out"
    },
    "target": {
      "node": "0439da01-c661-649d-afd9-2777d1e7894b",
      "port": "window"
    }
  }
],
});
