-- ============================================================
-- IKernell Solutions
-- Base de Datos V2 - Script Consolidado
-- PostgreSQL 17+
-- Fuente de verdad: 06.6-diseno-logico-base-de-datos.md
-- ============================================================
-- NOTA: ejecutar "CREATE DATABASE" y su COMMENT por separado,
-- fuera de una transacción, si tu cliente (pgAdmin4) no lo hace
-- automáticamente. El resto del script debe ejecutarse ya
-- conectado a la base de datos ikernell_solutions.
-- ============================================================

-- CREATE DATABASE ikernell_solutions
--    WITH
--    ENCODING = 'UTF8'
--    TEMPLATE template0;

-- COMMENT ON DATABASE ikernell_solutions IS
-- 'Sistema de gestión de proyectos IKernell Solutions';

-- A partir de aquí, conectarse a ikernell_solutions antes de continuar.
-- ============================================================
-- IKernell Solutions
-- Script: 01_catalogos.sql
-- Descripción:
-- Creación de las tablas catálogo del sistema.
-- Fuente de verdad: 06.6-diseno-logico-base-de-datos.md
-- ============================================================

-- ============================================================
-- TABLA: rol
-- ============================================================

CREATE TABLE rol
(
    id_rol INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_rol VARCHAR(20) NOT NULL,

    nombre_rol VARCHAR(100) NOT NULL,

    descripcion TEXT,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_rol
        PRIMARY KEY (id_rol),

    CONSTRAINT uq_rol_codigo
        UNIQUE (codigo_rol),

    CONSTRAINT uq_rol_nombre
        UNIQUE (nombre_rol),

    CONSTRAINT ck_rol_nombre
        CHECK (LENGTH(TRIM(nombre_rol)) >= 3),

    CONSTRAINT ck_rol_descripcion
        CHECK (descripcion IS NULL OR LENGTH(TRIM(descripcion)) > 0)
);

COMMENT ON TABLE rol IS
'Catálogo de roles del sistema.';

COMMENT ON COLUMN rol.codigo_rol IS
'Código funcional único del rol.';

COMMENT ON COLUMN rol.nombre_rol IS
'Nombre del rol.';

COMMENT ON COLUMN rol.descripcion IS
'Descripción del rol.';

COMMENT ON COLUMN rol.activo IS
'Indica si el rol se encuentra disponible para su utilización.';

COMMENT ON COLUMN rol.fecha_creacion IS
'Fecha de creación del registro.';


-- ============================================================
-- TABLA: profesion
-- ============================================================

CREATE TABLE profesion
(
    id_profesion INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_profesion VARCHAR(20) NOT NULL,

    nombre_profesion VARCHAR(100) NOT NULL,

    descripcion TEXT,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_profesion
        PRIMARY KEY (id_profesion),

    CONSTRAINT uq_profesion_codigo
        UNIQUE (codigo_profesion),

    CONSTRAINT uq_profesion_nombre
        UNIQUE (nombre_profesion),

    CONSTRAINT ck_profesion_nombre
        CHECK (LENGTH(TRIM(nombre_profesion)) >= 3),

    CONSTRAINT ck_profesion_descripcion
        CHECK (descripcion IS NULL OR LENGTH(TRIM(descripcion)) > 0)
);

COMMENT ON TABLE profesion IS
'Catálogo de profesiones disponibles para los trabajadores.';

COMMENT ON COLUMN profesion.codigo_profesion IS
'Código único de la profesión.';

COMMENT ON COLUMN profesion.nombre_profesion IS
'Nombre de la profesión.';

COMMENT ON COLUMN profesion.descripcion IS
'Descripción de la profesión.';

COMMENT ON COLUMN profesion.activo IS
'Indica si la profesión se encuentra disponible para asignación.';

COMMENT ON COLUMN profesion.fecha_creacion IS
'Fecha de creación del registro.';


-- ============================================================
-- TABLA: especialidad
-- ============================================================

