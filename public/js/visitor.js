$(document).ready(function () {
    var proxy = 'https://cors-anywhere.herokuapp.com/';

    // Set listener on Button to search for Restaurants by Cuisine
    $("#btnGetRests").on("click", function (event) {
        event.preventDefault();

        findRestaurants();
    });

    // Set listener on Button to search for Hotels
    $("#btnGetHotels").on("click", function (event) {
        event.preventDefault();

        findHotels();
    });

    
    // Set listener on Button to search for Events
    $("#btnGetEvents").on("click", function (event) {
        event.preventDefault();

        findEvents();
    });
});


function findRestaurants() {
    //first ajax call to get city ID from Zomato
    var search = $("#selectCuisine").val().trim();
    var searchText = restSearchText(search);
    var queryURL = "https://developers.zomato.com/api/v2.1/search?cuisines=" + search + "&city_id=3454&sort=rating&order=desc";
    $.ajax({
        async: true,
        crossDomain: true,
        url: queryURL,
        method: "GET",
        headers: { "user-key": "3924c14ae669a5ad5d15bcf31f11a056" },
        dataType: "json",
    })
    .then(function (data, response) {
        restTableDisplay = document.getElementById("restaurantTable").innerHTML;
        restTableDisplay = "";

        console.log(data.restaurants);

        // variables for the query responses we want
        restaurantsArray = data.restaurants;

        // Drawing out the table
        restTableDisplay = "<div class='modal-dialog modal-lg' role='document'><div class='modal-content'>" + 
            "<div class='modal-header'><h4 class='modal-title' id='restModalTitle'>Top Restaurants Serving " + 
            searchText + 
            " Cuisines</h4>" + 
            "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" + 
            "<span aria-hidden='true'>&times;</span>" + 
            "</button></div><div class='modal-body' id='restModalBody'>" + 
            "<table class='table'><thead class='thead-dark'><tr><th>Name</th>" + 
            "<th>Location</th>" + 
            "<th>Website</th>" + 
            "<th>Cuisines Served</th>" + 
            "<th>Zomato Rating</th>" + 
            "<th>Phone</th>" + 
            "</tr></thead>";

        // Add found restaurants to table
        for (restIndex = 0; restIndex < restaurantsArray.length; restIndex++){

            restaurantInformation = restaurantsArray[restIndex].restaurant; 
            var name, location, url, cuisine, userRating, phoneNumber = "";
            var name = restaurantInformation.name;
            var location = restaurantInformation.location.address;
            var url = "<a href='" + restaurantInformation.url + "'>Link</a>";
            var cuisine = restaurantInformation.cuisines;
            var userRating = restaurantInformation.user_rating.aggregate_rating;
            var phoneNumber = restaurantInformation.phone_numbers;
            
            restTableDisplay += "<tr><td id='table-name'> " + name + " <br/>" +
            "</td><td id='table-location'>" + location +
            "</td><td id='table-pics'>" + url +
            "</td><td id='table-cuisine'>" + cuisine +
            "</td><td id='table-rating'>" + userRating +
            "</td><td id='table-phone'>" + phoneNumber +
            "</td></tr>";
        }

        // Complete the table
        restTableDisplay += "</div></table><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>" + 
        "</div></div></div></div>";
        document.getElementById("restaurantTable").innerHTML = restTableDisplay;
    });
}
    

    // Gets text for search results header
function restSearchText(searchNumber) {
    let keyString = parseInt(searchNumber);

    let cuisineMap = new Map();
    cuisineMap.set(25, "Chinese");
    cuisineMap.set(1, "American");
    cuisineMap.set(381, "Canadian");
    cuisineMap.set(158, "Caribbean");
    cuisineMap.set(38, "European");
    cuisineMap.set(45, "French");
    cuisineMap.set(134, "German");
    cuisineMap.set(156, "Greek");
    cuisineMap.set(148, "Indian");
    cuisineMap.set(135, "Irish");
    cuisineMap.set(55, "Italian");
    cuisineMap.set(207, "Jamaican");

    foundSearchText= cuisineMap.get(keyString);

    return foundSearchText; 

}

