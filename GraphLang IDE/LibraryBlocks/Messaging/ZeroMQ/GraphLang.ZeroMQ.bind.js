/**
 *  @author LuboJ
 *  @description Bind ZeroMQ socket to endpoint, ie. "tcp://*:5555" or "tcp://localhost:5555".
 *  C++: socket->bind(endpoint), Python: socket.bind(endpoint)
 *  Shape is simple and editable in shape designer (init/createShapeElement/createSet are in shape designer format),
 *  translation helpers are in GraphLang.ZeroMQ.CommonParent.
 */
GraphLang.ZeroMQ.bind = GraphLang.ZeroMQ.CommonParent.extend({

    NAME: "GraphLang.ZeroMQ.bind",

    init:function(attr, setter, getter){
        this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
        var port;
        // socket_ref_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 33.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#4DFAFF");
        port.setName("socket_ref_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "zmq::socket_t*";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // bind_str_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 53.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#F307F3");
        port.setName("bind_str_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "string";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // error_in
        port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(0, 73.333333));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#F3EC24");
        port.setName("error_in");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        // error_out
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 73.333333));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#F3DE22");
        port.setName("error_out");
        port.setMaxFanOut(20);

        if (!port.userData) port.userData = {}
        port.userData.datatype = "errorDatatype";
        port.userData.allowMultipleConnections = undefined;
        port.userData.connectionMandatory = undefined;

        this.persistPorts=false;
    },

    createShapeElement : function(){
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
        shape = this.canvas.paper.path('M0,32L20,32');
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

        // Label
        shape = this.canvas.paper.text(0,0,'zeroMQ');
        shape.attr({"x":50,"y":9,"text-anchor":"middle","text":"zeroMQ","font-size":10,"stroke":"none","fill":"#080808","font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'bind');
        shape.attr({"x":50,"y":51,"text-anchor":"middle","text":"bind","font-size":12,"stroke":"none","fill":"#080808","font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        return this.canvas.paper.setFinish();
    },

    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAACICAYAAADtXaciAAAQAElEQVR4AeydCXQURbuGv2aRJWERQdkErnITRJagiOIGHBaNQVB/ARH1CIeDoAcFUQEFj3rBJQZBBUVEFj0u/yXgchDZfpQjKiBihItAQAirbELgAGHLzK23mJ5MMktqklkymVenuqurq76qfrrf+WrpDBWE/5EACZRZAhRomb01bBgJiFCgfApIoAwToEDL8M1h00iAAo3eM8CaSaBYAhRosYiYgQSiR4ACjR571kwCxRIo1wJNSUlxMpR/BsU+5TGcoVwLNIbvC5seXgIxYz0uBPr7778LQ/ljEDMqK0VD40KgpeDDoiQQVQIUaFTxs3ISCEyAAg3Mh2dJIKoEyqFAo8qTlZNASAlQoCHFSWMkEFoCFGhoedIaCYSUAAUaUpw0RgKhJUCBhpZnnFvj5YeaAAUaaqJlzB5e0LjsssukWrVq0qNHDzl58qTfFv78889So0YNnXfSpEle+ZxOp/z666/y8MMPS926dXU+2L3++uvl008/lby8PK8yTCgdAQq0dPxiqvRvv/0m27Zt89vmJUuWyIULF3yeh/hGjx4tt99+u/zwww/y2GOPyWeffSZTpkyRypUry+DBg6Vjx46yZcsWn+WZWDICFGjJuMVcqdq1a8u5c+dk9erVPtuem5sry5cvl4SEBK/zEC3E+e6772ohZmdny8SJE+Xee+/VQv3ll19k3rx5smfPHunTp4/s3r3bywYTSkaAAi0Zt5grdeONN0qbNm1k6dKlcubMGa/2b926VXvXBx980OvcmjVrZO7cudK1a1d57bXXdNdWPP6zLEt69uwpU6dOle3bt8vkyZMF3WGPLIyWkIC5QEtYQTwUQ/cOYzF/wXPshwd31apV0qlTJ/2go0zbtm3lq6++KvRQ22NHdCMfffRRnbdJkyby448/aqTnz5+XTz75RJKTk/U52IFN2EYdOpPHBmPGm266SSC2nJwcjzMXo8uWLZPGjRvLdddddzHBtYUtiBP1Pfnkk5KYmOg6471LTU3V5b/88kvxVYd3CaYUR4ACLY6QwXl7PAYx2QEPdatWrXTpO++8U3cd8bC/88470r17d/n7778lIyND3n//fS2w/v37+/Q8zzzzjPZKH374oQwZMkRatGghEMuIESP0cbNmzbQN2ILNO+64Q6ZPn15I7LoRapOWliboymZlZamjgs/x48e1Z+3SpYvUq1ev4ISKHT16VNatWycNGjSQa6+9VqX4/6AbjS+BgwcPyoYNG/xn5BljAhSoMSr/GW+44QY9HsOYzA4VKlSQTZs2yaBBg2T48OFiWZZs3rxZ3nzzTbnlllv0bOgTTzwhjyrvCK+ImdGXX35Z1q5dW6iiyy+/XBYsWCAPPfSQjBs3TgsI3nbWrFna9sKFC7UN2MIsbEpKih4foq5ChtQBPDUE/vXXXxeaDMLEDgLErbIV+hw+fFgOHDggV199tdSqVavQOV8HDRs21Mno6uoIN6UiQIGWCp/vwvA4ECUeakyuYJYTOb/77jv5559/BN7P82HHeQjV4XDIokWLkNUdIDhPr4bxI7z0FVdcIfCuKGtnRjcW9aIOTPjY6fa+Tp06umuNL4G9e/fayYJuMYSFutyJrghmb8+ePes6Kn6HL4DiczGHKQEK1JSUYT7MYA4cOFDnnj17tmDcqA/UBl6tUqVKggkZjNM8w/r16/VyBWZIMWuqsutP06ZNxVLeVx+ozYkTJ3R5iB+CVEmFPhiTVq9e3WcX07IswTgRHhHrmSiIdVEsr3Tx0b3FeYxtq1SpgqhRgCc2yshMRgQoUCNMZpkwlhs6dKjs2LFDjwvbt2/vLgghQLwQH7qqmC31DM8++6xe6If3g5e0C9asWdOO6j28LGxUrFhRd5t1YhAbjIsxGYRJIYyJsS66ceNGLVzLsrwswXvXr19f/vrrL8H1eWUokrB//36d0rx5c73npnQEKNDS8XOXxsM+ZcoU+f777wXdVUzIuE+qCNYX0Y289NJL9c+voOvoK2AZJNBMKca28ML5+fk+J4JUVQE/mOzBbO/KlSv1RNWKFSsE3WVf3VsYsrvFmIDCmBpp/gIEDM+Ma4Qn95eP6eYEKFBzVgFzYuIlPT1d0FV89dVXdXfVs4BlWYLu6rFjx/SsrOc5xDHBA/G88MILOPQb4FHx8KO7vG/fPq986D6fPn1ar3l6nVQJlmVJr169BGNQiAlCRZvhKdVpr49lWfLAAw/o68EXEERoZ8rJyRHM2r7++uuCrjfGz7DZu3dvoQe1KZVuT4GWjp8ujUmhYcOGyVVXXaWXODwngHQG1+aee+4RjA+xkA+hupL1+7GY3cXDD+9mp/vaV61aVdA1Rnm82YMlFzvfkSNHBGlY7sBLBXZ60T3WOtHNxZJPoO6tXa5Dhw56SQe9g5EjR8qpU6f0qSuvvFJeeeUV/YICrh3LTRDm2LFjBV5eZ4r1TZTbT4GW8gbAi+FFBYjrvvvuE7zv6jn5gzgmYdCdRTcSHhLeEm/2TJs2TebMmSPdunWTxYsXCyaX4M2KaxKEjuUbLLXgDR7YgK2bb75ZMNk0ZswYadmypV8zWLpB/WjHJZdcIhiX+s2sTliWJegVPPXUU/L5558LZmpxHd98843s3LlT8DI+RIsvC1wjjlUxfkJAgAItJcRDhw7pd1AxBkUXF96taMDSBwRsWZbAA2GCBt1ZLJPA88LGW2+9JehCei6b+Gsa8iAvyqCbCRvPPfecfhMItvHGj2V5T/jY9uDd7r77bn0Ij4226IMAG9SJ1/ywRNO5c2f54IMPtCd/+umnBSKfMWOGfPzxx3qZCN4bXfAA5njKkAAFagjKX7Z27drptU14SH8BSyf11UwobFiWJbfeeqtg7Gfnx6wvRAYRIA+CbXfUqFE49ArIizIYc8IOPBgmfGDbsgrEaduZOXNmIRt4qR3lICzLKsiPyS2k+6rXsixp3bq1fsUQ3WnkQ70Yd+JFC9jEG0R453f+/PklmsQq1Ege8N8H5TMQWgKNGjUSiB5LSZZVIPzQ1hI/1uLag8bPbeaVxioBCjRW7xzbHRcEKNC4uM28yFglEFCgDRs2vPhSaaxeHdtNAjFOIKBALcuapQb9GynUGL/LZbD5bJIZgYACdZloRaG6SHBHAhEmYCJQSUxORrMoVFBgIIEIEjASaMfl/5FrMyZRqBG8MayKBEDASKBOlbNBv35ykxJqSwpV0eCHBCJDwEigDqVQO9Tv2086LPuPXKOEmuC76xuZlrMWEogDAkYCdVoiSqPiuddCVR61BYUaB48JLzFaBMwEqtTpUC10+thfoTzqDcqjJlOoihA/JBBaAmYCVXUqbUqgAKG2V0JNKiLUpk2bOlu0aOFMSUmJeFDN5ocEYpqAkUDt8afJHl4WQo5pKrHbeLa8nBEwEigEV1w48L//lt96dJVtz46S01u3AtP/OZ3OQbt27bK2bNliZWVlRTygEQwkEMsEjATqb/yJ9INKmOuVMLcXEea+ffta79+/f3Ysw2HbSSDaBIwEqr1nkZncg/P+LVkUZrTvH+sv5wSMBOo59oTHzOreVf6ixyznjwYvL0gCYcluJFB40EPKY25QHnOHEmZedsEYk13ZsNwXGiUBTcBIoBuVMHdSmBoYNyQQSQJGAqXHjOQtYV0kUEDARKB6uYRd2QJojJFApAgEFCjWMSlM3AoGEogOgYAC5TpmdG4KayUBm0BAgdqZuCcBEogOAQo0OtxZKwkYEaBAjTAxU/QIxHfNAQXKn9uM74eDVx99AgEFyp/bjP4NYgvim0BAgbrQ8Oc2XSC4I4FIEzARqCTn83dxI31jWB8JgICRQJcdXyYZJzNCL1S0gIEESMAvASOBonTfc31FC/UUhQoeDCQQCQJGAnU4HWKH+8/cL0tyl0j6yXRJyk9CGzlGBQUGEggDASOBiuWq2WPf92xfWXp8KYXqQsMdCYSDgJFAnU6n6P997Puc7UOPGo47E26btB8TBIwE6r4S24PaCR7HWqjHvbu+/F1cGxb3JBA8ASOBqhGo6GCPRS8eucel+hzS1Hl42uCbwRIkQAK+CBgJtFBBD6+p013HmVUyJbV2qoxOHC3ZFbNxSv+hN38XFygYSKBkBIwECq/obxw6r8o8n8LkH3qX7IawVBwQCOISjQSq7bk8pT2jm1k1U+6qfZeMSRxTyGNSmJoWNyQQEgJGArXXQLG3PSaFGRL+NEICAQkYCRRec37V+ZJ2aZqMTRwr2ypug1E9xqTHBAoGEggPASOBptWmMMODn1ZJIDABI4HSYwaG6HmWcRIIJQETgbIrG0ritEUCQRAIKFC1tDKIY8wgaDIrCYSYQECB8ndxQ0yb5kggSAIBBRqkLWYngagSiFTljRo1mt64ceP/jkR9FGgkKLOO8kbgMTX8y1ZCfT/cQqVAy9ujw+uJJIGh4RZqQIHyd3Ejea9ZVwwTCJtQAwqUv4sbw48Mmx4NAiEXakCBuq6wLPzmkKsp3JFATBAImVBNBCrJyRVBhUIFBQYSMCdQaqEaCXTZ0lqS8WaCJCdRqOb3hjlJwE2gxEI1Eqg4Rfr2qSIUqhs4IyRQEgJBC9VIoA6HU3RwOuX+f1WWJYtrSvobCZJEj1qSmxRrZdje0BMwFqqRQC+2T7lR9bkYh0etLEu1UKtTqDYU7uOawPdLEmXAA5cEw6BYoRoJ1OlwiFN50YJQcNwHHnVRoqS/Xo1CDebWMG+5I9CsiSUTXqwiK75LkAH9KgdzfX6FaiRQXZP2nmqjPr6O+/zrElkCob5WWKj8XVxNi5swEkhJSXFGMvi9FIc6o4aB/9WkghJqVVmxqPRCNRKoHn8qD2qyV+0T0RvVWH5III4IOPLVXI0ODnHkO8Sp4uh1lgKBGAkUs7i6Eu091UZ9ih5nzj8vqWknZfTzeZK9DV8lov/Qm7+Lq0lxE0YCWVlZViSD30uBY1KPfk6OQ8b/z1npevdp+WzeBb/ZfZyYbllW0r59+4bt3btX//CXkUDxLeD0Mw6dl3lOUnt6C1NV0pp/T+rjFjCp3BLYudMh4yYoYfbKK7UwbUhGAlV9Vju/K+qUzAXn5a5ep2TMC2cLeUwKswAVY/FFoNs9efJ5Zuk8ZlFiRgItGHs6ZJ4SZmqv0xRmUZI8JgFzAl5dWX9FjQSKMej8BRckrXeejB13VrZ5jDHpMf2h9Z0+ePBgqVatmlSrVk0Q953LO/XAgQNqGSvJXfbbb7/1zhSGFNRjtzcpKUnQjjBUEy8mjYVpAzESaJpy3WPHK2FuVyNguTj5Q2HaCLkngWIJBC1M26KRQLdRmDYv7kkgGAIlFqZdiYlA9XIJPaaNLDr7+vXrS3Z2tuTl5emQlpYWnYawVhMCpRamXUlAgTqdTv4urk0qTPuDBw/K448/LjVr1tTjyyZNmsgbb7whp06dKlQjxn4YA9rjQYwN7QyI2+k9evSQI0eOyHvvvSfJycnaZkJCgnTv3l3Wr19vFym0V/dZVq1aJZ06bNhzYwAABIZJREFUddL5YQtxpOFcoczl4iBsFxEyYdotDChQrmPamMKz37hxo3Tp0kVmz54t58+f15UcPnxYXnrpJendu7dAvDoxiE1OTo62OWrUKNm9e7cu6VBr2BDbbbfdJgsXLtRp9gYCnDx5shbw2rVr7WRBHKLGl4U7kRF/BEIuTLuiCnaE+8gT2LBhg+zcudNnxT/99JNMnDhRLlwIal1N9uzZI9u3b/dpE0L96KOP5MyZM+7zK1askPHjx7uPi0bWrVtXNInHBQTCJky7CgrUJhGlfc+ePWXz5s1y+vRp7bXatm3rbklmZqZfsbkz+Yg0btxYe8qTJ08KvHSbNm3cuTZt2iS5ubn6GOKfO3euQLhIqF69usyaNUtOnDihw7Rp06RCBT4iYFMkfFD0lbwi50N2SPohQxm8IYwRIYJmzZqJuuHSunVrgYerXbu2Nnbs2DHZunWrjptuYAc2u3btKhUrVpTmzZvLyJEjfRY/evSoeHrI559/Xvr37y+VK1fWYeDAgTJkyBCfZeM5UU2YDrXflQ03h/In0HATC6H9lJQUqVevXiGLmCRq2bKlO81fd9WdoUgE4oYNz+QaNWp4Hrrj6kFzj3MxMdS5c2f3OUQg9m7duiHKECUCFGiUwKPaSpUqac+JuB0gCng++zjYfWJiokCkwZZDvb66sw0bNhR0fYO1x/yhIUCBhoZjiaxgKQXjQM/CmFXNz8/3TApbHF8ECKjg3Llzen0Vcc9w6NAhPT72TGM8cgQo0Mix9qpp9erVsmvXrkLpWBr5888/3WmtWrVyx0MdwcsPdevW1WbxRYEZXX3g2uDLYvHixa4j7qJBgAKNBnVXnXj5YMCAAXqmFWLAeBOTMrm5uToHupeYSNIHYdjUqVNH2rdv77acnp4uc+bM0Wuy8O4ZGRkyY8YM9/liI8wQcgIUaMiRBmfwjz/+kA4dOuhxHmZxPd/2eeSRR6Rp06bBGQwiN8bAw4cP13WjGF6WGDZsmH6rCZ71xRdfdC/B4DxD5AlQoJFn7q4RgsSShjvBI4JX9kaMGOE1ieSRJSRReNAJEyb4Xe/E20QQa0gqo5GgCVCgQSMLXYF+/frJmjVrJDU1Va87wnKDBg1k0qRJ8sUXX0itWrWQFNaA2Vt4zeXLl2tPbleG937ffvttmTp1qn4/107nPrIEKNDI8paZM2fq2VL8VQrel73mmmtkwYIF+s0dpO3YsUO/PI91Sc+mYULH31+z4C9bUBYBeZDXs2xx55G3Y8eOsnLlSnfb0PXGeBhrqrDpzzbKMoSPgLFAw9cEWiYBEvBHgAL1R4bpJFAGCFCgZeAmsAkk4I8ABeqPDNNJoAwQoEDLwE0orgk8H78EKND4vfe88hggQIHGwE1iE+OXAAUav/eeVx4DBOJCoO3atROG8scgEvqKdh1xIdBoQ2b9JFBSAuVaoFkR/ncjWV9k/51Om3dJH/5YKFeuBRoLN4BtJIFABCjQQHR4jgSiTCCeBRpl9KyeBIonQIEWz4g5SCBqBCjQqKFnxSRQPAEKtHhGzEECUSPw/wAAAP//GrX46gAAAAZJREFUAwCMC13jK64d1wAAAABJRU5ErkJggg==",

    jsonDocument: [],



    translateToCppCode: function(){
        let socketWireName = this.zmqInputWireName("socket_ref_in");
        let endpointWireName = this.zmqInputWireName("bind_str_in");
        if (socketWireName === null || endpointWireName === null) return "//ERROR: GraphLang.ZeroMQ.bind inputs socket and endpoint must be connected\n";

        let cCode = "";
        cCode += `${socketWireName}->bind(${endpointWireName});\n`;
        cCode += this.zmqErrorPassThrough(";\n", "0");
        return cCode;
    },

    translateToPythonCode: function(){
        let socketWireName = this.zmqInputWireName("socket_ref_in");
        let endpointWireName = this.zmqInputWireName("bind_str_in");
        if (socketWireName === null || endpointWireName === null) return "# ERROR: GraphLang.ZeroMQ.bind inputs socket and endpoint must be connected\n";

        let pythonCode = "";
        pythonCode += `${socketWireName}.bind(str(${endpointWireName}))\n`;
        pythonCode += this.zmqErrorPassThrough("\n", "None");
        return pythonCode;
    },
});
