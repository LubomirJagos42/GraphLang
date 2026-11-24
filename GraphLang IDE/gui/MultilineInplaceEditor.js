/**
 * @class
 * @augments draw2d.ui.LabelInplaceEditor
 * @memberOf draw2d.ui
 * @description Extend draw2d single line edit to create multiple line code editor using textarea.
 *
 *  Previous implementation used <div contenteditable> which caused newline problems: browser inserts <div>, <br>, &nbsp;
 *  into html, label text was put back as html so "<" in code was interpreted as tag and newlines got lost or doubled.
 *  Also canvas keyboard policy ignores just INPUT and TEXTAREA so BACKSPACE/DELETE inside div deleted selected node.
 *  Textarea returns plain text with "\n" by .val() so nothing must be converted.
 *
 *  Keys:
 *      CTRL+ENTER  commit
 *      ESC         cancel
 *      TAB         insert 4 spaces (python indentation), SHIFT+TAB removes up to 4 leading spaces
 *      ENTER       new line, indentation of previous line is kept
 */
draw2d.ui.MultilineInplaceEditor =  draw2d.ui.LabelInplaceEditor.extend({

    NAME: "draw2d.ui.MultilineInplaceEditor",

    INDENT: "    ",

    /**
     * @method
     * @memberOf draw2d.ui.MultilineInplaceEditor
     * @description Trigger the edit of the label text.
     * @param {draw2d.shape.basic.Label} label the label to edit
     */
    start: function( label)
    {
        this.label = label;

        this.commitCallback = $.proxy(this.commit,this);

        // commit the editor if the user clicks anywhere in the document
        //
        $("body").bind("click",this.commitCallback);

        let text = (typeof label.getCodeText === "function") ? label.getCodeText() : label.getText();
        if (text === undefined || text === null) text = "";

        this.html = $('<textarea id="inplaceeditor" spellcheck="false" wrap="off"></textarea>');
        this.html.css({
            "background-color": "#FFFFFF",
            "font-family": "Consolas, 'Courier New', monospace",
            "font-size": "12px",
            "line-height": "16px",
            "white-space": "pre",
            "overflow": "auto",
            "resize": "both",
            "tab-size": 4,
            "box-sizing": "border-box",
            "padding": "4px",
            "z-index": 10000
        });
        this.html.val(String(text).replace(/\r\n?/g, "\n"));
        this.html.hide();

        $("body").append(this.html);

        let editorObj = this;
        this.html.bind("keydown", function(e){
            //keys handled here must not go to canvas or document
            e.stopPropagation();

            if (e.keyCode === 13 && (e.ctrlKey || e.metaKey)){
                e.preventDefault();
                editorObj.commit();
                return;
            }
            if (e.keyCode === 27){
                e.preventDefault();
                editorObj.cancel();
                return;
            }
            if (e.keyCode === 9){
                e.preventDefault();
                editorObj.indentSelection(e.shiftKey);
                return;
            }
            if (e.keyCode === 13){
                e.preventDefault();
                editorObj.insertNewlineKeepIndent();
                return;
            }
        });
        this.html.bind("keyup keypress", function(e){ e.stopPropagation(); });
        this.html.bind("input", function(){ editorObj.resizeToContent(); });

        this.html.bind("blur",this.commitCallback);

        // avoid commit of the operation if we click inside the editor
        //
        this.html.bind("click",function(e){
            e.stopPropagation();
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

        this.minWidth = Math.max(200, bb.w*(1/canvas.getZoom()));
        this.minHeight = Math.max(60, bb.h*(1/canvas.getZoom()));
        this.html.css({position:"absolute", "top": bb.y, "left": bb.x});
        this.resizeToContent();

        this.html.fadeIn($.proxy(function(){
            this.html.focus();
            this.listener.onStart();
        },this));
    },

    /**
     * @method
     * @description Editor size follows text, number of lines and longest line.
     */
    resizeToContent: function(){
        if (!this.html) return;
        let lines = this.html.val().split("\n");
        let longestLine = lines.reduce((maxLen, line) => Math.max(maxLen, line.length), 0);
        let width = Math.min(1000, Math.max(this.minWidth, longestLine * 7.3 + 30));
        let height = Math.min(700, Math.max(this.minHeight, lines.length * 16 + 26));
        this.html.css({"width": width, "height": height});
    },

    /**
     * @method
     * @description Replace selected range in textarea and set cursor.
     */
    replaceRange: function(start, end, newText, newSelectionStart, newSelectionEnd){
        let el = this.html[0];
        let value = el.value;
        el.value = value.substring(0, start) + newText + value.substring(end);
        el.selectionStart = newSelectionStart;
        el.selectionEnd = newSelectionEnd;
        this.resizeToContent();
    },

    /**
     * @method
     * @description ENTER inserts newline and copies indentation of current line.
     */
    insertNewlineKeepIndent: function(){
        let el = this.html[0];
        let value = el.value;
        let start = el.selectionStart, end = el.selectionEnd;
        let lineStart = value.lastIndexOf("\n", start - 1) + 1;
        let indent = value.substring(lineStart, start).match(/^[ \t]*/)[0];
        let insertText = "\n" + indent;
        let cursor = start + insertText.length;
        this.replaceRange(start, end, insertText, cursor, cursor);
    },

    /**
     * @method
     * @description TAB indent, SHIFT+TAB unindent, works also for multiple selected lines.
     * @param {boolean} unindent
     */
    indentSelection: function(unindent){
        let el = this.html[0];
        let value = el.value;
        let start = el.selectionStart, end = el.selectionEnd;
        let INDENT = this.INDENT;

        if (!unindent && start === end){
            this.replaceRange(start, end, INDENT, start + INDENT.length, start + INDENT.length);
            return;
        }

        let blockStart = value.lastIndexOf("\n", start - 1) + 1;
        let blockEnd = (end > start && value.charAt(end - 1) === "\n") ? end - 1 : end;
        let nextNewline = value.indexOf("\n", blockEnd);
        if (nextNewline === -1) nextNewline = value.length;

        let block = value.substring(blockStart, nextNewline);
        let lines = block.split("\n");
        let firstLineDelta = 0;
        let totalDelta = 0;
        lines = lines.map(function(line, lineIndex){
            let delta = 0;
            if (unindent){
                let removeCnt = line.match(/^ {0,4}/)[0].length;
                if (removeCnt === 0 && line.startsWith("\t")) removeCnt = 1;
                line = line.substring(removeCnt);
                delta = -removeCnt;
            }else{
                line = INDENT + line;
                delta = INDENT.length;
            }
            if (lineIndex === 0) firstLineDelta = delta;
            totalDelta += delta;
            return line;
        });

        let newBlock = lines.join("\n");
        let newStart = Math.max(blockStart, start + firstLineDelta);
        let newEnd = (start === end) ? newStart : Math.max(newStart, end + totalDelta);
        this.replaceRange(blockStart, nextNewline, newBlock, newStart, newEnd);
    },

});
