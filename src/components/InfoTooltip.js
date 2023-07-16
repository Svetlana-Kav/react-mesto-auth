function InfoTooltip(props) {
  return (
    <div
      onMouseDown={props.closeByOverlay}
      className={
        props.isOpen
          ? `popup  popup_opened`
          : `popup`
      }
    >
      <div className="popup__container">
        <button 
          onClick={props.onClose}
          type="button"
          aria-label="Закрыть окно редактирования"
          className={`popup__close-icon`}
        />
        <img className="popup__tooltip-image" src = {props.image}/> 
        <h2 className="popup__tooltipe-title">{props.title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
