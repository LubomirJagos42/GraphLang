GraphLangTestShape3 = GraphLang.UserDefinedNode.extend({
    NAME: 'GraphLangTestShape3',
    init: function(attr, setter, getter)
       {
         this._super( $.extend({stroke:0, bgColor:null, width:42, height:42, flagAutoCreatePorts: false},attr), setter, getter);
         var port;
         // in0
         port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-9.523809523809524, 13.095238095238095));
         port.setConnectionDirection(3);
         port.setBackgroundColor("#37B1DE");
         port.setName("in0");
         port.setMaxFanOut(20);
         port.userData = {datatype: "int"};
         // in1
         port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-9.523809523809524, 90.47619047619048));
         port.setConnectionDirection(3);
         port.setBackgroundColor("#37B1DE");
         port.setName("in1");
         port.setMaxFanOut(20);
         port.userData = {datatype: "int"};
         // subtractResult
         port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(107.14285714285714, 50));
         port.setConnectionDirection(1);
         port.setBackgroundColor("#37B1DE");
         port.setName("subtractResult");
         port.setMaxFanOut(20);
         port.userData = {datatype: "int"};
         this.persistPorts=false;
       },
    createShapeElement: function()
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

            // Circle
            shape = this.canvas.paper.ellipse();
            shape.attr({"rx":6,"ry":6,"cx":27.5,"cy":15.5,"stroke":"none","stroke-width":0,"fill":"#95C06A","dasharray":null,"opacity":1});
            shape.data("name","Circle");

            // Circle
            shape = this.canvas.paper.ellipse();
            shape.attr({"rx":7,"ry":7,"cx":8.5,"cy":33.5,"stroke":"none","stroke-width":0,"fill":"#95C06A","dasharray":null,"opacity":1});
            shape.data("name","Circle");


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
        "type": "GraphLang.Shapes.Basic.Loop2.ForLoop",
        "id": "ef441fb1-2d10-910b-1da6-e7dda8fba7f5",
        "x": 384,
        "y": 149,
        "width": 528,
        "height": 262,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "executionOrder": 1,
          "wasTranslatedToCppCode": false
        },
        "cssClass": "GraphLang_Shapes_Basic_Loop2_ForLoop",
        "ports": [
          {
            "type": "draw2d.InputPort",
            "id": "5e810386-b2e9-c0bf-f954-1c74e9aeef73",
            "width": 8,
            "height": 8,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "int"
            },
            "cssClass": "draw2d_InputPort",
            "bgColor": "#0000FF",
            "color": "#1B1B1B",
            "stroke": 1,
            "dasharray": null,
            "maxFanOut": 20,
            "name": "iterationTerminal",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.XYRelPortLocator"
          },
          {
            "type": "draw2d.OutputPort",
            "id": "007bbd41-18ed-2e22-fe3f-abd5a030ad09",
            "width": 8,
            "height": 8,
            "alpha": 1,
            "angle": 0,
            "userData": {
              "datatype": "int"
            },
            "cssClass": "draw2d_OutputPort",
            "bgColor": "#0000FF",
            "color": "#1B1B1B",
            "stroke": 3,
            "dasharray": null,
            "maxFanOut": 20,
            "name": "iterationTerminalOutput",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.XYRelPortLocator"
          }
        ],
        "bgColor": "#F0F0F0",
        "color": "#0000FF",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.ArduinoLib.Node.Add",
        "id": "cd19bc78-4783-012b-e4cf-7cf4f1280b38",
        "x": 572,
        "y": 181,
        "width": 123.40234375,
        "height": 78,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "GraphLang_ArduinoLib_Node_Add",
        "composite": "ef441fb1-2d10-910b-1da6-e7dda8fba7f5",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.ArduinoLib.Node.Add",
        "id": "a7ef8a0a-db76-2126-0ad5-d56bf974b044",
        "x": 588,
        "y": 282,
        "width": 123.40234375,
        "height": 78,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "GraphLang_ArduinoLib_Node_Add",
        "composite": "ef441fb1-2d10-910b-1da6-e7dda8fba7f5",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Shapes.Basic.ConstantNode",
        "id": "171043d6-b432-5991-3b33-720f211925b4",
        "x": 472,
        "y": 186,
        "width": 16,
        "height": 21,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "int",
          "isTerminal": false
        },
        "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
        "composite": "ef441fb1-2d10-910b-1da6-e7dda8fba7f5",
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
        "id": "2f1225cf-1054-1d43-e3ea-aaa5d9e2f488",
        "x": 400,
        "y": 233,
        "width": 66.5859375,
        "height": 21,
        "alpha": 1,
        "angle": 0,
        "userData": {
          "datatype": "string",
          "isTerminal": false
        },
        "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
        "composite": "ef441fb1-2d10-910b-1da6-e7dda8fba7f5",
        "bgColor": "#FF3385",
        "color": "#FF3385",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "text": "defaultString",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#000000",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "ConsoleLog2",
        "id": "5b6d22b9-8450-a441-0424-6bf66f9a7518",
        "x": 758,
        "y": 185,
        "width": 69,
        "height": 55,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "ConsoleLog2",
        "composite": "ef441fb1-2d10-910b-1da6-e7dda8fba7f5",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "ConsoleLog2",
        "id": "9195bc1f-3dca-3fd1-3070-690fe9e02ba8",
        "x": 772,
        "y": 299,
        "width": 69,
        "height": 55,
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "ConsoleLog2",
        "composite": "ef441fb1-2d10-910b-1da6-e7dda8fba7f5",
        "bgColor": "none",
        "color": "#1B1B1B",
        "stroke": 0,
        "radius": 0,
        "dasharray": null,
        "labels": []
      },
      {
        "type": "GraphLang.Shapes.Basic.ConstantNode",
        "id": "f10b2721-fcde-3ad8-0cd0-d13546fdc3d8",
        "x": 267,
        "y": 129,
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
        "text": "3",
        "outlineStroke": 0,
        "outlineColor": "none",
        "fontSize": 12,
        "fontColor": "#FFFFFF",
        "fontFamily": null,
        "editor": "draw2d.ui.LabelInplaceEditor"
      },
      {
        "type": "HoverConnection",
        "id": "26f51f4b-4a8e-06c0-ea99-b40125b7d84f",
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
            "x": 682.453125,
            "y": 213.5
          },
          {
            "x": 714.2265625,
            "y": 213.5
          },
          {
            "x": 714.2265625,
            "y": 211
          },
          {
            "x": 746,
            "y": 211
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
          "node": "cd19bc78-4783-012b-e4cf-7cf4f1280b38",
          "port": "out1"
        },
        "target": {
          "node": "5b6d22b9-8450-a441-0424-6bf66f9a7518",
          "port": "Port"
        }
      },
      {
        "type": "HoverConnection",
        "id": "662a20d9-d835-4aec-bbb8-949bc3a8057b",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#FF3385",
        "outlineStroke": 0,
        "outlineColor": "#303030",
        "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 481.58828125,
            "y": 245
          },
          {
            "x": 543.520703125,
            "y": 245
          },
          {
            "x": 543.520703125,
            "y": 224.5
          },
          {
            "x": 605.453125,
            "y": 224.5
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
          "node": "2f1225cf-1054-1d43-e3ea-aaa5d9e2f488",
          "port": "out1"
        },
        "target": {
          "node": "cd19bc78-4783-012b-e4cf-7cf4f1280b38",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "54616ecb-3e74-0d85-d2c7-516af490f60b",
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
            "x": 489.85,
            "y": 198
          },
          {
            "x": 547.6515625,
            "y": 198
          },
          {
            "x": 547.6515625,
            "y": 202.5
          },
          {
            "x": 605.453125,
            "y": 202.5
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
          "node": "171043d6-b432-5991-3b33-720f211925b4",
          "port": "out1"
        },
        "target": {
          "node": "cd19bc78-4783-012b-e4cf-7cf4f1280b38",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "5f09b148-502f-7e02-b3bf-30f250e5befb",
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
            "x": 698.453125,
            "y": 314.5
          },
          {
            "x": 729.2265625,
            "y": 314.5
          },
          {
            "x": 729.2265625,
            "y": 325
          },
          {
            "x": 760,
            "y": 325
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
          "node": "a7ef8a0a-db76-2126-0ad5-d56bf974b044",
          "port": "out1"
        },
        "target": {
          "node": "9195bc1f-3dca-3fd1-3070-690fe9e02ba8",
          "port": "Port"
        }
      },
      {
        "type": "HoverConnection",
        "id": "00137bc9-fa35-7eda-fae9-fc21b93a5803",
        "alpha": 1,
        "angle": 0,
        "userData": {},
        "cssClass": "HoverConnection",
        "stroke": 1.35,
        "color": "#FF3385",
        "outlineStroke": 0,
        "outlineColor": "none",
        "policy": "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",
        "vertex": [
          {
            "x": 481.58828125,
            "y": 245
          },
          {
            "x": 551.520703125,
            "y": 245
          },
          {
            "x": 551.520703125,
            "y": 325.5
          },
          {
            "x": 621.453125,
            "y": 325.5
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
          "node": "2f1225cf-1054-1d43-e3ea-aaa5d9e2f488",
          "port": "out1"
        },
        "target": {
          "node": "a7ef8a0a-db76-2126-0ad5-d56bf974b044",
          "port": "in2"
        }
      },
      {
        "type": "HoverConnection",
        "id": "71cba058-ffe8-e048-3297-9be60afa908f",
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
            "x": 489.85,
            "y": 198
          },
          {
            "x": 555.6515625,
            "y": 198
          },
          {
            "x": 555.6515625,
            "y": 303.5
          },
          {
            "x": 621.453125,
            "y": 303.5
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
          "node": "171043d6-b432-5991-3b33-720f211925b4",
          "port": "out1"
        },
        "target": {
          "node": "a7ef8a0a-db76-2126-0ad5-d56bf974b044",
          "port": "in1"
        }
      },
      {
        "type": "HoverConnection",
        "id": "a26d7a87-ec7d-d105-4d99-050924de16f7",
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
            "x": 284.85,
            "y": 141
          },
          {
            "x": 332.577,
            "y": 141
          },
          {
            "x": 332.577,
            "y": 175.2
          },
          {
            "x": 380.304,
            "y": 175.2
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
          "node": "f10b2721-fcde-3ad8-0cd0-d13546fdc3d8",
          "port": "out1"
        },
        "target": {
          "node": "ef441fb1-2d10-910b-1da6-e7dda8fba7f5",
          "port": "iterationTerminal"
        }
      }
    ],
    translateToCppCode: function(){
            return this.translateToCppCodeTemplate();
        },
});
