/**
 *  @class RightRelPortLocator
 *  @memberOf GraphLang.Utils
 *  @augments draw2d.layout.locator.XYRelPortLocator
 *  @description To snap objects inside structure relative to right side.
 */
GraphLang.Utils.RightRelPortLocator = draw2d.layout.locator.XYRelPortLocator.extend({
  NAME: "GraphLang.Utils.RightRelPortLocator",

  /**
   * @method
   * @memberOf GraphLang.Utils.RightRelPortLocator
   * @param index
   * @param figure
   */
  relocate: function(index, figure)
  {
      var node = figure.getParent();
      var x = node.getWidth() - this.x;
      var y = node.getHeight()/100  * this.y;

      // Set flag to bypass edit policy constraints for tunnel positioning
      figure.isLocatorPositioning = true;
      this.applyConsiderRotation( figure, x, y);
      figure.isLocatorPositioning = false;
  }
});
