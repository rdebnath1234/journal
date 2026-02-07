import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { setAuthToken } from '../api/client';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'blog_auth';

export const AuthProvider = ({ children }) => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  const parsed = stored ? JSON.parse(stored) : null;

  const [user, setUser] = useState(parsed?.user || null);
  const [token, setToken] = useState(parsed?.token || null);

  const login = (payload) => {
    setUser(payload.user);
    setToken(payload.token);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
