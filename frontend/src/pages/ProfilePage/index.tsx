import './ProfilePageEmpty.scss'

import emptyRecipeImg from "@image/empty-profile-images/empty-recipe-img.svg"
import emptyProfileImg from '@image/empty-profile-images/empty-user-icon.svg'

function ProfilePageEmpty(){
    return (
      <main className="main-content">
        <div className="container">
          <div className="content-wrapper">

            <div className="main-section">
              <h1 className="page-title">Книга рецептов</h1>

              <div className="search-container">
                <input type="text" placeholder="поиск по названию" className="search-input" />
                <input type="text" placeholder="поиск по категориям" className="search-input" />
              </div>
              

              <div className="empty-state">
                <div className="cookbook-icon">
                    <img src={emptyRecipeImg} alt="empty recipe" />
                </div>
                <p className="empty-message">
                  Пока здесь ничего нет, но скоро появятся рецепты и фотографии, которые добавит Кочерова Анастасия
                </p>
              </div>
            </div>

            <div className="sidebar">
              <div className="profile-section">
                <div className="profile-avatar">
                    <img src={emptyProfileImg} alt="" />
                </div>
                <div className="profile-name">
                  <span>Кочерова Анастасия</span>
                  <button className="edit-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                      <path d="m15 5 4 4"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
}

export default ProfilePageEmpty