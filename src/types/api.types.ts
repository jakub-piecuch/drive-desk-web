export interface PaginatedResponse<T> {
  content: T[];
  page: {
    limit: number;
    page: number;
    totalElements: number;
    totalPages: number;
  };
}