var initSummary = function (controls) {
  $(".section-navigation__button--previous").off();
  $(".section-navigation__button--previous").click(controls.previousSection);
  scrollSpy("#summary-nav", {
    sectionClass: ".summary-item",
    menuActiveTarget: ".summary-nav__item",
    offset: 100,
    scrollContainer: "#summary-canvas",
  });
};
