import React from 'react';
import { useQuery } from 'react-query';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../components/navigation/Layout';
import Login from './Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
