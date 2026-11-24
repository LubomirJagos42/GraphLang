// Generated Code for the GraphLang
// special thanks to Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
HwArduino.Serial.println = HwArduino.CommonParent.extend({

   NAME: "HwArduino.Serial.println",

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

        // Rectangle
        shape = this.canvas.paper.path('M28,17L72,17L72,41L28,41Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#303030","opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'Hi_');
        shape.attr({"x":50,"y":30,"text-anchor":"middle","text":"Hi_","font-size":12,"stroke":"none","fill":"#7CFC00","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Serial');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"Serial","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'println');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"println","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
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
    
    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAACICAYAAADtXaciAAAQAElEQVR4Aeyde3iM177HvxP3IlK0bhWRYycPepFyVB9l5xF072prR9wOqnXpTVtVtDjsnsMOut3+6T6eammf4tGqtDTqxHY/B4+Woh51CyKISw+KCNqQzHm/S94xE5mZN5n3fScz88tjzXrfd631W2t91nxnXWdEOeVPCAiBSksgCvInBIRApSUgAq20TSMFEwKACFTeBUKgEhMQgQavcSRnIeCXgAjULyKJIASCR0AEGjz2krMQ8EsgrAWalJQEceHPwO+7PIQjhLVAQ7hdpOjWEggZ6xEh0L1790Jc+DEIGZUFUNCIEGgAfCSpEAgqARFoUPFL5kLANwERqG8+EioEgkogDAUaVJ6SuRAwlYAI1FScYkwImEtABGouT7EmBEwlIAI1FacYEwLmEhCBmsszwq1J9c0mIAI1m6gBe/n5+Zg8eTJiY2NRq1Yt5eLj49UzhhkwUe4oPKjRoEEDjBw5stxpmYDpEhIScP78ed6Ks4mACNQm0Ho2P//8M9q3b4958+bh/vvvx4svvqhc3bp11bNOnTrh2LFjenTxI5yACNTGN8Dt27cxa9YsnD17Fl988QX27duHjz76SLmffvoJH3/8MU6ePIkJEybg5s2bppaMXxq4dOkSFi5caKpdMWYtARGotXw9rF+8eBHff/89OnfujO7du3uEORwO9O3bFykpKdiyZQsOHz7sES43kUnAuEAjk48lteY8s7Cw8B7bnI8+9dRTuHXrFi5fvuwRfubMGYwaNQrR0dFqztqkSRNMmTIF169f94jHuWLPnj2RkZGB5s2bq7ivvfYaduzYgdJzUKfTiW3btqkPBd0uy8Ah+KpVq8BwD+NyYzsBEaiNyBs2bAjOMTm0ff7557Fu3Tr89ttvHiV47733QAF369bN9XzPnj144oknsHTpUrz88stYvHgxnnnmGcydOxf9+vXD1atXXXF5sXPnTrz11lsYPnw45syZAwq2Zs2aDPJwn332GXr06AH27LNnz8ayZcswduxY5OXlYfDgwdi0aRPkL7gERKA28q9atSrS09PRpk0b7N69G71791YLRW3btlUruBzWFhUVeZSIc9Hp06erOenGjRtdoly0aBGWLFmihsMffvihR5rff/8d77//PqZOnYo33ngDffr08QjnDT8E1qxZo8qyfv16vPrqq0hNTQXz+uqrrxAVFaV6YcYVFzwCIlCb2XNrhcNKLtZw24LZ5+TkqBVcLuQ8+uij2Lp1Kx8rR9Fu0eakaWlp6NChg3qmv3AeyzRZWVm4cuWK/lgNazt27Oi6L+uCQ9qvv/5afVA8+OCDHlESExPBITSH2h4BcmM7ARGo7cihBMQhJIe6Fy5cAHsyzh1jYmJAsfbv31+t8LJoXPG9ceMGOGflvHDlypXQHXs+9ricn7rPWSm++vXrM7lfx3kmy7BhwwYsWLAAQ4YMAcV9+vRpv2klgvUERKDWM/aZQ506dcD5JoepFOdLL72kekPOM5mQPSj95cuXY9CgQR5u6NChSsjXrl1TaRiPrnr16upDgNe+3NGjR9GlSxd1YOK5557DmDFjsGvXLjz77LOI0T4sfKWVMHsIRNmTjeRCAjycQEF6W3zhCioXiRo1aoT9+/ejoKAArVq1YlJQwJyPluW4v8mhropo8IW95sCBA9VPwXAh6dSpU7ih9dRHjhzBu+++ixo1ahi0JNGsJCACtZJuKdvc9uCQdPXq1V63MCgSLvI0bdoUtWvXxgMPPAAuLnFllsNRd5Ocd3bt2lVtk1Ck7mH+rvkBcOjQIbUKzO0b5uNwOFSyc+fOobz2VEJ5MZ2ACNR0pN4NJicnq1VTnhj6/PPPQbG6x+bKKrc7uG3CFVWHwwEuGj355JPggg4POejxKVaeRuKQlHGMzjn19Nx2qVKliuo1ecJJf859VfaofMZr+npYRPpBrrQI1MYGYC/1ySefqK2V119/HRzKckGIWyHc13zooYfAuebo0aPVPieLxiHxjBkzwHnl008/jXHjxmHFihXq0Dv3LDkEfuedd+Bw3On9mMaIo6gpfPbmI0aMUDZ5DJFDZfaujRs3Vr1o6X1aI7YljnkERKDmsTRk6fHHH8fBgwfVfiMFSoF8+umn6kQPe1iuzM6cORPVqlVz2eP2yo8//qhWWClwLg5RpMOGDQNXX7l144ps8ILC5z4qt2/YO9MmzwWP0RaKeDCCByqOHz+uDjEYNCnRLCAgArUAqj+T3AZh73fgwAF1AIELPxzeZmZmgkf9HI57e8NmzZph/vz56pSRHp/3FLl7ftxfzc7OBntA9+fsGTmvZLj+nGl5OolDWdrkKjLno/xmDYfPFGhcXJyKznRl2VWB8mIZARGoZWjFsBAInEBECzRwfGJBCFhLQARqLV+xLgQCIiACDQifJBYC1hLwKVAu+VubvVgXAkLAFwGfAuWeG7/hL0L1hVDCKkJA0hgj4FOgNMGzmSJUkhAnBOwn4FegLFLN+EREolC5dyguCVYz4HtMXNkEDAk0/vO1aDpxFmq0TIhIoZaNTp4KAesJGBIoiopR709p+JfPstBkwt9FqNa3i+QgBBQBQwItvl0M5+0iFGt+vR6paPnJGjQZPxM14v5QVo+qDMuLEBACgRMwJFCn1oM6i5xgT0rfqd1H9+iDlgu+Q+OxM0SogbeDWBACZRIwJlCt53SW9KD0nW730Sl/QYv/ykSjMemo3kJ61DIpy0MhUEECxgRarA1x2YOW+M4SHyU+76O7pSLuH6vQaDSF2so19OW3IVq3bm35SmBZK40VZCLJhEClIWBMoFrvyZ6zWPPpeE3Hazpe06lrTbTQRsOVpoaRVRCpbZgRMCZQrfdkL+nUfPde0/0+f8NKnBrdB//3j/dReOoY+Nuq/OXz3Nxc8Ldv+N/f2e3CrK2kOhFIwJhAtZ7T6TbvZG+p31/VhHn6HU2Y8/8DhafvCpO/gj5gwIAIRCpVFgLmEYgyYoo9pVNbuXWyBy3x8zetQt74frj40VRNmMddPaYI0whRiSMEjBEwJlCtBy0u6UHzN3+LvAn9cfHjaSjME2EawyyxIoCAJVU0JlBt4afgfzJx5t8H4tLCv+GWCNOSxhCjQqA0AUMCPTtlEC59mo5bZ3JkKFuaoNwLAQsJGBKoCNPCFhDTQsAHAb8C1bdLZPHHB0UJEgIWEfApUO5jijBJXpwQCA4BnwKVfczgNIrkKgR0Aj4FqkcS3x4CXZcdwbM//qQcr73lyjBv8f513gmVnuEpqw+ibvxv3szI8xAgIAINgUaSIkYuARFo5LZ9iNQ8sospAg2z9t81tiW+69BOuY3PtcG1nJphVsPIqo4INMzaW+ag4dWgItDwak+pTZgREIGGWYNKdcKLQHAFGl4sTa1NdMJN13YJt0zcHcNMzUyMVVoCItBK2zRSMCEAiEDlXSAEKjEBEWglbZz87Fpqq0TfMnH3GVZJiy3FMpmACNRkoCFjTgoaEgREoCHRTFLISCUgAo3Ulpd6hwQBEWhINJMUMlIJiEAjteWl3sEjUI6cRaDlgCVRhYDdBESgdhP3kd//Dkp0ba3w2ltUhunbLrx2jyffZnGnEfrXItDQb0OpQRgTEIGGceOyag88eQ1/2rLf67le9zO+7tdMw7S0IS54BESgJrMXc0LATAIiUDNpii0hYDIBEajJQCubuQs76mJt8iOuxSd9ccmfzzRMW9nqE2nlEYFGWotLfUOKgAg0pJpLCuuLgF1hEydOxIkTJ2zJTgRqC2bJJJwILF26FF26dMGkSZMsF6oINJzeOVIXWwksWbLEcqH6FOjy5cttrbBkJgRCkYCVQvUp0HHjxiElJQUi1FB820iZ7SZghVB9CpQVPHLkCCqBUFkUcUIgJAiYKVS/AiWRxMRoiFBJQpwQME7ADKEaEuj6rO6Y8/f2SEwQoRpvHokpBO4QCESoUXdM+HktdqJ/WizW/3cK5nyQFDFC3bt3L8RZz8DPuy9sgisiVEMCLS4qwh1XjL6pzfHP1cmYNaMdEv4gPWrYvHu8V0RCTCZQHqEaEii0HvSOK8Yd34n+mlDXZf4Rs6ZTqHVljmpyI4q50COwOasbBg9oYbjgRoRqSKDOomIoV1ziu933690M/1zZFbP+9igSWolQDbeORAw7AnGxtZD+14exaU0yBvePNVw/X0I1JFA4na6eU/WgZdz36/2QJtQumDXNU6hxcXFo3bo1kpKSbHeGCUnEkCZg93vLK6ySkWbL2PuQPkUT6nd/xOB+gQnVkECLtR7TqHNqvSygCdprLSRACIQngdIaoRac7MwqXl2D/3kSPxmYEX3dlbrPWJWHP6dtw4T//BnZxwqQmJiIuXPnIjc3F4cOHQrKamgAXCRpCBGwe6XdK5oSbeTmXsdfpx9AyvNbsSzjtNfopQNeeOEFbN26FTNnzkTLli1VsKEeVM0/tV5U+VoPqfyS+xXfasLstx0TpmrCPH5XmBs3bsSAAQNUJvIiBCKBwIkTBZhCYf4lcGHqvAwJVM07Sz4doAkU2nXGt2fwzIAdmDjtALJFmDpP8SOYQPe07fjimzzDBMrqMUsnNiTQYrd90BWZZ/Dnf9OEmX4Q2TnSY5YGKvdCwB8BI8LUbRgSKHvMr1efQ68hP2DS9MM4mnPdNceUoayOsry+sficx9eqVQt0PXv2REFBgbGEBmLdvHkT8+bNw6ZNmzxir1mzRuXHPBMSEnD+/HmPcLmpGIHyCFPPwZBAe72wC5NmijB1aKHuc2Vxy5Yt6NChAyZPngwKFfJnGYGKCFMvjCGBHj0hPaYOLBz8X375Ba+88gpycnLCoTqVtg6BCFOvlF+B6tslMpTVkdnr87u47OHo1q1bhzp16thbAMmt3ATMEKaeqU+Bcv4jwtRRle2TEedqdLzmnm9qaipq166t5nHx8fGYP3/+PcNI7t01aNBAxeE8b/fu3ejevbu6j46OVl+Sv379utpLpm069zko54VMx+e0s2fPHmzbtg3dunVz5c0PVx4ju3XrlqvwI0eOVHtsp0/f3Z/r27evypdhroheLlhH5knH+Pn5+WqYHBsbq2yw7IMGDarkvbOXygX42Exh6kXxKVDZx9QxGfO3b9+uBLJ27VoUcztKS3bu3DkltoEDB+Lq1avak3v/Xbp0CUOHDgXTM5SCunDhAmrUqMFbv66wsBBjx45Fjx49sGPHDlfep06dUkNZ9sK3b9/2a6e8EX744Qe0b99eLTSxvEzPsq9cuRKdO3fGvn37+CjsnRXC1KH5FKgeSXxjBLKysnDlypUyI3N4mp6eDi7QlI5w48YNjx6HvdPw4cNRtWrV0lHLvKf4KJYyA7WHGRkZOHbsmHZl7j/azMvLK9MoOSxevLjMsHB5aKUwdUYiUJ2EST57Dg5zKbqdO3fisccec1n+5ptvcPLkSde9+0VMTAwyMzPBdL/++iuSk5Pdg/1eR0VFYdq0abh48aJyo0aNcqW5fPkyjh8/ru4XLlyok5GoBwAAA1NJREFUfsu1efPm6p4vFDDnuAzjfXkc68d6cvtn8+bNaNy4sSv5/v37Td0WchkO8sWQIUPuOZJnVZFEoCaS5ZtzwYIF4Dd4HA4HHnnkESxatAgxMTEql7Nnz+LAgQPquvQLh8CcgzocjtJBhu65Kjt+/Hg1/+T8980330SjRo0Mpa1oJNaL9WM9q1Spgk6dOqmhekXthUq6Dz74QM3j7Shv+AnUDmpe8mjXrh2aNWvmEcrFkzZt2rieHT582HXtfsEe0+GomDhpp23btnA47qbnMLl69eoMssw1adLEo8dkRlwkoi/OHAIiUHM4KitcTa1Zs6a61l8cDgfYu8DPn9H5pjczFIu3MKueN2zY0PBCllVlCHe7IlATW5hDWG6NuJvkolBRUZH7o3uu77vvPjRt2vSe5/JACIhATXwPcG8zNzfXwyK3Og4ePOh69vDDD7uu5UII+CMgAvVHqBzh3FoYMWIEuHrJnpNiffvtt11bL+wleXigHCZticpVY/by165dCyw/SW06ARGoyUi5Od+xY0dw2MrfYtIPHzAbHkZo0aIFL4PquCXjPuflCjCPEKalpYXltkhQYQeYuQg0QIDuybm32KpVK/dHrmse0xszZozHSqsr0OaL+vXrq2+y2JytZFcBAiLQCkDzliQuLg4bNmxQR/u4zcF4XF3l+dUvv/wS9erV46OgO/aes2fPxrBhw1CtWjVVHu6dcj/T4bi7VaMC5CWoBESgJuPnG51H+jiv4+kcfqWLp3p0werZ8acieQaXcejzXg9z93mOlnHoeFyQQ1GG81BEdna2OoTPsF69evGxy/kL5yEGHuLnYXem5wkkfpCw/LTFZ3TMg7Z0w97KYzRcjye+MQKGBWrMnMQSAkLATAIiUDNpii0hYDIBEajJQMWcEDCTgAjUTJpiSwiYTEAEGiBQf4smAZpXyeUlcgmIQCO37aXmIUBABBoCjSRFjFwCItDIbXupeQgQiAiB8hCAuCTb/39Wq5nboa9g5xERAg02ZMlfCFSUQFgLlN/PFLc3KP83q53cK/rmD4V0YS3QUGgAKaMQ8EVABOqLjoQJgSATiGSBBhm9ZC8E/BMQgfpnJDGEQNAIiECDhl4yFgL+CYhA/TOSGEIgaAT+HwAA//9kq+QUAAAABklEQVQDAERl3GH7MHYSAAAAAElFTkSuQmCC",
    
    jsonDocument: [],

translateToCppCode: function(){
      cCode = "";
      var in1 = this.getInputPort("in1"); if (in1.getConnections().getSize() > 0) in1 = in1.getConnections().get(0).getVariableName(); else in1 = "/*in1 default value*/";
      cCode += "Serial.println(" + in1 + ");\n";
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
        var in1 = inputWireName(this, "in1", "\"\"");
        var pythonCode = "print(" + in1 + ")\n";
        //error cluster pass through
        var errIn = inputWireName(this, "errorIn", "None");
        var errOutPort = this.getOutputPort("errorOut");
        if (errOutPort) errOutPort.getConnections().each(function(connIndex, connObj){
            pythonCode += connObj.getVariableName() + " = " + errIn + "\n";
        });
        return pythonCode;
    },

});
