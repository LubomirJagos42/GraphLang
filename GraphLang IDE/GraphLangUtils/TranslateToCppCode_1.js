/*****************************************************************************************************************************************************
 *    TRANSLATE TO C/C++ functions
 *****************************************************************************************************************************************************/

//auxiliary ArrayList store declaration of some variables or something during translation process
translateToCppCodeFunctionsArray = new draw2d.util.ArrayList();
translateToCppCodeImportArray = new draw2d.util.ArrayList();
translateToCppCodeTypeDefinitionArray = new draw2d.util.ArrayList();
translateToCppCodeSubnodeArray = new draw2d.util.ArrayList();
translateToCppCodeSubnodeInputTerminalsDefaultValuesArray = new draw2d.util.ArrayList();
translateSubnodeCanvasArray = new draw2d.util.ArrayList();

typeDefinitionUsedList =  new draw2d.util.ArrayList();
typeDefinitionNeededList =  new draw2d.util.ArrayList();
translateClusterTypeDefinitionCanvasArray = new draw2d.util.ArrayList();

translateToCppCodeAdditionalId = new draw2d.util.ArrayList();
translateToCppCodeAdditionalIdNoHyphen = new draw2d.util.ArrayList();

GraphLang.Utils.getCppCodeImport = function(){
    var cCode = "";
    translateToCppCodeImportArray.unique();                               //remove duplicities
    translateToCppCodeImportArray.each(function(itemIndex, itemObj){
        cCode += itemObj + "\n";
    });
    return cCode;
}

/**
 *  @method getCppCodeTypeDefinition
 *  @description Returns C/C++ string type definitions used in schematic.
 */
GraphLang.Utils.getCppCodeTypeDefinition = function(){
    var cCode = "";
    translateToCppCodeTypeDefinitionArray.unique();                               //remove duplicities
    translateToCppCodeTypeDefinitionArray.each(function(itemIndex, itemObj){
        cCode += itemObj + "\n";
    });
    return cCode;
}

/**
 * @method translateCanvasToCppCode
 * @param {draw2d.Canvas} canvas - schematic which will be serialize to JSON
 * @returns {String} C/C++ code as string
 * @description Copy diagram as C/C++ code into clipboard, uses inside translateToCppCode2() function.
 */
