function ImagePopup(props) {
  return (
    <div
      onMouseDown={props.closeByOverlay}
      className={
        props.card.isActive
          ? "popup popup_type_photo-viewer popup_opened"
          : "popup popup_type_photo-viewer"
      }
    >
      <div className="popup__photo-viewer">
        <button
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть окно просмотра фото"
          className="popup__close-icon  popup__close-icon_type_photo-viewer"
        />
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <p className="popup__name-image">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
