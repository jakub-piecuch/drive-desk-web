import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { useApiClient } from '@/hooks/useApiClient';
import { createLesson, deleteLessonById, fetchLessons, getLessonById, updateLessonById } from './lesson.api';
import { CreateLesson, Lesson, LessonEvent } from './lesson.types';

const QUERY_KEY = ['lessons'] as const;

export function useLessons() {
  const { request } = useApiClient();
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => fetchLessons(request),
  });
}

export function useLessonEvents() {
  const { data, isLoading, isError, error } = useLessons();

  const events: LessonEvent[] = useMemo(() => {
    const lessons = data?.content;
    if (!lessons || !Array.isArray(lessons)) return [];
    return lessons.map((lesson): LessonEvent => ({
      id: lesson.id,
      title: 'Driving Lesson',
      start: new Date(lesson.startTime),
      end: new Date(lesson.endTime),
      type: 'lesson',
      instructorId: lesson.instructorId,
      traineeId: lesson.traineeId,
      carId: lesson.carId,
    }));
  }, [data]);

  return { events, isLoading, isError, error };
}

export function useGetLessonById() {
  const { request } = useApiClient();
  return useMutation({
    mutationFn: (id: string) => getLessonById(request, id),
  });
}

export function useCreateLesson() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lesson: CreateLesson) => createLesson(request, lesson),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Lesson created successfully');
    },
    onError: () => toast.error('Error creating lesson'),
  });
}

export function useUpdateLessonById() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lesson: Lesson) => updateLessonById(request, lesson),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Lesson updated successfully');
    },
    onError: () => toast.error('Error updating lesson'),
  });
}

export function useDeleteLessonById() {
  const { request } = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLessonById(request, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Lesson deleted successfully');
    },
    onError: () => toast.error('Error deleting lesson'),
  });
}
