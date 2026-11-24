/**
 *  @author LuboJ
 *  @description Fast Fourier Transform of 1D array (any length, mixed radix Cooley-Tukey, radix = smallest prime factor,
 *  prime length parts are computed by direct DFT). Input array items are converted to complex numbers (ie. uint8_t, int, double samples).
 *  Outputs:
 *      out1 - magnitude spectrum |X[k]|, k = 0..N-1 (vector<double>, python list of float), frequency of bin k is k * Fs / N
 *      out2 - complex spectrum X[k] (vector<complex<double>>, python list of complex)
 *  C++: helper function graphlang_fft() is placed into type definitions (once per program), uses std::complex.
 *  Python: helper function graphlang_fft() uses cmath only (no numpy needed).
 */
GraphLang.SignalProcessing.FFT = GraphLang.UserDefinedNode.extend({

   NAME: "GraphLang.SignalProcessing.FFT",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100, height:60, flagAutoCreatePorts: false},attr), setter, getter);
     var port;

     // in1 (samples array)
     port = this.createPort("input", new draw2d.layout.locator.XYRelPortLocator(2, 30.0));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#F3A07C");
     port.setName("in1");
     port.setMaxFanOut(20);
     if (!port.userData) port.userData = {}
     port.userData.datatype = "vector<double>";
     port.userData.connectionMandatory = true;

     // out1 (magnitude)
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(98, 30.0));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#F3A07C");
     port.setName("out1");
     port.setMaxFanOut(20);
     if (!port.userData) port.userData = {}
     port.userData.datatype = "vector<double>";

     // out2 (complex spectrum)
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(98, 70.0));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("out2");
     port.setMaxFanOut(20);
     if (!port.userData) port.userData = {}
     port.userData.datatype = "vector<complex<double>>";

     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 100;
      this.originalHeight= 60;
      return shape;
   },

   createSet: function()
   {
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L100,0 L100,60 L0,60");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M20 0L80 0L80 60L20 60Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#F2F7FD","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Lines to ports
        shape = this.canvas.paper.path('M0.5 18.5L20.5,18.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        shape = this.canvas.paper.path('M80.5 18.5L99.5,18.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");
        shape = this.canvas.paper.path('M80.5 42.5L99.5,42.5');
        shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
        shape.data("name","Line");

        // Port labels
        shape = this.canvas.paper.text(0,0,'x[n]');
        shape.attr({"x":1,"y":11,"text-anchor":"start","text":"x[n]","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.text(0,0,'|X|');
        shape.attr({"x":83,"y":11,"text-anchor":"start","text":"|X|","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");
        shape = this.canvas.paper.text(0,0,'X');
        shape.attr({"x":86,"y":35,"text-anchor":"start","text":"X","font-family":"Arial","font-size":9,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Title
        shape = this.canvas.paper.text(0,0,'FFT');
        shape.attr({"x":50,"y":22,"text-anchor":"middle","text":"FFT","font-family":"Arial","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"bold","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Spectrum bars
        var bars = [4, 6, 22, 6, 3, 2];
        for (var i = 0; i < bars.length; i++){
            shape = this.canvas.paper.path('M' + (29 + i*8) + ' 54L' + (29 + i*8) + ' ' + (54 - bars[i]));
            shape.attr({"stroke":"#3778C8","stroke-width":4,"opacity":1});
            shape.data("name","Bar");
        }

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
      this.svgNodes.forEach(function(node){
          if(node.data("name")===name){
               if(flag){node.show();}
               else{node.hide();}
           }
       });
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

    getPersistentAttributes : function()
    {
        var memento = this._super();
        memento.labels = [];
        this.children.each(function(i,e){
            var labelJSON = e.figure.getPersistentAttributes();
            labelJSON.locator=e.locator.NAME;
            memento.labels.push(labelJSON);
        });
        return memento;
    },

    setPersistentAttributes : function(memento)
    {
        this._super(memento);
        this.resetChildren();
        $.each(memento.labels, $.proxy(function(i,json){
            var figure =  eval("new "+json.type+"()");
            figure.attr(json);
            var locator =  eval("new "+json.locator+"()");
            this.add(figure, locator);
        },this));
    },

    symbolPicture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAACsklEQVR4nO3dzUpUcRzH4f+IubCrqLFVGg7Swo0QNUVFm15EwtuQooiQ9hFFi5YRLYI2raLauREqGS+hjS66iQklI2L8NuJxXpznAVFmjn9F5sPvnDkHT63dbhegs7F9HgdKKeNV/xUajYaRRF+1Wq1aVWuZINDLCbJnbX3jqJaGjhbm50rVTBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQKAf12J168nqo/Li2dMDf9/k5MnyY+tnpet8/vSxLC/dLodx4eKl8u79h0OtweAwQWCQJ8jfbt5aLPWpqa62PTExUfk69fpUWbn3oON229tb5e2b17tfn52eKdeu3+i43anT9a5+LsNhsAK5s1guX7nat3XqU2fKyv2HHZ/b+P71TyDTM+f23Y7jxS4WBAKBQCAQCAQCgcCwvIvV7Um65y9flaW7y0e+zjBrrn7r+PiXx+d7/rsMMxMEhmWCdHuCb+c8RC/WgcEKpM8nCuFfdrEgGK/VapX/L93Z2dmql4SubG5ulipf0yYIBGPtdrtW5YfpQT/tvP6qfD2bIBAIBAKBQCAQCAQCwc6RejmKexS6w1R/jeLFigu/7zDlHoXQI3axIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAgEAgEAoFAIBAIBAKBQCAQCAQCgUAwnp6EUb9PukBG+OY4o3iTnYOyi8WxMus+6dA7JggEjkEGjOOCwWKCQGCCEDVH/J0uEwQCE4RDax7jKSMQeqI5pBEJhIHRHMCIHINAIBAIBAKBQCCotduVXTq/q9Fo7C64tr5R6brwPwvzc7ufW61WrVTEBIFAIBAIBAKBQCAQCAQCgUAgEAgEAoF+XO6+d1YThpkJAr28FguOExMEyv5+AQ2+LUu++J3/AAAAAElFTkSuQmCC",

    jsonDocument: [],

    /*************************************************************************************************************************************************************
     *    TRANSLATE TO C/C++ code functions
     *************************************************************************************************************************************************************/

    translateToCppCodeImport: function(){
        return ["#include <vector>", "#include <complex>", "#include <cmath>"];
    },

    /**
     *  @method translateToCppCodeTypeDefinition
     *  @description FFT helper function, translator removes duplicates so it's in program just once even if more FFT nodes are used.
     */
    translateToCppCodeTypeDefinition: function(){
        let cCode = "";
        cCode += "//GraphLang.SignalProcessing.FFT helper, mixed radix Cooley-Tukey FFT for any length (prime length parts use direct DFT)\n";
        cCode += "vector<complex<double>> graphlang_fft(const vector<complex<double>> &x){\n";
        cCode += "    size_t N = x.size();\n";
        cCode += "    if (N <= 1) return x;\n";
        cCode += "    const double GRAPHLANG_PI = std::acos(-1.0);\n";
        cCode += "    size_t p = 2;\n";
        cCode += "    while (p * p <= N && N % p != 0) p++;\n";
        cCode += "    if (N % p != 0) p = N;\n";
        cCode += "    vector<complex<double>> X(N);\n";
        cCode += "    if (p == N){\n";
        cCode += "        for (size_t k = 0; k < N; k++){\n";
        cCode += "            complex<double> sum = 0.0;\n";
        cCode += "            for (size_t n = 0; n < N; n++) sum += x[n] * std::polar(1.0, -2.0 * GRAPHLANG_PI * (double)((k * n) % N) / (double)N);\n";
        cCode += "            X[k] = sum;\n";
        cCode += "        }\n";
        cCode += "        return X;\n";
        cCode += "    }\n";
        cCode += "    size_t M = N / p;\n";
        cCode += "    vector<vector<complex<double>>> sub(p);\n";
        cCode += "    for (size_t r = 0; r < p; r++){\n";
        cCode += "        vector<complex<double>> xr(M);\n";
        cCode += "        for (size_t m = 0; m < M; m++) xr[m] = x[m * p + r];\n";
        cCode += "        sub[r] = graphlang_fft(xr);\n";
        cCode += "    }\n";
        cCode += "    for (size_t k = 0; k < N; k++){\n";
        cCode += "        complex<double> sum = 0.0;\n";
        cCode += "        for (size_t r = 0; r < p; r++) sum += sub[r][k % M] * std::polar(1.0, -2.0 * GRAPHLANG_PI * (double)((r * k) % N) / (double)N);\n";
        cCode += "        X[k] = sum;\n";
        cCode += "    }\n";
        cCode += "    return X;\n";
        cCode += "}\n";
        return cCode;
    },

    translateToCppCode: function(){
        let cCode = "";
        let inConnections = this.getInputPort("in1").getConnections();
        if (inConnections.getSize() == 0){
            return "//ERROR: GraphLang.SignalProcessing.FFT input in1 not connected\n";
        }
        let inWireName = inConnections.first().getVariableName();

        cCode += "{\n";
        cCode += `    vector<complex<double>> fftInput(${inWireName}.begin(), ${inWireName}.end());\n`;
        cCode += "    vector<complex<double>> fftSpectrum = graphlang_fft(fftInput);\n";
        cCode += "    vector<double> fftMagnitude(fftSpectrum.size());\n";
        cCode += "    for (size_t fftIndex = 0; fftIndex < fftSpectrum.size(); fftIndex++) fftMagnitude[fftIndex] = std::abs(fftSpectrum[fftIndex]);\n";
        this.getOutputPort("out1").getConnections().each(function(wireIndex, wireObj){
            cCode += `    ${wireObj.getVariableName()} = fftMagnitude;\n`;
        });
        this.getOutputPort("out2").getConnections().each(function(wireIndex, wireObj){
            cCode += `    ${wireObj.getVariableName()} = fftSpectrum;\n`;
        });
        cCode += "}\n";
        return cCode;
    },

    /*************************************************************************************************************************************************************
     *    TRANSLATE TO Python code functions
     *************************************************************************************************************************************************************/

    translateToPythonCodeImport: function(){
        return ["import cmath", "import math"];
    },

    translateToPythonCodeTypeDefinition: function(){
        let pythonCode = "";
        pythonCode += "# GraphLang.SignalProcessing.FFT helper, mixed radix Cooley-Tukey FFT for any length (prime length parts use direct DFT)\n";
        pythonCode += "def graphlang_fft(x):\n";
        pythonCode += "    N = len(x)\n";
        pythonCode += "    if N <= 1:\n";
        pythonCode += "        return [complex(v) for v in x]\n";
        pythonCode += "    p = 2\n";
        pythonCode += "    while p * p <= N and N % p != 0:\n";
        pythonCode += "        p += 1\n";
        pythonCode += "    if N % p != 0:\n";
        pythonCode += "        p = N\n";
        pythonCode += "    if p == N:\n";
        pythonCode += "        return [sum(complex(x[n]) * cmath.exp(-2j * math.pi * ((k * n) % N) / N) for n in range(N)) for k in range(N)]\n";
        pythonCode += "    M = N // p\n";
        pythonCode += "    sub = [graphlang_fft(x[r::p]) for r in range(p)]\n";
        pythonCode += "    return [sum(sub[r][k % M] * cmath.exp(-2j * math.pi * ((r * k) % N) / N) for r in range(p)) for k in range(N)]\n";
        return pythonCode;
    },

    translateToPythonCode: function(){
        let pythonCode = "";
        let inConnections = this.getInputPort("in1").getConnections();
        if (inConnections.getSize() == 0){
            return "# ERROR: GraphLang.SignalProcessing.FFT input in1 not connected\n";
        }
        let inWireName = inConnections.first().getVariableName();
        let spectrumName = "fftSpectrum_" + this.getId().replaceAll('-', '_');

        pythonCode += `${spectrumName} = graphlang_fft(list(${inWireName}))\n`;
        this.getOutputPort("out1").getConnections().each(function(wireIndex, wireObj){
            pythonCode += `${wireObj.getVariableName()} = [abs(v) for v in ${spectrumName}]\n`;
        });
        this.getOutputPort("out2").getConnections().each(function(wireIndex, wireObj){
            pythonCode += `${wireObj.getVariableName()} = ${spectrumName}\n`;
        });
        return pythonCode;
    },
});
