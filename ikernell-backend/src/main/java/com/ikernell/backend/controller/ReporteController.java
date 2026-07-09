package com.ikernell.backend.controller;

import com.ikernell.backend.report.FormatoReporte;
import com.ikernell.backend.report.ReporteActividadesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Reportes son responsabilidad del Líder de Proyecto (caso de estudio:
 * "generar reportes: de interrupciones del proyecto y de reportes de
 * actividades por proyecto"). El frontend solo dispara la descarga; el
 * archivo se genera completo en el backend.
 */
@RestController
@RequestMapping("/api/reportes")
@RequiredArgsConstructor
@PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
public class ReporteController {

    private final ReporteActividadesService reporteActividadesService;

    @GetMapping("/actividades-por-proyecto/{idProyecto}")
    public ResponseEntity<byte[]> reporteActividadesPorProyecto(
            @PathVariable Integer idProyecto,
            @RequestParam(name = "formato", defaultValue = "TXT") FormatoReporte formato) {

        byte[] contenido = reporteActividadesService.generar(idProyecto, formato);
        String nombreArchivo = reporteActividadesService.nombreArchivo(idProyecto, formato);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(reporteActividadesService.contentType(formato)))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment().filename(nombreArchivo).build().toString())
                .body(contenido);
    }
}
