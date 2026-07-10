package com.ikernell.backend.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.Period;

public class EdadMinimaValidator implements ConstraintValidator<EdadMinima, LocalDate> {

    private int edadMinima;

    @Override
    public void initialize(EdadMinima constraintAnnotation) {
        this.edadMinima = constraintAnnotation.value();
    }

    @Override
    public boolean isValid(LocalDate fecha, ConstraintValidatorContext context) {
        // @NotNull ya se encarga del caso nulo -- no lo duplicamos aquí,
        // así esta anotación se puede combinar libremente con @NotNull
        // sin que ambas reporten el mismo problema dos veces.
        if (fecha == null) {
            return true;
        }

        int edad = Period.between(fecha, LocalDate.now()).getYears();
        return edad >= edadMinima;
    }
}
