/**
 *  @class draw2d.OutputPortShapeModifier
 *  @description Shape modifier for output ports. Extends the already customized draw2d.OutputPort
 *  (see OutputPort_extended.js) and draws the port as a triangle instead of an oval, like in
 *  electrical schematics. The triangle tip points OUT of the node.
 *
 *  Must be loaded AFTER OutputPort_extended.js.
 *
 *  Class is defined under its own name (unique name for createWebPage.py ordering and DB storage, where class name is the key)
 *  and then assigned back to draw2d.OutputPort so every port created by draw2d uses triangle shape.
 *  NAME stays "draw2d.OutputPort" so serialized schematics are not affected.
 */
draw2d.OutputPortShapeModifier = draw2d.OutputPort.extend({
  NAME: "draw2d.OutputPort",

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
   * @description Side of the UNROTATED parent node the port sits on: 0 = up, 1 = right, 2 = down, 3 = left.
   */
  getShapeSide: function(){
    return draw2d.PortTriangleShape.getUnrotatedSide(this, 1);
  },

  /**
   * @description Returns SVG path of triangle centered at port position, tip pointing out of the node, rotated together with node.
   */
  getTrianglePath: function(){
    return draw2d.PortTriangleShape.getTrianglePath(this, this.getShapeSide());
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
 *  Replace global draw2d.OutputPort with shape modified one
 */
draw2d.OutputPort = draw2d.OutputPortShapeModifier;

/*
 *  Shared rotation helper for triangle shaped ports (defined in both InputPort_extended_shape_modifier.js and
 *  OutputPort_extended_shape_modifier.js, first loaded file wins, so the load order of these files does not matter).
 *
 *  draw2d rotates node SVG around its TRUNCATED center ((w/2|0, h/2|0), see draw2d.SetFigure.applyTransformation) but
 *  positions ports around the EXACT center (see draw2d.layout.locator.PortLocator.applyConsiderRotation). Because of that
 *  rotated ports were shifted a bit from the lines drawn in the node SVG. Additionally the port triangle was always drawn
 *  in its unrotated direction. This helper maps everything through the real transformation matrix of the node SVG.
 */
if (typeof draw2d.PortTriangleShape === "undefined"){
  draw2d.PortTriangleShape = {

    /**
     * @description Returns Raphael matrix which maps parent local coordinates (unrotated, 0..width, 0..height) into
     * absolute canvas coordinates, or null when the parent is not rotated.
     */
    getParentShapeMatrix: function(parent){
      if (parent === null || typeof parent.getRotationAngle !== "function") return null;
      let angle = parent.getRotationAngle();
      if (!angle || angle % 360 === 0) return null;

      //real matrix used to draw node SVG content (includes 90/270 aspect ratio correction made by draw2d)
      if (parent.svgNodes && parent.svgNodes.items && parent.svgNodes.items.length > 0 && parent.svgNodes.items[0].matrix){
        return parent.svgNodes.items[0].matrix;
      }

      let m = Raphael.matrix();
      m.translate(parent.getAbsoluteX(), parent.getAbsoluteY());
      m.rotate(angle, parent.getWidth() / 2, parent.getHeight() / 2);
      return m;
    },

    /**
     * @description Side of the UNROTATED parent node the port sits on: 0 = up, 1 = right, 2 = down, 3 = left.
     */
    getUnrotatedSide: function(port, defaultSide){
      let parent = port.getParent();
      if (parent === null) return defaultSide;
      if (typeof port.preferredConnectionDirection !== "undefined" && port.preferredConnectionDirection !== null){
        return port.preferredConnectionDirection;
      }
      try{
        let m = this.getParentShapeMatrix(parent);
        if (m === null) return port.getConnectionDirection();

        //transform port position back into unrotated parent local coordinates
        let inv = m.invert();
        let ax = port.getAbsoluteX(), ay = port.getAbsoluteY();
        let local = new draw2d.geo.Point(inv.x(ax, ay), inv.y(ax, ay));
        return new draw2d.geo.Rectangle(0, 0, parent.getWidth(), parent.getHeight()).getDirection(local);
      }catch(e){
        return defaultSide;
      }
    },

    /**
     * @description Returns SVG path of triangle centered at port position with tip pointing to unrotated direction
     * pointDirection (0 = up, 1 = right, 2 = down, 3 = left) which is then rotated together with parent node.
     */
    getTrianglePath: function(port, pointDirection){
      let cx = port.getAbsoluteX();
      let cy = port.getAbsoluteY();
      let r = port.getWidth() / 2;

      let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      let dx = dirs[pointDirection][0];
      let dy = dirs[pointDirection][1];

      //rotate direction vector same way as node SVG is rotated
      let m = port.getParent() !== null ? this.getParentShapeMatrix(port.getParent()) : null;
      if (m !== null){
        let vx = m.x(dx, dy) - m.x(0, 0);
        let vy = m.y(dx, dy) - m.y(0, 0);
        let len = Math.sqrt(vx*vx + vy*vy);
        if (len > 0){
          dx = vx / len;
          dy = vy / len;
        }
      }

      //tip in direction (dx, dy), base perpendicular to it
      let px = -dy, py = dx;
      let p = [
        [cx + r*dx,           cy + r*dy],
        [cx - r*dx + r*px,    cy - r*dy + r*py],
        [cx - r*dx - r*px,    cy - r*dy - r*py]
      ];

      return "M" + p[0][0] + " " + p[0][1] + "L" + p[1][0] + " " + p[1][1] + "L" + p[2][0] + " " + p[2][1] + "Z";
    }
  };

  /*
   *  Place ports of rotated node exactly where node SVG is drawn (same matrix as SVG content) so port triangles
   *  sit on the end of node lines going from port into node.
   */
  let originalApplyConsiderRotation = draw2d.layout.locator.PortLocator.prototype.applyConsiderRotation;
  draw2d.layout.locator.PortLocator.prototype.applyConsiderRotation = function(port, x, y){
    let parent = port.getParent();
    let m = draw2d.PortTriangleShape.getParentShapeMatrix(parent);
    if (m === null || !(parent.svgNodes && parent.svgNodes.items && parent.svgNodes.items.length > 0)){
      return originalApplyConsiderRotation.call(this, port, x, y);
    }
    port.setPosition(m.x(x, y) - parent.getAbsoluteX(), m.y(x, y) - parent.getAbsoluteY());
  };
}