function findHotels() {

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=CAD&lang=en_US&sort=recommended&location_id=154995&adults=1&rooms=1",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "fd4d895148msh35329bc553b2a6bp1cb426jsn8fc40da6ef46"
        }
    }
    
    $.ajax(settings)
    .then(function (data) {
        hotelTableDisplay = "";

        console.log(data);

        // variables for the query responses we want
        hotelsArray = data.data;
        console.log(hotelsArray);
        console.log(hotelsArray.length);

        // Drawing out the table
        hotelTableDisplay = "<div class='modal-dialog modal-lg' role='document'><div class='modal-content'>" + 
            "<div class='modal-header'><h4 class='modal-title' id='hotelModalTitle'>Top 30 Hotels Ranked by Best Value According to TripAdvisor</h4>" + 
            "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" + 
            "<span aria-hidden='true'>&times;</span>" + 
            "</button></div><div class='modal-body' id='hotelModalBody'>" + 
            "<table class='table'><thead class='thead-dark'><tr><th>Name</th>" + 
            "<th>Price Level</th>" + 
            "<th>Price Range</th>" + 
            "<th>User Rating " + "<span class='badge'>(# of Reviews)</span></th>" + 
            "</tr></thead>";

        // Add found hotels to table
        for (hotelIndex = 0; hotelIndex < hotelsArray.length; hotelIndex++){

            // API Call to get more info about this hotel
            // thisLocation = hotelsArray[hotelIndex].location_id;
            // thisHotel = getHotelInfo(thisLocation);

            hotelInformation = hotelsArray[hotelIndex]; 
            var name, priceLevel, priceRange, userRating, numReviews = "";
            var name = hotelInformation.name;
            var priceLevel = hotelInformation.price_level;
            var priceRange = hotelInformation.price;
            var userRating = parseFloat(hotelInformation.raw_ranking).toFixed(1);
            var numReviews = hotelInformation.num_reviews;

            // make string for google search
            var name4Google = name.replace(/ /g, "+");
            name4Google += "+London+Ontario";

            hotelTableDisplay += "<tr><td id='table-name'><a href='https://www.google.ca/search?q=" + 
            name4Google + "' target='_blank'>" + name + "</a>" +
            "</td><td id='table-priceLevel'>" + priceLevel +
            "</td><td id='table-priceRange'>" + priceRange +
            "</td><td id='table-rating'>" + userRating + "<span class='badge'>" + numReviews + "</span>" + 
            "</td></tr>";
        }

        // Complete the table
        hotelTableDisplay += "</div></table><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>" + 
        "</div></div></div></div>";
        document.getElementById("hotelTable").innerHTML = hotelTableDisplay;
    });
}

  
function findEvents() {
    var settings = {
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=sVSIZNGxA1AwUgKPTlb0JeVaAD7f7jnG&city=london&stateCode=ON",
        async:true,
        dataType: "json",
        stateCode: "ON",
        city: "London"

      /*  success: function(json) {
            getEvents.json = json;
            showEvents(json);
        },
        error: function(xhr, status, err) {
            console.log(err);
        }*/
    }
    
    $.ajax(settings)
    .then(function (data) {
        eventsTableDisplay = "";

        console.log(data);

        // variables for the query responses we want
        eventsArray = data._embedded.events;
        console.log(eventsArray);
        console.log(eventsArray.length);

        // Drawing out the table
        eventsTableDisplay = "<div class='modal-dialog modal-lg' role='document'><div class='modal-content'>" + 
            "<div class='modal-header'><h4 class='modal-title' id='eventsModalTitle'>Top Local Events According to TicketMaster</h4>" + 
            "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" + 
            "<span aria-hidden='true'>&times;</span>" + 
            "</button></div><div class='modal-body' id='eventsModalBody'>" + 
            "<table class='table'><thead class='thead-dark'><tr><th>Name</th>" + 
            "<th>Link</th>" + 
            "<th>Date</th>" + 
            "<th>Segment " + 
            "</tr></thead>";

        // Add found hotels to table
        for (eventsIndex = 0; eventsIndex < eventsArray.length; eventsIndex++){

            // API Call to get more info about this hotel
            // thisLocation = hotelsArray[hotelIndex].location_id;
            // thisHotel = getHotelInfo(thisLocation);

            eventsInformation = eventsArray[eventsIndex]; 
            var name, url, date, segment;
            var name = eventsInformation.name;
            var url = "<a href='" + eventsInformation.url + "'>Link</a>"; 
            var date = eventsInformation.dates.start.dateTime;
            var segment = eventsInformation.classifications[0].segment.name;

            // make string for google search
            var name4Google = name.replace(/ /g, "+");
            name4Google += "+London+Ontario";

            eventsTableDisplay += "<tr><td id='table-name'><a href='https://www.google.ca/search?q=" + 
            name4Google + "' target='_blank'>" + name + "</a>" +
            "</td><td id='table-url'>" + url +
            "</td><td id='table-date'>" + date +
            "</td><td id='table-segment'>" + segment + 
            "</td></tr>";
        }

        // Complete the table
        eventsTableDisplay += "</div></table><div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>" + 
        "</div></div></div></div>";
        document.getElementById("eventsTable").innerHTML = eventsTableDisplay;
    });
}



/*
// function to use AJAX to GET data from TripAdvisor
function getHotelInfo (hotelId) {
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://tripadvisor1.p.rapidapi.com/hotels/get-details?location_id=" + hotelId,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "fd4d895148msh35329bc553b2a6bp1cb426jsn8fc40da6ef46"
        }
    }
    
    $.ajax(settings).done(function (response) {
        return(response);
    });
}



// simple like button using React - to be enhanced in future release
const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return e(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
        );
    }
}
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
*/