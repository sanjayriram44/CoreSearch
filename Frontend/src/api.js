// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const deleteChat = async (chatId) => {
  const res = await API.delete(`/chats/${chatId}`);
  return res.data;
};


export const getChats = async () => {
  const res = await API.get('/chats');
  return res.data;
};

export const createChat = async (title) => {
  const res = await API.post('/chats', { title });
  return res.data;
};

export const sendMessage = async (chatId, message) => {
  const res = await API.post(`/chats/${chatId}/message`, { message });
  return res.data;
};
