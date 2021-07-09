var apiKey = "16d9fbf74183ba3cea68239fe0d4b771"
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather"
// include 2nd URL//
var weatherForecast = "https://api.openweathermap.org/data/2.5/onecall?appid=" + apiKey + "&units=imperial";
var searchForm = document.getElementById("search");
var searchInput = document.getElementById("city");
var cityArr = [];
var cityNameEl = document.querySelector('city-name');
var currentContainer = document.getElementById('container');
var weeklyContainer = document.getElementById('card');
var searchHistory = document.getElementById('search-history');

searchForm.addEventListener("submit", function (eventData) {
    console.log("click");
    eventData.preventDefault();

    getCityByWeatherName();
});

async function getCityByWeatherName() {
    var response = await fetch(weatherUrl + "?q=" + searchInput.value + "&units=imperial&appid=" + apiKey)
    var data = await response.json();

    var lon = data.coord['lon'];
    var lat = data.coord['lat'];
    var weeklyresponse = await fetch(weatherForecast + '&lat=' + lat + '&lon=' + lon)
    var weeklydata = await weeklyresponse.json();

    data.weekly = weeklydata.daily.slice(0, 5)
    console.log(data)
    displayWeatherInfo(data)
    saveLocalStorage(data.name, data)
};

function displayWeatherInfo(weatherinfo) {
  currentContainer.innerHTML = ' '
  weeklyContainer.innerHTML = ' ' 
    currentContainer.innerHTML += ' <h1 id=city-name class="display-4"> ' + weatherinfo.name + '</h1>'
    currentContainer.innerHTML += ' <p> Wind: ' + weatherinfo.wind.speed + '</p>'
    currentContainer.innerHTML += ' <p> UV: ' + weatherinfo.weekly[0].uvi + '</p>'
    currentContainer.innerHTML += ' <p> Temperature: ' + weatherinfo.main.temp + '</p>'
    currentContainer.innerHTML += ' <p> Humidity: ' + weatherinfo.main.humidity + '</p>'
    var today = new Date();



    for (let i = 0; i < weatherinfo.weekly.length; i++) {
        const element = weatherinfo.weekly[i];
        var date = new Date();
        date.setDate(today.getDate()+(i+1))
        weeklyContainer.innerHTML += `<div class="card">
        <div class="card-body">
            <h5 class="card-title">${date.toLocaleDateString()}</h5>
            <p>Wind: ${element.wind_speed}</p>
            <p>UV: ${element.uvi}</p>
            <p>Temp: ${element.temp.day}</p>
            <p>Humidity: ${element.humidity}</p>
        </div>
    </div>`
    }
}

function saveLocalStorage(cityName, cityWeather) {
localStorage.setItem(cityName, JSON.stringify(cityWeather))
}
function showSearchHistory(){
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i)
        var weatherData = localStorage.getItem(key)
        searchHistory.innerHTML += `<button type="button" class="btn btn-secondary history">${key}</button>`
    }
    var allHistoryButtons = document.querySelectorAll('.history')
    for (let i = 0; i < allHistoryButtons.length; i++) {
        const element = allHistoryButtons[i];
        element.addEventListener('click', function(event){
            var keyName = event.target.textContent
            console.log(keyName);
            var weatherString = localStorage.getItem(keyName);
            var weatherData = JSON.parse(weatherString);
    displayWeatherInfo(weatherData);

        })
        
    }
}
showSearchHistory();
