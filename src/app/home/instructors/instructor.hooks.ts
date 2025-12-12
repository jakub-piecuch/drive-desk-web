import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchInstructors } from "./instructor.api";
import { Instructor } from "./instructor.types";

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

export function useInstructorsTableData() {
  const { data, isLoading, isError, error, ...query } = useInstructors();
  
    return {
      ...query,
      isLoading,
      isError,
      data: data ? data : [],
      headers: ["Name", "Sure Name", "Email", "Phone Number"]
    }
}
