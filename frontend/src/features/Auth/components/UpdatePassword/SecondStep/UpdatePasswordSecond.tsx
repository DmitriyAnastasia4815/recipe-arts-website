import React from 'react';
import styles from './UpdatePasswordSecond.module.scss';

import iconArray from '@icon/icon-array.svg';

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authServiceAPI } from '@/features/Auth/api/authServiceAPI';

const CODE_LENGTH = 6;
const RESEND_TIMEOUT = 60;

interface UpdatePasswordSecondProps {
  onClick: () => void;
}

export const UpdatePasswordSecond: React.FC<UpdatePasswordSecondProps> = ({
  onClick,
}) => {
  const [codes, setCodes] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  // notEnoughNumbers теперь контролирует, показывать ли ошибку для пустых полей
  const [notEnoughNumbers, setNotEnoughNumbers] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(true);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(CODE_LENGTH).fill(null));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const startTimer = () => {
    setResendTimer(RESEND_TIMEOUT);
    setCanResend(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleResendCode = async () => {
    if (!canResend) return;
    setIsLoading(true);
    setErrorMessage(null);
    // Здесь будет вызов API для повторной отправки кода
    // try {
    //   await authServiceAPI.resendCode(); // Пример
    //   startTimer();
    // } catch (error) {
    //   setErrorMessage('Не удалось отправить код повторно.');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const onClickButton = async () => {
    const isInComplete = codes.some((code) => code === '');
    setNotEnoughNumbers(isInComplete); // Устанавливаем ошибку, если есть пустые поля
    if (!isInComplete) {
      // Если все поля заполнены, сбрасываем ошибку (если она была) и переходим к следующему шагу
      setNotEnoughNumbers(false); 
      onClick();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Предотвращаем стандартное поведение Backspace (например, навигацию назад в браузере)

      const currentCodeValue = codes[index]; // Получаем текущее значение поля из состояния

      setCodes((prevCodes) => {
        const newCodes = [...prevCodes];
        if (currentCodeValue !== '') {
          // Если текущее поле не пустое, очищаем его
          newCodes[index] = '';
        } else if (index > 0) {
          // Если текущее поле пустое, очищаем предыдущее поле
          newCodes[index - 1] = '';
        }

        // Проверяем, стала ли форма полностью заполненной после этого изменения
        const isNowComplete = newCodes.every((code) => code !== '');
        if (isNowComplete) {
          setNotEnoughNumbers(false); // Сбрасываем состояние ошибки, если форма теперь полная
        }
        return newCodes;
      });

      // Управление фокусом после обновления состояния
      if (currentCodeValue === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      // Если currentCodeValue не было пустым, фокус остается на текущем поле (оно было очищено)
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const enteredChar = value.slice(0, 1); // Берем только первый введенный символ

    if (enteredChar && /^\d$/.test(enteredChar)) {
      setCodes((prevCodes) => {
        const newCodes = [...prevCodes];
        newCodes[index] = enteredChar;

        // Проверяем, стала ли форма полностью заполненной после этого изменения
        const isNowComplete = newCodes.every((code) => code !== '');
        if (isNowComplete) {
          setNotEnoughNumbers(false); // Сбрасываем состояние ошибки, если форма теперь полная
        }
        return newCodes;
      });
      if (index < CODE_LENGTH - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      // Позволяем очистку поля, если пользователь удаляет символ напрямую (хотя Backspace обрабатывается onKeyDown)
      setCodes((prevCodes) => {
        const newCodes = [...prevCodes];
        newCodes[index] = '';
        // Если пользователь вручную удаляет символ, и форма была полной, она становится неполной.
        // Но notEnoughNumbers устанавливается в true только при клике на кнопку, так что здесь не меняем.
        return newCodes;
      });
    }
  };

  // Вычисляем, полностью ли заполнена форма
  const isFormComplete = codes.every((code) => code !== '');

  return (
    <>
      <h4 className={styles['modal-content__title']}>
        Мы отправили код подтверждения сброса пароля на вашу почту
      </h4>

      <div className={styles['modal-content__code-box']}>
        <h5 className={styles['code-box__title']}>Пожалуйста, введите код</h5>
        <ul className={styles['code-box__line-code']}>
          {Array(CODE_LENGTH)
            .fill(null)
            .map((_, index) => (
              <li
                key={index}
                className={`${styles['code-box__code-item']} ${
                  // Применяем класс ошибки, если notEnoughNumbers true И это конкретное поле пустое
                  notEnoughNumbers && codes[index] === ''
                    ? styles['code-box__code-item--error']
                    : ''
                }`}
              >
                <input
                  type="text"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={codes[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputMode="numeric"
                  pattern="\d"
                />
              </li>
            ))}
        </ul>
      </div>
      <p
        className={`${styles['code-box__resend']} ${
          canResend ? styles['code-box__resend--active'] : ''
        }`}
        onClick={handleResendCode}
      >
        {canResend
          ? 'Отправить код повторно'
          : `Отправить код повторно через ${resendTimer} сек`}
      </p>

      <button
        className={styles['modal-content__button']}
        onClick={onClickButton}
        disabled={isLoading || !isFormComplete} // Кнопка отключена, если идет загрузка или форма не заполнена
      >
        Подтвердить
      </button>
    </>
  );
};
