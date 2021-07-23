$(document).ready(function () {
  var sections = $(".section-canvas");
  var detachedSections = sections.detach();
  var skrollrInstance = skrollr.init();

  var currentSection = "#landing-canvas";

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
    skrollrInstance.off("beforerender");
    skrollrInstance.off("afterrender");
    skrollrInstance.setScrollTop(0, true);
    skrollrInstance.refresh();
    if (target == "#bubble-universe-canvas") {
      bubbleInit(controls);
    }

    if (target == "#landing-canvas") {
      landingInit(controls);
    }

    if (target == "#force-directed-map-canvas") {
      initForce(controls);
    }

    if (target == "#summary-canvas") {
      initSummary(controls);
    }
  };

  var nextSection = function () {
    var nextSectionName = $(".progress-indicator__bullet--active")
      .next()
      .attr("data-target");
    setSection(nextSectionName);
  };

  var previousSection = function () {
    var previousSectionName = $(".progress-indicator__bullet--active")
      .prev()
      .attr("data-target");
    setSection(previousSectionName);
  };

  var controls = {
    nextSection: nextSection,
    skrollrInstance: skrollrInstance,
    previousSection: previousSection,
  };

  $(".progress-indicator__bullet").click(function (e) {
    var target = e.target.attributes["data-target"].nodeValue;
    setSection(target);
  });

  setSection(currentSection);
});
