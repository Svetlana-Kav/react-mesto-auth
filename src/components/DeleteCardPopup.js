import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.handleCardDelete();
  }

  return (
    <PopupWithForm
      loading={props.loading}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeByOverlay={props.closeByOverlay}
      name="delete-card"
      title="Вы уверены?"
      nameButton="Да"
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
