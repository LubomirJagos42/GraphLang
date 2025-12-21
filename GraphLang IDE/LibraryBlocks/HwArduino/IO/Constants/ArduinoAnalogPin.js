// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
HwArduino.IO.Constants.ArduinoAnalogPin = GraphLang.Shapes.Basic.SelectOptionDefinedValues.extend({

    NAME: "HwArduino.IO.Constants.ArduinoAnalogPin",

    init:function(attr, setter, getter)
    {
        this._super(attr, setter, getter);

        this.userData.optionEditorValues = [
            {value: "A0", name: ""},
            {value: "A1", name: ""},
            {value: "A2", name: ""},
            {value: "A3", name: ""},
            {value: "A4", name: ""},
            {value: "A5", name: ""},
            {value: "A6", name: ""},
            {value: "A7", name: ""},
            {value: "A8", name: ""},
        ];
    },

    translateToCppCodeImport: function(){
        return ["#include <Arduino.h>"];
    },

});