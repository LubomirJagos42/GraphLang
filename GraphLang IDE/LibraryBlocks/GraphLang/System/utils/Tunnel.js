GraphLang.Shapes.Basic.Tunnel = draw2d.shape.node.Between.extend({
    NAME: "GraphLang.Shapes.Basic.Tunnel",
    init : function(attr)
    {
        //this._super($.extend({with: 30, height: 10},attr));

        //this.setPersistPorts(false);  //MUST BE COMMENTED, IF SET TO FALSE NOT RUNNING OK

        this._super(attr);
        this.setBackgroundColor("#fdc11d");
        this.setHeight(30);
        this.setWidth(15);

        this.originalWidth = this.getWidth();
        this.originalHeight = this.getHeight();

        portObj = this.getInputPorts().first();
        portObj.userData = {};
        portObj.userData.datatype = "undefined";

        if (attr && attr.id){
            portObj.setId(attr.id + "-in0");
            portObj.setName(attr.id + "-in0");
        }else{
            portObj.setId(this.getId() + "-in0");
            portObj.setName(this.getId() + "-in0");
        }
        //portObj.setName(portObj.getName() + "_" + this.getId());

        portObj = this.getOutputPorts().first();
        portObj.userData = {};
        portObj.userData.datatype = "undefined";
        //portObj.setName(this.getId() + "-out0");
        if (attr && attr.id){
            portObj.setId(attr.id + "-out0");
            portObj.setName(this.getId() + "-out0");
        }else{
            portObj.setId(this.getId() + "-out0");
            portObj.setName(this.getId() + "-out0");
        }
        //portObj.setName(portObj.getName() + Date.now());
        //portObj.setName(portObj.getName() + "_" + this.getId());
        //this.add(new draw2d.shape.basic.Label({text: "tunnel"}), new draw2d.layout.locator.CenterLocator(this));

        tunnelObj = this
		this.on('click',function(emitter, event){
            //emitter.setBackgroundColor("#FF0000");
            emitter.setDashArray("--");
   			canvas = emitter.getCanvas()
      
            if (emitter.userData === null) emitter.userData = {};
    		emitter.userData.parentLoop = emitter.getParent().getId();
      			 
  			//alert(emitter.getParent().NAME);
  			pX = emitter.getAbsoluteX();
  			pY = emitter.getAbsoluteY();
  			emitter.getParent().remove(emitter);
  			canvas.add(emitter)

  			emitter.setX(pX);
  			emitter.setY(pY);
            emitter.setDraggable(true);
		});

        // Store original setPosition to bypass edit policy constraints when locator sets position
        this.originalSetPosition = this.setPosition;
        this.setPosition = function(x, y) {
            // When positioned by locator (with rotation applied), bypass edit policy constraints
            // to allow tunnel to extend outside loop boundary
            if (this.isLocatorPositioning) {
                var oldPos = { x: this.x, y: this.y };
                if (x instanceof draw2d.geo.Point) {
                    this.x = x.x;
                    this.y = x.y;
                } else {
                    this.x = x;
                    this.y = y;
                }
                this.repaint();
                var event = { figure: this, dx: this.x - oldPos.x, dy: this.y - oldPos.y };
                this.fireEvent("move", event);
                this.fireEvent("change:x", event);
                this.fireEvent("change:y", event);
                return this;
            }
            // Otherwise use normal setPosition with edit policy constraints
            return this.originalSetPosition(x, y);
        };

    },  //END init() function
    
    /*
     *  Returns tunnel datatype, it's based on connected wire, if wire is connected to tunnel
     *  then it should recursively get datatype based on port which is traversed back
     *  and has some datatype.
     */
    getDatatype: function(){
        if (this.getInputPort(0).getConnections().getSize() > 0){
            wireSource = this.getInputPort(0).getConnections().first().getSource();

            /*
             *  Returning wire datatype, evaluate in this order:
             *      1. if connected to cluster
             *      2. to port with datatype but not tunnel
             *      3. to tunnel, then recursively asking previous wire
             */
            
            if (wireSource.getParent().NAME.toLowerCase().search('clusterdatatype') >= 0){
                return wireSource.getParent().getDatatype();
            }

            else if (
                wireSource.getParent().NAME.toLowerCase().search('bundle') >= 0 &&
                wireSource.getParent().getConnectedCluster
            ){
                let connectedCluster = wireSource.getParent().getConnectedCluster();
                if (connectedCluster) {
                    return connectedCluster.getDatatype();
                }else{
                    return "undefined";
                }
            }

            else if (
                wireSource.getParent().NAME.toLowerCase().search('tunnel') == -1 &&
                wireSource.getDatatype
            ) {
                return wireSource.getDatatype();
            }else if (
                wireSource.getParent().NAME.toLowerCase().search('tunnel') == -1 &&
                wireSource.userData &&
                wireSource.userData.datatype
            ){
                return wireSource.userData.datatype;
            }else{
                //THIS IS MAYBE USELESS DUE getDatatype() above but left it here to have something
                return wireSource.getParent().getDatatype();
            }
        }
    },

    onDragEnd: function(x, y, shiftKey, ctrlKey){
    	//alert("drag end for tunnel");
    	this.setX(x);
    	this.setY(y);

    	loopObj = this.getCanvas().getFigure(this.userData.parentLoop);
    	loopBoundingRect = loopObj.getBoundingBox();
        pX = x;
        pY = y;
        tunnelObj = this

        //loopBoundingRect.scale(tunnelObj.getWidth(), tunnelObj.getHeight());
        //loopObj.setBoundingBox(loopBoundingRect.scale(tunnelObj.getWidth(), tunnelObj.getHeight()));

        xCoord = (pX - loopObj.getX() - tunnelObj.getWidth()/2)/loopBoundingRect.getWidth()*100;
        yCoord = (pY - loopObj.getY() - tunnelObj.getHeight()/2)/loopBoundingRect.getHeight()*100;

        //alert(xCoord + "   " + yCoord);

        if (xCoord > 95) xCoord = 95;
        else if (xCoord < 5) xCoord = 5;

        if (yCoord > 95) yCoord = 95;
        else if (yCoord < 5) yCoord = 5;

        tunnelEdge = -1;

         //TUNNEL ATTACHED TO RIGHT EDGE
         if (Math.abs(x-loopBoundingRect.getRight()) < Math.abs(x-loopBoundingRect.getLeft()) &&
             Math.abs(x-loopBoundingRect.getRight()) < Math.abs(y-loopBoundingRect.getTop()) &&
             Math.abs(x-loopBoundingRect.getRight()) < Math.abs(y-loopBoundingRect.getBottom())
         ){
           tunnelEdge = 0;
           tunnelLocatorRel =  new GraphLang.Utils.RightRelPortLocator(
             tunnelObj.getWidth()/2,
             yCoord
           );
           if (this.NAME.toLowerCase().search('lefttunnel') > -1) this.setRotationAngle(-180);
           else this.setRotationAngle(0);
         }
         //TUNNEL ATTACHED TO LEFT EDGE
         else if (Math.abs(x-loopBoundingRect.getLeft()) < Math.abs(x-loopBoundingRect.getRight()) &&
             Math.abs(x-loopBoundingRect.getLeft()) < Math.abs(y-loopBoundingRect.getTop()) &&
             Math.abs(x-loopBoundingRect.getLeft()) < Math.abs(y-loopBoundingRect.getBottom())
         ){
           tunnelEdge = 1;

           tunnelLocatorRel =  new GraphLang.Utils.LeftRelPortLocator(
             tunnelObj.getWidth()/2,
             yCoord
           );

           if (this.NAME.toLowerCase().search('lefttunnel') > -1) this.setRotationAngle(-360);
           else this.setRotationAngle(-180);
         }
         //TUNNEL ATTACHED TO BOTTOM
         else if (Math.abs(y-loopBoundingRect.getBottom()) < Math.abs(x-loopBoundingRect.getRight()) &&
             Math.abs(y-loopBoundingRect.getBottom()) < Math.abs(x-loopBoundingRect.getLeft()) &&
             Math.abs(y-loopBoundingRect.getBottom()) < Math.abs(y-loopBoundingRect.getTop())
         ){
           tunnelEdge = 2;
           tunnelLocatorRel =  new GraphLang.Utils.BottomRelPortLocator(
             xCoord,
             tunnelObj.getHeight()/2
           );

           if (this.NAME.toLowerCase().search('lefttunnel') > -1) this.setRotationAngle(-90);
           else this.setRotationAngle(-270);

           //this.setWidth(this.originalHeight)
           //this.setHeight(this.originalWidth)
         }
         //TUNNEL ATTACHED TO TOP
         else if (Math.abs(y-loopBoundingRect.getTop()) < Math.abs(x-loopBoundingRect.getRight()) &&
             Math.abs(y-loopBoundingRect.getTop()) < Math.abs(x-loopBoundingRect.getLeft()) &&
             Math.abs(y-loopBoundingRect.getTop()) < Math.abs(y-loopBoundingRect.getBottom())
         ){
           tunnelEdge = 3;
           tunnelLocatorRel =  new GraphLang.Utils.TopRelPortLocator(
             xCoord,
             tunnelObj.getHeight()/2
           );

           if (this.NAME.toLowerCase().search('lefttunnel') > -1) this.setRotationAngle(-270);
           else this.setRotationAngle(-90);

           //this.setWidth(this.originalHeight)
           //this.setHeight(this.originalWidth)
         }

         this.setDashArray("");
         //this.getCanvas().remove(this);    //DO NOT REMOVE OBJECT FROM CANVAS

         loopObj.add(this, tunnelLocatorRel);
         //loopObj.bringsAllTunnelsToFront();

         this.setAlpha(1);   // restore opacity, base onDragEnd is not called
    },

    getVariableName: function(){
        let variableName = "";

        variableName += "tunnel_" + this.getId();
        variableName = variableName.replaceAll('-', '_');

        return variableName;
    },

    translateToCppCode: function(){
      return "{Tunnel: executionOrder: " + this.getUserData().executionOrder + "}";
    }

});
