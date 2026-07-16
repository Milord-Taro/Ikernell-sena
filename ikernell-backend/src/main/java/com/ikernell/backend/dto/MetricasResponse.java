package com.ikernell.backend.dto;

import java.util.List;

/**
 * CORREGIDO (B4 + B5): antes MetricasPage.tsx traía TODOS los proyectos,
 * actividades, errores, interrupciones, usuarios y mensajes de la
 * organización al navegador -- para CUALQUIER rol, incluido un
 * Desarrollador -- y calculaba ahí los conteos con .filter().length. Cada
 * visita al dashboard bajaba tablas completas solo para mostrar un
 * número. Ahora cada rol tiene su propio endpoint
 * (/api/metricas/coordinador|lider|desarrollador, protegidos con
 * @PreAuthorize), y los conteos/distribuciones se calculan con SQL
 * agregado (COUNT/GROUP BY) directamente en la base de datos.
 *
 * proyectosPorEstado y rankingErroresPorProyecto solo se llenan en la
 * respuesta de Coordinador (visión org-wide); para Líder/Desarrollador
 * quedan null y el frontend ya sabe no mostrarlos.
 */
public record MetricasResponse(
        List<MetricaTarjeta> cards,
        List<BarraDato> erroresPorSeveridad,
        List<BarraDato> erroresPorEstado,
        List<BarraDato> actividadesPorEstado,
        List<BarraDato> proyectosPorEstado,
        List<ItemRanking> rankingErroresPorProyecto,
        List<PuntoDiario> tendenciaFinalizadas,
        List<ItemFeed> feed) {
}
