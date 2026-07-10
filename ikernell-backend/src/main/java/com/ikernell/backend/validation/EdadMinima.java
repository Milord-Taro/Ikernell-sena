package com.ikernell.backend.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Valida que una fecha de nacimiento (LocalDate) implique una edad mínima.
 * Reutilizable en cualquier DTO que tenga un campo de este tipo -- hoy
 * solo lo usa UsuarioRequest, pero no está atado a esa clase.
 *
 * Uso:
 *   @EdadMinima(value = 18, message = "El usuario debe ser mayor de edad.")
 *   private LocalDate fechaNacimiento;
 */
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EdadMinimaValidator.class)
public @interface EdadMinima {

    int value() default 18;

    String message() default "La edad calculada a partir de esta fecha no es válida.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
