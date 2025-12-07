import { Car } from "./car.types";

export const fetchCars = async (): Promise<Car[]> => {
    const response = await fetch('http://localhost:8081/api/cars');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cars: ${response.status}`);
    }
    
    // Parse the JSON once and store it in a variable
    const data = await response.json();
    console.log('cars data:', data);
    return data;
};