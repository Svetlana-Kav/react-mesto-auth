import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [nameCard, setNameCard] = useState("");
  const [linkCard, setLinkCard] = useState("");

  React.useEffect(() => {
    setNameCard("");
    setLinkCard("");
  }, [props.isOpen]);

  function handleChangeName(e) {
    setNameCard(e.target.value);
  }

  function handleChangeLink(e) {
    setLinkCard(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: nameCard,
      link: linkCard,
    });
  }

  return (
    <PopupWithForm
      loading={props.loading}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeByOverlay={props.closeByOverlay}
      name="add-card"
      title="Новое место"
      nameButton="Создать"
    >
      <label className="popup__form-field">
        <input
          onChange={handleChangeName}
          name="name"
          id="input-name-card"
          minLength={2}
          maxLength={30}
          placeholder="Название"
          required=""
          className="popup__input popup__input_type_name-card"
          type="text"
          value={nameCard}
        />
        <span className="input-name-card-error popup__form-input-error" />
      </label>
      <label className="popup__form-field">
        <input
          onChange={handleChangeLink}
          name="link"
          id="input-link"
          placeholder="Ссылка на картинку"
          required=""
          className="popup__input popup__input_type_link-image"
          type="url"
          value={linkCard}
        />
        <span className="input-link-error popup__form-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
