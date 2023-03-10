const elArchivo = document.getElementById('elArchivo');

// int main () {
elArchivo.addEventListener( "change", ()=>{
    recarga(elArchivo.files[0]['name']);
});
// return 0;
// }


//<-------------------------------------->


const recarga = function(elArchivo){
  var laData= new Array();
  d3.csv(elArchivo,d=>{
    laData.push(d);
  }).then(()=>{

    /*GraficaHistogramaKey(laData,"bus_ter","#demoProfe",true);
    GraficaHistogramaKey(laData,"crime_rate","#demoProfe0",true);
    GraficaHistogramaKey(laData,"price","#demoProfe1",true);
    ScatterPlot(laData,"#scatterplot","crime_rate","price");
    ScatterPlot(laData,"#scatterplot","price","crime_rate");
    DefineNull(laData,"?","workclass","Private");*/
    GraficaHistogramaKey(laData,"education_num","#NumEducativo",true)
    GraficaHistogramaKey(laData,"income","#ElIncome",true)
    GraficaHistogramaKey(laData,"age","#EdadesOrig",true)
    DefineNull(laData,"<=50K","income","0");
    DefineNull(laData,">50K","income","1");
    ScatterPlot(laData,"#RelacionEdadIncome","age",'income');
    ScatterPlot(laData,"#RelacionEducIncome","education_num",'income');
    ScatterPlot(laData,"#RelacionEducEdad","education_num",'age');

    var LeGustanMayores=ArregloFactum(laData,"income","1");
    var NoLeGustanMayores=ArregloFactum(laData,"income","0");
    ScatterPlot(LeGustanMayores,"#RelacionEducEdadMay","education_num",'age');
    ScatterPlot(NoLeGustanMayores,"#RelacionEducEdadNMay","education_num",'age');
    RegLin(LeGustanMayores,"#RegresionEducEdadMay","age","education_num");

    //RegresionLineal(LeGustanMayores,"#RegresionEducEdadMay","education_num","age");
    //console.log(Object.keys(laData['0']))
  });
}

const RegLin = (LosDatos,leDiv,LaKeyX,LaKeyY)=>{
  var laVX=0;
  var alfa=5;
  var beta=10;
  LosDatos.map(item=>{
    laVX+= parseFloat(item[LaKeyX]);
  });
  ScatterPlot(LosDatos,leDiv,LaKeyX,LaKeyY)
    .append('line')
    .style("stroke", "lightgreen")
    .style("stroke-width", 10)
    .attr("x1", x(0))
    .attr("y1", y(0))
    .attr("x2", x(laVX))
    .attr("y2", y(alfa+(beta*laVX)));
}

/*const RegresionLineal = (LosDatos,leDiv,ValorKeyX,ValorKeyY)=>{
  const ValoresX=ArregloKey(LosDatos,ValorKeyX);
  const ValoresY=ArregloKey(LosDatos,ValorKeyY);
  var MaxX=d3.max(ValoresX)+1;
  var MaxY=d3.max(ValoresY)+1;
  const Regresion = regresson.linearRegression(LosDatos,ValorKeyX,ValorKeyY)
    .x(d => d[ValorKeyX])
    .y(d => d[ValorKeyY])
    .domain([0, MaxX>MaxY?MaxY:MaxX]);
  console.log(Regresion);
  // Configurar el tama??o y los m??rgenes del gr??fico
  const width = 500;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
   
  // Crear la escala x
  const xScale = d3.scaleLinear()
    .domain(d3.extent(LosDatos, d => d.x))
    .range([0, innerWidth]);
   
  // Crear la escala y
  const yScale = d3.scaleLinear()
    .domain(d3.extent(LosDatos, d => d.y))
    .range([innerHeight, 0]);
   
  // Crear el gr??fico
  const svg = d3.select(leDiv).append("svg")
    .attr("width", width)
    .attr("height", height);
   
  // Crear el grupo de gr??ficos
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
   
  // Agregar los puntos de datos al gr??fico
  g.selectAll("circle")
    .data(LosDatos)
    .enter().append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", 5);
   
  // Agregar la l??nea de regresi??n al gr??fico
  g.append("line")
    .attr("class", "regression-line")
    .attr("x1", xScale(Regresion.domain()[0]))
    .attr("y1", yScale(Regresion.range()[0]))
    .attr("x2", xScale(Regresion.domain()[1]))
    .attr("y2", yScale(Regresion.range()[1]));
}*/

const DefineNull = (Arreglo,ClaveDeNull,Key,NewValue)=>{
  Arreglo.map(item=>{
    if(item[Key]==null || item[Key]==undefined || item[Key]==ClaveDeNull){
      item[Key]=NewValue;
    }
  })
}

const ArregloKey = (Arreglo,Key)=>{
  var ArregloSalida=new Array();
  Arreglo.map(item=>{
    ArregloSalida.push(parseFloat(item[Key]));
  })
  console.log(ArregloSalida);
  return ArregloSalida;
}

