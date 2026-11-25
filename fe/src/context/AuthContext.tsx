/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '@domains/auth/types';
import api from '@api/axios';
import { isTokenExpired } from '@utils/jwtUtils';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage and validate token
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    // If no token or token is expired, clear everything and return null
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }

    // Set the Authorization header for valid token
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Parse and return user if valid
    if (!storedUser || storedUser === 'undefined' || storedUser === 'null') {
      return null;
    }
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  const isLoading = false;

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  }, []);

  useEffect(() => {
    // Set up interval to check token expiration every minute
    const intervalId = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken && isTokenExpired(currentToken)) {
        console.log('Token expired, logging out');
        logout();
        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [logout]);

  const login = (token: string, newUser: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
