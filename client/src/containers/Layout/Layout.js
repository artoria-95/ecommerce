import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Styled component
import './Layout.css'

const Layout = ({ children }) => (
  <>
    <Header />
    <div className="div-children">
      {children}
    </div>
    <Footer className="footer" />
  </>
);

export default Layout;
