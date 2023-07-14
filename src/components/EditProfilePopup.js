import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleInputName(evt) {
    setName(evt.target.value);
  }

  function handleInputDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      loading={props.loading}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeByOverlay={props.closeByOverlay}
      name="edit-profile"
      title="Редактировать профиль"
      nameButton="Сохранить"
    >
      <label className="popup__form-field">
        <input
          onChange={handleInputName}
          name="nameUser"
          id="input-name"
          placeholder="Имя"
          value={name}
          required=""
          minLength={2}
          maxLength={40}
          className="popup__input popup__input_type_name"
          type="text"
        />
        <span className="input-name-error popup__form-input-error" />
      </label>
      <label className="popup__form-field">
        <input
          onChange={handleInputDescription}
          name="personalInfo"
          id="input-info"
          placeholder="О себе"
          value={description}
          required=""
          minLength={2}
          maxLength={200}
          className="popup__input popup__input_type_info"
          type="text"
        />
        <span className="input-info-error popup__form-input-error" />
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
