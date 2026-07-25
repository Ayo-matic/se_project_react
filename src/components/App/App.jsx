import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getWeather, parseWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/api";
import { register, login, checkToken } from "../../utils/auth";
import { getToken, setToken, removeToken } from "../../utils/token";
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

  // --- auth state ---------------------------------------------------------
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Prevents ProtectedRoute from redirecting away from /profile while we're
  // still waiting on the initial token-check request to resolve on page load.
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const navigate = useNavigate();

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

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  // --- auth handlers -------------------------------------------------------
  // Registers a new user, then immediately signs them in so they don't have
  // to fill out the login form right after registering.
  const handleRegistration = ({ name, avatar, email, password }, resetForm) => {
    register({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }, resetForm))
      .catch((err) => {
        console.error("Error registering user:", err);
      });
  };

  const handleLogin = ({ email, password }, resetForm) => {
    if (!email || !password) {
      return;
    }

    login({ email, password })
      .then((data) => {
        if (!data.token) {
          return;
        }
        setToken(data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        if (!userData) {
          return;
        }
        setCurrentUser(userData);
        setIsLoggedIn(true);
        resetForm?.();
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error logging in:", err);
      });
  };

  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = getToken();
    updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  // --- API-backed handlers ----------------------------------------------
  const handleAddItemSubmit = (values, resetForm) => {
    const token = getToken();
    addItem(values, token)
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
    const token = getToken();
    deleteItem(selectedCard._id, token)
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

  // Toggles a like on a clothing item. isLiked tells us whether the current
  // user has already liked this card, so we know whether to add or remove
  // the like.
  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.error("Error liking item:", err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.error("Error unliking item:", err));
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

  // --- check for a token on initial page load ------------------------------
  // If a valid token is already in localStorage, log the user back in
  // automatically instead of making them sign in again.
  useEffect(() => {
    const token = getToken();

    if (!token) {
      setIsCheckingToken(false);
      return;
    }

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Error validating token:", err);
        removeToken();
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              currentDate={currentDate}
              city={weatherData.city}
              isLoggedIn={isLoggedIn}
              onAddClick={handleAddClick}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isCheckingToken={isCheckingToken}
                  >
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onAddClick={handleAddClick}
                      onEditProfileClick={handleEditProfileClick}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
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

          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegistration}
            onCloseModal={handleCloseModal}
            onLoginClick={handleLoginClick}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onCloseModal={handleCloseModal}
            onRegisterClick={handleRegisterClick}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
            onCloseModal={handleCloseModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
