--
-- PostgreSQL database dump
--

\restrict OurxvxLs8wbX515GoZb2m3fLka1orFbMA9YmZAdGdGbaxFRugCB4cgIlD5xh6dL

-- Dumped from database version 18.4 (Ubuntu 18.4-0ubuntu0.26.04.1)
-- Dumped by pg_dump version 18.4 (Ubuntu 18.4-0ubuntu0.26.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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


ALTER SEQUENCE public.actividad_idactividad_seq OWNER TO postgres;

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


ALTER SEQUENCE public.asignacionproyecto_idasignacion_seq OWNER TO postgres;

--
-- Name: asignacionproyecto_idasignacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asignacionproyecto_idasignacion_seq OWNED BY public.asignacionproyecto.idasignacion;


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


ALTER SEQUENCE public.especialidad_idespecialidad_seq OWNER TO postgres;

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


ALTER SEQUENCE public.etapa_idetapa_seq OWNER TO postgres;

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


ALTER SEQUENCE public.interrupcion_idinterrupcion_seq OWNER TO postgres;

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


ALTER SEQUENCE public.mensajecontacto_idmensaje_seq OWNER TO postgres;

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


ALTER SEQUENCE public.profesion_idprofesion_seq OWNER TO postgres;

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


ALTER SEQUENCE public.proyecto_idproyecto_seq OWNER TO postgres;

--
-- Name: proyecto_idproyecto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proyecto_idproyecto_seq OWNED BY public.proyecto.idproyecto;


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
    CONSTRAINT registroerror_estadoerror_check CHECK (((estadoerror)::text = ANY ((ARRAY['Abierto'::character varying, 'En Revision'::character varying, 'Corregido'::character varying, 'No Reproducible'::character varying, 'Descartado'::character varying])::text[])))
);


ALTER TABLE public.registroerror OWNER TO postgres;

--
-- Name: registroerror_iderror_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.registroerror_iderror_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.registroerror_iderror_seq OWNER TO postgres;

--
-- Name: registroerror_iderror_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.registroerror_iderror_seq OWNED BY public.registroerror.iderror;


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


ALTER SEQUENCE public.rol_idrol_seq OWNER TO postgres;

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


ALTER SEQUENCE public.tipoerror_idtipoerror_seq OWNER TO postgres;

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


ALTER SEQUENCE public.tipointerrupcion_idtipointerrupcion_seq OWNER TO postgres;

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


ALTER SEQUENCE public.usuario_idusuario_seq OWNER TO postgres;

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
-- Name: registroerror iderror; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror ALTER COLUMN iderror SET DEFAULT nextval('public.registroerror_iderror_seq'::regclass);


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
-- Data for Name: actividad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.actividad (idactividad, codactividad, nombreactividad, descripcionactividad, fechainicioactividad, fechafinactividad, estadoactividad, fechaejecucionactividad, idetapa, iddesarrollador) FROM stdin;
3	ACT-003	Desarrollar módulo de autenticación	Implementar login con JWT y Spring Security	2026-03-01	2026-03-10	Pendiente	\N	3	3
4	ACT-004	Desarrollar módulo de inventario	Implementar CRUD de productos e inventario	2026-04-01	2026-04-15	Pendiente	\N	5	5
1	ACT-001	Documentar requerimientos	Elaborar documento de requerimientos funcionales y no funcionales	2026-01-20	2026-01-25	Ejecutada	2026-06-24	1	3
2	ACT-002	Diseñar modelo de base de datos	Crear el modelo relacional normalizado	2026-02-10	2026-02-17	Ejecutada	2026-06-24	2	4
\.


--
-- Data for Name: asignacionproyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asignacionproyecto (idasignacion, fechaasignacion, estadoasignacion, idusuario, idproyecto) FROM stdin;
1	2026-01-15	t	3	1
2	2026-01-15	t	4	1
3	2026-03-01	t	5	2
4	2026-03-01	t	3	2
\.


--
-- Data for Name: especialidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.especialidad (idespecialidad, codespecialidad, nombreespecialidad) FROM stdin;
1	ESP-001	Desarrollo Frontend
2	ESP-002	Desarrollo Backend
3	ESP-003	Base de Datos
4	ESP-004	DevOps
5	ESP-005	Seguridad Informática
6	ESP-006	Desarrollo Móvil
\.