const ArregloFactum = (Arreglo,Key,Factum)=>{
  var ArregloSalida=new Array();
  Arreglo.map(item=>{
    if(item[Key]==Factum){ 
      ArregloSalida.push(item);
    }
  })
  console.log(ArregloSalida);
  return ArregloSalida;
}

const GraficaHistogramaKey = (LosDatos, LaKey,LeDiv,Porcentual=false)=>{
  const freq=frecuencia(LosDatos,LaKey);
  histogram_freq(freq,LeDiv,LaKey,[0,0,0],[127,127,127],Porcentual);
}

const frecuencia = (Arreglo,Key)=>{
  var aux_array=new Array();
  Arreglo.forEach(item=>{
    aux_array.push(item[Key]);
  })
  //console.log(aux_array);
  
  var histArray= new Object;
  aux_array.forEach(item=>{
    histArray[item]=0;
  })
  aux_array.forEach(item=>{
    histArray[item]+=1;
  })
  //console.log(histArray)
  return histArray;
}


const histogram_freq = (tabla_frequencias,leDiv,leTitle, ColorInit=[0,0,0],ColorIniv=[255,255,255],porcentual=false)=>{
  var proporcion;
  const maxValue=Object.values(tabla_frequencias);
  //console.log(maxValue);
  var i=d3.max(maxValue);
    //console.log(i);
    if(porcentual){
      proporcion=100/i;
    }else if(i>999999){
      proporcion=1/100000;
    }else if(i>99999){
      proporcion=1/10000;
    }else if(i>9999){
      proporcion=1/1000;
    }else if(i>999){
      proporcion=1/100;
    }else if(i>99){
      proporcion=1/10;
    }else if(i>9){
      proporcion=1;
    }
  //console.log(proporcion);
  var WidTh=100/Object.keys(tabla_frequencias).length;
  //console.log(Object.keys(tabla_frequencias).length);
  //console.log(WidTh);

  var leDivTitulo=leDiv+"Titulo";
  var leDivCuerpo=leDiv+"Cuerpo";
  var leDivEtique=leDiv+"Etique";
  var leDivValuee=leDiv+"Valuee";
  //Object.keys(tabla_frequencias).map(elemento=>{
    //console.log(elemento);
    //console.log(tabla_frequencias[elemento]);
    //console.log("___");
  //})
  const Clases=Object.keys(tabla_frequencias);
  // Le decimos sobre qu?? elemento vamos a operar

  d3.select(leDiv)
  // Agergamos un div
    .append("div")
  // Cambiamos sus caractr??sticas CSS
    .style('background-color','white')
    .style('color','black')
  // Le asignamos un valor al contenido
    .text(leTitle)
    .attr("id",leDivTitulo);


  d3.select(leDiv)
    .append("div")
    .attr("id",leDivValuee.slice(1));

  d3.select(leDiv)
    .append("div")
    .attr("id",leDivCuerpo.slice(1));

  d3.select(leDiv)
    .append("div")
    .attr("id",leDivEtique.slice(1));

  
  d3.select(leDivCuerpo)
    .style("height","350px")
    .style("display","flex")
    .style("flex-direction","row")
    .style("max-height","80px");

  d3.select(leDivEtique)
    .style("height","350px")
    .style("display","flex")
    .style("flex-direction","row")
    .style("max-height","20px");

  d3.select(leDivValuee)
    .style("height","350px")
    .style("display","flex")
    .style("flex-direction","row")
    .style("max-height","20px");


  d3.select(leDivValuee)
  // Operar?? sobre todos los div que existan en el contenedor
  // As??, cada nuevo div creado se volver?? el nuevo elemento
  // operando.
    .selectAll("div")
  // Le decimos cuales ser??n los datos objetivos que se usar??n
  // dentro de las siguientes definiciones.
    .data(Clases)
  // Le damos indicio de que ser?? una entrada de datos que
  // deber?? asignar a cada nuevo elemento creado.
    .enter()
  // A??aimos un elemento div para crear la barra del
  // histograma
    .append("div")
    .style("margin",'2px')
    .style('width',WidTh+'%')
    .style('height','20px')
  // Se agrega el texto de inter??s]
  // en este caso, el valor de la variable
    .text(d=>{
      return tabla_frequencias[d];
    })
    .style("text-align","center")
    .style("display","inline-block")
    .style("font-size","10px")
    .style("background-color","black")
    .style("color","white");

  // Le decimos sobre qu?? elemento vamos a operar.
  d3.select(leDivCuerpo)
  // Operar?? sobre todos los div que existan en el contenedor
  // As??, cada nuevo div creado se volver?? el nuevo elemento
  // operando.
    .selectAll("a")
  // Le decimos cuales ser??n los datos objetivos que se usar??n
  // dentro de las siguientes definiciones.
    .data(Clases)
  // Le damos indicio de que ser?? una entrada de datos que
  // deber?? asignar a cada nuevo elemento creado.
    .enter()
  // A??aimos un elemento div para crear la barra del
  // histograma
    .append("a")
    .attr("href","#")
    .attr("class","inline-block")
    .attr("data-bs-toggle","tooltip")
    .attr("data-bs-placement","top")
    .attr("title",d=>{
        return tabla_frequencias[d];
      })
  //  .append("div")
  // Le damos forma y color
    .style(
      "background-color",()=>{
      var lRed=d3.randomUniform(ColorInit[0],ColorIniv[0])();
      var lGre=d3.randomUniform(ColorInit[1],ColorIniv[1])();
      var lBlu=d3.randomUniform(ColorInit[2],ColorIniv[2])();
      return 'rgb('+lRed+','+lGre+','+lBlu+')'
      })
    .style("margin",'.1px')
    .style('width',WidTh+'%')
  // En esta parte, el ancho se relaciona al valor de inter??s
    .style('height',d=>{
      return (tabla_frequencias[d]*proporcion) + "%";
    })
    .style("display","inline-block")
    .style("align-self","flex-end");

  d3.select(leDivEtique)
  // Operar?? sobre todos los div que existan en el contenedor
  // As??, cada nuevo div creado se volver?? el nuevo elemento
  // operando.
    .selectAll("div")
  // Le decimos cuales ser??n los datos objetivos que se usar??n
  // dentro de las siguientes definiciones.
    .data(Clases)
  // Le damos indicio de que ser?? una entrada de datos que
  // deber?? asignar a cada nuevo elemento creado.
    .enter()
  // A??aimos un elemento div para crear la barra del
  // histograma
    .append("div")
    .style("margin",'2px')
    .style('width',WidTh+'%')
    .style('height','20px')
  // Se agrega el texto de inter??s]
  // en este caso, el valor de la variable
    .text(d=>{
      return d;
    })
    .style("text-align","center")
    .style("display","inline-block")
    .style("font-size","10px");
}

