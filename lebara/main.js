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
//chart.height = 205;
chart.zoomControl = new am4maps.ZoomControl();
chart.zoomControl.align = "right";
chart.zoomControl.valign = "bottom";
chart.zoomControl.minusButton.background.cornerRadiusTopLeft = 0;
chart.zoomControl.minusButton.background.cornerRadiusTopRight = 0;
chart.zoomControl.minusButton.background.cornerRadiusBottomRight =
  am4core.percent(100);
chart.zoomControl.minusButton.background.cornerRadiusBottomLeft =
  am4core.percent(100);
chart.zoomControl.plusButton.background.cornerRadiusBottomLeft = 0;
chart.zoomControl.plusButton.background.cornerRadiusBottomRight = 0;
chart.zoomControl.plusButton.background.cornerRadiusTopRight =
  am4core.percent(100);
chart.zoomControl.plusButton.background.cornerRadiusTopLeft =
  am4core.percent(100);

chart.zoomControl.minusButton.background.fillOpacity = 0;
chart.zoomControl.plusButton.background.fillOpacity = 0;
chart.zoomControl.minusButton.background.stroke = am4core.color("#c4c4c4");
chart.zoomControl.plusButton.background.stroke = am4core.color("#c4c4c4");

chart.zoomControl.minusButton.fontWeight = "bold";
chart.zoomControl.plusButton.fontWeight = "bold";
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

if (!wideScreen) {
  chart.homeZoomLevel = 2;
}

//chart.showTooltipOn = "hit";

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

tooltipTemplate = `
<div class='am-tooltip'>
  <div class='country-name'>{name}</div>
  <div class='text'>{text}</div>
  <div class='am-tooltip__plan-wrapper'>
  <div class='am-tooltip__plan'>
    <div class='best-plan__heading'>Best Plan</div>
    <p><strong class="best-plan__name">{bestPlan}</strong> <span class="best-plan__minutes">{bestPlanMinutes}</span>
    </p>
    <div class='price-wrap'>
      <div class="best-plan__price">{bestPlanPrice}</div>
    </div>
    <a href='buy'><button class='btn btn-primary buynow'>Buy SIM</button></a>
  </div>
  </div>
</div>
  `;

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
  info.tooltip.label.interactionsEnabled = true;
  info.tooltip.getFillFromObject = false;
  info.tooltip.background.fill = am4core.color("#ffffff");
  info.tooltip.background.fillOpacity = 0.9;
  info.tooltip.ignoreBounds = true;
  info.tooltip.background.cornerRadius = 20;
  info.tooltip.background.pointerBaseWidth = 40;
  info.tooltip.background.pointerLength = 20;
  var shadow = info.tooltip.background.filters.getIndex(0);
  shadow.dx = 3;
  shadow.dy = 6;
  shadow.blur = 46;
  shadow.color = am4core.color("#000");
  info.tooltip.label.padding(0, 0, 0, 0);

  info.tooltip.events.on("hit", function (ev) {
    console.log(ev);
    ev.target.hide();
  });

  info.tooltip.pointerOrientation = "up";
  info.tooltipHTML = tooltipTemplate;

  polygonTemplate.events.on("hit", function (ev) {
    info.dataItem = ev.target.dataItem;
    info.showTooltipOn = "always";
  });
}

//Set up tooltips
polygonSeries.calculateVisualCenter = true;
polygonTemplate.tooltipPosition = "fixed";
polygonSeries.tooltip.label.interactionsEnabled = true;
polygonSeries.tooltip.keepTargetHover = true;
polygonSeries.tooltip.pointerOrientation = "horizontal";
polygonSeries.tooltip.getFillFromObject = false;
polygonSeries.tooltip.background.fill = am4core.color("#ffffff");
polygonSeries.tooltip.background.fillOpacity = 0.9;
polygonSeries.tooltip.background.cornerRadius = 20;
polygonSeries.tooltip.background.pointerBaseWidth = 40;
polygonSeries.tooltip.background.pointerLength = 20;
var shadow = polygonSeries.tooltip.background.filters.getIndex(0);
shadow.dx = 3;
shadow.dy = 6;
shadow.blur = 46;
shadow.color = am4core.color("#000");
polygonSeries.tooltip.label.padding(0, 0, 0, 0);
polygonTemplate.showTooltipOn = "hit";
polygonTemplate.cursorOptions.overStyle = am4core.MouseCursorStyle.pointer;

// Create hover state and set alternative fill color
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#ef3a8b");
