import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCars } from "./car.api";

export function useCars() {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: fetchCars,
  });
  
  console.log('Cars query state:', {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  });
  
  return query;
}