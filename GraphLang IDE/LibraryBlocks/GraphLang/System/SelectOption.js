// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
GraphLang.Shapes.Basic.SelectOption = draw2d.shape.basic.Label.extend({

    NAME: "GraphLang.Shapes.Basic.SelectOption",

    sourceFigureId: null,
    optionEditor: new draw2d.ui.SelectOptionInplaceEditor(),

    init:function(attr, setter, getter)
    {
        this._super( $.extend({
            stroke:1,
            bgColor:null,
            flagAutoCreatePorts: false,
            userData: {nodeLabel: "enumValue"}
        },attr), setter, getter);
        var port;

        // out1
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100.36415510857161, 44.16847320627288));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("out1");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "polymorphic";
        port.userData.allowMultipleConnections = true;
        port.userData.connectionMandatory = false;

        this.persistPorts=false;

        this.installEditor(this.optionEditor);
        this.createContextMenu();
    },

    contextMenuItems: {},

    createContextMenu: function(){
        this.on("contextmenu", function(emitter, event){
            emitter.updateContextMenuItems();   //scan all user defined nodes and update menu

            $.contextMenu({
                selector: 'body',
                events:
                    {
                        hide:function(){ $.contextMenu( 'destroy' ); }
                    },

                //these functions are run after user click on some context menu option
                callback: $.proxy(function(key, options)
                {
                    switch(key){
                        case "showNodeLabel":
                            if (emitter.userData.nodeLabel != null) labelText = emitter.userData.nodeLabel;
                            else{
                                labelText = GraphLang.Utils.getUniqueNodeLabel(emitter.getCanvas(), 'nodeLabel');
                                emitter.userData.nodeLabel = labelText;
                            }

                            emitter.nodeLabel = new GraphLang.Shapes.Basic.Label({bgColor: '#000000', fontColor: '#FFFFFF', text: labelText});
                            emitter.add(emitter.nodeLabel, new draw2d.layout.locator.TopLocator());
                            emitter.nodeLabel.installEditor(new draw2d.ui.LabelInplaceEditor());
                            emitter.nodeLabel.on('change:text', function(nodeEmitter, event){
                                labelText = nodeEmitter.getText();
                                labelText = labelText.replaceAll(" ","_");
                                if (labelText != nodeEmitter.getParent().userData.nodeLabel) labelText = GraphLang.Utils.getUniqueNodeLabel(emitter.getCanvas(), labelText);
                                nodeEmitter.getParent().userData.nodeLabel = labelText;                  //when text change do this also in userData
                                nodeEmitter.text = labelText;                                                   //this will not fire another event!
                            });

                            break;
                        case "setTerminal":
                            emitter.setStroke(3);
                            emitter.setColor("#DD2241");
                            emitter.setDashArray("-");
                            emitter.userData.isTerminal = true;
                            break;
                        case "unsetTerminal":
                            emitter.setStroke(2);
                            emitter.setDashArray("");
                            emitter.setColor("#AA4A4C"); //stroke color
                            emitter.userData.isTerminal = false;
                            break;
                        default:
                            emitter.sourceFigureId = key;
                            console.log(`--> select option figure (${emitter.getId()}) changed source to enum (${key})`);
                            let sourceEnumFigure = emitter.getCanvas().getFigure(key);
                            console.log(`--> figure found: ${sourceEnumFigure}`);
                            let optionArray = sourceEnumFigure.getOptionArray();
                            console.log(`--> source enum array:`);
                            console.log(optionArray);
                            emitter.editor.setOptions(optionArray);
                            if (sourceEnumFigure)
                            break;
                    }

                },this),
                x:event.x,
                y:event.y,
                items: emitter.contextMenuItems,
            });
        });
    },

    updateContextMenuItems: function(){
        /*
         *  Add choices into cotext menu
         */
        this.contextMenuItems["showNodeLabel"] = {name: "Show node label"};
        this.contextMenuItems["sep1"] = "---------";
        this.contextMenuItems["setTerminal"] = {name: "Set as terminal"};
        this.contextMenuItems["unsetTerminal"] = {name: "Unset terminal"};
        this.contextMenuItems["sep2"] = "---------";
        this.contextMenuItems["null"] = {name: "null"};

        /*
         *  Scan current canvas paper.
         */
        let _contextMenuItems = this.contextMenuItems;
        let uniqueDatatypes = new draw2d.util.ArrayList();  //store just datatypes due they are unique
        if (this.getCanvas()) {
            this.getCanvas().getFigures().each(function (nodeIndex, nodeObj) {
                if (
                    nodeObj.getDatatype &&
                    nodeObj.getDatatype().startsWith("enumDatatype_") &&
                    !uniqueDatatypes.contains(nodeObj.getDatatype())
                ) {
                    uniqueDatatypes.add(nodeObj.getDatatype());
                    _contextMenuItems[nodeObj.getId()] = {name: "THIS CANVAS -> " + nodeObj.getNodeLabelText()};
                }
            });
        }
    },

    symbolPicture: "data:image/png;base64,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",

    jsonDocument: [],

    translateToCppCode: function(){
        cCode = "";
        let outputPort = this.getOutputPort("out1");
        outputPort.getConnections().each(function(wireIndex, wireObj){
            cCode += wireObj.getVariableName() + " = \" HARDCODED VALUE OF SELECT OPTION ID: " + outputPort.getId() + "\"";
        });
        return cCode;
    },

});