GraphLang.Utils.translateCanvasToCppCode = function(canvas, translateTerminalsDeclaration = true, nodeName = ""){
    let cCode = "";

    //TO BE SURE RECALCULATE NODES OWNERSHIP BY loopsRecalculateAbroadFigures
    GraphLang.Utils.loopsRecalculateAbroadFigures(canvas);

    //THIS ADAPT PORT DATATYPES SAME AS CONNECTED Wires
    //this can cause some problems because it's not bullet proof function, beacuse it's running statically, need to rewrite it more adaptive but when clicked at least 3 times it's OK
    GraphLang.Utils.setWiresColorByPorts(canvas);

    //ORIGINAL WITHOUT REWRITING IDs
    //copyElement.innerHTML = GraphLang.Utils.translateToCppCode2(canvas, null);

    // INITIALIZATION
    // added by LuboJ. this CAN CAUSE SOME ERRORS IT WASN'T HERE UNTIL RECENTLY when I saw that there is not port initialization and execution order done in this task.
    this.initAllPortToDefault(canvas);
    this.executionOrder(canvas);

    /*
     *    Now just ticking with clock and run nodes setup to run at that step by execution order.
     */

    /*********************************************************************************************************
     *  WIRES DECLARATION
     *
     *  globals at level of canvas
     *  ERROR:
     *    - THERE IS NOT VALUE ASSIGNEMENT WHEN WIRE IS CONNECTED TO CONSTANT
     *********************************************************************************************************/

        //FIRST get all top figures (they have no composite set) and then get their input ports and connections connected to them
        //	tunnels doesn't have assigned it's loop as its parent, so iterating over tunnels is done when loop is detected, then if it
        //	has no composite (what means it's most top structure on canvas) it's iterating over it's children and detecting left tunnels
        //
    let allConnections = new draw2d.util.ArrayList();
    canvas.getLines().each(function(lineIndex, lineObj){
        //here it's looking just for figures skipping loops and tunnels
        if (lineObj.NAME.toLowerCase().search('connection') > -1 &&
            lineObj.getSource().getParent().NAME.toLowerCase().search('tunnel') == -1 &&
            lineObj.getSource().getParent().getComposite() == null &&
            lineObj.getSource().getName() != "iterationTerminalOutput"        //this is not to generate wire declaration for FOR LOOP iterator indexer, getName() return port name not class nae different than NAME
        ){
            var isWireOnTopCanvas = true;

            /*
             *    This is test if wire is connected to unbundler where its structure is:
             *        UnbundlerNode > VerticalLayout > Label > OutputPort
             *    then getParent() is little more complicated due there is element nesting, but there is on output port function getTopParentNode()
             *    which is my special function which return top figure obj reference to simplify this
             */
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

            /*
             *    If source has getDatatype() function use it, otherwise look for userData variable
             */
            if (lineObj.getSource().getDatatype) {
                sourceDatatype = lineObj.getSource().getDatatype();
            }
            else if (lineObj.getSource().getParent().getConnectedCluster){
                //this is case when wires are connected to bundlers, unbundlers and so
                sourceDatatype = lineObj.getSource().getParent().getConnectedCluster().getDatatype();
            }
            else{
                sourceDatatype = lineObj.getSource().getUserData().datatype;
            }

            /*
             *    when flag isWireOnTopCanvas is still true write wire declaration, otherwise do nothing and continue for next wire
             */
            if (isWireOnTopCanvas)  cCode += sourceDatatype + " wire_" + lineObj.getId() + ";\n";
        }

        /*
         *  for tunnel it's different little, IMPORTANT are just RIGHT TUNNELs because then wire is outside structure,
         *  in case if source is LEFT TUNNEL we are sure that wire is laying inside some structure
         */
        if (lineObj.NAME.toLowerCase().search('connection') > -1 &&
            lineObj.getSource().getParent().NAME.toLowerCase().search('righttunnel') > -1 &&
            lineObj.getSource().getParent().getParent().getComposite() == null
        ){
            sourceDatatype = lineObj.getSource().getParent().getDatatype();
            cCode += sourceDatatype + " wire_" + lineObj.getId() + ";\n";
        }
    });

    /****************************************************************
     *  NODES TRANSLATING
     *  Going through diagram and translate each graphical node into its text representation.
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

    /*
     *    Translate nodes based on their execution order
     *        Now it's running for some limited execution order.
     */
    for (var actualStep = 0; actualStep < 20; actualStep++){
        /*
         *    First translate feedback nodes as they have higher priority than nodes.
         */
        allNodes.each(function(nodeIndex, nodeObj){
            if (nodeObj.getUserData() !== undefined &&
                nodeObj.getUserData().executionOrder == actualStep &&
                nodeObj.NAME.toLowerCase().search("feedbacknode") > -1
            ){
                if (nodeObj.translateToCppCode) cCode += nodeObj.translateToCppCode();
            }
        });

        /*
         *  Translate nodes normally.
         */
        allNodes.each(function(nodeIndex, nodeObj){
            if (nodeObj.getUserData() !== undefined &&
                nodeObj.getUserData().executionOrder == actualStep &&
                nodeObj.NAME.toLowerCase().search("feedbacknode") == -1
            ){
                /*
                 *    Getting import statements
                 */
                if (nodeObj.translateToCppCodeImport) translateToCppCodeImportArray.push(nodeObj.translateToCppCodeImport());

                /*
                 *    Getting TYPE DEFINITION, ie. for clusters
                 *      typeDefinitionUsedList   - stores already translated type definition nodes ie. cluster used in project
                 *      typeDefinitionNeededList - stores typedefinition needed to be additionaly added due they are not used in project and need to be scanned from files
                 *
                 */
                if (nodeObj.translateToCppCodeTypeDefinition){
                    translateToCppCodeTypeDefinitionArray.push(nodeObj.translateToCppCodeTypeDefinition());

                    if (nodeObj.getDatatype && nodeObj.getDatatype().startsWith("clusterDatatype_")) {
                        typeDefinitionUsedList.push(`${nodeName} -> ${nodeObj.getNodeLabelText()}`);
                    }
                }
                if (
                    (nodeObj.NAME.toLowerCase().search("constantnode") > -1 ||
                    nodeObj.NAME.toLowerCase().search("pointerdatatypenode") > -1) &&
                    nodeObj.getDatatype().toLowerCase().search("clusterdatatype") > -1 &&
                    !typeDefinitionUsedList.contains(nodeObj.getText())
                ){
                    typeDefinitionNeededList.add(nodeObj.getText());
                }


                /*************************************************************************************************************************************************
                 *  TRANSCRIPT NODES WITH DIAGRAM INSIDE (user created blocks which has no C/C++ method to transcript but are composed from other GraphLang nodes)
                 */

                /*
                 *    Translate canvas most top nodes with diagram inside into separate function
                 */
                if (!translateToCppCodeSubnodeArray.contains(nodeObj.NAME) && nodeObj.jsonDocument !== undefined && nodeObj.jsonDocument.length > 0){
                    translateToCppCodeSubnodeArray.push(nodeObj.NAME);
                    GraphLang.Utils.translateToCppCodeSubNode(nodeObj);
                }

                /*
                 *      Translate blocks nested in loops or multilayered nodes, they MUST HAVE DEFINED METHOD .getSubNodesWithDiagramInside()
                 */
                if (typeof nodeObj.getSubNodesWithDiagramInside == "function"){
                    let nodeObjChildrenWithDiagram = nodeObj.getSubNodesWithDiagramInside(translateToCppCodeSubnodeArray);
                    nodeObjChildrenWithDiagram.each(function(subnodeIndex, subnodeObj){
                        if (!translateToCppCodeSubnodeArray.contains(subnodeObj.NAME) && subnodeObj.jsonDocument !== undefined && subnodeObj.jsonDocument.length > 0){
                            translateToCppCodeSubnodeArray.push(subnodeObj.NAME);
                            GraphLang.Utils.translateToCppCodeSubNode(subnodeObj);
                        }
                    });
                }


                /*************************************************************************************************************************************************
                 *  TRANSCRIPT NODES
                 *      - this should be after user defined blocks are transcripted to have efault terminals values stored in array
                 *      - here is block transcripted to C/C++ code line
                 */

                /*
                 *    C++ code translation, getting node C++ declaration and code
                 *        node must NOT BE TERMINAL or
                 *        can be terminal but translateTerminalDeclaration == true    (transcripting top canvas)
                 */
                if (nodeObj.translateToCppCodeDeclaration && (!nodeObj.userData.isTerminal || (nodeObj.userData.isTerminal && translateTerminalsDeclaration))) cCode += nodeObj.translateToCppCodeDeclaration();

                /*
                 *  TODO here must be default values for not connected node terminals, ie:
                 *      datatype figure_ID_port_Name = value;
                 *  or:
                 *      datatype figure_ID_port_Name;
                 */
                if (nodeObj.jsonDocument !== undefined && nodeObj.jsonDocument.length > 0){
                    nodeObj.getInputPorts().each(function(portIndex, portObj){
                        if (portObj.getConnections().getSize() == 0){
                            console.log(`getting default port value: translateToCppCodeSubnodeInputTerminalsDefaultValuesArray["${nodeObj.NAME}"]["${portObj.getName()}"]`);
                            let defaultPortValues = translateToCppCodeSubnodeInputTerminalsDefaultValuesArray[`${nodeObj.NAME}`][portObj.getName()];
                            if (defaultPortValues.variableValue){
                                cCode += `${defaultPortValues.datatype} node_${nodeObj.getId()}_inputPort_${defaultPortValues.variableName} = ${defaultPortValues.variableValue};\n`;
                            }else{
                                cCode += `${defaultPortValues.datatype} node_${nodeObj.getId()}_inputPort_${defaultPortValues.variableName};\n`;
                            }
                        }
                    });
                }

                /*
                 *  C/C++ code line generated
                 */
                if (nodeObj.translateToCppCode) cCode += nodeObj.translateToCppCode();




                /*
                 *    Translate POST code, like ending while or for loop
                 */
                if (nodeObj.translateToCppCodePost) cCode += nodeObj.translateToCppCodePost();
            }
        });
    }

    /*
     *  Obtain additionaly used type definitions
     */
    typeDefinitionNeededList.each(function(definitionIndex, definitionStr){
        let definition = definitionStr.split("->");
        let className = definition[0].trim();
        let clusterName = definition[1].trim();
        GraphLang.Utils.translateToCppCodeClusterTypeDefinitionFromNode(className, clusterName);
    });

    /* erase flag for for loops at the end of this operation, to be able run again correctly, otherwise
    there will be orphans flags that loops were translated and it will make mess when multiple times
    executed this function without initializing ports */
    allNodes.each(function(nodeIndex, nodeObj){
        if (nodeObj.NAME.toLowerCase().search("loop") >= 0){
            nodeObj.getUserData().wasTranslatedToCppCode = false;
        }
    });

    /******************************************************************************
     * REWRITE IDs to HUMAN READABLE NUMBERS (starts from 1,2,...,N)
     *******************************************************************************/
    cCode = this.rewriteIDtoNumbers(canvas, cCode, translateToCppCodeAdditionalId, translateToCppCodeAdditionalIdNoHyphen);

    return cCode;
},

