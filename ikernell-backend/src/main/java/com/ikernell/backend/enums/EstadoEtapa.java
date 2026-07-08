package com.ikernell.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Refleja CHECK (estado IN ('Pendiente', 'En ejecución', 'Finalizada')) de etapa.
 */
public enum EstadoEtapa {
    PENDIENTE("Pendiente"),
    EN_EJECUCION("En ejecución"),
    FINALIZADA("Finalizada");

    private final String valor;

    EstadoEtapa(String valor) {
        this.valor = valor;
    }

    @JsonValue
    public String getValor() {
        return valor;
    }

    @JsonCreator
    public static EstadoEtapa desdeValor(String valor) {
        for (EstadoEtapa estado : values()) {
            if (estado.valor.equalsIgnoreCase(valor)) {
                return estado;
            }
        }
        throw new IllegalArgumentException(
                "Estado de etapa no válido: '" + valor + "'. Valores permitidos: "
                        + "Pendiente, En ejecución, Finalizada.");
    }
}
