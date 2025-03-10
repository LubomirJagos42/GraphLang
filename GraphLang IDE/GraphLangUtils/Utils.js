/*******************************************************************************
 *  Utils.js by LuboJ
 */

lastCreatedConnection = null;
GLOBAL_MAIN_CANVAS_LOADED_NODE = null;
GLOBAL_HELPER_CANVAS_LOADED_NODE = null;

/**
 *  @class GraphLang.Utils
 *  @description Base class for GraphLang utils
 */
GraphLang.Utils = Class.extend({
  NAME: "GraphLang.Utils",

  init:function(attr, setter, getter){
    this._super(attr, setter, getter);

  }
});

/**
 *  @method detectJoints
 *  @param {draw2d.Canvas} canvas - from where is taken schematic
 *  @description This function puts some mark at wires crossing. For now there will be point inserted.
 */
GraphLang.Utils.detectJoints = function(canvas){
  //get objects from canvas
  //var jsonStr = displayJSON(appCanvas);
  //var jsonObj = JSON.parse(jsonStr);

  var allWires = appCanvas.getLines();
  var wiresIntersectionList = [];
  var outMsg = "Wires ID list:\n";
  allWires.each(function(i, caller){
    outMsg += "> " + caller.id + "\n";
    wiresIntersectionList.push(appCanvas.getIntersection(caller));
    //caller.setColor("#FF0000"); //change color of each wire to red
  });
  alert(outMsg);

  outMsg = "Intersection X,Y:\n";
  if (wiresIntersectionList.length > 0){
    for (var k = 0; k < wiresIntersectionList.length; k++){
      wiresIntersectionList[k].each(function(i, caller){
        pObj = new GraphLang.geo.Point(caller);
        pX = pObj.getX();
        pY = pObj.getY();
        outMsg += "> " + String(pX) + "," + String(pY) + "\n";
        var shape =  new draw2d.shape.basic.Circle({stroke:3, color:"#3d3d3d", bgColor:"#3dff3d"});
        shape.setWidth(10);
        shape.setHeight(10);
        shape.setX(pX);
        shape.setY(pY);
        pX = pX - shape.width/2;
        pY = pY - shape.width/2;
        shape.setX(pX);
        shape.setY(pY);
        appCanvas.add(shape);
      });
    }
  }
  alert("Intersections: " + wiresIntersectionList[0].getSize() + "\n" + outMsg);
}

/**
 *  @method createConnection
 *  @param {draw2d.InputPort} sourcePort - beginning of wire
 *  @param {draw2d.OutputPort} targetPort - end of wire
 *  @description CREATES wire connection btw source and target
 *  @returns {draw2d.Connection} Created connection
 */
var createConnection=function(sourcePort, targetPort){

    //var conn= new draw2d.Connection({
    var conn= new HoverConnection({
        router:new draw2d.layout.connection.InteractiveManhattanConnectionRouter(),
        outlineStroke:1,
        outlineColor:"#303030",
        stroke:2,
        color:"#00a8f0",
        radius:20,
        source:sourcePort,
        target:targetPort
    });

    // since version 3.5.6
    //
    conn.on("dragEnter", function(emitter, event){
        conn.attr({outlineColor:"#30ff30"});
    });
    conn.on("dragLeave", function(emitter, event){
        conn.attr({outlineColor:"#303030"});
    });

    return conn;
};


bullshit = 0;

/**
 *  @method detectTunnels2
 *  @param {draw2d.Canvas} canvas - schematic in which is loop located
 *  @description Rework function to detectTunnels.
 */
GraphLang.Utils.detectTunnels2 = function(canvas, wire = null){
  if (wire == null) return;		//tunnel detection is for particular wire, if not set this ends

  let loopList = new draw2d.util.ArrayList();
  let connectionList = new draw2d.util.ArrayList();

  /*
   *	gathering all multilayered structures
   */
  canvas.getFigures().each(function(figureIndex, figureObj){
    if (figureObj.NAME.search("GraphLang.Shapes.Basic.Loop") > -1 &&
        figureObj.NAME.toLowerCase().search("clusterdatatype") == -1 &&
        figureObj.getComposite() == null){

      let nestedLayeredList = figureObj.getVisibleLoopAndMultilayered();
      if (!nestedLayeredList.isEmpty()) loopList.addAll(nestedLayeredList);  //add ArrayList to current just in case it's not empty otherwise there will be undefined object and make harm in following code
    }
  });

  /*
   *	DETECT INTERSECTION WITH WIRE AND EACH MULTILAYERED STRUCTURED AND GATHER ALL NEEDED INFORMATIONS
   */
  let loopIntersections = [];
  loopList.each(function(loopIndex, loopObj){
    let loopBoundingRect = loopObj.getBoundingBox();

    let lineSegments = wire.getSegments();
    lineSegments.each(function(segmentIndex, segmentObj){

      let intersectPoint = loopBoundingRect.intersectionWithLine(
        segmentObj.start,
        segmentObj.end
      );

      if (intersectPoint.data.length > 0){
        for (k = 0; k < intersectPoint.data.length; k++){
	      intersection = intersectPoint.data[k];
		  intersection.loopObj = loopObj;					//remember top multilayered loop

          if (Math.round(intersectPoint.data[k].x) == Math.round(loopBoundingRect.getX())) intersection.intersectionEdge = 3;                                        //LEFT edge
          else if (Math.round(intersectPoint.data[k].y) == Math.round(loopBoundingRect.getY())) intersection.intersectionEdge = 0;                                   //TOP edge
          else if (Math.round(intersectPoint.data[k].x) == Math.round(loopBoundingRect.getX() + loopBoundingRect.getWidth())) intersection.intersectionEdge = 1;     //RIGHT edge
          else if (Math.round(intersectPoint.data[k].y) == Math.round(loopBoundingRect.getY() + loopBoundingRect.getHeight())) intersection.intersectionEdge = 2;    //BOTTOM edge

          if (Math.round(intersectPoint.data[k].x) == Math.round(loopBoundingRect.getX())) intersection.intersectionEdgeStr = "left";                                        //LEFT edge
          else if (Math.round(intersectPoint.data[k].y) == Math.round(loopBoundingRect.getY())) intersection.intersectionEdgeStr = "top";                                   //TOP edge
          else if (Math.round(intersectPoint.data[k].x) == Math.round(loopBoundingRect.getX() + loopBoundingRect.getWidth())) intersection.intersectionEdgeStr = "right";     //RIGHT edge
          else if (Math.round(intersectPoint.data[k].y) == Math.round(loopBoundingRect.getY() + loopBoundingRect.getHeight())) intersection.intersectionEdgeStr = "bottom";    //BOTTOM edge

          if (loopBoundingRect.hitTest(wire.getSource().getAbsoluteX(), wire.getSource().getAbsoluteY())){
          	intersection.containWireSource = "1";
          }else{
          	intersection.containWireSource = "0";
		  }

		  loopIntersections.push(intersection);
        }
      }

    });
  }); //end function to add tunnel to each intersect of wires with loops


  /*
   *	ORDERING WIRES INTERSECTIONS
   */
  let loopIntersectionsOrdered = [];
  let lineSegments = wire.getSegments();
  lineSegments.each(function(segmentIndex, segmentObj){
   	if (segmentObj.start.x == segmentObj.end.x){

  		auxLoopIntersections = [];
  		if (segmentObj.start.y < segmentObj.end.y){
  			startY = segmentObj.start.y;
  			endY = segmentObj.end.y;
			lineDirection = "down";
  		}else{
  			startY = segmentObj.end.y;
  			endY = segmentObj.start.y;
			lineDirection = "up";
  		}

		for (k = 0; k < loopIntersections.length; k++){
			if (loopIntersections[k].y >= startY && loopIntersections[k].y <= endY && (loopIntersections[k].intersectionEdgeStr == "top" || loopIntersections[k].intersectionEdgeStr == "bottom")){
				loopIntersections[k].lineDirection = lineDirection;
				auxLoopIntersections.push(loopIntersections[k]);
			}
		}

		//depends on wire direction tunnels are numbered 0..n from top down or reversed
  		auxLoopIntersections.sort(function compare( a, b ) {
  		  if (lineDirection == "down"){
  				if ( a.y < b.y ) return -1;
	  			if ( a.y > b.y ) return 1;
	  		}else if (lineDirection == "up"){
  				if ( a.y > b.y ) return -1;
	  			if ( a.y < b.y ) return 1;
	   	  }
  			return 0;
  		});
  		for (k = 0; k < auxLoopIntersections.length; k++){
  			loopIntersectionsOrdered.push(auxLoopIntersections[k])
  		}

  	}


  	if (segmentObj.start.y == segmentObj.end.y){

  		auxLoopIntersections = [];
  		if (segmentObj.start.x < segmentObj.end.x){
  			startX = segmentObj.start.x;
  			endX = segmentObj.end.x;
			lineDirection = "right";
  		}else{
  			startX = segmentObj.end.x;
  			endX = segmentObj.start.x;
			lineDirection = "left";
  		}

		for (k = 0; k < loopIntersections.length; k++){
			if (loopIntersections[k].x >= startX && loopIntersections[k].x <= endX  && (loopIntersections[k].intersectionEdgeStr == "left" || loopIntersections[k].intersectionEdgeStr == "right")){
				loopIntersections[k].lineDirection = lineDirection;
				auxLoopIntersections.push(loopIntersections[k]);
			}
		}

		//depends on wire direction tunnels are numbered 0..n from left right or reversed
  		auxLoopIntersections = auxLoopIntersections.sort(function compare( a, b ) {
			if (lineDirection == "right"){
				if ( a.x < b.x ) return -1;
				if ( a.x > b.x ) return 1;
			}else if (lineDirection == "left"){
				if ( a.x > b.x ) return -1;
				if ( a.x < b.x ) return 1;
			}
			return 0;
  		});

	    for (k = 0; k < auxLoopIntersections.length; k++){
  			loopIntersectionsOrdered.push(auxLoopIntersections[k])
  		}
	}
  });

  /*
   *	PUTTNG LABEL FOR EACH ORDERED INTERSECTION
   */
   /*
  for (k = 0; k < loopIntersectionsOrdered.length; k++){
  		canvas.add(
  		  new draw2d.shape.basic.Label({
  		    x: loopIntersectionsOrdered[k].x,
  		    y: loopIntersectionsOrdered[k].y,
  		    text:new String(k) + ".." + new String(loopIntersectionsOrdered[k].containWireSource) + ".." + new String(loopIntersectionsOrdered[k].lineDirection),
  		    bgColor: "#FFFFFF",
  		    stroke:1, color:"#FF0000", fontColor:"#0d0d0d"
  		  })
  		);
  }
  */

  /*
   *	PUTTNG TUNNEL FOR EACH ORDERED INTERSECTION
   */
  addedTunnels = [];
  addedTunnelsLocator = [];
  addedTunnelLoopObj = [];
  for (k = 0; k < loopIntersectionsOrdered.length; k++){

           var tunnelObj;

           	//LeftTunnel - wire is going INSIDE structure
           	//RightTunnel - wire is going OUT of structure, it's leaving it

			if (loopIntersectionsOrdered[k].intersectionEdgeStr == "top" && loopIntersectionsOrdered[k].lineDirection == "down"){
				tunnelObj = new GraphLang.Shapes.Basic.LeftTunnel();
				tunnelObj.setRotationAngle(90);
			}
			if (loopIntersectionsOrdered[k].intersectionEdgeStr == "top" && loopIntersectionsOrdered[k].lineDirection == "up"){
				tunnelObj = new GraphLang.Shapes.Basic.RightTunnel();
				tunnelObj.setRotationAngle(-90);
			}

			if (loopIntersectionsOrdered[k].intersectionEdgeStr == "bottom" && loopIntersectionsOrdered[k].lineDirection == "down"){
				tunnelObj = new GraphLang.Shapes.Basic.RightTunnel();
				tunnelObj.setRotationAngle(90);
			}
			if (loopIntersectionsOrdered[k].intersectionEdgeStr == "bottom" && loopIntersectionsOrdered[k].lineDirection == "up"){
				tunnelObj = new GraphLang.Shapes.Basic.LeftTunnel();
				tunnelObj.setRotationAngle(-90);
			}

			if (loopIntersectionsOrdered[k].intersectionEdgeStr == "left" && loopIntersectionsOrdered[k].lineDirection == "left"){
				tunnelObj = new GraphLang.Shapes.Basic.RightTunnel();
				tunnelObj.setRotationAngle(180);
			}
			if (loopIntersectionsOrdered[k].intersectionEdgeStr == "left" && loopIntersectionsOrdered[k].lineDirection == "right"){
				tunnelObj = new GraphLang.Shapes.Basic.LeftTunnel();
				tunnelObj.setRotationAngle(0);
			}

			if (loopIntersectionsOrdered[k].intersectionEdgeStr == "right" && loopIntersectionsOrdered[k].lineDirection == "left"){
				tunnelObj = new GraphLang.Shapes.Basic.LeftTunnel();
				tunnelObj.setRotationAngle(180);
			}
			if (loopIntersectionsOrdered[k].intersectionEdgeStr == "right" && loopIntersectionsOrdered[k].lineDirection == "right"){
				tunnelObj = new GraphLang.Shapes.Basic.RightTunnel();
				tunnelObj.setRotationAngle(0);
			}

		   //debugging
           //tunnelObj.getInputPort(0).setBackgroundColor("#FFFFFF");	//tunnel input will be white
           //tunnelObj.getOutputPort(0).setBackgroundColor("#000000");	//tunnel output will be black

           var objWidth = tunnelObj.getWidth();
           var objHeight = tunnelObj.getHeight();
           tunnelObj.setWidth(objHeight);
           tunnelObj.setHeight(objWidth);

		   pX = loopIntersectionsOrdered[k].x;
		   pY = loopIntersectionsOrdered[k].y;

           loopBoundingRect = loopIntersectionsOrdered[k].loopObj.getBoundingBox();
           loopObj = loopIntersectionsOrdered[k].loopObj;

           //this is for relative locator
           var tunnelLocatorRel = {}
           if (loopIntersectionsOrdered[k].intersectionEdge == 0){ //TOP edge
             tunnelLocatorRel =  new GraphLang.Utils.TopRelPortLocator(
               Math.abs(pX - loopObj.getX() - tunnelObj.getWidth()/2)/loopBoundingRect.getWidth()*100,
               tunnelObj.getHeight()/2
             );
           }
           if (loopIntersectionsOrdered[k].intersectionEdge == 1){ //RIGHT edge
             tunnelLocatorRel =  new GraphLang.Utils.RightRelPortLocator(
               tunnelObj.getWidth()/2,
               Math.abs(pY - loopObj.getY() - tunnelObj.getHeight()/2)/loopBoundingRect.getHeight()*100 //<----- THIS IS PROBABLY BAD OR SOMETHING WRONG
             );
           }
           if (loopIntersectionsOrdered[k].intersectionEdge == 2){ //BOTTOM edge
             tunnelLocatorRel =  new GraphLang.Utils.BottomRelPortLocator(
               Math.abs(pX - loopObj.getX() - tunnelObj.getWidth()/2)/loopBoundingRect.getWidth()*100,
               tunnelObj.getHeight()/2
             );
           }
           if (loopIntersectionsOrdered[k].intersectionEdge == 3){ //LEFT edge
             tunnelLocatorRel =  new GraphLang.Utils.LeftRelPortLocator(
               tunnelObj.getWidth()/2,
               Math.abs(pY - loopObj.getY() - tunnelObj.getHeight()/2)/loopBoundingRect.getHeight()*100 //<----- THIS IS PROBABLY BAD OR SOMETHING WRONG
             );
           }

           addedTunnels.push(tunnelObj);
           addedTunnelsLocator.push(tunnelLocatorRel);
           addedTunnelLoopObj.push(loopObj);
  }

  /*
   *	REMOVE TUNNELS WHICH are going straight through some structure
   */
  tunnelsRemovedFromArray = true;
  while (tunnelsRemovedFromArray){
  	tunnelsRemovedFromArray = false;
	for (k = 0; k <= addedTunnels.length - 2; k++){
  	  if (addedTunnelLoopObj[k].getId() == addedTunnelLoopObj[k+1].getId()){
  		addedTunnels.splice(k, 2);	//remove tunnel at index k, k+1
		addedTunnelsLocator.splice(k, 2);
		addedTunnelLoopObj.splice(k, 2);
  		tunnelsRemovedFromArray = true;
  		break;
	  }
	}
  }

  for (k = 0; k < addedTunnels.length; k++){
         /*
          *		This calculation of realtive position is not totaly correct, because when resizing loop its width and height
          *		is changing, but locator percentage is still same and not changing accordingly to new width and height of loop,
          *		it was normalized by the previous dimensions and dimension of tunnels is not changing, so right resize method
          *		would be recalculate relative locator, or figure out how to snap tunnels to right and left and top and
          *		bottom wall of loop
          */
         addedTunnelLoopObj[k].add(addedTunnels[k],addedTunnelsLocator[k])
         addedTunnels[k].setSelectable(true);
  }

	/*
	 *	NO TUNNELS, CONNECTION BETWEEN ALREADY EXISTING TUNNELS INSIDE ONE LOOP, GENERATE WireConnection
	 */
	if (
		addedTunnels.length == 0 &&
		wire.getSource().getParent().NAME.toLowerCase().search("lefttunnel") > -1 &&
		wire.getTarget().getParent().NAME.toLowerCase().search("righttunnel") > -1 &&
		wire.getSource().getParent().getParent().getId() == wire.getTarget().getParent().getParent().getId()
	){
		pX = (wire.getSource().getAbsoluteX() + wire.getTarget().getAbsoluteX())/2;
		pY = (wire.getSource().getAbsoluteY() + wire.getTarget().getAbsoluteY())/2;
		wireConnectionObj = new GraphLang.Shapes.Basic.WireConnection();
		var wireConnectionLocatorAbs =  new draw2d.layout.locator.XYAbsPortLocator(pX, pY);

		canvas.add(wireConnectionObj, wireConnectionLocatorAbs);

		wire.getSource().getParent().getParent().getActiveLayer().assignFigure(wireConnectionObj);
		wireConnectionObj.setRotationAngle(wire.getTarget().getParent().getRotationAngle());
		if (wire.getTarget().getParent().getRotationAngle() == 0) wireConnectionObj.setWidth(30);
		else wireConnectionObj.setHeight(30);

		var additionalConnection = new HoverConnection();
		additionalConnection.setSource(wireConnectionObj.getOutputPort(0));
		additionalConnection.setTarget(wire.getTarget());
	    canvas.add(additionalConnection);

		wire.setTarget(wireConnectionObj.getInputPort(0));
	}


  /*
   *	CONNECT ALL TUNNELS
   *	it was tried that wire.getSource() return figure output point and wire.getTarget() returns figure input port
   */
  wireTarget = wire.getTarget();
  for (k = 0; k < addedTunnels.length; k++){


	//FIRST MOVE WIRE TARGET TO THE FIRST TUNNEL
	if (k == 0){
		/* debug, set wire source port WHITE and target BLACK
		wire.getSource().setBackgroundColor("#FFFFFF");
		wire.getTarget().setBackgroundColor("#000000");
		*/

		/*
		 *	If source is tunnel and it's going through structure WireConnection is added to wire to not broke multilayer structure
		 */
		if (
			wire.getSource().getParent().NAME.toLowerCase().search("tunnel") > -1 &&
			wire.getSource().getParent().getParent().getId() == addedTunnels[k].getParent().getId()
		){
			pX = (wire.getSource().getAbsoluteX() + addedTunnels[k].getAbsoluteX())/2;
			pY = (wire.getSource().getAbsoluteY() + addedTunnels[k].getAbsoluteY())/2;
			wireConnectionObj = new GraphLang.Shapes.Basic.WireConnection();
			var wireConnectionLocatorAbs =  new draw2d.layout.locator.XYAbsPortLocator(pX, pY);

			canvas.add(wireConnectionObj, wireConnectionLocatorAbs);

			addedTunnels[k].getParent().getActiveLayer().assignFigure(wireConnectionObj);
			wireConnectionObj.setRotationAngle(addedTunnels[k].getRotationAngle());
			if (addedTunnels[k].getRotationAngle() == 0) wireConnectionObj.setWidth(30);
			else wireConnectionObj.setHeight(30);

			wire.setTarget(wireConnectionObj.getInputPort(0));

			var additionalConnection = new HoverConnection();
			additionalConnection.setSource(wireConnectionObj.getOutputPort(0));
			additionalConnection.setTarget(addedTunnels[k].getInputPort(0));
		    canvas.add(additionalConnection);
		}else{
			wire.setTarget(addedTunnels[k].getInputPort(0));
		}
	}

	/*
	 *	START ADDING NEW WIRES AND CONNECT THEM BETWEEN TUNNELS AND TARGET
	 */
	//LAST SEGMENT, CONNECTING LAST TUNNEL AND TARGET
	if (k == addedTunnels.length-1){
		var additionalConnection = new HoverConnection();
		additionalConnection.setSource(addedTunnels[k].getOutputPort(0));
		additionalConnection.setTarget(wireTarget);
    	canvas.add(additionalConnection);
	}else{

		/*
		 *	CONNECTION BETWEEN TUNNELS
		 *	If source is tunnel and it's going through structure WireConnection is added to wire to not broke multilayer structure
		 */
		if (addedTunnels[k].getParent().getId() == addedTunnels[k+1].getParent().getId()){

			pX = (addedTunnels[k].getAbsoluteX() + addedTunnels[k+1].getAbsoluteX())/2;
			pY = (addedTunnels[k].getAbsoluteY() + addedTunnels[k+1].getAbsoluteY())/2;
			wireConnectionObj = new GraphLang.Shapes.Basic.WireConnection();
			var wireConnectionLocatorAbs =  new draw2d.layout.locator.XYAbsPortLocator(pX, pY);

			canvas.add(wireConnectionObj, wireConnectionLocatorAbs);

			addedTunnels[k].getParent().getActiveLayer().assignFigure(wireConnectionObj);
			wireConnectionObj.setRotationAngle(addedTunnels[k+1].getRotationAngle());
			if (addedTunnels[k+1].getRotationAngle() == 0) wireConnectionObj.setWidth(30);
			else wireConnectionObj.setHeight(30);

   			var additionalConnection = new HoverConnection();
			additionalConnection.setSource(addedTunnels[k].getOutputPort(0));
			additionalConnection.setTarget(wireConnectionObj.getInputPort(0));
		    canvas.add(additionalConnection);

   			var additionalConnection = new HoverConnection();
			additionalConnection.setSource(wireConnectionObj.getOutputPort(0));
			additionalConnection.setTarget(addedTunnels[k+1].getInputPort(0));
		    canvas.add(additionalConnection);

		}else{
			var additionalConnection = new HoverConnection();
			additionalConnection.setSource(addedTunnels[k].getOutputPort(0));
			additionalConnection.setTarget(addedTunnels[k+1].getInputPort(0));
		    canvas.add(additionalConnection);
		}
	}
  }

  /*
   *  PUTTING LABELS ON TUNNELS
   */
  /*
  for (k = 0; k < addedTunnels.length; k++){
	addedTunnels[k].add(
	  new draw2d.shape.basic.Label({
	    text: new String(k),
	    bgColor: "#FFFFFF",
	    stroke:1, color:"#FF0000", fontColor:"#0d0d0d"
	  }),
	  new draw2d.layout.locator.XYRelPortLocator(0,0)
	);
  }
  */

  /*
   *  PUTTING LABELS ON WIRES
y  *?
   /*
  let lineSegments = wire.getSegments();
  orderCounter = 0;
  lineSegments.each(function(segmentIndex, segmentObj){
  	if (segmentObj.start.x == segmentObj.end.x){
		if (segmentObj.start.y < segmentObj.end.y){
			directionStr = "dir DOWN"
		}else{
			directionStr = "dir UP"
		}
		canvas.add(
		  new draw2d.shape.basic.Label({
		    x: segmentObj.start.x,
		    y: (segmentObj.start.y + segmentObj.end.y)/2,
		    text: directionStr + '..' + new String(orderCounter),
		    bgColor: "#FFFFFF",
		    stroke:1, color:"#FF0000", fontColor:"#0d0d0d"
		  })
		);

	}
  	if (segmentObj.start.y == segmentObj.end.y){
		if (segmentObj.start.x < segmentObj.end.x){
			directionStr = "dir RIGHT"
		}else{
			directionStr = "dir LEFT"
		}
		canvas.add(
		  new draw2d.shape.basic.Label({
		    y: segmentObj.start.y,
		    x: (segmentObj.start.x + segmentObj.end.x)/2,
		    text: directionStr + '..' + new String(orderCounter),
		    bgColor: "#FFFFFF",
		    stroke:1, color:"#FF0000", fontColor:"#0d0d0d"
		  })
		);
	}
	orderCounter++;
  });
  */

};

