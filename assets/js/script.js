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


// $.ajax({
//     url: ,
//     method: "GET"
// }).then(function(response){

// });

// Hitting enter while input is focused will trigger
// value added to search history
$(document).on("submit", function(event) {
        event.preventDefault();
        searchHistory();
})

// Clicking the search button will trigger
// value added to search history
searchCityButton.on("click", function(event) {
        event.preventDefault();
        searchHistory();
});

function searchHistory() {
        // Grab value entered in search bar
        var searchValue = searchCityInput.val().trim();

        // If characters are entered into search bar then
        if (searchValue) {
                // Place value in the array of cities
                // If it is a new entry
                if (cityList.indexOf(searchValue) === -1) {
                        cityList.push(searchValue);

                        // List all cities entered in search history
                        listArray();
                } else {
                        // Remove the existing value from the array
                        var removeIndex = cityList.indexOf(searchValue);
                        cityList.splice(removeIndex, 1);

                        // Push value again to array
                        cityList.push(searchValue);

                        // List all cities in search history so old entry appears at the top of history
                        listArray();
                }
        }
        console.log(cityList);
}

// list array into search history 
function listArray () {
        // empty elements 
        searchHistoryList.empty();
        cityList.forEach(function(city) {
                var searchHistoryItem = $('<li class="list-group-item">');
                searchHistoryItem.text(city);
                searchHistoryList.prepend(searchHistoryItem);
        });
}
console.log(cityList);






























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

