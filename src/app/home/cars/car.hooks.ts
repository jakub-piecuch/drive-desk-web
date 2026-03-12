import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCar, deleteCarById, fetchCars, getCarById, updateCarById } from "./car.api";
import { toast } from "sonner";
import { Car, CreateCar } from "./car.types";

export function useCars() {
  const query = useQuery({
    queryKey: ['cars'],
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

export function useCarsTableData() {
  const { data, isLoading, isError, error, ...query } = useCars();

  return {
    ...query,
    isLoading,
    isError,
    data: data ? data : [],
    headers: [
      { key: 'make', label: 'Make' },
      { key: 'model', label: 'Model' },
      { key: 'registrationNumber', label: 'Registration Number' }
    ]
  }
}

export function useDeleteCarById() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs the delete
    mutationFn: (id: string) => deleteCarById(id),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Car deleted successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error deleting car: ${error}`);
    }
  });
}

export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs create
    mutationFn: (car: CreateCar) => createCar(car),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Car created successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error creating car: ${error}`);
    }
  });
}

export function useGetCarById(id: string | undefined) {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => getCarById(id!),
    enabled: !!id, // Don't fetch until id exists
  });
}

export function useUpdateCarById() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs update
    mutationFn: (car: Car) => updateCarById(car),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Car updated successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error updating car: ${error}`);
    }
  });
}