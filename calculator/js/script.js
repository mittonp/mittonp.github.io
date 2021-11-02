const columnsPerSmall = 3;
const columnsPerMedium = 5;
const columnsPerLarge = 8;
var shareUrl;
model = {
  purchasePrice: 7850000,
  totalLoan: 5102500,
  stampDuty: 392500,
  valuationCost: 0,
  solicitorCost: 0,
  otherPurchasingCosts: 0,
  netRentalIncome: 514000,
  rentalIncreases: 3,
  termOfOwnership: 10,
  loanInterestRate: 3,
  debtReduction: false,
  profitNotForDebtReduction: 0
}


jQuery(function () {
  jQuery('[data-toggle="tooltip"]').tooltip()
})

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
        Math.abs(amount - i)
          .toFixed(decimalCount)
          .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

function getMoney(amount, money = true) {
  if (money) {
    return parseFloat(amount.replace(/\$/g, "").replace(/,/g, ""));
  } else {
    return parseFloat(amount.replace(/%/g, ""));
  }
}

function getRowHtml(data, termOfOwnership, format) {
  var total = 0;
  var html = "";
  html += "<div class='row expense'>";
  html +=
    "<div class='col-3 col-sm-2'><div class='item-title'>" +
    data[0] +
    "</div></div>";
  for (var j = 1; j <= termOfOwnership; j++) {
    var dataItem = data[j];
    total += dataItem;
    if (format == "currency") { dataItem = "$" + formatMoney(dataItem); }
    if (format == "percentage") { dataItem = formatMoney(dataItem * 100) + "%"; }
    html +=
      "<div class='col-3 col-sm-3 col-md-2 col-xl-1'><div class='item'>" +
      dataItem +
      "</div></div>";
  }

  var avg = total / termOfOwnership;
  if (format == "currency") { avg = "$" + formatMoney(avg); }
  if (format == "percentage") { avg = formatMoney(avg * 100) + "%"; }
  if (format == "text") { avg = "Average"; }

  html +=
    "<div class='col-3 col-sm-2'><div class='item-title end-column'>" +
    avg +
    "</div></div>";


  html += "</div>";
  return html;
}

function linkClickerDots() {
  jQuery(".mobile_clicker > .dot")
    .off("click")
    .on("click", function (e) {
      jQuery(".mobile_clicker > .active").removeClass("active");
      jQuery(this).addClass("active");

      var index = jQuery(this).data("index");
      var step = columnsPerSmall;
      if (jQuery(window).width() >= 768) {
        step = columnsPerMedium;
      }
      if (jQuery(window).width() >= 1200) {
        step = columnsPerLarge;
      }

      var from = index * step;
      var to = from + step;

      jQuery(".sg-cal-wrap .show_tables .row").each(function (e) {
        jQuery(this)
          .find(".col-xl-1")
          //.find(".data-column")
          .each(function (index) {
            jQuery(this).hide();
            if (index >= from && index < to) {
              jQuery(this).show();
            }
          });
      });
    });
}

function updateFields() {
  purchasePrice = getMoney(jQuery("#purchase-price").val());
  totalLoan = getMoney(jQuery("#total-loan").val(), false) / 100.0 * purchasePrice;
  deposit = purchasePrice - totalLoan;
  stampDuty = getMoney(jQuery("#stamp-duty").val());
  valuationCost = getMoney(jQuery("#valuation-cost").val());
  solicitorCost = getMoney(jQuery("#solicitor-cost").val());
  otherPurchasingCosts = getMoney(
    jQuery("#other-purchasing-costs").val()
  );
  totalCashRequired = deposit + stampDuty + valuationCost + solicitorCost + otherPurchasingCosts;
  netRentalIncome = getMoney(jQuery("#net-rental-income").val());
  rentalIncreases = getMoney(jQuery("#rental-increases").val());
  termOfOwnership = getMoney(jQuery("#term-of-ownership").val(), false);
  loanInterestRate = getMoney(jQuery("#loan-interest-rate").val(), false);
  debtReduction = jQuery("#debt-reduction").prop('checked');
  profitNotForDebtReduction = getMoney(jQuery("#profit-not-for-debt-reduction").val(), false);

  model = {
    purchasePrice: purchasePrice,
    totalLoan: totalLoan,
    stampDuty: stampDuty,
    valuationCost: valuationCost,
    solicitorCost: solicitorCost,
    otherPurchasingCosts: otherPurchasingCosts,
    netRentalIncome: netRentalIncome,
    rentalIncreases: rentalIncreases,
    termOfOwnership: termOfOwnership,
    loanInterestRate: loanInterestRate,
    debtReduction: debtReduction,
    profitNotForDebtReduction: profitNotForDebtReduction
  }

  windowWidth = jQuery(window).width();

  columns = columnsPerSmall;

  if (windowWidth >= 768) {
    columns = columnsPerMedium;
  }

  if (windowWidth >= 1200) {
    columns = columnsPerLarge;
  }

  tablePages = model.termOfOwnership / columns;

  jQuery(".mobile_clicker").empty();

  if (tablePages > 1) {
    for (let index = 0; index < tablePages; index++) {
      jQuery(".mobile_clicker").append("<span class='dot' data-index='" + index + "'></span>")
    }

    jQuery(".mobile_clicker .dot").first().addClass("active");
  }



  linkClickerDots();

  jQuery(".sg-cal-wrap .show_tables .row").each(function (e) {
    jQuery(this)
      .find(".col-xl-1")
      .each(function (index) {
        jQuery(this).hide();
        if (index < columns) {
          jQuery(this).show();
        }
      });
  });




  jQuery("#total-loan").selectmenu();
  var yieldOptions = jQuery(".yield-option");
  yieldOptions.map(function (a, b) {
    item = jQuery(b);
    var yield = getMoney(item.val(), false) / 100.0;
    item.text(
      "$" + formatMoney(purchasePrice * yield) + " (" + item.val() + ")"
    );
  });
  jQuery("#total-loan").selectmenu("refresh");

  jQuery("#deposit").text("$" + formatMoney(deposit, 2));

  jQuery("#total-cash-required").text(
    "$" + formatMoney(totalCashRequired, 2)
  );

  jQuery(".term-number").text(termOfOwnership);
}

