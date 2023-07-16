import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "./Header";
import * as auth from "../auth.js";

function Register(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(formValue.password, formValue.email)
    .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setFormValue({
            email: "",
            password: "",
          });
          props.setIsInfoTooltipOpenOk(true);
          navigate("/sign-in");
        } else {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    }
    )
    .catch((err) => {
      props.setIsInfoTooltipOpenError(true);
      navigate("/sign-up");
    });
  };

  return (
    <>
      <Header linkButton={{ name: "Войти", link: "/sign-in" }} />
      <div className="form">
        <div className="form__container">
          <p className="form__title">Регистрация</p>
          <form onSubmit={handleSubmit} autoComplete="on">
            <input
              onChange={handleChange}
              className="form__input"
              placeholder="Email"
              name="email"
              value={formValue.email}
              required=""
              type="email"
            />
            <input
              onChange={handleChange}
              type="password"
              className="form__input"
              placeholder="Пароль"
              name="password"
              value={formValue.password}
              required=""
              minLength={2}
              maxLength={40}
            />
            <button className="form__button">Зарегистрироваться</button>
          </form>
          <NavLink to="/sign-in" className="form__link">
            Уже зарегистрированы? Войти
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Register;
