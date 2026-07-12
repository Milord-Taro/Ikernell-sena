-- ============================================================
-- IKernell Solutions
-- Script: 01_roles.sql
-- Descripción:
-- Datos iniciales del catálogo de roles.
-- Convención de código: ROL-XXX
-- ============================================================

INSERT INTO rol (codigo_rol, nombre_rol, descripcion) VALUES
('ROL-001', 'Coordinador', 'Administra usuarios, catálogos, proyectos y tiene visibilidad total del sistema.'),
('ROL-002', 'Líder de Proyecto', 'Coordina el equipo de un proyecto específico y supervisa el avance de etapas y actividades.'),
('ROL-003', 'Desarrollador', 'Ejecuta actividades asignadas, registra errores e interrupciones durante el desarrollo.');
-- ============================================================
-- IKernell Solutions
-- Script: 02_profesiones.sql
-- Descripción:
-- Datos iniciales del catálogo de profesiones.
-- Convención de código: PRO-XXX
-- ============================================================

INSERT INTO profesion (codigo_profesion, nombre_profesion, descripcion) VALUES
('PRO-001', 'Ingeniero de Sistemas', 'Profesional universitario en ingeniería de sistemas y computación.'),
('PRO-002', 'Tecnólogo en ADSO', 'Tecnólogo en Análisis y Desarrollo de Software (SENA).'),
('PRO-003', 'Analista de Sistemas', 'Profesional enfocado en análisis, levantamiento de requisitos y diseño de soluciones.'),
('PRO-004', 'Ingeniero de Software', 'Profesional especializado en el ciclo de vida completo del desarrollo de software.'),
('PRO-005', 'Ingeniero Electrónico', 'Profesional con formación en electrónica, sistemas embebidos e instrumentación.'),
('PRO-006', 'Técnico en Programación', 'Técnico con formación básica en programación y desarrollo de aplicaciones.');
-- ============================================================
-- IKernell Solutions
-- Script: 03_especialidades.sql
-- Descripción:
-- Datos iniciales del catálogo de especialidades.
-- Convención de código: ESP-XXX
-- ============================================================

INSERT INTO especialidad (codigo_especialidad, nombre_especialidad, descripcion) VALUES
('ESP-001', 'Backend', 'Desarrollo de lógica de negocio, APIs y servicios del lado del servidor.'),
('ESP-002', 'Frontend', 'Desarrollo de interfaces de usuario y experiencia visual de las aplicaciones.'),
('ESP-003', 'Administrador de Bases de Datos (DBA)', 'Diseño, modelado y administración de bases de datos relacionales y no relacionales.'),
('ESP-004', 'Aseguramiento de Calidad (QA)', 'Aseguramiento de calidad, pruebas funcionales y automatización de pruebas.'),
('ESP-005', 'DevOps', 'Automatización de despliegues, integración continua e infraestructura.'),
('ESP-006', 'Full Stack', 'Desarrollo integral que abarca tanto frontend como backend.'),
('ESP-007', 'Desarrollo Móvil', 'Desarrollo de aplicaciones móviles nativas o híbridas.'),
('ESP-008', 'Diseño UX/UI', 'Diseño de experiencia de usuario e interfaces centradas en el usuario.'),
('ESP-009', 'Seguridad Informática', 'Análisis de vulnerabilidades y aseguramiento de sistemas de información.'),
('ESP-010', 'Inteligencia Artificial', 'Desarrollo de soluciones basadas en aprendizaje automático y datos.');
-- ============================================================
-- IKernell Solutions
-- Script: 04_tipos_error.sql
-- Descripción:
-- Datos iniciales del catálogo de tipos de error.
-- Convención de código: TER-XXX
-- ============================================================

