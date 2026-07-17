-- ============================================================
-- V1 -- Baseline del schema completo de IKernell V2.
--
-- Generado con pg_dump --schema-only --no-owner --no-privileges
-- --format=plain a partir de la base de datos de desarrollo, y
-- validado arrancando la app contra una base nueva creada solo
-- con este script, con spring.jpa.hibernate.ddl-auto=validate
-- (Hibernate confirma que cada entidad JPA coincide exactamente
-- con esta estructura, columna por columna).
--
-- Instalaciones NUEVAS: Flyway ejecuta este script automáticamente
-- al arrancar la app por primera vez contra una base vacía -- ya
-- no hace falta correr ningún .sql a mano.
--
-- Instalaciones EXISTENTES (base ya creada antes de adoptar
-- Flyway): ver spring.flyway.baseline-on-migrate=true en
-- application.properties -- Flyway detecta que las tablas ya
-- existen y marca esta versión como aplicada sin re-ejecutarla.
--
-- A partir de acá, cualquier cambio de schema es un archivo NUEVO
-- V2__descripcion.sql, V3__descripcion.sql, etc. en este mismo
-- directorio -- nunca editar este archivo ni alterar la base a
-- mano. Ver AGENTS.md, sección "Base de datos".
-- ============================================================

--
-- PostgreSQL database dump
--


