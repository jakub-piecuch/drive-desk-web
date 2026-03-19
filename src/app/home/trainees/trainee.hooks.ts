import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useApiClient } from '@/hooks/useApiClient';
import { createTrainee, deleteTraineeById, fetchTrainees, getTraineeById, updateTraineeById } from './trainee.api';
import { CreateTrainee, Trainee } from './trainee.types';

const QUERY_KEY = ['trainees'] as const;

export function useTrainees() {
  const { request } = useApiClient();
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchTrainees(request),
  });
}

export function useTraineesTableData() {
  const { data, isLoading, isError, ...query } = useTrainees();
  return {
    ...query,
    isLoading,
    isError,
    data: data ?? [],
    headers: [
      { key: 'name', label: 'Name' },
      { key: 'surname', label: 'Surname' },
      { key: 'email', label: 'Email' },
      { key: 'phoneNumber', label: 'Phone Number' },
    ],
  };
}

export function useGetTraineeById() {
  const { request } = useApiClient();
  return useMutation({
    mutationFn: (id: string) => getTraineeById(request, id),
  });
}

export function useCreateTrainee() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (trainee: CreateTrainee) => createTrainee(request, trainee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Trainee created successfully');
    },
    onError: () => toast.error('Error creating trainee'),
  });
}

export function useUpdateTraineeById() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (trainee: Trainee) => updateTraineeById(request, trainee),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Trainee updated successfully');
    },
    onError: () => toast.error('Error updating trainee'),
  });
}

export function useDeleteTraineeById() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTraineeById(request, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Trainee deleted successfully');
    },
    onError: () => toast.error('Error deleting trainee'),
  });
}
