import styles from './Auth.module.scss';
import LoginForm from '@/features/Auth/components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';

export const Auth = () => { 
  return (
    <div className={styles['container']}>
      <div className={styles['Auth']}>
        <div className={styles['auth-container']}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Auth;
