package com.ikernell.backend.repository;

import com.ikernell.backend.dto.ItemRanking;
import com.ikernell.backend.entity.RegistroError;
import com.ikernell.backend.enums.EstadoRegistroError;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RegistroErrorRepository extends JpaRepository<RegistroError, Integer> {

    Optional<RegistroError> findByCodigoRegistroError(String codigoRegistroError);

    // Ver comentario equivalente en EtapaRepository.buscarCodigoMaximo().
    @Query("SELECT MAX(r.codigoRegistroError) FROM RegistroError r WHERE r.actividad.idActividad = :idActividad")
    String buscarCodigoMaximo(@Param("idActividad") Integer idActividad);

    // Orden explícito por PK: ver comentario equivalente en ActividadRepository.
    List<RegistroError> findByActividad_IdActividadOrderByIdRegistroErrorAsc(Integer idActividad);

    // Alimenta la vista global "Errores" (cards con filtro de Proyecto/Estado):
    // mismo motivo, sin esto la card salta de posición al cambiar su estado.
    List<RegistroError> findAllByOrderByIdRegistroErrorAsc();

    // ================= Métricas (B4 + B5) =================

    long countByEstadoIn(List<EstadoRegistroError> estados);

    long countByActividad_Etapa_Proyecto_IdProyectoInAndEstadoIn(List<Integer> idsProyecto, List<EstadoRegistroError> estados);

    long countByActividad_Usuario_IdUsuarioAndEstadoIn(Integer idUsuario, List<EstadoRegistroError> estados);

    @Query("SELECT r.severidad, COUNT(r) FROM RegistroError r GROUP BY r.severidad")
    List<Object[]> contarPorSeveridad();

    @Query("SELECT r.severidad, COUNT(r) FROM RegistroError r WHERE r.actividad.etapa.proyecto.idProyecto IN :idsProyecto GROUP BY r.severidad")
    List<Object[]> contarPorSeveridadEnProyectos(@Param("idsProyecto") List<Integer> idsProyecto);

    @Query("SELECT r.severidad, COUNT(r) FROM RegistroError r WHERE r.actividad.usuario.idUsuario = :idUsuario GROUP BY r.severidad")
    List<Object[]> contarPorSeveridadDeUsuario(@Param("idUsuario") Integer idUsuario);

    @Query("SELECT r.estado, COUNT(r) FROM RegistroError r GROUP BY r.estado")
    List<Object[]> contarPorEstado();

    @Query("SELECT r.estado, COUNT(r) FROM RegistroError r WHERE r.actividad.etapa.proyecto.idProyecto IN :idsProyecto GROUP BY r.estado")
    List<Object[]> contarPorEstadoEnProyectos(@Param("idsProyecto") List<Integer> idsProyecto);

    @Query("SELECT r.estado, COUNT(r) FROM RegistroError r WHERE r.actividad.usuario.idUsuario = :idUsuario GROUP BY r.estado")
    List<Object[]> contarPorEstadoDeUsuario(@Param("idUsuario") Integer idUsuario);

    // Solo Coordinador (visión org-wide) -- ver MetricasController.
    @Query("SELECT NEW com.ikernell.backend.dto.ItemRanking(p.idProyecto, p.nombreProyecto, COUNT(r)) "
            + "FROM RegistroError r JOIN r.actividad.etapa.proyecto p "
            + "WHERE r.estado IN :estados "
            + "GROUP BY p.idProyecto, p.nombreProyecto "
            + "ORDER BY COUNT(r) DESC")
    List<ItemRanking> rankingPorProyecto(@Param("estados") List<EstadoRegistroError> estados, Pageable pageable);

    // Feed de actividad reciente -- acotado (Top 8) en la propia consulta,
    // nunca trae la tabla completa.
    List<RegistroError> findTop8ByOrderByFechaRegistroDesc();

    List<RegistroError> findTop8ByActividad_Etapa_Proyecto_IdProyectoInOrderByFechaRegistroDesc(List<Integer> idsProyecto);

    List<RegistroError> findTop8ByActividad_Usuario_IdUsuarioOrderByFechaRegistroDesc(Integer idUsuario);
}