jQuery(document).ready(function () {

  //Check if there's a model embedded in the URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const uModel = urlParams.get('m');
  if (uModel) {
    model = JSON.parse(atob(uModel));
    showResults();
  }
  console.log(atob(uModel));

  //Hydrate the form from the model
  jQuery("#purchase-price").val(model.purchasePrice);
  jQuery("#term-of-ownership").val(model.termOfOwnership);

  //Prepare the form
  var yieldOptions = jQuery(".yield-option");
  purchasePrice = getMoney(jQuery("#purchase-price").val());
  yieldOptions.map(function (a, b) {
    item = jQuery(b);
    var yield = getMoney(item.val(), false) / 100.0;
    item.text(
      "$" + formatMoney(purchasePrice * yield) + " (" + item.val() + ")"
    );
  });
  jQuery("#total-loan").selectmenu();
  jQuery(".select-menu").on("selectmenuchange", function (event, ui) { updateFields(); })
  jQuery(".input").on("change", function (e) { updateFields(); })



  updateFields();


  var accessToken = "b85e7501087ddced06355f09a23aec9fb016444f";

  jQuery("#btn-share").on("click", function () {
    var chunk = btoa(JSON.stringify(model));
    var shareUrl = window.location.href.split('?')[0] + "?m=" + chunk;
    var params = {
      "long_url" : shareUrl
    };

    jQuery.ajax({
      url: "https://api-ssl.bitly.com/v4/shorten",
      cache: false,
      dataType: "json",
      method: "POST",
      contentType: "application/json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
      },
      data: JSON.stringify(params)
    }).done(function(data) {
      navigator.clipboard.writeText(data.link);
      window.alert("Link copied");
    }).fail(function(data) {
      console.log(data);
    });


  })


  var data = [];



  jQuery(".currency")
    .off("blur")
    .on("blur", function (e) {
      jQuery(this).val("$" + formatMoney(jQuery(this).val(), 2));
    });

  jQuery(".currency")
    .off("focus")
    .on("focus", function (e) {
      var value = jQuery(this).val();

      value = getMoney(value).toFixed(2);
      jQuery(this).val(value);
    });

  jQuery(".percent")
    .off("blur")
    .on("blur", function (e) {
      jQuery(this).val(jQuery(this).val() + "%");
    });

  jQuery(".percent")
    .off("focus")
    .on("focus", function (e) {
      jQuery(this).val(jQuery(this).val().replace("%", ""));
    });

  jQuery(".percent").trigger("blur");
  jQuery(".currency").trigger("blur");

  //Click Get your forecast
  jQuery("#btn-calculator")
    .off("click")
    .on("click", showResults);

  //Click start over
  jQuery("#btn-next")
    .off("click")
    .on("click", function (e) {
      jQuery("#step2").hide();
      jQuery("#step1").show();
    });

  jQuery(window).resize(function (e) {
    updateFields();
  });




});

