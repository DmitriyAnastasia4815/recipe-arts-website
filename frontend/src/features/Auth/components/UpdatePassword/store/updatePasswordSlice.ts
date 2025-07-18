import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UpdatePasswordState {
  step: number;
  successOperation: boolean;
  error: string | null;
  formData: {
    email: string;
    code: string;
  }
  isLoading: boolean;
}

const initialState: UpdatePasswordState = {
    step: 1,
    successOperation: false,
    error: null,
    formData: {
      email: '',
      code: ''
    },
    isLoading: false,
}

const updatePasswordSlice = createSlice({
  name: 'updatePassword',
  initialState,
  reducers: {
    nextStep(state) {
      //Переход на следующий шаг
      state.step += 1;
    },
    prevStep(state) {
      //Переход к предыдущему шагу
      state.step = Math.max(1, state.step - 1);
    },
    reset(state) {
      //Сброс состояния после закрытия модального окна
      state.step = 1;
      state.successOperation = false;
      state.error = null;
      state.formData = {email: '', code: ''};
      state.isLoading = false;
    }
}});

export const {nextStep, prevStep, reset} = updatePasswordSlice.actions;
export default updatePasswordSlice.reducer;