--
-- PostgreSQL database dump
--

\restrict aS8v8SUSa4mooM61qDnaVF5Hx6TEiad9nLgxZbtLvCS7mmjqeAnLCJEhDG3PV7V

-- Dumped from database version 14.22 (Ubuntu 14.22-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.22 (Ubuntu 14.22-0ubuntu0.22.04.1)

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
-- Name: actividad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actividad (
    idactividad integer NOT NULL,
    codactividad character varying(10) NOT NULL,
    nombreactividad character varying(150) NOT NULL,
    descripcionactividad text NOT NULL,
    fechainicioactividad date NOT NULL,
    fechafinactividad date NOT NULL,
    estadoactividad character varying(20) DEFAULT 'Pendiente'::character varying NOT NULL,
    fechaejecucionactividad date,
    idetapa integer NOT NULL,
    iddesarrollador integer NOT NULL,
    CONSTRAINT actividad_estadoactividad_check CHECK (((estadoactividad)::text = ANY ((ARRAY['Pendiente'::character varying, 'Ejecutada'::character varying])::text[])))
);


ALTER TABLE public.actividad OWNER TO postgres;

--
-- Name: actividad_idactividad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.actividad_idactividad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.actividad_idactividad_seq OWNER TO postgres;

--
-- Name: actividad_idactividad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.actividad_idactividad_seq OWNED BY public.actividad.idactividad;


--
-- Name: asignacionproyecto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asignacionproyecto (
    idasignacion integer NOT NULL,
    fechaasignacion date NOT NULL,
    estadoasignacion boolean DEFAULT true NOT NULL,
    idusuario integer NOT NULL,
    idproyecto integer NOT NULL
);


ALTER TABLE public.asignacionproyecto OWNER TO postgres;

--
-- Name: asignacionproyecto_idasignacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asignacionproyecto_idasignacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asignacionproyecto_idasignacion_seq OWNER TO postgres;

--
-- Name: asignacionproyecto_idasignacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asignacionproyecto_idasignacion_seq OWNED BY public.asignacionproyecto.idasignacion;


--
-- Name: registroerror; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.registroerror (
    iderror integer NOT NULL,
    coderror character varying(10) NOT NULL,
    descripcionerror text NOT NULL,
    fecharegistroerror date DEFAULT CURRENT_DATE NOT NULL,
    estadoerror character varying(20) NOT NULL,
    comentarioerror text,
    idtipoerror integer NOT NULL,
    idetapa integer NOT NULL,
    iddesarrollador integer NOT NULL,
    CONSTRAINT error_estadoerror_check CHECK (((estadoerror)::text = ANY ((ARRAY['Abierto'::character varying, 'En Revision'::character varying, 'Corregido'::character varying, 'No Reproducible'::character varying, 'Descartado'::character varying])::text[])))
);


ALTER TABLE public.registroerror OWNER TO postgres;

--
-- Name: error_iderror_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.error_iderror_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.error_iderror_seq OWNER TO postgres;

--
-- Name: error_iderror_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.error_iderror_seq OWNED BY public.registroerror.iderror;


--
-- Name: especialidad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.especialidad (
    idespecialidad integer NOT NULL,
    codespecialidad character varying(10) NOT NULL,
    nombreespecialidad character varying(100) NOT NULL
);


ALTER TABLE public.especialidad OWNER TO postgres;

--
-- Name: especialidad_idespecialidad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.especialidad_idespecialidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.especialidad_idespecialidad_seq OWNER TO postgres;

--
-- Name: especialidad_idespecialidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.especialidad_idespecialidad_seq OWNED BY public.especialidad.idespecialidad;


--
-- Name: etapa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.etapa (
    idetapa integer NOT NULL,
    codetapa character varying(10) NOT NULL,
    nombreetapa character varying(150) NOT NULL,
    descripcionetapa text NOT NULL,
    fechaetapa date NOT NULL,
    idproyecto integer NOT NULL
);


ALTER TABLE public.etapa OWNER TO postgres;

--
-- Name: etapa_idetapa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.etapa_idetapa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.etapa_idetapa_seq OWNER TO postgres;

--
-- Name: etapa_idetapa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.etapa_idetapa_seq OWNED BY public.etapa.idetapa;


--
-- Name: interrupcion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interrupcion (
    idinterrupcion integer NOT NULL,
    codinterrupcion character varying(10) NOT NULL,
    descripcioninterrupcion text NOT NULL,
    fechainterrupcion date NOT NULL,
    duracioninterrupcion integer NOT NULL,
    idtipointerrupcion integer NOT NULL,
    idetapa integer NOT NULL,
    iddesarrollador integer NOT NULL,
    CONSTRAINT interrupcion_duracioninterrupcion_check CHECK ((duracioninterrupcion > 0))
);


ALTER TABLE public.interrupcion OWNER TO postgres;

--
-- Name: interrupcion_idinterrupcion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.interrupcion_idinterrupcion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.interrupcion_idinterrupcion_seq OWNER TO postgres;

--
-- Name: interrupcion_idinterrupcion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.interrupcion_idinterrupcion_seq OWNED BY public.interrupcion.idinterrupcion;


--
-- Name: mensajecontacto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensajecontacto (
    idmensaje integer NOT NULL,
    codmensaje character varying(10) NOT NULL,
    nombreremitente character varying(150) NOT NULL,
    correoremitente character varying(150) NOT NULL,
    mensaje text NOT NULL,
    fechaenvio timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estadomensaje character varying(20) DEFAULT 'Pendiente'::character varying NOT NULL,
    respuesta text,
    fecharespuesta timestamp without time zone,
    idresponsable integer,
    CONSTRAINT mensajecontacto_estadomensaje_check CHECK (((estadomensaje)::text = ANY ((ARRAY['Pendiente'::character varying, 'Leido'::character varying, 'Atendido'::character varying])::text[])))
);


ALTER TABLE public.mensajecontacto OWNER TO postgres;

--
-- Name: mensajecontacto_idmensaje_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensajecontacto_idmensaje_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mensajecontacto_idmensaje_seq OWNER TO postgres;

--
-- Name: mensajecontacto_idmensaje_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensajecontacto_idmensaje_seq OWNED BY public.mensajecontacto.idmensaje;


--
-- Name: profesion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profesion (
    idprofesion integer NOT NULL,
    codprofesion character varying(10) NOT NULL,
    nombreprofesion character varying(100) NOT NULL
);


ALTER TABLE public.profesion OWNER TO postgres;

--
-- Name: profesion_idprofesion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profesion_idprofesion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profesion_idprofesion_seq OWNER TO postgres;

--
-- Name: profesion_idprofesion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profesion_idprofesion_seq OWNED BY public.profesion.idprofesion;


--
-- Name: proyecto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proyecto (
    idproyecto integer NOT NULL,
    codproyecto character varying(10) NOT NULL,
    nombreproyecto character varying(150) NOT NULL,
    descripcionproyecto text NOT NULL,
    fechainicioproyecto date NOT NULL,
    fechafinproyecto date NOT NULL,
    estadoproyecto boolean DEFAULT true NOT NULL,
    idlider integer NOT NULL
);


ALTER TABLE public.proyecto OWNER TO postgres;

--
-- Name: proyecto_idproyecto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proyecto_idproyecto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proyecto_idproyecto_seq OWNER TO postgres;

--
-- Name: proyecto_idproyecto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proyecto_idproyecto_seq OWNED BY public.proyecto.idproyecto;


--
-- Name: prueba; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prueba (
    id integer NOT NULL,
    nombre character varying(50)
);


ALTER TABLE public.prueba OWNER TO postgres;

--
-- Name: prueba_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prueba_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prueba_id_seq OWNER TO postgres;

--
-- Name: prueba_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prueba_id_seq OWNED BY public.prueba.id;


--
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    idrol integer NOT NULL,
    codrol character varying(10) NOT NULL,
    nombrerol character varying(50) NOT NULL,
    descripcionrol text NOT NULL
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- Name: rol_idrol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_idrol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_idrol_seq OWNER TO postgres;

--
-- Name: rol_idrol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_idrol_seq OWNED BY public.rol.idrol;


--
-- Name: tipoerror; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipoerror (
    idtipoerror integer NOT NULL,
    codtipoerror character varying(10) NOT NULL,
    nombretipo character varying(100) NOT NULL
);


ALTER TABLE public.tipoerror OWNER TO postgres;

--
-- Name: tipoerror_idtipoerror_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipoerror_idtipoerror_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipoerror_idtipoerror_seq OWNER TO postgres;

--
-- Name: tipoerror_idtipoerror_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipoerror_idtipoerror_seq OWNED BY public.tipoerror.idtipoerror;


--
-- Name: tipointerrupcion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipointerrupcion (
    idtipointerrupcion integer NOT NULL,
    codtipointerrupcion character varying(10) NOT NULL,
    nombretipointerrupcion character varying(100) NOT NULL
);


ALTER TABLE public.tipointerrupcion OWNER TO postgres;

--
-- Name: tipointerrupcion_idtipointerrupcion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipointerrupcion_idtipointerrupcion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipointerrupcion_idtipointerrupcion_seq OWNER TO postgres;

--
-- Name: tipointerrupcion_idtipointerrupcion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipointerrupcion_idtipointerrupcion_seq OWNED BY public.tipointerrupcion.idtipointerrupcion;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    idusuario integer NOT NULL,
    codusuario character varying(10) NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    fechanacimiento date NOT NULL,
    tipoidentificacion character varying(20) NOT NULL,
    numeroidentificacion character varying(20) NOT NULL,
    correoelectronico character varying(150) NOT NULL,
    direccion text NOT NULL,
    contrasena character varying(255) NOT NULL,
    fotoperfil character varying(255),
    estado boolean DEFAULT true NOT NULL,
    idrol integer NOT NULL,
    idprofesion integer NOT NULL,
    idespecialidad integer
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_idusuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_idusuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_idusuario_seq OWNER TO postgres;

--
-- Name: usuario_idusuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_idusuario_seq OWNED BY public.usuario.idusuario;


--
-- Name: actividad idactividad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividad ALTER COLUMN idactividad SET DEFAULT nextval('public.actividad_idactividad_seq'::regclass);


--
-- Name: asignacionproyecto idasignacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacionproyecto ALTER COLUMN idasignacion SET DEFAULT nextval('public.asignacionproyecto_idasignacion_seq'::regclass);


--
-- Name: especialidad idespecialidad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.especialidad ALTER COLUMN idespecialidad SET DEFAULT nextval('public.especialidad_idespecialidad_seq'::regclass);


--
-- Name: etapa idetapa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etapa ALTER COLUMN idetapa SET DEFAULT nextval('public.etapa_idetapa_seq'::regclass);


--
-- Name: interrupcion idinterrupcion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interrupcion ALTER COLUMN idinterrupcion SET DEFAULT nextval('public.interrupcion_idinterrupcion_seq'::regclass);


--
-- Name: mensajecontacto idmensaje; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajecontacto ALTER COLUMN idmensaje SET DEFAULT nextval('public.mensajecontacto_idmensaje_seq'::regclass);


--
-- Name: profesion idprofesion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profesion ALTER COLUMN idprofesion SET DEFAULT nextval('public.profesion_idprofesion_seq'::regclass);


--
-- Name: proyecto idproyecto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyecto ALTER COLUMN idproyecto SET DEFAULT nextval('public.proyecto_idproyecto_seq'::regclass);


--
-- Name: prueba id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prueba ALTER COLUMN id SET DEFAULT nextval('public.prueba_id_seq'::regclass);


--
-- Name: registroerror iderror; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror ALTER COLUMN iderror SET DEFAULT nextval('public.error_iderror_seq'::regclass);


--
-- Name: rol idrol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN idrol SET DEFAULT nextval('public.rol_idrol_seq'::regclass);


--
-- Name: tipoerror idtipoerror; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipoerror ALTER COLUMN idtipoerror SET DEFAULT nextval('public.tipoerror_idtipoerror_seq'::regclass);


--
-- Name: tipointerrupcion idtipointerrupcion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipointerrupcion ALTER COLUMN idtipointerrupcion SET DEFAULT nextval('public.tipointerrupcion_idtipointerrupcion_seq'::regclass);


--
-- Name: usuario idusuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN idusuario SET DEFAULT nextval('public.usuario_idusuario_seq'::regclass);


--
-- Name: actividad actividad_codactividad_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT actividad_codactividad_key UNIQUE (codactividad);


--
-- Name: actividad actividad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT actividad_pkey PRIMARY KEY (idactividad);


--
-- Name: asignacionproyecto asignacionproyecto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacionproyecto
    ADD CONSTRAINT asignacionproyecto_pkey PRIMARY KEY (idasignacion);


--
-- Name: registroerror error_coderror_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror
    ADD CONSTRAINT error_coderror_key UNIQUE (coderror);


--
-- Name: registroerror error_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror
    ADD CONSTRAINT error_pkey PRIMARY KEY (iderror);


--
-- Name: especialidad especialidad_codespecialidad_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.especialidad
    ADD CONSTRAINT especialidad_codespecialidad_key UNIQUE (codespecialidad);


--
-- Name: especialidad especialidad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.especialidad
    ADD CONSTRAINT especialidad_pkey PRIMARY KEY (idespecialidad);


--
-- Name: etapa etapa_codetapa_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etapa
    ADD CONSTRAINT etapa_codetapa_key UNIQUE (codetapa);


--
-- Name: etapa etapa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etapa
    ADD CONSTRAINT etapa_pkey PRIMARY KEY (idetapa);


--
-- Name: interrupcion interrupcion_codinterrupcion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interrupcion
    ADD CONSTRAINT interrupcion_codinterrupcion_key UNIQUE (codinterrupcion);


--
-- Name: interrupcion interrupcion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interrupcion
    ADD CONSTRAINT interrupcion_pkey PRIMARY KEY (idinterrupcion);


--
-- Name: mensajecontacto mensajecontacto_codmensaje_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajecontacto
    ADD CONSTRAINT mensajecontacto_codmensaje_key UNIQUE (codmensaje);


--
-- Name: mensajecontacto mensajecontacto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajecontacto
    ADD CONSTRAINT mensajecontacto_pkey PRIMARY KEY (idmensaje);


--
-- Name: profesion profesion_codprofesion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profesion
    ADD CONSTRAINT profesion_codprofesion_key UNIQUE (codprofesion);


--
-- Name: profesion profesion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profesion
    ADD CONSTRAINT profesion_pkey PRIMARY KEY (idprofesion);


--
-- Name: proyecto proyecto_codproyecto_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyecto
    ADD CONSTRAINT proyecto_codproyecto_key UNIQUE (codproyecto);


--
-- Name: proyecto proyecto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyecto
    ADD CONSTRAINT proyecto_pkey PRIMARY KEY (idproyecto);


--
-- Name: prueba prueba_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prueba
    ADD CONSTRAINT prueba_pkey PRIMARY KEY (id);


--
-- Name: rol rol_codrol_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_codrol_key UNIQUE (codrol);


--
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (idrol);


--
-- Name: tipoerror tipoerror_codtipoerror_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipoerror
    ADD CONSTRAINT tipoerror_codtipoerror_key UNIQUE (codtipoerror);


--
-- Name: tipoerror tipoerror_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipoerror
    ADD CONSTRAINT tipoerror_pkey PRIMARY KEY (idtipoerror);


--
-- Name: tipointerrupcion tipointerrupcion_codtipointerrupcion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipointerrupcion
    ADD CONSTRAINT tipointerrupcion_codtipointerrupcion_key UNIQUE (codtipointerrupcion);


--
-- Name: tipointerrupcion tipointerrupcion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipointerrupcion
    ADD CONSTRAINT tipointerrupcion_pkey PRIMARY KEY (idtipointerrupcion);


--
-- Name: asignacionproyecto uq_asignacion; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacionproyecto
    ADD CONSTRAINT uq_asignacion UNIQUE (idusuario, idproyecto);


--
-- Name: usuario usuario_codusuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_codusuario_key UNIQUE (codusuario);


--
-- Name: usuario usuario_correoelectronico_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_correoelectronico_key UNIQUE (correoelectronico);


--
-- Name: usuario usuario_numeroidentificacion_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_numeroidentificacion_key UNIQUE (numeroidentificacion);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (idusuario);


--
-- Name: actividad actividad_iddesarrollador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT actividad_iddesarrollador_fkey FOREIGN KEY (iddesarrollador) REFERENCES public.usuario(idusuario);


--
-- Name: actividad actividad_idetapa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT actividad_idetapa_fkey FOREIGN KEY (idetapa) REFERENCES public.etapa(idetapa) ON DELETE CASCADE;


--
-- Name: asignacionproyecto asignacionproyecto_idproyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacionproyecto
    ADD CONSTRAINT asignacionproyecto_idproyecto_fkey FOREIGN KEY (idproyecto) REFERENCES public.proyecto(idproyecto);


--
-- Name: asignacionproyecto asignacionproyecto_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asignacionproyecto
    ADD CONSTRAINT asignacionproyecto_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario);


