package com.ikernell.backend.repository;

import com.ikernell.backend.entity.Interrupcion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterrupcionRepository extends JpaRepository<Interrupcion, Integer> {

    Optional<Interrupcion> findByCodigoInterrupcion(String codigoInterrupcion);

    List<Interrupcion> findByActividad_IdActividad(Integer idActividad);

    // NUEVO: para ReporteInterrupcionesService -- mismo patrón de
    // navegación de asociaciones que ActividadRepository.findByEtapa_Proyecto_IdProyecto,
    // solo que un nivel más profundo (Interrupcion -> Actividad -> Etapa -> Proyecto).
    List<Interrupcion> findByActividad_Etapa_Proyecto_IdProyecto(Integer idProyecto);

    // Orden explícito por PK: usado por el reporte general (todas las
    // interrupciones de la organización, no de un solo proyecto).
    List<Interrupcion> findAllByOrderByIdInterrupcionAsc();
}
