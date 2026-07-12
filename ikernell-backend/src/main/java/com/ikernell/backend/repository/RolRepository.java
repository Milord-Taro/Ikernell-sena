package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol, Integer> {

    Optional<Rol> findByCodigoRol(String codigoRol);

    Optional<Rol> findByNombreRolIgnoreCase(String nombreRol);

    // Orden explícito por PK: sin esto, un UPDATE de "activo" puede
    // reubicar la fila y reordenar la tabla del catálogo en el frontend.
    List<Rol> findByActivoTrueOrderByIdRolAsc();

    List<Rol> findAllByOrderByIdRolAsc();
}
