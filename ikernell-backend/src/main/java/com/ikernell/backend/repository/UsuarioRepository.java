package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCodigoUsuario(String codigoUsuario);

    // Usado por CodigoGeneradorService para el siguiente código
    // secuencial -- MAX() en SQL en vez de cargar y comparar todos los
    // usuarios en Java (ver SecuenciaCodigoUtil.siguienteSecuenciaDesdeMaximo).
    @Query("SELECT MAX(u.codigoUsuario) FROM Usuario u")
    String buscarCodigoMaximo();

    Optional<Usuario> findByCorreoElectronico(String correoElectronico);

    Optional<Usuario> findByNumeroIdentificacion(String numeroIdentificacion);

    // Orden explícito por PK: sin esto, un UPDATE de "activo" puede
    // reubicar la fila y reordenar la tabla de Usuarios en el frontend.
    List<Usuario> findByActivoTrueOrderByIdUsuarioAsc();

    List<Usuario> findAllByOrderByIdUsuarioAsc();

    // NUEVO: para notificar a todos los Coordinadores activos cuando
    // llega un mensaje de contacto nuevo.
    List<Usuario> findByRol_CodigoRolAndActivoTrue(String codigoRol);

    // Métrica (B4 + B5): "Equipo (usuarios activos)" -- Coordinador.
    long countByActivoTrue();
}
