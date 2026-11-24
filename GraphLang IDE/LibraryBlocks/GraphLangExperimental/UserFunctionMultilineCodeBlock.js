/**
 *  @class GraphLang.Shapes.Basic.UserFunctionMultilineCodeBlock
 *  @descritpition User written multiline code directly included in generated source code at place given by execution order.
 *  Node has errorIn/errorOut ports on its bottom edge so it can be chained into wiring (error wire) and by that its place
 *  in execution order is defined. Text is edited by double click (draw2d.ui.MultilineInplaceEditor), CTRL+ENTER commits, ESC cancels.
 *
 *  Python:
 *      - code is inserted as is (common leading indentation is removed, translator indents it when it's inside loop)
 *      - if user code defines variable named "out1" its value is assigned to wires connected to output port "out1"
 *      - errorOut wires get value of errorIn wire (pass through)
 */
// GraphLang.Shapes.Basic.UserFunctionMultilineCodeBlock = draw2d.SetFigure.extend({
GraphLang.Shapes.Basic.UserFunctionMultilineCodeBlock = draw2d.shape.basic.Label.extend({
  NAME: "GraphLang.Shapes.Basic.UserFunctionMultilineCodeBlock",
  init:function(attr, setter, getter){
    this._super( $.extend({padding: {left: 6, top: 4, right: 6, bottom: 10}},attr), setter, getter);
    this.installEditor(new draw2d.ui.MultilineInplaceEditor());

    var port;

    /*****************************************************************************
     *  OUTPUT PORT
     *****************************************************************************/

    //port is pushed little away not to be inside outline, otherwise tunnels would be detected
    //due wire are crossing or touching outline
    port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(105, 50.0));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#FFFFFF");
    port.setName("out1");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = "polymorphic";

    /*****************************************************************************
     *  ERROR IN / ERROR OUT on bottom edge
     *      GraphLang.Utils.BottomRelPortLocator(x percent of width, y pixels from bottom edge)
     *      negative y pushes port little below outline for same reason as output port above
     *****************************************************************************/
    port = this.createPort("input", new GraphLang.Utils.BottomRelPortLocator(8, -3));
    port.setConnectionDirection(3);
    port.setBackgroundColor("#F3E957");
    port.setName("errorIn");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = "errorDatatype";
    port.userData.allowMultipleConnections = false;
    port.userData.connectionMandatory = false;

    port = this.createPort("output", new GraphLang.Utils.BottomRelPortLocator(92, -3));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#F3E957");
    port.setName("errorOut");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = "errorDatatype";
    port.userData.allowMultipleConnections = true;
    port.userData.connectionMandatory = false;

    //ports are always created here in init(), older schematics stored just out1 port which would remove error ports
    this.persistPorts = false;

    this.userData = {};
  },

  /**
   * @method
   * @description Older schematics were saved with ports (persistPorts was true), they are ignored and ports from init() are used.
   */
  setPersistentAttributes: function(memento){
    if (memento && memento.ports !== undefined) delete memento.ports;
    this._super(memento);
    this.persistPorts = false;
    return this;
  },

  /**
   * @method
   * @description Returns code text as plain text with "\n" newlines. Older versions of editor (contenteditable div) stored html
   * like <div>, <br>, &nbsp;, &lt; into text, it's converted back to plain text here.
   * @returns {string}
   */
  getCodeText: function(){
    let text = this.getText();
    if (text === undefined || text === null) return "";
    text = String(text).replace(/\r\n?/g, "\n");

    if (/<\/?(div|br|p)\b[^>]*>|&(nbsp|lt|gt|amp|quot|#39);/i.test(text)){
      text = text
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<div[^>]*>/gi, "\n")
        .replace(/<\/div>/gi, "")
        .replace(/<p[^>]*>/gi, "\n")
        .replace(/<\/p>/gi, "")
        .replace(/&nbsp;/gi, " ")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&amp;/gi, "&");
    }
    return text;
  },

  /**
   * @method
   * @description Code lines with removed common leading indentation and removed empty lines at begin and end.
   * @returns {string[]}
   */
  getCodeLinesDedented: function(){
    let lines = this.getCodeText().replace(/\t/g, "    ").split("\n").map(line => line.replace(/\s+$/, ""));
    while (lines.length > 0 && lines[0].trim() === "") lines.shift();
    while (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();

    let minIndent = null;
    lines.forEach(function(line){
      if (line.trim() === "") return;
      let indent = line.match(/^ */)[0].length;
      if (minIndent === null || indent < minIndent) minIndent = indent;
    });
    if (minIndent) lines = lines.map(line => line.substring(Math.min(minIndent, line.match(/^ */)[0].length)));
    return lines;
  },

  translateToCppCodeFunctionName: function(){
    let cCode = "";
    cCode += this.NAME.replaceAll('.', '__');
    cCode += "_" + this.getId();
    return cCode;
  },

  translateToCppCode: function(){
    let cCode = "";
    let nodeText = this.getCodeText();
    let outPort = this.getOutputPort(0);
    let outPortDatatype = "void";
    if (outPort.getUserData() && outPort.getUserData().datatype) outPortDatatype = outPort.getUserData().datatype;

    cCode += "{ //start new scope\n";

    // cCode += outPortDatatype + " " + this.translateToCppCodeFunctionName() + "{\n";
    //function output type is void as outputs are returned through buffer variables which must be part of function parameters
    cCode += "void " + this.translateToCppCodeFunctionName() + "(){\n";

    cCode += nodeText;
    cCode += "\n";
    /*
     *  TODO: Here must be assignment to input variables which serve as output buffers, that's C convention to put into params output variable pointers or similar
     */
    cCode += "}  //closing function\n";
    cCode += "}  //closing scope\n";

    return cCode;
  },

  /**
   * @method
   * @description Python code generator, user code is placed as it is at place defined by execution order.
   * @returns {string} python code NOT INDENTED, translator indents it if node is inside loop
   */
  translateToPythonCode: function(){
    let pythonCode = "";
    let codeLines = this.getCodeLinesDedented();

    pythonCode += `# BEGIN user multiline code block ${this.getId()}\n`;
    if (codeLines.length === 0) pythonCode += "pass\n";
    else pythonCode += codeLines.join("\n") + "\n";

    //output port, value of user variable "out1" is assigned to connected wires
    let outPort = this.getOutputPort("out1");
    if (outPort){
      outPort.getConnections().each(function(connIndex, connObj){
        pythonCode += `${connObj.getVariableName()} = out1 if "out1" in dir() else None\n`;
      });
    }

    //error pass through
    let errorInVariable = "None";
    let errorInPort = this.getInputPort("errorIn");
    if (errorInPort && errorInPort.getConnections().getSize() > 0){
      errorInVariable = errorInPort.getConnections().first().getVariableName();
    }
    let errorOutPort = this.getOutputPort("errorOut");
    if (errorOutPort){
      errorOutPort.getConnections().each(function(connIndex, connObj){
        pythonCode += `${connObj.getVariableName()} = ${errorInVariable}\n`;
      });
    }

    pythonCode += `# END user multiline code block ${this.getId()}\n`;
    return pythonCode;
  }

});
