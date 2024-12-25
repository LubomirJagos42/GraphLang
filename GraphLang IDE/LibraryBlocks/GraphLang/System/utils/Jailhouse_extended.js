/**
 *  @class draw2d.SetFigure
 *  @description Extension of draw2d Figure, adding some function to make code transcripting process easier.
 */
//debugger;
draw2d.shape.composite.Jailhouse = draw2d.shape.composite.Jailhouse.extend({
    isNodeClass: function(){
        if (!this.getUserData()) return false;
        if (this.getUserData().hasOwnProperty('isClass')) return this.getUserData().isClass;
        return false;
    },

    isNodeCluster: function(){
        if (!this.getUserData()) return false;
        if (this.getUserData().hasOwnProperty('isCluster')) return this.getUserData().isCluster;
        return false;
    },

    isNodeMultilayered: function(){
        if (!this.getUserData()) return false;
        if (this.getUserData().hasOwnProperty('isMultilayered')) return this.getUserData().isMultilayered;
        return false;
    },
});




