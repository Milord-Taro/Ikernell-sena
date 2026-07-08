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

    @Column(name = "codigo_registro", nullable = false, length = 20)
    private String codigoRegistro;

    @Convert(converter = OperacionTrazabilidadConverter.class)
    @Column(name = "operacion", nullable = false, length = 20)
    private OperacionTrazabilidad operacion;

    @Column(name = "detalle", columnDefinition = "TEXT")
    private String detalle;

    @Column(name = "direccion_ip", length = 45)
    private String direccionIp;

    @Column(name = "fecha_evento", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaEvento = LocalDateTime.now();
}
