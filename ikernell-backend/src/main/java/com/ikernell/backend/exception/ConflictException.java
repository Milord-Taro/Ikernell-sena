package com.ikernell.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

/**
 * Se lanza cuando la operación viola una restricción de unicidad
 * o entra en conflicto con el estado actual del recurso
 * (ej: código de rol duplicado).
 */
public class ConflictException extends ResponseStatusException {

    public ConflictException(String mensaje) {
        super(HttpStatus.CONFLICT, mensaje);
    }
}
