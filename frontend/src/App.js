import './App.css';
import Header from './components/shared/Header';
import { Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import Favourites from './pages/Favourites';
import Footer from './components/shared/Footer';
import RecipePage from './pages/RecipePage.jsx';


function App() {
  return (     
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/favourites' element={<Favourites/>}/>
        {/* <Route path='/profilepage' element={<ProfilePage/>}/> */}
        <Route path='/profilepage' element={<RecipePage/>}/>
      </Routes>
      <Footer/>
    </> 

  );
}

export default App;
