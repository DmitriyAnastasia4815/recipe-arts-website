import "./AmountOfIngredient.css" 
import decIcon from "../../../../image/icon/decrese-icon.svg"
import incIcon from "../../../../image/icon/increse-icon.svg"

function AmountOfIngredient(){
    return (
        <div className="container">
            <div className="modal">
                <div className="modal__title">Добавьте количество грамм</div>
                <div className="modal__quantity-box">
                    <button className="quantity-btn" id="decrease-btn">
                        <img src={decIcon} alt="" />
                    </button>

                    <div className="quantity-display">
                        <span className="quantity-value" id="quantity">1</span>
                    </div>

                    <button className="quantity-btn" id="increase-btn">
                        <img src={incIcon} alt="" />
                    </button>
                </div>

                <button className="modal__confirm-btn" id="confirm-btn">Подтвердить</button>
            </div>
        </div>
    )
}

export default AmountOfIngredient