import styles from './ProfilePageEmpty.module.scss';
import { useState, useEffect } from 'react';

import emptyRecipeImg from '@image/empty-profile-images/empty-recipe-img.svg';
import emptyProfileImg from '@image/empty-profile-images/empty-user-icon.svg';
import iconEditSmall from '@image/icon/icon-editing-small.svg';

import AddedButton from '@/components/common/AddedButton/AddedButton';
import InputField from '@/components/common/InputField/InputField';

function ProfilePageEmpty() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const userName = 'Кочерова Анастасия';

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

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
                {<InputField title={"поиск по названию"}/>}
                <button className={styles['search-container__search-button']}>
                  поиск по категориям
                </button>

          </div>

          <div className={styles['main-section__empty-state']}>
            <img src={emptyRecipeImg} alt="empty-recipe" />
            <p className={styles['empty-message']}>
              Пока здесь ничего нет, но скоро появятся рецепты и фотографии,
              которые добавит {userName}
            </p>
          </div>
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
              {<AddedButton title='Добавить ингредиент'/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageEmpty;
