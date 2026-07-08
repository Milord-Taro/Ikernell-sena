package com.ikernell.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Refleja el CHECK constraint de la tabla proyecto:
 * CHECK (estado IN ('Planeación', 'En ejecución', 'Finalizado', 'Suspendido', 'Cancelado'))
 *
 * El nombre de la constante Java no puede tener tildes/espacios, así que
 * se guarda el valor exacto que espera la DB en "valor", y un
 * AttributeConverter (EstadoProyectoConverter) traduce en ambas direcciones.
 */
public enum EstadoProyecto {
    PLANEACION("Planeación"),
    EN_EJECUCION("En ejecución"),
    FINALIZADO("Finalizado"),
    SUSPENDIDO("Suspendido"),
    CANCELADO("Cancelado");

    private final String valor;

    EstadoProyecto(String valor) {
        this.valor = valor;
    }

    @JsonValue
    public String getValor() {
        return valor;
    }

    @JsonCreator
    public static EstadoProyecto desdeValor(String valor) {
        for (EstadoProyecto estado : values()) {
            if (estado.valor.equalsIgnoreCase(valor)) {
                return estado;
            }
        }
        throw new IllegalArgumentException(
                "Estado de proyecto no válido: '" + valor + "'. Valores permitidos: "
                        + "Planeación, En ejecución, Finalizado, Suspendido, Cancelado.");
    }
}
