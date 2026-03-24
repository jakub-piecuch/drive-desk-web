import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import { createWrapper } from '@/test/utils';
import { useCars, useCreateCar, useDeleteCarById } from './car.hooks';

vi.mock('@clerk/nextjs', () => ({
  useAuth: vi.fn(() => ({
    getToken: vi.fn().mockResolvedValue('mock-token'),
  })),
}));

describe('useCars', () => {
  it('fetches and returns car list', async () => {
    const { result } = renderHook(() => useCars(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data![0].make).toBe('Toyota');
  });

  it('sets isError when fetch fails', async () => {
    server.use(
      http.get('http://localhost:8081/api/cars', () => HttpResponse.error())
    );

    const { result } = renderHook(() => useCars(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.isError).toBe(true);
  });
});

describe('useCreateCar', () => {
  it('calls POST /api/cars with correct payload', async () => {
    let capturedBody: unknown = null;

    server.use(
      http.post('http://localhost:8081/api/cars', async ({ request }) => {
        capturedBody = await request.json();
        return HttpResponse.json({ id: 'new-id', make: 'Honda', model: 'Civic', registrationNumber: 'XY99ZZZ' }, { status: 201 });
      })
    );

    const { result } = renderHook(() => useCreateCar(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.mutate({ make: 'Honda', model: 'Civic', registrationNumber: 'XY99ZZZ' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(capturedBody).toEqual({ make: 'Honda', model: 'Civic', registrationNumber: 'XY99ZZZ' });
  });

  it('sets isError when API returns an error', async () => {
    server.use(
      http.post('http://localhost:8081/api/cars', () =>
        new HttpResponse(null, { status: 500 })
      )
    );

    const { result } = renderHook(() => useCreateCar(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.mutate({ make: 'Honda', model: 'Civic', registrationNumber: 'XY99ZZZ' });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useDeleteCarById', () => {
  it('calls DELETE /api/cars/:id', async () => {
    let capturedId: string | undefined;

    server.use(
      http.delete('http://localhost:8081/api/cars/:id', ({ params }) => {
        capturedId = params.id as string;
        return new HttpResponse(null, { status: 204 });
      })
    );

    const { result } = renderHook(() => useDeleteCarById(), { wrapper: createWrapper() });

    await act(async () => {
      result.current.mutate('car-1');
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(capturedId).toBe('car-1');
  });
});
