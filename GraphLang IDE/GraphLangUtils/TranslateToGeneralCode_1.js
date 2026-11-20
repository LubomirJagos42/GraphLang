/**
 * @class
 * @author Lubomir Jagos
 * @description General object to translate schematic to code
 */
class TranslateToGeneralCode_1 {

    language = "cpp";
    translatorObj = {};
    translatorCanvasObj = {};

    constructor(paramsObj) {
        let languageName = typeof paramsObj === "object" && Object.hasOwn(paramsObj, "language") ? paramsObj.language : "";
        if (Object.keys(paramsObj).includes(paramsObj.canvasObj) && typeof paramsObj.canvasObj === "object") this.translatorCanvasObj = paramsObj.canvasObj;

        this.setProgrammingLanguage(languageName);
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     * @param canvasObj
     */
    setCanvas = (canvasObj) => {
        if (this.translatorObj !== null && this.translatorObj !== undefined && Object.keys(this.translatorObj).length > 0){
            this.translatorObj.setCanvas(canvasObj);
        }else{
            throw new Error("Internal translator object seems to be wrong!");
        }
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     * @param languageName
     */
    setProgrammingLanguage = (languageName) => {
        if (languageName !== "") this.language = languageName;

        if (this.language === "cpp") {
            this.translatorObj = new TranslateToCppCode_2_TranslatorObject({canvasObj: this.translatorCanvasObj});
        }else if (this.language === "python"){
            this.translatorObj = new TranslateToPythonCode_2_TranslatorObject({canvasObj: this.translatorCanvasObj});
        }else{
            throw new Error("Translator language not defined, cannot create its instance!");
        }
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     */
    initTranslateBuffers = () => {
        this.translatorObj.initTranslateToCppBuffers();
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     */
    getErrorList = () => {
        return this.translatorObj.getErrorList();
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     */
    getBreakpointList = () => {
        return this.translatorObj.getBreakpointList();
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     */
    getWatchList = () => {
        return this.translatorObj.getWatchList();
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     */
    getLibrariesList = () => {
        return this.translatorObj.getLibrariesList();
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     * @param {draw2d.Canvas} canvas - this canvas is used to generate ode
     * @param {boolean} showCode - display alert window with translated code
     * @param {string} codeTemplate - code template which is used as wrapper around code ie. for desktop code frame is different than for arduino or embedded native code
     * @returns {Promise<string>}
     */
    getCode = async (canvas, showCode = true, codeTemplate = null) => {
        if (codeTemplate === null || codeTemplate === ""){
            let projectId = GraphLang.Utils.getCurrentProjectId();
            codeTemplate = await GraphLang.Utils.getProjectCodeTemplate(projectId);
        }

        return this.translatorObj.getCode(canvas, showCode, codeTemplate);
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     * @param {Object}        funcParam - object with input parameters
     * @param {draw2d.Canvas} funcParam.canvas - schematic which will be serialized to JSON
     * @param {boolean}       funcParam.translateTerminalsDeclaration - if set to false input/output terminals for outside world declaration are not written in C/C++, this is for translate subnodes
     * @param {string}        funcParam.nodeName - name of current node which schematic is being translated into code, this is set when subnode diagram is translated into code
     * @param {Object[]}      funcParam.compileErrorLines - array of error lines which should be searched during translation process
     * @param {number}        funcParam.codeLinesOffset - number of lines which are generated before, this is to got right line number when searching for error line
     * @returns {string} C/C++ code as string
     * @return {string|*}
     */
    translateCanvasToCode = (funcParams) => {
        return this.translatorObj.translateCanvasToCode(funcParams);
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     * @return {number|*}
     */
    getCurrentTranslateLineOffset = () => {
        return this.translatorObj.getCurrentTranslateLineOffset();
    }

    /**
     * @method
     * @memberOf TranslateToGeneralCode_1
     * @param {number} lineNumberToFind
     * @return {*}
     */
    getObjectWhichGenerateCodeAtLine = (lineNumberToFind)=> {
        return this.translatorObj.getObjectWhichGenerateCodeAtLine(lineNumberToFind);
    }

}

/*******************************************************************************************************************************
 *  CREATE CODE GENERATOR OBJECT AND ASSIGN IT TO GENERAL VARIABLES STORAGE
 *******************************************************************************************************************************/
GraphLang.Utils.TranslateToGeneralCodeObj = new TranslateToGeneralCode_1({language: "cpp", canvasObj: appCanvas});
