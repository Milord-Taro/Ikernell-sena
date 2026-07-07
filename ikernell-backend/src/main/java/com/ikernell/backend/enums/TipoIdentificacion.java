package com.ikernell.backend.enums;

/**
 * Refleja el CHECK constraint de la tabla usuario:
 * CHECK (tipo_identificacion IN ('CC', 'CE', 'TI'))
 */
public enum TipoIdentificacion {
    CC,
    CE,
    TI
}
