import styles from './RegisterModal.module.scss';
import iconArray from '@icon/icon-array.svg';
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';

const CODE_LENGTH = 6;

interface RegisterModalProps {
  onClose: () => void;
}

function RegisterModal({ onClose }: RegisterModalProps) {
  const [codes, setCodes] = useState<string[]>(Array(CODE_LENGTH).fill(''));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-content']}>
        <div
          onClick={onClose}
          className={styles['modal-content__return-arrow']}
        >
          <img src={iconArray} alt="prev-page" />
        </div>

        <h4 className={styles['modal-content__title']}>
          Мы отправили код подтверждения регистрации на вашу почту
        </h4>

        <div className={styles['modal-content__code-box']}>
          <h5 className={styles['code-box__title']}>Пожалуйста, введите код</h5>
          <ul className={styles['code-box__line-code']}>
            {Array(CODE_LENGTH)
              .fill(null)
              .map((_, index) => (
                <li key={index} className={styles['code-box__code-item']}>
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

        <button className={styles['modal-content__button']}>подтвердить</button>
      </div>
    </div>
  );
}

export default RegisterModal;
