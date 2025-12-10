import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCar, deleteCarById, fetchCars, getCarById, updateCarById } from "./car.api";
import { toast } from "sonner";
import { Car } from "./car.types";

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

export function useCarTableData() {
  const { data, isLoading, isError, error, ...query } = useCars();

  return {
    ...query,
    isLoading,
    isError,
    data: data ? transformCarsData(data) : [],
    headers: ["Registration Number", "Make", "Model"]
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
    mutationFn: (car: Car) => createCar(car),

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

export function useGetCarById() {
  return useMutation({
    // The function that performs fetcg
    mutationFn: (id: string) => getCarById(id),
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

function transformCarsData(data: Car[]) {
  return data.map(car => ({
    ID: car.id,
    RegistrationNumber: car.registrationNumber,
    Make: car.make,
    Model: car.model
  }));
}