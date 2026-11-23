/*****************************************************************************************************************************
 *  PYTHON CODE HELPERS
 *      - used by translator object below and also by nodes in their translateToPythonCode...() methods
 *****************************************************************************************************************************/

/**
 * @memberOf GraphLang.Utils
 * @description Indentation used for generated python code (python is indentation sensitive, therefore one string is used everywhere).
 * @type {string}
 */
GraphLang.Utils.PYTHON_INDENT = "    ";

/**
 * @memberOf GraphLang.Utils
 * @description Indent python code block, each NON EMPTY line is prefixed by indentation, empty lines stay empty. Line count is not changed.
 * Nodes return their python code WITHOUT any base indentation and owner (loop, function, template) indents it, this way
 * indentation is always right also for nested structures.
 * @param {string} pythonCode - code block, lines separated by "\n"
 * @param {number} level - how many indentation levels are added
 * @returns {string} indented python code
 */
GraphLang.Utils.indentPythonCode = function(pythonCode, level = 1){
    if (pythonCode === undefined || pythonCode === null) return "";
    let indentStr = GraphLang.Utils.PYTHON_INDENT.repeat(level);
    return String(pythonCode).split("\n").map((lineStr) => lineStr.trim().length > 0 ? indentStr + lineStr : lineStr).join("\n");
}

/**
 * @memberOf GraphLang.Utils
 * @description Python block (for, while, def, if) cannot be empty, if block contains just comments or nothing "pass" is added.
 * @param {string} pythonCode - block body code (not indented)
 * @returns {string} block body which is valid python block
 */
GraphLang.Utils.ensurePythonBlockNotEmpty = function(pythonCode){
    let hasStatement = String(pythonCode).split("\n").some((lineStr) => lineStr.trim().length > 0 && !lineStr.trim().startsWith("#"));
    if (hasStatement) return pythonCode;
    if (pythonCode.length > 0 && !pythonCode.endsWith("\n")) pythonCode += "\n";
    return pythonCode + "pass\n";
}

/**
 * @memberOf GraphLang.Utils
 * @description Convert GraphLang value written as text into python literal based on its datatype.
 * @param {string} valueStr - value as written in node, ie. "true", "3.14", "hello"
 * @param {string} datatype - GraphLang (C++ like) datatype, ie. "bool", "string", "int"
 * @returns {string} python literal, ie. True, 3.14, "hello"
 */
GraphLang.Utils.toPythonLiteral = function(valueStr, datatype = ""){
    let datatypeLower = String(datatype).toLowerCase();
    let value = valueStr === undefined || valueStr === null ? "" : String(valueStr);

    if (datatypeLower.search("string") > -1 || datatypeLower.search("char*") > -1) return JSON.stringify(value);
    if (datatypeLower.search("bool") > -1) return value.trim().toLowerCase() === "true" || value.trim() === "1" ? "True" : "False";
    if (value.trim() === "") return "None";
    if (datatypeLower === "char") return JSON.stringify(value);
    if (datatypeLower.search("complex") > -1){
        //C++ std::complex<...> constant text ie. "1.0 + 2.0i" -> complex(1.0, 2.0)
        let complexParts = GraphLang.Utils.parseComplexLiteral ? GraphLang.Utils.parseComplexLiteral(value) : null;
        if (complexParts) return `complex(${complexParts.re}, ${complexParts.im})`;
    }
    return value;
}

/**
 * @class
 * @author Lubomir Jagos
 * @description Translator object which translates schematic into python code, this class has same interface and structure as
 * {@link TranslateToCppCode_2_TranslatorObject}, but it calls translateToPythonCode...() methods of nodes.
 *
 * Python specific rules:
 *  - each node returns its python code WITHOUT base indentation, structure which owns node code (loop, subnode function, template) indents it,
 *    use {@link GraphLang.Utils.indentPythonCode}
 *  - wires are "declared" as variable = None, this way each variable exists before it's used (ie. not connected input of tunnel)
 *  - subnodes (nodes with schematic inside) are translated into functions, input terminals are function params, output terminals are
 *    returned as list, call looks like: [out_1, out_2] = Node__Name(in_1, in_2)
 */
class TranslateToPythonCode_2_TranslatorObject {

    translatorCanvasObj = null;

    //auxiliary ArrayList store declaration of some variables or something during translation process
    translateToPythonCodeFunctionsArray = new draw2d.util.ArrayList();

    translateToPythonCodeImportArray = new draw2d.util.ArrayList();
    translateToPythonCodeLibrariesList = new draw2d.util.ArrayList();              //additional python packages which must be installed (pip)
    translateToPythonCodeTypeDefinitionArray = new draw2d.util.ArrayList();
    translateToPythonCodeSubnodeArray = new draw2d.util.ArrayList();
    translateToPythonCodeSubnodeInputTerminalsDefaultValuesArray = new draw2d.util.ArrayList();
    translateSubnodeCanvasArray = new draw2d.util.ArrayList();

    typeDefinitionUsedList = new draw2d.util.ArrayList();
    typeDefinitionNeededList = new draw2d.util.ArrayList();
    translateClusterTypeDefinitionCanvasArray = new draw2d.util.ArrayList();
    translateClusterTypeDefinitionItems = [];          //this stores array[custer_datatype_name] = map of item labels: datatype

    translateToPythonCodeAdditionalId = new draw2d.util.ArrayList();
    translateToPythonCodeAdditionalIdNoHyphen = new draw2d.util.ArrayList();

    translateToPythonCodeErrorList = new draw2d.util.ArrayList();
    translateToPythonCodeBreakpointList = new draw2d.util.ArrayList();
    translateToPythonCodeWatchList = new draw2d.util.ArrayList();

    /**
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @description Line offset used to find breakpoint, watch during debugging.
     * @type {number}
     */
    GLOBAL_CODE_LINE_OFFSET = 0;
    /**
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @description Auxiliary line offset used to find breakpoint, watch during debugging.
     * @type {number}
     */
    GLOBAL_CODE_LINE_OFFSET_BEFORE_SUBNODES = 0;
    /**
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @description Object reference returned when asked this API which line generates specific code line.
     * @type {Object}
     */
    GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = null;

