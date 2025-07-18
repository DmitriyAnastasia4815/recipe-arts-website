
import React, { useCallback, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './UpdatePasswordTrird.module.scss'

import { validPassword } from '../../../validation/validation';

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

  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showValidationErrors, setShowValidationErrors] = useState(false);

  /**
   * Handle password input change
   */
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      // Reset error state while typing
      setPasswordError(false);
    },
    [],
  );

  /**
   * Handle password confirmation input change
   */
  const handlePasswordCloneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPasswordClone = e.target.value;
      setPasswordClone(newPasswordClone);
      // Reset error state while typing
      setPasswordCloneError(false);
    },
    [],
  );

  /**
   * Validate password on blur
   */
  const handlePasswordBlur = useCallback(() => {
    if (password.trim() !== '') {
      setPasswordError(!validPassword(password));
      setShowValidationErrors(true);
    }
  }, [password]);

  /**
   * Validate password confirmation on blur
   */
  const handlePasswordCloneBlur = useCallback(() => {
    if (passwordClone.trim() !== '') {
      setPasswordCloneError(!validPassword(passwordClone));
      setShowValidationErrors(true);
    }
  }, [passwordClone]);

  /**
   * Check if passwords match in real-time
   */
  useEffect(() => {
    const arePasswordsFilledAndMatch =
      password.trim() !== '' &&
      passwordClone.trim() !== '' &&
      password === passwordClone;
    setPasswordsMatch(arePasswordsFilledAndMatch);
  }, [password, passwordClone]);

  // Determine if the form is valid for submission
  const isFormValid =
    password.trim() !== '' &&
    passwordClone.trim() !== '' &&
    !passwordError &&
    !passwordCloneError &&
    passwordsMatch;

  const onClickButton = () => {
    setShowValidationErrors(true);

    // Force validation on click
    const isPasswordValid = validPassword(password);
    const isPasswordCloneValid = validPassword(passwordClone);

    setPasswordError(!isPasswordValid && password.trim() !== '');
    setPasswordCloneError(!isPasswordCloneValid && passwordClone.trim() !== '');

    // Re-check passwords match
    const arePasswordsFilledAndMatch =
      password.trim() !== '' &&
      passwordClone.trim() !== '' &&
      password === passwordClone;
    setPasswordsMatch(arePasswordsFilledAndMatch);

    // Proceed if all checks pass
    if (isPasswordValid && isPasswordCloneValid && arePasswordsFilledAndMatch) {
      onClick();
    }
  };

  // Determine error message to display
  const errorMessage = (() => {
    if (
      !passwordsMatch &&
      password.trim() !== '' &&
      passwordClone.trim() !== ''
    ) {
      return 'Пароли должны совпадать';
    }
    return 'Пароль должен быть не менее 8 символов, включая цифру, заглавную и строчную букву.';
  })();

  // Determine if the first input should be highlighted red
  const showPasswordInputError =
    showValidationErrors &&
    ((passwordError && password.trim() !== '') ||
      (!passwordsMatch &&
        password.trim() !== '' &&
        passwordClone.trim() !== ''));

  // Determine if the second input should be highlighted red
  const showPasswordCloneInputError =
    showValidationErrors &&
    ((passwordCloneError && passwordClone.trim() !== '') ||
      (!passwordsMatch &&
        password.trim() !== '' &&
        passwordClone.trim() !== ''));

  return (
    <>
      <h4 className={styles['modal-content__title']}>Введите новый пароль</h4>
      <h5
        className={clsx(
          styles['fields__title'],
          (passwordCloneError || passwordError) &&
            styles['fields__title--error'],
        )}
      >
        {errorMessage}
      </h5>

      <div className={styles['modal-content__fields']}>
        <div
          className={clsx(
            styles['fields__password'],
            showPasswordInputError && styles['fields__password--error'],
          )}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="password*"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          <button
            type="button"
            className={styles['fields__show-icon']}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img src={showIcon} alt="смотреть" />
          </button>
        </div>

        <div
          className={clsx(
            styles['fields__password'],
            showPasswordCloneInputError && styles['fields__password--error'],
          )}
        >
          <input
            type="password"
            placeholder="password*"
            value={passwordClone}
            onChange={handlePasswordCloneChange}
            onBlur={handlePasswordCloneBlur}
          />
        </div>

        <button
          className={styles['modal-content__button']}
          onClick={onClickButton}
          disabled={!isFormValid}
        >
          подтвердить
        </button>
      </div>
    </>
  );
};

