var wideScreen = window.innerWidth > 1119;
console.log(wideScreen);

am4core.useTheme(am4themes_animated);

//Create a parent chart container
var container = am4core.create("chartdiv", am4core.Container);
container.layout = "vertical";
container.width = am4core.percent(100);
container.height = am4core.percent(100);

// Create map instance
var chart = container.createChild(am4maps.MapChart);
chart.width = am4core.percent(100);
chart.height = am4core.percent(100);
chart.zoomControl = new am4maps.ZoomControl();
chart.zoomControl.align = "right";

// var ttcontainer = am4core.create("mobiletooltip", am4core.Container);
// ttcontainer.layout = "vertical";
// ttcontainer.width = am4core.percent(100);
// ttcontainer.height = am4core.percent(50);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.Miller();

// Disable scroll zoom
chart.chartContainer.wheelable = false;

chart.chartContainer.layout = "vertical";

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
polygonSeries.exclude = ["AQ", "AU"];

//Set min/max fill color for each area
polygonSeries.heatRules.push({
  property: "fill",
  target: polygonSeries.mapPolygons.template,
  min: chart.colors.getIndex(1).brighten(1),
  max: chart.colors.getIndex(1).brighten(-0.3),
  logarithmic: true,
});

// Make map load polygon data (state shapes and names) from GeoJSON
polygonSeries.useGeodata = true;

// Set heatmap values for each state
var herpdata = [];
$.getJSON("country-data.json", function (data) {
  polygonSeries.data = data;
});

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

tooltipTemplate =
  "<div class='am-tooltip'>" +
  "<div class='country-name'>{name}</div>" +
  "<div class='text'>{text}</div>" +
  "<div id='product-section-wrapper'>" +
  "<div class='sim-plans-content-wrapper'>" +
  " <div class='each-sim-plans-wrap border-radius20'>" +
  "   <div class='espw-inner'>" +
  "     <div class='d-inline-block custom-width'>" +
  "       <h3>Best Plan</h3>" +
  "<p><strong>{bestPlan}</strong> {bestPlanMinutes}</p>" +
  "<div class='price-wrap'><h3>{bestPlanPrice}</h3></div>" +
  "       </div>" +
  "<div class='btn-wrap'>" +
  "       <button type='submit' class='btn btn-primary buynow'>Buy SIM</button>" +
  "       </div>" +
  "       </div>" +
  "       </div>" +
  "       </div>" +
  "       </div>" +
  "</div>";

// Configure series
polygonSeries.calculatePercent = true;
var polygonTemplate = polygonSeries.mapPolygons.template;
if (wideScreen) {
  polygonTemplate.tooltipHTML = tooltipTemplate;
}

polygonTemplate.nonScalingStroke = true;
polygonTemplate.strokeWidth = 0.5;

if (!wideScreen) {
  //Create a child container for static multi value tool tip (for mobile)
  var info = container.createChild(am4core.Label);
  info.align = "center";
  //info.width = am4core.percent(100);
  info.tooltip.getFillFromObject = false;
  info.tooltip.background.fill = am4core.color("#ffffff");
  info.tooltip.background.fillOpacity = 0.9;
  info.tooltip.ignoreBounds = true;

  info.tooltip.events.on("hit", function (ev) {
    console.log(ev);
  });

  info.tooltip.pointerOrientation = "up";
  info.tooltipHTML = tooltipTemplate;

  polygonTemplate.events.on("hit", function (ev) {
    info.dataItem = ev.target.dataItem;
    info.showTooltipOn = "always";
  });
}

//Set up tooltips
polygonSeries.calculateVisualCenter = false;
polygonTemplate.tooltipPosition = "fixed";
polygonSeries.tooltip.label.interactionsEnabled = true;
polygonSeries.tooltip.keepTargetHover = true;
polygonSeries.tooltip.pointerOrientation = "horizontal";
polygonSeries.tooltip.getFillFromObject = false;
polygonSeries.tooltip.background.fill = am4core.color("#ffffff");
polygonSeries.tooltip.background.fillOpacity = 0.9;

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#ef3a8b");