CREATE TABLE especialidad
(
    id_especialidad INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_especialidad VARCHAR(20) NOT NULL,

    nombre_especialidad VARCHAR(100) NOT NULL,

    descripcion TEXT,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_especialidad
        PRIMARY KEY (id_especialidad),

    CONSTRAINT uq_especialidad_codigo
        UNIQUE (codigo_especialidad),

    CONSTRAINT uq_especialidad_nombre
        UNIQUE (nombre_especialidad),

    CONSTRAINT ck_especialidad_nombre
        CHECK (LENGTH(TRIM(nombre_especialidad)) >= 3),

    CONSTRAINT ck_especialidad_descripcion
        CHECK (descripcion IS NULL OR LENGTH(TRIM(descripcion)) > 0)
);

COMMENT ON TABLE especialidad IS
'Catálogo de especialidades disponibles para los trabajadores.';

COMMENT ON COLUMN especialidad.codigo_especialidad IS
'Código único de la especialidad.';

COMMENT ON COLUMN especialidad.nombre_especialidad IS
'Nombre de la especialidad.';

COMMENT ON COLUMN especialidad.descripcion IS
'Descripción de la especialidad.';

COMMENT ON COLUMN especialidad.activo IS
'Indica si la especialidad se encuentra disponible para asignación.';

COMMENT ON COLUMN especialidad.fecha_creacion IS
'Fecha de creación del registro.';


-- ============================================================
-- TABLA: tipo_error
-- ============================================================

CREATE TABLE tipo_error
(
    id_tipo_error INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_tipo_error VARCHAR(20) NOT NULL,

    nombre_tipo_error VARCHAR(100) NOT NULL,

    descripcion TEXT,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_tipo_error
        PRIMARY KEY (id_tipo_error),

    CONSTRAINT uq_tipo_error_codigo
        UNIQUE (codigo_tipo_error),

    CONSTRAINT uq_tipo_error_nombre
        UNIQUE (nombre_tipo_error),

    CONSTRAINT ck_tipo_error_nombre
        CHECK (LENGTH(TRIM(nombre_tipo_error)) >= 3),

    CONSTRAINT ck_tipo_error_descripcion
        CHECK (descripcion IS NULL OR LENGTH(TRIM(descripcion)) > 0)
);

COMMENT ON TABLE tipo_error IS
'Catálogo de tipos de error utilizados durante el registro de errores.';

COMMENT ON COLUMN tipo_error.codigo_tipo_error IS
'Código único del tipo de error.';

COMMENT ON COLUMN tipo_error.nombre_tipo_error IS
'Nombre del tipo de error.';

COMMENT ON COLUMN tipo_error.descripcion IS
'Descripción del tipo de error.';

COMMENT ON COLUMN tipo_error.activo IS
'Indica si el tipo de error puede utilizarse.';

COMMENT ON COLUMN tipo_error.fecha_creacion IS
'Fecha de creación del registro.';


-- ============================================================
-- TABLA: tipo_interrupcion
-- ============================================================

CREATE TABLE tipo_interrupcion
(
    id_tipo_interrupcion INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_tipo_interrupcion VARCHAR(20) NOT NULL,

    nombre_tipo_interrupcion VARCHAR(100) NOT NULL,

    descripcion TEXT,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_tipo_interrupcion
        PRIMARY KEY (id_tipo_interrupcion),

    CONSTRAINT uq_tipo_interrupcion_codigo
        UNIQUE (codigo_tipo_interrupcion),

    CONSTRAINT uq_tipo_interrupcion_nombre
        UNIQUE (nombre_tipo_interrupcion),

    CONSTRAINT ck_tipo_interrupcion_nombre
        CHECK (LENGTH(TRIM(nombre_tipo_interrupcion)) >= 3),

    CONSTRAINT ck_tipo_interrupcion_descripcion
        CHECK (descripcion IS NULL OR LENGTH(TRIM(descripcion)) > 0)
);

