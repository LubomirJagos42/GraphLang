/**
 * @author Lubomir Jagos
 * @description General object to translate schematic to code
 */

class TranslateToGeneralCode_1 {

    language = "cpp";

    //auxiliary ArrayList store declaration of some variables or something during translation process
    translateToCppCodeFunctionsArray = new draw2d.util.ArrayList();
    translateToCppCodeImportArray = new draw2d.util.ArrayList();
    translateToCppCodeLibrariesList = new draw2d.util.ArrayList();              //additional CPP libraries which must be provided to linker
    translateToCppCodeTypeDefinitionArray = new draw2d.util.ArrayList();
    translateToCppCodeSubnodeArray = new draw2d.util.ArrayList();
    translateToCppCodeSubnodeInputTerminalsDefaultValuesArray = new draw2d.util.ArrayList();
    translateSubnodeCanvasArray = new draw2d.util.ArrayList();

    typeDefinitionUsedList = new draw2d.util.ArrayList();
    typeDefinitionNeededList = new draw2d.util.ArrayList();
    translateClusterTypeDefinitionCanvasArray = new draw2d.util.ArrayList();
    translateClusterTypeDefinitionItems = [];          //this stores array[custer_datatype_name] = map of item labels: datatype

    translateToCppCodeAdditionalId = new draw2d.util.ArrayList();
    translateToCppCodeAdditionalIdNoHyphen = new draw2d.util.ArrayList();

    translateToCppCodeErrorList = new draw2d.util.ArrayList();
    translateToCppCodeBreakpointList = new draw2d.util.ArrayList();
    translateToCppCodeWatchList = new draw2d.util.ArrayList();

    GLOBAL_CODE_LINE_OFFSET = 0;
    GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = null;

    constructor(paramsObj) {
        if (typeof paramsObj === "object" && Object.hasOwn(paramsObj, "language")) this.language = paramsObj.language;
    }

    getCppCodeImport() {
        var cCode = "";
        this.translateToCppCodeImportArray.unique();                               //remove duplicities
        this.translateToCppCodeImportArray.each(function (itemIndex, itemObj) {
            cCode += itemObj + "\n";
        });
        return cCode;
    }

    getCppCodeTypeDefinition() {
        var cCode = "";
        this.translateToCppCodeTypeDefinitionArray.unique();                               //remove duplicities
        this.translateToCppCodeTypeDefinitionArray.each(function (itemIndex, itemObj) {
            cCode += itemObj + "\n";
        });
        return cCode;
    }

    /**
     *  Init buffers which collects information about current diagram which is translated.
     */
    initTranslateToCppBuffers() {
        this.translateToCppCodeImportArray.clear();          //import statements
        this.translateToCppCodeTypeDefinitionArray.clear();
        this.translateToCppCodeFunctionsArray.clear();       //translated subnodes functions bodies
        this.translateToCppCodeSubnodeArray.clear();         //already translated subnodes function names
        this.translateSubnodeCanvasArray.clear();
        this.typeDefinitionUsedList.clear();
        this.typeDefinitionNeededList.clear();
        this.translateClusterTypeDefinitionCanvasArray.clear();
        this.translateClusterTypeDefinitionItems = [];
        this.translateToCppCodeAdditionalId.clear();
        this.translateToCppCodeAdditionalIdNoHyphen.clear();
        this.translateToCppCodeErrorList.clear();
        this.translateToCppCodeBreakpointList.clear();
        this.translateToCppCodeWatchList.clear();
        this.translateToCppCodeLibrariesList.clear();
    }

    translateCanvasToCppCode(funcParams) {
        //TODO: Not implemented in this object yet
    }

    translateToCppCodeClusterTypeDefinitionFromNode(className, clusterName) {
        //TODO: Not implemented in this object yet
    }

    translateToCppCodeSubNode(funcParams) {
        //TODO: Not implemented in this object yet
    }

    getObjectWhichGenerateCodeAtLine(lineNumberToFind) {
        //TODO: Not implemented in this object yet
    }

    getCppCode(canvas, showCode = true) {
        //TODO: Not implemented in this object yet
    }

}
/*******************************************************************************************************************************
 *  CREATE CODE GENERATOR OBJECT AND ASSIGN IT TO GENERAL VARIABLES STORAGE
 *******************************************************************************************************************************/
GraphLang.Utils.TranslateToGeneralCodeObj = new TranslateToGeneralCode_1({language: "cpp"});
