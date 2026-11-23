/**
 * @class
 * @memberOf example
 * @description Toolbar in top of window which contains buttons to run methods over current schematic, ie. generate C++ code, move object to front/back, delete object and others
 * @type {Class}
 */
example.Toolbar = Class.extend({

	/**
	 * @memberOf example.Toolbar
	 * @param elementId
	 * @param view
	 */
	init:function(elementId, view){
		/*
		 *	TOOLBAR BUTTON GRAPHICS
		 *		Inline SVG icons (24x24 viewBox, drawn with currentColor so they follow button text color).
		 *		Any of them can be replaced by base64 image, ie. '<img src="data:image/png;base64,iVBORw0..." width="22" height="22"/>'
		 */
		const SVG_START = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
		const SVG_END = '</svg>';

		const BUTTON_IMAGE_UNDO = SVG_START + '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>' + SVG_END;
		const BUTTON_IMAGE_REDO = SVG_START + '<path d="m15 14 5-5-5-5"/><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13"/>' + SVG_END;
		const BUTTON_IMAGE_DELETE = SVG_START + '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>' + SVG_END;
		const BUTTON_IMAGE_TO_FRONT = SVG_START + '<rect x="3" y="3" width="11" height="11" rx="1" stroke-dasharray="2 2"/><rect x="10" y="10" width="11" height="11" rx="1" fill="currentColor"/>' + SVG_END;
		const BUTTON_IMAGE_TO_BACK = SVG_START + '<rect x="3" y="3" width="11" height="11" rx="1" fill="currentColor"/><rect x="10" y="10" width="11" height="11" rx="1" fill="#f6f6f6"/>' + SVG_END;
		const BUTTON_IMAGE_CPP_CODE = SVG_START + '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><text x="12" y="18" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.5" font-weight="bold" fill="currentColor" stroke="none">C++</text>' + SVG_END;
		const BUTTON_IMAGE_PYTHON_CODE = SVG_START + '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><text x="12" y="18" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" font-weight="bold" fill="currentColor" stroke="none">Py</text>' + SVG_END;
		const BUTTON_IMAGE_LOAD_SCHEMATIC = SVG_START + '<path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1"/><path d="M3 7v12a2 2 0 0 0 2 2h13l3-10H6l-3 8"/>' + SVG_END;
		const BUTTON_IMAGE_ZOOM_IN = SVG_START + '<circle cx="10.5" cy="10.5" r="7"/><path d="m21 21-5.5-5.5"/><path d="M10.5 7.5v6M7.5 10.5h6"/>' + SVG_END;
		const BUTTON_IMAGE_ZOOM_OUT = SVG_START + '<circle cx="10.5" cy="10.5" r="7"/><path d="m21 21-5.5-5.5"/><path d="M7.5 10.5h6"/>' + SVG_END;
		const BUTTON_IMAGE_ZOOM_NORMAL = SVG_START + '<rect x="2" y="4" width="20" height="16" rx="2"/><text x="12" y="15.5" text-anchor="middle" font-family="Arial,sans-serif" font-size="8.5" font-weight="bold" fill="currentColor" stroke="none">1:1</text>' + SVG_END;
		const BUTTON_IMAGE_SAVE_SCHEMATIC = SVG_START + '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/>' + SVG_END;
		const BUTTON_IMAGE_UPLOAD_SCHEMATIC = SVG_START + '<path d="M7 18a5 5 0 0 1-.6-9.96A6 6 0 0 1 18 8a4.5 4.5 0 0 1 .5 9"/><path d="M12 12v9"/><path d="m8.5 15.5 3.5-3.5 3.5 3.5"/>' + SVG_END;
		const BUTTON_IMAGE_DEBUGGER_OPEN = SVG_START + '<rect x="8" y="6" width="8" height="14" rx="4"/><path d="M9.5 6.5 8 3M14.5 6.5 16 3"/><path d="M8 11H3M16 11h5M8 16H4M16 16h4M8.5 8 5 6M15.5 8 19 6"/><path d="M12 10v8"/>' + SVG_END;
		const BUTTON_IMAGE_VARIABLES_WATCH = SVG_START + '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>' + SVG_END;
		const BUTTON_IMAGE_BREAKPOINT_LIST = SVG_START + '<circle cx="5" cy="6" r="2.2" fill="#d32f2f" stroke="#d32f2f"/><circle cx="5" cy="12" r="2.2" fill="#d32f2f" stroke="#d32f2f"/><circle cx="5" cy="18" r="2.2" fill="#d32f2f" stroke="#d32f2f"/><path d="M10 6h11M10 12h11M10 18h11"/>' + SVG_END;
		const BUTTON_IMAGE_MOUSE_RIGHT_CLICK = SVG_START + '<rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 2v8H6"/><path d="M12 2.2a6 6 0 0 1 6 6V10h-6z" fill="currentColor"/>' + SVG_END;
		const BUTTON_IMAGE_ROTATE_SELECTED = SVG_START + '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/><rect x="9" y="9" width="6" height="6" rx="0.5"/>' + SVG_END;
		const BUTTON_IMAGE_NORMAL_SELECTION = SVG_START + '<path d="M5 3l14 8-6 1.5L10 19z" fill="currentColor"/><path d="m13 12.5 4 6.5"/>' + SVG_END;
		const BUTTON_IMAGE_FORLOOP = SVG_START + '<rect x="2" y="2" width="20" height="20" rx="1" stroke-width="3"/><rect x="4.5" y="4.5" width="7" height="7" stroke-width="1.5"/><text x="8" y="10.3" text-anchor="middle" font-family="Arial,sans-serif" font-size="6.5" font-weight="bold" fill="currentColor" stroke="none">N</text>' + SVG_END;
		const BUTTON_IMAGE_WHILELAYER = SVG_START + '<rect x="2" y="2" width="20" height="20" rx="1" stroke-width="3"/><path d="M18 13a4 4 0 1 1-1.4-3" stroke-width="1.6"/><path d="M17.5 7.5v3h-3" stroke-width="1.6"/>' + SVG_END;
		const BUTTON_IMAGE_MULTILAYERED = SVG_START + '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>' + SVG_END;
		const BUTTON_IMAGE_MULTILAYERED_ENHANCED = SVG_START + '<path d="m10 4 8 4-8 4-8-4z"/><path d="m2 12 8 4 8-4"/><path d="m2 16 8 4 8-4"/><path d="M20 1v6M17 4h6" stroke="#2e7d32" stroke-width="2.4"/>' + SVG_END;

		this.html = $("#"+elementId);
		this.view = view;

		// register this class as event listener for the canvas
		// CommandStack. This is required to update the state of
		// the Undo/Redo Buttons.
		//
		view.getCommandStack().addEventListener(this);

		// Register a Selection listener for the state hnadling
		// of the Delete Button
		//
        view.on("select", $.proxy(this.onSelectionChanged,this));

		// Inject the UNDO Button and the callbacks
		//
		this.undoButton  = this.createIconButton(null, BUTTON_IMAGE_UNDO, "Undo");
		this.html.append(this.undoButton);
		this.undoButton.button().click($.proxy(function(){
		       this.view.getCommandStack().undo();
		},this)).button( "option", "disabled", true );

		// Inject the REDO Button and the callback
		//
		this.redoButton  = this.createIconButton(null, BUTTON_IMAGE_REDO, "Redo");
		this.html.append(this.redoButton);
		this.redoButton.button().click($.proxy(function(){
		    this.view.getCommandStack().redo();
		},this)).button( "option", "disabled", true );

		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);

		// Inject the DELETE Button
		//
		this.deleteButton  = this.createIconButton(null, BUTTON_IMAGE_DELETE, "Delete selected object");
		this.html.append(this.deleteButton);
		this.deleteButton.button().click($.proxy(function(){
			var node = this.view.getPrimarySelection();

			//in case of deleteing loop it's needed to remove also all tunnels (it will also remove all wires connected to tunnels)
			if (node.NAME.toLowerCase().search("loop") >= 0){
				var cmdStack = this.view.getCommandStack();
				node.getChildren().each(function(tunnelIndex, tunnelObj){
					if (tunnelObj.NAME.toLowerCase().search("tunnel") >= 0){
						var cmdDel = new GraphLang.Utils.CommandDelete(tunnelObj);
						cmdStack.execute(cmdDel);
					}
				});
			}

			var command = new GraphLang.Utils.CommandDelete(node);
			this.view.getCommandStack().execute(command);

			$("#logitem1").html("obj deleted:" + node.getId());

		},this)).button( "option", "disabled", true );

		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);

		/*
		 *	Bring to Front Button
		 */
		this.bringToFrontButton  = this.createIconButton("bringToFrontButton", BUTTON_IMAGE_TO_FRONT, "Bring selected object to front");
		this.bringToFrontButton.button().click($.proxy(function(){
			GraphLang.Utils.bringToFront(appCanvas);
		}));
		this.html.append(this.bringToFrontButton);

		/*
		 *	Bring to Back Button
		 */
		this.bringToBackButton  = this.createIconButton("bringToBackButton", BUTTON_IMAGE_TO_BACK, "Send selected object to back");
		this.bringToBackButton.button().click($.proxy(function(){
			GraphLang.Utils.bringToBack(appCanvas);
		}));
		this.html.append(this.bringToBackButton);

		/*
		 *	getCppCode3 Button
		 */
		this.getCppCode3Button  = this.createIconButton("getCppCode3Button", BUTTON_IMAGE_CPP_CODE, "Generate C/C++ code");
		this.getCppCode3Button.button().click($.proxy(function(){
			GraphLang.Utils.TranslateToGeneralCodeObj.getCode(appCanvas);
		}));
		this.html.append(this.getCppCode3Button);

		/*
		 *	getPythonCode Button
		 */
		this.getPythonCodeButton  = this.createIconButton("getPythonCodeButton", BUTTON_IMAGE_PYTHON_CODE, "Generate Python code");
		this.getPythonCodeButton.button().click($.proxy(function(){
			GraphLang.Utils.TranslateToPythonCodeObj.getCode(appCanvas, true, "desktop");
		}));
		this.html.append(this.getPythonCodeButton);

		/*
		 *	loadSchematic Button
		 */
		//this.loadSchematicButton  = $("<button id=\"loadSchematicButton\">loadSchematic</button>");
		//
		this.loadSchematicButton  = $('<input type="file" id="file-input2" />');
/*
		this.loadSchematicButton.button().click($.proxy(function(){
			GraphLang.Utils.loadSchematic(appCanvas);
		}));

 */
		this.loadSchematicButton.hide();
		this.html.append(this.loadSchematicButton);
		this.loadSchematicIconButton = this.createIconButton("loadSchematicIconButton", BUTTON_IMAGE_LOAD_SCHEMATIC, "Load schematic from file");
		this.loadSchematicIconButton.button().click(function(){
			document.getElementById('file-input2').click();
		});
		this.html.append(this.loadSchematicIconButton);
		document.getElementById('file-input2').addEventListener('change', GraphLang.Utils.readSingleFile2, false);

		/*
		 *	zoomIn Button
		 */
		this.zoomInButton  = this.createIconButton("zoomInButton", BUTTON_IMAGE_ZOOM_IN, "Zoom in");
		this.zoomInButton.button().click($.proxy(function(){
            appCanvas.setZoom(appCanvas.getZoom()*0.7, true);
		}));
		this.html.append(this.zoomInButton);

		/*
		 *	zoomOut Button
		 */
		this.zoomOutButton  = this.createIconButton("zoomOutButton", BUTTON_IMAGE_ZOOM_OUT, "Zoom out");
		this.zoomOutButton.button().click($.proxy(function(){
            appCanvas.setZoom(appCanvas.getZoom()*1.3, true);
		}));
		this.html.append(this.zoomOutButton);

		/*
		 *	zoomNormal Button, makes 1:1 zoom
		 */
		this.zoomNormalButton  = this.createIconButton("zoomNormalButton", BUTTON_IMAGE_ZOOM_NORMAL, "Zoom 1:1");
		this.zoomNormalButton.button().click($.proxy(function(){
            appCanvas.setZoom(1.0, true);
		}));
		this.html.append(this.zoomNormalButton);

		/*
		 *	Schematic name input
		 */
		this.schematicNameInput  = $("<span>&nbsp; Schematic name: <input id=\"schematicName\" type=\"input\" value=\"GraphLangTestShape\"/></span>");
		this.html.append(this.schematicNameInput);

		/*
		 *	Schematic display name input
		 */
		this.schematicDisplayNameInput  = $("<span>&nbsp; Schematic display name: <input id=\"schematicDisplayName\" type=\"input\" value=\"\"/></span>");
		this.html.append(this.schematicDisplayNameInput);

		/*
		 *	saveSchematic Button
		 */
		this.saveSchematicButton  = this.createIconButton("saveSchematicButton", BUTTON_IMAGE_SAVE_SCHEMATIC, "Save schematic to file");
		this.saveSchematicButton.button().click($.proxy(function(){
			filename = $('#schematicName').val();
			GraphLang.Utils.saveSchematic2(appCanvas, filename, 'text/javascript');
		}));
		this.html.append(this.saveSchematicButton);

		/*
		 *	uploadSchematic Button
		 */
		this.uploadSchematicButton  = this.createIconButton("uploadSchematicButton", BUTTON_IMAGE_UPLOAD_SCHEMATIC, "Upload schematic to server");
		this.uploadSchematicButton.button().click($.proxy(function(){
			GraphLang.Utils.serverUploadNodeSchematic(appCanvas);
		}));
		this.html.append(this.uploadSchematicButton);

		/*
		 *	debuggerOpen Button
		 */
		this.debuggerOpenButton  = this.createIconButton("debuggerOpenButton", BUTTON_IMAGE_DEBUGGER_OPEN, "Open debugger");
		this.debuggerOpenButton.button().click($.proxy(function(){
			GraphLang.Debugger.Cpp.open({
				targetElementId: 'debuggerPane'
			});
		}));
		this.html.append(this.debuggerOpenButton);

		/*
		 *	variablesWatchToggle Button
		 */
		this.variablesWatchToggleButton  = this.createIconButton("variablesWatchToggleButton", BUTTON_IMAGE_VARIABLES_WATCH, "Toggle variables watch");
		this.variablesWatchToggleButton.button().click($.proxy(function(){
			GraphLang.Debugger.Cpp.toggleVariablesWatch();
		}));
		this.html.append(this.variablesWatchToggleButton);

		/*
		 *	breakpointListToggle Button
		 */
		this.breakpointListToggleButton  = this.createIconButton("breakpointListToggleButton", BUTTON_IMAGE_BREAKPOINT_LIST, "Toggle breakpoint list");
		this.breakpointListToggleButton.button().click($.proxy(function(){
			GraphLang.Debugger.Cpp.toggleBreakpointList();
		}));
		this.html.append(this.breakpointListToggleButton);

		/*
		 *	mouseRightClick Button - for tablet mostly
		 *		TODO: There is still problem that jQuery context menu is not displayed, but this event seems to be working properly
		 */
		this.mouseRightClickButton  = this.createIconButton("mouseRightClickButton", BUTTON_IMAGE_MOUSE_RIGHT_CLICK, "Right mouse click on selected object (for tablets)");
		this.mouseRightClickButton.button().click($.proxy(function(){
			let selectedObject = appCanvas.getSelection().getPrimary();
			if (selectedObject){
				console.log("trying to imitate right mouse button click");

				selectedObject.fireEvent("contextmenu", {
					x: selectedObject.getX() + selectedObject.getWidth()/2 + 500,
					y: selectedObject.getY() + selectedObject.getHeight()/2 + 500,
					figure: selectedObject,
				});

			}else{
				console.log("warning: right mouse button click, no object selected");
			}
		}));
		this.html.append(this.mouseRightClickButton);

		/*
		 *	codeRewriteIdFlag checkbox to change internal IDs in generated code to human readible counting from 1..inf
		 */
		this.codeRewriteIdFlag  = $("<span>&nbsp; Rewrite ID: <input id=\"codeRewriteIdFlag\" type=\"checkbox\" checked/></span>");
		this.html.append(this.codeRewriteIdFlag);

		/*
		 *	breakpointListToggle Button
		 */
		this.rotateSelectedNodeButton  = this.createIconButton("rotateSelectedNodeButton", BUTTON_IMAGE_ROTATE_SELECTED, "Rotate selected node");
		this.rotateSelectedNodeButton.button().click($.proxy(function(){
			GraphLang.Utils.rotateSelectedNodeOnCanvas(appCanvas);
		}));
		this.html.append(this.rotateSelectedNodeButton);

		/******************************************************************************************************************************
		 *	Experimental buttons which set global variable which change behavior of selection mode
		 *		- TODO: Still inside forloop or whilelayer cursor is 'default' inside
		 ******************************************************************************************************************************/

		/*
		 *	normalselection Button
		 */
		this.normalselectionButton  = this.createIconButton("normalselectionButton", BUTTON_IMAGE_NORMAL_SELECTION, "Normal selection mode");
		this.normalselectionButton.button().click($.proxy(function(){
			GraphLang.Utils.setSelectionMode();
		}));
		this.html.append(this.normalselectionButton);

		/*
		 *	forloop select Button
		 */
		this.forloopButton  = this.createIconButton("forloopButton", BUTTON_IMAGE_FORLOOP, "Selection mode: for loop");
		this.forloopButton.button().click($.proxy(function(){
			GraphLang.Utils.setSelectionMode("forloop");
		}));
		this.html.append(this.forloopButton);

		/*
		 *	whilelayer select Button
		 */
		this.whilelayerButton  = this.createIconButton("whilelayerButton", BUTTON_IMAGE_WHILELAYER, "Selection mode: while loop");
		this.whilelayerButton.button().click($.proxy(function(){
			GraphLang.Utils.setSelectionMode("whilelayer");
		}));
		this.html.append(this.whilelayerButton);

		/*
		 *	multilayered select Button
		 */
		this.multilayeredButton  = this.createIconButton("multilayeredButton", BUTTON_IMAGE_MULTILAYERED, "Selection mode: multilayered");
		this.multilayeredButton.button().click($.proxy(function(){
			GraphLang.Utils.setSelectionMode("multilayered");
		}));
		this.html.append(this.multilayeredButton);

		/*
		 *	multilayered select Button
		 */
		this.multilayeredEnhancedButton  = this.createIconButton("multilayeredEnhancedButton", BUTTON_IMAGE_MULTILAYERED_ENHANCED, "Selection mode: multilayered enhanced");
		this.multilayeredEnhancedButton.button().click($.proxy(function(){
			GraphLang.Utils.setSelectionMode("multilayeredenhanced");
		}));
		this.html.append(this.multilayeredEnhancedButton);

	},

	/**
	 * @method
	 * @memberOf example.Toolbar
	 * @description Creates square toolbar button with graphic inside, button text is displayed as tooltip when mouse hover over it.
	 * @param {string|null} buttonId HTML id of button, null when not needed
	 * @param {string} buttonImage HTML of graphic (inline SVG or img tag with base64 data)
	 * @param {string} tooltipText text displayed when mouse hover over button
	 * @returns {jQuery} button element, still needs to be appended into toolbar
	 */
	createIconButton: function(buttonId, buttonImage, tooltipText){
		let button = $("<button class=\"toolbar_icon_button\"></button>");
		if (buttonId) button.attr("id", buttonId);
		button.attr("title", tooltipText);
		button.attr("aria-label", tooltipText);
		button.html(buttonImage);
		return button;
	},

	/**
	 * @method
	 * @memberOf example.Toolbar
	 * @description Called if the selection in the cnavas has been changed. You must register this
	 * class on the canvas to receive this event.
	 *
     * @param {draw2d.Canvas} emitter
     * @param {Object} event
     * @param {draw2d.Figure} event.figure
	 */
	onSelectionChanged : function(emitter, event){
		this.deleteButton.button( "option", "disabled", event.figure===null );
	},

	/**
	 * @method
	 * @memberOf example.Toolbar
	 * @descritption Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail()
	 * can be used to identify the type of event which has occurred.
	 * @param {draw2d.command.CommandStackEvent} event
	 * @template
	 **/
	stackChanged:function(event)
	{
		this.undoButton.button( "option", "disabled", !event.getStack().canUndo() );
		this.redoButton.button( "option", "disabled", !event.getStack().canRedo() );
	}
});
