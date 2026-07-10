package com.ikernell.backend.repository;

import com.ikernell.backend.entity.AsignacionProyecto;
import com.ikernell.backend.enums.RolProyecto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AsignacionProyectoRepository extends JpaRepository<AsignacionProyecto, Integer> {

    List<AsignacionProyecto> findByProyecto_IdProyecto(Integer idProyecto);

    List<AsignacionProyecto> findByUsuario_IdUsuario(Integer idUsuario);

    List<AsignacionProyecto> findByProyecto_IdProyectoAndFechaDesvinculacionIsNull(Integer idProyecto);

    Optional<AsignacionProyecto> findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(
            Integer idUsuario, Integer idProyecto);

    Optional<AsignacionProyecto> findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(
            Integer idProyecto, RolProyecto rolProyecto);

    // Usado por AutorizacionProyectoService: ¿este usuario es el Líder
    // VIGENTE de ESTE proyecto puntual? (no de proyectos en general).
    boolean existsByUsuario_IdUsuarioAndProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(
            Integer idUsuario, Integer idProyecto, RolProyecto rolProyecto);
}