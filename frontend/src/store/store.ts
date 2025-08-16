import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/store/authSlice'
import updatePasswordReducer from '../features/Auth/components/UpdatePassword/store/updatePasswordSlice'
import createRecipeReducer from '../features/Recipe/store/recipeSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    updatePassword: updatePasswordReducer,
    createRecipe: createRecipeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;