function showResults() {
  rentReceived = ["Rent Received"];
  yieldEachYear = ["Yield Each year"];
  principalRemainingStartOfYear = ["Principal Remaining (Start of Year)"];
  principalRemainingEndOfYear = ["Principal Remaining (End of Year)"];
  principalRepaid = ["Principal Repaid"];
  interestPaid = ["Interest Paid"];
  cashFlow = ["Cash-flow (rent less interest"];
  returnOnEquity = ["Return on Equity (pure cash flow return)"];
  valueAtSameCapRate = ["Value at same Cap Rate as when  you purchased"];
  yearHeadings = [""];

  for (var i = 1; i <= model.termOfOwnership; i++) {
    yearHeadings[i] = "Year " + i;
    rentReceived[i] = model.netRentalIncome * Math.pow(1 + model.rentalIncreases / 100, i - 1);
    yieldEachYear[i] = rentReceived[i] / model.purchasePrice;
    principalRemainingStartOfYear[i] = i == 1 ? model.totalLoan : principalRemainingStartOfYear[i - 1] - principalRepaid[i - 1];
    interestPaid[i] = principalRemainingStartOfYear[i] * model.loanInterestRate / 100;
    cashFlow[i] = rentReceived[i] - interestPaid[i];
    if (model.debtReduction) {
      console.log(model.debtReduction);
      principalRepaid[i] = cashFlow[i] * (1 - model.profitNotForDebtReduction / 100);
    } else {
      principalRepaid[i] = 0;
    }
    principalRemainingEndOfYear[i] = principalRemainingStartOfYear[i] - principalRepaid[i];
    returnOnEquity[i] = cashFlow[i] / model.totalCashRequired;
    valueAtSameCapRate[i] = rentReceived[i] / yieldEachYear[1];


  }

  jQuery(".show_tables").html("");
  jQuery(".show_tables").append(getRowHtml(yearHeadings, model.termOfOwnership, "text"));
  jQuery(".show_tables").append(getRowHtml(rentReceived, model.termOfOwnership, "currency"));
  jQuery(".show_tables").append(getRowHtml(yieldEachYear, model.termOfOwnership, "percentage"));
  jQuery(".show_tables").append(getRowHtml(interestPaid, model.termOfOwnership, "currency"));
  jQuery(".show_tables").append(getRowHtml(cashFlow, model.termOfOwnership, "currency"));
  jQuery(".show_tables").append(getRowHtml(returnOnEquity, model.termOfOwnership, "percentage"));
  jQuery(".show_tables").append(getRowHtml(principalRepaid, model.termOfOwnership, "currency"));
  jQuery(".show_tables").append(getRowHtml(principalRemainingStartOfYear, model.termOfOwnership, "currency"));
  jQuery(".show_tables").append(getRowHtml(principalRemainingEndOfYear, model.termOfOwnership, "currency"));
  jQuery(".show_tables").append(getRowHtml(valueAtSameCapRate, model.termOfOwnership, "currency"));


  jQuery("#step1").hide();
  jQuery("#step2").show();


  var MONTHS = [];
  for (var i = 1; i <= model.termOfOwnership; i++) {
    MONTHS.push("Year " + i);
  }

  var config = {
    type: "line",
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: "Capital Growth",
          backgroundColor: "rgba(54, 162, 235, 0.4)",
          borderColor: "rgba(54, 162, 235, 0.4)",
          data: [],
          fill: false,
        },
        {
          label: "Amount Owing",
          backgroundColor: "rgba(255, 99, 132, 0.4)",
          borderColor: "rgba(255, 99, 132, 0.4)",
          data: [],
          fill: false,
        },

      ],
    },
    options: {
      tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || "";

            if (label) {
              label += ": $";
            }
            label += formatMoney(tooltipItem.value, 2);
            return label;
          },
        },
      },
      responsive: true,
      title: {
        display: true,
        text: "Charted Performance Over " + model.termOfOwnership + " Years",
        fontColor: "#0288ad",
      },

      hover: {
        mode: "nearest",
        intersect: true,
      },
      legend: {
        labels: {
          fontColor: "#0288ad",
          fontSize: 12,
        },
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Year",
              fontColor: "#0288ad",
            },
            beginAtZero: true,
            ticks: {
              autoSkip: false,
              fontColor: "#0288ad",
              fontSize: 12,
            },
          },
        ],
        yAxes: [
          {
            id: 0,
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Amount ($ AUD)",
              fontColor: "#0288ad",
            },
            ticks: {
              autoSkip: false,
              fontColor: "#0288ad",
              fontSize: 12,
              beginAtZero: true,
              callback: function (label, index, labels) {
                return "$" + formatMoney(label, 0);
              },
            },
          },

        ],
      },
    },
  };

  for (var i = 1; i <= model.termOfOwnership; i++) {
    config.data.datasets[0].data = [];
    config.data.datasets[1].data = [];
    for (var i = 1; i <= model.termOfOwnership; i++) {
      rval = valueAtSameCapRate[i];
      if (rval < 0) rval = 0;
      config.data.datasets[0].data.push(rval.toFixed(2));
      var rval = principalRemainingEndOfYear[i];
      if (rval < 0) rval = 0;
      config.data.datasets[1].data.push(rval.toFixed(2));


    }


  }
  if (window.myLine) {
    window.myLine.destroy();
  }
  var ctx = document.getElementById("canvas-1").getContext("2d");
  window.myLine = new Chart(ctx, config);
  window.myLine.update();
  jQuery(window).trigger("resize");
}