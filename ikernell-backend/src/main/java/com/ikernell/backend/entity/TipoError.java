package com.ikernell.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tipo_error")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoError {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_error")
    private Integer idTipoError;

    @Column(name = "codigo_tipo_error", nullable = false, length = 20, unique = true)
    private String codigoTipoError;

    @Column(name = "nombre_tipo_error", nullable = false, length = 100, unique = true)
    private String nombreTipoError;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "activo", nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaCreacion = LocalDateTime.now();
}
