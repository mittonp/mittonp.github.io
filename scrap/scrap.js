window.onload = function () {
    var p = $(".sk-main-links a").first();
    p.addClass("dropdown");
    p.attr("href", "#");
    p.append($(".product-caret"));
    p.attr("data-toggle", "dropdown");
    var c = $(".sk-main-links li").first();
    c.append($(".product-menu"));
    $(".dropdown-header").click(function (e) {
        e.preventDefault();
        $(e.target.hash).collapse("toggle");
        e.stopPropagation();
    });
};
