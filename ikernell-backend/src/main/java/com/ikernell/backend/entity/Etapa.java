package com.ikernell.backend.entity;

import com.ikernell.backend.converter.EstadoEtapaConverter;
import com.ikernell.backend.enums.EstadoEtapa;
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
@Table(name = "etapa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Etapa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_etapa")
    private Integer idEtapa;

    @Column(name = "codigo_etapa", nullable = false, length = 20, unique = true)
    private String codigoEtapa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_proyecto", nullable = false)
    private Proyecto proyecto;

    @Column(name = "nombre_etapa", nullable = false, length = 120)
    private String nombreEtapa;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "orden", nullable = false)
    private Integer orden;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDate fechaFin;

    @Convert(converter = EstadoEtapaConverter.class)
    @Column(name = "estado", nullable = false, length = 30)
    @Builder.Default
    private EstadoEtapa estado = EstadoEtapa.PENDIENTE;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}
