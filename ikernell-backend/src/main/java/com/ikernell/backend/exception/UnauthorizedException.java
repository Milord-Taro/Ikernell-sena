package com.ikernell.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

/**
 * Se lanza cuando la solicitud requiere autenticación y no se proporcionó
 * o el token es inválido/expiró.
 */
public class UnauthorizedException extends ResponseStatusException {

    public UnauthorizedException(String mensaje) {
        super(HttpStatus.UNAUTHORIZED, mensaje);
    }
}
