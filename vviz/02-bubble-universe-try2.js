// set the dimensions and margins of the graph
var width = 1400;
var height = 460;
var node;
var alphabet;
var redraw;
var svg;
var circle;
var size = d3.scaleLinear().domain([0, 200000]).range([50, 300]);
var simulation = d3
  .forceSimulation()
  .force(
    "center",
    d3
      .forceCenter()
      .x(width / 2)
      .y(height / 2)
  )
  .force("charge", d3.forceManyBody().strength(0.1));

function getYearData(alphabet, year) {
  var d1 = alphabet.sort((a, b) => b[year] - a[year]).slice(0, 40);
  var d2 = [];

  d1.forEach(function (d) {
    if (d.Category == "Shave") {
      ccolor = "url(#grad1)";
    }
    if (d.Category == "Grooming") {
      ccolor = "url(#grad2)";
    }
    if (d.Category == "Beard") {
      ccolor = "url(#grad3)";
    }
    if (d.Category == "Hair removal") {
      ccolor = "url(#grad4)";
    }
    d2.push({ name: d.Keyword, size: d[year], color: ccolor });
  });
  return d2;
}

var createSvg = function () {
  // append the svg object to the body of the page
  svg = d3
    .select(".bubbles")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  var linGrad = svg
    .append("linearGradient")
    .attr("id", "grad1")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");
  linGrad
    .append("stop")
    .attr("offset", "0%")
    .style("stop-color", "#0542d8")
    .style("stop-opacity", "1");
  linGrad
    .append("stop")
    .attr("offset", "100%")
    .style("stop-color", "#3d06b4")
    .style("stop-opacity", "1");

  linGrad = svg
    .append("linearGradient")
    .attr("id", "grad2")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");
  linGrad
    .append("stop")
    .attr("offset", "0%")
    .style("stop-color", "#ff59ae")
    .style("stop-opacity", "1");
  linGrad
    .append("stop")
    .attr("offset", "100%")
    .style("stop-color", "#d6006d")
    .style("stop-opacity", "1");

  linGrad = svg
    .append("linearGradient")
    .attr("id", "grad3")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");
  linGrad
    .append("stop")
    .attr("offset", "0%")
    .style("stop-color", "#12d0e1")
    .style("stop-opacity", "1");
  linGrad
    .append("stop")
    .attr("offset", "100%")
    .style("stop-color", "#2b8bf8")
    .style("stop-opacity", "1");

  linGrad = svg
    .append("linearGradient")
    .attr("id", "grad4")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");
  linGrad
    .append("stop")
    .attr("offset", "0%")
    .style("stop-color", "#ffc718")
    .style("stop-opacity", "1");
  linGrad
    .append("stop")
    .attr("offset", "100%")
    .style("stop-color", "#e58100")
    .style("stop-opacity", "1");
};

createSvg();

// Read data
d3.json("https://mittonp.github.io/vviz/data.json", function (data) {
  alphabet = data;

  drawCircles = function (data) {
    //update the simulation based on the data
    simulation
      .nodes(data)

      .on("tick", function (d) {
        circle
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          });
      });

    ///
    ///
    ///

    circle = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", function (d) {
        return size(d.size);
      })
      .attr("cx", width / 2)
      .attr("cy", height / 2)

      .style("fill", function (d) {
        return d.color;
      })
      .style("fill-opacity", 0.8)
      .attr("stroke", "black")
      .style("stroke-width", 1);

    circle
      .transition()
      .duration(500)
      .attr("r", function (d) {
        return size(d.size);
      })
      .attr("cx", function (d, c, e) {
        return e[c].getAttribute("cx");
      })
      .attr("cy", function (d, c, e) {
        return e[c].getAttribute("cy");
      });
  };

  //initial drawing
  drawCircles(getYearData(alphabet, 2004));

  function debounce(method, delay) {
    clearTimeout(method._tId);
    method._tId = setTimeout(function () {
      method();
    }, delay);
  }

  function handleScroll() {
    console.log("Scrolling");
    var top = skrollr.init().getScrollTop();
    //year = Math.round($(window).scrollTop() / 145 + 2004);
    year = Math.round(top / 145 + 2004).toString();
    $("#year").text(year.substring(2, 4));
    console.log($(window).scrollTop());
    drawCircles(getYearData(alphabet, year));
  }

  window.onscroll = function (e) {
    debounce(handleScroll, 100);
  };

  $(document.body).on("touchmove", function (e) {
    debounce(handleScroll, 100);
  });
});
