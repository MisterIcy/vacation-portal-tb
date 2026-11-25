export interface User {
  id: number;
  email: string;
  name: string;
  role: 'employee' | 'manager';
}

export interface AuthResponse {
  token: string;
}

export interface JWTPayload {
  sub: number;
  name: string;
  email: string;
  role: 'employee' | 'manager';
  iat: number;
  exp: number;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}
