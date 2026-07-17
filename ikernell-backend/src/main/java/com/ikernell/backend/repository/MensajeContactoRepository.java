package com.ikernell.backend.repository;

import com.ikernell.backend.entity.MensajeContacto;
import com.ikernell.backend.enums.EstadoMensaje;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MensajeContactoRepository extends JpaRepository<MensajeContacto, Integer> {

    Optional<MensajeContacto> findByCodigoMensaje(String codigoMensaje);

    // Orden explícito por PK, por consistencia/defensa en profundidad --
    // el frontend (MensajesPage.tsx) ya reordena en cliente por
    // fechaEnvio, pero no conviene depender de que cada consumidor
    // futuro lo recuerde.
    List<MensajeContacto> findByEstadoOrderByIdMensajeContactoAsc(EstadoMensaje estado);

    List<MensajeContacto> findAllByOrderByIdMensajeContactoAsc();

    // Métrica (B4 + B5): "Mensajes no leídos" -- Coordinador.
    long countByEstado(EstadoMensaje estado);

    // Feed de actividad reciente -- acotado (Top 8) en la propia consulta.
    List<MensajeContacto> findTop8ByOrderByFechaEnvioDesc();
}
