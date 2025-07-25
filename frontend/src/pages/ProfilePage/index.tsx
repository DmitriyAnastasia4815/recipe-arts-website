import styles from './ProfilePage.module.scss';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

import emptyRecipeImg from '@image/empty-profile-images/empty-recipe-img.svg';
import emptyProfileImg from '@image/empty-profile-images/empty-user-icon.svg';
import iconEditSmall from '@image/icon/icon-editing-small.svg';

import addedButton from '@icon/added-button.svg';

import RecipeCard from '@/features/Recipe/components/RecipeCard/RecipeCard';

import RecipeCardImage from '@image/RecipeCardImage.svg';
import RecipeCardImageSecond from '@image/RecipeCardImage.png';

import SearchByCategory from '@/components/ui/SearchByCategory/SearchByCategory';

import type { RecipeCardProps } from '@/features/Recipe/components/RecipeCard/RecipeCard';

//Пример данных для рецепта вообще нужно сделать через запрос на сервер
const initialRecipes = [
  {
    id: 1,
    image: RecipeCardImage,
    tags: ['Выпечка и десерты', 'Русская кухня'],
    name: 'Классическая шарлотка',
    total_ingredients: {
      Яблоко: 100,
      Яйцо: 100,
      Какао: 20,
      Молоко: 40,
      Сахар: 100,
      Разрыхлитель: 4,
      Соль: 2,
    },
    total_calories: 217,
    times: 50,
  },
  {
    id: 2,
    image: RecipeCardImageSecond,
    tags: ['Выпечка и десерты', 'Русская кухня'],
    name: 'Сливочный десерт с запеченными абрикосами',
    total_ingredients: {
      Яблоко: 100,
      Яйцо: 100,
      Какао: 20,
      Молоко: 40,
    },
    total_calories: 350,
    times: 30,
  },
];

function ProfilePage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [recipeItems, setRecipeItems] = useState<RecipeCardProps[]>([]);
  const userName = 'Кочерова Анастасия';
  const empty = recipeItems.length === 0;

  const [openSearchByCategory, setOpenSearchByCategory] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleToggleSearchCategory = () => {
    setOpenSearchByCategory((prev) => !prev);
  };

  const handleSearch = debounce((value) => {
    setSearchValue(value);
    const filteredRecipes = initialRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(value.toLowerCase()),
    );
    setRecipeItems(filteredRecipes);
  }, 300);

  const handleInputChange = (event) => {
    handleSearch(event.target.value);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    setRecipeItems(initialRecipes);

    // Очистка события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container">
      <div className={styles['content-wrapper']}>
        <div className={styles['main-section']}>
          <h1 className={styles['main-section__page-title']}>Книга рецептов</h1>
          <div className={styles['main-section__search-container']}>
            <input
              type="text"
              placeholder="поиск по названию"
              className={styles['search-container__search-input']}
              onChange={handleInputChange}
            />
            <button
              className={styles['search-container__search-button']}
              onClick={handleToggleSearchCategory}
            >
              поиск по категориям
            </button>
          </div>

          {empty ? (
            <div className={styles['main-section__empty-state']}>
              <img src={emptyRecipeImg} alt="empty-recipe" />
              <p className={styles['empty-message']}>
                Пока здесь ничего нет, но скоро появятся рецепты и фотографии,
                которые добавит {userName}
              </p>
            </div>
          ) : (
            <div className={styles['main-section__content']}>
              {recipeItems.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  id={index}
                  image={recipe.image}
                  tags={recipe.tags}
                  name={recipe.name}
                  total_ingredients={recipe.total_ingredients}
                  total_calories={recipe.total_calories}
                  times={recipe.times}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles['between__hr']}></div>

        <div className={styles['sidebar']}>
          <div className={styles['profile-section']}>
            <div className={styles['profile-section__profile-avatar']}>
              <img src={emptyProfileImg} alt="" />
            </div>
            <div className={styles['profile-section__added-settings']}>
              <div className={styles['profile-section__profile-name']}>
                <span>{userName}</span>
                <button className={styles['edit-button']}>
                  <img src={iconEditSmall} alt="edit-icon" />
                </button>
              </div>
              <button className={styles['profile-section__added-button']}>
                Добавить рецепт
                <img src={addedButton} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {openSearchByCategory && (
        <SearchByCategory onClose={handleToggleSearchCategory} />
      )}
    </div>
  );
}

export default ProfilePage;
