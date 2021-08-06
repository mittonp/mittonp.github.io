var data;
var width = $("#my_dataviz").width() / 1.2;
var height = $("#my_dataviz").height();

// append the svg object to the body of the page
var lsvg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("style", "overflow:visible;")
  .attr("width", width)
  .attr("height", height)
  .append("g");

var areagraph = lsvg
  .append("path")
  .attr("class", "areagraph")
  .attr("transform", "scale(1.2,1)")
  .attr("transform-origin", "center")
  .attr("fill", "url(#graphgradient)")
  .attr("stroke-width", 1.5);

xAxisElement = lsvg
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0,30)");
yAxisElement = lsvg
  .append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(" + width + ",0)")
  .attr("height", height / 1.1);

x = d3.scaleLinear().range([0, width]);
y = d3.scaleLinear().range([height, 0]);

var area = d3
  .area()
  .curve(d3.curveBasis)
  .x(function (d) {
    return x(d.year);
  })
  .y0(y(0))
  .y1(function (d) {
    return y(d.value);
  });

yAxis = d3.axisLeft(y).ticks(6).tickFormat(d3.format(".0s"));

xAxis = d3.axisTop(x).ticks(5).tickFormat(d3.format("d")).tickSize(-height);

var linGrad = lsvg
  .append("linearGradient")
  .attr("id", "graphgradient")
  .attr("y1", "50%")
  .attr("y2", "50%")
  .attr("x1", "100%")
  .attr("x2", "0%");

linGrad
  .append("stop")
  .attr("offset", "0%")
  .style("stop-color", "#2B8BF8")
  .style("stop-opacity", "1");
linGrad
  .append("stop")
  .attr("offset", "100%")
  .style("stop-color", "#12D0E1")
  .style("stop-opacity", "1");

//Read the data
d3.json(
  "/vviz3/overall-trend.json",

  // Now I can use this dataset:
  function (dataret) {
    data = dataret;
    //doctor the pre 2016 data:
    // data.forEach((element) => {
    //   if (element.year < 2016) {
    //     element.value = element.value * 0.7;
    //   }
    // });
    updateData(Math.pow(2, 1) + 3);
    updateData(Math.pow(2, 1) + 3);
  }
);

function updateData(howFar, transition) {
  var newData = data.slice(0, howFar);
  if (howFar > data.length) {
    newData = data;
  }

  x.domain(
    d3.extent(newData, function (d) {
      return d.year;
    })
  );

  y.domain([
    0,
    d3.max(newData, function (d) {
      return +d.value;
    }),
  ]);

  areagraph.transition().duration(transition).attr("d", area(newData));

  yAxisElement.transition().duration(750).call(yAxis);

  yAxisElement
    .selectAll(".tick line")
    .attr("stroke", "#e95a49")
    .attr("stroke-width", "4");

  yAxisElement
    .selectAll("text")
    .attr("fill", "#e95a49")
    .attr("font-family", "Gotham Medium")
    .attr("font-size", "14");

  xAxisElement.transition().duration(750).call(xAxis);

  xAxisElement
    .selectAll("text")
    .attr("fill", "#e95a49")
    .attr("font-family", "Gotham Medium")
    .attr("font-size", "14");

  xAxisElement
    .selectAll("line")
    .attr("stroke", "rgba(40,177,232,0.4)")
    .attr("y2", height)
    .attr("transform", "translate(-25,-30)");

  x.domain(
    d3.extent(newData, function (d) {
      return d.year;
    })
  );

  y.domain([
    0,
    d3.max(newData, function (d) {
      return +d.value;
    }),
  ]);
}
