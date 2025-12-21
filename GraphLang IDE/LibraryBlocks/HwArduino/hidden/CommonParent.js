/**
 *  @author LuboJ
 *  @description This is common parent for arduino nodes.
 */
HwArduino.CommonParent = GraphLang.UserDefinedNode.extend({
    NAME: "HwArduino.CommonParent",

    translateToCppCodeImport: function(){
        return ["#include <Arduino.h>"];
    },

});
