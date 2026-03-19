import type { RequestFn } from '@/hooks/useApiClient';
import { Trainee, CreateTrainee } from './trainee.types';

const PATH = '/api/trainees';

export const fetchTrainees = async (request: RequestFn): Promise<Trainee[]> => {
  const response = await request(PATH);
  if (!response.ok) throw new Error(`Failed to fetch trainees: ${response.status}`);
  return response.json();
};

export const getTraineeById = async (request: RequestFn, id: string): Promise<Trainee> => {
  const response = await request(`${PATH}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch trainee ${id}: ${response.status}`);
  return response.json();
};

export const createTrainee = async (request: RequestFn, trainee: CreateTrainee): Promise<Trainee> => {
  const response = await request(PATH, { method: 'POST', body: JSON.stringify(trainee) });
  if (!response.ok) throw new Error(`Failed to create trainee: ${response.status}`);
  return response.json();
};

export const updateTraineeById = async (request: RequestFn, trainee: Trainee): Promise<Trainee> => {
  const response = await request(`${PATH}/${trainee.id}`, { method: 'PUT', body: JSON.stringify(trainee) });
  if (!response.ok) throw new Error(`Failed to update trainee: ${response.status}`);
  return response.json();
};

export const deleteTraineeById = async (request: RequestFn, id: string): Promise<void> => {
  const response = await request(`${PATH}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Failed to delete trainee ${id}: ${response.status}`);
};
