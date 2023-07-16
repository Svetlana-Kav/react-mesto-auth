import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
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
import Register from "./Register";
import Login from "./Login";
import imageInfoTooltipOk from "../images/status-ok.svg";
import imageInfoTooltipError from "../images/status-error.svg";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../auth.js";

function App() {
  //переменные попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpenOk, setIsInfoTooltipOpenOk] = React.useState(false);
  const [isInfoTooltipOpenError, setIsInfoTooltipOpenError] =
    React.useState(false);

  const [infoCardForDelete, setinfoCardForDelete] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  /////
  // const [loggedIn, setLoggedIn] = React.useState(true);

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
    setIsInfoTooltipOpenOk(false);
    setIsInfoTooltipOpenError(false);
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
      selectedCard ||
      isInfoTooltipOpenOk ||
      isInfoTooltipOpenError
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

  //переменная наличия токена
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  //проверка токена при первой отрисовке
  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      console.log(jwt);
      auth.checkToken(jwt).then((res) => {
        setLoggedIn(true);
        setUserEmail(res.data.email);
        console.log(userEmail);
        navigate("/", { replace: true });
      });
    }
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        {loggedIn && (
          <Header
            linkButton={{ name: "Выйти", link: "/sign-in" }}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            email={userEmail}
          />
        )}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                setIsInfoTooltipOpenOk={setIsInfoTooltipOpenOk}
                setIsInfoTooltipOpenError={setIsInfoTooltipOpenError}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                setinfoCardForDelete={setinfoCardForDelete}
                openDeleteCardPopup={setIsDeleteCardPopupOpen}
                cards={cards}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onCardClick={handleCardClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                loggedIn={loggedIn}
              />
            }
          />
        </Routes>
        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpenOk}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
          image={imageInfoTooltipOk}
          title="Вы успешно зарегистрировались"
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpenError}
          onClose={closeAllPopups}
          closeByOverlay={closeByOverlay}
          image={imageInfoTooltipError}
          title="Что-то пошло не так! Попробуйте ещё раз."
        />

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
