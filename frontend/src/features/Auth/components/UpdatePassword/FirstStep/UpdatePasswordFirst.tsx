
import React from 'react';
import styles from './UpdatePasswordFirst.module.scss';
import iconArray from '@icon/icon-array.svg';

import { validEmail } from '@/features/Auth/validation/validation';

import { useState, useCallback, useRef, useEffect } from 'react';
import { ChangeEvent } from 'react';

const TEXT_STEP1 = {
  TITLE: 'Пожалуйста, введите ваш адрес электронной почты',
  SUBTITLE: 'Мы отправим вам код для сброса пароля',
  BUTTON: 'сбросить пароль',
  PLACEHOLDER: 'email',
};

interface UpdatePasswordFirstProps {
  onClose: () => void;
  nextStep: () => void;
}

export const UpdatePasswordFirst: React.FC<UpdatePasswordFirstProps> = ({
  onClose,
  nextStep,
}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const checkEmailInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (isBlurred) {
      setEmailError(!validEmail(value));
    }
  }, [isBlurred]);

  const handleBlur = useCallback(() => {
    setIsBlurred(true);
    setEmailError(!validEmail(email));
  }, [email]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div onClick={onClose} className={styles['modal-content__return-arrow']}>
        <img src={iconArray} alt="prev-page" />
      </div>

      <h4 className={styles['modal-content__title']}>{TEXT_STEP1.TITLE}</h4>

      <div className={styles['modal-content__code-box']}>
        <h5 className={styles['code-box__title']}>{TEXT_STEP1.SUBTITLE}</h5>
        <h5
          className={`${isBlurred && emailError ? styles['code-box__error-message--visible'] : styles['code-box__error-message']}`}
        >
          Почта указана неверно, проверьте еще раз
        </h5>

        <input
          className={`${styles['code-box__input']} ${isBlurred && emailError ? styles['code-box__input--error'] : ''}`}
          type="email"
          placeholder={TEXT_STEP1.PLACEHOLDER}
          onChange={checkEmailInput}
          onBlur={handleBlur}
          ref={inputRef}
        />
      </div>

      <button
        className={styles['modal-content__button']}
        disabled={emailError}
        onClick={nextStep}
      >
        {TEXT_STEP1.BUTTON}
      </button>
    </>
  );
};

