/**
 *  @class GraphLang.Shapes.Basic.Loop.Multilayered
 *  @author Lubomir Jagos
 *  @description Base class for multilayered structures, they are also loops, but there
 *  are many loops hidden inside, and they share common boundary which is just one.
 *  So Inside should be multiple sheetes without boundaries than there wouldn't be
 *  detected tunnels on their borders and just one tunnels for common loop would be
 *  generated.
 */
GraphLang.policy = GraphLang.policy || {};
GraphLang.policy.figure = GraphLang.policy.figure || {};

GraphLang.policy.figure.MultilayeredResizeHandle = draw2d.ResizeHandle.extend({
    NAME: "GraphLang.policy.figure.MultilayeredResizeHandle",
    HANDLE_SIZE: 8,

    init: function (figure, type) {
        this._super(figure, type);
        this.owner = figure;
        this.type = type;
        this._multilayerSuspendFireEvent = null;
        this._multilayerSuspendEnabled = false;
        this.setDimension(this.HANDLE_SIZE, this.HANDLE_SIZE);
        this.setSelectable(false);
        this.setDraggable(true);
    },

    // ignore any attempt to size the handle to something else
    setDimension: function (w, h) {
        return this._super(this.HANDLE_SIZE, this.HANDLE_SIZE);
    },

    _suspendOwnerEvents: function () {
        if (!this.owner || this._multilayerSuspendEnabled) return;

        this._multilayerOwnerEventSubscriptions = {};
        if (this.owner.eventSubscriptions) {
            for (var eventName in this.owner.eventSubscriptions) {
                this._multilayerOwnerEventSubscriptions[eventName] = this.owner.eventSubscriptions[eventName].slice(0);
                this.owner.eventSubscriptions[eventName] = [];
            }
        }

        if (this.owner.fireEvent) {
            this._multilayerSuspendFireEvent = this.owner.fireEvent;
            this.owner.fireEvent = function () { return; };
        }
        this._multilayerSuspendEnabled = true;
    },

    _restoreOwnerEvents: function () {
        if (!this.owner || !this._multilayerSuspendEnabled) return;

        if (this.owner.eventSubscriptions && this._multilayerOwnerEventSubscriptions) {
            for (var eventName in this._multilayerOwnerEventSubscriptions) {
                this.owner.eventSubscriptions[eventName] = this._multilayerOwnerEventSubscriptions[eventName].slice(0);
            }
            this._multilayerOwnerEventSubscriptions = null;
        }

        if (this._multilayerSuspendFireEvent) {
            this.owner.fireEvent = this._multilayerSuspendFireEvent;
        }
        this._multilayerSuspendFireEvent = null;
        this._multilayerSuspendEnabled = false;
    },

    _getAssignedFigureBounds: function () {
        var owner = this.owner;
        if (!owner || !owner.getAllLayers) return null;

        var layerIds = {};
        owner.getAllLayers().each(function (i, layer) { layerIds[layer.getId()] = true; });

        var bounds = null;
        owner.getAllLayers().each(function (li, layer) {
            layer.getAssignedFigures().each(function (i, figure) {
                // skip layers (Jailhouse), wires and anything that is not a node
                if (!figure) return;
                if (layerIds[figure.getId()]) return;
                if (figure.NAME && figure.NAME.indexOf("Jailhouse") > -1) return;
                if (figure instanceof draw2d.Connection) return;
                if (figure instanceof draw2d.Port) return;
                if (figure instanceof draw2d.ResizeHandle) return;
                if (figure.NAME && figure.NAME.indexOf("ResizeHandle") > -1) return;
                if (figure.userData && figure.userData.owner === owner.getId()) return;

                var box = figure.getBoundingBox();
                if (!box) return;

                if (!bounds) {
                    bounds = { minX: box.x, minY: box.y, maxX: box.x + box.w, maxY: box.y + box.h };
                } else {
                    bounds.minX = Math.min(bounds.minX, box.x);
                    bounds.minY = Math.min(bounds.minY, box.y);
                    bounds.maxX = Math.max(bounds.maxX, box.x + box.w);
                    bounds.maxY = Math.max(bounds.maxY, box.y + box.h);
                }

            });
        });

        //TODO: Just for debugging, remove later
        console.log("bounds:", bounds);

        return bounds;
    },

    _applyMinBoundsClamp: function () {
        var owner = this.owner;
        if (!owner || !owner.getAssignedFigures) return;

        var content = this._getAssignedFigureBounds();
        if (!content) return;

        var padding = 20;
        var minWidth = Math.max(32, (content.maxX - content.minX) + padding * 2);
        var minHeight = Math.max(32, (content.maxY - content.minY) + padding * 2);

        if (owner.getWidth() < minWidth) {
            owner.setDimension(minWidth, owner.getHeight());
        }
        if (owner.getHeight() < minHeight) {
            owner.setDimension(owner.getWidth(), minHeight);
        }
    },

    onDragStart: function (x, y, shiftKey, ctrlKey) {
        this.toFront();
        this._suspendOwnerEvents();
        this._multilayerResizeStart = {
            absX: this.owner.getAbsoluteX ? this.owner.getAbsoluteX() : this.owner.getX(),
            absY: this.owner.getAbsoluteY ? this.owner.getAbsoluteY() : this.owner.getY(),
            w: this.owner.getWidth(),
            h: this.owner.getHeight()
        };
        this._multilayerHandleStartX = this.getAbsoluteX();
        this._multilayerHandleStartY = this.getAbsoluteY();
        this._rawX = this._multilayerHandleStartX;   // unclamped handle position
        this._rawY = this._multilayerHandleStartY;
        this.ox = this._rawX;
        this.oy = this._rawY;
        this.commandMove = this.owner.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE));
        this.commandResize = this.owner.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.RESIZE));

        this._contentBounds = this._getAssignedFigureBounds();   // measured once, before the handle can be dropped into a layer
        return true;
    },

    _applyFinalResizeFromHandle: function () {
        var owner = this.owner;
        if (!owner || !this._multilayerResizeStart) return;

        var start = this._multilayerResizeStart;
        var finalX = this.getAbsoluteX();
        var finalY = this.getAbsoluteY();
        var startOwnerX = start.absX;
        var startOwnerY = start.absY;
        var startWidth = start.w;
        var startHeight = start.h;

        var newWidth = null;
        var newHeight = null;
        var newPosX = null;
        var newPosY = null;

        switch (this.type) {
            case 1:
                newWidth = startWidth - (finalX - startOwnerX);
                newHeight = startHeight - (finalY - startOwnerY);
                newPosX = startOwnerX + (startWidth - newWidth);
                newPosY = startOwnerY + (startHeight - newHeight);
                break;
            case 2:
                newWidth = startWidth;
                newHeight = startHeight - (finalY - startOwnerY);
                newPosX = startOwnerX;
                newPosY = startOwnerY + (startHeight - newHeight);
                break;
            case 3:
                newWidth = startWidth + (finalX - (startOwnerX + startWidth));
                newHeight = startHeight - (finalY - startOwnerY);
                newPosX = startOwnerX;
                newPosY = startOwnerY + (startHeight - newHeight);
                break;
            case 4:
                newWidth = startWidth + (finalX - (startOwnerX + startWidth));
                newHeight = startHeight;
                newPosX = startOwnerX;
                newPosY = startOwnerY;
                break;
            case 5:
                newWidth = startWidth + (finalX - (startOwnerX + startWidth));
                newHeight = startHeight + (finalY - (startOwnerY + startHeight));
                newPosX = startOwnerX;
                newPosY = startOwnerY;
                break;
            case 6:
                newWidth = startWidth;
                newHeight = startHeight + (finalY - (startOwnerY + startHeight));
                newPosX = startOwnerX;
                newPosY = startOwnerY;
                break;
            case 7:
                newWidth = startWidth - (finalX - startOwnerX);
                newHeight = startHeight + (finalY - (startOwnerY + startHeight));
                newPosX = startOwnerX + (startWidth - newWidth);
                newPosY = startOwnerY;
                break;
            case 8:
                newWidth = startWidth - (finalX - startOwnerX);
                newHeight = startHeight;
                newPosX = startOwnerX + (startWidth - newWidth);
                newPosY = startOwnerY;
                break;
        }

        if (newWidth !== null && newHeight !== null) {
            var minPadding = 20;
            var assigned = this._getAssignedFigureBounds();
            if (assigned) {
                var minWidth = Math.max(32, (assigned.maxX - assigned.minX) + minPadding * 2);
                var minHeight = Math.max(32, (assigned.maxY - assigned.minY) + minPadding * 2);
                newWidth = Math.max(newWidth, minWidth);
                newHeight = Math.max(newHeight, minHeight);
            }

            owner.setDimension(newWidth, newHeight);
            if (newPosX !== null && newPosY !== null) {
                owner.setPosition(newPosX, newPosY);
            }
        }

        this._multilayerResizeStart = null;
    },

    onDrag: function (dx, dy, dx2, dy2) {

        //TODO: Just for debugging, remove later
        // this.owner.getAllLayers().each(function (i, l) {
        //     l.getAssignedFigures().each(function (j, f) { console.log("assigned:", f.NAME); });
        // });

        if (this.isDraggable() === false) return;
        this._rawX += (typeof dx2 !== "undefined") ? dx2 : dx;
        this._rawY += (typeof dy2 !== "undefined") ? dy2 : dy;

        // 1) put the handle where the mouse is, so the bounds are computed from the raw position
        this.setPosition(this._rawX, this._rawY);

        // 2) compute the clamped bounds and snap the handle to the clamped edge
        var r = this._computeFinalBounds();
        if (!r) return;

        var S = this.HANDLE_SIZE;
        var t = this.type;
        var left   = (t === 1 || t === 7 || t === 8);
        var right  = (t === 3 || t === 4 || t === 5);
        var top    = (t === 1 || t === 2 || t === 3);
        var bottom = (t === 5 || t === 6 || t === 7);

        var hx = left ? r.x - S : (right ? r.x + r.w : this._multilayerHandleStartX);
        var hy = top  ? r.y - S : (bottom ? r.y + r.h : this._multilayerHandleStartY);
        this.setPosition(hx, hy);
    },

    _computeFinalBounds: function () {
        var s = this._multilayerResizeStart;
        if (!s) return null;

        var dx = this.getAbsoluteX() - this._multilayerHandleStartX;
        var dy = this.getAbsoluteY() - this._multilayerHandleStartY;

        var left   = (this.type === 1 || this.type === 7 || this.type === 8);
        var right  = (this.type === 3 || this.type === 4 || this.type === 5);
        var top    = (this.type === 1 || this.type === 2 || this.type === 3);
        var bottom = (this.type === 5 || this.type === 6 || this.type === 7);

        var x = s.absX, y = s.absY, w = s.w, h = s.h;
        if (left)   { x += dx; w -= dx; }
        if (right)  { w += dx; }
        if (top)    { y += dy; h -= dy; }
        if (bottom) { h += dy; }

        var pad = 20, MIN_W = 100, MIN_H = 50;
        var c = this._contentBounds;          // null when there are no nodes
        var right0 = s.absX + s.w, bottom0 = s.absY + s.h;

        if (left) {
            if (c) x = Math.min(x, c.minX - pad);
            x = Math.min(x, right0 - MIN_W);
            w = right0 - x;
        }
        if (right) {
            if (c) w = Math.max(w, c.maxX + pad - x);
            w = Math.max(w, MIN_W);
        }
        if (top) {
            if (c) y = Math.min(y, c.minY - pad);
            y = Math.min(y, bottom0 - MIN_H);
            h = bottom0 - y;
        }
        if (bottom) {
            if (c) h = Math.max(h, c.maxY + pad - y);
            h = Math.max(h, MIN_H);
        }

        return { x: x, y: y, w: w, h: h };
    },

    onDragEnd: function (x, y, shiftKey, ctrlKey) {
        if (!this.isDraggable()) return;

        var owner = this.owner;
        var r = this._computeFinalBounds();
        
        //TODO: Just for debugging, remove later
        console.log("1 computed r:", r, "owner before:", owner.getX(), owner.getY(), owner.getWidth(), owner.getHeight());

        this._restoreOwnerEvents();

        var USE_COMMANDS = false;   // flip to true to compare

        if (r && USE_COMMANDS && this.commandMove && this.commandResize) {
            this.commandMove.setPosition(r.x, r.y);
            this.commandResize.setDimension(r.w, r.h);
            var stack = this.canvas.getCommandStack();
            stack.execute(this.commandMove);
            console.log("2 after move cmd:", owner.getX(), owner.getY(), owner.getWidth(), owner.getHeight());
            stack.execute(this.commandResize);
            console.log("3 after resize cmd:", owner.getX(), owner.getY(), owner.getWidth(), owner.getHeight());
        } else if (r) {

            //////////////original way
            // remember node positions, because moving the owner moves assigned layers and their nodes with it
            var nodes = [];
            owner.getAllLayers().each(function (i, layer) {
                layer.getAssignedFigures().each(function (j, f) {
                    nodes.push({ f: f, x: f.getX(), y: f.getY() });
                });
            });

            // 1) temporarily allow resize on the internal layers for this explicit parent resize
            owner._allowLayerResize(function () {
                owner.getAllLayers().each(function (i, layer) {
                    var layerX = r.x + 2;
                    var layerY = r.y + 2;
                    var layerW = Math.max(0, r.w - 4);
                    var layerH = Math.max(0, r.h - 4);

                    layer.setPosition(layerX, layerY);
                    layer.setDimension(layerW, layerH);
                });
            });

            // 2) now the owner is free to shrink
            owner.setDimension(r.w, r.h);
            owner.setPosition(r.x, r.y);

            // 3) apply the layer frame to the actual final owner bounds, then re-lock the auto-resize guard
            owner._allowLayerResize(function () {
                owner.getAllLayers().each(function (i, layer) {
                    layer.setPosition(owner.getX() + 2, owner.getY() + 2);
                    layer.setDimension(Math.max(0, owner.getWidth() - 4), Math.max(0, owner.getHeight() - 4));
                });
            });

            // 4) keep the layer frame aligned with the owner state after resizing
            owner.moveActiveLayer();

            // 5) nodes must stay where they were, only the border moves
            nodes.forEach(function (n) { n.f.setPosition(n.x, n.y); });

            //TODO: Just for debugging, remove later
            console.log("2 after direct set:", owner.getX(), owner.getY(), owner.getWidth(), owner.getHeight());
        }

        this.commandMove = null;
        this.commandResize = null;
        this._multilayerResizeStart = null;
        this._contentBounds = null;

        var canvas = this.canvas;
        if (owner.editPolicy) {
            owner.editPolicy.each(function (i, p) { if (p.moved) p.moved(canvas, owner); });
        }

        // after the selection policy's own onMouseUp has run
        setTimeout(function () {
            console.log("4 later:", owner.getX(), owner.getY(), owner.getWidth(), owner.getHeight());
        }, 0);
    },
});

