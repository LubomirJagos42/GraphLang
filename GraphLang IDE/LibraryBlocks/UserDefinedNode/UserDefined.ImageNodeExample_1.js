UserDefined.ImageNodeExample_1 = GraphLang.UserDefinedNode.extend({
NAME: "UserDefined.ImageNodeExample_1",

   init:function(attr, setter, getter)
   {
       this._super( $.extend({stroke:0, bgColor:null, width:70, height:61, flagAutoCreatePorts: false},attr), setter, getter);
       var port;
       // Port
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(105.71428571428572, 83.60655737704919));
       port.setConnectionDirection(2);
       port.setBackgroundColor("#37B1DE");
       port.setName("Port");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "undefined";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       // Port
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(8.571428571428571, 54.09836065573771));
       port.setConnectionDirection(2);
       port.setBackgroundColor("#37B1DE");
       port.setName("Port");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "undefined";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       // Port
       port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(58.57142857142857, 4.918032786885246));
       port.setConnectionDirection(2);
       port.setBackgroundColor("#EBF311");
       port.setName("Port");
       port.setMaxFanOut(20);

       if (!port.userData) port.userData = {}
       port.userData.datatype = "undefined";
       port.userData.allowMultipleConnections = undefined;
       port.userData.connectionMandatory = undefined;

       this.persistPorts=false;
   },

   createShapeElement : function()
   {
       var shape = this._super();
       this.originalWidth = 70;
       this.originalHeight= 61;
       return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

       // BoundingBox
       shape = this.canvas.paper.path("M0,0 L70,0 L70,61 L0,61");
       shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
       shape.data("name","BoundingBox");
       
       // Label
       shape = this.canvas.paper.image();
       shape.attr({"x":16,"y":24,"width":39,"height":37,"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAABPCAYAAAAjgM2qAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABqrSURBVHhe7d0HrC1V1QdwEhISkCIiAQMIhiIgIL2KgIDUoHTpvfemNBUUkN4RlN5Veu+9F6V3RKVJV1QQRdxffjtZ7xs2c+bMnHsfD3PvP9m5cGZmt7X2Wv+19p5546VRjGiMV/4wipGFTgrwxBNPpL/97W/pnXfeSS+88EJ5eRTjGE8//XT6xz/+keXzpz/9qbxci04K8MADD6Rjjz02/eIXv0jPPvvsmN//+9//pp///Odp++23T2+99dbHnvk08dprr6Udd9wx92Vc4PXXX//U23/00UfTtttum6699tr0yCOPpKOOOiqdeOKJ6fnnny9vrUUnBQBC1kgVd999d5pvvvnSeuutl/9utdVWaYsttkgHHXRQOuWUU7LCHHfccemII45Ihx9++JDKkUcemU444YR08skn53r33nvv3NYOO+yQ5p9//rTBBhuk2WefPX3ve99LJ510Ur63rGM4C2FrQ/tf+9rX0oYbbpjmmGOOtM8++6RjjjnmE/cPVyED9U899dRpyy23TLPOOmuWxW677ZbnqC06KcB1112XzjrrrDxomnf//fenO++8M2v+aqutlpZbbrks9OOPPz6ttNJKaYUVVkgbbbRROuSQQ9LFF1+cHn/88fTiiy/mwoI8+eST2a34va649tRTT6Xf//736eWXX05/+MMf0oMPPpjOPPPMtN9++6U11lgjffOb30ybbrppOu200/KkLL/88mnVVVdN3/nOd9Lqq6+eLrroovTHP/4xPffcc41tdSnqscLU+5vf/CatvPLKWfEOPPDAtOKKK6YFFlgg/78xDleb1aJOc7LzzjunRRZZJM8zBbzmmmvSr371q6yQ5GOubrnllmyhe6GTAhCGyt59993061//Ojd2zjnnpMceeyz95S9/yQKt4u9//3u666678mrdd9990w9+8IOsnczVq6+++rF7e0F72r3wwgvT/vvvn370ox9l4ft/Jq8cnD7oC9x6661pp512ykr50ksvfey+oYIAfvzjH+eJv+OOO8b8rq8WBKU37rEF80/h/vOf/+T599fYP/roo8zTLr/88qyc559/fnrooYfKx8egkwJUQbNuvPHGPMlXXXVVebkWr7zySn6OElAIwuEaPP/222/newyAhTBAk7jLLrvke7mSe++9NytVV1CWrbfeOh166KHpz3/+c3m5E1ghgt9kk02ydekFirnHHnukSy+9tLw0ZFx99dVp4403Th988EF5aQzuu+++dM899+QFeMUVV5SXx2BgBWBSTz/99FyeeeaZ8nIr/PWvf83C5zennXbatPnmm2fXMdtss2VrwYRRiOHAv/71r3TuuedmRaB0oXBt8eabb2YOg2+cd9556cMPPyxv+QRYys022yzdfvvt5aWBYbVzqwhvEygqt0g+ZNULAysAqLgaDbTBv//97+yfcAKmmTn/2c9+lv36b3/723TbbbelX/7yl9nc/+QnP8mTzrcZ0HDg/fffz+QRb9BOP4tCSXEak25CKVIXsGZrr732wIukCjzIym875+7jkprQSQEQEP71jTfeaC0QAkdamHQCZRYxd2RS9NAkAOb6+uuvz6Gn5zBcRI/VMBlDgXGwBBRBX/SzCoImcNcpAEUYFBQeUxefDwrx/brrrttoTYL/mLe2eZpOCkCbhCBYZlUAJuunP/1pWn/99XMygoLwj4cddljac889s89EiJj0JoH3g4HdfPPNWQlYCHUTjklhbmm8PuhLW+ircAqjVg+/esMNN2RyR/G6uArEkJC0X7oudauzyW83Ya+99spWswQCKtrhlozfnMsDtCW9nRQA5AGQqSoMTgxOy7/85S+nhRZaKE055ZRpqaWWyitXpwjN3wMOOCALj+lvW9yvcBlcgrr8N38u9p5++unT0ksvnWacccb8mzzAMsssk0mkvvZqz+/cz6mnnppX+njjjZf77q96/O560/MxJqZZ+3Ig8gDbbbfdGBenIL5LLLFEDtma6izrN4bvfve7OdzVVjxHyZQJJ5wwK688AF5ivsdaHoDpveCCC7IPlQMQelx22WU5+7fOOuukRRddNF1yySXZ1DFZzBGygv2PjWL1CnkUfRD2LLnkkjkJRABWowhAf5Tqs8JQ/UPu8A85BRNLmRHQNddcM5NGFsB97q8+rz5tCoPlHHbfffdMuCje4osvnrNzVmHcz2Kqh9C4QM+W4ymLtvVJdrGu/7vuumtWKMrPQmD7og7chtvBP0QCTeikAOFXTLjKhSP8MvChJnNcg1IEQxf/mmy5A/ylhFBJ/2XtsOsq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","stroke-scale":true,"opacity":1,"stroke-width":1,"transform":"t16,24s0.6094,0.5781,0,0"});
       shape.data("name","Label");
       
       // Line_shadow
       shape = this.canvas.paper.path('M49.5 45.5L70.5,45.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M49.5 45.5L70.5,45.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M21.5 30.5L0.5,30.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M21.5 30.5L0.5,30.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       
       // Line_shadow
       shape = this.canvas.paper.path('M40.5 21.5L39.5,0.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line_shadow");
       
       // Line
       shape = this.canvas.paper.path('M40.5 21.5L39.5,0.5');
       shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
       shape.data("name","Line");
       

       return this.canvas.paper.setFinish();
   },

   symbolPicture: "data:image/png;base64,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",

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
addPort: function(port, locator)
    {
        this._super(port, locator);
        return port;
    },
getPersistentAttributes: function()
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
setPersistentAttributes: function(memento)
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
jsonDocument: [],
});
