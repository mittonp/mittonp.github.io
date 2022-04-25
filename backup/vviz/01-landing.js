function landingInit(controls) {
  controls.skrollrInstance.off();
  $(".section-navigation__button--next").off();
  $(".section-navigation__button--next").click(controls.nextSection);

  $("#scroll-button").off();
  $("#scroll-button").click(function (e) {
    var scrollTop = controls.skrollrInstance.getScrollTop();
    controls.skrollrInstance.setScrollTop(scrollTop + 200);
  });
}
