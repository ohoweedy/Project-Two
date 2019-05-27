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
console.log(chart_data)
sort_chart = chart_data.sort((a, b) => (a.Price > b.Price) ? 1 : -1)
console.log(sort_chart)

// console.log(sort_chart)

am4core.ready(function() {

  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  var chart = am4core.create("chartdiv", am4charts.XYChart);
  
  chart.data = chart_data;
  
  // Create axes
  var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
  xAxis.renderer.minGridDistance = 40;
  
  // Create value axis
  var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
  
  // Create series
  var series1 = chart.series.push(new am4charts.LineSeries());
  series1.dataFields.valueX = "Price";
  series1.dataFields.valueY = "RAPE";
  // series1.dataFields.value = "aValue";
  series1.strokeWidth = 2;
  
  var bullet1 = series1.bullets.push(new am4charts.CircleBullet());
  series1.heatRules.push({
    target: bullet1.circle,
    min: 5,
    max: 20,
    property: "radius"
  });
  
  bullet1.tooltipText = "Price:{valueX}  RAPE:{valueY}";
  
  var series2 = chart.series.push(new am4charts.LineSeries());
  series2.dataFields.valueX = "Price";
  series2.dataFields.valueY = "COMMON ASSAULT";
  // series2.dataFields.value = "bValue";
  series2.strokeWidth = 2;
  
  var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
  series2.heatRules.push({
    target: bullet2.circle,
    min: 5,
    max: 20,
    property: "radius"
  });
  
  bullet2.tooltipText = "Price:{valueX} COMMON ASSAULT: {valueY}";
  
  //scrollbars
  chart.scrollbarX = new am4core.Scrollbar();
  chart.scrollbarY = new am4core.Scrollbar();
  
  }); // end am4core.ready()
});
});