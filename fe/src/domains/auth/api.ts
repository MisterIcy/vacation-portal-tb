import api from '@api/axios';
import type { LoginCredentials, AuthResponse, User, JWTPayload } from './types';

const decodeJWT = (token: string): JWTPayload => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
};

export const login = async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
  const { data } = await api.post<AuthResponse>('/auth/login', credentials);

  // Decode JWT to extract user information
  const payload = decodeJWT(data.token);

  const user: User = {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  };

  return { token: data.token, user };
};

export const logout = (): void => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
