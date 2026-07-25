import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({ weatherData, clothingItems, onCardClick, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type,
  );

  const temperature = weatherData.temperature?.[currentTemperatureUnit];

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__weather-summary">
        {temperature !== undefined && temperature !== null
          ? `Today is ${temperature}° ${currentTemperatureUnit} / You may want to wear:`
          : "Loading weather..."}
      </p>
      <ul className="cards__list">
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
