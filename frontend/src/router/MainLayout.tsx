import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import '@/styles/app.scss';
import Menu from '@/components/layout/Menu/Menu';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="app-content">
        <Outlet/>
      </main>
      <Footer/>
      {/* <Menu/> */}
    </>

    
  );
};

export default MainLayout