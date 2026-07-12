import { useState, useEffect, useCallback } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";
import { getWeather, parseWeatherData } from "../../utils/weatherApi";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temp: null,
    city: "",
    conditions: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemImageUrl, setNewItemImageUrl] = useState("");
  const [newItemWeather, setNewItemWeather] = useState("hot");

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // --- modal handlers -------------------------------------------------
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = useCallback(() => {
    setActiveModal("");
    setSelectedCard({});
  }, []);

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    setClothingItems([
      {
        _id: Date.now(),
        name: newItemName,
        link: newItemImageUrl,
        weather: newItemWeather,
      },
      ...clothingItems,
    ]);
    setNewItemName("");
    setNewItemImageUrl("");
    setNewItemWeather("hot");
    handleCloseModal();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  // --- close modal on Escape key --------------------------------------
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, handleCloseModal]);

  // --- fetch weather on mount ------------------------------------------
  useEffect(() => {
    getWeather()
      .then((data) => {
        const parsed = parseWeatherData(data);
        setWeatherData(parsed);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          currentDate={currentDate}
          city={weatherData.city}
          onAddClick={handleAddClick}
          isMobileMenuOpened={isMobileMenuOpened}
          onMenuToggle={toggleMobileMenu}
        />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      <ModalWithForm
        title="New garment"
        name="add-garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        onSubmit={handleAddItemSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            id="name"
            className="modal__input"
            placeholder="Name"
            required
            minLength={1}
            maxLength={30}
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            id="imageUrl"
            className="modal__input"
            placeholder="Image URL"
            required
            value={newItemImageUrl}
            onChange={(e) => setNewItemImageUrl(e.target.value)}
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              id="hot"
              name="weather"
              className="modal__radio-input"
              checked={newItemWeather === "hot"}
              onChange={() => setNewItemWeather("hot")}
            />
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id="warm"
              name="weather"
              className="modal__radio-input"
              checked={newItemWeather === "warm"}
              onChange={() => setNewItemWeather("warm")}
            />
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id="cold"
              name="weather"
              className="modal__radio-input"
              checked={newItemWeather === "cold"}
              onChange={() => setNewItemWeather("cold")}
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
