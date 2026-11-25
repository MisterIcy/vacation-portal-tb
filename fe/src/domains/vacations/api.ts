import api from '@api/axios';
import type { Vacation, CreateVacationRequest } from './types';

export const getVacations = async (): Promise<Vacation[]> => {
  const { data } = await api.get<Vacation[]>('/vacations');
  return data;
};

export const createVacation = async (vacation: CreateVacationRequest): Promise<Vacation> => {
  const { data } = await api.post<Vacation>('/vacations', vacation);
  return data;
};

export const deleteVacation = async (id: number): Promise<void> => {
  await api.delete(`/vacations/${id}`);
};

export const approveVacation = async (id: number): Promise<Vacation> => {
  const { data } = await api.put<Vacation>(`/vacations/${id}/approve`);
  return data;
};

export const rejectVacation = async (id: number): Promise<Vacation> => {
  const { data } = await api.put<Vacation>(`/vacations/${id}/reject`);
  return data;
};
