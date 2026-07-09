package com.ikernell.backend.report;

/**
 * No se persiste en base de datos -- es solo un parámetro de la API para
 * elegir en qué formato se genera el reporte.
 */
public enum FormatoReporte {
    TXT,
    CSV,
    PDF,
    EXCEL
}
