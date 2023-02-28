d3.select("div").style("color","white").style("text-shadow","0 0 1px black, 0 0 1.4px black, 0 0 1.6px black, 0 0 1.8px black,0 0 1.10px black")
d3.select("div").style("background-image","linear-gradient(20deg, gray,black)");
d3.select("body").style("background-color","black").style("color","white");

var svg = d3.select('div').append('svg');
svg
  .append('circle')
  .attr('cx', '50%')
  .attr('cy', '50%')
  .attr('r', 20)
  .style('fill', 'url(#NegroBlanco)');
/*svg
  .append('square')
  .attr('cx','20%')
  .attr('cy','20%')
  .attr
*/
/*
const data= [35,15,15,35]

const cosa=d3.select('div')
const width=120
const height=120
const radius=30
const colorScale=d3.scaleOrdinal([ '#121212','#234512','#895645','#124589' ])
const svg = cosa.append('svg')
  .attr('width',width)
  .attr('height',height)
  .append('g')
    .attr('transform',`translate(${width/2},${height/2})`)

const pie = d3.pie().value(d=>d).sort(null)
const arc = d3.arc()
  .outerRadius(radius)
  .innerRadius(15)
/*  .startAngle(0)
  .endAngle(Math.PI)

const g = svg.selectAll('.arc')
  .data(pie(data))
  .enter().append('g')
  .attr('class','arc')

g.append('path')
  .attr('d',arc)
  .attr('class','arc')
  .style('fill',(d,i)=>colorScale(i))
  .style('stroke','#221243')
  .style('stroke-width',3)
*/


// Tratamiento de los datos obtenidos desde un CSV
// Para comenzar, los datos del CSV se obtinen con
// el método d3.csv(<filename>), y se almacenarán
// en una vaiable constante.

var AlumniData= [];

// Función principal del script

const recarga = function(){
  d3.csv("info_students.csv",d=>{
    AlumniData.push(d);
  }).then(function(){
    redibuja()
  });
}


// Función principal segunda del script

var redibuja = function (){
  console.log("Dibujando")
  AlumniData.map(i=>{
    if(!noNull(i.pet)){
      console.log(i);
    }
  })
  histograma_h1(AlumniData,"age","#Tabla0Alumni","Edades de los elementos")
  AlumniAge=frecuencia(AlumniData,"age");
  d3.histogram()
    .value(AlumniAge)
  histograma_h0(Object.values(AlumniAge),"#Tabla1Alumni","Frecuencia de personas por edades",3);

};


// UTILIDADES DEL PROGRAMA


const noNull = i=>{
  if(i===null || i===undefined || i==="" || i==="n"){
    return 0;
  }else{
    return 1;
  }
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
  //console.log(histArray);
  console.log(histArray)
  return histArray;
}


const histograma_h0 = (i,leDiv,leTitle)=>{
  // Le decimos sobre qué elemento vamos a operar
  d3.select(leDiv)
  // Agergamos un div
    .append("div")
  // Cambiamos sus caractrísticas CSS
    .style('background-color','white')
    .style('color','black')
  // Le asignamos un valor al contenido
    .text(leTitle)

  Nbin=i.length;

  min = d3.min(i);
  max = d3.max(i);
  domain = [min,max]; 
  var margin = { top: 30, right: 30, bottom: 30, left: 50 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;
  var x = d3
  .scaleLinear()
  .domain(domain)
  .range([0, width]);
  var histogram = d3
  .histogram()
  .domain(x.domain()) // then the domain of the graphic
  .thresholds(x.ticks(Nbin)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(i);
  var svg = d3
  .select(leDiv)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));
  var y = d3
  .scaleLinear()
  .range([height, 0])
  .domain([
    0,
    d3.max(bins, function(d) {
      return d.length;
    })
  ]);

  svg.append("g").call(d3.axisLeft(y));
  svg
  .selectAll("rect")
  .data(bins)
  .enter()
  .append("rect")
  .attr("x", 1)
  .attr("transform", function(d) {
    return "translate(" + x(d.x0) + "," + y(d.length) + ")";
  })
  .attr("width", function(d) {
    return x(d.x1) - x(d.x0) - 1;
  })
  .attr("height", function(d) {
    return height - y(d.length);
  })
  .style("fill", "#69b3a2");
}

const histograma_h1 =(i,k,leDiv,leTitle)=>{
  // Le decimos sobre qué elemento vamos a operar
  d3.select(leDiv)
  // Agergamos un div
    .append("div")
  // Cambiamos sus caractrísticas CSS
    .style('background-color','white')
    .style('color','black')
  // Le asignamos un valor al contenido
    .text(leTitle)

  
  // Le decimos sobre qué elemento vamos a operar.
  d3.select(leDiv)
  // Operará sobre todos los div que existan en el contenedor
  // Así, cada nuevo div creado se volverá el nuevo elemento
  // operando.
    .selectAll("div")
  // Le decimos cuales serán los datos objetivos que se usarán
  // dentro de las siguientes definiciones.
    .data(i)
  // Le damos indicio de que será una entrada de datos que
  // deberá asignar a cada nuevo elemento creado.
    .enter()
  // Añaimos un elemento div para crear la barra del
  // histograma
    .append("div")
  // Le damos forma y color
    .style(
      "background-color",d=>{
      let leG=12*d[k]-12*d[k];
      return 'rgb(186,'+leG+',182)'})
    .style("margin",'7px')
    .style('height','20px')
  // En esta parte, el ancho se relaciona al valor de interés
    .style('width',d=>{
      return d[k]*3 + "%";
    })
  // Se agrega el texto de interés]
  // en este caso, el valor de la variable
    .text(d=>{
      return d[k];
    })
    .style("text-align","center");
}

recarga();
