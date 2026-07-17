package com.ikernell.backend.repository;

import com.ikernell.backend.entity.AsignacionProyecto;
import com.ikernell.backend.enums.RolProyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AsignacionProyectoRepository extends JpaRepository<AsignacionProyecto, Integer> {

    // Orden explícito por PK: alimenta las cards de "Equipo del proyecto" --
    // sin esto, desvincular a alguien (UPDATE sobre fecha_desvinculacion)
    // puede reubicar la fila y hacer que las demás cards salten de posición.
    List<AsignacionProyecto> findByProyecto_IdProyectoOrderByIdAsignacionProyectoAsc(Integer idProyecto);

    List<AsignacionProyecto> findByUsuario_IdUsuarioOrderByIdAsignacionProyectoAsc(Integer idUsuario);

    List<AsignacionProyecto> findByProyecto_IdProyectoAndFechaDesvinculacionIsNull(Integer idProyecto);

    Optional<AsignacionProyecto> findByUsuario_IdUsuarioAndProyecto_IdProyectoAndFechaDesvinculacionIsNull(
            Integer idUsuario, Integer idProyecto);

    Optional<AsignacionProyecto> findByProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(
            Integer idProyecto, RolProyecto rolProyecto);

    // Usado por el reporte general: todos los líderes vigentes de todos los
    // proyectos en una sola consulta, en vez de una por proyecto.
    List<AsignacionProyecto> findByRolProyectoAndFechaDesvinculacionIsNull(RolProyecto rolProyecto);

    // Usado por AutorizacionProyectoService: ¿este usuario es el Líder
    // VIGENTE de ESTE proyecto puntual? (no de proyectos en general).
    boolean existsByUsuario_IdUsuarioAndProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(
            Integer idUsuario, Integer idProyecto, RolProyecto rolProyecto);

    // ================= Métricas (B4 + B5) =================

    // "Mis proyectos" de un Líder -- todo lo demás en MetricasService se
    // acota con esta lista de ids.
    @Query("SELECT a.proyecto.idProyecto FROM AsignacionProyecto a "
            + "WHERE a.usuario.idUsuario = :idUsuario AND a.rolProyecto = com.ikernell.backend.enums.RolProyecto.LIDER "
            + "AND a.fechaDesvinculacion IS NULL")
    List<Integer> idsProyectosDondeEsLiderVigente(@Param("idUsuario") Integer idUsuario);

    // "Mi equipo" de un Líder -- usuarios distintos con asignación vigente
    // (cualquier rol_proyecto) en cualquiera de sus proyectos.
    @Query("SELECT COUNT(DISTINCT a.usuario.idUsuario) FROM AsignacionProyecto a "
            + "WHERE a.proyecto.idProyecto IN :idsProyecto AND a.fechaDesvinculacion IS NULL")
    long contarUsuariosDistintosEnProyectos(@Param("idsProyecto") List<Integer> idsProyecto);
}