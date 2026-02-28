import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL || '';
const normalizedApiUrl = rawApiUrl
  ? rawApiUrl.replace(/\/+$/, '').endsWith('/api')
    ? rawApiUrl.replace(/\/+$/, '')
    : `${rawApiUrl.replace(/\/+$/, '')}/api`
  : '';

const api = axios.create({
  baseURL: normalizedApiUrl,
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('blog_auth');
  if (stored && !config.headers.Authorization) {
    const parsed = JSON.parse(stored);
    if (parsed?.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return config;
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;
