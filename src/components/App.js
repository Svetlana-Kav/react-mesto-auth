import React from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);

  const [infoCardForDelete, setinfoCardForDelete] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  //загрузка карточек и данных о пользователе при первоначальной отрисовке
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => console.log(error));

    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`${err.status} ${err.text}`);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ ...selectedCard, isActive: false });
    setIsDeleteCardPopupOpen(false);
  }

  function handleCardClick({ name, link, isActive }) {
    setSelectedCard({ name, link, isActive });
  }
  //закрытие на оверлей
  function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }
  //закрытие на Escape
  function handleEscape(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  //добавление и удаление ЛАЙКОВ
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`${err.status} ${err.text}`);
      });
  };

  //удаление КАРТОЧЕК
  const handleCardDelete = () => {
    setLoading(true);
    api
      .deleteCard(infoCardForDelete._id)
      .then((cards) => {
        setCards((state) =>
          state.filter((c) => c._id !== infoCardForDelete._id)
        );
      })
      .then((data) => closeAllPopups())
      .catch((err) => {
        console.log(`${err.status} ${err.text}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //САБМИТ РЕДАКТИРОВАНИЯ ПРОФИЛЯ

  function handleUpdateUser({ name, about }) {
    setLoading(true);
    api
      .editUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
      })
      .then((data) => closeAllPopups())
      .catch((err) => {
        console.log(`${err.status} ${err.text}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //САБМИТ РЕДАКТИРОВАНИЯ АВАТАРА

  function handleSubmitAvatar({ avatar }) {
    setLoading(true);
    api
      .editUserAvatar({ avatar })
      .then((data) => {
        setCurrentUser(data);
      })
      .then((data) => closeAllPopups())
      .catch((err) => {
        console.log(`${err.status} ${err.text}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //САБМИТ ДОБАВЛЕНИЯ КАРТОЧКИ
  function handleAddPlaceSubmit(data) {
    setLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then((data) => closeAllPopups())
      .catch((err) => {
        console.log(`${err.status} ${err.text}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard
    ) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
  ]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          setinfoCardForDelete={setinfoCardForDelete}
          openDeleteCardPopup={setIsDeleteCardPopupOpen}
          cards={cards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
        />
        <Footer />

        {/* попап изменения аватара */}

        <EditAvatarPopup
          loading={loading}
          onUpdateAvatar={handleSubmitAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
        />

        {/* попап редактирования профиля */}

        <EditProfilePopup
          loading={loading}
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
        ></EditProfilePopup>

        {/* попап добавления карточки */}

        <AddPlacePopup
          loading={loading}
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
        ></AddPlacePopup>

        {/*попап удаления карточки*/}

        <DeleteCardPopup
          loading={loading}
          handleCardDelete={handleCardDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
          name="delete-card"
          title="Вы уверены?"
          nameButton="Да"
        ></DeleteCardPopup>

        {/* попап увеличения картинки */}

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
