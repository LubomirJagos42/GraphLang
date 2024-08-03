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
    </script>

    <script src="<?php echo $htmlIncludeDirPrefix; ?>/gui/Application.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/gui/View.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/gui/Toolbar.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/gui/HoverConnection.js"></script>

    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/Utils.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/TranslateToCppCode_1.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/GraphLangUtils/TranslateToPythonCode_1.js"></script>
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
          imgElement.src = nodeObj.symbolPicture;
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
          if (nodeObj.symbolPicture !== undefined){
              $(this).prepend('<img src="' + nodeObj.symbolPicture + '" />');
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

let global_allUserDefinedNodesList = [
<?php
$k = 0;
foreach ($userDefinedNodesClassNames as $className){
    if ($k == 0) echo("'$className'\n");
    else echo("\t, '$className'\n");
    $k++;
}
?>
];
</script>

</head>

<body id="container">

   <div id="content">
        <div id="toolbar"></div>
        <div id="canvas" style="width: 1500px; height: 600px;"></div>
        <div id="canvas2" style="width: 1500px; height: 600px;"></div> <!-- Size of bottom window is defined in Application.js -->
   </div>

   <div id="navigation" class="">

       <!-- buttons to display nodes in some category-->
       <input type="button" value="all" onclick="$('#navigation span').show();" />
       <input type="button" value="others" onclick="$('#navigation span').hide(); $('#tab0').show();" />
       <?php
        $k = 1;
        foreach (array_keys($nodesNamesWithCategories) as $categoryName){
            if ($categoryName != "0"){
            ?>
            <input type='button' value='<?php echo($categoryName); ?>' onclick="$('#navigation span').hide(); $('#tab<?php echo($k);?>').show();" />
            <?php
                $k++;
            }
       }

       foreach ($emptyCategories as $category){
           ?>
           <input type='button' value='<?php echo($category['name']); ?>' onclick="$('#navigation span').hide(); $('#tab<?php echo($k);?>').show();" />
           <?php
           $k++;
       }
       ?>

       <!-- user defined nodes menu place to insert -->
        <span id="tab0">
        <?php
        foreach ($nodesNamesWithCategories[0] as $nodeWithoutCategory){
        ?>
            <div data-shape="<?php echo($nodeWithoutCategory['className']); ?>" data-label="<?php echo($nodeWithoutCategory['displayName']); ?>" class="palette_node_element draw2d_droppable"><?php echo($nodeWithoutCategory['displayName']); ?></div>
        <?php
        }
        ?>
        </span>

        <?php
        $k = 1;
        foreach (array_keys($nodesNamesWithCategories) as $categoryName){
           if ($categoryName != "0"){
               echo("\t\t<span id='tab$k'>\n");
               foreach ($nodesNamesWithCategories[$categoryName] as $node){
                   echo("\t\t\t<div data-shape='".$node['className']."' data-label='".$node['displayName']."' class='palette_node_element draw2d_droppable'>".$node['displayName']."</div>\n");
               }
               echo("\t\t</span>\n\n");
               $k++;
           }
        }
        ?>

  </div>

   <div id="helperPane" style="width: 100px;"></div>

   <!-- window with JSON representation of schematic -->
   <div id="json" style="display: none; overflow:auto;position:absolute; top:100px; right:10px; width:350; height:100;background:white;border:1px solid gray"></div>
   <div id="json2" style="display: none; overflow:auto;position:absolute; top:100px; left:220px; width:250; height:100;background:white;border:1px solid gray"></div>
   <div id="subnodeCanvasContainer" style="display: none;"/></div>
   <div id="clusterTypeDefinitionCanvasContainer" style="display: none;"/></div>

</body>
</html>
