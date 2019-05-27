
var popup = d3.select(map)
var nextstep = ""
popup.on("click",function(){
  nextstep = popup.select(".leaflet-pane")._groups[0][0].textContent.replace("Neighborhood :","")
  console.log(nextstep)
  
})

var crimeLink = "/api/v1.0/baltimore_group";
d3.json(crimeLink, function(data){
    var datachoice = data[nextstep]
  


am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);


// Add data
chart.data = [datachoice];
chart.colors.step = 2;
chart.padding(30, 30, 10, 30);

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "neighborhood";
categoryAxis.renderer.grid.template.location = 0;


var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inside = true;
valueAxis.renderer.labels.template.disabled = true;
valueAxis.min = 0;

// Create series
function createSeries(field, name) {
  
  // Set up series
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.name = name;
  series.dataFields.valueY = field;
  series.dataFields.categoryX = "neighborhood";
  series.sequencedInterpolation = true;
//   series.dataFields.valueYShow = "totalPercent";
  
  // Make it stacked
  series.stacked = true;
  
  // Configure columns
  series.columns.template.width = am4core.percent(50);
  series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px] Total: {valueY}";
  
  // Add label
  var labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.text = "{valueY}";
  labelBullet.locationY = 0.5;
  
  return series;
}

createSeries("AGG. ASSAULT", "AGG. ASSAULT");
createSeries("COMMON ASSAULT", "COMMON ASSAULT");
createSeries("HOMICIDE", "HOMICIDE");
createSeries("RAPE", "RAPE");
createSeries("ROBBERY - CARJACKING", "ROBBERY - CARJACKING");
createSeries("ROBBERY - COMMERCIAL", "ROBBERY - COMMERCIAL");
createSeries("ROBBERY - RESIDENCE", "ROBBERY - RESIDENCE");
createSeries("ROBBERY - STREET", "ROBBERY - STREET");
createSeries("SHOOTING", "SHOOTING");

// Legend
chart.legend = new am4charts.Legend();

}); // end am4core.ready()
});