/**
 *  @method initAllPortToDefault
 *  @param {draw2d.Canvas} canvas - schematic where ports will be set to default
 *  @description Set default value for all ports. FOR NOW SET VALUE OF EACH PORT TO 0.
 */
GraphLang.Utils.initAllPortToDefault = function(canvas){
  var allPorts = canvas.getAllPorts();
  var allNodes = canvas.getFigures();

  //set to defualt values execution order of LOOPS AND NODES
  allNodes.each(function(nodeIndex, nodeObj){
    //init execution order for all nodes
    if (nodeObj.getUserData() != undefined){
      nodeObj.getUserData().executionOrder = -1;
    }else{
      nodeObj.userData = {};
      nodeObj.userData.executionOrder = -1;
    }

    //for loops there is flag about they were transcripted to C/C++
    if (nodeObj.NAME.toLowerCase().search("loop") >= 0){
      if (nodeObj.getUserData() == undefined) nodeObj.userData.wasTranslatedToCppCode = false;
      nodeObj.getUserData().wasTranslatedToCppCode = false;
    }

    /*
     *  SPECIAL FO FEEDBACK
     */
    if (nodeObj.NAME.toLowerCase().search("feedback") > -1){
        nodeObj.getPorts().each(function(portIndex, portObj){
            port.userData.executionOrder = 1;
        });
    }

  });

  /*
   *  Set executionOrder of ALL PORTS to appropriate defualt value
   */
  allPorts.each(function(portIndex, portObj){
    if (portObj.userData == undefined) portObj.userData = {};
    portObj.userData.value = 0;
    portObj.userData.status = 0;
    portObj.useGradient = false;

    //coloring port and set value based on if it's input or output
    if (portObj.NAME.toLowerCase().search("inputport") >= 0){
      /* if port is input it's colored as input and execution order is -1 because there
      must be waiting for value */
      //portObj.setBackgroundColor(new draw2d.util.Color(255,255,0));
      portObj.userData.executionOrder = -1;
    }
    else if (portObj.NAME.toLowerCase().search("outputport") >= 0){
      if (portObj.getParent().getInputPorts().getSize() == 0){
        /* if there are just output ports than their values must be already accessible
        (if there would be som subblocks they will be evaluated as soon this node
        will be running here we figure out that these nodes will be first executed) */
        //portObj.setBackgroundColor(new draw2d.util.Color(0,255,0));
        portObj.userData.executionOrder = 1;
      }else{
        /* if node has some inputs, it means that it cannot be executed until all data
        at them are accessible, so status is set to 0 and corresponding color for
        input is used */
        //portObj.setBackgroundColor(new draw2d.util.Color(255,255,255));
        portObj.userData.executionOrder = -1;
      }
    }

    //remove label nodes from all nodes, this is because these labels are execution order for debugging
    portObj.getParent().getChildren().each(function(childIndex, childObj){
      //check if label was placed as execution order, it's written in its user data as datatype
      if (childObj.NAME.toLowerCase().search("label") >= 0 && childObj.userData != null && childObj.userData.datatype != null && childObj.userData.datatype.search("executionOrder") > -1){
        portObj.getParent().remove(childObj);
      }
    });

    /****************************************************************
     *  EXTERNAL INPUT Port
     *  EXTERNAL OUTPUT Port
     *    - label is child object of VerticalLayout, so execution order label is not directly visible to canvas, but need to be access thorugh parent object
     *    - remove label with executionOrder
     ****************************************************************/
    var externalPortParent = portObj.getParent().getParent();
    if (
      (externalPortParent != undefined &&
       externalPortParent != null) &&
      (externalPortParent.NAME.toLowerCase().search("externaloutputport") != -1 ||
       externalPortParent.NAME.toLowerCase().search("externalinputport") != -1)
    )
    {
      externalPortParent.getChildren().each(function(childIndex, childObj){
        //check if label was placed as execution order, it's written in its user data as datatype
        if (childObj.NAME.toLowerCase().search("label") >= 0 && childObj.userData != null && childObj.userData.datatype != null && childObj.userData.datatype.search("executionOrder") > -1){
          externalPortParent.remove(childObj);
        }
      });
    }

    /****************************************************************
     *  FOR MULTILAYER NODES remove executionOrder Label
     ****************************************************************/
    multilayerObj = portObj.getParent();
    if (multilayerObj.NAME.toLowerCase().search("multilayered") > -1){

	  /*
	   *	THIS SHOULDN'T BE RUNNING BUT THIS REMOVE MOST EXECUTION LABELS, NEED INSPECTION!!!!!!
	   *	remove execution order labels from all figures inside layers
	   */

	  multilayerObj.layers.each(function(childIndex, childObj){
        if (childObj.NAME.toLowerCase().search("jailhouse") > -1){
          childObj.getChildren().each(function(layerChildIndex, layerChildObj){
            if (layerChildObj.userData.datatype.toLowerCase().search("executionorder") > -1){
              childObj.remove(layerChildObj);
            }
          });
        }
      });

/*    NOT USED ANYMORE, THERE IS NO PROTECTION RECTANGLE FOR MULTILAYER NODES
      multilayerObj.rect0.getChildren().each(function(layerChildIndex, layerChildObj){
        if (layerChildObj.userData.datatype.toLowerCase().search("executionorder") > -1){
           multilayerObj.rect0.remove(layerChildObj);
        }
      });
*/

    }

    /*
	 *  DON'T KNOW WHY BUT THIS REMOVE TOP LEVEL MULTILAYERED EXECUTION ORDER LABELS?????
	 *	remove execution order labels from multilayered structure
	 */
    multilayerObj = portObj.getParent().getParent();
    if (multilayerObj && multilayerObj.NAME.toLowerCase().search("multilayered") > -1){
	  multilayerObj.layers.each(function(childIndex, childObj){
        if (childObj.NAME.toLowerCase().search("jailhouse") > -1){
          childObj.getChildren().each(function(layerChildIndex, layerChildObj){
            if (layerChildObj.userData.datatype.toLowerCase().search("executionorder") > -1){
              childObj.remove(layerChildObj);
            }
          });
        }
      });
    }

    /**********************************************************************************************************************
     *          FEEDBACK NODE PORT INITIALIZATION
     *           Set port userData.execusionOrder to 1 for input and output so feedback is run at beginning, if there area
     *           no data it will put at output default value, Feedback has to run this way and it's correct.
     *
     */

    //  FEEDBACK, SET PORTS OUTPUT INPUT EXECUTION Order
    //FOR MULTILAYER NODES remove executionOrder Label
    nodeObj = portObj.getParent();
    if (nodeObj.NAME.toLowerCase().search("feedback") > -1){
      nodeObj.getInputPort(0).userData.executionOrder = 1;
      nodeObj.getOutputPort(0).userData.executionOrder = 1;
    }


  });
}

/**
 *  @method showPortExecutionOrder
 *  @param {draw2d.Canvas} canvas - schematic where will be displayed execution order for nodes and tunnels
 *  @description Put label with port execution order next to each port which is children of canvas. Means it was added to canvas no to object like loop.
 */
GraphLang.Utils.showPortExecutionOrder = function(canvas){
  var allPorts = canvas.getAllPorts();
  allPorts.each(function(portIndex, portObj){
    if (portObj.getParent().NAME.toLowerCase().search("tunnel") >= 0){
      canvas.add(
        new draw2d.shape.basic.Label({
          x: portObj.getX() + portObj.getParent().getX() + portObj.getParent().getParent().getX(), //ports have relative position to parent obj
          y: portObj.getY() + portObj.getParent().getY() + portObj.getParent().getParent().getY(),
          text:new String(portObj.getUserData().executionOrder),
          stroke:1, color:"#FF0000", fontColor:"#0d0d0d"
        })
      );
    }else{
      canvas.add(
        new draw2d.shape.basic.Label({
          x: portObj.getX() + portObj.getParent().getX(), //ports have relative position to parent obj
          y: portObj.getY() + portObj.getParent().getY(),
          text:new String(portObj.getUserData().executionOrder),
          stroke:1, color:"#FF0000", fontColor:"#0d0d0d"
        })
      );
    }
  });
}
/**
 *  @method bringToFront
 *  @param {draw2d.Canvas} canvas - from where is taken actual selection
 *  @description Bring to front actual selected figure in canvas.
 */
GraphLang.Utils.bringToFront = function(canvas){
  var selectedFigures = canvas.getSelection();
  if (selectedFigures){
    selectedFigures.each(function(selectionIndex, selectionObj){
      selectionObj.toFront();
    });
  }
}

/**
 *  @method bringToBack
 *  @param {draw2d.Canvas} canvas
 *  @description Moves selected objects to back.
 */
