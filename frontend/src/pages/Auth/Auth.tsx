import styles from './Auth.module.scss';
import LoginForm from '@/features/Auth/components/LoginForm';
import TransparentButton from '@/components/common/TransparentButton/TransparentButton';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };
  return (
    <div className={styles['Auth']}>
      <div className="container">
        <div className={styles['auth-container']}>
          <LoginForm />
          <div className={styles['auth-container__register-line']}>
            <p className={styles['auth-container__register-title']}>
              Впервые у нас?
            </p>
            <button
              className={styles['auth-container__register-button']}
              onClick={handleRegisterClick}
            >
              регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
