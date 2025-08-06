import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Menu from '@/components/layout/Menu/Menu';
import '@/styles/app.scss';
import { useState, useEffect } from 'react';

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
      {isMobile && <Menu />}
      <Footer />
    </div>
  );
};

export default MainLayout;
