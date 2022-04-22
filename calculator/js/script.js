const columnsPerSmall = 2;
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

function numFormatter(num) {
  if(num > 999 && num < 1000000){
      return (num/1000).toFixed(0) + 'K'; // convert to K for number from > 1000 < 1 million 
  }else if(num > 1000000){
      return (num/1000000).toFixed(0) + 'M'; // convert to M for number from > 1 million 
  }else if(num < 900){
      return num; // if value < 1000, nothing to do
  }
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
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

function getRowHtml(data, termOfOwnership, format, rowClass = "") {
  var total = 0;
  var html = "";
  html += "<tr class='expense " + rowClass +"'>";
  html +=
    "<td class='first-column'>" +
    data[0] +
    "</td>";
  for (var j = 1; j <= termOfOwnership; j++) {
    var dataItem = data[j];
    total += dataItem;
    if (format == "currency") { dataItem = "$" + formatMoney(dataItem); }
    if (format == "percentage") { dataItem = formatMoney(dataItem * 100) + "%"; }
    html +=
      "<td>" +
      dataItem +
      "</td>";
  }

  var avg = total / termOfOwnership;
  if (format == "currency") { avg = "$" + formatMoney(avg); }
  if (format == "percentage") { avg = formatMoney(avg * 100) + "%"; }
  if (format == "text") { avg = "Average"; }

  html +=
    "<td class='lastcol'>" +
    avg +
    "</td>";


  html += "</tr>";
  return html;
}

function getTHead(data, termOfOwnership, format) {
  var total = 0;
  var html = "";
  
  html +=
    "<tr><th>" +
    data[0] +
    "</th>";
  for (var j = 1; j <= termOfOwnership; j++) {
    var dataItem = data[j];
    total += dataItem;
    if (format == "currency") { dataItem = "$" + formatMoney(dataItem); }
    if (format == "percentage") { dataItem = formatMoney(dataItem * 100) + "%"; }
    html +=
      "<th>" +
      dataItem +
      "</th>";
  }

  var avg = total / termOfOwnership;
  if (format == "currency") { avg = "$" + formatMoney(avg); }
  if (format == "percentage") { avg = formatMoney(avg * 100) + "%"; }
  if (format == "text") { avg = "Average"; }

  html +=
    "<th class='lastcol'>" +
    avg +
    "</th></tr>";


  
  return html;
}


function updateFields() {
  purchasePrice = getMoney($("#purchase-price").val());
  totalLoan = getMoney($("#total-loan").val(), false) / 100.0 * purchasePrice;
  deposit = purchasePrice - totalLoan;
  stampDuty = getMoney($("#stamp-duty").val());
  valuationCost = getMoney($("#valuation-cost").val());
  solicitorCost = getMoney($("#solicitor-cost").val());
  otherPurchasingCosts = getMoney(
    $("#other-purchasing-costs").val()
  );
  totalCashRequired = deposit + stampDuty + valuationCost + solicitorCost + otherPurchasingCosts;
  netRentalIncome = getMoney($("#net-rental-income").val());
  rentalIncreases = getMoney($("#rental-increases").val());
  termOfOwnership = getMoney($("#term-of-ownership").val(), false);
  loanInterestRate = getMoney($("#loan-interest-rate").val(), false);
  debtReduction = $("#debt-reduction").prop('checked');
  profitNotForDebtReduction = getMoney($("#profit-not-for-debt-reduction").val(), false);
  rethinkFee = 57475;

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
    profitNotForDebtReduction: profitNotForDebtReduction,
    totalCashRequired: totalCashRequired,
  }

  windowWidth = $(window).width();

  

  







  $(".sg-cal-wrap .show_tables .row").each(function (e) {
    $(this)
      .find(".rolling-column")
      .each(function (index) {
        $(this).hide();
        if (index < columns) {
          $(this).show();
        }
      });
  });




  $("#total-loan").selectmenu();
  var yieldOptions = $(".yield-option");
  yieldOptions.map(function (a, b) {
    item = $(b);
    var yield = getMoney(item.val(), false) / 100.0;
    item.text(
      "$" + formatMoney(purchasePrice * yield) + " (" + item.val() + ")"
    );
  });


  $("#total-loan").selectmenu("refresh");

  //Update display fields
  $(".deposit").text("$" + formatMoney(deposit, 2));
  $(".total-cash-required").text("$" + formatMoney(totalCashRequired, 2));
  $(".term-number").text(termOfOwnership);
  $(".purchase-price").text("$" + formatMoney(purchasePrice,2));
  $(".total-loan").text("$" + formatMoney(totalLoan,2));
  $(".stamp-duty").text("$" + formatMoney(stampDuty,2));
  $(".valuation-cost").text("$" + formatMoney(valuationCost,2));
  $(".solicitor-cost").text("$" + formatMoney(solicitorCost,2));
  $(".rethink-fee").text("$" + formatMoney(rethinkFee,2));
  $(".total-loan").text("$" + formatMoney(totalLoan,2));
  $(".net-rental-income").text("$" + formatMoney(netRentalIncome,2));
  $(".yearly-review").text(rentalIncreases);
  $(".loan-interest-rate").text(loanInterestRate);
  $(".debt-reduction").text(debtReduction);
  $(".profit-not-for-debt-reduction").text(profitNotForDebtReduction);
}

