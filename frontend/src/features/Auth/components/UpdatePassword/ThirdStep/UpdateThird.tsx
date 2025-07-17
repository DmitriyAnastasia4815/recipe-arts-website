import React, { useCallback } from 'react';
import clsx from 'clsx';
import styles from './UpdatePasswordTrird.module.scss';

import { validPassword } from '../../../validation/validation';

import { useState } from 'react';

import showIcon from '@icon/icon-pot.svg';

interface UpdatePasswordProps {
  onClick: () => void;
}

export const UpdatePasswordThird: React.FC<UpdatePasswordProps> = ({
  onClick,
}) => {
  const [password, setPassword] = useState('');
  const [passwordClone, setPasswordClone] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordCloneError, setPasswordCloneError] = useState(false);

  const [matchPasswords, setMatchPasswords] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  /**
   * Функция для проверки первого пароля на корректность и так же измененения значения в поле ввода
   */
  const checkPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value;
      setPassword(password);
      if (validPassword(password)) {
        setPasswordError(false);
      } else {
        password.trim() !== '' && setPasswordError(true);
      }
    },
    [password],
  );

  /**
   * Функция для проверки первого пароля на корректность и так же измененения значения в поле ввода
   */
  const checkPasswordCLone = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value;
      setPasswordClone(password);
      if (validPassword(password)) {
        setPasswordCloneError(false);
      } else {
        password.trim() !== '' && setPasswordCloneError(true);
      }
    },
    [passwordClone],
  );

  /**
   * Функция для сравнения паролей между собой
   * @returns {boolean} - результат сравнения двух полей с паролями
   */
  const checkMatchPassword = () => {
    if (
      password.trim() === passwordClone.trim() &&
      password.trim() !== '' &&
      passwordClone.trim() !== ''
    ) {
      setMatchPasswords(true);
    } else {
      setMatchPasswords(false);
    }
  };

  const onClickButton = () => {
    onClick();
    //логика отправки на сервер
  };

  return (
    <>
      <h4 className={styles['modal-content__title']}>Введите новый пароль</h4>

      <div className={styles['modal-content__fields']}>
        <h5
          className={`${styles['fields__title']} ${passwordError || passwordCloneError ? styles['fields__title--error'] : ''} `}
        >
          Пароль должен быть не менее 8 символов, включая цифру, заглавную и
          строчную букву.
        </h5>

        <div
          className={`${styles['fields__password']} ${styles[passwordError ? 'fields__password--error' : '']}`}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="password*"
            value={password}
            onChange={checkPassword}
          />
          <button
            className={styles['fields__show-icon']}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img src={showIcon} alt="смотреть" />
          </button>
        </div>

        <div
          className={`${styles['fields__password']} ${styles[passwordCloneError ? 'fields__password--error' : '']}`}
        >
          <input
            type="password"
            placeholder="password*"
            value={passwordClone} 
            onChange={checkPasswordCLone}
          />
        </div>

        <button
          className={styles['modal-content__button']}
          onClick={onClickButton}
          disabled={matchPasswords}
        >
          подтвердить
        </button>
      </div>
    </>
  );
};
