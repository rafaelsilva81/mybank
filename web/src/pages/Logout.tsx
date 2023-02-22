import React, { useEffect } from 'react';
const Logout = () => {
  useEffect(() => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  });
  return <></>;
};

export default Logout;
