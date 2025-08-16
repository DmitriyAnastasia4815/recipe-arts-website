//типизация для одного ингредиента
export interface initialIngredient {
  id: number;
  name: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

//типизация для рецепта

interface Ingredient {
  id: number;
  name: string;
  amount: number;
}

interface EnergyValue {
  protein: number;
  fat: number;
  carb: number;
}

interface Time {
  hours: number;
  minutes: number;
}

interface Step {
  image: string;
  description: string;
}

interface RecipeSteps {
  time: Time;
  steps: {
    [key: string]: Step;
  };
}

interface Ingredients {
  portion: number;
  list_ingredients: Ingredient[];
}

interface Advance {
  image: string;
  hero_advance: string;
  main: string;
}

export interface Recipe {
  id?: number;
  categories: string[];
  image: string;
  description: string;
  name: string;
  energy_value: EnergyValue;
  ingredients: Ingredients;
  recipe_steps: RecipeSteps;
  advance: Advance;
}
