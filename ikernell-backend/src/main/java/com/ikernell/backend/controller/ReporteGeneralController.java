package com.ikernell.backend.controller;

import com.ikernell.backend.report.FormatoReporte;
import com.ikernell.backend.report.ReporteGeneralService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Reporte general a nivel de organización -- a diferencia de
 * ReporteController (por proyecto, reservado a Líder de Proyecto), este
 * consolida todos los proyectos y es exclusivo de Coordinador. Separado en
 * su propio controller porque el rol autorizado es distinto.
 */
@RestController
@RequestMapping("/api/reportes")
@RequiredArgsConstructor
@PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
public class ReporteGeneralController {

    private final ReporteGeneralService reporteGeneralService;

    @GetMapping("/general")
    public ResponseEntity<byte[]> reporteGeneral(
            @RequestParam(name = "formato", defaultValue = "TXT") FormatoReporte formato) {

        byte[] contenido = reporteGeneralService.generar(formato);
        String nombreArchivo = reporteGeneralService.nombreArchivo(formato);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(reporteGeneralService.contentType(formato)))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment().filename(nombreArchivo).build().toString())
                .body(contenido);
    }
}
