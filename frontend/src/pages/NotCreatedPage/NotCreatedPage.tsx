import React from "react";
import styles from './NotCreatedPage.module.scss';
import { Icons } from "@/styles/import-image";

const NotCreatedPage: React.FC = () => {
    return (
        <div className={styles["container"]}>
            <div className={styles['content']}>
                <img className={styles['content__image']} src={Icons.iconPot} alt="Кастрюлька" />
                <h2>Упс!</h2>
                <p>Страница пока не готова, разработчики уже в процессе создания и скоро она появится</p>
            </div>
        </div>
    )
}

export default NotCreatedPage;