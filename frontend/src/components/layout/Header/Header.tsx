import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Icons } from '@/styles/import-image';
import '../Header/Header.scss';
import logo from '@image/logo.svg';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const location = useLocation();
  const noMarginPages = ['/login', '/register', '/auth'];
  const noMarginBottom = noMarginPages.includes(location.pathname);

  return (
    <header className={noMarginBottom ? "header--no-margin" : "header"}>
      <div className="header__container">
        <nav className="header__nav">
          <Link to="/" className="header__logo">
            <img src={logo} alt="Recipe Arts Logo" />
          </Link>
          <ul
            className={`${isMenuOpen ? 'header__nav-list--open' : 'header__nav-list'}`}
          >
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
            <li className="header__nav-item">
              <NavLink
                to="/recipes"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-link header__nav-link--active'
                    : 'header__nav-link'
                }
              >
                Рецепты
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/articles"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-link header__nav-link--active'
                    : 'header__nav-link'
                }
              >
                Статьи
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-link header__nav-link--active'
                    : 'header__nav-link'
                }
              >
                Поддержка
              </NavLink>
            </li>
          </ul>
          <Link to="/profilepage" className="header__user-profile">
            <button className="header__exit-button">
              <h2>Выйти</h2>
              <img src={Icons.iconExit} alt="Выйти" />
            </button>
            <img src={Icons.iconEmptyUser} alt="Profile" />
          </Link>
        </nav>
      </div>
      <hr className="header__hr" />
    </header>
  );
};

export default Header;
