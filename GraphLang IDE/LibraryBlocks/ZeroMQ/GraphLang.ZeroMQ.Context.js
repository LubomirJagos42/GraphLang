GraphLang.ZeroMQ.Context = GraphLang.UserDefinedNode.extend({
NAME: "GraphLang.ZeroMQ.Context",

   init:function(attr, setter, getter)
   {
       this._super( $.extend({stroke:0, bgColor:null, width:100.5, height:76.8473596572876, flagAutoCreatePorts: false},attr), setter, getter);
       var port;
       // context_ref
       port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(104.31681592039844, 41.26488683725774));
       port.setConnectionDirection(1);
       port.setBackgroundColor("#16F3EC");
       port.setName("context_ref");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "zmq::context_t*";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       // context_number
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(15.957333333333745, 45.832986083533754));
       port.setConnectionDirection(3);
       port.setBackgroundColor("#37B1DE");
       port.setName("context_number");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "uint";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       // error_in
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(15.957333333333745, 86.09857248493408));
       port.setConnectionDirection(3);
       port.setBackgroundColor("#F3EC24");
       port.setName("error_in");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "errorDatatype";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       // error_out
       port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(104.31681592039844, 86.09857248493408));
       port.setConnectionDirection(1);
       port.setBackgroundColor("#F3DE22");
       port.setName("error_out");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "errorDatatype";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       this.persistPorts=false;
   },

   createShapeElement : function()
   {
       var shape = this._super();
       this.originalWidth = 100.5;
       this.originalHeight= 76.8473596572876;
       return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L100.5,0 L100.5,76.8473596572876 L0,76.8473596572876");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M86.16288000000009 76.8473596572876L27.162880000000087 76.8473596572876L27.162880000000087 20.847359657287598L86.16288000000009 20.847359657287598Z');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.text(0,0,'zeromq context');
       shape.attr({"x":4,"y":11,"text-anchor":"start","text":"zeromq context","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
       shape.data("name","Label");
       
       // Line_shadow
       shape = this.canvas.paper.path('M86.5 65.5L100.5,65.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M86.5 65.5L100.5,65.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M26.5 33.5L12.5,33.5L12.5,33.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M26.5 33.5L12.5,33.5L12.5,33.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M26.5 65.5L14.5,65.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M26.5 65.5L14.5,65.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M86.5 31.5L100.5,31.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M86.5 31.5L100.5,31.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

       return this.canvas.paper.setFinish();
   },

   symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABgCAYAAADW4bYkAAAB6klEQVR4AezTQYrDMBBEUTP3P/SANg1BCmqUhevrZ2GMbYWuevTf4w/dgMBo3ucRWGB4A/B4brDA8Abg8dxggeENwOPdusFw1ooncHWBvBMYyVqhBK4ukHcCI1krlMDVBfJOYCRrhRK4ukDeCYxkrVAfwPXCO0YDAjMclykEXlbDeCEww3GZQuBlNYwXAjMclykEXlbDeCEww3GZQuBRDfciMNd2JBN41MC9CMy1HckEHjVwLwJzbUcygUcN3IvAXNuRTOBRA/fyHZib+5pkAsOpBRYY3gA8nhssMLwBeDw3WGB4A/B4bvAMGPRMYBDmLIrAs1ZAzwQGYc6iCDxrBfRMYBDmLIrAs1ZAzwQGYc6iCDxrBfSsBQzKfU0UgeHUAgsMbwAezw0WGN4APJ4bLDC8AXg8N3gDOPkTgZP1NmYXeKOk5E8ETtbbmF3gjZKSPxE4WW9jdoE3Skr+ROBkvY3ZBd4oKfmTE+Dk3NfMLjCcWmCB4Q3A47nBAsMbgMdzgwWGNwCP5wb3gaNOCBzF1R9W4H5nUScEjuLqDytwv7OoEwJHcfWHFbjfWdQJgaO4+sMK3O8s6sQPgaNyXzOswHBqgQWGNwCP5wYLDG8AHs8NFhjeADyeG3wM/O4/EPjdPsfTCXxc4bv/4B8AAP//AIpmJgAAAAZJREFUAwAQywDBl+K3dgAAAABJRU5ErkJggg==",

applyAlpha: function(){
    },
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
                    }else{
                        node.animate({ opacity : 0 }, duration, function () { this.hide() });
                    }
                }
            });
        }else{
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
setPersistentAttributes: function(memento){
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
    translateToCppCode: function(){
        let contextNumberConnections = this.getInputPort("context_number").getConnections();
        let contextOutConnections = this.getOutputPort("context_ref").getConnections();

        let cCode = "";
        let zmqContextVariableName = "zmqContext_" + this.getId();
        if (contextNumberConnections.getSize() > 0) {
            let messageStrWireName = "wire_" + contextNumberConnections.first().getId();
            cCode += `zmq::message_t* ${zmqContextVariableName} = new zmq::message_t(${messageStrWireName}.begin(), ${messageStrWireName}.end());\n`;
        }
        if (contextOutConnections.getSize() > 0) {
            let contextOutWireName = "wire_" + contextOutConnections.first().getId();
            cCode += `${contextOutWireName} = ${zmqContextVariableName};\n`;                    //TODO: This will create value assignment just for first connected wire, need to be done for each connection
        }

        return cCode;
    },
});
