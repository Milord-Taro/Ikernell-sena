package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol, Integer> {

    Optional<Rol> findByCodigoRol(String codigoRol);

    Optional<Rol> findByNombreRolIgnoreCase(String nombreRol);

    List<Rol> findByActivoTrue();
}
