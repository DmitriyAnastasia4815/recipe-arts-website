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

export interface Recipe {
  id: number;
  categories: string[];
  image: string;
  name: string;
  energy_value: EnergyValue;
  ingredients: Ingredients;
  recipe_steps: RecipeSteps;
  advance: string;
}

export const initialEmptyRecipe: Recipe = {
  id: 0,
  categories: ['категория блюда', 'категория блюда'],
  image: '',
  name: 'Название блюда',
  energy_value: { protein: 0, fat: 0, carb: 0 },
  ingredients: { portion: 1, list_ingredients: [] },
  recipe_steps: { time: { hours: 0, minutes: 0 }, steps: {} },
  advance: '',
};

export const initialRecipe: Recipe = {
  id: 1,
  categories: [
    'Выпечка и десерты',
    'Русская кухня',
    'Русская кухня',
    'Русская кухня',
  ],
  image: 'картинка',
  name: 'Классическая шарлотка',
  energy_value: {
    protein: 30,
    fat: 20,
    carb: 120,
  },
  ingredients: {
    portion: 4,
    list_ingredients: [
      { id: 1, name: 'Яблоки', amount: 450 },
      { id: 2, name: 'Пшеничная мука хлебопекарная', amount: 130 },
      { id: 3, name: 'Куриное яйцо', amount: 180 },
      { id: 4, name: 'Сахар', amount: 180 },
      { id: 5, name: 'Ванилин', amount: 2 },
    ],
  },
  recipe_steps: {
    time: {
      hours: 2,
      minutes: 40,
    },
    steps: {
      step_1: {
        image: '',
        description: 'Яблоки нарезать, очистить от кожуры.',
      },
      step_2: {
        image: '',
        description: 'Яйца с сахаром взбить миксером до пышности.',
      },
      step_3: {
        image: '',
        description: 'Добавить муку и ванилин, аккуратно перемешать.',
      },
      step_4: { image: '', description: 'Выпекать при 180°C 30 минут.' },
    },
  },
  advance:
    'Lörem ipsum vöräse terahylig rengar pörar. Rågen mahifask. Dekanuhins redat har spenura årar. Poss prosk i ossade om dulig, liksom desm. Tenosam tusm, hyperaktiv, nuvis hutessa. Polyv pede vaktiga pöpusm yr. Mikronokanade prell. Fas foden och fasat portad. Dupp intrasm prenusa. Enynde por: far när fatelig i radiometer. ',
};

interface initialIngredient {
  id: number;
  name: string;
  protein: number;
  fat: number;
  carbs: number;
  calories: number;
}

export const initialIngredient: initialIngredient = {
  id: 1,
  name: 'Яблоки',
  protein: 0.3,
  fat: 0.2,
  carbs: 13.8,
  calories: 52,
};

