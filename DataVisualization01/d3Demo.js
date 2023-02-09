d3.select("div").style("color","white").style("text-shadow","0 0 1px black, 0 0 1.4px black, 0 0 1.6px black, 0 0 1.8px black,0 0 1.10px black")
d3.select("div").style("background-image","linear-gradient(20deg, gray,black)");
d3.select("body").style("background-color","black");
var svg = d3.select('div').append('svg');
svg
    .append('circle')
    .attr('cx', '50%')
    .attr('cy', '50%')
    .attr('r', 20)
    .style('fill', 'url(#NegroBlanco)');
svg.node();
