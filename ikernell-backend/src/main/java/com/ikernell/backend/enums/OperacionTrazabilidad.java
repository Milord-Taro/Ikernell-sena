package com.ikernell.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum OperacionTrazabilidad {
    CREAR("Crear"),
    ACTUALIZAR("Actualizar"),
    INHABILITAR("Inhabilitar"),
    CAMBIAR_ESTADO("Cambiar Estado"),
    ASIGNAR("Asignar"),
    DESASIGNAR("Desasignar"),
    AUTENTICAR("Autenticar"),
    ELIMINAR("Eliminar");

    private final String valor;

    OperacionTrazabilidad(String valor) {
        this.valor = valor;
    }

    @JsonValue
    public String getValor() {
        return valor;
    }

    @JsonCreator
    public static OperacionTrazabilidad desdeValor(String valor) {
        for (OperacionTrazabilidad operacion : values()) {
            if (operacion.valor.equalsIgnoreCase(valor)) {
                return operacion;
            }
        }
        throw new IllegalArgumentException("Operación de trazabilidad no válida: '" + valor + "'.");
    }
}
