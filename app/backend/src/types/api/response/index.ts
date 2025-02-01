import { ZodIssue } from "zod";

export type PaginationMeta = {
  available: number;
  pages: number;
  current_page: number;
  has_next: boolean;
  has_prev: boolean;
  links: {
    next: string | null;
    prev: string | null;
    self: string;
  };
};

// Paginated Success Response
export type PaginatedSuccessResponse<TData, TDataKey extends string> = {
  success: true;
  message: string;
  pagination: PaginationMeta;
} & Record<TDataKey, TData>;

// Unpaginated Success Response
export type UnpaginatedSuccessResponse<TData, TDataKey extends string> = {
  success: true;
  message: string;
} & Record<TDataKey, TData>;

// Error Response
export type ErrorResponse<TError> = {
  success: false;
  message: string;
  errors: TError[];
};

// Combined API Response
export type ApiResponse<
  TData,
  TError,
  TDataKey extends string,
  TRequirePagination extends boolean = false,
> = TRequirePagination extends true
  ? PaginatedSuccessResponse<TData, TDataKey> | ErrorResponse<TError>
  : UnpaginatedSuccessResponse<TData, TDataKey> | ErrorResponse<TError>;

export type ValidationErrorApiResponse = ErrorResponse<ZodIssue>;
