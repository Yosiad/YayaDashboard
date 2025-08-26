export interface ApiError {
    message: string;
    status?: number;
    code?: string;
  }
  
  export interface SearchRequest {
    query: string;
    page?: number;
  }
  
  export interface PaginationParams {
    page: number;
  }