--
-- Name: registroerror error_iddesarrollador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror
    ADD CONSTRAINT error_iddesarrollador_fkey FOREIGN KEY (iddesarrollador) REFERENCES public.usuario(idusuario);


--
-- Name: registroerror error_idetapa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror
    ADD CONSTRAINT error_idetapa_fkey FOREIGN KEY (idetapa) REFERENCES public.etapa(idetapa) ON DELETE CASCADE;


--
-- Name: registroerror error_idtipoerror_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror
    ADD CONSTRAINT error_idtipoerror_fkey FOREIGN KEY (idtipoerror) REFERENCES public.tipoerror(idtipoerror);


--
-- Name: etapa etapa_idproyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etapa
    ADD CONSTRAINT etapa_idproyecto_fkey FOREIGN KEY (idproyecto) REFERENCES public.proyecto(idproyecto) ON DELETE CASCADE;


--
-- Name: interrupcion interrupcion_iddesarrollador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interrupcion
    ADD CONSTRAINT interrupcion_iddesarrollador_fkey FOREIGN KEY (iddesarrollador) REFERENCES public.usuario(idusuario);


--
-- Name: interrupcion interrupcion_idetapa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interrupcion
    ADD CONSTRAINT interrupcion_idetapa_fkey FOREIGN KEY (idetapa) REFERENCES public.etapa(idetapa) ON DELETE CASCADE;


