// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
GraphLangTestShape59 = GraphLang.UserDefinedNode.extend({            

   NAME: "GraphLangTestShape59",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:42, height:42, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // outputTerminal
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(114.28571428571428, 42.857142857142854));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("outputTerminal");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "float";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // outputTerminal
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(88.09523809523809, -2.380952380952381));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("outputTerminal");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "float";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // outputTerminal
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(88.09523809523809, 100));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("outputTerminal");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "float";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 42;
      this.originalHeight= 42;
      return shape;
   },

   createSet: function()
   {
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

    /**
     * @method
     */
    addPort: function(port, locator)
    {
        this._super(port, locator);
        return port;
    },

    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes : function()
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

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes : function(memento)
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
    
    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAYAAABzwahEAAAAAXNSR0IArs4c6QAABPZJREFUaEPtm19sWlUcx3+X2xba0b8bSlpsoiEzW4Pyb9W5KqQPPihdtsT6YKYPNR2NTdx82Hyz6Is6SYaampKYPcxkS9yWVFv30oV1s45IO8tC161LsU0LsZQ/ln8tFwpHLx2TMLi7xSZw4d6EB3IOnPP5nd/5nZPv73cxKNMHK1NuYMGZsvJCobAd59XIIR4TJOeMV3rikfXbKysrlu0wMGrFW8R738X5TRre/gNqDr9+DwmaCPk9kdnJ8XjIN+qcf/BDNniJRNJos9n+Tm9jDHhLS4uG+5zky5qOrlauWMrHm55OcsR9LiDmraH1iZEl4k/bx06nczQTXi6XHwUAO5fLdZjNZh/ZzghwoVAowLm84aYenbxG+hov26quW29GfOd0f2xGNo66XK7V9D5KpVKHEPJxOBwHhmF2HMeXmQL+RvWzbRcFp411GIeTdSujRALcZ7SB6NL9d5xO5y+Z4KnvGIaRLs8M8Obm5lO1nd2fNXSfyLraKai1S18T4fErnzgcjjO5wB8ZgE4klMlkKgBQIYQK4iHBYFBd+fKbqvq3T1KO7//RAMStke8XFhaOAwBKsZGunslJC0QqleoUCsWAQqEADKP1Ezr2pN3H5XLBxetmaPjoO4Bc4yMEXr0WcPfyhbm5uWO5wLfl6iS4Vqsd6Ovroz3Znezo9Xrh/d7j4FAcgQpJR9a/3rRNQMVVI4QDfv3MzMzpTPC8gluhwUnSsbEx+Or8JfCLD0DimTbgpB1n+PJdqJ+fBMlTtWAymT61Wq2PXFutVlcEAoGuvI6zYgAn4a8M/wQmswWsQYC1BJ7cxQ14HKS1AJ0H28G98hcYjcbHwL1eb21eF5hiASfhp6enYebuLHg9HkCAYPceAUja9oNMJoOhoaHHwHNtOVqRqpjAqWIHC562x9kVz7AA6+pUe4fd4wW6wNC9DLHBrdyD20OZSgHxWFKtSZepSja4icTPH+PwG7uSMtWuui2ZKhzwRO5PjscDvtGSBHe73VOUMtVvI0slBz44OKhfC4ZeaewZkNdIVVmFiw3rDaLkwA0Gw4Vok0hDJVNBAtETG5l0juv1+msVBzWvNnSf4FIdgyW34mULnnT13SKN4FRuRRZQCbr6w+B2qLFHJ8ulwW/cuVl6wY1UYFZXV2/zxC98savjcCtX/GJG1uVOKDQxQk9XZ1JwS0lP2fJsKBz0EPd+v5EI+UvzApMSG1NXVrQZTWZW8aoqD4pGpxwOh6Xkonqm2MgqMKwCs2UB1tVZ6SmLBZh4nD1JrmJdnXV11tX/swC7x1ld/UkxszDtJZ1QSObHZ2fB6y6j/HjWighOHKR1uSsiSN/Lu6SzGIJbvjUwJHjeJZ2FBvf5fNDT2wsOOXXVU+VVI4Qoqp4QQstkEVAsFmOGAmMymeDk52ehut8AVCWd/rP9AK5Fyjo3suyLNADtK6tSqRz4t0KwIOHaYrHAFGqC6iMfUI4fuvwtRG79fM1ut7++U5WNagAgPwV5AoFAe+Whw50Nb31ImSRYu/wNQfw6fG5xcbF/R8ALQps2qFAoLM/q5bKtVycXP983FP5XSWehXT01fuvefe9x+PUa7r6XVFvJfoQlwkF3SitfenDvfOZcSXCCIOpSr2Sk2mlF9WIBJ+chEonasSqeEkUjSa0cq+K5UTSS1Mq3M0/GgW8HjqovC75TlmTK/5Ttiv8DznHNila2MFwAAAAASUVORK5CYII=",
    
    jsonDocument: [
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "bd820e20-894a-c003-f8f0-705ae1e3043b",
    "x": 203,
    "y": 139,
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
    "id": "77730ec0-3e5e-b588-e4d5-bab90fc70039",
    "x": 205,
    "y": 195,
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
    "id": "ace4aefb-a5d3-c26d-5439-e7b2e2f3fb55",
    "x": 206,
    "y": 253,
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
    "text": "0",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.ArduinoLib.Node.Add",
    "id": "f3ad3fed-3e11-022b-1ab0-46887f812e61",
    "x": 302,
    "y": 193,
    "width": 123.40234375,
    "height": 78,
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "GraphLang_ArduinoLib_Node_Add",
    "bgColor": "none",
    "color": "#1B1B1B",
    "stroke": 0,
    "radius": 0,
    "dasharray": null,
    "labels": []
  },
  {
    "type": "GraphLang.Shapes.Basic.TerminalOutput",
    "id": "d0df277a-c49b-d7f7-67eb-10451d54e24c",
    "x": 462,
    "y": 125,
    "width": 79.59375,
    "height": 25,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "isTerminal": true,
      "datatype": "float"
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
    "type": "GraphLang.Shapes.Basic.TerminalOutput",
    "id": "f7d1a53a-15a0-d024-97ad-e2020365ad13",
    "x": 473,
    "y": 198,
    "width": 79.59375,
    "height": 25,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "isTerminal": true,
      "datatype": "float"
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
    "type": "GraphLang.Shapes.Basic.TerminalOutput",
    "id": "494e21d4-282a-74b2-45ec-560e782670d1",
    "x": 506,
    "y": 264,
    "width": 79.59375,
    "height": 25,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "isTerminal": true,
      "datatype": "float"
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
    "id": "3219ee4d-6fe4-ebd4-b789-2e3c5eee1be6",
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
        "x": 222.85,
        "y": 207
      },
      {
        "x": 279.1515625,
        "y": 207
      },
      {
        "x": 279.1515625,
        "y": 236.5
      },
      {
        "x": 335.453125,
        "y": 236.5
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
      "node": "77730ec0-3e5e-b588-e4d5-bab90fc70039",
      "port": "out1"
    },
    "target": {
      "node": "f3ad3fed-3e11-022b-1ab0-46887f812e61",
      "port": "in2"
    }
  },
  {
    "type": "HoverConnection",
    "id": "96ade30b-9655-3a9f-b39a-5346c02ff2bf",
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
        "x": 220.85,
        "y": 151
      },
      {
        "x": 297.1515625,
        "y": 151
      },
      {
        "x": 297.1515625,
        "y": 214.5
      },
      {
        "x": 335.453125,
        "y": 214.5
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
      "node": "bd820e20-894a-c003-f8f0-705ae1e3043b",
      "port": "out1"
    },
    "target": {
      "node": "f3ad3fed-3e11-022b-1ab0-46887f812e61",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "53ef50ec-cd12-12f9-cdf7-04c6a4867998",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FAB700",
    "outlineStroke": 0,
    "outlineColor": "#303030",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 412.453125,
        "y": 225.5
      },
      {
        "x": 437.2265625,
        "y": 225.5
      },
      {
        "x": 437.2265625,
        "y": 139
      },
      {
        "x": 462,
        "y": 139
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
      "node": "f3ad3fed-3e11-022b-1ab0-46887f812e61",
      "port": "out1"
    },
    "target": {
      "node": "d0df277a-c49b-d7f7-67eb-10451d54e24c",
      "port": "out1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "1bad2e81-0f7f-761c-75b7-c4bdec2318e1",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FAB700",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 412.453125,
        "y": 225.5
      },
      {
        "x": 442.7265625,
        "y": 225.5
      },
      {
        "x": 442.7265625,
        "y": 212
      },
      {
        "x": 473,
        "y": 212
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
      "node": "f3ad3fed-3e11-022b-1ab0-46887f812e61",
      "port": "out1"
    },
    "target": {
      "node": "f7d1a53a-15a0-d024-97ad-e2020365ad13",
      "port": "out1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "cc22caa7-6508-5965-16bb-9adc66713d10",
    "alpha": 1,
    "angle": 0,
    "userData": {},
    "cssClass": "HoverConnection",
    "stroke": 1.35,
    "color": "#FAB700",
    "outlineStroke": 0,
    "outlineColor": "none",
    "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
    "vertex": [
      {
        "x": 412.453125,
        "y": 225.5
      },
      {
        "x": 459.2265625,
        "y": 225.5
      },
      {
        "x": 459.2265625,
        "y": 278
      },
      {
        "x": 506,
        "y": 278
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
      "node": "f3ad3fed-3e11-022b-1ab0-46887f812e61",
      "port": "out1"
    },
    "target": {
      "node": "494e21d4-282a-74b2-45ec-560e782670d1",
      "port": "out1"
    }
  }
],
    
    translateToCppCode: function(){
        return this.translateToCppCodeTemplate();
    },

    someFunction: function(){
                  /* aaaaaaaaaaaaaaa */
                  return null;
    },


    someFunctionPython: function(){
                  /* aaaaaaaaaaaaaaa */
                  return null;
    },

});