GraphLang.Utils.bringToBack = function(canvas){
  var selectedFigures = canvas.getSelection();
  if (selectedFigures){
    selectedFigures.each(function(selectionIndex, selectionObj){
      selectionObj.toBack();
    });
  }
}

/**
 *  @method showNodes
 *  @param {draw2d.Canvas} canvas - schematic where will be place labels next to ports
 *  @description Put label "-1" into middle of all nodes. This is method for debugging to see how IDE see nodes, what all is node.
 */
GraphLang.Utils.showNodes = function(canvas){
  var allNodes = canvas.getFigures();

  allNodes.each(function(nodeIndex, nodeObj){
    //if (nodeObj.NAME.toLowerCase().search("graphlang") < 0) return; //THIS RETURN IN CASE THAT NODE IS NOT GRAPHLANG NODE

    //SHOW TRIGGERED LABEL ON LOOP
    if (nodeObj.NAME.toLowerCase().search("loop") > 0){
      var allSubNodes = nodeObj.getChildren();
      allSubNodes.each(function(nodeIndex, nodeObj){
        if (nodeObj.NAME.toLowerCase().search("shapes.basic") > 0){ //put label just for nodes, for now suppose that's all shapes.basic
          nodeObj.add(
            new draw2d.shape.basic.Label({
              text:"-1",
              stroke:1, color:"#00FF00", fontColor:"#0d0d0d"  //GREEN DECORATED LABEL
            }),
            new draw2d.layout.locator.CenterLocator(nodeObj)
          );
        }
      });
    }else{
      nodeObj.add(
        new draw2d.shape.basic.Label({
          text:"-1",
          stroke:1, color:"#FF0000", fontColor:"#0d0d0d"
        }),
        new draw2d.layout.locator.CenterLocator(nodeObj)
      );
    }
  });
};

/**
 *  @method getNodeLoopOwner
 *  @param {draw2d.Canvas} canvas - schematic from which is node or loop
 *  @param {draw2d.shape.Node} nodeObj=null - node or loop objec which is inspected for its loop owner
 *  @description Return loop which ownes node, if there's no loop return null.
 *  @returns {GraphLang.Shapes.Basic.Loop|null} Found node owner, if none then return null.
 */
GraphLang.Utils.getNodeLoopOwner = function(canvas, nodeObj){
  var loopList = new draw2d.util.ArrayList();

  //get lsit of all loops
  canvas.getFigures().each(function(figureIndex, figureObj){
    if (figureObj.NAME.toLowerCase().search("loop") >= 0 && figureObj !== nodeObj){
      loopList.push(figureObj);
    }
  });

  //find all parent loop of this node
  // There could be two cases:
  //    1. node is part normal one layer loop - WhileLoop or ForLoop
  //    2. node is part of multilayered loop - case structure
  var nodeParentLoop = null;
  loopList.each(function(loopIndex, loopObj){
    if (loopObj.NAME.toLowerCase().search("multilayered") == -1 ||  //decision if dealing with multilayered loop, also need to think about layers of multilayered that reason why jailhouse is here also
        loopObj.NAME.toLowerCase().search("jailhouse") == -1){

      if (loopObj != nodeObj && typeof loopObj.getAboardFigures !== "undefined" && loopObj.getAboardFigures().contains(nodeObj)){        //comparison for one layer loop
        nodeParentLoop = loopObj;
      }else{
        if (loopObj != nodeObj && typeof loopObj.getAssignedFigures !== "undefined" && loopObj.getAssignedFigures().contains(nodeObj)){        //comparison for one layer loop
          nodeParentLoop = loopObj;
        }
      }

    }else{
      loopObj.getAllLayers().each(function(layerIndex, layerObj){
        if (layerObj != nodeObj && layerObj.getAssignedFigures().contains(nodeObj)){
          nodeParentLoop = loopObj;
        }
      });
    }
  });
  return nodeParentLoop;
};

/**
 *  @method getLoopDirectChildrenNodes
 *  @param {draw2d.Canvas} canvas - schematic in which is loop located
 *  @param {GraphLang.Shapes.Basic.Loop} parentLoop - loop which children are required, default value null
 *  @description Returns nodes which are direct descendant of loop, so there are no nodes nested inside other inner loops. If parent loop is not provided or undefined it return all nodes which are direct children of canvas.
 *  @returns {GraphLang.Shapes.Basic} List of children GraphLang nodes for loop or owned by canvas.
 */
GraphLang.Utils.getLoopDirectChildrenNodes = function(canvas, parentLoop = null){
  var allLayerNodes = new draw2d.util.ArrayList();

  canvas.getFigures().each(function(figureIndex, figureObj){
    if ((figureObj.NAME.toLowerCase().search("loop") < 0) &&
        (figureObj.NAME.toLowerCase().search("tunnel") < 0) &&
        (GraphLang.Utils.getNodeLoopOwner(canvas, figureObj)) == parentLoop) allLayerNodes.push(figureObj);
  });

  return allLayerNodes;
}

/**
 *  @method getDirectChildrenWithoutTunnels
 *  @param {draw2d.Canvas} canvas - schematic in which is loop located
 *  @param {GraphLang.Shapes.Basic.Loop} parentLoop - loop which children are required, default value null
 *  @description Returns direct children of provided object. These returns objects which are not nested inside loop. Also return loops objects. If parent object is not provided it returns direct canvas children.
 *  @returns {GraphLang.Shapes.Basic} List of children GraphLang nodes without tunnels.
 */
GraphLang.Utils.getDirectChildrenWithoutTunnels = function(canvas, parentObj){
  var allLayerNodes = new draw2d.util.ArrayList();

  //REALLY PAY ATTENTION ABOUT SYNTAX HERE AND READ CAREFULLY
  //below is string comparison and items are named there and between them is OR operator!
  canvas.getFigures().each(function(figureIndex, figureObj){
    if (figureObj.NAME.toLowerCase().search("tunnel") == -1 &&
        (figureObj.NAME.toLowerCase().search("loop") > -1 ||            //this condition is list of allowed objects which are added as direct children objects, if something not running when added new structures here is probably error, need to add to this list
        figureObj.NAME.toLowerCase().search("multilayered") > -1 ||
        figureObj.NAME.toLowerCase().search("node") > -1 ||
        figureObj.NAME.toLowerCase().search("port") > -1) &&
        GraphLang.Utils.getNodeLoopOwner(canvas, figureObj) == parentObj){
          allLayerNodes.push(figureObj);
        }
  });

  return allLayerNodes;
}

/**
 *  @method executionOrder
 *  @param {draw2d.Canvas} canvas
 *  @description Returns execution order in which nodes run.
 */
GraphLang.Utils.executionOrder = function executionOrder(canvas){
  var allNodes = canvas.getFigures();

  //ADDING LOOP TUNNELS TO OTHER NODES, tunnels are part of loop not canvas so they are not detected by canvas.getFigures()
  allNodes.each(function(nodeIndex, nodeObj){
    if (nodeObj.userData == undefined || nodeObj.userData == null){
      nodeObj.userData = {};
      nodeObj.userData.executionOrder = -1;
    }

    //ADD ALL LOOP'S TUNNELS into node list
    if (nodeObj.NAME.toLowerCase().search("loop") >= 0){
      var loopTunnels = new draw2d.util.ArrayList();
      nodeObj.getUserData().executionOrder = 1;   // default value for loops if other it will change in next calculations
      nodeObj.getChildren().each(function(childIndex, childObj){
        if (childObj.NAME.toLowerCase().search("tunnel") >= 0){
          allNodes.push(childObj);
        }
      });
    }

    //ADD ALL PROPERTY NODE ITEMS
    if (nodeObj.NAME.toLowerCase().search("itemsnode") >= 0){
      var loopTunnels = new draw2d.util.ArrayList();
      nodeObj.getChildren().each(function(childIndex, childObj){
        if (childIndex > 0 && childObj.NAME.toLowerCase().search("label") >= 0){  //skip property node label
          allNodes.push(childObj);
        }
      });
    }
  });

  let cnt1 = 0;
  let inputPortCnt = 0;

  /******************************************************************************
   *  IMPORTANT NOT START AT 0, actualStepNum must start at 1 because for step 0
   *  there is no rule how to increase it or somethin, I choose to do this
   *  because 0 is weird zero :D
   *
   *  portObj.getUserData().executionOrder    NEVER 0
   *      -1 .....not executed, data not available stylesheet
   *      +1 .....prepared, OK
   ******************************************************************************/

  /**
   *    This will add steps for infinite big schematic, when actual step is not changed during evaluation it means all nodes have assigned execution order.
   *        - if there left nodes without execution order it means there are loops and which has to be resolved by changing schematic by user.
   */
  let actualStepNumberWasAssigned = true;  //set to true just to enter while loop
  let actualStepNum = 0;
  let additionalStepsCounterBeforeExit = 3;

  while (actualStepNumberWasAssigned){
    actualStepNum++;
    actualStepNumberWasAssigned = false;

    allNodes.each(function(nodeIndex, nodeObj){

      //gathering information about input ports, checking if all of them are already prepared
      nodeObj.getInputPorts().each(function(portIndex, portObj){
        if (portObj.getUserData().executionOrder > 0) cnt1++; //counting prepared input ports
        else if (portObj.getUserData().executionOrder < 0){

          /*
           *    CHECK STATE OF CONNECTED OUTPUTS BEFORE THIS PORT
           *        - if input port is not ready, check connected ports for which is this port waiting and check their status
           *        - if input port is ready then signalized that actual step is true, BUT STEP NUMBER WILL BE ASSIGNED IN NEXT PASS
           */
          let inPortPrepared = true;
          portObj.getConnections().each(function(wireIndex, wireObj){
              if (wireObj.getSource() && wireObj.getSource().getExecutionOrder){
                  //if there is function on output port which provides execution order use it
                  if (wireObj.getSource().getExecutionOrder() < 0){
                      inPortPrepared = false;
                  }
              }else if (wireObj.getSource() && wireObj.getSource().getUserData().executionOrder < 0){
                  inPortPrepared = false;
              }
          });
          if (inPortPrepared == true) actualStepNumberWasAssigned = true;   //node input ports are prepared but node step number will be assigned in next pass, NEED TO SIGNALIZED otherwise step assignment will stop

          //CHECK FOR CONTENT INSIDE LOOP IF WAIT FOR INPUT TUNNELS
          if (nodeObj.NAME.toLowerCase().search("tunnel") >= 0){
            var nodeParentLoop = GraphLang.Utils.getNodeLoopOwner(canvas, portObj.getParent());
            var leftTunnelCnt = 0;
            while (nodeParentLoop != undefined && inPortPrepared == true){

              //DEBUG PURPOSES, this was to paint loop background to yellow
              //nodeParentLoop.setBackgroundColor(new GraphLang.Utils.Color("#FFFF00")); //highlight current loop

              //check if all input tunnels are prepared, if not, input port of current node is set to wait, executionOrder left as it is
              nodeParentLoop.getChildren().each(function(tunnelIndex, tunnelObj){
                if (tunnelObj.NAME.toLowerCase().search("lefttunnel") >= 0){
                  leftTunnelCnt++;
                  if (tunnelObj == undefined ||
                      tunnelObj.getOutputPort(0).userData == undefined ||
                      tunnelObj.getOutputPort(0).userData.executionOrder == undefined ||
                      tunnelObj.getOutputPort(0).userData.executionOrder < 0) inPortPrepared = false;
                }
              });
              //if there are no input tunnels go for loop higher look if there are some input tunnels for which we have to wait
              //if some parent loop has some input tunnels it's not needed to go higher, because everything inside that loop will
			  //wait for these input tunnels, so we can set nodeParentLoop to undefined what cause end of while loop
              if (leftTunnelCnt == 0) nodeParentLoop = GraphLang.Utils.getNodeLoopOwner(canvas,nodeParentLoop);
              else nodeParentLoop = undefined;
            }
          }

          //IF PORT IS PREPARED SET ITS EXECUTION ORDER
          if (inPortPrepared == true){
            if (portObj.userData == undefined)  portObj.userData = {};
            portObj.userData.executionOrder = actualStepNum;
            actualStepNumberWasAssigned = true;    //PORT execution order was assign therefore there was change
          }
        }
        inputPortCnt++; //conting input ports of node
      });

      //PROPERTY NODE, waiting until all items are set to continue
      if (nodeObj.getParent() != undefined && nodeObj.getParent().NAME.toLowerCase().search("itemsnode") >= 0){
        var isPropertyNodePrepared = true;
        nodeObj.getParent().getChildren().each(function(childIndex, childObj){  //check all items if their inputs are prepared
          if (childIndex > 0){  //skip property name label
            childObj.getInputPorts().each(function(inPortIndex, inPortObj){
              if (inPortObj.userData.executionOrder == -1) isPropertyNodePrepared = false;
            });
          }
        });
        if (!isPropertyNodePrepared){cnt1 = 0; inputPortCnt = 1;} //if inputs are not prepared just set counters into invalid state and execution order is not generated
        else if (nodeObj.getParent().userData.executionOrder == -1){
            nodeObj.getParent().userData.executionOrder = actualStepNum;    //set PropertyNode executionOrder
            actualStepNumberWasAssigned = true;                                    //NODE execution order was assign therefore there was change
        }
      }

      /***************************************************************************************
       *  PLACING LABEL INTO MIDDLE OF NODE
       ***************************************************************************************/

      if (cnt1 == inputPortCnt){
        //OUTPUT PORT EXECUTION ORDER UPDATE
        var isNodeLabelAdded = false;
        nodeObj.getOutputPorts().each(function(portIndex, portObj){
          if (portObj.getUserData().executionOrder < 0){
            portObj.userData.executionOrder = actualStepNum + 1;  //result is on output in next step that's why +1
          }
        });

        //PLACE LABEL WITH EXECUTION ORDER INTO MIDDLE OF NODE, execept for property and invoke node, they have subelements with labels
        if (nodeObj.userData.executionOrder == -1 &&
			nodeObj.NAME.toLowerCase().search("itemsnode") == -1 &&
			nodeObj.NAME.toLowerCase().search("jailhouse") == -1		//DON'T PUT LABEL FOR jailhouse, they are layers of multilayered structure
		){
		  nodeObj.userData.executionOrder = actualStepNum;
          nodeObj.add(
            new draw2d.shape.basic.Label({
              text:new String(actualStepNum),
              stroke:1, color:"#FF0000", fontColor:"#0d0d0d", bgColor: "#FF0000",
              userData: {datatype: "executionOrder"}
            }),
            new draw2d.layout.locator.CenterLocator(nodeObj)
          );
        }
      }

      //COUNTERS RESET, cnt1 = counter of prepared inputs, inputPortCnt = count of input ports
      cnt1 = 0;
      inputPortCnt = 0;
    });

    //TODO: THIS WILL do some additional steps before exit, there is some error in assignment counting therefore this will fix for some cases that issue
    if (actualStepNumberWasAssigned == false && additionalStepsCounterBeforeExit > 0){
        additionalStepsCounterBeforeExit--;
        actualStepNumberWasAssigned = true;
    }
  }


  //set EXECUTION ORDER for LOOPS
  allNodes.each(function(nodeIndex, nodeObj){
    if (nodeObj.NAME.toLowerCase().search("loop") >= 0){
      nodeObj.setExecutionOrderByTunnels(canvas);
    }
  });
}

/**
 *  @method loopsRecalculateAbroadFigures
 *  @param {draw2d.Canvas} canvas - schematic which will be recalculated
 *  @description Reevaluate children nodes of every loop on canvas. This function was implemented because sometimes it looks like there are problems with this when new loops are added.
 */
GraphLang.Utils.loopsRecalculateAbroadFigures = function(canvas){
  canvas.getFigures().each(function(loopIndex, loopObj){
    if (loopObj.NAME.toLowerCase().search("loop") >= 0 &&
        loopObj.NAME.toLowerCase().search("multilayered") == -1 &&
        loopObj.NAME.toLowerCase().search("whilelayer") == -1 &&
        loopObj.NAME.toLowerCase().search("loop2") == -1 &&
		loopObj.NAME.toLowerCase().search("forloop") == -1){
          loopObj.getAboardFigures(true);
    }
  });
}

/**
 *  @method initLoopsZOrder
 *  @param {draw2d.Canvas} canvas - schematic where correcting z-order should happen
 *  @description EXPERIMENTAL! STILL WRONG. <br/><br/>Go through all loops in schematic and setup right their z-order. This function is implemented because z-order is probably not right after loading schematic, so this function set it. If it's loaded correctly it should have no imapct on schematic.
 */