COMMENT ON TABLE tipo_interrupcion IS
'Catálogo de tipos de interrupción utilizados durante el registro de interrupciones.';

COMMENT ON COLUMN tipo_interrupcion.codigo_tipo_interrupcion IS
'Código único del tipo de interrupción.';

COMMENT ON COLUMN tipo_interrupcion.nombre_tipo_interrupcion IS
'Nombre del tipo de interrupción.';

COMMENT ON COLUMN tipo_interrupcion.descripcion IS
'Descripción del tipo de interrupción.';

COMMENT ON COLUMN tipo_interrupcion.activo IS
'Indica si el tipo de interrupción puede utilizarse.';

COMMENT ON COLUMN tipo_interrupcion.fecha_creacion IS
'Fecha de creación del registro.';
-- ============================================================
-- IKernell Solutions
-- Script: 02_usuario.sql
-- Descripción:
-- Gestión de usuarios (trabajadores del sistema).
-- Fuente de verdad: 06.6-diseno-logico-base-de-datos.md
-- ============================================================

CREATE TABLE usuario
(
    id_usuario INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_usuario VARCHAR(20) NOT NULL,

    nombres VARCHAR(100) NOT NULL,

    apellidos VARCHAR(100) NOT NULL,

    tipo_identificacion VARCHAR(10) NOT NULL,

    numero_identificacion VARCHAR(30) NOT NULL,

    fecha_nacimiento DATE NOT NULL,

    correo_electronico VARCHAR(150) NOT NULL,

    hash_contrasena VARCHAR(255) NOT NULL,

    ciudad VARCHAR(100) NOT NULL,

    id_rol INTEGER NOT NULL,

    id_profesion INTEGER NOT NULL,

    id_especialidad INTEGER NOT NULL,

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_usuario
        PRIMARY KEY (id_usuario),

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (id_rol)
        REFERENCES rol(id_rol)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_usuario_profesion
        FOREIGN KEY (id_profesion)
        REFERENCES profesion(id_profesion)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_usuario_especialidad
        FOREIGN KEY (id_especialidad)
        REFERENCES especialidad(id_especialidad)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_usuario_codigo
        UNIQUE (codigo_usuario),

    CONSTRAINT uq_usuario_identificacion
        UNIQUE (numero_identificacion),

    CONSTRAINT uq_usuario_correo
        UNIQUE (correo_electronico),

    CONSTRAINT ck_usuario_nombres
        CHECK (LENGTH(TRIM(nombres)) >= 3),

    CONSTRAINT ck_usuario_apellidos
        CHECK (LENGTH(TRIM(apellidos)) >= 3),

    CONSTRAINT ck_usuario_tipo_identificacion
        CHECK (tipo_identificacion IN ('CC', 'CE', 'TI')),

    CONSTRAINT ck_usuario_fecha_nacimiento
        CHECK (fecha_nacimiento <= CURRENT_DATE),

    CONSTRAINT ck_usuario_correo
        CHECK (correo_electronico = LOWER(correo_electronico))
);

COMMENT ON TABLE usuario IS
'Trabajadores registrados en el sistema.';

COMMENT ON COLUMN usuario.codigo_usuario IS
'Código funcional único del usuario.';

COMMENT ON COLUMN usuario.nombres IS
'Nombres del trabajador.';

COMMENT ON COLUMN usuario.apellidos IS
'Apellidos del trabajador.';

COMMENT ON COLUMN usuario.tipo_identificacion IS
'Tipo de documento de identidad.';

COMMENT ON COLUMN usuario.numero_identificacion IS
'Número de documento de identidad.';

COMMENT ON COLUMN usuario.fecha_nacimiento IS
'Fecha de nacimiento del trabajador.';

COMMENT ON COLUMN usuario.correo_electronico IS
'Correo electrónico utilizado para autenticación.';

