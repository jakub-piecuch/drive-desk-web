import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useApiClient } from '@/hooks/useApiClient';
import { createInstructor, deleteInstructorById, fetchInstructors, getInstructorById, updateInstructorById } from './instructor.api';
import { CreateInstructor, Instructor } from './instructor.types';

const QUERY_KEY = ['instructors'] as const;

export function useInstructors() {
  const { request } = useApiClient();
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchInstructors(request),
  });
}

export function useInstructorsTableData() {
  const { data, isLoading, isError, ...query } = useInstructors();
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

export function useGetInstructorById() {
  const { request } = useApiClient();
  return useMutation({
    mutationFn: (id: string) => getInstructorById(request, id),
  });
}

export function useCreateInstructor() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (instructor: CreateInstructor) => createInstructor(request, instructor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Instructor created successfully');
    },
    onError: () => toast.error('Error creating instructor'),
  });
}

export function useUpdateInstructorById() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (instructor: Instructor) => updateInstructorById(request, instructor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Instructor updated successfully');
    },
    onError: () => toast.error('Error updating instructor'),
  });
}

export function useDeleteInstructorById() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteInstructorById(request, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Instructor deleted successfully');
    },
    onError: () => toast.error('Error deleting instructor'),
  });
}
