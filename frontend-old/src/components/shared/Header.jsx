import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import image from "../../image/icon-user.svg";
import logo from "../../image/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li>
                <a href="/" className="header__logo">
                  <img src={logo} alt="Recipe Arts Logo" />
                </a>
            </li>
            <li className="header__nav-item">
              <a href="/" className="header__nav-link">
                Главная
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/favourites" className="header__nav-item">
                Избранное
              </a>
            </li>
          </ul>
          <a href="/profilepage" className="header__nav-link">
            <img src={image} alt="Profile" />
          </a>
        </nav>
      </div>
      <hr className="header__hr"/>
    </header>
  );
};

export default Header;
