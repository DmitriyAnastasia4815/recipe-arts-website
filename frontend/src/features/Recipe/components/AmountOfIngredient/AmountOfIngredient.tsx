import React, { useEffect, useRef, useState } from 'react';


import styles from './AmountOfIngredient.module.scss';
import { Icons } from '@/styles/import-image';


import type { initialIngredient } from '../../types/types';

interface AmountOfIngredientProps {
  ingredient: initialIngredient;
  onConfirm: (id: number, name: string, quantity: number) => void;
  onCancel: () => void;
  className: string;
}

export const AmountOfIngredient: React.FC<AmountOfIngredientProps> = ({
  ingredient,
  onConfirm,
  onCancel,
  className,
}) => {
  const [amount, setAmount] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrement = () => {
    setAmount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setAmount(0);
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue >= 0) {
        setAmount(numValue);
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Устанавливаем фокус на input при монтировании
    }
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['container__content']}>
        <h2 className={styles['content__header']}>Добавьте количество грамм</h2>
        <div className={styles['content__box-amount']}>
          <button
            className={styles['box-amount__dec']}
            onClick={handleDecrement}
          >
            <img src={Icons.iconDecrease} alt="уменьшить" />
          </button>
          <input
            className={styles['box-amount__input']}
            type="text"
            value={amount}
            onChange={handleInputChange}
            ref={inputRef}
            min="1"
          />
          <button
            className={styles['box-amount__inc']}
            onClick={handleIncrement}
          >
            <img src={Icons.iconIncrease} alt="увеличить" />
          </button>
        </div>

        <button className={styles['content__confirm']} onClick={() => onConfirm(ingredient.id, ingredient.name, amount)}>
          Подтвердить
        </button>
      </div>
    </div>
  );
};

export default AmountOfIngredient;
