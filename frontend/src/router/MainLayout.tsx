import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import '@/styles/app.scss';

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