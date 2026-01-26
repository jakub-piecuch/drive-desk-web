import { RESOURCE_HOST } from "@/config/env.config";
import { CreateLesson, Lesson } from "./lesson.types";
import { PaginatedResponse } from "@/types/api.types";

const API_DOMAIN_NAME = '/api/lessons';

export const fetchLessons = async (): Promise<PaginatedResponse<Lesson>> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch lessons: ${response.status}`);
  }

  // Parse the JSON once and store it in a variable
  const data = await response.json();
  console.log('lessons data:', data);
  return data;
};

export const getLessonById = async (id: string): Promise<Lesson> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch lesson by id: ${id}. Status: ${response.status}`);
  } else {
    console.log(response.status, `Fetched lesson: ${response.json()}.`)
  }

  return await response.json();
}

export const createLesson = async (lesson: CreateLesson): Promise<Lesson> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lesson),
  });

  if (!response.ok) {
    throw new Error(`Failed to create lesson. Status: ${response.status}`);
  } else {
    console.log(response.status, `Created lesson successfully.`)
  }

  return await response.json();
}

export const updateLessonById = async (lesson: Lesson): Promise<Lesson> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}/${lesson.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lesson),
  });

  if (!response.ok) {
    throw new Error(`Failed to create lesson. Status: ${response.status}`);
  } else {
    console.log(response.status, `Updated lesson successfully.`)
  }

  return await response.json();
}

export const deleteLessonById = async (id: string): Promise<void> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete lesson by id: ${id} status: ${response.status}`);
  } else {
    console.log(response.status, `Deleted lesson succesfully. ${id}`)
  }
}