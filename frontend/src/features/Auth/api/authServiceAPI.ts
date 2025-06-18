import api from './api';
import { RegisterResponse, VerifyResponse, ApiError } from '../types/authTypes';

export const authServiceAPI = {
  //step 1
  async register(
    email: string,
    password: string,
    username: string,
  ): Promise<RegisterResponse> {
    try {
      const response = await api.post('/v1/auth/register', {
        email,
        password,
        username,
      });
      const temporaryToken = response.headers['authorization']
      console.log(response);
      if (!temporaryToken) {
        throw new Error('Временный токен не получен');
      }
  
      return {
        message: response?.data?.detail?.[0]?.msg || 'Код отправлен на почту',
        temporaryToken,
      };
    } catch (error: any) {
        console.log(error)
      throw new Error(error.response?.data?.detail?.[0]?.msg || 'Ошибка регистрации');
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
        { headers: { 'authorization': temporaryToken } },
      );
      return {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.detail?.[0]?.msg || 'Ошибка верификации');
    }
  },
  // Обновление токена
  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const response = await api.post('/v1/auth/refresh', { refreshToken });
      return response.data.accessToken;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail?.[0]?.msg || 'Ошибка обновления токена',
      );
    }
  },
};
