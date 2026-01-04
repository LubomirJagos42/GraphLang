GraphLang.Shapes.Basic.Loop2.ForLoop = GraphLang.Shapes.Basic.Loop2.extend({
  NAME: "GraphLang.Shapes.Basic.Loop2.ForLoop",
  init:function(attr, setter, getter)
  {
    this._super( $.extend({color: "#0000FF"},attr), setter, getter);
    var port;

    //port is little pushed to the left, connected wire is thne not crossing loop border and tunnel is not generated
    port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-0.7, 10));
    port.setConnectionDirection(3);
    port.setBackgroundColor("#0000FF");
    port.setName("iterationTerminal");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = "int";

    this.iterationTerminal = port;

    port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(2, 10));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#0000FF");
    port.setName("iterationTerminalOutput");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = "int";

    this.iterationTerminalOutput = port;

    this.userData = {};
    this.userData.executionOrder = 1;
    this.userData.wasTranslatedToCppCode = false;
    this.userData.isLoop = true;

    this.persistPorts=false;    /*??what's this??*/
  },

  /*
   *    This event is called when figure is dropped on layer.
   */
  onCatch(droppedFigure, x, y, shiftKey, ctrlKey){
    //run super() or continue just in case there is not dropped tunnel inside layer, tunnel is possible to move
    if (droppedFigure.NAME.toLowerCase().search('tunnel') == -1){
      this._super(droppedFigure, x, y, shiftKey, ctrlKey);
      if (droppedFigure.getComposite() && droppedFigure.getComposite().getId() == this.getId()){
        //alert('no layer change')
      }else{
        //alert('new layer assignment')
        droppedFigure.getPorts().each(function(portIndex, portObj){
          portObj.getConnections().each(function(connectionIndex, connectionObj){
            GraphLang.Utils.detectTunnels2(droppedFigure.getCanvas(), connectionObj);
          });
        });
      }
    }
  },

  /**
   * @method setPersistentAttributes
   * @descritpiton Read all attributes from the serialized properties and transfer them into the shape.
   * This is used when file is lOADED.
   *
   * @param {Object} memento
   */
  setPersistentAttributes : function(memento)
  {
      mementoPorts = memento.ports;   //taking ports out, because there is creation of them in parent and I want to create them in my way
      mementoLabels = memento.labels; //taking labels away

      memento.ports = [];
      memento.labels = [];
      this._super(memento);           //CALLING PARENT METHOD, these will rerecreate this showSelectedObjExecutionOrder

      // remove all decorations created in the constructor of this element
      //
      this.resetChildren();

      // and add all children of the JSON document.
      $.each(mementoLabels, $.proxy(function(i,json){

          //FOR TUNNELS THERE IS NEEDED FOR THEIR RESTORE ALSO READ LOCATORS POSITION which is stored in previous function getPers...
          curDatatype = json.type;


          /*
           *  HERE IS REALLY IMPORTANT TO SET SAME ID TO TUNNEL AS IT WAS SAVED, it then creates ports for that tunnel with same id as from file and wires can be connected to that
           */
          var figure =  eval("new "+json.type+"({id: '" + json.id + "'})"); // create the figure stored in the JSON, SET SAME ID AS SAVED IN FILE, THIS IS IMPORTANT!!! (for tunnels, look at its init() function)
          figure.attr(json);

          if (json.locatorX != undefined && json.locatorY != undefined){
            var locator =  eval("new "+json.locator+"(" + json.locatorX + "," + json.locatorY + ")");     // instantiate the locator
          }else{
            var locator =  eval("new draw2d.layout.locator.XYAbsPortLocator(" + json.x + "," + json.y + ")"); //DEFAULT LOCATOR
          }

          this.add(figure, locator);                                                                    // add the new figure as child to this figure
      },this));
      
	//rerecreate iteration terminal
    port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-0.7, 10));
    port.setConnectionDirection(3);
    port.setBackgroundColor("#0000FF");
    port.setName("iterationTerminal");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = "int";

    this.iterationTerminal = port;

    port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(2, 10));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#0000FF");
    port.setName("iterationTerminalOutput");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = "int";
  },

  /*
   *  This is needed to load ports correctly for special hardwired ports like iteratorTerminal and iteratorTerminalOutput,
   *  since they are returned from overrided getPort function also connected wires are created correctly
   */
  getPort: function(name){
    //iterationTerminalOutput must be first since it contains also word 'iterationTerminal' therefore it's more specific and must be first to be evaluated
    if (name.indexOf('iterationTerminalOutput') > -1){
      return this.getOutputPort(name);
    }else if (name.indexOf('iterationTerminal') > -1){
      return this.getInputPort(name);
    }else{
      port = this._super(name); //THIS IS NOT RUNNING, TESTED
      return port;
    }
  },

  /*
   *  Modified function to provide input port to add also iteration terminal
   */
  getInputPorts: function(){
    let inputPortsList = this._super();
    inputPortsList.add(this.iterationTerminal);
    return inputPortsList;
  },

  /*
   *  Modified function to provide input port to add also iteration terminal output
   */
  getOutputPorts: function(){
    let outputPortsList = this._super();
    outputPortsList.add(this.iterationTerminalOutput);
    return outputPortsList;
  },

  symbolPicture: " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAABSCAIAAABBpbS2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAGSSURBVHhe7dw/SwJxHMdxUfyHwyG4hSL0QBxtaxAdBIXWpp5A2z2Lc2lxcQ7aFHKwVdpuiWaDzClL6iP+Og4hiuuG++X7zXdSvOP74tBz0NT64IMAAggUBBBAoCD4BcFg8G71+P6b2eSbfiBYrVbt9kO1uqzVNjZOKvURnWAymbRa3aOvms3T0Wj0bFXz+Ut0As/ztHa5fJHP32Yyj7ncneNc6hHXdc3hbSg6wXQ61bal0pVeH55i8VqPD4dDc4bEF52g1zurVM7DywfjOG6jcWLOkPiiE9Trx4XCTXjzYLLZe10Ivu+bkyS7iASLxUJLatXw5sGk00s9O5vNzEmSHVcB7wV/IeATYduh3xfsGo/HB313GLT7jtDpPJmjWlU8BKrf33S7r+aoVgUBBBAoCCCAQEEAAQQKAgggUBBAAIGCAAIIFAQQQKAggAACBQEEECgIIIBAQQABBAoCCCBQEEAAgYIAAggUBBBAoCCAAAIVJ8Hez8EtmngI9v4OwLqJgeDfBwEEECgIIIBAQQDBev0J+WznB2v5Ek4AAAAASUVORK5CYII=",

  translateToCppCode: function(funcParams = {}){
    let loopObj = this;

    let codeLinesOffset = Object.hasOwn(funcParams, "codeLinesOffset") ? funcParams.codeLinesOffset : 0;
    let compileErrorLines = Object.hasOwn(funcParams, "compileErrorLines") ? funcParams.compileErrorLines : null;
    let breakpointParentId = Object.hasOwn(funcParams, "breakpointParentId") ? funcParams.breakpointParentId : null;

    this.getUserData().wasTranslatedToCppCode = true;
    this.translateToCppCodeImportArray.clear();
    this.translateToCppCodeBreakpointList.clear();
    this.translateToCppCodeWatchList.clear();

    var cCode = "";
    var iterationCount = "/* forLoop iterationCount value */"
    var iterationTerminal = this.getInputPort("iterationTerminal");
    if (iterationTerminal.getConnections().getSize() > 0){
      iterationCount = iterationTerminal.getConnections().get(0).getVariableName(); //getting wire name connected to iteration terminal, how many times has this for loop go
    }

    var forLoopIteratorVariable = 'forLoopIterator_' + this.getId();

    cCode += this.getTunnelsDeclarationCppCode();
    cCode += this.getWiresInsideLoopDeclarationCppCode();
    cCode += "\n";
    cCode += "for (int " + forLoopIteratorVariable + " = 0; " + forLoopIteratorVariable + " < " + iterationCount + "; " + forLoopIteratorVariable+ "++){\n";
    cCode += "\t" + this.getLeftTunnelsWiresAssignementCppCode().replaceAll("\n", "\n\t");

    this.getOutputPort("iterationTerminalOutput").getConnections().each(function(wireIndex, wireObj){
      cCode += "\t" + wireObj.getVariableName() + " = " + forLoopIteratorVariable + ";\n";
    });

    /*  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     *          RECURSION CALL
     *  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     *
     *  - getAssignedFigures() will return nodes and ALSO CONNECTIONS
     */
    this.sortAssignedFiguresByExecutionOrderPermanently();  //sort nodes again, they are sorted in get internal wires, but that is not call all the time

    cCode += "/*code inside FOR LOOP */\n\n";
    this.getAssignedFigures().each(function(figIndex, figObj){
      //Getting import statements
      if (figObj.translateToCppCodeImport){
        if (typeof figObj.translateToCppCodeImport() === "string") loopObj.translateToCppCodeImportArray.push(figObj.translateToCppCodeImport());
        if (figObj.translateToCppCodeImport().each){
          figObj.translateToCppCodeImport().each(function(strIndex, strObj){
            if (typeof strObj === "string") loopObj.translateToCppCodeImportArray.push(strObj);
          });
        }
      }

      //Getting clusters and objects type definitions
      if (figObj.translateToCppCodeDeclaration && figObj.NAME.toLowerCase().search("feedbacknode") == -1) cCode += "\t" + figObj.translateToCppCodeDeclaration().replaceAll("\n", "\n\t");



      //TODO: This is copied from main translator to add type definitions inside loop to global space as they are just type definition and each has unique id in name therefore
      //      there is no name interference, for now it's copied and not validated on correct running program!!!
      /*
       *    Getting TYPE DEFINITION, ie. for clusters
       *      typeDefinitionUsedList   - stores already translated type definition nodes ie. cluster used in project
       *      typeDefinitionNeededList - stores typedefinition needed to be additionaly added due they are not used in project and need to be scanned from files
       *
       */
      if (figObj.translateToCppCodeTypeDefinition){
        translatorObj.translateToCppCodeTypeDefinitionArray.push(figObj.translateToCppCodeTypeDefinition());
        if (figObj.getDatatype && figObj.getDatatype().startsWith("clusterDatatype_")) {
          translatorObj.typeDefinitionUsedList.push(`${nodeName} -> ${figObj.getNodeLabelText()}`);
        }
      }
      if (
          (figObj.NAME.toLowerCase().search("constantnode") > -1 ||
              figObj.NAME.toLowerCase().search("pointerdatatypenode") > -1) &&
          figObj.getDatatype().toLowerCase().search("clusterdatatype") > -1 &&
          !translatorObj.typeDefinitionUsedList.contains(figObj.getText())
      ){
        translatorObj.typeDefinitionNeededList.add(figObj.getText());
      }





      //HERE C/C++ code line is generated
      let lineCountBefore = GraphLang.Utils.getLineCount(cCode);

      if (figObj.translateToCppCode){
        cCode += figObj.translateToCppCode({
          nodeId: figObj.getId(),
          codeLinesOffset: codeLinesOffset + lineCountBefore,
          compileErrorLines: compileErrorLines,
          breakpointParentId: breakpointParentId
        }).replaceAll("\n", "\n\t");
      }

      GraphLang.Utils.errorLinesObjectAssignSourceCanvasObject({
        inputStr: cCode,
        startLine: lineCountBefore,
        errorLines: compileErrorLines,
        lineOffset: codeLinesOffset,
        errorSourceObj: figObj
      });

      //breakpoint - add node into list
      //CHECK IF IT'S CONNECTION (wire) if yes don't do breakpoint assignment for it
      if (figObj.getUserData() && figObj.getUserData().isSetBreakpoint){
        let currentLineNumber = GraphLang.Utils.getLineCount(cCode) + 2;
        console.log(`--> for loop assign breakpoint line: ${currentLineNumber}, offset: ${codeLinesOffset}`);
        loopObj.translateToCppCodeBreakpointList.add({
          lineNumber: currentLineNumber + codeLinesOffset,
          objectId: figObj.getId(),
          type: figObj.NAME.search('HoverConnection') == -1 ? "node" : "wire",
          parentId: breakpointParentId,
          parentName: this.NAME
        });
      }
      if (figObj.getBreakpointList){
        let lineNumberOffset = cCode.split("\n").length - 1;
        figObj.getBreakpointList().each(function(breakpointIndex, breakpointObj){
          breakpointObj.lineNumber += lineNumberOffset;   //objects which has canvas inside doesn't know about outside world therefore need to add some offset to their breakpoint line numbers
          loopObj.translateToCppCodeBreakpointList.add(breakpointObj);
        });
      }

      //FILL WATCH LIST
      if (figObj.getUserData() && figObj.getUserData().isSetWatch){
        let currentLineNumber = GraphLang.Utils.getLineCount(cCode) + 2;
        console.log(`--> for loop assign watch variable: ${currentLineNumber}, offset: ${codeLinesOffset}`);
        loopObj.translateToCppCodeWatchList.add({
          lineNumber: currentLineNumber + codeLinesOffset,
          objectId: figObj.getId(),
          type: figObj.NAME.search('HoverConnection') == -1 ? "node" : "wire",
          parentId: breakpointParentId,
          parentName: this.NAME
        });
      }
      if (figObj.getWatchList){
        let lineNumberOffset = GraphLang.Utils.getLineCount(cCode) - 1;
        figObj.getWatchList().each(function(watchIndex, watchObj){
          watchObj.lineNumber += lineNumberOffset;   //objects which has canvas inside doesn't know about outside world therefore need to add some offset to their breakpoint line numbers
          loopObj.translateToCppCodeWatchList.add(watchObj);
        });
      }


      /* in case of post C/C++ code run it */
      if (figObj.translateToCppCodePost) cCode += "\t" + figObj.translateToCppCodePost().replaceAll("\n", "\n\t"); //if there is defined to put somethin after let's do it

    });

    return cCode;
  },

  translateToCppCodePost: function(){
    var cCode = "";
    cCode += this.getRightTunnelsAssignementOutputCppCode().replaceAll("\n", "\n\t");    //first assign values to output wires
    cCode += "\n";  //this is here dure tafter last \n in right tunnels assignement there is indentation so this will put there empty line
    cCode += "} //END FOR LOOP\n";

    return cCode;
  },

});
