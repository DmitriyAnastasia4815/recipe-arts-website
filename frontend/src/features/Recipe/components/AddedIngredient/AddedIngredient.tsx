
import React, { useEffect, useState } from 'react';
import styles from './AddedIngredient.module.scss';

import ModalInfo from '../ModalInfo/ModalInfo';
import AddNewIngredient from '../AddNewIngredient/AddNewIngredient';
import AmountOfIngredient from '../AmountOfIngredient/AmountOfIngredient';

//иконки
import closeIcon from '@icon/close-icon.svg';
import iconInfo from '@icon/icon-info.svg';

//типизация
import type { initialIngredient } from '../../types/types';

//пока нет сервера
import { initialIngredients } from '@/assets/example/example';

interface AddedIngredientProps {
 onClose: () => void;
}

export const AddedIngredient: React.FC<AddedIngredientProps> = ({
 onClose,
}) => {
 const [listIngredients, setListIngredients] = useState<initialIngredient[]>([]);
 const [searchQuery, setSearchQuery] = useState<string>('');
 const [activeIngredientId, setActiveIngredientId] = useState<number | null>(null);
 const [addNewIngredient, setAddNewIngredient] = useState(false);
 const [selectedIngredient, setSelectedIngredient] = useState<{ id: number; quantity: number } | null>(null);

 useEffect(() => {
   //должен быть запрос на сервер для получения списка всех возможных ингредиентов
   setListIngredients(initialIngredients);
 }, []);

 const filteredIngredients = listIngredients.filter((ingredient) =>
   ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()),
 );

 const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
   setSearchQuery(event.target.value);
 };

 // Обработчики для показа и скрытия модального окна с информацией
 const handleMouseEnter = (id: number) => {
   setActiveIngredientId(id);
 };

 const handleMouseLeave = () => {
   setActiveIngredientId(null);
 };

 const handleOpenNewIngredient = () => {
   setAddNewIngredient((prev) => !prev);
 };

 // Обработчик клика на чекбокс
 const handleCheckboxClick = (id: number) => {
   if (selectedIngredient?.id === id) {
     setSelectedIngredient(null); // Снимаем выбор, если уже выбран
   } else {
     setSelectedIngredient({ id, quantity: 1 }); // Устанавливаем начальное количество
   }
 };

 // Обработчик подтверждения количества из AmountOfIngredient
 const handleQuantityConfirm = (id: number, quantity: number) => {
   console.log(`Выбрано: ингредиент ID ${id}, количество ${quantity}`);
   // Добавить логику для сохранения количечуства
   setSelectedIngredient(null); // Закрываем AmountOfIngredient
 };

 // Обработчик отмены
 const handleQuantityCancel = () => {
   setSelectedIngredient(null); // Закрываем AmountOfIngredient без сохранения
 };

 return (
   <div className={styles['content-container']}>
     {!addNewIngredient ? (
       <div className={styles['content-container']}>
         <div className={styles['content-container__header']}>
           <h2 className={styles['header__name']}>Добавление ингредиента</h2>
           <button
             className={styles['header__close-button']}
             onClick={onClose}
             aria-label="Закрыть"
           >
             <img src={closeIcon} alt="закрыть" />
           </button>
         </div>

         <div className={styles['content-container__search-input']}>
           <input
             type="text"
             placeholder="Поиск по названию"
             value={searchQuery}
             onChange={handleSearchQuery}
             aria-label="Поиск ингредиентов по названию"
           />
         </div>

         <div className={styles['content-container__ingredients-list']}>
           <ul className={styles['ingredients-list']}>
             {filteredIngredients.map((ingredient) => (
               <li
                 key={ingredient.id}
                 className={styles['ingredients-list__item']}
               >
                 <input
                   className={styles['ingredients-list__item--checkbox']}
                   type="checkbox"
                   checked={selectedIngredient?.id === ingredient.id}
                   onChange={() => handleCheckboxClick(ingredient.id)}
                   aria-label={`Выбрать ${ingredient.name}`}
                 />
                 <h2 className={styles['ingredients-list__item--name']}>
                   {ingredient.name}
                 </h2>
                 <button
                   className={styles['ingredients-list__item--info']}
                   onMouseEnter={() => handleMouseEnter(ingredient.id)}
                   onMouseLeave={handleMouseLeave}
                   aria-label={`Информация об ингредиенте ${ingredient.name}`}
                 >
                   <img src={iconInfo} alt="информация" />
                 </button>
                 {activeIngredientId === ingredient.id && (
                   <ModalInfo
                     ingredient={ingredient}
                     className={styles['ingredients-list__item--modal']}
                   />
                 )}
                 {selectedIngredient?.id === ingredient.id && (
                   <AmountOfIngredient
                     ingredient={ingredient}
                     onConfirm={handleQuantityConfirm}
                     onCancel={handleQuantityCancel}
                     className={styles['ingredients-list__item--quantity-modal']}
                   />
                 )}
               </li>
             ))}
           </ul>
         </div>

         <button
           className={styles['content-container__added-button']}
           onClick={handleOpenNewIngredient}
         >
           Добавить новый ингредиент
         </button>
       </div>
     ) : (
       <AddNewIngredient onReturn={handleOpenNewIngredient} />
     )}
   </div>
 );
};

export default AddedIngredient;

