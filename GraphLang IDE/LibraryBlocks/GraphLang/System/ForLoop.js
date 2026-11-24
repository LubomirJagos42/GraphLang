GraphLang.Shapes.Basic.Loop2.ForLoop = GraphLang.Shapes.Basic.Loop2.extend({
  NAME: "GraphLang.Shapes.Basic.Loop2.ForLoop",
  init:function(attr, setter, getter)
  {
    this._super( $.extend({
      color: "#0000FF",
      stroke: 3
    },attr), setter, getter);

    let port;

    //port is little pushed to the left, connected wire is thne not crossing loop border and tunnel is not generated
    port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-0.7, 10));
    port.setConnectionDirection(3);
    port.setBackgroundColor("#0000FF");
    port.setName("iterationTerminal");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = "int";
    this.addIterationTerminalLabel(port, "count", new draw2d.layout.locator.TopLocator());

    this.iterationTerminal = port;

    port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(2, 10));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#0000FF");
    port.setName("iterationTerminalOutput");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = "int";
    this.addIterationTerminalLabel(port, "i", new draw2d.layout.locator.BottomLocator());

    this.iterationTerminalOutput = port;

    // Don't reassign userData as it's already initialized in parent Loop2.init()
    // Just add the additional properties needed for ForLoop
    this.userData.isLoop = true;

    this.persistPorts=false;    /*??what's this??*/

    //add top text to hold and move loop
    this.add(
        new draw2d.shape.basic.Label({text: "ForLoop"}),
        new draw2d.layout.locator.TopLocator(this)
    );
  },

  /**
   * @method addIterationTerminalLabel
   * @description Adds small blue badge label to iteration terminal port (visual only, not persisted, recreated with port).
   * @param {draw2d.Port} port port to which label is attached
   * @param {String} text label text
   * @param {draw2d.layout.locator.Locator} locator label position relative to port
   */
  addIterationTerminalLabel: function(port, text, locator){
    let label = new draw2d.shape.basic.Label({
      text: text,
      fontSize: 8,
      fontColor: "#FFFFFF",
      bgColor: "#0000FF",
      color: "#0000FF",
      stroke: 0,
      radius: 2,
      padding: {left: 2, right: 2, top: 0, bottom: 0}
    });
    label.setSelectable(false);
    label.setDraggable(false);
    port.add(label, locator);
    return label;
  },

  /*
   *    This event is called when figure is dropped on layer.
   */
  onCatch(droppedFigure, x, y, shiftKey, ctrlKey){
    //run super() or continue just in case there is not dropped tunnel inside layer, tunnel is possible to move
    if ( !(typeof droppedFigure.isTunnel === "function" && droppedFigure.isTunnel() === true) === true ){
      this._super(droppedFigure, x, y, shiftKey, ctrlKey);
      //no tunnels generated, wires leaving loop are deleted in JailhouseAwareSelectionPolicy.onMouseUp()
    }
  },

  /*
   *    This event is called when figure is dragged out of layer.
   */
  onDragLeave: function(draggedFigure){
    var previousComposite = draggedFigure.getComposite();
    if (previousComposite){
      previousComposite.unassignFigure(draggedFigure);
      //no tunnel detection, called also in middle of dragging, see JailhouseAwareSelectionPolicy.onMouseUp()

      try{ draggedFigure.toFront(); }catch(e){}
      try{ previousComposite.bringsAllTunnelsToFront(); }catch(e){}
    }
  },

  /**
   * @method setPersistentAttributes
   * @descritpiton Read all attributes from the serialized properties and transfer them into the shape.
   * This is used when file is LOADED.
   *
   * @param {Object} memento
   */
  setPersistentAttributes : function(memento)
  {
      mementoPorts = memento.ports;   //taking ports out, because there is creation of them in parent and I want to create them in my way
      mementoLabels = memento.labels; //taking labels away

      memento.ports = [];
      memento.labels = [];
      this._super(memento);           //CALLING PARENT METHOD, these will recreate this showSelectedObjExecutionOrder

      //backward compatibility to set value even when is not saved in userData
      this.setIsLoop(true);

      // remove all decorations created in the constructor of this element
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

          let locator;
          if (json.locator && json.locator.toLowerCase().search("toplocator") > -1){
            locator = new draw2d.layout.locator.TopLocator(this);      // needs the parent, like in init()
          }else if (json.locatorX != undefined && json.locatorY != undefined){
            locator = eval("new " + json.locator + "(" + json.locatorX + "," + json.locatorY + ")");
          }else{
            locator = new draw2d.layout.locator.XYAbsPortLocator(json.x, json.y);
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
    this.addIterationTerminalLabel(port, "count", new draw2d.layout.locator.TopLocator());

    this.iterationTerminal = port;

    port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(2, 10));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#0000FF");
    port.setName("iterationTerminalOutput");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = "int";
    this.addIterationTerminalLabel(port, "i", new draw2d.layout.locator.BottomLocator());
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

    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;
    let lineNumberToFind = Object.hasOwn(funcParams, "lineNumberToFind") ? funcParams.lineNumberToFind : null;
    let nodeName = Object.hasOwn(funcParams, "nodeName") ? funcParams.nodeName : "";

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

    cCode += this.getTunnelsDeclarationCppCode({
        lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - 1 : null,
        translatorObj: translatorObj
    });

    cCode += this.getWiresInsideLoopDeclarationCppCode({
        lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - GraphLang.Utils.getLineCount(cCode) : null,
        translatorObj: translatorObj
    });
    cCode += "\n";
    
    cCode += "for (int " + forLoopIteratorVariable + " = 0; " + forLoopIteratorVariable + " < " + iterationCount + "; " + forLoopIteratorVariable+ "++){\n";

    let leftTunnelsWiresAssignementCppCode = this.getLeftTunnelsWiresAssignementCppCode({
        lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - GraphLang.Utils.getLineCount(cCode) : null,
        translatorObj: translatorObj
    });
    cCode += "\t" + leftTunnelsWiresAssignementCppCode.replaceAll("\n", "\n\t");
    cCode += "\n\t";
    let leftTunnelsWatchLineNumber = GraphLang.Utils.getLineCount(cCode) + codeLinesOffset;    //wires from left tunnels have value from here

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
        translatorObj.translateToCppCodeTypeDefinitionArray.push(figObj.translateToCppCodeTypeDefinition(funcParams));
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
          breakpointParentId: breakpointParentId,
          translatorObj: translatorObj
        }).replaceAll("\n", "\n\t");

        //if searching for object which generates line try it here for wires
        if (lineNumberToFind !== null && translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE === null){
          if (GraphLang.Utils.getLineCount(cCode) >= lineNumberToFind) translatorObj.GLOBAL_CODE_OBJECT_GENERATE_CODE_AT_LINE = figObj;
        }
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
      /*
       *  Breakpoint on wire going out of node, which is not assigned to this loop (ie. wire from node into nested loop tunnel
       *  or into right tunnel), such wire is never iterated above so its breakpoint was lost. Breakpoint is set on line after node code.
       *  Wires assigned to loop are already handled above, they are skipped here to not have duplicates.
       */
      if (figObj.getOutputPorts && figObj.NAME.search('HoverConnection') == -1){
        figObj.getOutputPorts().each(function(portIndex, portObj){
          portObj.getConnections().each(function(wireIndex, wireObj){
            if (!(wireObj.getUserData() && wireObj.getUserData().isSetBreakpoint)) return;
            if (loopObj.getAssignedFigures().contains(wireObj)) return;
            loopObj.translateToCppCodeBreakpointList.add({
              lineNumber: GraphLang.Utils.getLineCount(cCode) + 1 + codeLinesOffset,
              objectId: wireObj.getId(),
              objectVariableName: wireObj.getVariableName(),
              type: "wire",
              parentId: breakpointParentId,
              parentName: null
            });
          });
        });
      }

      if (figObj.getBreakpointList){
        //NO OFFSET ADDED HERE: nested object got codeLinesOffset + lineCountBefore when translated, so its breakpoint line numbers are already
        //absolute, adding offset again made wrong line numbers for loop inside loop (ie. "b 143" in 104 lines long code)
        figObj.getBreakpointList().each(function(breakpointIndex, breakpointObj){
          loopObj.translateToCppCodeBreakpointList.add(breakpointObj);
        });
      }

      //FILL WATCH LIST
      if (figObj.getUserData() && figObj.getUserData().isSetWatch){
        let currentLineNumber = GraphLang.Utils.getLineCount(cCode) + 2;
        console.log(`--> for loop assign watch variable: ${currentLineNumber}, offset: ${codeLinesOffset}`);
        let isWire = figObj.NAME.search('HoverConnection') > -1;
        loopObj.translateToCppCodeWatchList.add({
          lineNumber: currentLineNumber + codeLinesOffset,
          objectId: figObj.getId(),
          objectVariableName: isWire ? figObj.getVariableName() : undefined,
          type: isWire ? "wire" : "node",
          parentId: breakpointParentId,
          parentName: loopObj.NAME
        });
      }
      /*
       *  Watch on wire going out of node, which is not assigned to this loop (ie. wire from node into nested loop tunnel
       *  or into right tunnel), such wire is never iterated above so its watch was lost (same as breakpoints above).
       */
      if (figObj.getOutputPorts && figObj.NAME.search('HoverConnection') == -1){
        figObj.getOutputPorts().each(function(portIndex, portObj){
          portObj.getConnections().each(function(wireIndex, wireObj){
            if (!(wireObj.getUserData() && wireObj.getUserData().isSetWatch)) return;
            if (loopObj.getAssignedFigures().contains(wireObj)) return;
            loopObj.translateToCppCodeWatchList.add({
              lineNumber: GraphLang.Utils.getLineCount(cCode) + 1 + codeLinesOffset,
              objectId: wireObj.getId(),
              objectVariableName: wireObj.getVariableName(),
              type: "wire",
              parentId: breakpointParentId,
              parentName: null
            });
          });
        });
      }
      if (figObj.getWatchList){
        //NO OFFSET ADDED HERE: nested object watch line numbers are already absolute (see breakpoint list above)
        figObj.getWatchList().each(function(watchIndex, watchObj){
          loopObj.translateToCppCodeWatchList.add(watchObj);
        });
      }


      // in case of post C/C++ code run it
      // if there is defined to put something after let's do it
      if (figObj.translateToCppCodePost){
        cCode += "\t";
        cCode += figObj.translateToCppCodePost({
          lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - GraphLang.Utils.getLineCount(cCode) : null,
          translatorObj: translatorObj
        }).replaceAll("\n", "\n\t");
      }

    });

    //watches on wires going out of tunnels, right tunnel output wires are assigned in translateToCppCodePost() which follows this code
    this.addTunnelWiresToWatchList({
      leftTunnelsLineNumber: leftTunnelsWatchLineNumber,
      rightTunnelsLineNumber: GraphLang.Utils.getLineCount(cCode) + codeLinesOffset + 1,
      parentId: breakpointParentId
    });

    return cCode;
  },

  translateToCppCodePost: function(funcParams){
    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;
    let lineNumberToFind = Object.hasOwn(funcParams, "lineNumberToFind") ? funcParams.lineNumberToFind : null;

    var cCode = "";

    let rightTunnelsAssignementOutputCppCode = this.getRightTunnelsAssignementOutputCppCode({
        lineNumberToFind: lineNumberToFind !== null ? lineNumberToFind - GraphLang.Utils.getLineCount(cCode) : null,
        translatorObj: translatorObj
    });
    cCode += rightTunnelsAssignementOutputCppCode.replaceAll("\n", "\n\t");

    cCode += "\n";  //this is here due after last \n in right tunnels assignment there is indentation so this will put there empty line
    cCode += "} //END FOR LOOP\n";

    return cCode;
  },

  /*****************************************************************************************************************************************************
   *    TRANSLATE TO Python functions
   *      - returned code is NOT indented at its base level, body of loop is indented here, owner indents whole loop code
   *      - loop body is generated in translateToPythonCode() and right tunnels assignment (still inside loop body) in translateToPythonCodePost()
   *****************************************************************************************************************************************************/

  translateToPythonCode: function(funcParams = {}){
    let codeLinesOffset = Object.hasOwn(funcParams, "codeLinesOffset") ? funcParams.codeLinesOffset : 0;
    let breakpointParentId = Object.hasOwn(funcParams, "breakpointParentId") ? funcParams.breakpointParentId : null;
    let translatorObj = Object.hasOwn(funcParams, "translatorObj") ? funcParams.translatorObj : null;

    this.getUserData().wasTranslatedToPythonCode = true;
    this.initPythonTranslateBuffers();

    let iterationCount = "0";
    let iterationCountComment = "";
    let iterationTerminal = this.getInputPort("iterationTerminal");
    if (iterationTerminal.getConnections().getSize() > 0){
      iterationCount = iterationTerminal.getConnections().get(0).getVariableName();
    }else{
      iterationCountComment = "  # iteration count not connected";
    }

    let forLoopIteratorVariable = 'forLoopIterator_' + this.getId();

    let pythonCode = "";
    pythonCode += this.getTunnelsDeclarationPythonCode({translatorObj: translatorObj});
    pythonCode += this.getWiresInsideLoopDeclarationPythonCode({translatorObj: translatorObj});
    pythonCode += `for ${forLoopIteratorVariable} in range(${iterationCount}):${iterationCountComment}\n`;

    /*
     *  Loop body, not indented here, indented when added into pythonCode
     */
    let bodyCode = "";
    bodyCode += this.getLeftTunnelsWiresAssignementPythonCode({translatorObj: translatorObj});
    let leftTunnelsWatchLineNumber = codeLinesOffset + GraphLang.Utils.getLineCount(pythonCode) + GraphLang.Utils.getLineCount(bodyCode) + 1;

    this.getOutputPort("iterationTerminalOutput").getConnections().each(function(wireIndex, wireObj){
      bodyCode += wireObj.getVariableName() + " = " + forLoopIteratorVariable + "\n";
    });
    bodyCode += "# code inside FOR LOOP\n";

    bodyCode += this.translateAssignedFiguresToPythonCode(funcParams, GraphLang.Utils.getLineCount(pythonCode) + GraphLang.Utils.getLineCount(bodyCode));

    pythonCode += GraphLang.Utils.indentPythonCode(bodyCode);

    //watches on wires going out of tunnels, right tunnel wires get value in translateToPythonCodePost() which is right after this code
    this.addTunnelWiresToPythonWatchList({
      leftTunnelsLineNumber: leftTunnelsWatchLineNumber,
      rightTunnelsLineNumber: codeLinesOffset + GraphLang.Utils.getLineCount(pythonCode) + 1,
      parentId: breakpointParentId
    });

    return pythonCode;
  },

  translateToPythonCodePost: function(funcParams = {}){
    let pythonCode = "";
    let rightTunnelsCode = this.getRightTunnelsAssignementOutputPythonCode(funcParams);

    //right tunnels assignment is last part of loop body, "pass" makes body valid when loop has no code inside
    pythonCode += GraphLang.Utils.indentPythonCode(rightTunnelsCode.length > 0 ? rightTunnelsCode : "pass\n");
    pythonCode += "# END FOR LOOP\n";
    return pythonCode;
  },

});
