import styles from './ModalCode.module.scss';

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import iconArray from '@icon/icon-array.svg';

const CODE_LENGTH = 6;
const RESEND_TIMEOUT = 60;

interface RegisterModalProps {
  onClose: () => void;
  title?: string;
  subtitle?: string;
  resendText?: string;
  resendTimerText?: string;
  confirmButtonText?: string;
  onClickNext: () => void;
}

function ModalCode({
  onClose,
  title = 'Мы отправили код подтверждения регистрации на вашу почту',
  subtitle = 'Пожалуйста, введите код',
  resendText = 'Отправить код повторно',
  resendTimerText = 'Отправить код повторно через {seconds} сек',
  confirmButtonText = 'подтвердить',
  onClickNext
}: RegisterModalProps) {
  const [codes, setCodes] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [notEnoughNumbers, setNotEnoughNumbers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
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
    if (canResend) {
      setIsLoading(true);
      try {
        startTimer();
      } catch (error) {
        console.error('Ошибка при повторной отправке кода:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onClickButton = () => {
    const isInComplete = codes.some((code) => code === '');
    setNotEnoughNumbers(isInComplete);

    if (!isInComplete) {
      setIsLoading(true);
      const emailCode = codes.join('');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (codes[index] === '' && index > 0) {
        setCodes((prevCodes) => {
          const newCodes = [...prevCodes];
          newCodes[index - 1] = '';
          return newCodes;
        });
        inputRefs.current[index - 1]?.focus();
      } else if (codes[index] !== '') {
        setCodes((prevCodes) => {
          const newCodes = [...prevCodes];
          newCodes[index] = '';
          return newCodes;
        });
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const enteredChar = value.slice(0, 1);

    if (enteredChar && /^\d$/.test(enteredChar)) {
      setCodes((prevCodes) => {
        const newCodes = [...prevCodes];
        newCodes[index] = enteredChar;
        return newCodes;
      });

      if (index < CODE_LENGTH - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <>
      <button
        onClick={onClose}
        className={styles['modal-content__return-arrow']}
      >
        <img src={iconArray} alt="" />
      </button>

      <h4 className={styles['modal-content__title']}>{title}</h4>

      <div className={styles['modal-content__code-box']}>
        <h5 className={styles['code-box__title']}>{subtitle}</h5>
        <ul className={styles['code-box__line-code']}>
          {Array(CODE_LENGTH)
            .fill(null)
            .map((_, index) => (
              <li
                key={index}
                className={`${styles['code-box__code-item']} ${notEnoughNumbers && codes[index] === '' ? styles['code-box__code-item--error'] : ''}`}
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
        className={`${styles['code-box__resend']} ${canResend ? styles['code-box__resend--active'] : ''}`}
        onClick={handleResendCode}
      >
        {canResend
          ? resendText
          : resendTimerText.replace('{seconds}', resendTimer.toString())}
      </p>

      <button
        className={styles['modal-content__button']}
        onClick={onClickButton}
        disabled={isLoading}
        onClick = {onClickNext}
      >
        {confirmButtonText}
      </button>
    </>
  );
}

export default ModalCode;
