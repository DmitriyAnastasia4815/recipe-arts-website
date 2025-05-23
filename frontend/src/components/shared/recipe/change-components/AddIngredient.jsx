import { useState, useEffect } from "react";
import "./AddIngredient.css";
import closeIcon from "../../../../image/icon/close-icon.svg";
import AddNewIngredient from "./AddNewIngredient";
import AmountOfIngredient from "./AmountOfIngredient";

function AddIngredient({ onClose }) {

  const [isAddNew, setIsAddNew] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  const [selectedIngredients, setSelectedIngredients] = useState({});
  

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:8000/ingredients/");
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

  const handleCheckBoxChange = (selectedIngredient) => {
    setSelectedIngredients((prevSelected) => {
      const isSelected = prevSelected[selectedIngredient.name]?.selected || false;
      if (isSelected) {
        // Если ингредиент уже выбран, убираем его
        const { [selectedIngredient.name]: _, ...rest } = prevSelected;
        return rest;
      } else {
        // Если ингредиент не выбран, добавляем его с начальным количеством 0
        return {
          ...prevSelected,
          [selectedIngredient.name]: { selected: true, amount: 0 },
        };
      }
    });
  };

  const handleAmountChange = (name, amount) => {
    setSelectedIngredients((prevSelected) => ({
      ...prevSelected,
      [name]: {...prevSelected[name], amount},
    }))
  }

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
              <h1 >Добавление ингредиента</h1>
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
                  <li key="empty" className="ingredient-item">Нет ингредиентов</li>
                ) : (
                  ingredients.map((ingredient) => (
                    <li key={ingredient.name} className="ingredient-item">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          className="ingredient-checkbox"
                          checked={selectedIngredients[ingredient.name] || false}
                          onChange={() => handleCheckBoxChange(ingredient)}
                        />
                        <span className="custom-checkbox"></span>
                        <span className="ingredient-name">
                          {ingredient.name}
                        </span>
                      </label>
                      {selectedIngredients[ingredient.name]?.selected && (
                        <AmountOfIngredient
                          ingreient = {ingredient}
                          amount = {selectedIngredients[ingredient.name].amount}
                          onAmountChange = {handleAmountChange}
                          />
                      )}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>

          <button className="button-add add-button" onClick={handleOpenAddNew}>
            Добавить ингредиент
          </button>
        </div>
      )}
    </div>
  );
}

export default AddIngredient;
