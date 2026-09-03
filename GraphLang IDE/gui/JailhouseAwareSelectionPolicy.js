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

    /**
     * @method
     * Override onMouseDown to detect if we're inside a jailhouse
     */
    onMouseDown: function(canvas, x, y, shiftKey, ctrlKey) {
        // First call the parent implementation
        this._super(canvas, x, y, shiftKey, ctrlKey);

        // Check if we clicked inside a jailhouse
        var figure = canvas.getBestFigure(x, y);
        
        // Navigate up the composite hierarchy to find if we're inside a jailhouse
        this.currentJailhouse = null;
        var currentFigure = figure;
        
        while (currentFigure !== null) {
            if (currentFigure.NAME === "draw2d.shape.composite.Jailhouse" || 
                currentFigure.NAME === "GraphLang.Shapes.Basic.Jailhouse") {
                this.currentJailhouse = currentFigure;
                break;
            }
            // Check if the figure has a composite parent
            if (currentFigure.getComposite) {
                currentFigure = currentFigure.getComposite();
            } else {
                break;
            }
        }

        // If we clicked on empty space inside a jailhouse, prepare for jailhouse-specific selection
        if (this.currentJailhouse !== null && (figure === null || figure === this.currentJailhouse)) {
            this.jailhouseStartX = x;
            this.jailhouseStartY = y;
        }
    },

    /**
     * @method
     * Override onMouseDrag to handle jailhouse-specific selection rectangle
     */
    onMouseDrag: function(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey) {
        // First call the parent implementation
        this._super(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey);

        // If we're inside a jailhouse and the parent didn't create a selection rectangle,
        // create our own jailhouse-specific selection rectangle
        if (this.currentJailhouse !== null && this.boundingBoxFigure1 === null) {
            if (this.selectionRectangle1 === null) {
                // Create the two rectangles for the selection box (like BoundingboxSelectionPolicy)
                this.selectionRectangle1 = new draw2d.shape.basic.Rectangle({
                    width: 1,
                    height: 1,
                    x: this.jailhouseStartX,
                    y: this.jailhouseStartY,
                    bgColor: "#d4d1d4",
                    alpha: 0.1
                });
                this.selectionRectangle1.setCanvas(canvas);

                this.selectionRectangle2 = new draw2d.shape.basic.Rectangle({
                    width: 1,
                    height: 1,
                    x: this.jailhouseStartX,
                    y: this.jailhouseStartY,
                    dash: "--..",
                    stroke: 0.5,
                    color: "#37a8ff",
                    bgColor: null
                });
                this.selectionRectangle2.setCanvas(canvas);
            }

            // Update the rectangle dimensions
            var abs = Math.abs;
            if (this.selectionRectangle1 !== null) {
                this.selectionRectangle1.setDimension(abs(dx), abs(dy));
                this.selectionRectangle1.setPosition(this.jailhouseStartX + Math.min(0, dx), this.jailhouseStartY + Math.min(0, dy));
                this.selectionRectangle2.setDimension(abs(dx), abs(dy));
                this.selectionRectangle2.setPosition(this.jailhouseStartX + Math.min(0, dx), this.jailhouseStartY + Math.min(0, dy));
            }
        }
    },

    /**
     * @method
     * Override onMouseUp to handle jailhouse-specific selection
     */
    onMouseUp: function(canvas, x, y, shiftKey, ctrlKey) {
        // First call the parent implementation
        this._super(canvas, x, y, shiftKey, ctrlKey);

        // If we have a jailhouse-specific selection rectangle, select figures inside the jailhouse
        if (this.selectionRectangle1 !== null && this.currentJailhouse !== null) {
            var selectionRect = this.selectionRectangle1.getBoundingBox();
            
            // Select only figures that are assigned to this jailhouse
            if (this.currentJailhouse.getAssignedFigures) {
                this.currentJailhouse.getAssignedFigures().each(function(i, fig) {
                    if (fig.isSelectable() && selectionRect.contains(fig.getBoundingBox())) {
                        if (!canvas.getSelection().contains(fig)) {
                            fig.select(shiftKey === false); // Make primary if shift not pressed
                            if (shiftKey === false) {
                                canvas.getSelection().setPrimary(fig);
                            }
                        }
                    }
                });
            }

            // Inform listeners about the selection
            canvas.fireEvent("select", { 
                figure: canvas.getSelection().getPrimary(), 
                selection: canvas.getSelection() 
            });

            // Remove the selection rectangles
            this.selectionRectangle1.setCanvas(null);
            this.selectionRectangle1 = null;
            this.selectionRectangle2.setCanvas(null);
            this.selectionRectangle2 = null;
        }

        // Reset state
        this.currentJailhouse = null;
        this.jailhouseStartX = 0;
        this.jailhouseStartY = 0;
    }
});
