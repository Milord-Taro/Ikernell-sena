package com.ikernell_backend.repository;

import com.ikernell_backend.entity.MensajeContacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MensajeContactoRepository
        extends JpaRepository<MensajeContacto, Integer> {

    MensajeContacto findTopByOrderByIdMensajeDesc();
}
