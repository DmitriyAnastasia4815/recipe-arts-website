import { useState, useCallback, useRef, useEffect } from 'react';
import { ChangeEvent } from 'react';

import styles from './RecoveryPassword.module.scss';
import iconArray from '@icon/icon-array.svg';

import { validEmail } from '../../validation/validation';

import RegisterModal from '../RegisterModal';

interface RecoveryPasswordProps {
  onClose: () => void;
}

const TEXT_STEP1 = {
  TITLE: 'Пожалуйста, введите ваш адрес электронной почты',
  SUBTITLE: 'Мы отправим вам код для сброса пароля',
  BUTTON: 'сбросить пароль',
  PLACEHOLDER: 'email',
};

function RecoveryPassword({ onClose }: RecoveryPasswordProps) {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const checkEmailInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!validEmail(value));
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  }

  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-content']}>
        {step === 1 && (
          <>
            <div
              onClick={onClose}
              className={styles['modal-content__return-arrow']}
            >
              <img src={iconArray} alt="prev-page" />
            </div>

            <h4 className={styles['modal-content__title']}>
              {TEXT_STEP1.TITLE}
            </h4>

            <div className={styles['modal-content__code-box']}>
              <h5 className={styles['code-box__title']}>
                {TEXT_STEP1.SUBTITLE}
              </h5>
              <input
                className={`${styles['code-box__input']} ${emailError ? styles['code-box__input--error'] : ''}`}
                type="email"
                placeholder={TEXT_STEP1.PLACEHOLDER}
                onChange={checkEmailInput}
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
        )}

        {step === 2 && (
          <>
            <RegisterModal onClose={prevStep}/>
          </>
        )}
      </div>
    </div>
  );
}

export default RecoveryPassword;