/**
 * @method translateToCppCodeClusterTypeDefinitionFromNode
 * @param {Strin} className - class in which cluster is defined
 * @returns {String} clusterName - cluster which typedefinition should be obtained
 * @description Load node schematic in auxiliary canvas and run translate process for cluster typedefinition.
 */
GraphLang.Utils.translateToCppCodeClusterTypeDefinitionFromNode = function(className, clusterName){
    /*
     *  Create canvas
     */
    var divClusterTypeDefinitionCanvasId = 'clusterTypeDefinitionCanvas_'+translateClusterTypeDefinitionCanvasArray.getSize();
    $('#clusterTypeDefinitionCanvasContainer').append("<div id=\"" + divClusterTypeDefinitionCanvasId + "\" style=\"width: 1500px; height: 600px;\"></div>");
    var clusterTypeDefinitionCanvas = new draw2d.Canvas(divClusterTypeDefinitionCanvasId);
    translateSubnodeCanvasArray.push([divClusterTypeDefinitionCanvasId, clusterTypeDefinitionCanvas])

    /*
     *  Translate cluster code definition
     */
    let classObj = eval(`new ${className}()`);
    GraphLang.Utils.displayContents2(classObj.jsonDocument, clusterTypeDefinitionCanvas);
    clusterTypeDefinitionCanvas.getFigures().each(function(figureIndex, figureObj){
        if (
            figureObj.getDatatype &&
            figureObj.getDatatype().startsWith("clusterDatatype_") &&
            figureObj.getNodeLabelText() == clusterName
        ){
            console.log(figureObj.translateToCppCodeTypeDefinition());
            translateToCppCodeTypeDefinitionArray.push(figureObj.translateToCppCodeTypeDefinition());
            translateToCppCodeAdditionalIdNoHyphen.add(figureObj.getId().replaceAll('-', ''));    //add cluster ID into aditional IDs list, remove '-' due they are not used in clusters datatype name
            translateToCppCodeAdditionalId.add(figureObj.getId());    //add cluster ID into aditional IDs list

            //TODO here must be traversing through elements and if there is some constant which is also from some seaparte file find it and transle
        }
    });

    /*
     *  Destroy auxiliary canvas
     */
    translateSubnodeCanvasArray.each(function(canvasIndex, canvasObjArray){
        $("canvas").remove("#"+canvasObjArray[0]);
        canvasObjArray[1].destroy();
    });
}

