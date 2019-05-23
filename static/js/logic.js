// Creating map object
var myMap = L.map("map", {
  center: [39.2904,-76.6122, ],
  zoom: 12
});

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

        // Conditionals for countries points

        // Add circles to map
        try{
          L.circle([data[i].Exact_Location.slice(1,8),data[i].Exact_Location.slice(15,24)], 
          
          {
            color: "blue",
            opacity: 0.04,
            fillOpacity: 0.04,
            fillColor: "blue",
            // Adjust radius
            radius: 50
          }).bindPopup("<h1>" + data[i].Neighborhood + "</h1> <hr> <h3>Crime: " + data[i].Description + "</h3>").addTo(myMap);
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
  console.log(price_list)

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
      layer.bindPopup('Neighborhood : ' + feature.properties.Neighborhood + '<br> <hr>' + 'Price : ' + feature.properties.price);
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
