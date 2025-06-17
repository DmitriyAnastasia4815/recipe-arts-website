
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

export type {RegisterResponse, VerifyResponse, ApiError};