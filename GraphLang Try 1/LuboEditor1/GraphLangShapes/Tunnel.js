GraphLang.Shapes.Basic.Tunnel = draw2d.shape.node.Between.extend({
    NAME: "GraphLang.Shapes.Basic.Tunnel",
    init : function(attr)
    {
        //this._super($.extend({with: 30, height: 10},attr));
        this._super(attr);
        this.setBackgroundColor("#fdc11d");
        this.setHeight(15);
        this.setWidth(42);
        //this.add(new draw2d.shape.basic.Label({text: "tunnel"}), new draw2d.layout.locator.CenterLocator(this));
    },
    onRun3:function(){
      alert("TUNNEL id: " + this.id);
    }
});