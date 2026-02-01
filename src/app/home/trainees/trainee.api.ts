import { RESOURCE_HOST } from "@/config/env.config";
import { Trainee, CreateTrainee } from "./trainee.types";

const API_DOMAIN_NAME = '/api/trainees';

export const fetchTrainees = async (): Promise<Trainee[]> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch trainees: ${response.status}`);
  }

  // Parse the JSON once and store it in a variable
  const data = await response.json();
  console.log('trainees data:', data);
  return data;
};

export const getTraineeById = async (id: string): Promise<Trainee> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch trainee by id: ${id}. Status: ${response.status}`);
  } else {
    console.log(response.status, `Fetched trainee: ${response.json()}.`)
  }

  return await response.json();
}

export const createTrainee = async (trainee: CreateTrainee): Promise<Trainee> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trainee),
  });

  if (!response.ok) {
    throw new Error(`Failed to create trainee. Status: ${response.status}`);
  } else {
    console.log(response.status, `Created trainee successfully.`)
  }

  return await response.json();
}

export const updateTraineeById = async (trainee: Trainee): Promise<Trainee> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}/${trainee.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trainee),
  });

  if (!response.ok) {
    throw new Error(`Failed to create trainee. Status: ${response.status}`);
  } else {
    console.log(response.status, `Updated trainee successfully.`)
  }

  return await response.json();
}

export const deleteTraineeById = async (id: string): Promise<void> => {
  const response = await fetch(`${RESOURCE_HOST()}${API_DOMAIN_NAME}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete trainee by id: ${id} status: ${response.status}`);
  } else {
    console.log(response.status, `Deleted trainee succesfully. ${id}`)
  }
}