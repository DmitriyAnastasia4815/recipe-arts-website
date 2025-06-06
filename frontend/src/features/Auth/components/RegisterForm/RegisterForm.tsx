import styles from './RegisterForm.module.scss';
import { Link } from 'react-router-dom';
import RegisterModal from '../RegisterModal';


function RegisterForm({openModal}) {
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
          <div className={styles['input-box__item']}>
            <input type="text" placeholder="email*" />
            <p>Ваш email должен соответствовать email@gmail.com</p>
          </div>

          <div className={styles['input-box__item']}>
            <input type="text" placeholder="password**" />
            <p>
              Пароль должен быть не менее 15 ИЛИ не менее 8 символов, включая
              цифру и строчную букву.
            </p>
          </div>

          <div className={styles['input-box__item']}>
            <input type="text" placeholder="username*" />
            <p>
              Имя пользователя может содержать только буквенно-цифровые символы
              или одиночные дефисы и не может начинаться или заканчиваться
              дефисом.
            </p>
          </div>
        </div>
      </div>

      <div className={styles['register-container__convention-rules']}>
        <label className={styles['custom-checkbox-label']}>
          <input
            className={styles['custom-checkbox-label__input']}
            type="checkbox"
          />
          <span className={styles['custom-checkbox-label__visual']}></span>
          <p>Получать уведомления от нашего сайта</p>
        </label>
      </div>

      <button onClick={openModal} className={styles['register-container__button']}>
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
