package com.ikernell.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EstadoMensaje {
    PENDIENTE("Pendiente"),
    LEIDO("Leído"),
    ATENDIDO("Atendido");

    private final String valor;

    EstadoMensaje(String valor) {
        this.valor = valor;
    }

    @JsonValue
    public String getValor() {
        return valor;
    }

    @JsonCreator
    public static EstadoMensaje desdeValor(String valor) {
        for (EstadoMensaje estado : values()) {
            if (estado.valor.equalsIgnoreCase(valor)) {
                return estado;
            }
        }
        throw new IllegalArgumentException(
                "Estado de mensaje no válido: '" + valor + "'. Valores permitidos: Pendiente, Leído, Atendido.");
    }
}
