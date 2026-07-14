package com.ikernell.backend.entity;

import com.ikernell.backend.converter.EstadoRegistroErrorConverter;
import com.ikernell.backend.converter.NivelCriticidadConverter;
import com.ikernell.backend.enums.EstadoRegistroError;
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

    @Column(name = "codigo_registro_error", nullable = false, length = 50, unique = true)
    private String codigoRegistroError;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_actividad", nullable = false)
    private Actividad actividad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_error", nullable = false)
    private TipoError tipoError;

    /** NUEVO: quién lo creó -- el propio desarrollador, o el Líder si lo registró él. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_creador")
    private Usuario usuarioCreador;

    @Column(name = "titulo", nullable = false, length = 100)
    private String titulo;

    @Column(name = "descripcion", nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    @Convert(converter = NivelCriticidadConverter.class)
    @Column(name = "severidad", nullable = false, length = 20)
    private NivelCriticidad severidad;

    /** NUEVO: ciclo de vida Abierto -> En progreso -> Resuelto/Descartado. */
    @Convert(converter = EstadoRegistroErrorConverter.class)
    @Column(name = "estado", nullable = false, length = 30)
    private EstadoRegistroError estado;

    /** NUEVO: cómo se resolvió o por qué se descartó -- opcional, se limpia si vuelve a Abierto/En progreso. */
    @Column(name = "nota_resolucion", columnDefinition = "TEXT")
    private String notaResolucion;

    @Column(name = "fecha_registro", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaRegistro = LocalDateTime.now();
}
