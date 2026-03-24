import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import { createWrapper } from '@/test/utils';
import { useLessonEvents } from './lesson.hooks';

vi.mock('@clerk/nextjs', () => ({
  useAuth: vi.fn(() => ({
    getToken: vi.fn().mockResolvedValue('mock-token'),
  })),
}));

describe('useLessonEvents', () => {
  it('returns empty array while loading', () => {
    const { result } = renderHook(() => useLessonEvents(), { wrapper: createWrapper() });
    expect(result.current.events).toEqual([]);
  });

  it('maps lessons to calendar events with correct shape', async () => {
    const { result } = renderHook(() => useLessonEvents(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.events).toHaveLength(1);
    const event = result.current.events[0];
    expect(event.id).toBe('lesson-1');
    expect(event.title).toBe('Driving Lesson');
    expect(event.type).toBe('lesson');
    expect(event.instructorId).toBe('instructor-1');
    expect(event.traineeId).toBe('trainee-1');
    expect(event.carId).toBe('car-1');
  });

  it('parses startTime and endTime as Date objects', async () => {
    const { result } = renderHook(() => useLessonEvents(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const event = result.current.events[0];
    expect(event.start).toBeInstanceOf(Date);
    expect(event.end).toBeInstanceOf(Date);
    expect(event.start.getHours()).toBe(10);
    expect(event.end.getHours()).toBe(11);
  });

  it('returns empty array when API returns empty content', async () => {
    server.use(
      http.get('http://localhost:8081/api/lessons', () =>
        HttpResponse.json({ content: [], page: { size: 10, number: 0, totalElements: 0, totalPages: 0 } })
      )
    );

    const { result } = renderHook(() => useLessonEvents(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.events).toEqual([]);
  });

  it('returns empty array when API returns no content field', async () => {
    server.use(
      http.get('http://localhost:8081/api/lessons', () => HttpResponse.json({}))
    );

    const { result } = renderHook(() => useLessonEvents(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.events).toEqual([]);
  });

  it('sets isError when API call fails', async () => {
    server.use(
      http.get('http://localhost:8081/api/lessons', () => HttpResponse.error())
    );

    const { result } = renderHook(() => useLessonEvents(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(true);
  });
});