INSERT INTO tipo_error (codigo_tipo_error, nombre_tipo_error, descripcion) VALUES
('TER-001', 'Error Funcional', 'La funcionalidad no se comporta como lo especifica el requerimiento.'),
('TER-002', 'Error Lógico', 'Fallas en la lógica de negocio o en el flujo de procesamiento de datos.'),
('TER-003', 'Error de Interfaz', 'Problemas visuales o de usabilidad en la interfaz de usuario.'),
('TER-004', 'Error de Integración', 'Fallas en la comunicación entre módulos, servicios o sistemas externos.'),
('TER-005', 'Error de Base de Datos', 'Inconsistencias, fallas de conexión o de integridad en la base de datos.'),
('TER-006', 'Error de Seguridad', 'Vulnerabilidades o fallas relacionadas con la seguridad del sistema.'),
('TER-007', 'Error de Rendimiento', 'Lentitud o consumo excesivo de recursos en una funcionalidad.'),
('TER-008', 'Error de Validación', 'Falta o falla en las validaciones de datos de entrada.'),
('TER-009', 'Error de Configuración', 'Problemas originados por una configuración incorrecta del entorno o sistema.'),
('TER-010', 'Error de Compilación', 'Fallas que impiden la compilación o construcción correcta del proyecto.'),
('TER-011', 'Error de Documentación', 'Documentación técnica incompleta, desactualizada o incorrecta.'),
('TER-012', 'Error de Concurrencia', 'Fallas causadas por accesos simultáneos o condiciones de carrera.'),
('TER-013', 'Error de Autenticación', 'Problemas relacionados con el inicio de sesión o verificación de identidad.'),
('TER-014', 'Error de Autorización', 'Un usuario accede o intenta acceder a funciones sin los permisos adecuados.'),
('TER-015', 'Error de Compatibilidad', 'Fallas al ejecutar el sistema en distintos navegadores, dispositivos o versiones.');
-- ============================================================
-- IKernell Solutions
-- Script: 05_tipos_interrupcion.sql
-- Descripción:
-- Datos iniciales del catálogo de tipos de interrupción.
-- Convención de código: TIN-XXX
-- ============================================================

INSERT INTO tipo_interrupcion (codigo_tipo_interrupcion, nombre_tipo_interrupcion, descripcion) VALUES
('TIN-001', 'Reunión', 'Reunión de equipo, seguimiento o planificación que pausa la actividad.'),
('TIN-002', 'Capacitación', 'Sesión de formación o entrenamiento que interrumpe el desarrollo.'),
('TIN-003', 'Falla Eléctrica', 'Corte o inestabilidad del suministro eléctrico en el sitio de trabajo.'),
('TIN-004', 'Problema de Red', 'Fallas de conectividad de red local que impiden continuar la actividad.'),
('TIN-005', 'Atención al Cliente', 'Atención de una solicitud o consulta directa de un cliente.'),
('TIN-006', 'Mantenimiento de Equipo', 'Mantenimiento preventivo o correctivo del equipo de trabajo.'),
('TIN-007', 'Actualización de Software', 'Instalación o actualización de herramientas o software necesario.'),
('TIN-008', 'Incapacidad Médica', 'Ausencia del desarrollador por motivos de salud.'),
('TIN-009', 'Cambio de Requerimientos', 'Modificación de requerimientos que obliga a detener la actividad en curso.'),
('TIN-010', 'Falla de Servidor', 'Caída o indisponibilidad de un servidor de desarrollo o producción.'),
('TIN-011', 'Corte de Internet', 'Pérdida del servicio de internet en el sitio de trabajo.'),
('TIN-012', 'Revisión de Código', 'Pausa para realizar o atender una revisión de código (code review).'),
('TIN-013', 'Solicitud Urgente del Cliente', 'Requerimiento urgente no planificado solicitado por el cliente.'),
('TIN-014', 'Dependencia Externa', 'La actividad se detiene por depender de la entrega, respuesta o disponibilidad de un tercero.'),
('TIN-015', 'Bloqueo Técnico', 'Impedimento técnico que no permite continuar el desarrollo hasta resolver una limitación o incidencia.'),
('TIN-016', 'Espera de Aprobación', 'La actividad permanece detenida mientras se recibe la aprobación funcional, técnica o del cliente.');

