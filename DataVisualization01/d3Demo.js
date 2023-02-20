d3.select("div").style("color","white").style("text-shadow","0 0 1px black, 0 0 1.4px black, 0 0 1.6px black, 0 0 1.8px black,0 0 1.10px black")
d3.select("div").style("background-image","linear-gradient(20deg, gray,black)");
d3.select("body").style("background-color","black").style("color","white");
/*
var svg = d3.select('div').append('svg');
svg
  .append('circle')
  .attr('cx', '50%')
  .attr('cy', '50%')
  .attr('r', 20)
  .style('fill', 'url(#NegroBlanco)');
svg
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

const recarga = function(){
  d3.csv("info_students.csv",d=>{
    AlumniData.push(d);
  }).then(function(){
    redibuja()
  });
}


/*d3.select("#CSV_DUMP")
  .data(AlumniData)
  .text(d=>{return d});


d3.select("#Tabla0Alumni")
  .selectAll("tr")
  .data(AlumniData)
  .enter()
  .append("tr")
  .text(d=>{
    return d;
  })*/

var redibuja = function (){
  console.log("Dibujando")
  AlumniData.map(i=>{
    if(i.pet===null || i.pet===undefined || i.pet===""){
      console.log(i);
    }
  })
};

recarga();
