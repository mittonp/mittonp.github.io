var dontScroll = false;
$(document).ready(function () {
  $.scrollify({
    section: ".scroll-section",
    updateHash: false,
    // standardScrollElements: ".main-text",
    before: function (a, b, c) {
      $("#landing-canvas").removeClass("scroll-0");
      $("#landing-canvas").removeClass("scroll-1");
      $("#landing-canvas").removeClass("scroll-2");
      $("#landing-canvas").removeClass("scroll-3");
      $("#landing-canvas").addClass("scroll-" + a);
      $(".progress-indicator__bullet").removeClass(
        "progress-indicator__bullet--active"
      );
      $($(".progress-indicator__bullet")[a]).addClass(
        "progress-indicator__bullet--active"
      );

      if (!b[a].hasClass("summary-item")) {
        $(".summary-top, .summary-nav").removeClass("fixed");
      }
      $(".summary-nav__item").removeClass("active");
      var target = $(b[a])[0].id;
      var targetNavItem = $('*[data-target="' + target + '"]');
      targetNavItem.addClass("active");
    },
    after: function (a, b) {
      if (b[a].hasClass("summary-item")) {
        $(".summary-top, .summary-nav").addClass("fixed");
      }
    },
  });
  bubbleInit();
  initForce();

  $(".search-volume").counterUp();
});
