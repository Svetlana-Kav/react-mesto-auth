import logo from "../logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="место Россия" />
    </header>
  );
}

export default Header;
