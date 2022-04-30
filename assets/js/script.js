// Variable Declarations
var searchHistoryList = $('#search-history-list');
var searchCityInput = $("#search-city");
var searchCityButton = $("#search-city-button");
var clearHistoryButton = $("#clear-history");

// Get access to the OpenWeather API
var APIkey = "e80c86cddae3e0f811424e1f7df7c059"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + APIkey;

// Easy access to data
var cityList = [];

// Check if search history exists
initalizeHistory();
showClear();

// $.ajax({
        //     url: ,
        //     method: "GET"
        // }).then(function(response){
        // });
        // Hitting enter while input is focused will trigger
        // value added to search history
























// test API call
// var APIKey = "e80c86cddae3e0f811424e1f7df7c059"
// var currentWeather = [];
// var excludeAlerts = 'Alerts';
// var cityLat;
// var cityLong;

// var testWeatherAPI = function() {
//     currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=38.581573&lon=-121.494400&appid=e80c86cddae3e0f811424e1f7df7c059`;
//     console.log(currentWeather);
// };