-- ============================================================
-- IKernell Solutions
-- Script: 06_usuarios.sql
-- Descripción:
-- Datos de prueba para la entidad usuario.
-- Convención de código: USR-XXX
-- NOTA: hash_contrasena es el mismo hash BCrypt para todos los
-- usuarios de prueba, correspondiente a la contraseña "test".
-- ============================================================

INSERT INTO usuario
(codigo_usuario, nombres, apellidos, tipo_identificacion, numero_identificacion,
 fecha_nacimiento, correo_electronico, hash_contrasena, ciudad,
 id_rol, id_profesion, id_especialidad)
VALUES
('USR-001', 'Ana', 'Martínez', 'CC', '1010101010', '1988-03-12',
 'ana.martinez@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Bogotá',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-001'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-001'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-003')),

('USR-002', 'Carlos', 'Rodríguez', 'CC', '1020202020', '1985-07-22',
 'carlos.rodriguez@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Medellín',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-002'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-004'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-006')),

('USR-003', 'Laura', 'Gómez', 'CC', '1030303030', '1990-11-05',
 'laura.gomez@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Cali',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-002'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-001'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-001')),

('USR-004', 'Juan', 'Pérez', 'CC', '1040404040', '1995-01-15',
 'juan.perez@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Bogotá',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-003'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-002'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-002')),

('USR-005', 'María', 'López', 'CC', '1050505050', '1996-05-30',
 'maria.lopez@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Barranquilla',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-003'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-002'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-001')),

('USR-006', 'Andrés', 'Torres', 'CC', '1060606060', '1993-09-10',
 'andres.torres@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Bogotá',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-003'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-004'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-003')),

('USR-007', 'Camila', 'Ramírez', 'CC', '1070707070', '1994-02-25',
 'camila.ramirez@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Medellín',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-003'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-003'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-004')),

('USR-008', 'Diego', 'Sánchez', 'CC', '1080808080', '1992-06-18',
 'diego.sanchez@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Cali',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-003'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-001'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-005')),

('USR-009', 'Valentina', 'Castro', 'CE', '1090909090', '1997-08-08',
 'valentina.castro@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Bogotá',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-003'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-002'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-007')),

('USR-010', 'Santiago', 'Vargas', 'CC', '1100101010', '1991-12-01',
 'santiago.vargas@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Bucaramanga',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-003'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-004'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-002')),

('USR-011', 'Isabella', 'Mendoza', 'TI', '1100202020', '1999-03-22',
 'isabella.mendoza@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Bogotá',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-003'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-006'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-008')),

('USR-012', 'Sebastián', 'Ortiz', 'CC', '1100303030', '1989-10-14',
 'sebastian.ortiz@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Medellín',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-003'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-005'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-009'));

-- Usuario inactivo, para probar la eliminación lógica (activo = FALSE)
INSERT INTO usuario
(codigo_usuario, nombres, apellidos, tipo_identificacion, numero_identificacion,
 fecha_nacimiento, correo_electronico, hash_contrasena, ciudad,
 id_rol, id_profesion, id_especialidad, activo)
VALUES
('USR-013', 'Mateo', 'Salinas', 'CC', '1100404040', '1987-04-09',
 'mateo.salinas@ikernell.com', '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu', 'Bogotá',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-003'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-001'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-001'),
 FALSE);
 
 -- Segundo Coordinador (activo)

INSERT INTO usuario
(codigo_usuario, nombres, apellidos, tipo_identificacion, numero_identificacion,
 fecha_nacimiento, correo_electronico, hash_contrasena, ciudad,
 id_rol, id_profesion, id_especialidad)
VALUES
('USR-014', 'Natalia', 'Herrera', 'CC', '1100505050', '1986-06-17',
 'natalia.herrera@ikernell.com',
 '$2b$12$KIXQ7XG5H0yFq1L8v9O6Ie1zR6bXWn3vQeYVvQvTz5U1J8yzS0iOu',
 'Bogotá',
 (SELECT id_rol FROM rol WHERE codigo_rol = 'ROL-001'),
 (SELECT id_profesion FROM profesion WHERE codigo_profesion = 'PRO-001'),
 (SELECT id_especialidad FROM especialidad WHERE codigo_especialidad = 'ESP-006'));
 
 -- ============================================================
-- IKernell Solutions
-- Script: 07_proyectos.sql
-- Descripción:
-- Datos de prueba para la entidad proyecto.
-- Convención de código: PRY-XXX
-- ============================================================

INSERT INTO proyecto
(
    codigo_proyecto,
    nombre_proyecto,
    descripcion,
    fecha_inicio,
    fecha_fin,
    estado
)
VALUES

(
    'PRY-001',
    'Sistema de Gestión Documental - Clínica San Gabriel',
    'Desarrollo de una plataforma para la gestión digital de documentos clínicos, historias médicas y procesos administrativos.',
    '2026-06-01',
    '2026-10-15',
    'En ejecución'

),

(
    'PRY-002',
    'Plataforma de Inventarios - Comercializadora Andina',
    'Desarrollo de una plataforma web para el control de inventarios, compras y movimientos de productos.',
    '2026-08-01',
    '2026-12-20',
    'Planeación'

),

(
    'PRY-003',
    'Portal de Atención al Cliente - Grupo Nova',
    'Portal para la gestión de solicitudes, PQRS y seguimiento de requerimientos de clientes.',
    '2025-10-10',
    '2026-03-30',
    'Finalizado'
);

-- ============================================================
-- IKernell Solutions
-- Script: 08_asignacion_proyecto.sql
-- Descripción:
-- Integrantes de cada proyecto.
-- ============================================================

INSERT INTO asignacion_proyecto
(
    id_usuario,
    id_proyecto,
    rol_proyecto,
    fecha_asignacion
)

VALUES

-- =====================================================
-- Proyecto 1
-- =====================================================

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-002'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-001'),
'Líder',
'2026-06-01'
),

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-004'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-001'),
'Desarrollador',
'2026-06-01'
),

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-005'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-001'),
'Desarrollador',
'2026-06-01'
),

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-006'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-001'),
'Desarrollador',
'2026-06-01'
),

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-007'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-001'),
'Desarrollador',
'2026-06-01'
),

-- =====================================================
-- Proyecto 2
-- =====================================================

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-003'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-002'),
'Líder',
'2026-08-01'
),

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-008'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-002'),
'Desarrollador',
'2026-08-01'
),

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-009'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-002'),
'Desarrollador',
'2026-08-01'
),

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-010'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-002'),
'Desarrollador',
'2026-08-01'
),

