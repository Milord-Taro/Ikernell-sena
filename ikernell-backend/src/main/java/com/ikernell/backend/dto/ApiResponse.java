package com.ikernell.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * Envoltorio estándar de respuesta exitosa para toda la API.
 * Los errores NO usan esta clase, usan {@link com.ikernell.backend.exception.ApiError}.
 */
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private final LocalDateTime timestamp = LocalDateTime.now();
    private final boolean success;
    private final String message;
    private final T data;

    private ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static <T> ApiResponse<T> of(T data) {
        return new ApiResponse<>(true, null, data);
    }

    public static <T> ApiResponse<T> of(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    public static ApiResponse<Void> of(String message) {
        return new ApiResponse<>(true, message, null);
    }
}
