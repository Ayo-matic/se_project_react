import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Header.css";

function Header({
  currentDate,
  city,
  isLoggedIn,
  onAddClick,
  onRegisterClick,
  onLoginClick,
  isMobileMenuOpened,
  onMenuToggle,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {city || "..."}
        </p>
      </div>

      <button
        type="button"
        className="header__menu-button"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpened ? "✕" : "☰"}
      </button>

      <div
        className={`header__right ${
          isMobileMenuOpened ? "header__right_visible" : ""
        }`}
      >
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              type="button"
              onClick={onAddClick}
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__user-link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {currentUser?.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              type="button"
              onClick={onRegisterClick}
              className="header__auth-btn"
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={onLoginClick}
              className="header__auth-btn header__auth-btn_type_primary"
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
