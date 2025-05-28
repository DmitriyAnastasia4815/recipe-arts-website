import { Outlet } from 'react-router-dom';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import 'src/styles/app.scss';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="app-content">
        <Outlet/>
      </main>
      <Footer/>
    </>

    
  );
};

export default MainLayout