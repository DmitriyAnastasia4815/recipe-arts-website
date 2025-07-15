//Для ответа на запрос /v1/auth/register/, содержит сообщение и временный токен.
interface RegisterResponse {
  message: string;
  temporaryToken: string;
}

//Для ответа на запрос /v1/auth/register/verify, содержит access и refresh токены.
/**
 * @interface VerifyResponse
 * @description Ответ API при успешной верификации.
 * @property {string} accessToken - Токен доступа для аутентифицированных запросов.
 * @property {string} refreshToken - Токен обновления для продления сессии.
 */
interface VerifyResponse {
    accessToken: string;
    refreshToken: string;
  }

//Для обработки ошибок от сервера.
interface ApiError {
  message: string;
}





/**
 * @interface AuthState
 * @description Состояние аутентификации в Redux.
 * @property {boolean} isAuthenticated - Указывает, аутентифицирован ли пользователь.
 * @property {string|null} accessToken - JWT-токен доступа.
 * @property {string|null} refreshToken - JWT-токен обновления.
 * @property {string|null} temporaryToken - Временный токен для верификации.
 * @property {boolean} loading - Указывает, выполняется ли операция.
 * @property {string|null} error - Сообщение об ошибке.
 */
interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    temporaryToken: string | null;
    loading: boolean;
    error: string | null;
  }







/**
 * @interface RegisterPayload
 * @description Данные для регистрации пользователя.
 * @property {string} username - Имя пользователя.
 * @property {string} password - Пароль.
 * @property {string} email - Электронная почта.
 */
interface RegisterPayload {
  username: string;
  password: string;
  email: string;
}




/**
 * @interface VerifyPayload
 * @description Данные для верификации учетной записи.
 * @property {string} code - Код верификации.
 * @property {string} temporaryToken - Временный токен.
 */
interface VerifyPayload {
  code: string;
  temporaryToken: string;
}




export type {
  RegisterResponse,
  VerifyResponse,
  RegisterPayload,
  VerifyPayload,
  ApiError,
  AuthState,
};
