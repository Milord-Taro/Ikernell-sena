package com.ikernell.backend.dto;

import com.ikernell.backend.enums.OperacionTrazabilidad;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrazabilidadResponse {

    private Integer idTrazabilidad;
    private UsuarioResumenResponse usuario;
    private String entidad;
    private String codigoRegistro;
    private OperacionTrazabilidad operacion;
    private String detalle;
    /**
     * NUEVO: snapshot JSON del evento anterior sobre el MISMO recurso
     * (misma entidad + código), si existe -- permite al frontend mostrar
     * un diff "antes -> después" en vez de solo el estado final. Null si
     * es el primer evento conocido de ese recurso, o si el detalle no es
     * JSON (ej. mensajes de auditoría antiguos en texto plano). Se calcula
     * en TrazabilidadQueryService, no viene de la columna "detalle".
     */
    private String detalleAnterior;
    private String direccionIp;
    private LocalDateTime fechaEvento;
}
