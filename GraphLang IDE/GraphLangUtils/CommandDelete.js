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

        //snapshot first — we're about to delete/reassign while iterating,
        //and getAssignedFigures() is a live list
        let layerFigures = [];
        layerObj.getAssignedFigures().each(function(figureIndex, figureObj){
          layerFigures.push(figureObj);
        });

        //START REMOVING FIGURES INSIDE EACH LAYER
        layerFigures.forEach(function(figureObj){
          let cmdDel = new GraphLang.Utils.CommandDelete(figureObj);
          cmdDel.cascadeDeleteContents = true;   //whole structure is being torn down — don't preserve loop contents
          cmdStack.execute(cmdDel);
        });

        //REMOVE LAYER OBJECT ITSELF (Jailhouse object)
        let cmdDel = new GraphLang.Utils.CommandDelete(layerObj);
        cmdDel.cascadeDeleteContents = true;
        cmdStack.execute(cmdDel);
      });

      //DELETE WIRES CONNECTED TO SELECTOR PORT
      if (this.figure.selectorPort){
        this.figure.selectorPort.getConnections().each(function(connectionIndex, connectionObj){
          let cmdDel = new draw2d.command.CommandDelete(connectionObj);
          cmdStack.execute(cmdDel);
        });
      }

      //LOOP (ForLoop / WhileLayer): either preserve contents (direct user delete)
      //or actually delete them (cascading teardown from a parent structure)
    }else if (this.figure.userData && this.figure.userData.isLoop){

      let outerComposite = this.figure.getComposite();

      //snapshot the assigned figures first
      let innerFigures = [];
      this.figure.getAssignedFigures().each(function(figureIndex, figureObj){
        innerFigures.push(figureObj);
      });

      if (this.cascadeDeleteContents){
        //this loop is being removed as part of a larger teardown (e.g. Multilayered3
        //being deleted) — its contents must go too, not just be relocated
        innerFigures.forEach(function(figureObj){
          let cmdDel = new GraphLang.Utils.CommandDelete(figureObj);
          cmdDel.cascadeDeleteContents = true;
          cmdStack.execute(cmdDel);
        });
      }else{
        //loop deleted directly by the user: keep its contents, release them into
        //whatever structure the loop itself lived in (or leave them on the canvas
        //if it was top-level)
        innerFigures.forEach(function(figureObj){
          this.figure.unassignFigure(figureObj);
          if (outerComposite){
            outerComposite.assignFigure(figureObj);
          }
        }, this);
      }

      //DELETE WIRES CONNECTED TO THE LOOP'S OWN HARDWIRED PORTS (these ports disappear with the loop either way)
      ["iterationTerminal", "iterationTerminalOutput", "stopTerminal"].forEach(function(portName){
        if (this.figure[portName]){
          this.figure[portName].getConnections().each(function(connectionIndex, connectionObj){
            let cmdDel = new draw2d.command.CommandDelete(connectionObj);
            cmdStack.execute(cmdDel);
          });
        }
      }, this);

      if (outerComposite){
        outerComposite.unassignFigure(this.figure);
      }

    }else{
      //GENERIC FIGURE — including a Jailhouse layer that isn't caught by the branches above.
      //When cascading (structure teardown), also delete anything still assigned to it,
      //as a safety net in case it still owns figures at this point.
      if (this.cascadeDeleteContents && typeof this.figure.getAssignedFigures === "function"){
        let containedFigures = [];
        this.figure.getAssignedFigures().each(function(figureIndex, figureObj){
          containedFigures.push(figureObj);
        });
        containedFigures.forEach(function(figureObj){
          let cmdDel = new GraphLang.Utils.CommandDelete(figureObj);
          cmdDel.cascadeDeleteContents = true;
          cmdStack.execute(cmdDel);
        });
      }

      if (this.figure.getComposite()){
        this.figure.getComposite().unassignFigure(this.figure);
      }
    }

    //call super method to remove this figure
    this._super();
  }
});