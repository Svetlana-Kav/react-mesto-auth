import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import * as auth from "../auth.js";

function Login({ handleLogin }) {
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
    auth
      .authorize(formValue.password, formValue.email)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header linkButton={{ name: "Регистрация", link: "/sign-up" }} />
      <div className="form">
        <div className="form__container">
          <p className="form__title">Вход</p>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              className="form__input"
              placeholder="Email"
              name="email"
              required=""
              type="email"
              value={formValue.email}
            />
            <input
              type="password"
              className="form__input"
              placeholder="Пароль"
              name="password"
              required=""
              value={formValue.password}
              onChange={handleChange}
            />
            <button className="form__button">Войти</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
