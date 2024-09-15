<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <title>Draw2D Shape Designer</title>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <link type="text/css" rel="stylesheet" href="<?php echo $htmlIncludeDirPrefix; ?>/lib/jquery-ui/jquery-ui.min.css" />
    <link type="text/css" rel="stylesheet" href="<?php echo $htmlIncludeDirPrefix; ?>/lib/bootstrap/css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="<?php echo $htmlIncludeDirPrefix; ?>/lib/ionicons/css/ionicons.min.css" />
    <link type="text/css" rel="stylesheet" href="<?php echo $htmlIncludeDirPrefix; ?>/lib/prettify/src/prettify.css" />
    <link type="text/css" rel="stylesheet" href="<?php echo $htmlIncludeDirPrefix; ?>/assets/stylesheets/application.css" />
    <link type="text/css" rel="stylesheet" href="<?php echo $htmlIncludeDirPrefix; ?>/assets/stylesheets/main.css" />

    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE/lib/jquery.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE/lib/jquery-ui.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE/lib/jquery.browser.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE/lib/jquery.layout.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE/lib/jquery.ui.touch-punch.js"></script>

    <!--
        LuboJ added

        draw2d MUST BE INCLUDED before .js file of this shape designer, otherwise there is some issue with edit mode,
        ie. when line is created it also creates rectangles and so, so including here is ok, after probably shape
        application rewrite some definitions.
    -->
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


    <SCRIPT src="<?php echo $htmlIncludeDirPrefix; ?>/assets/javascript/dependencies.js"></SCRIPT>

    <!-- <SCRIPT src="./assets/javascript/app.js"></SCRIPT> -->
    <SCRIPT src="<?php echo $htmlIncludeDirPrefix; ?>/assets/javascript/app_GraphLang.js"></SCRIPT>

    <script src="<?php echo $htmlIncludeDirPrefix; ?>/lib/prettify/src/prettify.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/lib/jscolor/jscolor.js"></script>



    <!--
        BELOW IS LOADING GRAPHLANG NODES STUFF AND SO
    -->
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/Utils.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/TranslateToCppCode_1.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/TranslateToPythonCode_1.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/RightRelPortLocator.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/BottomRelPortLocator.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/LeftRelPortLocator.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/TopRelPortLocator.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/CommandDelete.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/KeyboardDeletePolicy.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/Color.js"></script>
    <script src="<?php echo $htmlIncludeDirPrefix; ?>/../GraphLang IDE//GraphLangUtils/ArrayClusterInPlaceEditor.js"></script>

    <!-- user defined nodes place to insert -->
    <script type="text/javascript" src="?q=getJavascriptForNodes&projectId=<?php echo($currentProject);?>"></script>

    <script type="text/javascript">
        let GLOBAL_PROJECT_ID = <?= $currentProject ? $currentProject : -1 ?>;
        let GLOBAL_NODE_CLASS_NAME = '<?= $nodeClassName ? $nodeClassName : "" ?>';
        let GLOBAL_HELPER_VAR_1 = null;

        /**
         * @description This is for now just implemented on the fly here in global space to ssee if it's running.
         * @param projectId
         */
        function loadNodeFromServer(projectId, nodeClassName){
            GraphLang.Utils.serverSendReceive(
                "getNodeJavascriptCode",
                projectId,
                `&nodeClassName=${nodeClassName}`,
                function(){
                    GLOBAL_HELPER_VAR_1 = GraphLang.Utils.hex_to_ascii(GLOBAL_AJAX_RESPONSE.nodeContent);
                    shape_designer.loadSymbolFromGraphLangClass(GLOBAL_HELPER_VAR_1, app.view, app.view.auxView);
                    $("#symbol-display-name-input").val(GLOBAL_AJAX_RESPONSE.nodeDisplayName);
                }
            );
        }

        var app = null;
        $(window).load(function() {
            try{
                app  = new shape_designer.Application(true);

                /****************************************************************************************
                 * LuboJ start code for shape designer
                 *  - assumption it's called from IDE and therefore there is node class name
                 *    which to edit and project id available
                 ****************************************************************************************/
                loadNodeFromServer(GLOBAL_PROJECT_ID, GLOBAL_NODE_CLASS_NAME);
            }
            catch(e){
                alert(e);
            }
        });
    </script>

</head>

<body id="container">

<div id="breadcrumb">
    dir / test / blubber
</div>

<div id="toolbar" class="navbar-default">
</div>

<div id="layer" class="">
    <div id="layer_elements"></div>
    <div id="layer_header" class="highlight panetitle blackgradient">Layer</div>
</div>

<div id="canvas" class="" >
</div>

<div id="canvas2" style="visibility: hidden;" class="" >
</div>

<div id="canvas_zoom" class="btn-group">
    <button type="button" id="canvas_zoom_in"     class="btn highlight">&#8213;</button>
    <button type="button" id="canvas_zoom_normal" class="btn highlight">100%</button>
    <button type="button" id="canvas_zoom_out"    class="btn highlight">&#xFF0B</button>
</div>

