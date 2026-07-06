package com.ikernell.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

/**
 * Se lanza cuando se incumple una regla de negocio explícita
 * (no un error de validación de formato, sino de lógica del dominio).
 */
public class BusinessException extends ResponseStatusException {

    public BusinessException(String mensaje) {
        super(HttpStatus.BAD_REQUEST, mensaje);
    }
}