-- =====================================================
-- Proyecto 3
-- =====================================================

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-002'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-003'),
'Líder',
'2025-10-10'
),

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-004'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-003'),
'Desarrollador',
'2025-10-10'
),

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-006'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-003'),
'Desarrollador',
'2025-10-10'
),

(
(
SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-011'),
(
SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-003'),
'Desarrollador',
'2025-10-10'
);

-- ============================================================
-- IKernell Solutions
-- Script: 09_etapas.sql
-- Descripción:
-- Datos de prueba para la entidad etapa.
-- ============================================================

INSERT INTO etapa
(
    codigo_etapa,
	id_proyecto,
	nombre_etapa,
	descripcion,
	orden,
	fecha_inicio,
	fecha_fin,
	estado
)

VALUES

-- =====================================================
-- PRY-001
-- =====================================================

(
'ETA-001',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-001'),
'Análisis',
'Levantamiento y validación de requerimientos.',
'1',
'2026-06-01',
'2026-06-15',
'Finalizada'
),

(
'ETA-002',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-001'),
'Diseño',
'Diseño funcional, técnico y modelo de datos.',
'2',
'2026-06-16',
'2026-07-05',
'Finalizada'
),

(
'ETA-003',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-001'),
'Desarrollo',
'Implementación de funcionalidades.',
'3',
'2026-07-06',
'2026-09-15',
'En ejecución'
),

(
'ETA-004',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-001'),
'Pruebas',
'Pruebas funcionales e integración.',
'4',
'2026-09-16',
'2026-10-05',
'Pendiente'
),

(
'ETA-005',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-001'),
'Implementación',
'Despliegue y entrega al cliente.',
'5',
'2026-10-06',
'2026-10-15',
'Pendiente'
),

-- =====================================================
-- PRY-002
-- =====================================================

(
'ETA-006',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-002'),
'Planeación',
'Definición inicial del proyecto.',
'1',
'2026-08-01',
'2026-08-07',
'En ejecución'
),

(
'ETA-007',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-002'),
'Análisis',
'Levantamiento de requerimientos.',
'2',
'2026-08-08',
'2026-08-25',
'Pendiente'
),

-- =====================================================
-- PRY-003
-- =====================================================

(
'ETA-008',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-003'),
'Análisis',
'Levantamiento de requerimientos.',
'1',
'2025-10-10',
'2025-10-25',
'Finalizada'
),

(
'ETA-009',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-003'),
'Diseño',
'Diseño técnico.',
'2',
'2025-10-26',
'2025-11-15',
'Finalizada'
),

(
'ETA-010',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-003'),
'Desarrollo',
'Construcción del sistema.',
'3',
'2025-11-16',
'2026-02-15',
'Finalizada'
),

(
'ETA-011',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-003'),
'Pruebas',
'Validación integral.',
'4',
'2026-02-16',
'2026-03-10',
'Finalizada'
),

(
'ETA-012',
(SELECT id_proyecto FROM proyecto WHERE codigo_proyecto='PRY-003'),
'Implementación',
'Puesta en producción.',
'5',
'2026-03-11',
'2026-03-30',
'Finalizada'
);

-- ============================================================
-- IKernell Solutions
-- Script: 10_actividades.sql
-- Descripción:
-- Datos de prueba para la entidad actividad.
-- ============================================================

INSERT INTO actividad
(
    codigo_actividad,
    id_etapa,
    id_usuario,
    nombre_actividad,
    descripcion,
    fecha_inicio,
    fecha_fin,
    prioridad,
    estado
)
VALUES

-- =====================================================
-- ETA-001 (Análisis)
-- =====================================================

(
'ACT-001',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-001'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-002'),
'Levantamiento de requerimientos',
'Recolección y validación de requerimientos con el cliente.',
'2026-06-01',
'2026-06-05',
'Alta',
'Finalizada'
),

(
'ACT-002',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-001'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-007'),
'Modelar procesos de negocio',
'Documentar procesos funcionales del sistema.',
'2026-06-06',
'2026-06-15',
'Media',
'Finalizada'
),

