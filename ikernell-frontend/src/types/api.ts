// Refleja com.ikernell.backend.dto.ApiResponse<T> y
// com.ikernell.backend.exception.ApiError del backend.

export interface ApiResponse<T> {
  timestamp: string;
  success: boolean;
  message?: string;
  data: T;
}

export interface CampoError {
  campo: string;
  mensaje: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  errores?: CampoError[];
}

/**
 * Error tipado que lanza el cliente HTTP (services/api.ts) cuando el
 * backend responde con un ApiError. Permite acceder al status y a los
 * errores de campo (validación) sin parsear el mensaje a mano.
 */
export class ApiRequestError extends Error {
  status: number;
  errores?: CampoError[];

  constructor(apiError: ApiError) {
    super(apiError.message);
    this.name = 'ApiRequestError';
    this.status = apiError.status;
    this.errores = apiError.errores;
  }
}
