/**
 *  @class GraphLang.Shapes.Basic.Loop.Multilayered
 *  @author Ing. Lubomir Jagos
 *  @description Base class for multilayered structures, they are also loops, but there
 *  are many loops hidden inside, and they share common boundary which is just one.
 *  So Inside should be multiple sheetes without boundaries than there wouldn't be
 *  detected tunnels on their borders and just one tunnels for common loop would be
 *  generated.
 *  Jailhouse is NOT PART OF LOOP, becasue loops has tunnels when wires enter them.
 *  Jailhouse is just layer and part of some object, now Multilayered node which provides
 *  tunnels to enter these layers.
 */
GraphLang.Shapes.Basic.Jailhouse = draw2d.shape.composite.Jailhouse.extend({
  NAME: "GraphLang.Shapes.Basic.Jailhouse",

  init: function(attr, setter, getter) {
    this._super($.extend({}, attr), setter, getter);
    this.userData = {};
    this._autoResizeDisabled = false;
    this._allowResize = false;
  },

  /*
   *  Layer has own translate function, it's not translate recursively as loop, because layer
   *  has no tunnels they are owned parent object instead, so this just order elements and
   *  call their translation function.
   */
  translateToCppCode: function(funcParams = {}){
    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;

    let codeLinesOffset = Object.hasOwn(funcParams, "codeLinesOffset") ? funcParams.codeLinesOffset : 0;
    let compileErrorLines = Object.hasOwn(funcParams, "compileErrorLines") ? funcParams.compileErrorLines : null;
    let breakpointParentId = Object.hasOwn(funcParams, "breakpointParentId") ? funcParams.breakpointParentId : null;

    let lineNumberToFind = Object.hasOwn(funcParams, "lineNumberToFind") ? funcParams.lineNumberToFind : null;
    let nodeName = Object.hasOwn(funcParams, "nodeName") ? funcParams.nodeName : "";

    cCode = "";

    /*
     *  Going through all nodes and wires inside Jailhouse and translate them into C/C++ code or call appropriate translate function
     */
    layerFigures = this.getAssignedFigures();
    layerFigures.sort(function(figureA, figureB){ return figureA.userData.executionOrder - figureB.userData.executionOrder}); //order figure by their executionOrder

    //1st define all wires inside layer which are direct children, means not part of nested multilayered structure or loop
    //	here is looking on assigned figures and theirs input ports, if there is loop in layer it's iterated over its tunnels and asking for left tunnels input ports
  	allConnections = new draw2d.util.ArrayList();
  	thisId = this.getComposite();
    layerFigures.each(function(figureIndex, figureObj){
	  if (figureObj.getPorts){
  		if (figureObj.NAME.toLowerCase().search('loop') == -1 && figureObj.NAME.toLowerCase().search('tunnel') == -1){
  			figureObj.getInputPorts().each(function(inputPortIndex, inputPortObj){
  				allConnections.addAll(inputPortObj.getConnections());				//adding conenction into list of top most connections on canvas
  			});
  		}else{
  			//if loop is found, then it's going to iterate over it's children left tunnels and add connections to their input ports
  			if (figureObj.NAME.toLowerCase().search('loop') > -1){
  				figureObj.getChildren().each(function(childIndex, childObj){
  					if (childObj.NAME.toLowerCase().search('lefttunnel') > -1){
  						allConnections.addAll(childObj.getInputPort(0).getConnections());	//adding conenction into list of top most connections on canvas			
  					}
  				});
  			}
            
            //ForLoop has iteration terminal input port
  			if (figureObj.NAME.toLowerCase().search('forloop') > -1){
                allConnections.addAll(figureObj.getPort('iterationTerminal').getConnections());	//adding conenction into list of top most connections on canvas			
  			}
  		}
	  }
    });

    //ADD WIRES CONNECTED TO RIGHT TUNNELS for THIS LAYER
    rightTunnelsWires = this.getCanvas().getFigure(this.userData.owner).getRightTunnelsLayerWires();
    rightTunnelsWires.each(function(connectionIndex, connectionObj){
      wireSourceFigure = connectionObj.getSource().getParent()
      if (wireSourceFigure.NAME.toLowerCase().search('tunnel') > -1) wireSourceFigure = wireSourceFigure.getParent();
      if (layerFigures.contains(wireSourceFigure)){
        allConnections.add(connectionObj);
      }
    });

  	allConnections.each(function(connectionindex, connectionObj){
  		cCode += connectionObj.getSource().userData.datatype + " " + connectionObj.getVariableName() + ";\n";
  	});

    //2nd get declaration for wires going from tunnels to figures inside
    leftTunnelsWires = this.getCanvas().getFigure(this.userData.owner).getLeftTunnelsLayerWires();
    leftTunnelsWires.each(function(connectionIndex, connectionObj){
      wireTargetFigure = connectionObj.getTarget().getParent()      
      
      //if (wireTargetFigure.NAME.toLowerCase().search('tunnel') > -1) wireTargetFigure = wireTargetFigure.getParent();
      
      //getting parent() until it's null so that's node which is part of canvas
      //here must be while() because port can be part fo label which is part of vertical layout which is part of BundleByName
      while(wireTargetFigure.getParent() != null){
        wireTargetFigure = wireTargetFigure.getParent();
      }
    
      if (layerFigures.contains(wireTargetFigure)){
        cCode += connectionObj.getVariableName() + " = tunnel_" + connectionObj.getSource().getParent().getId() + ";\n";  //to get tunnel ID first I got port from wire source and its parent is tunnel
      }
    });

    /*
     *  ...................ToDo.......................
     *    NEED TO FINISH TRANSLATION PROCESS TILL NOW WIRES AND ASSIGNMENT FROM TUNNELS ARE DONE, HERE BELOW SHOULD BE RIGHT TRANSLATE
     *    PROCESS FOR FIGURES AND LOOPS AND OTHERS ITEMS BASED ON executionOrder OF NODES
     */

    //3rd translate figures inside layer
    layerFigures.each(function(figureIndex, figureObj){

      //translate C++ declarations
      if ('translateToCppCodeDeclaration' in figureObj && typeof figureObj.translateToCppCodeDeclaration === 'function'){
        let lineCountBefore = GraphLang.Utils.getLineCount(cCode);
        let adjustedParams = {
            ...funcParams,
            lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - lineCountBefore : null
        };
        cCode += figureObj.translateToCppCodeDeclaration(adjustedParams) + "\n";

        //check if target line was reached by this figure's declaration
        if (translatorObj !== null && translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null &&
            lineNumberToFind !== null && GraphLang.Utils.getLineCount(cCode) > lineNumberToFind){
          translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = figureObj;
        }
      }

      //translate C++ node code
      if ('translateToCppCode' in figureObj && typeof figureObj.translateToCppCode === 'function'){
        let lineCountBefore = GraphLang.Utils.getLineCount(cCode);
        let adjustedParams = {
            ...funcParams,
            lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - lineCountBefore : null
        };
        cCode += figureObj.translateToCppCode(adjustedParams) + "\n";

        //check if target line was reached by this figure's code
        if (translatorObj !== null && translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null &&
            lineNumberToFind !== null && GraphLang.Utils.getLineCount(cCode) > lineNumberToFind){
          translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = figureObj;
        }
      }

      //translate C++ additional post code if available
      if ('translateToCppCodePost' in figureObj && typeof figureObj.translateToCppCodePost === 'function'){
        let lineCountBefore = GraphLang.Utils.getLineCount(cCode);
        let adjustedParams = {
            ...funcParams,
            lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - lineCountBefore : null
        };
        cCode += figureObj.translateToCppCodePost(adjustedParams) + "\n";

        //check if target line was reached by this figure's post code
        if (translatorObj !== null && translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null &&
            lineNumberToFind !== null && GraphLang.Utils.getLineCount(cCode) > lineNumberToFind){
          translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = figureObj;
        }

      }

      /*
       *  Add ID into list of all IDs
       */
      if (translatorObj !== null){
        translatorObj.translateToCppCodeAdditionalId.add(figureObj.getId());
        translatorObj.translateToCppCodeAdditionalIdNoHyphen.add(figureObj.getId().replaceAll('-', ''));
      }

    });

    //4th translate wires going OUTSIDE FIGURE THROUGH TUNNELS
    layerFigures = this.getAssignedFigures();
    cCode += '/* RIGHT TUNNELS output assignment */' + "\n";
    this.getCanvas().getFigure(this.userData.owner).getChildren().each(function(childIndex, childObj){
      if (childObj.NAME.toLowerCase().search('righttunnel') > -1){
        childObj.getInputPort(0).getConnections().each(function(connectionIndex, connectionObj){
          wireSourceFigure = connectionObj.getSource().getParent()
          if (wireSourceFigure.NAME.toLowerCase().search('tunnel') > -1) wireSourceFigure = wireSourceFigure.getParent();
          if (layerFigures.contains(wireSourceFigure)){
            childObj.getOutputPort(0).getConnections().each(function(outputWireIndex, outputWireObj){
                cCode +=  outputWireObj.getVariableName() + " = " + connectionObj.getVariableName() + ";\n";
            });
          }
        });
      }
    });
    cCode += '/* END RIGHT TUNNELS output assignment */' + "\n";
    
    return cCode;
  },
  
  translateToPythonCode: function(){
    pythonCode = "";

    /*
     *  Going through all nodes and wires inside Jailhouse and translate them into C/C++ code or call appropriate translate function
     */
    layerFigures = this.getAssignedFigures();
    layerFigures.sort(function(figureA, figureB){ return figureA.userData.executionOrder - figureB.userData.executionOrder}); //order figure by their executionOrder

    //2nd get declaration for wires going from tunnels to figures inside
    leftTunnelsWires = this.getCanvas().getFigure(this.userData.owner).getLeftTunnelsLayerWires();
    leftTunnelsWires.each(function(connectionIndex, connectionObj){
      wireTargetFigure = connectionObj.getTarget().getParent()            
      //getting parent() until it's nullso that's node which is part of canvas
      //here must be while() because port can be part fo label which is part of vertical layout which is part of BundleByName
      while(wireTargetFigure.getParent() != null){
        wireTargetFigure = wireTargetFigure.getParent();
      }
    
      if (layerFigures.contains(wireTargetFigure)){
        pythonCode += connectionObj.getVariableName() + " = tunnel_" + connectionObj.getSource().getParent().getId() + ";\n";  //to get tunnel ID first I got port from wire source and its parent is tunnel
      }
    });

    //3rd translate figures inside layer
    layerFigures.each(function(figureIndex, figureObj){
      //if there is some declaration translate it
      if (figureObj.translateToCppCodeDeclaration) pythonCode += figureObj.translateToCppCodeDeclaration() + "\n";

      if (
          (typeof figureObj.isLoop === "function" && figureObj.isLoop() === true) &&
          !(typeof figureObj.isMultilayered === "function" && figureObj.isMultilayered() === true)
      ){
        pythonCode += figureObj.translateToPythonCode() + "\n";
      }else if (figureObj.NAME.toLowerCase().search("connection") == -1){
        pythonCode += figureObj.translateToPythonCode() + "\n";                       //translation of normal nodes except wires
      }else if (figureObj.translateToCppCode){
        pythonCode += figureObj.translateToPythonCode() + "\n";                       //translation of normal nodes except wires        
      }
    });

    //4th translate wires going OUTSIDE FIGURE THROUGH TUNNELS
    layerFigures = this.getAssignedFigures();
    cCode += '/* RIGHT TUNNELS output assignment */' + "\n";
    this.getCanvas().getFigure(this.userData.owner).getChildren().each(function(childIndex, childObj){
      if (childObj.NAME.toLowerCase().search('righttunnel') > -1){
        childObj.getInputPort(0).getConnections().each(function(connectionIndex, connectionObj){
          wireSourceFigure = connectionObj.getSource().getParent()
          if (wireSourceFigure.NAME.toLowerCase().search('tunnel') > -1) wireSourceFigure = wireSourceFigure.getParent();
          if (layerFigures.contains(wireSourceFigure)){
            childObj.getOutputPort(0).getConnections().each(function(outputWireIndex, outputWireObj){
                pythonCode +=  outputWireObj.getVariableName() + " = " + connectionObj.getVariableName() + ";\n";
            });
          }
        });
      }
    });
    pythonCode += '/* END RIGHT TUNNELS output assignment */' + "\n";
    
    return pythonCode;
  },

  /*
   *    This event is called when figure is dropped on layer.
   */
  onCatch(droppedFigure, x, y, shiftKey, ctrlKey){
    //run super() or continue just in case there is not dropped tunnel inside layer, tunnel is possible to move
    if ((typeof droppedFigure.isTunnel === "function" && droppedFigure.isTunnel() === true) === false){

      this._super(droppedFigure, x, y, shiftKey, ctrlKey);

      if (
          (droppedFigure.getComposite() && droppedFigure.getComposite().getId() == this.getId())
      ){
          //alert('no layer change')
      }else{
        //alert('new layer assignment')
        let self = this;

        droppedFigure.getPorts().each(function(portIndex, portObj){
            console.log(`--> ${self.NAME} > ${self.getId()} > onCatch() > ${droppedFigure.NAME} > ${droppedFigure.getId()} > ${portObj.getParent().NAME}, ${portObj.getName()}`);

          //this excludes connection going inside some loop or multilayered structure, wire going from tunnel inside or wire going from structure to rightTunnel input port what is still inside structure
          if (
              (typeof portObj.getParent().isLeftTunnel === "function" && portObj.getParent().isLeftTunnel() === true && portObj.NAME.toLowerCase().search(".outputport") > -1) ||
              (typeof portObj.getParent().isRightTunnel === "function" && portObj.getParent().isRightTunnel() === true && portObj.NAME.toLowerCase().search(".inputport") > -1)
          ){
            console.log(`----> port excluded from tunnel detection, all its wire connection are ignored`);
          }else{
            portObj.getConnections().each(function(connectionIndex, connectionObj){
              console.log(`----> detecting tunnels for wire id: ${connectionObj.getId()}`)
              GraphLang.Utils.detectTunnels2(droppedFigure.getCanvas(), connectionObj);
            });
          }
  		});
      }

      try{
        droppedFigure.bringsAllTunnelsToFront()
        console.log(`--> ${droppedFigure.NAME} > ${droppedFigure.getId()} > onCatch() > bringsAllTunnelsToFront()`);
      }catch(e){}


    }
  },

  /*
   *    This event is called when figure is dragged out of layer.
   */
  onDragLeave: function(draggedFigure){
    let self = this;

    var previousComposite = draggedFigure.getComposite();
    if (previousComposite){
      // unassign from composite first
      previousComposite.unassignFigure(draggedFigure);

      // re-evaluate tunnels for all connections of the moved figure
      try{
        draggedFigure.getPorts().each(function(portIndex, portObj){
          portObj.getConnections().each(function(connIndex, connObj){
            console.log(`--> ${self.NAME} > onDragLeave() > detecting tunnel for port ${portObj.getId()} > wire ${connectionObj.getId()}`);
            GraphLang.Utils.detectTunnels2(draggedFigure.getCanvas(), connObj);
          });
        });
      }catch(e){/* ignore if ports/connections not present */}

      // bring moved figure to front so it stays visible after leaving
      try{ draggedFigure.toFront(); }catch(e){}

      // ensure tunnels of the composite are displayed above its children
      try{ previousComposite.bringsAllTunnelsToFront(); }catch(e){}
    }
  },

  // block only auto-resize; owner-driven resize goes through _allowResize
  setDimension: function(w, h) {
    if (this._autoResizeDisabled && !this._allowResize) return this;
    return this._super(w, h);
  },
  setBoundingBox: function(r) {
    if (this._autoResizeDisabled && !this._allowResize) return this;
    return this._super(r);
  },

  setPersistentAttributes: function(memento) {
    this._super(memento);

    // sync internal constraint region with the loaded bounds, BEFORE locking
    this._allowResize = true;
    try { this.setDimension(this.getWidth(), this.getHeight()); }
    finally { this._allowResize = false; }

    const ud = this.getUserData();
    this._autoResizeDisabled = !!(ud && ud.enableAutoresize === false);
  },

  assignFigure: function(figure) {
    const ownerId = this.userData && this.userData.owner;
    const isOwner  = ownerId && figure.getId && figure.getId() === ownerId;
    const isLayer  = figure.NAME && figure.NAME.indexOf("Jailhouse") > -1;
    if (isOwner || isLayer || figure === this) {
      console.warn("Jailhouse.assignFigure refused:", figure.NAME, figure.getId(), "->", this.getId());
      console.trace();
      return;
    }
    return this._super(figure);
  },

});
