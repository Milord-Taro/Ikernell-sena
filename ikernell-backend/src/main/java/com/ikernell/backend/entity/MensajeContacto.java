package com.ikernell.backend.entity;

import com.ikernell.backend.converter.EstadoMensajeConverter;
import com.ikernell.backend.enums.EstadoMensaje;
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
@Table(name = "mensaje_contacto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MensajeContacto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mensaje_contacto")
    private Integer idMensajeContacto;

    @Column(name = "codigo_mensaje", nullable = false, length = 20, unique = true)
    private String codigoMensaje;

    @Column(name = "nombre_remitente", nullable = false, length = 120)
    private String nombreRemitente;

    @Column(name = "correo_electronico", nullable = false, length = 150)
    private String correoElectronico;

    @Column(name = "asunto", nullable = false, length = 150)
    private String asunto;

    @Column(name = "detalle", nullable = false, columnDefinition = "TEXT")
    private String detalle;

    @Convert(converter = EstadoMensajeConverter.class)
    @Column(name = "estado", nullable = false, length = 30)
    @Builder.Default
    private EstadoMensaje estado = EstadoMensaje.PENDIENTE;

    @Column(name = "respuesta", columnDefinition = "TEXT")
    private String respuesta;

    // Nullable: solo se asigna cuando el Coordinador atiende el mensaje.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_responsable")
    private Usuario responsable;

    @Column(name = "fecha_envio", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime fechaEnvio = LocalDateTime.now();

    @Column(name = "fecha_atencion")
    private LocalDateTime fechaAtencion;
}
