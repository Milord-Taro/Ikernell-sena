package com.ikernell.backend.entity;

import com.ikernell.backend.converter.TipoNotificacionConverter;
import com.ikernell.backend.enums.TipoNotificacion;
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
@Table(name = "notificacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_notificacion")
    private Integer idNotificacion;

    @Column(name = "codigo_notificacion", nullable = false, length = 20, unique = true)
    private String codigoNotificacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "titulo", nullable = false, length = 150)
    private String titulo;

    @Column(name = "detalle", nullable = false, columnDefinition = "TEXT")
    private String detalle;

    @Convert(converter = TipoNotificacionConverter.class)
    @Column(name = "tipo", nullable = false, length = 30)
    private TipoNotificacion tipo;

    @Column(name = "leida", nullable = false)
    @Builder.Default
    private Boolean leida = false;

    @Column(name = "url_destino", length = 255)
    private String urlDestino;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaCreacion = LocalDateTime.now();

    @Column(name = "fecha_lectura")
    private LocalDateTime fechaLectura;
}
