import api from './client';

export const uploadImage = async (file) => {
  const stored = localStorage.getItem('blog_auth');
  const token = stored ? JSON.parse(stored)?.token : null;
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await api.post('/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return data;
};