-- Dumped from database version 14.23 (Ubuntu 14.23-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.23 (Ubuntu 14.23-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: actividad; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.actividad (
    id_actividad integer NOT NULL,
    codigo_actividad character varying(40) NOT NULL,
    id_etapa integer NOT NULL,
    id_usuario integer,
    nombre_actividad character varying(150) NOT NULL,
    descripcion text,
    prioridad character varying(20) NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado character varying(30) NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    fecha_finalizacion timestamp without time zone,
    nota_finalizacion text,
    CONSTRAINT ck_actividad_estado CHECK (((estado)::text = ANY ((ARRAY['Pendiente de asignación'::character varying, 'Pendiente'::character varying, 'En desarrollo'::character varying, 'Finalizada'::character varying, 'Cancelada'::character varying])::text[]))),
    CONSTRAINT ck_actividad_estado_asignacion CHECK (((((estado)::text = 'Pendiente de asignación'::text) AND (id_usuario IS NULL)) OR (((estado)::text <> 'Pendiente de asignación'::text) AND (id_usuario IS NOT NULL)))),
    CONSTRAINT ck_actividad_fechas CHECK ((fecha_fin >= fecha_inicio)),
    CONSTRAINT ck_actividad_nombre CHECK ((length(TRIM(BOTH FROM nombre_actividad)) >= 3)),
    CONSTRAINT ck_actividad_prioridad CHECK (((prioridad)::text = ANY ((ARRAY['Baja'::character varying, 'Media'::character varying, 'Alta'::character varying, 'Crítica'::character varying])::text[])))
);


--
-- Name: TABLE actividad; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.actividad IS 'Trabajo asignado a un desarrollador dentro de una etapa. No almacena id_proyecto: se obtiene vía Actividad → Etapa → Proyecto.';


--
-- Name: COLUMN actividad.id_usuario; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.actividad.id_usuario IS 'Desarrollador responsable. Puede ser NULL mientras la actividad está en estado Pendiente de asignación.';


--
-- Name: COLUMN actividad.fecha_finalizacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.actividad.fecha_finalizacion IS 'Momento en que la actividad pasó a estado Finalizada. NULL si nunca se finalizó (o si se movió a Cancelada). La pone ActividadService.cambiarEstado(), no tiene DEFAULT ni trigger.';


--
-- Name: actividad_id_actividad_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.actividad ALTER COLUMN id_actividad ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.actividad_id_actividad_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: asignacion_proyecto; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asignacion_proyecto (
    id_asignacion_proyecto integer NOT NULL,
    id_usuario integer NOT NULL,
    id_proyecto integer NOT NULL,
    rol_proyecto character varying(30) NOT NULL,
    fecha_asignacion date DEFAULT CURRENT_DATE NOT NULL,
    fecha_desvinculacion date,
    CONSTRAINT ck_asignacion_proyecto_fechas CHECK (((fecha_desvinculacion IS NULL) OR (fecha_desvinculacion >= fecha_asignacion))),
    CONSTRAINT ck_asignacion_proyecto_rol CHECK (((rol_proyecto)::text = ANY ((ARRAY['Líder'::character varying, 'Desarrollador'::character varying])::text[])))
);


--
-- Name: TABLE asignacion_proyecto; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.asignacion_proyecto IS 'Relación N:M entre usuario y proyecto; representa el equipo de trabajo de cada proyecto.';


--
-- Name: COLUMN asignacion_proyecto.rol_proyecto; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.asignacion_proyecto.rol_proyecto IS 'Rol del usuario dentro del proyecto (Líder o Desarrollador), independiente del rol global.';


--
-- Name: COLUMN asignacion_proyecto.fecha_desvinculacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.asignacion_proyecto.fecha_desvinculacion IS 'Fecha en que el usuario dejó de pertenecer al proyecto. NULL indica asignación vigente.';


--
-- Name: asignacion_proyecto_id_asignacion_proyecto_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.asignacion_proyecto ALTER COLUMN id_asignacion_proyecto ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.asignacion_proyecto_id_asignacion_proyecto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: especialidad; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.especialidad (
    id_especialidad integer NOT NULL,
    codigo_especialidad character varying(20) NOT NULL,
    nombre_especialidad character varying(100) NOT NULL,
    descripcion text,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    CONSTRAINT ck_especialidad_descripcion CHECK (((descripcion IS NULL) OR (length(TRIM(BOTH FROM descripcion)) > 0))),
    CONSTRAINT ck_especialidad_nombre CHECK ((length(TRIM(BOTH FROM nombre_especialidad)) >= 3))
);


--
-- Name: TABLE especialidad; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.especialidad IS 'Catálogo de especialidades disponibles para los trabajadores.';


--
-- Name: COLUMN especialidad.codigo_especialidad; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.especialidad.codigo_especialidad IS 'Código único de la especialidad.';


--
-- Name: COLUMN especialidad.nombre_especialidad; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.especialidad.nombre_especialidad IS 'Nombre de la especialidad.';


--
-- Name: COLUMN especialidad.descripcion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.especialidad.descripcion IS 'Descripción de la especialidad.';


--
-- Name: COLUMN especialidad.activo; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.especialidad.activo IS 'Indica si la especialidad se encuentra disponible para asignación.';


--
-- Name: COLUMN especialidad.fecha_creacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.especialidad.fecha_creacion IS 'Fecha de creación del registro.';


--
-- Name: especialidad_id_especialidad_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.especialidad ALTER COLUMN id_especialidad ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.especialidad_id_especialidad_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: etapa; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.etapa (
    id_etapa integer NOT NULL,
    codigo_etapa character varying(30) NOT NULL,
    id_proyecto integer NOT NULL,
    nombre_etapa character varying(120) NOT NULL,
    descripcion text,
    orden integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado character varying(30) NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    CONSTRAINT ck_etapa_estado CHECK (((estado)::text = ANY ((ARRAY['Pendiente'::character varying, 'En ejecución'::character varying, 'Finalizada'::character varying])::text[]))),
    CONSTRAINT ck_etapa_fechas CHECK ((fecha_fin >= fecha_inicio)),
    CONSTRAINT ck_etapa_nombre CHECK ((length(TRIM(BOTH FROM nombre_etapa)) >= 3)),
    CONSTRAINT ck_etapa_orden CHECK ((orden > 0))
);


--
-- Name: TABLE etapa; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.etapa IS 'Fases que componen un proyecto.';


--
-- Name: COLUMN etapa.orden; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.etapa.orden IS 'Posición ordinal de la etapa dentro del proyecto; única por proyecto.';


--
-- Name: COLUMN etapa.estado; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.etapa.estado IS 'Estado del ciclo de vida de la etapa: Pendiente, En ejecución, Finalizada.';


--
-- Name: etapa_id_etapa_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.etapa ALTER COLUMN id_etapa ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.etapa_id_etapa_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: interrupcion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.interrupcion (
    id_interrupcion integer NOT NULL,
    codigo_interrupcion character varying(50) NOT NULL,
    id_actividad integer NOT NULL,
    id_tipo_interrupcion integer NOT NULL,
    motivo text NOT NULL,
    duracion_minutos integer NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    id_usuario_creador integer,
    CONSTRAINT ck_interrupcion_duracion CHECK ((duracion_minutos > 0)),
    CONSTRAINT ck_interrupcion_motivo CHECK ((length(TRIM(BOTH FROM motivo)) >= 3))
);


--
-- Name: TABLE interrupcion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.interrupcion IS 'Interrupciones puntuales que afectan la ejecución de una actividad. La duración se almacena en minutos; no se guardan fecha_inicio/fecha_fin para evitar redundancia.';


--
-- Name: interrupcion_id_interrupcion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.interrupcion ALTER COLUMN id_interrupcion ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.interrupcion_id_interrupcion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: mensaje_contacto; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mensaje_contacto (
    id_mensaje_contacto integer NOT NULL,
    codigo_mensaje character varying(20) NOT NULL,
    nombre_remitente character varying(120) NOT NULL,
    correo_electronico character varying(150) NOT NULL,
    asunto character varying(150) NOT NULL,
    detalle text NOT NULL,
    estado character varying(30) DEFAULT 'Pendiente'::character varying NOT NULL,
    respuesta text,
    id_responsable integer,
    fecha_envio timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    fecha_atencion timestamp without time zone,
    CONSTRAINT ck_mensaje_contacto_atencion CHECK ((((estado)::text <> 'Atendido'::text) OR ((id_responsable IS NOT NULL) AND (fecha_atencion IS NOT NULL) AND (respuesta IS NOT NULL)))),
    CONSTRAINT ck_mensaje_contacto_correo CHECK (((correo_electronico)::text = lower((correo_electronico)::text))),
    CONSTRAINT ck_mensaje_contacto_estado CHECK (((estado)::text = ANY ((ARRAY['Pendiente'::character varying, 'Leído'::character varying, 'Atendido'::character varying])::text[]))),
    CONSTRAINT ck_mensaje_contacto_nombre CHECK ((length(TRIM(BOTH FROM nombre_remitente)) >= 3)),
    CONSTRAINT ck_mensaje_contacto_respuesta CHECK (((respuesta IS NULL) OR (length(TRIM(BOTH FROM respuesta)) >= 3)))
);


--
-- Name: TABLE mensaje_contacto; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.mensaje_contacto IS 'Mensajes enviados desde el portal público para seguimiento y atención del Coordinador.';


--
-- Name: COLUMN mensaje_contacto.respuesta; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.mensaje_contacto.respuesta IS 'Respuesta enviada al remitente cuando el mensaje fue atendido.';


--
-- Name: COLUMN mensaje_contacto.id_responsable; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.mensaje_contacto.id_responsable IS 'Coordinador que atendió el mensaje. Obligatorio cuando estado = Atendido.';


--
-- Name: mensaje_contacto_id_mensaje_contacto_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.mensaje_contacto ALTER COLUMN id_mensaje_contacto ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.mensaje_contacto_id_mensaje_contacto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: notificacion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notificacion (
    id_notificacion integer NOT NULL,
    codigo_notificacion character varying(20) NOT NULL,
    id_usuario integer NOT NULL,
    titulo character varying(150) NOT NULL,
    detalle text NOT NULL,
    tipo character varying(30) NOT NULL,
    leida boolean DEFAULT false NOT NULL,
    url_destino character varying(255),
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    fecha_lectura timestamp without time zone,
    CONSTRAINT ck_notificacion_lectura CHECK ((((leida = false) AND (fecha_lectura IS NULL)) OR ((leida = true) AND (fecha_lectura IS NOT NULL)))),
    CONSTRAINT ck_notificacion_tipo CHECK (((tipo)::text = ANY ((ARRAY['Actividad'::character varying, 'Proyecto'::character varying, 'Error'::character varying, 'Interrupción'::character varying, 'Mensaje'::character varying, 'Sistema'::character varying])::text[])))
);


--
-- Name: TABLE notificacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.notificacion IS 'Notificaciones generadas automáticamente por el sistema para informar eventos relevantes al usuario.';


--
-- Name: notificacion_id_notificacion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.notificacion ALTER COLUMN id_notificacion ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.notificacion_id_notificacion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: profesion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profesion (
    id_profesion integer NOT NULL,
    codigo_profesion character varying(20) NOT NULL,
    nombre_profesion character varying(100) NOT NULL,
    descripcion text,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    CONSTRAINT ck_profesion_descripcion CHECK (((descripcion IS NULL) OR (length(TRIM(BOTH FROM descripcion)) > 0))),
    CONSTRAINT ck_profesion_nombre CHECK ((length(TRIM(BOTH FROM nombre_profesion)) >= 3))
);


--
-- Name: TABLE profesion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.profesion IS 'Catálogo de profesiones disponibles para los trabajadores.';


--
-- Name: COLUMN profesion.codigo_profesion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.profesion.codigo_profesion IS 'Código único de la profesión.';


--
-- Name: COLUMN profesion.nombre_profesion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.profesion.nombre_profesion IS 'Nombre de la profesión.';


--
-- Name: COLUMN profesion.descripcion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.profesion.descripcion IS 'Descripción de la profesión.';


--
-- Name: COLUMN profesion.activo; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.profesion.activo IS 'Indica si la profesión se encuentra disponible para asignación.';


--
-- Name: COLUMN profesion.fecha_creacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.profesion.fecha_creacion IS 'Fecha de creación del registro.';


--
-- Name: profesion_id_profesion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.profesion ALTER COLUMN id_profesion ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profesion_id_profesion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: proyecto; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.proyecto (
    id_proyecto integer NOT NULL,
    codigo_proyecto character varying(20) NOT NULL,
    nombre_proyecto character varying(150) NOT NULL,
    descripcion text,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado character varying(30) NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    CONSTRAINT ck_proyecto_estado CHECK (((estado)::text = ANY ((ARRAY['Planeación'::character varying, 'En ejecución'::character varying, 'Finalizado'::character varying, 'Suspendido'::character varying, 'Cancelado'::character varying])::text[]))),
    CONSTRAINT ck_proyecto_fechas CHECK ((fecha_fin >= fecha_inicio)),
    CONSTRAINT ck_proyecto_nombre CHECK ((length(TRIM(BOTH FROM nombre_proyecto)) >= 3))
);


--
-- Name: TABLE proyecto; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.proyecto IS 'Proyectos gestionados por la organización.';


--
-- Name: COLUMN proyecto.codigo_proyecto; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.proyecto.codigo_proyecto IS 'Código funcional único del proyecto.';


--
-- Name: COLUMN proyecto.estado; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.proyecto.estado IS 'Estado del ciclo de vida del proyecto: Planeación, En ejecución, Finalizado, Suspendido, Cancelado.';


--
-- Name: COLUMN proyecto.fecha_creacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.proyecto.fecha_creacion IS 'Fecha de creación del registro.';


--
-- Name: proyecto_id_proyecto_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.proyecto ALTER COLUMN id_proyecto ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.proyecto_id_proyecto_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: registro_error; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.registro_error (
    id_registro_error integer NOT NULL,
    codigo_registro_error character varying(50) NOT NULL,
    id_actividad integer NOT NULL,
    id_tipo_error integer NOT NULL,
    titulo character varying(100) NOT NULL,
    descripcion text NOT NULL,
    severidad character varying(20) NOT NULL,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    estado character varying(30) NOT NULL,
    nota_resolucion text,
    id_usuario_creador integer,
    CONSTRAINT ck_registro_error_descripcion CHECK ((length(TRIM(BOTH FROM descripcion)) >= 3)),
    CONSTRAINT ck_registro_error_estado CHECK (((estado)::text = ANY (ARRAY[('Abierto'::character varying)::text, ('En progreso'::character varying)::text, ('Resuelto'::character varying)::text, ('Descartado'::character varying)::text]))),
    CONSTRAINT ck_registro_error_severidad CHECK (((severidad)::text = ANY ((ARRAY['Baja'::character varying, 'Media'::character varying, 'Alta'::character varying, 'Crítica'::character varying])::text[]))),
    CONSTRAINT ck_registro_error_titulo CHECK ((length(TRIM(BOTH FROM titulo)) >= 3))
);


--
-- Name: TABLE registro_error; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.registro_error IS 'Errores detectados durante la ejecución de una actividad.';


--
-- Name: COLUMN registro_error.estado; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.registro_error.estado IS 'Ciclo de vida del error: Abierto -> En progreso -> Resuelto/Descartado. Sin restricción de rol para cambiarlo (igual que actividad.estado).';


--
-- Name: registro_error_id_registro_error_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.registro_error ALTER COLUMN id_registro_error ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.registro_error_id_registro_error_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: rol; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rol (
    id_rol integer NOT NULL,
    codigo_rol character varying(20) NOT NULL,
    nombre_rol character varying(100) NOT NULL,
    descripcion text,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    CONSTRAINT ck_rol_descripcion CHECK (((descripcion IS NULL) OR (length(TRIM(BOTH FROM descripcion)) > 0))),
    CONSTRAINT ck_rol_nombre CHECK ((length(TRIM(BOTH FROM nombre_rol)) >= 3))
);


--
-- Name: TABLE rol; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.rol IS 'Catálogo de roles del sistema.';


--
-- Name: COLUMN rol.codigo_rol; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.rol.codigo_rol IS 'Código funcional único del rol.';


--
-- Name: COLUMN rol.nombre_rol; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.rol.nombre_rol IS 'Nombre del rol.';


--
-- Name: COLUMN rol.descripcion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.rol.descripcion IS 'Descripción del rol.';


--
-- Name: COLUMN rol.activo; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.rol.activo IS 'Indica si el rol se encuentra disponible para su utilización.';


--
-- Name: COLUMN rol.fecha_creacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.rol.fecha_creacion IS 'Fecha de creación del registro.';


--
-- Name: rol_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.rol ALTER COLUMN id_rol ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rol_id_rol_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tipo_error; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tipo_error (
    id_tipo_error integer NOT NULL,
    codigo_tipo_error character varying(20) NOT NULL,
    nombre_tipo_error character varying(100) NOT NULL,
    descripcion text,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    CONSTRAINT ck_tipo_error_descripcion CHECK (((descripcion IS NULL) OR (length(TRIM(BOTH FROM descripcion)) > 0))),
    CONSTRAINT ck_tipo_error_nombre CHECK ((length(TRIM(BOTH FROM nombre_tipo_error)) >= 3))
);


--
-- Name: TABLE tipo_error; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.tipo_error IS 'Catálogo de tipos de error utilizados durante el registro de errores.';


--
-- Name: COLUMN tipo_error.codigo_tipo_error; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.tipo_error.codigo_tipo_error IS 'Código único del tipo de error.';


--
-- Name: COLUMN tipo_error.nombre_tipo_error; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.tipo_error.nombre_tipo_error IS 'Nombre del tipo de error.';


--
-- Name: COLUMN tipo_error.descripcion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.tipo_error.descripcion IS 'Descripción del tipo de error.';


--
-- Name: COLUMN tipo_error.activo; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.tipo_error.activo IS 'Indica si el tipo de error puede utilizarse.';


--
-- Name: COLUMN tipo_error.fecha_creacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.tipo_error.fecha_creacion IS 'Fecha de creación del registro.';


--
-- Name: tipo_error_id_tipo_error_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.tipo_error ALTER COLUMN id_tipo_error ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tipo_error_id_tipo_error_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tipo_interrupcion; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tipo_interrupcion (
    id_tipo_interrupcion integer NOT NULL,
    codigo_tipo_interrupcion character varying(20) NOT NULL,
    nombre_tipo_interrupcion character varying(100) NOT NULL,
    descripcion text,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    CONSTRAINT ck_tipo_interrupcion_descripcion CHECK (((descripcion IS NULL) OR (length(TRIM(BOTH FROM descripcion)) > 0))),
    CONSTRAINT ck_tipo_interrupcion_nombre CHECK ((length(TRIM(BOTH FROM nombre_tipo_interrupcion)) >= 3))
);


--
-- Name: TABLE tipo_interrupcion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.tipo_interrupcion IS 'Catálogo de tipos de interrupción utilizados durante el registro de interrupciones.';


--
-- Name: COLUMN tipo_interrupcion.codigo_tipo_interrupcion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.tipo_interrupcion.codigo_tipo_interrupcion IS 'Código único del tipo de interrupción.';


--
-- Name: COLUMN tipo_interrupcion.nombre_tipo_interrupcion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.tipo_interrupcion.nombre_tipo_interrupcion IS 'Nombre del tipo de interrupción.';


--
-- Name: COLUMN tipo_interrupcion.descripcion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.tipo_interrupcion.descripcion IS 'Descripción del tipo de interrupción.';


--
-- Name: COLUMN tipo_interrupcion.activo; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.tipo_interrupcion.activo IS 'Indica si el tipo de interrupción puede utilizarse.';


--
-- Name: COLUMN tipo_interrupcion.fecha_creacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.tipo_interrupcion.fecha_creacion IS 'Fecha de creación del registro.';


--
-- Name: tipo_interrupcion_id_tipo_interrupcion_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.tipo_interrupcion ALTER COLUMN id_tipo_interrupcion ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tipo_interrupcion_id_tipo_interrupcion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: trazabilidad; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.trazabilidad (
    id_trazabilidad integer NOT NULL,
    id_usuario integer NOT NULL,
    entidad character varying(100) NOT NULL,
    codigo_registro character varying(60) NOT NULL,
    operacion character varying(20) NOT NULL,
    detalle text,
    direccion_ip character varying(45),
    fecha_evento timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    CONSTRAINT ck_trazabilidad_operacion CHECK (((operacion)::text = ANY (ARRAY[('Crear'::character varying)::text, ('Actualizar'::character varying)::text, ('Inhabilitar'::character varying)::text, ('Cambiar Estado'::character varying)::text, ('Asignar'::character varying)::text, ('Desasignar'::character varying)::text, ('Autenticar'::character varying)::text, ('Eliminar'::character varying)::text])))
);


--
-- Name: TABLE trazabilidad; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.trazabilidad IS 'Entidad transversal de auditoría; registra automáticamente las operaciones sobre las entidades auditables del sistema.';


--
-- Name: COLUMN trazabilidad.codigo_registro; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.trazabilidad.codigo_registro IS 'Código funcional del registro auditado (por ejemplo PRO-001, ACT-002).';


--
-- Name: trazabilidad_id_trazabilidad_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.trazabilidad ALTER COLUMN id_trazabilidad ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.trazabilidad_id_trazabilidad_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    codigo_usuario character varying(20) NOT NULL,
    nombres character varying(100) NOT NULL,
    apellidos character varying(100) NOT NULL,
    tipo_identificacion character varying(10) NOT NULL,
    numero_identificacion character varying(30) NOT NULL,
    fecha_nacimiento date NOT NULL,
    correo_electronico character varying(150) NOT NULL,
    hash_contrasena character varying(255) NOT NULL,
    ciudad character varying(100) NOT NULL,
    id_rol integer NOT NULL,
    id_profesion integer NOT NULL,
    id_especialidad integer NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
    CONSTRAINT ck_usuario_apellidos CHECK ((length(TRIM(BOTH FROM apellidos)) >= 3)),
    CONSTRAINT ck_usuario_correo CHECK (((correo_electronico)::text = lower((correo_electronico)::text))),
    CONSTRAINT ck_usuario_fecha_nacimiento CHECK ((fecha_nacimiento <= CURRENT_DATE)),
    CONSTRAINT ck_usuario_nombres CHECK ((length(TRIM(BOTH FROM nombres)) >= 3)),
    CONSTRAINT ck_usuario_tipo_identificacion CHECK (((tipo_identificacion)::text = ANY ((ARRAY['CC'::character varying, 'CE'::character varying, 'TI'::character varying])::text[])))
);


--
-- Name: TABLE usuario; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.usuario IS 'Trabajadores registrados en el sistema.';


--
-- Name: COLUMN usuario.codigo_usuario; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.codigo_usuario IS 'Código funcional único del usuario.';


--
-- Name: COLUMN usuario.nombres; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.nombres IS 'Nombres del trabajador.';


--
-- Name: COLUMN usuario.apellidos; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.apellidos IS 'Apellidos del trabajador.';


--
-- Name: COLUMN usuario.tipo_identificacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.tipo_identificacion IS 'Tipo de documento de identidad.';


--
-- Name: COLUMN usuario.numero_identificacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.numero_identificacion IS 'Número de documento de identidad.';


--
-- Name: COLUMN usuario.fecha_nacimiento; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.fecha_nacimiento IS 'Fecha de nacimiento del trabajador.';


--
-- Name: COLUMN usuario.correo_electronico; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.correo_electronico IS 'Correo electrónico utilizado para autenticación.';


--
-- Name: COLUMN usuario.hash_contrasena; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.hash_contrasena IS 'Contraseña cifrada mediante BCrypt.';


--
-- Name: COLUMN usuario.ciudad; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.ciudad IS 'Ciudad de residencia del trabajador.';


--
-- Name: COLUMN usuario.id_profesion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.id_profesion IS 'Profesión del perfil profesional del trabajador (obligatoria).';


--
-- Name: COLUMN usuario.id_especialidad; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.id_especialidad IS 'Especialidad del perfil profesional del trabajador (obligatoria).';


--
-- Name: COLUMN usuario.activo; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.activo IS 'Indica si el usuario puede acceder al sistema.';


--
-- Name: COLUMN usuario.fecha_creacion; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.usuario.fecha_creacion IS 'Fecha de creación del registro.';


--
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.usuario ALTER COLUMN id_usuario ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuario_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: actividad pk_actividad; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT pk_actividad PRIMARY KEY (id_actividad);


--
-- Name: asignacion_proyecto pk_asignacion_proyecto; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asignacion_proyecto
    ADD CONSTRAINT pk_asignacion_proyecto PRIMARY KEY (id_asignacion_proyecto);


--
-- Name: especialidad pk_especialidad; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.especialidad
    ADD CONSTRAINT pk_especialidad PRIMARY KEY (id_especialidad);


--
-- Name: etapa pk_etapa; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.etapa
    ADD CONSTRAINT pk_etapa PRIMARY KEY (id_etapa);


--
-- Name: interrupcion pk_interrupcion; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interrupcion
    ADD CONSTRAINT pk_interrupcion PRIMARY KEY (id_interrupcion);


--
-- Name: mensaje_contacto pk_mensaje_contacto; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mensaje_contacto
    ADD CONSTRAINT pk_mensaje_contacto PRIMARY KEY (id_mensaje_contacto);


--
-- Name: notificacion pk_notificacion; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notificacion
    ADD CONSTRAINT pk_notificacion PRIMARY KEY (id_notificacion);


--
-- Name: profesion pk_profesion; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profesion
    ADD CONSTRAINT pk_profesion PRIMARY KEY (id_profesion);


--
-- Name: proyecto pk_proyecto; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyecto
    ADD CONSTRAINT pk_proyecto PRIMARY KEY (id_proyecto);


--
-- Name: registro_error pk_registro_error; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registro_error
    ADD CONSTRAINT pk_registro_error PRIMARY KEY (id_registro_error);


--
-- Name: rol pk_rol; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT pk_rol PRIMARY KEY (id_rol);


--
-- Name: tipo_error pk_tipo_error; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_error
    ADD CONSTRAINT pk_tipo_error PRIMARY KEY (id_tipo_error);


--
-- Name: tipo_interrupcion pk_tipo_interrupcion; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_interrupcion
    ADD CONSTRAINT pk_tipo_interrupcion PRIMARY KEY (id_tipo_interrupcion);


--
-- Name: trazabilidad pk_trazabilidad; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trazabilidad
    ADD CONSTRAINT pk_trazabilidad PRIMARY KEY (id_trazabilidad);


--
-- Name: usuario pk_usuario; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT pk_usuario PRIMARY KEY (id_usuario);


--
-- Name: actividad uq_actividad_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT uq_actividad_codigo UNIQUE (codigo_actividad);


--
-- Name: especialidad uq_especialidad_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.especialidad
    ADD CONSTRAINT uq_especialidad_codigo UNIQUE (codigo_especialidad);


--
-- Name: especialidad uq_especialidad_nombre; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.especialidad
    ADD CONSTRAINT uq_especialidad_nombre UNIQUE (nombre_especialidad);


--
-- Name: etapa uq_etapa_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.etapa
    ADD CONSTRAINT uq_etapa_codigo UNIQUE (codigo_etapa);


--
-- Name: etapa uq_etapa_orden_proyecto; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.etapa
    ADD CONSTRAINT uq_etapa_orden_proyecto UNIQUE (id_proyecto, orden);


--
-- Name: interrupcion uq_interrupcion_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interrupcion
    ADD CONSTRAINT uq_interrupcion_codigo UNIQUE (codigo_interrupcion);


--
-- Name: mensaje_contacto uq_mensaje_contacto_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mensaje_contacto
    ADD CONSTRAINT uq_mensaje_contacto_codigo UNIQUE (codigo_mensaje);


--
-- Name: notificacion uq_notificacion_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notificacion
    ADD CONSTRAINT uq_notificacion_codigo UNIQUE (codigo_notificacion);


--
-- Name: profesion uq_profesion_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profesion
    ADD CONSTRAINT uq_profesion_codigo UNIQUE (codigo_profesion);


--
-- Name: profesion uq_profesion_nombre; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profesion
    ADD CONSTRAINT uq_profesion_nombre UNIQUE (nombre_profesion);


--
-- Name: proyecto uq_proyecto_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proyecto
    ADD CONSTRAINT uq_proyecto_codigo UNIQUE (codigo_proyecto);


--
-- Name: registro_error uq_registro_error_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registro_error
    ADD CONSTRAINT uq_registro_error_codigo UNIQUE (codigo_registro_error);


--
-- Name: rol uq_rol_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT uq_rol_codigo UNIQUE (codigo_rol);


--
-- Name: rol uq_rol_nombre; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT uq_rol_nombre UNIQUE (nombre_rol);


--
-- Name: tipo_error uq_tipo_error_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_error
    ADD CONSTRAINT uq_tipo_error_codigo UNIQUE (codigo_tipo_error);


--
-- Name: tipo_error uq_tipo_error_nombre; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_error
    ADD CONSTRAINT uq_tipo_error_nombre UNIQUE (nombre_tipo_error);


--
-- Name: tipo_interrupcion uq_tipo_interrupcion_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_interrupcion
    ADD CONSTRAINT uq_tipo_interrupcion_codigo UNIQUE (codigo_tipo_interrupcion);


--
-- Name: tipo_interrupcion uq_tipo_interrupcion_nombre; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tipo_interrupcion
    ADD CONSTRAINT uq_tipo_interrupcion_nombre UNIQUE (nombre_tipo_interrupcion);


--
-- Name: usuario uq_usuario_codigo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uq_usuario_codigo UNIQUE (codigo_usuario);


--
-- Name: usuario uq_usuario_correo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uq_usuario_correo UNIQUE (correo_electronico);


--
-- Name: usuario uq_usuario_identificacion; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT uq_usuario_identificacion UNIQUE (numero_identificacion);


--
-- Name: idx_actividad_estado; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_actividad_estado ON public.actividad USING btree (estado);


--
-- Name: idx_actividad_etapa; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_actividad_etapa ON public.actividad USING btree (id_etapa);


--
-- Name: idx_actividad_prioridad; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_actividad_prioridad ON public.actividad USING btree (prioridad);


--
-- Name: idx_actividad_usuario; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_actividad_usuario ON public.actividad USING btree (id_usuario);


--
-- Name: idx_asignacion_proyecto_proyecto; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asignacion_proyecto_proyecto ON public.asignacion_proyecto USING btree (id_proyecto);


--
-- Name: idx_asignacion_proyecto_usuario; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_asignacion_proyecto_usuario ON public.asignacion_proyecto USING btree (id_usuario);


--
-- Name: idx_etapa_estado; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_etapa_estado ON public.etapa USING btree (estado);


--
-- Name: idx_etapa_proyecto; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_etapa_proyecto ON public.etapa USING btree (id_proyecto);


--
-- Name: idx_interrupcion_actividad; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_interrupcion_actividad ON public.interrupcion USING btree (id_actividad);


--
-- Name: idx_interrupcion_tipo; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_interrupcion_tipo ON public.interrupcion USING btree (id_tipo_interrupcion);


--
-- Name: idx_mensaje_contacto_estado; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mensaje_contacto_estado ON public.mensaje_contacto USING btree (estado);


--
-- Name: idx_mensaje_contacto_responsable; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_mensaje_contacto_responsable ON public.mensaje_contacto USING btree (id_responsable);


--
-- Name: idx_notificacion_leida; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_notificacion_leida ON public.notificacion USING btree (leida);


--
-- Name: idx_notificacion_usuario; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_notificacion_usuario ON public.notificacion USING btree (id_usuario);


--
-- Name: idx_proyecto_estado; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_proyecto_estado ON public.proyecto USING btree (estado);


--
-- Name: idx_registro_error_actividad; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_registro_error_actividad ON public.registro_error USING btree (id_actividad);


--
-- Name: idx_registro_error_tipo; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_registro_error_tipo ON public.registro_error USING btree (id_tipo_error);


--
-- Name: idx_trazabilidad_entidad; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_trazabilidad_entidad ON public.trazabilidad USING btree (entidad);


--
-- Name: idx_trazabilidad_entidad_registro; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_trazabilidad_entidad_registro ON public.trazabilidad USING btree (entidad, codigo_registro);


--
-- Name: idx_trazabilidad_fecha; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_trazabilidad_fecha ON public.trazabilidad USING btree (fecha_evento);


--
-- Name: idx_trazabilidad_usuario; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_trazabilidad_usuario ON public.trazabilidad USING btree (id_usuario);


--
-- Name: idx_usuario_activo; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_usuario_activo ON public.usuario USING btree (activo);


--
-- Name: idx_usuario_especialidad; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_usuario_especialidad ON public.usuario USING btree (id_especialidad);


--
-- Name: idx_usuario_profesion; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_usuario_profesion ON public.usuario USING btree (id_profesion);


--
-- Name: idx_usuario_rol; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_usuario_rol ON public.usuario USING btree (id_rol);


--
-- Name: uq_asignacion_proyecto_vigente; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_asignacion_proyecto_vigente ON public.asignacion_proyecto USING btree (id_usuario, id_proyecto) WHERE (fecha_desvinculacion IS NULL);


--
-- Name: actividad fk_actividad_etapa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT fk_actividad_etapa FOREIGN KEY (id_etapa) REFERENCES public.etapa(id_etapa) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: actividad fk_actividad_usuario; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT fk_actividad_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: asignacion_proyecto fk_asignacion_proyecto_proyecto; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asignacion_proyecto
    ADD CONSTRAINT fk_asignacion_proyecto_proyecto FOREIGN KEY (id_proyecto) REFERENCES public.proyecto(id_proyecto) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: asignacion_proyecto fk_asignacion_proyecto_usuario; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asignacion_proyecto
    ADD CONSTRAINT fk_asignacion_proyecto_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: etapa fk_etapa_proyecto; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.etapa
    ADD CONSTRAINT fk_etapa_proyecto FOREIGN KEY (id_proyecto) REFERENCES public.proyecto(id_proyecto) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: interrupcion fk_interrupcion_actividad; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interrupcion
    ADD CONSTRAINT fk_interrupcion_actividad FOREIGN KEY (id_actividad) REFERENCES public.actividad(id_actividad) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: interrupcion fk_interrupcion_tipo; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interrupcion
    ADD CONSTRAINT fk_interrupcion_tipo FOREIGN KEY (id_tipo_interrupcion) REFERENCES public.tipo_interrupcion(id_tipo_interrupcion) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: interrupcion fk_interrupcion_usuario_creador; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interrupcion
    ADD CONSTRAINT fk_interrupcion_usuario_creador FOREIGN KEY (id_usuario_creador) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: mensaje_contacto fk_mensaje_contacto_responsable; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mensaje_contacto
    ADD CONSTRAINT fk_mensaje_contacto_responsable FOREIGN KEY (id_responsable) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: notificacion fk_notificacion_usuario; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notificacion
    ADD CONSTRAINT fk_notificacion_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: registro_error fk_registro_error_actividad; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registro_error
    ADD CONSTRAINT fk_registro_error_actividad FOREIGN KEY (id_actividad) REFERENCES public.actividad(id_actividad) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: registro_error fk_registro_error_tipo; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registro_error
    ADD CONSTRAINT fk_registro_error_tipo FOREIGN KEY (id_tipo_error) REFERENCES public.tipo_error(id_tipo_error) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: registro_error fk_registro_error_usuario_creador; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registro_error
    ADD CONSTRAINT fk_registro_error_usuario_creador FOREIGN KEY (id_usuario_creador) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trazabilidad fk_trazabilidad_usuario; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trazabilidad
    ADD CONSTRAINT fk_trazabilidad_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: usuario fk_usuario_especialidad; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_usuario_especialidad FOREIGN KEY (id_especialidad) REFERENCES public.especialidad(id_especialidad) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: usuario fk_usuario_profesion; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_usuario_profesion FOREIGN KEY (id_profesion) REFERENCES public.profesion(id_profesion) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: usuario fk_usuario_rol; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES public.rol(id_rol) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--


