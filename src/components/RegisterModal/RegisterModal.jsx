import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const defaultValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

// onRegister refers to the registration handler declared in App.jsx. It
// receives the form values and the reset handler, mirroring the pattern
// used by AddItemModal.
function RegisterModal({ isOpen, onRegister, onCloseModal, onLoginClick }) {
  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values, handleReset);
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Next"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
        <input
          type="email"
          id="register-email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          type="password"
          id="register-password"
          name="password"
          className="modal__input"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name*
        <input
          type="text"
          id="register-name"
          name="name"
          className="modal__input"
          placeholder="Name"
          required
          minLength={2}
          maxLength={30}
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          id="register-avatar"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
      <p className="modal__switch-text">
        or{" "}
        <button
          type="button"
          className="modal__switch-link"
          onClick={onLoginClick}
        >
          Log in
        </button>
      </p>
    </ModalWithForm>
  );
}

export default RegisterModal;