-- =====================================================
-- ETA-002 (Diseño)
-- =====================================================

(
'ACT-003',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-002'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-006'),
'Diseñar modelo relacional',
'Construcción del modelo de base de datos.',
'2026-06-16',
'2026-06-22',
'Alta',
'Finalizada'
),

(
'ACT-004',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-002'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-004'),
'Diseñar API REST',
'Definición de endpoints y contratos del backend.',
'2026-06-23',
'2026-07-05',
'Alta',
'Finalizada'
),

-- =====================================================
-- ETA-003 (Desarrollo)
-- =====================================================

(
'ACT-005',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-003'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-004'),
'Implementar autenticación JWT',
'Desarrollar autenticación y autorización basada en JWT.',
'2026-07-06',
'2026-07-18',
'Alta',
'Finalizada'
),

(
'ACT-006',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-003'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-005'),
'Desarrollar módulo de usuarios',
'Implementación completa del CRUD de usuarios.',
'2026-07-10',
'2026-07-30',
'Alta',
'En desarrollo'
),

(
'ACT-007',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-003'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-006'),
'Implementar gestión de proyectos',
'CRUD de proyectos y asignaciones.',
'2026-07-18',
'2026-08-05',
'Alta',
'En desarrollo'
),

(
'ACT-008',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-003'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-007'),
'Implementar dashboard',
'Construcción del dashboard administrativo.',
'2026-08-01',
'2026-08-20',
'Media',
'Pendiente'
),

