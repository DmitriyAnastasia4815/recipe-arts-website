import React from 'react';
import { useEffect, useState,  } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SuccessOperation.module.scss';

import rightIcon from '@icon/icon-right-password.svg';
import wrongIcon from '@icon/icon-false-password.svg';

interface SuccessOperationProps {
  success: boolean,
  onClose: () => void,
}

export const SuccessOperation: React.FC<SuccessOperationProps> = ({
  success,
  onClose
}) => {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className={styles['modal-container-success']}>
      <div className={styles['modal-content-success']}>
        {success ? (
          <div className={styles['modal-content-success__block']}>
            <img src={rightIcon} alt="" />
            <h4>Пароль успешно изменен</h4>
          </div>
        ) : (
          <div className={styles['modal-content-success__block']}>
            <img src={wrongIcon} alt="" />
            <h4>Произошла ошибка, попробуйте снова</h4>
          </div>
        )}
      </div>
    </div>
  );
};
