
import styles from './RecipeCard.module.scss';
import React from 'react';

import iconMore from '@icon/icon-more.svg';
import iconCalories from '@icon/icon-calories.svg';
import iconTime from '@icon/icon-time.svg';
import deleteIcon from '@icon/icon-delete.svg';
import editIconSmall from '@icon/icon-editing-large.svg';

export type RecipeCardProps = {
  id: number;
  image: string;
  tags: string[];
  name: string;
  total_ingredients: string[];
  total_calories: number;
  times: number;
};

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  const { id, image, tags, name, total_ingredients, total_calories, times } = props;

  const countOfingredients = total_ingredients.length;
  return (
    <div className={styles['container-card']}>
      <div className={styles['container-card__actions']}>
        <button className={styles['actions__delete']}>
          <img src={deleteIcon} alt="delete" />
        </button>
        <button className={styles['actions__edit']}>
          <img src={editIconSmall} alt="edit" />
        </button>
      </div>
      <div className={styles['container-card__image']}>
        <img src={image} alt={name} />
      </div>
      <div className={styles['container-card__info']}>
        <div className={styles['info__tags']}>{tags[0]} <span></span> {tags[1]}</div>
        <div className={styles['info__name']}>
          <h2>{name}</h2>
        </div>
        <div className={styles['container-card__line']}>
          <span className={styles['line__ingredients']}>
            <button>
              <img src={iconMore} alt="more-info" />
            </button>
            <span className={styles['line__text']}>{countOfingredients} ингредиентов</span>
          </span>
          <span className={styles['line__calories']}>
            <img src={iconCalories} alt="calories" />
            <span className={styles['line__text']}>{total_calories} калорий</span>
          </span>
          <span className={styles['line__times']}>
            <img src={iconTime} alt="times" />
            <span className={styles['line__text']}>{times} минут</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

