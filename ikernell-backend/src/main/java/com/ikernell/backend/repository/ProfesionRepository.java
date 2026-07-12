package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Profesion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProfesionRepository extends JpaRepository<Profesion, Integer> {

    Optional<Profesion> findByCodigoProfesion(String codigoProfesion);

    Optional<Profesion> findByNombreProfesionIgnoreCase(String nombreProfesion);

    // Orden explícito por PK: sin esto, un UPDATE de "activo" puede
    // reubicar la fila y reordenar la tabla del catálogo en el frontend.
    List<Profesion> findByActivoTrueOrderByIdProfesionAsc();

    List<Profesion> findAllByOrderByIdProfesionAsc();
}
