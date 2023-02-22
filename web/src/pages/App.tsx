import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Login from './Login';
import Layout from '../components/navigation/Layout';

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
