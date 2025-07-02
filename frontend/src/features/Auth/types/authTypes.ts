
//Для ответа на запрос /v1/auth/register/, содержит сообщение и временный токен.
interface RegisterResponse {
    message: string;
    temporaryToken: string;
}

//Для ответа на запрос /v1/auth/register/verify, содержит access и refresh токены.
interface VerifyResponse {
    accessToken: string;
    refreshToken: string;
}

//Для обработки ошибок от сервера.
interface ApiError {
    message: string;
}

//Состояние авторизации в redux
interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    temporaryToken: string | null;
    loading: boolean;
    error: string | null;
}

export type {RegisterResponse, VerifyResponse, ApiError, AuthState};