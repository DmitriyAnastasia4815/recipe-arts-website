import api from './api';
import { RegisterResponse, VerifyResponse, ApiError } from '../types/authTypes';

interface RefreshTokenResponse {
  accessToken: string;
}

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
      const temporaryToken = response.headers['authorization'];
      if (!temporaryToken) {
        throw new Error('Временный токен не получен');
      }

      return {
        message: response?.data?.detail?.[0]?.msg || 'Код отправлен на почту',
        temporaryToken,
      };
    } catch (error: any) {

      throw new Error(
        error.response?.data?.detail?.[0]?.msg || 'Ошибка регистрации',
      );
    }
  },
  //Повторная отправка кода
  async resendCode(): Promise<void> {
    try {
    } catch {}
  },

  //step 2
  async verifyCode(code: string, temporaryToken: string): Promise<VerifyResponse> {
try {
    console.log('Отправка запроса на /v1/auth/register/verify:', { code, temporaryToken });
    const response = await api.post(
      '/v1/auth/register/verify',
      { code },
      { headers: { Authorization: `${temporaryToken}` } },
    );
    console.log('Ответ сервера:', {
      status: response.status,
      headers: response.headers,
      data: response.data,
    });
    if (!response.data?.accessToken || !response.data?.refreshToken) {
      throw new Error(`Неверный формат ответа сервера или отсутствуют токены ${JSON.stringify(response.data)}`);
    }
    return {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
  } catch (error: any) {
    console.error('Ошибка в verifyCode:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      config: error.config,
    });
    throw new Error(
      error.response?.data?.detail?.[0]?.msg ||
      error.response?.data?.message ||
      'Ошибка верификации',
    );
  }
  },
  // Обновление токена
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    try {
      const response = await api.post('/v1/auth/refresh', { refreshToken });
      return response.data.accessToken;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail?.[0]?.msg || 'Ошибка обновления токена',
      );
    }
  },
  //Проверяет валидность access-токена
  async verifyToken(accessToken: string): Promise<void> {
    try {
      await api.get('/v1/auth/verify-token', {
        headers: { Authorization: `${accessToken}` },
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.detail?.[0]?.msg || 'Токен недействителен',
      );
    }
  },
};