/**
 * @method translateToCppCodeSubNode
 * @param {draw2d.Figure} nodeObj - node object to be translated to CPP code
 * @returns {String} C/C++ code as string
 * @description Load node schematic in auxiliary canvas and run translate process for it, result should be function definition for particular node.
 */
GraphLang.Utils.translateToCppCodeSubNode = function(nodeObj){
    let cCode = "";
    cCodeParams = "";
    cCodeParamsInput = "";
    cCodeParamsOutput = "";
    cCodeReturnDatatype = "void";

    /*
     *      SET GLOBAL FLAG TO NOT CREATE TERMINALS DECLARATIONs
     */
    translateTerminalsDeclaration = false;

    var divSubnodeCanvasId = 'subnodeCanvas_'+translateSubnodeCanvasArray.getSize();
    $('#subnodeCanvasContainer').append("<div id=\"" + divSubnodeCanvasId + "\" style=\"width: 1500px; height: 600px;\"></div>");
    var subnodeCanvas = new draw2d.Canvas(divSubnodeCanvasId);
    translateSubnodeCanvasArray.push([divSubnodeCanvasId, subnodeCanvas])

    /*
    var subnodeCanvas = appCanvas2;
    */

    appCanvas2.clear();

    GraphLang.Utils.displayContents2(nodeObj.jsonDocument, subnodeCanvas);
    //GraphLang.Utils.displayContentsFromClass(nodeObj, subnodeCanvas);

    paramsCounterInput = 0;
    paramsCounterOutput = 0;
    subnodeCanvas.getFigures().each(function(figureIndex, figureObj){
        /*
         *  INPUT TERMINAL TRANSCRIPTION AS PARAMS FOR FUNCTION DECLARATION
         */
        if (
            figureObj.userData &&
            figureObj.userData.isTerminal &&
            (figureObj.userData.isTerminal == 1 || figureObj.userData.isTerminal.toLowerCase() == true) &&
            figureObj.translateToCppCodeAsParam != undefined
        ){
            if (paramsCounterInput > 0) cCodeParamsInput += ', ';
            cCodeParamsInput += figureObj.translateToCppCodeAsParam();
            paramsCounterInput++;

            /*
             *  push input terminal into array for case it's not connected and value must be assigned
             *  assuming all terminal nodes has unique name
             */
            if (translateToCppCodeSubnodeInputTerminalsDefaultValuesArray[nodeObj.NAME] == undefined) translateToCppCodeSubnodeInputTerminalsDefaultValuesArray[nodeObj.NAME] = {}
            translateToCppCodeSubnodeInputTerminalsDefaultValuesArray[nodeObj.NAME][figureObj.getUserData().nodeLabel] = {
                datatype: figureObj.getDatatype(),
                variableName: `${figureObj.getUserData().nodeLabel}`,
                variableValue: figureObj.getVariableValueAsStr ? figureObj.getVariableValueAsStr() : ""
            };
            console.log(`added subnode port: translateToCppCodeSubnodeInputTerminalsDefaultValuesArray["${nodeObj.NAME}"]["${figureObj.getUserData().nodeLabel}"]`);
        }

        /*
         *  OUTPUT TERMINAL, as pointers
         *
         *      for now accept just output terminal node
         */
        if (figureObj.NAME.toLowerCase().search("terminaloutput") > -1){
            if (paramsCounterOutput > 0) cCodeParamsOutput += ', ';
            cCodeParamsOutput += figureObj.translateToCppCodeAsParam();
            paramsCounterOutput++;
        }

        /*
         *  COMPLETE FUNCTION CALL PARAMETERS LIST
         */
        if (cCodeParamsInput !== "") {
            cCodeParams = cCodeParamsInput + ", " +cCodeParamsOutput;
        }else{
            cCodeParams = cCodeParamsOutput;
        }


        /*
         *  RETURN VALUE
         *      - if return node is found it asks for it datatype, if nothing is connected then it's undefined
         *      - in stored files nodes haven't 'NAME' property but have 'type' property
         *
         *
         *    Last iterated return is used as it's now, there SO THIS IS WRONG! shoulb be reworked somehow better.
         */
        if (figureObj.NAME.toLowerCase().search("return") > -1){
            cCodeReturnDatatype = figureObj.getDatatype();
        }
    });
    cCodeParams = cCodeParams.replace(/,\s*$/ ,"");    //remove last ',' if it's there

    cCode += cCodeReturnDatatype + ' ' + nodeObj.translateToCppCodeFunctionName() + "(" + cCodeParams + "){\n\t";

    /*
     *  Here is calling same parent C/C++ code transcription function on 2nd canvas
     */
    cCode += GraphLang.Utils.translateCanvasToCppCode(subnodeCanvas, false, nodeObj.NAME).replaceAll('\n','\n\t');

    cCode += "\n";  //to not have separate last curly bracket by tabulator
    cCode += '}' + "\n";

    /******************************************************************************
     * REWRITE IDs to HUMAN READABLE NUMBERS (starts from 1,2,...,N)
     *******************************************************************************/
    cCode = this.rewriteIDtoNumbers(subnodeCanvas, cCode, translateToCppCodeAdditionalId, translateToCppCodeAdditionalIdNoHyphen);

    //don't return any code, these functions are pushed into array and print after template is created
    //return cCode;
    translateToCppCodeFunctionsArray.push(cCode);

    /*
        Remove canvas html element and destroy JS canvas in memory
     */
    translateSubnodeCanvasArray.each(function(canvasIndex, canvasObjArray){
        $("canvas").remove("#"+canvasObjArray[0]);
        canvasObjArray[1].destroy();
    });
},

