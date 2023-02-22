import React from 'react';
import AppPages from './AppPages';

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <aside className="w-1/5 h-screen bg-red-600"> test sidebar </aside>

      <AppPages />
    </div>
  );
};

export default Layout;