--
-- Data for Name: etapa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.etapa (idetapa, codetapa, nombreetapa, descripcionetapa, fechaetapa, idproyecto) FROM stdin;
1	ETA-001	Análisis	Levantamiento de requerimientos y documentación	2026-01-20	1
3	ETA-003	Desarrollo	Implementación del sistema	2026-03-01	1
4	ETA-004	Análisis	Levantamiento de requerimientos	2026-03-05	2
5	ETA-005	Desarrollo	Implementación de módulos principales	2026-04-01	2
6	ETP-521	Mejoras UI/UX al landing page	Implementar mejoras habladas en la reuinion para el landing page del proyecto Sistema de facturacion	2026-06-30	1
2	ETA-002	Diseño	Diseño de arquitectura y base de datos DB	2026-02-10	1
\.


--
-- Data for Name: interrupcion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.interrupcion (idinterrupcion, codinterrupcion, descripcioninterrupcion, fechainterrupcion, duracioninterrupcion, idtipointerrupcion, idetapa, iddesarrollador) FROM stdin;
1	INT-001	Reunión extraordinaria para revisar cambios solicitados por el cliente	2026-03-03	60	1	3	3
2	INT-002	Caída del servicio de internet durante la jornada laboral	2026-04-02	120	2	5	5
\.


--
-- Data for Name: mensajecontacto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensajecontacto (idmensaje, codmensaje, nombreremitente, correoremitente, mensaje, fechaenvio, estadomensaje, respuesta, fecharespuesta, idresponsable) FROM stdin;
1	MSG-001	Juan Pérez	juan.perez@empresa.com	¿Ofrecen servicios de desarrollo de aplicaciones móviles?	2026-05-10 09:30:00	Atendido	Sí ofrecemos desarrollo móvil. Le contactaremos para agendar una reunión.	2026-05-10 11:00:00	1
2	MSG-002	María López	maria.lopez@startup.co	Estoy interesada en cotizar un sistema de gestión.	2026-05-12 14:15:00	Pendiente	\N	\N	\N
\.


--
-- Data for Name: profesion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profesion (idprofesion, codprofesion, nombreprofesion) FROM stdin;
1	PRO-001	Ingeniería de Sistemas
2	PRO-002	Ingeniería de Software
3	PRO-003	Tecnología en ADSI
4	PRO-004	Ingeniería Informática
5	PRO-005	Ciencias de la Computación
\.


--
-- Data for Name: proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proyecto (idproyecto, codproyecto, nombreproyecto, descripcionproyecto, fechainicioproyecto, fechafinproyecto, estadoproyecto, idlider) FROM stdin;
1	PRY-001	Sistema de Facturación	Desarrollo de sistema de facturación electrónica para cliente del sector retail	2026-01-15	2026-06-30	t	2
2	PRY-002	App Gestión de Inventario	Aplicación web para control de inventario en tiempo real	2026-03-01	2026-09-30	t	2
\.


--
-- Data for Name: registroerror; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.registroerror (iderror, coderror, descripcionerror, fecharegistroerror, estadoerror, comentarioerror, idtipoerror, idetapa, iddesarrollador) FROM stdin;
1	ERR-001	NullPointerException en el servicio de usuarios al consultar perfil sin token	2026-03-05	Corregido	Se agregó validación de parámetros nulos	1	3	3
2	ERR-002	Consulta SQL devuelve registros duplicados en reporte de inventario	2026-04-03	En Revision	Pendiente análisis por parte del líder técnico	3	5	5
\.


--
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol (idrol, codrol, nombrerol, descripcionrol) FROM stdin;
1	ROL-001	Coordinador	Gestiona perfiles de desarrolladores y asigna proyectos
2	ROL-002	Lider	Gestiona proyectos, etapas, actividades y genera reportes
3	ROL-003	Desarrollador	Ejecuta actividades y registra errores e interrupciones
\.


--
-- Data for Name: tipoerror; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipoerror (idtipoerror, codtipoerror, nombretipo) FROM stdin;
1	TER-001	Error de compilación
2	TER-002	Error de lógica
3	TER-003	Error de base de datos
4	TER-004	Error de integración
5	TER-005	Error de interfaz
\.


