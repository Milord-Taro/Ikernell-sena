package com.ikernell.backend.controller;

import com.ikernell.backend.dto.ApiResponse;
import com.ikernell.backend.dto.MetricasResponse;
import com.ikernell.backend.entity.Usuario;
import com.ikernell.backend.service.AutorizacionProyectoService;
import com.ikernell.backend.service.MetricasService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * CORREGIDO (B5): un endpoint POR ROL, cada uno con su propio
 * @PreAuthorize -- antes MetricasPage.tsx pedía datos org-wide
 * (listarProyectos(), listarTodasLasActividades(), etc, ya abiertos a
 * cualquier autenticado) y filtraba en el navegador según el rol de
 * quien había iniciado sesión. Eso significa que ese filtrado dependía
 * 100% de que el frontend se comportara -- un Desarrollador que
 * inspeccionara la petición de red igual podía ver los datos org-wide
 * completos que el backend sí le había mandado. Acá cada rol solo puede
 * llamar a SU propio endpoint, reforzado por Spring Security, no solo
 * por la UI.
 */
@RestController
@RequestMapping("/api/metricas")
@RequiredArgsConstructor
public class MetricasController {

    private final MetricasService metricasService;
    private final AutorizacionProyectoService autorizacionProyectoService;

    @GetMapping("/coordinador")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).COORDINADOR)")
    public ResponseEntity<ApiResponse<MetricasResponse>> coordinador() {
        return ResponseEntity.ok(ApiResponse.of(metricasService.coordinador()));
    }

    @GetMapping("/lider")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).LIDER_PROYECTO)")
    public ResponseEntity<ApiResponse<MetricasResponse>> lider(Authentication authentication) {
        Usuario usuario = autorizacionProyectoService.buscarUsuarioOFallar(authentication.getName());
        return ResponseEntity.ok(ApiResponse.of(metricasService.lider(usuario.getIdUsuario())));
    }

    @GetMapping("/desarrollador")
    @PreAuthorize("hasRole(T(com.ikernell.backend.constants.RolConstantes).DESARROLLADOR)")
    public ResponseEntity<ApiResponse<MetricasResponse>> desarrollador(Authentication authentication) {
        Usuario usuario = autorizacionProyectoService.buscarUsuarioOFallar(authentication.getName());
        return ResponseEntity.ok(ApiResponse.of(metricasService.desarrollador(usuario.getIdUsuario())));
    }
}
