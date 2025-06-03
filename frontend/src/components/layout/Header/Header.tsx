// src/components/Header.tsx
import { Link, NavLink } from 'react-router-dom'; // Импортируем Link и NavLink
import { useEffect, useState } from 'react';

import '../Header/Header.scss';
import image from '@image/icon-user.svg';
import logo from '@image/logo.svg';
import openIcon from '@image/icon/shef-icon.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header__container">
        <nav className="header__nav">
          <ul
            className={`${isMenuOpen ? 'header__nav-list--open' : 'header__nav-list'}`}
          >
            <li>
              <Link to="/" className="header__logo">
                <img src={logo} alt="Recipe Arts Logo" />
              </Link>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-link header__nav-link--active'
                    : 'header__nav-link'
                }
              >
                Главная
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-link header__nav-link--active'
                    : 'header__nav-link'
                }
              >
                Избранное
              </NavLink>
            </li>
          </ul>
          <Link to="/profilepage" className="header__nav-link">
              <img src={image} alt="Profile" />
          </Link>
        </nav>
        <button className="header__burger" onClick={toggleMenu}>
          <img className="header__burger-icon" src={openIcon}></img>
        </button>
      </div>
      <hr className="header__hr" />
    </header>
  );
};

export default Header;
