import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getWeather, parseWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/api";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temperature: { F: null, C: null },
    city: "",
    conditions: "",
    isDay: true,
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // --- temperature unit toggle -----------------------------------------
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // --- modal handlers ---------------------------------------------------
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

  // Opens the delete confirmation modal; the card to delete is already
  // stored in selectedCard, so we keep it and only switch modals.
  const openConfirmationModal = () => {
    setActiveModal("delete-confirmation");
  };

  // --- API-backed handlers ----------------------------------------------
  const handleAddItemSubmit = (values, resetForm) => {
    addItem(values)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleCardDelete = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id),
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  // --- close modal on Escape key ----------------------------------------
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

  // --- fetch weather on mount --------------------------------------------
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

  // --- fetch clothing items from the server on mount ----------------------
  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Error fetching clothing items:", err);
      });
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            currentDate={currentDate}
            city={weatherData.city}
            onAddClick={handleAddClick}
            isMobileMenuOpened={isMobileMenuOpened}
            onMenuToggle={toggleMobileMenu}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItemSubmit}
          onCloseModal={handleCloseModal}
        />

        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
          onDeleteClick={openConfirmationModal}
        />

        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={handleCloseModal}
          onConfirm={handleCardDelete}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