<div class="btn-group dropdown">
    <span id="canvas_config" class="ion-ios-toggle dropdown-toggle " data-toggle="dropdown"></span>
    <div class="dropdown-menu" id="canvas_config_items">
        <div class="">
            <label class="">Grid
                <input id="canvas_config_grid" type="checkbox" checked="checked" data-toggle="toggle" >
            </label>
        </div>
    </div>
</div>

<div id="filter" class="navbar-default">
    <div id="filter_actions" ></div>
    <div id="filter_header" class="highlight panetitle blackgradient">Properties</div>
    <div id="filter_toolbar" class="blackgradient" >

        <div class="btn-group dropup">
            <button id="add_filter_button" class="disabled btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown">
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add
                <span class="caret"></span></button>
            <ul class="dropdown-menu" id="add_filter_action_menu">

            </ul>
        </div>

    </div>
</div>


<!--
  # Save Dialog
  #
  #
-->
<div id="githubSaveFileDialog" class="modal fade githubFileDialog" tabindex="-1">
    <div class="modal-dialog ">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="media-heading">Save on GitHub</h4>
            </div>
            <div class="modal-body">
                <div class="media">
                    <div class="media-left media-middle">
                        <a href="#">
                            <img class="media-object githubFilePreview" src="<?php echo $htmlIncludeDirPrefix; ?>/assets/images/octocat.svg">
                        </a>
                    </div>
                    <div class="media-body">

                        <form class="form-horizontal">
                            <br>
                            <br>
                            <fieldset>
                                <div class="form-group">
                                    <div class="col-lg-12">
                                        <input type="text"
                                               class="form-control floating-label githubFileName"
                                               value=""
                                        >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-12">
                                        <input type="text"
                                               class="form-control floating-label githubCommitMessage"
                                               value=""
                                               autofocus
                                               placeholder="commit message"
                                        >
                                    </div>
                                </div>
                            </fieldset>
                            <div class="row"></div>

                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal">Abort</button>
                <button class="btn btn-primary okButton"><span>Save</span></button>
            </div>
        </div>
    </div>
</div>


<!--
# General shape settings
#
-->
<div id="shapeSettingsDialog" class="modal fade" tabindex="-1">
    <div class="modal-dialog ">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="media-heading">General Shape Settings</h4>
            </div>
            <div class="modal-body">


                <fieldset class="form-group">
                    <label>Shape Base Class</label><br>
                    <div class="btn-group shapeBaseClass" data-toggle="buttons">
                        <label class="btn btn-primary active">
                            <input data-class="draw2d.SetFigure" type="radio" name="shapeBaseClass" > Basic Node
                        </label>

                        <label class="btn btn-primary">
                            <input data-class="draw2d.shape.composite.Raft" type="radio" name="shapeBaseClass" > Raft
                        </label>

                        <label class="btn btn-primary">
                            <input data-class="draw2d.shape.composite.Jailhouse" type="radio" name="shapeBaseClass"> Jail House
                        </label>
                    </div>
                </fieldset>

            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal">Abort</button>
                <button class="btn btn-primary okButton"><span>Close</span></button>
            </div>
        </div>
    </div>
</div>


<!--
  # GitHub File select/open dialog
  #
  -->
<div id="githubFileSelectDialog" class="modal fade githubFileDialog" tabindex="-1">
    <div class="modal-dialog ">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="media-heading">File Open...</h4>
            </div>
            <div class="modal-body">


                <div class="list-group githubNavigation">
                    <!-- FileList here -->
                </div>


            </div>
            <div class="modal-footer">
                <button class="btn" data-dismiss="modal">Abort</button>
                <button class="btn btn-primary okButton"><span>Open</span></button>
            </div>
        </div>
    </div>
</div>


<!--
  # FileSaveAs Dialog
  #
  -->
<div id="githubFileSaveAsDialog" class="modal fade githubFileDialog" tabindex="-1">
    <div class="modal-dialog ">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="media-heading">Save on GitHub</h4>
            </div>
            <div class="modal-body">

                <div class="list-group githubNavigation">
                    <!-- FileList here -->
                </div>


                <div class="media">
                    <div class="media-left media-middle">
                        <a href="#">
                            <img class="media-object githubFilePreview" src="<?php echo $htmlIncludeDirPrefix; ?>/assets/images/octocat.svg">
                        </a>
                    </div>
                    <div class="media-body">

                        <form class="form-horizontal">
                            <br>
                            <br>
                            <fieldset>
                                <div class="form-group">
                                    <div class="col-lg-12">
                                        <input type="text"
                                               class="form-control floating-label githubFileName"
                                               value=""
                                               placeholder="enter filename"
                                        >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-lg-12">
                                        <input type="text"
                                               class="form-control floating-label githubCommitMessage"
                                               value=""
                                               autofocus
                                               placeholder="commit message"
                                        >
                                    </div>
                                </div>
                            </fieldset>
                            <div class="row"></div>

                        </form>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn" data-dismiss="modal">Abort</button>
                <button class="btn btn-primary okButton"><span>Save</span></button>
            </div>
        </div>
    </div>
</div>

