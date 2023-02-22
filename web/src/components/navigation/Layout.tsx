import React from 'react';
import Sidebar from '../Sidebar';
import AppPages from './AppPages';

const Layout = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <Sidebar />

      <AppPages />
    </div>
  );
};

export default Layout;
