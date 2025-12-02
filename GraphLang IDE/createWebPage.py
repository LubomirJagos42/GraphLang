import os, sys
import glob
import re

blocksRootDir = "LibraryBlocks"

searchDirs = [
    blocksRootDir,
]

#
#   List of excluded directories, these here are included but there is no menu item generated
#
excludeFromHtmlBlockPatterns = [
    "System/utils",
    "Math/Basic/hidden",
    "hidden",
]

#
#   Tabs assignemnt blocs. If it path starts with some of keys then is under this tab.
#
blocksToTabsAssignment = {
    os.path.join(blocksRootDir, "GraphLang", "Math", "Basic"):            "GL_Math_Basic",
    os.path.join(blocksRootDir, "GraphLang", "Math", "Trigonometry"):     "GL_Math_Trigon",
    os.path.join(blocksRootDir, "GraphLang", "System"):                   "GL_System",
    os.path.join(blocksRootDir, "GraphLangExperimental"):                 "GL_Experimental",
    os.path.join(blocksRootDir, "HwArduinoNano", "Serial"):               "ArduinoNano_Serial",
    os.path.join(blocksRootDir, "HwRaspiZero", "Console"):                "RaspiZero_Console",
    os.path.join(blocksRootDir, "HwRaspiZero", "File"):                   "RaspiZero_File",
    os.path.join(blocksRootDir, "HwRaspiZero", "IO", "Analog"):           "RaspiZero_Analog",
    os.path.join(blocksRootDir, "HwRaspiZero", "IO", "Digital"):          "RaspiZero_Digital",
    os.path.join(blocksRootDir, "HwRaspiZero", "IO", "Constants"):        "RaspiZero_Constants",
    os.path.join(blocksRootDir, "HwRaspiZero", "String"):                 "RaspiZero_String",
    os.path.join(blocksRootDir, "HwRaspiZero", "Time"):                   "RaspiZero_Time",
    os.path.join(blocksRootDir, "PythonQtGuiLib"):                        "Python GUI",
    os.path.join(blocksRootDir, "SignalProcessing"):                      "Signal Proc.",
    os.path.join(blocksRootDir, "UserDefinedNode"):                       "User Nodes",
    os.path.join(blocksRootDir, "UserDefinedNode", "Demo"):               "Demo",
    os.path.join(blocksRootDir, "Messaging", "ZeroMQ"):                   "ZeroMQ",
    os.path.join(blocksRootDir, "Console"):                               "Console",
    os.path.join(blocksRootDir, "Sound", "miniaudio"):                    "Sound_miniaudio",
}

objectsNamesList = []