GraphLang.Utils.initLoopsZOrder = function(canvas){
  var allFigures = canvas.getFigures();

  //first get list of all loops in schematic
  var allLoops = new draw2d.util.ArrayList();
  allFigures.each(function(figureIndex, figureObj){
    if (figureObj.NAME.toLowerCase().search("loop") >= 0){

      allLoops.push(figureObj);
    }
  });

  //then order loops by their ownership
  // THIS IS RECURSIVE .............................AND NOW WRONG WRONG WRONG!

  /*
    This is not going to work, beacause I need to reimplement if loop contain another loop,
    imagine I load file and I have there some loop which are rectangles and their boundaries
    are set right what means that I need to figure out by looking on picture if they contains
    each other what means I need to just check their geometry, so here will be some simple math
    chekcing algorithm over array list items.

    UNDER HEAVY CONSTRUCTION, beer out, no battery need to go to sleep mode...
  */

  // var orderedLoops = new draw2d.util.ArrayList();
  // allLoops.each(function(loopIndex, loopObj){ //init root of tree, all loops which are descendant of undefined what means top loops
  //   if (GraphLang.Utils.getNodeLoopOwner(canvas, loopObj) == undefined){
  //      orderedLoops.push(loopObj);
  //   }
  // });
  // allLoops.each(function serializeLoopTreeIntoList(loopIndex, loopObj){
  //   var localOrderedLoops = new draw2d.util.ArrayList();
  //   //get direct descendants
  //   if (GraphLang.Utils.getNodeLoopOwner(canvas, loopObj) != undefined && orderedLoops.contains(GraphLang.Utils.getNodeLoopOwner(canvas, loopObj))){
  //      localOrderedLoops.push(loopObj);
  //   }
  //   //put each descendant into list of ordered loops and go further deeper into tree
  //   localOrderedLoops.each(function(loopIndex, loopObj){
  //     orderedLoops.push(loopObj);
  //   });
  //   localOrderedLoops.each(serializeLoopTreeIntoList(loopIndex, loopObj));
  // });
  //
  // /* at the end just go through loops list from end to begin and push them to back, so loop which
  //    contains all loops would be pushed last and therefore will be visible */
  // for (var k = orderedLoops.getSize()-1; k >= 0; k--){
  //   orderedLoops.get(k).toBack();
  // }

}

/**
 *  @method showSelectedObjExecutionOrder
 *  @param {draw2d.Canvas} canvas - fromt here is taken selected object
 *  @description Display execution order of current highlighted object.
 */
GraphLang.Utils.showSelectedObjExecutionOrder = function(canvas){
    var element = canvas.getSelection().getAll().first();
    alert(element.getUserData().executionOrder);
}

/**
 * @method setWiresColorByPorts
 * @param {draw2d.Canvas} canvas - schematic where wire will be colorized
 * @description Colorize all wires in schematic according to port datatypes.
 */
GraphLang.Utils.setWiresColorByPorts = function setWiresColorByPorts(canvas){
  //set wires color by connected input ports
  canvas.getLines().each(function(lineIndex, lineObj){
    var color = new GraphLang.Utils.Color();  //GraphLang.Utils.Color is not object so we need to instantiate that class

    var wireSourceDatatype = "undefined";
    if (lineObj.getSource().getDatatype) wireSourceDatatype = lineObj.getSource().getDatatype();
    else if (lineObj.getSource().getUserData().datatype) wireSourceDatatype = lineObj.getSource().getUserData().datatype;

    if (lineObj.getSource() != undefined && lineObj.getSource().getUserData() != undefined) var lineColor = color.getByName(wireSourceDatatype);  //get hexadecimal color string from it's name
    else var lineColor = color.getByName("broken");

    lineObj.setColor(lineColor);  //set wire color
  });

  /*
   *  COPY INPUT PORT DATATYPE TO OUTPUT AND CHANGE TUNNEL Color
   *  running twice to be sure that in first run all lefttunnels are rewritten and after in second run all consequence tunnels are rewritten
   *  *this is WRON SOLUTION ERROR when there is chain of tunnels, if there are N tunnels I need to run this N times, NEED IMPORVE!
   */

   /*
    *   FIND LOOPS and return TUNNEL LIST
    */
   var allNodes = canvas.getFigures();
   var allTunnels = new draw2d.util.ArrayList();
   allNodes.each(function(nodeIndex, nodeObj){
     //get loops from canvas
     if (nodeObj.NAME.toLowerCase().search("loop") >= 0){
       if (nodeObj.getUserData() == undefined) nodeObj.userData.wasTranslatedToCppCode = false;
       nodeObj.getUserData().wasTranslatedToCppCode = false;

       nodeObj.getChildren().each(function(childIndex, childObj){
         if (childObj.NAME.toLowerCase().search("lefttunnel") >= 0){
           allTunnels.push(childObj);
         }
         else if (childObj.NAME.toLowerCase().search("righttunnel") >= 0){
           allTunnels.push(childObj);
         }
       });
     }
   });

   //default Color object and datatype variable used for transfer input datatype of tunnel to its output
   var colorPicker = new GraphLang.Utils.Color();
   var inputPortDatatype = "undefined";

    /*
     *  CHANGE TUNNELS COLOR
     */
  allTunnels.each(function(tunnelIndex, tunnelObj){
    //tunnelObj.setColor(new GraphLang.Utils.Color("#FF0000"));
    //wireColor = colorPicker.getByName();
    if (tunnelObj.getInputPort(0).getConnections().getSize() > 0){
        if (tunnelObj.getInputPort(0).getConnections().get(0).getSource().getDatatype) {
            inputPortDatatype = tunnelObj.getInputPort(0).getConnections().get(0).getSource().getDatatype();
        }else if (tunnelObj.getInputPort(0).getConnections().get(0).getSource().getUserData().datatype){
            inputPortDatatype = tunnelObj.getInputPort(0).getConnections().get(0).getSource().getUserData().datatype;
        }
    }else{
      inputPortDatatype = "undefined";
    }

    wireColor = colorPicker.getByName(inputPortDatatype);
    tunnelObj.getOutputPort(0).userData.datatype = inputPortDatatype; //copy input datatype to output port
    tunnelObj.getInputPort(0).userData.datatype = inputPortDatatype; //copy input datatype to output port
    tunnelObj.setBackgroundColor(wireColor);                          //change tunnel color
  });

}

/**
 * @method getCanvasJson
 * @param {draw2d.Canvas} canvas - schematic which will be serialize to JSON
 * @returns {String} jsonStr
 * @description For selected loop show number of tunnels.
 */
GraphLang.Utils.getCanvasJson = function (canvas) {
    var writer = new draw2d.io.json.Writer();
    var jsonStr = '';
    writer.marshal(canvas, function (json) {
        var clearedJson = [];
        var wrongJson = [];
        for (var k = 0; k < json.length; k++) {
            if (json[k].type != undefined && json[k].type.toLowerCase().search("multilayered") > -1) {
                var multilayeredJson = canvas.getFigure(json[k].id);
                var multilayerChooser = multilayeredJson.getChildren().get(0);

                var chooserObj = new draw2d.shape.basic.Label(multilayerChooser);
                //clearedJson.push(chooserObj);
                clearedJson.push(json[k]);
                // alert(multilayerChooser.text);
            } else if (json[k].type != undefined && json[k].type.toLowerCase().search("connection") > -1) {
                //alert("connection");
                clearedJson.push(json[k]);
            } else if (json[k].type != undefined && json[k].type.toLowerCase().search("terminaloutput") > -1) {
                let outputTerminalObj = canvas.getFigure(json[k].id);
                json[k].userData.datatype = outputTerminalObj.getDatatype();

                clearedJson.push(json[k]);
            } else if (json[k].type != undefined && json[k].type.toLowerCase().search("tunnel") == -1) {
                clearedJson.push(json[k]);
            } else {
                wrongJson.push(json[k]);
            }
        }

        jsonStr = JSON.stringify(clearedJson, null, 2);
        // jsonStr = JSON.stringify(wrongJson, null, 2);

        var copyElement = document.createElement('textarea');

        copyElement.innerHTML = "var jsonDocument = " + jsonStr + ";";
        jsonStr = copyElement.innerHTML;
        copyElement = document.body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        copyElement.remove();
    });

    return jsonStr;
}

/**
 * @method getCanvasAsObjectString
 * @param {draw2d.Canvas} canvas - schematic which will be serialize to JSON
 * @returns {String}  string containing whole class definition
 * @description Creates class definition for GraphLang to load.
 */
GraphLang.Utils.getCanvasAsObjectString = function(canvas){
  var writer = new draw2d.io.json.Writer();
  var schematicAsObjectStr = '';
  writer.marshal(canvas,function(json){
      var clearedJson = [];
      var wrongJson = [];
      for (var k = 0; k < json.length; k++){
        if (json[k].type != undefined && json[k].type.toLowerCase().search("multilayered") > -1){
          var multilayeredJson = canvas.getFigure(json[k].id);
          var multilayerChooser = multilayeredJson.getChildren().get(0);

          var chooserObj =  new draw2d.shape.basic.Label(multilayerChooser);
          //clearedJson.push(chooserObj);
          clearedJson.push(json[k]);
          // alert(multilayerChooser.text);
        }else if (json[k].type != undefined && json[k].type.toLowerCase().search("connection") > -1){
          //alert("connection");
          clearedJson.push(json[k]);
        }else if (json[k].type != undefined && json[k].type.toLowerCase().search("terminaloutput") > -1){
            let outputTerminalObj = canvas.getFigure(json[k].id);
            json[k].userData.datatype = outputTerminalObj.getDatatype();

            clearedJson.push(json[k]);
        }else if (json[k].type != undefined && json[k].type.toLowerCase().search("tunnel") == -1){
          clearedJson.push(json[k]);
        }else{
          wrongJson.push(json[k]);
        }
      }

      var jsonCanvasStr = JSON.stringify(clearedJson, null, 2);
      var objectDefaultName = $("#schematicName").val();


      /*
       *    If object was loaded from some file ie. means that it can have some symbol defined,
       *    then init function and shape functions are taken original ones.
       */
      if (GraphLang.Utils.loadedNodeShapeAndSchematicStr !== null){
            // schematicAsObjectStr += '/******************************************* STORED FROM PREVIOUS NODE **********************************/' + "\n";
            // schematicAsObjectStr += GraphLang.Utils.loadedNodeShapeAndSchematicStr + "\n";
            // schematicAsObjectStr += '/********************************************************************************************************/' + "\n";

            schematicAsObjectStr += GraphLang.Utils.getNodeCodeWithReplacedSchematicWithCurrentCanvas(objectDefaultName ,"GraphLang.UserDefinedNode", jsonCanvasStr);
      }else{
            schematicAsObjectStr += objectDefaultName + ' = GraphLang.UserDefinedNode.extend({' + "\n";
            schematicAsObjectStr += 'NAME: "' + objectDefaultName + '",' + "\n";

            schematicAsObjectStr += 'init: function(attr)' + "\n";
            schematicAsObjectStr += '{' + "\n";
            schematicAsObjectStr += '    this._super($.extend({width: 42, height: 42, flagAutoCreatePorts: true}, attr));' + "\n";
            schematicAsObjectStr += '},' + "\n";

            schematicAsObjectStr += "jsonDocument: " + jsonCanvasStr + ",\n";     //json schematic is saved new one

            schematicAsObjectStr += 'applyAlpha: function(){},' + "\n";
            schematicAsObjectStr += 'layerGet: function(name, attributes){' + "\n";
            schematicAsObjectStr += '  if(this.svgNodes===null) return null;' + "\n";
            schematicAsObjectStr += '  var result=null;' + "\n";
            schematicAsObjectStr += '  this.svgNodes.some(function(shape){' + "\n";
            schematicAsObjectStr += '     if(shape.data("name")===name){' + "\n";
            schematicAsObjectStr += '        result=shape;' + "\n";
            schematicAsObjectStr += '     }' + "\n";
            schematicAsObjectStr += '     return result!==null;' + "\n";
            schematicAsObjectStr += '  });' + "\n";
            schematicAsObjectStr += '  return result;' + "\n";
            schematicAsObjectStr += '},' + "\n";
            schematicAsObjectStr += 'layerAttr: function(name, attributes){' + "\n";
            schematicAsObjectStr += ' if(this.svgNodes===null) return;' + "\n";
            schematicAsObjectStr += ' this.svgNodes.forEach(function(shape){' + "\n";
            schematicAsObjectStr += '         if(shape.data("name")===name){' + "\n";
            schematicAsObjectStr += '              shape.attr(attributes);' + "\n";
            schematicAsObjectStr += '         }' + "\n";
            schematicAsObjectStr += ' });' + "\n";
            schematicAsObjectStr += '},' + "\n";
            schematicAsObjectStr += 'layerShow: function(name, flag, duration){' + "\n";
            schematicAsObjectStr += '  if(this.svgNodes===null) return;' + "\n";
            schematicAsObjectStr += '  if(duration){' + "\n";
            schematicAsObjectStr += '    this.svgNodes.forEach(function(node){' + "\n";
            schematicAsObjectStr += '        if(node.data("name")===name){' + "\n";
            schematicAsObjectStr += '            if(flag){' + "\n";
            schematicAsObjectStr += '                node.attr({ opacity : 0 }).show().animate({ opacity : 1 }, duration);' + "\n";
            schematicAsObjectStr += '            }' + "\n";
            schematicAsObjectStr += '            else{' + "\n";
            schematicAsObjectStr += '                node.animate({ opacity : 0 }, duration, function () { this.hide() });' + "\n";
            schematicAsObjectStr += '            }' + "\n";
            schematicAsObjectStr += '        }' + "\n";
            schematicAsObjectStr += '    });' + "\n";
            schematicAsObjectStr += '  }' + "\n";
            schematicAsObjectStr += '  else{' + "\n";
            schematicAsObjectStr += '      this.svgNodes.forEach(function(node){' + "\n";
            schematicAsObjectStr += '          if(node.data("name")===name){' + "\n";
            schematicAsObjectStr += '               if(flag){node.show();}' + "\n";
            schematicAsObjectStr += '               else{node.hide();}' + "\n";
            schematicAsObjectStr += '           }' + "\n";
            schematicAsObjectStr += '       });' + "\n";
            schematicAsObjectStr += '  }' + "\n";
            schematicAsObjectStr += '},' + "\n";
            schematicAsObjectStr += 'getParameterSettings: function(){' + "\n";
            schematicAsObjectStr += '    return [];' + "\n";
            schematicAsObjectStr += '},' + "\n";
            schematicAsObjectStr += 'addPort: function(port, locator){' + "\n";
            schematicAsObjectStr += '    this._super(port, locator);' + "\n";
            schematicAsObjectStr += '    return port;' + "\n";
            schematicAsObjectStr += '},' + "\n";
            schematicAsObjectStr += 'getPersistentAttributes : function(){' + "\n";
            schematicAsObjectStr += '    var memento = this._super();' + "\n";
            schematicAsObjectStr += '    memento.labels = [];' + "\n";
            schematicAsObjectStr += '    this.children.each(function(i,e){' + "\n";
            schematicAsObjectStr += '        var labelJSON = e.figure.getPersistentAttributes();' + "\n";
            schematicAsObjectStr += '        labelJSON.locator=e.locator.NAME;' + "\n";
            schematicAsObjectStr += '        memento.labels.push(labelJSON);' + "\n";
            schematicAsObjectStr += '    });' + "\n";
            schematicAsObjectStr += '    return memento;' + "\n";
            schematicAsObjectStr += '},' + "\n";
            schematicAsObjectStr += 'setPersistentAttributes : function(memento){' + "\n";
            schematicAsObjectStr += '    this._super(memento);' + "\n";
            schematicAsObjectStr += '    this.resetChildren();' + "\n";
            schematicAsObjectStr += '    $.each(memento.labels, $.proxy(function(i,json){' + "\n";
            schematicAsObjectStr += '        var figure =  eval("new "+json.type+"()");' + "\n";
            schematicAsObjectStr += '        figure.attr(json);' + "\n";
            schematicAsObjectStr += '        var locator =  eval("new "+json.locator+"()");' + "\n";
            schematicAsObjectStr += '        this.add(figure, locator);' + "\n";
            schematicAsObjectStr += '    },this));' + "\n";
            schematicAsObjectStr += '}' + "\n";
            schematicAsObjectStr += "});\n";
      }

      var copyElement = document.createElement('textarea');
      copyElement.innerHTML = schematicAsObjectStr;
      jsonCanvasStr = copyElement.innerHTML;
      copyElement = document.body.appendChild(copyElement);
      copyElement.select();
      document.execCommand('copy');
      copyElement.remove();
  });

  return schematicAsObjectStr;
}

/**
 * @method getCanvasAsPNG
 * @param {draw2d.Canvas} canvas - schematic which will be exported as PNG base64 encoded.
 * @description Copy diagram as PNG image.
 */
