import { RESOURCE_HOST } from "@/config/env.config";
import { Instructor } from "./instructor.types";

const API_DOMAIN_NAME = '/api/instructors';

export const fetchInstructors = async (): Promise<Instructor[]> => {
    const response = await fetch(`${RESOURCE_HOST}${API_DOMAIN_NAME}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${API_DOMAIN_NAME}: ${response.status}`);
    }
    
    // Parse the JSON once and store it in a variable
    const data = await response.json();
    console.log(`${API_DOMAIN_NAME} data:`, data);
    return data;
};