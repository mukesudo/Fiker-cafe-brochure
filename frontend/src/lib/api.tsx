import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cautious-telegram-7pjx99qq6prfq4r-3001.app.github.dev/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchMenu = async () => {
  const response = await api.get('/api/menu');
  return response.data;
};

export const submitContact = async (data: { name: string; email: string; message: string }) => {
  const response = await api.post('/api/contact', data);
  return response.data;
};

export const login = async (credentials: { username: string; password: string }) => {
  const response = await api.post('/api/login', credentials);
  return response.data;
};

export const addMenuItem = async (data: { name: string; description: string; price: number }) => {
  const response = await api.post('/api/menu', data);
  return response.data;
};

export const updateMenuItem = async (id: number, data: { name: string; description: string; price: number }) => {
  const response = await api.put(`/api/menu/${id}`, data);
  return response.data;
};

export const deleteMenuItem = async (id: number) => {
  await api.delete(`/api/menu/${id}`);
};