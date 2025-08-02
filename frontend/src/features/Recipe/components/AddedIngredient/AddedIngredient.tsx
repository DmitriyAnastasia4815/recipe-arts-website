import React, { useEffect, useState } from 'react';
import styles from './AddedIngredient.module.scss';

import ModalInfo from '../ModalInfo/ModalInfo';

//иконки
import closeIcon from '@icon/close-icon.svg';
import iconInfo from '@icon/icon-info.svg';

//типизация
import type { initialIngredient } from '../../types/types';

//пока нет сервера
import { initialIngredients } from '@/assets/example/example';

interface AddedIngredientProps {
  onClose: () => void;
}

export const AddedIngredient: React.FC<AddedIngredientProps> = ({
  onClose,
}) => {
  const [listIngredients, setListIngredients] = useState<initialIngredient[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeIngredientId, setActiveIngredientId] = useState<number | null>(null); 

  useEffect(() => {
    //должен быть запрос на сервер для получения списка всех возможных ингредиентов
    setListIngredients(initialIngredients);
  }, []);

  const filteredIngredients = listIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Обработчики для показа и скрытия модального окна
  const handleMouseEnter = (id: number) => {
    setActiveIngredientId(id);
  };

  const handleMouseLeave = () => {
    setActiveIngredientId(null);
  };

  return (
    <div className={styles['content-container']}>
      <div className={styles['content-container__header']}>
        <h2 className={styles['header__name']}>Добавление ингредиента</h2>
        <button className={styles['header__close-button']} onClick={onClose}>
          <img src={closeIcon} alt="закрыть" />
        </button>
      </div>

      <div className={styles['content-container__search-input']}>
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchQuery}
          onChange={handleSearchQuery}
          aria-label="Поиск ингредиентов по названию"
        />
      </div>

      <div className={styles['content-container__ingredients-list']}>
        <ul className={styles['ingredients-list']}>
          {filteredIngredients.map((ingredient) => (
            <li
              key={ingredient.id}
              className={styles['ingredients-list__item']}
            >
              <input
                className={styles['ingredients-list__item--checkbox']}
                type="checkbox"
              />
              <h2 className={styles['ingredients-list__item--name']}>
                {ingredient.name}
              </h2>
              <button
                className={styles['ingredients-list__item--info']}
                onMouseEnter={() => handleMouseEnter(ingredient.id)}
                onMouseLeave={handleMouseLeave}
                aria-label={`Информация об ингредиенте ${ingredient.name}`}
              >
                <img src={iconInfo} alt="информация" />
              </button>
              {activeIngredientId === ingredient.id && (
                <ModalInfo
                  ingredient={ingredient}
                  className={styles['ingredients-list__item--modal']}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      <button className={styles['content-container__added-button']}>
        Добавить новый ингредиент
      </button>
    </div>
  );
};

export default AddedIngredient;
