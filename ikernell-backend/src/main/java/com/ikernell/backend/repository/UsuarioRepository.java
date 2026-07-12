package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCodigoUsuario(String codigoUsuario);

    Optional<Usuario> findByCorreoElectronico(String correoElectronico);

    Optional<Usuario> findByNumeroIdentificacion(String numeroIdentificacion);

    // Orden explícito por PK: sin esto, un UPDATE de "activo" puede
    // reubicar la fila y reordenar la tabla de Usuarios en el frontend.
    List<Usuario> findByActivoTrueOrderByIdUsuarioAsc();

    List<Usuario> findAllByOrderByIdUsuarioAsc();

    // NUEVO: para notificar a todos los Coordinadores activos cuando
    // llega un mensaje de contacto nuevo.
    List<Usuario> findByRol_CodigoRolAndActivoTrue(String codigoRol);
}