/**
 * @method getCppCode3
 * @param {draw2d.Canvas} canvas - schematic which will be serialize to JSON
 * @param {bool} showCode - if true there is code showed in alert message after click on button
 * @returns {String} C/C++ code as string
 * @description Generate C/C++ code using template written in this function.
 */
GraphLang.Utils.getCppCode3 = function(canvas, showCode = true){

    translateToCppCodeImportArray.clear();          //import statements
    translateToCppCodeTypeDefinitionArray.clear();
    translateToCppCodeFunctionsArray.clear();       //translated subnodes functions bodies
    translateToCppCodeSubnodeArray.clear();         //already translated subnodes function names
    translateSubnodeCanvasArray.clear();
    typeDefinitionUsedList.clear();
    typeDefinitionNeededList.clear();
    translateClusterTypeDefinitionCanvasArray.clear();
    translateToCppCodeAdditionalId.clear();
    translateToCppCodeAdditionalIdNoHyphen.clear();

    /******************************************************************************
     * Translate canvas to C/C++ code
     *******************************************************************************/
    let cCode = GraphLang.Utils.translateCanvasToCppCode(canvas, translateTerminalsDeclaration = true);

    var template_cCode = "";
    var _disabled_template_cCode = "";

    template_cCode += "\n";
    template_cCode += this.getCppCodeImport();
    template_cCode += "\n";

    template_cCode += `
typedef int errorDatatype;
typedef int int32;
typedef int undefined;
typedef unsigned int uint;
typedef float numeric;
    `;

    _disabled_template_cCode += `
#define HIGH true
#define LOW false

using namespace std;

/**** MOCKING CLASSES **************************/
#include<iostream>
#include<string>
#include<unistd.h>
#include<vector>

typedef string String;

class SerialClass{
    public:
        void println(string msg);
        void begin(int pinNumber);
    private:
        bool initializeFlag = false;
        int pinNumber;
};

void SerialClass::println(string msg){
    cout << msg << endl;
}

void SerialClass::begin(int pinNumber){
    this->initializeFlag = true;
    this->pinNumber = pinNumber;
    cout << "Serial initialized at pin " << pinNumber << endl;
}

void delay(int time_ms){
    usleep(time_ms*1000);
}

int arduinoPinValue[100];
int arduinoPinMode[100];
enum pinMode{
    INPUT,
    OUTPUT,
    INPUT_PULLUP
};

bool digitalRead(int pin){
    return arduinoPinValue[pin];
}

void digitalWrite(int pin, bool value){
    arduinoPinValue[pin] = value;
}

void pinMode(int pin, pinMode mode){
    arduinoPinMode[pin] = mode;
}

SerialClass Serial;
/***********************************************/
    `;

    template_cCode += "\n";
    template_cCode += this.getCppCodeTypeDefinition();
    template_cCode += "\n";

    /******************************************************************************
     * SubNode code printed as subfunctions
     *******************************************************************************/
    template_cCode += "/************* BEGIN Transcripted SubNode function definitions ************/\n\n";
    translateToCppCodeFunctionsArray.unique();  //removes duplicates
    translateToCppCodeFunctionsArray.each(function(functionIndex, functionStr){
        template_cCode += "\n";
        template_cCode += functionStr;
        template_cCode += "\n";
    });
    template_cCode += "/************* END Transcripted SubNode function definitions ************/\n\n";

    template_cCode += "void setup() {\n";
    template_cCode += "\n";
    template_cCode += cCode;
    template_cCode += "\n";
    template_cCode += "}\n";
    template_cCode += "void loop() {\n";
    template_cCode += "\t/* generated code is in setup() */\n";
    template_cCode += "}\n";

    /*
    template_cCode += "int main(int argc, char* argv[]){\n";
    template_cCode += "\n";
    template_cCode += cCode;
    template_cCode += "\n";
    template_cCode += "\t return 0;\n";
    template_cCode += "}\n";
    */

    cCode = template_cCode;

    /******************************************************************************
     * REWRITE IDs to HUMAN READABLE NUMBERS (starts from 1,2,...,N)
     *******************************************************************************/
    cCode = this.rewriteIDtoNumbers(canvas, cCode, translateToCppCodeAdditionalId, translateToCppCodeAdditionalIdNoHyphen);

    var copyElement = document.createElement('textarea');
    copyElement.innerHTML = cCode;
    copyElement = document.body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    copyElement.remove();

    if (showCode) alert(cCode); //DEBUG show code in alert message

    this.initAllPortToDefault(canvas);
    return cCode; //return C/C++ code as string
}
