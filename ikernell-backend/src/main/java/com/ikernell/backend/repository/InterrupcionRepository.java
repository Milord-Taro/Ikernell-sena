package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Interrupcion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterrupcionRepository extends JpaRepository<Interrupcion, Integer> {

    Optional<Interrupcion> findByCodigoInterrupcion(String codigoInterrupcion);

    List<Interrupcion> findByActividad_IdActividad(Integer idActividad);
}
