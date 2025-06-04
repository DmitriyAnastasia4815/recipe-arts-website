import styles from './LoginForm.module.scss';
import shefIcon from '@icon/shef-icon.png';
import InputField from '@components-common/InputField/InputField';
import AddedButton from '@/components/common/AddedButton/AddedButton';

function LoginForm() {
  return (
    <div className={styles['login-container']}>
      <div className={styles['login__login-welcome']}>
        <div className={styles['login__login-icon']}>
          <img src={shefIcon} alt="shef-icon" />
        </div>
        <h5>Добро пожаловать!</h5>
      </div>

      <div className={styles['login__login-form']}>
        <input
          type="text"
          placeholder="email*"
          className={styles['login__input-field']}
        />
        <input
          type="text"
          placeholder="password*"
          className={styles['login__input-field']}
        />
      </div>

      <button className={styles['login-container__password-alive']}>Забыли пароль?</button>
      <button className={styles['login__button']}>
        войти
      </button>
    </div>
  );
}

export default LoginForm;
