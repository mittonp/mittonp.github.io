var updateData;
var area;
var areagraph;
var x;
var y;

function landingInit() {
  var data = [
    {
      year: 2004,
      value: 1
    },
    {
      year: 2005,
      value: 0
    },
    {
      year: 2006,
      value: 174400
    },
    {
      year: 2007,
      value: 117300
    },
    {
      year: 2008,
      value: 107800
    },
    {
      year: 2009,
      value: 608900
    },
    {
      year: 2010,
      value: 726300
    },
    {
      year: 2011,
      value: 837200
    },
    {
      year: 2012,
      value: 1094100
    },
    {
      year: 2013,
      value: 1068700
    },
    {
      year: 2014,
      value: 1100500
    },
    {
      year: 2015,
      value: 1554000
    },
    {
      year: 2016,
      value: 796200
    },
    {
      year: 2017,
      value: 716600
    },
    {
      year: 2018,
      value: 948300
    },
    {
      year: 2019,
      value: 967000
    },
    {
      year: 2020,
      value: 1563600
    }
  ];
  var width = $("#my_dataviz").width() / 1.2;
  var height = $("#my_dataviz").height();

  d3.selectAll(".landing-svg").remove();

  // append the svg object to the body of the page
  var lsvg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("class", "landing-svg")
    .attr("style", "overflow:visible;")
    .attr("width", width)
    .attr("height", height)
    .append("g");

  areagraph = lsvg
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
    .attr("transform", "translate(" + width * 1.05 + ",0)")
    .attr("height", height / 1.1);

  x = d3.scaleLinear().range([0, width]);
  y = d3.scaleLinear().range([height, 0]);

  area = d3
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



  updateData = function (howFar, transition) {
    var subData = data.slice(0, howFar);
    transition = 750;
    howFar = 2002 + howFar;
    if (howFar > 2020) howFar = 2020;
    var newData = data;
    if (howFar > data.length) {
      newData = data;
    }

    x.domain([2004, howFar]);

    y.domain([
      0,
      d3.max(subData, function (d) {
        return +d.value;
      }),
    ]);

    areagraph.transition().duration(transition).attr("d", area(newData));

    yAxisElement.transition().duration(750).call(yAxis);

    yAxisElement
      .selectAll(".tick line")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", "4");

    yAxisElement
      .selectAll("text")
      .attr("fill", "#ffffff")
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
  };

  updateData(Math.pow(2, 1) + 3);
}
