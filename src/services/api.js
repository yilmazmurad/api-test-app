import axios from 'axios';

// Axios instance oluştur
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Token varsa header'a ekle
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersizse localStorage'ı temizle
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// CRUD fonksiyonları
export const apiService = {
  // GET - Listeleme
  getAll: async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('GET Error:', error);
      throw error;
    }
  },

  // GET - Tek kayıt
  getById: async (endpoint, id) => {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('GET BY ID Error:', error);
      throw error;
    }
  },

  // POST - Ekleme
  create: async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('POST Error:', error);
      throw error;
    }
  },

  // PUT - Güncelleme
  update: async (endpoint, id, data) => {
    try {
      const response = await api.put(`${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('PUT Error:', error);
      throw error;
    }
  },

  // DELETE - Silme
  delete: async (endpoint, id) => {
    try {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('DELETE Error:', error);
      throw error;
    }
  },
};

export default api;
