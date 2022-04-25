window.addEventListener("load", function () {
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

  var alphabet = [];
  $.getJSON("https://mittonp.github.io/vviz/data.json", function (json) {
    alphabet = json;
    redraw(getYearData(alphabet, 2004));
  });

  var year = 2004;

  // var width = window.innerWidth,
  //   height = window.innerHeight;

  var width = 1000,
    height = 800;

  // var width = $(".bubbles").first().width(),
  //   height = $(".bubbles").first().height();

  var svg = d3
    .select(".bubbles")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "fixed");
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

  var tooltip = d3
    .select("#bubble-universe-canvas")
    .append("div")
    .attr("class", "tooltip");

  var showTooltip = function (d) {
    console.log("Show tooltip", d.data.name);
    tooltip.transition().duration(200);
    tooltip
      .style("opacity", 1)
      .html(d.data.name + " " + d.data.size)
      .style("left", d3.mouse(this)[0] + 30 + "px")
      .style("top", d3.mouse(this)[1] + 30 + "px")
      .style("display", "block");
  };
  var moveTooltip = function (d) {
    console.log("Move tooltip", d.data.name);
    tooltip
      .style("left", d3.mouse(this)[0] + "px")
      .style("top", d3.mouse(this)[1] - 35 + "px");
  };
  var hideTooltip = function (d) {
    console.log("Hide tooltip", d.data.name);
    //tooltip.transition().duration(200).style("opacity", 0);
    tooltip.style("display", none);
  };

  var pack = d3.pack().size([width, height]).padding(25);

  function redraw(classes) {
    // transition
    var t = d3.transition().duration(750);

    // hierarchy
    var h = d3.hierarchy({ children: classes }).sum(function (d) {
      return d.size;
    });

    //JOIN
    var circle = svg.selectAll("circle").data(pack(h).leaves(), function (d) {
      return d.data.name;
    });

    var text = svg.selectAll("text").data(pack(h).leaves(), function (d) {
      return d.data.name;
    });

    //EXIT
    circle.exit().transition(t).attr("r", 1e-6).remove();

    text.exit().transition(t).remove();

    //UPDATE
    circle
      .transition(t)
      .attr("r", function (d) {
        return d.r + 2;
      })
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });

    text
      .transition(t)
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      })
      .style("display", function (d) {
        if (d.r < 50) {
          return "none";
        }
      });

    //ENTER
    circle
      .enter()
      .append("circle")
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip)
      .attr("r", 1e-6)
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      })
      .style("fill", function (d) {
        return d.data.color;
      })
      .transition(t)
      .attr("r", function (d) {
        return d.r + 2;
      });

    text
      .enter()
      .append("text")
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip)
      .attr("x", function (d) {
        return d.x;
      })
      .attr("y", function (d) {
        return d.y;
      })
      .text(function (d) {
        return d.data.name;
      })
      .transition(t)
      .style("display", function (d) {
        if (d.r < 50) {
          return "none";
        }
      });
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
    redraw(getYearData(alphabet, year));
  }

  window.onscroll = function (e) {
    debounce(handleScroll, 100);
  };

  $(document.body).on("touchmove", function (e) {
    debounce(handleScroll, 100);
  });
});