htmlTemplate = """
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<title></title>
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="viewport" content="width=device-width, minimum-scale=1.0" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

   <link type="text/css" rel="stylesheet" href="./css/aristo/jquery-ui-1.8.16.custom.css" />
   <link type="text/css" rel="stylesheet" href="./css/jquery.layout.css" />
   <link type="text/css" rel="stylesheet" href="./css/application.css" />
   <link type="text/css" rel="stylesheet" href="./css/GraphLang_application.css" />

    <style type="text/css">
      .palette_node_element{
        float: left; /*LuboJ*/
        margin: 5px 5px 5px 5px;
        padding: 5px 5px 5px 5px;
        font-size: 12px;
      }
      .palette_node_element img{
        max-width: 60px;
      }
	  .node_category_buttons{
		  display: none;
	  }
    </style>

    <script src="./lib/jquery.js"></script>
    <script src="./lib/jquery-ui.js"></script>
    <script src="./lib/jquery.browser.js"></script>
    <script src="./lib/jquery.layout.js"></script>
    <script src="./lib/jquery.ui.touch-punch.js"></script>

<!--     <script src="../draw2d/dist/draw2d.js"></script>   -->
    <script src="../draw2d_hardCopy/draw2d.js"></script>

    <script type="text/javascript">
      /**
       *  GLOBAL DEFINITIONS
       *    - save reference to canvas to have it globally acessible
       *    - init empty variable object for each library, otherwise there would be error in console
       */
      var appCanvas;

      //library tree variables init place to insert

    </script>

    <script src="./gui/Application.js"></script>
    <script src="./gui/View.js"></script>
    <script src="./gui/Toolbar.js"></script>
    <script src="./gui/HoverConnection.js"></script>
    <script src="./gui/MultilineInplaceEditor.js"></script>
    <script src="./gui/SelectOptionInplaceEditor.js"></script>

    <script src="./GraphLangUtils/Utils.js"></script>
    <script src="./GraphLangUtils/Debugger.js"></script>
    <script src="./GraphLangUtils/TranslateToCppCode_1.js"></script>
    <script src="./GraphLangUtils/TranslateToPythonCode_1.js"></script>
    <script src="./GraphLangUtils/RightRelPortLocator.js"></script>
    <script src="./GraphLangUtils/BottomRelPortLocator.js"></script>
    <script src="./GraphLangUtils/LeftRelPortLocator.js"></script>
    <script src="./GraphLangUtils/TopRelPortLocator.js"></script>
    <script src="./GraphLangUtils/CommandDelete.js"></script>
    <script src="./GraphLangUtils/KeyboardDeletePolicy.js"></script>
    <script src="./GraphLangUtils/Color.js"></script>
    <script src="./GraphLangUtils/ArrayClusterInPlaceEditor.js"></script>

    <!-- user defined nodes place to insert -->

 <script type="text/javascript">

app = {};	//lobal to be able debug and use it in developer console

document.addEventListener("DOMContentLoaded",function () {
     app  = new example.Application();

     /**
      *   WIRE CONNECTION policy
      */
     app.view.installEditPolicy(  new draw2d.policy.connection.DragConnectionCreatePolicy({
        createConnection: function(){
            var newWire = new HoverConnection();
            var newWireColor = new GraphLang.Utils.Color();
            newWire.setColor(newWireColor.getByName('broken'));

            return newWire;
        },
        delegateTarget: function(requestingFigure, connectTarget){
            // we allow that a figure with a special class is droppable to a connection
            //
            if(requestingFigure instanceof TunnelFigure && connectTarget instanceof draw2d.Connection){
                return connectTarget;
            }

            return this._super(requestingFigure, connectTarget);
        }
      }));

//draw2d.command.CommandStackListener

      /*
       *  KEYBOARD reactions
       */
      //app.view.uninstallEditPolicy(new draw2d.policy.canvas.DefaultKeyboardPolicy());
      //app.view.installEditPolicy(new GraphLang.Utils.KeyboardDeletePolicy());

      /**
       *  Adding actions TRIGGERED AFTER COMMAND STACK WAS CHANGED, ie. some command run succesfully
       *  Update JSON representation of canvas
       */
      appCanvas = app.view;
      app.view.getCommandStack().addEventListener(function(e){
          //postChangeEvent is notification when command already run
          if(e.isPostChangeEvent()){
  	          displayJSON(appCanvas);              //update JSON string somewhere in log window on canvas


              /*
               *  Change wire color by source port.
               */
              var lastCommand = e.getCommand();
              if (lastCommand.getLabel() == 'Connect Ports'){
                var wireColor = new GraphLang.Utils.Color();
                if (lastCommand.source.userData == null) return lastCommand.connection.setColor(wireColor.getByName('broken'));
                var portDatatype = lastCommand.source.userData.datatype;
                portDatatype = portDatatype ? portDatatype : 'broken';
                lastCommand.connection.setColor(wireColor.getByName(portDatatype));

                //GraphLang.Utils.detectTunnels(appCanvas, lastCommand.connection);  //there is also in Utils.js in Connection() LOOK THERE
                GraphLang.Utils.detectTunnels2(appCanvas, lastCommand.connection);
              }

              /*
               *  Recalculate all tunnels. This should be act just for particular wire, but for now I don't have this function just for one wire.
               *  THIS IS NOT RUNNING HOW IT SHOULD BE, BUT FOR DEBUGGING PROBABLY ENOUGH GOOD
               *    It's creating tunnels even when block is moved and wire goes through structures like while or case
               */
               //GraphLang.Utils.detectTunnels(appCanvas);  //there is also in Utils.js in Connection() LOOK THERE

  	      }
  	  });

      /*
       *	LOADING FILE INTO BOTTOM CANVAS
	   */
	  appCanvas2 = app.view2;
      //reader.unmarshal(appCanvas2, jsonDocument2);


      /*****************************************************************************
       * LOAD PICTURES TO USER DEFINED NODES IN LEFT TOOLBOX
       *****************************************************************************/
      $('#navigation').children('div[id="GraphLang.UserDefined"]').children('div').each(function(index,htmlObj){
        jsCode="new " + htmlObj.getAttribute('data-shape') + "()";
        nodeObj = eval(jsCode);

        if (nodeObj.symbolPicture) {
          var imgElement = new Image();

		  base64Image = nodeObj.symbolPicture;
		  if (base64Image == "") base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAR+SURBVHhe7Zu7LzVBGMZPkEgQhUQoNILCLUFcGtdeVAqF2u0PEBIaoVfq9KIQhRBaSsQ1RCkRJO7XuLxfnklmc867M7uzvu/bM2ePJ3mC2dnszG/fmXl3dsUozRXjBemmXwC8IN30C4AXpJu0AF5eXmhmZoYmJyfp6emJH46MtACmp6cpFosJd3R00MPDA68SCWkBjI+POwDg9vZ2ur+/59VSXloANzc34s5zCHd3d7xqSksLAMIdR6ejDMETAITOekXC19cXPT8/89NSRr4AIHSWRwKgIEIAYHh4mEpLS6m6ujpprq+vp4WFBd50XxkBgHQQHh8f6erqihoaGhKOJcNVVVW82b4yBgCpIHR2dtL7+7vIG7q6uigzMzM0Z2VlUUZGRngAICRFHAIi4e3tjb6/v+ng4CA0Hx0d0dLSkgOhpqaGN9dXgQB8fHyIn7jjqokRURC2zs7OwgOA2X5wcJBub28FBIQ/hxD2Erm/vx8eAKioqEjMuIABqyIhTAihA8CSg4u1tbWJkMdS+K8hYGzv7u6KecVPSQMA7+3tiTLV6gAoQSHs7OwIsLJDuNby8jKvlqCkAcAyhJlYSgUhyAPU+fm5GF7x58vrbG1t8eqOrAEAqSCYPkpPTU25Oi/d29vLqzuyCgCkeoAygdDX1+fquHRdXR2v7sg6ABA6q5oYvYYD33+Id3d3N6/uyEoAkA6CbmI8OTmhnJwcV+fh1dVVXt2RtQAg1XDwgrC2tkYVFRVO3cLCQpqbm+PVEmQ1AAi5QpBIQORsbGyIu35xccEPu2Q1ACQy8kmRR8JP8gSVrAbQ399PjY2N9Pr6qoTgNzGayFoAs7OzCR1FNKggmCyRXrISwMrKitMoaaS4gIBo+JcQrANwfHxMBQUFCR2Ubm1tFVGg20/wGg64FlLiy8vLhHKrAKAD8Q9LKgMCHqNN9xO2t7dFOa6HOlgax8bG6PPzUxy3CkBPT4+rwypjOAAChoQqEiSE09NTbXI0MDAg6hweHtoBYHR01NVIL0sIujwB0XR9fU0tLS2uc6XX19dFrpB0APPz867GmVhuquhWB7nrhHr8XBhZ4+bmJuXm5oq/QwUA6qCPTYzs7GxX40yNjuryBBzDMPGC0NzcTPn5+eL3UAHk5eWJlLW8vNzVqKD2yhPi3zvoIEiHCgCTU0lJiasRP7WEoMsTTCCECuB/WM4JujwBcACJA5JOeQBwPARVnoBjOgiRAAD75QmAgGjgxyIDAPbLE+TyGT8nRAoA7JcnoDx+iYwcANg0T8D3CcXFxby5vrIeAGySJ+D5YWhoSNQJopQAAJvkCZB8SjRVygCA/fKEn3zRGhhAZWWlq2Fh2i9P4PsJfko5ADC+T8DOED7QUkVCEAiBASwuLlJTUxPV1tYmzWVlZTQyMiI+0fvb7xMCA7BFmAwBANK9lTaBkLIAuFQQ8LfXRisUGQCQCgIiAR9+6xQpAJDqhSxevesUOQAQfzWP/3zRKZIAICRFExMTovOYMHWKLABT/QLgBemmXwC8IN2U9gD+AMNkpU/nN6DpAAAAAElFTkSuQmCC";

		  imgElement.src = base64Image;
          htmlObj.append(imgElement);
        }
      });
});

/**
 *  After page is loaded add picture to each menu node item.
 */
$(document).ready(function(){
      $('#navigation div').each(function () {
          var nodeObj = eval('new ' + $(this).attr('data-shape') + '()');

		  base64Image = nodeObj.symbolPicture;
		  if (base64Image == "") base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAR+SURBVHhe7Zu7LzVBGMZPkEgQhUQoNILCLUFcGtdeVAqF2u0PEBIaoVfq9KIQhRBaSsQ1RCkRJO7XuLxfnklmc867M7uzvu/bM2ePJ3mC2dnszG/fmXl3dsUozRXjBemmXwC8IN30C4AXpJu0AF5eXmhmZoYmJyfp6emJH46MtACmp6cpFosJd3R00MPDA68SCWkBjI+POwDg9vZ2ur+/59VSXloANzc34s5zCHd3d7xqSksLAMIdR6ejDMETAITOekXC19cXPT8/89NSRr4AIHSWRwKgIEIAYHh4mEpLS6m6ujpprq+vp4WFBd50XxkBgHQQHh8f6erqihoaGhKOJcNVVVW82b4yBgCpIHR2dtL7+7vIG7q6uigzMzM0Z2VlUUZGRngAICRFHAIi4e3tjb6/v+ng4CA0Hx0d0dLSkgOhpqaGN9dXgQB8fHyIn7jjqokRURC2zs7OwgOA2X5wcJBub28FBIQ/hxD2Erm/vx8eAKioqEjMuIABqyIhTAihA8CSg4u1tbWJkMdS+K8hYGzv7u6KecVPSQMA7+3tiTLV6gAoQSHs7OwIsLJDuNby8jKvlqCkAcAyhJlYSgUhyAPU+fm5GF7x58vrbG1t8eqOrAEAqSCYPkpPTU25Oi/d29vLqzuyCgCkeoAygdDX1+fquHRdXR2v7sg6ABA6q5oYvYYD33+Id3d3N6/uyEoAkA6CbmI8OTmhnJwcV+fh1dVVXt2RtQAg1XDwgrC2tkYVFRVO3cLCQpqbm+PVEmQ1AAi5QpBIQORsbGyIu35xccEPu2Q1ACQy8kmRR8JP8gSVrAbQ399PjY2N9Pr6qoTgNzGayFoAs7OzCR1FNKggmCyRXrISwMrKitMoaaS4gIBo+JcQrANwfHxMBQUFCR2Ubm1tFVGg20/wGg64FlLiy8vLhHKrAKAD8Q9LKgMCHqNN9xO2t7dFOa6HOlgax8bG6PPzUxy3CkBPT4+rwypjOAAChoQqEiSE09NTbXI0MDAg6hweHtoBYHR01NVIL0sIujwB0XR9fU0tLS2uc6XX19dFrpB0APPz867GmVhuquhWB7nrhHr8XBhZ4+bmJuXm5oq/QwUA6qCPTYzs7GxX40yNjuryBBzDMPGC0NzcTPn5+eL3UAHk5eWJlLW8vNzVqKD2yhPi3zvoIEiHCgCTU0lJiasRP7WEoMsTTCCECuB/WM4JujwBcACJA5JOeQBwPARVnoBjOgiRAAD75QmAgGjgxyIDAPbLE+TyGT8nRAoA7JcnoDx+iYwcANg0T8D3CcXFxby5vrIeAGySJ+D5YWhoSNQJopQAAJvkCZB8SjRVygCA/fKEn3zRGhhAZWWlq2Fh2i9P4PsJfko5ADC+T8DOED7QUkVCEAiBASwuLlJTUxPV1tYmzWVlZTQyMiI+0fvb7xMCA7BFmAwBANK9lTaBkLIAuFQQ8LfXRisUGQCQCgIiAR9+6xQpAJDqhSxevesUOQAQfzWP/3zRKZIAICRFExMTovOYMHWKLABT/QLgBemmXwC8IN2U9gD+AMNkpU/nN6DpAAAAAElFTkSuQmCC";

          if (nodeObj.symbolPicture !== undefined){
              $(this).prepend('<img src="' + base64Image + '" />');
          }
      });
});

/**
 *  This is called on event and serializing canvas into JSON format here to have some results.
 *  @return Return value is JSON string to be able produce obj on another place
 */
function displayJSON(canvas){
    var writer = new draw2d.io.json.Writer();
    var jsonStr = "";
    writer.marshal(appCanvas,function(json){
      //LuboJ modification to remove Tunnels, they appear in json after executionOrder, THIS IS PROBLEM, this solution is just for now
      var clearedJson = [];
      var wrongJson = [];
      for (var k = 0; k < json.length; k++){
        if (json[k].type.toLowerCase().search("tunnel") == -1) clearedJson.push(json[k]);
        else wrongJson.push(json[k]);
      }

      jsonStr = JSON.stringify(clearedJson, null, 2);
      $("#json").text(jsonStr);

      //LuboJ auxiliary view
      jsonStr = JSON.stringify(wrongJson, null, 2);
      $("#json2").text(jsonStr);
    });
    return jsonStr;
}

    /* here insert all user defined nodes list */

function navigationShowCategory(categoryName, emitter) {
	$('#navigation span.nodes_tab').hide();
	$('#navigation span.node_category_buttons').hide();
	$('#navigation input[type=\\'button\\']').hide();

	//if going to parent need to get it name
	if (categoryName === "parent"){
		categoryName = "all";
		console.log(`> going to parent figuring name`);
		for (let className of emitter.parentNode.parentNode.className.split(" ")){
			console.log(`> class name: ${className}`);
			if (className.startsWith("category_")) categoryName = className;
		}
	}

	if (categoryName === "all"){
		$('#navigation span.nodes_tab').show();
		$('#navigation input[type="button"]').show();
	}else if (categoryName.startsWith("category_")){
		let counter = 0;
		let MAX_GOING_TOP = 20;

        // let currentElement = emitter;   //THIS IS NOT EXACTLY CORRECT, this starts at <input type="button"... but button can be anywhere
        let currentElement = $("span.node_category_buttons."+categoryName).get(0);  //RIGHT SOLUTION, looking for span with categories buttons

		while(currentElement.id !== "navigation"){
			counter++;
			currentElement = currentElement.parentNode;
			$(currentElement).show();
			if (counter > MAX_GOING_TOP) break;
		}
		if (counter > MAX_GOING_TOP) console.log(`> GOING TOP MORE THAN 10 AND NO NAVIGATION REACHED!!!`);

		$(`.${categoryName}`).show();
		$(`.${categoryName} > *`).show();
		$(`.${categoryName} > input[type='button']`).show();
	}else{
		//SHOW ALL IN DEFUALT CASE
		$('#navigation span.nodes_tab').show();
		$('#navigation input[type="button"]').show();
	}

	$('#navigation input.always_visible').show();
}

</script>

</head>

<body id="container">

   <div id="content">
        <div id="toolbar"></div>
        <div id="canvas" style="width: 4000px; height: 3000px;"></div>
        <div id="canvas2" style="width: 4000px; height: 3000px;"></div> <!-- Size of bottom window is defined in Application.js -->
   </div>

   <div id="navigation" class="">

        <!-- user defined nodes menu place to insert -->

  </div>

   <div id="helperPane" style="width: 100px;">
       <div id="schematicErrors"></div>
       <div id="breakpointList"></div>
       <div id="variablesWatch"></div>
       <div id="debuggerPane"></div>
   </div>

   <!-- window with JSON representation of schematic -->
   <div id="json" style="display: none; overflow:auto;position:absolute; top:100px; right:10px; width:350; height:100;background:white;border:1px solid gray"></div>
   <div id="json2" style="display: none; overflow:auto;position:absolute; top:100px; left:220px; width:250; height:100;background:white;border:1px solid gray"></div>
   <div id="subnodeCanvasContainer" style="display: none;"/></div>
   <div id="clusterTypeDefinitionCanvasContainer" style="display: none;"/></div>

</body>
</html>
"""

