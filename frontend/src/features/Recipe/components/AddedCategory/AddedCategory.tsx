import React from 'react';
import { useState } from 'react';

import styles from './AddedCategory.module.scss';
import { Icons } from '@/styles/import-image';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../store/recipeSlice';
import { RootState } from '@/store/store';

interface AddedCategoryProps {
  onClose: () => void;
}

const AddedCategory: React.FC<AddedCategoryProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const currentSelectedCategories = useSelector(
    (state: RootState) => state.createRecipe.categories,
  );

  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    currentSelectedCategories,
  );

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory],
    );
  };

  const handleSearchCategory = () => {
    dispatch(setCategory(selectedSubcategories));
    onClose();
  };

  // Данные категорий
  const initialCategory = [
    {
      name: 'Кухня',
      subcategories: [
        'Азиатская кухня',
        'Арабская кухня',
        'Американская кухня',
        'Русская кухня',
      ],
    },
    {
      name: 'Прием пищи',
      subcategories: ['Завтрак', 'Обед', 'Ужин'],
    },
    {
      name: 'Тип блюда',
      subcategories: ['Первое блюдо', 'Второе блюдо', 'Десерт', 'Выпечка и десерты'],
    },
    {
      name: 'Диета',
      subcategories: [
        'Кето диета',
        'Низкоуглеводная диета',
        'Набор веса',
        'Дефицит калорий',
        'Сыроедение',
      ],
    },
    {
      name: 'Выпечка',
      subcategories: ['Тесто', 'Пироги', 'Булочки'],
    },
  ];

  return (
    <div className={styles['search-container']}>
      <div className={styles['search-container__content-box']}>
        <button
          className={styles['content-box__close-button']}
          onClick={onClose}
        >
          <img src={Icons.iconArray} alt="закрыть" />
        </button>
        {initialCategory.map((category) => (
          <div key={category.name} className={styles['category-section']}>
            <h3 className={styles['category-section__title']}>
              {category.name}
            </h3>
            <hr className={styles['category-section__hr']} />
            {category.subcategories.map((subcategory) => (
              <div key={subcategory} className={styles['subcategory__item']}>
                <label className={styles['subcategory__toggle-switch']}>
                  <input
                    type="checkbox"
                    checked={selectedSubcategories.includes(subcategory)}
                    onChange={() => toggleSubcategory(subcategory)}
                  />
                  <span className={styles['subcategory__slider']}></span>
                </label>
                <span className={styles['subcategory__label']}>
                  {subcategory}
                </span>
              </div>
            ))}
          </div>
        ))}
        <button
          className={styles['content-box__search-button']}
          onClick={handleSearchCategory}
        >
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddedCategory;
