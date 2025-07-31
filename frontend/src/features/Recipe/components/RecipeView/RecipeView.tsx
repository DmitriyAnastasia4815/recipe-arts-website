import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './RecipeView.module.scss';

import arrayIcon from '@icon/icon-array.svg';

import increaseIcon from '@icon/PortionButton/icon-increase.svg';
import decreseIcon from '@icon/PortionButton/icon-decrease.svg';

import { FavouriteIconAdded } from '@/assets/image/icon/FavouriteIcon/FavouriteIcon';

//пока нет сервера
import recipeImage from '@image/ReipeImage.svg';
import recipeSteps from '@image/RecipeStep.svg';

interface Ingredient {
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
      { name: 'Яблоки', amount: 450 },
      { name: 'Пшеничная мука хлебопекарная', amount: 130 },
      { name: 'Куриное яйцо', amount: 180 },
      { name: 'Сахар', amount: 180 },
      { name: 'Ванилин', amount: 2 },
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

interface RecipeViewProps {
  recipeId: string;
}
const RecipeView: React.FC<RecipeViewProps> = ({ recipeId }) => {
  const id = recipeId;
  const [recipeInfo, setRecipeInfo] = useState<Recipe | null>(null);
  const [counterPortion, setCounterPortion] = useState<number>(1);
  const hours = recipeInfo?.recipe_steps.time.hours || null;
  const [favouriteRecipe, setFavouriteRecipe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Имитация запроса на сервер
    setRecipeInfo(initialRecipe);
    setCounterPortion(initialRecipe.ingredients.portion);
  }, [id]);

  if (!recipeInfo) {
    return <div>Загрузка...</div>;
  }
  const handleIncreasePortion = () => {
    setCounterPortion(counterPortion + 1);
  };

  const handleDecreasePortion = () => {
    if (counterPortion > 1) {
      setCounterPortion(counterPortion - 1);
    }
  };
  const energyValue = recipeInfo.energy_value
    ? recipeInfo.energy_value.carb * 4 +
      recipeInfo.energy_value.fat * 9 +
      recipeInfo.energy_value.protein * 4
    : 0;

  const handleFavouriteRecipe = () => {
    //отправка на сервер
    setFavouriteRecipe((prev) => !prev);
  };

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
              <img
                className={styles['main-content__image']}
                // src={recipeInfo.image}
                src={recipeImage}
                alt={recipeInfo.name}
              />
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
                  </div>
                  <div className={styles['info-box__main-info']}>
                    <h3 className={styles['info-box__name']}>
                      {recipeInfo?.name}
                    </h3>
                    <button
                      className={styles['info-box__favourite-button']}
                      onClick={handleFavouriteRecipe}
                    >
                      <FavouriteIconAdded
                        className={`${favouriteRecipe ? styles['info-box__favourites'] : styles['info-box__unfavourites']}`}
                      />
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
            <h2 className={styles['header__name']}>Ингредиенты</h2>
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
              {recipeInfo?.ingredients?.list_ingredients.map((ingredient) => (
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
              ))}
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
            </div>
          </div>

          <div className={styles['recipe-section__steps']}>
            {Object.entries(recipeInfo.recipe_steps.steps).map(
              ([key, step], index) => (
                <div key={key} className={styles['recipe-section__step']}>
                  <img
                    className={styles['recipe-section__image']}
                    src={step.image || recipeSteps}
                    alt={`Шаг ${index + 1}`}
                  />
                  <div className={styles['recipe-section__content']}>
                    <h3 className={styles['recipe-section__number']}>
                      Шаг {index + 1}
                    </h3>
                    <p className={styles['recipe-section__description']}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div className={styles['content-container__fourth-section']}>
          <h2 className={styles['header__name']}>Совет </h2>
          <div className={styles['fourth-section__advance']}>
            {recipeInfo?.advance}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;
