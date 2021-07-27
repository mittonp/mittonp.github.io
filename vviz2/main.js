$(document).ready(function () {
  $.scrollify({
    section: ".section-canvas",
    updateHash: false,
    before: function (a) {
      $(".progress-indicator__bullet").removeClass(
        "progress-indicator__bullet--active"
      );
      $($(".progress-indicator__bullet")[a]).addClass(
        "progress-indicator__bullet--active"
      );
      if (a == 3) {
        $(".summary-nav, .summary-top").addClass("fixed");
      } else {
        $(".summary-nav, .summary-top").removeClass("fixed");
      }
    },
    standardScrollElements: ".long-text",
  });
  bubbleInit();
  initForce();
});
