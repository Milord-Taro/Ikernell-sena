package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EspecialidadRepository extends JpaRepository<Especialidad, Integer> {

    Optional<Especialidad> findByCodigoEspecialidad(String codigoEspecialidad);

    Optional<Especialidad> findByNombreEspecialidadIgnoreCase(String nombreEspecialidad);

    List<Especialidad> findByActivoTrue();
}
