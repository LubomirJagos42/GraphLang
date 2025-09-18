// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
GraphLang.ZeroMQ.CommonParent = GraphLang.UserDefinedNode.extend({

    NAME: "GraphLang.ZeroMQ.CommonParent",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:180.515625, height:85, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        this.persistPorts=false;
    },

    createShapeElement : function(){
        var shape = this._super();
        this.originalWidth = 180.515625;
        this.originalHeight= 85;
        return shape;
    },

    createSet: function(){
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L180.515625,0 L180.515625,85 L0,85");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M85 85L30 85L30 30L85 30Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'zeromq common parent');
        shape.attr({"x":5,"y":13.5,"text-anchor":"start","text":"zeromq common parent","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");


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

    translateToCppCodeImport: function(){
        return "#include <zmq.hpp>\n";
    },

});