    constructor(paramsObj) {
        if (paramsObj && typeof paramsObj.canvasObj === "object") this.translatorCanvasObj = paramsObj.canvasObj;
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @param {Object} canvasObj
     */
    setCanvas = (canvasObj) => {
        this.translatorCanvasObj = canvasObj;
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @returns {number} line offset from internal class instance variable
     */
    getCurrentTranslateLineOffset = () => {
        return this.GLOBAL_CODE_LINE_OFFSET;
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @returns {draw2d.util.ArrayList}
     */
    getBreakpointList = () => {
        return this.translateToPythonCodeBreakpointList;
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @returns {draw2d.util.ArrayList}
     */
    getErrorList = () => {
        return this.translateToPythonCodeErrorList;
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @returns {draw2d.util.ArrayList}
     */
    getWatchList = () => {
        return this.translateToPythonCodeWatchList;
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @returns {draw2d.util.ArrayList} python packages needed by nodes
     */
    getLibrariesList = () => {
        return this.translateToPythonCodeLibrariesList;
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @description Add id into list of ids which are rewritten to human readable numbers at the end of translation.
     * @param {string} idStr
     */
    addAdditionalId = (idStr) => {
        if (!idStr) return;
        this.translateToPythonCodeAdditionalId.add(idStr);
        this.translateToPythonCodeAdditionalIdNoHyphen.add(idStr.replaceAll('-', ''));
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @returns {string} python import statements code block
     */
    getPythonCodeImport = () => {
        let pythonCode = "";
        this.translateToPythonCodeImportArray.unique();                               //remove duplicities
        this.translateToPythonCodeImportArray.each(function (itemIndex, itemObj) {
            pythonCode += String(itemObj).replace(/\n+$/, "") + "\n";
        });
        return pythonCode;
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @returns {string} python type definitions (ie. classes for clusters)
     */
    getPythonCodeTypeDefinition = () => {
        let pythonCode = "";
        this.translateToPythonCodeTypeDefinitionArray.unique();                               //remove duplicities
        this.translateToPythonCodeTypeDefinitionArray.each(function (itemIndex, itemObj) {
            pythonCode += itemObj + "\n";
        });
        return pythonCode;
    }

    /**
     * @method
     * @description Collect strings returned by node method (string, draw2d.util.ArrayList or Array) into target list.
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @param {string|draw2d.util.ArrayList|Array} items
     * @param {draw2d.util.ArrayList} targetList
     */
    collectStrings = (items, targetList) => {
        if (items === undefined || items === null) return;
        if (typeof items === "string"){
            if (items.trim().length > 0) targetList.push(items);
        }else if (typeof items.each === "function"){
            items.each(function(strIndex, strObj){
                if (typeof strObj === "string" && strObj.trim().length > 0) targetList.push(strObj);
            });
        }else if (Array.isArray(items)){
            for (let strObj of items){
                if (typeof strObj === "string" && strObj.trim().length > 0) targetList.push(strObj);
            }
        }
    }

    /**
     * @method
     * @description Init buffers which collects information about current diagram which is translated.
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     */
    initTranslateToPythonBuffers = () => {
        this.translateToPythonCodeImportArray.clear();          //import statements
        this.translateToPythonCodeTypeDefinitionArray.clear();
        this.translateToPythonCodeFunctionsArray.clear();       //translated subnodes functions bodies
        this.translateToPythonCodeSubnodeArray.clear();         //already translated subnodes function names
        this.translateSubnodeCanvasArray.clear();
        this.typeDefinitionUsedList.clear();
        this.typeDefinitionNeededList.clear();
        this.translateClusterTypeDefinitionCanvasArray.clear();
        this.translateClusterTypeDefinitionItems = [];
        this.translateToPythonCodeAdditionalId.clear();
        this.translateToPythonCodeAdditionalIdNoHyphen.clear();
        this.translateToPythonCodeErrorList.clear();
        this.translateToPythonCodeBreakpointList.clear();
        this.translateToPythonCodeWatchList.clear();
        this.translateToPythonCodeLibrariesList.clear();
        this.translateToPythonCodeSubnodeInputTerminalsDefaultValuesArray = new draw2d.util.ArrayList();
    }

    /**
     * @method
     * @description Same name as in C++ translator, {@link TranslateToGeneralCode_1} calls this method for any language.
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     */
    initTranslateToCppBuffers = () => {
        this.initTranslateToPythonBuffers();
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @description Wrapper around internal code generate method, this is here to have general function with general name as interface to outside code
     * @param canvas
     * @param showCode
     * @param codeTemplate
     * @returns {string} python code
     */
    getCode = (canvas, showCode = true, codeTemplate = "desktop") => {
        return this.getPythonCode(canvas, showCode, codeTemplate);
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @param canvas
     * @param showCode
     * @param codeTemplate - "desktop", for other templates (embedded, webassembly) there is no python template yet, desktop is used
     * @param lineNumberToFind
     * @returns {string} python code as string
     */
    getPythonCode = (canvas, showCode = true, codeTemplate = "", lineNumberToFind = null) => {
        if (codeTemplate !== "desktop" && codeTemplate !== "" && codeTemplate !== null && codeTemplate !== undefined){
            console.warn(`Python code template "${codeTemplate}" not implemented, desktop python template is used.`);
        }
        return this.getPythonCodeUsingTemplate_desktop(canvas, showCode, this.translateCanvasToPythonCode, lineNumberToFind);
    }

    /**
     * @method translateCanvasToCode
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @param {Object} funcParams - object with input parameters
     * @returns {string} python code as string
     * @description General named wrapper function for translateCanvasToPythonCode().
     */
    translateCanvasToCode = (funcParams) => {
        return this.translateCanvasToPythonCode(funcParams);
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @description Get datatype of wire source, same rules as for C++ translator, it's used just as comment in python code.
     * @param {Object} lineObj - wire
     * @returns {string}
     */
    getWireSourceDatatype = (lineObj) => {
        let sourceDatatype = "";
        try{
            let sourceParent = lineObj.getSource().getParent();
            if (sourceParent && sourceParent.NAME.toLowerCase().search('tunnel') > -1 && sourceParent.getDatatype){
                sourceDatatype = sourceParent.getDatatype();
            }else if (lineObj.getSource().getDatatype) {
                sourceDatatype = lineObj.getSource().getDatatype();
            }else if (sourceParent && sourceParent.getConnectedCluster){
                sourceDatatype = sourceParent.getConnectedCluster().getDatatype();
            }else if (lineObj.getSource().getUserData()){
                sourceDatatype = lineObj.getSource().getUserData().datatype;
            }
        }catch(e){
            sourceDatatype = "";
        }
        return sourceDatatype ? sourceDatatype : "";
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @description Python wire "declaration", variable is created with None value, datatype is in comment.
     * @param {Object} lineObj - wire
     * @returns {string} ie. "wire_1 = None  # int\n"
     */
    getWireDeclarationPythonCode = (lineObj) => {
        let datatypeStr = this.getWireSourceDatatype(lineObj);
        return `${lineObj.getVariableName()} = None` + (datatypeStr ? `  # ${datatypeStr}` : "") + "\n";
    }

    /**
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @method translateCanvasToPythonCode
     * @param {Object}        funcParams - object with input parameters
     * @param {draw2d.Canvas} funcParams.canvas - schematic which will be translated
     * @param {boolean}       funcParams.translateTerminalsDeclaration - if set to false input/output terminals declaration are not written, this is for translate subnodes
     * @param {string}        funcParams.nodeName - name of current node which schematic is being translated into code, this is set when subnode diagram is translated into code
     * @param {Object[]}      funcParams.compileErrorLines - array of error lines which should be searched during translation process
     * @param {number}        funcParams.codeLinesOffset - number of lines which are generated before, this is to got right line number when searching for error line
     * @param {number}        funcParams.lineNumberToFind - line number for which is searched object which generates it
     * @returns {string} python code as string, NOT INDENTED
     * @description Translate canvas schematic into python code.
     */
    translateCanvasToPythonCode = (funcParams) =>{
        //extract input params from input object
        let canvas = Object.hasOwn(funcParams, "canvas") ? funcParams.canvas : null;
        let translateTerminalsDeclaration = Object.hasOwn(funcParams, "translateTerminalsDeclaration") ? funcParams.translateTerminalsDeclaration : true;
        let nodeName = Object.hasOwn(funcParams, "nodeName") ? funcParams.nodeName : "";

        let codeLinesOffset = Object.hasOwn(funcParams, "codeLinesOffset") ? funcParams.codeLinesOffset : 0;
        let compileErrorLines = Object.hasOwn(funcParams, "compileErrorLines") ? funcParams.compileErrorLines : null;

        let lineNumberToFind = Object.hasOwn(funcParams, "lineNumberToFind") ? funcParams.lineNumberToFind : null;

        //check canvas variable, if not defined use main canvas
        if (canvas === null){
            let warningMessage = "Canvas not defined in call translateCanvasToPythonCode(), default main canvas will be used!";
            console.warn(warningMessage);
            canvas = this.translatorCanvasObj;
        }

        let translatorObj = this;
        let pythonCode = "";

        //TO BE SURE RECALCULATE NODES OWNERSHIP BY loopsRecalculateAbroadFigures
        GraphLang.Utils.loopsRecalculateAbroadFigures(canvas);

        //THIS ADAPT PORT DATATYPES SAME AS CONNECTED Wires
        GraphLang.Utils.setWiresColorByPorts(canvas);

        /*********************************************************************************************************
         *  PORT INITIALIZATION and EXECUTION ORDER
         */
        GraphLang.Utils.initAllPortToDefault(canvas);
        GraphLang.Utils.executionOrder(canvas);

        let haveAllNodesExecutionOrder = true;
        canvas.getFigures().each(function(figureIndex, figureObj){
            if (
                figureObj.getUserData() && figureObj.getUserData().executionOrder && figureObj.getUserData().executionOrder <= 0
                && figureObj.NAME !== 'GraphLang.Shapes.Basic.Jailhouse'
            ){
                haveAllNodesExecutionOrder = false;

                translatorObj.translateToPythonCodeErrorList.add({
                    canvasOwnerName: nodeName,
                    figureName: figureObj.NAME,
                    figureId: figureObj.getId(),
                    portName: '',
                    type: GraphLang.Utils.ErrorList.NO_EXECUTION_ORDER,
                    message: `${figureObj.NAME} has no execution order`
                });
                console.warn(translatorObj.translateToPythonCodeErrorList.last());
            }
        });
        if (haveAllNodesExecutionOrder === false){
            let errorMessage =`Cannot calculate execution order for some nodes, there could be loops in diagram, need to be resolved!`;
            console.error(errorMessage);
            alert(errorMessage);
        }

        /*********************************************************************************************************
         *  WIRES DECLARATION
         *      - in python there is no declaration, but each wire variable is created with None value to exists before
         *        it's used, same wires as in C++ translator are declared here (top canvas wires, wires going out from right tunnels)
         *********************************************************************************************************/
        canvas.getLines().each(function(lineIndex, lineObj){
            //here it's looking just for figures skipping loops and tunnels
            if (lineObj.NAME.toLowerCase().search('connection') > -1 &&
                lineObj.getSource().getParent().NAME.toLowerCase().search('tunnel') == -1 &&
                lineObj.getSource().getParent().getComposite() == null &&
                lineObj.getSource().getName() != "iterationTerminalOutput"        //for loop iterator wire is declared by loop
            ){
                let isWireOnTopCanvas = true;

                //wire connected to unbundler and similar nested nodes, getTopParentNode() returns top figure
                try{
                    if (
                        lineObj.getSource().getTopParentNode &&
                        lineObj.getSource().getTopParentNode().getComposite() != null
                    ){
                        isWireOnTopCanvas = false;
                    }
                }catch(e){
                    //do nothing
                }

                if (isWireOnTopCanvas){
                    pythonCode += translatorObj.getWireDeclarationPythonCode(lineObj);
                    GraphLang.Utils.errorLinesObjectAssignSourceCanvasObject({
                        inputStr: pythonCode,
                        startLine: 0,
                        errorLines: compileErrorLines,
                        lineOffset: codeLinesOffset,
                        errorSourceObj: lineObj
                    });

                    if (lineNumberToFind !== null && translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null){
                        if (GraphLang.Utils.getLineCount(pythonCode) >= lineNumberToFind) translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = lineObj;
                    }
                }
            }

            /*
             *  Wires going out of RIGHT TUNNEL of top level structure, they are outside structure
             */
            if (lineObj.NAME.toLowerCase().search('connection') > -1 &&
                lineObj.getSource().getParent().NAME.toLowerCase().search('righttunnel') > -1 &&
                lineObj.getSource().getParent().getParent().getComposite() == null
            ){
                pythonCode += translatorObj.getWireDeclarationPythonCode(lineObj);
                GraphLang.Utils.errorLinesObjectAssignSourceCanvasObject({
                    inputStr: pythonCode,
                    startLine: 0,
                    errorLines: compileErrorLines,
                    lineOffset: codeLinesOffset,
                    errorSourceObj: lineObj
                });

                if (lineNumberToFind !== null && translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null){
                    if (GraphLang.Utils.getLineCount(pythonCode) >= lineNumberToFind) translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = lineObj;
                }
            }

            translatorObj.addAdditionalId(lineObj.getId());
        });

        /****************************************************************
         *  NODES TRANSLATING
         ****************************************************************/

        //obtain list of top level figures, their getComposite() returns null
        let allNodes = new draw2d.util.ArrayList()
        canvas.getFigures().each(function(figureIndex, figureObj){
            if (figureObj.getComposite() == null &&
                figureObj.NAME.toLowerCase().search('tunnel') == -1
            ){
                allNodes.push(figureObj);
            }
        });

        let HIGHEST_STEP_NUMBER = 0;
        canvas.getFigures().each(function(figureIndex, figureObj){
            if (figureObj.getUserData() && figureObj.getUserData().executionOrder && figureObj.getUserData().executionOrder > HIGHEST_STEP_NUMBER){
                HIGHEST_STEP_NUMBER = figureObj.getUserData().executionOrder;
            }
        });

        /*
         *  Add node code into pythonCode and remember which object generates which lines.
         */
        let appendNodeCode = (nodeObj, codeStr) => {
            let lineCountBefore = GraphLang.Utils.getLineCount(pythonCode);
            if (codeStr === undefined || codeStr === null) codeStr = "";
            pythonCode += codeStr;
            if (codeStr.length > 0 && !pythonCode.endsWith("\n")) pythonCode += "\n";

            GraphLang.Utils.errorLinesObjectAssignSourceCanvasObject({
                inputStr: pythonCode,
                startLine: lineCountBefore,
                errorLines: compileErrorLines,
                lineOffset: codeLinesOffset,
                errorSourceObj: nodeObj
            });

            if (lineNumberToFind !== null && translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null){
                if (GraphLang.Utils.getLineCount(pythonCode) >= lineNumberToFind && lineCountBefore < lineNumberToFind) translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = nodeObj;
            }
            return lineCountBefore;
        };

        for (let actualStep = 0; actualStep <= HIGHEST_STEP_NUMBER; actualStep++){
            /*
             *    First translate feedback nodes as they have higher priority than nodes.
             */
            allNodes.each(function(nodeIndex, nodeObj){
                if (nodeObj.getUserData() !== undefined &&
                    nodeObj.getUserData().executionOrder == actualStep &&
                    nodeObj.NAME.toLowerCase().search("feedbacknode") > -1
                ){
                    if (nodeObj.translateToPythonCode){
                        appendNodeCode(nodeObj, nodeObj.translateToPythonCode({translatorObj: translatorObj}));
                    }
                }
            });

            /*
             *  Translate nodes normally.
             */
            allNodes.each(function(nodeIndex, nodeObj){
                if (!(nodeObj.getUserData() !== undefined &&
                    nodeObj.getUserData().executionOrder == actualStep &&
                    nodeObj.NAME.toLowerCase().search("feedbacknode") == -1)
                ) return;

                translatorObj.addAdditionalId(nodeObj.getId());

                /*
                 *  Python packages which must be installed (pip)
                 */
                if (nodeObj.translateToPythonCodeLibraries){
                    translatorObj.collectStrings(nodeObj.translateToPythonCodeLibraries(), translatorObj.translateToPythonCodeLibrariesList);
                }

                /*
                 *  Import statements
                 */
                if (nodeObj.translateToPythonCodeImport){
                    translatorObj.collectStrings(nodeObj.translateToPythonCodeImport(), translatorObj.translateToPythonCodeImportArray);
                }

                /*
                 *  TYPE DEFINITION, ie. for clusters
                 */
                if (nodeObj.translateToPythonCodeTypeDefinition){
                    translatorObj.translateToPythonCodeTypeDefinitionArray.push(nodeObj.translateToPythonCodeTypeDefinition({translatorObj: translatorObj}));

                    if (
                        (nodeObj.getDatatype && nodeObj.getDatatype().startsWith("clusterDatatype_")) ||
                        (nodeObj.userData && nodeObj.userData.isCluster === true)
                    ){
                        translatorObj.typeDefinitionUsedList.push(`${nodeName} -> ${nodeObj.getNodeLabelText()}`);
                    }
                }
                if (
                    (
                      (nodeObj.NAME.toLowerCase().search("constantnode") > -1 && nodeObj.getDatatype().toLowerCase().startsWith("clusterdatatype_")) ||
                      nodeObj.NAME.toLowerCase().search("pointerdatatypenode") > -1 ||
                      (nodeObj.userData && nodeObj.userData.isClusterRef === true) ||
                      (typeof nodeObj.getDatatype === "function" && String(nodeObj.getDatatype()).toLowerCase().search("clusterdatatype") > -1)
                    ) && typeof nodeObj.getNodeLabelText === "function" && translatorObj.typeDefinitionUsedList.contains(`${nodeName} -> ${nodeObj.getNodeLabelText()}`) === false
                ){
                    if (typeof nodeObj.getSourceFigureId === "function"){
                        let searchClusterId = nodeObj.getSourceFigureId();
                        let nodeInfo = GraphLang.Utils.getObjectInProjectFromJSON({id: searchClusterId}).first();
                        let nodeJSONInfo = GraphLang.Utils.getObjectInProjectFromJSONById(searchClusterId);
                        translatorObj.typeDefinitionNeededList.push(`${nodeInfo.parentNodeName} -> ${nodeJSONInfo.userData.nodeLabel}`);
                    }else{
                        translatorObj.typeDefinitionNeededList.push(`${nodeName} -> ${nodeObj.getNodeLabelText()}`);
                    }
                }

                /*************************************************************************************************
                 *  NODES WITH DIAGRAM INSIDE are translated into separate python functions
                 */
                if (!translatorObj.translateToPythonCodeSubnodeArray.contains(nodeObj.NAME) && nodeObj.jsonDocument !== undefined && nodeObj.jsonDocument.length > 0){
                    translatorObj.translateToPythonCodeSubnodeArray.push(nodeObj.NAME);
                    translatorObj.translateToPythonCodeSubNode({
                        translatorObj: translatorObj,
                        nodeObj: nodeObj,
                        schematicOwnerId: null,
                        schematicOwnerName: null,
                        compileErrorLines: compileErrorLines,
                        lineNumberToFind: lineNumberToFind
                    });
                }

                //nested in loops or multilayered nodes, they MUST HAVE DEFINED METHOD .getSubNodesWithDiagramInside()
                if (typeof nodeObj.getSubNodesWithDiagramInside == "function"){
                    let nodeObjChildrenWithDiagram = nodeObj.getSubNodesWithDiagramInside(translatorObj.translateToPythonCodeSubnodeArray);
                    nodeObjChildrenWithDiagram.each(function(subnodeIndex, subnodeObj){
                        if (!translatorObj.translateToPythonCodeSubnodeArray.contains(subnodeObj.NAME) && subnodeObj.jsonDocument !== undefined && subnodeObj.jsonDocument.length > 0){
                            translatorObj.translateToPythonCodeSubnodeArray.push(subnodeObj.NAME);
                            translatorObj.translateToPythonCodeSubNode({
                                translatorObj: translatorObj,
                                nodeObj: subnodeObj,
                                schematicOwnerId: nodeObj.getId(),
                                schematicOwnerName: nodeObj.NAME
                            });
                        }
                    });
                }

                /*************************************************************************************************
                 *  NODE DECLARATION (constants, arrays, ...)
                 *      node must NOT BE TERMINAL or can be terminal but translateTerminalDeclaration == true (top canvas)
                 */
                if (nodeObj.translateToPythonCodeDeclaration && (!nodeObj.userData.isTerminal || (nodeObj.userData.isTerminal && translateTerminalsDeclaration))){
                    appendNodeCode(nodeObj, nodeObj.translateToPythonCodeDeclaration({translatorObj: translatorObj, translateTerminalsDeclaration: translateTerminalsDeclaration}));
                }

                /*
                 *  Default values for not connected subnode input terminals: node_ID_inputPort_Name = value
                 */
                if (nodeObj.jsonDocument !== undefined && nodeObj.jsonDocument.length > 0){
                    nodeObj.getInputPorts().each(function(portIndex, portObj){
                        if (portObj.getConnections().getSize() == 0){
                            let nodeDefaults = translatorObj.translateToPythonCodeSubnodeInputTerminalsDefaultValuesArray[`${nodeObj.NAME}`];
                            let defaultPortValues = nodeDefaults ? nodeDefaults[portObj.getName()] : undefined;
                            let defaultCode = "";
                            if (defaultPortValues){
                                defaultCode = `node_${nodeObj.getId()}_inputPort_${portObj.getName()} = ${defaultPortValues.variableValue ? defaultPortValues.variableValue : "None"}\n`;
                            }else{
                                defaultCode = `node_${nodeObj.getId()}_inputPort_${portObj.getName()} = None  # ERROR: No default port value for node "${nodeObj.NAME}" for input port "${portObj.getName()}"\n`;
                            }
                            appendNodeCode(nodeObj, defaultCode);
                        }
                    });
                }

                /*************************************************************************************************
                 *  NODE CODE
                 */
                let nodeCodeStartLine = GraphLang.Utils.getLineCount(pythonCode);
                if (nodeObj.translateToPythonCode){
                    let lineCountBefore = GraphLang.Utils.getLineCount(pythonCode);
                    appendNodeCode(nodeObj, nodeObj.translateToPythonCode({
                        nodeId: nodeObj.getId(),
                        codeLinesOffset: codeLinesOffset + lineCountBefore,
                        compileErrorLines: compileErrorLines,
                        breakpointParentId: null,
                        lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - lineCountBefore : null,
                        translatorObj: translatorObj,
                        nodeName: nodeName
                    }));
                }else if (!nodeObj.translateToPythonCodeDeclaration && nodeObj.NAME.toLowerCase().search("connection") == -1){
                    /*
                     *  Node has no python translation, write comment and add error for user
                     */
                    appendNodeCode(nodeObj, `# ERROR: node "${nodeObj.NAME}" has no python translation (translateToPythonCode() not defined)\n`);
                    translatorObj.translateToPythonCodeErrorList.add({
                        canvasOwnerName: nodeName,
                        figureName: nodeObj.NAME,
                        figureId: nodeObj.getId(),
                        portName: '',
                        type: "NO_PYTHON_TRANSLATION",
                        message: `${nodeObj.NAME} has no translateToPythonCode() method`
                    });
                }

                /*
                 *  BREAKPOINT LIST FILLING FOR NODES
                 */
                if (nodeObj.getUserData() && nodeObj.getUserData().isSetBreakpoint){
                    translatorObj.translateToPythonCodeBreakpointList.add({lineNumber: nodeCodeStartLine + 1, objectId: nodeObj.getId(), type: "node", parentId: null, parentName: null});
                }
                if (nodeObj.getPythonBreakpointList){
                    translatorObj.translateToPythonCodeBreakpointList.addAll(nodeObj.getPythonBreakpointList());
                }

                //WATCH LIST from node, this is for loops since they have subdiagrams
                if (nodeObj.getPythonWatchList){
                    translatorObj.translateToPythonCodeWatchList.addAll(nodeObj.getPythonWatchList());
                }

                /*
                 *  Translate POST code, like ending loop (right tunnels assignments)
                 */
                if (nodeObj.translateToPythonCodePost){
                    let lineCountBefore = GraphLang.Utils.getLineCount(pythonCode);
                    appendNodeCode(nodeObj, nodeObj.translateToPythonCodePost({
                        lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - lineCountBefore : null,
                        translatorObj: translatorObj
                    }));
                }

                /*
                 *  Breakpoints and watches on wires going out of node, line after node code, there wire has its value
                 */
                nodeObj.getOutputPorts().each(function(portIndex, portObj){
                    portObj.getConnections().each(function(wireIndex, wireObj){
                        let currentLineNumber = GraphLang.Utils.getLineCount(pythonCode) + 1;

                        if (wireObj.getUserData() && wireObj.getUserData().isSetBreakpoint){
                            translatorObj.translateToPythonCodeBreakpointList.add({lineNumber: currentLineNumber, objectId: wireObj.getId(), objectVariableName: wireObj.getVariableName(), type: "wire", parentId: null, parentName: null});
                        }
                        if (wireObj.getUserData() && wireObj.getUserData().isSetWatch){
                            translatorObj.translateToPythonCodeWatchList.add({lineNumber: currentLineNumber, objectId: wireObj.getId(), objectVariableName: wireObj.getVariableName(), type: "wire", parentId: null, parentName: null});
                        }
                    });
                });
            });
        }

        /*
         *  Obtain additional used type definitions
         */
        translatorObj.typeDefinitionNeededList.unique();
        translatorObj.typeDefinitionNeededList.each(function(definitionIndex, definitionStr){
            let definition = definitionStr.split("->");
            if (definition.length < 2) return;
            translatorObj.translateToPythonCodeClusterTypeDefinitionFromNode(definition[0].trim(), definition[1].trim());
        });

        /* erase flag for loops at the end of this operation to be able run again correctly */
        allNodes.each(function(nodeIndex, nodeObj){
            if (nodeObj.NAME.toLowerCase().search("loop") >= 0){
                nodeObj.getUserData().wasTranslatedToPythonCode = false;
            }
        });

        translatorObj.translateToPythonCodeLibrariesList.unique();

        /*********************************************************************************************************
         * CANVAS SCHEMATIC VALIDATION
         *********************************************************************************************************/
        translatorObj.translateToPythonCodeErrorList.addAll(
            GraphLang.Utils.validateCanvas(canvas, nodeName, translatorObj.translateClusterTypeDefinitionItems)
        );

        /*********************************************************************************************************
         *  WRITING ERRORS FOR USER INTO #helperPane
         *********************************************************************************************************/
        let outputTarget = document.getElementById("schematicErrors");
        if (outputTarget){
            outputTarget.innerHTML = "<b>Schematic errors:</b><br /><br />";
            translatorObj.translateToPythonCodeErrorList.each(function(errorIndex, errorObj){
                let errorElement = document.createElement("span");
                errorElement.innerHTML = errorObj.type;
                errorElement.onclick = function(){GraphLang.Utils.userInteractiveErrorOnClick(errorObj);};
                errorElement.appendChild(document.createElement("br"));

                let errorElementMessage = document.createElement("span");
                errorElementMessage.innerHTML = errorObj.message;
                errorElement.appendChild(errorElementMessage);

                outputTarget.appendChild(errorElement);
                outputTarget.appendChild(document.createElement("hr"));
            });
        }

        return pythonCode;
    }

    /**
     * @method
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @description Translate subnode schematic into python function. Input terminals (no input ports) are function params, output terminals
     * (no output ports) are returned as list, order is same as order of figures in node schematic (same as ports order of node).
     * @param {Object} funcParams
     * @param {number} funcParams.schematicOwnerId
     * @param {string} funcParams.schematicOwnerName
     * @param {Object} funcParams.nodeObj
     * @param {number} funcParams.lineNumberToFind
     */
    translateToPythonCodeSubNode = (funcParams) => {
        let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : this;

        let pythonCode = "";
        let inputParamsList = [];
        let outputParamsList = [];

        let SUB_NODE_ID = Object.hasOwn(funcParams, "schematicOwnerId") ? funcParams.schematicOwnerId : null;
        let SUB_NODE_NAME = Object.hasOwn(funcParams, "schematicOwnerName") ? funcParams.schematicOwnerName : null;

        let nodeObj = Object.hasOwn(funcParams, "nodeObj") ? funcParams.nodeObj : null;
        if (nodeObj === null){
            console.error(`Translating subnode, nodeObj must be defined in parameters!`);
            return;
        }

        let lineNumberToFind = Object.hasOwn(funcParams, "lineNumberToFind") ? funcParams.lineNumberToFind : null;

        let divSubnodeCanvasId = 'subnodeCanvas_' + this.translateSubnodeCanvasArray.getSize();
        $('#subnodeCanvasContainer').append("<div id=\"" + divSubnodeCanvasId + "\" style=\"width: 1500px; height: 600px;\"></div>");
        let subnodeCanvas = new draw2d.Canvas(divSubnodeCanvasId);
        this.translateSubnodeCanvasArray.push([divSubnodeCanvasId, subnodeCanvas]);

        GraphLang.Utils.displayContents2(nodeObj.jsonDocument, subnodeCanvas);

        let isTerminal = (figureObj) => figureObj.userData && figureObj.userData.isTerminal &&
            (figureObj.userData.isTerminal === 1 || figureObj.userData.isTerminal === true || String(figureObj.userData.isTerminal).toLowerCase() === "true");

        /*********************************************************************************************************************
         *  1. INPUT TERMINALS -> FUNCTION PARAMS
         *********************************************************************************************************************/
        subnodeCanvas.getFigures().each(function(figureIndex, figureObj) {
            if (isTerminal(figureObj) && typeof figureObj.getVariableName === "function" && figureObj.getInputPorts().getSize() === 0) {
                inputParamsList.push(figureObj.getVariableName());

                /*
                 *  default value for case when node input port is not connected, key is terminal label same as port name
                 */
                if (translatorObj.translateToPythonCodeSubnodeInputTerminalsDefaultValuesArray[nodeObj.NAME] == undefined) translatorObj.translateToPythonCodeSubnodeInputTerminalsDefaultValuesArray[nodeObj.NAME] = {};
                let datatypeStr = figureObj.getDatatype ? figureObj.getDatatype() : "";
                translatorObj.translateToPythonCodeSubnodeInputTerminalsDefaultValuesArray[nodeObj.NAME][figureObj.getUserData().nodeLabel] = {
                    datatype: datatypeStr,
                    variableName: `${figureObj.getUserData().nodeLabel}`,
                    variableValue: typeof figureObj.getText === "function" ? GraphLang.Utils.toPythonLiteral(figureObj.getText(), datatypeStr) : "None"
                };
            }
        });

        /*********************************************************************************************************************
         *  2. OUTPUT TERMINALS -> RETURNED VALUES
         *********************************************************************************************************************/
        subnodeCanvas.getFigures().each(function(figureIndex, figureObj) {
            if (isTerminal(figureObj) && typeof figureObj.getVariableName === "function" && figureObj.getOutputPorts().getSize() === 0){
                outputParamsList.push(figureObj.getVariableName());
            }
        });

        /*********************************************************************************************************************
         *  3. BREAKPOINTS in subnode
         *********************************************************************************************************************/
        subnodeCanvas.getFigures().each(function(figureIndex, figureObj){
            if (figureObj.getUserData() && figureObj.getUserData().isSetBreakpoint){
                translatorObj.translateToPythonCodeBreakpointList.add({lineNumber: 0, objectId: figureObj.getId(), type: "node", parentId: SUB_NODE_ID, parentName: SUB_NODE_NAME});
            }
        });

        pythonCode += `def ${nodeObj.translateToPythonCodeFunctionName()}(${inputParamsList.join(", ")}):\n`;

        /*
         *  Function body, output terminals are created first to exist when they are returned.
         */
        let bodyCode = "";
        outputParamsList.forEach((outputName) => { bodyCode += `${outputName} = None\n`; });

        let currentLineNumber = GraphLang.Utils.getLineCount(pythonCode) + GraphLang.Utils.getLineCount(bodyCode);
        bodyCode += translatorObj.translateCanvasToPythonCode({
            canvas: subnodeCanvas,
            translateTerminalsDeclaration: false,
            nodeName: nodeObj.NAME,
            lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - currentLineNumber : null,
        });
        if (bodyCode.length > 0 && !bodyCode.endsWith("\n")) bodyCode += "\n";
        if (outputParamsList.length > 0) bodyCode += `return [${outputParamsList.join(", ")}]\n`;

        pythonCode += GraphLang.Utils.indentPythonCode(GraphLang.Utils.ensurePythonBlockNotEmpty(bodyCode));

        //functions are pushed into array and printed after template is created
        translatorObj.translateToPythonCodeFunctionsArray.push({
            node_owner_id: SUB_NODE_ID,
            node_owner_name: SUB_NODE_NAME,
            node_id: nodeObj.getId(),
            node_name: nodeObj.NAME,
            code: pythonCode
        });

        /*
         *  Remove canvas html element and destroy JS canvas in memory
         */
        translatorObj.translateSubnodeCanvasArray.each(function(canvasIndex, canvasObjArray){
            $("canvas").remove("#"+canvasObjArray[0]);
            canvasObjArray[1].destroy();
        });
    }

    /**
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @method translateToPythonCodeClusterTypeDefinitionFromNode
     * @param {string} className - class in which cluster is defined
     * @param {string} clusterName - cluster which type definition should be obtained
     * @description Load node schematic in auxiliary canvas and run translate process for cluster type definition.
     */
    translateToPythonCodeClusterTypeDefinitionFromNode = (className, clusterName) => {
        let translatorObj = this;

        let divClusterTypeDefinitionCanvasId = 'clusterTypeDefinitionCanvas_' + this.translateClusterTypeDefinitionCanvasArray.getSize();
        $('#clusterTypeDefinitionCanvasContainer').append("<div id=\"" + divClusterTypeDefinitionCanvasId + "\" style=\"width: 1500px; height: 600px;\"></div>");
        let clusterTypeDefinitionCanvas = new draw2d.Canvas(divClusterTypeDefinitionCanvasId);
        this.translateSubnodeCanvasArray.push([divClusterTypeDefinitionCanvasId, clusterTypeDefinitionCanvas]);

        let classObj = null;
        try{
            classObj = eval(`new ${className}()`);
        }catch(e){
            console.warn(`Python translator: cannot create class "${className}" to get cluster "${clusterName}" definition`, e);
        }

        if (classObj){
            GraphLang.Utils.displayContents2(classObj.jsonDocument, clusterTypeDefinitionCanvas);

            clusterTypeDefinitionCanvas.getFigures().each(function(figureIndex, figureObj){
                if (
                    (
                        (figureObj.getDatatype && figureObj.getDatatype().startsWith("clusterDatatype_")) ||
                        (figureObj.userData && figureObj.userData.isCluster === true)
                    ) &&
                    typeof figureObj.getNodeLabelText === "function" &&
                    figureObj.getNodeLabelText() == clusterName
                ){
                    if (typeof figureObj.translateToPythonCodeTypeDefinition === "function"){
                        translatorObj.translateToPythonCodeTypeDefinitionArray.push(figureObj.translateToPythonCodeTypeDefinition({translatorObj: translatorObj}));
                    }else{
                        translatorObj.translateToPythonCodeTypeDefinitionArray.push(`# ERROR: cluster "${clusterName}" (${figureObj.NAME}) has no python type definition`);
                    }
                    translatorObj.addAdditionalId(figureObj.getId());
                    if (typeof figureObj.getItemNamesDatatypesIndexes === "function"){
                        translatorObj.translateClusterTypeDefinitionItems[figureObj.getDatatype()] = figureObj.getItemNamesDatatypesIndexes();
                    }
                }
            });
        }

        this.translateSubnodeCanvasArray.each(function(canvasIndex, canvasObjArray){
            $("canvas").remove("#"+canvasObjArray[0]);
            canvasObjArray[1].destroy();
        });
    }

    /**
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @method getObjectWhichGenerateCodeAtLine
     * @param {number} lineNumberToFind - code line which is going to be found which object generates its code
     * @returns {Object} figure object - canvas figure responsible for specified code line number
     * @description Transcript code and when line which is specified is generated returns object from canvas which has generated it.
     */
    getObjectWhichGenerateCodeAtLine = async (lineNumberToFind)=> {
        this.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = null;

        let codeTemplate = await GraphLang.Utils.getProjectCodeTemplate();
        this.getPythonCode(this.translatorCanvasObj, false, codeTemplate, lineNumberToFind);

        if (this.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE == null) {
            let lineNumberWithoutOffset = lineNumberToFind - this.GLOBAL_CODE_LINE_OFFSET;
            this.translateCanvasToPythonCode({
                canvas: this.translatorCanvasObj,
                translateTerminalsDeclaration: true,
                lineNumberToFind: lineNumberWithoutOffset
            });
        }

        return this.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE;
    }

    /**
     * @instance
     * @memberOf TranslateToPythonCode_2_TranslatorObject
     * @method getPythonCodeUsingTemplate_desktop
     * @param {draw2d.Canvas} canvas - schematic which will be translated
     * @param {boolean} showCode - if true code is shown in alert message
     * @param {function} translateCanvasToCodeFunction - function used to translate canvas
     * @param {number|null} lineNumberToFind
     * @returns {string} python code as string
     * @description Generate python code for desktop, canvas code is placed into main() function.
     */
    getPythonCodeUsingTemplate_desktop = (canvas, showCode = true, translateCanvasToCodeFunction, lineNumberToFind = null) =>{
        let translatorObj = this;

        this.initTranslateToPythonBuffers();

        let canvasCode = translateCanvasToCodeFunction({
            canvas: canvas,
            translateTerminalsDeclaration: true
        });

        /******************************************************************************
         * TEMPLATE START
         *******************************************************************************/
        let template_pythonCode = "";

        template_pythonCode += "#!/usr/bin/env python3\n";
        template_pythonCode += "# THIS CODE IS GENERATED FROM GraphLang -> getPythonCodeUsingTemplate_desktop\n";
        template_pythonCode += "\n";

        template_pythonCode += "# import libraries\n";
        template_pythonCode += this.getPythonCodeImport();
        template_pythonCode += "\n";

        let typeDefinitionCode = this.getPythonCodeTypeDefinition();
        if (typeDefinitionCode.trim().length > 0){
            template_pythonCode += "# type definitions\n";
            template_pythonCode += typeDefinitionCode;
            template_pythonCode += "\n";
        }

        /******************************************************************************
         * SubNode code printed as functions
         *******************************************************************************/
        template_pythonCode += "# ************ BEGIN Transcripted SubNode function definitions ************\n";
        this.GLOBAL_CODE_LINE_OFFSET_BEFORE_SUBNODES = GraphLang.Utils.getLineCount(template_pythonCode) + 1;

        let functionsCodeStr = new draw2d.util.ArrayList();
        this.translateToPythonCodeFunctionsArray.each((subnodeIndex, subnodeObj) => {
            functionsCodeStr.add(subnodeObj.code);
        });
        functionsCodeStr.unique();
        functionsCodeStr.each(function(functionIndex, functionCodeStr){
            template_pythonCode += "\n";
            template_pythonCode += functionCodeStr;
            template_pythonCode += "\n";

            if (lineNumberToFind){
                if (translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null && GraphLang.Utils.getLineCount(template_pythonCode) > lineNumberToFind){
                    translatorObj.translateToPythonCodeFunctionsArray.each((functionInfoIndex, functionInfoObj) => {
                        if (functionInfoObj.code === functionCodeStr){
                            translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = functionInfoObj;
                        }
                    });
                }
            }
        });
        template_pythonCode += "# ************ END Transcripted SubNode function definitions ************\n\n\n";

        template_pythonCode += "def main():\n";

        //add offset to breakpoints line numbers since here before is some code generated and breakpoints were counted just from canvas code
        let lineNumberOffset = GraphLang.Utils.getLineCount(template_pythonCode);
        this.translateToPythonCodeBreakpointList.each(function(breakpointIndex, breakpointObject){
            breakpointObject.lineNumber += lineNumberOffset;
        });
        this.translateToPythonCodeWatchList.each(function(watchIndex, watchObject){
            watchObject.lineNumber += lineNumberOffset;
        });
        this.GLOBAL_CODE_LINE_OFFSET = lineNumberOffset;

        //program start point, first line of main() body
        this.translateToPythonCodeBreakpointList.add({lineNumber: lineNumberOffset + 1, objectId: null, type: "programStart", parent: null});

        if (canvasCode.length > 0 && !canvasCode.endsWith("\n")) canvasCode += "\n";
        template_pythonCode += GraphLang.Utils.indentPythonCode(GraphLang.Utils.ensurePythonBlockNotEmpty(canvasCode));
        template_pythonCode += "\n\n";
        /*
         *  Remote debugging hook, placed after main() so it does not move breakpoint/watch line numbers.
         *  When script is started by python_tools/DebuggerPythonInterface.py there is environment variable GRAPHLANG_PYTHON_DEBUG_PORT
         *  set (and python_tools on PYTHONPATH), then main() runs under debugger controlled from browser (GraphLang.Debugger.Python),
         *  otherwise main() is just called.
         */
        const INDENT = GraphLang.Utils.PYTHON_INDENT;
        template_pythonCode += "if __name__ == \"__main__\":\n";
        template_pythonCode += INDENT + "# GraphLang remote debugging, enabled when started by DebuggerPythonInterface.py\n";
        template_pythonCode += INDENT + "import os as _graphlang_os\n";
        template_pythonCode += INDENT + "if _graphlang_os.environ.get(\"GRAPHLANG_PYTHON_DEBUG_PORT\"):\n";
        template_pythonCode += INDENT + INDENT + "import DebuggerPythonInterface\n";
        template_pythonCode += INDENT + INDENT + "DebuggerPythonInterface.runDebugee(main, __file__)\n";
        template_pythonCode += INDENT + "else:\n";
        template_pythonCode += INDENT + INDENT + "main()\n";

        let pythonCode = template_pythonCode;

        /******************************************************************************
         * REWRITE IDs to HUMAN READABLE NUMBERS (starts from 1,2,...,N)
         *******************************************************************************/
        pythonCode = GraphLang.Utils.rewriteIDtoNumbers(canvas, pythonCode, this.translateToPythonCodeAdditionalId, this.translateToPythonCodeAdditionalIdNoHyphen);

        /*
         *  Copy code into clipboard
         */
        let copyElement = document.createElement('textarea');
        copyElement.value = pythonCode;
        copyElement = document.body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        copyElement.remove();

        if (showCode) alert(pythonCode);

        GraphLang.Utils.initAllPortToDefault(canvas);
        return pythonCode;
    }

}