--
-- Name: interrupcion interrupcion_idtipointerrupcion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interrupcion
    ADD CONSTRAINT interrupcion_idtipointerrupcion_fkey FOREIGN KEY (idtipointerrupcion) REFERENCES public.tipointerrupcion(idtipointerrupcion);


--
-- Name: mensajecontacto mensajecontacto_idresponsable_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajecontacto
    ADD CONSTRAINT mensajecontacto_idresponsable_fkey FOREIGN KEY (idresponsable) REFERENCES public.usuario(idusuario);


--
-- Name: proyecto proyecto_idlider_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyecto
    ADD CONSTRAINT proyecto_idlider_fkey FOREIGN KEY (idlider) REFERENCES public.usuario(idusuario);


--
-- Name: usuario usuario_idespecialidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_idespecialidad_fkey FOREIGN KEY (idespecialidad) REFERENCES public.especialidad(idespecialidad);


--
-- Name: usuario usuario_idprofesion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_idprofesion_fkey FOREIGN KEY (idprofesion) REFERENCES public.profesion(idprofesion);


--
-- Name: usuario usuario_idrol_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_idrol_fkey FOREIGN KEY (idrol) REFERENCES public.rol(idrol);


--
-- PostgreSQL database dump complete
--

\unrestrict aS8v8SUSa4mooM61qDnaVF5Hx6TEiad9nLgxZbtLvCS7mmjqeAnLCJEhDG3PV7V

