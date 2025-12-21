// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
HwArduino.IO.Constants.ArduinoDigitalPin = GraphLang.Shapes.Basic.SelectOptionDefinedValues.extend({

    NAME: "HwArduino.IO.Constants.ArduinoDigitalPin",

    init:function(attr, setter, getter)
    {
        this._super(attr, setter, getter);

        this.userData.optionEditorValues = [
            {value: "LED_BUILTIN", name: ""},
            {value: "D0", name: ""},
            {value: "D1", name: ""},
            {value: "D2", name: ""},
            {value: "D3", name: ""},
            {value: "D4", name: ""},
            {value: "D5", name: ""},
            {value: "D6", name: ""},
            {value: "D7", name: ""},
            {value: "D8", name: ""},
            {value: "D9", name: ""},
            {value: "D10", name: ""},
            {value: "D11", name: ""},
            {value: "D12", name: ""},
            {value: "D13", name: ""},
            {value: "D14", name: ""},
            {value: "D15", name: ""},
            {value: "D16", name: ""},
            {value: "D17", name: ""},
            {value: "D18", name: ""},
            {value: "D19", name: ""},
        ];
    },

    translateToCppCodeImport: function(){
        return ["#include <Arduino.h>"];
    },

});