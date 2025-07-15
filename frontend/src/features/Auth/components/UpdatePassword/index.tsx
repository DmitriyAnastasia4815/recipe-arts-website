import styles from './UpdatePassword.module.scss';
import rightPassword from '@icon/icon-right-password.svg';
import falsePassword from '@icon/icon-false-password.svg';
import closedPassword from '@icon/icon-pot.svg';

import { validPassword } from '../../validation/validation';

import { useState, useRef, useEffect, ChangeEvent, useCallback } from 'react';
import iconArray from '@icon/icon-array.svg';

const TEXT = {
  TITLE: 'Введите новый пароль',
  SUBTITLE:
    'Пароль должен быть не менее 8 символов, включая цифру и строчную букву.',
  SUBTITLE2: 'Подтвердите пароль',
  BUTTON: 'подтвердить',
  PLACEHOLDER: 'password',
};

interface UpdatePasswordProps {
  onPrev: () => void;
}

function UpdatePassword({ onPrev }: UpdatePasswordProps) {
  const [passwordFirst, setPasswordFirst] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');

  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);

  const [passwordFirstError, setPasswordFirstError] = useState(false);
  const [passwordSecondError, setPasswordSecondError] = useState(false);

  const [passwordsMatchError, setPasswordsMatchError] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const checkPasswordFirst = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPasswordFirst(value);
      setPasswordFirstError(!validPassword(value));
      setPasswordsMatchError(
        value !== passwordSecond && passwordSecond.length > 0,
      );
    },
    [passwordSecond],
  );
  const checkPasswordSecond = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPasswordSecond(value);
      setPasswordSecondError(!validPassword(value));
      setPasswordsMatchError(value !== passwordFirst && value.length > 1);
    },
    [passwordFirst],
  );

  const isButtonEnabled = useCallback(() => {
    return (
      !passwordFirstError &&
      !passwordSecondError &&
      passwordFirst === passwordSecond &&
      passwordFirst.length > 0 &&
      passwordSecond.length > 0
    );
  }, [passwordFirst, passwordSecond, passwordFirstError, passwordSecondError]);

  const toggleShowFirstPassword = () =>
    setShowFirstPassword(!showFirstPassword);
  const toggleShowSecondPassword = () =>
    setShowSecondPassword(!showSecondPassword);

  const handleSubmit = () => {
    if (isButtonEnabled()) {
      // Здесь можно добавить логику отправки пароля
      console.log('Пароль успешно изменен:', passwordFirst);
    }
  };

  return (
    <>
      <div onClick={onPrev} className={styles['modal-content__return-arrow']}>
        <img src={iconArray} alt="prev-page" />
      </div>

      <h4 className={styles['modal-content__title']}>{TEXT.TITLE}</h4>

      <div className={styles['modal-content__code-box']}>
        <h5 className={styles['code-box__title']}>{TEXT.SUBTITLE}</h5>

        <div className={styles['code-box__input-first']}>
          <input
            className={`${styles['code-box__input']} ${passwordFirstError || passwordsMatchError ? styles['code-box__input--error'] : ''}`}
            type={!showFirstPassword ? 'password' : 'text'}
            placeholder={TEXT.PLACEHOLDER}
            onChange={checkPasswordFirst}
            ref={firstInputRef}
          />
          <button
            className={styles['code-box__password-toggle']}
            type="button"
            onClick={toggleShowFirstPassword}
          >
            <img
              src={showFirstPassword ? closedPassword : closedPassword}
              alt={showFirstPassword ? 'Скрыть' : 'Показать'}
            />
          </button>
        </div>

        <h4 className={styles['code-box__approwed-password']}>
          {TEXT.SUBTITLE2}
        </h4>

        <div className={styles['code-box__input-second']}>
          <input
            className={`${styles['code-box__input']}  ${passwordSecondError || passwordsMatchError ? styles['code-box__input--error'] : ''}`}
            type={!showSecondPassword ? 'password' : 'text'}
            placeholder={TEXT.PLACEHOLDER}
            onChange={checkPasswordSecond}
            ref={secondInputRef}
          />
          <button
            className={styles['code-box__password-toggle']}
            type="button"
            onClick={toggleShowSecondPassword}
          >
            <img
              src={showSecondPassword ? closedPassword : closedPassword}
              alt={showSecondPassword ? 'Скрыть' : 'Показать'}
            />
          </button>
        </div>
      </div>

      <button
        className={styles['modal-content__button']}
        onClick={handleSubmit}
        disabled={!isButtonEnabled()}
      >
        {TEXT.BUTTON}
      </button>
    </>
  );
}

export default UpdatePassword;
