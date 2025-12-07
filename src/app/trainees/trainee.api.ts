import { RESOURCE_HOST } from "@/config/env.config";
import { Trainee } from "./trainee.types";


const API_DOMAIN_NAME = 'trainees'

export const fetchTrainees = async (): Promise<Trainee[]> => {
    const response = await fetch(`${RESOURCE_HOST}/api/${API_DOMAIN_NAME}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${API_DOMAIN_NAME}: ${response.status}`);
    }
    
    // Parse the JSON once and store it in a variable
    const data = await response.json();
    console.log(`${API_DOMAIN_NAME} data:`, data);
    return data;
};