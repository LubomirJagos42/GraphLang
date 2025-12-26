/**
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

    setCanvas = (canvasObj) => {
        if (this.translatorObj !== null && this.translatorObj !== undefined && Object.keys(this.translatorObj).length > 0){
            this.translatorObj.setCanvas(canvasObj);
        }else{
            throw new Error("Internal translator object seems to be wrong!");
        }
    }

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

    initTranslateBuffers = () => {
        this.translatorObj.initTranslateToCppBuffers();
    }

    getErrorList = () => {
        return this.translatorObj.getErrorList();
    }

    getBreakpointList = () => {
        return this.translatorObj.getBreakpointList();
    }

    getWatchList = () => {
        return this.translatorObj.getWatchList();
    }

    getLibrariesList = () => {
        return this.translatorObj.getLibrariesList();
    }

    /**
     * @method getCode
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

    translateCanvasToCode = (funcParams) => {
        return this.translatorObj.translateCanvasToCode(funcParams);
    }

    getCurrentTranslateLineOffset = () => {
        return this.translatorObj.getCurrentTranslateLineOffset();
    }

    getObjectWhichGenerateCodeAtLine = (lineNumberToFind)=> {
        return this.translatorObj.getObjectWhichGenerateCodeAtLine(lineNumberToFind);
    }

}

/*******************************************************************************************************************************
 *  CREATE CODE GENERATOR OBJECT AND ASSIGN IT TO GENERAL VARIABLES STORAGE
 *******************************************************************************************************************************/
GraphLang.Utils.TranslateToGeneralCodeObj = new TranslateToGeneralCode_1({language: "cpp", canvasObj: appCanvas});
