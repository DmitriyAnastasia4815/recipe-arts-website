import styles from './LoginForm.module.scss';
import shefIcon from '@icon/shef-icon.png';
import { useState } from 'react';
import closedPassword from '@icon/icon-pot.svg';
import { validEmail } from '../../validation/validation';
import RecoveryPassword from '../RecoveryPassword';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [openRecoveryPassword, setOpenRecoveryPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    if (validEmail(email)) {
      setEmailError(false);
    } else {
      email !== '' && setEmailError(true);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleLoginClick = () => {
    const isEmailEmpty = email.trim() === '';
    const isPasswordEmpty = password.trim() === '';
    const isEmailInvalid = !isEmailEmpty && !validEmail(email);

    setEmailError(isEmailEmpty || isEmailInvalid);
    setPasswordError(isPasswordEmpty);

    if (!isEmailEmpty && !isPasswordEmpty) {
      //отправка на сервер
      console.log('Вход с ', { email, password });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOpenRecoveryPassword = () => {
    setOpenRecoveryPassword(true);
  };

  const handleOCloseRecoveryPassword = () => {
    setOpenRecoveryPassword(false);
  };

  return (
    <>
      {openRecoveryPassword && (
        <div
          className={styles['backdrop']}
          onClick={handleOCloseRecoveryPassword}
        />
      )}
      <div className={styles['login-container']}>
        <div className={styles['login__login-welcome']}>
          <div className={styles['login__login-icon']}>
            <img src={shefIcon} alt="shef-icon" />
          </div>
          <h5>Добро пожаловать!</h5>
        </div>

        <div className={styles['login__login-form']}>
          <input
            type="email"
            placeholder="email*"
            value={email}
            className={`${styles['login__input-field']} ${
              emailError ? styles['login__input-field--error'] : ''
            }`}
            onChange={handleEmailChange}
          />

          <div className={styles['login__password-container']}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="password*"
              className={`${styles['login__input-field']} ${styles['input-password']} ${
                passwordError ? styles['login__input-field--error'] : ''
              }`}
              onChange={handlePasswordChange}
            />

            <button
              className={styles['login__password-toggle']}
              type="button"
              onClick={toggleShowPassword}
            >
              <img
                src={showPassword ? closedPassword : closedPassword}
                alt={showPassword ? 'Скрыть' : 'Показать'}
              />
            </button>
          </div>
        </div>

        <button
          className={styles['login-container__password-alive']}
          onClick={handleOpenRecoveryPassword}
        >
          Забыли пароль?
        </button>
        <button className={styles['login__button']} onClick={handleLoginClick}>
          войти
        </button>
      </div>
      {openRecoveryPassword && (
        <>
          <RecoveryPassword onClose={handleOCloseRecoveryPassword} />
        </>
      )}
    </>
  );
}

export default LoginForm;
