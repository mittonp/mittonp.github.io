function landingInit(controls) {
  $(".next-section__button").off();
  $(".next-section__button").click(controls.nextSection);

  $("#scroll-button").off();
  $("#scroll-button").click(function (e) {
    var scrollTop = controls.skrollrInstance.getScrollTop();
    skrollr.init().setScrollTop(scrollTop + 200);
  });
}
