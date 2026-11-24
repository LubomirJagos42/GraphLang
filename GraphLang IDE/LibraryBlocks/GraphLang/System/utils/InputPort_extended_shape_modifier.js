/**
 *  @class draw2d.InputPortShapeModifier
 *  @description Shape modifier for input ports. Extends the already customized draw2d.InputPort
 *  (see InputPort_extended.js) and draws the port as a triangle instead of an oval, like in
 *  electrical schematics. The triangle tip points INTO the node.
 *
 *  Must be loaded AFTER InputPort_extended.js.
 *
 *  Class is defined under its own name (unique name for createWebPage.py ordering and DB storage, where class name is the key)
 *  and then assigned back to draw2d.InputPort so every port created by draw2d uses triangle shape.
 *  NAME stays "draw2d.InputPort" so serialized schematics are not affected.
 */
draw2d.InputPortShapeModifier = draw2d.InputPort.extend({
  NAME: "draw2d.InputPort",

  init: function(attr, setter, getter){
    this._super(attr, setter, getter);
  },

  /**
   * @description Use a path element instead of ellipse.
   */
  createShapeElement: function(){
    return this.canvas.paper.path("M0 0");
  },

  /**
   * @description Side of the parent node the port sits on: 0 = up, 1 = right, 2 = down, 3 = left.
   */
  getShapeSide: function(){
    if (this.getParent() === null) return 3; //input ports are usually on the left side
    try{
      return this.getConnectionDirection();
    }catch(e){
      return 3;
    }
  },

  /**
   * @description Returns SVG path of triangle centered at port position, tip pointing into the node.
   */
  getTrianglePath: function(){
    let cx = this.getAbsoluteX();
    let cy = this.getAbsoluteY();
    let r = this.getWidth() / 2;

    //input port points opposite of the side it lies on => into the node
    let pointDirection = (this.getShapeSide() + 2) % 4;

    let p;
    switch (pointDirection){
      case 0: //up
        p = [[cx, cy - r], [cx + r, cy + r], [cx - r, cy + r]];
        break;
      case 1: //right
        p = [[cx + r, cy], [cx - r, cy + r], [cx - r, cy - r]];
        break;
      case 2: //down
        p = [[cx, cy + r], [cx - r, cy - r], [cx + r, cy - r]];
        break;
      default: //left
        p = [[cx - r, cy], [cx + r, cy - r], [cx + r, cy + r]];
        break;
    }

    return "M" + p[0][0] + " " + p[0][1] + "L" + p[1][0] + " " + p[1][1] + "L" + p[2][0] + " " + p[2][1] + "Z";
  },

  repaint: function(attributes){
    if (this.repaintBlocked === true || this.shape === null) {
      return;
    }

    this._super(attributes);

    //after default repaint (fill, stroke, ...) replace geometry with triangle
    this.shape.attr({path: this.getTrianglePath()});
  }

});

/*
 *  Replace global draw2d.InputPort with shape modified one
 */
draw2d.InputPort = draw2d.InputPortShapeModifier;
