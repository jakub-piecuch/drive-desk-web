import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTrainees } from "./trainee.api";
import { Trainee } from "./trainee.types";

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

export function useTraineesTableData() {
  const { data, isLoading, isError, error, ...query } = useTrainees();
  
    return {
      ...query,
      isLoading,
      isError,
      data: data ? data : [],
      headers: ["Name", "Sure Name", "Email", "Phone Number"]
    }
}