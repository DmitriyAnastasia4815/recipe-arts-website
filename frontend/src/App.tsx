import Home from '@/pages/Home/Home';
import Favourites from '@/pages/Favourites';
// import ProfilePageEmpty from '@/pages/ProfilePageEmpty'; //не закбудь раскомментирвоать это не нужно удалять
import Auth from './pages/Auth/Auth';
import Register from './pages/Register';

import MainLayout from '@router/MainLayout';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@/styles/app.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {' '}
        {/* Контейнер для всех маршрутов */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* Маршрут для страницы Избранное */}
          <Route path="favourites" element={<Favourites />} />

          {/* Маршрут для страницы Профиля это не нужно удалять это нужно раскомментировать*/}
          {/* <Route path="profilepage" element={<ProfilePageEmpty />} /> */}

          <Route path="profilepage" element={<Auth/>} />
          <Route path="login" element={<Auth/>} />
          <Route path="register" element={<Register/>} />

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
