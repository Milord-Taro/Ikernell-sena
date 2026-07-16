-- ============================================================
-- V2 -- Persiste "detalle anterior" en trazabilidad en vez de
-- recalcularlo en cada lectura.
--
-- Antes, TrazabilidadQueryService cargaba TODO el historial en orden
-- cronológico y reconstruía en memoria, en cada petición, el "detalle
-- anterior" de cada evento (para armar el diff antes/después en
-- Auditoría) -- esto obliga a traer la tabla completa siempre, y hace
-- imposible paginar correctamente (el "anterior" de un evento en la
-- página 2 depende de eventos que quedaron en la página 1).
--
-- Con esta columna, TrazabilidadService.registrar() calcula el
-- "anterior" UNA vez, al momento de crear el evento nuevo (una consulta
-- puntual al evento JSON más reciente del mismo recurso), y queda
-- guardado ahí para siempre -- las lecturas dejan de necesitar el
-- historial completo, habilitando paginación real (ver V3 y B4).
-- ============================================================

ALTER TABLE trazabilidad
    ADD COLUMN detalle_anterior TEXT;

COMMENT ON COLUMN trazabilidad.detalle_anterior IS
    'Snapshot JSON del evento anterior sobre el MISMO recurso (misma entidad + código), calculado al crear el evento. NULL si es el primer evento conocido del recurso, o si el detalle propio o el anterior no son JSON.';

-- Backfill: reconstruye detalle_anterior para el historial que ya
-- existía antes de esta migración, replicando la misma regla que hacía
-- TrazabilidadQueryService en memoria -- encadena solo eventos cuyo
-- detalle es JSON (empieza por '{'), saltando cualquier evento de texto
-- plano intercalado (ej. "Inicio de sesión exitoso.") sin romper la
-- cadena.
WITH eventos_json AS (
    SELECT
        id_trazabilidad,
        LAG(detalle) OVER (
            PARTITION BY entidad, codigo_registro
            ORDER BY fecha_evento, id_trazabilidad
        ) AS detalle_anterior
    FROM trazabilidad
    WHERE detalle LIKE '{%'
)
UPDATE trazabilidad t
SET detalle_anterior = ej.detalle_anterior
FROM eventos_json ej
WHERE t.id_trazabilidad = ej.id_trazabilidad;
