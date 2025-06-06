import styles from './Register.module.scss';
import RegisterForm from '@/features/Auth/components/RegisterForm/RegisterForm';
import RegisterModal from '@/features/Auth/components/RegisterModal';
import { useState } from 'react';

function Register() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const handleCloseModal = () => {
    setOpenRegisterModal(false);
  };

  const handleOpenModal = () => {
    setOpenRegisterModal(true);
  };
  return (
    <>
      <div className={styles['decor__left-side']}></div>
      <div className="container">
        <div className={styles['register']}>
          <div className={styles['register__left-side']}>
            <h1 className={styles['register__main-title']}>
              Стань частью нашего гастрономического мира
            </h1>
            <h2 className={styles['register__subtitle']}>
              Пробуй новые рецепты, узнавай больше о мировых кухнях и придумывай
              новое вместе с Recipe Arts
            </h2>
          </div>
          <div className={styles['register__right-side']}>
            <RegisterForm openModal={handleOpenModal} />
          </div>

          {openRegisterModal && <RegisterModal onClose={handleCloseModal} />}
        </div>
      </div>
    </>
  );
}

export default Register;