GraphLang.Utils.getCanvasAsPNG = function(canvas){
        var writer = new draw2d.io.png.Writer();
        writer.marshal(canvas,function(png){
           $("#preview").attr("src",png);

           //GRAB WHOLE CANVAS AS IMAGE AND PUT IT AS base64 encoded PNG into <img>
           //this is element which content is placed into clipboard
           var copyElement = document.createElement('textarea');
           copyElement.innerHTML = png;
           copyElement = document.body.appendChild(copyElement);
           copyElement.select();
           document.execCommand('copy');
           copyElement.remove();

           var selection = canvas.getPrimarySelection();
           srcX = selection.getX() - 10;
           srcY = selection.getY() - 10;
           srcWidth = selection.getWidth() + 20;
           srcHeight = selection.getHeight() + 20;

           srcRatio = srcWidth / srcHeight;

           //GRAB IMAGE CONTENT AND DRAW IT ONTO CANVAS, ADVANTAGE IS THAT WE CAN DO CROP JUST PART OF CANVAS
           myCanvas = document.getElementById('myCanvas');
           ctx = myCanvas.getContext('2d');
           targetWidth = myCanvas.width;
           targetHeight = myCanvas.height;
/*
           ctx.drawImage(img ,sx, sy, swidth, sheight, x, y, width, height);

           img     - Specifies the image, canvas, or video element to use
           sx      - Optional. The x coordinate where to start clipping
           sy      - Optional. The y coordinate where to start clipping
           swidth  - Optional. The width of the clipped image
           sheight - Optional. The height of the clipped image
           x       - The x coordinate where to place the image on the canvas
           y       - The y coordinate where to place the image on the canvas
           width	 - Optional. The width of the image to use (stretch or reduce the image)
           height	 - Optional. The height of the image to use (stretch or reduce the image)
*/
           var image = new Image();
           image.onload = function() {
             //ctx.globalAlpha = 1; //NOT RUNNING
             ctx.beginPath();
             ctx.rect(0, 0, 300, 300);
             ctx.fillStyle = "#FFFFFF";
             ctx.fill();
             //put on canvas currently selected object
             if (srcWidth > srcHeight){
               ctx.drawImage(image,
                   srcX, srcY,   // Start at 70/20 pixels from the left and the top of the image (crop),
                   srcWidth, srcHeight,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
                   0, 0,     // Place the result at 0, 0 in the canvas,
                   targetWidth, srcHeight * targetWidth / srcWidth
               ); // With as width / height: 100 * 100 (scale)
            }else{
              ctx.drawImage(image,
                  srcX, srcY,
                  srcWidth, srcHeight,
                  0, 0,
                  srcWidth * targetHeight / srcHeight, targetHeight
              ); // With as width / height: 100 * 100 (scale)
            }
           };
           image.src = png;
        });
}

/**
 * @method setPortsColorByDatatype
 * @param {draw2d.Canvas} canvas - schematic where ports will be colorized
 * @description Colorize all ports in schematic according to theirs datatypes.
 */
GraphLang.Utils.setPortsColorByDatatype = function setWiresColorByPorts(canvas){
  canvas.getAllPorts().each(function(portIndex, portObj){
    var color = new GraphLang.Utils.Color();  //GraphLang.Utils.Color is not object so we need to instantiate that class
    // if (lineObj.getSource() != undefined && lineObj.getSource().getUserData() != undefined) var lineColor = color.getByName(lineObj.getSource().getUserData().datatype);  //get hexadecimal color string from it's name
    // else var lineColor = color.getByName("broken");
    var portColor = color.getByName(
      portObj.getUserData() !== null ? portObj.getUserData().datatype : "undefined"
    );  //get hexadecimal color string from it's name
    portObj.useGradient = false;
    portObj.setBackgroundColor(portColor);  //set wire color
  });
}

/**
 *  @method setTunnelColorByWire
 *  @param {draw2d.Canvas} canvas - source canvas from where take tunnels, all included one which belongs to loop structures
 *  @description Change color of each tunnel by connected wire datatype.
 */
GraphLang.Utils.setTunnelColorByWire = function(canvas){
  var allNodes = canvas.getFigures();
  var allTunnels = new draw2d.util.ArrayList();

  //ADDING LOOP TUNNELS TO OTHER NODES, tunnels are part of loop not canvas so they are not detected by canvas.getFigures()
  allNodes.each(function(nodeIndex, nodeObj){
    //ADD ALL LOOP'S TUNNELS into node list\
    // first search for all loops, because tunnels are part of them and then go through tunnels list
    if (nodeObj.NAME.toLowerCase().search("loop") >= 0){
      nodeObj.getChildren().each(function(childIndex, childObj){
        if (childObj.NAME.toLowerCase().search("tunnel") >= 0){
          allTunnels.push(childObj);
        }
      });
    }
    var colorPicker = new GraphLang.Utils.Color();
    allTunnels.each(function(tunnelOrder, tunnelObj){
      tunnelObj.setBackgroundColor(
        colorPicker.getByName(
            tunnelObj.getInputPort(0).getConnections().first().getSource().userData.datatype
        ));
    });
  });
}

/**
 *  @method rewriteIDtoNumbers
 *  @param {draw2d.Canvas} canvas
 *  @description Rewrite in output code all IDs to normal numbers to make output code more readible
 *  @returns {String} Translated code with rewiritten ID to something more readible - normal numbers, so code is shorter and nicer looking.
 */
GraphLang.Utils.rewriteIDtoNumbers = function(canvas, cCode, additionalIdList = null, additionalIdNoHyphenList = null){
  var translationIdTable = [];

  var allIdList = new draw2d.util.ArrayList();
  var allIdNoHyphenList = new draw2d.util.ArrayList();

  /*
   *    Check checkbox on HTML page if it's checked there will be no replace of ID to another human readible number
   */
  var codeRewriteIdHtmlElement = document.querySelector("#codeRewriteIdFlag");
  var codeRewriteIdFlag = codeRewriteIdHtmlElement ? codeRewriteIdHtmlElement.checked : false;

  canvas.getFigures().each(function(figureIndex, figureObj){
      allIdList.push(figureObj.getId());
      allIdNoHyphenList.push(figureObj.getId().replaceAll("-",""));
      if (figureObj.NAME.toLowerCase().search("loop") > -1){
        figureObj.getChildren().each(function(childIndex, childObj){
          if (childObj.NAME.toLowerCase().search("tunnel") > -1){
            allIdList.push(childObj.getId());
          }
        });
      }
  });

  canvas.getLines().each(function(connectionIndex, connectionObj){
    allIdList.push(connectionObj.getId());
  });

  //add aditional IDs into list
  if (additionalIdList) allIdList.addAll(additionalIdList);
  if (additionalIdNoHyphenList) allIdNoHyphenList.addAll(additionalIdNoHyphenList);

  //replace IDs with their order for more human readible code
  var counter = 0;
  allIdList.each(function(IdIndex, IdObj){
    var regExpression = new RegExp(IdObj, 'g');

    if (codeRewriteIdFlag) cCode = cCode.replace(regExpression, counter++);    //this replace id with number
    cCode = cCode.replace(regExpression, IdObj.replaceAll('-', '_'));    //replace id with - replaced to _
  });

  //replace IDs without hyphen - this is mainly for clusters
  var counter = 0;
  allIdNoHyphenList.each(function(IdIndex, IdObj){
      var regExpression = new RegExp(IdObj, 'g');

      if (codeRewriteIdFlag) cCode = cCode.replace(regExpression, counter++);    //this replace id with number
      cCode = cCode.replace(regExpression, IdObj.replaceAll('-', '_'));    //replace id with - replaced to _
  });

  return cCode;
}

/**
 *  @method correctWiresAfterLoad
 *  @param {draw2d.Canvas} canvas
 *  @description Correct wires targets, because some connection have attribute tunnel to which they are attached so need to set this target also here.
 */
GraphLang.Utils.correctWiresAfterLoad = function(canvas){

  /*
   *  Wires has from serialization in userData info about tunnel if they are connected to some so if wire target is assigned bad, this will correct it.
   */
  canvas.getLines().each(function(lineIndex, lineObj){
    if (lineObj.userData.targetTunnel !== undefined){
      canvas.getFigures().each(function(figureIndex, figureObj){
        if (figureObj.NAME.toLowerCase().indexOf("loop") > -1){
          figureObj.getChildren().each(function(childIndex, childObj){
            if (childObj.NAME.toLowerCase().indexOf("tunnel") > -1 &&
                childObj.getId().indexOf(lineObj.userData.targetTunnel) > -1){
                lineObj.setTarget(childObj.getPort(lineObj.userData.targetPortName));
            }
          });
        }
      });
    }
  });

  /*
   *  Same correction as before but this is for wire source.
   */
  canvas.getLines().each(function(lineIndex, lineObj){
    if (lineObj.userData.sourceTunnel !== undefined){
      canvas.getFigures().each(function(figureIndex, figureObj){
        if (figureObj.NAME.toLowerCase().indexOf("loop") > -1){
          figureObj.getChildren().each(function(childIndex, childObj){
            if (childObj.NAME.toLowerCase().indexOf("tunnel") > -1 &&
                childObj.getId().indexOf(lineObj.userData.sourceTunnel) > -1){
                lineObj.setSource(childObj.getPort(lineObj.userData.sourcePortName));
            }
          });
        }
      });
    }
  });
  alert("Wire correction after load DONE.");
}

/**
 *  @method readSingleFile
 *  @param {HTMLInputFileTag} e Javascript object for input file tag placed somewhere in toolbar or else.
 *  @description Registered on some file input, at it change it will read chosen file and display its content.
 */
GraphLang.Utils.readSingleFile = function(e){
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;             //result is read
    GraphLang.Utils.displayContents(contents);  //display as alert
  };
  reader.readAsText(file);  //this will put result into internal variable named result
}

/**
 *  @method readSingleFile2
 *  @param {HTMLInputFileTag} e Javascript object for input file tag placed somewhere in toolbar or else.
 *  @description Registered on some file input, at it change it will read chosen file and display its content.
 */
GraphLang.Utils.readSingleFile2 = function(e){
  var file = e.target.files[0];
  if (!file) {
    return;
  }

  //extract display name from file name
  var filename = e.target.files[0].name;
  var displayName = filename.replace(/\.[^/.]+$/, "");  //remove last . (dot) and all after that, just filename without extension will left

  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;             //result is read
    GraphLang.Utils.displayContentsFromClass(contents, appCanvas);  //display as alert
    document.querySelector("#schematicDisplayName").value = displayName;
  };
  reader.readAsText(file);  //this will put result into internal variable named result
}

/**
 *  @method displayContents
 *  @param {String} content String content to display
 *  @description Translates schematic on given canvas to C/C++ code as function which can be called in other diagrams using symbol with assign schematic.
 */
GraphLang.Utils.displayContents = function(contents){
/*
  var element = document.getElementById('file-content');
  element.textContent = contents;
*/
  var element = document.getElementById('file-input');
  var fileName = element.value.split("\\").pop();
  var schematicName = fileName.split(".")[0];  //no extension

  //THIS FOLLOW VIOLATE ALL PROGRAMMING PRINCIPPLES NOW FOR DEBUGGING SUPPOSE VARIABLES ARE GLOBAL!
  eval(contents); //all schematics are saved as JSON assigned to variable jsonDocument
  appCanvas.clear();
  var reader = new draw2d.io.json.Reader();

  //need to do put connection into separate list and create them after all fgures are created to have phzsically on canvas ports to have place for them
  //var connectionList = new draw2d.utils.ArrayList

  reader.unmarshal(appCanvas, jsonDocument);  //this variable was evaluated inside eval() function
  //just for now, uncomment in future //this.initAllPortToDefault();  //this must be here, without this canvas behave non/standard, it's not possible to remove wires etc.

  //here are composite object repaired, they are assigned back to their ownership
  var allFigures = appCanvas.getFigures();
  allFigures.each(function(figureIndex, figureObj){

    /*
     *  Repairs multilayered figure, after load, top multilayered nodes has assigned just layers,
     *  all others objects which are placed on layers are just assigned to each layer so here is
     *  needed to just go through layers and again assigned them to their owner.
     */
    if (figureObj.NAME.toLowerCase().search('multilayered') != -1){
      figureObj.getAssignedFigures().each(function(assignedFigureIndex, assignedFigureObj){
        figureObj.layers.push(assignedFigureObj); //THIS ADD EACH LAYER TO PARENT JAILHOUSE COMPOSITE OBJECT, this is needed to be here
      });
      figureObj.renewLayerChooser();
      figureObj.renewLayerSelector(); //NOT RUNNING CORRECTLY

      figureObj.switchActiveLayer();    //TO REWRITE TUNNELS IF THERE ARE SOME ON LOOPS
    }

    /*
     *  Repairs sequence frames, top node owns just frames, all other nodes are part of each frame,
     *  so here is needed just to reassign frames
     */
    if (figureObj.NAME.toLowerCase().search('sequence') > -1){
      figureObj.getAssignedFigures().each(function(assignedFigureIndex, assignedFigureObj){
        figureObj.frames.push(assignedFigureObj);
        figureObj.updateFrames();
      });
    }
  });

}

/**
 *  This variable store shape function and schematic when object s loaded into schematic editor.
 */
GraphLang.Utils.loadedNodeShapeAndSchematicStr = null;

/**
 *  @method displayContentsFromClass
 *  @param {String} content String content to display
 *  @param {Object} canvas  Target canvas where content should be displayed
 *  @description Translates schematic on given canvas to C/C++ code as function which can be called in other diagrams using symbol with assign schematic.
 */
