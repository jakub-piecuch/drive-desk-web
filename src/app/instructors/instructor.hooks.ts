import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchInstructors } from "./instructor.api";

export function useInstructors() {
  const query = useQuery({
    queryKey: ['instructors'],
    queryFn: fetchInstructors,
  });
  
  console.log('Instructors query state:', {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  });
  
  return query;
}