--
-- Data for Name: tipointerrupcion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipointerrupcion (idtipointerrupcion, codtipointerrupcion, nombretipointerrupcion) FROM stdin;
1	TIN-001	Reunión no planificada
2	TIN-002	Falla de infraestructura
3	TIN-003	Solicitud urgente del cliente
4	TIN-004	Problema personal
5	TIN-005	Corte de energía o internet
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (idusuario, codusuario, nombre, apellido, fechanacimiento, tipoidentificacion, numeroidentificacion, correoelectronico, direccion, contrasena, fotoperfil, estado, idrol, idprofesion, idespecialidad) FROM stdin;
3	USR-003	Andrés	Torres	1995-11-08	CC	30456789	andres.torres@ikernell.com	Avenida 68 # 23-45, Bogotá	$2a$10$hashedpassword3	\N	t	3	3	1
4	USR-004	Valentina	Ríos	1993-05-19	CC	40567890	valentina.rios@ikernell.com	Calle 100 # 15-20, Bogotá	$2a$10$hashedpassword4	\N	t	3	2	3
5	USR-005	Felipe	Castro	1988-09-30	CC	50678901	felipe.castro@ikernell.com	Carrera 30 # 45-67, Bogotá	$2a$10$hashedpassword5	\N	t	3	1	2
1	USR-001	Carlos Andres	Mendoza	1985-03-12	CC	10234567	carlos.mendoza@ikernell.com	Calle 45 # 12-30, Bogotá	$2a$10$hashedpassword1	\N	t	1	1	\N
2	USR-002	Diana	Herrera	1990-07-25	CC	20345678	diana.herrera@ikernell.com	Carrera 7 # 80-15, Bogotá	$2a$10$hashedpassword2	\N	t	2	5	\N
7	USR-007	Test	Test	2000-01-01	CC	123456789	testbcrypt@ikernell.com	Test	$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2	\N	t	3	1	2
6	USR-006	test	test	2026-06-02	CC	1234567890	test@test.com	test	$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2	\N	t	1	1	2
\.


--
-- Name: actividad_idactividad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.actividad_idactividad_seq', 14, true);


--
-- Name: asignacionproyecto_idasignacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asignacionproyecto_idasignacion_seq', 4, true);


--
-- Name: especialidad_idespecialidad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.especialidad_idespecialidad_seq', 6, true);


--
-- Name: etapa_idetapa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.etapa_idetapa_seq', 9, true);


--
-- Name: interrupcion_idinterrupcion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.interrupcion_idinterrupcion_seq', 2, true);


--
-- Name: mensajecontacto_idmensaje_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensajecontacto_idmensaje_seq', 2, true);


--
-- Name: profesion_idprofesion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profesion_idprofesion_seq', 5, true);


--
-- Name: proyecto_idproyecto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proyecto_idproyecto_seq', 7, true);


--
-- Name: registroerror_iderror_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.registroerror_iderror_seq', 2, true);


--
-- Name: rol_idrol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_idrol_seq', 3, true);


--
-- Name: tipoerror_idtipoerror_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipoerror_idtipoerror_seq', 5, true);


--
-- Name: tipointerrupcion_idtipointerrupcion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipointerrupcion_idtipointerrupcion_seq', 5, true);


--
-- Name: usuario_idusuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_idusuario_seq', 7, true);


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
-- Name: registroerror registroerror_coderror_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror
    ADD CONSTRAINT registroerror_coderror_key UNIQUE (coderror);


--
-- Name: registroerror registroerror_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror
    ADD CONSTRAINT registroerror_pkey PRIMARY KEY (iderror);


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
-- Name: registroerror registroerror_iddesarrollador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror
    ADD CONSTRAINT registroerror_iddesarrollador_fkey FOREIGN KEY (iddesarrollador) REFERENCES public.usuario(idusuario);


--
-- Name: registroerror registroerror_idetapa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror
    ADD CONSTRAINT registroerror_idetapa_fkey FOREIGN KEY (idetapa) REFERENCES public.etapa(idetapa) ON DELETE CASCADE;


--
-- Name: registroerror registroerror_idtipoerror_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.registroerror
    ADD CONSTRAINT registroerror_idtipoerror_fkey FOREIGN KEY (idtipoerror) REFERENCES public.tipoerror(idtipoerror);


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

\unrestrict OurxvxLs8wbX515GoZb2m3fLka1orFbMA9YmZAdGdGbaxFRugCB4cgIlD5xh6dL

