Demo.CodeBlock.Custom_1 = GraphLang.UserDefinedNode.extend({

    NAME: 'Demo.CodeBlock.Custom_1',

    init: function(attr, setter, getter)
    {
        this._super( $.extend({stroke:0, bgColor:null, width:80, height:50, flagAutoCreatePorts: false},attr), setter, getter);
        this.persistPorts=false;
    },

    createShapeElement: function()
    {
        var shape = this._super();
        this.originalWidth = 80;
        this.originalHeight = 50;
        return shape;
    },

    createSet: function()
    {
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L80,0 L80,50 L0,50");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M0,0L80,0L80,50L0,50Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'{ py }');
        shape.attr({"x":40,"y":19,"text-anchor":"middle","text":"{ py }","font-size":14,"stroke":"none","fill":"#3572A5","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'code x3');
        shape.attr({"x":40,"y":38,"text-anchor":"middle","text":"code x3","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.UserFunctionMultilineCodeBlock",
    "id": "code_block_generate",
    "x": 40,
    "y": 40,
    "width": 520,
    "height": 118,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Shapes_Basic_UserFunctionMultilineCodeBlock",
    "bgColor": "#FFFFFF",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "import math\n\n# generate one period of sine wave\nsample_count = 16\nsamples = [math.sin(2.0 * math.pi * i / sample_count) for i in range(sample_count)]\nprint(\"generated\", len(samples), \"samples\")",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.MultilineInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.UserFunctionMultilineCodeBlock",
    "id": "code_block_rms",
    "x": 120,
    "y": 230,
    "width": 380,
    "height": 166,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Shapes_Basic_UserFunctionMultilineCodeBlock",
    "bgColor": "#FFFFFF",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "def rms(values):\n    if len(values) == 0:\n        return 0.0\n    return math.sqrt(sum(v * v for v in values) / len(values))\n\nsignal_rms = rms(samples)\nif signal_rms > 0.5:\n    print(\"RMS above 0.5:\", round(signal_rms, 4))\nelse:\n    print(\"RMS below 0.5:\", round(signal_rms, 4))",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.MultilineInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.UserFunctionMultilineCodeBlock",
    "id": "code_block_stats",
    "x": 200,
    "y": 470,
    "width": 600,
    "height": 102,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_Shapes_Basic_UserFunctionMultilineCodeBlock",
    "bgColor": "#FFFFFF",
    "color": "#1B1B1B",
    "stroke": 1,
    "radius": 0,
    "dasharray": null,
    "text": "peak = max(abs(v) for v in samples)\ncrest_factor = peak / signal_rms if signal_rms != 0 else 0.0\nfor name, value in ((\"peak\", peak), (\"rms\", signal_rms), (\"crest factor\", crest_factor)):\n    print(f\"{name:>12}: {value:.4f}\")\nout1 = crest_factor",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#000000",
    "fontFamily": null,
    "editor": "draw2d.ui.MultilineInplaceEditor"
  },
  {
    "type": "HoverConnection",
    "id": "conn_code_block_generate_errorOut_to_code_block_rms_errorIn",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "code_block_generate",
      "port": "errorOut"
    },
    "target": {
      "node": "code_block_rms",
      "port": "errorIn"
    }
  },
  {
    "type": "HoverConnection",
    "id": "conn_code_block_rms_errorOut_to_code_block_stats_errorIn",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#636363",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "router": "draw2d.layout.connection.InteractiveManhattanConnectionRouter",
    "radius": 5,
    "source": {
      "node": "code_block_rms",
      "port": "errorOut"
    },
    "target": {
      "node": "code_block_stats",
      "port": "errorIn"
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
