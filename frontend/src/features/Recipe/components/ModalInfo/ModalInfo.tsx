import React from 'react';
import styles from './ModalInfo.module.scss';

import type { initialIngredient } from '../../types/types';

interface ModalInfoProps {
  ingredient: initialIngredient;
  className?: string;
}

export const ModalInfo: React.FC<ModalInfoProps> = ({
  ingredient,
  className,
}) => {
  return (
    <div className={className}>
      <div className={styles['container__content']}>
        <h2 className={styles['container__content--header']}>
          Энергетическая ценность на 100 грамм
        </h2>
        <div className={styles['container__content--box']}>
          <div className={`${styles['container__content-item']} ${styles['container__content-item--calories']}`}>
            <h2>Калорийность</h2>
            <h2>{ingredient.calories} ккал</h2>
          </div>
          <div className={styles['container__content-item']}>
            <h2>Белки</h2>
            <h2>{ingredient.protein}</h2>
          </div>
          <div className={styles['container__content-item']}>
            <h2>Жиры</h2>
            <h2>{ingredient.fat}</h2>
          </div>
          <div className={styles['container__content-item']}>
            <h2>Углеводы</h2>
            <h2>{ingredient.carbs}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
