/**
 *  @class GraphLang.Shapes.Basic.Loop.Multilayered
 *  @author Ing. Lubomir Jagos
 *  @description Base class for multilayered structures, they are also loops, but there
 *  are many loops hidden inside, and they share common boundary which is just one.
 *  So Inside should be multiple sheetes without boundaries than there wouldn't be
 *  detected tunnels on their borders and just one tunnels for common loop would be
 *  generated.
 */
GraphLang.Shapes.Basic.Jailhouse = draw2d.shape.composite.Jailhouse.extend({
  NAME: "GraphLang.Shapes.Basic.Jailhouse",
  init:function(attr, setter, getter)
  {
    this._super( $.extend({},attr), setter, getter);
  },
  translateToCppCode: function(){
    cCode = "";

    //cCode += "{BEGIN Multilayered Jailhouse layer id: " + this.getId() + "}\n";

    //this is not running
    //    cCode += GraphLang.Utils.translateToCppCode2(this.getCanvas(), this)

    /*
     *  Going through all nodes and wires inside Jailhouse and translate them into C/C++ code or call appropriate translate function
     */
    //cCode += "LuboJ :)";  //original just dummy string
    //
    layerFigures = this.getAssignedFigures();
    layerFigures.each(function(figureIndex, figureObj){
      if (figureObj.NAME.toLowerCase().search("connection") == -1){
        cCode += figureObj.translateToCppCode() + "\n";
      }
    });

//    cCode += "{END Multilayered Jailhouse layer id: " + this.getId() + "}\n";
    return cCode;
  }
});