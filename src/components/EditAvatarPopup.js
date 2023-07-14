import React, { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputElement = useRef();

  //обработка сабмита
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputElement.current.value,
    });
    inputElement.current.value = "";
  }

  return (
    <PopupWithForm
      loading={props.loading}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeByOverlay={props.closeByOverlay}
      name="add-avatar"
      title="Обновить аватар"
      nameButton="Сохранить"
    >
      <label className="popup__form-field">
        <input
          ref={inputElement}
          name="avatar"
          id="input-avatar"
          placeholder="Фото профиля"
          required=""
          className="popup__input popup__input_type_avatar"
          type="url"
        />
        <span className="input-avatar-error popup__form-input-error" />
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