GraphLang.Utils.displayContentsFromClass = function(contents, canvasObj){
/*
  var element = document.getElementById('file-content');
  element.textContent = contents;
*/
  var element = document.getElementById('file-input2');
  var fileName = element.value.split("\\").pop();
  var schematicName = fileName.split(".")[0];  //no extension

  /*
   *    Node name extraction, ie:
   *        GraphLang.UserDefined.SomeNewName = exted.UserDefined.... -> SomeNew
   *        allowed chars for new object name: A-Z, a-z, 0-9, _, .,
   */
  //regular expression match over multiple lines also using groups
  let regExp = new RegExp(/[\s\n]*([a-zA-Z0-9\.\-\_]+)[\s]*=[\s]*([a-zA-Z0-9\.\-]+)\.extend\(\{/gm);
  let matchPattern = regExp.exec(contents);

  var newObjectName = '';
  if (matchPattern){
    /*
        matchPattern[0] - whole match
        matchPattern[1] - group 1 - new object name (it's nested object in other object tree)
        matchPattern[2] - group 2 - parent object

        matchPattern.forEach(function(element){
          alert(element)
        });
    */

    objectTree = "";
    newObjectName = matchPattern[1];
    newObjectParent = matchPattern[2];

    matchPattern[1].split('.').forEach(function(element, index){
        if (index > 0) objectTree += '.';
        objectTree += element;

        var expression = 'return ' + objectTree;
        var result = new Function(expression)();

        if (result == undefined){
            //alert(objectTree + ' is undefined')
            eval(objectTree + ' = {}');             //creates object
        }
    });
  }

  if (!newObjectName){
    alert("Schematic file is not corrupted. Loaded process canceled.");
    return;
  }

  //THIS FOLLOW VIOLATE ALL PROGRAMMING PRINCIPPLES NOW FOR DEBUGGING SUPPOSE VARIABLES ARE GLOBAL!
  eval(contents); //all schematics are saved as JSON assigned to variable jsonDocument
  canvasObj.clear();
  var reader = new draw2d.io.json.Reader();

  //here is object creation and after getting its jsonDocument property where it's inside schematic is stored
  var newObject = eval('new ' + newObjectName + '()');
  var jsonDocument = newObject.jsonDocument;

  if (jsonDocument && jsonDocument.length > 0){
    reader.unmarshal(canvasObj, jsonDocument);  //this variable was evaluated inside eval() function
  }

  /*
   *    Update schematic name input
   */
  $("#schematicName").val(newObject.NAME);

  /*
   *    If object has method getObjectAsString() its content is stored into loaded function string, because object is
   *    user defined an potentionaly can have some shape generated in Shape Designer
   */
  if (newObject.getObjectAsString) GraphLang.Utils.loadedNodeShapeAndSchematicStr = newObject.getObjectAsString();
  GLOBAL_CURRENT_LOADED_OBJECT_PARENT = newObjectParent;
  GLOBAL_CURRENT_LOADED_OBJECT_CODE_CONTENT = contents;

  //here are composite object repaired, they are assigned back to their ownership
  var allFigures = canvasObj.getFigures();
  allFigures.each(function(figureIndex, figureObj){

    /*
     *  Repairs multilayered figure, after load, top multilayered nodes has assigned just layers,
     *  all others objects which are placed on layers are just assigned to each layer so here is
     *  needed to just go through layers and again assigned them to their owner.
     */
    if (figureObj.NAME.toLowerCase().search('multilayered') != -1){
      figureObj.getAssignedFigures().each(function(assignedFigureIndex, assignedFigureObj){
        figureObj.layers.push(assignedFigureObj); //THIS ADD EACH LAYER TO PARENT JAILHOUSE COMPOSITE OBJECT, this is needed to be here
      });
      figureObj.renewLayerChooser();
      figureObj.renewLayerSelector(); //NOT RUNNING CORRECTLY

      figureObj.switchActiveLayer();    //TO REWRITE TUNNELS IF THERE ARE SOME ON LOOPS
    }

    /*
     *  Repairs sequence frames, top node owns just frames, all other nodes are part of each frame,
     *  so here is needed just to reassign frames
     */
    if (figureObj.NAME.toLowerCase().search('sequence') > -1){
      figureObj.getAssignedFigures().each(function(assignedFigureIndex, assignedFigureObj){
        figureObj.frames.push(assignedFigureObj);
        figureObj.updateFrames();
      });
    }

    /*
     *  Repairs cluster nodes
     *      1. set value
     *      2. add event handler for node label of cluster
     */
    if (figureObj.NAME.toLowerCase().search('clusterdatatype') > -1){
        figureObj.nodeLabel.setText(figureObj.getNodeLabelText());
        figureObj.nodeLabel.on('change:text', figureObj.nodeLabelChanged);
    }

  });

}

/**
 *  @method displayContents2
 *  @param {Object} content JSON object which will be display
 *  @param {canvas} canvas  Target canvas where content is displayed
 *  @description Translates schematic on given canvas to C/C++ code as function which can be called in other
 *  diagrams using symbol with assign schematic, this function is general one and newer, using also canvas
 *  reference where content is displayed.
 */
GraphLang.Utils.displayContents2 = function (jsonDocument, canvasObj) {

    //THIS FOLLOW VIOLATE ALL PROGRAMMING PRINCIPPLES NOW FOR DEBUGGING SUPPOSE VARIABLES ARE GLOBAL!
    //eval(contents); //all schematics are saved as JSON assigned to variable jsonDocument

    canvasObj.clear();
    var reader = new draw2d.io.json.Reader();

    //need to do put connection into separate list and create them after all fgures are created to have phzsically on canvas ports to have place for them
    //var connectionList = new draw2d.utils.ArrayList

    //jsonDocumentCopy = jsonDocument;
    jsonDocumentCopy = JSON.parse(JSON.stringify(jsonDocument));
    reader.unmarshal(canvasObj, jsonDocumentCopy);  //this variable was evaluated inside eval() function
    //just for now, uncomment in future //this.initAllPortToDefault();  //this must be here, without this canvas behave non/standard, it's not possible to remove wires etc.

    //here are composite object repaired, they are assigned back to their ownership
    var allFigures = canvasObj.getFigures();
    allFigures.each(function (figureIndex, figureObj) {
        //if (figureObj.getComposite)
        if (figureObj.NAME.toLowerCase().search('multilayered') != -1) {
            figureObj.getAssignedFigures().each(function (assignedFigureIndex, assignedFigureObj) {
                figureObj.layers.push(assignedFigureObj); //THIS ADD EACH LAYER TO PARENT JAILHOUSE COMPOSITE OBJECT, this is needed to be here
            });
            figureObj.renewLayerChooser();
            figureObj.renewLayerSelector(); //NOT RUNNING CORRECTLY
        }

        /*
         *  Repairs sequence frames, top node owns just frames, all other nodes are part of each frame,
         *  so here is needed just to reassign frames
         */
        if (figureObj.NAME.toLowerCase().search('sequence') > -1) {
            figureObj.getAssignedFigures().each(function (assignedFigureIndex, assignedFigureObj) {
                figureObj.frames.push(assignedFigureObj);
                figureObj.updateFrames();
            });
        }
    });

}

/**
 *  @method saveSchematic
 *  @param {draw2d.canvas} canvas - Canvas where schematic is located.
 *  @param {String} filename
 *  @param {String} type
 *  @description Download current schematic as txt file with provided name.
 */
GraphLang.Utils.saveSchematic = function(canvas, filename, type) {
    data = GraphLang.Utils.getCanvasJson(canvas);

    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
        url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

/**
 *  @method saveSchematic2
 *  @param {draw2d.canvas} canvas - Canvas where schematic is located.
 *  @param {String} filename
 *  @param {String} type
 *  @description Download current schematic as txt file with provided name.
 */
GraphLang.Utils.saveSchematic2 = function(canvas, filename, type) {
    data = GraphLang.Utils.getCanvasAsObjectString(canvas);

    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        var a = document.createElement("a"),
        url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        if (type == "text/javascript") a.download += ".js"; //add javasript extension to filename

        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

/**
 *  @method getVisibleLoopsAndMultilayered
 *  @param {draw2d.canvas} canvas - Canvas where schematic is located.
 *  @description Returns visible loops and multilayered structures. So if there are some loops on non active layers they are not returned.
 */
GraphLang.Utils.getVisibleLoopsAndMultilayered = function(canvas) {
    let loopList = new draw2d.util.ArrayList();
    canvas.getFigures().each(function(figureIndex, figureObj){
      if (figureObj.NAME.search("GraphLang.Shapes.Basic.Loop") > -1 &&
          figureObj.getComposite() == null){

        let nestedLayeredList = figureObj.getVisibleLoopAndMultilayered();
        if (!nestedLayeredList.isEmpty()) loopList.addAll(nestedLayeredList);  //add ArrayList to current just in case it's not empty otherwise there will be undefined object and make harm in following code
      }
    });

	return loopList;
}

GraphLang.Utils.getUniqueNodeLabel = function(canvas, nodeLabel = "nodeLabel"){
    var nodeLabelList = new draw2d.util.ArrayList();
    canvas.getFigures().each(function(figureIndex, figureObj){
        if (figureObj.getUserData().hasOwnProperty('isTerminal') && figureObj.getUserData().isTerminal &&
            figureObj.getUserData().hasOwnProperty('nodeLabel') && figureObj.getUserData().nodeLabel){
            nodeLabelList.push(figureObj.userData.nodeLabel);
        }
    });
    while(nodeLabelList.contains(nodeLabel)){
        nodeLabel += "_2";
    }
    return nodeLabel;
}

/**
 * This will scan all user defined nodes and return array, cluster, ... names, all names what is possible to use for pointers.
 *
 * TODO now it's traversing through all user defined nodes JSON and not canvas of current opened node so there should be added scan
 * through canvas
 *
 * @returns {*}
 */
GraphLang.Utils.getAllDatatypesForPointers = function(){
    let allDatatypesForPointersList = new draw2d.util.ArrayList();
    let uniqueDatatypes = new draw2d.util.ArrayList();  //store just datatypes due they are unique

    //these are default types already defined in context menu for pointers
    uniqueDatatypes.add("int*");
    uniqueDatatypes.add("uint*");
    uniqueDatatypes.add("float*");
    uniqueDatatypes.add("double*");
    uniqueDatatypes.add("bool*");
    uniqueDatatypes.add("String*");

    for (let nodeName of global_allUserDefinedNodesList){
        let nodeObj = eval(`new ${nodeName}()`);
        for (let index in nodeObj.jsonDocument){
            if (
                nodeObj.jsonDocument[index].type &&
                (nodeObj.jsonDocument[index].type.toLowerCase().search("clusterdatatype") > -1 ||
                    nodeObj.jsonDocument[index].type.toLowerCase().search("arraynode") > -1)
            ){
                //check if datatype already stored in list
                if (!uniqueDatatypes.contains(nodeObj.jsonDocument[index].userData.datatype)){
                    let pointerInfo = {};
                    pointerInfo.nodeOwner = nodeName;
                    pointerInfo.datatype = nodeObj.jsonDocument[index].userData.datatype;

                    if (pointerInfo.datatype.startsWith("clusterDatatype")){
                        pointerInfo.displayName =   pointerInfo.nodeOwner +
                                                    " -> " +
                                                    pointerInfo.datatype.substring(
                                                        pointerInfo.datatype.indexOf(
                                                            "_",
                                                            pointerInfo.datatype.indexOf("_")+1 //this will skip first _ and will search for 2nd
                                                        ) + 1
                                                    );  //skip clusterDatatype_ at the beginning o cluster datatype name
                    }else{
                        pointerInfo.displayName = pointerInfo.datatype;
                    }

                    allDatatypesForPointersList.push(pointerInfo);

                    uniqueDatatypes.push(nodeObj.jsonDocument[index].userData.datatype);    //add to datatype control list
                }
            }
        }
    }

    return allDatatypesForPointersList.unique();
}

/**
 * @method getAllDatatypesForConstant
 * @description This will scan all user defined nodes and return cluster datatypes for constant node and classic datatypes.
 *    TODO now it's traversing through all user defined nodes JSON and not canvas of current opened node so there should be added scan through canvas
 *
 * @returns {*}
 */
GraphLang.Utils.getAllDatatypesForConstant = function(){
    let allDatatypesForConstantList = new draw2d.util.ArrayList();
    let uniqueDatatypes = new draw2d.util.ArrayList();  //store just datatypes due they are unique

    //these are default types already defined in context menu for pointers
    uniqueDatatypes.add("int");
    uniqueDatatypes.add("uint");
    uniqueDatatypes.add("float");
    uniqueDatatypes.add("double");
    uniqueDatatypes.add("bool");
    uniqueDatatypes.add("String");

    for (let nodeName of global_allUserDefinedNodesList){
        let nodeObj = eval(`new ${nodeName}()`);
        for (let index in nodeObj.jsonDocument){
            if (
                nodeObj.jsonDocument[index].type &&
                (nodeObj.jsonDocument[index].type.toLowerCase().search("clusterdatatype") > -1)
            ){
                //check if datatype already stored in list
                if (!uniqueDatatypes.contains(nodeObj.jsonDocument[index].userData.datatype)){
                    let datatypeInfo = {};
                    datatypeInfo.nodeOwner = nodeName;
                    datatypeInfo.datatype = nodeObj.jsonDocument[index].userData.datatype;

                    if (datatypeInfo.datatype.startsWith("clusterDatatype")){
                        datatypeInfo.displayName =   datatypeInfo.nodeOwner +
                            " -> " +
                            datatypeInfo.datatype.substring(
                                datatypeInfo.datatype.indexOf(
                                    "_",
                                    datatypeInfo.datatype.indexOf("_")+1 //this will skip first _ and will search for 2nd
                                ) + 1
                            );  //skip clusterDatatype_ at the beginning o cluster datatype name
                    }else{
                        datatypeInfo.displayName = datatypeInfo.datatype;
                    }

                    allDatatypesForConstantList.push(datatypeInfo);

                    uniqueDatatypes.push(nodeObj.jsonDocument[index].userData.datatype);    //add to datatype control list
                }
            }
        }
    }

    return allDatatypesForConstantList.unique();
}

/**
 * @method getClusterDatatypeDefinitionFromUserDefinedNode
 * @description This will scan all user defined nodes and return cluster datatypes for constant node and classic datatypes.
 *    This is using 2nd helper canvas to load schematic with cluster definition if found and return it's reference to be alive and have all functions
 *    which are available when node is loaded on canvas.
 * @returns {name: string, displayName: string}
 */
GraphLang.Utils.getClusterDatatypeDefinitionFromUserDefinedNode = function(clusterName){
    let clusterObj = null;

    for (let nodeName of global_allUserDefinedNodesList){
        let nodeObj = eval(`new ${nodeName}()`);
        for (let index in nodeObj.jsonDocument){
            if (
                nodeObj.jsonDocument[index].type &&
                (nodeObj.jsonDocument[index].type.toLowerCase().search("clusterdatatype") > -1)
            ){
                //check if datatype already stored in list
                if (clusterName == nodeObj.jsonDocument[index].userData.datatype){
                    clusterNodeId = nodeObj.jsonDocument[index].id;

                    //console.log(`${clusterName} found in UserDefinedNode ${nodeName}`);
                    GraphLang.Utils.displayContents2(nodeObj.jsonDocument, appCanvas2);     //load whole user defined node to 2nd helper canvas
                    //console.log(`appCanvas2 looking for ${clusterNodeId}`);

                    clusterObj = appCanvas2.getFigure(clusterNodeId);
                    if (clusterObj) clusterObj.addItemsLabels();            //add item labels, this will add item labels even in case they are not defined in userData, to ensure they are there
                }
            }
        }
    }

    return clusterObj;
}

/**
 *  Error list which can occur during graph validation. This is to have it unified through whole application and not to use string comparison.
 */
GraphLang.Utils.ErrorList = {
    MANDATORY_CONNECTION_FOR_PORT_REQUIRED: "MANDATORY_CONNECTION_FOR_PORT_REQUIRED",
    MULTIPLE_CONNECTIONS_FOR_PORT_NOT_ALLOWED: "MULTIPLE_CONNECTIONS_FOR_PORT_NOT_ALLOWED",
    CONNECTION_UNDEFINED_DATATYPE: "CONNECTION_UNDEFINED_DATATYPE",
    CONNECTION_DIFFERENT_DATATYPE: "CONNECTION_DIFFERENT_DATATYPE",
    NODE_MISSING_TRANSLATE_FUNCTION: "NODE_MISSING_TRANSLATE_FUNCTION",
    NO_EXECUTION_ORDER: "NO_EXECUTION_ORDER",
}

/**
 *  @method validateCanvas
 *  @param {Object} canvasObj - Canvas which will be checked
 *  @param {String} canvasOwnerName - if provided this is name of owner node, ie. this canvas is diagram of some node
 *  @param {[]} clusterDefinitionArray - array of defined cluster for nodes which are manipulating with clusters to know about cluster variables names and datatype
 *  @description Check canvas for errors like multiple wires for input port, wrong datatypes, ...
 */
GraphLang.Utils.validateCanvas = function(canvasObj, canvasOwnerName = null, clusterDefinitionArray = null) {
    let errorList = new draw2d.util.ArrayList();

    /*
     *  FIGURES CHECK
     */
    canvasObj.getFigures().each(function(figureIndex, figureObj){
        if (figureObj.validateSelf){
            //if there is validation function use it
            errorList.addAll(figureObj.validateSelf(canvasOwnerName, clusterDefinitionArray));
        }else{
            /*
             *  PORT CHECK
             */
            let inputPortList = figureObj.getInputPorts();
            let outputPortList =figureObj.getOutputPorts();
            figureObj.getPorts().each(function(portIndex, portObj){
                //default value for port
                let allowMultipleConnections = outputPortList.contains(portObj);
                let connectionMandatory = false;

                if (portObj.getUserData() && portObj.getUserData().allowMultipleConnections) allowMultipleConnections = portObj.getUserData().allowMultipleConnections;
                if (portObj.getUserData() && portObj.getUserData().connectionMandatory) connectionMandatory = portObj.getUserData().connectionMandatory;

                if (connectionMandatory && portObj.getConnections().getSize() == 0){
                    //add error into list for not connected port
                    errorList.add({
                        canvasOwnerName: canvasOwnerName,
                        figureName: figureObj.NAME,
                        figureId: figureObj.getId(),
                        portName: portObj.getName(),
                        type: GraphLang.Utils.ErrorList.MANDATORY_CONNECTION_FOR_PORT_REQUIRED,
                        message: `${figureObj.NAME} missing connection for port '${portObj.getName()}'`
                    });
                    console.warn(errorList.last());

                    //mark port as faulty, change it's color or stroke or something
                    portObj.setStroke(2);
                    portObj.setColor("#FF0000");
                    portObj.setDashArray("-");
                }

                if (allowMultipleConnections == false && portObj.getConnections().getSize() > 1){
                    //add error into list for more than 1 connected wire
                    errorList.add({
                        canvasOwnerName: canvasOwnerName,
                        figureName: figureObj.NAME,
                        figureId: figureObj.getId(),
                        portName: portObj.getName(),
                        type: GraphLang.Utils.ErrorList.MULTIPLE_CONNECTIONS_FOR_PORT_NOT_ALLOWED,
                        message: `${figureObj.NAME} port '${portObj.getName()}' allows just one wire connected.`
                    });
                    console.warn(errorList.last());

                    //mark port as faulty, change it's color or stroke or something
                    portObj.setStroke(2);
                    portObj.setColor("#FF9500");
                    portObj.setDashArray(".");
                }
            });

            /*
             *  TRANSLATE FUNCTION CHECK
             *  TODO: Need to recognize which language and target to check right translate function, for now done for C/C++
             */
            if (figureObj.translateToCppCode === undefined) errorList.add({
                canvasOwnerName: canvasOwnerName,
                figureName: figureObj.NAME,
                figureId: figureObj.getId(),
                portName: portObj.getName(),
                type: GraphLang.Utils.ErrorList.NODE_MISSING_TRANSLATE_FUNCTION,
                message: `${figureObj.NAME} missing function translateToCppCode() to translate into C/C++ code.`
            });

        }
    });

    /*
     *  WIRES CHECK
     */
    canvasObj.getLines().each(function(lineIndex, lineObj){
        let sourcePort = lineObj.getSource();
        let targetPort = lineObj.getTarget();

        let sourcePortDatatype = "undefined";
        if (sourcePort.getUserData() && sourcePort.getUserData().datatype) sourcePortDatatype = sourcePort.getUserData().datatype;
        if (sourcePort.getDatatype) sourcePortDatatype = sourcePort.getDatatype();

        let targetPortDatatype = "undefined";
        if (targetPort.getUserData() && targetPort.getUserData().datatype) targetPortDatatype = targetPort.getUserData().datatype;
        if (targetPort.getDatatype) targetPortDatatype = targetPort.getDatatype();

        if (
            (
                sourcePortDatatype != "polymorphic" &&
                targetPortDatatype != "polymorphic"
            ) &&
            (
                sourcePortDatatype == "undefined" ||
                targetPortDatatype == "undefined"
            )
        ){
            errorList.add({
                canvasOwnerName: canvasOwnerName,
                connectionId: lineObj.getId(),
                connectionSource: lineObj.getSource(),
                connectionSourceDatatype: sourcePortDatatype,
                connectionTargetDatatype: targetPortDatatype,
                connectionTarget: lineObj.getTarget(),
                type: GraphLang.Utils.ErrorList.CONNECTION_UNDEFINED_DATATYPE,
                message: "CONNECTION_UNDEFINED_DATATYPE"
            });
            console.warn(errorList.last());

            //mark line as faulty, change it's color or stroke or something
            lineObj.setDashArray("-");
            lineObj.setColor("#FF0000");
        }else{
            if (
                (
                    sourcePortDatatype != "polymorphic" &&
                    targetPortDatatype != "polymorphic"
                ) &&
                sourcePortDatatype != targetPortDatatype
            ){
                errorList.add({
                    canvasOwnerName: canvasOwnerName,
                    connectionId: lineObj.getId(),
                    connectionSource: lineObj.getSource(),
                    connectionSourceDatatype: sourcePortDatatype,
                    connectionTargetDatatype: targetPortDatatype,
                    connectionTarget: lineObj.getTarget(),
                    type: GraphLang.Utils.ErrorList.CONNECTION_DIFFERENT_DATATYPE,
                    message: `Wire between port '${lineObj.getSource().getName()}' and '${lineObj.getTarget().getName()}' connects different datatypes '${sourcePortDatatype}' and '${targetPortDatatype}'`
                });
                console.warn(errorList.last());

                //mark line as faulty, change it's color or stroke or something
                lineObj.setDashArray("-");
                lineObj.setColor("#FF0000");
            }
        }
    });

    return errorList;
}

/**
 * @description This method interactively after click shows user error.
 */
GraphLang.Utils.userInteractiveErrorOnClick = function(errorObj){
    /*
     *  Animate blink for error object (wire, port, ...)
     */
    function animateBlinkObject(obj, callbackFunction){
        let MAX_TOGGLE_COUNT = 6;
        let errorOpacityToggle = true;
        let errorOpacityToggleCounter = 0;
        obj.on("timer", function(emitter){
            obj.attr({opacity: (errorOpacityToggle ? 0.1 : 1)});
            errorOpacityToggle = !errorOpacityToggle;
            errorOpacityToggleCounter++;
            if (errorOpacityToggleCounter > MAX_TOGGLE_COUNT){
                obj.stopTimer();
                obj.attr({opacity: 1});
                errorOpacityToggleCounter = 0;  //erase toggle counter
                if (typeof callbackFunction === "function") callbackFunction(obj);             //call callback function
            }
        });
        obj.startTimer(120);
    }

    let nodeCanvas = (errorObj.canvasOwnerName == "") ? appCanvas : appCanvas2;
    if (errorObj.canvasOwnerName == ""){
        //do nothing error is located on main canvas
    }else {
        //error is inside some block, need to load it into helper canvas
        appCanvas2.clear();

        let loadedNode = eval(`new ${errorObj.canvasOwnerName}()`);

        let reader = new draw2d.io.json.Reader();
        reader.unmarshal(nodeCanvas, loadedNode.jsonDocument)
    }

    /*
     *  INTERACTIVE DISPLAY ERROR TO USER
     */
    if (errorObj.type == GraphLang.Utils.ErrorList.CONNECTION_DIFFERENT_DATATYPE) {
        let errorConnection = nodeCanvas.getLine(errorObj.connectionId);
        animateBlinkObject(errorConnection);
    }
    else if (errorObj.type == GraphLang.Utils.ErrorList.MANDATORY_CONNECTION_FOR_PORT_REQUIRED) {
        let errorPort = nodeCanvas.getFigure(errorObj.figureId).getPort(errorObj.portName);
        animateBlinkObject(errorPort);
    }
    else if (errorObj.type == GraphLang.Utils.ErrorList.NO_EXECUTION_ORDER) {
        /*
         *  this will recalculate whole execution order, here should be just show labels in middle of nodes,
         *  this is computation expensive, but for now it makes what it should do
         */
        GraphLang.Utils.initAllPortToDefault(nodeCanvas);
        GraphLang.Utils.executionOrder(nodeCanvas);

        let errorNode = nodeCanvas.getFigure(errorObj.figureId);
        errorNode.setStroke(4).setColor("#DD2241");
        animateBlinkObject(errorNode, (errorNode) => errorNode.setStroke(0));
    }
    else{
        alert(`error type: ${errorObj.type}\nThere is no interactive display, you must find it manually.`);
    }
}

GraphLang.Utils.hex_to_ascii = function (str1) {
    // Convert the input hexadecimal string to a regular string
    var hex = str1.toString();
    // Initialize an empty string to store the resulting ASCII characters
    var str = '';
    // Iterate through the hexadecimal string, processing two characters at a time
    for (var n = 0; n < hex.length; n += 2) {
        // Extract two characters from the hexadecimal string and convert them to their ASCII equivalent
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    // Return the resulting ASCII string
    return str;
}

GraphLang.Utils.toHex = function (str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
        result += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return result;
}

/**
 * @method GraphLang.Utils.serverSendReceive
 * @param operationStr
 * @param projectId
 * @param additionalGetStr
 * @descritpion Send request to server and receive and parse JSON response into global object GLOBAL_AJAX_RESPONSE
 */
GraphLang.Utils.serverSendReceive = function(operationStr, projectId, additionalGetStr, callbackFunction = null, postParams = null){
    // Creating Our XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Making our connection
    // let url = `?q=${operationStr}&projectId=${projectId}`;
    let url = `?q=${operationStr}&projectId=${projectId}${additionalGetStr}`;
    xhr.open("POST", url, true);

    // Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // function execute after request is successful
    let response = {};
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            response = JSON.parse(this.responseText.replace('"','\"'));   //THIS IS REALLY NEEDED TO PARSE JSON CORRECTLY WITHOUT THIS IT'S NOT RUNNING AT ALL!!!
            console.log(response);

            GLOBAL_AJAX_RESPONSE = response; //to have access to response in browser
            if (callbackFunction) callbackFunction();   //RUN CALLBACK FUNCTION IF PROVIDED
        }
    }

    // Sending our request
    xhr.send(postParams);
}

/**
 * @method GraphLang.Utils.serverAjaxPostSendReceive
 * @param getParams - array of string which are serialized into HTTP request as GET parameters which are part of url
 * @param postParams - array of string which are serialized into HTTP body part as POST parameters
 * @descritpion Send request to server and receive and parse JSON response into global object GLOBAL_AJAX_RESPONSE, this one has method parameters order done right :)
 * example call:
 *      GraphLang.Utils.serverSendReceive2(
 *          ['operationId', 'someOperationName', 'projectId', '2'],
 *          ['sessionId', 'aad767fd09fda0909af0900adsf090990fdsa0'],
 *          function(){
 *              alert(GLOBAL_AJAX_RESPONSE)
 *          }
 *      );
 */
GraphLang.Utils.serverAjaxPostSendReceive = function(getParams = [], postParams = [], callbackFunction = null){
    return new Promise((resolve, reject) => {
        // Creating Our XMLHttpRequest object
        let xhr = new XMLHttpRequest();

        // Making our connection
        // let url = `?q=${operationStr}&projectId=${projectId}`;
        let url = window.location.href.split('?')[0];
        if (getParams !== null && getParams.length > 0) {
            url += '?';
            for (let k = 0; k < getParams.length; k += 2) {
                if (k + 1 < getParams.length) {
                    if (k > 0) url += '&';
                    url += getParams[k] + '=' + getParams[k + 1];
                }
            }
        }

        console.log(`GraphLang.Utils.serverAjaxPostSendReceive -> sending ajax request to: ${url}`);

        // Set HTTP method to POST
        xhr.open("POST", url, true);

        // Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // function execute after request is successful
        let response = {};
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
                console.log(`GraphLang.Utils.serverAjaxPostSendReceive -> raw text response:`);
                console.log(xhr.responseText);

                response = JSON.parse(xhr.responseText.replace('"', '\"'));   //THIS IS REALLY NEEDED TO PARSE JSON CORRECTLY WITHOUT THIS IT'S NOT RUNNING AT ALL!!!

                console.log(`GraphLang.Utils.serverAjaxPostSendReceive -> parsed response:`);
                console.log(response);

                GLOBAL_AJAX_RESPONSE = response; //to have access to response in browser
                if (callbackFunction) callbackFunction();   //RUN CALLBACK FUNCTION IF PROVIDED

                resolve(response);  //resolve promise with response from server
            }else if (xhr.readyState == 4 && xhr.status >= 300){
                reject(`{error:{${xhr.status}:"${xhr.statusText}"}}`);  // Reject promise with error
            }
        }

        xhr.onerror = function() {
            reject("Request failed");  // Reject on failure
        };

        // POST parameters array serialization into shape param1=someValue&param2=anotherValue&...
        let postParamsSerialized = '';
        if (postParams !== null && postParams.length > 0) {
            for (let k = 0; k < postParams.length; k += 2) {
                if (k + 1 < postParams.length) {
                    if (k > 0) postParamsSerialized += '&';
                    postParamsSerialized += postParams[k] + '=' + postParams[k + 1];
                }
            }
        }

        console.log(`post params: ${postParamsSerialized}`);

        // Sending our request
        xhr.send(postParamsSerialized);
    });
}

/**
 * @method GraphLang.Utils.getNodeAsString
 * @param nodeClassName
 * @returns {string}
 * @description DO NOT USE THIS, this is experiment but it's not returning init() correctly, seems like it's little complicated to get all function as string right.
 *
 * @deprecated
 */
GraphLang.Utils.getNodeAsString = function(nodeClassName){
    let nodeClassObj = eval("new " + nodeClassName + "()");
    let outputCode = "";

    outputCode += `${nodeClassObj.__proto__.NAME} = ${nodeClassObj.__proto__.__proto__.NAME}.extend({\n`;

    for (const [key, value] of Object.entries(nodeClassObj.__proto__)){
        if (typeof value === "function"){
            outputCode += `${key}: ${value.toString()},\n`;
        }
        else if (key === "jsonDocument"){
            outputCode += `${key}: ${JSON.stringify(value)},\n`;
        }
    }

    outputCode += "});\n";

    return outputCode;
}

/**
 * @method GraphLang.Utils.serverNodeReplaceSchematicWithCurrentDiagram
 * @param options: {projectId: string, nodeId: int, nodeClassName: string, nodeDisplayName: string}
 * @returns {string}
 * @description Update node with class name on server with current schematic. This will replace jsonDocument inside node javascript code with current canvas code.
 */
GraphLang.Utils.serverNodeReplaceSchematicWithCurrentDiagram = function(parametersObj){
    /*
     *  1. Call on server to et JS code for node class based on its class name
     *  2. In callback function there is upload if node doesn't exists it's created on server
     */
    GraphLang.Utils.serverAjaxPostSendReceive(
        ["q", "getNodeJavascriptCode", "projectId", parametersObj.projectId, "nodeClassName", parametersObj.nodeClassName],
        null,
        function() {
            /*
             *  Extract variables from ajax answer
             */
            let nodeClassParent = GLOBAL_AJAX_RESPONSE.nodeClassParent ? GLOBAL_AJAX_RESPONSE.nodeClassParent : "GraphLang.UserDefinedNode";
            let nodeContent = GLOBAL_AJAX_RESPONSE.nodeContent;
            // nodeClassName = GLOBAL_AJAX_RESPONSE.nodeClassName;
            // nodeDisplayName = GLOBAL_AJAX_RESPONSE.nodeDisplayName;

            let projectId = parametersObj.projectId;
            let nodeId = parametersObj.nodeId;
            let nodeClassName = parametersObj.nodeClassName;
            let nodeDisplayName = parametersObj.nodeDisplayName;

            /*
             *  There are 2 cases:
             *      1. nodeContent from server not empty, need to just modify JS class code
             *      2. nodeContent on server empty - need to create whole JS class from scratch
             */
            if (nodeContent.length > 0){
                nodeContent = GraphLang.Utils.hex_to_ascii(nodeContent);
                GLOBAL_NODE_CONTENT = nodeContent;
                //console.log(GLOBAL_NODE_CONTENT);
                console.log(`ajax response saved in GLOBAL_AJAX_RESPONSE variable`);
                console.log(`node content saved in GLOBAL_NODE_CONTENT variable`);

                eval(GraphLang.Utils.getCanvasJson(appCanvas)); //this will create jsonDocument variable

                GLOBAL_HELPER_VARIABLE_1 = {};
                GLOBAL_HELPER_VARIABLE_2 = {};
                let codeToRun = "";
                codeToRun += `GLOBAL_HELPER_VARIABLE_1 = ${nodeClassParent}.extend;\n`;
                codeToRun += `${nodeClassParent}.extend = function(obj){this.extendObj = obj;}\n`;
                codeToRun += `${nodeContent}`;
                codeToRun += `GLOBAL_HELPER_VARIABLE_2 = "";\n`;
                codeToRun += `GLOBAL_HELPER_VARIABLE_2 += "${nodeClassName} = ${nodeClassParent}.extend({\\n"\n`;

                codeToRun += `for (m in ${nodeClassParent}.extendObj){\n`;
                codeToRun += `\t\tlet objItem = ${nodeClassParent}.extendObj[m];\n`;
                codeToRun += `\t\tGLOBAL_HELPER_VARIABLE_2 += m + ": ";\n`;
                codeToRun += `\t\tif (m != 'jsonDocument'){\n`;
                codeToRun += `\t\t\t\tif (typeof objItem != 'string'){\n`;
                codeToRun += `\t\t\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += (typeof objItem == 'Object' || Array.isArray(objItem)) ? JSON.stringify(objItem) : objItem.toString();\n`;
                codeToRun += `\t\t\t\t}else{\n`;
                codeToRun += `\t\t\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += '"' + objItem.toString() + '"';\n`;
                codeToRun += `\t\t\t\t}\n`;
                codeToRun += `\t\t}else{\n`;
                codeToRun += `\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += '${JSON.stringify(jsonDocument)}';\n`;    // <--- HERE jsonDocument canvas schematic is injected and replaced
                codeToRun += `\t\t}\n`;
                codeToRun += `\t\tGLOBAL_HELPER_VARIABLE_2 += ",\\n";\n`;
                codeToRun += `}\n`;

                codeToRun += `GLOBAL_HELPER_VARIABLE_2 += "});\\n"\n`;
                codeToRun += `${nodeClassParent}.extend = GLOBAL_HELPER_VARIABLE_1;\n`;

                console.log(`Going eval() this code:`);
                console.log(`${codeToRun}`);
                eval(codeToRun);
                GLOBAL_HELPER_VARIABLE_1 = codeToRun;
                console.log(`JS code which run in eval() available in GLOBAL_HELPER_VARIABLE_1`);
                console.log(`node class code available in GLOBAL_HELPER_VARIABLE_2`);

                nodeContent = GLOBAL_HELPER_VARIABLE_2;
            }else{
                nodeContent = GraphLang.Utils.getCanvasAsObjectString(parametersObj.canvas);
            }
            nodeContent = GraphLang.Utils.toHex(nodeContent);

            console.log(`start saving this for porjectId:${projectId}, nodeClassName:${nodeClassName}`);

            // newer function for node upload doing also rename, create, update
            GraphLang.Utils.serverAjaxPostSendReceive(
                ["q", "nodeUpload"],
                ["projectId", projectId, "nodeId", nodeId, "nodeClassName", nodeClassName, "nodeDisplayName", nodeDisplayName, "nodeCodeContent", nodeContent],
                function () {
                    console.log(JSON.stringify(GLOBAL_AJAX_RESPONSE));
                }
            )
                .then(response => alert(JSON.stringify(response)))
                .catch(response => alert(JSON.stringify(response)));
        }
    )

    // GraphLang.Utils.serverSendReceive(
    //     'getNodeJavascriptCode',
    //     projectId,
    //     `&nodeClassName=${nodeClassName}`,
    //     function(){
    //         /*
    //          *  Extract variables from ajax answer
    //          */
    //         nodeClassName = GLOBAL_AJAX_RESPONSE.nodeClassName;
    //         nodeClassParent = GLOBAL_AJAX_RESPONSE.nodeClassParent;
    //         nodeContent = GLOBAL_AJAX_RESPONSE.nodeContent;
    //         nodeDisplayName = GLOBAL_AJAX_RESPONSE.nodeDisplayName;
    //
    //         GLOBAL_NODE_CONTENT = GraphLang.Utils.hex_to_ascii(nodeContent);
    //         //console.log(GLOBAL_NODE_CONTENT);
    //         console.log(`ajax response saved in GLOBAL_AJAX_RESPONSE variable`);
    //         console.log(`node content saved in GLOBAL_NODE_CONTENT variable`);
    //
    //         //getting input params from global variables, this is not ideal but it will run smoothly
    //         let projectId = GLOBAL_HELPER_VARIABLE_1;
    //         let nodeClassName = GLOBAL_HELPER_VARIABLE_2;
    //
    //         //GraphLang.UserDefinedNode.extend = function(obj){this.extendObj = obj;}
    //         //...run node code content...
    //         //for (m in GraphLang.UserDefinedNode.extendObj){console.log(GraphLang.UserDefinedNode.extendObj[m].toString())}
    //
    //         eval(GraphLang.Utils.getCanvasJson(appCanvas)); //this will create jsonDocument variable
    //
    //         GLOBAL_HELPER_VARIABLE_1 = {};
    //         GLOBAL_HELPER_VARIABLE_2 = {};
    //         let codeToRun = "";
    //         codeToRun += `GLOBAL_HELPER_VARIABLE_1 = ${nodeClassParent}.extend;\n`;
    //         codeToRun += `${nodeClassParent}.extend = function(obj){this.extendObj = obj;}\n`;
    //         codeToRun += `${nodeContent}`;
    //         codeToRun += `GLOBAL_HELPER_VARIABLE_2 = "";\n`;
    //         codeToRun += `GLOBAL_HELPER_VARIABLE_2 += "${nodeClassName} = ${nodeClassParent}.extend({\\n"\n`;
    //
    //         codeToRun += `for (m in ${nodeClassParent}.extendObj){\n`;
    //         codeToRun += `\t\tlet objItem = ${nodeClassParent}.extendObj[m];\n`;
    //         codeToRun += `\t\tGLOBAL_HELPER_VARIABLE_2 += m + ": ";\n`;
    //         codeToRun += `\t\tif (m != 'jsonDocument'){\n`;
    //         codeToRun += `\t\t\t\tif (typeof objItem != 'string'){\n`;
    //         codeToRun += `\t\t\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += (typeof objItem == 'Object' || Array.isArray(objItem)) ? JSON.stringify(objItem) : objItem.toString();\n`;
    //         codeToRun += `\t\t\t\t}else{\n`;
    //         codeToRun += `\t\t\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += '"' + objItem.toString() + '"';\n`;
    //         codeToRun += `\t\t\t\t}\n`;
    //         codeToRun += `\t\t}else{\n`;
    //         codeToRun += `\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += '${JSON.stringify(jsonDocument)}';\n`;    // <--- HERE jsonDocument canvas schematic is injected and replaced
    //         codeToRun += `\t\t}\n`;
    //         codeToRun += `\t\tGLOBAL_HELPER_VARIABLE_2 += ",\\n";\n`;
    //         codeToRun += `}\n`;
    //
    //         codeToRun += `GLOBAL_HELPER_VARIABLE_2 += "});\\n"\n`;
    //         codeToRun += `${nodeClassParent}.extend = GLOBAL_HELPER_VARIABLE_1;\n`;
    //
    //         console.log(`Going eval() this code:`);
    //         console.log(`${codeToRun}`);
    //         eval(codeToRun);
    //         GLOBAL_HELPER_VARIABLE_1 = codeToRun;
    //         console.log(`JS code which run in eval() available in GLOBAL_HELPER_VARIABLE_1`);
    //         console.log(`node class code available in GLOBAL_HELPER_VARIABLE_2`);
    //
    //         let nodeContent = GraphLang.Utils.toHex(GLOBAL_HELPER_VARIABLE_2);
    //
    //         console.log(`start saving this for porjectId:${projectId}, nodeClassName:${nodeClassName}`);
    //
    //         // OLD WAY USING update function, this is not able to create new schematic just update
    //         GraphLang.Utils.serverUpdateNodeCodeContent(projectId, nodeClassName, nodeContent);
    //     }
    // );

}

/**
 * @param projectId
 * @param nodeClassName
 * @param nodeCodeContent
 * @description This will update node code content on server, code content MUST BE FORMATTED IN HEXADECIMAL STRING, you can use GraphLang.Utils.toHex(String str)
 */
GraphLang.Utils.serverUpdateNodeCodeContent = function(projectId, nodeClassName, nodeCodeContent){
    if (projectId == null || projectId == ""){
        let currUrl = window.location.href;
        const urlParams = new URLSearchParams(currUrl);
        projectId = urlParams.get('projectId');
    }

    GraphLang.Utils.serverSendReceive(
        'updateNodeJavascriptCode',
        projectId,
        `&nodeClassName=${nodeClassName}`,
        function(){alert(JSON.stringify(GLOBAL_AJAX_RESPONSE))},
        `nodeClassContent=${nodeCodeContent}`
    );
}

/**
 * @method serverUploadNodeSchematic
 * @description Upload schematic to server.
 */
GraphLang.Utils.serverUploadNodeSchematic = function(canvasObj){
    /*
     *  This will call upload function after marshaler, javascript code stored inside 'data'
     */

    let url_string = window.location.href;
    let url = new URL(url_string);

    /*
     *  Get all needed parameters from:
     *      1. current url - means node is edited and going to be saved into DB
     *      2. html inputs on webpage
     *
     *  - if display name not define use class name
     */
    let projectId = url.searchParams.get("projectId");
    projectId = projectId ? projectId : -1;

    let nodeId = url.searchParams.get("nodeId");
    nodeId = nodeId ? nodeId : -1;

    let nodeClassName = url.searchParams.get("nodeClassName");
    let newNodeClassName = $("#schematicName").val();
    nodeClassName = nodeClassName ? nodeClassName : newNodeClassName;

    let nodeDisplayName = $("#schematicDisplayName").val();
    nodeDisplayName = nodeDisplayName ? nodeDisplayName : (nodeClassName ? nodeClassName : newNodeClassName);

    /*
     *  Debugging output
     */
    console.log(`--->serverUploadNodeSchematic: projectId: ${projectId}, nodeId: ${nodeId}, nodeClassName: ${nodeClassName}, nodeDisplayName: ${nodeDisplayName}`);

    /*
     *  Check for nodeId or class name, if both are not provided finish here as there is no way how to create new node.
     */
    if (nodeId == -1 && nodeClassName == ""){
        console.log(`No nodeId or nodeClassName provided, ending here. Please fill form for schematic name.`);
        alert(`No nodeId or nodeClassName provided, ending here. Please fill form for schematic name.`);
    }

    /*
     *  Call server to replace node schematic with current schematic, node class name needed.
     *  TODO:
     *      - need to check if class name changed in that case need to call node rename function
     *      - need check if update display name
     */
    GraphLang.Utils.serverNodeReplaceSchematicWithCurrentDiagram({
        projectId: projectId,
        nodeId: nodeId,
        nodeClassName: nodeClassName,
        nodeDisplayName: nodeDisplayName,
        canvas: canvasObj
    });
}

/**
 *  @description This will generate code for current class and replace parts responsible for create symbol picture.
 */
GraphLang.Utils.getNodeCodeWithReplacedSchematicWithCurrentCanvas = function(className, classParent, jsonDocument){
    GLOBAL_HELPER_VARIABLE_1 = {};
    GLOBAL_HELPER_VARIABLE_2 = {};
    let codeToRun = "";

    // 1. Replace extend function with custom function which store objects, functions, properties into variable inside object
    codeToRun += `GLOBAL_HELPER_VARIABLE_1 = ${GLOBAL_CURRENT_LOADED_OBJECT_PARENT}.extend;\n`;
    codeToRun += `${GLOBAL_CURRENT_LOADED_OBJECT_PARENT}.extend = function(obj){this.extendObj = obj;}\n`;
    codeToRun += `${GLOBAL_CURRENT_LOADED_OBJECT_CODE_CONTENT}`;

    // 2. start writing new result object header
    codeToRun += `GLOBAL_HELPER_VARIABLE_2 = "";\n`;
    codeToRun += `GLOBAL_HELPER_VARIABLE_2 += "${className} = ${classParent}.extend({\\n"\n`;

    // 3. Rest of magic, rewrite left of function as they were
    codeToRun += `for (m in ${GLOBAL_CURRENT_LOADED_OBJECT_PARENT}.extendObj){\n`;
    codeToRun += `\t\tlet objItem = ${GLOBAL_CURRENT_LOADED_OBJECT_PARENT}.extendObj[m];\n`;
    codeToRun += `\t\tif (m == 'NAME'){\n`;
    codeToRun += `\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += m + ": '${className}',\\n";\n`;
    codeToRun += `\t\t\t\tconsole.log('----> NAME written: ${className}');\n`;
    codeToRun += `\t\t}else if (m == 'jsonDocument'){\n`;
    codeToRun += `\t\t\t\t/* DO NOTHING - not copy anything */;\n`;
    codeToRun += `\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += m + \`: ${jsonDocument}\` + ",\\n";\n`;
    codeToRun += `\t\t\t\tconsole.log('----> jsonDocument added');\n`;
    codeToRun += `\t\t}else{\n`;
    codeToRun += `\t\t\t\tif (typeof objItem != 'string'){\n`;
    codeToRun += `\t\t\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += m + ": ";\n`;
    codeToRun += `\t\t\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += (typeof objItem == 'Object' || Array.isArray(objItem)) ? JSON.stringify(objItem) : objItem.toString();\n`;
    codeToRun += `\t\t\t\t\t\tconsole.log('----> serialize function: ' + m);\n`;
    codeToRun += `\t\t\t\t}else{\n`;
    codeToRun += `\t\t\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += '"' + objItem.toString() + '"';\n`;
    codeToRun += `\t\t\t\t}\n`;
    codeToRun += `\t\t\t\tGLOBAL_HELPER_VARIABLE_2 += ",\\n";\n`;
    codeToRun += `\t\t}\n`;
    codeToRun += `}\n`;
    codeToRun += `GLOBAL_HELPER_VARIABLE_2 += "});\\n"\n`;

    // 5. Return extend function as it was before start rewriting
    codeToRun += `${GLOBAL_CURRENT_LOADED_OBJECT_PARENT}.extend = GLOBAL_HELPER_VARIABLE_1;\n`;

    console.log(`Going eval() this code:`);
    console.log(`${codeToRun}`);

    eval(codeToRun);
    GLOBAL_HELPER_VARIABLE_1 = codeToRun;
    console.log(`JS code which run in eval() available in GLOBAL_HELPER_VARIABLE_1`);
    console.log(`node class code available in GLOBAL_HELPER_VARIABLE_2`);

    return GLOBAL_HELPER_VARIABLE_2;
}

GraphLang.Utils.getLineCount = function(inputStr){
    //this using regular expression should be more performant than split and count array length
    //source: https://stackoverflow.com/questions/8488729/how-to-count-the-number-of-lines-of-a-string-in-javascript
    return (inputStr.match(/\n/g) || '').length + 1
}

/**
 * @method errorLinesObjectAssignSourceCanvasObject
 * @param {Object}   funcParams
 * @param {String}   funcParams.inputStr
 * @param {int}      funcParams.startLine             - start line from where to check if error started, if negative value than it starts checkErrordFromLine from end
 * @param {Object[]} funcParams.errorLines            - object with keys of line numbers which contains objects about errors from g++
 * @param {int}      funcParams.lineOffset            - there can be already generated code from template this is that line offset count
 * @param {Object}   funcParams.errorSourceObj        - this parameter comes from call and should contain object which is responsible for generated curent code line, it's then attached to result to have link to canvas node where to highlight error
 * @param {bool}     funcParams.doErrorSearchFlag     - flag if do error search
 * @description Modify input error lines object, add source object from canvas if error is on current generated line
 */
GraphLang.Utils.errorLinesObjectAssignSourceCanvasObject = function(funcParams){
    let doErrorSearchFlag = Object.hasOwn(funcParams, "doErrorSearchFlag") ? funcParams.doErrorSearchFlag : true;
    if (doErrorSearchFlag == false) return;

    let errorLines = Object.hasOwn(funcParams, "errorLines") ? funcParams.errorLines : "";
    if (errorLines === null || Object.getOwnPropertyNames(errorLines).length == 0) return;

    let inputStr = Object.hasOwn(funcParams, "inputStr") ? funcParams.inputStr : "";
    let startLine = Object.hasOwn(funcParams, "startLine") ? funcParams.startLine : 0;
    let lineOffset = Object.hasOwn(funcParams, "lineOffset") ? funcParams.lineOffset : "";
    let errorSourceObj = Object.hasOwn(funcParams, "errorSourceObj") ? funcParams.errorSourceObj : "";

    let lineCount = GraphLang.Utils.getLineCount(inputStr) + lineOffset;
    startLine += lineOffset - 1;        //must add to start line current line offset (number of lines generated before this code block) and also -1 is important to return back one line without that it's missing line generated by problematic block
    // console.log(`startLine: ${startLine}, lineOffset: ${lineOffset}`);
    for (let numberStr in errorLines){
        let lineNumber = parseInt(numberStr);
        if (lineNumber <= lineCount && lineNumber >= (startLine>0 ? startLine : lineCount+startLine) ){
            if (Array.isArray(errorLines[numberStr].sourceObjects) == false) errorLines[numberStr].sourceObjects = [];
            if (errorLines[numberStr].sourceObjects.includes(errorSourceObj) == false){
                errorLines[numberStr].sourceObjects.push(errorSourceObj);
                // console.log(`--> error line searching for ${errorSourceObj.NAME}: ${lineNumber} <= ${lineCount} && ${lineNumber} >= ${(startLine>0 ? startLine : lineCount+startLine)}`);
            }
        }
    }
}

/**
 * @method animateBlinkObject
 * @param {Canvas}   canvas           - canvas object where to look for object
 * @param {String}   objId            - object id
 * @param {function} callbackFunction - this function is called at the end, there was sometimes incorrect end of animation so here you can put object into default state
 */
GraphLang.Utils.animateBlinkObject = function(canvas, objId, callbackFunction = null){
    let MAX_TOGGLE_COUNT = 6;
    let errorOpacityToggle = true;
    let errorOpacityToggleCounter = 0;

    //try to find figure by ID, if nothing found try to find connection
    let obj = canvas.getFigure(objId);
    let objType = "figure";
    if (obj){
        callbackFunction = (canvasObj) => canvasObj.setStroke(0);
    }else if (obj == null || obj == undefined){
        obj = canvas.getLine(objId)
        objType = "wire";
        callbackFunction = (canvasObj) => canvasObj.setStroke(2.0);
    }
    if (obj == null || obj == undefined) return;

    obj.setColor("#b43500");

    obj.on("timer", function(emitter){
        obj.attr({opacity: (errorOpacityToggle ? 0.1 : 1)});
        obj.setStroke(errorOpacityToggle ? 0 : 4);

        errorOpacityToggle = !errorOpacityToggle;
        errorOpacityToggleCounter++;
        if (errorOpacityToggleCounter > MAX_TOGGLE_COUNT){
            obj.stopTimer();
            obj.attr({opacity: 1});
            obj.setStroke(objType == "wire" ? 1.0 : 0.0);   //wire at end must be visible therefore stroke is 1.0, for node stroke must dissapear therefore 0.0

            errorOpacityToggleCounter = 0;  //erase toggle counter
            if (typeof callbackFunction === "function") callbackFunction(obj);             //call callback function
        }
    });
    obj.startTimer(120);
}

/**
 * @method rotateSelectedNodeOnCanvas
 * @description Rotate selected object on provided canvas by angle 15deg or by specified angle
 * @param canvas            canvas reference
 * @param angle {double}    rotation angle in degrees
 */
GraphLang.Utils.rotateSelectedNodeOnCanvas = function(canvas, angle = 15){
    let currentRotation = canvas.getSelection().getPrimary().getRotationAngle();
    canvas.getSelection().getPrimary().setRotationAngle(currentRotation + angle);
}
