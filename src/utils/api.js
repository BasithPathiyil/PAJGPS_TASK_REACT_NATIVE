import axios from 'axios';

const api = axios.create({
  baseURL: 'https://connect.paj-gps.de/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
