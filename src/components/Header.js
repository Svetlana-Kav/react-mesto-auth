import React from "react";
import logo from "../logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate()

function signOut(){
  if(props.loggedIn){
  localStorage.removeItem('jwt');
  props.setLoggedIn(false)
  navigate("sign-in")
  }
}

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="место Россия" />
      <div className="header__container">
        {props.loggedIn && <p className="header__user-email">{props.email}</p>}
        <NavLink onClick = {signOut} className={props.loggedIn ? "header__link header__link_active" : "header__link"} to={props.linkButton.link}>{props.linkButton.name}</NavLink>
      </div>
    </header>
  );
}

export default Header;
