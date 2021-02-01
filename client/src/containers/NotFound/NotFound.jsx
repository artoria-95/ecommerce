import React from 'react';
import notFound from '../../assets/icons/404_page_not_found_.svg';
import './NotFound.css';

const NotFound = () => (
  <>
    <h1 className="page">PAGE NOT FOUND</h1>
    <div className="content">
      <img className="notFound" src={notFound} alt="404 Not Found" />
    </div>
  </>
);

export default NotFound;