import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../../pages/Logout';

const AppPages = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='/transactions' element={<>transactions</>} />
        <Route path='/deposit' element={<>deposit</>} />
        <Route path='/withdraw' element={<>withdraw</>} />
        <Route path='/loan' element={<>loan</>} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<>404</>} />
      </Routes>
    </>
  );
};

const Root = () => {
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    } else {
      window.location.href = '/transactions';
    }
  });
  return <></>;
};

export default AppPages;
