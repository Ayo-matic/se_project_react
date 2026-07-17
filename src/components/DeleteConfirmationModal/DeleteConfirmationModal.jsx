import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`confirmation-modal ${
        isOpen ? "confirmation-modal_opened" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div className="confirmation-modal__content">
        <button
          type="button"
          className="confirmation-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &#10005;
        </button>
        <p className="confirmation-modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          type="button"
          className="confirmation-modal__confirm-btn"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="confirmation-modal__cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
