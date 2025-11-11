GraphLang.ZeroMQ.Message = GraphLang.ZeroMQ.CommonParent.extend({
NAME: "GraphLang.ZeroMQ.Message",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:101.97364425000035, height:77.1947193145752, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // message_str
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(15.726730291881628, 46.076726012344714));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#F307F3");
        port.setName("message_str");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "string";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // error_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(15.726730291881628, 86.16112592304898));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#F3EC24");
        port.setName("error_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // error_out
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(102.80930996540322, 86.16112592304898));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#F3DE22");
        port.setName("error_out");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // message_ref
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(102.80930996540322, 46.076726012344714));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#00F3AA");
        port.setName("message_ref");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "zmq::message_t*";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        this.persistPorts=false;
    },

    createShapeElement : function(){
        var shape = this._super();
        this.originalWidth = 101.97364425000035;
        this.originalHeight= 77.1947193145752;
        return shape;
    },

    createSet: function(){
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L101.97364425000035,0 L101.97364425000035,77.1947193145752 L0,77.1947193145752");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path('M86.16288000000009 77.1947193145752L27.162880000000087 77.1947193145752L27.162880000000087 21.194719314575195L86.16288000000009 21.194719314575195Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        
        // Label
        shape = this.canvas.paper.text(0,0,'zeromq message');
        shape.attr({"x":4,"y":11,"text-anchor":"start","text":"zeromq message","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        
        // Line_shadow
        shape = this.canvas.paper.path('M86.5 66.5L100.5,66.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M86.5 66.5L100.5,66.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M26.5 34.5L12.5,34.5L12.5,34.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M26.5 34.5L12.5,34.5L12.5,34.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M26.5 66.5L14.5,66.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M26.5 66.5L14.5,66.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M86.5 34.5L101.5,34.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M86.5 34.5L101.5,34.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        

        return this.canvas.paper.setFinish();
    },

    symbolPicture: "data:image/png;base64,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",

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
        let messagePortConnections = this.getInputPort("message_str").getConnections();
        let messageOutConnections = this.getOutputPort("message_ref").getConnections();

        let cCode = "";
        let zmqMessageVariableName = "zmqMessage_" + this.getId();
        if (messagePortConnections.getSize() > 0) {
            let messageStrWireName = messagePortConnections.first().getVariableName();
            cCode += `zmq::message_t* ${zmqMessageVariableName} = new zmq::message_t(${messageStrWireName}.begin(), ${messageStrWireName}.end());\n`;
        }
        if (messageOutConnections.getSize() > 0) {
            let messageOutWireName = messageOutConnections.first().getVariableName();
            cCode += `${messageOutWireName} = ${zmqMessageVariableName};\n`;                    //TODO: This will create value assignment just for first connected wire, need to be done for each connection
        }

        return cCode;
    },

});
