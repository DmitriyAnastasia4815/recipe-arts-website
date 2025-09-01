//стор редакса для создания/редактирования рецепта

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  Recipe,
  EnergyValue,
  Time,
  Ingredient,
  ingredientEnergyInfo,
} from '../types/types';
import { noServer } from '@/styles/import-image';
import emptyImage from '@image/EmptyRecipe/EmptyRecipe.svg';
import emptyRecipeImage from '@image/emptyRecipeImage.svg';
import AddedIngredient from '../components/AddedIngredient/AddedIngredient';

//без сервера
import { initialIngredients } from '@/assets/example/example';

export const initialState: Recipe = {
  id: 0,
  categories: ['категория блюда', 'категория блюда'],
  image: emptyRecipeImage,
  description: '',
  name: 'Название блюда',
  energy_value: { protein: 0, fat: 0, carb: 0 },
  ingredients: { portion: 1, list_ingredients: [] },
  recipe_steps: { time: { hours: 0, minutes: 0 }, steps: {} },
  advance: {
    image: noServer.advanceImage,
    hero_advance: 'Расскажите о самом главном',
    main: '',
  },
};

const createRecipe = createSlice({
  name: 'createRecipe',
  initialState,
  reducers: {
    // Универсальный редьюсер для обновления отдельных полей
    updateRecipeField<K extends keyof Recipe>(
      state: Recipe,
      action: PayloadAction<{ field: K; value: Recipe[K] }>,
    ) {
      state[action.payload.field] = action.payload.value;
      console.log('я заменил поле')
    },
    // Редьюсер для добавления/обновления категорий
    // Принимает массив строк (выбранных категорий)
    setCategory(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
      console.log(state.categories);
    },

    setRecipeForm(state, action: PayloadAction<Recipe>) {
      // Полностью заменяем текущее состояние на переданное
      return action.payload;
    },

    updateEnergyValue<K extends keyof EnergyValue>(
      state: EnergyValue,
      action: PayloadAction<{ field: K; value: EnergyValue[K] }>,
    ) {
      state.energy_value[action] = action.payload.value;
    },
    addedIngredient(state, action: PayloadAction<Ingredient>) {
      state.ingredients.list_ingredients.push({
        id: action.payload.id,
        name: action.payload.name,
        amount: action.payload.amount,
      });
    },
    addIngredientToCollection(
      state,
      action: PayloadAction<ingredientEnergyInfo>,
    ) {
      const ingredientExists = state.ingredients.list_ingredients.find(
        (item) => item.id === action.payload.id,
      );
      //здесь должна быть отправка на сервер
      if (!ingredientExists) {
        const newId = initialIngredients.length + 1;
        initialIngredients.push({
          id: newId,
          name: action.payload.name,
          protein: action.payload.protein,
          fat: action.payload.fat,
          carbs: action.payload.protein,
          calories: action.payload.calories,
        });
      }
    },
  },
});

console.log(initialState);

export const {
  setCategory,
  setRecipeForm,
  updateRecipeField,
  updateEnergyValue,
  addedIngredient,
  addIngredientToCollection,
} = createRecipe.actions;
export default createRecipe.reducer;