COMMENT ON COLUMN usuario.hash_contrasena IS
'Contraseña cifrada mediante BCrypt.';

COMMENT ON COLUMN usuario.ciudad IS
'Ciudad de residencia del trabajador.';

COMMENT ON COLUMN usuario.id_profesion IS
'Profesión del perfil profesional del trabajador (obligatoria).';

COMMENT ON COLUMN usuario.id_especialidad IS
'Especialidad del perfil profesional del trabajador (obligatoria).';

COMMENT ON COLUMN usuario.activo IS
'Indica si el usuario puede acceder al sistema.';

COMMENT ON COLUMN usuario.fecha_creacion IS
'Fecha de creación del registro.';
-- ============================================================
-- IKernell Solutions
-- Script: 03_proyecto.sql
-- Descripción:
-- Gestión de proyectos y asignación de trabajadores.
-- Fuente de verdad: 06.6-diseno-logico-base-de-datos.md
-- ============================================================

-- ============================================================
-- TABLA: proyecto
-- ============================================================

CREATE TABLE proyecto
(
    id_proyecto INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_proyecto VARCHAR(20) NOT NULL,

    nombre_proyecto VARCHAR(150) NOT NULL,

    descripcion TEXT,

    fecha_inicio DATE NOT NULL,

    fecha_fin DATE NOT NULL,

    estado VARCHAR(30) NOT NULL,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_proyecto
        PRIMARY KEY (id_proyecto),

    CONSTRAINT uq_proyecto_codigo
        UNIQUE (codigo_proyecto),

    CONSTRAINT ck_proyecto_nombre
        CHECK (LENGTH(TRIM(nombre_proyecto)) >= 3),

    CONSTRAINT ck_proyecto_fechas
        CHECK (fecha_fin >= fecha_inicio),

    CONSTRAINT ck_proyecto_estado
        CHECK (estado IN ('Planeación', 'En ejecución', 'Finalizado', 'Suspendido','Cancelado'))
);

COMMENT ON TABLE proyecto IS
'Proyectos gestionados por la organización.';

COMMENT ON COLUMN proyecto.codigo_proyecto IS
'Código funcional único del proyecto.';

COMMENT ON COLUMN proyecto.estado IS
'Estado del ciclo de vida del proyecto: Planeación, En ejecución, Finalizado, Suspendido, Cancelado.';

COMMENT ON COLUMN proyecto.fecha_creacion IS
'Fecha de creación del registro.';


-- ============================================================
-- TABLA: asignacion_proyecto
-- ============================================================

CREATE TABLE asignacion_proyecto
(
    id_asignacion_proyecto INTEGER GENERATED ALWAYS AS IDENTITY,

    id_usuario INTEGER NOT NULL,

    id_proyecto INTEGER NOT NULL,

    rol_proyecto VARCHAR(30) NOT NULL,

    fecha_asignacion DATE NOT NULL DEFAULT CURRENT_DATE,

    fecha_desvinculacion DATE,

    CONSTRAINT pk_asignacion_proyecto
        PRIMARY KEY (id_asignacion_proyecto),

    CONSTRAINT fk_asignacion_proyecto_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_asignacion_proyecto_proyecto
        FOREIGN KEY (id_proyecto)
        REFERENCES proyecto(id_proyecto)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT ck_asignacion_proyecto_rol
        CHECK (rol_proyecto IN ('Líder', 'Desarrollador')),

    CONSTRAINT ck_asignacion_proyecto_fechas
        CHECK (fecha_desvinculacion IS NULL OR fecha_desvinculacion >= fecha_asignacion)
);

COMMENT ON TABLE asignacion_proyecto IS
'Relación N:M entre usuario y proyecto; representa el equipo de trabajo de cada proyecto.';

COMMENT ON COLUMN asignacion_proyecto.rol_proyecto IS
'Rol del usuario dentro del proyecto (Líder o Desarrollador), independiente del rol global.';

