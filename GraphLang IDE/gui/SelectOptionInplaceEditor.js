draw2d.ui.SelectOptionInplaceEditor =  draw2d.ui.LabelInplaceEditor.extend({

    NAME: "draw2d.ui.SelectOptionInplaceEditor",

    sourceFigureId: null,
    optionArray: [
        // {value: "0", name: "item a"},    //example of expected array item
    ],

    /**
     * @method
     * Trigger the edit of the label text.
     *
     * @param {draw2d.shape.basic.Label} label the label to edit
     */
    start: function( label)
    {
        this.label = label;

        this.commitCallback = $.proxy(this.commit,this);

        // commit the editor if the user clicks anywhere in the document
        //
        $("body").bind("click",this.commitCallback);

        //if sourceFigureId is set then add values from it
        if (label.userData && label.userData.sourceFigureId){
            let sourceFigureId = label.userData.sourceFigureId;

            //search for enum object in whole project
            let enumSerializedObj = GraphLang.Utils.getObjectInProjectFromJSONById(sourceFigureId);
            let sourceEnumFigure = eval(`new ${enumSerializedObj.type}()`);
            sourceEnumFigure.setPersistentAttributes(enumSerializedObj);

            let optionArray = sourceEnumFigure.getOptionArray();
            this.setOptions(optionArray)
        }

        //if edited label has userData.optionEditorValues set append values from it
        if (label.userData && label.userData.optionEditorValues) {
            if (label.userData.sourceFigureId){
                this.appendOptions(label.userData.optionEditorValues);
            }else{
                this.setOptions(label.userData.optionEditorValues);
            }
        }

        //modified implementation
        let optionHtmlStr = "";
        for (let k = 0; k < this.optionArray.length; k++){
            let optionValue = this.optionArray[k].value;
            let optionName = this.optionArray[k].name;
            if (optionName === undefined || optionName === "") optionName = optionValue;   //use key as display name if name not defined

            optionHtmlStr += `<option value="${optionValue}">${optionName}</option>`;
        }
        this.html = $('<select id="inplaceeditor">' +
            optionHtmlStr +
            '</select>>');
        this.html.val = function(){
            let selectedValue = this.find("option:selected").text();
            selectedValue = selectedValue !== "" ? selectedValue : "null";
            return selectedValue;
        }

        $("body").append(this.html);

        this.html.autoResize({animate:false});

        //original implementation from editor
        this.html.bind("keyup",$.proxy(function(e){
            switch (e.which) {
                case 13:
                    this.commit();
                    break;
                case 27:
                    this.cancel();
                    break;
            }
        },this));

        this.html.bind("blur",this.commitCallback);

        // avoid commit of the operation if we click inside the editor
        //
        this.html.bind("click",function(e){
            e.stopPropagation();
            e.preventDefault();
        });

        // Position the INPUT and init the autoresize of the element
        //
        var canvas = this.label.getCanvas();
        var bb = this.label.getBoundingBox();

        bb.setPosition(canvas.fromCanvasToDocumentCoordinate(bb.x,bb.y));

        // remove the scroll from the body if we add the canvas directly into the body
        var scrollDiv = canvas.getScrollArea();
        if(scrollDiv.is($("body"))){
            bb.translate(canvas.getScrollLeft(), canvas.getScrollTop());
        }

        bb.translate(-1,-1);
        bb.resize(2,2);

        this.html.css({position:"absolute","top": bb.y, "left":bb.x, "min-width":bb.w*(1/canvas.getZoom()), "height":Math.max(25,bb.h*(1/canvas.getZoom()))});
        this.html.fadeIn($.proxy(function(){
            this.html.focus();
        },this));
    },

    //set option values expected input array in form: [{value: "value_1", name: "name_1"}, {value: "value_2", name: "name_2"}, ...]
    setOptions: function(optionArray){
        this.optionArray = optionArray;
    },
    appendOptions: function(optionArray){
        this.optionArray.push(...optionArray);  //operator ... must be used to unpack array
    },

    setSourceFigureId: function(figureId){
        this.sourceFigureId = figureId;
    }

});
