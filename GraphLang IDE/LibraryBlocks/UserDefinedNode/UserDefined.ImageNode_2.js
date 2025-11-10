UserDefined.ImageNode_2 = GraphLang.UserDefinedNode.extend({
NAME: "UserDefined.ImageNode_2",

   init:function(attr, setter, getter)
   {
       this._super( $.extend({stroke:0, bgColor:null, width:74.5, height:80, flagAutoCreatePorts: false},attr), setter, getter);
       var port;
       // Port
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(30.87248322147651, -2.5));
       port.setConnectionDirection(0);
       port.setBackgroundColor("#37B1DE");
       port.setName("Port");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "undefined";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       // Port
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(104.69798657718121, 53.75));
       port.setConnectionDirection(1);
       port.setBackgroundColor("#37B1DE");
       port.setName("Port");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "undefined";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       this.persistPorts=false;
   },

   createShapeElement : function()
   {
       var shape = this._super();
       this.originalWidth = 74.5;
       this.originalHeight= 80;
       return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L74.5,0 L74.5,80 L0,80");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Label
       shape = this.canvas.paper.image();
       shape.attr({"x":0,"y":16,"width":64,"height":64,"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAR+SURBVHhe7Zu7LzVBGMZPkEgQhUQoNILCLUFcGtdeVAqF2u0PEBIaoVfq9KIQhRBaSsQ1RCkRJO7XuLxfnklmc867M7uzvu/bM2ePJ3mC2dnszG/fmXl3dsUozRXjBemmXwC8IN30C4AXpJu0AF5eXmhmZoYmJyfp6emJH46MtACmp6cpFosJd3R00MPDA68SCWkBjI+POwDg9vZ2ur+/59VSXloANzc34s5zCHd3d7xqSksLAMIdR6ejDMETAITOekXC19cXPT8/89NSRr4AIHSWRwKgIEIAYHh4mEpLS6m6ujpprq+vp4WFBd50XxkBgHQQHh8f6erqihoaGhKOJcNVVVW82b4yBgCpIHR2dtL7+7vIG7q6uigzMzM0Z2VlUUZGRngAICRFHAIi4e3tjb6/v+ng4CA0Hx0d0dLSkgOhpqaGN9dXgQB8fHyIn7jjqokRURC2zs7OwgOA2X5wcJBub28FBIQ/hxD2Erm/vx8eAKioqEjMuIABqyIhTAihA8CSg4u1tbWJkMdS+K8hYGzv7u6KecVPSQMA7+3tiTLV6gAoQSHs7OwIsLJDuNby8jKvlqCkAcAyhJlYSgUhyAPU+fm5GF7x58vrbG1t8eqOrAEAqSCYPkpPTU25Oi/d29vLqzuyCgCkeoAygdDX1+fquHRdXR2v7sg6ABA6q5oYvYYD33+Id3d3N6/uyEoAkA6CbmI8OTmhnJwcV+fh1dVVXt2RtQAg1XDwgrC2tkYVFRVO3cLCQpqbm+PVEmQ1AAi5QpBIQORsbGyIu35xccEPu2Q1ACQy8kmRR8JP8gSVrAbQ399PjY2N9Pr6qoTgNzGayFoAs7OzCR1FNKggmCyRXrISwMrKitMoaaS4gIBo+JcQrANwfHxMBQUFCR2Ubm1tFVGg20/wGg64FlLiy8vLhHKrAKAD8Q9LKgMCHqNN9xO2t7dFOa6HOlgax8bG6PPzUxy3CkBPT4+rwypjOAAChoQqEiSE09NTbXI0MDAg6hweHtoBYHR01NVIL0sIujwB0XR9fU0tLS2uc6XX19dFrpB0APPz867GmVhuquhWB7nrhHr8XBhZ4+bmJuXm5oq/QwUA6qCPTYzs7GxX40yNjuryBBzDMPGC0NzcTPn5+eL3UAHk5eWJlLW8vNzVqKD2yhPi3zvoIEiHCgCTU0lJiasRP7WEoMsTTCCECuB/WM4JujwBcACJA5JOeQBwPARVnoBjOgiRAAD75QmAgGjgxyIDAPbLE+TyGT8nRAoA7JcnoDx+iYwcANg0T8D3CcXFxby5vrIeAGySJ+D5YWhoSNQJopQAAJvkCZB8SjRVygCA/fKEn3zRGhhAZWWlq2Fh2i9P4PsJfko5ADC+T8DOED7QUkVCEAiBASwuLlJTUxPV1tYmzWVlZTQyMiI+0fvb7xMCA7BFmAwBANK9lTaBkLIAuFQQ8LfXRisUGQCQCgIiAR9+6xQpAJDqhSxevesUOQAQfzWP/3zRKZIAICRFExMTovOYMHWKLABT/QLgBemmXwC8IN2U9gD+AMNkpU/nN6DpAAAAAElFTkSuQmCC","stroke-scale":true,"opacity":1,"transform":"t0,16"});
       shape.data("name","Label");
       
       // Line_shadow
       shape = this.canvas.paper.path('M47.5 44.5L74.5,44.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M47.5 44.5L74.5,44.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M23.5 28.5L23.5,0.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M23.5 28.5L23.5,0.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

       return this.canvas.paper.setFinish();
   },

   symbolPicture: "data:image/png;base64,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",

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
jsonDocument: [],
});
