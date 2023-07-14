import React, { useEffect } from "react";
import api from "../utils/api";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button
          onClick={props.onEditAvatar}
          className="profile__button-edit-avatar"
          aria-label="Редактировать фото пользователя"
          type="button"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></button>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfile}
            aria-label="Редактировать"
            type="button"
            className="profile__edit-button"
          />
          <p className="profile__personal-info">{currentUser.about}</p>
        </div>

        <button
          onClick={props.onAddPlace}
          type="button"
          aria-label="Добавить карточку"
          className="profile__add-button"
        />
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            setinfoCardForDelete={props.setinfoCardForDelete}
            openDeleteCardPopup={props.openDeleteCardPopup}
            onCardLike={props.onCardLike}
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
