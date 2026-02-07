import api from './client';

const getAuthHeader = () => {
  const stored = localStorage.getItem('blog_auth');
  if (!stored) return {};
  const parsed = JSON.parse(stored);
  if (!parsed?.token) return {};
  return { Authorization: `Bearer ${parsed.token}` };
};

export const fetchPosts = async (params) => {
  const { data } = await api.get('/posts', { params });
  return data;
};

export const fetchPostBySlug = async (slug) => {
  const { data } = await api.get(`/posts/${slug}`);
  return data;
};

export const fetchPostById = async (id) => {
  const { data } = await api.get(`/posts/id/${id}`);
  return data;
};

export const fetchComments = async (postId) => {
  const { data } = await api.get(`/posts/${postId}/comments`);
  return data;
};

export const addComment = async (postId, payload) => {
  const { data } = await api.post(`/posts/${postId}/comments`, payload);
  return data;
};

export const createPost = async (payload, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : getAuthHeader();
  const { data } = await api.post('/posts', payload, { headers });
  return data;
};

export const updatePost = async (id, payload, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : getAuthHeader();
  const { data } = await api.put(`/posts/${id}`, payload, { headers });
  return data;
};

export const deletePost = async (id, token) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : getAuthHeader();
  const { data } = await api.delete(`/posts/${id}`, { headers });
  return data;
};
