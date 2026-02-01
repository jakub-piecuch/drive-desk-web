import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createInstructor, deleteInstructorById, fetchInstructors, getInstructorById, updateInstructorById } from "./instructor.api";
import { toast } from "sonner";
import { Instructor, CreateInstructor } from "./instructor.types";

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
    headers: [
      { key: 'name', label: 'Name' },
      { key: 'surname', label: 'Surname' },
      { key: 'email', label: 'Email Number' },
      { key: 'phoneNumber', label: 'Phone Number'}
    ]
  }
}

export function useDeleteInstructorById() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs the delete
    mutationFn: (id: string) => deleteInstructorById(id),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Instructor deleted successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error deleting instructor: ${error}`);
    }
  });
}

export function useCreateInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs create
    mutationFn: (instructor: CreateInstructor) => createInstructor(instructor),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Instructor created successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error creating instructor: ${error}`);
    }
  });
}

export function useGetInstructorById() {
  return useMutation({
    // The function that performs fetcg
    mutationFn: (id: string) => getInstructorById(id),
  });
}

export function useUpdateInstructorById() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs update
    mutationFn: (instructor: Instructor) => updateInstructorById(instructor),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Instructor updated successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error updating instructor: ${error}`);
    }
  });
}