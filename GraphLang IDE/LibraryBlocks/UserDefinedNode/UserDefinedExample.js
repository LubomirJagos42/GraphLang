UserDefinedExample = GraphLang.UserDefinedNode.extend({
    NAME: "UserDefinedExample",
    init: function(attr, setter, getter)
    {
        this._super( $.extend({stroke:0, bgColor:null, width:51.524223999999776, height:42, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // in2
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-8.686741211280044, 80.95238095238095));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("in2");
        port.setMaxFanOut(20);
        port.userData = {datatype: "int"};
        // in1
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-8.686741211280044, 28.57142857142857));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("in1");
        port.setMaxFanOut(20);
        port.userData = {datatype: "float"};
        // return
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(105.82250399346144, 54.76190476190476));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("return");
        port.setMaxFanOut(20);
        port.userData = {datatype: "undefined"};
        this.persistPorts=false;
    },
    createShapeElement: function()
    {
        var shape = this._super();
        this.originalWidth = 51.524223999999776;
        this.originalHeight= 42;
        return shape;
    },
    createSet: function()
    {
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L51.524223999999776,0 L51.524223999999776,42 L0,42");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M9.524223999999776 0L51.524223999999776 0L51.524223999999776 42L9.524223999999776 42Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Line_shadow
        shape = this.canvas.paper.path('M20.5 38.5L23.5,26.5L36.5,34.5L28.5,7.5L42.5,10.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M20.5 38.5L23.5,26.5L36.5,34.5L28.5,7.5L42.5,10.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        // Line_shadow
        shape = this.canvas.paper.path('M0.5 9.5L9.5,9.5L9.5,9.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M0.5 9.5L9.5,9.5L9.5,9.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        // Line_shadow
        shape = this.canvas.paper.path('M0.5 33.5L9.5,33.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M0.5 33.5L9.5,33.5');
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
    jsonDocument: [{"type":"GraphLang.Shapes.Basic.ConstantNode","id":"6420c6a9-54f2-6037-f12d-d600b110114e","x":228,"y":70,"width":25.5615234375,"height":25.199999809265137,"alpha":1,"angle":45,"userData":{"datatype":"std::complex<double>","isTerminal":true},"cssClass":"GraphLang_Shapes_Basic_ConstantNode","bgColor":"#636363","color":"#636363","stroke":3,"radius":0,"dasharray":"-","text":"11.1 + 11.1j","outlineStroke":0,"outlineColor":"none","fontSize":12,"fontColor":"#000000","fontFamily":null,"editor":"draw2d.ui.LabelInplaceEditor"},{"type":"GraphLang.Shapes.Basic.ConstantNode","id":"987b11dd-d9cc-b205-0903-9257ba0fab60","x":200,"y":196,"width":28.33984375,"height":25.199999809265137,"alpha":1,"angle":345,"userData":{"datatype":"std::complex<double>","isTerminal":true},"cssClass":"GraphLang_Shapes_Basic_ConstantNode","bgColor":"#636363","color":"#636363","stroke":3,"radius":0,"dasharray":"-","text":"22.2+22.2j","outlineStroke":0,"outlineColor":"none","fontSize":12,"fontColor":"#000000","fontFamily":null,"editor":"draw2d.ui.LabelInplaceEditor"},{"type":"GraphLang.Math.Basic.Add","id":"1175c4d9-29c2-1044-ca87-8716067f8866","x":335,"y":123,"width":123.40234375,"height":78,"alpha":1,"angle":0,"userData":{},"cssClass":"GraphLang_Math_Basic_Add","bgColor":"none","color":"#1B1B1B","stroke":0,"radius":0,"dasharray":null,"labels":[]},{"type":"HwRaspiZero.Console.output","id":"0a13aeb1-400b-6146-3346-7f075fb1f621","x":420,"y":207,"width":69,"height":55,"alpha":1,"angle":0,"userData":{},"cssClass":"HwRaspiZero_Console_output","bgColor":"none","color":"#1B1B1B","stroke":0,"radius":0,"dasharray":null,"labels":[]},{"type":"HoverConnection","id":"c970f256-6e34-a3e5-12dc-5c3bb97b1b28","alpha":1,"angle":0,"userData":{},"cssClass":"HoverConnection","stroke":1.35,"color":"#FAB700","outlineStroke":0,"outlineColor":"none","policy":"draw2d.policy.line.OrthogonalSelectionFeedbackPolicy","vertex":[{"x":445.453125,"y":155.5},{"x":465.453125,"y":155.5},{"x":465.453125,"y":194.25},{"x":388,"y":194.25},{"x":388,"y":233},{"x":408,"y":233}],"router":"draw2d.layout.connection.InteractiveManhattanConnectionRouter","radius":5,"routingMetaData":{"routedByUserInteraction":false,"fromDir":1,"toDir":3},"source":{"node":"1175c4d9-29c2-1044-ca87-8716067f8866","port":"out1"},"target":{"node":"0a13aeb1-400b-6146-3346-7f075fb1f621","port":"Port"}},{"type":"HoverConnection","id":"a339a9df-d99d-349f-bdc9-a5f441635247","alpha":1,"angle":0,"userData":{},"cssClass":"HoverConnection","stroke":1.35,"color":"#636363","outlineStroke":0,"outlineColor":"#303030","policy":"draw2d.policy.line.OrthogonalSelectionFeedbackPolicy","vertex":[{"x":295.2063611735947,"y":113.40362679859473},{"x":331.82974308679735,"y":113.40362679859473},{"x":331.82974308679735,"y":144.5},{"x":368.453125,"y":144.5}],"router":"draw2d.layout.connection.InteractiveManhattanConnectionRouter","radius":5,"routingMetaData":{"routedByUserInteraction":false,"fromDir":1,"toDir":3},"source":{"node":"6420c6a9-54f2-6037-f12d-d600b110114e","port":"out1"},"target":{"node":"1175c4d9-29c2-1044-ca87-8716067f8866","port":"in1"}},{"type":"HoverConnection","id":"a5a6cc0b-631f-0ea1-3b8c-12f7a476feaa","alpha":1,"angle":0,"userData":{},"cssClass":"HoverConnection","stroke":1.35,"color":"#636363","outlineStroke":0,"outlineColor":"none","policy":"draw2d.policy.line.OrthogonalSelectionFeedbackPolicy","vertex":[{"x":272.92936185409064,"y":199.93315236377344},{"x":320.6912434270453,"y":199.93315236377344},{"x":320.6912434270453,"y":166.5},{"x":368.453125,"y":166.5}],"router":"draw2d.layout.connection.InteractiveManhattanConnectionRouter","radius":5,"routingMetaData":{"routedByUserInteraction":false,"fromDir":1,"toDir":3},"source":{"node":"987b11dd-d9cc-b205-0903-9257ba0fab60","port":"out1"},"target":{"node":"1175c4d9-29c2-1044-ca87-8716067f8866","port":"in2"}}],
    translateToCppCode: function(){

        /*
         *  First translate this node function as spearate function, call IDE method for this, THIS IDE METHOD MUST BE DEFINED!
         *  Passing reference to this object. Schematic in jsonDocument is used.
         */
        let cCode = "";

        let paramsCounter = 0;
        let paramsStr = "";
        this.getInputPorts().each(function(portIndex, portObj){
            let connections = portObj.getConnections();
            if (paramsCounter > 0) paramsStr += ', ';

            if (connections.getSize() > 0){
                paramsStr += 'wire_' + connections.first().getId();
            }else{
                paramsStr += 'null';
            }

            paramsCounter++;
        });

        let functionCallStr = this.translateToCppCodeFunctionName() + '(' + paramsStr + ')';

        if (this.getOutputPorts().getSize() > 0){
            /*
             *  Node output translation process defined just for first output port! This is for C/C++ there is nothing like multiple rturn values.
             */
            let connections = this.getOutputPorts().first().getConnections()
            if (connections.getSize() > 0){
                connections.each(function(connectionIndex, connectionObj){
                    cCode += 'wire_' + connectionObj.getId() + ' = ' + functionCallStr + ";\n";
                });
            }else{
                cCode += functionCallStr + "; /* output not assigned */ \n";
            }

        }else{
            cCode += functionCallStr + "; /* node has no output port */ \n";
        }

        return cCode;
    },
});
        