/**
 *  @class GraphLang.Shapes.Basic.ArrayNode2D
 *  @description Generic 2D array implementation. It's TableLayout from draw2d, each cell of the table is one array item.
 *  Rows and columns are added/removed from context menu. Internally draw2d TableLayout keeps cells in this.grid
 *  (array of rows, each row is array of figures), all rows have always same number of columns.
 */
GraphLang.Shapes.Basic.ArrayNode2D = draw2d.shape.layout.TableLayout.extend({
  NAME: "GraphLang.Shapes.Basic.ArrayNode2D",
  init:function(attr, setter, getter){
    this._super($.extend({padding: 10},attr), setter, getter);

    this.setPersistPorts(false);

    /*
     *  Add text "array 2D" on bottom of figure to distinguish it better from other nodes
     */
    this.add(
        new draw2d.shape.basic.Label({text: "array 2D", stroke: 0}),
        new draw2d.layout.locator.XYRelPortLocator(0, 100.0)
    );

    /*
     *  Setting params after node is added to canvas, before it's not possible
     */
    this.on('added', function(emitter, event){
        emitter.setResizeable(true);
        emitter.setWidth(50);
        emitter.setHeight(30);
    });

    /*****************************************************************************
     *  DEFAULT PARAMS
     *****************************************************************************/
    var defaultDatatype = "int";

    /*****************************************************************************
     *  OUTPUT PORT
     *****************************************************************************/
    var port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 50));
    port.setConnectionDirection(1);
    port.setBackgroundColor("#37B1DE");
    port.setName("out1");
    port.setMaxFanOut(20);
    port.userData = {};
    port.userData.datatype = defaultDatatype;     //this is datatype of array items

    /*
     *  Datatype of wire going out of array, it's whole 2D array as C++ vector to be able to assign it into wires and tunnels,
     *  port userData.datatype holds array item datatype.
     */
    port.getDatatype = function(){
      return "vector<vector<" + this.userData.datatype + ">>";
    };

    this.userData = {};
    this.userData.isTerminal = false;
    this.userData.nodeLabel = "nodeLabel";
    this.userData.datatype = defaultDatatype + "**"; //2D array is pointer to pointer of its elements datatype

    /*****************************************************************************
     *  RIGHT CLICK CONTEXT MENU
     *****************************************************************************/
      this.on("contextmenu", function(emitter, event){
          $.contextMenu({
              selector: 'body',
              events:
              {
                  hide:function(){ $.contextMenu( 'destroy' ); }
              },

              //these functions are run after user click on some context menu option
              callback: $.proxy(function(key, options)
              {
                switch(key){
                  case "int":
                  case "uint":
                  case "float":
                  case "double":
                  case "bool":
                  case "string":
                      emitter.changeDatatypeAllItems(key);
                      break;
                  case "addRow":
                      emitter.addArrayRow();
                      break;
                  case "addColumn":
                      emitter.addArrayColumn();
                      break;
                  case "removeRow":
                      emitter.removeArrayRow();
                      break;
                  case "removeColumn":
                      emitter.removeArrayColumn();
                      break;
                 case "setTerminal":
                     emitter.setStroke(3);
                     emitter.setColor("#DD2241");
                     emitter.setDashArray("-");
                     emitter.userData.isTerminal = true;
                     break;
                 case "unsetTerminal":
                     emitter.setStroke(1);
                     emitter.setColor("#000000");
                     emitter.setDashArray("");
                     emitter.userData.isTerminal = false;
                     break;
                 case "showNodeLabel":
                      var labelText;
                      if (emitter.userData.nodeLabel != null) labelText = emitter.userData.nodeLabel;
                      else{
                          labelText = GraphLang.Utils.getUniqueNodeLabel(emitter.getCanvas(), 'nodeLabel');
                          emitter.userData.nodeLabel = labelText;
                      }

                      emitter.nodeLabel = new GraphLang.Shapes.Basic.Label({bgColor: '#000000', fontColor: '#FFFFFF', text: labelText});
                      emitter.nodeLabel.userData = {};
                      emitter.nodeLabel.userData.type = "nodeLabel";
                      emitter.add(emitter.nodeLabel, new draw2d.layout.locator.TopLocator());
                      emitter.nodeLabel.installEditor(new draw2d.ui.LabelInplaceEditor());
                      emitter.nodeLabel.on('change:text', function(nodeEmitter, event){
                        var newText = nodeEmitter.getText().replaceAll(" ","_");
                        if (newText != nodeEmitter.getParent().userData.nodeLabel) newText = GraphLang.Utils.getUniqueNodeLabel(emitter.getCanvas(), newText);
                        nodeEmitter.getParent().userData.nodeLabel = newText;                  //when text change do this also in userData
                        nodeEmitter.text = newText;                                            //this will not fire another event!
                      });
                      break;
                  default:
                      break;
                }
              },this),
              x:event.x,
              y:event.y,
              items:
              {
                  "int": {name: "int"},
                  "uint":    {name: "uint"},
                  "float":    {name: "float"},
                  "double": {name: "double"},
                  "bool": {name: "bool"},
                  "string": {name: "string"},
                  "separator": "--------------",
                  "addRow": {name: "Add Row"},
                  "addColumn": {name: "Add Column"},
                  "removeRow": {name: "Remove Row"},
                  "removeColumn": {name: "Remove Column"},
                  "separator2":   "---------",
                  "setTerminal": {name: "Set as terminal"},
                  "unsetTerminal": {name: "Unset terminal"},
                  "separator3":   "---------",
                  "showNodeLabel": {name: "Show node label"}
              }
          });
      });

  },

  /**
   *  @name getRowCount
   *  @returns {Number} number of rows in 2D array
   */
  getRowCount: function(){
    return this.grid.length;
  },

  /**
   *  @name getColumnCount
   *  @returns {Number} number of columns in 2D array (all rows have same column count)
   */
  getColumnCount: function(){
    return this.grid.length > 0 ? this.grid[0].length : 0;
  },

  /**
   *  @name createArrayItem
   *  @param {String} text - optional initial value, when not provided default value for datatype is used
   *  @returns {draw2d.shape.basic.Label} new array cell based on current array item datatype
   */
  createArrayItem: function(text){
    var arrayItemDatatype = this.getOutputPort(0).userData.datatype;
    var graphLangColors = new GraphLang.Utils.Color();
    var arrayItem = new draw2d.shape.basic.Label({
        resizeable:true,
        bgColor:graphLangColors.getByNameBackgroundColor(arrayItemDatatype),
        fontColor:graphLangColors.getByNameFontColor(arrayItemDatatype),
        userData: {datatype: arrayItemDatatype}
    });
    this.installItemEditor(arrayItem, arrayItemDatatype);
    if (text !== undefined && text !== null) arrayItem.setText(text);
    return arrayItem;
  },

  /**
   *  @name installItemEditor
   *  @desc Install value editor on array cell based on its datatype (bool toggles on click, others in place editor).
   */
  installItemEditor: function(arrayItem, datatype){
    arrayItem.off('click');
    arrayItem.installEditor(null);
    if (datatype.toLowerCase().search("bool") > -1){
      if (arrayItem.getText() != 'true') arrayItem.setText('false');
      arrayItem.on('click', function(emitter){
          emitter.setText(emitter.text == 'false' ? 'true' : 'false');
      });
    }else{
      if (arrayItem.getText() === "" || arrayItem.getText() === undefined) arrayItem.setText("0");
      arrayItem.installEditor(new draw2d.ui.LabelInplaceEditor());
    }
  },

  /**
   *  @name relayoutTable
   *  @desc Recalculate TableLayout cells positions and node size after grid was changed directly.
   */
  relayoutTable: function(){
    this.calculateLayout();
    this.setDimension(1, 1);
  },

  /**
   *  @name addArrayRow
   *  @desc Add new row at the end of 2D array, row has as many cells as there are columns (at least 1).
   */
  addArrayRow: function(){
    var columnCount = Math.max(1, this.getColumnCount());
    var rowItems = [];
    for (var i = 0; i < columnCount; i++) rowItems.push(this.createArrayItem());
    this.addRow.apply(this, rowItems);
  },

  /**
   *  @name addArrayColumn
   *  @desc Add new column at the end of 2D array, into each row there is new cell pushed.
   */
  addArrayColumn: function(){
    if (this.getRowCount() == 0){
      this.addArrayRow();
      return;
    }

    var _this = this;
    var orig = this.repaintBlocked;
    this.repaintBlocked = true;
    this.grid.forEach(function(row){
      var arrayItem = _this.createArrayItem();
      row.push(arrayItem);
      _this.add(arrayItem, _this.cellLocator);
    });
    this.repaintBlocked = orig;
    this.relayoutTable();
  },

  /**
   *  @name removeArrayRow
   *  @desc Remove last row of 2D array.
   */
  removeArrayRow: function(){
    if (this.getRowCount() == 0) return;
    this.removeRow(this.getRowCount() - 1);
    if (this.getRowCount() == 0) this.relayoutTable();
  },

  /**
   *  @name removeArrayColumn
   *  @desc Remove last column of 2D array, when last column is removed whole array is emptied.
   */
  removeArrayColumn: function(){
    var columnCount = this.getColumnCount();
    if (columnCount == 0) return;
    if (columnCount == 1){
      while (this.getRowCount() > 0) this.removeRow(this.getRowCount() - 1);
      this.relayoutTable();
      return;
    }

    var _this = this;
    this.grid.forEach(function(row){
      var figure = row.pop();
      if (figure !== _this.DUMMY_CELL) _this.remove(figure);
    });
    this.relayoutTable();
  },

  getDatatype: function(){
    return this.getOutputPort(0).userData.datatype;
  },

  /**
   *  @name isArray
   *  @returns {boolean} always true, node is array, similar to isLoop() for loops, used ie. by debugger to not print whole array content into watch
   */
  isArray: function(){
    return true;
  },

  /**
   *  @name changeDatatypeAllItems
   *  @param datatype - name of datatype which all array items should be
   *  @desc Change datatype of all array elements and also array output port datatype.
   */
  changeDatatypeAllItems: function(newDatatype){
      var _this = this;
      var newColor = new GraphLang.Utils.Color();

      this.grid.forEach(function(row){
        row.forEach(function(childObj){
          if (childObj === _this.DUMMY_CELL) return;
          childObj.setColor(newColor.getByName(newDatatype));
          childObj.setFontColor(newColor.getByNameFontColor(newDatatype));
          childObj.setBackgroundColor(newColor.getByNameBackgroundColor(newDatatype));
          if (childObj.userData == undefined) childObj.userData = {};
          childObj.userData.datatype = newDatatype;
          if (newDatatype.toLowerCase().search("bool") > -1) childObj.setText("false");
          _this.installItemEditor(childObj, newDatatype);
        });
      });

      this.userData.datatype = newDatatype + "**";
      this.getOutputPort(0).userData.datatype = newDatatype;
      this.relayoutTable();
  },

  /**
   * @method getPersistentAttributes
   * @description Return an objects with all important attributes for JSON serialization.
   * Array cells are stored in memento.cells as 2D array [row][column] to be able to restore table layout.
   *
   * @returns {Object}
   */
  getPersistentAttributes : function()
  {
      var _this = this;
      var memento = this._super();

      memento.cells = [];
      this.grid.forEach(function(row){
        var rowJSON = [];
        row.forEach(function(figure){
          rowJSON.push(figure === _this.DUMMY_CELL ? null : figure.getPersistentAttributes());
        });
        memento.cells.push(rowJSON);
      });

      return memento;
  },

  setPersistentAttributes : function(memento)
  {
      this._super(memento);

      var datatype = (memento.userData && memento.userData.datatype) ? memento.userData.datatype.replace(/\*+$/, "") : "int";
      this.getOutputPort(0).userData.datatype = datatype;

      if (!memento.cells) return;
      $.each(memento.cells, $.proxy(function(rowIndex, rowJSON){
          var rowItems = [];
          $.each(rowJSON, $.proxy(function(columnIndex, json){
              var arrayItem = this.createArrayItem();
              if (json){
                  var itemText = json.text;
                  delete json.id;     //cells are owned by array, they get new id
                  arrayItem.attr(json);
                  this.installItemEditor(arrayItem, datatype);
                  arrayItem.setText(itemText);
              }
              rowItems.push(arrayItem);
          }, this));
          if (rowItems.length > 0) this.addRow.apply(this, rowItems);
      }, this));
  },

  getVariableName: function(){
      let variableName = "array2D_" + this.getId();
      if (this.userData.nodeLabel) variableName += "_" + this.userData.nodeLabel;
      return variableName
  },

  /*************************************************************************************************************************************************************
   *    TRANSLATE TO C/C++ code functions
   *************************************************************************************************************************************************************/

  translateToCppCodeImport: function(){
      return "#include <vector>\n";
  },

  /**
   *  @name translateToCppCodeDeclaration
   *  @desc Translate 2D array into its declaration, ie. "vector<vector<int>> array2D_xxx = {{0,0,0},{0,0,0}};"
   *  vector is used instead of C array because it can be assigned into wires and passed through tunnels.
   */
  translateToCppCodeDeclaration: function(){
      var _this = this;
      var arrayDatatype = this.getDatatype();
      var isString = arrayDatatype.toLowerCase().search('string') > -1;

      var rowsCode = [];
      this.grid.forEach(function(row){
        var items = [];
        row.forEach(function(figure){
          var value = figure === _this.DUMMY_CELL ? "0" : figure.getText();
          items.push(isString ? '"' + value + '"' : value);
        });
        rowsCode.push("{" + items.join(",") + "}");
      });

      return this.getOutputPort(0).getDatatype() + " " + this.getVariableName() + " = {" + rowsCode.join(",") + "};\n";
  },

  translateToCppCode: function(){
    var cCode = "";
    var variableName = this.getVariableName();

    this.getOutputPort(0).getConnections().each(function(connectionIndex, connectionObj){
      cCode += connectionObj.getVariableName() + " = " + variableName + ";\n";
    });
    return cCode;
  },

  /*************************************************************************************************************************************************************
   *    TRANSLATE TO Python code functions
   *************************************************************************************************************************************************************/

  /**
   *  @name translateToPythonCodeDeclaration
   *  @desc Translate 2D array into python list of lists, ie. "array2D_xxx = [[0, 0, 0], [0, 0, 0]]"
   */
  translateToPythonCodeDeclaration: function(){
      var _this = this;
      var arrayDatatype = this.getDatatype();

      var rowsCode = [];
      this.grid.forEach(function(row){
        var items = [];
        row.forEach(function(figure){
          var value = figure === _this.DUMMY_CELL ? "0" : figure.getText();
          items.push(GraphLang.Utils.toPythonLiteral(value, arrayDatatype));
        });
        rowsCode.push("[" + items.join(", ") + "]");
      });

      return this.getVariableName() + " = [" + rowsCode.join(", ") + "]\n";
  },

  translateToPythonCode: function(){
    var pythonCode = "";
    var variableName = this.getVariableName();

    this.getOutputPort(0).getConnections().each(function(connectionIndex, connectionObj){
      pythonCode += connectionObj.getVariableName() + " = " + variableName + "\n";
    });
    return pythonCode;
  }

});
