// Create a custom canvas-level selection policy that handles selection inside jailhouses
// This extends the canvas SelectionPolicy to intercept mouse events when inside jailhouses
draw2d.policy.canvas.JailhouseAwareSelectionPolicy = draw2d.policy.canvas.BoundingboxSelectionPolicy.extend({
    NAME: "draw2d.policy.canvas.JailhouseAwareSelectionPolicy",

    init: function() {
        this._super();
        this.currentJailhouse = null;
        this.selectionRectangle1 = null;
        this.selectionRectangle2 = null;
        this.jailhouseStartX = 0;
        this.jailhouseStartY = 0;
    },

    onMouseDown: function(canvas, x, y, shiftKey, ctrlKey) {
        var figure = canvas.getBestFigure(x, y);

        var jailhouse = null;
        var cur = figure;
        while (cur !== null) {
            if (cur.NAME === "draw2d.shape.composite.Jailhouse" ||
                cur.NAME === "GraphLang.Shapes.Basic.Jailhouse" ||
                cur.NAME === "GraphLang.Shapes.Basic.Loop2" ||
                cur.NAME === "GraphLang.Shapes.Basic.Loop2.ForLoop" ||
                cur.NAME === "GraphLang.Shapes.Basic.Loop2.WhileLayer") {
                jailhouse = cur;
                break;
            }
            cur = cur.getComposite ? cur.getComposite() : null;
        }

        var hitEmptyJailhouseBackground = jailhouse !== null && (figure === null || figure === jailhouse);

        if (hitEmptyJailhouseBackground) {
            this.currentJailhouse = jailhouse;
            this.jailhouseStartX = x;
            this.jailhouseStartY = y;

            if (!shiftKey) {
                canvas.getSelection().getAll().clone().each(function (i, f) {
                    f.unselect();
                });
                canvas.getSelection().clear();
            }
            return; // own this gesture, skip parent entirely
        }

        // real child figure, or click outside any jailhouse: let the parent handle it normally
        this.currentJailhouse = null;   // <-- the missing reset
        this._super(canvas, x, y, shiftKey, ctrlKey);
    },

    onMouseDrag: function(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey) {
        if (this.currentJailhouse !== null) {
            if (this.selectionRectangle1 === null) {
                this.selectionRectangle1 = new draw2d.shape.basic.Rectangle({
                    width: 1, height: 1, x: this.jailhouseStartX, y: this.jailhouseStartY,
                    bgColor: "#d4d1d4", alpha: 0.1
                });
                this.selectionRectangle1.setCanvas(canvas);

                this.selectionRectangle2 = new draw2d.shape.basic.Rectangle({
                    width: 1, height: 1, x: this.jailhouseStartX, y: this.jailhouseStartY,
                    dash: "--..", stroke: 0.5, color: "#37a8ff", bgColor: null
                });
                this.selectionRectangle2.setCanvas(canvas);
            }

            var abs = Math.abs;
            this.selectionRectangle1.setDimension(abs(dx), abs(dy));
            this.selectionRectangle1.setPosition(this.jailhouseStartX + Math.min(0, dx), this.jailhouseStartY + Math.min(0, dy));
            this.selectionRectangle2.setDimension(abs(dx), abs(dy));
            this.selectionRectangle2.setPosition(this.jailhouseStartX + Math.min(0, dx), this.jailhouseStartY + Math.min(0, dy));
            return; // still owning this gesture — don't call _super
        }

        this._super(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey);
    },

    onMouseUp: function(canvas, x, y, shiftKey, ctrlKey) {
        if (this.currentJailhouse !== null) {
            if (this.selectionRectangle1 !== null) {
                var selectionRect = this.selectionRectangle1.getBoundingBox();
                if (this.currentJailhouse.getAssignedFigures) {
                    this.currentJailhouse.getAssignedFigures().each(function (i, fig) {
                        if (fig.isSelectable() && selectionRect.contains(fig.getBoundingBox())) {
                            if (!canvas.getSelection().contains(fig)) {
                                fig.select(shiftKey === false);
                                if (shiftKey === false) canvas.getSelection().setPrimary(fig);
                            }
                        }
                    });
                }
                canvas.fireEvent("select", {
                    figure: canvas.getSelection().getPrimary(),
                    selection: canvas.getSelection()
                });
                this.selectionRectangle1.setCanvas(null);
                this.selectionRectangle1 = null;
                this.selectionRectangle2.setCanvas(null);
                this.selectionRectangle2 = null;
            }
            this.currentJailhouse = null;
            this.jailhouseStartX = 0;
            this.jailhouseStartY = 0;
            return;
        }

        this._super(canvas, x, y, shiftKey, ctrlKey);
    }

});