COMMENT ON COLUMN asignacion_proyecto.fecha_desvinculacion IS
'Fecha en que el usuario dejó de pertenecer al proyecto. NULL indica asignación vigente.';

-- Garantiza que un usuario no tenga más de una asignación vigente
-- (fecha_desvinculacion IS NULL) por proyecto.
CREATE UNIQUE INDEX uq_asignacion_proyecto_vigente
    ON asignacion_proyecto (id_usuario, id_proyecto)
    WHERE fecha_desvinculacion IS NULL;
-- ============================================================
-- IKernell Solutions
-- Script: 04_etapa_actividad.sql
-- Descripción:
-- Gestión de etapas y actividades de los proyectos.
-- Fuente de verdad: 06.6-diseno-logico-base-de-datos.md
-- ============================================================

-- ============================================================
-- TABLA: etapa
-- ============================================================

CREATE TABLE etapa
(
    id_etapa INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_etapa VARCHAR(20) NOT NULL,

    id_proyecto INTEGER NOT NULL,

    nombre_etapa VARCHAR(120) NOT NULL,

    descripcion TEXT,

    orden INTEGER NOT NULL,

    fecha_inicio DATE NOT NULL,

    fecha_fin DATE NOT NULL,

    estado VARCHAR(30) NOT NULL,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_etapa
        PRIMARY KEY (id_etapa),

    CONSTRAINT fk_etapa_proyecto
        FOREIGN KEY (id_proyecto)
        REFERENCES proyecto(id_proyecto)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_etapa_codigo
        UNIQUE (codigo_etapa),

    CONSTRAINT uq_etapa_orden_proyecto
        UNIQUE (id_proyecto, orden),

    CONSTRAINT ck_etapa_nombre
        CHECK (LENGTH(TRIM(nombre_etapa)) >= 3),

    CONSTRAINT ck_etapa_orden
        CHECK (orden > 0),

    CONSTRAINT ck_etapa_fechas
        CHECK (fecha_fin >= fecha_inicio),

    CONSTRAINT ck_etapa_estado
        CHECK (estado IN ('Pendiente', 'En ejecución', 'Finalizada'))
);

COMMENT ON TABLE etapa IS
'Fases que componen un proyecto.';

COMMENT ON COLUMN etapa.orden IS
'Posición ordinal de la etapa dentro del proyecto; única por proyecto.';

COMMENT ON COLUMN etapa.estado IS
'Estado del ciclo de vida de la etapa: Pendiente, En ejecución, Finalizada.';


-- ============================================================
-- TABLA: actividad
-- ============================================================

CREATE TABLE actividad
(
    id_actividad INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_actividad VARCHAR(20) NOT NULL,

    id_etapa INTEGER NOT NULL,

    id_usuario INTEGER,

    nombre_actividad VARCHAR(150) NOT NULL,

    descripcion TEXT,

    prioridad VARCHAR(20) NOT NULL,

    fecha_inicio DATE NOT NULL,

    fecha_fin DATE NOT NULL,

    estado VARCHAR(30) NOT NULL,

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_actividad
        PRIMARY KEY (id_actividad),

    CONSTRAINT fk_actividad_etapa
        FOREIGN KEY (id_etapa)
        REFERENCES etapa(id_etapa)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_actividad_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_actividad_codigo
        UNIQUE (codigo_actividad),

    CONSTRAINT ck_actividad_nombre
        CHECK (LENGTH(TRIM(nombre_actividad)) >= 3),

    CONSTRAINT ck_actividad_fechas
        CHECK (fecha_fin >= fecha_inicio),

    CONSTRAINT ck_actividad_prioridad
        CHECK (prioridad IN ('Baja', 'Media', 'Alta', 'Crítica')),

    CONSTRAINT ck_actividad_estado
        CHECK (estado IN (
            'Pendiente de asignación',
            'Pendiente',
            'En desarrollo',
            'Finalizada',
            'Cancelada'
        )),

    CONSTRAINT ck_actividad_estado_asignacion
        CHECK
        (
            (
                estado = 'Pendiente de asignación'
                AND id_usuario IS NULL
            )
            OR
            (
                estado <> 'Pendiente de asignación'
                AND id_usuario IS NOT NULL
            )
        )
);

