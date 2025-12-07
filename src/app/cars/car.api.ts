import { RESOURCE_HOST } from "@/config/env.config";
import { Car } from "./car.types";

const API_DOMAIN_NAME = '/api/cars';

export const fetchCars = async (): Promise<Car[]> => {
  const response = await fetch(`${RESOURCE_HOST}${API_DOMAIN_NAME}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch cars: ${response.status}`);
  }

  // Parse the JSON once and store it in a variable
  const data = await response.json();
  console.log('cars data:', data);
  return data;
};

export const deleteCarById = async (id: string): Promise<void> => {
  const response = await fetch(`${RESOURCE_HOST}${API_DOMAIN_NAME}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete car by id: ${id} status: ${response.status}`);
  } else {

    console.log(response.status, `Deleted succesfully. ${id}`)
  }
}