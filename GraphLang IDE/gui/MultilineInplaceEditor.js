draw2d.ui.MultilineInplaceEditor =  draw2d.ui.LabelInplaceEditor.extend({

    NAME: "draw2d.ui.MultilineInplaceEditor",

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

        // append the input field to the document and register
        // the ENTER and ESC key to commit /cancel the operation
        //
        // this.html = $('<textarea width="300px" height="220px" id="inplaceeditor">');
        // this.html.val(label.getText());
        // this.html.hide();

        //modified implementation
        this.html = $('<div contenteditable="true" id="inplaceeditor" style="background-color: #FFFFFF;white-space: pre-line;display: block;">');
        // this.html.html(label.getText().replaceAll("\n", '<br />'));
        this.html.html(label.getText());

        //this function is used in parent class to obtain text value, but not working with editable div or textare (with textarea there is more problems) therefore here
        //is it overloaded to make it running
        this.html.val = function(){
            // let innerText = this.text();                         //this returns just div content without newlines
            // innerText = innerText.replaceAll("\n", '<br />');    //this is not running as newlines are not returned in text

            let innerText = this.html().replace(/<div>/gi,"\n").replace(/<\/div>/gi,'');

            return innerText;
        }

        $("body").append(this.html);

        this.html.autoResize({animate:false});

        // //original implementation from editor
        // this.html.bind("keyup",$.proxy(function(e){
        //     switch (e.which) {
        //         case 13:
        //             this.commit();
        //             break;
        //         case 27:
        //             this.cancel();
        //             break;
        //     }
        // },this));

        //modified implementation to use CTRL+Enter for commit
        _editorObj = this;
        this.keydownList = {};
        let _keydownList = this.keydownList;
        $(document).keydown(function(e) {
            _keydownList[e.keyCode] = true;
            if (e.ctrlKey) _keydownList["ctrl"] = true;

            if (_keydownList[13] && _keydownList["ctrl"]) {
                _editorObj.commit();
            }
        }).keyup(function(e) {
            _keydownList[e.keyCode] = false;
            if (!e.ctrlKey) _keydownList["ctrl"] = false;

            if (e.keyCode == 27) _editorObj.cancel();
        });



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

});
