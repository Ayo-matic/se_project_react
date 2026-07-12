import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import "./Header.css";

function Header({
  currentDate,
  city,
  onAddClick,
  isMobileMenuOpened,
  onMenuToggle,
}) {
  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="WTWR logo" className="header__logo" />
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
        <button
          type="button"
          onClick={onAddClick}
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="User avatar" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
