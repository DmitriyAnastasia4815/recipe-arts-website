/**
 * @component Header
 * @description Компонент шапки приложения, включающий навигационное меню
 *
 *
 *Компонент  отражает логотип, ссылки на стрнаницы Главная и Избранное, а также иконку профиля пользователя по которой можно перейти в профиль
 *
 * @returns {JSX.Element} JSX- элемент, представляющий шапку приложения
 * * @requires react - Для управления состоянием и рендеринга.
 * @requires react-router-dom - Для навигации (Link, NavLink).
 * @requires ../Header/Header.scss - Стили компонента.
 * @requires @image/logo.svg - Изображение логотипа.
 * @requires @image/empty-profile-images/empty-user-icon.svg - Иконка профиля пользователя.
 * @requires @image/icon/shef-icon.png - Иконка пустой книги рецептов.
 *
 *
 * @example
 * ```jsx
 * import Header from './components/Header';
 *
 * function App() {
 *   return (
 *     <div>
 *       <Header />
 *       {/* Остальной контент приложения *\/}
 *     </div>
 *   );
 * }
 * ```
 */

import { Link, NavLink } from 'react-router-dom'; // Импортируем Link и NavLink
import { useEffect, useState } from 'react';

import '../Header/Header.scss';
import image from '@image/empty-profile-images/empty-user-icon.svg';
import logo from '@image/logo.svg';
import openIcon from '@image/icon/shef-icon.png';

const Header: React.FC = () => {
  /**
   * @type {boolean}
   * @description Состояние, определяющее, открыто ли мобильное меню
   */
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  /**
   * @function toggleMenu
   * @description Переключает состояние мобильного меню (открыто/закрыто).
   */
  const toggleMenu = (): void => {
    setIsMenuOpen((prev: boolean) => !prev);
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
                className={({ isActive }: {isActive : boolean} )=>
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
                className={({ isActive }: {isActive : boolean}) =>
                  isActive
                    ? 'header__nav-link header__nav-link--active'
                    : 'header__nav-link'
                }
              >
                Избранное
              </NavLink>
            </li>
          </ul>
          <Link to="/profilepage" className="header__user-profile">
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