const ScatterPlot = (LosDatos,leDiv,ValorKeyX,ValorKeyY,Titulo)=>{
  /*Plot.plot({
    marks: [
      Plot.dot(LosDatos, {x: ValorKeyX, y: ValorKeyY}),
      Plot.text(LosDatos, {text: Titulo, x: ValorKeyX, y: ValorKeyY, dy: -8})
    ]
  }) Para la posteridad*/

  var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


  var laTablaId=leDiv+"Tabla";
  d3.select(leDiv)
    .append("table")
    .attr("id",laTablaId.slice(1))

  d3.select(laTablaId)
  .append("tr")
  .append("td")
  .append("div")
  .text(ValorKeyY)
  .style("transform","rotate(-90deg)");

  var LeSctatterPlotain = d3.select(laTablaId).select("tr")
  .append("td")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  
  /*MaxX=d3.max(Object.values( frecuencia(LosDatos,ValorKeyX) ))
  MaxY=d3.max(Object.values( frecuencia(LosDatos,ValorKeyY) ))*/

  const ValoresX=ArregloKey(LosDatos,ValorKeyX);
  const ValoresY=ArregloKey(LosDatos,ValorKeyY);
  var MaxX=d3.max(ValoresX)+1;
  var MaxY=d3.max(ValoresY)+1;
  //console.log(MaxX);
  //console.log(MaxY);

   // Add X axis
  var x = d3.scaleLinear()
    .domain([0, MaxX])
    .range([ 0, width ]);

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, MaxY])
    .range([ height, 0]);

  var IdX=leDiv+"labelX";
  var IdY=leDiv+"labelY";

  LeSctatterPlotain.append("g")
    .attr("id",IdX.slice(1))
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  LeSctatterPlotain.append("g")
    .attr("id",IdY.slice(1))
    .call(d3.axisLeft(y))

  d3.select(IdX)
    .append("g")
    .attr("class","tick")
    .attr("transform",width+",0")
    .append("text")
    .text("income per capita, inflation-adjusted (dollars)");

// Add dots
  var GraphArea=LeSctatterPlotain.append('g')
  GraphArea
    .selectAll("dot")
    .data(LosDatos)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d[ValorKeyX]); } )
      .attr("cy", function (d) { return y(d[ValorKeyY]); } )
      .attr("r", 3)
      .style("fill", "#44000070")
    .on("mouseover",d=>{
      Tooltip
        .style("opacity",1)
        .style("left", (d3.mouse(this)[0]+70) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
        .html("H")
    })

  const elLastTR=d3.select(laTablaId)
    .append("tr")
  elLastTR
    .append("td")
  elLastTR
    .append("td")
    .style("text-align","center")
    .text(ValorKeyX);

  return GraphArea;
}

/*/ Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html(d.value)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }*/
