function PopupWithForm(props) {
  return (
    <div
      onMouseDown={props.closeByOverlay}
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть окно редактирования"
          className={`popup__close-icon popup__close-icon_type_${props.name}`}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          onSubmit={props.onSubmit}
          name={props.name}
          className={`popup__form popup__form-${props.name}`}
          noValidate=""
        >
          {props.children}

          <button
            aria-label="Сохранить"
            className={`popup__submit-button popup__submit-button_type_${props.name}`}
          >
            {props.loading ? "Сохранение..." : props.nameButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