def formatData(t,s):
    if not isinstance(t,dict) and not isinstance(t,list):
        print ("\t"*s+str(t))
    else:
        for key in t:
            print("\t"*s+str(key))
            if not isinstance(t,list):
                formatData(t[key],s+1)


createVariableIniStatement = []
classList = []
treeStr = ""

def createVariableInitDeclaration(t,s, outStr = ""):
    global createVariableIniStatement
    for key in t:
        if not isinstance(t,list):
            createVariableInitDeclaration(t[key],s+1, outStr + ('.' if len(outStr) > 0 else '') + key)

            createVariableIniStatement.append("\t" + outStr + ('.' if len(outStr) > 0 else '') + key + " = {};\n")
            classList.append(outStr + ('.' if len(outStr) > 0 else '') + key)

def fillVariablesJavascriptClassHierarchy():
    '''
    This will search specified folders and fill arrays with blocks paths, parent classes and so...
    Global variable objectNamesList is filled with array of nodes with this info:
        [
            [
                node directory path,
                node filename,
                class name .ie "GraphLang.Core.Math.Add",
                class parent .ie "GraphLang.Core.UserDefined",
                html category tab assignment - name of node category,
                html exclude from tab - node isHidden, if true it's not assigned in html
            ],
            [...],
            [...],
            ...
        ]
    '''

    global createVariableIniStatement
    global classList
    global objectsNamesList

    for dirName in searchDirs:
        searchPath = dirName + '/**'
        for fileName in glob.glob(searchPath, recursive=True):
            if not os.path.isdir(fileName):
                #print(fileName)
                with open(fileName, "r") as currentFile:
                    fileContent = currentFile.read()
                    regExp = re.compile(r"[\/\s\n]*([a-zA-Z0-9\.\-\_]+)[\s]*=[\s]*([a-zA-Z0-9\.\-]+)\.extend", re.MULTILINE)
                    matchPattern = regExp.findall(fileContent)
                    if matchPattern:
                        objectsNamesList.append([
                            os.path.dirname(fileName),
                            fileName,
                            matchPattern[0][0],
                            matchPattern[0][1]
                        ])

    #print('===================================')
    #print(objectsNamesList)

    libraryObjectTree = {}
    for nodeItem in objectsNamesList:
        nodeLibTree = nodeItem[2].split('.')
        if len(nodeLibTree) > 1:
            nodeLibTree.pop()
        currentParent = libraryObjectTree
        for nodeLibTreeItem in nodeLibTree:
            if not nodeLibTreeItem == "draw2d":
                if not nodeLibTreeItem in currentParent:
                    currentParent[nodeLibTreeItem] = {}
                currentParent = currentParent[nodeLibTreeItem]

    #formatData(libraryObjectTree,0)
    createVariableInitDeclaration(libraryObjectTree, 0)
    createVariableIniStatement = createVariableIniStatement[::-1]
    classList = classList[::-1]

    print('============= libraryObjetTree ===============')

    print(libraryObjectTree)

    print('============ objectsNameList ================')

    #sorting nodes based on which class they extend, this is simple algorithm
    #   going from beginning of list for k for 0, 1, 2, 3, ... list end
    #   for each step of k there is scan from 0 to k if for object at j position has name of extended class which is on k position of class name
    #       ie. if object at lower index j is extension of object on k position if yes then it swap them
    #
    #   This is maybe inefficient but it's running so it's here.
    #
    k = 0
    while True:
        for j in range(0, k):
            if objectsNamesList[k][2] == objectsNamesList[j][3]:
                objectsNamesList[k], objectsNamesList[j] = objectsNamesList[j], objectsNamesList[k]
                k = 0
                break   
        k += 1
        if k >= len(objectsNamesList):
            break 
        
    #
    #   Add categories into objectNamesList
    #
    k = 0
    for nodeItem in objectsNamesList:

        #add fields to rows in objectsNamesList to have them at each item and set default values
        objectsNamesList[k].append(None)
        objectsNamesList[k].append(False)

        #set isHidden parameter for node
        for excludeStr in excludeFromHtmlBlockPatterns:
            if (nodeItem[1].replace('\\','/').find(excludeStr) > -1):
                objectsNamesList[k][-1] = True

        #set category parameter for node
        for tabDirLocation in blocksToTabsAssignment.keys():
            if (nodeItem[0].startswith(tabDirLocation)):
                objectsNamesList[k][-2] = blocksToTabsAssignment[tabDirLocation]

        k += 1
               
    #
    #   FINALLY print objectNamesList
    #
    for k in objectsNamesList:
        print(k)

    print('============= classList ================')
    print(classList)


