/**
 * Компонент SuccessOperation отображает модальное окно с сообщением об успехе или ошибке
 * @param {SuccessOperationProps} props - Свойства компонента
 * @returns {JSX.Element} Модальное окно с состоянием успеха или ошибки
 */

import React from 'react';
import { useEffect, } from 'react';

import styles from './SuccessOperation.module.scss';

import rightIcon from '@icon/icon-right-password.svg';
import wrongIcon from '@icon/icon-false-password.svg';


/**
 * Интерфейс свойств для компонента SuccessOperation
 */
interface SuccessOperationProps {
  /** Указывает, была ли операция успешной */
  success: boolean,
  /** Функция обратного вызова для закрытия модального окна */
  onClose: () => void,
}



/**
 * Компонент SuccessOperation
 * Отображает модальное окно, которое автоматически закрывается через 2 секунды
 * @param props - Свойства компонента SuccessOperationProps
 */

export const SuccessOperation: React.FC<SuccessOperationProps> = ({
  success,
  onClose
}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);


  return (
    <div className={styles['modal-container-success']}>
      <div className={styles['modal-content-success']}>
        {success ? (
          <div className={styles['modal-content-success__block']}>
            <img src={rightIcon} alt="Успешно" />
            <h4>Пароль успешно изменен</h4>
          </div>
        ) : (
          <div className={styles['modal-content-success__block']}>
            <img src={wrongIcon} alt="Ошибка" />
            <h4>Произошла ошибка, попробуйте снова</h4>
          </div>
        )}
      </div>
    </div>
  );
};
