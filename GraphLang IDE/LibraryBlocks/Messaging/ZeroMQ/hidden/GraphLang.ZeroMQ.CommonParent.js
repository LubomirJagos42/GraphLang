/**
 *  @author LuboJ
 *  @description Common parent of all GraphLang.ZeroMQ nodes.
 *  Each node has its own init/createShapeElement/createSet (simple shape: rectangle, port lines, "zeroMQ" on top, method name on bottom)
 *  in shape designer format so it can be edited in symbol editor. This parent provides:
 *      - layer functions and persistence
 *      - C++ include/library (cppzmq, zmq.hpp) and Python import/library (pyzmq, import zmq)
 *      - small helpers for translation (input wire name, assign to output wires, error pass through)
 *  Port names are kept same as in previous versions of nodes so existing schematics stay connected.
 */
GraphLang.ZeroMQ.CommonParent = GraphLang.UserDefinedNode.extend({

    NAME: "GraphLang.ZeroMQ.CommonParent",

    init:function(attr, setter, getter){
        this._super(attr, setter, getter);
        //size of symbol as defined in child node init(), used when loading older schematics with different stored node size
        this.zmqSymbolWidth = this.getWidth();
        this.zmqSymbolHeight = this.getHeight();
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
    */
    setPersistentAttributes : function(memento){
        this._super(memento);

        // use node symbol size (older schematics stored different sizes which would stretch current shape)
        if (this.zmqSymbolWidth && this.zmqSymbolHeight) this.setDimension(this.zmqSymbolWidth, this.zmqSymbolHeight);

        this.resetChildren();

        $.each(memento.labels, $.proxy(function(i,json){
            var figure =  eval("new "+json.type+"()");
            figure.attr(json);
            var locator =  eval("new "+json.locator+"()");
            this.add(figure, locator);
        },this));
    },

    symbolPicture: "",

    jsonDocument: [],

    /*************************************************************************************************************************************************************
     *    Translation helpers
     *************************************************************************************************************************************************************/

    /**
     *  @method zmqVariableName
     *  @param {String} prefix - variable name prefix, ie. "zmqContext"
     *  @returns {String} variable name unique for this node
     */
    zmqVariableName: function(prefix){
        return prefix + "_" + this.getId().replaceAll('-', '_');
    },

    /**
     *  @method zmqInputWireName
     *  @param {String} portName
     *  @returns {String|null} variable name of wire connected to input port or null when not connected
     */
    zmqInputWireName: function(portName){
        var port = this.getInputPort(portName);
        if (!port) return null;
        var connections = port.getConnections();
        if (connections.getSize() == 0) return null;
        return connections.first().getVariableName();
    },

    /**
     *  @method zmqAssignOutput
     *  @param {String} portName - output port name
     *  @param {String} valueStr - expression assigned to each connected wire
     *  @param {String} lineEnd - ";\n" for C++, "\n" for python
     */
    zmqAssignOutput: function(portName, valueStr, lineEnd){
        var code = "";
        var port = this.getOutputPort(portName);
        if (!port) return code;
        port.getConnections().each(function(connectionIndex, connectionObj){
            code += connectionObj.getVariableName() + " = " + valueStr + lineEnd;
        });
        return code;
    },

    /**
     *  @method zmqErrorPassThrough
     *  @description error_in value is passed to error_out wires, when error_in is not connected error_out is set to "no error" value
     *  @param {String} lineEnd - ";\n" for C++, "\n" for python
     *  @param {String} noErrorValue - "0" for C++, "None" for python
     */
    zmqErrorPassThrough: function(lineEnd, noErrorValue){
        var errorInWireName = this.zmqInputWireName("error_in");
        return this.zmqAssignOutput("error_out", errorInWireName !== null ? errorInWireName : noErrorValue, lineEnd);
    },

    /*************************************************************************************************************************************************************
     *    TRANSLATE TO C/C++ code functions
     *************************************************************************************************************************************************************/

    translateToCppCodeLibraries: function(){
        return ["zmq"];
    },

    translateToCppCodeImport: function(){
        return "#include <zmq.hpp>\n";
    },

    /*************************************************************************************************************************************************************
     *    TRANSLATE TO Python code functions
     *************************************************************************************************************************************************************/

    translateToPythonCodeLibraries: function(){
        return ["pyzmq"];
    },

    translateToPythonCodeImport: function(){
        return "import zmq";
    },

});
