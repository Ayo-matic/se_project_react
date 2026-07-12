import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp !== null ? `${weatherData.temp}°F` : "--°F"}
      </p>
      <svg
        className="weather-card__icon"
        viewBox="0 0 64 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="52" cy="10" r="8" fill="#ffd23f" />
        <ellipse cx="30" cy="26" rx="24" ry="13" fill="#ffffff" />
        <ellipse cx="14" cy="30" rx="14" ry="9" fill="#ffffff" />
      </svg>
    </section>
  );
}

export default WeatherCard;
