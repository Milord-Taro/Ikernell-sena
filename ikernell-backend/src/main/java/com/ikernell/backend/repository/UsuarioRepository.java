package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository
        extends JpaRepository<Usuario, Integer> {

    Usuario findTopByOrderByIdUsuarioDesc();

    boolean existsByCorreoElectronico(
            String correoElectronico);

    Usuario findByCorreoElectronico(
            String correoElectronico);

    Optional<Usuario> findOptionalByCorreoElectronico(
            String correoElectronico);
}
