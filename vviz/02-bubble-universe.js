var simulation;
var bubbleInit = function (controls) {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  var width = $(".bubbles").first().width();
  var height = $(".bubbles").first().height();
  var currentYear = 2004;
  var scrollHeight = 2320;

  $(".section-canvas").off();
  $(".instructions").show();
  $(".section-canvas").click(function () {
    $(".instructions").hide();
  });

  $(".section-navigation__button--next").off();
  $(".section-navigation__button--next").click(controls.nextSection);

  $(".section-navigation__button--previous").off();
  $(".section-navigation__button--previous").click(controls.previousSection);

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

  function setYear(year) {
    currentYear = year;
    $(".year-button").removeClass("active");
    $(".year-button .year-button__text:contains('" + year + "')")
      .parent()
      .addClass("active");
    $(".year-label").removeClass("active");
    $(".year-label:contains('" + year + "')").addClass("active");
  }

  $(".year-button").off();
  $(".year-button").click(function (e) {
    setYear(e.target.innerText);
    controls.skrollrInstance.setScrollTop(
      (scrollHeight / 16) * (currentYear - 2004)
    );
  });

  var t;
  var tooltip = d3.select(".tooltip");
  var showTooltip = function (d) {
    tooltip.transition().duration(200);
    tooltip
      .style("opacity", 1)
      .html(d.name + "<br/>" + numberWithCommas(d.size) + " searches")
      .style("top", d.y + "px");

    tooltip.style("left", function () {
      if (d.x > width / 2) {
        return d.x - tooltip.nodes()[0].getClientRects()[0].width + "px";
      }
      return d.x + "px";
    });
  };

  var hideTooltip = function (d) {
    tooltip.style("opacity", 0);
  };

  t = d3.transition().duration(750);
  var currentData;
  var size = d3
    .scaleSqrt()
    .domain([0, 200000])
    .range([3, Math.sqrt(height * width) / 4]);
  var graph;
  function getYearData(alphabet, year) {
    var d1 = alphabet.sort((a, b) => b[2020] - a[2020]);
    if (width > 1024) {
      d1 = d1.slice(0, 40);
    } else {
      d1 = d1.slice(0, 20);
    }

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
    )

    .force(
      "collide",
      d3
        .forceCollide()
        .strength(0.5)
        .radius(function (d) {
          return size(d.size) + nodePadding;
        })
        .iterations(1)
    );

  d3.json("https://mittonp.github.io/vviz/data.json", function (data) {
    function redraw(year) {
      setYear(year);
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
        .selectAll("svg.textnode")
        .select("circle")
        .transition()
        .duration(500)
        .attr("r", function (d) {
          return size(d.size);
        });
      simulation.nodes(graph).on("tick", function (d) {
        textNodeSvg
          .attr("x", function (d) {
            return d.x;
          })
          .attr("y", function (d) {
            return d.y;
          });
      });
      simulation.alphaTarget(0.03).restart();
    }

    graph = getYearData(data, 2004);

    textNode = svg
      .append("g")
      .attr("class", "node")
      .selectAll("svg")
      .data(graph);

    textNodeSvg = textNode
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
          d.y = Math.random() * height;
        }
        return d.y;
      })
      .attr("class", "textnode")

      .on("mouseover", showTooltip)
      .on("mouseout", hideTooltip)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    textNodeSvg
      .append("circle")
      .attr("r", function (d) {
        return size(d.size);
      })
      .attr("fill", function (d) {
        return d.color;
      });

    textNodeSvg
      .append("text")
      .text(function (d) {
        return d.name;
      })
      .attr("text-anchor", "middle");

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

    function handleScroll() {
      var top = controls.skrollrInstance.getScrollTop();
      currentYear = Math.round(top / 145 + 2004).toString();
      if (currentYear > 2020) {
        currentYear = "2020";
      }
      try {
        $("#year").text(currentYear.substring(2, 4));
      } catch (error) {
        console.log(error);
      }

      redraw(currentYear);
    }

    function wrap(texat, width) {
      texat.each(function () {
        var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
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
      handleScroll();
    });
    redraw(2004);
  });
};
