import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw =
        localStorage.getItem('sh_user') ||
        sessionStorage.getItem('sh_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const saveSession = useCallback((userData, token, persist) => {
    const userStr = JSON.stringify(userData);
    if (persist) {
      localStorage.setItem('sh_user', userStr);
      localStorage.setItem('sh_token', token);
    }
    sessionStorage.setItem('sh_user', userStr);
    sessionStorage.setItem('sh_token', token);
    setUser(userData);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem('sh_user');
    localStorage.removeItem('sh_token');
    sessionStorage.removeItem('sh_user');
    sessionStorage.removeItem('sh_token');
    setUser(null);
  }, []);


const login = useCallback(
  async (email, password, remember) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const data = res.data;
      saveSession(data.user, data.token || "dummy-token", remember);
      return data.user;

    } catch (error) {
      console.error("LOGIN ERROR ❌", error);
      throw error.response?.data || error;
    }
  },
  [saveSession]
);



  const demoLogin = useCallback(() => {
    const demoUser = {
      id: 'demo',
      name: 'Demo User',
      email: 'demo@example.com',
      phone: '+91 63802 90603',
      createdAt: '01 Jan 2026',
      isDemo: true,
    };
    saveSession(demoUser, 'demo-token', false);
    return demoUser;  
  }, [saveSession]);


  const signup = useCallback(async (userData) => {
  try {
    const res = await api.post("/auth/signup", userData);
    return res.data;

  } catch (error) {
    console.error("SIGNUP ERROR ❌", error);
    throw error.response?.data || error;
  }
}, []);



  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const updateUser = useCallback(
    (newUserData, newToken) => {
      const persist = !!localStorage.getItem('sh_token');
      const token =
        newToken ||
        localStorage.getItem('sh_token') ||
        sessionStorage.getItem('sh_token');
      saveSession(newUserData, token, persist);
    },
    [saveSession]
  );

  return (
    <AuthContext.Provider
      value={{ user, login, demoLogin, signup, logout, updateUser, clearSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);