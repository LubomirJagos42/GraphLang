<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<title></title>
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="viewport" content="width=device-width, minimum-scale=1.0" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

   <link type="text/css" rel="stylesheet" href="<?php echo $htmlIncludeDirPrefix; ?>/css/aristo/jquery-ui-1.8.16.custom.css" />
   <link type="text/css" rel="stylesheet" href="<?php echo $htmlIncludeDirPrefix; ?>/css/jquery.layout.css" />
   <link type="text/css" rel="stylesheet" href="<?php echo $htmlIncludeDirPrefix; ?>/css/application.css" />
   <link type="text/css" rel="stylesheet" href="<?php echo $htmlIncludeDirPrefix; ?>/css/GraphLang_application.css" />

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

    <script src="<?php echo $htmlIncludeDirPrefix; ?>/lib/jquery.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/lib/jquery-ui.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/lib/jquery.browser.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/lib/jquery.layout.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/lib/jquery.ui.touch-punch.js"></script>

<!--     <script src="../draw2d/dist/draw2d.js"></script>   -->
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../draw2d_hardCopy/draw2d.js"></script>

    <script type="text/javascript">
        /**
         *  GLOBAL DEFINITIONS
         *    - save reference to canvas to have it globally acessible
         *    - init empty variable object for each library, otherwise there would be error in console
         */
        var appCanvas;

        /*
         *  Default tree object initialization for javascript - php generated from DB
         */
        GraphLang = {}; //this is used for utils and so, must be here by default

<?php foreach ($nodeDefaultTreeDefinition as $newObjectName){echo("\t\t$newObjectName = {};\n");} ?>

        let global_allNodeCategoriesList = [
<?php foreach ($nodeDefaultTreeDefinition as $newObjectName){echo("\t\t\t\"$newObjectName\",\n");} ?>
        ];
    </script>

    <script src="<?php echo $htmlIncludeDirPrefix; ?>/gui/Application.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/gui/View.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/gui/Toolbar.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/gui/HoverConnection.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/gui/MultilineInplaceEditor.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/gui/SelectOptionInplaceEditor.js"></script>

    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/Utils.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/Debugger.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/TranslateToCppCode_1.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/TranslateToPythonCode_1.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/TranslateToGeneralCode_1.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/RightRelPortLocator.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/BottomRelPortLocator.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/LeftRelPortLocator.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/TopRelPortLocator.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/CommandDelete.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/KeyboardDeletePolicy.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/Color.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/ArrayClusterInPlaceEditor.js"></script>

    <!-- user defined nodes place to insert -->
	<script type="text/javascript" src="?q=getJavascriptForNodes&projectId=<?php echo($currentProject);?>"></script>

 <script type="text/javascript">

