import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authServiceAPI } from '../../api/authServiceAPI';
import {
  RegisterResponse,
  VerifyResponse,
  AuthState,
} from '../../types/authTypes';

interface RegisterPayload {
  username: string;
  password: string;
  email: string;
}

interface VerifyPayload {
  code: string;
  temporaryToken: string;
}

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

export const verifyToken = createAsyncThunk<void, void>(
  'auth/verifyToken',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const accessToken = state.auth.accessToken;
      if (!accessToken) {
        throw new Error('Токен отсутствует');
      }
      await authService.verifyToken(accessToken);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Токен недействителен');
    }
  },
);

export const refreshToken = createAsyncThunk<string, void>(
  'auth/refreshToken',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const refreshToken = state.auth.refreshToken;
      if (!refreshToken) {
        throw new Error('Refresh token отсутствует');
      }
      return await authService.refreshToken(refreshToken);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления токена');
    }
  },
);

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    temporaryToken: null,
    loading: false,
    error: null,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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
        .addCase(register.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
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
        .addCase(verifyCode.fulfilled, (state, action) => {
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
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;
