import axios from 'axios';

const BASE_URL = '';


//основные настройки для запросов
const api = axios.create({
  baseURL: BASE_URL, //ссылка на сервер
  withCredentials: true, // Включаем отправку кук (для HttpOnly токена)
  headers: {
    'Content-Type': 'application/json', // Указываем формат данных
  },
});


// Очередь для хранения запросов, ожидающих обновления токена
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token);
        }
    }),
    failedQueue = [];
}

api.interceptors.request.use(
  // Первый (успех) вызывается перед отправкой запроса. Здесь мы добавляем токен.
  (config) => {
    const token = localStorage.getItem('accessToken'); // Получаем токен из localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем заголовок
    }
    return config;
  },
  // Второй (ошибка) вызывается, если произошла ошибка при формировании запроса (например, неверная конфигурация).
  (error) => {
    return Promise.reject(error); // Обработка ошибок подготовки запроса
  },
);

api.interceptors.response.use(
  (response) => response,


  async (error) => {
    


    if (error.response?.status === 401) {

    }
  },
);

export default api;
