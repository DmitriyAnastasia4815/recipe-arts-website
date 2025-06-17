import api from './api';
import { RegisterResponse, VerifyResponse, ApiError } from '../types/authTypes';

export const authServiceAPI = {
  //step 1
  async register(
    username: string,
    password: string,
    email: string,
  ): Promise<RegisterResponse> {
    try {
      const response = await api.post('/v1/auth/register', {
        username,
        password,
        email,
      });
      const temporaryToken = response.headers['x-temporary-token'];
      if (!temporaryToken) {
        throw new Error('Временный токен не получен');
      }
      return {
        message: response.data.message || 'Код отправлен на почту',
        temporaryToken,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Ошибка регистрации');
    }
  },

  //step 2
  async verifyCode(
    code: string,
    temporaryToken: string,
  ): Promise<VerifyResponse> {
    try {
      const response = await api.post(
        'v1/auth/register/verify',
        { code },
        { headers: { 'X-Temporary-Token': temporaryToken } },
      );
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Ошибка верификации');
    }
  },
  // Обновление токена
  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const response = await api.post('/v1/auth/refresh', { refreshToken });
      return response.data.accessToken;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Ошибка обновления токена',
      );
    }
  },
};
