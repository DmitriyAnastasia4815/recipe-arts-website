import styles from './EditingRecipeName.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import returnIcon from '@icon/icon-array.svg';
import cookingThing from '@icon/cookingThing.svg';

//картинки при отсутствии шагов или картинок рецепта от пользователя
import emptyRecipeImage from '@image/emptyRecipeImage.svg';
import emptyRecipeStep from '@image/emptyRecipeStep.svg';

//пока нет сервера
import recipeImage from '@image/ReipeImage.svg';
import recipeSteps from '@image/RecipeStep.svg';

//примеры рецептов
import { initialEmptyRecipe } from '@/assets/example/example';
import { initialRecipe } from '@/assets/example/example';
import { initialIngredient } from '@/assets/example/example';

//типизация
import type { Recipe } from '@/assets/example/example';
import { RootState } from '@/store/store';

import { useDispatch, useSelector } from 'react-redux';
import { updateRecipeField } from '../../store/recipeSlice';

interface EditingRecipeNameProps {
  onClose: () => void;
  mode: string;
  id?: number;
}

export const EditingRecipeName: React.FC<EditingRecipeNameProps> = ({
  onClose,
  mode,
  id,
}) => {
  const recipeInfo = useSelector((state: RootState) => state.createRecipe);
  const [imageSrc, setImageSrc] = useState<string>(
    mode === 'edit' ? recipeImage : emptyRecipeImage,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleConfirm = () => {
    dispatch(
      updateRecipeField({ field: 'name', value: nameRef.current?.value || '' }),
    );
    dispatch(updateRecipeField({ field: 'image', value: imageSrc }));
    onClose();
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

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    dispatch(updateRecipeField({field: 'name', value: name}))
  };

  const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    dispatch(updateRecipeField({field: 'description', value: description}))
  }

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
          <div className={styles['main-container__edit-image']}>
            <h2 className={styles['edit-image__name']}>Фото</h2>
            <div
              className={styles['edit-image__image-box--overlay']}
              onClick={handleImageClick}
            >
              <div className={styles['edit-image__image-box']}>
                <img
                  className={styles['edit-image__image']}
                  src={recipeInfo.image}
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
          <div className={styles['main-container__edit-name']}>
            <h2 className={styles['edit-name__name']}>Название</h2>
            <input
              className={styles['edit-name__input']}
              type="text"
              placeholder={recipeInfo?.name}
              ref={nameRef}
              onChange={handleChangeName}
            />
          </div>
          <div className={styles['main-container__edit-description']}>
            <h2 className={styles['edit-description__name']}>Описание</h2>
            <textarea
              className={styles['edit-description__input']}
              type="text"
              placeholder={recipeInfo?.description || 'Краткое описание'}
              ref={descRef}
              onChange={handleChangeDescription}
            />
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
