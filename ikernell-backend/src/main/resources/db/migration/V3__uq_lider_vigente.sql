-- ============================================================
-- V3 -- Hace imposible en BD tener DOS líderes vigentes en el mismo
-- proyecto.
--
-- Hasta ahora la regla "un solo Líder vigente por proyecto" vivía SOLO
-- en la aplicación (check-then-act en AsignacionProyectoService.crear).
-- Dos altas concurrentes -- o un INSERT manual, o una semilla mal
-- armada -- podían dejar dos filas con rol_proyecto='Líder' y
-- fecha_desvinculacion IS NULL sobre el mismo id_proyecto. Cuando eso
-- pasa, ProyectoService.enriquecerConLider(List) arma un Map con
-- Collectors.toMap SIN función de merge y revienta con
-- IllegalStateException ("Duplicate key") -> GET /api/proyectos devuelve
-- 500 para TODOS los usuarios, no solo para el proyecto afectado.
--
-- Este índice único parcial convierte esa condición imposible-de-tener
-- en un error de integridad atómico y localizado: el segundo INSERT de
-- líder vigente falla con violación de restricción (lo traducimos a 409
-- en el Service), y la lista de proyectos nunca puede llegar al estado
-- que la rompía.
--
-- Nota: el valor almacenado es 'Líder' (con tilde) -- ver
-- RolProyectoConverter y el CHECK ck_asignacion_proyecto_rol de V1. El
-- índice complementa a uq_asignacion_proyecto_vigente (que impide que el
-- MISMO usuario tenga dos asignaciones vigentes en un proyecto, pero no
-- dice nada sobre "dos usuarios distintos como Líder").
-- ============================================================

CREATE UNIQUE INDEX uq_lider_vigente_por_proyecto
    ON public.asignacion_proyecto (id_proyecto)
    WHERE rol_proyecto = 'Líder' AND fecha_desvinculacion IS NULL;
