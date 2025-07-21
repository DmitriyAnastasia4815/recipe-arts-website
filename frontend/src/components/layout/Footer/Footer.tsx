// import logo from "../../image/logo-footer.svg";
import React from 'react';
import '../Footer/Footer.scss';
import logo from '@image/logo.svg';

 const Footer: React.FC = () => {
  return (
    <div className="container">
      <div className="footer__content">
        <div className="footer__hr">
          <hr className="footer__hr-item" />
          <img src={logo} alt="logo" className="footer-logo" />
          <hr className="footer__hr-item" />
        </div>
        <p className="footer__root">
          © 000 «RECIPE ARTS», 2025. ВСЕ ПРАВА ЗАЩИЩЕНЫ
        </p>
      </div>
    </div>
  );
};
export default Footer;