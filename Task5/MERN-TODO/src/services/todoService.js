import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos/';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getTodos = async () => {
  const response = await api.get('');
  return response.data;
};

const createTodo = async (todoData) => {
  const response = await api.post('', todoData);
  return response.data;
};

const updateTodo = async (id, todoData) => {
  const response = await api.put(id, todoData);
  return response.data;
};

const deleteTodo = async (id) => {
  const response = await api.delete(id);
  return response.data;
};

const todoService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default todoService;