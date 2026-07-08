package com.ikernell.backend.entity;

import com.ikernell.backend.converter.NivelCriticidadConverter;
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

import java.time.LocalDateTime;

@Entity
@Table(name = "registro_error")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistroError {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_registro_error")
    private Integer idRegistroError;

    @Column(name = "codigo_registro_error", nullable = false, length = 20, unique = true)
    private String codigoRegistroError;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_actividad", nullable = false)
    private Actividad actividad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_error", nullable = false)
    private TipoError tipoError;

    @Column(name = "titulo", nullable = false, length = 100)
    private String titulo;

    @Column(name = "descripcion", nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Convert(converter = NivelCriticidadConverter.class)
    @Column(name = "severidad", nullable = false, length = 20)
    private NivelCriticidad severidad;

    @Column(name = "fecha_registro", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaRegistro = LocalDateTime.now();
}
