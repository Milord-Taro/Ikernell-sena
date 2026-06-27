package com.ikernell_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ResourceNotFoundException extends ResponseStatusException {

    public ResourceNotFoundException(String mensaje) {
        super(HttpStatus.NOT_FOUND, mensaje);
    }
}
