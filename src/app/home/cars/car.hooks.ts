import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useApiClient } from '@/hooks/useApiClient';
import { createCar, deleteCarById, fetchCars, getCarById, updateCarById } from './car.api';
import { Car, CreateCar } from './car.types';

const QUERY_KEY = ['cars'] as const;

export function useCars() {
  const { request } = useApiClient();
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchCars(request),
  });
}

export function useCarsTableData() {
  const { data, isLoading, isError, ...query } = useCars();
  return {
    ...query,
    isLoading,
    isError,
    data: data ?? [],
    headers: [
      { key: 'make', label: 'Make' },
      { key: 'model', label: 'Model' },
      { key: 'registrationNumber', label: 'Registration Number' },
    ],
  };
}

export function useGetCarById(id: string | undefined) {
  const { request } = useApiClient();
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(request, id!),
    enabled: !!id,
  });
}

export function useCreateCar() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (car: CreateCar) => createCar(request, car),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Car created successfully');
    },
    onError: () => toast.error('Error creating car'),
  });
}

export function useUpdateCarById() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (car: Car) => updateCarById(request, car),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Car updated successfully');
    },
    onError: () => toast.error('Error updating car'),
  });
}

export function useDeleteCarById() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCarById(request, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Car deleted successfully');
    },
    onError: () => toast.error('Error deleting car'),
  });
}
