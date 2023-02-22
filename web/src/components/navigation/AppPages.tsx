import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const AppPages = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/transactions' />} />
        <Route path='/transactions' element={<>penis</>} />
        <Route path='/deposit' element={<>penis</>} />
        <Route path='/withdraw' element={<>penis</>} />
        <Route path='/loan' element={<>penis</>} />
        <Route path='*' element={<>404</>} />
      </Routes>
    </>
  );
};

export default AppPages;
