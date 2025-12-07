import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTrainees } from "./trainee.api";

export function useTrainees() {
  const query = useQuery({
    queryKey: ['trainees'],
    queryFn: fetchTrainees,
  });
  
  console.log('Trainees query state:', {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  });
  
  return query;
}