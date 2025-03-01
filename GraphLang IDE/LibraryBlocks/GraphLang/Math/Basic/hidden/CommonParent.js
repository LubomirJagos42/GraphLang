/**
 *  @author LuboJ
 *  @description This is common parent for math basic nodes it contains common context menu for them to change input datatype.
 */
GraphLang.Math.Basic.CommonParent = GraphLang.UserDefinedNode.extend({
    NAME: "GraphLang.Math.Basic.CommonParent",

    /*
     *  This overwrites context menu items defined in user defined node
     */
    additionalContextMenuItems: {
        "--> A": {name: "--> A, Item"},
        "--> B": {name: "--> B, Item"},
        "--> C": {name: "--> C, Item"},
    },

    init:function(attr, setter, getter)
    {
        this._super( $.extend({stroke:0, bgColor:null, width: 42, height: 42},attr), setter, getter);
        this.contextMenuItems = {
            ...this.contextMenuItems,
            ...this.additionalContextMenuItems
        }

        //this is to extend callback function for context menu
        this.on("contextmenu", function(emitter, event){
            $.contextMenu({
                trigger: 'right',
                selector: 'body',
                events:
                    {
                        hide:function(){ $.contextMenu( 'destroy' ); }
                    },

                //these functions are run after user click on some context menu option
                callback: $.proxy(function(key, options)
                {
                    switch(key){
                        case "--> A":
                            alert("This is item A");
                            break;
                        case "--> B":
                            alert("This is item B");
                            break;
                        default:
                            alert(key);
                            break;
                    }
                },emitter),
                x:event.x,
                y:event.y,
                items: emitter.contextMenuItems,
            });
        });

        this.on("contextmenu", function(emitter, event){
            console.log(`${emitter.NAME} context menu triggered`);
        });
    },

});
