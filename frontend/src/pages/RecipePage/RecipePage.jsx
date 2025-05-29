import { useState } from "react";
import AddIngredient from "../../components/shared/recipe/change-components/AddIngredient";
import AmountOfIngredient from "../../components/shared/recipe/change-components/AmountOfIngredient";

function RecipePage() {
  const [isOpenAddIngredient, setIsOpenAddIngredient] = useState(false);

  const handleOpenAddIngredient = () => {
    setIsOpenAddIngredient(true);
  };

  const handleCloseAddIngredient = () => {
    setIsOpenAddIngredient(false);
  };
  return (
    <div>
      <button onClick={handleOpenAddIngredient}>Открыть попап</button>
      {isOpenAddIngredient && <AddIngredient onClose={handleCloseAddIngredient} />}
    </div>

    
  );
}

export default RecipePage;
