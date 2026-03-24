import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:8081/api/cars', () => {
    return HttpResponse.json([
      { id: 'car-1', make: 'Toyota', model: 'Corolla', registrationNumber: 'AB12CDE' },
    ]);
  }),

  http.post('http://localhost:8081/api/cars', () => {
    return HttpResponse.json(
      { id: 'car-new', make: 'Honda', model: 'Civic', registrationNumber: 'XY99ZZZ' },
      { status: 201 }
    );
  }),

  http.delete('http://localhost:8081/api/cars/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('http://localhost:8081/api/instructors', () => {
    return HttpResponse.json([
      { id: 'instructor-1', name: 'John', surname: 'Doe', email: 'john@example.com', phoneNumber: '123456789' },
    ]);
  }),

  http.post('http://localhost:8081/api/instructors', () => {
    return HttpResponse.json(
      { id: 'instructor-new', name: 'Jane', surname: 'Smith', email: 'jane@example.com', phoneNumber: '987654321' },
      { status: 201 }
    );
  }),

  http.delete('http://localhost:8081/api/instructors/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('http://localhost:8081/api/trainees', () => {
    return HttpResponse.json([
      { id: 'trainee-1', name: 'Alice', surname: 'Brown', email: 'alice@example.com', phoneNumber: '111222333' },
    ]);
  }),

  http.post('http://localhost:8081/api/trainees', () => {
    return HttpResponse.json(
      { id: 'trainee-new', name: 'Bob', surname: 'Green', email: 'bob@example.com', phoneNumber: '444555666' },
      { status: 201 }
    );
  }),

  http.delete('http://localhost:8081/api/trainees/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.get('http://localhost:8081/api/lessons', () => {
    return HttpResponse.json({
      content: [
        {
          id: 'lesson-1',
          startTime: '2026-03-24T10:00:00',
          endTime: '2026-03-24T11:00:00',
          instructorId: 'instructor-1',
          traineeId: 'trainee-1',
          carId: 'car-1',
        },
      ],
      page: { size: 10, number: 0, totalElements: 1, totalPages: 1 },
    });
  }),
];
