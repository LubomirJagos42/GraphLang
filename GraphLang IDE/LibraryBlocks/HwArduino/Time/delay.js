HwArduino.Time.delay = GraphLang.UserDefinedNode.extend({
    NAME: "HwArduino.Time.delay",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:68, height:50, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // delay_ms
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(6.237807058823485, 31.77338880000036));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("delay_ms");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "uint";
        port.userData.allowMultipleConnections = false;
        port.userData.connectionMandatory = true;

        // error_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(6.237807058823485, 88.81592320000038));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("error_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = true;
        port.userData.connectionMandatory = false;

        // error_out
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(105.54412235294105, 88.81592320000038));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("error_out");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = false;
        port.userData.connectionMandatory = false;

        this.persistPorts=false;
    },

    createShapeElement : function(){
        var shape = this._super();
        this.originalWidth = 68;
        this.originalHeight= 50;
        return shape;
    },

    createSet: function(){
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L68,0 L68,50 L0,50");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // undefined
        shape = this.canvas.paper.image();
        shape.attr({"x":9.01436799999965,"y":0,"width":50,"height":50,"src":"data:image/png;base64,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","stroke-scale":true,"opacity":1,"transform":"t9.01436799999965,0"});
        shape.data("name","undefined");

        // Line_shadow
        shape = this.canvas.paper.path('M59.5 41.5L68.5,41.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M59.5 41.5L68.5,41.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        // Line_shadow
        shape = this.canvas.paper.path('M13.5 41.5L1.5,41.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M13.5 41.5L1.5,41.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        // Line_shadow
        shape = this.canvas.paper.path('M12.5 14.5L0.5,14.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line_shadow");

        // Line
        shape = this.canvas.paper.path('M12.5 14.5L0.5,14.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");


        return this.canvas.paper.setFinish();
    },

    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABGCAYAAABISVPfAAAQAElEQVR4AexbB3BUR5r++k2SNBoFgiSCIiABazAgsEEkGRENGGFjmxzu7PLeVfmuCq/Lt3cuI/bsrd0tm62zr3xrm+RAECBhoskZgxHCpMUIhAQSKCekGUmjmXnv/v/JyqNkGEvHSfW+ea+7/05f9/v777+fJHT9uZSBLoJdSi/QRXAXwS5mwMXFd83gLoJdzICLi++awV0Eu5gBFxffNYP/rxCsKIqJEPcE4K3HyfnjnMFe1LBVTwBWUh8e2/U4CX5sjXrUgjpT/i6CXTwaXQR3EexiBlxcfNcM7iLYxQy4uPhffQaTnYyysjIcPnwYhw4dahf27NmDnd/uxM6dbcOuXbtw+vRplJaWupjG5ovvEIJzcnKwZcsWxMfHtxlbt27Fho0b8cXatW3G2nXrkEgDkp2T3TwDLk75JQSLvn37unfr1o03Fu3OzzO4oqICeXl5KCoqQnFxsXovLCxEa8jPz1Pz5fG9BeQX5IORl5eLgvx8cH0u5rHZ4ttMUGRkpC4oKCgyMDT0n4VG8x8e3Xr8vk+fwN8HBobE+vv7+zVbQ6MEIQR8fHxA5SEkJAQ6nQ7e3t4YPnx4q3j22WcRNWZMsxgzejSGDhkCg14PrVaLkSNHYfiw4fD18W3Uil8vKNWrSlCnvQk96sWpj/379zfkFZbMFN0C/s1jzKxVppkr3vGavvQt07SFqwxDx8RRZ9557733+qvCrfxIkgQ/Pz+8+uqriIqKgoeHB3r16oV58+Zh/vz5zWLBggVYsXwFXn/99Wbx2muvIXZOLIyennBzc8PChQsRGxsLf3//VlrlumQmWIwbN86XZtBQIcRYQvf61RHhOqvD8aymm99KU8z8mZ6T5/c0TVuqNU1ZqPOasUznOfHFp90jY3578tSpf7VYLPWzNvvMne/Xr59KLA2OSnL/fqEI85PQz7u0WYT7WjDQp9wJKjDQ14qBvU0IDQ1V3woeyP5UB4e5vmYb4+IEiYmtqqqKpgZNIP04pHF9pBeNMHi+4TYyZqRx7Cx3bfdetSJC7wbDgGEwTVngYTb5z75w4UJtWmsPVB9oMFWwrJCtUO7tB65/5hzX/gYl+WM4ktY4wUeQKU3OOA4IvuhHAWrqQAf+URukCbIsP02d7e6kHcKh1XaXDG6TjWOed4dG21RE0kAXEAw5YpT20799htWrV6tYs2ZNU9lGMVQnGDSwgOyAeHgXIjeJcLERkilMyDoH3D9LONMQD85AyT4PPLwHRZapFgWSRoJE6ogCHXpJ1EFnxNY0SlLs9h7Quxm13QJq4premXi/YNy6kwYmqwZNBetiqF71VdZoNSgvLweEBMWtJwBBl6YRJAjxcxwNKBpD0MBrDFD0JlRUWsF/elo8O1I1cBsYEv+0BEnW2KE4WpXTQEFERDji4uJUvPVWy35rIQTc3d1h0BtQUlKCyioH4B1KpcgtNaf5NI0bFGMfFBQUwG53qHq9UxAshLhHrbYRnF2yXavko7Iyz5Z911m6GqfYqxTl3nXLkMGD1XBbfoQQ8PHxUcE7rYzMB5B8wiAbfoFJJWj8Dd6w+YTj3t27sFqtNNgR0Gho1relMS6UYRVxgso/K5wTrVTpdMWy3ZpQdize4SgtItGGl+Kww5b+d1mTerlkzuxZDRNbCLF+ZPu3T58+qlo5+/15OAz+gF8k5SI1Qb9tvYRGB8V/JArtnki5dYvKkzFxYnRbs7tUTqKVP510JhN8gjp9nkDrb12dBSkp5XJZyVfWy6cOlB38GtY71yCXFUGuMMOel6mUXzxaZj65M9tHq+wYOnRoXcY2PPErHBERAaPRiEs//oi7OQ8h+k6C7BHQhtw1IqS7ffrDHjITN1PuIC09DcHBwXi6nW2pKe1x3+ndApKTk21MdEhIyA/0WhU0qsQREBBww25++EfL2b2fm4/vuGQ+El9sPrzZYj62PcN8LH5/RUryfy5+9eX1jfK1GmQbeMCAAaCNjLplPnHqHEr1oUDQFMg6U6v5AQHFKxRi4ELkyj1x/MRx0maViI5+DrSVR2f4Uwmuacj27dsd586da6IHeACysrLOC3vV6vIrJ+Msp75dTeTGlf9w4A+OB3c+enDn9hdLly4trCmnrXdSSyoR0dHR8KTd18WLyTh/ORWVAc9BCXkeitYD9L4TjU5KZL3r3Q/iqSUo9x+HPfsO4PKVKxg0cBDGjxsHHjwnuX71qAYEt1K7nJmZmZWVkbEnI+32f2Wm3/kwMy11PcUlUb4GaoXCbb705DcYQv6DadOmqeba0WMnkHQzDxV9X4AycBFk3wgokh6KIL1MFyRauPTkZ+o9FsrQ11HsG4WEfUfw3YED8PX1xfPPPw9yRrW5flcLtodgl7WF/RFTp07F2LFjSVWUYN++73Dq4m3keE2Ctf8SKP3mQu45jNRBCKmP54CnVsASvhwptn7Ytvsg4rdtIz3ugZkzZ2IMOXwMBoPL2tregjsFwUIIeHt7Y/bs2SC/iOpe3LdvH77dewgX7uuR7jYB5X1mQw6airKwRbimjMDBqwX4eks89n/3HXoF9MLc2LmYMW26Wk57SWhW/jEkdAqCuR8SbWt79+6NGTNmYPr06fAPCMDly5exa9ce7D54Gtfv21Aq9cae79Px5dZE7NixA+npdzGKXJJLFi/GLJq9Hek14z44Q6chmBun0WhAFgsmTpyI6aST/cmtmZGRgYvJybj8YxLyM1OQsDORrR4Uk7P+qd/8Bq++8grGjx+vLpbohH+dimDmx2azgY+UUlJS1LM7tgaMRg/09AuA0acHwgeE0/Zaz8YFsrKzce3aNZQ8LAE5rNAZ/zoNwbTZgdlsxqVLl5CQkIBjx46ppPHCF0tO86gxo9Gzpz9e+4cVqiM9MnIEcnJzsGnLZmzcuBHX/35d3SJ3NpI7DcHsP0hKSsLu3buRmpqKwfT6z507Vz3pmDplCgJ6+kJjK8XgwQOxeNFi9XRj3kvz0JtOQ9hE27RpE9gOJt92p+K4UxDMauEKbRL279+vHmqOJlNrzgsvqLqYbVq2lYXWHcKjG4SQVE/ZYHIsscyiRYvwzDPP4AINDh/n8+B0JnXR4QQzGbRLBH/zkE06NTIyEmxFhIeHq/7i2ulorwAseerOjuPY6uCNxZjRY7B44SIMHzYc/AYcoA0H62SW6QzocILZ2X7q1Cncvn0bwcHB4B1dYGBgE1ejotEDbuSfEA1p403FoEGD8DIdmvbs2QMnTp0Evw2s0xtKdkyoQwl2OBygrbY685iomJgYhIWFQYhGLILCdGqhaI3EEj3Tb/2Lj/5ZZcRMilEXysNHjqiblfoyHfXcoQTzgnTjxg31wxM+/WVdKkRTAlWbzF4OxZJLj01PPIQQtFU2YtSoUehL/uUfyfWZnp7eUZw2qLfDCOZXmM2ytLQ08EzmbyTYo9agdTUBIlDQeZvGJxigRQ5O/niTwgtiRHgEKuiM78wZOhh1IvdrR3UYwby4FRcXq2dobm5uqHXWO2FAUWQotnLAZoZsNcOZ604Iobo82besN+hVtaMoziSdVODCqA4jmDvPH6rwIufj66O6Guv3UyEaFYcV8sN02FO/hfLTV1BuJcB+8RPYb+2GozQLitzwKJFnMfsz9Do98vLzwSqofpkd8dxegrW9evUaRJ2YEhTafzadp40hB4vfL2k4E8ybC7vdDi+TFyRNXVMUnrHl+XBkHIHj2ufA9S8g0vdCyr0I5eo6OC6sgf3Hz+G4fx5Klbm2eokcRiaTCYLuTK6LP/rjjyC7MQd9gsJmMSfkR2ly6lvXq+pm8vdpuurHBr8SFRAY2D/8Db1/0NvGkTHvGUY8F2cYNOpdnYfn76iSmAbSbQw4yIpgsL9BsKVA+RTZAdl8H3LqTijX10Hc/Q5SeS4Eve4KgT9QQXEqzegtcFz6H9jSjkCx1X2ypdVpyVYGHd3bwRsYKvKxX2Sx6KnPk6DVrXIbNPJdj5GT4jxGTl5l6B32Vt+g0DeDgoLCaiqtIVgMGzbMh4z8CEpo/PGf6BkS4qf16va2+9Bx75qmLX7FGP1SlOeE2BGm6HlTTVMW/lYXOOB385csmUl5H/lSZDsUcw4USxYkt+6A/zPVCHgGok8URN9x1QgYAUg6yEWpkCtL6uqtVbu1D3Vpj+GJyS0rK39O4xf4jufEl970jH55qufEuZGe0S9GmabMf9l9RPQqh6K8TRMyiKuTfib2KdJf0aL64z86j+GkatDK7KbXGWL1/YYs85z0SoAxaqbR0G+opA8ZBLchUVrTlAWeVNH4qz/dWvnBBx+g5tMpvq9p4fMpWZZVZ051LVAtCZ7NsqxAdietEzwL8uDXoAz+R7pXQ3n6nyAi3yT8C8QIug97AyJoImShr5efzDia6Uyv3KiOmrpaupeWlpooPa450FY8Du7u/06kTjDNWCKYA+aCOBHG0TNMnjGvdKeJuAh6/XIqg1SfRhNNxE4kDKNXsPHsBelIT43W8Ibn+DlGXWA452kAoXcT7sMmGB2BgyIOHjrcIM1ZgOpQLYdt27eBDljVc7hs2iKzAz0+Ph7btidg+74z2HbsJrYfv1WNE7exjZ6/PnQdG/ZfaYCN+5KxflMC1q5bh/UbNmD3nt0wW8yqZ43L43A+LXjO2tLeONLxOoPRFKUPHhhFZBokdx6LeqVIGuj69IPnpJc9NAb32cHBwb34w5NhJNKEWIrjS9Lr9X7CzSNC3/9pDUc4g9AbYIqchDA6gl+1ahVqsHLlyibiPKtyc3OxY/sOnD9/XiWY/b+JiYnqKcUOclUmJCQiIXEndtSAwjsIX3+zGeu//LIhNm7EesaG9diwcYPq0zBbLCrBW7fF04nILmTn5DRpR3MRXl5eZZTmdAaHhYX92bdX35/cBj8Lyd2TxJpeQqOFNiBUaLv18aHJObhGBzeVrI6R7ELnLXR6uhmqY5z9CirGwwtFxfV0YSM5JpYqVBcefpYkCfTWtAmqrCTYcAO/AS2C6q0pt0ZOpoWT665WQaRCSOaXXFSGBI22u2Ty0baUXxAfwuSjoXZ4S9QIewvCsg72YqWK7NFyHthmJEnX4WEBegf4NyMAVUfyqs5gU2rChAnqAScfcjLG0olyc+Bd3tiosYiZNAlTyDfcLCZPqUun58kxk8H/dsD1sdnG4MFttpGtJJgNBoewV913FGTV2YZO8ihkZjqKc6gqOY8J/p5kMhRFcUa0TITky9byS5XXz1lJrulFC4pcXqbIN85ZJ44b2zT95xiehRqNBuyY6dGjB+aR9+vFF18Egx3rjNjYWMQ6wZw5c9T4BfMXYOmSpVi2dJkTLMXyZcuwnNJWLFuOFStWYPny5Zg9azb8/fxV7xzXz+34uUntvvlpNFZbZcXxihsXbI7ifKf5FbsNtrs/yXJh7gOawT9JlZWVZ+jhBBHMRGc2zuXh4VGm2Cs/tpw/kFN582IVLf11IjRS9uJcxfL93lJ9duoPfFhZl9jwiTvH5LLXjMoEOwuWYQAAAhtJREFU2ZHqByJ8Z5C1ooZbupN9iRByaTpHCEJCQmoRys8kS+YSjEYjLep6FY9CMDmmbHaL44I9595J87FtdntBVoNOKg4brKlXFPOpxCJZtm168OBBoUSZqpKSktIqiWiSPkNEF9K99iKzxGpzdz9oy07/2Hxo87WyQ5ttFclHKyqunrZazu61lB36xmw5s2vPUwMH/Dd3pjajkwcaSDC4kwwmnTcZTDyDFlSVhMZ3HpT6aJxeE+YyGFwml83gerhOhpMmtTdKyctLL5ItpX8x/3DgW/ORLQ8tZ3ZbKq6crqxIPl5hPrrNYjmZeNOaculTYbfv4MIl/mEw0cnJyRmExh//IffqVUtVYc5nlTeT/lR28KtPyo7GJ5qPbt9Temjz1+Vn975vK8z969q1aw9QOaufAKyhPrR02WhmJinmkvfLLxx4v+zgpq/Mx7bvLT26ZWfpoW8+td5I+gPsVZ/cv3+/iAupJZgDLYFMKwsVnChbK/5ou3fzLxUpyX9SirI/vJ+R8VF2dvYlmiFlhLgnAB+1xMPPaXbi4krmnTt/VUpyP2Qu7Pdu/tlWWvJh5t07W2vIZdk2E8zCBJkKLqQCrhKpyXQacYfiHIT/r5cjIyMjjblgTmgS5jUmor0EN87fFW6FgS6CWyHoUZO7CH5UBlvJ30VwKwQ9anIXwY/KYCv5uwhuhaBHTe4i+FEZbCX/E0xwKz3/lZL/FwAA//9fkDSgAAAABklEQVQDAHGWKxTw1UHBAAAAAElFTkSuQmCC",

    applyAlpha: function(){
    },
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
                    }else{
                        node.animate({ opacity : 0 }, duration, function () { this.hide() });
                    }
                }
            });
        }else{
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
    setPersistentAttributes: function(memento){
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
    translateToCppCode: function(){
        let cCode = "";

        let wireVariableName = this.getPort("delay_ms").getConnections().first().getVariableName();
        cCode += `delay(${wireVariableName});\n`;

        return cCode;
    },
});
