package com.ikernell.backend.util;

import java.util.UUID;

/**
 * Generador de códigos únicos legibles con prefijo, usado en entidades
 * que necesitan un código de negocio corto además del ID numérico (ej.
 * MensajeContacto.codigoMensaje, Trazabilidad.codigoRegistro).
 *
 * Antes esta lógica estaba duplicada como un one-liner suelto en cada
 * Service que la necesitaba. Ahora vive en un solo lugar.
 */
public final class GeneradorCodigos {

    private GeneradorCodigos() {
        // Clase de utilidad: no se instancia.
    }

    /**
     * Genera un código con el formato "PREFIJO-XXXXXXXX", donde XXXXXXXX
     * son 8 caracteres hexadecimales en mayúscula tomados de un UUID
     * aleatorio -- suficiente para evitar colisiones prácticas en este
     * dominio, sin necesitar una tabla de secuencia dedicada.
     *
     * Ejemplo: GeneradorCodigos.generar("MSG") -> "MSG-A3F9B21C"
     */
    public static String generar(String prefijo) {
        String sufijo = UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
        return prefijo + "-" + sufijo;
    }
}
