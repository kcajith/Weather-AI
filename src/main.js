const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

document.addEventListener('DOMContentLoaded', () => {
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', handleSearch);

  // Display weather for a default city on load
  fetchWeather('New York');
});

function handleSearch(event) {
  if (event.keyCode === 13) {
    const searchbox = document.querySelector('.search-box');
    fetchWeather(searchbox.value);
  }
}

function fetchWeather(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => response.json())
    .then(updateUI);
}

function updateUI(weather) {
  const cityElement = document.querySelector('.location .city');
  cityElement.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const dateElement = document.querySelector('.location .date');
  dateElement.innerText = `${formatDate(now)} ${getLocalTime(weather.timezone)}`;

  const tempElement = document.querySelector('.current .temp');
  tempElement.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  const weatherElement = document.querySelector('.current .weather');
  weatherElement.innerText = weather.weather[0].main;

  const hilowElement = document.querySelector('.hi-low');
  hilowElement.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function getLocalTime(timezoneOffset) {
  const now = new Date();
  const localTime = new Date(now.getTime() + timezoneOffset * 1000);
  const hours = localTime.getUTCHours().toString().padStart(2, '0');
  const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatDate(date) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${dayOfMonth} ${month} ${year}`;
}

export { getLocalTime, formatDate };