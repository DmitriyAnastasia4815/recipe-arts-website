import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { authServiceAPI } from './authServiceAPI';

/**
 * Базовый URL для сервера API.
 * @constant {string} BASE_URL
 * @default 'http://localhost:8000'
 */
const BASE_URL = 'http://localhost:8000';

/**
 * Экземпляр axios, настроенные с базовым URL, включением учетных данных и типом содержимого JSON для отправки запросов на сервер
 * @constant {Object} api
 * @property {string} baseURL - базовый URL для всех запросов
 * @property {boolean} withCredentials - Укахывает, включаются ли учетные данные (куки, заголовки авторизации) в запросы.
 * @property {Object} headers - Заголовки по умолчанию для всех типов
 * @property {string} headers.Content-type - Указывает тип содержимого как JSON
 */
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Интерфейс для хранения неудачных запросов в очереди
 * @interface FailedRequest
 * @property {Function} resolve - Разрешает промис новым токеном доступа
 * @property {Function} reject - Отклоняет промис с ошибкой axios
 */

interface FailedRequest {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason: AxiosError) => void;
}

/**
 * Флаг, указывающий, выполняется ли обновление токена.
 * @private
 * @type {boolean}
 */
let isRefreshing = false;

/**
 * Очередь для хранения неудачных запросов во время обновления токена.
 * @private
 * @type {FailedRequest[]}
 */
let failedQueue: FailedRequest[] = [];

/**
 * Обрабатывает очередь неудачных запросов, либо разрешая их новым токеном, либо отклоняя с ошибкой.
 * @private
 * @param {AxiosError|null} error - Ошибка для отклонения промисов в очереди, если есть.
 * @param {string|null} [token] - Новый токен доступа для разрешения промисов в очереди, если есть.
 */
const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Интерсептор добавляет заголовок Authorization с токеном доступа (Bearer <token>) к каждому исходящему запросу, если токен есть в localStorage. Если возникает ошибка при формировании запроса, она отклоняется.
 * @private
 * @param {InternalAxiosRequestConfig} config - Конфигурация запроса.
 * @returns {InternalAxiosRequestConfig} Модифицированная конфигурация запроса.
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/**
 * Интерсептор ответов для обработки ошибок, включая обновление токена при статусе 401.
 * Ошибки (401 Unauthorized): Если сервер возвращает статус 401 (неавторизован) и запрос ещё не повторялся (!originalRequest._retry):
Если обновление токена уже идёт (isRefreshing = true):
Запрос добавляется в очередь (failedQueue) и ждёт завершения обновления.
После получения нового токена запрос повторяется с новым заголовком Authorization.
Если обновление токена ещё не началось:
Устанавливается isRefreshing = true, чтобы заблокировать другие запросы.
Из localStorage извлекается refreshToken.
Вызывается authServiceAPI.refreshToken(refreshToken) для получения нового токена доступа.
Если обновление успешно:
Новый токен сохраняется в localStorage.
Обрабатывается очередь (processQueue) с новым токеном.
Исходный запрос повторяется с новым токеном.
Если обновление не удалось (например, статус 403 или 400):
Токены удаляются из localStorage.
Очередь отклоняется с ошибкой.
Предполагается, что вызывающий код может перенаправить пользователя на страницу входа (закомментирован navigate('/login')).
В блоке finally флаг isRefreshing сбрасывается.
Если ошибка не связана с 401 или запрос уже повторялся, ошибка просто отклоняется.
 * @private
 * @param {AxiosResponse} response - Успешный ответ от сервера.
 * @returns {AxiosResponse} Исходный ответ.
 * @param {AxiosError} error - Ошибка запроса.
 * @returns {Promise} Промис, который либо разрешает запрос с новым токеном, либо отклоняет его.
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new AxiosError(
            'Refresh token not found',
            'ERR_NO_REFRESH_TOKEN',
            error.config,
            null,
            error.response,
          );
        }

        const response = await authServiceAPI.refreshToken(refreshToken);
        if (!response?.accessToken) {
          throw new AxiosError(
            'Invalid refresh token response',
            'ERR_INVALID_RESPONSE',
            error.config,
            null,
            error.response,
          );
        }

        const newAccessToken = response.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `${newAccessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        if (
          (refreshError as AxiosError).response?.status === 403 ||
          (refreshError as AxiosError).response?.status === 400
        ) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
