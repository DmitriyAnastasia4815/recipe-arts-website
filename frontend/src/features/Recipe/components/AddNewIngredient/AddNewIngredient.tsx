
import React, { useState } from 'react';
import styles from './AddNewIngredient.module.scss';

import returnIcon from '@icon/icon-array.svg';

import type { initialIngredient } from '../../types/types';
import { useDispatch } from 'react-redux';
import {addIngredientToCollection} from '.././../store/recipeSlice'

interface AddNewIngredientProps {
  onReturn: () => void;
}

export const AddNewIngredient: React.FC<AddNewIngredientProps> = ({
  onReturn,
}) => {
  const [newIngredient, setNewIngredient] = useState<initialIngredient>({
    id: 0,
    name: '',
    protein: 0,
    fat: 0,
    carbs: 0,
    calories: 0,
  });

  const dispatch = useDispatch();

  // Обработчик изменения имени
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIngredient((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  // Обработчик изменения белков
  const handleChangeProtein = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewIngredient((prev) => ({
      ...prev,
      protein: value === '' ? 0 : parseFloat(value) || 0,
    }));
  };

  // Обработчик изменения жиров
  const handleChangeFat = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewIngredient((prev) => ({
      ...prev,
      fat: value === '' ? 0 : parseFloat(value) || 0,
    }));
  };

  // Обработчик изменения углеводов
  const handleChangeCarbs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewIngredient((prev) => ({
      ...prev,
      carbs: value === '' ? 0 : parseFloat(value) || 0,
    }));
  };

  const handleConfirm = () => {
    dispatch(addIngredientToCollection({
      id: newIngredient.id,
      name: newIngredient.name,
      protein: newIngredient.protein,
      fat: newIngredient.fat,
      carbs: newIngredient.carbs,
      calories: newIngredient.protein * 4 + newIngredient.fat * 9 + newIngredient.carbs * 4,
    }))
    onReturn()
  }


  return (
    <div className={styles['container']}>
      <div className={styles['container__content']}>
        <button className={styles['content__return-button']} onClick={onReturn}>
          <img src={returnIcon} alt="назад" />
        </button>

        <div className={styles['content__main-content']}>
          <div className={styles['main-content__input']}>
            <input
              type="text"
              placeholder="Название ингредиента"
              value={newIngredient.name}
              onChange={handleChangeName}
              aria-label="Название ингредиента"
            />
          </div>

          <div className={styles['main-content__nutri-box']}>
            <div className={`${styles['nutri-box__item']} ${styles['nutri-box__item--first']}` }>
              <h2>Белки</h2>
              <input
                type="text"
                value={newIngredient.protein === 0 ? '' : newIngredient.protein}
                onChange={handleChangeProtein}
                placeholder="0"
                aria-label="Белки (г)"
              />
            </div>
            <div className={`${styles['nutri-box__item']} ${styles['nutri-box__item--second']}` }>
              <h2>Жиры</h2>
              <input
                type="text"
                value={newIngredient.fat === 0 ? '' : newIngredient.fat}
                onChange={handleChangeFat}
                placeholder="0"
                aria-label="Жиры (г)"
              />
            </div>
            <div className={`${styles['nutri-box__item']} ${styles['nutri-box__item--third']}` }>
              <h2>Углеводы</h2>
              <input
                type="text"
                value={newIngredient.carbs === 0 ? '' : newIngredient.carbs}
                onChange={handleChangeCarbs}
                placeholder="0"
                aria-label="Углеводы (г)"
              />
            </div>
            <div className={`${styles['nutri-box__item']} ${styles['nutri-box__item--fourth']}` } >
              <h2>Калорийность</h2>
              <h2>{newIngredient.protein* 4 + newIngredient.fat * 9 + newIngredient.carbs * 4}</h2>
            </div>
          </div>
        </div>
        <button className={styles['content__confirm-button']} onClick={handleConfirm}> 
            Добавить ингредиент в коллекцию
        </button>
      </div>
    </div>
  );
};

export default AddNewIngredient;

