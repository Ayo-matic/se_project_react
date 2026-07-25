import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

// onUpdateProfile refers to the handler declared in App.jsx.
function EditProfileModal({
  isOpen,
  currentUser,
  onUpdateProfile,
  onCloseModal,
}) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  // Pre-fill the form with the current user's data every time the modal
  // opens, so it always reflects the latest profile info rather than
  // whatever was left over from the last time it was opened.
  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateProfile(values);
  }

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-profile-name" className="modal__label">
        Name*
        <input
          type="text"
          id="edit-profile-name"
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
      <label htmlFor="edit-profile-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          id="edit-profile-avatar"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
