package com.ikernell.backend.repository;

import com.ikernell.backend.entity.MensajeContacto;
import com.ikernell.backend.enums.EstadoMensaje;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MensajeContactoRepository extends JpaRepository<MensajeContacto, Integer> {

    Optional<MensajeContacto> findByCodigoMensaje(String codigoMensaje);

    List<MensajeContacto> findByEstado(EstadoMensaje estado);
}
