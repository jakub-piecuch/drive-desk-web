import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import { createWrapper } from '@/test/utils';
import { useTrainees, useCreateTrainee, useDeleteTraineeById } from './trainee.hooks';

vi.mock('@clerk/nextjs', () => ({
  useAuth: vi.fn(() => ({
    getToken: vi.fn().mockResolvedValue('mock-token'),
  })),
}));

describe('useTrainees', () => {
  it('fetches and returns trainee list', async () => {
    const { result } = renderHook(() => useTrainees(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data![0].name).toBe('Alice');
    expect(result.current.data![0].surname).toBe('Brown');
  });

  it('sets isError when fetch fails', async () => {
    server.use(
      http.get('http://localhost:8081/api/trainees', () => HttpResponse.error())
    );

    const { result } = renderHook(() => useTrainees(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(true);
  });
});

describe('useCreateTrainee', () => {
  it('calls POST /api/trainees with correct payload', async () => {
    let capturedBody: unknown = null;

    server.use(
      http.post('http://localhost:8081/api/trainees', async ({ request }) => {
        capturedBody = await request.json();
        return HttpResponse.json(
          { id: 'trainee-new', name: 'Bob', surname: 'Green', email: 'bob@example.com', phoneNumber: '444555666' },
          { status: 201 }
        );
      })
    );

    const { result } = renderHook(() => useCreateTrainee(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.mutate({ name: 'Bob', surname: 'Green', email: 'bob@example.com', phoneNumber: '444555666' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(capturedBody).toEqual({ name: 'Bob', surname: 'Green', email: 'bob@example.com', phoneNumber: '444555666' });
  });

  it('sets isError when API returns an error', async () => {
    server.use(
      http.post('http://localhost:8081/api/trainees', () =>
        new HttpResponse(null, { status: 500 })
      )
    );

    const { result } = renderHook(() => useCreateTrainee(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.mutate({ name: 'Bob', surname: 'Green', email: 'bob@example.com', phoneNumber: '444555666' });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useDeleteTraineeById', () => {
  it('calls DELETE /api/trainees/:id', async () => {
    let capturedId: string | undefined;

    server.use(
      http.delete('http://localhost:8081/api/trainees/:id', ({ params }) => {
        capturedId = params.id as string;
        return new HttpResponse(null, { status: 204 });
      })
    );

    const { result } = renderHook(() => useDeleteTraineeById(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.mutate('trainee-1');
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(capturedId).toBe('trainee-1');
  });
});