GraphLang.policy.figure.MultilayeredResizeSelectionFeedbackPolicy = draw2d.policy.figure.ResizeSelectionFeedbackPolicy.extend({
    NAME: "GraphLang.policy.figure.MultilayeredResizeSelectionFeedbackPolicy",

    init: function (attr, setter, getter) {
        this._super(attr, setter, getter);
    },

    onSelect: function (canvas, figure, isPrimarySelection) {
        console.log("onSelect", figure && figure.NAME);

        if (!figure) return;
        if (!figure.selectionHandles) {
            figure.selectionHandles = new draw2d.util.ArrayList();
        }

        if (figure.selectionHandles.isEmpty()) {
            [1, 3, 5, 7, 4, 8].forEach(function (type) {
                var handle = new GraphLang.policy.figure.MultilayeredResizeHandle(figure, type);
                handle.setDimension(8, 8);
                figure.selectionHandles.add(handle);
                handle.show(canvas);
                handle.show(canvas);
                handle.toFront();
            });

            if (figure.isResizeable && figure.isResizeable() === false) {
                figure.selectionHandles.each(function (i, handle) {
                    handle.setBackgroundColor(null);
                    handle.setDraggable(false);
                });
            }
        }
        this.moved(canvas, figure);
    },

    moved: function (canvas, figure) {
        if (!figure || figure.selectionHandles.isEmpty()) return;

        var objHeight = figure.getHeight();
        var objWidth = figure.getWidth();
        var xPos = figure.getAbsoluteX ? figure.getAbsoluteX() : figure.getX();
        var yPos = figure.getAbsoluteY ? figure.getAbsoluteY() : figure.getY();

        var handleMap = {
            1: figure.selectionHandles.find(function (handle) { return handle && handle.type === 1; }),
            3: figure.selectionHandles.find(function (handle) { return handle && handle.type === 3; }),
            5: figure.selectionHandles.find(function (handle) { return handle && handle.type === 5; }),
            7: figure.selectionHandles.find(function (handle) { return handle && handle.type === 7; }),
            4: figure.selectionHandles.find(function (handle) { return handle && handle.type === 4; }),
            8: figure.selectionHandles.find(function (handle) { return handle && handle.type === 8; })
        };

        if (handleMap[1]) handleMap[1].setPosition(xPos - handleMap[1].getWidth(), yPos - handleMap[1].getHeight());
        if (handleMap[3]) handleMap[3].setPosition(xPos + objWidth, yPos - handleMap[3].getHeight());
        if (handleMap[5]) handleMap[5].setPosition(xPos + objWidth, yPos + objHeight);
        if (handleMap[7]) handleMap[7].setPosition(xPos - handleMap[7].getWidth(), yPos + objHeight);
        if (handleMap[4]) handleMap[4].setPosition(xPos + objWidth, yPos + (objHeight / 2) - (handleMap[4].getHeight() / 2));
        if (handleMap[8]) handleMap[8].setPosition(xPos - handleMap[8].getWidth(), yPos + (objHeight / 2) - (handleMap[8].getHeight() / 2));
    }
});

