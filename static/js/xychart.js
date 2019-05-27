var APILink = "/api/v1.0/geojson";

price_list = []
d3.json(APILink, function(data2) {

  for(var i = 0; i < data2.features.length; i++ ){
    price_list.push({"Neighborhood": data2.features[i].properties.Neighborhood,"Price": data2.features[i].properties.price})
  }

var crimeLink = "/api/v1.0/baltimore_group";


//populate the charts utilizing selected map.
d3.json(crimeLink, function(data){
  chart_data = [];
  for(var crime_dict in data){
    chart_data.push(data[crime_dict])
  }
  for(var i in chart_data){
    for(var x in price_list)
    if(chart_data[i].Neighborhood == price_list[x].Neighborhood){
      chart_data[i]["Price"] =  parseInt(price_list[x].Price)
    }
  }

chart_data.sort((a, b) => (a.Price > b.Price) ? 1 : -1)
console.log(chart_data)

/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

am4core.useTheme(am4themes_animated);

var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

var valueAxisX = chart.xAxes.push(new am4charts.ValueAxis());
var valueAxisY = chart.yAxes.push(new am4charts.ValueAxis());

var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueX = "Price";
series.dataFields.valueY = "AGG. ASSAULT";
series.dataFields.value = "Price";
series.strokeOpacity = 0;
series.sequencedInterpolation = true;

var bullet = series.bullets.push(new am4core.Circle());
bullet.fill = am4core.color("#ff0000");
bullet.propertyFields.fill = "color";
bullet.strokeOpacity = 0;
bullet.radius = 5;
bullet.strokeWidth = 2;
bullet.fillOpacity = 0.7;
bullet.stroke = am4core.color("#ffffff");

bullet.tooltipText = "[bold]AGG. ASSAULT:[/]\nPopulation: {value.value}\nIncome: {valueX.value}\nLife expectancy:{valueY.value}";

var hoverState = bullet.states.create("hover");
hoverState.properties.fillOpacity = 1;
hoverState.properties.strokeOpacity = 1;

series.heatRules.push({ target: bullet, min: 2, max: 10, property: "radius" });

bullet.adapter.add("tooltipY", function (tooltipY, target) {
    return -target.radius;
})

//SECOND SET OF BULLETS
var series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueX = "Price";
series2.dataFields.valueY = "COMMON ASSAULT";
series2.dataFields.value = "Price";
series2.strokeOpacity = 0;
series2.sequencedInterpolation = true;

var bullet2 = series2.bullets.push(new am4core.Circle());
bullet2.fill = am4core.color("#0000ff");
bullet2.propertyFields.fill = "color";
bullet2.strokeOpacity = 0;
bullet2.radius = 5;
bullet2.strokeWidth = 2;
bullet2.fillOpacity = 0.7;
bullet2.stroke = am4core.color("#ffffff");

bullet2.tooltipText = "[bold]COMMON ASSAULT:[/]\nPopulation: {value.value}\nIncome: {valueX.value}\nLife expectancy:{valueY.value}";

var hoverState2 = bullet2.states.create("hover");
hoverState2.properties.fillOpacity = 1;
hoverState2.properties.strokeOpacity = 1;

series2.heatRules.push({ target: bullet2, min: 2, max: 10, property: "radius" });

bullet2.adapter.add("tooltipY", function (tooltipY, target) {
    return -target.radius;
})

//THIRD SET OF BULLETS
var series3 = chart.series.push(new am4charts.LineSeries());
series3.dataFields.valueX = "Price";
series3.dataFields.valueY = "HOMICIDE";
series3.dataFields.value = "Price";
series3.strokeOpacity = 0;
series3.sequencedInterpolation = true;

var bullet3 = series3.bullets.push(new am4core.Circle());
bullet3.fill = am4core.color("#008000");
bullet3.propertyFields.fill = "color";
bullet3.strokeOpacity = 0;
bullet3.radius = 5;
bullet3.strokeWidth = 2;
bullet3.fillOpacity = 0.7;
bullet3.stroke = am4core.color("#ffffff");

bullet3.tooltipText = "[bold]HOMICIDE:[/]\nPopulation: {value.value}\nIncome: {valueX.value}\nLife expectancy:{valueY.value}";

var hoverState3 = bullet3.states.create("hover");
hoverState3.properties.fillOpacity = 1;
hoverState3.properties.strokeOpacity = 1;

series3.heatRules.push({ target: bullet3, min: 2, max: 10, property: "radius" });

bullet3.adapter.add("tooltipY", function (tooltipY, target) {
    return -target.radius;
})

//FOURTH SET OF BULLETS
var series4 = chart.series.push(new am4charts.LineSeries());
series4.dataFields.valueX = "Price";
series4.dataFields.valueY = "RAPE";
series4.dataFields.value = "Price";
series4.strokeOpacity = 0;
series4.sequencedInterpolation = true;

var bullet4 = series4.bullets.push(new am4core.Circle());
bullet4.fill = am4core.color("#ffff00");
bullet4.propertyFields.fill = "color";
bullet4.strokeOpacity = 0;
bullet4.radius = 5;
bullet4.strokeWidth = 2;
bullet4.fillOpacity = 0.7;
bullet4.stroke = am4core.color("#ffffff");

bullet4.tooltipText = "[bold]RAPE:[/]\nPopulation: {value.value}\nIncome: {valueX.value}\nLife expectancy:{valueY.value}";

var hoverState4 = bullet4.states.create("hover");
hoverState4.properties.fillOpacity = 1;
hoverState4.properties.strokeOpacity = 1;

series4.heatRules.push({ target: bullet4, min: 2, max: 10, property: "radius" });

bullet4.adapter.add("tooltipY", function (tooltipY, target) {
    return -target.radius;
})

//FIFTH SET OF BULLETS
var series5 = chart.series.push(new am4charts.LineSeries());
series5.dataFields.valueX = "Price";
series5.dataFields.valueY = "ROBBERY - CARJACKING";
series5.dataFields.value = "Price";
series5.strokeOpacity = 0;
series5.sequencedInterpolation = true;

var bullet5 = series5.bullets.push(new am4core.Circle());
bullet5.fill = am4core.color("#800080");
bullet5.propertyFields.fill = "color";
bullet5.strokeOpacity = 0;
bullet5.radius = 5;
bullet5.strokeWidth = 2;
bullet5.fillOpacity = 0.7;
bullet5.stroke = am4core.color("#ffffff");

bullet5.tooltipText = "[bold]CARJACKING:[/]\nPopulation: {value.value}\nIncome: {valueX.value}\nLife expectancy:{valueY.value}";

var hoverState5 = bullet5.states.create("hover");
hoverState5.properties.fillOpacity = 1;
hoverState5.properties.strokeOpacity = 1;

series5.heatRules.push({ target: bullet5, min: 2, max: 10, property: "radius" });

bullet5.adapter.add("tooltipY", function (tooltipY, target) {
    return -target.radius;
})

//SIXTH SET OF BULLETS
var series6 = chart.series.push(new am4charts.LineSeries());
series6.dataFields.valueX = "Price";
series6.dataFields.valueY = "ROBBERY - COMMERCIAL";
series6.dataFields.value = "Price";
series6.strokeOpacity = 0;
series6.sequencedInterpolation = true;

var bullet6 = series6.bullets.push(new am4core.Circle());
bullet6.fill = am4core.color("#FFC0CB");
bullet6.propertyFields.fill = "color";
bullet6.strokeOpacity = 0;
bullet6.radius = 5;
bullet6.strokeWidth = 2;
bullet6.fillOpacity = 0.7;
bullet6.stroke = am4core.color("#ffffff");

bullet6.tooltipText = "[bold]COMMERCIAL:[/]\nPopulation: {value.value}\nIncome: {valueX.value}\nLife expectancy:{valueY.value}";

var hoverState6 = bullet6.states.create("hover");
hoverState6.properties.fillOpacity = 1;
hoverState6.properties.strokeOpacity = 1;

series6.heatRules.push({ target: bullet6, min: 2, max: 10, property: "radius" });

bullet6.adapter.add("tooltipY", function (tooltipY, target) {
    return -target.radius;
})

//SEVENTH SET OF BULLETS
var series7 = chart.series.push(new am4charts.LineSeries());
series7.dataFields.valueX = "Price";
series7.dataFields.valueY = "ROBBERY - RESIDENCE";
series7.dataFields.value = "Price";
series7.strokeOpacity = 0;
series7.sequencedInterpolation = true;

var bullet7 = series7.bullets.push(new am4core.Circle());
bullet7.fill = am4core.color("#FFA500");
bullet7.propertyFields.fill = "color";
bullet7.strokeOpacity = 0;
bullet7.radius = 5;
bullet7.strokeWidth = 2;
bullet7.fillOpacity = 0.7;
bullet7.stroke = am4core.color("#ffffff");

bullet7.tooltipText = "[bold]RESIDENCE:[/]\nPopulation: {value.value}\nIncome: {valueX.value}\nLife expectancy:{valueY.value}";

var hoverState7 = bullet7.states.create("hover");
hoverState7.properties.fillOpacity = 1;
hoverState7.properties.strokeOpacity = 1;

series7.heatRules.push({ target: bullet7, min: 2, max: 10, property: "radius" });

bullet7.adapter.add("tooltipY", function (tooltipY, target) {
    return -target.radius;
})

//EIGHTH SET OF BULLETS
var series8 = chart.series.push(new am4charts.LineSeries());
series8.dataFields.valueX = "Price";
series8.dataFields.valueY = "ROBBERY - STREET";
series8.dataFields.value = "Price";
series8.strokeOpacity = 0;
series8.sequencedInterpolation = true;

var bullet8 = series8.bullets.push(new am4core.Circle());
bullet8.fill = am4core.color("#000000");
bullet8.propertyFields.fill = "color";
bullet8.strokeOpacity = 0;
bullet8.radius = 5;
bullet8.strokeWidth = 2;
bullet8.fillOpacity = 0.7;
bullet8.stroke = am4core.color("#ffffff");

bullet8.tooltipText = "[bold]STREET:[/]\nPopulation: {value.value}\nIncome: {valueX.value}\nLife expectancy:{valueY.value}";

var hoverState8 = bullet8.states.create("hover");
hoverState8.properties.fillOpacity = 1;
hoverState8.properties.strokeOpacity = 1;

series8.heatRules.push({ target: bullet8, min: 2, max: 10, property: "radius" });

bullet8.adapter.add("tooltipY", function (tooltipY, target) {
    return -target.radius;
})

//NINTH SET OF BULLETS
var series9 = chart.series.push(new am4charts.LineSeries());
series9.dataFields.valueX = "Price";
series9.dataFields.valueY = "SHOOTING";
series9.dataFields.value = "Price";
series9.strokeOpacity = 0;
series9.sequencedInterpolation = true;

var bullet9 = series9.bullets.push(new am4core.Circle());
bullet9.fill = am4core.color("#87ceeb");
bullet9.propertyFields.fill = "color";
bullet9.strokeOpacity = 0;
bullet9.radius = 5;
bullet9.strokeWidth = 2;
bullet9.fillOpacity = 0.7;
bullet9.stroke = am4core.color("#ffffff");

bullet9.tooltipText = "[bold]SHOOTING:[/]\nPopulation: {value.value}\nIncome: {valueX.value}\nLife expectancy:{valueY.value}";

var hoverState9 = bullet9.states.create("hover");
hoverState9.properties.fillOpacity = 1;
hoverState9.properties.strokeOpacity = 1;

series9.heatRules.push({ target: bullet9, min: 2, max: 10, property: "radius" });

bullet9.adapter.add("tooltipY", function (tooltipY, target) {
    return -target.radius;
})

chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "zoomXY";

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarY = new am4core.Scrollbar();

chart.data = chart_data
});
});