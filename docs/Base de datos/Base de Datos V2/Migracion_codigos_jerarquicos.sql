-- Migración: códigos jerárquicos autogenerados
--
-- Contexto: antes el usuario escribía a mano el código de Proyecto, Etapa,
-- Actividad, RegistroError e Interrupción, y la unicidad se validaba de
-- forma GLOBAL (sin importar a qué proyecto pertenecía cada registro) --
-- un Líder podía intentar reusar el código de una etapa de un proyecto al
-- que no tiene acceso y el sistema respondía con un conflicto que
-- filtraba la existencia de ese código ajeno.
--
-- A partir de esta migración, el backend genera el código automáticamente
-- (ver CodigoGeneradorService) heredando el código del padre como prefijo:
--   Proyecto:        PRY-001
--   Etapa:            PRY-001-ETP-01
--   Actividad:        PRY-001-ETP-01-ACT-01
--   Registro de error: PRY-001-ETP-01-ACT-01-ERR-01
--   Interrupción:      PRY-001-ETP-01-ACT-01-INT-01
-- La secuencia numérica se reinicia por padre, pero el código completo
-- sigue siendo único en toda la base sin necesitar un chequeo aparte.
--
-- Los catálogos (Rol, Profesión, Especialidad, TipoError,
-- TipoInterrupcion) y Usuario pasan a un autoincremento simple con
-- prefijo fijo (ROL-001, PRF-001, ESP-001, TER-001, TIN-001, USR-001).
--
-- Este script solo transforma los datos ya existentes al nuevo formato;
-- no depende de conocer los valores actuales (recalcula todo por orden
-- de creación/id), así que es seguro correrlo contra cualquier estado de
-- la base que ya tenga aplicado el esquema de ikernell_v2_FINAL.sql.

BEGIN;

-- 1. Ampliar columnas para admitir el código jerárquico más largo
--    (espejo de los @Column(length=...) actualizados en las entidades JPA).
ALTER TABLE etapa ALTER COLUMN codigo_etapa TYPE character varying(30);
ALTER TABLE actividad ALTER COLUMN codigo_actividad TYPE character varying(40);
ALTER TABLE registro_error ALTER COLUMN codigo_registro_error TYPE character varying(50);
ALTER TABLE interrupcion ALTER COLUMN codigo_interrupcion TYPE character varying(50);
-- trazabilidad.codigo_registro guarda una COPIA en texto del código del
-- recurso auditado (sin FK) -- también se queda corta con los códigos
-- jerárquicos largos (ej. un RegistroError puede llegar a 28+ caracteres).
ALTER TABLE trazabilidad ALTER COLUMN codigo_registro TYPE character varying(60);

-- 2. Proyecto: PRY-001, PRY-002... por orden de creación (id_proyecto).
WITH nuevos AS (
    SELECT id_proyecto,
           'PRY-' || LPAD(ROW_NUMBER() OVER (ORDER BY id_proyecto)::text, 3, '0') AS codigo_nuevo
    FROM proyecto
)
UPDATE proyecto p
SET codigo_proyecto = n.codigo_nuevo
FROM nuevos n
WHERE p.id_proyecto = n.id_proyecto;

-- 3. Etapa: {codigoProyecto}-ETP-01, secuencia reiniciada por proyecto.
WITH nuevos AS (
    SELECT e.id_etapa,
           pr.codigo_proyecto || '-ETP-'
               || LPAD(ROW_NUMBER() OVER (PARTITION BY e.id_proyecto ORDER BY e.id_etapa)::text, 2, '0')
               AS codigo_nuevo
    FROM etapa e
    JOIN proyecto pr ON pr.id_proyecto = e.id_proyecto
)
UPDATE etapa e
SET codigo_etapa = n.codigo_nuevo
FROM nuevos n
WHERE e.id_etapa = n.id_etapa;

-- 4. Actividad: {codigoEtapa}-ACT-01, secuencia reiniciada por etapa.
WITH nuevos AS (
    SELECT a.id_actividad,
           et.codigo_etapa || '-ACT-'
               || LPAD(ROW_NUMBER() OVER (PARTITION BY a.id_etapa ORDER BY a.id_actividad)::text, 2, '0')
               AS codigo_nuevo
    FROM actividad a
    JOIN etapa et ON et.id_etapa = a.id_etapa
)
UPDATE actividad a
SET codigo_actividad = n.codigo_nuevo
FROM nuevos n
WHERE a.id_actividad = n.id_actividad;

