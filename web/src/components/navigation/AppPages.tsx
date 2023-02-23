import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Deposit from '../../pages/Deposit';
import Logout from '../../pages/Logout';
import Profile from '../../pages/Profile';
import Transactions from '../../pages/Transactions';
import Withdraw from '../../pages/Withdraw';

const AppPages = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/deposit' element={<Deposit />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/profile' element={<Profile />} />
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
