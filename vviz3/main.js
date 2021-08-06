var scrolling = false;
var currentSlide = 0;
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
      if (!b[a].hasClass("summary-item")) {
        $(".summary-top, .summary-nav").removeClass("fixed");
      }
      if (a >= 0 && a <= 3) {
        var duration = a < currentSlide ? 0 : 740;
        updateData(Math.pow(2, a + 1) + 3, duration);
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
      currentSlide = a;
      if (b[a].hasClass("summary-item")) {
        $(".summary-top, .summary-nav").addClass("fixed");
      }
      if (!b[a].hasClass("summary-item")) {
        $(".summary-top, .summary-nav").removeClass("fixed");
      }
    },
  });

  landingInit();
  bubbleInit();
  initForce();

  $(".search-volume").counterUp();
  $(window).resize(function () {
    landingInit();
    bubbleInit();
    initForce();
  });
});
