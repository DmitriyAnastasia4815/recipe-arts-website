//стор редакса для создания/редактирования рецепта

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Recipe } from '../types/types';
import { noServer } from '@/styles/import-image';
import emptyImage from '@image/EmptyRecipe/EmptyRecipe.svg';

export const initialState: Recipe = {
  id: 0,
  categories: ['категория блюда', 'категория блюда'],
  image: '',
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
    // Редьюсер для добавления/обновления категорий
    // Принимает массив строк (выбранных категорий)
    setCategory(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },

    setRecipeForm(state, action: PayloadAction<Recipe>) {
      console.log(action.payload);
      // Полностью заменяем текущее состояние на переданное
      return action.payload;
    },
    // Универсальный редьюсер для обновления отдельных полей
    updateRecipeField<K extends keyof Recipe>(
      state: Recipe,
      action: PayloadAction<{ field: K; value: Recipe[K] }>,
    ) {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { setCategory, setRecipeForm, updateRecipeField } =
  createRecipe.actions;
export default createRecipe.reducer;
