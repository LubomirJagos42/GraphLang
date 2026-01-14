HwRaspiZero.Console.output = GraphLang.UserDefinedNode.extend({
NAME: "HwRaspiZero.Console.output",

   init:function(attr, setter, getter)
   {
       this._super( $.extend({stroke:0, bgColor:null, width:69, height:55, flagAutoCreatePorts: false},attr), setter, getter);
       var port;
       // Port
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-0.7246376811594203, 49.090909090909086));
       port.setConnectionDirection(3);
       port.setBackgroundColor("#CA00F3");
       port.setName("Port");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "string";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       this.persistPorts=false;
   },

   createShapeElement : function()
   {
       var shape = this._super();
       this.originalWidth = 69;
       this.originalHeight= 55;
       return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L69,0 L69,55 L0,55");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Rectangle
       shape = this.canvas.paper.path('M0 0L69 0L69 55L0 55Z');
       shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
       shape.data("name","Rectangle");
       
       // Label
       shape = this.canvas.paper.image();
       shape.attr({"x":11.005024000000049,"y":3,"width":48,"height":48,"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASPSURBVHhe7VtHS2tBFL5gF125EXtHsSti7yAWLOjKpSD4H8RfoOJSXOhKxIJtI250IShuRRA7KqIgCPaC7Ty+keTFM7l5luSZ3MkHXxJmJjdzvjNMZs6Z0UhxaLxANbgF4AWqQVeAp6cnur29pZubG7q+vpZ4dXXlFOT9MvHu7o7u7+/p8fGRXl5euHlmSAJMTU1Ra2srJScnU2RkJIWHh1NYWBiFhoZKDAkJ+VXy/oDoKxgVFUVxcXGUmJhImZmZ1NTURGNjY9zcvwIcHh5SRUUFaZpmaJaVldHBwcFHAU5OToRavLFRGRMTQ8fHx38FqKurkxoZnVVVVe8CrK6uSpWqcHl5mbSOjg6pQhW2t7eTVl1dLVWowsrKStIwK/IKVVhYWEhaUVGRVKEKc3NzScvPz5cqVGF2djZpQgUrlSoQK0RNqGClUgUKAcSLRWFwcDDNzMzQ/Pw8zc3NGYKwZXZ2VuwVLG1NTU2VBYiNjTWvk40GbIwsbU1JSZEFiI6OFltJo+Hh4YESEhLcArgF4AKkpaWpLYB4sSiMiIgQYTCjAU5FHODbAiBGODExQcPDwzQ6OvqBZ2dnvLnTAQJgdH9bgNfXVxocHPzQ1sSMjAw6PT3lX3Eq/FgAE+BxDw8PlxPBbgIAiBx7eXlJIqSnpzutCHYVABgfHydPT09JBGcdCXYXAJicnHSZkeAQAQCMBFeYExwmAOAKc4JDBQCmp6cpKChIEgErzc3NTd78v8PhAgB60aWhoSHe9L/DoQIgA1tfXy8ZDvb09PDmvwJkupEw/acAyAYjvfxZIAVdW1srGQ729vby5r8GOBXOtasA8LxeXvEznsfvHB0d0d7eHu3s7NDW1hZtb2/T7u6umfv7+yJzDSKri/fvwO4CwPN6xn/G893d3SKP7+fnRz4+PuTt7S3+SUB8NtHX15f8/f0F0RZsbm6mi4sL/kibsKsAP/X8ysqK9L2vsquriz/WJuwmwE89D/T390vf/SpbWlr4Y23CLgKcn59TaWmp1Bnws8YDGxsbYtjzZ3yFAwMD/LE2oSsAD4npCYCASGdnJ8XHx1NWVpaZWPL29fXx5v/EwsICNTQ0iARlQUGBWEPk5OQI5uXlmcvxXlxcTCUlJVReXk41NTXi997e3vgjbUJXAB4UxcRkTQAERFCOE1f4bElXAPoO535bAFeHWwC3AG4BJAFEcpSnx1USQDifb2GVE4AfkUEO/fLykn/f5QEB4FxLW8Xo54ekVBJAjH6+tMUwQSLRaMAGjq8ExTE5flAyICBArNWNBsQaAgMDP9gqDkqK46IWhSCiuWtra0I17P4QT3NFmi5MrK+vi30Lt7OtrY20paUlqQJEMAJBRMTRcHHCFYm+wwa9nefi4uL7cXkxFKw0MDJxRBgQAuDyALa5vJFRiYMSiEWaBQBQoMLBafzrSVdmTECQAfn/xsZGMREmJSWJczVQzHQZyZkuTZlo7dIU+oy+wwbYguDLyMiIFEiRbo2Z8Pz8LGZQrAkwo2IhYUl+fe23yfuHPqPvsAG26EFXAFXgFoAXqAblBfgDQN9UZPZsj8wAAAAASUVORK5CYII=","stroke-scale":true,"opacity":1,"stroke-width":1,"transform":"t11.005024000000049,3s0.75,0.75,0,0"});
       shape.data("name","Label");
       

       return this.canvas.paper.setFinish();
   },

   symbolPicture: "data:image/png;base64,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",

