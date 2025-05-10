import './App.css';
import Header from './components/shared/Header';
import { Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import Favourites from './pages/Favourites';
import Footer from './components/shared/Footer';

function App() {
  return (     
    <>
      {/* <header>
        <a href='/'>Home</a>
        <a href='/favourites'>Favourites</a>
        <a href='/account'>Account</a>
      </header>   */}
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/favourites' element={<Favourites/>}/>
        <Route path='/profilepage' element={<ProfilePage/>}/>
      </Routes>
      <Footer/>
    </> 

  );
}

export default App;
