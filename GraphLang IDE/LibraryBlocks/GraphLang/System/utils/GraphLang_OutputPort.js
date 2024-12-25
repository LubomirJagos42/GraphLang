/**
 *  @class GraphLang.OutputPort
 *  @description Custom GraphLang output port as extension of draw2d.OutputPort
 */
GraphLang.OutputPort = draw2d.OutputPort.extend({
  NAME: "GraphLang.OutputPort",
  constructor(obj){
    obj && Object.assign(this, obj);
  }
});
