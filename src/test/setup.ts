import '@testing-library/jest-dom';
import { server } from './mocks/server';

process.env.NEXT_PUBLIC_RESOURCE_HOST = 'http://localhost:8081';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
