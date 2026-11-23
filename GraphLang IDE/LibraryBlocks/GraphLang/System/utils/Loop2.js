/**
 *  @class GraphLang.Shapes.Basic.Loop
 *  @description This class is parent for WhileLoop and ForLoop mostly. It contains methods to get left tunnels
 *  declaration, inside wires declaration, right tunnels declaration.
 */

GraphLang.Shapes.Basic.Loop2 = draw2d.shape.composite.Jailhouse.extend({

  NAME: "GraphLang.Shapes.Basic.Loop2",

  constructor(obj){
    obj && Object.assign(this, obj);
  },

  init:function(attr, setter, getter){
    this._super(attr, setter, getter);
    this.userData = {};
    this.userData.executionOrder = 1;
    this.userData.wasTranslatedToCppCode = false;
    this.userData.isLoop = false;   //set to false because this class is used also for cluster and could be for another type of things, therefore nodes which really will be loops should se this flag to true in their init()
    this.translateToCppCodeImportArray = new draw2d.util.ArrayList();
    this.translateToCppCodeBreakpointList = new draw2d.util.ArrayList();
    this.translateToCppCodeWatchList = new draw2d.util.ArrayList();

    /*
     *  Disable auto-resize by default, only allow explicit resize through setWidth/setHeight methods
     */
    this.allowAutoResize = false;

    let parentSetBoundingBox = this.setBoundingBox;
    let loopInstance = this;
    this.setBoundingBox = function(box){
      // Only allow resize if explicitly enabled or if it's a manual resize operation
      if (loopInstance.allowAutoResize === true){
        return parentSetBoundingBox.call(loopInstance, box);
      }
      return;
    };
  },

  /**
   * @method toFront
   * @description Override original method add brings tunnel to fron since .toFront() is called even when .assignFigure(figureObj) is used and in case of jailhouse
   * it brings to fron jailhouse canvas and tunnels are overllaped so their ports inside jailhouse are not visible and wire seems to finish in canvas.
   * @param figure
   */
  toFront: function(figure){
    this._super(figure)

    //TODO: Need check but brings tunnels to front only in case that loop is set to visible.
    if (this.isVisible() === true){
        this.bringsAllTunnelsToFront();
    }
  },
  toBack: function(figure){
    this._super(figure)
    this.bringsAllTunnelsToBack();
  },
  setVisible: function(flag){
    this._super(flag);

    //setVisible for all child tunnels also
    this.getChildren().each(function (childIndex, childObj) {
      if (typeof childObj.isTunnel === "function" && childObj.isTunnel() === true) {
        childObj.setVisible(flag);
      }
    });
  },

  //THIS IS MY FUNCTION TO GET INPUT PORTS LIST FOR THIS Loop
  getInputPorts: function(){
    output = new draw2d.util.ArrayList();
    this.getChildren().each(function(childIndex, childObj){
      if (childObj.NAME.toLowerCase().search("lefttunnel") >= 0){
        output.push(childObj.getInputPort(0));
      }
      else if (childObj.NAME.toLowerCase().search("righttunnel") >= 0){       //ADD ALSO INPUT PORT FROM RIGHTTUNNELS
         output.push(childObj.getInputPort(0));
      }
    });

    return output;
  },
  getPort: function(id){
    var port;
    this.getChildren().each(function(childIndex, childObj){
      if (childObj.getPort(id) != null) port = childObj.getPort(id);
    });
    return port;
  },
  getUserData: function(){
    return this.userData;
  },

  isLoop: function(){
      if (this.getUserData() && this.getUserData().isLoop) {
          return this.getUserData().isLoop;
      }
      return false;
  },

  setIsLoop: function(value){
      this.getUserData().isLoop = value;
  },

  /*
   *  SET EXECUTION ORDER BY LEFTTUNNEL WITH HIGHEST EXECUTION ORDER
   */
  setExecutionOrderByTunnels: function(canvas){
    //first get input tunnel with highest execution number, if there is no input tunnel it's needed to look for parent loop
    var tunnelHighestExecutionOrder = -1;
    this.getChildren().each(function(childIndex, childObj){
      if (childObj.NAME.toLowerCase().search("lefttunnel") >= 0){
        var tunnelExecutionOrder = childObj.getUserData().executionOrder;
        if (tunnelExecutionOrder > tunnelHighestExecutionOrder) tunnelHighestExecutionOrder = tunnelExecutionOrder;
      }
    });

    /*
     *  Look also for input ports if there are any
     */
    this.getInputPorts().each(function(portIndex, portObj){
        if (portObj.getUserData() &&
            portObj.getUserData().executionOrder &&
            portObj.getUserData().executionOrder > tunnelHighestExecutionOrder
        ){
            tunnelHighestExecutionOrder = portObj.getUserData().executionOrder;
        }
    });

    //in case there are no input tunnels on loop is needed to look for parent and used it's execution order, if parent is directly canvas, then this loop without input tunnels is executed as first, so it's execution order is 1
    // HERE CAN BE PROBLEM IF PARENT HASN'T SET UP ITS EXECUTION ORDER, SO THEN SHOULD BE RECURSIVELY LOOKIN UP, for now suppose that this will not happen
    if (tunnelHighestExecutionOrder == -1){
      var thisLoopOwner = GraphLang.Utils.getNodeLoopOwner(canvas, this);
      var ownerExecutionOrder;
      if (thisLoopOwner != null) ownerExecutionOrder = thisLoopOwner.getUserData().executionOrder;
      if ( ownerExecutionOrder != undefined){
        this.getUserData().executionOrder = ownerExecutionOrder;  //<--- HERE SHOULD BE RECURSIVELY LOOKING UP for execution order
      }else{
        this.getUserData().executionOrder = 1;
      }
    }else{
      this.getUserData().executionOrder = tunnelHighestExecutionOrder + 1;
    }

    this.getUserData().wasTranslatedToCppCode = false;
  },

 /*
  * WIRES FROM LEFT TUNNELS IN LAYER, returns all wires from left tunnels regardless which layer
  *   This is for Multilayer figure, to get wires list for some layer.
  */
  getLeftTunnelsLayerWires:function(){
    let leftTunnelsWires = new draw2d.util.ArrayList();
    this.getChildren().each(function(childIndex, childObj){
     if (childObj.NAME.toLowerCase().search("lefttunnel") > -1){
       if (childObj.getOutputPort(0).getConnections().getSize() > 0){
         childObj.getOutputPort(0).getConnections().each(function(connectionIndex, connectionObj){
           leftTunnelsWires.push(connectionObj);
         });
       }
     }
    });
    return leftTunnelsWires;
  },

  getRightTunnelsLayerWires:function(){
    let rightTunnelsWires = new draw2d.util.ArrayList();
    this.getChildren().each(function(childIndex, childObj){
     if (childObj.NAME.toLowerCase().search("righttunnel") > -1){
       if (childObj.getInputPort(0).getConnections().getSize() > 0){
         childObj.getInputPort(0).getConnections().each(function(connectionIndex, connectionObj){
           rightTunnelsWires.push(connectionObj);
         });
       }
     }
    });
    return rightTunnelsWires;
  },

/*******************************************
 *  get/set persisten params to right save tunnels into file
 *******************************************/


  /**
   * @method
   * Return an objects with all important attributes for XML or JSON serialization
   *
   * @returns {Object}
   */
  getPersistentAttributes : function()
  {
      var memento = this._super();

      // add all decorations to the memento
      //
      memento.labels = [];
      this.children.each(function(i,e){
          var labelJSON = e.figure.getPersistentAttributes();
          labelJSON.locator=e.locator.NAME;
          labelJSON.locatorX=e.locator.x;                         //STORE INFORMATION ABOUT TUNNEL POSITION X
          labelJSON.locatorY=e.locator.y;                         //STORE INFORMATION ABOUT TUNNEL POSITION Y

          memento.labels.push(labelJSON);
      });

      return memento;
  },

  /**
   * @method
   * Read all attributes from the serialized properties and transfer them into the shape.
   *
   * @param {Object} memento
   * @returns
   */
  setPersistentAttributes : function(memento)
  {
      this._super(memento);

      // remove all decorations created in the constructor of this element
      //
      this.resetChildren();

      // and add all children of the JSON document.
      $.each(memento.labels, $.proxy(function(i,json){

          //FOR TUNNELS THERE IS NEEDED FOR THEIR RESTORE ALSO READ LOCATORS POSITION which is stored in previous function getPers...
          curDatatype = json.type;
          if (curDatatype.toLowerCase().search("tunnel") > -1){
            var msg = JSON.stringify(json);
            //alert("tunnel:" + msg);
          }

          /*
           *  REALLY IMPORTANT TO LOAD FROM FILE TUNNELS WITH SAME id AS THEY WERE SAVED, because port names for tunnels contains tunnel id and that name is stored also in wire endpoints also
           */
          if (json.id){
            var figure =  eval("new "+json.type+"({id:'" + json.id + "'})");                                 // create the figure stored in the JSON
          }else{
            var figure =  eval("new "+json.type+"()");                                 // create the figure stored in the JSON
          }
          figure.attr(json);                                                                            // apply all attributes
          var locator =  eval("new "+json.locator+"(" + json.locatorX + "," + json.locatorY + ")");     // instantiate the locator

          this.add(figure, locator);                                                                    // add the new figure as child to this figure
      },this));
  },

  getTunnelPort: function(portName, tunnelId){
    this.getInputPorts().each(functions);
    //if no results look for children tunnels port
    if (portObj == null){
        this.getChildren().each(function(childIndex, childObj){
          if (childObj.getParent().getId().toLowerCase().search(tunnelId.toLowerCase())){               //compare tunnelId and all loops input ports tunnels parents IDs
            portObj = childObj;
          }
        });
    }

    return portObj;
  },

  /**
   * @method getVisibleLoopAndMultilayered
   * @description Return all loops and multilayered objects from all nested loops and multilayered objects.
   * @returns {draw2d.util.ArrayList}
   */
   getVisibleLoopAndMultilayered: function(){
       let structureObj = this;
       // console.log(`--> ${structureObj.getId()}`);

       let loopAndMultilayeredList = new draw2d.util.ArrayList();

       //loop
       let currentAssignedFiguresList = new draw2d.util.ArrayList();
       if (
           (typeof structureObj.isLoop === "function" && structureObj.isLoop() === true)
       ){
           loopAndMultilayeredList.push(structureObj);
           currentAssignedFiguresList = structureObj.getAssignedFigures();
       }

       //multilayered
       if (
           (typeof structureObj.isMultilayered === "function" && structureObj.isMultilayered() === true)
       ){
           loopAndMultilayeredList.push(structureObj);

           //TODO: There is some error with loading multilayered structure, probably layerChooser is wrong renewd what causing error, this will stop everything
           //so in error case return empty arraylist
           try{
               currentAssignedFiguresList = structureObj.getActiveLayer().getAssignedFigures();
           }catch(e){
               console.warn(`--> TODO: Following is error, needs to be repaired, look into code for comment! (object id: ${structureObj.getId()})`);
               console.error(e);
               return loopAndMultilayeredList;
           }
       }

       currentAssignedFiguresList.each(function (nestedFigureIndex, nestedLayerFigureObj) {
           if (
               typeof nestedLayerFigureObj.getVisibleLoopAndMultilayered === "function"
           ) {
               //recursive call to add all nested multilayered figures
               loopAndMultilayeredList.addAll(nestedLayerFigureObj.getVisibleLoopAndMultilayered());
           }
       });

     return loopAndMultilayeredList;
   },

  /**
   * @name bringsAllTunnelsToFront
   * @description Brings all tunnels owned by structure to front, tunnels are owned by Multilayer structure not by layers, so they are common for all layers and always should be displayed at front of structure to be visible. But wires which go from tunnel to particular layer are owned by that layer.
   */
  bringsAllTunnelsToFront: function(){
    this.getChildren().each(function(childIndex, childObj){
      if (typeof childObj.isTunnel === "function" && childObj.isTunnel() === true) {
        childObj.toFront();
      }
    });
  },
  bringsAllTunnelsToBack: function () {
    this.getChildren().each(function (childIndex, childObj) {
      if (typeof childObj.isTunnel === "function" && childObj.isTunnel() === true) {
        childObj.toBack();
      }
    });
  },

  getActiveLayer: function(){
  	return this;
  },

  /*
   *    This event is called when figure is dropped on layer.
   */
  onCatch(droppedFigure, x, y, shiftKey, ctrlKey){
    //run super() or continue just in case there is not dropped tunnel inside layer, tunnel is possible to move
    if (droppedFigure.NAME.toLowerCase().search('tunnel') == -1){
      this._super(droppedFigure, x, y, shiftKey, ctrlKey);
    }
  },

  /*
   *    This event is called when figure is dragged out of layer.
   */
  onDragLeave: function(draggedFigure){
    if (draggedFigure.getComposite()){
      draggedFigure.getComposite().unassignFigure(draggedFigure);
    }
  },
 
  symbolPicture: " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABSCAIAAABBpbS2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAGSSURBVHhe7dw/SwJxHMdxUfyHwyG4hSL0QBxtaxAdBIXWpp5A2z2Lc2lxcQ7aFHKwVdpuiWaDzClL6iP+Og4hiuuG++X7zXdSvOP74tBz0NT64IMAAggUBBBAoCD4BcFg8G71+P6b2eSbfiBYrVbt9kO1uqzVNjZOKvURnWAymbRa3aOvms3T0Wj0bFXz+Ut0As/ztHa5fJHP32Yyj7ncneNc6hHXdc3hbSg6wXQ61bal0pVeH55i8VqPD4dDc4bEF52g1zurVM7DywfjOG6jcWLOkPiiE9Trx4XCTXjzYLLZe10Ivu+bkyS7iASLxUJLatXw5sGk00s9O5vNzEmSHVcB7wV/IeATYduh3xfsGo/HB313GLT7jtDpPJmjWlU8BKrf33S7r+aoVgUBBBAoCCCAQEEAAQQKAgggUBBAAIGCAAIIFAQQQKAggAACBQEEECgIIIBAQQABBAoCCCBQEEAAgYIAAggUBBBAoCCAAAIVJ8Hez8EtmngI9v4OwLqJgeDfBwEEECgIIIBAQQDBev0J+WznB2v5Ek4AAAAASUVORK5CYII=",

  /*
   *    TODO this function must be RECURSIVE DUE THERE COULD BE OTHER LOOP OR MULTILAYERED NODES INSIDE LAYER
   *        ALREADY DONE THERE BUT NEEDS TO BE VALIDATED
   */
  getSubNodesWithDiagramInside: function(alreadyTraversedBlocksArray = new draw2d.util.ArrayList()){
      let subnodesWithDiagramInside = new draw2d.util.ArrayList();
      this.getAssignedFigures().each(function(childIndex, childObj){

          /*
           *    Check for nodes with schematic inside (user defined nodes with diagram)
           *        directly add to list to be transcripted
           */
          if (childObj.jsonDocument !== undefined && childObj.jsonDocument.length > 0 && !alreadyTraversedBlocksArray.contains(childObj.NAME)){
              subnodesWithDiagramInside.push(childObj);
          }

          /*
           *    Check if there are some composition nodes with diagram inside and trigger their function to obtain other blocks which needs to be transcripted
           *        this is for loops and multilayered nodes
           */
          if (typeof childObj.getSubNodesWithDiagramInside == "function"){
              let nodeObjChildrenWithDiagram = childObj.getSubNodesWithDiagramInside(alreadyTraversedBlocksArray);
              nodeObjChildrenWithDiagram.each(function(subnodeIndex, subnodeObj){
                  if (!alreadyTraversedBlocksArray.contains(subnodeObj.NAME) && subnodeObj.jsonDocument !== undefined && subnodeObj.jsonDocument.length > 0){
                      subnodesWithDiagramInside.push(subnodeObj);
                  }
              });
          }

      });
      return subnodesWithDiagramInside;
  },

  getBreakpointList: function(){
      return this.translateToCppCodeBreakpointList;
  },

  getWatchList: function(){
      return this.translateToCppCodeWatchList;
  },

  /**
   * @description Add watches for wires going OUT of this loop tunnels into watch list. Such wires have tunnel as source, not node,
   * so they are not found when going through nodes output ports (ie. left tunnel -> node inside loop, left tunnel -> nested loop
   * tunnel, right tunnel -> node after loop). Wire already in watch list is not added again.
   * @param {Object} funcParams - {leftTunnelsLineNumber, rightTunnelsLineNumber, parentId}
   */
  addTunnelWiresToWatchList: function(funcParams = {}){
      let loopObj = this;
      let leftTunnelsLineNumber = Object.hasOwn(funcParams, "leftTunnelsLineNumber") ? funcParams.leftTunnelsLineNumber : null;
      let rightTunnelsLineNumber = Object.hasOwn(funcParams, "rightTunnelsLineNumber") ? funcParams.rightTunnelsLineNumber : null;
      let parentId = Object.hasOwn(funcParams, "parentId") ? funcParams.parentId : null;

      let alreadyInList = (wireObj) => loopObj.translateToCppCodeWatchList.asArray().some((watchObj) => watchObj.objectId === wireObj.getId());

      this.getChildren().each(function(childIndex, childObj){
          let childName = childObj.NAME.toLowerCase();
          let isLeftTunnel = childName.search("lefttunnel") > -1;
          let isRightTunnel = childName.search("righttunnel") > -1;
          if (!isLeftTunnel && !isRightTunnel) return;

          childObj.getOutputPort(0).getConnections().each(function(wireIndex, wireObj){
              if (!(wireObj.getUserData() && wireObj.getUserData().isSetWatch)) return;
              if (alreadyInList(wireObj)) return;
              loopObj.translateToCppCodeWatchList.add({
                  lineNumber: isLeftTunnel ? leftTunnelsLineNumber : rightTunnelsLineNumber,
                  objectId: wireObj.getId(),
                  objectVariableName: wireObj.getVariableName(),
                  type: "wire",
                  parentId: parentId,
                  parentName: null
              });
          });
      });
  },

  /*****************************************************************************************************************************************************
   *    TRANSLATE TO C/C++ functions
   *****************************************************************************************************************************************************/

  translateToCppCodeImport: function(){
      return this.translateToCppCodeImportArray;
  },

  translateToCppCode: function(){
    this.getUserData().wasTranslatedToCppCode = true;

    var cCode = "";
    cCode += "/*********** LOOP C/C++ code ***********/\n";
    return cCode;
  },

  /*
   *  ASSIGNMENTS VALUES FROM RIGHT TUNNELS TO CONNECTED WIRES
   */
  translateToCppCodePost: function(){
    cCode = '';
    this.getChildren().each(function(childIndex, childObj){
        if (childObj.NAME.toLowerCase().search('righttunnel') > -1){
            childObj.getOutputPort(0).getConnections().each(function(connectionIndex, connectionObj){
                cCode += connectionObj.getVariableName() + " = " + connectionObj.getSource().getParent().getVariableName() + ";\n";
            });
        }
    });
    return cCode;
  },

  /*
   *  TUNNELS DECLARATION
   */
  getTunnelsDeclarationCppCode:function(funcParams){
    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;

    /*
     *  TODO: ERROR: If there is no translator object it means somewhere happened error and it was not passed, needs to be corrected in code.
     */
    if (translatorObj === null){
        //for now put error message into console since this is error and need to be repaired
        console.error(`${this.NAME} > getTunnelsDeclarationCppCode(...) > No translatorObj, it is null, needs to be checked!`);
    }

    cCode = "";
    cCode += "/* LEFT TUNNELs declarations */\n";
    cCode += "//tunnel declaration, if connected to wire also assignement\n";


    this.getChildren().each(function(childIndex, childObj){
      /*
       *    LEFT TUNNEL declaration
       */
      if (childObj.NAME.toLowerCase().search("lefttunnel") > -1){
        /*
         * if tunnel connected on its input its datatype is based on first connection with index 0
         */
        if (childObj.getInputPort(0).getConnections().getSize() > 0){
          cCode += childObj.getDatatype() + " " + childObj.getVariableName() + " = " + childObj.getInputPort(0).getConnections().get(0).getVariableName() + ";\n";
        }else{
          cCode += childObj.getDatatype() + " " + childObj.getVariableName() + ";\n";
        }

        /*
         *  Add ID into list of all IDs
         *      TODO: Check if there is no translatorObj since because then it's really strange, during translation process it has to be always available!
         */
        if (translatorObj !== null){
          translatorObj.translateToCppCodeAdditionalId.add(childObj.getId());
          translatorObj.translateToCppCodeAdditionalIdNoHyphen.add(childObj.getId().replaceAll('-', ''));
        }
      }

      /*
       *    RIGHT TUNNEL declaration
       *    These tunnels create just declaration and their values are assigned inside each layers where wire is going out of structure.
       *    
       *    THIS IS NOT NEEDED because wires going out of tunnel are declared and wries going into tunnel are declared, so in the end of each loop
       *    there is assignment to output wires from input wires and tunnel variable is NOT NEEDED!
       */
      //cCode += "/* RIGHT TUNNELs declarations */\n";
      //if (childObj.NAME.toLowerCase().search("righttunnel") > -1){
      //    cCode += childObj.getDatatype() + " " + childObj.getVariableName() + ";\n";
      //}

    });
    cCode += "/* END LEFT TUNNELs declarations */\n";

    /*
     *  Create feedback nodes declarations.
     */
    this.getAssignedFigures().each(function(figureIndex, figureObj){
        if (figureObj.NAME.toLowerCase().search("feedbacknode") > -1){
            cCode += figureObj.translateToCppCodeDeclaration();
        }
    });

      return cCode;
  },

  /**
   *  @description THIS HERE WAS FIRST DEVELOPED FOR GraphLang_Jailhouse.js, copied here
   *  THIS WILL ALSO INTERNALLY REORDER NODES BASED ON THEIR EXECUTION ORDER and stayed like that
   */
  sortAssignedFiguresByExecutionOrderPermanently: function(){
      let layerFigures = this.getAssignedFigures();
      layerFigures.sort(function(figureA, figureB){
          let execOrderA = figureA.getUserData() && figureA.getUserData().executionOrder ? figureA.getUserData().executionOrder : -1;
          let execOrderB = figureB.getUserData() && figureB.getUserData().executionOrder ? figureB.getUserData().executionOrder : -1;
          return execOrderA - execOrderB;
      });
  },

  /*
   *  WIRES INSIDE LOOP DECLARATION
   */
 getWiresInsideLoopDeclarationCppCode:function(funcParams){
    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;
    let lineNumberToFind = Object.hasOwn(funcParams, "lineNumberToFind") ? funcParams.lineNumberToFind : null;

    let cCode = "";
    cCode += "//inside loop wires declaration\n";

    //sort nodes by execution order
    this.sortAssignedFiguresByExecutionOrderPermanently();

  	allConnections = new draw2d.util.ArrayList();
    allFeedbackNodes = new draw2d.util.ArrayList();
  	thisId = this.getComposite();

    /*
     *  Add wires connected to direct children figure TO THEIR INPUT PORTS
     */
    let layerFigures = this.getAssignedFigures();
    layerFigures.each(function(figureIndex, figureObj){
        if (figureObj.getPorts){
            if (figureObj.NAME.toLowerCase().search('loop') == -1 && figureObj.NAME.toLowerCase().search('tunnel') == -1){
                figureObj.getInputPorts().each(function(inputPortIndex, inputPortObj){
                    allConnections.addAll(inputPortObj.getConnections());				//adding conenction into list of top most connections on canvas
                });
            }else{
                //if loop is found, then it's going to iterate over it's children left tunnels and add connections to their input ports
                if (figureObj.NAME.toLowerCase().search('loop') > -1){

                    //add left tunnels connections
                    figureObj.getChildren().each(function(childIndex, childObj){
                        if (childObj.NAME.toLowerCase().search('lefttunnel') > -1){
                            allConnections.addAll(childObj.getInputPort(0).getConnections());	//adding conenction into list of top most connections on canvas
                        }
                    });

                    //add loop input port connections, similar like for other nodes - for now it's for forLoop iteration terminal output mostly
                    //tunnel ports are also in loop ports list, skip them: left tunnels are added above and right tunnel inputs
                    //are wires inside nested loop which are declared by nested loop itself (otherwise wires are declared twice)
                    let tunnelPortNames = [];
                    figureObj.getChildren().each(function(childIndex, childObj){
                        if (childObj.NAME.toLowerCase().search('tunnel') > -1 && childObj.getPorts){
                            childObj.getPorts().each(function(tunnelPortIndex, tunnelPortObj){ tunnelPortNames.push(tunnelPortObj.getName()); });
                        }
                    });
                    figureObj.getInputPorts().each(function(portIndex, portObj){
                        if (portObj && tunnelPortNames.indexOf(portObj.getName()) == -1){
                            allConnections.addAll(portObj.getConnections());
                        }
                    });
                }
            }
        }

        /*
         *  Add ID into list of all IDs
         */
        translatorObj.translateToCppCodeAdditionalId.add(figureObj.getId());
        translatorObj.translateToCppCodeAdditionalIdNoHyphen.add(figureObj.getId().replaceAll('-', ''));
    });

    /*
     *  Add wires connected to input port of righttunnel
     */
    this.getChildren().each(function(childIndex, childObj){
        if (childObj.NAME.toLowerCase().search("righttunnel") > -1){
            allConnections.addAll(childObj.getInputPort(0).getConnections());	//adding connection into list of top most connections on canvas
        }
    });

    /*
     *  Generate wires declaration.
     */
    let declaredConnections = new draw2d.util.ArrayList();
  	allConnections.each(function(connectionIndex, connectionObj){
        //each wire is declared just once
        if (declaredConnections.contains(connectionObj)) return;
        declaredConnections.add(connectionObj);

        let datatypeStr = "";
        let datatypeStr_orig = connectionObj.getSource().userData.datatype;
        //if (connectionObj.getSource().getDatatype) datatypeStr = connectionObj.getSource().getDatatype();    //use getDatatype function if available

        try {
            // datatypeStr = connectionObj.getSource().getParent().getDatatype();    //use getDatatype function if available
            let sourceParent = connectionObj.getSource().getParent();
            if (sourceParent && sourceParent.NAME.toLowerCase().search('tunnel') > -1 && sourceParent.getDatatype && sourceParent.getDatatype()){
                datatypeStr = sourceParent.getDatatype();                            //tunnel datatype is evaluated from wire connected to its input
            }else{
                datatypeStr = connectionObj.getSource().getDatatype();               //this is better as each port have function to return datatype
            }
        }catch(e){
            datatypeStr = datatypeStr_orig;
        }
        if (datatypeStr == "") datatypeStr = datatypeStr_orig;

        cCode += datatypeStr + " " + connectionObj.getVariableName() + ";\n";

        //if searching for object which generates line try it here for wires
        if (lineNumberToFind !== null && translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null){
            //TODO: Need to check that +1 if really it's correct
            if (GraphLang.Utils.getLineCount(cCode) >= lineNumberToFind + 1) translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = connectionObj;
        }
    });

    return cCode;
 },
    
   /*
    * LEFT TUNNEL LOOP WIRES INPUT ASSIGNEMENTS
    */
  getLeftTunnelsWiresAssignementCppCode:function(funcParams){
    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;
    let lineNumberToFind = Object.hasOwn(funcParams, "lineNumberToFind") ? funcParams.lineNumberToFind : null;

    let cCode = "";
    this.getChildren().each(function(childIndex, childObj){
     if (childObj.NAME.toLowerCase().search("lefttunnel") > -1){
       if (childObj.getOutputPort(0).getConnections().getSize() > 0){
         childObj.getOutputPort(0).getConnections().each(function(connectionIndex, connectionObj){

           cCode += connectionObj.getVariableName() + " = " + childObj.getVariableName() + ";\n";

           //if searching for object which generates line try it here for wires
           if (lineNumberToFind !== null && translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null){
               //TODO: Need to check that +1 if really it's correct
               if (GraphLang.Utils.getLineCount(cCode) >= lineNumberToFind + 1) translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = connectionObj;
           }

         });
       }
     }
    });
    return cCode;
  },

  /*
   * RIGHT TUNNEL ASSIGNEMENTS OUTPUT
   *  copy value of wire at left side to the wire at right side
   *  ERROR this is WRONG for multilayered structure when there is more than one input into output tunnel
   */
  getRightTunnelsAssignementOutputCppCode:function(funcParams){
    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;
    let lineNumberToFind = Object.hasOwn(funcParams, "lineNumberToFind") ? funcParams.lineNumberToFind : null;

    let cCode = "";
    this.getChildren().each(function(childIndex, childObj){
      if (childObj.NAME.toLowerCase().search("righttunnel") > -1){
        if (childObj.getOutputPort(0).getConnections().getSize() > 0){

          cCode += childObj.getOutputPort(0).getConnections().get(0).getVariableName() + " = " + childObj.getInputPort(0).getConnections().get(0).getVariableName() + ";\n";

          //if searching for object which generates line try it here for wires
          if (lineNumberToFind !== null && translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null){
              //TODO: Need to check that +1 if really it's correct
              if (GraphLang.Utils.getLineCount(cCode) >= lineNumberToFind + 1) translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = connectionObj;
          }

        }
      }
    });
    return cCode;
  },
  
  /*****************************************************************************************************************************************************
   *    TRANSLATE TO Python functions
   *****************************************************************************************************************************************************/ 

  /**
   *  @description Python code import statements collected from nodes inside loop during translateToPythonCode().
   */
  translateToPythonCodeImport: function(){
      if (!this.translateToPythonCodeImportArray) this.translateToPythonCodeImportArray = new draw2d.util.ArrayList();
      return this.translateToPythonCodeImportArray;
  },

  /**
   *  @description Python breakpoints list filled during translateToPythonCode(), separate from C++ list.
   */
  getPythonBreakpointList: function(){
      if (!this.translateToPythonCodeBreakpointList) this.translateToPythonCodeBreakpointList = new draw2d.util.ArrayList();
      return this.translateToPythonCodeBreakpointList;
  },

  /**
   *  @description Python watch list filled during translateToPythonCode(), separate from C++ list.
   */
  getPythonWatchList: function(){
      if (!this.translateToPythonCodeWatchList) this.translateToPythonCodeWatchList = new draw2d.util.ArrayList();
      return this.translateToPythonCodeWatchList;
  },

  /**
   *  @description Clear python lists before loop is translated.
   */
  initPythonTranslateBuffers: function(){
      this.translateToPythonCodeImport().clear();
      this.getPythonBreakpointList().clear();
      this.getPythonWatchList().clear();
  },

  /**
   * RIGHT TUNNEL ASSIGNMENTS OUTPUT, copy value of wire inside loop to the wire outside loop, python code (not indented)
   */
  getRightTunnelsAssignementOutputPythonCode:function(funcParams = {}){
    let pythonCode = "";
    this.getChildren().each(function(childIndex, childObj){
      if (childObj.NAME.toLowerCase().search("righttunnel") > -1){
        if (childObj.getOutputPort(0).getConnections().getSize() > 0 && childObj.getInputPort(0).getConnections().getSize() > 0){
          let inputWireName = childObj.getInputPort(0).getConnections().get(0).getVariableName();
          childObj.getOutputPort(0).getConnections().each(function(connectionIndex, connectionObj){
            pythonCode += connectionObj.getVariableName() + " = " + inputWireName + "\n";
          });
        }
      }
    });
    return pythonCode;
  },

  /**
   * LEFT TUNNEL LOOP WIRES INPUT ASSIGNMENTS, python code (not indented)
   */
  getLeftTunnelsWiresAssignementPythonCode:function(funcParams = {}){
    let pythonCode = "";
    this.getChildren().each(function(childIndex, childObj){
      if (childObj.NAME.toLowerCase().search("lefttunnel") > -1){
        childObj.getOutputPort(0).getConnections().each(function(connectionIndex, connectionObj){
          pythonCode += connectionObj.getVariableName() + " = " + childObj.getVariableName() + "\n";
        });
      }
    });
    return pythonCode;
  },

  /**
   * LEFT TUNNELS DECLARATION, python code (not indented), not connected tunnel is None
   */
  getTunnelsDeclarationPythonCode:function(funcParams = {}){
    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;

    let pythonCode = "";
    pythonCode += "# LEFT TUNNELs declarations\n";
    this.getChildren().each(function(childIndex, childObj){
      if (childObj.NAME.toLowerCase().search("lefttunnel") > -1){
        let datatypeStr = childObj.getDatatype ? childObj.getDatatype() : "";
        let datatypeComment = datatypeStr ? `  # ${datatypeStr}` : "";
        if (childObj.getInputPort(0).getConnections().getSize() > 0){
          pythonCode += childObj.getVariableName() + " = " + childObj.getInputPort(0).getConnections().get(0).getVariableName() + datatypeComment + "\n";
        }else{
          pythonCode += childObj.getVariableName() + " = None" + datatypeComment + "\n";
        }
        if (translatorObj !== null && translatorObj.addAdditionalId) translatorObj.addAdditionalId(childObj.getId());
      }
    });

    /*
     *  Feedback nodes declarations.
     */
    this.getAssignedFigures().each(function(figureIndex, figureObj){
        if (figureObj.NAME.toLowerCase().search("feedbacknode") > -1 && figureObj.translateToPythonCodeDeclaration){
            pythonCode += figureObj.translateToPythonCodeDeclaration({translatorObj: translatorObj});
        }
    });

    return pythonCode;
  },

  /**
   * WIRES INSIDE LOOP DECLARATION, python code (not indented), each wire is set to None, same wires as in getWiresInsideLoopDeclarationCppCode()
   */
  getWiresInsideLoopDeclarationPythonCode:function(funcParams = {}){
    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;

    let pythonCode = "# inside loop wires declaration\n";
    this.sortAssignedFiguresByExecutionOrderPermanently();

    let allConnections = new draw2d.util.ArrayList();
    this.getAssignedFigures().each(function(figureIndex, figureObj){
        if (figureObj.getPorts){
            if (figureObj.NAME.toLowerCase().search('loop') == -1 && figureObj.NAME.toLowerCase().search('tunnel') == -1){
                figureObj.getInputPorts().each(function(inputPortIndex, inputPortObj){
                    allConnections.addAll(inputPortObj.getConnections());
                });
            }else if (figureObj.NAME.toLowerCase().search('loop') > -1){
                //nested loop: left tunnels input wires and loop own input ports (iteration terminal), not tunnel ports
                let tunnelPortNames = [];
                figureObj.getChildren().each(function(childIndex, childObj){
                    if (childObj.NAME.toLowerCase().search('lefttunnel') > -1){
                        allConnections.addAll(childObj.getInputPort(0).getConnections());
                    }
                    if (childObj.NAME.toLowerCase().search('tunnel') > -1 && childObj.getPorts){
                        childObj.getPorts().each(function(tunnelPortIndex, tunnelPortObj){ tunnelPortNames.push(tunnelPortObj.getName()); });
                    }
                });
                figureObj.getInputPorts().each(function(portIndex, portObj){
                    if (portObj && tunnelPortNames.indexOf(portObj.getName()) == -1){
                        allConnections.addAll(portObj.getConnections());
                    }
                });
            }
        }
        if (translatorObj !== null && translatorObj.addAdditionalId) translatorObj.addAdditionalId(figureObj.getId());
    });

    //wires connected to input port of right tunnel
    this.getChildren().each(function(childIndex, childObj){
        if (childObj.NAME.toLowerCase().search("righttunnel") > -1){
            allConnections.addAll(childObj.getInputPort(0).getConnections());
        }
    });

    let declaredConnections = new draw2d.util.ArrayList();
    allConnections.each(function(connectionIndex, connectionObj){
        if (declaredConnections.contains(connectionObj)) return;
        declaredConnections.add(connectionObj);
        if (translatorObj !== null && translatorObj.getWireDeclarationPythonCode){
            pythonCode += translatorObj.getWireDeclarationPythonCode(connectionObj);
        }else{
            pythonCode += connectionObj.getVariableName() + " = None\n";
        }
    });

    return pythonCode;
  },

  /**
   * @description Translate nodes assigned to loop into python code (NOT INDENTED, caller indents it as loop body). Also fills python breakpoint and watch list.
   * @param {Object} funcParams - {codeLinesOffset, compileErrorLines, breakpointParentId, translatorObj, nodeName}
   * @param {number} bodyStartLine - number of lines generated by loop before body code starts, used to compute breakpoints line numbers
   * @returns {string} python code
   */
  translateAssignedFiguresToPythonCode: function(funcParams = {}, bodyLinesBefore = 0){
    let loopObj = this;
    let codeLinesOffset = Object.hasOwn(funcParams, "codeLinesOffset") ? funcParams.codeLinesOffset : 0;
    let compileErrorLines = Object.hasOwn(funcParams, "compileErrorLines") ? funcParams.compileErrorLines : null;
    let breakpointParentId = Object.hasOwn(funcParams, "breakpointParentId") ? funcParams.breakpointParentId : null;
    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;
    let nodeName = Object.hasOwn(funcParams, "nodeName") ? funcParams.nodeName : "";

    //imports of nodes inside loop go directly into translator list, loop imports are asked by translator before loop is translated
    let importArray = translatorObj !== null && translatorObj.translateToPythonCodeImportArray ? translatorObj.translateToPythonCodeImportArray : this.translateToPythonCodeImport();
    let breakpointList = this.getPythonBreakpointList();
    let watchList = this.getPythonWatchList();

    let pythonCode = "";
    let currentAbsoluteLine = () => codeLinesOffset + bodyLinesBefore + GraphLang.Utils.getLineCount(pythonCode);

    this.sortAssignedFiguresByExecutionOrderPermanently();
    this.getAssignedFigures().each(function(figIndex, figObj){
      if (figObj.NAME.search('HoverConnection') > -1 || figObj.NAME.toLowerCase().search('connection') > -1) return;    //wires are declared above

      //import statements
      if (figObj.translateToPythonCodeImport && translatorObj !== null){
        translatorObj.collectStrings(figObj.translateToPythonCodeImport(), importArray);
      }

      //type definitions
      if (figObj.translateToPythonCodeTypeDefinition && translatorObj !== null){
        translatorObj.translateToPythonCodeTypeDefinitionArray.push(figObj.translateToPythonCodeTypeDefinition({translatorObj: translatorObj}));
        if (figObj.getDatatype && String(figObj.getDatatype()).startsWith("clusterDatatype_")) {
          translatorObj.typeDefinitionUsedList.push(`${nodeName} -> ${figObj.getNodeLabelText()}`);
        }
      }

      let nodeStartLine = currentAbsoluteLine() + 1;

      //declaration
      if (figObj.translateToPythonCodeDeclaration && figObj.NAME.toLowerCase().search("feedbacknode") == -1){
        pythonCode += figObj.translateToPythonCodeDeclaration({translatorObj: translatorObj});
      }

      //code
      let lineCountBefore = GraphLang.Utils.getLineCount(pythonCode);
      if (figObj.translateToPythonCode){
        pythonCode += figObj.translateToPythonCode({
          nodeId: figObj.getId(),
          codeLinesOffset: codeLinesOffset + bodyLinesBefore + lineCountBefore,
          compileErrorLines: compileErrorLines,
          breakpointParentId: breakpointParentId,
          translatorObj: translatorObj,
          nodeName: nodeName
        });
      }else if (!figObj.translateToPythonCodeDeclaration){
        pythonCode += `# ERROR: node "${figObj.NAME}" has no python translation (translateToPythonCode() not defined)\n`;
      }
      if (pythonCode.length > 0 && !pythonCode.endsWith("\n")) pythonCode += "\n";

      GraphLang.Utils.errorLinesObjectAssignSourceCanvasObject({
        inputStr: pythonCode,
        startLine: lineCountBefore,
        errorLines: compileErrorLines,
        lineOffset: codeLinesOffset + bodyLinesBefore,
        errorSourceObj: figObj
      });

      //breakpoint on node, first line of node code
      if (figObj.getUserData() && figObj.getUserData().isSetBreakpoint){
        breakpointList.add({lineNumber: nodeStartLine, objectId: figObj.getId(), type: "node", parentId: breakpointParentId, parentName: loopObj.NAME});
      }

      //nested structure breakpoints and watches, their line numbers are already absolute
      if (figObj.getPythonBreakpointList) breakpointList.addAll(figObj.getPythonBreakpointList());
      if (figObj.getPythonWatchList) watchList.addAll(figObj.getPythonWatchList());

      //post code (ie. nested loop end), nested loop post code is inside nested loop therefore it's indented same as nested loop body
      if (figObj.translateToPythonCodePost){
        pythonCode += figObj.translateToPythonCodePost({translatorObj: translatorObj});
        if (pythonCode.length > 0 && !pythonCode.endsWith("\n")) pythonCode += "\n";
      }

      //breakpoints and watches on wires going out of node, value is available on line after node code
      if (figObj.getOutputPorts){
        figObj.getOutputPorts().each(function(portIndex, portObj){
          portObj.getConnections().each(function(wireIndex, wireObj){
            let wireLine = currentAbsoluteLine() + 1;
            if (wireObj.getUserData() && wireObj.getUserData().isSetBreakpoint){
              breakpointList.add({lineNumber: wireLine, objectId: wireObj.getId(), objectVariableName: wireObj.getVariableName(), type: "wire", parentId: breakpointParentId, parentName: null});
            }
            if (wireObj.getUserData() && wireObj.getUserData().isSetWatch){
              watchList.add({lineNumber: wireLine, objectId: wireObj.getId(), objectVariableName: wireObj.getVariableName(), type: "wire", parentId: breakpointParentId, parentName: null});
            }
          });
        });
      }
    });

    return pythonCode;
  },

  /**
   * @description Watches on wires going out of tunnels (source is tunnel, not node), python version of addTunnelWiresToWatchList().
   */
  addTunnelWiresToPythonWatchList: function(funcParams = {}){
      let watchList = this.getPythonWatchList();
      let leftTunnelsLineNumber = Object.hasOwn(funcParams, "leftTunnelsLineNumber") ? funcParams.leftTunnelsLineNumber : null;
      let rightTunnelsLineNumber = Object.hasOwn(funcParams, "rightTunnelsLineNumber") ? funcParams.rightTunnelsLineNumber : null;
      let parentId = Object.hasOwn(funcParams, "parentId") ? funcParams.parentId : null;

      this.getChildren().each(function(childIndex, childObj){
          let childName = childObj.NAME.toLowerCase();
          let isLeftTunnel = childName.search("lefttunnel") > -1;
          let isRightTunnel = childName.search("righttunnel") > -1;
          if (!isLeftTunnel && !isRightTunnel) return;

          childObj.getOutputPort(0).getConnections().each(function(wireIndex, wireObj){
              if (!(wireObj.getUserData() && wireObj.getUserData().isSetWatch)) return;
              if (watchList.asArray().some((watchObj) => watchObj.objectId === wireObj.getId())) return;
              watchList.add({
                  lineNumber: isLeftTunnel ? leftTunnelsLineNumber : rightTunnelsLineNumber,
                  objectId: wireObj.getId(),
                  objectVariableName: wireObj.getVariableName(),
                  type: "wire",
                  parentId: parentId,
                  parentName: null
              });
          });
      });
  }


});
