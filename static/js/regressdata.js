d3.json("/api/v1.0/geojson", function(data2) {
price_list = []
  for(var i = 0; i < data2.features.length; i++ ){
    price_list.push({"Neighborhood": data2.features[i].properties.Neighborhood,"Price": data2.features[i].properties.price})
  }

//populate the charts utilizing selected map.
    d3.json("/api/v1.0/baltimore_group", function(data){
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
    corr_price = []
    corr_AS = []
    corr_CS = []
    corr_hom = []
    corr_robcar = []
    corr_robcom = []
    corr_robres = []
    corr_robstr = []
    corr_rape = []
    corr_shoot = []

    for (var i in chart_data){

        if(isNaN(chart_data[i].Price) || chart_data[i].Price == undefined){
            corr_price.push(0)
        }
        else {
            corr_price.push(chart_data[i].Price)
        }  

    }

    for (var i in corr_price){
        if(corr_price[i] > 0){
            if(isNaN(chart_data[i]["AGG. ASSAULT"]) || chart_data[i]["AGG. ASSAULT"] == undefined){
                corr_AS.push(0)
            }
            else {
                corr_AS.push(chart_data[i]["AGG. ASSAULT"])
            }
    
            if(isNaN(chart_data[i]["COMMON ASSAULT"]) || chart_data[i]["COMMON ASSAULT"] == undefined){
                corr_CS.push(0)
            }
            else {
                corr_CS.push(chart_data[i]["COMMON ASSAULT"])
            }
    
            if(isNaN(chart_data[i].HOMICIDE) || chart_data[i].HOMICIDE == undefined){
                corr_hom.push(0)
            }
            else {
                corr_hom.push(chart_data[i].HOMICIDE)
            }
    
            if(isNaN(chart_data[i]["ROBBERY - CARJACKING"]) || chart_data[i]["ROBBERY - CARJACKING"] == undefined){
                corr_robcar.push(0)
            }
            else {
                corr_robcar.push(chart_data[i]["ROBBERY - CARJACKING"])
            }
    
            if(isNaN(chart_data[i]["ROBBERY - COMMERCIAL"]) || chart_data[i]["ROBBERY - COMMERCIAL"] == undefined){
                corr_robcom.push(0)
            }
            else {
                corr_robcom.push(chart_data[i]["ROBBERY - COMMERCIAL"])
            }
    
            if(isNaN(chart_data[i]["ROBBERY - RESIDENCE"]) || chart_data[i]["ROBBERY - RESIDENCE"] == undefined){
                corr_robres.push(0)
            }
            else {
                corr_robres.push(chart_data[i]["ROBBERY - RESIDENCE"])
            }
    
            if(isNaN(chart_data[i]["ROBBERY - STREET"]) || chart_data[i]["ROBBERY - STREET"] == undefined){
                corr_robstr.push(0)
            }
            else {
                corr_robstr.push(chart_data[i]["ROBBERY - STREET"])
            }
    
            if(isNaN(chart_data[i].RAPE) || chart_data[i].RAPE == undefined){
                corr_rape.push(0)
            }
            else {
                corr_rape.push(chart_data[i].RAPE)
            }
    
            if(isNaN(chart_data[i].SHOOTING) || chart_data[i].SHOOTING == undefined){
                corr_shoot.push(0)
            }
            else {
                corr_shoot.push(chart_data[i].SHOOTING)
            }  
        }
    }

    var cleaned_corr_price = corr_price.filter(function(value,index,arr){
        return value > 0;
    })

    //pearson correlation testing
    var price_vs_as = getPearsonCorrelation(cleaned_corr_price,corr_AS)
    console.log("Price vs as " + price_vs_as)

    var price_vs_cs = getPearsonCorrelation(cleaned_corr_price,corr_CS)
    console.log("Price vs cs " + price_vs_cs)

    var price_vs_hom = getPearsonCorrelation(cleaned_corr_price,corr_hom)
    console.log("Price vs homicide " + price_vs_hom)

    var price_vs_cj = getPearsonCorrelation(cleaned_corr_price,corr_robcar)
    console.log("Price vs carjacking " + price_vs_cj)
    
    var price_vs_com = getPearsonCorrelation(cleaned_corr_price,corr_robcom)
    console.log("Price vs commercial " + price_vs_com)

    var price_vs_res = getPearsonCorrelation(cleaned_corr_price,corr_robres)
    console.log("Price vs residence " + price_vs_res)

    var price_vs_str = getPearsonCorrelation(cleaned_corr_price,corr_robstr)
    console.log("Price vs street " + price_vs_str)

    var price_vs_rape = getPearsonCorrelation(cleaned_corr_price,corr_rape)
    console.log("Price vs rape " + price_vs_rape)

    var price_vs_shoot = getPearsonCorrelation(cleaned_corr_price,corr_shoot)
    console.log("Price vs shooting " + price_vs_shoot)


    });


});




function getPearsonCorrelation(x, y) {
    var shortestArrayLength = 0;
     
    if(x.length == y.length) {
        shortestArrayLength = x.length;
    } else if(x.length > y.length) {
        shortestArrayLength = y.length;
        console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
    } else {
        shortestArrayLength = x.length;
        console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
    }
  
    var xy = [];
    var x2 = [];
    var y2 = [];
  
    for(var i=0; i<shortestArrayLength; i++) {
        xy.push(x[i] * y[i]);
        x2.push(x[i] * x[i]);
        y2.push(y[i] * y[i]);
    }
  
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_x2 = 0;
    var sum_y2 = 0;
  
    for(var i=0; i< shortestArrayLength; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += xy[i];
        sum_x2 += x2[i];
        sum_y2 += y2[i];
    }
  
    var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    var step4 = Math.sqrt(step2 * step3);
    var answer = step1 / step4;
  
    return answer
}