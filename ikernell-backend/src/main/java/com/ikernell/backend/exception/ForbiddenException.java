package com.ikernell.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

/**
 * Se lanza cuando el usuario está autenticado correctamente pero
 * no tiene el rol/permiso necesario para la operación solicitada.
 */
public class ForbiddenException extends ResponseStatusException {

    public ForbiddenException(String mensaje) {
        super(HttpStatus.FORBIDDEN, mensaje);
    }
}
