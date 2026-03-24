import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/mocks/server';
import { createWrapper } from '@/test/utils';
import { useApiClient } from './useApiClient';

vi.mock('@clerk/nextjs', () => ({
  useAuth: vi.fn(() => ({
    getToken: vi.fn().mockResolvedValue('mock-token'),
  })),
}));

describe('useApiClient', () => {
  it('attaches Authorization Bearer token to every request', async () => {
    let capturedAuth: string | null = null;

    server.use(
      http.get('http://localhost:8081/api/test', ({ request }) => {
        capturedAuth = request.headers.get('Authorization');
        return HttpResponse.json({});
      })
    );

    const { result } = renderHook(() => useApiClient(), { wrapper: createWrapper() });
    await result.current.request('/api/test');

    expect(capturedAuth).toBe('Bearer mock-token');
  });

  it('sets Content-Type to application/json', async () => {
    let capturedContentType: string | null = null;

    server.use(
      http.get('http://localhost:8081/api/test', ({ request }) => {
        capturedContentType = request.headers.get('Content-Type');
        return HttpResponse.json({});
      })
    );

    const { result } = renderHook(() => useApiClient(), { wrapper: createWrapper() });
    await result.current.request('/api/test');

    expect(capturedContentType).toBe('application/json');
  });

  it('throws an error on 403 response', async () => {
    server.use(
      http.get('http://localhost:8081/api/test', () =>
        new HttpResponse(null, { status: 403 })
      )
    );

    const { result } = renderHook(() => useApiClient(), { wrapper: createWrapper() });

    await expect(result.current.request('/api/test')).rejects.toThrow(
      'No active organization. Please reload the page.'
    );
  });

  it('returns response for non-403 errors without throwing', async () => {
    server.use(
      http.get('http://localhost:8081/api/test', () =>
        new HttpResponse(null, { status: 404 })
      )
    );

    const { result } = renderHook(() => useApiClient(), { wrapper: createWrapper() });
    const response = await result.current.request('/api/test');

    expect(response.status).toBe(404);
  });
});
