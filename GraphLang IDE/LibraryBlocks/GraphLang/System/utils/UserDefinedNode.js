// Generated Code for the Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
// Go to the Designer http://www.draw2d.org               
// to design your own shape or download user generated    
//                                                        
GraphLang.UserDefinedNode = draw2d.SetFigure.extend({            

   NAME: "GraphLang.UserDefinedNode",

   contextMenuItems: {
       "setBreakpoint": {name: "Set breakpoint"},
       "unsetBreakpoint": {name: "Unset breakpoint"},
       "separator": "--------------",
       "isBreakpoint": {name: "Show if is breakpoint"},
       "openNodeSchematic": {name: "Open node schematic"},
   },

   init: function(attr, setter, getter)
   {
        this._super( $.extend({stroke:0, bgColor:null, width: 42, height: 42},attr), setter, getter);
        this.persistPorts=false;

        //alert(JSON.stringify(attr));

        //flagAutoCreatePorts indicate if flags should be created from JSON schematic
        if (this.jsonDocument && attr && ("flagAutoCreatePorts" in attr) && attr.flagAutoCreatePorts) this.createPortsFromJson(this.jsonDocument);

        this.createContextMenu();
   },

   /*
    *   @method createPortsFromJson
    *   @description Automatic port creation for shape, they are automatically aligned, inputs on left, outputs on right.
    *   This function should be used when no ports are defined in init().
    */
   createPortsFromJson: function(){
        var inputPortIndex = 1;
        var outputPortIndex = 1;
        var inputPortCount = 1;     //to have them aligned correctly
        var outputPortCount = 1;
        
        for (var k = 0; k < this.jsonDocument.length; k++){
            var element = this.jsonDocument[k];
            var port;
            if (element.userData && element.userData.isTerminal){
                var node = eval("new " + element.type + "()");
                if (node.getInputPorts().getSize() > 0){
                   outputPortCount++;
                }
                if (node.getOutputPorts().getSize() > 0){
                   inputPortCount++;
                }
            }
            if (element.userData && element.type.toLowerCase().search('.return') > -1){
                   outputPortCount++;
            }
        }
        for (var k = 0; k < this.jsonDocument.length; k++){
            var element = this.jsonDocument[k];
            var port;
            if (element.userData && element.userData.isTerminal){
                let node = eval("new " + element.type + "()");
                let topParentNode = this;
                node.getInputPorts().each(function(nodePortIndex, nodePortObj){
                   //output port
                   port = topParentNode.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100,100/outputPortCount*outputPortIndex));
                   port.setConnectionDirection(1);
                   port.setBackgroundColor("#37B1DE");
                   port.setMaxFanOut(20);
                   port.setName(nodePortObj.getName());
                   outputPortIndex++;
                });
                node.getOutputPorts().each(function(nodePortIndex, nodePortObj){
                   // input port
                   port = topParentNode.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0,100/inputPortCount*inputPortIndex));
                   port.setConnectionDirection(3);
                   port.setBackgroundColor("#37B1DE");
                   port.setMaxFanOut(20);
                   port.setName(nodePortObj.getName());
                   inputPortIndex++;
                });
            }
            if (
                element.userData && element.type.toLowerCase().search('.return') > -1
            ){
                   //output port for return node
                   port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100,100/outputPortCount*outputPortIndex));
                   port.setConnectionDirection(1);
                   port.setBackgroundColor("#37B1DE");
                   port.setMaxFanOut(20);                   
                   port.setName(element.userData.nodeLabel);                   
                   outputPortIndex++;
            }
        }
        return;
   },

    createContextMenu: function(){
       let addSupportForLeftMouseButton = false;    //add context menu for left mouse button, this is here to try make context menu working on tablets, but seems not enough :(

       function contextMenuCreate(emitter, event, useLeftMouseButton = false){
           console.log(event);
           console.log(emitter);
           $.contextMenu({
               trigger: useLeftMouseButton ? 'left' : 'right',
               selector: 'body',
               events:
                   {
                       hide:function(){ $.contextMenu( 'destroy' ); }
                   },

               //these functions are run after user click on some context menu option
               callback: $.proxy(function(key, options)
               {
                   //if there are some additional pre hook defined in some node which extend this user defined node run them
                   if (typeof emitter.additionalContextMenuItemsHandlerPreHook == "function") emitter.additionalContextMenuItemsHandlerPreHook(emitter, key, options);

                   switch(key){
                       case "setBreakpoint":
                           emitter.setStroke(3);
                           emitter.setColor("#DD2241");
                           // emitter.setDashArray("-");
                           if (!emitter.getUserData()) emitter.userData = {};
                           emitter.getUserData().isSetBreakpoint = true;
                           break;
                       case "unsetBreakpoint":
                           emitter.setStroke(1);
                           emitter.setColor("#000000");
                           emitter.setDashArray("");
                           if (!emitter.getUserData()) emitter.userData = {};
                           emitter.getUserData().isSetBreakpoint = false;
                           break;
                       case "isBreakpoint":
                           if (emitter.getUserData() && emitter.getUserData().hasOwnProperty("isSetBreakpoint")) alert(emitter.getUserData().isSetBreakpoint);
                           else alert("Wire has no breakpoint data.");
                           break;
                       case "openNodeSchematic":
                           let params = new URLSearchParams(window.location.search);
                           let queryParams = {};
                           params.forEach((value, key) => {
                               queryParams[key] = value;
                           });

                           // let targetUrl = window.location.hostname + window.location.pathname + "?";
                           let targetUrl = "?";
                           targetUrl += `q=ide`;
                           targetUrl += `&projectId=` + queryParams.projectId;
                           targetUrl += `&nodeClassName=` + emitter.NAME;

                           window.open(targetUrl, "_blank");
                           break;
                       default:
                           break;
                   }

                   //if there are some additional post hook defined in some node which extend this user defined node run them
                   if (typeof emitter.additionalContextMenuItemsHandlerPostHook == "function") emitter.additionalContextMenuItemsHandlerPostHook(emitter, key, options);

               },emitter),
               x:event.x,
               y:event.y,
               items: emitter.contextMenuItems,
           });
       };

       /*
        *   Add context menu for left mouse button click - this is for tablets which has no right mouse button
        */
       if (addSupportForLeftMouseButton){
           this.on(`click`, function(emitter, event){
               contextMenuCreate(emitter, event, true);
           });
       }

       /*
        *   Add context menu after click on right mouse button - this is normal on PC, this will be always ON
        */
       this.on(`contextmenu`, function(emitter, event){
           contextMenuCreate(emitter, event, false);
       });
    },

  getObjectAsString: function(){
    var objStr = "";
    
    //generate init()
    objStr += "init: function(attr,setter,getter){\n";
    objStr += "\tthis._super( $.extend({stroke:0, bgColor:null, width:" + this.width + ", height:" + this.height + ", flagAutoCreatePorts: false},attr), setter, getter);\n";
    objStr += "\tvar port;\n";

    this.getInputPorts().each(function(portIndex, portObj){
        objStr += '\tport = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(' + portObj.getLocator().x + ', ' + portObj.getLocator().y + '));' + "\n";
        objStr += '\tport.setConnectionDirection(' + portObj.getConnectionDirection() + ');' + "\n";
        objStr += '\tport.setBackgroundColor("' + portObj.getBackgroundColor().hash() + '");' + "\n";
        objStr += '\tport.setName("' + portObj.getName() + '");' + "\n";
        objStr += '\tport.setMaxFanOut(' + portObj.getMaxFanOut() + ');' + "\n";
        objStr += "\n";        
    });
    this.getOutputPorts().each(function(portIndex, portObj){
        objStr += '\tport = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(' + portObj.getLocator().x + ', ' + portObj.getLocator().y + '));' + "\n";
        objStr += '\tport.setConnectionDirection(' + portObj.getConnectionDirection() + ');' + "\n";
        objStr += '\tport.setBackgroundColor("' + portObj.getBackgroundColor().hash() + '");' + "\n";
        objStr += '\tport.setName("' + portObj.getName() + '");' + "\n";
        objStr += '\tport.setMaxFanOut(' + portObj.getMaxFanOut() + ');' + "\n";
        objStr += "\n";        
    });

    objStr += "\tthis.persistPorts=false;\n";
    objStr += "},\n";

    //generate createShapeElement()
    objStr += "createShapeElement: function(){\n";
    objStr += "\tvar shape = this._super();\n";
    objStr += "\tthis.originalWidth = " + this.width + ";\n";
    objStr += "\tthis.originalHeight = " + this.height + ";\n";
    objStr += "\treturn shape;\n";
    objStr += "},\n";
    objStr += "\n";

    //this is running OK
    objStr += "createSet: " + this.createSet + ",\n\n";
    
    //json schematic is not included, because is taken from canvas
    //objStr += "jsonDocument: " + JSON.stringify(this.jsonDocument) + ",\n\n";
      
    return objStr; 
  },

  /*****************************************************************************************************************
   *    Default node shape, width, height and rectangle shape is defined
   *****************************************************************************************************************/

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = this.width;
      this.originalHeight= this.height;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L"+this.width+",0 L"+this.width+","+this.height+" L0,"+this.height);
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path("M0,0 L"+this.width+",0 L"+this.width+","+this.height+" L0,"+this.height+"Z");
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        return this.canvas.paper.setFinish();
   },

   //DUPLICATE BECAUSE FOR SOME UKNOWN REASON IS NOT POSSIBLE TO EXTEND NODE BASE CLASS SO IT'S ON MORE PLACES
   isNodeClass: function(){
       if (!this.getUserData()) return false;
       if (this.getUserData().hasOwnProperty('isClass')) return this.getUserData().isClass;
       return false;
   },

   //DUPLICATE BECAUSE FOR SOME UKNOWN REASON IS NOT POSSIBLE TO EXTEND NODE BASE CLASS SO IT'S ON MORE PLACES
   isNodeCluster: function(){
       if (!this.getUserData()) return false;
       if (this.getUserData().hasOwnProperty('isCluster')) return this.getUserData().isCluster;
       return false;
   },

   //DUPLICATE BECAUSE FOR SOME UKNOWN REASON IS NOT POSSIBLE TO EXTEND NODE BASE CLASS SO IT'S ON MORE PLACES
   isNodeMultilayered: function(){
       if (!this.getUserData()) return false;
       if (this.getUserData().hasOwnProperty('isMultilayered')) return this.getUserData().isMultilayered;
       return false;
   },

  /*****************************************************************************************************************
   *    JSON schematic, by default empty
   *****************************************************************************************************************/

  jsonDocument: [],

  /*****************************************************************************************************************
   *    THESE FUNCTIONS BELOW ARE SPECIFIC TO TRANSLATE NODE TO C/C++ CODE
   *****************************************************************************************************************/

    getVariableName: function(){
        let variableName = "outputTerminal_" + this.getId();
        if (this.userData.nodeLabel) variableName = this.userData.nodeLabel;
        return variableName
    },

    translateToCppCodeAsParam:function(){
        cCode = "";
        var constDatatype = this.getDatatype();

        //create param definition using also default value, if there is string use quotes
        if (this.getDatatype().toLowerCase().search("string") == -1){
            cCode += constDatatype + " " + this.getVariableName() + ' = ' + this.getText();
        }else{
            cCode += constDatatype + " " + this.getVariableName() + ' = "' + this.getText() + '"';
        }

        return cCode;
    },

    translateToCppCodeFunctionName: function(){
        cCode = this.NAME.replaceAll('.', '__');
        //cCode = this.NAME;
        return cCode;
    },

    translateToCppCodeTemplate: function(){

        /*
         *  First translate this node function as spearate function, call IDE method for this, THIS IDE METHOD MUST BE DEFINED!
         *  Passing reference to this object. Schematic in jsonDocument is used.
         */
        let cCode = "";

        let paramsCounter = 0;
        let paramsStr = "";
        let portOwnerNode = this;
        this.getInputPorts().each(function(portIndex, portObj){
            /*
             *  Write as input param connected wire JUST FIRST to parameter string
             */
            let connections = portObj.getConnections();
            if (paramsCounter > 0) paramsStr += ', ';
            if (connections.getSize() > 0){
                let connectionObj = connections.first();
                let sourceDatatype = connectionObj.getSource().getDatatype();
                let targetDatatype = connectionObj.getTarget().userData.datatype;   //TODO: For now use port datatype, this need to be evaluated from schematic!!!

                // if (sourceDatatype !== targetDatatype){
                //     paramsStr += `*(${targetDatatype}*)(&${connectionObj.getVariableName()})`;
                // }else{
                //     paramsStr += connectionObj.getVariableName();
                // }

                paramsStr += connectionObj.getVariableName();

            }else{
                //paramsStr += 'null';      //WRONG, there should be some default value, this is just too simple to be running properly
                paramsStr += `node_${portOwnerNode.getId()}_inputPort_${portObj.getName()}`;      //default parameter defined before this method call, look for subnode translate where this name is psuhed into array
            }

            paramsCounter++;
        });


        /*
         *  Output params written into parameter string
         */
        let outputPortWiresList = [];
        if (this.getOutputPorts().getSize() > 0){
            this.getOutputPorts().each(function(portIndex, portObj) {
                let portName = 'outputPort_' + portObj.getName().replace(['.','\s'], '_');

                /*
                 *  Genereate C/C++ port output variable
                 */
                if (typeof portObj.getDatatype === "function"){
                    cCode += portObj.getDatatype() + " " + portName + ";\n";
                }else{
                    cCode += portObj.userData.datatype + " " + portName + ";\n";
                }

                let connections = portObj.getConnections();
                outputPortWiresList[portName] = [];
                if (connections.getSize() > 0) {
                    connections.each(function (connectionIndex, connectionObj) {
                        wireName = connectionObj.getVariableName();
                        outputPortWiresList[portName].push(wireName);
                    });
                }

                if (paramsCounter > 0) paramsStr += ', ';
                paramsStr += portName;
                paramsCounter++;
            });
        }

        /*
         *  Finally write whole function call
         */
        cCode += this.translateToCppCodeFunctionName() + '(' + paramsStr + ');\n';

        /*
         *  Assignment to output wires
         */
        Object.keys(outputPortWiresList).forEach(function (portName) {
            for (var wireIndex = 0; wireIndex < outputPortWiresList[portName].length; wireIndex++) {
                cCode += outputPortWiresList[portName][wireIndex] + " = " + portName + ";\n";
            }
        });

        return cCode;
    },

    translateToCppCode: function(){
        return this.translateToCppCodeTemplate();
    },

    /*****************************************************************************************************************
     *    THESE FUNCTIONS BELOW ARE SPECIFIC TO TRANSLATE NODE TO PYTHON CODE
     *****************************************************************************************************************/
    translateToPythonCodeFunctionName: function(){
        //pyCode = this.NAME.replaceAll('.', '_');
        pyCode = this.NAME;
        return pyCode;
    },

});
