package com.ikernell.backend.repository;

import com.ikernell.backend.entity.MensajeContacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MensajeContactoRepository
        extends JpaRepository<MensajeContacto, Integer> {

    MensajeContacto findTopByOrderByIdMensajeDesc();
}
