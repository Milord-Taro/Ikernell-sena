package com.ikernell.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Refleja el CHECK constraint agregado a registro_error:
 * CHECK (estado IN ('Abierto', 'En progreso', 'Resuelto', 'Descartado'))
 *
 * Ciclo de vida simple, sin sub-estados: un error nace Abierto, alguien
 * lo toma (En progreso), y termina en Resuelto (se arregló) o Descartado
 * (no era un bug real / no se va a arreglar). Sin restricción de rol
 * para cambiarlo -- ver RegistroErrorService.cambiarEstado().
 */
public enum EstadoRegistroError {
    ABIERTO("Abierto"),
    EN_PROGRESO("En progreso"),
    RESUELTO("Resuelto"),
    DESCARTADO("Descartado");

    private final String valor;

    EstadoRegistroError(String valor) {
        this.valor = valor;
    }

    @JsonValue
    public String getValor() {
        return valor;
    }

    @JsonCreator
    public static EstadoRegistroError desdeValor(String valor) {
        for (EstadoRegistroError estado : values()) {
            if (estado.valor.equalsIgnoreCase(valor)) {
                return estado;
            }
        }
        throw new IllegalArgumentException(
                "Estado de registro de error no válido: '" + valor + "'. Valores permitidos: "
                        + "Abierto, En progreso, Resuelto, Descartado.");
    }
}
