// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
GraphLang.Shapes.Basic.ClusterSelectOption = draw2d.shape.basic.Label.extend({

    NAME: "GraphLang.Shapes.Basic.ClusterSelectOption",

    init:function(attr, setter, getter)
    {
        this._super( $.extend({
            stroke:1,
            bgColor:null,
            flagAutoCreatePorts: false,
            userData: {
                nodeLabel: "cluster ref. name",
                sourceFigureId: null,
                isClusterRef: true,
            }
        },attr), setter, getter);
        var port;

        /*
         *  Add text "enum" on bottom of figure to distinguished it better from other nodes
         */
        this.add(
            new draw2d.shape.basic.Label({text: "cluster select", stroke: 0}),
            new draw2d.layout.locator.XYRelPortLocator(0, 100.0)
        );

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
                                labelText = labelText.replaceAll(".","_");
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
                            emitter.userData.sourceFigureId = key;

                            /*
                             *  Get reference enum from whole project
                             */
                            let structSerializedObj = GraphLang.Utils.getObjectInProjectFromJSONById(key);
                            let sourceStructFigure = eval(`new ${structSerializedObj.type}()`);
                            sourceStructFigure.setPersistentAttributes(structSerializedObj);

                            emitter.setText(sourceStructFigure.getNodeLabelText());

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

        /*
         *  Scan current canvas paper.
         */
        let _contextMenuItems = this.contextMenuItems;
        let uniqueDatatypes = new draw2d.util.ArrayList();  //store just datatypes due they are unique
        if (this.getCanvas()) {
            let projectClusterObjectList = GraphLang.Utils.getObjectInProjectFromJSON({object: {userData: {isCluster: true}}});
            projectClusterObjectList.each((clusterIndex, clusterObject) => {
                let clusterId = clusterObject.objectId;
                let clusterSerializedObj = GraphLang.Utils.getObjectInProjectFromJSONById(clusterId);

                let clusterName = clusterObject.parentNodeName ? clusterObject.parentNodeName + " -> " : "THIS CANVAS -> ";
                clusterName += clusterSerializedObj && clusterSerializedObj.userData && clusterSerializedObj.userData.nodeLabel ? clusterSerializedObj.userData.nodeLabel : clusterId;

                _contextMenuItems[clusterId] = {name: clusterName};
            });

        }
    },

    updatePortDatatype: function(){
        //search for enum object in whole project
        let clusterSerializedObj = GraphLang.Utils.getObjectInProjectFromJSONById(this.userData.sourceFigureId);

        if (clusterSerializedObj){
            //create object on the fly to be able call its methods
            let sourceClusterFigure = eval(`new ${clusterSerializedObj.type}()`);

            //update newly created object attributes to get same behaviour as it will be placed on canvas (this object has no connected wires!!!)
            sourceClusterFigure.setPersistentAttributes(clusterSerializedObj);

            //call enum method to get datatype, this is using object standard api
            this.getOutputPorts().first().userData.datatype = sourceClusterFigure.getDatatype();
        }else{
            this.getOutputPorts().first().userData.datatype = "undefined";
        }
    },

    //loading from file attributes, sourceFigureId needs to be set
    setPersistentAttributes : function(memento)
    {
        this._super(memento);

        if (memento.userData.sourceFigureId){
            this.updatePortDatatype();
        }
    },

    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAABACAYAAAA0/7Q7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUkSURBVHhe7Zq/SyRnGMev3P/By3IpwnKBc1ERjhzm1oBlhCCkUAaElDaKEdKF1JsloFUaQbAzEC5uFYtAigPxOpsDCRiEKzzMFelsnvDOzrzv8+MdZ9zJend73+KD7rzvO/Pu83zmmV32uXd9fU0AcO7pAwBACmCAFMAAKYABUgADpAAGSAEMkAIYIAUwQApggBTAUCpFt9sF7zE6n1WAFGPM7OysyWcVKkuhj4N3m/Pzc0gBJJACGCAFMEAKINjd3aXFxUVqNps0NzdH6+vrdHx8bOYVASnGiMvLS1paWqKJiYko29vbZk2MGlL0KWk0qGFoU++lnjsa+qvy2skzO8fwskftRkJ9fbwi7prt7pk8/iwR+zDjRfC91NyXY2VlxYigOTg4MOs0taWolIgRkAox3aOz/Fga1Ar7qRl8LcVZt00Ncb4z6k03qLHaN2sNNffCOTw8FMmf+mGbnv75Fz359Tm1vlr2xzudjlmrGZ0U2RtO2N3s57o7iyU0DWwaxEFAk+4gwfldFypCHsDBPH1HpvN8MrLk6GvrRPC7nEumKpFbPxCAVwMXg1hlZMez6/X82nw+r7QJ9SvuK5VyNfHxycc2Nzd94h+tf09fnP7r6ZxcUrP1qR8/PT1V+5WMWIqQOHFnl0gh5vlzSBF8ggruSCFIeh6ZpFCy8yTJOzzsSa4RlUK9jwDbaxYHcd58jdkL/z+PrdzXQFQ7b3k5VIPZn3+jzos39PTFP9nfN/TJl1/78aOjIxMvTm0pvM3aahFwFcASKXzQ1d2jS7fZgxdEC5tVIPeanVMkSOyLzVfvu5oUbJ6OQ6SKGCn0eVOpg5S6Grp9rq2t+aRPfvcjff78teDB9GM/fnJyYvbLqS1FLHApsXJYUYqiUm+l4HCh4sKGJDEpzDw3VvzehpOCxaGCFEZWNiZjEOK1v7/vk37/wcc0/dMv9OSPV/TZ73/Tw2++DcJMTpq9at4JKYL9VaVw1+aBHhDkKnrWR4IfffxUrBSF19GJZ3P46wIpdHx0pYhJ4V7Pz8/75DuaDx/RxEdNcWxnZ8e8J83bk0J/4LqVFLqMhvNEx9Pz2MeHTli6JtujXT+Yp6tV6beP7Nr5mv/jM0WRFO6xMDU1JSTgbGxssHgVU1sKW34jwXfEqkNWrtNP5reUQp6DPR78/rJg6rHYvsSjI74+31P+yBHXEudQY9n1wrcwfo08hrf89lEghePi4oK2trao1Wp5GRYWFmhvb4/F5mZqSAEqoZN9R7jfPmZmZujq6sqMlQEpRs1blAI/iAEBpAAGSAEMkAIYIAUw3IkU4P0DUoAoOp9VKJUCfHhACmCAFMAAKYABUgDDhyVFzR+n9E/34wqkuAWQooysO8g0jqTNNAklvkFFdkuHhhDdsqbb4FkTT7RlTje3lDfIGCkKGlkcvIHHrbft/ZH9jAlDSiFb8XgbWx5o20pWJoVqpSvqcRR7CMdd0qKteLz1z7S8SWHzNZXa+8eY4aRgjaTpax5sNVbYqW2kkAkO1aFCc6w5zq/Drsv2aTqmfbug3mcAUtyE6kkMJd/2YlaXIiaSmqf3wR9h/prx3tE0mVoKM8+NaakCkOImVOJvGiuUgleHYaVg3H17//gynBTqbhJt7iVSiOd2HSkia6KfKbJqoh8f+pHFPxfZ9YN5kKIMXrp50gqlkGva3V7tx4d4BIjKdYft/WPI8FKAsQVSAAOkAAZIAQyQAhggBTBACmCAFMAAKYABUgADpAAGSAEM/wGI67+hCzuxwwAAAABJRU5ErkJggg==",

    jsonDocument: [],

    getDatatype: function(){
        let datatypeStr = "undefined";

        //search for enum object in whole project
        let clusterSerializedObj = GraphLang.Utils.getObjectInProjectFromJSONById(this.userData.sourceFigureId);

        if(clusterSerializedObj){
            let clusterFigure = eval(`new ${clusterSerializedObj.type}()`);
            clusterFigure.setPersistentAttributes(clusterSerializedObj);
            if (clusterFigure) datatypeStr = clusterFigure.getDatatype();
        }

        return datatypeStr;
    },

    getVariableName: function(){
        let variableName = "clusterDatatype_" + this.getId();
        if (this.userData.nodeLabel) {
            let nodeLabelStr = this.userData.nodeLabel;
            nodeLabelStr = nodeLabelStr
                .replaceAll(' ', '_')
                .replaceAll('.', '_')
                .replaceAll('*', '_')
                .replaceAll('-', '_');

            variableName += "_" + nodeLabelStr;
        }
        return variableName
    },

    getNodeLabelText: function(){
        let nodeLabelStr = "";

        //this must return cluster source figure node label text
        let clusterNodeInfo = GraphLang.Utils.getObjectInProjectFromJSONById(this.userData.sourceFigureId);

        nodeLabelStr = clusterNodeInfo.userData.nodeLabel;
        nodeLabelStr = nodeLabelStr
            .replaceAll(' ', '_')
            .replaceAll('.', '_')
            .replaceAll('*', '_')
            .replaceAll('-', '_');

        return nodeLabelStr;
    },

    getSourceFigureId: function(){
        let sourceFigureId = "";
        if (this.userData && this.userData.sourceFigureId && this.userData.sourceFigureId.length > 0){
            sourceFigureId = this.userData.sourceFigureId;
        }
        return sourceFigureId;
    },

    validateSelf: function(canvasOwnerName){
        let errorList = new draw2d.util.ArrayList();

        if (this.userData !== undefined && this.userData !== null && typeof this.userData.sourceFigureId === "string" && this.userData.sourceFigureId.length > 0){
            let sourceFigureInProject = GraphLang.Utils.getObjectInProjectFromJSONById(this.userData.sourceFigureId);
            if (sourceFigureInProject === null){
                errorList.add({
                    canvasOwnerName: canvasOwnerName,
                    figureName: this.NAME,
                    figureId: this.getId(),
                    portName: null,
                    type: GraphLang.Utils.ErrorList.SOURCE_FIGURE_NOT_EXISTS,
                    message: `cluster select option with id "${this.getId()}", specified source figure "${this.userData.sourceFigureId}" not longer available in project!'`
                });
            }
        }

        return errorList;
    },

    /*****************************************************************************************************
     *  C++ code translation functions
     *****************************************************************************************************/

    translateToCppCodeImport: function(){
        let importStatementStr = "";

        //search for enum object in whole project
        let serializedObj = GraphLang.Utils.getObjectInProjectFromJSONById(this.userData.sourceFigureId);
        let sourceFigure = eval(`new ${serializedObj.type}()`);
        sourceFigure.setPersistentAttributes(serializedObj);

        if (sourceFigure && typeof sourceFigure.translateToCppCodeImport === "function") importStatementStr = sourceFigure.translateToCppCodeImport();
        else{
            let nodeInfo = GraphLang.Utils.getObjectInProjectFromJSON({id: this.userData.sourceFigureId}).first();
            let nodeParentFigure = eval(`new ${nodeInfo.parentNodeName}()`);
            if (nodeParentFigure && typeof nodeParentFigure.translateToCppCodeImport === "function") importStatementStr = nodeParentFigure.translateToCppCodeImport();
        }

        return importStatementStr;
    },

    //instead of classic C enum which is unscoped its in graphlang used C++ enum class which is scoped
    //enum class is not implicitly typed and therefore if is printed needs to be static_cast<int> or something else
    translateToCppCodeDeclaration: function(){
        let cCode = "";

        if (!this.userData.sourceFigureId || this.userData.sourceFigureId === ""){
            cCode += "/*\n";
            cCode += Error().stack;
            cCode += "\n";
            cCode += "*/\n";
            return cCode
        }

        cCode += this.getDatatype() + " " + this.getVariableName() + ";\n";
        return cCode;
    },

    translateToCppCode: function(){
        let cCode = "";
        let outputPort = this.getOutputPort("out1");

        if (!this.userData.sourceFigureId || this.userData.sourceFigureId === ""){
            cCode += "/*\n";
            cCode += Error().stack;
            cCode += "\n";
            cCode += "*/\n";
            return cCode
        }

        let selectOptionObj = this;
        outputPort.getConnections().each(function(wireIndex, wireObj){
            cCode += wireObj.getVariableName() + " = " + selectOptionObj.getVariableName() + ";\n";
        });
        return cCode;
    },

});