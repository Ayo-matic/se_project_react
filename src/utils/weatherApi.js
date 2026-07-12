import { weatherApiUrl } from "./constants";

// Fetches raw weather data from the OpenWeather API
function getWeather() {
  return fetch(weatherApiUrl).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}

// Extracts only the pieces of the OpenWeather response the app needs:
// the city name and the current temperature, rounded to the nearest degree.
function parseWeatherData(data) {
  const city = data.name;
  const temp = Math.round(data.main.temp);
  const conditions = data.weather?.[0]?.main ?? "Clear";
  const isDay =
    Date.now() / 1000 >= data.sys.sunrise &&
    Date.now() / 1000 < data.sys.sunset;

  return { city, temp, conditions, isDay, type: getWeatherCondition(temp) };
}

// Buckets a Fahrenheit temperature into a coarse weather category used to
// filter which clothing cards get shown to the user.
function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

export { getWeather, parseWeatherData, getWeatherCondition };
