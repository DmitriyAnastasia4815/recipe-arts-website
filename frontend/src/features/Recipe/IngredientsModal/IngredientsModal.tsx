
import styles from './IngredientsModal.module.scss';
import React, { useState, useRef, useCallback } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import increaseButton from '@icon/increase-icon-ingredients.svg';
import decreaseButton from '@icon/decrese-icon-ingredients.svg';
import { RecipeCardProps } from '../RecipeCard/RecipeCard';

interface IngredientsModalProps {
  recipe: RecipeCardProps;
  onClose: () => void;
  triggerButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const IngredientsModal: React.FC<IngredientsModalProps> = ({
  recipe,
  onClose,
  triggerButtonRef,
}) => {
  const { total_ingredients, name } = recipe;
  const [countPortion, setCountPortion] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);

  const increasePortion = () => {
    setCountPortion(countPortion + 1);
  };

  const decreasePortion = () => {
    if (countPortion > 1) {
      setCountPortion(countPortion - 1);
    }
  };

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {

      // Игнорируем клик, если он произошёл по кнопке открытия
      if (triggerButtonRef.current && triggerButtonRef.current.contains(event.target as Node)) {
        return;
      }

      // Проверяем, что клик произошёл вне модального окна
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose, triggerButtonRef]
  );

  return (
    <OutsideClickHandler onOutsideClick={handleOutsideClick}>
      <div className={styles['container-modal']} ref={modalRef}>
        <div className={styles['ingredients-box']}>
          <div className={styles['ingredients-box__header']}>
            <h2 className={styles['header__name']}>Ингредиенты</h2>
            <div className={styles['header__portion']}>
              <p className={styles['header__portion-name']}>порции</p>
              <button className={styles['header__decrease']} onClick={decreasePortion}>
                <img src={decreaseButton} alt="уменьшить" />
              </button>
              <div className={styles['header__counter']}>{countPortion}</div>
              <button className={styles['header__increase']} onClick={increasePortion}>
                <img src={increaseButton} alt="увеличить" />
              </button>
            </div>
          </div>
          <div className={styles['ingredients-list']}>
            {Object.entries(total_ingredients).map(([ingredient, amount]) => (
              <div key={ingredient} className={styles['ingredient__item']}>
                <h2 className={styles['ingredient__name']}>{ingredient}</h2>
                <span className={styles['ingredient__divider']}></span>
                <span className={styles['ingredient__amount']}>
                  {amount !== undefined ? (amount * countPortion).toFixed(0) : 0} гр
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default IngredientsModal;

