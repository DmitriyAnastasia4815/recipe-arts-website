import React from 'react';
import styles from './AddedIngredient.module.scss';

import closeIcon from '@icon/close-icon.svg';

interface AddedIngredientProps {
  onClose: () => void;
}

export const AddedIngredient: React.FC<AddedIngredientProps> = ({
  onClose,
}) => {
  return (
    <div className={styles['content-container']}>
      <div className={styles['content-container__header']}>
        <h2 className={styles['header__name']}>Добавление ингредиента</h2>
        <button className={styles['header__close-button']} onClick={onClose}>
          <img src={closeIcon} alt="закрыть" />
        </button>
      </div>

      <div className={styles['content-container__search-input']}>
        <input type="text" placeholder="Поиск по названию" />
      </div>

      <div className={styles['content-container__ingredients-list']}>
        <ul className={styles['ingredients-list']}>
          <li className={styles['ingredients-list__item']}>
            <input
              className={styles['ingredients-list__item--checkbox']}
              type="checkbox"
            />
            <h2 className={styles['ingredients-list__item--name']}>Арбуз</h2>
          </li>
          <li className={styles['ingredients-list__item']}>
            <input
              className={styles['ingredients-list__item--checkbox']}
              type="checkbox"
            />
            <h2 className={styles['ingredients-list__item--name']}>Арбуз</h2>
          </li>
          <li className={styles['ingredients-list__item']}>
            <input
              className={styles['ingredients-list__item--checkbox']}
              type="checkbox"
            />
            <h2 className={styles['ingredients-list__item--name']}>Арбуз</h2>
          </li>
          <li className={styles['ingredients-list__item']}>
            <input
              className={styles['ingredients-list__item--checkbox']}
              type="checkbox"
            />
            <h2 className={styles['ingredients-list__item--name']}>Арбуз</h2>
          </li>
          <li className={styles['ingredients-list__item']}>
            <input
              className={styles['ingredients-list__item--checkbox']}
              type="checkbox"
            />
            <h2 className={styles['ingredients-list__item--name']}>Арбуз</h2>
          </li>
          <li className={styles['ingredients-list__item']}>
            <input
              className={styles['ingredients-list__item--checkbox']}
              type="checkbox"
            />
            <h2 className={styles['ingredients-list__item--name']}>Арбуз</h2>
          </li>
          <li className={styles['ingredients-list__item']}>
            <input
              className={styles['ingredients-list__item--checkbox']}
              type="checkbox"
            />
            <h2 className={styles['ingredients-list__item--name']}>Арбуз</h2>
          </li>
          <li className={styles['ingredients-list__item']}>
            <input
              className={styles['ingredients-list__item--checkbox']}
              type="checkbox"
            />
            <h2 className={styles['ingredients-list__item--name']}>Арбуз</h2>
          </li>
          <li className={styles['ingredients-list__item']}>
            <input
              className={styles['ingredients-list__item--checkbox']}
              type="checkbox"
            />
            <h2 className={styles['ingredients-list__item--name']}>Арбуз</h2>
          </li>
        </ul>
      </div>

      <button className={styles['content-container__added-button']}>
        Добавить ингредиент
      </button>
    </div>
  );
};

export default AddedIngredient;
