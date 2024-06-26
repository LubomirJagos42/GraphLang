/**
 *  @class GraphLang.Shapes.PropertyNode
 *  @description Thisi s property node for GraphLang.
 */
GraphLang.Shapes.Basic.UnbundleByName = draw2d.shape.layout.FlexGridLayout.extend({

	NAME: "GraphLang.Shapes.Basic.UnbundleByName",

    init : function(attr)
    {
    	this._super($.extend({
        bgColor:"#dbddde",
        color:"#d7d7d7",
        stroke:1,
        radius:3,
        columns: "10px, grow",
        //rows: "20px, 20px, 20px"
        rows: "grow"
      },attr));

      let nodeObjectReference = this;

      //don't save ports into file
      this.persistPorts = false;

      let colorObj = new GraphLang.Utils.Color();

      //input for cluster to be wired here
      this.portClusterType = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(-0.7, 50));
      this.portClusterType.setConnectionDirection(3);
      this.portClusterType.setBackgroundColor(colorObj.getByName("cluster"));
      this.portClusterType.setName("clusterInput");
      this.portClusterType.setMaxFanOut(20);
      this.portClusterType.getDatatype = this.getDatatype;

      //create vertical list and push it into unbundler object
      this.items = new draw2d.shape.layout.VerticalLayout();
      this.add(this.items, {row: 0, col:1});

      //DEFAULT EXECUTION ORDER
      this.userData = {};
      this.userData.executionOrder = -1;
      this.userData.wasTranslatedToCppCode = false;

      this.updateAllItemsOncontext();
      this.updateBasicContextMenu();
    },
    
    __old_getConnectedCluster: function(){
        let connections = this.portClusterType.getConnections();
        let clusterObj = null;

        if (connections.getSize() > 0){
          let connectedNode = connections.first().getSource().getParent();
          let clusterName = null;

          /*
           *    There are two options:
           *        - there is cluster connected to cluster input or some tunnel which has function getDatatype()
           *          and this function should have just nodes which represent some datatype or tunnels
           *        - it's connected to some Unbundle, UnbundleByName which output is cluster
           */
          if (connectedNode.getDatatype){
            clusterName = connectedNode.getDatatype();
          }else if (connectedNode.getConnectedClusterDatatype){
            clusterName = connectedNode.getConnectedClusterDatatype();          
          }else if (connections.first().getSource().userData &&
                    connections.first().getSource().userData.datatype &&
                    connections.first().getSource().userData.datatype.toLowerCase().search('clusterdatatype') > -1){
            clusterName = connections.first().getSource().userData.datatype;
          }

          if (clusterName){
              this.getCanvas().getFigures().each(function(figureIndex, figureObj){
                  if (figureObj.getDatatype &&
                      figureObj.getDatatype() == clusterName &&
                      figureObj.NAME.toLowerCase().search("clusterdatatype") > -1   //this must be here to REALLY SURE GET CLUSTER NODE, because also tunnel can return cluster datatype if connected to one
                  ){
                      clusterObj = figureObj;
                  } 
              }); 
          }
        }
        return clusterObj;    
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

    getConnectedCluster: function(){
        let connections = this.portClusterType.getConnections();
        let clusterObj = null;
        let thisId = this.getId();

        if (connections.getSize() > 0){
            let connectedNode = connections.first().getSource().getParent();
            let clusterName = null;

            /*
             *    There are three options:
             *        - there is cluster connected to cluster input or some tunnel which has function getDatatype()
             *          and this function should have just nodes which represent some datatype or tunnels
             *        - it's connected to some Unbundle, UnbundleByName which output is cluster
             *        - it's connected to constant which datatype is cluster (cluster can be located in other block)
             */
            if (connectedNode.getDatatype){
                clusterName = connectedNode.getDatatype();
            }else if (connectedNode.getConnectedClusterDatatype){
                clusterName = connectedNode.getConnectedClusterDatatype();
            }
            console.log(`node: ${this.NAME}, id: ${this.getId()} searching for cluster definition of "${clusterName}"`);

            if (clusterName){
                /*
                 *  1. Looking for cluster on current canvas
                 */
                this.getCanvas().getFigures().each(function(figureIndex, figureObj){
                    if (
                        figureObj.NAME.toLowerCase().search('clusterdatatype') >= 0 &&
                        figureObj.getDatatype &&
                        figureObj.getDatatype() == clusterName
                    ){
                        clusterObj = figureObj;
                    }
                });

                /*
                 *  2. Looking for cluster in user defined nodes
                 */
                if (clusterObj == null) clusterObj = GraphLang.Utils.getClusterDatatypeDefinitionFromUserDefinedNode(clusterName);

            }
        }
        return clusterObj;
    },

    //TODO, check if could be done simpler
    getDatatype: function(){
        let connectedCluster = null;
        let clusterPort = null;
        if (this.NAME.search(".UnbundleByName") > -1){
            connectedCluster = this.getConnectedCluster();
            clusterPort = this.portClusterType;
        }
        else if (this.NAME.search("InputPort") > -1){
            connectedCluster = this.getParent().getConnectedCluster();
            clusterPort = this;
        }

        if (connectedCluster == null){
            let connections = clusterPort.getConnections();
            if (connections.getSize() > 0) {
                let connectedNode = connections.first().getSource().getParent();

                if (connectedNode.getDatatype) {
                    return connectedNode.getDatatype();
                } else if (connectedNode.getConnectedClusterDatatype) {
                    return connectedNode.getConnectedClusterDatatype();
                }
            }else{
                return "undefined";
            }
        }else{
            return connectedCluster.getDatatype();
        }
    },

    getContextMenu: function(){
      /*
       *    Adding connected cluster items labels into context menu which appears
       *    after right click on bundle by name item.
       */
      let contextMenu = {};

      /*
       *    Default context menu items to add and delete item.
       */
      contextMenu["add after this"] = {name: "Add After This"};
      contextMenu["delete"] = {name: "Delete This Item"};

      let clusterObj = this.getConnectedCluster();
      if (clusterObj){
        contextMenu["separator1"] = "--------------------";
        clusterObj.getAllItemsLabels().each(function(itemIndex, itemObj){
            contextMenu[itemObj] = {name: itemObj};
        });
      }else{
        console.error(`node: ${this.NAME}, id:${this.getId()} connected cluster is null`);
      }

      return contextMenu;
    },

    updateAllItemsOncontext: function(){
       /*
        *    Setting to show context menu when right click on each item in cluster, items
        *    are get from vertical layout which grouped them together
        */
       this.items.getChildren().each(function(itemIndex, itemObj){
          itemObj.on("contextmenu", function(emitter, event){
               $.contextMenu({
                   selector: 'body',
                   events:
                   {
                       hide:function(){ $.contextMenu( 'destroy' ); }
                   },

                   //these functions are run after user click on some context menu option
                   callback: $.proxy(function(key, options){
                       switch(key){
                           case "add after this":
                               insertAtIndex = emitter.getParent().getParent().items.getChildren().indexOf(emitter) + 1;
                               emitter.getParent().getParent().addEntity("null", insertAtIndex);
                               break;
                           case "delete":
                               emitter.getParent().getParent().removeEntity(emitter);	//POSSIBLE TO ADD INDEX AFTER WHICH IT HAS TO ADD ITEM
                               break;
                           default:
                               let itemObj = emitter.getParent().getParent().getConnectedCluster().getItemByLabel(key);
                               if (itemObj){
                                   var colorObj = new GraphLang.Utils.Color();
                                   emitter.setText(key);
                                   portObj = emitter.getOutputPort(0)
                                   portObj.userData.datatype = itemObj.getDatatype();
                                   portObj.useGradient = false;
                                   portObj.setBackgroundColor(colorObj.getByName(itemObj.getDatatype()));
                               }else{
                                   emitter.setText("not found");
                               }
                               break;
                       }
                   },this),
                   x:event.x,
                   y:event.y,
                   items: emitter.getParent().getParent().getContextMenu()
               });
         });
       });
	},

    updateBasicContextMenu: function(){
      this.items.on("contextmenu", function(emitter, event){
          $.contextMenu({
              selector: 'body',
              events: { hide:function(){$.contextMenu( 'destroy' );} },  
              callback: $.proxy(function(key, options){
                 switch(key){
                 case "addItem":
                     emitter.getParent().addEntity("null", 0);
                     break;
                 default:
                     break;
                 }
  
              },this),
              x:event.x,
              y:event.y,
              items: {"addItem": {name: "Add new item"}}
          });
      });
    },

    /**
     * @method addEntity
     * @description Add an entity to the db shape
     * @param {String} txt the label to show
     * @param {Number} [optionalIndex] index where to insert the entity
     */
    addEntity: function(txt, optionalIndex)
    {
      //var label = new draw2d.shape.basic.Label({
      var label = new GraphLang.Shapes.Basic.Label({
        text:txt,
        stroke:0,
        radius:0,
        bgColor:null,
        padding:{left:10, top:3, right:10, bottom:5},
        fontColor:"#4a4a4a",
        resizeable:true,
        editor:new draw2d.ui.LabelEditor()
      });
      
      var outputPort = label.createPort("output");
      outputPort.userData = {};
      outputPort.userData.datatype = "undefined";
      outputPort.setName("output_" + label.id);

      var unbundlerObj = this;
      outputPort.getDatatype = function(){                                                  //THIS ONE IS USED ON TOP CANVAS TO LLOK FOR PORT
          var connectedCluster = unbundlerObj.getConnectedCluster();                        //this must be called as anonym function to get connected cluster at time of validation
          var currentItemLabel = this.getParent().getText();
          var itemClusterObj = connectedCluster.getItemByLabel(currentItemLabel);

          if (itemClusterObj) return itemClusterObj.getDatatype();
          else return "undefined";
      }
      outputPort.getExecutionOrder = function(){
          //get executionOrder from UnbundlerByName object
          //    hierarchy is UnbundlerByName object > Vertical layout > Label object > output port
          let executionOrder = this.getParent().getParent().getParent().getUserData().executionOrder;
          return executionOrder;
      }
      label.getDatatype = function(){                                                       //THIS ONE IS USED INSIDE LOOP, YEAH IT'S NON CONSISTENT BUT THAT'S CURRENT STATE AT LEAST IT'S RUNNING SOMEHOW
          var connectedCluster = unbundlerObj.getConnectedCluster();                        //this must be called as anonym function to get connected cluster at time of validation
          var currentItemLabel = this.getText();
          var itemClusterObj = connectedCluster.getItemByLabel(currentItemLabel);
          return itemClusterObj.getDatatype();
      }

      outputPort.getTopParentNode = function(){
          return unbundlerObj;
      }

      if($.isNumeric(optionalIndex) && optionalIndex < this.items.getChildren().getSize()){
        this.items.add(label, null, optionalIndex);
      }
      else{
        this.items.add(label);
      }
      
      this.updateAllItemsOncontext();	//Label (emitter) -> VerticalLayout (parent) -> UnbundleByName (parent)
      return label;
    },

    /**
     * @method removeEntity
     * Remove the entity with the given index from the DB table shape.<br>
     * This method removes the entity without care of existing connections. Use
     * a draw2d.command.CommandDelete command if you want to delete the connections to this entity too
     *
     * @param {Number} index the index of the entity to remove
     */
    removeEntity: function(item)
    {
      item.getOutputPort(0).getConnections().each(function(connectionIndex, connectionObj){
          connectionObj.getCanvas().remove(connectionObj);
      })

      this.items.remove(item);
      this.updateAllItemsOncontext();
    },

    /**
     * @method
     * Returns the entity figure with the given index
     *
     * @param {Number} index the index of the entity to return
     */
    getEntity: function(index)
    {
        return this.children.get(index+1).figure;
    },

   /**
    * @method setName
    * @description Set the name of the DB table. Visually it is the header of the shape
    * @param name
    */
   setName: function(name)
   {
       this.classLabel.setText(name);

       return this;
   },

  /**
   * @method getPersistentAttributes
   * @description Return an objects with all important attributes for XML or JSON serialization.
   * This is used when file IS SAVED.
   *
   * @returns {Object}
   */
  getPersistentAttributes : function()
  {
      var memento = this._super();
      //adding aditional items to memento
      memento.bundleItems = [];
      this.items.getChildren().each(function(itemIndex, itemObj){
        let itemData = {};
        itemData.name = itemObj.getText();
        itemData.inputPortName = itemObj.getOutputPort(0).getName();
        
        memento.bundleItems.push(itemData);
      });

      return memento;
  },

   /**
    * @method setPersistentAttributes
    * @description Read all attributes from the serialized properties and transfer them into the shape.
    * @param {Object} memento
    * @return
    */
   setPersistentAttributes : function(memento)
   {
      this._super(memento);
      this.setId(memento.id);

      //adding items
      this.add(this.items, {row: 0, col:0});

      $.each(memento.bundleItems, $.proxy(function(i,bundleItem){
        this.addEntity(bundleItem.name);
        this.items.getChildren().last().getOutputPort(0).setName(bundleItem.inputPortName);

        this.items.getChildren().last().getOutputPort(0).getExecutionOrder = function(){
          //get executionOrder from UnbundlerByName object
          //    hierarchy is UnbundlerByName object > Vertical layout > Label object > output port
          let executionOrder = this.getParent().getParent().getParent().getUserData().executionOrder;
          return executionOrder;
        }

      },this));

      this.getOutputPort("clusterInput").getDatatype = this.getDatatype;     //set function for datatype obtaining during load from file

      this.updateAllItemsOncontext();
   },
   
   /*
    *   IMRPOTANT
    *   Overloaded function to also return ports of items, must be to return all ports to have defined wires
    *   inside layer when this node is part of multilayered structure
    */
   getInputPorts: function(){
     let inputPorts = new draw2d.util.ArrayList();
     inputPorts.add(this.portClusterType);
     this.items.getChildren().each(function(childIndex, childObj){
        inputPorts.addAll(childObj.getInputPorts());
     });
     return inputPorts;
   },

   validateSelf: function(canvasOwnerName, clusterDefinitionArray){
       let unbundlerObj = this;
       let errorList = new draw2d.util.ArrayList();

       console.log(`${this.NAME} > validateSelf()`);

       let connectedClusterDatatype = this.getDatatype();

       /*
        *   Check if unbundler cluster port is connected, this is MOST BASIC check.
        */
       if (connectedClusterDatatype == null){
           errorList.add({
               canvasOwnerName: canvasOwnerName,
               figureId: this.getId(),
               figureName: this.NAME,
               message: "CLUSTER_TYPEDEFINITION_PORT_NOT_CONNECTED"
           });
       }

       /*
        *   This is just for debugging principles printing info of all availbale cluster datatypes into console for developer.
        */
       let message = ""
       message += `${this.NAME} > validateSelf() entered with clusters list:\n`;
       for (const k of Object.keys(clusterDefinitionArray)){
            message += `\t${k}\n`;
       }
       console.log(message);

       /*
        *   This will obtain reference to cluster object on helper canvas and check each item in ubnudler if it's real cluster item by label.
        *   If item in unbundler is not in cluster it will be marked somehow to be visible to user.
        */
       let clusterObj = GraphLang.Utils.getClusterDatatypeDefinitionFromUserDefinedNode(connectedClusterDatatype);
       this.items.getChildren().each(function(itemIndex, itemObj){
           let isUnbundleItemInCluster = clusterObj.getItemByLabel(itemObj.getText());
           if (!isUnbundleItemInCluster){
               itemObj.setBackgroundColor('#FF0000');
               errorList.add({
                   canvasOwnerName: canvasOwnerName,
                   figureId: unbundlerObj.getId(),
                   figureName: unbundlerObj.NAME,
                   message: "UNBUNDLE_ITEM_NOT_EXISTS"
               });
               console.error(errorList.last());
           }else{
               itemObj.setBackgroundColor(null);    //everything OK set backround transparent
           }
       });

       return errorList;
   },

   symbolPicture: " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABSCAIAAACjea/PAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAMcSURBVHhe7ZtNTxNBGIB3Z7vdWqgV00aqByAao1BjwkXCQW4e0INyIRoP4EFjYkT8DSQaf4Im3okn/EA9GwMcwBiNB75SgcAaGyisodvufDjQgRXpFvDU8Z0nk9mZ2ffwPpn9ymxGLxaLGjCQOEJCOcNAOcNAOcNgX+9njLFoVT2hUEi0gtnD2XGclZUVz/NEv+oxTbOuri4Wi4l+OSo5r66uZrNZZISQYWiMidFqRtcpIZTgRCIRj8fF4C4CnSmlmUxGNwyEDDEkCZQSRkhjYyNC5Z9Wgc+wfD7Pa+mEOaWcS/mXJdCZzzO/VERHOvhFzvMPQL2fYaCcYaCcYaCcYaCcYaCcYaCcYaCcYaCcYaCcYQDRucz69uDg4JuXr6enpsyQmW4933n5SjqdFuckgWAvmUgE/c3Y4ZzL5e7evjMxMdHKUik95ul0FuW+Fe2e3t6e3lsiSAYO4Hzz+o2lzzNX8ekjeoTxc5rG66/0xwv8pe9B/7WuLhFX9VR29u/noaGhkbGxTu9kjWZiRjEl3mZ9Rk9eQqeeP31WYZVcLnzn92/fndOPHdYswhh3JhojW3UrOrGeXx8dGRGhkuM7z07PHNUOYUZKxdtq8EIZTYYP2/aSCJUc37mmttZlGGuUF8ILv7B5e6suasSyIiJUcnznC+1t89avjYnduJP9SeZlka0tF5zmlhYRKjm+c3d394K7/InZm5PM/qxHzcX2tvampiYRKjm+c0NDw8DAwAeW+cjm1phbmuo5lntlTq3H0P2H/SJOfv7+DhseHn7y6PH3hfl4OFqkJI8LHRc77vX1JZNJESEDB/gm2WZ8fHxyctItFM42N6dSx8WoPPyLM8dxnJ/ZrBEyRV8q9vsdBgflDAPlDAPlDAPlDAPlDAPlDAPlDAPlDAPlDAPlvBNpdxrtkXmgczgclvfnK8+c5y86uwh0tiwrGo1SIs2O2G14zjxznr/o7yJwfZuDMbZtmwcgZFAZ9oiije1zhM9wfX19hU3BlZxLOI7jui6TwVnX9UgkErSUv83ezv8f6l0FA+UMA+UMA+UMAU37DYH+ibyG5Ac4AAAAAElFTkSuQmCC",

    translateToCppCode: function(){
      cCode = "";
      cCode += "/*UnbundleByName*/\n";
      
      let inputWire = this.portClusterType.getConnections().first();
      this.items.getChildren().each(function(itemIndex, itemObj){
        itemObj.getOutputPort(0).getConnections().each(function(connectionIndex, connectionObj){
            cCode +=  'wire_' + connectionObj.getId() + ' = wire_' + inputWire.getId() + '.' + itemObj.getText() + ";\n";
        });
      });        

      return cCode;
    }

});
