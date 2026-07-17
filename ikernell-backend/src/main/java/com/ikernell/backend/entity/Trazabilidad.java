package com.ikernell.backend.entity;

import com.ikernell.backend.converter.OperacionTrazabilidadConverter;
import com.ikernell.backend.enums.OperacionTrazabilidad;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "trazabilidad")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trazabilidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_trazabilidad")
    private Integer idTrazabilidad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "entidad", nullable = false, length = 100)
    private String entidad;

    // Copia textual del código funcional del recurso auditado -- desde que
    // Etapa/Actividad/RegistroError/Interrupcion generan códigos
    // jerárquicos (heredan el prefijo del padre), pueden superar los 20
    // caracteres originales (ej. "PRY-001-ETP-01-ACT-01-ERR-01" = 28).
    @Column(name = "codigo_registro", nullable = false, length = 60)
    private String codigoRegistro;

    @Convert(converter = OperacionTrazabilidadConverter.class)
    @Column(name = "operacion", nullable = false, length = 20)
    private OperacionTrazabilidad operacion;

    @Column(name = "detalle", columnDefinition = "TEXT")
    private String detalle;

    // CORREGIDO (C7): antes se recalculaba en cada lectura, recorriendo
    // todo el historial del recurso en memoria (ver
    // TrazabilidadQueryService antes de este cambio). Ahora
    // TrazabilidadService.registrar() lo calcula una sola vez, al crear
    // el evento -- ver V2__trazabilidad_detalle_anterior.sql.
    @Column(name = "detalle_anterior", columnDefinition = "TEXT")
    private String detalleAnterior;

    @Column(name = "direccion_ip", length = 45)
    private String direccionIp;

    @Column(name = "fecha_evento", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaEvento = LocalDateTime.now();
}
