var apiKey = "16d9fbf74183ba3cea68239fe0d4b771"
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
// include 2nd URL//
var weatherForecast = "https://api.openweathermap.org/data/2.5/onecall"
var searchForm = document.getElementById("search");
var searchInput = document.getElementById("city");
var cityArr = [];
var cityNameEl = document.querySelector('city-name');

searchForm.addEventListener("submit", function (eventData) {
    console.log("click");
    eventData.preventDefault();

    getCityByWeatherName();
});

async function getCityByWeatherName(lat, lon) {
    var response = await fetch(weatherUrl + "?q=" + searchInput.value + "&units=imperial&appid=" + apiKey)
    var data = await response.json();
    console.log(data);
    var lon = data.coord['lon'];
    var lat = data.coord['lat'];

};
