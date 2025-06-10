import styles from './RegisterForm.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  validEmail,
  validPassword,
  validUsername,
} from '../../validation/validation';

function RegisterForm({ openModal }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    if (validEmail(email)) {
      setEmailError(false);
    } else {
      email.trim() !== '' && setEmailError(true);
    }
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    if (validPassword(password)) {
      setPasswordError(false);
    } else {
      password.trim() !== '' && setPasswordError(true);
    }
  };

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setUsername(username);
    if (validUsername(username)) {
      setUsernameError(false);
    } else {
      username.trim() !== '' && setUsernameError(true);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);

    const isEmailEmpty = email.trim() === '';
    const isPasswordEmpty = password.trim() === '';
    const isUsernameEmpty = username.trim() === '';
    const isEmailInvalid = !isEmailEmpty && !validEmail(email);
    const isPasswordInvalid = !isPasswordEmpty && !validPassword(password);
    const isUsernameInvalid = !isUsernameEmpty && !validUsername(username);

    setEmailError(isEmailEmpty || isEmailInvalid);
    setPasswordError(isPasswordEmpty || isPasswordInvalid);
    setUsernameError(isUsernameEmpty || isUsernameInvalid);

    if (!isEmailEmpty && !isPasswordEmpty && !isUsernameEmpty && !isEmailInvalid && !isPasswordInvalid && !isUsernameInvalid && isChecked) {
      openModal();
    }
  };

  return (
    <div className={styles['register-container']}>
      <Link
        to="/login"
        className={styles['register-container__existing-account']}
      >
        У вас уже есть аккаунт?
      </Link>
      <div className={styles['register']}>
        <h1 className={styles['register__title']}>Регистрация</h1>

        <div className={styles['register__input-box']}>
          <div
            className={`${styles['input-box__item']} ${emailError ? styles['input-box__item--error'] : ''}`}
            onChange={changeEmail}
          >
            <input type="text" placeholder="email*" />
            <p>Ваш email должен соответствовать email@gmail.com</p>
          </div>

          <div
            className={`${styles['input-box__item']} ${passwordError ? styles['input-box__item--error'] : ''}`}
            onChange={changePassword}
          >
            <input type="text" placeholder="password*" />
            <p>
              Пароль должен быть не менее не менее 8 символов, включая цифру и
              строчную букву.
            </p>
          </div>

          <div
            className={`${styles['input-box__item']} ${usernameError ? styles['input-box__item--error'] : ''}`}
            onChange={changeUsername}
          >
            <input type="text" placeholder="username*" />
            <p>
              Имя пользователя может содержать только буквенно-цифровые символы
              или одиночные дефисы и не может начинаться или заканчиваться
              дефисом и быть уникальным.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${styles['register-container__convention-rules']} ${
          isButtonClicked && !isChecked
            ? styles['register-container__convention-rules--error']
            : ''
        }`}
      >
        <label className={styles['custom-checkbox-label']}>
          <input
            className={styles['custom-checkbox-label__input']}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className={styles['custom-checkbox-label__visual']}></span>
          <p>Я соглашаюсь с политикой сайта</p>
        </label>
      </div>

      <button
        className={styles['register-container__button']}
        onClick={handleButtonClick}
      >
        продолжить
      </button>

      <p className={styles['register-container__politics']}>
        Создавая учетную запись вы соглашаетесь с
        <span className="underline">
          Политикой конфиденциальности Recipe Arts.
        </span>
      </p>
    </div>
  );
}

export default RegisterForm;
