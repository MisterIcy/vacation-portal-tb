import api from '@api/axios';
import type { User, CreateUserRequest, UpdateUserRequest } from './types';

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>('/users');
  return data;
};

export const getUser = async (id: number): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
};

export const createUser = async (user: CreateUserRequest): Promise<User> => {
  const { data } = await api.post<User>('/users', user);
  return data;
};

export const updateUser = async (id: number, user: UpdateUserRequest): Promise<User> => {
  const { data } = await api.put<User>(`/users/${id}`, user);
  return data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
