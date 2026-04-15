import React, { createContext, useContext, useState, useCallback } from 'react';
// ❌ REMOVE THIS:
// import { loginAPI, signupAPI } from '../utils/api';

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

  // ✅ LOGIN (fixed)
  const login = useCallback(
    async (email, password, remember) => {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      saveSession(data.user, data.token || "dummy-token", remember);
      return data.user;
    },
    [saveSession]
  );

  // ✅ DEMO LOGIN
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

  // ✅ SIGNUP (🔥 MAIN FIX)
  const signup = useCallback(async (userData) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await res.json();

      console.log("SIGNUP RESPONSE 👉", data); // debug

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      return data;

    } catch (error) {
      console.error("SIGNUP ERROR ❌", error);
      throw error;
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