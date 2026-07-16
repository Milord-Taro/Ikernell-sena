-- ============================================================
-- V4 -- Índice compuesto para la consulta caliente de notificaciones.
--
-- La pantalla de notificaciones y el badge de "no leídas" ejecutan
-- constantemente:
--   findByUsuario_IdUsuarioAndLeidaFalseOrderByFechaCreacionDesc
--   -> WHERE id_usuario = ? AND leida = false ORDER BY fecha_creacion DESC
--
-- El baseline traía dos índices de una sola columna para esto:
--   idx_notificacion_usuario (id_usuario)  y  idx_notificacion_leida (leida).
-- Ninguno sirve bien: 'leida' es un booleano (cardinalidad 2, casi inútil como
-- índice) e 'id_usuario' solo cubre el filtro, no el orden. El planner termina
-- filtrando por un índice y ordenando en memoria.
--
-- Se reemplazan por UN índice compuesto (id_usuario, leida, fecha_creacion DESC)
-- que resuelve el filtro Y el orden de un solo escaneo. El prefijo id_usuario
-- además cubre la otra consulta ("todas mis notificaciones"), así que los dos
-- índices viejos quedan subsumidos y se eliminan.
-- ============================================================

CREATE INDEX idx_notificacion_usuario_leida_fecha
    ON public.notificacion (id_usuario, leida, fecha_creacion DESC);

DROP INDEX IF EXISTS idx_notificacion_usuario;
DROP INDEX IF EXISTS idx_notificacion_leida;
