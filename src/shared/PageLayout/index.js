import React from 'react';
import Header from '../Header';
import './styles.css';

const PageLayout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <div className="content">
          {children}
        </div>
    </div>
  );
}

export default PageLayout;