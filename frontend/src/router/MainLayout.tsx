import { Outlet } from 'react-router-dom';
import Header from 'src/components/layout/Header/Header';
import Footer from 'src/components/layout/Footer/Footer';
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