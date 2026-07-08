package com.ikernell.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EstadoActividad {
    PENDIENTE_DE_ASIGNACION("Pendiente de asignación"),
    PENDIENTE("Pendiente"),
    EN_DESARROLLO("En desarrollo"),
    FINALIZADA("Finalizada"),
    CANCELADA("Cancelada");

    private final String valor;

    EstadoActividad(String valor) {
        this.valor = valor;
    }

    @JsonValue
    public String getValor() {
        return valor;
    }

    @JsonCreator
    public static EstadoActividad desdeValor(String valor) {
        for (EstadoActividad estado : values()) {
            if (estado.valor.equalsIgnoreCase(valor)) {
                return estado;
            }
        }
        throw new IllegalArgumentException(
                "Estado de actividad no válido: '" + valor + "'. Valores permitidos: "
                        + "Pendiente de asignación, Pendiente, En desarrollo, Finalizada, Cancelada.");
    }
}