$(document).ready(function () {

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
  $("#purchase-price").val(model.purchasePrice);
  $("#term-of-ownership").val(model.termOfOwnership);

  //Prepare the form
  var yieldOptions = $(".yield-option");
  purchasePrice = getMoney($("#purchase-price").val());
  yieldOptions.map(function (a, b) {
    item = $(b);
    var yield = getMoney(item.val(), false) / 100.0;
    item.text(
      "$" + formatMoney(purchasePrice * yield) + " (" + item.val() + ")"
    );
  });
  $("#total-loan").selectmenu();
  $(".select-menu").on("selectmenuchange", function (event, ui) { updateFields(); })
  $(".input").on("change", function (e) { updateFields(); })



  updateFields();


  var accessToken = "b85e7501087ddced06355f09a23aec9fb016444f";

  $("#btn-share").on("click", function () {
    var chunk = btoa(JSON.stringify(model));
    var shareUrl = window.location.href.split('?')[0] + "?m=" + chunk;
    var params = {
      "long_url": shareUrl
    };

    //     $.ajax({
    //       url: "https://api-ssl.bitly.com/v4/shorten",
    //       cache: false,
    //       dataType: "json",
    //       method: "POST",
    //       contentType: "application/json",
    //       beforeSend: function (xhr) {
    //         xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    //       },
    //       data: JSON.stringify(params)
    //     }).done(function(data) {
    //       navigator.clipboard.writeText(data.link);
    //       window.alert("Link copied");
    //     }).fail(function(data) {
    //       console.log(data);
    //     });
    // navigator.clipboard.writeText(params.long_url);
    copyToClipboard(params.long_url);
    window.alert("Link copied");

  })

  function copyToClipboard(url) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(url).select();
    document.execCommand("copy");
    $temp.remove();
  }

  var data = [];



  $(".currency")
    .off("blur")
    .on("blur", function (e) {
      $(this).val("$" + formatMoney($(this).val(), 2));
    });

  $(".currency")
    .off("focus")
    .on("focus", function (e) {
      var value = $(this).val();

      value = getMoney(value).toFixed(2);
      $(this).val(value);
    });

  $(".percent")
    .off("blur")
    .on("blur", function (e) {
      $(this).val($(this).val() + "%");
    });

  $(".percent")
    .off("focus")
    .on("focus", function (e) {
      $(this).val($(this).val().replace("%", ""));
    });

  $(".percent").trigger("blur");
  $(".currency").trigger("blur");

  //Click Get your forecast
  $("#btn-calculator")
    .off("click")
    .on("click", showResults);

  //Click start over
  $("#btn-next")
    .off("click")
    .on("click", function (e) {
      $("#step2").hide();
      $("#step1").show();
      myTable.destroy();
      $(".table_wrapper").html("<table cell-spacing='0' id='calculator-table' class='cell-border stripe'><thead class='show_table_head'></thead><tbody class='show_tables'></tbody></table>");

    });

  $(window).resize(function (e) {
    updateFields();
  });




});

var myTable;

