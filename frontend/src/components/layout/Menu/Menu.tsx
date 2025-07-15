import React from 'react';
import styles from './Menu.module.scss';

const Menu: React.FC = () => {
  return (
    <div className={styles['container-menu']}>
      <nav className={styles['menu']}>
        {/* Содержимое меню, например, кнопки или ссылки */}
        <button>Главная</button>
        <button>Рецепты</button>
        <button>Статьи</button>
        <button>Избранное</button>
      </nav>
    </div>
  );
};

export default Menu;
