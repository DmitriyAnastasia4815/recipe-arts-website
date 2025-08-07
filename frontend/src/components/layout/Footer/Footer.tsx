// import logo from "../../image/logo-footer.svg";
import React from 'react';
import styles from './Footer.module.scss';
import { Icons } from '@/styles/import-image';
import logoFooter from '@image/logo-footer.svg';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const noFooterPages = ['/login', '/register', '/auth'];
  const noFooter = noFooterPages.includes(location.pathname);

  return (
    <>
      {!noFooter ? (
        <div className={styles['footer__main']}>
          <div className={styles['footer__container']}>
            <div className={styles['footer__header']}>
              <img
                src={logoFooter}
                alt="logo"
                className={styles['header__logo']}
              />
              <button className={styles['header__button']}>
                <img
                  className={styles['header__button-image']}
                  src={Icons.iconMail}
                  alt="почта"
                />
                <h2 className={styles['header__button-name']}>Написать нам</h2>
              </button>
            </div>

            <div className={styles['footer__content']}>
              <h2 className={styles['content__name']}>
                Подпишитесь на нас в социальных сетях
              </h2>
              <div className={styles['content__box-icon']}>
                <button className={styles['content__box-item']}>
                  <img src={Icons.iconTiktok} alt="TikTok" />
                </button>
                <button className={styles['content__box-item']}>
                  <img src={Icons.iconTg} alt="Tg" />
                </button>
                <button className={styles['content__box-item']}>
                  <img src={Icons.iconPinterest} alt="Pinterest" />
                </button>
              </div>
            </div>

            <div className={styles['footer__root']}>
              <div className={styles['footer__root-box']}>
                <button className={styles['footer__root-box-item']}>
                  О проекте
                </button>
                <button className={styles['footer__root-box-item']}>
                  Политика конфиденциальности
                </button>
                <button className={styles['footer__root-box-item']}>
                  Пользовательское соглашение
                </button>
              </div>
              <h2 className={styles['footer__root-text']}>
                © 2025 Recipe.Arts™ <br />
                Любое использование контента без письменного разрешения
                Recipe.Arts запрещено.
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles['no-footer__main']}>
          <div className={styles['no-footer__container']}>
            <h2>Помощь</h2>
            <div className={styles['no-footer__container-box']}>
              <p>ООО «Recipe.Arts» © 2025</p>
              <hr className={styles['no-footer__hr']}/>
              <p>Все права защищены</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Footer;
