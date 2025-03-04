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
        "--> D": {name: "--> D, Item"},
    },
    additionalContextMenuItemsHandlerPreHook: function(emitter, key, options){
        switch(key){
            case "--> A":
                alert(`This is item A, emitter node id: ${emitter.getId()}`);
                break;
            default:
                alert(`${key}, pre hook`);
                break;
        }
    },
    additionalContextMenuItemsHandlerPostHook: function(emitter, key, options){
        switch(key){
            case "--> B":
                alert(`This is item B, emitter node id: ${emitter.getId()}`);
                break;
            default:
                alert(`${key}, post hook`);
                break;
        }
    },

    init:function(attr, setter, getter)
    {
        this._super( $.extend({stroke:0, bgColor:null, width: 42, height: 42},attr), setter, getter);
        this.contextMenuItems = {
            ...this.contextMenuItems,
            ...this.additionalContextMenuItems
        }
    },

});
