import "./AddNewIngredient.css";
import backIcon from '../../../../image/icon/back-icon.svg'

function AddNewIngredient({onClose}) {
  return (
    <div className="container">
      <div className="card">
        <div className="back-button" onClick={onClose}>
          <img src={backIcon} alt="close" className="back-button-icon" />
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Название ингредиента"
            className="search-input"
          />
        </div>

        <div className="nutrition-container">
          <div className="nutrition-item">
            <span className="nutrition-label">Белки</span>
            <div className="nutrition-value">
              <span>50</span>
            </div>
          </div>

          <div className="nutrition-item">
            <span className="nutrition-label">Жиры</span>
            <div className="nutrition-value">
              <span>50</span>
            </div>
          </div>

          <div className="nutrition-item">
            <span className="nutrition-label">Углеводы</span>
            <div className="nutrition-value">
              <span>50</span>
            </div>
          </div>

          <div className="nutrition-item calories">
            <span className="nutrition-label">Калорийность</span>
            <span className="calories-value">960 ккал</span>
          </div>
        </div>

        <button className="add-button">Добавить ингредиент</button>
      </div>
    </div>
  );
}

export default AddNewIngredient;
