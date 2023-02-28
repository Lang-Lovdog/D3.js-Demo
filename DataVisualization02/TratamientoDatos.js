const elArchivo = document.getElementById('elArchivo');

const recarga = function(elArchivo){
  var laData= new Array();
  d3.csv(elArchivo,d=>{
    laData.push(d);
  }).then(()=>{

    const freq_edad=frecuencia(laData,"age");
    const freq_workclass=frecuencia(laData,"workclass");
    histogram_freq(freq_edad,"#EdadesOrig","Edades",[1,0,0]);
    histogram_freq(freq_workclass,"#WorkClassOrig","WorkClass",[0,1,0],true);
    //console.log(Object.keys(laData['0']))
  });
}

elArchivo.addEventListener( "change", ()=>{
    recarga(elArchivo.files[0]['name']);
});


const histogram_freq = (tabla_frequencias,leDiv,leTitle, ColorConstante=[0,0,0],porcentual=false)=>{
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

  leDivTitulo=leDiv+"Titulo";
  leDivCuerpo=leDiv+"Cuerpo";
  leDivEtique=leDiv+"Etique";
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
        if(ColorConstante[0]){
          lRed=ColorConstante[0];
        }
        else{
          lRed=d3.randomUniform(125,255)();
        }
        if(ColorConstante[1]){
          lGre=ColorConstante[1];
        }
        else{
          lGre=d3.randomUniform(125,255)();
        }
        if(ColorConstante[2]){
          lBlu=ColorConstante[2];
        }
        else{
          lBlu=d3.randomUniform(125,255)();
        }
      return 'rgb('+lRed+','+lGre+','+lBlu+')'
      })
    .style("margin",'2px')
    .style('width','40px')
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
    .style('width','40px')
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
