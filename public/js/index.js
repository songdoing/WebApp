// Counter Mark
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};

		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};

			$self.data('countTo', data);

			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 300,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });

  // start all the timers
  $('.timer').each(count);

  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});
// Current Timer
function startUp() {
		// Initialize date
		var mydate = new Date();
		var year = mydate.getYear() + 1900;
		var month = mydate.getMonth();
		var daym = mydate.getDate();
		// creating an arrary for the months of the year
		var montharray = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
		// Display the Local time
		var myVar = setInterval(myTimer, 1000);

		function myTimer() {
				var d = new Date();
				document.getElementById("date").innerHTML = year + "/" + montharray[month] + "/" + daym + "   " + d.toLocaleTimeString();
		}
}
// Weather API Jss
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
  });
// education starts from here
function postSec(selected){
if(selected)
{
document.getElementById("postS").style.display = "";
}

else
{
document.getElementById("postS").style.display = "none";
}

}
// *******************************
function islam(selected){
if(selected)
{
document.getElementById("islamicS").style.display = "";
}

else
{
document.getElementById("islamicS").style.display = "none";
}

}
// *******************************
function Provincial(selected){
if(selected)
{
document.getElementById("Provincials").style.display = "";
}

else
{
document.getElementById("Provincials").style.display = "none";
}

}
// *******************************
function PublicSchool(selected){
if(selected)
{
document.getElementById("PublicSchools").style.display = "";
}
else
{
document.getElementById("PublicSchools").style.display = "none";
}

}
function elm(selected){
if(selected)
{
document.getElementById("elementary").style.display = "";
}
else
{
document.getElementById("elementary").style.display = "none";
}

}
function sec(selected){
if(selected)
{
document.getElementById("secondary").style.display = "";
}
else
{
document.getElementById("secondary").style.display = "none";
}

}
// *******************************
function PrivateSchool(selected){
if(selected)
{
document.getElementById("PrivateSchools").style.display = "";
}
else
{
document.getElementById("PrivateSchools").style.display = "none";
}

}
// *******************************
function catholic(selected){
if(selected)
{
document.getElementById("catholicS").style.display = "";
}
else
{
document.getElementById("catholicS").style.display = "none";
}

}
function Celm(selected){
if(selected)
{
document.getElementById("Celementary").style.display = "";
}
else
{
document.getElementById("Celementary").style.display = "none";
}

}
function Csec(selected){
if(selected)
{
document.getElementById("Csecondary").style.display = "";
}
else
{
document.getElementById("Csecondary").style.display = "none";
}

}
// Ends on here
