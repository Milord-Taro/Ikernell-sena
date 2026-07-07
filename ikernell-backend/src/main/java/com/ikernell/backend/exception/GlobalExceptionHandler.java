package com.ikernell.backend.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.access.AccessDeniedException;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Captura ResourceNotFoundException, BusinessException, ConflictException,
     * UnauthorizedException, ForbiddenException y ValidationException, ya que
     * todas heredan de ResponseStatusException.
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiError> manejarResponseStatusException(
            ResponseStatusException ex,
            HttpServletRequest request) {

        List<ApiError.CampoError> errores =
                (ex instanceof ValidationException ve) ? ve.getErrores() : null;

        ApiError error = ApiError.of(
                HttpStatus.valueOf(ex.getStatusCode().value()),
                ex.getReason(),
                request.getRequestURI(),
                errores);

        return ResponseEntity.status(ex.getStatusCode()).body(error);
    }

    /**
     * Captura los errores de Bean Validation (@Valid) sobre los DTOs
     * en los Controllers, devolviendo el detalle campo por campo.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> manejarValidacionBean(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {

        List<ApiError.CampoError> errores = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fe -> new ApiError.CampoError(fe.getField(), fe.getDefaultMessage()))
                .toList();

        ApiError error = ApiError.of(
                HttpStatus.BAD_REQUEST,
                "Error de validación en los datos enviados.",
                request.getRequestURI(),
                errores);

        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler({
            AuthorizationDeniedException.class,
            AccessDeniedException.class
    })
    public ResponseEntity<ApiError> manejarAccesoDenegado(
            Exception ex,
            HttpServletRequest request) {

        ApiError error = ApiError.of(
                HttpStatus.FORBIDDEN,
                "No tiene permisos para realizar esta operación.",
                request.getRequestURI());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }


    /**
     * Cualquier excepción no controlada explícitamente cae aquí como 500,
     * evitando exponer detalles internos del stacktrace al cliente.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> manejarExcepcionGeneral(
            Exception ex,
            HttpServletRequest request) {

        ApiError error = ApiError.of(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Ocurrió un error inesperado en el servidor.",
                request.getRequestURI());

        return ResponseEntity.internalServerError().body(error);
    }
}


