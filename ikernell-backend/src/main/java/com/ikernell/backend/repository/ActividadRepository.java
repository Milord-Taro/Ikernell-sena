package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {

    Optional<Actividad> findByCodigoActividad(String codigoActividad);

    // Orden explícito por PK (no por columnas mutables como estado): sin esto,
    // Postgres no garantiza el orden de retorno y un UPDATE de estado (columna
    // indexada) puede reubicar la fila y hacer que la card "salte" de posición
    // en el frontend tras cada cambio de estado.
    List<Actividad> findByEtapa_IdEtapaOrderByIdActividadAsc(Integer idEtapa);

    // Orden explícito por PK: ver comentario de arriba -- esta alimenta las
    // cards de "Mis actividades", con el mismo riesgo de reordenarse.
    List<Actividad> findByUsuario_IdUsuarioOrderByIdActividadAsc(Integer idUsuario);

    // Actividad no guarda id_proyecto directamente (se obtiene vía
    // Actividad -> Etapa -> Proyecto, ver comentario en la tabla actividad
    // del script SQL). Usado por el reporte de actividades por proyecto.
    List<Actividad> findByEtapa_Proyecto_IdProyecto(Integer idProyecto);

    // Orden explícito por PK: usado por el reporte general (todas las
    // actividades de la organización, no de un solo proyecto).
    List<Actividad> findAllByOrderByIdActividadAsc();
}