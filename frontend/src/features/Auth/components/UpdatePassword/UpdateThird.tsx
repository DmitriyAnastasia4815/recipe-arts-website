import React from 'react';
import styles from './UpdatePasswordTrird.module.scss';

import { useState } from 'react';

interface UpdatePasswordProps {
  onClick: () => void;
}

export const UpdatePasswordThird: React.FC<UpdatePasswordProps> = ({
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClickButton = () => {
    //логика отправки на сервер
  };

  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-content']}>
        <h4 className={styles['modal-content__title']}>Введите новый пароль</h4>

        <div className={styles['modal-content__fields']}>
          <h5 className={styles['fields__title']}>
            Пароль должен быть не менее 8 символов, включая цифру, заглавную и
            строчную букву.
          </h5>

          <div className={styles['fields__field fields__password']}>
            <input type="email" />
          </div>

          <div className={styles['fields__field fields__password-clone']}>
            <input type="email" />
          </div>

          <button
            className={styles['modal-content__button']}
            onClick={onClickButton}
            disabled={isLoading}
          >
            подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};
