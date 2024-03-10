// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
SubNodes.Block_1 = GraphLang.UserDefinedNode.extend({            

   NAME: "SubNodes.Block_1",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:42, height:42, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // input_1
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-14.285714285714285, 69.04761904761905));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // input_2
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-14.285714285714285, 23.80952380952381));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("input_2");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";
     port.userData.allowMultipleConnections = undefined;
     port.userData.connectionMandatory = undefined;

     // output_numbers_add
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(114.28571428571428, 50));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("output_numbers_add");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "int";
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
        
        // Line_shadow
        shape = this.canvas.paper.path('M35.5 4.5L35.5,15.5L26.5,4.5L26.5,16.5L18.5,15.5L18.5,38.5L6.5,16.5L6.5,37.5L6.5,37.5L11.5,37.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M35.5 4.5L35.5,15.5L26.5,4.5L26.5,16.5L18.5,15.5L18.5,38.5L6.5,16.5L6.5,37.5L6.5,37.5L11.5,37.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        

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
    
    symbolPicture: "data:image/png;base64,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",
    
    jsonDocument: [
  {
    "type": "GraphLang.ArduinoLib.Node.Add",
    "id": "6302fd56-35db-b91e-5bec-3c898698fd1a",
    "x": 552,
    "y": 359,
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
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "db07c410-3481-dc03-128e-c4a864ebfee8",
    "x": 421,
    "y": 305,
    "width": 25.5615234375,
    "height": 25,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": true,
      "nodeLabel": "input_1"
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#0000FF",
    "color": "#DD2241",
    "stroke": 3,
    "radius": 0,
    "dasharray": "-",
    "text": "13",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.ConstantNode",
    "id": "b68028e3-ed80-af10-74e7-9f813770b106",
    "x": 419,
    "y": 414,
    "width": 32.669921875,
    "height": 25,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int",
      "isTerminal": true,
      "nodeLabel": "input_2"
    },
    "cssClass": "GraphLang_Shapes_Basic_ConstantNode",
    "bgColor": "#0000FF",
    "color": "#4286F4",
    "stroke": 3,
    "radius": 0,
    "dasharray": "-",
    "text": "22",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "GraphLang.Shapes.Basic.TerminalOutput",
    "id": "9529e452-b08e-d189-6321-b4faddfdf1d8",
    "x": 781,
    "y": 374,
    "width": 79.59375,
    "height": 25,
    "alpha": 1,
    "angle": 0,
    "userData": {
      "datatype": "int"
    },
    "cssClass": "GraphLang_Shapes_Basic_TerminalOutput",
    "bgColor": "#626262",
    "color": "#FF0000",
    "stroke": 3,
    "radius": 0,
    "dasharray": "-",
    "text": "output_numbers_add",
    "outlineStroke": 0,
    "outlineColor": "none",
    "fontSize": 12,
    "fontColor": "#FFFFFF",
    "fontFamily": null,
    "editor": "draw2d.ui.LabelInplaceEditor"
  },
  {
    "type": "HoverConnection",
    "id": "23c7ae46-0061-a006-5702-7713b5c2d29f",
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
        "x": 662.453125,
        "y": 391.5
      },
      {
        "x": 721.7265625,
        "y": 391.5
      },
      {
        "x": 721.7265625,
        "y": 388
      },
      {
        "x": 781,
        "y": 388
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
      "node": "6302fd56-35db-b91e-5bec-3c898698fd1a",
      "port": "out1"
    },
    "target": {
      "node": "9529e452-b08e-d189-6321-b4faddfdf1d8",
      "port": "out1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "17914878-0bc5-60aa-e1b5-65000d9f5e69",
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
        "x": 450.05751953125,
        "y": 319
      },
      {
        "x": 517.755322265625,
        "y": 319
      },
      {
        "x": 517.755322265625,
        "y": 380.5
      },
      {
        "x": 585.453125,
        "y": 380.5
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
      "node": "db07c410-3481-dc03-128e-c4a864ebfee8",
      "port": "out1"
    },
    "target": {
      "node": "6302fd56-35db-b91e-5bec-3c898698fd1a",
      "port": "in1"
    }
  },
  {
    "type": "HoverConnection",
    "id": "e2490507-8a54-d44b-9c70-1fea5f065a0b",
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
        "x": 448.05751953125,
        "y": 428
      },
      {
        "x": 516.755322265625,
        "y": 428
      },
      {
        "x": 516.755322265625,
        "y": 402.5
      },
      {
        "x": 585.453125,
        "y": 402.5
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
      "node": "b68028e3-ed80-af10-74e7-9f813770b106",
      "port": "out1"
    },
    "target": {
      "node": "6302fd56-35db-b91e-5bec-3c898698fd1a",
      "port": "in2"
    }
  }
],
    
    translateToCppCode: function(){
        return this.translateToCppCodeTemplate();
    },


});