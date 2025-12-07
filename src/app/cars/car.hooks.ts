import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCarById, fetchCars } from "./car.api";
import { toast } from "sonner";

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