####################################################################################################################################
#  Here starts script when running from command line
####################################################################################################################################

if __name__ == "__main__":
    
    #search dirs and evaluate class hierarchy
    fillVariablesJavascriptClassHierarchy()

    jsScriptIncludeStatement = ""
    tabList = [[] for k in range(len(blocksToTabsAssignment))]
    for nodeItem in objectsNamesList:
        scriptTagStr = "\t" + '<script src="./' + nodeItem[1].replace('\\','/') + '"></script>' + "\n"
        jsScriptIncludeStatement += scriptTagStr
        
        #
        #   Check if path is in exclude patterns, if yes flag is set and html <div> will not be generated
        #
        generateHtml = True
        for excludeStr in excludeFromHtmlBlockPatterns:
            if (scriptTagStr.find(excludeStr) > -1):
                generateHtml = False

        if generateHtml:
            htmlNodeMenuItemName = nodeItem[2].split('.')[-1]
            
            index = 0
            for tabDirLocation in blocksToTabsAssignment.keys():
                if (nodeItem[0].startswith(tabDirLocation)):
                    tabList[index].append('\t\t\t<div data-shape="' + nodeItem[2] + '" data-label="' + htmlNodeMenuItemName + '" class="palette_node_element draw2d_droppable">' + htmlNodeMenuItemName + '</div>' + "\n")
                index += 1
            

    #
    #   Create HTML blocks list in menu to be able put them on canvas
    #
    htmlNodeMenuItem = ""
    tabIndex = 0
    htmlNodeMenuItem += f'\t\t<input type="button" class="always_visible" value="all" onclick="navigationShowCategory(\'all\', this)" />\n'
    for tabCategory in tabList:
        htmlNodeMenuItem += f'\t\t<input type="button" value="{blocksToTabsAssignment[list(blocksToTabsAssignment.keys())[tabIndex]]}" onclick="navigationShowCategory(\'category_{tabIndex}\', this)" />\n'
        htmlNodeMenuItem += f'\t\t<span class="node_category_buttons category_{tabIndex}">\n'
        htmlNodeMenuItem += f'\t\t\t<input type="button" value=".." onclick="navigationShowCategory(\'parent\', this)" />\n'
        htmlNodeMenuItem += f'\t\t</span>\n'
        tabIndex += 1
        
    htmlNodeMenuItem += f'\n\n\n'

    tabIndex = 0
    for tabCategory in tabList:
        htmlNodeMenuItem += f'\t\t<span class="nodes_tab category_{tabIndex}">\n'
        for tabBlockHtmlLine in tabCategory:
            htmlNodeMenuItem += tabBlockHtmlLine 
        htmlNodeMenuItem += '\t\t</span>\n'
        tabIndex += 1 

    print('============== <script> ===============')
    print(jsScriptIncludeStatement)

    print('============== tabn list ===============')
    print(tabList)

    print('============== html node menu ===============')
    print(htmlNodeMenuItem)

    #
    #   HERE CREATE ALL USER DEFINED JAVASCRIPT LIST WHICH IS HELPER FOR GraphLang TO CREATE CONTEXT MENU FOR POINTERS
    #
    userDefinedNodesList = []
    for item in objectsNamesList:
        if item[3] == "GraphLang.UserDefinedNode":
            userDefinedNodesList.append(f"'{item[2]}'\n")
    userDefinedNodesJavaScriptArrayDefinitionStr = ""
    userDefinedNodesJavaScriptArrayDefinitionStr += "let global_allUserDefinedNodesList = [\n"
    userDefinedNodesJavaScriptArrayDefinitionStr += ",".join(userDefinedNodesList)
    userDefinedNodesJavaScriptArrayDefinitionStr += "];\n"

    outputStr = htmlTemplate.replace('<!-- user defined nodes place to insert -->', '<!-- user defined nodes place to insert -->'+"\n"+jsScriptIncludeStatement)
    outputStr = outputStr.replace('//library tree variables init place to insert', '//library tree variables init place to insert'+"\n"+ "".join(createVariableIniStatement))
    outputStr = outputStr.replace('<!-- user defined nodes menu place to insert -->', '<!-- user defined nodes menu place to insert -->'+"\n"+ "".join(htmlNodeMenuItem))
    outputStr = outputStr.replace('/* here insert all user defined nodes list */', userDefinedNodesJavaScriptArrayDefinitionStr)

    #print(outputStr)
    with open("GrahpLang IDE Generated 1.html", "w") as fileOutput:
         fileOutput.write(outputStr)

    print('Webpage generate COMPLETE.')
