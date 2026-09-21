/**
 *  @method LeftRelPortLocator
 *  @name GraphLang.Utils.BottomRelPortLocator
 *  @description To snap objects to botom edge of structure.
 */
GraphLang.Utils.LeftRelPortLocator = draw2d.layout.locator.XYRelPortLocator.extend({
  NAME: "GraphLang.Utils.LeftRelPortLocator",
  relocate: function(index, figure)
  {
      var node = figure.getParent();
      var x = -this.x;
      var y = node.getHeight()/100 * this.y;

      // Set flag to bypass edit policy constraints for tunnel positioning
      figure.isLocatorPositioning = true;
      this.applyConsiderRotation(figure, x, y);
      figure.isLocatorPositioning = false;
  },

});
