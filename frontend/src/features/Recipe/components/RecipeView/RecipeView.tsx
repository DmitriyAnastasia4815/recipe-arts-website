import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './RecipeView.module.scss';
import { Icons } from '@/styles/import-image';
import { noServer } from '@/styles/import-image';

import type { Recipe } from '../../types/types';

import arrayIcon from '@icon/icon-array.svg';

import { FavouriteIconAdded } from '@/assets/image/icon/FavouriteIcon/FavouriteIcon';

//пока нет сервера
import recipeImage from '@image/ReipeImage.svg';
import recipeSteps from '@image/RecipeStep.svg';

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
  description:
    'Классическая шарлотка с яблоками — пирог очень простой в приготовлении, но при этом вкусный, потому невероятно популярный. Печь его лучше осенью, так как именно местные сезонные фрукты зимних сортов идеально подходят для начинки.',
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
        image: noServer.step1,
        description:
          'Готовим тесто классической шарлотки. В чашу миксера вбиваем яйца. Добавляем сахар. Взбиваем миксером сначала на средней, затем на высокой скорости до получения светло-желтой массы однородной консистенции.',
      },
      step_2: {
        image: noServer.step2,
        description:
          'В сладкую яичную смесь добавляем муку, предварительно просеянную через мелкое сито со щепоткой соды и ванилином (ванильным сахаром). Снова взбиваем миксером. Тесто шарлотки готово.',
      },
      step_3: {
        image: noServer.step3,
        description:
          'Готовим начинку шарлотки. Яблоки моем и каждое разрезаем пополам. Удаляем сердцевины с семенами. Мякоть очищаем и нарезаем небольшими кубиками или ломтиками произвольной формы.',
      },
      step_4: {
        image: noServer.step4,
        description:
          'Яблоки добавляем в тесто шарлотки и осторожно перемешиваем. Выливаем получившуюся массу в форму, смазанную любым жиром, и отправляем в духовку, нагретую до 190°C, на 30 минут.',
      },
    },
  },
  advance: {
    image: noServer.advanceImage,
    hero_advance: 'Используйте только яблоки Голден',
    main: 'При приготовлении шарлотки обязательно используйте перчатки при доставании из духовки. Дайте шарлотке остыть после приготовления около часа. Подавайте с шариком мороженого и хорошим настроением:)',
  },
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
                  <div className={styles['info-box__main-info']}>
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

                    <h3 className={styles['info-box__name']}>
                      {recipeInfo?.name}
                    </h3>
                  </div>
                  <button
                    className={styles['info-box__favourite-button']}
                    onClick={handleFavouriteRecipe}
                  >
                    <img
                      className={styles['info-box__favourite-background']}
                      src={Icons.favouriteBackground}
                      alt="фон"
                    />
                    <FavouriteIconAdded
                      className={`${favouriteRecipe ? styles['info-box__favourites'] : styles['info-box__unfavourites']}`}
                    />
                  </button>
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
                    alt=""
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
            <img className={styles['fourth-section__advance-image']} src={recipeInfo?.advance.image} alt="картинка" />
            <div className={styles['fourth-section__advance-box']}>
              <div className={styles['fourth-section__advance-hero']}>
                <img src={Icons.iconIdea} alt="картинка" />
                <h2>{recipeInfo?.advance.hero_advance}</h2>
              </div>
              <h2>{recipeInfo?.advance.main}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;
