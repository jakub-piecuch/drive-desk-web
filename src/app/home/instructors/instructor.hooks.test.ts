import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import { createWrapper } from '@/test/utils';
import { useInstructors, useCreateInstructor, useDeleteInstructorById } from './instructor.hooks';

vi.mock('@clerk/nextjs', () => ({
  useAuth: vi.fn(() => ({
    getToken: vi.fn().mockResolvedValue('mock-token'),
  })),
}));

describe('useInstructors', () => {
  it('fetches and returns instructor list', async () => {
    const { result } = renderHook(() => useInstructors(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data![0].name).toBe('John');
    expect(result.current.data![0].surname).toBe('Doe');
  });

  it('sets isError when fetch fails', async () => {
    server.use(
      http.get('http://localhost:8081/api/instructors', () => HttpResponse.error())
    );

    const { result } = renderHook(() => useInstructors(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(true);
  });
});

describe('useCreateInstructor', () => {
  it('calls POST /api/instructors with correct payload', async () => {
    let capturedBody: unknown = null;

    server.use(
      http.post('http://localhost:8081/api/instructors', async ({ request }) => {
        capturedBody = await request.json();
        return HttpResponse.json(
          { id: 'instructor-new', name: 'Jane', surname: 'Smith', email: 'jane@example.com', phoneNumber: '987654321' },
          { status: 201 }
        );
      })
    );

    const { result } = renderHook(() => useCreateInstructor(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.mutate({ name: 'Jane', surname: 'Smith', email: 'jane@example.com', phoneNumber: '987654321' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(capturedBody).toEqual({ name: 'Jane', surname: 'Smith', email: 'jane@example.com', phoneNumber: '987654321' });
  });

  it('sets isError when API returns an error', async () => {
    server.use(
      http.post('http://localhost:8081/api/instructors', () =>
        new HttpResponse(null, { status: 500 })
      )
    );

    const { result } = renderHook(() => useCreateInstructor(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.mutate({ name: 'Jane', surname: 'Smith', email: 'jane@example.com', phoneNumber: '987654321' });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useDeleteInstructorById', () => {
  it('calls DELETE /api/instructors/:id', async () => {
    let capturedId: string | undefined;

    server.use(
      http.delete('http://localhost:8081/api/instructors/:id', ({ params }) => {
        capturedId = params.id as string;
        return new HttpResponse(null, { status: 204 });
      })
    );

    const { result } = renderHook(() => useDeleteInstructorById(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.mutate('instructor-1');
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(capturedId).toBe('instructor-1');
  });
});
