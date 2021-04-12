function getYearData(alphabet, year) {


    var d1 = alphabet.sort((a, b) => (b[year] - a[year])).slice(0, 40)
    ;
    var d2 = [];

    d1.forEach(function (d) {
        var ccolor = "url(#grad1)";
        if (d.Category == "Grooming") { ccolor = "url(#grad2)" };
        if (d.Category == "Beard") { ccolor = "url(#grad3)" };
        if (d.Category == "Hair removal") { ccolor = "url(#grad4)" };
        d2.push({ name: d.Keyword, size: d[year], color: ccolor })
    });
    return d2;
}
