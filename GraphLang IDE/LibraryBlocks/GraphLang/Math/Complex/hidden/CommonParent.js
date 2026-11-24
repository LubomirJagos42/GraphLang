/**
 *  @author LuboJ
 *  @description Common parent for GraphLang.Math.Complex nodes (C++ std::complex<T>, python complex/cmath).
 *  It contains shared shape helpers (layers, persistence) and translation helper which fills expression template
 *  with wire names connected to input ports and assigns result to all wires connected to output port.
 */
GraphLang.Math.Complex.CommonParent = GraphLang.UserDefinedNode.extend({
    NAME: "GraphLang.Math.Complex.CommonParent",

    init:function(attr, setter, getter)
    {
        this._super( $.extend({stroke:0, bgColor:null, width: 100, height: 50},attr), setter, getter);
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

    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
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
    setPersistentAttributes : function(memento)
    {
        this._super(memento);

        this.resetChildren();

        $.each(memento.labels ? memento.labels : [], $.proxy(function(i,json){
            var figure =  eval("new "+json.type+"()");
            figure.attr(json);
            var locator =  eval("new "+json.locator+"()");
            this.add(figure, locator);
        },this));
    },

    /**
     * @method getComplexOutputDatatype
     * @description Complex output port datatype follows complex datatype of first connected complex input wire
     * (ie. std::complex<float> in -> std::complex<float> out), otherwise default port datatype is returned.
     * @param {string} defaultDatatype
     * @returns {string}
     */
    getComplexOutputDatatype: function(defaultDatatype){
        let resultDatatype = defaultDatatype;
        let found = false;
        this.getInputPorts().each((index, inPort) => {
            if (found || inPort.getConnections().getSize() == 0) return;
            let inputWire = inPort.getConnections().first();
            let wireDatatype = inputWire.getDatatype ? inputWire.getDatatype() : undefined;
            if (typeof wireDatatype === "string" && wireDatatype.startsWith("std::complex<")){
                resultDatatype = wireDatatype;
                found = true;
            }
        });
        return resultDatatype;
    },

    /**
     * @method translateExpressionToCode
     * @description Replaces {in1}, {in2}, ... in expression template with wire names connected to input ports and assigns result
     * to every wire connected to output port.
     * @param {string} expressionTemplate
     * @param {string} language - "cpp" or "python"
     * @returns {string} code, each line ends with \n
     */
    translateExpressionToCode: function(expressionTemplate, language){
        let code = "";
        let comment = (text) => language == "python" ? `# ${text}\n` : `/* ${text} */\n`;
        let lineEnd = language == "python" ? "\n" : ";\n";

        let expression = expressionTemplate;
        let missingInputs = [];
        this.getInputPorts().each((portIndex, portObj) => {
            let portName = portObj.getName();
            if (portObj.getConnections().getSize() > 0){
                expression = expression.replaceAll(`{${portName}}`, portObj.getConnections().first().getVariableName());
            }else{
                missingInputs.push(portName);
            }
        });
        if (missingInputs.length > 0){
            return comment(`ERROR: ${this.NAME} input ${missingInputs.join(", ")} not connected, no code generated`);
        }

        let outPort = this.getOutputPort("out1");
        if (outPort.getConnections().getSize() == 0){
            return comment(`MISSING OUTPUT WIRES CONNECTED TO ${this.NAME} OUTPUT, NO CODE GENERATED`);
        }
        outPort.getConnections().each((connIndex, connObj) => {
            code += connObj.getVariableName() + " = " + expression + lineEnd;
        });
        return code;
    },

});
