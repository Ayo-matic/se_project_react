import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`item-modal ${isOpen ? "item-modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="item-modal__content">
        <button
          type="button"
          className="item-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &#10005;
        </button>
        {card && card.link && (
          <img src={card.link} alt={card.name} className="item-modal__image" />
        )}
        <div className="item-modal__footer">
          <p className="item-modal__name">{card?.name}</p>
          <p className="item-modal__weather">Weather: {card?.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
