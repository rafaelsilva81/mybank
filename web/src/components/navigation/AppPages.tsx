import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppPages = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='/transactions' element={<>transactions</>} />
        <Route path='/deposit' element={<>deposit</>} />
        <Route path='/withdraw' element={<>withdraw</>} />
        <Route path='/loan' element={<>loan</>} />
        <Route path='*' element={<>404</>} />
      </Routes>
    </>
  );
};

const Root = () => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/login';
    }
  });
  return <></>;
};

export default AppPages;