GraphLang.Shapes.Basic.Loop2.Multilayered3_enhanced = GraphLang.Shapes.Basic.Loop2.Multilayered3.extend({
    NAME: "GraphLang.Shapes.Basic.Loop2.Multilayered3_enhanced",

    init: function (attr, setter, getter) {
        this._super($.extend({}, attr), setter, getter);

        this._lockLayerAutoResize = function () {
            if (!this.layers) return;
            this.layers.each(function (idx, layer) {
                if (!layer) return;
                var originalSetDimension = layer._multilayerOriginalSetDimension || layer.setDimension;
                var originalSetBoundingBox = layer._multilayerOriginalSetBoundingBox || layer.setBoundingBox;

                layer._multilayerOriginalSetDimension = originalSetDimension;
                layer._multilayerOriginalSetBoundingBox = originalSetBoundingBox;
                layer.setDimension = function () { return this; };
                layer.setBoundingBox = function () { return this; };
                layer._multilayerAutoResizeDisabled = true;
            });
        };

        this._allowLayerResize = function (fn) {
            if (!this.layers) {
                if (fn) return fn.call(this);
                return;
            }

            var restore = [];
            this.layers.each(function (idx, layer) {
                if (!layer || layer._multilayerAutoResizeDisabled !== true) return;

                restore.push(layer);
                if (layer._multilayerOriginalSetDimension) {
                    layer.setDimension = layer._multilayerOriginalSetDimension;
                }
                if (layer._multilayerOriginalSetBoundingBox) {
                    layer.setBoundingBox = layer._multilayerOriginalSetBoundingBox;
                }
            });

            try {
                if (fn) return fn.call(this);
            } finally {
                restore.forEach(function (layer) {
                    layer.setDimension = function () { return this; };
                    layer.setBoundingBox = function () { return this; };
                    layer._multilayerAutoResizeDisabled = true;
                });
            }
        };

        this._disableLayerAutoResize = function () {
            this._lockLayerAutoResize();
        };

        this._disableLayerAutoResize();

        // Always replace the active figure selection policy so only the multilayer-specific resize policy remains.
        this.uninstallEditPolicy("draw2d.policy.figure.SelectionFeedbackPolicy");
        this.uninstallEditPolicy("draw2d.policy.figure.ResizeSelectionFeedbackPolicy");
        this.installEditPolicy(new GraphLang.policy.figure.MultilayeredResizeSelectionFeedbackPolicy());
    },

    addLayer: function () {
        this._super();

        if (!this.layers || this.layers.isEmpty()) return;
        var lastLayer = this.layers.get(this.layers.getSize() - 1);
        if (!lastLayer) return;

        lastLayer._multilayerOriginalSetDimension = lastLayer.setDimension;
        lastLayer._multilayerOriginalSetBoundingBox = lastLayer.setBoundingBox;
        lastLayer.setDimension = function () { return this; };
        lastLayer.setBoundingBox = function () { return this; };
        lastLayer._multilayerAutoResizeDisabled = true;
    },

    renewLayerChooser: function(){
        this._super();
        let emitter_parent = this
        this.layerChooser.setSelectionAdapter(function () {
            return emitter_parent;   // the multilayered structure
        });
    },

});
