import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppPages = () => {
  return (
    <>
      <Routes>
        <Route path='/transactions' element={<>penis</>} />
        <Route path='/deposit' element={<>penis</>} />
        <Route path='/withdraw' element={<>penis</>} />
        <Route path='/loan' element={<>penis</>} />
      </Routes>
    </>
  );
};

export default AppPages;
