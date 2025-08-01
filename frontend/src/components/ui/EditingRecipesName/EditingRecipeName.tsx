
import React, { useRef, useState } from 'react';
import styles from './EditingRecipeName.module.scss';

import emptyRecipe from '@image/EmptyRecipe/EmptyRecipe.svg';
import returnIcon from '@icon/icon-array.svg';
import cookingThing from '@icon/cookingThing.svg';

interface EditingRecipeNameProps {
  onClose: () => void;
}

export const EditingRecipeName: React.FC<EditingRecipeNameProps> = ({
  onClose,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(emptyRecipe);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    // Взаимодействие с редаксом скорее всего
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };


  return (
    <div className={styles['main-container']}>
      <div className={styles['main-container__content']}>
        <button
          className={styles['main-container__return-button']}
          onClick={onClose}
        >
          <img src={returnIcon} alt="вернуться" />
        </button>
        <div className={styles['main-container__editing']}>
          <div className={styles['main-container__edit-name']}>
            <h2 className={styles['edit-name__name']}>Название</h2>
            <input className={styles['edit-name__input']} type="text" />
          </div>

          <div className={styles['main-container__edit-image']}>
            <h2 className={styles['edit-image__name']}>Фото</h2>
            <div className={styles['edit-image__image-box--overlay']} onClick={handleImageClick}>
              <div className={styles['edit-image__image-box']}>
                <img
                  className={styles['edit-image__image']}
                  src={imageSrc}
                  alt="Рецепт"
                />
                <div className={styles['edit-image__overlay']}>
                  <img
                    className={styles['edit-image__cooking-thing']}
                    src={cookingThing}
                    alt="Иконка редактирования"
                  />
                </div>
                <input
                  className={styles['edit-image__input']}
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className={styles['main-container__confirm-button']}
          onClick={handleConfirm}
        >
          Подтвердить
        </button>
      </div>
    </div>
  );
};

export default EditingRecipeName;

