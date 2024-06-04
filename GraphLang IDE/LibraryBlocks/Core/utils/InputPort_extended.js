/**
 *  @class draw2d.InputPort
 *  @description Overriding some parameters of original draw2d input port. Size, color, ...
 */
draw2d.InputPort = draw2d.InputPort.extend({
  NAME: "draw2d.InputPort",
  
  init:function(attr, setter, getter){
    this._super( $.extend({
      radius: 4
    },attr), setter, getter);

    /*
     *  Basic userData definitions
     */
    if (!this.userData) this.userData = {}
    this.userData.allowMultipleConnections = false;
    this.userData.connectionMandatory = false;

    /*
     *  General context menu for nodes input ports
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
            case "createConstant":
              alert("Function not implemented yet.");
              break;
            default:
              break;
          }

        },this),
        x:event.x,
        y:event.y,
        items: {
          "createConstant": {name: "Create constant"},
        },
      });
    });

  },
});
