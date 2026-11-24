/**
 *  @author LuboJ
 *  @description Common parent of PythonQtGuiLib nodes (UiLoad, UiShow, UiExec) which load and display Qt Designer .ui files.
 *  These nodes have ONLY python code generator methods (PySide6: QApplication, QUiLoader), there is no C/C++ translation.
 *  Each node has its own init/createShapeElement/createSet in shape designer format so it can be edited in symbol editor.
 *  This parent provides:
 *      - layer functions and persistence (keeps symbol size from child init when loading older schematics)
 *      - Python import/library (pip package PySide6)
 *      - small helpers for translation (variable name, input wire name, assign to output wires)
 */
PythonQtGuiLib.CommonParent = GraphLang.UserDefinedNode.extend({

    NAME: "PythonQtGuiLib.CommonParent",

    init:function(attr, setter, getter){
        this._super(attr, setter, getter);
        //size of symbol as defined in child node init(), used when loading older schematics with different stored node size
        this.qtSymbolWidth = this.getWidth();
        this.qtSymbolHeight = this.getHeight();
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
        if (this.qtSymbolWidth && this.qtSymbolHeight) this.setDimension(this.qtSymbolWidth, this.qtSymbolHeight);

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
     *  @method qtVariableName
     *  @param {String} prefix - variable name prefix, ie. "qtUiWindow"
     *  @returns {String} variable name unique for this node
     */
    qtVariableName: function(prefix){
        return prefix + "_" + this.getId().replaceAll('-', '_');
    },

    /**
     *  @method qtInputWireName
     *  @param {String} portName
     *  @returns {String|null} variable name of wire connected to input port or null when not connected
     */
    qtInputWireName: function(portName){
        var port = this.getInputPort(portName);
        if (!port) return null;
        var connections = port.getConnections();
        if (connections.getSize() == 0) return null;
        return connections.first().getVariableName();
    },

    /**
     *  @method qtAssignOutput
     *  @param {String} portName - output port name
     *  @param {String} valueStr - python expression assigned to each connected wire
     *  @returns {String} python lines "wire = value\n" for each wire connected to output port
     */
    qtAssignOutput: function(portName, valueStr){
        var code = "";
        var port = this.getOutputPort(portName);
        if (!port) return code;
        port.getConnections().each(function(connectionIndex, connectionObj){
            code += connectionObj.getVariableName() + " = " + valueStr + "\n";
        });
        return code;
    },

    /*************************************************************************************************************************************************************
     *    TRANSLATE TO Python code functions (no C/C++ translation for these nodes)
     *************************************************************************************************************************************************************/

    translateToPythonCodeLibraries: function(){
        return ["PySide6"];
    },

    translateToPythonCodeImport: function(){
        return [
            "import os",
            "import sys",
            "from PySide6.QtWidgets import QApplication",
            "from PySide6.QtUiTools import QUiLoader",
            "from PySide6.QtCore import QFile, QIODevice",
        ];
    },

});
