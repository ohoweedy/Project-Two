// Initialize layer groups
var layers = {
  SHOOTING: new L.LayerGroup(),
  AGG_ASSAULT: new L.LayerGroup(),
  HOMICIDE: new L.LayerGroup(),
  COMMON_ASSAULT: new L.LayerGroup(),
  ROBBERY_STREET: new L.LayerGroup(),
  ROBBERY_RESIDENCE: new L.LayerGroup(),
  ROBBERY_COMMERCIAL: new L.LayerGroup(),
  ROBBERY_CARJACKING: new L.LayerGroup(),
  RAPE: new L.LayerGroup()
};

// Creating map object
var myMap = L.map("map", {
  center: [39.2904,-76.6122, ],
  zoom: 12,
  layers: [
    layers.SHOOTING,
    layers.AGG_ASSAULT,
    layers.HOMICIDE,
    layers.COMMON_ASSAULT,
    layers.ROBBERY_STREET,
    layers.ROBBERY_RESIDENCE,
    layers.ROBBERY_COMMERCIAL,
    layers.ROBBERY_CARJACKING,
    layers.RAPE
  ]
});

// Create an overlays object to add to the layer control
var overlays = {
  "SHOOTING": layers.SHOOTING,
  "AGGRAVATED ASSAULT": layers.AGG_ASSAULT,
  "HOMICIDE": layers.HOMICIDE,
  "COMMON ASSAULT": layers.COMMON_ASSAULT,
  "ROBBERY STREET": layers.ROBBERY_STREET,
  "ROBBERY RESIDENCE": layers.ROBBERY_RESIDENCE,
  "ROBBERY COMMERCIAL": layers.ROBBERY_COMMERCIAL,
  "ROBBERY CARJACKING": layers.ROBBERY_CARJACKING,
  "RAPE": layers.RAPE
};

L.control.layers(null, overlays).addTo(myMap);

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

//CIRCLES for crime
var crimeLink = "/api/v1.0/baltimore_crime";
d3.json(crimeLink, function(data){
  
  for (var i = 0; i < data.length; i++) {

    // Conditionals for earthquake magnitude colors:
    var color = "";
    if (data[i].Description == "SHOOTING") {
      color = "purple";
    }
    else if (data[i].Description == "AGG. ASSAULT") {
      color = "red";
    }
    else if (data[i].Description == "HOMICIDE") {
      color = "black";
    }
    else if (data[i].Description == "COMMON ASSAULT") {
      color = "yellow";
    }
    else if (data[i].Description == "ROBBERY - STREET") {
      color = "blue";
    }
    else if (data[i].Description == "RAPE") {
      color = "orange";
    }
    else if (data[i].Description == "ROBBERY - RESIDENCE") {
      color = "cyan";
    }
    else if (data[i].Description == "ROBBERY - COMMERCIAL") {
      color = "coral";
    }
    else if (data[i].Description == "ROBBERY - CARJACKING") {
      color = "white";
    }

    // Layer dependency
    // Initialize crime type description
    var crime_status;

    if (data[i].Description == "SHOOTING") {
      crime_status = "SHOOTING";
    }
    else if (data[i].Description == "AGG. ASSAULT") {
      crime_status = "AGGRAVATED ASSAULT";
    }
    else if (data[i].Description == "HOMICIDE") {
      crime_status = "HOMICIDE";
    }
    else if (data[i].Description == "COMMON ASSAULT") {
      crime_status = "COMMON ASSAULT";
    }
    else if (data[i].Description == "ROBBERY - STREET") {
      crime_status = "ROBBERY STREET";
    }
    else if (data[i].Description == "RAPE") {
      crime_status = "RAPE";
    }
    else if (data[i].Description == "ROBBERY - RESIDENCE") {
      crime_status = "ROBBERY RESIDENCE";
    }
    else if (data[i].Description == "ROBBERY - COMMERCIAL") {
      crime_status = "ROBBERY COMMERCIAL";
    }
    else if (data[i].Description == "ROBBERY - CARJACKING") {
      crime_status = "ROBBERY CARJACKING";
    }

    
    // Add circles to map
    try{
      var crime_circle = L.circle([data[i].Exact_Location.slice(1,8),data[i].Exact_Location.slice(15,24)], 
      
      {
        color: color,
        opacity: 0.04,
        fillOpacity: 0.04,
        fillColor: color,
        // Adjust radius
        radius: 50
      }).bindPopup("<h1>" + data[i].Neighborhood + "</h1> <hr> <h3>Crime: " + data[i].Description + "</h3>").addTo(myMap);
      crime_circle.addTo(layers[crime_status]);
    }
    catch (err){
    }
}

});


// Link to GeoJSON
var APILink = "/api/v1.0/geojson";

// Grab data with d3
d3.json(APILink, function(data) {

  price_list = []
  for(var i = 0; i < data.features.length; i++ ){
    
    price_list.push(data.features[i].properties.price)

  }
  // console.log(price_list)

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "price",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      // layer.bindPopup('Neighborhood : ' + feature.properties.Neighborhood + '<br> <hr>' + 'Price : ' + feature.properties.price);
      layer.bindPopup('Neighborhood :' + feature.properties.Neighborhood);
    }

  }).addTo(myMap);


  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Housing Price per County</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});



 
//on "click" select the map and find the textContent to feed the "neighborhood into the charts"
d3.select(map).on("click",function(){
  var nextstep = ""
  nextstep = d3.select(map).select(".leaflet-pane")._groups[0][0].textContent.replace("Neighborhood :","").replace("×","")
  console.log(nextstep)

  var crimeLink = "/api/v1.0/baltimore_group";


//populate the charts utilizing selected map.
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
  // series.dataFields.valueYShow = "totalPercent";
  
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
  
})


