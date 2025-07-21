import React from 'react';
import styles from './Menu.module.scss';

import { Link } from 'react-router-dom';

import FavouriteIcon from '@/assets/image/icon/MobileMenu/FavouriteIcon';
import RecipesIcon from '@/assets/image/icon/MobileMenu/RecipesIcon';
import MainIcon from '@/assets/image/icon/MobileMenu/MainIcon';

const Menu: React.FC = () => {
  return (
    <div className={styles['container-menu']}>
      <nav className={styles['menu']}>
        {/* Содержимое меню, например, кнопки или ссылки */}
        <Link to="/" className={`${styles['menu__item']}`}>
          <MainIcon className={styles['item__icon']} />
          <p className={styles['item__name']}>Главная</p>
        </Link>
        {/**Здесь должна быть ссылка на страницу со всеми рецептами */}
        <Link to="" className={`${styles['menu__item']}`}>
          <RecipesIcon className={styles['item__icon']} />
          <p className={styles['item__name']}>Рецепты</p>
        </Link>
        {/**Здесь должна быть ссылка на страницу со всеми рецептами */}
        <Link to="" className={`${styles['menu__item']}`}>
          <MainIcon className={styles['item__icon']} />
          <p className={styles['item__name']}>Статьи</p>
        </Link>

        <Link to="favourites" className={`${styles['menu__item']}`}>
          <FavouriteIcon className={styles['item__icon']} />
          <p className={styles['item__name']}>Избранное</p>
        </Link>
      </nav>
    </div>
  );
};

export default Menu;
