-- Datos de prueba visual para Ikernell-sena.
-- Ejecutar despues de DDL y DML, solo en ambiente local o demo.
-- El script evita IDs fijos y relaciona tablas usando codigos estables.

BEGIN;

INSERT INTO Profesion (codProfesion, nombreProfesion) VALUES
    ('PRO-006', 'Tecnologia en Desarrollo de Software'),
    ('PRO-007', 'Ingenieria de Datos'),
    ('PRO-008', 'Analisis de Sistemas'),
    ('PRO-009', 'Administracion de Sistemas Informaticos'),
    ('PRO-010', 'Diseno de Experiencia de Usuario')
ON CONFLICT (codProfesion) DO NOTHING;

INSERT INTO Especialidad (codEspecialidad, nombreEspecialidad) VALUES
    ('ESP-007', 'QA Automatizacion'),
    ('ESP-008', 'Analisis Funcional'),
    ('ESP-009', 'Arquitectura de Software'),
    ('ESP-010', 'Integracion Continua'),
    ('ESP-011', 'Analitica de Datos'),
    ('ESP-012', 'Diseno UI'),
    ('ESP-013', 'Soporte Tecnico')
ON CONFLICT (codEspecialidad) DO NOTHING;

INSERT INTO TipoError (codTipoError, nombreTipo) VALUES
    ('TER-006', 'Error de autenticacion'),
    ('TER-007', 'Error de validacion'),
    ('TER-008', 'Error de rendimiento'),
    ('TER-009', 'Error de permisos'),
    ('TER-010', 'Error de despliegue'),
    ('TER-011', 'Error de datos'),
    ('TER-012', 'Error de navegacion')
ON CONFLICT (codTipoError) DO NOTHING;

INSERT INTO TipoInterrupcion (codTipoInterrupcion, nombreTipoInterrupcion) VALUES
    ('TIN-006', 'Revision tecnica extendida'),
    ('TIN-007', 'Bloqueo por dependencia externa'),
    ('TIN-008', 'Cambio de prioridad'),
    ('TIN-009', 'Ambiente de pruebas no disponible'),
    ('TIN-010', 'Capacitacion interna'),
    ('TIN-011', 'Revision de seguridad'),
    ('TIN-012', 'Correccion urgente en produccion')
ON CONFLICT (codTipoInterrupcion) DO NOTHING;

INSERT INTO Usuario (
    codUsuario, nombre, apellido, fechaNacimiento, tipoIdentificacion,
    numeroIdentificacion, correoElectronico, direccion, contrasena,
    fotoPerfil, estado, idRol, idProfesion, idEspecialidad
)
SELECT
    v.codUsuario,
    v.nombre,
    v.apellido,
    v.fechaNacimiento::date,
    v.tipoIdentificacion,
    v.numeroIdentificacion,
    v.correoElectronico,
    v.direccion,
    v.contrasena,
    v.fotoPerfil,
    v.estado,
    r.idRol,
    p.idProfesion,
    e.idEspecialidad
