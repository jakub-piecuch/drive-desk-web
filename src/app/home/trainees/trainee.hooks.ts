import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTrainee, deleteTraineeById, fetchTrainees, getTraineeById, updateTraineeById } from "./trainee.api";
import { toast } from "sonner";
import { Trainee, CreateTrainee } from "./trainee.types";

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
    headers: [
      { key: 'name', label: 'Name' },
      { key: 'surname', label: 'Surname' },
      { key: 'email', label: 'Email Number' },
      { key: 'phoneNumber', label: 'Phone Number'}
    ]
  }
}

export function useDeleteTraineeById() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs the delete
    mutationFn: (id: string) => deleteTraineeById(id),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Trainee deleted successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['trainees'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error deleting trainee: ${error}`);
    }
  });
}

export function useCreateTrainee() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs create
    mutationFn: (trainee: CreateTrainee) => createTrainee(trainee),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Trainee created successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['trainees'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error creating trainee: ${error}`);
    }
  });
}

export function useGetTraineeById() {
  return useMutation({
    // The function that performs fetcg
    mutationFn: (id: string) => getTraineeById(id),
  });
}

export function useUpdateTraineeById() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs update
    mutationFn: (trainee: Trainee) => updateTraineeById(trainee),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Trainee updated successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['trainees'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error updating trainee: ${error}`);
    }
  });
}