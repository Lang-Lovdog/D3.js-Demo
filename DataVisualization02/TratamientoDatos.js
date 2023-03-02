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

    DefineNull(laData,"?","workclass","Private");
    const freq_ednum=frecuencia(laData,"education.num");
    const freq_edad=frecuencia(laData,"age");
    const freq_income=frecuencia(laData,"income");
    const freq_workclass=frecuencia(laData,"workclass");
    histogram_freq(freq_ednum,"#NumEducativo","AñosDeEstudio",[100,100,100],[100,100,200],true);
    histogram_freq(freq_income,"#ElIncome","Ingresos (Sueldo)",[20,100,100],[100,250,120],true);
    histogram_freq(freq_edad,"#EdadesOrig","Edades",[0,150,150],[0,230,255]);
    histogram_freq(freq_workclass,"#WorkClassOrig","WorkClass",[200,1,220],[201,0,230],true);
    ScatterPlot(laData,"#scatterplot","age","hours.per.week","Relación de edad y Horas de trabajo");
    //console.log(Object.keys(laData['0']))
  });
}

const DefineNull = (Arreglo,ClaveDeNull,Key,NewValue)=>{
  Arreglo.map(item=>{
    if(item[Key]==null || item[Key]==undefined || item[Key]==ClaveDeNull){
      item[Key]=NewValue;
    }
  })
}

const frecuencia = (Arreglo,Key)=>{
  aux_array=[];
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
  console.log(histArray)
  return histArray;
}


const histogram_freq = (tabla_frequencias,leDiv,leTitle, ColorInit=[0,0,0],ColorIniv=[255,255,255],porcentual=false)=>{
  var proporcion;
  const maxValue=Object.values(tabla_frequencias);
  console.log(maxValue);
  i=d3.max(maxValue);
    console.log(i);
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
  console.log(proporcion);
  WidTh=100/Object.keys(tabla_frequencias).length;
  console.log(Object.keys(tabla_frequencias).length);
  console.log(WidTh);

  leDivTitulo=leDiv+"Titulo";
  leDivCuerpo=leDiv+"Cuerpo";
  leDivEtique=leDiv+"Etique";
  leDivValuee=leDiv+"Valuee";
  //Object.keys(tabla_frequencias).map(elemento=>{
    //console.log(elemento);
    //console.log(tabla_frequencias[elemento]);
    console.log("___");
  //})
  const Clases=Object.keys(tabla_frequencias);
  // Le decimos sobre qué elemento vamos a operar

  d3.select(leDiv)
  // Agergamos un div
    .append("div")
  // Cambiamos sus caractrísticas CSS
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
  // Operará sobre todos los div que existan en el contenedor
  // Así, cada nuevo div creado se volverá el nuevo elemento
  // operando.
    .selectAll("div")
  // Le decimos cuales serán los datos objetivos que se usarán
  // dentro de las siguientes definiciones.
    .data(Clases)
  // Le damos indicio de que será una entrada de datos que
  // deberá asignar a cada nuevo elemento creado.
    .enter()
  // Añaimos un elemento div para crear la barra del
  // histograma
    .append("div")
    .style("margin",'2px')
    .style('width',WidTh+'%')
    .style('height','20px')
  // Se agrega el texto de interés]
  // en este caso, el valor de la variable
    .text(d=>{
      return tabla_frequencias[d];
    })
    .style("text-align","center")
    .style("display","inline-block")
    .style("font-size","10px")
    .style("background-color","black")
    .style("color","white");

  // Le decimos sobre qué elemento vamos a operar.
  d3.select(leDivCuerpo)
  // Operará sobre todos los div que existan en el contenedor
  // Así, cada nuevo div creado se volverá el nuevo elemento
  // operando.
    .selectAll("div")
  // Le decimos cuales serán los datos objetivos que se usarán
  // dentro de las siguientes definiciones.
    .data(Clases)
  // Le damos indicio de que será una entrada de datos que
  // deberá asignar a cada nuevo elemento creado.
    .enter()
  // Añaimos un elemento div para crear la barra del
  // histograma
    .append("div")
  // Le damos forma y color
    .style(
      "background-color",()=>{
      lRed=d3.randomUniform(ColorInit[0],ColorIniv[0])();
      lGre=d3.randomUniform(ColorInit[1],ColorIniv[1])();
      lBlu=d3.randomUniform(ColorInit[2],ColorIniv[2])();
      return 'rgb('+lRed+','+lGre+','+lBlu+')'
      })
    .style("margin",'2px')
    .style('width',WidTh+'%')
  // En esta parte, el ancho se relaciona al valor de interés
    .style('height',d=>{
      return (tabla_frequencias[d]*proporcion) + "%";
    })
    .style("display","inline-block")
    .style("align-self","flex-end");

  d3.select(leDivEtique)
  // Operará sobre todos los div que existan en el contenedor
  // Así, cada nuevo div creado se volverá el nuevo elemento
  // operando.
    .selectAll("div")
  // Le decimos cuales serán los datos objetivos que se usarán
  // dentro de las siguientes definiciones.
    .data(Clases)
  // Le damos indicio de que será una entrada de datos que
  // deberá asignar a cada nuevo elemento creado.
    .enter()
  // Añaimos un elemento div para crear la barra del
  // histograma
    .append("div")
    .style("margin",'2px')
    .style('width',WidTh+'%')
    .style('height','20px')
  // Se agrega el texto de interés]
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

  const LeSctatterPlotain=d3.select(leDiv)
    .append("svg")
    .append("g");

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 4000])
    .range([ 0, "300px" ]);
  LeSctatterPlotain.append("g")
    .attr("transform", "translate(0,300px)")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 500000])
    .range([ "300px", 0]);
  LeSctatterPlotain.append("g")
    .call(d3.axisLeft(y))
  
  LeSctatterPlotain.append('g')
    .selectAll("dot")
    .data(LosDatos)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d[ ValorKeyX ]); } )
      .attr("cy", function (d) { return y(d[ ValorKeyY ]); } )
      .attr("r","1.5px")
      .style("fill", "#69b3a2");
}
