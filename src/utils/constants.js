// OpenWeather API key and location coordinates.
// NOTE: this key will be visible in your public GitHub repo once you push.
// That's fine for a free-tier OpenWeather key used in a school project, but
// in real-world apps secrets like this belong in an untracked .env file.
export const APIkey = "24fdafd19e49c4208fb6846170cdc68e";

// New York, NY — swap these for whatever city you prefer
export const coordinates = {
  latitude: 40.7128,
  longitude: -74.006,
};

export const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${APIkey}`;
