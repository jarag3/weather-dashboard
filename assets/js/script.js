// Variable Declarations
var searchHistoryList = $('#search-history-list');
var searchCityInput = $("#search-city");
var searchCityButton = $("#search-city-button");
var clearHistoryButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumidity = $("#current-humidity");
var currentWindSpeed = $("#current-wind-speed");
var UVindex = $("#uv-index");

// Get access to the OpenWeather API
var APIkey = "e80c86cddae3e0f811424e1f7df7c059"
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + APIkey;

// Easy access to data
var cityList = [];

// Check if search history is present when page loads
initalizeHistory();
showClear();

// Hitting enter while input is focused will trigger
// value added to search history
$(document).on("submit", function(event) {
        event.preventDefault();

        // grab value entered into search
        var searchValue = searchCityInput.val().trim();
        currentConditionsRequest(searchValue)
        searchHistory();
        searchCityInput.val("");
})

// Clicking the search button will trigger
// value added to search history
searchCityButton.on("click", function(event) {
        event.preventDefault();

        // grab value entered into search
        var searchValue = searchCityInput.val().trim();
        currentConditionsRequest(searchValue)
        searchHistory();
        searchCityInput.val("");
});

// Clear search history
clearHistoryButton.on("click", function() {
        // Empty list array
        cityList = [];
        // Update city list history in local storage
        listArray();

        $(this).addClass("hide");
});

// Clicking on a button in the search history
// will fill the dashboard with info about the city
searchHistoryList.on("click", "li.city-btn", function(event) {
        // console.log($(this).data("value"));
        var value = $(this).data("value");
        currentConditionsRequest(value);
        searchHistory(value);
});

// Request OpenWeather API
function currentConditionsRequest(searchValue) {
        // Formulate URL for AJAX api call
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=" + APIkey;
        // AJAX call
        $.ajax({
                url: queryURL,
                method: "GET"
        }).then(function(response) {
                console.log(response);
                currentCity.text(response.name);
                currentCity.append("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt='" + response.weather[0].main + "' />" )
                currentTemp.text(response.main.temp);
                currentTemp.append("&deg;F");
                currentHumidity.text(response.main.humidity + "%");
                currentWindSpeed.text(response.wind.speed + "MPH");

                var lat = response.coord.lat;
                var lon = response.coord.lon;

                var UVurl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
                // Ajax call for UV index
                $.ajax({
                        url: UVurl,
                        method: "GET"
                }).then(function(response) {
                        // console.log("UV call: ")
                        // console.log(response);
                        UVindex.text(response.value);
                });

                var countryCode = response.sys.country;
                var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=" + APIkey + "&lat=" + lat +  "&lon=" + lon;

                // Ajax call for 5-day forecast
                $.ajax({
                        url: forecastURL,
                        method: "GET"
                }).then(function(response) {
                        console.log(response);
                        $('#five-day-forecast').empty();
                        for (var i = 1; i < response.list.length; i+=8) {
                                var forecastCol = $("<div class='col-12 col-md-6 col-lg-2 forecast-day'>");
                                var forecastCard = $("<div class='card'>");
                                var forecastCardBody = $("<div class='card-body'>");
                                var forecastDate = $("<h5 class='card-title'>");
                                var forecastTemp = $("<p class='card-text mb-0'>");
                                var forecastHumidity = $("<p class='card-text mb-0'>");
                                var forecastIcon = $("<img>");

                                $('#five-day-forecast').append(forecastCol);
                                forecastCol.append(forecastCard);
                                forecastCard.append(forecastCardBody);

                                forecastCardBody.append(forecastDate);
                                forecastCardBody.append(forecastIcon);
                                forecastCardBody.append(forecastTemp);
                                forecastCardBody.append(forecastHumidity);

                                forecastIcon.attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                                forecastIcon.attr("alt", response.list[i].weather[0].main)
                                forecastDate.text(response.list[i].dt_txt);
                                forecastTemp.text(response.list[i].main.temp);
                                forecastTemp.prepend("Temp: ");
                                forecastTemp.append("&deg;F");
                                forecastHumidity.text(response.list[i].main.humidity);
                                forecastHumidity.prepend("Humidity: ");
                                forecastHumidity.append("%");

                                console.log(response.list[i].dt_txt);
                                console.log(response.list[i].main.temp);
                                console.log(response.list[i].main.humidity);

                        }
                });
        });
};

// Display and save search history
function searchHistory(searchValue) {
        // Grab value entered in search bar
        // var searchValue = searchCityInput.val().trim();

        // If characters are entered into search bar then
        if (searchValue) {
                // Place value in the array of cities
                // If it is a new entry
                if (cityList.indexOf(searchValue) === -1) {
                        cityList.push(searchValue);

                        // List all cities entered in search history
                        listArray();
                        clearHistoryButton.removeClass("hide");
                } else {
                        // Remove the existing value from the array
                        var removeIndex = cityList.indexOf(searchValue);
                        cityList.splice(removeIndex, 1);

                        // Push value again to array
                        cityList.push(searchValue);

                        // List all cities in search history so old entry appears at the top of history
                        listArray();
                        clearHistoryButton.removeClass("hide");
                }
        }
        // console.log(cityList);
}

// list array into search history 
function listArray () {
        // empty elements 
        searchHistoryList.empty();
        cityList.forEach(function(city) {
                var searchHistoryItem = $('<li class="list-group-item city-btn">');
                searchHistoryItem.attr("data-value", city);
                searchHistoryItem.text(city);
                searchHistoryList.prepend(searchHistoryItem);
        });
        // Update city list history in local storage
        localStorage.setItem("cities", JSON.stringify(cityList));
}

// Grab city list string from local storage and update list array
function initalizeHistory() {
        if (localStorage.getItem("cities")) {
                cityList = JSON.parse(localStorage.getItem("cities"));
                var lastIndex = cityList.length - 1;
                // console.log(cityList);
                listArray();
                // display the last city viewed if page is refreshed
                if (cityList.length !== 0) {
                        currentConditionsRequest(cityList[lastIndex]);
                }
        }
}

// Check to see if there are elements in
// search history sidebar in order to show clear history btn
function showClear() {
                if (searchHistoryList.text() !== "") {
                        clearHistoryButton.removeClass("hide");
                }
        }
