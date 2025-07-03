/**
 * @module authSlice
 * @description Redux Toolkit срез для управления состоянием аутентификации.
 * Обрабатывает регистрацию, верификацию, проверку токена, обновление токена и выход из системы.
 * Использует `createAsyncThunk` для асинхронных API-запросов и `createSlice` для управления состоянием.
 */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authServiceAPI } from '../api/authServiceAPI';
import {
  RegisterResponse,
  VerifyResponse,
  AuthState,
  RegisterPayload,
  VerifyPayload,
} from '../types/authTypes';

/**
 * @function register
 * @description Асинхронный thunk для регистрации пользователя через authServiceAPI.
 * @param {RegisterPayload} payload - Данные для регистрации (имя пользователя, пароль, email).
 * @param {Object} options - Опции thunk, включая rejectWithValue.
 * @returns {Promise<RegisterResponse>} Возвращает ответ регистрации или отклоняет с ошибкой.
 */
export const register = createAsyncThunk<RegisterResponse, RegisterPayload>(
  'auth/register',
  async ({ username, password, email }, { rejectWithValue }) => {
    try {
      return await authServiceAPI.register(username, password, email);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибк регистрации');
    }
  },
);

/**
 * @function verifyCode
 * @description Асинхронный thunk для верификации учетной записи с использованием кода и временного токена.
 * @param {VerifyPayload} payload - Код верификации и временный токен.
 * @param {Object} options - Опции thunk, включая rejectWithValue.
 * @returns {Promise<VerifyResponse>} Возвращает ответ верификации (токены доступа и обновления) или отклоняет с ошибкой.
 */
export const verifyCode = createAsyncThunk<VerifyResponse, VerifyPayload>(
  'auth/verifyCode',
  async ({ code, temporaryToken }, { rejectWithValue }) => {
    try {
      return await authServiceAPI.verifyCode(code, temporaryToken);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка верификации');
    }
  },
);

/**
 * @function verifyToken
 * @description Асинхронный thunk для проверки действительности токена доступа.
 * @param {void} _ - Пустой payload (не требуется).
 * @param {Object} options - Опции thunk, включая rejectWithValue и getState.
 * @returns {Promise<void>} Успешно завершается, если токен действителен, или отклоняет с ошибкой.
 */
export const verifyToken = createAsyncThunk<void, void>(
  'auth/verifyToken',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
        throw new Error('Токен отсутствует');
      }
      await authServiceAPI.verifyToken(accessToken);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Токен недействителен');
    }
  },
);

/**
 * @function refreshToken
 * @description Асинхронный thunk для обновления токена доступа с использованием токена обновления.
 * @param {void} _ - Пустой payload (не требуется).
 * @param {Object} options - Опции thunk, включая rejectWithValue и getState.
 * @returns {Promise<string>} Возвращает новый токен доступа или отклоняет с ошибкой.
 */
export const refreshToken = createAsyncThunk<string, void>(
  'auth/refreshToken',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const refreshToken = state.auth.refreshToken;
      if (!refreshToken) {
        throw new Error('Refresh token отсутствует');
      }
      return await authServiceAPI.refreshToken(refreshToken);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления токена');
    }
  },
);

/**
 * @constant initialState
 * @description Начальное состояние для среза аутентификации.
 * @type {AuthState}
 */
const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  temporaryToken: null,
  loading: false,
  error: null,
};


/**
 * @constant authSlice
 * @description Redux Toolkit срез для управления состоянием аутентификации.
 * @type {Slice}
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * @function logout
     * @description Действие для выхода пользователя из системы. Сбрасывает состояние аутентификации и удаляет токены из localStorage.
     * @param {AuthState} state - Текущее состояние среза.
     */
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.temporaryToken = null;
      state.error = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('temporaryToken');
    },
  },
  extraReducers: (builder) => {
    builder
    // Регистрация
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
        state.loading = false;
        state.temporaryToken = action.payload.temporaryToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state, action: PayloadAction<VerifyResponse>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.temporaryToken = null;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.removeItem('temporaryToken');
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload as string;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        localStorage.setItem('accessToken', action.payload);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload as string;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  },
});

/**
 * @function logout
 * @description Экспортируемое действие для выхода из системы.
 */
export const { logout } = authSlice.actions;

/**
 * @default
 * @description Экспортируемый редюсер для использования в Redux store.
 */
export default authSlice.reducer;
