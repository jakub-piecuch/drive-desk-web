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
      data: data ? transformTraineesData(data) : [],
      headers: ["Name", "Sure Name", "Email", "Phone Number"]
    }
}

function transformTraineesData(data: Trainee[]) {
  return data.map(trainee => ({
    ID: trainee.id,
    Name: trainee.name,
    SureName: trainee.sureName,
    Email: trainee.email,
    PhoneNumber: trainee.phoneNumber
  }));
}