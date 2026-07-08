package com.ikernell.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Reutilizable: refleja tanto actividad.prioridad como registro_error.severidad
 * (Sprint 5) -- ambas columnas usan exactamente el mismo set de valores
 * CHECK (... IN ('Baja', 'Media', 'Alta', 'Crítica')).
 */
public enum NivelCriticidad {
    BAJA("Baja"),
    MEDIA("Media"),
    ALTA("Alta"),
    CRITICA("Crítica");

    private final String valor;

    NivelCriticidad(String valor) {
        this.valor = valor;
    }

    @JsonValue
    public String getValor() {
        return valor;
    }

    @JsonCreator
    public static NivelCriticidad desdeValor(String valor) {
        for (NivelCriticidad nivel : values()) {
            if (nivel.valor.equalsIgnoreCase(valor)) {
                return nivel;
            }
        }
        throw new IllegalArgumentException(
                "Nivel no válido: '" + valor + "'. Valores permitidos: Baja, Media, Alta, Crítica.");
    }
}
