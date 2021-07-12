window.onload = function () {
  scrollSpy("#summary-nav", {
    sectionClass: ".summary-item",
    menuActiveTarget: ".summary-nav__item",
    offset: 100,
    scrollContainer: "#summary-canvas",
  });
};
