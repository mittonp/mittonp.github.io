var dontScroll = false;
$(document).ready(function () {
  // $.scrollify({
  //   section: ".section-canvas",
  //   sectionName: "section-name",
  //   updateHash: false,
  //   // standardScrollElements: ".summary-items",
  //   before: function (a, b, c) {
  //     $(".progress-indicator__bullet").removeClass(
  //       "progress-indicator__bullet--active"
  //     );
  //     $($(".progress-indicator__bullet")[a]).addClass(
  //       "progress-indicator__bullet--active"
  //     );
  //   },
  //   after: function (a) {},
  // });
  bubbleInit();
  initForce();
  initSummary();
});
