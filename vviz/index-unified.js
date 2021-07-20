var sections = $(".section-canvas");
var detachedSections = sections.detach();
var scrollY = window.scrollY;
var scrollYCount = 0;
var skrollrInstance = skrollr.init();
skrollrInstance.on("render", function (d) {
  console.log(d);
});

var currentSection = "#landing-canvas";
//var currentSection = "#bubble-universe-canvas";

var setSection = function (target) {
  currentSection = target;
  $(".section-canvas").detach();
  var section = $(detachedSections).filter(target);

  $("#section-container").prepend(section);

  var progressIndicators = $(".progress-indicator__bullet");
  progressIndicators.removeClass("progress-indicator__bullet--active");
  var bullet = $(
    ".progress-indicator__bullet[data-target='" + target + "']"
  )[0];
  $(bullet).addClass("progress-indicator__bullet--active");
  skrollrInstance.setScrollTop(0, true);
  skrollrInstance.refresh();
  if (target == "#bubble-universe-canvas") {
    skrollrInstance.destroy();
    bubbleInit(null);
  }

  if (target == "#landing-canvas") {
  }

  if (target == "#force-directed-map-canvas") {
    initForce();
  }

  if (target == "#summary-canvas") {
    initSummary();
  }
};

var nextSection = function () {
  console.log("Go to next section after " + currentSection);
  var nextSectionName = $(".progress-indicator__bullet--active")
    .next()
    .attr("data-target");
  setSection(nextSectionName);
};

$(".progress-indicator__bullet").click(function (e) {
  var target = e.target.attributes["data-target"].nodeValue;
  setSection(target);
});

$("#scroll-button").click(function (e) {
  // var maxScrollTop = skrollr.init().getMaxScrollTop();
  // var scrollTop = skrollr.init().getScrollTop();
  // skrollr.init().setScrollTop(scrollTop + 200);
  // if (scrollTop > maxScrollTop) {
  //   $("#scroll-button").hide();
  //   $("#next-button").show();
  // }
});

$("#next-button").click(function (e) {
  $("#scroll-button").show();
  $("#next-button").hide();
  nextSection();
});

setSection(currentSection);
