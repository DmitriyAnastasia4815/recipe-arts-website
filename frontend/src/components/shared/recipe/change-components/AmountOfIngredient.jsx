import "./AmountOfIngredient.css" 
import decIcon from "../../../../image/icon/decrese-icon.svg"
import incIcon from "../../../../image/icon/increse-icon.svg"




function AmountOfIngredient(props){
    const {ingredient, amount, onAmountChange} = props;

    const handleDecrease = () => {
        if(amount > 0) {
            onAmountChange(ingredient?.name ?? "", amount - 1)
        }
    }

    const handleIncrease = () => {
        onAmountChange(ingredient?.name ?? "", amount + 1)
    }

    const handleInputChange = (e) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value >= 0) {
            onAmountChange(ingredient.name, value)
        }
    }


    return (
    <div className="amount-container">
      <span className="amount-title">{ingredient.name}</span>
      <div className="quantity-box">
        <button className="quantity-btn decrease-btn" onClick={handleDecrease}>
          <img src={decIcon} alt="Уменьшить" />
        </button>
        <input
          type="number"
          className="quantity-value"
          value={amount}
          onChange={handleInputChange}
          min="0"
        />
        <button className="quantity-btn increase-btn" onClick={handleIncrease}>
          <img src={incIcon} alt="Увеличить" />
        </button>
      </div>
    </div>
    )
}

export default AmountOfIngredient