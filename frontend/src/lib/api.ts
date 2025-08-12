import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cautious-telegram-7pjx99qq6prfq4r-3001.app.github.dev';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchMenu = async () => {
  const response = await api.get('/api/menu');
  return response.data;
};

export const submitContact = async (data: { name: string; email: string; message: string }) => {
  const response = await api.post('/api/contact', data);
  return response.data;
};