var app = {};   //definition for app object is here to have it globaly accesible
document.addEventListener("DOMContentLoaded",function () {
     app = new example.Application();

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

    <?php
        #   THIS HERE WILL GENERATE LOAD SCHEMATIC FROM NODE WHEN nodeId or nodeClassName is provided
        if ($nodeClassName){
            echo("// THIS WILL LOAD SCHEMATIC INTO MAIN CANVAS IF IT IS SPECIFIED IN URL\n");
            echo("let loadedClass = new $nodeClassName();\n");
            echo("if (loadedClass.jsonDocument) GraphLang.Utils.displayContents2(loadedClass.jsonDocument, appCanvas);\n");
            echo("else console.warn(\"Loaded node $nodeId, $nodeClassName has no schematic!\");\n");
            echo("\n");
            echo("//THIS WILL ADD CURRENT CLASS AND DISPLAY NAME INTO INPUT FORMS\n");
            echo("document.querySelector('#schematicName').value = '$nodeClassName';\n");
            echo("document.querySelector('#schematicDisplayName').value = '$nodeDisplayName';\n");
            echo("\n");
            echo("//THIS WILL PRETEND THAT NODE WAS LOADED FROM FILE ON DRIVE, FOR CASE IT WILL BE SAVED TO DRIVE TO GENERATE JS CODE WITH ALL THING PERSISTED\n");
            echo("GraphLang.Utils.loadedNodeShapeAndSchematicStr = {};\n");
            echo("GLOBAL_CURRENT_LOADED_OBJECT_PARENT = '$nodeClassParent';\n");
            echo("GLOBAL_CURRENT_LOADED_OBJECT_CODE_CONTENT = GraphLang.Utils.hex_to_ascii('$nodeCodeContent');\n");
        }
    ?>
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

/*****************************************************************************************************************************************
 *  All nodes in project
 *****************************************************************************************************************************************/
let global_allProjectNodesList = [
    <?php
    foreach (array_keys($nodesNamesWithCategories) as $categoryName){
        foreach ($nodesNamesWithCategories[$categoryName] as $node){
            echo("'".$node['className']."',\n");
        }
    }
    ?>
];

/*****************************************************************************************************************************************
 *  Obtain list of all user defined node by traversing all categories and look into each node if it has non-empty jsonDocument property
 *      1. get user defined from DB, et nodes which parent is directly ...UserDefinedNode...
 *      2. Go through all nodes categories and look if their jsonDocument property is not empty, ie. if they have some schematic inside
 *      3. Go through all nodes in project and look if their parents are user defined, if yes then add it to list
 *****************************************************************************************************************************************/

//  1. step - This will get nodes from DB which are direct descendant of UserDefinedNode
let global_allUserDefinedNodesList = [
    <?php
        $k = 0;
        foreach ($userDefinedNodesClassNames as $className){
            echo("'$className',\n");
        }
    ?>
];

//  2. step - Next we iterate over all categories children and look if they are user defined nodes what means they have defined not empty jsonDocument
for (let nodeName of global_allProjectNodesList){
    try{
        let nodeObj = eval(`new ${nodeName}()`);
        if (nodeObj.jsonDocument !== undefined &&
            nodeObj.jsonDocument instanceof Array &&
            nodeObj.jsonDocument.length > 0 &&
            !global_allUserDefinedNodesList.includes(nodeName)
        ){
            global_allUserDefinedNodesList.push(nodeName);
        }
    }catch(e){
        console.log(e);
    }
}

// 3. step - Again going through all project nodes and look if they are not children of some user defined node what means they are also user defined node
for (let nodeName of global_allProjectNodesList){
    try{
        let nodeObj = eval(`new ${nodeName}()`);
        if (
            !global_allUserDefinedNodesList.includes(nodeName)
        ){
            //traverse object to its top parent and always look into already obtained
            //list of user defined nodes, if there is some node from it then also actual node is user defined
            let parentNodeObj = nodeObj;
            while(parentNodeObj.__proto__){
                parentNodeObj = parentNodeObj.__proto__;
                if (parentNodeObj.NAME !== undefined &&
                    global_allUserDefinedNodesList.includes(parentNodeObj.NAME)
                ){
                    global_allUserDefinedNodesList.push(nodeName);
                    break;  //jump out of while, ends traversing up otherwise it could be added multiple times to user defined list therefore more of its parents could be user defined nodes
                }
            }
        }
    }catch(e){
        console.log(e);
    }
}

/*****************************************************************************************************************************************
 *  Navigation show category or subcategory after click on it
 *****************************************************************************************************************************************/
function navigationShowCategory(categoryName, emitter) {
    $('#navigation span.nodes_tab').hide();
    $('#navigation span.node_category_buttons').hide();
    $('#navigation input[type=\'button\']').hide();

    $(".palette_node_element").show();  //set all nodes to be visible, just their parent tab are hiddend, nodes are hidden when context search is used

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

function menu_node_search_oninput(eventObj, emitterObj){
    let menuNodesFilterStr = emitterObj.value.toLowerCase();
    if (menuNodesFilterStr.length < 3) return;  //filter nodes when at least 3 letters are entered into text input

    let filteredNodeList = [];
    for (let menuNode of $(".palette_node_element")){
        if (menuNode.dataset.label.toLowerCase().search(menuNodesFilterStr) > -1) filteredNodeList.push(menuNode);
    }

    $(".palette_node_element").hide();
    for (let menuNode of filteredNodeList) {
        // console.log(`--> menu node: ${menuNode.dataset.label}`);
        $(menuNode).show();
    }
}
</script>

</head>

<body id="container">

   <div id="content">
        <div id="toolbar"></div>
        <div id="canvas" style="width: 4500px; height: 4500px;"></div>
        <div id="canvas2" style="width: 1500px; height: 600px;"></div> <!-- Size of bottom window is defined in Application.js -->
   </div>

   <div id="navigation" class="">

       <input id="menu_node_search" type="text" placeholder="...some text..." oninput="menu_node_search_oninput(event, this)" />

       <!-- buttons to display nodes in some category-->
       <input type="button" class="always_visible" value="all" onclick="navigationShowCategory('all', this);" />
       <input type="button" value="others" onclick="navigationShowCategory('category_0', this);" />
       <span class="node_category_buttons category_0">
           <input type="button" value=".." onclick="navigationShowCategory('parent', this)" />
       </span>

        <?php
        $categoryIdToNumberForViewList = array();
        $k = 1;
        foreach (array_keys($nodesNamesWithCategories) as $categoryName) {
            if ($categoryName != "0"){
                $categoryId = $nodesNamesWithCategories[$categoryName][0]["categoryId"];
                $categoryIdToNumberForViewList[$categoryId] = $k;
                $k++;
            }
        }
        foreach ($emptyCategories as $category){
            $categoryIdToNumberForViewList[$category['id']] = $k;
            $k++;
        }

        define("MAX_RECURSION_DEPTH", 10);
        $visitedCategoriesIdList = array();
        global $recursiveCounter;
        $recursiveCounter = 0;
        function recursivePrintCategoryTree($currentParentId = null, &$categoryTree, &$visitedCategoriesIdList, &$categoryIdToNumberForViewList){
            global $recursiveCounter;

            $lineIndentation = str_repeat("\t", $recursiveCounter+2);
            foreach ($categoryTree as $categoryId => $categoryProperties) {
                foreach ($categoryProperties["parent_id"] as $categoryParentId) {
                    if ($recursiveCounter > MAX_RECURSION_DEPTH) {
                        echo($lineIndentation."<span>...WARNING: Max recursion depth ".MAX_RECURSION_DEPTH." reached, not continue next!...</span><br />\n");
                        return;
                    }

                    if ($categoryParentId == $currentParentId) {
                        $category_group_number = $categoryIdToNumberForViewList[$categoryId];

                        echo($lineIndentation.'<input type="button" value="'.$categoryProperties['child_name'].'" onclick="navigationShowCategory(\'category_'.$category_group_number.'\', this);" />'."\n");
                        if (in_array($categoryId, $visitedCategoriesIdList) == false){
                            $recursiveCounter++;
                            array_push($visitedCategoriesIdList, $categoryId);

                            echo($lineIndentation.'<span class="node_category_buttons category_'.$category_group_number.'">'."\n");
                            echo($lineIndentation."\t<input type=\"button\" value=\"..\" onclick=\"navigationShowCategory('parent', this)\" />"."\n");
                            recursivePrintCategoryTree($categoryId, $categoryTree, $visitedCategoriesIdList, $categoryIdToNumberForViewList);
                            echo("$lineIndentation</span>\n");

                            $recursiveCounter--;
                        }
                    }
                }
            }
        }
        echo("\n");
        recursivePrintCategoryTree(null, $categoryChildTree, $visitedCategoriesIdList, $categoryIdToNumberForViewList);
        ?>

       <!-- user defined nodes menu place to insert -->
        <span class="nodes_tab category_0">
        <?php
        foreach ($nodesNamesWithCategories[0] as $nodeWithoutCategory){?>
            <div data-shape="<?php echo($nodeWithoutCategory['className']); ?>" data-label="<?php echo($nodeWithoutCategory['displayName']); ?>" class="palette_node_element draw2d_droppable"><?php echo($nodeWithoutCategory['displayName']); ?></div>
        <?php
        }?>
        </span>

        <?php
        $k = 1;
        foreach (array_keys($nodesNamesWithCategories) as $categoryName){
           if ($categoryName != "0"){
               echo("\t\t<span class='nodes_tab category_$k'>\n");
               foreach ($nodesNamesWithCategories[$categoryName] as $node){
                   echo("\t\t\t<div data-shape='".$node['className']."' data-label='".$node['displayName']."' class='palette_node_element draw2d_droppable'>".$node['displayName']."</div>\n");
               }
               echo("\t\t</span>\n\n");
               $k++;
           }
        }
        ?>

  </div>

   <div id="helperPane" style="width: 300px;">
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
