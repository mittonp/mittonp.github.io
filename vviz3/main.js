var scrolling = false;
$(document).ready(function () {
  $(".summary-nav__item, .progress-indicator__bullet").click(function (e) {
    var target = e.target.getAttribute("data-target");
    $.scrollify.move("#" + target);
    console.log(target);
  });

  $.scrollify({
    section: ".scroll-section",
    updateHash: false,
    sectionName: "section-name",
    before: function (a, b, c) {
      $("#landing-canvas").removeClass("scroll-0");
      $("#landing-canvas").removeClass("scroll-1");
      $("#landing-canvas").removeClass("scroll-2");
      $("#landing-canvas").removeClass("scroll-3");
      $("#landing-canvas").addClass("scroll-" + a);

      if (!b[a].hasClass("summary-item")) {
        $(".summary-top, .summary-nav").removeClass("fixed");
      }

      //Nav bullets
      $(".summary-nav__item").removeClass("active");
      var target = $(b[a])[0].getAttribute("data-section-name");
      var targetNavItem = $('*[data-target="' + target + '"]');
      targetNavItem.addClass("active");

      $(".progress-indicator__bullet").removeClass(
        "progress-indicator__bullet--active"
      );
      var target = $(b[a])[0].getAttribute("data-page");
      var targetNavItem = $('*[data-page-target="' + target + '"]');
      targetNavItem.addClass("progress-indicator__bullet--active");
    },
    after: function (a, b) {
      if (b[a].hasClass("summary-item")) {
        $(".summary-top, .summary-nav").addClass("fixed");
      }
      if (!b[a].hasClass("summary-item")) {
        $(".summary-top, .summary-nav").removeClass("fixed");
      }
    },
  });

  bubbleInit();
  initForce();

  $(".search-volume").counterUp();
});
