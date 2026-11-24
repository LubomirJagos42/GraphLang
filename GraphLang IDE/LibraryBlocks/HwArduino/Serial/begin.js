// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwArduino.Serial.begin = HwArduino.CommonParent.extend({

   NAME: "HwArduino.Serial.begin",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;
     // in1
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("in1");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "string";

     // errorIn
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3D957");
     port.setName("errorIn");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

     // errorOut
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 73.333333));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#F3D957");
     port.setName("errorOut");
     port.setMaxFanOut(20);

     if (!port.userData) port.userData = {}
     port.userData.datatype = "errorDatatype";

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 100;
      this.originalHeight= 60;
      return shape;
   },

   createSet: function(){
        this.canvas.paper.setStart();
        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L100,0 L100,60 L0,60");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Line
        shape = this.canvas.paper.path('M0,20L20,20');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M0,44L20,44');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M80,44L100,44');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":1,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M20,0L80,0L80,60L20,60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M27,29L38,29');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M38,23L47,23L47,35L38,35Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#303030","opacity":1});
        shape.data("name","Rectangle");

        // Line
        shape = this.canvas.paper.path('M47,26L52,26');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Line
        shape = this.canvas.paper.path('M47,32L52,32');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#303030","stroke-width":2,"opacity":1});
        shape.data("name","Line");

        // Rectangle
        shape = this.canvas.paper.path('M55,19L72,19L72,39L55,39Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","opacity":1});
        shape.data("name","Rectangle");

        // Rectangle
        shape = this.canvas.paper.path('M59,25L67,25L67,33L59,33Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#303030","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'Serial');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Serial","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'begin');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"begin","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

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
        var symbolWidth = this.getWidth(), symbolHeight = this.getHeight();  //size from init(), older schematics stored different sizes which would stretch current shape
        this._super(memento);
        this.setDimension(symbolWidth, symbolHeight);

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
    
    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAACICAYAAADtXaciAAAQAElEQVR4AexdC5yN1fp+9rgljHG/RUPM/FDKpSR05FbCuDVUJCoVIrdc/jn+h+OSia4nqUjip5+QezouwwkpJOV+n5hBB7lTmNnne5b5dntve/b+Zu/97evrZ33fty7vu9Z61n72u9a71v4mxir/BAFBIGQRiIH8EwQEgZBFQAgaskMjDRMEACGofAoEgRBGQAgavMGRmgUBjwgIQT1CJAUEgeAhIAQNHvZSsyDgEYGIJmjt2rUhIfIx8PgpD+MCEU3QMB4Xabq5CISN9qgg6E8//QQJkYdB2LDMh4ZGBUF9wEdEBYGgIiAEDSr8Urkg4B4BIah7fCRXEAgqAhFI0KDiKZULAn5FQAjqVzhFmSDgXwSEoP7FU7QJAn5FQAjqVzhFmSDgXwSEoP7FM8q1Sff9jYAQ1N+IGtB34cIFvP7666hUqRIKFiyoQpUqVVQa8wyoyHURHtQoUaIEXnjhhVzLUoByCQkJOHnyJKMSAoSAEDRAQOvV7Ny5E3Xr1sVbb72FYsWK4dlnn1WhSJEiKu3BBx/EwYMH9eJyj3IEhKAB/ADcuHEDKSkpOH78OL744gv8/PPPmDp1qgrbt2/Hxx9/jF9//RXDhg3D1atX/doy/mjgzJkzmDZtml/1ijJzERCCmouvg/bTp0/j+++/R8OGDdG8eXOHPIvFgieeeALNmjXDunXrsHfvXod8iUQnAsYJGp34mNJrrjOvXbt2i26uRxs1aoTr16/j7NmzDvkZGRno06cPYmNj1Zq1XLlyGDlyJC5fvuxQjmvFli1bYv78+ahYsaIq+/LLL2PTpk1wXoNarVZs2LBBfSnoetkGTsEXLVoE5jsol0jAERCCBhDykiVLgmtMTm2TkpKwcuVK/PHHHw4tGDp0KEjgpk2b2tK3bduG+vXrY/bs2ejVqxc+//xzPP7445g8eTKSk5Nx/vx5W1k+bN68Gf369cNzzz2HSZMmgYS97bbbmOUQZsyYgRYtWoCW/c0338ScOXMwaNAgpKeno2vXrkhNTYX8Cy4CQtAA4p83b16MHTsWNWrUwI8//oh27dopR1HNmjWVB5fT2szMTIcWcS06btw4tSZds2aNjZTTp0/HrFmz1HT4/fffd5D5888/MWrUKIwePRp9+/ZFx44dHfIZ4ZfA8uXLVVtWrVqFl156CR06dADr+vLLLxETE6OsMMtKCB4CQtAAY8+tFU4r6azhtgWrP3z4sPLg0pFTq1YtrF+/nskqkLTrtDVpp06dUK9ePZWmX7iOpcyKFStw7tw5PVlNax944AFb3NUDp7QLFixQXxSlS5d2KJKYmAhOoTnVdsiQSMAREIIGHHIoAnEKyanuqVOnQEvGtWNcXBxI1s6dOysPL5tGj++VK1fANSvXhQsXLoQeaPlocbk+tV+zknzFixenuMfAdSbbsHr1anz00Ufo1q0bSO5jx455lJUC5iMgBDUfY7c1FC5cGFxvcppKcvbo0UNZQ64zKUgLyvvcuXPx9NNPO4Tu3bsrIl+8eFHJsBxD/vz51ZcAn92FAwcOoHHjxurARNu2bTFgwABs2bIFbdq0QZz2ZeFOVvICg0BMYKqRWogADyeQkDk5X+hBpZOoTJky2LFjBy5duoSqVatSFCQw16OuAvc3OdVVBQ1eaDWffPJJ9SoYOpKOHj2KK5ql3rdvH1577TUUKFDAoCYpZiYCQlAz0XXSzW0PTkmXLl2a4xYGSUInT/ny5VGoUCGUKlUKdC7RM8vpqL1KrjsffvhhtU1CktrneXrmF8CePXuUF5jbN6zHYrEosRMnTiC3+pSgXPyOgBDU75DmrLBJkybKa8oTQzNnzgTJal+anlVud3DbhB5Vi8UCOo0aNGgAOnR4yEEvT7LyNBKnpCxjdM2py3PbJU+ePMpq8oSTns59VVpUpvGZdz0vKu9B7rQQNIADQCv1ySefqK2V3r17g1NZOoS4FcJ9zTvuuANca/bv31/tc7JpnBKPHz8eXFc++uijGDx4MObNm6cOvXPPklPggQMHwmK5af0oYySQ1CQ+rfnzzz+vdPIYIqfKtK5ly5ZVVtR5n9aIbinjPwSEoP7D0pCmOnXqYPfu3Wq/kQQlQT799FN1oocWlp7ZCRMmIF++fDZ93F7ZunWr8rCS4HQOkaQ9e/YEva/curEVNvhA4nMflds3tM7UyXPBAzRHEQ9G8EDFoUOH1CEGgyqlmAkICEFNANWTSm6D0Prt2rVLHUCg44fT2yVLloBH/SyWW61hhQoVMGXKFHXKSC/POEluXx/3V/fv3w9aQPt0WkauK5mvp1OWp5M4laVOepG5HuUvazh9JkHj4+NVccq50qsy5WIaAkJQ06AVxYKA7whENUF9h080CALmIiAENRdf0S4I+ISAENQn+ERYEDAXAbcEpcvf3OpFuyAgCLhDwC1BuefGX/gLUd1BKHneICAyxhBwS1Cq4NlMISqRkCAIBB4BjwRlk26rkgghKpGQIAgEFgFDBK0y8xuUH56CApUThKiBHR+pLcoRMERQZGah6GOdcNeMFSg3bKIQNco/NNL9wCFgiKBZN7JgvZGJLO1etEUHVP5kOcoNmYAC8dVcWdTAtV5qEgQiHAFDBLVqFtSaaQUtKe9WLR7boiMqf7QMZQeNF6KG2YeE53JDKYQZfAFtrjGCapbTmm1BebfaxWObtcedHyxBmQFjkf9OsagBHT2pLOIRMEbQLG2KSwuafbdm35F9Zzy2aQfE/2sRyvQnUavapr78NUT16tURjG/siB89HzvIP6gUzOBj86NC3BhBNetJy5ml3Rn4zMBnBj4zqGeNtNBmw1GBXuh1UloUYQgYI6hmPWklrdrd3mraxy+sXoij/Tviv/8ahWtHD4LvVuWbz9PS0sB33wTjmzrCxkq6E4UIGCOoZjmtdutOWks9fl4j5rGBGjGn/D+uHfuLmHwLepcuXaIQUumyIOA/BGKMqKKltGqeWystaPb9QuoipA9JxumpozViHrJZTCGmEUSljCBgDAFjBNUsaFa2Bb2wdjHSh3XG6Y/H4Fq6ENMYzFIqChAwpYvGCKo5fi79Zwky/u9JnJn2T1wXYno1GP72ZHvVCBEKKwQMEfT4yKdx5tOxuJ5xWKayYTW80thwR8AQQYWY4T7M0v5wRcAjQfXtEnH+hOsQS7vDGQG3BOU+phCTwxtdwV9r5ehCzZzeuiWo7GOaA7q/tBohEv+0IV+I7a86RU9gEXBL0MA2RWozAwH+Yd933nnHDNWiMwAICEEDALJUIQh4i4AQ1FvkwkSuWLFi6i9nh0lzXTQzupOEoGE8/kZ+gJCamoqkpKQw7mV0N10IGt3jL70PcQSEoE4DRI8nPZ9GPKS5LeNUlUQFAY8ICEGdIKLHk55Pp2SJCgJBQSC4BA1Kl6VSQSB8EBCCOo3VgAEDQM+nU7JEBYGgICAEdYKdHk96Po14SHNbxqkqiQoCHhEQgnqESAoIAsFDQAgaPOx9rtmIF5keaXqmb6lMEsICASFoWAyT942kR5qeae81iGQwERCCBhN9qVsQ8ICAENQDQOGeTY80PdPh3o9obb8QNIxH3ogXmR5peqbDuJuR1/Rc9EgImguwoqWoEeIbKRMteJnZTyGomeiKbkHARwSEoD4CKOKCgJkICEHNRFd0CwI+IiAE9RFAZ3F3cSPrttyUcVeX5EUGAkLQyBhH6UWEIiAEjdCBlW5FBgJC0MgYR+lFhCIgBI3QgY3GbgWqz8OHD8eRI0cCUp0QNCAwSyWRhMDs2bPRuHFjjBgxwnSiCkEj6ZOTy74Y+bmamWVy2dyQKz5r1izTieqWoHPnzg05UKRBgkCoIWAmUd0SdPDgwWjWrBmEqKH2kfCtPbnZaw1EWd96EzrSZhDVLUHZ9X379iEEiMqmSBAEwgIBfxLVI0GJSGJiLISoREKCIGAcAX8Q1RBBV61ojkkT6yIxQYhqfHikpCBwEwFfiBpzU4WHa5YVnTtVwqqvm2HSG7WFqB7gkmxBwBUC3hDVEEGzMjNxM2ThiQ4V8e+lTZAy/j4kVBOL6mogIixNuuNnBHJDVEMEhWZBb4Ys3Lxb0Vkj6solf0PKOBK1iKxR/TyIoi78EFi7oim6drnTcMONENUQQa2ZWVAhK/tuF09uVwH/XvgwUv5ZCwlVhaiGR0cKRhwC8ZUKYuzf70bq8ibo2rmS4f65I6ohgsJqtVlOZUFdxJPb3aERtTFSxjgSNT4+HtWrV4eZJ1Jy0m0YISkY1gjkNP5mpecIVvZMs3Kl2zF2pEbUZX9D12TfiGqIoFmaxTQarJqVBTRC59gLyRAEIhMBZ46QC1YaM++7C0MEzclqqvTsb435i9LRqtMGDPvHTuw/eAmJiYmYPHky0tLSsGfPHgTiRIpzHT7gIqJhhIDzuJsdzxGabC6kpV3G38ftQrOk9Zgz/1iOxZ0znnnmGaxfvx4TJkxA5cqVVbYhgqr1p2ZF1V2zkOqeHZ+3WCNm8kYMG60R89BfxFyzZg26dOmiKpGLIBANCBw5cgkjScz2vhNTx8sQQe0tJTSCQvummL84A4932YThY3ZhvxBTx1PuUYxA804b8cVX6YYRcGUxnYUNETTLbh903pIMtHpKI+bY3dh/WCymM6ASFwQ8IWCEmLoOQwSlxVyw9ARad/sBI8btxYHDl21rTJnK6lD+defau2DBgmBo2bIlLl269Fem7Sk0HsKpraGBmPetyA0x9VoMEbT1M1swYoIQUwdN7oJAbhDwhpi6fkMEPXBELKYOmNwFAaMI+EJMvQ6PBNW3S2Qqq0MWWXf+1vfq1atgWLlyJQoXLhxZHQxCb/xBTL3ZbgnK9YkQU4fK+/vly5cxcuRIlCtXTq1LS5YsiYEDB+LMmTMulXJze8OGDWjatCkKFSpkk+HAc0/ZpZCWyLwOHTrYZOrWrYt169bh+PHjSEhIUHpKlCih9qS14uo/x5hrZQb79fLJkycdZLZt2wbnNvHLm8fUrl+/rnSFz8WclnJ8nPcxfa3JLUFlH9NXeIGMjAy0bdtWHdo4d+6cUkjCTp06Vb1wau/evSpNv/DDPm7cOLRo0QKbNm1CFre1tEzKzJ8/H/Xq1cOHH34IklhLtv1fvHgx6tevj2+++cYms3v3brRu3RpfffWVrZw3D9euXcOgQYNuadPRo0fx4osvqjdu3LhxwxvVESFjBjF1YNwSVC8kd+8ROHz4MHbs2OFSAd+tOmTIEAcvL4k2fvx4l+WZSMJSJjU1lVEVSMS+ffuC5FYJdheWHzp0KI4dM36ixU5cPZJ8P/zwg3p2deEXx8GDB11lRXSamcTUgROC6kiYeL/33nuxefNmXLlyRR17bNOmja02Eo15TDh//jzee+89m3XkDIYWmOtDTl8bNmzIYspCzpw5EyQOE2gh9elyTEwMxowZg9OnT+PChQvK2ubNm5fFfAr2eqm7T58+Nn1nz57FoUOHbPFIf+jWrdstR/LM6rMQ1Cxks/XGuAV2FwAABKdJREFUxcVh+vTpuOeee2CxWMBf93zwwQdqH5lFOFXdunUrH0ErtHPnTvVcvnx5cKpbvHhxFafcxIkT1TqSCZT5/fffwanvd999xyQVunfvrta3XLvmy5cPPXr0AC2oyvThwqksLTf1MrzyyisoU6aMDxrDV/SNN96wnZU1uxeRR1CzEcul/ho1aqBSJcefHJUqVQr33XefTdP+/fvVMx0ztJaM0LFTtWpVRUg6cBgaNWqkvK3M/+2339T6lgRNS0tjkgqPPfYYnC1mq1atlB5VwMtLzZo11ReMLs725M+fX4/K3SQEhKAmAaurzZMnj8MHm+kWi+UWEjHdm8A1pj7VpbwzOZnG6anFYuGj14EeaK+FRdBrBISgXkNnTJAWzp5AlOK01jmN6faBP3JPT09XFpNW1TlwzckfJJN89qS8ePGivRr1TBKzThWRS1ghIAQ1ebi4pty1a5dDLadOncL27dttabVq1VLPxYoVs1lWOl2ct2BUIacL14Px8fG21K+//trmPGIiibls2TJFdMYlhBcCQlCTx4t7iHTU8MBHZmYmSM7+/furl6yxaq7juH/JZ278V6tWjY+gXK9evfDLL78ory4dQtTDtR9DUlKSIh0J+tBDDykZXhYsWIC3335bOY+47TJjxgykpKQwy/wgNfgdgRi/axSFtyDAqSq3VniMjg4j7nXqhZhep04dFeUpn969e6tnXrhPSvLefvvtqFChgu1v5HBa++qrr9ocP0899RTKli1LEbUFM2rUKPC0UmxsLLg/yimuypRL2CEgBDV5yPjqChLPVTX08PL1FtwO0fNpJWk59birOw8y8BignnfXXXcpq0ni6mn6nbp5rJAk19PkHj4ICEFNHitOP3kKp2fPnuqMLKuLi4tTR+fWrl17yxYMCfXuu+9i1apVoCzjlCH5GjRooNI5RbZYHL2y7du3B/dGuRXDspThwQbWnZyczKgK9CozqIhcQh4BIagJQ2T/C5Fp06ap6emUKVPU6R56Y0+cOKEOIXAK6qp6i8UCEo3rVp4Gogy9wTx1xHSLxZGcug56fklslqXM6tWr1StPedKHcZbjl0Pp0qX5qIJ9W+1/zcIpM/dnKcfAM71KIPviKT+7mNx8RMAwQX2sR8RNRMD+Fyl0IPHLgA4pVslDDJwS05vLeMWKFW2WnHEJoY2AEDS0x8dQ6+h4si9Iq0iHFMlKq7px40Zb9iOPPIIiRYrY4vIQ2ggIQUN7fAy1jkf5Onbs6LEsydmvXz+P5aRA6CAgBA2dsfC6JbSWn332GebMmYP777/fYQpLh9Hdd98NroW5R1q0aFGv6xHBwCMgBA085rmu0YgAvb18m8K3335rc0bRuUOH0ZYtW9C1a1fbvqkRfVImNBAQgobGOEgrBAGXCAhBXcIiiYJAaCAgBA2NcZBWCAIuEYgKgvJnWRJqB+VvtJqJu8tPtJ8Tg60uKggabJClfkHAWwQimqBm/51I0f+TesdusHHw9sMfDnIRTdBwGABpoyDgDgEhqDt0JE8QCDIC0UzQIEMv1QsCnhEQgnrGSEoIAkFDQAgaNOilYkHAMwJCUM8YSQlBIGgI/A8AAP//LRcuPAAAAAZJREFUAwAfpthwegkzXgAAAABJRU5ErkJggg==",
    
    jsonDocument: [],

translateToCppCode: function(){
      cCode = "";
      var in1 = this.getInputPort("in1"); if (in1.getConnections().getSize() > 0) in1 = in1.getConnections().get(0).getVariableName(); else in1 = "/*in1 default value*/";
      cCode += "Serial.begin(" + in1 + ");\n";
      return cCode;
    },

    /**
     * @description Python translation of this node, assigns result to every connected output wire.
     */
    translateToPythonCode: function(funcParams){
        var inputWireName = function(node, portName, defaultValue){
            var port = node.getInputPort(portName);
            return (port && port.getConnections().getSize() > 0) ? port.getConnections().first().getVariableName() : defaultValue;
        };
        var in1 = inputWireName(this, "in1", "9600");
        //desktop python has no arduino serial port, Serial.begin() only marks the place, println() goes to stdout
        var pythonCode = "# Serial.begin(" + in1 + ") - on desktop python output goes to stdout\n";
        //error cluster pass through
        var errIn = inputWireName(this, "errorIn", "None");
        var errOutPort = this.getOutputPort("errorOut");
        if (errOutPort) errOutPort.getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = " + errIn + "\n";
        });
        return pythonCode;
    },

});
