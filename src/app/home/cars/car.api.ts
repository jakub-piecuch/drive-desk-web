import type { RequestFn } from '@/hooks/useApiClient';
import { Car, CreateCar } from './car.types';

const PATH = '/api/cars';

export const fetchCars = async (request: RequestFn): Promise<Car[]> => {
  const response = await request(PATH);
  if (!response.ok) throw new Error(`Failed to fetch cars: ${response.status}`);
  return response.json();
};

export const getCarById = async (request: RequestFn, id: string): Promise<Car> => {
  const response = await request(`${PATH}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch car ${id}: ${response.status}`);
  return response.json();
};

export const createCar = async (request: RequestFn, car: CreateCar): Promise<Car> => {
  const response = await request(PATH, { method: 'POST', body: JSON.stringify(car) });
  if (!response.ok) throw new Error(`Failed to create car: ${response.status}`);
  return response.json();
};

export const updateCarById = async (request: RequestFn, car: Car): Promise<Car> => {
  const response = await request(`${PATH}/${car.id}`, { method: 'PUT', body: JSON.stringify(car) });
  if (!response.ok) throw new Error(`Failed to update car: ${response.status}`);
  return response.json();
};

export const deleteCarById = async (request: RequestFn, id: string): Promise<void> => {
  const response = await request(`${PATH}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Failed to delete car ${id}: ${response.status}`);
};
