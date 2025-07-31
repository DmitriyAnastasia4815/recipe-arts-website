import styles from './ProfilePage.module.scss';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

// Импорт изображений
import emptyRecipeImg from '@image/empty-profile-images/empty-recipe-img.svg';
import emptyProfileImg from '@image/empty-profile-images/empty-user-icon.svg';
import iconEditSmall from '@image/icon/icon-editing-small.svg';
import addedButton from '@icon/added-button.svg';
import RecipeCardImage from '@image/RecipeCardImage.svg';
import RecipeCardImageSecond from '@image/RecipeCardImage.png';

// Импорт компонентов
import RecipeCard from '@/features/Recipe/components/RecipeCard/RecipeCard';
import SearchByCategory from '@/components/ui/SearchByCategory/SearchByCategory';
import type { RecipeCardProps } from '@/features/Recipe/components/RecipeCard/RecipeCard';
import { useNavigate } from 'react-router-dom';

// Определение типа для ингредиентов
interface Ingredient {
  [key: string]: number;
}

// Пример данных для рецептов
const initialRecipes: RecipeCardProps[] = [
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

/**
 * Компонент страницы профиля, отображающий книгу рецептов пользователя.
 * Поддерживает поиск по названию рецепта и категориям.
 * @returns JSX.Element
 */
const ProfilePage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [recipeItems, setRecipeItems] =
    useState<RecipeCardProps[]>(initialRecipes);
  const [openSearchByCategory, setOpenSearchByCategory] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>('');
  const userName = 'Кочерова Анастасия';
  const empty = recipeItems.length === 0;

  /**
   * Переключает видимость панели поиска по категориям.
   */
  const handleToggleSearchCategory = (): void => {
    setOpenSearchByCategory((prev) => !prev);
  };

  /**
   * Обрабатывает поиск по названию рецепта с использованием debounce.
   * @param value - Введённая строка поиска.
   */
  const handleSearch = debounce((value: string): void => {
    setSearchValue(value);
    const filteredRecipes = initialRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(value.toLowerCase()),
    );
    setRecipeItems(filteredRecipes);
  }, 100);

  /**
   * Обрабатывает изменение значения в поле ввода поиска.
   * @param event - Событие изменения поля ввода.
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    handleSearch(event.target.value);
  };

  const handleAddRecipe = (): void => {
    navigate('/recipe/new');
  };

  /**
   * Инициализирует обработчик изменения размера окна и очищает его при размонтировании.
   */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

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
              value={searchValue}
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
              <img src={emptyRecipeImg} alt="Нет рецептов" />
              <p className={styles['empty-message']}>
                Пока здесь ничего нет, но скоро появятся рецепты и фотографии,
                которые добавит {userName}
              </p>
            </div>
          ) : (
            <div className={styles['main-section__content']}>
              {recipeItems.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
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
              <img src={emptyProfileImg} alt="Аватар пользователя" />
            </div>
            <div className={styles['profile-section__added-settings']}>
              <div className={styles['profile-section__profile-name']}>
                <span>{userName}</span>
                <button className={styles['edit-button']}>
                  <img src={iconEditSmall} alt="Иконка редактирования" />
                </button>
              </div>
              <button
                className={styles['profile-section__added-button']}
                onClick={handleAddRecipe}
              >
                Добавить рецепт
                <img src={addedButton} alt="Иконка добавления рецепта" />
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
};

export default ProfilePage;