<script id="shape-base-template" type="text/js-template">
    // Generated Code for the GraphLang
    // special thanks to Draw2D touch HTML5 lib
    //
    // http://www.draw2d.org
    //
    {{{className}}} = {{{baseClass}}}.extend({

    NAME: "{{{className}}}",

    init:function(attr, setter, getter)
    {
    this._super( $.extend({stroke:0, bgColor:null, width:{{width}}, height:{{height}}, flagAutoCreatePorts: false},attr), setter, getter);
    var port;
    {{#ports}}
    // {{{name}}}
    port = this.{{{method}}}({{{type}}}, new draw2d.layout.locator.XYRelPortLocator({{x}}, {{y}}));
    port.setConnectionDirection({{direction}});
    port.setBackgroundColor("{{color}}");
    port.setName("{{name}}");
    port.setMaxFanOut({{fanout}});

    if (!port.userData) port.userData = {}
    port.userData.datatype = "{{datatype}}";
    port.userData.allowMultipleConnections = {{allowMultipleConnections}};
    port.userData.connectionMandatory = {{connectionMandatory}};

    {{/ports}}
    this.persistPorts=false;
    },

    createShapeElement : function()
    {
    var shape = this._super();
    this.originalWidth = {{width}};
    this.originalHeight= {{height}};
    return shape;
    },

    createSet: function()
    {
    this.canvas.paper.setStart();

    {{#figures}}
    // {{{name}}}
    shape = {{{constructor}}};
    shape.attr({{{attr}}});
    shape.data("name","{{{name}}}");
    {{{extra}}}
    {{/figures}}

    return this.canvas.paper.setFinish();
    },

    applyAlpha: function()
    {
    },

    layerGet: function(name, attributes)
    {
    if(this.svgNodes===null) return null;

    var result=null;
    this.svgNodes.some(function(shape){
    if(shape.data("name")===name){
    result=shape;
    }
    return result!==null;
    });

    return result;
    },

    layerAttr: function(name, attributes)
    {
    if(this.svgNodes===null) return;

    this.svgNodes.forEach(function(shape){
    if(shape.data("name")===name){
    shape.attr(attributes);
    }
    });
    },

    layerShow: function(name, flag, duration)
    {
    if(this.svgNodes===null) return;

    if(duration){
    this.svgNodes.forEach(function(node){
    if(node.data("name")===name){
    if(flag){
    node.attr({ opacity : 0 }).show().animate({ opacity : 1 }, duration);
    }
    else{
    node.animate({ opacity : 0 }, duration, function () { this.hide() });
    }
    }
    });
    }
    else{
    this.svgNodes.forEach(function(node){
    if(node.data("name")===name){
    if(flag){node.show();}
    else{node.hide();}
    }
    });
    }
    },

    getParameterSettings: function()
    {
    return [];
    },

    /**
    * @method
    */
    addPort: function(port, locator)
    {
    this._super(port, locator);
    return port;
    },

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
    //
    $.each(memento.labels, $.proxy(function(i,json){
    // create the figure stored in the JSON
    var figure =  eval("new "+json.type+"()");

    // apply all attributes
    figure.attr(json);

    // instantiate the locator
    var locator =  eval("new "+json.locator+"()");

    // add the new figure as child to this figure
    this.add(figure, locator);
    },this));
    },

    symbolPicture: "{{symbolPicture}}",

    jsonDocument: {{jsonDocument}},

    {{loadedObjectPreservedFunctions}}
    });
</script>

<!--
    THIS TEMPLATE ARE JUST PURE FUNCTIONS WHICH MUST BE INCLUDED THAN INSIDE CLASS
-->
<script id="template-shape-functions" type="text/js-template">
    NAME: "{{{className}}}",

    init:function(attr, setter, getter)
    {
    this._super( $.extend({stroke:0, bgColor:null, width:{{width}}, height:{{height}}, flagAutoCreatePorts: false},attr), setter, getter);
    var port;
    {{#ports}}
    // {{{name}}}
    port = this.{{{method}}}({{{type}}}, new draw2d.layout.locator.XYRelPortLocator({{x}}, {{y}}));
    port.setConnectionDirection({{direction}});
    port.setBackgroundColor("{{color}}");
    port.setName("{{name}}");
    port.setMaxFanOut({{fanout}});

    if (!port.userData) port.userData = {}
    port.userData.datatype = "{{datatype}}";
    port.userData.allowMultipleConnections = {{allowMultipleConnections}};
    port.userData.connectionMandatory = {{connectionMandatory}};

    {{/ports}}
    this.persistPorts=false;
    },

    createShapeElement : function()
    {
    var shape = this._super();
    this.originalWidth = {{width}};
    this.originalHeight= {{height}};
    return shape;
    },

    createSet: function()
    {
    this.canvas.paper.setStart();

    {{#figures}}
    // {{{name}}}
    shape = {{{constructor}}};
    shape.attr({{{attr}}});
    shape.data("name","{{{name}}}");
    {{{extra}}}
    {{/figures}}

    return this.canvas.paper.setFinish();
    },

    symbolPicture: "{{symbolPicture}}",
</script>

</body>
</html>
