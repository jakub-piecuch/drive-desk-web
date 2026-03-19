import type { RequestFn } from '@/hooks/useApiClient';
import { PaginatedResponse } from '@/types/api.types';
import { CreateLesson, Lesson } from './lesson.types';

const PATH = '/api/lessons';

export const fetchLessons = async (request: RequestFn): Promise<PaginatedResponse<Lesson>> => {
  const response = await request(PATH);
  if (!response.ok) throw new Error(`Failed to fetch lessons: ${response.status}`);
  return response.json();
};

export const getLessonById = async (request: RequestFn, id: string): Promise<Lesson> => {
  const response = await request(`${PATH}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch lesson ${id}: ${response.status}`);
  return response.json();
};

export const createLesson = async (request: RequestFn, lesson: CreateLesson): Promise<Lesson> => {
  const response = await request(PATH, { method: 'POST', body: JSON.stringify(lesson) });
  if (!response.ok) throw new Error(`Failed to create lesson: ${response.status}`);
  return response.json();
};

export const updateLessonById = async (request: RequestFn, lesson: Lesson): Promise<Lesson> => {
  const response = await request(`${PATH}/${lesson.id}`, { method: 'PUT', body: JSON.stringify(lesson) });
  if (!response.ok) throw new Error(`Failed to update lesson: ${response.status}`);
  return response.json();
};

export const deleteLessonById = async (request: RequestFn, id: string): Promise<void> => {
  const response = await request(`${PATH}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Failed to delete lesson ${id}: ${response.status}`);
};
