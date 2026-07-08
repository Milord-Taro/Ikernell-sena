package com.ikernell.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Refleja el CHECK constraint de asignacion_proyecto.rol_proyecto:
 * CHECK (rol_proyecto IN ('Líder', 'Desarrollador'))
 *
 * NO confundir con el Rol organizacional del usuario (RolConstantes /
 * tabla rol: Coordinador, Líder de Proyecto, Desarrollador). Este es el
 * rol que el usuario tiene DENTRO de un proyecto puntual — un
 * Desarrollador organizacional puede ser el Líder de un proyecto
 * específico si así se le asigna.
 */
public enum RolProyecto {
    LIDER("Líder"),
    DESARROLLADOR("Desarrollador");

    private final String valor;

    RolProyecto(String valor) {
        this.valor = valor;
    }

    @JsonValue
    public String getValor() {
        return valor;
    }

    @JsonCreator
    public static RolProyecto desdeValor(String valor) {
        for (RolProyecto rol : values()) {
            if (rol.valor.equalsIgnoreCase(valor)) {
                return rol;
            }
        }
        throw new IllegalArgumentException(
                "Rol de proyecto no válido: '" + valor + "'. Valores permitidos: Líder, Desarrollador.");
    }
}