-- 5. Registro de error: {codigoActividad}-ERR-01, secuencia reiniciada por actividad.
WITH nuevos AS (
    SELECT r.id_registro_error,
           act.codigo_actividad || '-ERR-'
               || LPAD(ROW_NUMBER() OVER (PARTITION BY r.id_actividad ORDER BY r.id_registro_error)::text, 2, '0')
               AS codigo_nuevo
    FROM registro_error r
    JOIN actividad act ON act.id_actividad = r.id_actividad
)
UPDATE registro_error r
SET codigo_registro_error = n.codigo_nuevo
FROM nuevos n
WHERE r.id_registro_error = n.id_registro_error;

-- 6. Interrupción: {codigoActividad}-INT-01, secuencia reiniciada por actividad.
WITH nuevos AS (
    SELECT i.id_interrupcion,
           act.codigo_actividad || '-INT-'
               || LPAD(ROW_NUMBER() OVER (PARTITION BY i.id_actividad ORDER BY i.id_interrupcion)::text, 2, '0')
               AS codigo_nuevo
    FROM interrupcion i
    JOIN actividad act ON act.id_actividad = i.id_actividad
)
UPDATE interrupcion i
SET codigo_interrupcion = n.codigo_nuevo
FROM nuevos n
WHERE i.id_interrupcion = n.id_interrupcion;

-- 7. Catálogos: prefijo fijo + secuencia global, por orden de creación (id).
WITH nuevos AS (
    SELECT id_rol, 'ROL-' || LPAD(ROW_NUMBER() OVER (ORDER BY id_rol)::text, 3, '0') AS codigo_nuevo
    FROM rol
)
UPDATE rol r SET codigo_rol = n.codigo_nuevo FROM nuevos n WHERE r.id_rol = n.id_rol;

WITH nuevos AS (
    SELECT id_profesion, 'PRF-' || LPAD(ROW_NUMBER() OVER (ORDER BY id_profesion)::text, 3, '0') AS codigo_nuevo
    FROM profesion
)
UPDATE profesion p SET codigo_profesion = n.codigo_nuevo FROM nuevos n WHERE p.id_profesion = n.id_profesion;

WITH nuevos AS (
    SELECT id_especialidad, 'ESP-' || LPAD(ROW_NUMBER() OVER (ORDER BY id_especialidad)::text, 3, '0') AS codigo_nuevo
    FROM especialidad
)
UPDATE especialidad e SET codigo_especialidad = n.codigo_nuevo FROM nuevos n WHERE e.id_especialidad = n.id_especialidad;

WITH nuevos AS (
    SELECT id_tipo_error, 'TER-' || LPAD(ROW_NUMBER() OVER (ORDER BY id_tipo_error)::text, 3, '0') AS codigo_nuevo
    FROM tipo_error
)
UPDATE tipo_error t SET codigo_tipo_error = n.codigo_nuevo FROM nuevos n WHERE t.id_tipo_error = n.id_tipo_error;

WITH nuevos AS (
    SELECT id_tipo_interrupcion, 'TIN-' || LPAD(ROW_NUMBER() OVER (ORDER BY id_tipo_interrupcion)::text, 3, '0') AS codigo_nuevo
    FROM tipo_interrupcion
)
UPDATE tipo_interrupcion t
SET codigo_tipo_interrupcion = n.codigo_nuevo
FROM nuevos n
WHERE t.id_tipo_interrupcion = n.id_tipo_interrupcion;

WITH nuevos AS (
    SELECT id_usuario, 'USR-' || LPAD(ROW_NUMBER() OVER (ORDER BY id_usuario)::text, 3, '0') AS codigo_nuevo
    FROM usuario
)
UPDATE usuario u SET codigo_usuario = n.codigo_nuevo FROM nuevos n WHERE u.id_usuario = n.id_usuario;

COMMIT;
