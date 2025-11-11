/**
 *  @class GraphLang.Shapes.Basic.UserCodeBlock
 *  @descritpition User written own code directly included in generated source code. This class is here to have parent obj for similar things. User defined source code is lowest level way for programmer how to put hand written code directly into generated code.
 */
// GraphLang.Shapes.Basic.UserFunctionMultilineCodeBlock = draw2d.SetFigure.extend({
GraphLang.Shapes.Basic.UserFunctionMultilineCodeBlock = draw2d.shape.basic.Label.extend({
  NAME: "GraphLang.Shapes.Basic.Node.UserFunctionMultilineCodeBlock",
  init:function(attr, setter, getter){
    this._super( $.extend({},attr), setter, getter);
    this.installEditor(new draw2d.ui.MultilineInplaceEditor());

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
    port.userData.datatype = "polymorphic"
    
    this.userData = {};
  },

  translateToCppCodeFunctionName: function(){
    let cCode = "";
    cCode += this.NAME.replaceAll('.', '__');
    cCode += "_" + this.getId();
    return cCode;
  },

  translateToCppCode: function(){
    cCode = "";
    let nodeText = this.getText();
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
  }
  
});
