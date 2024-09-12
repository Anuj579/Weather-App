const inputForm = document.getElementById('inputForm')
const currentTemperatureElement = document.getElementById('current-temperature')
const currentConditionElement = document.getElementById('current-condition')
const currentPlaceElement = document.getElementById('current-place')
const weatherConditionImg = document.getElementById('weather-condition-img')
const forecastContainer = document.getElementById('forecastContainer')

const apiKey = '' // Use your API here

function getWeather(city) {
    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`

    fetch(currentWeather)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                currentTemperatureElement.innerText = `${Math.round(data.main.temp)}°C`
                currentConditionElement.innerText = data.weather[0].main
                weatherConditionImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                currentPlaceElement.innerText = `${data.name}, ${data.sys.country}`
            } else {
                console.log('Error in current weather');
            }
        })
        .catch(error => console.log('Error:', error.message))

    fetch(forecast)
        .then(response => response.json())
        .then(data => {

            if (data.cod === "200") {
                const forecastList = data.list
                const dailyForecast = forecastList.filter(item => item.dt_txt.includes("12:00:00"))
                forecastContainer.innerHTML = '' // Clear previous forecast cards

                dailyForecast.forEach(day => {
                    const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })
                    const temperature = Math.round(day.main.temp)
                    const iconCode = day.weather[0].icon
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
                    const weatherCondtion = day.weather[0].main

                    const forecastElement = document.createElement('div')
                    forecastElement.classList.add('card')
                    forecastElement.innerHTML = `
                        <h3>${date}</h3>
                        <img src="${iconUrl}" alt= 'Weather icon'>
                        <p class='forecast-temperature'>${temperature}°C</p>
                        <p>${weatherCondtion}</p>
                    `
                    forecastContainer.appendChild(forecastElement)
                })
            } else if (data.cod === "404") {
                console.log("Error: No Place Found!");
                alert('No place found!')
                return
            } else {
                console.log('Error in forecast');
            }
            // console.log('Cod:',data.cod);

        })
        .catch(error => console.log('Error:', error.message)
        )
}

getWeather('Haryana')

inputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const place = document.getElementById('search-box').value
    getWeather(place)
})

function setTimeBasedTheme() {
    const hour = new Date().getHours()
    const body = document.body;
    if (hour >= 6 && hour < 12) {
        body.style.background = 'linear-gradient(135deg, #87CEEB 10%, #4682B4 100%)';
    } else if (hour >= 12 && hour < 17) {
        body.style.background = 'linear-gradient(135deg, #81c9d6 10%, #0bb1f3 100%)';
    } else if (hour >= 17 && hour < 19) {
        body.style.background = 'linear-gradient(135deg, #53C5E7 10%, #1E5F94 100%)';
    } else {
        body.style.background = 'linear-gradient(135deg, #212e3b 10%, #181729 100%)';
    }
}

setTimeBasedTheme()
setInterval(setTimeBasedTheme(), 60000);