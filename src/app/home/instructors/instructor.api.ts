import type { RequestFn } from '@/hooks/useApiClient';
import { Instructor, CreateInstructor } from './instructor.types';

const PATH = '/api/instructors';

export const fetchInstructors = async (request: RequestFn): Promise<Instructor[]> => {
  const response = await request(PATH);
  if (!response.ok) throw new Error(`Failed to fetch instructors: ${response.status}`);
  return response.json();
};

export const getInstructorById = async (request: RequestFn, id: string): Promise<Instructor> => {
  const response = await request(`${PATH}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch instructor ${id}: ${response.status}`);
  return response.json();
};

export const createInstructor = async (request: RequestFn, instructor: CreateInstructor): Promise<Instructor> => {
  const response = await request(PATH, { method: 'POST', body: JSON.stringify(instructor) });
  if (!response.ok) throw new Error(`Failed to create instructor: ${response.status}`);
  return response.json();
};

export const updateInstructorById = async (request: RequestFn, instructor: Instructor): Promise<Instructor> => {
  const response = await request(`${PATH}/${instructor.id}`, { method: 'PUT', body: JSON.stringify(instructor) });
  if (!response.ok) throw new Error(`Failed to update instructor: ${response.status}`);
  return response.json();
};

export const deleteInstructorById = async (request: RequestFn, id: string): Promise<void> => {
  const response = await request(`${PATH}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Failed to delete instructor ${id}: ${response.status}`);
};
