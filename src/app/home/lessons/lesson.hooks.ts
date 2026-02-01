import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLesson, deleteLessonById, fetchLessons, getLessonById, updateLessonById } from "./lesson.api";
import { toast } from "sonner";
import { Lesson, CreateLesson, LessonEvent } from "./lesson.types";
import { useMemo } from "react";

export function useLessons() {
  const query = useQuery({
    queryKey: ['lessons'],
    queryFn: fetchLessons,
  });

  console.log('Lessons query state:', {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error
  });

  return query;
}

export function useLessonEvents() {
  const { data, isLoading, isError, error } = useLessons();

  const events: LessonEvent[] = useMemo(() => {
    const lessons = data?.content
    
    if (!lessons || !Array.isArray(lessons)) {
      return [];
    }

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

  return {
    events,
    isLoading,
    isError,
    error,
  };
}

export function useDeleteLessonById() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs the delete
    mutationFn: (id: string) => deleteLessonById(id),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Lesson deleted successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error deleting lesson: ${error}`);
    }
  });
}

export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs create
    mutationFn: (lesson: CreateLesson) => createLesson(lesson),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Lesson created successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error creating lesson: ${error}`);
    }
  });
}

export function useGetLessonById() {
  return useMutation({
    // The function that performs fetcg
    mutationFn: (id: string) => getLessonById(id),
  });
}

export function useUpdateLessonById() {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs update
    mutationFn: (lesson: Lesson) => updateLessonById(lesson),

    // What to do if it succeeds
    onSuccess: () => {
      toast.success("Lesson updated successfully");
      // This forces the list to refresh automatically
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },

    // What to do if it fails
    onError: (error) => {
      toast.error(`Error updating lesson: ${error}`);
    }
  });
}