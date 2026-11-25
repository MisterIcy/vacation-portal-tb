type PhpDateTime = string | { date: string; timezone_type: number; timezone: string };

export interface User {
  id: number;
  email: string;
  name: string;
  employee_code: string;
  role: 'employee' | 'manager';
  created_at: PhpDateTime;
  updated_at: PhpDateTime;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  employee_code: string;
  role: 'employee' | 'manager';
}

export interface UpdateUserRequest {
  email?: string;
  password?: string;
  name?: string;
}
