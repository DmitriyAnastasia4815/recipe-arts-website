import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './RecipeForm.module.scss';
import { Icons } from '@/styles/import-image';
import { noServer } from '@/styles/import-image';

//все поп апы
import EditingRecipeName from '@/features/Recipe/components/EditingRecipesName/EditingRecipeName';
import SearchByCategory from '@/components/ui/SearchByCategory/SearchByCategory';
import AddedIngredient from '../AddedIngredient/AddedIngredient';

import editIcon from '@icon/icon-editing-small.svg';
import deleteIcon from '@icon/icon-delete.svg';
import addedStepIcon from '@icon/added-button.svg';

//изображения
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
import type { Recipe } from '../../types/types';

interface RecipeFormProps {
  mode: string;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipeInfo, setRecipeInfo] = useState<Recipe | null>(null);

  const [counterPortion, setCounterPortion] = useState<number>(1);
  const hours = recipeInfo?.recipe_steps.time.hours || null;

  //управление открытием поп апов
  const [openEditCategories, setOpenEditCategories] = useState(false);
  const [openEditName, setOpenEditName] = useState(false);
  const [openAddedIngredient, setOpenAddedIngredient] = useState(false);

  const [advance, setAdvance] = useState('');

  useEffect(() => {
    if (mode === 'edit' && id) {
      //запрос на сервер для получения данных о рецепте
      //без сервера пока использую initialRecipe
      setRecipeInfo(initialRecipe);
    } else if (mode === 'create') {
      //инициализация пустой формы рецепта для его создания
      setRecipeInfo(initialEmptyRecipe);
    }
  }, [mode, id]);

  if (!recipeInfo) {
    return <div>Загрузка...</div>;
  }
  const handleUpdateRecipe = (updatedRecipe: Partial<Recipe>) => {
    setRecipeInfo((prev) => ({
      ...prev!,
      ...updatedRecipe,
    }));
  };

  const onChangeAdvance = (event: HTMLTextAreaElement) => {
    const advance = event.value;
    setAdvance(advance);
  };
  const handleIncreasePortion = () => {
    setCounterPortion(counterPortion + 1);
  };

  const handleDecreasePortion = () => {
    if (counterPortion > 1) {
      setCounterPortion(counterPortion - 1);
    }
  };

  const handleEditTags = () => {
    //кнопка редактирования тегов  закрытия по апа
    setOpenEditCategories((prev) => !prev);
  };

  const handleEditName = () => {
    setOpenEditName((prev) => !prev);
  };

  const handleEditIngredients = () => {
    //кнопка редактирования списка ингредиентов
    setOpenAddedIngredient((prev) => !prev);
  };

  const handleAddedSteps = () => {
    //кнопка добавления шага рецепта
  };

  const handleEditSteps = (index: number) => {
    //кнопка редактирования шага
  };
  const handleDeleteSteps = () => {
    //кнопка удаления шага
  };
  const handleEditAdvance = () => {
    //кнопка редактирования совета
  };

  const energyValue = recipeInfo.energy_value
    ? recipeInfo.energy_value.carb * 4 +
      recipeInfo.energy_value.fat * 9 +
      recipeInfo.energy_value.protein * 4
    : 0;

  return (
    <div className="container">
      <div className={styles['content-container']}>
        <button
          className={styles['content-container__return-button']}
          onClick={() => navigate(-1)}
        >
          <img src={Icons.iconArray} alt="назад" />
        </button>

        <div className={styles['content-container__first-section']}>
          <div className={styles['main-content']}>
            <div className={styles['main-content__info-box']}>
              {recipeInfo.image ? (
                <img
                  className={styles['main-content__image']}
                  // src={recipeInfo.image}
                  src={recipeImage}
                  alt={recipeInfo.name}
                />
              ) : (
                <img
                  className={styles['main-content__image']}
                  src={emptyRecipeImage}
                  alt={recipeInfo.name}
                />
              )}

              <div className={styles['info-box__info']}>
                <div className={styles['info-box__info-right']}>
                  <div className={styles['info-box__tags']}>
                    {recipeInfo.categories?.length > 0 &&
                      recipeInfo.categories.map((tag, index) => (
                        <span
                          key={index}
                          className={styles['info-box__tags-tag']}
                        >
                          {tag}
                        </span>
                      ))}
                    <button
                      className={styles['edit-button']}
                      onClick={handleEditTags}
                    >
                      <img src={Icons.iconEdit} alt="редактирование" />
                    </button>
                  </div>
                  <div className={styles['info-box__main-info']}>
                    <h3 className={styles['info-box__name']}>
                      {recipeInfo?.name}
                    </h3>
                    <button
                      className={styles['edit-button']}
                      onClick={handleEditName}
                    >
                      <img src={Icons.iconEdit} alt="редактирование" />
                    </button>
                  </div>
                </div>
                <div className={styles['info-box__description']}>
                  <p className={styles['info-box__description-text']}>
                    {recipeInfo.description}
                  </p>
                </div>

                <div className={styles['info-box__calories-table']}>
                  <h3 className={styles['calories-table__name']}>
                    Энергетическая ценность на 100 грамм
                  </h3>
                  <hr className={styles['calories-table__hr']} />
                  <div className={styles['calories-table__info']}>
                    <div className={styles['calories-table__item']}>
                      <h2>Калорийность</h2>
                      <span className={styles['calories-table__item--count']}>
                        {energyValue}
                      </span>
                      <span className={styles['calories-table__item--measure']}>
                        ккал
                      </span>
                    </div>
                    <div className={styles['calories-table__item']}>
                      <h2>Белки</h2>
                      <span className={styles['calories-table__item--count']}>
                        {recipeInfo?.energy_value.protein}
                      </span>
                      <span className={styles['calories-table__item--measure']}>
                        грамм
                      </span>
                    </div>
                    <div className={styles['calories-table__item']}>
                      <h2>Жиры</h2>
                      <span className={styles['calories-table__item--count']}>
                        {recipeInfo?.energy_value.fat}
                      </span>
                      <span className={styles['calories-table__item--measure']}>
                        грамм
                      </span>
                    </div>
                    <div className={styles['calories-table__item']}>
                      <h2>Углеводы</h2>
                      <span className={styles['calories-table__item--count']}>
                        {recipeInfo?.energy_value.carb}
                      </span>
                      <span className={styles['calories-table__item--measure']}>
                        грамм
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['content-container__second-section']}>
          <div className={styles['ingredients-section__header']}>
            <h2 className={styles['header__name']}>Ингредиенты</h2>

            <div className={styles['header__info-box']}>
              <div className={styles['header-recipe__buttons']}>
                <div className={styles['header-recipe__times-button']}>
                  <img
                    className={styles['header-recipe__times-time']}
                    src={Icons.iconTimer}
                    alt="время"
                  />
                  {hours && hours > 1 ? (
                    <h2 className={styles['header-recipe__times-hours']}>
                      {hours} часа
                    </h2>
                  ) : hours === 1 ? (
                    <h2 className={styles['header-recipe__times-hours']}>
                      {hours} час
                    </h2>
                  ) : (
                    ''
                  )}
                  {recipeInfo.recipe_steps.time.minutes} минут
                </div>
              </div>
              <div className={styles['header__portion-box']}>
                <div className={styles['portion-box']}>
                  <img
                    className={styles['portion-box__image']}
                    src={Icons.iconKitchenThings}
                    alt="предметы"
                  />
                  <h2 className={styles['portion-box__name']}>Порции</h2>
                  <div className={styles['portion-box__counter']}>
                    <button
                      onClick={handleDecreasePortion}
                      className={styles['portion-box__decrease-button']}
                    >
                      <img src={Icons.iconDecrease} alt="уменьшить" />
                    </button>
                    <div className={styles['portion-box__counter-box']}>
                      {counterPortion}
                    </div>
                    <button
                      onClick={handleIncreasePortion}
                      className={styles['portion-box__increase-button']}
                    >
                      <img src={Icons.iconIncrease} alt="добавить" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['header__ingredients-list']}>
            <div className={styles['ingredients-list']}>
              {recipeInfo?.ingredients.list_ingredients.length > 0 ? (
                recipeInfo?.ingredients?.list_ingredients.map((ingredient) => (
                  <div className={styles['ingredients-list__item']}>
                    <div className={styles['ingredients-list__item-info']}>
                      <h2 className={styles['ingredients-list__item-name']}>
                        {ingredient.name}
                      </h2>
                      <h2 className={styles['ingredients-list__item-amount']}>
                        {(ingredient.amount * counterPortion) /
                          recipeInfo.ingredients.portion}{' '}
                        гр
                      </h2>
                    </div>
                    <hr className={styles['ingredients-list__item-hr']} />
                  </div>
                ))
              ) : (
                <div className={styles['ingredients-list__empty-list']}>
                  <p>
                    Добавьте количество порций и ингредиентов для приготовления
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles['content-container__third-section']}>
          <div className={styles['recipe-section__header']}>
            <h2 className={styles['header__name']}>Пошаговый рецепт </h2>
            <div className={styles['header-recipe__buttons']}>
              <button
                className={styles['header-recipe__added-step']}
                onClick={handleAddedSteps}
              >
                <h2>Добавить шаг</h2>
                <img src={addedStepIcon} alt="добавить" />
              </button>
            </div>
          </div>

          <div className={styles['recipe-section__steps']}>
            {Object.keys(recipeInfo?.recipe_steps.steps).length > 0 ? (
              Object.entries(recipeInfo.recipe_steps.steps).map(
                ([key, step], index) => (
                  <div key={key} className={styles['recipe-section__step']}>
                    <img
                      className={styles['recipe-section__image']}
                      src={step.image || recipeSteps}
                      alt={`Шаг ${index + 1}`}
                    />
                    <div className={styles['recipe-section__content']}>
                      <div className={styles['recipe-section__content-name']}>
                        <h3 className={styles['recipe-section__number']}>
                          Шаг {index + 1}
                        </h3>
                        <button
                          className={styles['edit-button']}
                          onClick={handleEditSteps}
                        >
                          <img src={Icons.iconEdit} alt="редактирование" />
                        </button>
                        <button
                          className={styles['edit-button']}
                          onClick={handleDeleteSteps}
                        >
                          <img src={deleteIcon} alt="удаление шага" />
                        </button>
                      </div>

                      <p className={styles['recipe-section__description']}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ),
              )
            ) : (
              <div className={styles['ingredients-list__empty-list']}>
                <p>
                  Расскажите, как вы приготовили блюдо, инструкция должна
                  содержать минимум 3 шага. Также укажите, сколько времени
                  требуется на приготовление
                </p>

                <div className={styles['ingredients-list__empty-steps']}>
                  {Array.from({ length: 3 }, (_, index) => (
                    <div
                      key={index}
                      className={styles['ingredients-list__empty-item']}
                    >
                      <div>
                        <button
                          className={styles['ingredients-list__drag-button']}
                        ></button>
                        <img
                          className={
                            styles['ingredients-list__empty-step-image']
                          }
                          src={emptyRecipeStep}
                          alt={`Фото шага ${index + 1}`}
                        />
                      </div>
                      <div
                        className={
                          styles['ingredients-list__empty-description']
                        }
                      >
                        <h2
                          className={
                            styles['ingredients-list__empty-step-number']
                          }
                        >
                          Шаг {index + 1}
                        </h2>
                        <button
                          className={styles['edit-button']}
                          onClick={() => handleEditSteps(index)}
                        >
                          <img src={Icons.iconEdit} alt="редактирование" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles['content-container__fourth-section']}>
          <div className={styles['fourth-section__advance-header']}>
            <h2 className={styles['header__name']}>Совет </h2>
            <button
              className={styles['edit-button']}
              onClick={handleEditAdvance}
            >
              <img src={Icons.iconEdit} alt="редактирование" />
            </button>
          </div>

          <div className={styles['fourth-section__advance']}>
            {recipeInfo?.advance.length > 0 ? (
              <div>
                <img
                  className={styles['fourth-section__advance-image']}
                  src={noServer.advanceImage}
                  alt="картинка"
                />
                <div className={styles['fourth-section__advance-box']}>
                  <div className={styles['fourth-section__advance-hero']}>
                    <img src={Icons.iconIdea} alt="картинка" />
                    <h2>{advance}</h2>
                  </div>
                  <h2>{recipeInfo?.advance.main}</h2>
                </div>
              </div>
            ) : (
              <div className={styles['ingredients-list__empty-advance']}>
                <img src={noServer.advanceImage} alt="картинка" />
                <textarea
                  value={advance}
                  onChange={onChangeAdvance}
                  className={styles['ingredients-list__empty-advance-area']}
                  placeholder=" Расскажите, на что обратить внимание при приготовлении блюда или как можно его усовершенствовать"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <button className={styles['content-container__confirm-recipe']}>
        Добавить рецепт
      </button>
      {openEditName && (
        <div className={styles['pop-up__overlay']}>
          <div className={styles['pop-up__edit-name']}>
            <EditingRecipeName
              onClose={handleEditName}
              mode={mode}
              id={id ? parseInt(id) : undefined}
            />
          </div>
        </div>
      )}
      {openEditCategories && (
        <div className={styles['pop-up__edit-name']}>
          <SearchByCategory onClose={handleEditTags} />
        </div>
      )}

      {openAddedIngredient && (
        <div className={styles['pop-up__overlay']}>
          <div className={styles['pop-up__edit-ingredients']}>
            <AddedIngredient onClose={handleEditIngredients} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeForm;
