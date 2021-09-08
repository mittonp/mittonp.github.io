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

var MAX_YEARS = 15,
  SHOW_YEARS = 10;

jQuery(document).ready(function () {
  var g = [];
  g3 = g4 = g5 = 0;

  var data = [];

  jQuery("#g3").selectmenu();

  jQuery(".currency")
    .off("blur")
    .on("blur", function (e) {
      var purchasePrice = getMoney(jQuery("#purchase-price").val()); //Purchase price - 800000
      var depositPercentage = getMoney(
        jQuery("#deposit-percentage").val(),
        false
      );

      var stampDuty = getMoney(jQuery("#stamp-duty").val());
      var valuationCost = getMoney(jQuery("#valuation-cost").val());
      var solicitorCost = getMoney(jQuery("#solicitor-cost").val());
      var otherPurchasingCosts = getMoney(
        jQuery("#other-purchasing-costs").val()
      );

      var deposit = (purchasePrice * depositPercentage) / 100;

      var totalCashRequired =
        deposit +
        stampDuty +
        valuationCost +
        solicitorCost +
        otherPurchasingCosts;

      jQuery(this).val("$" + formatMoney(jQuery(this).val(), 2));
      var yieldOptions = jQuery(".yield-option");
      yieldOptions.map(function (a, b) {
        item = jQuery(b);
        var yield = getMoney(item.val(), false) / 100.0;
        item.text(
          "$" + formatMoney(purchasePrice * yield) + " (" + item.val() + ")"
        );
      });

      jQuery("#deposit").text("$" + formatMoney(deposit, 2));
      jQuery("#total-loan").text("$" + formatMoney(purchasePrice - deposit, 2));
      jQuery("#total-cash-required").text(
        "$" + formatMoney(totalCashRequired, 2)
      );

      jQuery("#g3").selectmenu("refresh");
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

  jQuery("#btn-calculator")
    .off("click")
    .on("click", function () {
      purchasePrice = getMoney(jQuery("#purchase-price").val()); //Purchase price - 800000
      depositPercentage =
        getMoney(jQuery("#deposit-percentage").val(), false) / 100.0; //Deposit % - 30
      otherPurchasingCosts = getMoney(jQuery("#other-purchasing-costs").val()); //Additional purchasing costs 3000

      d16 = getMoney(jQuery("#d16").val()); //year 1 expected outgoings 500
      d17 = getMoney(jQuery("#d17").val()); //Year 1 miscellaneous expenses 800

      d11 = getMoney(jQuery("#d11").val(), false) / 100.0; //Loan interest rate 4

      g3 = getMoney(jQuery("#g3").val(), false) / 100.0; //Expected rental yield (net%) 6.5

      g4 = getMoney(jQuery("#g4").val(), false) / 100.0; //Rental increases % 3
      g5 = getMoney(jQuery("#g5").val()); //Expected depreciation 5000

      d5 = purchasePrice * depositPercentage; //Deposit amount
      d6 = purchasePrice - d5 + otherPurchasingCosts; //Purchase price MINUS deposit PLUS additional purchasing cost (LOAN AMOUNT)
      d12 = purchasePrice * g3; //Rent

      data["Ex1"] = [];
      data["Ex2"] = [];
      data["Ex3"] = [];
      data["Ex4"] = [];
      data["Ex1"][0] = "Loan Interest";
      data["Ex2"][0] = "Outgoings";
      data["Ex3"][0] = "Miscellaneous";
      data["Ex4"][0] = "Yearly Expenses";
      data["Ex0"] = [];
      data["Ex0"][0] = "Expenses";

      for (var i = 0; i < 13; i++) {
        data["R" + i] = [];
      }

      data["yieldEachYear"] = [];
      data["yieldEachYear"][0] = "Yield Each Year";

      data["R0"][0] = "Rent with " + (g4 * 100).toFixed() + "% increases";
      data["R1"][0] = "Depreciation";
      data["R2"][0] = "Total Cash Income Per Year"; // 24

      data["R4"][0] =
        "Capital Growth (Cap Rate " + (g3 * 100).toFixed(2) + "%)";

      data["R7"][0] = "Total Equity (Cap Rate " + (g3 * 100).toFixed(2) + "%)";

      data["R10"][0] =
        "Total Returns (Cap Rate " + (g3 * 100).toFixed(2) + "%)";

      data["R12"][0] = "Amount owing on Loan";

      for (var i = 1; i <= MAX_YEARS; i++) {
        data["Ex0"][i] = "Year " + i;
        data["R1"][i] = g5;
        i == 1
          ? (data["Ex1"][i] = d6 * d11)
          : (data["Ex1"][i] = data["R12"][i - 1] * d11);

        i == 1
          ? (data["Ex2"][i] = d16)
          : (data["Ex2"][i] = data["Ex2"][i - 1] * 1.03);

        i == 1
          ? (data["Ex3"][i] = d17)
          : (data["Ex3"][i] = data["Ex3"][i - 1] * 1.03);

        i == 1
          ? (data["R0"][i] = d12)
          : (data["R0"][i] = data["R0"][i - 1] * (1 + g4));

        data["Ex4"][i] = data["Ex1"][i] + data["Ex2"][i] + data["Ex3"][i];
        data["R2"][i] = data["R0"][i] - data["Ex4"][i];

        i == 1
          ? (data["R12"][i] = d6 - data["R2"][i] + data["Ex1"][i])
          : (data["R12"][i] =
              data["R12"][i - 1] - data["R2"][i] + data["Ex1"][i]);

        data["R4"][i] = data["R0"][i] / g3;
        data["R7"][i] = data["R4"][i] - purchasePrice;
        data["R10"][i] = data["R7"][i] + data["R2"][i];
      }

      jQuery(".show_tables").html("");
      for (var i = 0; i <= 4; i++) {
        var html = "";
        html += "<div class='row expense ex" + i + "'>";
        for (var j = 0; j <= SHOW_YEARS; j++) {
          if (j == 0) {
            html +=
              "<div class='col-3 col-sm-2'><div class='item-title'>" +
              data["Ex" + i][j] +
              "</div></div>";
          } else {
            if (i > 0) {
              var newdata = data["Ex" + i][j];
              if (newdata == 0) {
                newdata = "-";
              } else {
                newdata = formatMoney(data["Ex" + i][j], 0);
              }

              html +=
                "<div class='col-3 col-sm-3 col-md-2 col-xl-1'><div class='item'>" +
                "$" +
                newdata +
                "</div></div>";
            } else {
              html +=
                "<div class='col-3 col-sm-3 col-md-2 col-xl-1'><div class='item'>" +
                data["Ex" + i][j] +
                "</div></div>";
            }
          }
        }

        html += "</div>";

        jQuery(".show_tables").append(html);
      }

      jQuery(".show_tables").append(
        "<div class='row rent-title'><div class='col-3 col-sm-2'><div class='item-title'>Rent</div></div></div>"
      );

      var sglist = ["R0", "R2", "R4", "R7", "R10", "R12"];
      for (var k in sglist) {
        var i = sglist[k];
        var html = "";
        html += "<div class='row rent rent" + i + "'>";
        for (var j = 0; j <= SHOW_YEARS; j++) {
          if (j == 0) {
            html +=
              "<div class='col-3 col-sm-2'><div class='item-title'>" +
              data[i][j] +
              "</div></div>";
          } else {
            var classname = "";
            if (data[i][j] < 0) classname = "under-zero";

            html +=
              "<div class='col-3 col-sm-3 col-md-2 col-xl-1'><div class='item " +
              classname +
              "'>" +
              "$" +
              formatMoney(data[i][j], 0) +
              "</div></div>";
          }
        }

        html += "</div>";

        jQuery(".show_tables").append(html);
      }

      jQuery("#step1").hide();
      jQuery("#step2").show();

      for (var i = 1; i <= MAX_YEARS; i++) {
        if (data["R12"][i] > 0) {
        }
      }

      config.data.datasets[0].data = [];
      config.data.datasets[1].data = [];
      config.data.datasets[2].data = [];
      for (var i = 1; i <= MAX_YEARS; i++) {
        var rval = data["R4"][i];
        if (rval < 0) rval = 0;
        config.data.datasets[0].data.push(rval.toFixed(2));
        rval = data["R12"][i];
        if (rval < 0) rval = 0;
        config.data.datasets[1].data.push(rval.toFixed(2));

        rval = data["R2"][i];
        if (rval < 0) rval = 0;
        config.data.datasets[2].data.push(rval.toFixed(2));
      }

      if (!window.myLine) {
        var ctx = document.getElementById("canvas-1").getContext("2d");
        window.myLine = new Chart(ctx, config);
      }
      window.myLine.update();
      jQuery(window).trigger("resize");
    });

  jQuery("#btn-next")
    .off("click")
    .on("click", function (e) {
      jQuery("#step2").hide();
      jQuery("#step1").show();
    });

  jQuery(window).resize(function (e) {
    if (jQuery(window).width() > 600 && jQuery(window).width() <= 1200) {
      jQuery(".sg-cal-wrap .show_tables .row").each(function (e) {
        jQuery(this)
          .find(".col-xl-1")
          .each(function (index) {
            jQuery(this).hide();
            if (index < 5) {
              jQuery(this).show();
            }
          });
      });
    } else if (jQuery(window).width() < 600) {
      jQuery(".sg-cal-wrap .show_tables .row").each(function (e) {
        jQuery(this)
          .find(".col-xl-1")
          .each(function (index) {
            jQuery(this).hide();
            if (index < 3) {
              jQuery(this).show();
            }
          });
      });
    } else if (jQuery(window).width() > 1200) {
      jQuery(".sg-cal-wrap .show_tables").find(".col-xl-1").show();
    }
  });

  jQuery(".mobile_clicker > .dot")
    .off("click")
    .on("click", function (e) {
      jQuery(".mobile_clicker > .active").removeClass("active");
      jQuery(this).addClass("active");

      var index = jQuery(this).data("index");
      var step = 3;
      if (jQuery(window).width() > 768) {
        step = 5;
      }

      var from = index * step;
      var to = from + step;

      jQuery(".sg-cal-wrap .show_tables .row").each(function (e) {
        jQuery(this)
          .find(".col-xl-1")
          .each(function (index) {
            jQuery(this).hide();
            if (index >= from && index < to) {
              jQuery(this).show();
            }
          });
      });
    });

  var MONTHS = [];
  for (var i = 1; i <= MAX_YEARS; i++) {
    MONTHS.push("Year " + i);
  }

  var config = {
    type: "line",
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: "Capital Growth",
          backgroundColor: "rgba(255, 99, 132, 0.4)",
          borderColor: "rgba(255, 99, 132, 0.4)",
          data: [],
          fill: false,
        },
        {
          label: "Amount Owing",
          backgroundColor: "rgba(54, 162, 235, 0.4)",
          borderColor: "rgba(54, 162, 235, 0.4)",
          data: [],
          fill: false,
        },
        {
          label: "Cash income",
          backgroundColor: "#aa8800",
          borderColor: "#997700",
          data: [],
          fill: false,
          yAxisID: 1,
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
        text: "Charted Performance Over 15 Years",
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
          {
            id: 1,
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Yield Amount ($ AUD)",
              fontColor: "#aa8800",
            },
            ticks: {
              autoSkip: false,
              fontColor: "#aa8800",
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
});
