import React, { useEffect } from 'react';
import styles from './RecipeForm.module.scss';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EditingRecipeName from '@/components/ui/EditingRecipesName/EditingRecipeName';

import arrayIcon from '@icon/icon-array.svg';

import increaseIcon from '@icon/PortionButton/icon-increase.svg';
import decreseIcon from '@icon/PortionButton/icon-decrease.svg';

import editIcon from '@icon/icon-editing-small.svg';
import deleteIcon from '@icon/icon-delete.svg';
import addedStepIcon from '@icon/added-button.svg';

import emptyRecipeImage from '@image/emptyRecipeImage.svg';
import emptyRecipeStep from '@image/emptyRecipeStep.svg';

//пока нет сервера
import recipeImage from '@image/ReipeImage.svg';
import recipeSteps from '@image/RecipeStep.svg';

interface Ingredient {
  id: number;
  name: string;
  amount: number;
}

interface EnergyValue {
  protein: number;
  fat: number;
  carb: number;
}

interface Time {
  hours: number;
  minutes: number;
}

interface Step {
  image: string;
  description: string;
}

interface RecipeSteps {
  time: Time;
  steps: {
    [key: string]: Step;
  };
}

interface Ingredients {
  portion: number;
  list_ingredients: Ingredient[];
}

interface Recipe {
  id: number;
  categories: string[];
  image: string;
  name: string;
  energy_value: EnergyValue;
  ingredients: Ingredients;
  recipe_steps: RecipeSteps;
  advance: string;
}

const initialEmptyRecipe: Recipe = {
  id: 0,
  categories: ['категория блюда', 'категория блюда'],
  image: '',
  name: 'Название блюда',
  energy_value: { protein: 0, fat: 0, carb: 0 },
  ingredients: { portion: 1, list_ingredients: [] },
  recipe_steps: { time: { hours: 0, minutes: 0 }, steps: {} },
  advance: '',
};

const initialRecipe: Recipe = {
  id: 1,
  categories: [
    'Выпечка и десерты',
    'Русская кухня',
    'Русская кухня',
    'Русская кухня',
  ],
  image: 'картинка',
  name: 'Классическая шарлотка',
  energy_value: {
    protein: 30,
    fat: 20,
    carb: 120,
  },
  ingredients: {
    portion: 4,
    list_ingredients: [
      { id: 1, name: 'Яблоки', amount: 450 },
      { id: 2, name: 'Пшеничная мука хлебопекарная', amount: 130 },
      { id: 3, name: 'Куриное яйцо', amount: 180 },
      { id: 4, name: 'Сахар', amount: 180 },
      { id: 5, name: 'Ванилин', amount: 2 },
    ],
  },
  recipe_steps: {
    time: {
      hours: 2,
      minutes: 40,
    },
    steps: {
      step_1: {
        image: '',
        description: 'Яблоки нарезать, очистить от кожуры.',
      },
      step_2: {
        image: '',
        description: 'Яйца с сахаром взбить миксером до пышности.',
      },
      step_3: {
        image: '',
        description: 'Добавить муку и ванилин, аккуратно перемешать.',
      },
      step_4: { image: '', description: 'Выпекать при 180°C 30 минут.' },
    },
  },
  advance:
    'Lörem ipsum vöräse terahylig rengar pörar. Rågen mahifask. Dekanuhins redat har spenura årar. Poss prosk i ossade om dulig, liksom desm. Tenosam tusm, hyperaktiv, nuvis hutessa. Polyv pede vaktiga pöpusm yr. Mikronokanade prell. Fas foden och fasat portad. Dupp intrasm prenusa. Enynde por: far när fatelig i radiometer. ',
};

interface initialIngredient {
  id: number;
  name: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

const initialIngredient: initialIngredient = {
  id: 1,
  name: 'Яблоки',
  protein: 0.3,
  fat: 0.2,
  carbs: 13.8,
  calories: 52,
};

interface RecipeFormProps {
  mode: string;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipeInfo, setRecipeInfo] = useState<Recipe | null>(null);

  const [counterPortion, setCounterPortion] = useState<number>(1);
  const hours = recipeInfo?.recipe_steps.time.hours || null;

  const [openEditName, setOpenEditName] = useState(false);

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
    //кнопка редактирования тегов
  };

  const handleEditName = () => {
    setOpenEditName((prev) => !prev);
  };

  const handleEditIngredients = () => {
    //кнопка редактирования списка ингредиентов
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
          <img src={arrayIcon} alt="назад" />
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
                      <img src={editIcon} alt="редактирование" />
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
                      <img src={editIcon} alt="редактирование" />
                    </button>
                  </div>
                </div>

                <div className={styles['info-box__calories-table']}>
                  <h3 className={styles['calories-table__name']}>
                    Энергетическая ценность на 100 грамм
                  </h3>
                  <hr className={styles['calories-table__hr']} />
                  <div className={styles['calories-table__info']}>
                    <div className={styles['calories-table__item']}>
                      <h2>Калорийность</h2>
                      <span>{energyValue}</span>
                      <span>ккал</span>
                    </div>
                    <div className={styles['calories-table__item']}>
                      <h2>Белки</h2>
                      <span>{recipeInfo?.energy_value.protein}</span>
                      <span>грамм</span>
                    </div>
                    <div className={styles['calories-table__item']}>
                      <h2>Жиры</h2>
                      <span>{recipeInfo?.energy_value.fat}</span>
                      <span>грамм</span>
                    </div>
                    <div className={styles['calories-table__item']}>
                      <h2>Углеводы</h2>
                      <span>{recipeInfo?.energy_value.carb}</span>
                      <span>грамм</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['content-container__second-section']}>
          <div className={styles['ingredients-section__header']}>
            <div className={styles['ingredients-section__header-box']}>
              <h2 className={styles['header__name']}>Ингредиенты</h2>
              <button
                className={styles['edit-button']}
                onClick={handleEditIngredients}
              >
                <img src={editIcon} alt="редактирование" />
              </button>
            </div>

            <div className={styles['header__portion-box']}>
              <div className={styles['portion-box']}>
                <h2 className={styles['portion-box__name']}>порции</h2>
                <div className={styles['portion-box__counter']}>
                  <button
                    onClick={handleDecreasePortion}
                    className={styles['portion-box__decrease-button']}
                  >
                    <img src={decreseIcon} alt="уменьшить" />
                  </button>
                  <div className={styles['portion-box__counter-box']}>
                    {counterPortion}
                  </div>
                  <button
                    onClick={handleIncreasePortion}
                    className={styles['portion-box__increase-button']}
                  >
                    <img src={increaseIcon} alt="добавить" />
                  </button>
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
              <div className={styles['header-recipe__times-button']}>
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
                          <img src={editIcon} alt="редактирование" />
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
                          <img src={editIcon} alt="редактирование" />
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
              <img src={editIcon} alt="редактирование" />
            </button>
          </div>

          <div className={styles['fourth-section__advance']}>
            {recipeInfo?.advance.length > 0 ? (
              recipeInfo?.advance
            ) : (
              <div className={styles['ingredients-list__empty-advance']}>
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
            <EditingRecipeName onClose={handleEditName} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeForm;
