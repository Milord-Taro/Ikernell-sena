package com.ikernell_backend.repository;

import com.ikernell_backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository
        extends JpaRepository<Usuario, Integer> {

    Usuario findTopByOrderByIdUsuarioDesc();

    boolean existsByCorreoElectronico(
            String correoElectronico);

    Usuario findByCorreoElectronicoAndContrasena(
            String correoElectronico,
            String contrasena);
}