(
'ACT-009',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-003'),
NULL,
'Implementar módulo de reportes',
'Desarrollo de exportación y reportes.',
'2026-08-20',
'2026-09-10',
'Media',
'Pendiente de asignación'
),

-- =====================================================
-- ETA-006 (Proyecto 2)
-- =====================================================

(
'ACT-010',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-006'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-003'),
'Definir alcance del proyecto',
'Planeación inicial del proyecto.',
'2026-08-01',
'2026-08-07',
'Alta',
'En desarrollo'
),

(
'ACT-011',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-006'),
NULL,
'Elaborar cronograma',
'Construcción del cronograma inicial.',
'2026-08-05',
'2026-08-10',
'Media',
'Pendiente de asignación'
),

-- =====================================================
-- Proyecto Finalizado
-- =====================================================

(
'ACT-012',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-010'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-011'),
'Implementar módulo PQRS',
'Desarrollo del módulo de atención al cliente.',
'2025-12-10',
'2026-01-15',
'Alta',
'Finalizada'
),

(
'ACT-013',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-010'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-004'),
'Integración con correo electrónico',
'Implementación del envío automático de correos.',
'2026-01-16',
'2026-02-02',
'Media',
'Finalizada'
),

(
'ACT-014',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-011'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-006'),
'Pruebas funcionales',
'Ejecución de pruebas funcionales del sistema.',
'2026-02-16',
'2026-02-28',
'Alta',
'Finalizada'
),

(
'ACT-015',
(SELECT id_etapa FROM etapa WHERE codigo_etapa='ETA-012'),
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-002'),
'Despliegue en producción',
'Liberación de la versión estable del sistema.',
'2026-03-20',
'2026-03-30',
'Alta',
'Finalizada'
);

-- ============================================================
-- IKernell Solutions
-- Script: 11_registro_error.sql
-- Descripción:
-- Datos de prueba para la entidad registro_error.
-- ============================================================

INSERT INTO registro_error
(
    codigo_registro_error,
    id_actividad,
    id_tipo_error,
    titulo,
    descripcion,
    severidad
)
VALUES

(
'ERR-001',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-005'),
(SELECT id_tipo_error FROM tipo_error WHERE codigo_tipo_error='TER-013'),
'Token JWT expirado',
'La sesión expira antes del tiempo configurado para usuarios autenticados.',
'Alta'
),

(
'ERR-002',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-006'),
(SELECT id_tipo_error FROM tipo_error WHERE codigo_tipo_error='TER-008'),
'Validación de correo incompleta',
'El formulario permite registrar correos electrónicos con formato inválido.',
'Media'
),

(
'ERR-003',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-006'),
(SELECT id_tipo_error FROM tipo_error WHERE codigo_tipo_error='TER-001'),
'Usuario duplicado',
'Es posible registrar dos usuarios con el mismo documento de identidad.',
'Alta'
),

(
'ERR-004',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-007'),
(SELECT id_tipo_error FROM tipo_error WHERE codigo_tipo_error='TER-004'),
'Error al asignar integrantes',
'La API devuelve un error al agregar desarrolladores al proyecto.',
'Alta'
),

(
'ERR-005',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-007'),
(SELECT id_tipo_error FROM tipo_error WHERE codigo_tipo_error='TER-005'),
'Violación de llave foránea',
'Se presenta un error de integridad al registrar una asignación.',
'Crítica'
),

(
'ERR-006',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-012'),
(SELECT id_tipo_error FROM tipo_error WHERE codigo_tipo_error='TER-003'),
'Botón sin estilos',
'El botón de enviar solicitud no mantiene el estilo definido por el sistema.',
'Baja'
),

