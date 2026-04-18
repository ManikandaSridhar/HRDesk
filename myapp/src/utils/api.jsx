import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hrdesk-backend.onrender.com/api', 
  headers: { 'Content-Type': 'application/json' },
});


api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('sh_token') || sessionStorage.getItem('sh_token');

  if (token) config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

// ── Response Interceptor ──
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err.response?.status === 401 &&
      !err.config.url.includes('/auth/')
    ) {
      localStorage.removeItem('sh_token');
      localStorage.removeItem('sh_user');
      sessionStorage.removeItem('sh_token');
      sessionStorage.removeItem('sh_user');
      window.location.reload();
    }
    return Promise.reject(err);
  }
);

// ── Auth ──
export const loginAPI = (email, password) =>
  api.post('/auth/login', { email, password });

export const signupAPI = (data) =>
  api.post('/auth/signup', data);

// ── Users ──
export const getProfileAPI = () =>
  api.get('/users/me');

export const updateProfileAPI = (data) =>
  api.put('/users/update-profile', data);

export const changePasswordAPI = (data) =>
  api.put('/users/password', data);

export const getSettingsAPI = () =>
  api.get('/users/settings');

export const updateSettingsAPI = (data) =>
  api.put('/users/settings', data);

export const deleteAccountAPI = (email) =>
  api.delete('/auth/delete-account', {
    data: { email }
  });

// ── Employees ──
export const getEmployeesAPI = (params = {}) =>
  api.get('/employees', { params });

export const createEmployeeAPI = (data) =>
  api.post('/employees', data);

export const updateEmployeeAPI = (id, data) =>
  api.put(`/employees/${id}`, data);

export const deleteEmployeeAPI = (id) =>
  api.delete(`/employees/${id}`);

export default api;
