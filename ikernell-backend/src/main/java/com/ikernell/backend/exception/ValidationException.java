package com.ikernell.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * Se lanza para validaciones manuales de negocio que no cubre Bean Validation
 * (@Valid), ej: reglas cruzadas entre varios campos. Para errores de @Valid,
 * el GlobalExceptionHandler ya los captura directamente vía
 * MethodArgumentNotValidException.
 */
public class ValidationException extends ResponseStatusException {

    private final List<ApiError.CampoError> errores;

    public ValidationException(String mensaje) {
        super(HttpStatus.BAD_REQUEST, mensaje);
        this.errores = null;
    }

    public ValidationException(String mensaje, List<ApiError.CampoError> errores) {
        super(HttpStatus.BAD_REQUEST, mensaje);
        this.errores = errores;
    }

    public List<ApiError.CampoError> getErrores() {
        return errores;
    }
}
