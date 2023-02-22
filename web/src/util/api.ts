import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-type': 'application/json',
  },
});

if (token) {
  api.defaults.headers.authorization = `Bearer ${token}`;
}

export default api;