(
'ERR-007',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-013'),
(SELECT id_tipo_error FROM tipo_error WHERE codigo_tipo_error='TER-009'),
'Configuración SMTP incorrecta',
'La configuración del servidor SMTP impide el envío de correos.',
'Media'
),

(
'ERR-008',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-014'),
(SELECT id_tipo_error FROM tipo_error WHERE codigo_tipo_error='TER-015'),
'Visualización incorrecta en Firefox',
'La interfaz presenta diferencias visuales respecto a Chrome.',
'Baja'
);

-- id_usuario_creador no está en el INSERT de arriba porque cada fila ya
-- selecciona su actividad por código; se backfillea aquí en un solo paso
-- con el desarrollador de esa actividad (quien los creó, bajo las
-- reglas de negocio actuales).
UPDATE registro_error
SET id_usuario_creador = (
    SELECT a.id_usuario FROM actividad a WHERE a.id_actividad = registro_error.id_actividad
)
WHERE id_usuario_creador IS NULL;

-- ============================================================
-- IKernell Solutions
-- Script: 12_interrupciones.sql
-- Descripción:
-- Datos de prueba para la entidad interrupcion.
-- ============================================================

INSERT INTO interrupcion
(
    codigo_interrupcion,
    id_actividad,
    id_tipo_interrupcion,
    motivo,
    duracion_minutos
)
VALUES

(
'INT-001',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-006'),
(SELECT id_tipo_interrupcion FROM tipo_interrupcion WHERE codigo_tipo_interrupcion='TIN-001'),
'Reunión diaria de seguimiento del Sprint.',
45
),

(
'INT-002',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-007'),
(SELECT id_tipo_interrupcion FROM tipo_interrupcion WHERE codigo_tipo_interrupcion='TIN-014'),
'Se esperaba la entrega del contrato de la API externa.',
180
),

(
'INT-003',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-007'),
(SELECT id_tipo_interrupcion FROM tipo_interrupcion WHERE codigo_tipo_interrupcion='TIN-015'),
'Error de compilación que bloqueó el desarrollo.',
120
),

(
'INT-004',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-010'),
(SELECT id_tipo_interrupcion FROM tipo_interrupcion WHERE codigo_tipo_interrupcion='TIN-013'),
'El cliente solicitó una reunión urgente para redefinir prioridades.',
90
),

(
'INT-005',
(SELECT id_actividad FROM actividad WHERE codigo_actividad='ACT-009'),
(SELECT id_tipo_interrupcion FROM tipo_interrupcion WHERE codigo_tipo_interrupcion='TIN-016'),
'Pendiente de aprobación del diseño funcional.',
240
);

UPDATE interrupcion
SET id_usuario_creador = (
    SELECT a.id_usuario FROM actividad a WHERE a.id_actividad = interrupcion.id_actividad
)
WHERE id_usuario_creador IS NULL;

-- ============================================================
-- IKernell Solutions
-- Script: 13_mensaje_contacto.sql
-- ============================================================

INSERT INTO mensaje_contacto
(
codigo_mensaje,
nombre_remitente,
correo_electronico,
asunto,
detalle,
estado,
respuesta,
id_responsable,
fecha_envio,
fecha_atencion
)

VALUES

(
'MEN-001',
'Carlos Rojas',
'carlos.rojas@clinicasg.com',
'Consulta avance del proyecto',
'Solicitamos conocer el porcentaje de avance del Sistema de Gestión Documental.',
'Atendido',
'Actualmente el proyecto presenta un avance del 65% y continúa según el cronograma establecido.',
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-001'),
'2026-07-10 09:15',
'2026-07-10 10:05'
),

(
'MEN-002',
'Laura Pérez',
'laura.perez@andina.com',
'Solicitud de reunión',
'Queremos programar una reunión para revisar el alcance inicial.',
'Leído',
NULL,
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-014'),
'2026-08-02 11:40',
NULL
),

