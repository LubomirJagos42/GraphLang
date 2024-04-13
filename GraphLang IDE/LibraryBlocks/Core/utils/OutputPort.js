/**
 *  @class draw2d.OutputPort
 *  @description Overriding some parameters of original draw2d input port. Size, color, ...
 */
draw2d.OutputPort = draw2d.OutputPort.extend({
  NAME: "draw2d.OutputPort",
  
  init:function(attr, setter, getter){
    this._super( $.extend({
      radius: 4
    },attr), setter, getter);
    this.setStroke(3);  //set thicker stroke line for output ports

    /*
     *  Basic userData definitions
     */
    if (!this.userData) this.userData = {}
    this.userData.allowMultipleConnections = true;
    this.userData.connectionMandatory = false;

    /*
     *  General context menu for nodes output ports
     */
    this.on("contextmenu", function(emitter, event){
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
            case "createTerminal":
              alert("Function not implemented yet.");
              break;
            default:
              break;
          }

        },this),
        x:event.x,
        y:event.y,
        items: {
          "createTerminal": {name: "Create Terminal"},
        },
      });
    });

  },

});

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