COMMENT ON TABLE actividad IS
'Trabajo asignado a un desarrollador dentro de una etapa. No almacena id_proyecto: se obtiene vía Actividad → Etapa → Proyecto.';

COMMENT ON COLUMN actividad.id_usuario IS
'Desarrollador responsable. Puede ser NULL mientras la actividad está en estado Pendiente de asignación.';
-- ============================================================
-- IKernell Solutions
-- Script: 05_error_interrupcion.sql
-- Descripción:
-- Registro de errores e interrupciones ocurridos durante
-- la ejecución de actividades.
-- Fuente de verdad: 06.6-diseno-logico-base-de-datos.md
-- ============================================================

-- ============================================================
-- TABLA: registro_error
-- ============================================================

CREATE TABLE registro_error
(
    id_registro_error INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_registro_error VARCHAR(20) NOT NULL,

    id_actividad INTEGER NOT NULL,

    id_tipo_error INTEGER NOT NULL,

    titulo VARCHAR(100) NOT NULL,

    descripcion TEXT NOT NULL,

    severidad VARCHAR(20) NOT NULL,

    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_registro_error
        PRIMARY KEY (id_registro_error),

    CONSTRAINT fk_registro_error_actividad
        FOREIGN KEY (id_actividad)
        REFERENCES actividad(id_actividad)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_registro_error_tipo
        FOREIGN KEY (id_tipo_error)
        REFERENCES tipo_error(id_tipo_error)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_registro_error_codigo
        UNIQUE (codigo_registro_error),

    CONSTRAINT ck_registro_error_descripcion
        CHECK (LENGTH(TRIM(descripcion)) >= 3),

    CONSTRAINT ck_registro_error_severidad
        CHECK (severidad IN ('Baja', 'Media', 'Alta', 'Crítica')),
        
    CONSTRAINT ck_registro_error_titulo
	CHECK
	(
	    LENGTH(TRIM(titulo)) >= 3
	)
);

COMMENT ON TABLE registro_error IS
'Errores detectados durante la ejecución de una actividad.';


-- ============================================================
-- TABLA: interrupcion
-- ============================================================

CREATE TABLE interrupcion
(
    id_interrupcion INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_interrupcion VARCHAR(20) NOT NULL,

    id_actividad INTEGER NOT NULL,

    id_tipo_interrupcion INTEGER NOT NULL,

    motivo TEXT NOT NULL,

    duracion_minutos INTEGER NOT NULL,

    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_interrupcion
        PRIMARY KEY (id_interrupcion),

    CONSTRAINT fk_interrupcion_actividad
        FOREIGN KEY (id_actividad)
        REFERENCES actividad(id_actividad)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_interrupcion_tipo
        FOREIGN KEY (id_tipo_interrupcion)
        REFERENCES tipo_interrupcion(id_tipo_interrupcion)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_interrupcion_codigo
        UNIQUE (codigo_interrupcion),

    CONSTRAINT ck_interrupcion_motivo
        CHECK (LENGTH(TRIM(motivo)) >= 3),

    CONSTRAINT ck_interrupcion_duracion
        CHECK (duracion_minutos > 0)
);

COMMENT ON TABLE interrupcion IS
'Interrupciones puntuales que afectan la ejecución de una actividad. La duración se almacena en minutos; no se guardan fecha_inicio/fecha_fin para evitar redundancia.';
-- ============================================================
-- IKernell Solutions
-- Script: 06_comunicacion_auditoria.sql
-- Descripción:
-- Mensajes de contacto, notificaciones y trazabilidad.
-- Fuente de verdad: 06.6-diseno-logico-base-de-datos.md
-- ============================================================

