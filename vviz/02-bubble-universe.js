var bubbleInit = function () {
  var skrollrInstance = skrollr.init();
  var tooltip = d3
    .select("#bubble-universe-canvas")
    .append("div")
    .attr("class", "tooltip");

  var showTooltip = function (d) {
    console.log("Show tooltip", d.name);
    tooltip.transition().duration(200);
    tooltip
      .style("opacity", 1)
      .html(d.name + " " + d.size)
      .style("left", d3.mouse(this)[0] + 30 + "px")
      .style("top", d3.mouse(this)[1] + 30 + "px")
      .style("display", "block");
  };
  var moveTooltip = function (d) {
    console.log("Move tooltip", d.name);
    tooltip
      .style("left", d3.mouse(this)[0] + "px")
      .style("top", d3.mouse(this)[1] - 35 + "px");
  };
  var hideTooltip = function (d) {
    console.log("Hide tooltip", d.name);
    //tooltip.transition().duration(200).style("opacity", 0);
    tooltip.style("display", "none");
  };

  var node;
  var sumu;
  var t = d3.transition().duration(750);
  var currentData;
  var size = d3
    .scaleSqrt()
    .domain([0, 200000])
    .range([3, window.innerHeight / 3.6]);
  var graph;
  var redraw;
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
  var width = window.innerWidth,
    height = window.innerHeight,
    sizeDivisor = 100,
    nodePadding = 2.5;

  width = $(".section-canvas-container").first().width();
  height = $(".section-canvas-container").first().height();

  d3.selectAll("svg").remove();

  var svg = d3
    .select(".bubbles")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

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

  var simulation = d3
    .forceSimulation()
    .force(
      "forceX",
      d3
        .forceX()
        .strength(0.05)
        .x(width * 0.5)
    )
    .force(
      "forceY",
      d3
        .forceY()
        .strength(0.05)
        .y(height * 0.5)
    )
    .force(
      "center",
      d3
        .forceCenter()
        .x(width * 0.5)
        .y(height * 0.5)
    )
    .force("charge", d3.forceManyBody().strength(-15));

  d3.json("data.json", function (data) {
    // sort the nodes so that the bigger ones are at the back
    graph = getYearData(data, 2004);

    //update the simulation based on the data
    sumu = function () {
      simulation
        .nodes(graph)
        .force(
          "collide",
          d3
            .forceCollide()
            .strength(0.5)
            .radius(function (d) {
              return size(d.size) + nodePadding;
            })
            .iterations(1)
        )
        .on("tick", function (d) {
          node
            .attr("cx", function (d) {
              return d.x;
            })
            .attr("cy", function (d) {
              return d.y;
            })
            .attr("r", function (d) {
              return size(d.size);
            });
        });
    };

    sumu();

    redraw = function (year) {
      currentData = getYearData(data, year);
      for (let index = 0; index < currentData.length; index++) {
        graph[index].size = currentData[index].size;
      }
      sumu();
    };

    node = svg
      .append("g")
      .attr("class", "node")
      .selectAll("g")
      .data(graph)
      .enter()
      .append("g")
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      })
      .append("circle")
      .attr("r", function (d) {
        return size(d.size);
      })
      .attr("fill", function (d) {
        return d.color;
      })
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      })
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip);

    svg
      .select("g")
      .selectAll("g")
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      });

    var circle = svg
      .selectAll("circle")
      .transition(t)
      .attr("r", function (d) {
        return size(d.size);
      });
  });

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0.03);
    d.fx = null;
    d.fy = null;
  }

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
    redraw(year);
  }

  window.onscroll = function (e) {
    debounce(handleScroll, 100);
  };

  $(document.body).on("touchmove", function (e) {
    debounce(handleScroll, 100);
  });
};
