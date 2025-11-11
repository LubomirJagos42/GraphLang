// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
GraphLang.ZeroMQ.bind = GraphLang.ZeroMQ.CommonParent.extend({

    NAME: "GraphLang.ZeroMQ.bind",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:103.59375, height:84, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // socket_ref_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(4.826546003016591, 49.25485714285734));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#4dfaff");
        port.setName("socket_ref_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "zmq::socket_t*";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // message
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(4.826546003016591, 69.25485714285734));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#d54dff");
        port.setName("bind_str_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "string";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // error_out
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(90.54723861236805, 86.09180952380972));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#F3DE22");
        port.setName("error_out");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // error_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(4.826546003016591, 86.09180952380972));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#F3EC24");
        port.setName("error_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        this.persistPorts=false;
    },

    createShapeElement : function(){
        var shape = this._super();
        this.originalWidth = 103.59375;
        this.originalHeight= 84;
        return shape;
    },

    createSet: function(){
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L103.59375,0 L103.59375,84 L0,84");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path('M76.12575999999967 84L17.125759999999673 84L17.125759999999673 28L76.12575999999967 28Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        
        // Label
        shape = this.canvas.paper.text(0,0,'zeromq bind');
        shape.attr({"x":5,"y":13.5,"text-anchor":"start","text":"zeromq bind","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        
        // Line_shadow
        shape = this.canvas.paper.path('M76.5 72.5L90.5,72.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M76.5 72.5L90.5,72.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M16.5 41.5L1.5,41.5L2.5,41.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M16.5 41.5L1.5,41.5L2.5,41.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        
        // Line_shadow
        shape = this.canvas.paper.path('M16.5 73.5L4.5,73.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");
        
        // Line
        shape = this.canvas.paper.path('M16.5 73.5L4.5,73.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        

        return this.canvas.paper.setFinish();
    },

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

    /**
    * @method
    */
    addPort: function(port, locator){
        this._super(port, locator);
        return port;
    },

    /**
    * @method
    * Return an objects with all important attributes for XML or JSON serialization
    *
    * @returns {Object}
    */
    getPersistentAttributes : function(){
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
    setPersistentAttributes : function(memento){
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

    jsonDocument: [],

    translateToCppCode: function(){
        let socketInConnections = this.getInputPort("socket_ref_in").getConnections();
        let bindStrInConnections = this.getInputPort("bind_str_in").getConnections();     //TODO: This is socket mode, now hardwired value ZMQ_PUB in code

        let cCode = "";
        if (socketInConnections.getSize() > 0 && bindStrInConnections.getSize() > 0) {      //TODO: Message schema constant should be input no hardwired
            let socketWireName = socketInConnections.first().getVariableName();
            let bindStrWireName = bindStrInConnections.first().getVariableName();
            cCode += `${socketWireName}->bind(${bindStrWireName});\n`;
        }

        return cCode;
    }
    
});                                