package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByCodigoUsuario(String codigoUsuario);

    Optional<Usuario> findByCorreoElectronico(String correoElectronico);

    Optional<Usuario> findByNumeroIdentificacion(String numeroIdentificacion);

    List<Usuario> findByActivoTrue();
}
