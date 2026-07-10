package com.ikernell.backend.entity;

import com.ikernell.backend.converter.EstadoActividadConverter;
import com.ikernell.backend.converter.NivelCriticidadConverter;
import com.ikernell.backend.enums.EstadoActividad;
import com.ikernell.backend.enums.NivelCriticidad;
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

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "actividad")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_actividad")
    private Integer idActividad;

    @Column(name = "codigo_actividad", nullable = false, length = 20, unique = true)
    private String codigoActividad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_etapa", nullable = false)
    private Etapa etapa;

    // Nullable a propósito: NULL mientras estado = PENDIENTE_DE_ASIGNACION.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "nombre_actividad", nullable = false, length = 150)
    private String nombreActividad;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Convert(converter = NivelCriticidadConverter.class)
    @Column(name = "prioridad", nullable = false, length = 20)
    private NivelCriticidad prioridad;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Convert(converter = EstadoActividadConverter.class)
    @Column(name = "estado", nullable = false, length = 30)
    @Builder.Default
    private EstadoActividad estado = EstadoActividad.PENDIENTE_DE_ASIGNACION;

    /** NUEVO: se llena solo cuando cambiarEstado() mueve la actividad a Finalizada. */
    @Column(name = "fecha_finalizacion")
    private LocalDateTime fechaFinalizacion;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}