function showResults() {
  rentReceived = ["Rent Received"];
  yieldEachYear = ["Yearly yield"];
  principalRemainingStartOfYear = ["Principal Remaining <div class='table-heading-subtitle'>(start of year)</div>"];
  principalRemainingEndOfYear = ["Principal Remaining <div class='table-heading-subtitle'>(end of year)</div>"];
  principalRepaid = ["Principal Paid"];
  interestPaid = ["Interest Paid"];
  cashFlow = ["Cash-flow <div class='table-heading-subtitle'>(rent less interest)</div>"];
  returnOnEquity = ["Return on Equity <div class='table-heading-subtitle'>(pure cash flow return)</div>"];
  valueAtSameCapRate = ["Value at same Cap Rate as when you purchased"];
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
    if (i == 1){
      principalRepaid[i] = 0;
    }
    principalRemainingEndOfYear[i] = principalRemainingStartOfYear[i] - principalRepaid[i];
    returnOnEquity[i] = cashFlow[i] / model.totalCashRequired;
    valueAtSameCapRate[i] = rentReceived[i] / yieldEachYear[1];


  }

  $(".table_wrapper").html("<table cell-spacing='0' id='calculator-table' class='cell-border stripe'><thead class='show_table_head'></thead><tbody class='show_tables'></tbody></table>");
  $(".show_table_head").append(getTHead(yearHeadings, model.termOfOwnership, "text"));
  $(".show_tables").append(getRowHtml(rentReceived, model.termOfOwnership, "currency"));
  $(".show_tables").append(getRowHtml(yieldEachYear, model.termOfOwnership, "percentage", "blue-row"));
  $(".show_tables").append(getRowHtml(interestPaid, model.termOfOwnership, "currency"));
  $(".show_tables").append(getRowHtml(cashFlow, model.termOfOwnership, "currency", "blue-row"));
  $(".show_tables").append(getRowHtml(returnOnEquity, model.termOfOwnership, "percentage"));
  $(".show_tables").append(getRowHtml(principalRepaid, model.termOfOwnership, "currency"));
  $(".show_tables").append(getRowHtml(principalRemainingStartOfYear, model.termOfOwnership, "currency"));
  $(".show_tables").append(getRowHtml(principalRemainingEndOfYear, model.termOfOwnership, "currency"));
  $(".show_tables").append(getRowHtml(valueAtSameCapRate, model.termOfOwnership, "currency"));

  myTable = $("#calculator-table").DataTable({


    fixedColumns:{
      left:1
    },

    //autoWidth:false,
    
    scrollX:true,

    paging:false,
    searching:false,
    ordering:false,
    info:false,
    columnDefs:[
      {width:"154px", targets:0}, //desktop
      //{width:"54px", targets:0}, //mobile
      {width: "142px", targets:model.termOfOwnership+1}, //desktop
      //{width: "112px", targets:model.termOfOwnership+1}, //mobile
      {width:"92px", targets:'_all'}, //desktop
      //{width:"72px", targets:'_all'}, //mobile
    ]
  });

  $("#step1").hide();
  $("#step2").show();


  var years = [];
  for (var i = 1; i <= model.termOfOwnership; i++) {
    years.push(i);
  }

  var config = {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "Capital Growth",
          borderColor: "#0385ae",
          borderWidth:2,
          data: [],
          fill: false,
          pointRadius:0,
        },
        {
          label: "Amount Owing",
          borderColor: "#000",
          borderWidth:2,
          data: [],
          fill: false,
          pointRadius:0,
        },

      ],
    },
    options: {
      plugins:{
        legend:{
          display:false
        },
      },
      scales: {
        y:{
          beginAtZero:true,
          ticks:{
            color:"#0385ae",
            callback:function(e){
              return "$"+numFormatter(e);
            },
            font:{
              size:18,
              weight:"700",
              family:"Open Sans"
            }
          },
          title:{
            text:"Amount ($AUD)",
            display:true,
            color:"#0385ae",
            font:{
              size:18,
              weight:"300",
              family:"Open Sans"
            }
          },
          grid:{
            display:false,
            borderColor:"#0385ae"
          },
          
        },
        x:{
          ticks:{
            color:"#0385ae",
            font:{
              size:18,
              weight:"700",
              family:"Open Sans"
            }
          },
          title:{
            text:"Year",
            display:true,
            color:"#0385ae",
            font:{
              size:18,
              weight:"300",
              family:"Open Sans"
            }
          },
          grid:{
            borderDash:[4,4],
            color:"#0385ae",
            borderColor:"#0385ae",
          },
        }

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
  $(window).trigger("resize");
}

document.fonts.ready.then(function(){
  //myTable.columns.adjust().draw();
})