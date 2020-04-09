$(document).ready(function() {

    var proxy = 'https://cors-anywhere.herokuapp.com/';


    //--------------------------------------------------SEARCH BY CUISINE-----------------------------------------
   
    function select() {
     var valueDropdown = $('#select_id').val();
     var settings = {
      "async": true,
      "crossDomain": true,
      "url": proxy + "https://developers.zomato.com/api/v2.1/search?cuisine_id=" + valueDropdown + "&city_id=3454&sort=rating&order=desc",
      "method": "GET",
      "headers": {
       "user-key": "3924c14ae669a5ad5d15bcf31f11a056",
       'Content-Type': 'application/x-www-form-urlencoded'
      }
     }
   

     $.getJSON(settings, function(data) {
   
      data = data.restaurants;
      var html = "";
   
      $.each(data, function(index, value) {
   
       var x = data[index];
        console.log(typeof x);
       $.each(x, function(index, value) {
        var location = x.restaurant.location;
        var userRating = x.restaurant.user_rating;
        html += "<div class='data img-rounded'>";
        html += "<div class='rating'>";
   
        html += "<span title='" + userRating.rating_text + "'><p style='color:white;background-color:#" + userRating.rating_color + ";border-radius:4px;border:none;padding:2px 10px 2px 10px;text-align: center;text-decoration:none;display:inline-block;font-size:16px;float:right;'><strong>" + userRating.aggregate_rating + "</strong></p></span><br>";
        html += "  <strong class='text-info'>" + userRating.votes + " votes</strong>";
        html += "</div>";
        html += "<img class='resimg img-rounded' src=" + value.thumb + " alt='Restaurant Image' height='185' width='185'>";
        html += "<a href=" + value.url + " target='_blank' class='action_link'><h2 style='color:red;'><strong>" + value.name + "</strong></h2></a>";
        html += "  <strong class='text-primary'>" + location.locality + "</strong><br>";
        html += "  <h6 style='color:grey;'><strong>" + location.address + "</strong></h6><hr>";
        html += "  <strong>CUISINES</strong>: " + value.cuisines + "<br>";
        html += "  <strong>COST FOR TWO</strong>: " + value.currency + value.average_cost_for_two + "<br>";
        html += "</div><br>";
       });
      });
      $(".message").html(html);
     });
   
    }
    //--------------------------------------------------------------------------------------------------------
    $("#select_id").change(function() {
     select();
    });
   });

/*
   $(document).ready(function(){

    var proxy = 'https://cors-anywhere.herokuapp.com/';
    
      var Ip = 'https://ipinfo.io/json';
    
         $.getJSON(Ip, function(data) {
          var city = data.city;
          var region = data.region;
          var country = data.country;
    
          var KEY = '&APPID=767a7cce68ed2b3098d41e24364ec56c';
    
          var URL ='http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + region + country + KEY;
    
          $.getJSON(proxy + URL, function(data) {
            var type = data.weather[0].main;  //array 0 index
            var id = data.weather[0].id; //array 0 index
            var city = data.name;
    
            var tempCel = Math.round(data.main.temp - 273.15);
            var tempC = tempCel + '°C';
            var weather = data.weather[0].description;
    
            //var tempF = Math.round(tempCel * (9 / 5) + 32) + '°F';
            var icon = data.weather[0].icon;
            //var tempBool = true;
    
            //Output data to display on the page
            $('#city').text(city);
            $('#state').text(region);
           $('#temp').text(tempCel); //Show Fahrenheit by Default
           var weatherIcon = 'http://openweathermap.org/img/w/' + icon + '.png';
            $('#wIcon').html('<img src=' + weatherIcon + '>');
    
    
    
    
            });
         });
      });*/