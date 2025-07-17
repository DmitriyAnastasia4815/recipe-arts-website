import { useState, useCallback, useRef, useEffect } from 'react';
import { ChangeEvent } from 'react';

import styles from './RecoveryPassword.module.scss';

import { UpdatePasswordFirst } from '../UpdatePassword/FirstStep/UpdatePasswordFirst';
import ModalCode from '@/components/common/ModalCode';
import UpdatePassword from '../UpdatePassword';
import { UpdatePasswordThird } from '../UpdatePassword/ThirdStep/UpdateThird';
import RegisterModal from '../RegisterModal';

import { SuccessOperation } from '../SuccessOperation/SuccessOperation';
import { UpdatePasswordSecond } from '../UpdatePassword/SecondStep/UpdatePasswordSecond';

interface RecoveryPasswordProps {
  onClose: () => void;
}

function RecoveryPassword({ onClose }: RecoveryPasswordProps) {
  const [step, setStep] = useState(1);
  const [successUpdate, setSuccessUpdate] = useState(true);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      {step <= 3 ? (
        <div className={styles['modal-container']}>
          <div className={styles['modal-content']}>
            {step === 1 && (
              <UpdatePasswordFirst onClose={prevStep} nextStep={nextStep} />
            )}

            {step === 2 && (
              <>
                <ModalCode
                  onClose={prevStep}
                  title="Мы отправили код сброса пароля на вашу почту"
                  subtitle="Пожалуйста, введите код"
                  resendText="Отправить код повторно"
                  resendTimerText="Отправить код повторно через {seconds} сек"
                  confirmButtonText="подтвердить"
                  onClickNext={nextStep}
                />
              </>
            )}

            {step === 3 && (
              <>
                <UpdatePasswordSecond onClick={nextStep} />
              </>
            )}

            {step === 3 && (
              <>
                <UpdatePasswordThird onClick={nextStep} />
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <SuccessOperation success={successUpdate} onClose={onClose}/>
        </>
      )}
    </>
  );
}

export default RecoveryPassword;
