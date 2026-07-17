package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol, Integer> {

    Optional<Rol> findByCodigoRol(String codigoRol);

    // Ver comentario equivalente en UsuarioRepository.buscarCodigoMaximo().
    @Query("SELECT MAX(r.codigoRol) FROM Rol r")
    String buscarCodigoMaximo();

    Optional<Rol> findByNombreRolIgnoreCase(String nombreRol);

    // Orden explícito por PK: sin esto, un UPDATE de "activo" puede
    // reubicar la fila y reordenar la tabla del catálogo en el frontend.
    List<Rol> findByActivoTrueOrderByIdRolAsc();

    List<Rol> findAllByOrderByIdRolAsc();
}