applyAlpha: function()
    {
    },
layerGet: function(name, attributes)
    {
        if(this.svgNodes===null) return null;

        var result=null;
        this.svgNodes.some(function(shape){
            if(shape.data("name")===name){
                result=shape;
            }
            return result!==null;
        });

        return result;
    },
layerAttr: function(name, attributes)
    {
        if(this.svgNodes===null) return;

        this.svgNodes.forEach(function(shape){
            if(shape.data("name")===name){
                shape.attr(attributes);
            }
        });
    },
layerShow: function(name, flag, duration)
    {
        if(this.svgNodes===null) return;

        if(duration){
            this.svgNodes.forEach(function(node){
                if(node.data("name")===name){
                    if(flag){
                        node.attr({ opacity : 0 }).show().animate({ opacity : 1 }, duration);
                    }
                    else{
                        node.animate({ opacity : 0 }, duration, function () { this.hide() });
                    }
                }
            });
        }
        else{
            this.svgNodes.forEach(function(node){
                if(node.data("name")===name){
                    if(flag){node.show();}
                    else{node.hide();}
                }
            });
        }
    },
getParameterSettings: function()
    {
        return [];
    },
addPort: function(port, locator)
    {
        this._super(port, locator);
        return port;
    },
getPersistentAttributes: function()
    {
        var memento = this._super();

        // add all decorations to the memento
        //
        memento.labels = [];
        this.children.each(function(i,e){
            var labelJSON = e.figure.getPersistentAttributes();
            labelJSON.locator=e.locator.NAME;
            memento.labels.push(labelJSON);
        });

        return memento;
    },
setPersistentAttributes: function(memento)
    {
        this._super(memento);

        // remove all decorations created in the constructor of this element
        //
        this.resetChildren();

        // and add all children of the JSON document.
        //
        $.each(memento.labels, $.proxy(function(i,json){
            // create the figure stored in the JSON
            var figure =  eval("new "+json.type+"()");

            // apply all attributes
            figure.attr(json);

            // instantiate the locator
            var locator =  eval("new "+json.locator+"()");

            // add the new figure as child to this figure
            this.add(figure, locator);
        },this));
    },
    jsonDocument: [],

    translateToCppCodeImport: function(){
            let cCode = "";
            cCode = `#include <iostream>\n`;
            return cCode;
    },

    translateToCppCode: function(){
        cCode = "";
        this.getInputPort(0).getConnections().each(function(wireIndex, wireObj){
            let wireName = wireObj.getVariableName();
            /*
             *  TODO: Check if wire is enumeration should be redone more general to use some wire function or something else, but this checking datatype string is ok for now if
             *        generated code will keep name them starts with enumDatatype_...
             *        Also enum datatype could be different than int and here should be figuring what is it to make static_cast<T>() right.
             */
            if (wireObj.getSource().userData.datatype.startsWith("enumDatatype_")){
                /*
                 *  Enumeration is declared as enum type and they are not typed implictly, therefore to be printed to terminal they need to be casted to have some type for compiler.
                 *  If there is no cast then there is looooong error from compiler.
                 */
                cCode += `std::cout << static_cast<int>(${wireName}) << std::endl;\n`;
            }else{
                cCode += `std::cout << ${wireName} << std::endl;\n`;
            }
        });
        return cCode;
    },

});
