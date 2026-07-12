-- ============================================================
-- IKernell Solutions
-- Migración: nota de contexto (actividad/registro_error) y
--            trazabilidad de creador (registro_error/interrupcion)
-- Aplicar UNA VEZ sobre una base de datos V2 ya existente.
-- Después de aplicarla, ikernell-backend/schema.sql y la copia en
-- esta misma carpeta ya quedaron actualizados con estas mismas
-- columnas para instalaciones nuevas -- esto es solo para no perder
-- los datos que ya tienes.
-- ============================================================

-- Nota de contexto: qué se hizo al finalizar la actividad.
ALTER TABLE actividad
    ADD COLUMN nota_finalizacion TEXT;

-- Nota de contexto: cómo se resolvió o por qué se descartó el error.
ALTER TABLE registro_error
    ADD COLUMN nota_resolucion TEXT;

-- Quién creó el registro de error (el propio desarrollador, o el líder
-- si lo registró él). Se backfillea con el desarrollador de la
-- actividad, que es quien lo creó bajo las reglas de negocio actuales.
ALTER TABLE registro_error
    ADD COLUMN id_usuario_creador INTEGER;

ALTER TABLE registro_error
    ADD CONSTRAINT fk_registro_error_usuario_creador
        FOREIGN KEY (id_usuario_creador)
        REFERENCES usuario(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT;

UPDATE registro_error
SET id_usuario_creador = (
    SELECT a.id_usuario FROM actividad a WHERE a.id_actividad = registro_error.id_actividad
)
WHERE id_usuario_creador IS NULL;

-- Quién creó la interrupción (hoy siempre el desarrollador de la
-- actividad, pero se deja explícito para mostrarlo con claridad en la UI).
ALTER TABLE interrupcion
    ADD COLUMN id_usuario_creador INTEGER;

ALTER TABLE interrupcion
    ADD CONSTRAINT fk_interrupcion_usuario_creador
        FOREIGN KEY (id_usuario_creador)
        REFERENCES usuario(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT;

UPDATE interrupcion
SET id_usuario_creador = (
    SELECT a.id_usuario FROM actividad a WHERE a.id_actividad = interrupcion.id_actividad
)
WHERE id_usuario_creador IS NULL;
