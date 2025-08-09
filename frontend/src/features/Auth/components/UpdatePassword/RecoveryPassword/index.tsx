import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';

import styles from './RecoveryPassword.module.scss';

import { UpdatePasswordFirst } from '../FirstStep/UpdatePasswordFirst';
import { UpdatePasswordThird } from '../ThirdStep/UpdateThird';

import { SuccessOperation } from '../SuccessOperation/SuccessOperation';
import { UpdatePasswordSecond } from '../SecondStep/UpdatePasswordSecond';
import { RootState } from '../store/store';

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
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      {step <= 3 ? (
        <div className={styles['modal-container']}>
          <div className={styles['modal-content']}>
            {step === 1 && (
              <UpdatePasswordFirst onClose={onClose} nextStep={nextStep} />
            )}

            {step === 2 && (
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
          <SuccessOperation success={successUpdate} onClose={onClose} />
        </>
      )}
    </>
  );
}

export default RecoveryPassword;
