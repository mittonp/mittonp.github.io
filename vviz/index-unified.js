var sections = $(".section-canvas");
var detachedSections = sections.detach();
var scrollY = window.scrollY;
var scrollYCount = 0;

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

  skrollr.init().destroy();

  if (target == "#bubble-universe-canvas") {
    bubbleInit();
  }

  if (target == "#landing-canvas") {
    skrollr.init();
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
  var nextSectionName = "#" + $(currentSection).next()[0].id;
  setSection(nextSectionName);
};

$(".progress-indicator__bullet").click(function (e) {
  var target = e.target.attributes["data-target"].nodeValue;
  setSection(target);
});

setSection(currentSection);

function handleScrollMain(e) {
  console.log(e.pageY);
}

window.addEventListener("wheel", (e) => {
  handleScrollMain(e);
  //setSection("#landing-canvas");
});

$(document.body).on("touchmove", function (e) {
  debounce(handleScrollMain, 100);
});
