import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick({
      name: props.card.name,
      link: props.card.link,
      isActive: true,
    });
  }

  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDelete() {
    props.openDeleteCardPopup(true);
    props.setinfoCardForDelete(props.card);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          onClick={handleDelete}
          aria-label="Удалить карточку"
          className="element__delete-button"
        />
      )}
      <img
        onClick={handleClick}
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
      />
      <h2 className="element__text">{props.card.name}</h2>
      <div className="element__like">
        <button
          onClick={handleLike}
          type="button"
          aria-label="Поставить лайк"
          className={cardLikeButtonClassName}
        />
        <p className="element__sum-likes">{props.card.likes.length}</p>
      </div>
    </article>
  );
}

export default Card;
