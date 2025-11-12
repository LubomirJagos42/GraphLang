draw2d.ui.SelectOptionInplaceEditor =  draw2d.ui.LabelInplaceEditor.extend({

    NAME: "draw2d.ui.SelectOptionInplaceEditor",

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

        //modified implementation
        let optionHtmlStr = "";
        console.log(`--> SelectOptionInplaceEditor fillin select options using internal array:`);
        console.log(this.optionArray);
        for (let k = 0; k < this.optionArray.length; k++){
            optionHtmlStr += `<option value="${this.optionArray[k].value}">${this.optionArray[k].name}</option>`;
        }
        console.log(`--> option string used for <select>`);
        console.log(optionHtmlStr);
        this.html = $('<select id="inplaceeditor">' +
            optionHtmlStr +
            '</select>>');
        this.html.val = function(){
            return this.find("option:selected").text();
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

    setOptions: function(optionArray){
        this.optionArray = optionArray;
    },

});
