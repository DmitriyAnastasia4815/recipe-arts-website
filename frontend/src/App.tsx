import Home from "src/pages/Home"
import Favourites from "src/pages/Favourites"
import ProfilePage from "src/pages/ProfilePage/ProfilePage"


import MainLayout from "src/layouts/MainLayout"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "src/styles/app.scss"

function App() {
  return (     
    <BrowserRouter>
        <Routes> {/* Контейнер для всех маршрутов */}


          <Route path="/" element={<MainLayout />}>

            <Route index element={<Home />} />

            {/* Маршрут для страницы Избранное */}
            <Route path="favourites" element={<Favourites />} /> 

            {/* Маршрут для страницы Профиля */}
            <Route path="profilepage" element={<ProfilePage />} /> 

            {/* <Route path="*" element={<NotFoundPage />} /> */}

          </Route>

        </Routes>
    </BrowserRouter>

  );
}

export default App;

