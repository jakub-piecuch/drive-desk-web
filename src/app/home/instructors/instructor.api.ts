import { RESOURCE_HOST } from "@/config/env.config";
import { Instructor, CreateInstructor } from "./instructor.types";

const API_DOMAIN_NAME = '/api/instructors';

export const fetchInstructors = async (): Promise<Instructor[]> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch instructors: ${response.status}`);
  }

  // Parse the JSON once and store it in a variable
  const data = await response.json();
  console.log('instructors data:', data);
  return data;
};

export const getInstructorById = async (id: string): Promise<Instructor> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch instructor by id: ${id}. Status: ${response.status}`);
  } 
    
  const result = await response.json();
  console.log(response.status, `Fetched instructor: ${result}.`)

  return result;
}

export const createInstructor = async (instructor: CreateInstructor): Promise<Instructor> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(instructor),
  });

  if (!response.ok) {
    throw new Error(`Failed to create instructor. Status: ${response.status}`);
  } else {
    console.log(response.status, `Created instructor successfully.`)
  }

  return await response.json();
}

export const updateInstructorById = async (instructor: Instructor): Promise<Instructor> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}/${instructor.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(instructor),
  });

  if (!response.ok) {
    throw new Error(`Failed to create instructor. Status: ${response.status}`);
  } else {
    console.log(response.status, `Updated instructor successfully.`)
  }

  return await response.json();
}

export const deleteInstructorById = async (id: string): Promise<void> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete instructor by id: ${id} status: ${response.status}`);
  } else {
    console.log(response.status, `Deleted instructor succesfully. ${id}`)
  }
}