(
'MEN-003',
'Miguel Torres',
'miguel.torres@nova.com',
'Felicitaciones',
'Agradecemos el trabajo realizado durante la implementación.',
'Atendido',
'Muchas gracias por la confianza depositada en IKernell.',
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-001'),
'2026-03-31 15:20',
'2026-03-31 16:00'
),

(
'MEN-004',
'Sandra Gómez',
'sandra.gomez@clinicasg.com',
'Reporte de inconveniente',
'Se presentó una inconsistencia al cargar documentos.',
'Pendiente',
NULL,
NULL,
'2026-08-14 08:50',
NULL
),

(
'MEN-005',
'Juan Herrera',
'juan.herrera@nova.com',
'Solicitud de capacitación',
'Solicitamos una capacitación para los usuarios finales.',
'Pendiente',
NULL,
NULL,
'2026-08-15 14:30',
NULL
);

-- ============================================================
-- IKernell Solutions
-- Script: 14_notificacion.sql
-- ============================================================

INSERT INTO notificacion
(
    codigo_notificacion,
    id_usuario,
    titulo,
    detalle,
    tipo,
    leida,
    fecha_lectura
)
VALUES

(
'NOT-001',
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-004'),
'Nueva actividad asignada',
'Se le asignó la actividad Implementar autenticación JWT.',
'Actividad',
TRUE,
'2026-07-06 09:30:00'
),

(
'NOT-002',
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-005'),
'Nuevo error registrado',
'Se registró un error asociado al módulo de usuarios.',
'Error',
FALSE,
NULL
),

(
'NOT-003',
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-002'),
'Nuevo mensaje del cliente',
'Existe un nuevo mensaje pendiente de atención.',
'Mensaje',
FALSE,
NULL
),

(
'NOT-004',
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-003'),
'Proyecto actualizado',
'El estado del proyecto cambió a Planeación.',
'Proyecto',
TRUE,
'2026-08-01 11:20:00'
),

(
'NOT-005',
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-001'),
'Actividad finalizada',
'La actividad Despliegue en producción fue finalizada.',
'Actividad',
TRUE,
'2026-03-30 17:40:00'
),

(
'NOT-006',
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-006'),
'Interrupción registrada',
'Se registró una interrupción por Bloqueo Técnico.',
'Interrupción',
FALSE,
NULL
);

-- ============================================================
-- IKernell Solutions
-- Script: 15_trazabilidad.sql
-- ============================================================

INSERT INTO trazabilidad
(
id_usuario,
entidad,
codigo_registro,
operacion,
detalle
)

VALUES

(
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-001'),
'Usuario',
'USR-014',
'Crear',
'Se registró un nuevo coordinador en el sistema.'
),

(
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-001'),
'Proyecto',
'PRY-001',
'Crear',
'Se creó el proyecto Sistema de Gestión Documental.'
),

(
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-002'),
'Proyecto',
'PRY-001',
'Cambiar Estado',
'El proyecto cambió de Planeación a En ejecución.'
),

(
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-002'),
'Actividad',
'ACT-005',
'Cambiar Estado',
'La actividad fue marcada como Finalizada.'
),

(
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-005'),
'RegistroError',
'ERR-003',
'Crear',
'Se registró un nuevo error funcional durante el desarrollo.'
),

(
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-006'),
'Interrupción',
'INT-003',
'Crear',
'Se registró una interrupción por Bloqueo Técnico.'
),

(
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-001'),
'Mensaje',
'MEN-001',
'Actualizar',
'El mensaje fue atendido y respondido al cliente.'
),

(
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-014'),
'Proyecto',
'PRY-002',
'Crear',
'Se creó el proyecto Plataforma de Inventarios.'
),

(
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-003'),
'Actividad',
'ACT-010',
'Asignar',
'La actividad fue asignada al líder del proyecto.'
),

(
(SELECT id_usuario FROM usuario WHERE codigo_usuario='USR-001'),
'Proyecto',
'PRY-003',
'Cambiar Estado',
'El proyecto fue marcado como Finalizado.'
);
