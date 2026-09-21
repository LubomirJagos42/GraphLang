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

        this.selectionStartX = null;
        this.selectionStartY = null;
        this.selectionWidth = null;
        this.selectionHeight = null;
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

        //reset selection with, height they are used when creates while or for loop in particular selection mode
        this.selectionWidth = null;
        this.selectionHeight = null;
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

                //jailhouse selection is using selectionRectangle1 or 2 instead of boundingBoxFigure1
                //capture selection rectangle coordinates BEFORE nullifying them
                this.selectionStartX = this.selectionRectangle1.getX();
                this.selectionStartY = this.selectionRectangle1.getY();
                this.selectionWidth = this.selectionRectangle1.getWidth();
                this.selectionHeight = this.selectionRectangle1.getHeight();
                this.createLoopAroundSelectedObjects(canvas, x, y, shiftKey, ctrlKey);

                //this was originaly generated by AI to destroy rectangles when mouseUp
                this.selectionRectangle1.setCanvas(null);
                this.selectionRectangle1 = null;
                this.selectionRectangle2.setCanvas(null);
                this.selectionRectangle2 = null;
            }
            this.currentJailhouse = null;
            this.jailhouseStartX = 0;
            this.jailhouseStartY = 0;

            //ends selection inside jailhouse
            return;
        }

        //remember selection rectangle dimensions and start point for further postprocessing
        //when selection rectangle was created then remember its coordinates
        if (this.boundingBoxFigure1 !== null) {
            this.selectionStartX = this.boundingBoxFigure1.getX();
            this.selectionStartY = this.boundingBoxFigure1.getY();
            this.selectionWidth = this.boundingBoxFigure1.getWidth();
            this.selectionHeight = this.boundingBoxFigure1.getHeight();
        }

        this._super(canvas, x, y, shiftKey, ctrlKey);

        this.createLoopAroundSelectedObjects(canvas, x, y, shiftKey, ctrlKey);
    },

    /**
     * @description If selection is loop creation mode then create forloop or whileloop around selected nodes instead of their selection
     * @param canvas
     * @param x
     * @param y
     * @param shiftKey
     * @param ctrlKey
     *
     * TODO: Still IN DEVELOPMENT!
     */
    createLoopAroundSelectedObjects: function(canvas, x, y, shiftKey, ctrlKey){
        //loop mode is used ie. while of for loop is created around selected nodes
        if (
            GLOBAL_SELECTION_NODE_MODE && ['forloop', 'whilelayer', 'multilayered'].includes(GLOBAL_SELECTION_NODE_MODE) &&
            this.selectionWidth !== null && this.selectionHeight !== null
        ){
            console.log(`--> ${GLOBAL_SELECTION_NODE_MODE} will be created from selection!`);

            //selection was made on top of canvas so all selected nodes inside jailhouse must be excluded from newly create loop
            let selectionFigures = canvas.getSelection();
            if (this.currentJailhouse === null){
                /*
                 *  TODO: Exclude figures inside some jailhouse or something.
                 */
                let figureRefToRemove = [];
                selectionFigures.each(function(objIndex, objRef){
                    /*
                     *  .getParent() !== null -> this is to exclude some children figures like tunnels or so
                     *  .getComposite() !== null -> this is to exclude figures inside some loops
                     */
                    if (objRef.getParent() !== null || objRef.getComposite() !== null){
                        figureRefToRemove.push(objRef);
                    }
                });
                figureRefToRemove.forEach((objRef)=>{
                    selectionFigures.remove(objRef)
                });
            }

            loopClassName = null;
            if (GLOBAL_SELECTION_NODE_MODE === "forloop"){loopClassName = "GraphLang.Shapes.Basic.Loop2.ForLoop";}
            if (GLOBAL_SELECTION_NODE_MODE === "whilelayer"){loopClassName = "GraphLang.Shapes.Basic.Loop2.WhileLayer";}
            if (GLOBAL_SELECTION_NODE_MODE === "multilayered"){loopClassName = "GraphLang.Shapes.Basic.Loop2.Multilayered3";}

            let newLoopFigure = eval(`new ${loopClassName}()`);
            newLoopFigure.setWidth(this.selectionWidth);
            newLoopFigure.setHeight(this.selectionHeight);
            appCanvas.add(newLoopFigure, this.selectionStartX, this.selectionStartY);

            //add loop figure to jailhouse if selection is made inside one
            if (this.currentJailhouse !== null){
                this.currentJailhouse.assignFigure(newLoopFigure);
            }

            //additional things specific for multilayered case structure
            if (GLOBAL_SELECTION_NODE_MODE === "multilayered"){
                newLoopFigure.addLayer();
                newLoopFigure.switchActiveLayer();
                newLoopFigure = newLoopFigure.getActiveLayer(); //change fiugre to active layer of multilayered structure
            }

            //write to console names of figures which will be grouped into loop, this is for debugging during development
            let refCurrentJailhous = this.currentJailhouse;

            // Temporarily override parent's setBoundingBox to prevent auto-resize during assignment
            let parentOriginalSetBoundingBox = null;
            if (refCurrentJailhous !== null && refCurrentJailhous.setBoundingBox){
                parentOriginalSetBoundingBox = refCurrentJailhous.setBoundingBox;
                refCurrentJailhous.setBoundingBox = function(){};
            }

            selectionFigures.each(function(objIndex, objRef){
                console.log(`----> ${objRef.NAME}: ${objRef.getId()}`);

                newLoopFigure.assignFigure(objRef);

                if (refCurrentJailhous !== null){
                    refCurrentJailhous.unassignFigure(objRef);
                }
            });

            // Restore parent's original setBoundingBox method after assignment is complete
            if (refCurrentJailhous !== null && parentOriginalSetBoundingBox !== null){
                refCurrentJailhous.setBoundingBox = parentOriginalSetBoundingBox;
            }

            //detect tunnels if needed
            //snapshot: detectTunnels2 adds new HoverConnections to the canvas, so never iterate the live list
            let linesSnapshot = canvas.getLines().clone();
            linesSnapshot.each(function(connectionIndex, connectionRef){
                if (connectionRef.getCanvas() === null) return;   // wire was removed meanwhile
                GraphLang.Utils.detectTunnels2(canvas, connectionRef);
            });

            //return selection mode back to normal
            GraphLang.Utils.setSelectionMode();
        }
    }

});
