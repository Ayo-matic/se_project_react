import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const defaultValues = {
  email: "",
  password: "",
};

// onLogin refers to the login handler declared in App.jsx.
function LoginModal({ isOpen, onLogin, onCloseModal, onRegisterClick }) {
  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values, handleReset);
  }

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email*
        <input
          type="email"
          id="login-email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password*
        <input
          type="password"
          id="login-password"
          name="password"
          className="modal__input"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <p className="modal__switch-text">
        or{" "}
        <button
          type="button"
          className="modal__switch-link"
          onClick={onRegisterClick}
        >
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
