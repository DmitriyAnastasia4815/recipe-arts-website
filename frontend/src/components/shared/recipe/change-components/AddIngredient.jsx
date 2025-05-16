
import { useState, useEffect } from "react";
import "./AddIngredient.css";
import closeIcon from "../../../../image/icon/close-icon.svg";
import AddNewIngredient from "./AddNewIngredient";

function AddIngredient({ onClose }) {
  const [isAddNew, setIsAddNew] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const Ingredients = [
  { "id": 1, "name": "Арбуз" },
  { "id": 2, "name": "Базилик" }
  ]


  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setIsLoading(true);
        // Замените URL на адрес вашего API
        const response = await fetch("http://your-api.com/ingredients");
        if (!response.ok) {
          throw new Error("Не удалось загрузить список ингредиентов");
        }
        const data = await response.json();
        setIngredients(data); 
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []); 

  const handleOpenAddNew = () => {
    setIsAddNew(true);
  };

  const handleCloseAddNew = () => {
    setIsAddNew(false);
  };

  return (
    <div className="container">
      {isAddNew ? (
        <AddNewIngredient onClose={handleCloseAddNew} />
      ) : (
        <div className="modal">
          <div className="modal-scroll">
            <div className="modal-header">
              <h1>Добавление ингредиента</h1>
              <button className="close-button" onClick={onClose}>
                <img src={closeIcon} alt="Закрыть" />
              </button>
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Поиск по названию"
                className="search-input"
              />
            </div>

            {isLoading ? (
              <div className="loading">Загрузка...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <ul className="ingredients-list">
                {ingredients.length === 0 ? (
                  <li className="ingredient-item">Нет ингредиентов</li>
                ) : (
                  ingredients.map((ingredient) => (
                    <li
                      className="ingredient-item"
                      key={ingredient.id}
                    >
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          className="ingredient-checkbox"
                        />
                        <span className="custom-checkbox"></span>
                        <span className="ingredient-name">
                          {ingredient.name}
                        </span>
                      </label>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          <button
            className="button-add add-button"
            onClick={handleOpenAddNew}
          >
            Добавить ингредиент
          </button>
        </div>
      )}
    </div>
  );
}

export default AddIngredient;