FROM (
    VALUES
    ('USR-010', 'Laura', 'Quintero', '1991-04-16', 'CC', '900100010', 'laura.quintero@ikernell.com', 'Calle 26 # 68-20, Bogota', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-002', 'PRO-002', 'ESP-009'),
    ('USR-011', 'Mateo', 'Salazar', '1996-08-03', 'CC', '900100011', 'mateo.salazar@ikernell.com', 'Carrera 50 # 12-44, Medellin', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-003', 'PRO-006', 'ESP-002'),
    ('USR-012', 'Camila', 'Navarro', '1994-02-21', 'CC', '900100012', 'camila.navarro@ikernell.com', 'Avenida Suba # 105-18, Bogota', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-003', 'PRO-010', 'ESP-012'),
    ('USR-013', 'Santiago', 'Mejia', '1992-12-07', 'CC', '900100013', 'santiago.mejia@ikernell.com', 'Calle 10 # 43-30, Cali', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-003', 'PRO-007', 'ESP-011'),
    ('USR-014', 'Juliana', 'Pardo', '1997-06-14', 'CC', '900100014', 'juliana.pardo@ikernell.com', 'Carrera 15 # 88-21, Bogota', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-003', 'PRO-003', 'ESP-007'),
    ('USR-015', 'Esteban', 'Rojas', '1989-10-29', 'CC', '900100015', 'esteban.rojas@ikernell.com', 'Diagonal 74 # 30-11, Bucaramanga', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-002', 'PRO-009', 'ESP-004'),
    ('USR-016', 'Daniela', 'Acosta', '1998-01-18', 'CC', '900100016', 'daniela.acosta@ikernell.com', 'Calle 19 # 6-44, Pereira', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-003', 'PRO-008', 'ESP-008'),
    ('USR-017', 'Nicolas', 'Vargas', '1995-09-05', 'CC', '900100017', 'nicolas.vargas@ikernell.com', 'Carrera 7 # 32-12, Manizales', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, FALSE, 'ROL-003', 'PRO-004', 'ESP-013'),
    ('USR-018', 'Paula', 'Moreno', '1993-03-27', 'CC', '900100018', 'paula.moreno@ikernell.com', 'Calle 80 # 45-70, Barranquilla', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-003', 'PRO-005', 'ESP-001'),
    ('USR-019', 'Hector', 'Cifuentes', '1987-11-11', 'CC', '900100019', 'hector.cifuentes@ikernell.com', 'Avenida Chile # 71-55, Bogota', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-002', 'PRO-001', 'ESP-005'),
    ('USR-020', 'Mariana', 'Cortes', '1999-05-09', 'CC', '900100020', 'mariana.cortes@ikernell.com', 'Calle 37 # 18-09, Armenia', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-003', 'PRO-006', 'ESP-010'),
    ('USR-021', 'Ivan', 'Beltran', '1990-07-31', 'CC', '900100021', 'ivan.beltran@ikernell.com', 'Carrera 60 # 40-22, Bogota', '$2a$10$rzPVifwGw6JhkwcKqd.UNu/kmWOocyxkk.1ETyL.KzSaKpUqtNmC2', NULL, TRUE, 'ROL-003', 'PRO-002', 'ESP-003')
) AS v(
    codUsuario, nombre, apellido, fechaNacimiento, tipoIdentificacion,
    numeroIdentificacion, correoElectronico, direccion, contrasena,
    fotoPerfil, estado, codRol, codProfesion, codEspecialidad
)
JOIN Rol r ON r.codRol = v.codRol
JOIN Profesion p ON p.codProfesion = v.codProfesion
LEFT JOIN Especialidad e ON e.codEspecialidad = v.codEspecialidad
ON CONFLICT (codUsuario) DO NOTHING;

INSERT INTO Proyecto (
    codProyecto, nombreProyecto, descripcionProyecto, fechaInicioProyecto,
    fechaFinProyecto, estadoProyecto, idLider
)
SELECT
    v.codProyecto,
    v.nombreProyecto,
    v.descripcionProyecto,
    v.fechaInicioProyecto::date,
    v.fechaFinProyecto::date,
    v.estadoProyecto,
    u.idUsuario
FROM (
    VALUES
    ('PRY-010', 'Portal de Autogestion Clientes', 'Portal web para seguimiento de solicitudes, pagos y soporte de clientes empresariales.', '2026-02-03', '2026-07-31', TRUE, 'USR-010'),
    ('PRY-011', 'Mesa de Ayuda Interna', 'Sistema para registrar incidentes tecnicos, acuerdos de servicio y trazabilidad de soporte.', '2026-02-20', '2026-08-15', TRUE, 'USR-015'),
    ('PRY-012', 'Dashboard Ejecutivo Comercial', 'Panel de indicadores para seguimiento de ventas, propuestas y oportunidades por region.', '2026-03-10', '2026-09-20', TRUE, 'USR-019'),
    ('PRY-013', 'Aplicacion Movil de Campo', 'Aplicacion movil para reportes de visitas, evidencias fotograficas y sincronizacion offline.', '2026-04-01', '2026-10-30', TRUE, 'USR-010'),
    ('PRY-014', 'Modernizacion Sistema Academico', 'Refactorizacion progresiva de modulos academicos, usuarios, reportes y auditoria.', '2026-01-08', '2026-05-30', FALSE, 'USR-015'),
    ('PRY-015', 'Integracion API Contable', 'Integracion de facturacion, cartera y conciliacion con sistema contable externo.', '2026-05-05', '2026-11-28', TRUE, 'USR-019')
) AS v(codProyecto, nombreProyecto, descripcionProyecto, fechaInicioProyecto, fechaFinProyecto, estadoProyecto, codLider)
JOIN Usuario u ON u.codUsuario = v.codLider
ON CONFLICT (codProyecto) DO NOTHING;

INSERT INTO AsignacionProyecto (fechaAsignacion, estadoAsignacion, idUsuario, idProyecto)
SELECT
    v.fechaAsignacion::date,
    v.estadoAsignacion,
    u.idUsuario,
    p.idProyecto
FROM (
    VALUES
    ('2026-02-03', TRUE, 'USR-011', 'PRY-010'),
    ('2026-02-03', TRUE, 'USR-012', 'PRY-010'),
    ('2026-02-03', TRUE, 'USR-014', 'PRY-010'),
    ('2026-02-20', TRUE, 'USR-016', 'PRY-011'),
    ('2026-02-20', TRUE, 'USR-017', 'PRY-011'),
    ('2026-02-20', TRUE, 'USR-020', 'PRY-011'),
    ('2026-03-10', TRUE, 'USR-013', 'PRY-012'),
    ('2026-03-10', TRUE, 'USR-018', 'PRY-012'),
    ('2026-03-10', TRUE, 'USR-021', 'PRY-012'),
    ('2026-04-01', TRUE, 'USR-011', 'PRY-013'),
    ('2026-04-01', TRUE, 'USR-018', 'PRY-013'),
    ('2026-04-01', TRUE, 'USR-020', 'PRY-013'),
    ('2026-01-08', FALSE, 'USR-012', 'PRY-014'),
    ('2026-01-08', FALSE, 'USR-016', 'PRY-014'),
    ('2026-05-05', TRUE, 'USR-013', 'PRY-015')
) AS v(fechaAsignacion, estadoAsignacion, codUsuario, codProyecto)
JOIN Usuario u ON u.codUsuario = v.codUsuario
JOIN Proyecto p ON p.codProyecto = v.codProyecto
ON CONFLICT (idUsuario, idProyecto) DO NOTHING;

INSERT INTO Etapa (codEtapa, nombreEtapa, descripcionEtapa, fechaEtapa, idProyecto)
SELECT
    v.codEtapa,
    v.nombreEtapa,
    v.descripcionEtapa,
    v.fechaEtapa::date,
    p.idProyecto
FROM (
    VALUES
    ('ETA-010', 'Descubrimiento', 'Sesiones con usuarios clave y mapa de procesos del portal.', '2026-02-07', 'PRY-010'),
    ('ETA-011', 'Prototipado', 'Wireframes navegables para validar experiencia del cliente.', '2026-02-28', 'PRY-010'),
    ('ETA-012', 'Backend de solicitudes', 'Servicios para radicar, consultar y actualizar solicitudes.', '2026-03-20', 'PRY-010'),
    ('ETA-013', 'Soporte y SLA', 'Configuracion de categorias, prioridad y tiempos de respuesta.', '2026-03-02', 'PRY-011'),
    ('ETA-014', 'Bandeja de agentes', 'Vista operativa para gestionar casos y escalamiento.', '2026-03-25', 'PRY-011'),
    ('ETA-015', 'Indicadores gerenciales', 'Metricas de ventas, margen y oportunidades por segmento.', '2026-03-15', 'PRY-012'),
    ('ETA-016', 'Modelo analitico', 'Preparacion de consultas para alimentar graficas ejecutivas.', '2026-04-05', 'PRY-012'),
    ('ETA-017', 'Modulo offline', 'Captura local de visitas y sincronizacion posterior.', '2026-04-15', 'PRY-013'),
    ('ETA-018', 'Registro de evidencias', 'Carga de imagenes y observaciones de visitas de campo.', '2026-05-04', 'PRY-013'),
    ('ETA-019', 'Depuracion legado', 'Reemplazo de consultas antiguas y limpieza de datos inconsistentes.', '2026-01-20', 'PRY-014'),
    ('ETA-020', 'Reportes academicos', 'Pantallas para resumen academico y exportacion de datos.', '2026-02-18', 'PRY-014'),
    ('ETA-021', 'Autenticacion API externa', 'Conectividad segura con proveedor contable.', '2026-05-12', 'PRY-015'),
    ('ETA-022', 'Sincronizacion documental', 'Envio y confirmacion de documentos contables.', '2026-06-05', 'PRY-015'),
    ('ETA-023', 'Pruebas integrales', 'Validacion funcional cruzada con usuarios internos.', '2026-06-24', 'PRY-015'),
    ('ETA-024', 'Cierre y transferencia', 'Documentacion tecnica, manuales y entrega al equipo soporte.', '2026-07-12', 'PRY-010')
) AS v(codEtapa, nombreEtapa, descripcionEtapa, fechaEtapa, codProyecto)
JOIN Proyecto p ON p.codProyecto = v.codProyecto
ON CONFLICT (codEtapa) DO NOTHING;

INSERT INTO Actividad (
    codActividad, nombreActividad, descripcionActividad,
    fechaInicioActividad, fechaFinActividad, estadoActividad,
    fechaEjecucionActividad, idEtapa, idDesarrollador
)
SELECT
    v.codActividad,
    v.nombreActividad,
    v.descripcionActividad,
    v.fechaInicioActividad::date,
    v.fechaFinActividad::date,
    v.estadoActividad,
    v.fechaEjecucionActividad::date,
    e.idEtapa,
    u.idUsuario
FROM (
    VALUES
    ('ACT-010', 'Levantar mapa de procesos', 'Documentar pasos actuales de atencion al cliente.', '2026-02-07', '2026-02-12', 'Ejecutada', '2026-02-11', 'ETA-010', 'USR-016'),
    ('ACT-011', 'Disenar flujo de radicacion', 'Crear prototipo de radicacion y consulta de solicitudes.', '2026-02-28', '2026-03-06', 'Ejecutada', '2026-03-05', 'ETA-011', 'USR-012'),
    ('ACT-012', 'Implementar endpoints de solicitudes', 'Construir API para crear y listar solicitudes.', '2026-03-20', '2026-03-30', 'Pendiente', NULL, 'ETA-012', 'USR-011'),
    ('ACT-013', 'Configurar prioridades SLA', 'Definir prioridades y tiempos objetivo de atencion.', '2026-03-02', '2026-03-08', 'Ejecutada', '2026-03-08', 'ETA-013', 'USR-016'),
    ('ACT-014', 'Construir bandeja de casos', 'Vista de casos con filtros por estado, prioridad y agente.', '2026-03-25', '2026-04-08', 'Pendiente', NULL, 'ETA-014', 'USR-020'),
    ('ACT-015', 'Crear tarjetas KPI comerciales', 'Tarjetas de oportunidades, conversion y margen.', '2026-03-15', '2026-03-22', 'Ejecutada', '2026-03-21', 'ETA-015', 'USR-013'),
    ('ACT-016', 'Optimizar consultas de dashboard', 'Reducir tiempos de carga de graficas ejecutivas.', '2026-04-05', '2026-04-16', 'Pendiente', NULL, 'ETA-016', 'USR-021'),
    ('ACT-017', 'Persistencia local movil', 'Guardar visitas pendientes sin conexion.', '2026-04-15', '2026-04-28', 'Pendiente', NULL, 'ETA-017', 'USR-018'),
    ('ACT-018', 'Formulario de evidencias', 'Registrar fotos, coordenadas y observaciones de campo.', '2026-05-04', '2026-05-18', 'Pendiente', NULL, 'ETA-018', 'USR-011'),
    ('ACT-019', 'Eliminar consultas duplicadas', 'Reemplazar consultas legadas con servicios centralizados.', '2026-01-20', '2026-02-03', 'Ejecutada', '2026-02-02', 'ETA-019', 'USR-012'),
    ('ACT-020', 'Reporte academico por estado', 'Resumen de estudiantes y actividades por estado.', '2026-02-18', '2026-03-01', 'Ejecutada', '2026-02-28', 'ETA-020', 'USR-016'),
    ('ACT-021', 'Cliente HTTP contable', 'Servicio de autenticacion y renovacion de token API.', '2026-05-12', '2026-05-22', 'Pendiente', NULL, 'ETA-021', 'USR-013'),
    ('ACT-022', 'Enviar documentos contables', 'Construir payload de facturas y notas contables.', '2026-06-05', '2026-06-19', 'Pendiente', NULL, 'ETA-022', 'USR-021'),
    ('ACT-023', 'Plan de pruebas integrales', 'Casos de prueba para flujo completo de integracion.', '2026-06-24', '2026-07-02', 'Pendiente', NULL, 'ETA-023', 'USR-014'),
    ('ACT-024', 'Manual tecnico del portal', 'Documentar endpoints, pantallas y decisiones principales.', '2026-07-12', '2026-07-24', 'Pendiente', NULL, 'ETA-024', 'USR-020')
) AS v(
    codActividad, nombreActividad, descripcionActividad,
    fechaInicioActividad, fechaFinActividad, estadoActividad,
    fechaEjecucionActividad, codEtapa, codDesarrollador
)
JOIN Etapa e ON e.codEtapa = v.codEtapa
JOIN Usuario u ON u.codUsuario = v.codDesarrollador
ON CONFLICT (codActividad) DO NOTHING;

INSERT INTO RegistroError (
    codError, descripcionError, fechaRegistroError, estadoError,
    comentarioError, idTipoError, idEtapa, idDesarrollador
)
SELECT
    v.codError,
    v.descripcionError,
    v.fechaRegistroError::date,
    v.estadoError,
    v.comentarioError,
    te.idTipoError,
    e.idEtapa,
    u.idUsuario
FROM (
    VALUES
    ('ERR-010', 'El filtro de solicitudes no conserva el estado al cambiar de pagina.', '2026-03-27', 'Abierto', 'Reproducible en vista de portal cliente.', 'TER-012', 'ETA-012', 'USR-011'),
    ('ERR-011', 'La tarjeta KPI muestra porcentaje NaN cuando no hay ventas del periodo.', '2026-03-23', 'Corregido', 'Se agrego valor por defecto en el servicio.', 'TER-007', 'ETA-015', 'USR-013'),
    ('ERR-012', 'La bandeja de casos tarda mas de cinco segundos con muchos registros.', '2026-04-02', 'En Revision', 'Revisar indices y paginacion.', 'TER-008', 'ETA-014', 'USR-020'),
    ('ERR-013', 'El modulo offline duplica visitas al recuperar conexion.', '2026-04-22', 'Abierto', 'Falta identificador temporal de sincronizacion.', 'TER-004', 'ETA-017', 'USR-018'),
    ('ERR-014', 'El reporte academico exporta columnas en orden incorrecto.', '2026-02-26', 'Corregido', 'Se ajusto plantilla de exportacion.', 'TER-005', 'ETA-020', 'USR-016'),
    ('ERR-015', 'La API contable responde 401 despues de renovar token.', '2026-05-19', 'En Revision', 'Validar hora local y vencimiento de credenciales.', 'TER-006', 'ETA-021', 'USR-013'),
    ('ERR-016', 'La validacion permite fechas de finalizacion anteriores al inicio.', '2026-06-09', 'Abierto', 'Debe corregirse en frontend y backend.', 'TER-007', 'ETA-022', 'USR-021'),
    ('ERR-017', 'No se registra responsable al atender una solicitud de soporte.', '2026-04-09', 'Abierto', 'Depende de autenticacion real.', 'TER-009', 'ETA-014', 'USR-016'),
    ('ERR-018', 'El formulario de evidencias no informa cuando una imagen supera el tamano permitido.', '2026-05-13', 'Descartado', 'El alcance actual no incluye carga real de archivos.', 'TER-005', 'ETA-018', 'USR-011'),
    ('ERR-019', 'El despliegue demo no encuentra variables de entorno de conexion.', '2026-06-28', 'No Reproducible', 'Solo ocurre en ambiente local sin .env.', 'TER-010', 'ETA-023', 'USR-014')
) AS v(codError, descripcionError, fechaRegistroError, estadoError, comentarioError, codTipoError, codEtapa, codDesarrollador)
JOIN TipoError te ON te.codTipoError = v.codTipoError
JOIN Etapa e ON e.codEtapa = v.codEtapa
JOIN Usuario u ON u.codUsuario = v.codDesarrollador
ON CONFLICT (codError) DO NOTHING;

INSERT INTO Interrupcion (
    codInterrupcion, descripcionInterrupcion, fechaInterrupcion,
    duracionInterrupcion, idTipoInterrupcion, idEtapa, idDesarrollador
)
SELECT
    v.codInterrupcion,
    v.descripcionInterrupcion,
    v.fechaInterrupcion::date,
    v.duracionInterrupcion,
    ti.idTipoInterrupcion,
    e.idEtapa,
    u.idUsuario
FROM (
    VALUES
    ('INT-010', 'Sesion extra con cliente para redefinir prioridad de solicitudes.', '2026-03-24', 75, 'TIN-008', 'ETA-012', 'USR-011'),
    ('INT-011', 'Ambiente de pruebas sin disponibilidad durante validacion de bandeja.', '2026-04-04', 120, 'TIN-009', 'ETA-014', 'USR-020'),
    ('INT-012', 'Revision de arquitectura por cambio en volumen esperado de datos.', '2026-04-08', 90, 'TIN-006', 'ETA-016', 'USR-021'),
    ('INT-013', 'Capacitacion interna sobre sincronizacion offline.', '2026-04-20', 60, 'TIN-010', 'ETA-017', 'USR-018'),
    ('INT-014', 'Bloqueo por falta de credenciales del proveedor contable.', '2026-05-16', 180, 'TIN-007', 'ETA-021', 'USR-013'),
    ('INT-015', 'Revision de seguridad antes de enviar documentos contables.', '2026-06-11', 110, 'TIN-011', 'ETA-022', 'USR-021'),
    ('INT-016', 'Correccion urgente solicitada por lider durante pruebas integrales.', '2026-06-27', 95, 'TIN-012', 'ETA-023', 'USR-014'),
    ('INT-017', 'Reunion no planificada para ajustar alcance de evidencias.', '2026-05-09', 45, 'TIN-001', 'ETA-018', 'USR-011'),
    ('INT-018', 'Cambio de prioridad por demostracion ejecutiva adelantada.', '2026-03-18', 80, 'TIN-008', 'ETA-015', 'USR-013'),
    ('INT-019', 'Falla de internet en jornada de pruebas del portal.', '2026-02-29', 100, 'TIN-005', 'ETA-011', 'USR-012')
) AS v(codInterrupcion, descripcionInterrupcion, fechaInterrupcion, duracionInterrupcion, codTipoInterrupcion, codEtapa, codDesarrollador)
JOIN TipoInterrupcion ti ON ti.codTipoInterrupcion = v.codTipoInterrupcion
JOIN Etapa e ON e.codEtapa = v.codEtapa
JOIN Usuario u ON u.codUsuario = v.codDesarrollador
ON CONFLICT (codInterrupcion) DO NOTHING;

INSERT INTO MensajeContacto (
    codMensaje, nombreRemitente, correoRemitente, mensaje, fechaEnvio,
    estadoMensaje, respuesta, fechaRespuesta, idResponsable
)
SELECT
    v.codMensaje,
    v.nombreRemitente,
    v.correoRemitente,
    v.mensaje,
    v.fechaEnvio::timestamp,
    v.estadoMensaje,
    v.respuesta,
    v.fechaRespuesta::timestamp,
    u.idUsuario
FROM (
    VALUES
    ('MSG-010', 'Alejandra Ruiz', 'alejandra.ruiz@novaerp.co', 'Solicito una propuesta para modernizar nuestro modulo de inventario.', '2026-06-01 08:30:00', 'Pendiente', NULL, NULL, NULL),
    ('MSG-011', 'Oscar Molina', 'oscar.molina@fundacionandes.org', 'Necesitamos una demo de sistema para seguimiento de beneficiarios.', '2026-06-02 10:15:00', 'Leido', NULL, NULL, 'USR-001'),
    ('MSG-012', 'Tatiana Suarez', 'tatiana.suarez@clinicacentral.co', 'Quisiera saber si integran agendas medicas con facturacion.', '2026-06-03 14:45:00', 'Atendido', 'Si, podemos revisar integraciones mediante API y proponer un piloto.', '2026-06-03 16:20:00', 'USR-001'),
    ('MSG-013', 'Ricardo Pena', 'ricardo.pena@logisur.com', 'Buscamos una aplicacion movil para conductores con modo offline.', '2026-06-05 09:05:00', 'Pendiente', NULL, NULL, NULL),
    ('MSG-014', 'Natalia Vega', 'natalia.vega@edutechlab.co', 'Deseo cotizar un portal academico con reportes y roles.', '2026-06-08 11:40:00', 'Atendido', 'Agendamos una llamada para validar alcance funcional y tiempos.', '2026-06-08 15:10:00', 'USR-001'),
    ('MSG-015', 'Martin Arias', 'martin.arias@agrodata.co', 'Tienen experiencia conectando sensores IoT con dashboards?', '2026-06-10 07:55:00', 'Leido', NULL, NULL, 'USR-001'),
    ('MSG-016', 'Sofia Bernal', 'sofia.bernal@finanzasplus.co', 'Necesitamos revisar seguridad para un portal de clientes.', '2026-06-12 13:20:00', 'Pendiente', NULL, NULL, NULL),
    ('MSG-017', 'Jorge Duarte', 'jorge.duarte@manufacturasjr.com', 'Estamos interesados en soporte para una migracion desde Excel.', '2026-06-14 17:30:00', 'Atendido', 'Podemos iniciar con diagnostico de archivos y diseno de base de datos.', '2026-06-15 09:10:00', 'USR-001'),
    ('MSG-018', 'Valeria Montes', 'valeria.montes@marketdata.co', 'Solicito informacion sobre mantenimiento mensual de software.', '2026-06-18 12:00:00', 'Pendiente', NULL, NULL, NULL),
    ('MSG-019', 'Felipe Leon', 'felipe.leon@transportesnorte.co', 'Queremos automatizar reportes operativos de rutas.', '2026-06-21 16:05:00', 'Leido', NULL, NULL, 'USR-001')
) AS v(codMensaje, nombreRemitente, correoRemitente, mensaje, fechaEnvio, estadoMensaje, respuesta, fechaRespuesta, codResponsable)
LEFT JOIN Usuario u ON u.codUsuario = v.codResponsable
ON CONFLICT (codMensaje) DO NOTHING;

COMMIT;
