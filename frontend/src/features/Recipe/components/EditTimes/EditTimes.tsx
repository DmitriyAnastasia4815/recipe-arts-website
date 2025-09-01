import styles from './EditTimes.module.scss';
import React from 'react';
import { useState } from 'react';
import { Icons } from '@/styles/import-image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateRecipeField } from '../../store/recipeSlice';

interface EditTimesProps {
  onClose: () => void;
}

const EditTimes: React.FC<EditTimesProps> = ({ onClose }) => {
  const [hours, setHours] = useState(
    useSelector(
      (state: RootState) => state.createRecipe.recipe_steps.time.hours,
    ),
  );
  const [minutes, setMinutes] = useState(
    useSelector(
      (state: RootState) => state.createRecipe.recipe_steps.time.minutes,
    ),
  );
  const recipeSteps = useSelector(
    (state: RootState) => state.createRecipe.recipe_steps,
  );
  const dispatch = useDispatch();

  const handleIncrease = (measure: string) => {
    measure === 'hours'
      ? setHours((prev) => prev + 1)
      : setMinutes((prev) => prev + 1);
  };
  const handleDecrease = (measure: string) => {
    measure === 'hours'
      ? setHours((prev) => (prev > 0 ? prev - 1 : 0))
      : setMinutes((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleConfirm = () => {
    dispatch(
      updateRecipeField({
        field: 'recipe_steps',
        value: { ...recipeSteps, time: { hours: hours, minutes: minutes } },
      }),
    );
    onClose();
  };

  return (
    <div className={styles['container']}>
      <button
        className={styles['container__return-button']}
        onClick={() => onClose()}
      >
        <img src={Icons.iconArray} alt="вернуться" />
      </button>
      <h2 className={styles['container__name']}>Время приготовления</h2>
      <div className={styles['container__box-change']}>
        <div className={styles['box-change']}>
          <div className={styles['box-change__time']}>
            <h2 className={styles['box-change__time-name']}>Часы</h2>
            <div className={styles['box-change__box']}>
              <button
                className={styles['box-change__button']}
                onClick={() => handleDecrease('hours')}
              >
                <img src={Icons.iconDecrease} alt="минус" />
              </button>

              <h2>{hours}</h2>
              <button
                className={styles['box-change__button']}
                onClick={() => handleIncrease('hours')}
              >
                <img src={Icons.iconIncrease} alt="плюс" />
              </button>
            </div>
          </div>

          <div className={styles['box-change__time']}>
            <h2 className={styles['box-change__time-name']}>Минуты</h2>
            <div className={styles['box-change__box']}>
              <button
                className={styles['box-change__button']}
                onClick={() => handleDecrease('minutes')}
              >
                <img src={Icons.iconDecrease} alt="минус" />
              </button>

              <h2>{minutes}</h2>
              <button
                className={styles['box-change__button']}
                onClick={() => handleIncrease('minutes')}
              >
                <img src={Icons.iconIncrease} alt="плюс" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className={styles['container__confirm']} onClick={handleConfirm}>
        Подтвердить
      </button>
    </div>
  );
};

export default EditTimes;
