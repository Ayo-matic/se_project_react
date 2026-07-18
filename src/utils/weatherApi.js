import { weatherApiUrl } from "./constants";
import { checkResponse } from "./api";

// Fetches raw weather data from the OpenWeather API
function getWeather() {
  return fetch(weatherApiUrl).then(checkResponse);
}

// Extracts only the pieces of the OpenWeather response the app needs:
// the city name and the current temperature in both units, rounded to the
// nearest degree. The API returns Fahrenheit (units=imperial), so the
// Celsius value is derived from it.
function parseWeatherData(data) {
  const city = data.name;
  const temperature = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  const conditions = data.weather?.[0]?.main ?? "Clear";
  const isDay =
    Date.now() / 1000 >= data.sys.sunrise &&
    Date.now() / 1000 < data.sys.sunset;

  return {
    city,
    temperature,
    conditions,
    isDay,
    type: getWeatherCondition(temperature.F),
  };
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
