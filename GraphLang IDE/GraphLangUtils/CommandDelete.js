/**
 *  @method TopRelPortLocator
 *  @name GraphLang.Utils.TopRelPortLocator
 *  @description To snap objects to top edge of structure.
 */
GraphLang.Utils.CommandDelete = draw2d.command.CommandDelete.extend({
  NAME: "GraphLang.Utils.CommandDelete",
  constructor(obj) {
    obj && Object.assign(this, obj);
  },
  
  execute: function(){
    
    cmdStack = this.figure.getCanvas().getCommandStack();
    
    //THIS REMOVES ALL PARTS OF MULTILAYERED STRUCTURE
    if (this.figure.NAME.toLowerCase().search("multilayered") > -1){

      //ITERATE OVER ALL LAYERS, DELETE ALL LAYERS FIGURES
      this.figure.getAllLayers().each(function(layerIndex, layerObj){
        //START REMOVING FIGURES INSIDE EACH LAYER
        layerObj.getAssignedFigures().each(function(figureIndex, figureObj){
          let cmdDel = new GraphLang.Utils.CommandDelete(figureObj);
          cmdStack.execute(cmdDel);
        });
				
        //REMOVE LAYER OBJECT ITSELF (Jailhouse object)
        let cmdDel = new GraphLang.Utils.CommandDelete(layerObj);
          cmdStack.execute(cmdDel);
      });

      //DELETE WIRES CONNECTED TO SELECTOR PORT
      if (this.figure.selectorPort){
        this.figure.selectorPort.getConnections().each(function(connectionIndex, connectionObj){
          let cmdDel = new draw2d.command.CommandDelete(connectionObj);
          cmdStack.execute(cmdDel);
        });
      }

    }else{
      if (this.figure.getComposite()){
    	  this.figure.getComposite().unassignFigure(this.figure);  
      }
    }

    //call super method to remove this figure
    this._super();
  }
});
