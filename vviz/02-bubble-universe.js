var bubbleInit = function (controls) {
  var width = $(".bubbles").first().width();
  var height = $(".bubbles").first().height();
  var currentYear = 2004;
  var scrollHeight = 2320;
  $(".next-section__button").off();
  $(".next-section__button").click(controls.nextSection);

  $("#scroll-button").off();
  $("#scroll-button").click(function (e) {
    //go to next year
    if (currentYear < 2020) {
      currentYear++;
      controls.skrollrInstance.setScrollTop(
        (scrollHeight / 16) * (currentYear - 2004)
      );
    } else {
      controls.skrollrInstance.setScrollTop(scrollHeight + 200);
    }
  });
  var t;
  var simulation;

  var tooltip = d3
    .select("#bubble-universe-canvas")
    .append("div")
    .attr("class", "tooltip");

  var showTooltip = function (d) {
    var radius = size(d.size);
    console.log("Show tooltip", d.name);
    tooltip.transition().duration(200);
    tooltip
      .style("opacity", 1)
      .html(d.name + " " + d.size)
      // .style("left", d3.mouse(this)[0] + 30 + "px")
      // .style("top", d3.mouse(this)[1] + 30 + "px")
      .style("left", d.x + radius + "px")
      .style("top", d.y + 30 + "px")
      .style("display", "block");
  };
  var moveTooltip = function (d) {
    console.log("Move tooltip", d.name);
    // tooltip
    //   .style("left", d3.mouse(this)[0] + "px")
    //   .style("top", d3.mouse(this)[1] - 35 + "px");
  };
  var hideTooltip = function (d) {
    console.log("Hide tooltip", d.name);
    tooltip.style("display", "none");
  };

  var node;
  var sumu;
  t = d3.transition().duration(750);
  t.on("end", function () {
    simulation.restart();
  });
  var currentData;
  var size = d3
    .scaleSqrt()
    .domain([0, 200000])
    .range([3, Math.sqrt(height * width) / 4]);
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
  var nodePadding = 2.5;

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

  simulation = d3
    .forceSimulation()
    .force(
      "forceX",
      d3
        .forceX()
        .strength(80 / width)
        .x(width * 0.5)
    )
    .force(
      "forceY",
      d3
        .forceY()
        .strength(80 / height)
        .y(height * 0.5)
    );
  // .force(
  //   "center",
  //   d3
  //     .forceCenter()
  //     .x(width * 0.5)
  //     .y(height * 0.5)
  // );
  // .force("charge", d3.forceManyBody().strength(-15));

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
          textNode
            .attr("x", function (d) {
              return d.x;
            })
            .attr("y", function (d) {
              return d.y;
            });

          textNode
            .select("circle")

            .attr("r", function (d) {
              return size(d.size);
            });
        });
    };

    sumu();

    redraw = function (year) {
      simulation.stop();
      currentData = getYearData(data, year);
      for (let index = 0; index < currentData.length; index++) {
        graph[index].size = currentData[index].size;
      }

      svg.selectAll("svg.textnode").style("display", function (d) {
        if (d.size == 1) return "none";
        return "block";
      });

      svg
        .selectAll("svg.textnode")
        .select("text")
        .text(function (d) {
          return d.name;
        })
        .style("display", function (d) {
          return d.size > 2000 ? "block" : "none";
        })
        .call(wrap, function (d) {
          return size(d.size);
        });

      svg
        .selectAll("circle")
        .transition(t)
        .attr("r", function (d) {
          return size(d.size);
        })
        .on("end", function () {
          simulation.restart();
          sumu();
        });
    };

    textNode = svg
      .append("g")
      .attr("class", "node")
      .selectAll("svg")
      .data(graph)
      .enter()
      .append("svg")
      .attr("x", function (d) {
        d.x = width / 2;
        if (width >= height) {
          d.x = Math.random() * width;
        }
        return d.x;
      })
      .attr("y", function (d) {
        d.y = height / 2;
        if (width < height) {
          d.y = Math.random() * width;
        }
        return d.y;
      })
      .attr("class", "textnode")

      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    textNode
      .append("circle")
      .attr("r", function (d) {
        return size(d.size);
      })
      .attr("fill", function (d) {
        return d.color;
      });

    textNode
      .append("text")
      .text(function (d) {
        return d.name;
      })
      .attr("text-anchor", "middle");

    redraw(2004);
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
    var top = controls.skrollrInstance.getScrollTop();
    currentYear = Math.round(top / 145 + 2004).toString();
    if (currentYear > 2020) {
      currentYear = 2020;
    }

    $("#year").text(currentYear.substring(2, 4));
    redraw(currentYear);
  }

  function wrap(texat, width) {
    texat.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        tspan = text
          .text(null)
          .attr("text-anchor", "middle")
          .append("tspan")
          .attr("text-anchor", "middle")
          .attr("x", 0);

      var diameter = size(text.data()[0].size) * 2;
      text.attr("dy", 0);
      width = diameter - diameter * 0.24;
      height = diameter - diameter * 0.5;
      var prevLength = 0;
      var oneLine = true;
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          lineNumber++;
          oneLine = false;
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("dy", 15)
            .attr("x", 0)
            .attr("text-anchor", "middle")
            .text(word);
        }

        prevLength = tspan.node().getComputedTextLength();
        //See if it's still too long
        if (tspan.node().getComputedTextLength() > width) {
          //It's still too long, hide the whole thing
          text.style("display", "none");
        }
      }
      if (text.node().getBBox().height > height) {
        text.style("display", "none");
      }

      if (lineNumber > 1) {
        text.attr("dy", -0.5 + "em");
      }

      if (oneLine) {
        //Only one line. We must split it if its more than one word
        words = text.text().split(/\s+/);
        if (words.length > 1) {
          //Yep, more than one word. Split it
          tspan = text
            .text(null)
            .attr("text-anchor", "middle")
            .append("tspan")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .text(words.slice(0, words.length / 2).join(" "));
          text
            .append("tspan")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("dy", 15)
            .text(words.slice(words.length / 2, words.length).join(" "));
        }
      }
    });
  }
  controls.skrollrInstance.on("beforerender", function (e) {
    debounce(handleScroll, 100);
  });
};
