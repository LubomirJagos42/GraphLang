BlasterPistol = GraphLang.UserDefinedNode.extend({
  NAME: "BlasterPistol",
  init: function(attr,setter,getter){
    this._super( $.extend({stroke:0, bgColor:null, width:60, height:49, flagAutoCreatePorts: false},attr), setter, getter);

    this.persistPorts=false;
  },
  createShapeElement: function(){
    var shape = this._super();
    this.originalWidth = 60;
    this.originalHeight = 49;
    return shape;
  },
  createSet: function()
  {
    this.canvas.paper.setStart();

    // BoundingBox
    shape = this.canvas.paper.path("m56 13.24a2.5 2.5 0 0 0 -2.34 2.25l-1.88.12a5.76 5.76 0 0 1 -.25-1.09c-.09-.69-.09-1.37-.12-1.72s-3.31-.69-3.56-.59.37 4 .34 4.09a11 11 0 0 1 -1.78.16 24.86 24.86 0 0 0 -.85-4.38 1.15 1.15 0 0 0 -1.56-.28c-.4.22-4.18 3-4.18 3s-2.82-2.75-9.06-2.72-8.43 2.25-8.43 2.25a10.71 10.71 0 0 0 -1.47-.65c-.6-.19-2.81-.47-7.91.93a19 19 0 0 0 -8 4.5c-.28.19-.22.66-.12.85a7.7 7.7 0 0 0 2.62.94 8.71 8.71 0 0 1 3.22 2c-3.67 3.96-4.25 8.18-1.22 10.31a27.32 27.32 0 0 0 7.94 3.25s-3.56 10.78-3.88 12.54 1.75 2.88 3.5 3.09 7.75.5 9.54-.21 1.21-2.25 1-4.47a52.16 52.16 0 0 1 -.07-5.28s3.13 0 4.35-.79 1.72-5.62 1.72-5.62a15.78 15.78 0 0 0 6.28-1.81c3.69-1.82 4.25-4.32 4.25-4.32s.9.07 2 0 5.43-.07 5.68-.35-.12-.5-1.18-2.37a28.55 28.55 0 0 1 -1.82-4l1.35-1.25s.37.75.94 1.75a11.72 11.72 0 0 0 2.09 2.84c.34.13 2.31-3.22 2.37-3.5s-.25-.37-.65-.87a22.27 22.27 0 0 1 -1.22-1.84l1.59-1.53a2.06 2.06 0 0 0 .82.44c.53.15 2.84.37 3.18-1.85s-1.06-4.06-3.23-3.82zm-46.3 6.69c-1-.19-1.56-.6-1.53-.78s3.31-2.15 6.25-3.15 4.94-.78 4.78-.59a37.72 37.72 0 0 0 -5.06 3.87c-1.69 1.78-2.22 2.53-2.31 2.41s-1.13-1.58-2.13-1.76zm16 20c-.15 1.53-.28 2.34-.28 2.34a26.36 26.36 0 0 0 -2.42-2.56c-.18 0-.47.72-.4.84s2.75 2.75 2.78 2.91.06 2.19.15 2.81.19 1.5.19 1.5-3.5-3.62-3.65-3.62-.44.81-.44.81 4.28 4.15 4.28 4.4.16 1.25-.06 1.25a1.45 1.45 0 0 1 -.57 0c-.12-.06-4.31-4.37-4.5-4.4s-.59.5-.53.68 3.88 3.69 3.69 3.75a8.06 8.06 0 0 1 -1.25 0 39.5 39.5 0 0 0 -3.34-3c-.22 0-.69.68-.63.78s2.53 2.25 2.53 2.25a22.22 22.22 0 0 1 -4.37-.47c-1.22-.41-1.31-1.06-1.22-1.47s3.6-11.73 3.82-12.12a14 14 0 0 0 3.44.32c2.13 0 3.63-.19 3.63-.19a13.43 13.43 0 0 0 -.85 3.19zm4.69.34a6.87 6.87 0 0 1 -2.47.34 6.35 6.35 0 0 1 1-3.87c.05-.08 2.56-.31 2.56-.31s-.93 3.72-1.09 3.84zm12.25-12a19.51 19.51 0 0 0 -1.91-2.59c-.22 0-.56.22-.56.43s2.06 3 1.94 3.29-.6 1.43-.78 1.46-2.16-3.59-2.33-3.65-.59 0-.62.19 2.22 4 2.22 4-1 .78-1.1.72-2.25-4-2.44-4-.71.25-.68.37 2.43 3.94 2.31 4.06-1.16.69-1.22.57-2.44-4-2.62-4-.72.4-.69.5 2.44 3.71 2.25 3.84-.94.41-1 .28-2.27-3.13-2.41-3.13-.81.38-.78.54 2.16 2.81 2 2.9a4 4 0 0 1 -.93.19 27.23 27.23 0 0 0 -2.1-2.84c-.18 0-.68.18-.68.28s1.68 2.56 1.59 2.65a5.69 5.69 0 0 1 -1.16.22 19.87 19.87 0 0 0 -1.68-2.55c-.18 0-1 .28-.9.41s1.5 2.22 1.31 2.31a36.3 36.3 0 0 1 -8.59.25c-4.5-.38-8.44-2-10-3.31s-2.08-2.58-.82-4.76a40.9 40.9 0 0 1 7.19-8 22.08 22.08 0 0 1 11.13-5c4.65-.56 8.12.1 10.72 2.69s3.62 7.16 3.71 8.72a9 9 0 0 1 -.37 2.96zm6.41-.34c-.1.09-3.94.12-3.94.12a19.25 19.25 0 0 0 -1.22-7.65 15.11 15.11 0 0 0 -3-4.75c.15-.16 3.15-2.22 3.15-2a24.57 24.57 0 0 0 2.07 8.22c1.81 4.13 3.03 5.96 2.94 6.06zm-.82-6.13a10.83 10.83 0 0 1 -1.53-4.37 3.09 3.09 0 0 1 1.53-.1c.13.13.22.66.75 1.88s.69 1.65.69 1.65zm6 1.16c0 .19-.9 1.62-1 1.53a18.55 18.55 0 0 1 -3.21-5.78 28.66 28.66 0 0 1 -1-5c0-.22 1.4-.1 1.46 0a31.93 31.93 0 0 0 1.22 4.69 32.53 32.53 0 0 0 2.56 4.6zm-1.09-4a2.94 2.94 0 0 1 -.84-2.47c0-.16 1.25-.13 1.25-.13a2.35 2.35 0 0 0 .37 1l.44.63s-1.03 1.06-1.19.94zm5-2.25a1.53 1.53 0 0 1 -2.78.59c-1-1.16-.94-3.06 1-2.91a1.77 1.77 0 0 1 1.84 2.29zm-33.38 23.03c.1 0 .25-.25.29-.56s-.91-1-1-1.1-.45.53-.37.6.99 1.03 1.08 1.06zm-2.46 3.34a20.32 20.32 0 0 0 2.43 2.25c.19 0 0-1 0-1.18s-2.18-2.37-2.18-2.15-.38.86-.25 1.08zm-4.88-21.34a29.12 29.12 0 0 0 2.06 3.62c.16.19.53-.15.63-.34a33.71 33.71 0 0 0 -1.81-3.66 1.58 1.58 0 0 0 -.88.38zm3.34-2.44c-.18 0-.9.3-.9.41s2.56 4.9 2.69 5a.73.73 0 0 0 .71-.44 28.57 28.57 0 0 0 -2.5-4.97zm3.1-1.81c-.31-.13-1.09.27-1.13.37-.12.35 2.19 4.44 2.41 4.66s1-.16 1.06-.37a24.2 24.2 0 0 0 -2.34-4.66zm2.14.31s1.25 3.44 1.44 3.6.78-.22.88-.44a20.46 20.46 0 0 0 -1.47-3.44c-.15-.12-.68.16-.85.28zm9.5-2.34a8.28 8.28 0 0 0 -3.06-.56c-.22.09-.25.93-.09 1.12s1.28.13 2.4.44a22.74 22.74 0 0 1 2.5 1c.13 0 .38-.75.35-1s-.71-.56-2.12-1z");
    shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
    shape.data("name","BoundingBox");

    // Rectangle
    //shape = this.canvas.paper.path('M60 49L0 49L0 0L60 0Z');
    //shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
    //shape.data("name","Rectangle");


    return this.canvas.paper.setFinish();
  },
  jsonDocument: [],
  applyAlpha: function(){},
  layerGet: function(name, attributes){
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
  layerAttr: function(name, attributes){
    if(this.svgNodes===null) return;
    this.svgNodes.forEach(function(shape){
      if(shape.data("name")===name){
        shape.attr(attributes);
      }
    });
  },
  layerShow: function(name, flag, duration){
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
  getParameterSettings: function(){
    return [];
  },
  addPort: function(port, locator){
    this._super(port, locator);
    return port;
  },
  getPersistentAttributes: function(){
    var memento = this._super();
    memento.labels = [];
    this.children.each(function(i,e){
      var labelJSON = e.figure.getPersistentAttributes();
      labelJSON.locator=e.locator.NAME;
      memento.labels.push(labelJSON);
    });
    return memento;
  },
  setPersistentAttributes: function(memento){
    this._super(memento);
    this.resetChildren();
    $.each(memento.labels, $.proxy(function(i,json){
      var figure =  eval("new "+json.type+"()");
      figure.attr(json);
      var locator =  eval("new "+json.locator+"()");
      this.add(figure, locator);
    },this));
  },
});