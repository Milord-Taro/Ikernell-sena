package com.ikernell.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TipoNotificacion {
    ACTIVIDAD("Actividad"),
    PROYECTO("Proyecto"),
    ERROR("Error"),
    INTERRUPCION("Interrupción"),
    MENSAJE("Mensaje"),
    SISTEMA("Sistema");

    private final String valor;

    TipoNotificacion(String valor) {
        this.valor = valor;
    }

    @JsonValue
    public String getValor() {
        return valor;
    }

    @JsonCreator
    public static TipoNotificacion desdeValor(String valor) {
        for (TipoNotificacion tipo : values()) {
            if (tipo.valor.equalsIgnoreCase(valor)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException(
                "Tipo de notificación no válido: '" + valor + "'. Valores permitidos: "
                        + "Actividad, Proyecto, Error, Interrupción, Mensaje, Sistema.");
    }
}
