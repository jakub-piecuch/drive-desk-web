'use client';

import { RESOURCE_HOST } from '@/config/env.config';
import { useAuth } from '@clerk/nextjs';

export type RequestFn = (path: string, options?: RequestInit) => Promise<Response>;

export function useApiClient() {
  const { getToken } = useAuth();

  const request: RequestFn = async (path, options = {}) => {
    const token = await getToken();

    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${RESOURCE_HOST()}${path}`, { ...options, headers });

    if (response.status === 403) {
      throw new Error('No active organization. Please reload the page.');
    }

    return response;
  };

  return { request };
}
