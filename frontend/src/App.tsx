import Home from '@/pages/Home/Home';
import Favourites from '@/pages/Favourites';
import ProfilePage from '@/pages/ProfilePage'; //не закбудь раскомментирвоать это не нужно удалять
import Auth from './pages/Auth/Auth';
import Register from './pages/Register';
import ProtectedRoute from './router/ProtectedRoute';
import RecipePage from './pages/RecipePage/RecipePage';

import MainLayout from '@router/MainLayout';
import NotCreatedPage from './pages/NotCreatedPage/NotCreatedPage';

import {
  BrowserRouter,
  Route,
  Routes,
  ScrollRestoration,
  useLocation,
} from 'react-router-dom';
import '@/styles/app.scss';

import { useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Компонент для прокрутки */}
      <Routes>
        {' '}
        {/* Контейнер для всех маршрутов */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* Маршрут для страницы Избранное */}
          <Route path="favourites" element={<Favourites />} />

          {/* Маршрут для страницы Статей но пока ее нет */}
          <Route path="articles" element={<NotCreatedPage />} />

          {/* Маршрут для страницы c рецептами но пока ее нет */}
          <Route path="recipes" element={<NotCreatedPage />} />


          {/* Маршрут для страницы поддержки но пока ее нет */}
          <Route path="support" element={<NotCreatedPage />} />

          

          {/* Маршрут для страницы Профиля*/}

          <Route
            path="profilepage"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="auth" element={<Auth />} />
          <Route path="login" element={<Auth />} />
          <Route path="register" element={<Register />} />
          <Route path="recipe/:id" element={<RecipePage />} />
          <Route path="recipe/new" element={<RecipePage />} />
          <Route path="recipe/:id/edit" element={<RecipePage />} />

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
