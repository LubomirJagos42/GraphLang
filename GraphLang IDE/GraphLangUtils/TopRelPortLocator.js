/**
 *  @method TopRelPortLocator
 *  @name GraphLang.Utils.TopRelPortLocator
 *  @description To snap objects to top edge of structure.
 */
GraphLang.Utils.TopRelPortLocator = draw2d.layout.locator.XYRelPortLocator.extend({
  NAME: "GraphLang.Utils.TopRelPortLocator",
  relocate: function(index, figure)
  {
      var node = figure.getParent();
      var x = node.getWidth()/100 * this.x;
      var y = -this.y;

      // Set flag to bypass edit policy constraints for tunnel positioning
      figure.isLocatorPositioning = true;
      this.applyConsiderRotation(figure, x, y);
      figure.isLocatorPositioning = false;
  }
});
