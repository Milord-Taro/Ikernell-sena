package com.ikernell.backend.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Estructura estándar de error para toda la API. La construye el
 * GlobalExceptionHandler, nunca se lanza directamente.
 */
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {

    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status;
    private final String error;
    private final String message;
    private final String path;
    private final List<CampoError> errores;

    private ApiError(HttpStatus status, String message, String path, List<CampoError> errores) {
        this.status = status.value();
        this.error = status.getReasonPhrase();
        this.message = message;
        this.path = path;
        this.errores = errores;
    }

    public static ApiError of(HttpStatus status, String message, String path) {
        return new ApiError(status, message, path, null);
    }

    public static ApiError of(HttpStatus status, String message, String path, List<CampoError> errores) {
        return new ApiError(status, message, path, errores);
    }

    /**
     * Error puntual de un campo específico, usado en validaciones (@Valid o manuales).
     */
    public record CampoError(String campo, String mensaje) {
    }
}
