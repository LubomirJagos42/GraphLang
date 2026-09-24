/**
 *  @class draw2d.SetFigure
 *  @description Extension of draw2d Figure, adding some function to make code transcripting process easier.
 */
//debugger;
draw2d.shape.composite.Jailhouse = draw2d.shape.composite.Jailhouse.extend({
    isClass: function(){
        if (!this.getUserData()) return false;
        if (this.getUserData().hasOwnProperty('isClass')) return this.getUserData().isClass;
        return false;
    },

    isCluster: function(){
        if (!this.getUserData()) return false;
        if (this.getUserData().hasOwnProperty('isCluster')) return this.getUserData().isCluster;
        return false;
    },

    isMultilayered: function(){
        if (!this.getUserData()) return false;
        if (this.getUserData().hasOwnProperty('isMultilayered')) return this.getUserData().isMultilayered;
        return false;
    },

    setIsClass: function(isClass){
        if (!this.getUserData()){
            this.userData = {isClass: isClass};
        }else{
            this.getUserData().isClass = isClass;
        }
    },

    setIsCluster: function(isCluster){
        if (!this.getUserData()){
            this.userData = {isCluster: isCluster};
        }else{
            this.getUserData().isCluster = isClass;
        }
    },

    setIsMultilayered: function(isMultilayered){
        if (!this.getUserData()){
            this.userData = {isMultilayered: isMultilayered};
        }else{
            this.getUserData().isMultilayered = isMultilayered;
        }
    },

});