-- ============================================================
-- TABLA: mensaje_contacto
-- ============================================================

CREATE TABLE mensaje_contacto
(
    id_mensaje_contacto INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_mensaje VARCHAR(20) NOT NULL,

    nombre_remitente VARCHAR(120) NOT NULL,

    correo_electronico VARCHAR(150) NOT NULL,

    asunto VARCHAR(150) NOT NULL,

    detalle TEXT NOT NULL,

    estado VARCHAR(30) NOT NULL DEFAULT 'Pendiente',
    
    respuesta TEXT,

    id_responsable INTEGER,

    fecha_envio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    fecha_atencion TIMESTAMP,

    CONSTRAINT pk_mensaje_contacto
        PRIMARY KEY (id_mensaje_contacto),

    CONSTRAINT fk_mensaje_contacto_responsable
        FOREIGN KEY (id_responsable)
        REFERENCES usuario(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_mensaje_contacto_codigo
        UNIQUE (codigo_mensaje),

    CONSTRAINT ck_mensaje_contacto_nombre
        CHECK (LENGTH(TRIM(nombre_remitente)) >= 3),

    CONSTRAINT ck_mensaje_contacto_correo
        CHECK (correo_electronico = LOWER(correo_electronico)),

    CONSTRAINT ck_mensaje_contacto_estado
        CHECK (estado IN ('Pendiente', 'Leído', 'Atendido')),
        
                
    CONSTRAINT ck_mensaje_contacto_respuesta
	CHECK
	(
	    respuesta IS NULL
	    OR LENGTH(TRIM(respuesta)) >= 3
	),

    CONSTRAINT ck_mensaje_contacto_atencion
        CHECK (
            (estado <> 'Atendido')
            OR (id_responsable IS NOT NULL AND fecha_atencion IS NOT NULL AND respuesta IS NOT NULL))
       
);

COMMENT ON TABLE mensaje_contacto IS
'Mensajes enviados desde el portal público para seguimiento y atención del Coordinador.';

COMMENT ON COLUMN mensaje_contacto.id_responsable IS
'Coordinador que atendió el mensaje. Obligatorio cuando estado = Atendido.';

COMMENT ON COLUMN mensaje_contacto.respuesta IS
'Respuesta enviada al remitente cuando el mensaje fue atendido.';


-- ============================================================
-- TABLA: notificacion
-- ============================================================

CREATE TABLE notificacion
(
    id_notificacion INTEGER GENERATED ALWAYS AS IDENTITY,

    codigo_notificacion VARCHAR(20) NOT NULL,

    id_usuario INTEGER NOT NULL,

    titulo VARCHAR(150) NOT NULL,

    detalle TEXT NOT NULL,

    tipo VARCHAR(30) NOT NULL,

    leida BOOLEAN NOT NULL DEFAULT FALSE,

    url_destino VARCHAR(255),

    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    fecha_lectura TIMESTAMP,

    CONSTRAINT pk_notificacion
        PRIMARY KEY (id_notificacion),

    CONSTRAINT fk_notificacion_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_notificacion_codigo
        UNIQUE (codigo_notificacion),

    CONSTRAINT ck_notificacion_tipo
        CHECK (tipo IN ('Actividad', 'Proyecto', 'Error', 'Interrupción', 'Mensaje', 'Sistema')),

    CONSTRAINT ck_notificacion_lectura
        CHECK (
            (leida = FALSE AND fecha_lectura IS NULL)
            OR (leida = TRUE AND fecha_lectura IS NOT NULL)
        )
);

COMMENT ON TABLE notificacion IS
'Notificaciones generadas automáticamente por el sistema para informar eventos relevantes al usuario.';


-- ============================================================
-- TABLA: trazabilidad
-- ============================================================

CREATE TABLE trazabilidad
(
    id_trazabilidad INTEGER GENERATED ALWAYS AS IDENTITY,

    id_usuario INTEGER NOT NULL,

    entidad VARCHAR(100) NOT NULL,

    codigo_registro VARCHAR(20) NOT NULL,

    operacion VARCHAR(20) NOT NULL,

    detalle TEXT,

    direccion_ip VARCHAR(45),

    fecha_evento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    CONSTRAINT pk_trazabilidad
        PRIMARY KEY (id_trazabilidad),

    CONSTRAINT fk_trazabilidad_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT ck_trazabilidad_operacion
        CHECK (operacion IN (
            'Crear',
            'Actualizar',
            'Inhabilitar',
            'Cambiar Estado',
            'Asignar',
            'Desasignar',
            'Autenticar'
        ))
);

COMMENT ON TABLE trazabilidad IS
'Entidad transversal de auditoría; registra automáticamente las operaciones sobre las entidades auditables del sistema.';

COMMENT ON COLUMN trazabilidad.codigo_registro IS
'Código funcional del registro auditado (por ejemplo PRO-001, ACT-002).';
-- ============================================================
-- IKernell Solutions
-- Script: 07_indexes.sql
-- Descripción:
-- Índices para optimizar consultas frecuentes.
-- Nota: las columnas con restricción UNIQUE (codigo_*, correo_electronico,
-- numero_identificacion) ya cuentan con un índice implícito en PostgreSQL;
-- no se duplican aquí.
-- ============================================================

-- Usuario: FKs no cubiertas por índice único
CREATE INDEX idx_usuario_rol
    ON usuario(id_rol);

CREATE INDEX idx_usuario_profesion
    ON usuario(id_profesion);

CREATE INDEX idx_usuario_especialidad
    ON usuario(id_especialidad);

CREATE INDEX idx_usuario_activo
    ON usuario(activo);

-- Proyecto
CREATE INDEX idx_proyecto_estado
    ON proyecto(estado);

-- Asignación de proyecto
CREATE INDEX idx_asignacion_proyecto_usuario
    ON asignacion_proyecto(id_usuario);

CREATE INDEX idx_asignacion_proyecto_proyecto
    ON asignacion_proyecto(id_proyecto);

-- Etapa
CREATE INDEX idx_etapa_proyecto
    ON etapa(id_proyecto);

CREATE INDEX idx_etapa_estado
    ON etapa(estado);

-- Actividad
CREATE INDEX idx_actividad_etapa
    ON actividad(id_etapa);

CREATE INDEX idx_actividad_usuario
    ON actividad(id_usuario);

CREATE INDEX idx_actividad_estado
    ON actividad(estado);

CREATE INDEX idx_actividad_prioridad
    ON actividad(prioridad);

-- Registro de error
CREATE INDEX idx_registro_error_actividad
    ON registro_error(id_actividad);

CREATE INDEX idx_registro_error_tipo
    ON registro_error(id_tipo_error);

-- Interrupción
CREATE INDEX idx_interrupcion_actividad
    ON interrupcion(id_actividad);

CREATE INDEX idx_interrupcion_tipo
    ON interrupcion(id_tipo_interrupcion);

-- Mensaje de contacto
CREATE INDEX idx_mensaje_contacto_estado
    ON mensaje_contacto(estado);

CREATE INDEX idx_mensaje_contacto_responsable
    ON mensaje_contacto(id_responsable);

-- Notificación
CREATE INDEX idx_notificacion_usuario
    ON notificacion(id_usuario);

CREATE INDEX idx_notificacion_leida
    ON notificacion(leida);

-- Trazabilidad
CREATE INDEX idx_trazabilidad_usuario
    ON trazabilidad(id_usuario);

CREATE INDEX idx_trazabilidad_entidad
    ON trazabilidad(entidad);

CREATE INDEX idx_trazabilidad_fecha
    ON trazabilidad(fecha_evento);

CREATE INDEX idx_trazabilidad_entidad_registro
    ON trazabilidad (entidad, codigo_registro);
