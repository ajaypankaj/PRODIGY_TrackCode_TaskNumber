const apiKey = '5397a3a434229fc6c78b41f4fff73927'; // 🔑 Replace this with your actual OpenWeatherMap API key
const weatherDiv = document.getElementById('weather');

function showWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  weatherDiv.innerHTML = `
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
    <div class="weather-info">
      <strong>${name}</strong><br>
      <strong>${description.toUpperCase()}</strong><br>
      🌡 Temp: ${temp}°C<br>
      💧 Humidity: ${humidity}%<br>
      💨 Wind Speed: ${speed} m/s
    </div>
  `;
}

function showError(message) {
  weatherDiv.innerHTML = `<p>${message}</p>`;
}

function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Weather data not found");
      return response.json();
    })
    .then(showWeather)
    .catch(err => showError("Error fetching weather data."));
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getWeather(latitude, longitude);
      },
      error => showError("Location access denied.")
    );
  } else {
    showError("Geolocation is not supported by this browser.");
  }
}

// On load
getLocation();