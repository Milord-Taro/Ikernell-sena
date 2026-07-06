SELECT
    u.codigo_usuario,
    u.nombres,
    u.apellidos,
    r.nombre_rol,
    p.nombre_profesion,
    e.nombre_especialidad,
    u.activo
FROM usuario u
JOIN rol r
    ON u.id_rol = r.id_rol
JOIN profesion p
    ON u.id_profesion = p.id_profesion
JOIN especialidad e
    ON u.id_especialidad = e.id_especialidad
ORDER BY u.codigo_usuario;

SELECT
    p.codigo_proyecto,
    p.nombre_proyecto,
    p.estado,
    CONCAT(u.nombres,' ',u.apellidos) AS lider
FROM proyecto p
JOIN asignacion_proyecto ap
    ON p.id_proyecto = ap.id_proyecto
JOIN usuario u
    ON ap.id_usuario = u.id_usuario
WHERE ap.rol_proyecto='Líder';

SELECT
    p.nombre_proyecto,
    CONCAT(u.nombres,' ',u.apellidos) AS integrante,
    ap.rol_proyecto
FROM asignacion_proyecto ap
JOIN usuario u
    ON ap.id_usuario=u.id_usuario
JOIN proyecto p
    ON ap.id_proyecto=p.id_proyecto
ORDER BY
p.nombre_proyecto,
ap.rol_proyecto;

SELECT
    p.nombre_proyecto,
    e.orden,
    e.nombre_etapa,
    e.estado
FROM etapa e
JOIN proyecto p
    ON e.id_proyecto=p.id_proyecto
ORDER BY
p.codigo_proyecto,
e.orden;

SELECT
    a.codigo_actividad,
    a.nombre_actividad,
    a.estado,
    CONCAT(u.nombres,' ',u.apellidos) responsable
FROM actividad a
LEFT JOIN usuario u
    ON a.id_usuario=u.id_usuario
WHERE a.estado<>'Finalizada';

SELECT
    re.codigo_registro_error,
    te.nombre_tipo_error,
    re.titulo,
    re.severidad,
    a.nombre_actividad
FROM registro_error re
JOIN tipo_error te
    ON re.id_tipo_error=te.id_tipo_error
JOIN actividad a
    ON re.id_actividad=a.id_actividad
ORDER BY re.severidad DESC;

SELECT
    i.codigo_interrupcion,
    ti.nombre_tipo_interrupcion,
    a.nombre_actividad,
    i.duracion_minutos
FROM interrupcion i
JOIN tipo_interrupcion ti
    ON i.id_tipo_interrupcion=ti.id_tipo_interrupcion
JOIN actividad a
    ON i.id_actividad=a.id_actividad;
    
    
SELECT
codigo_mensaje,
nombre_remitente,
correo_electronico,
asunto,
estado
FROM mensaje_contacto
WHERE estado='Pendiente';

SELECT
codigo_notificacion,
titulo,
tipo,
fecha_creacion
FROM notificacion
WHERE leida=FALSE;

SELECT
fecha_evento,
entidad,
codigo_registro,
operacion,
detalle
FROM trazabilidad
ORDER BY fecha_evento DESC;

SELECT
COUNT(*) AS proyectos,
SUM(CASE WHEN estado='Planeación' THEN 1 ELSE 0 END) planeacion,
SUM(CASE WHEN estado='En ejecución' THEN 1 ELSE 0 END) ejecucion,
SUM(CASE WHEN estado='Finalizado' THEN 1 ELSE 0 END) finalizados
FROM proyecto;

SELECT
CONCAT(u.nombres,' ',u.apellidos) desarrollador,
COUNT(a.id_actividad) actividades
FROM usuario u
LEFT JOIN actividad a
ON u.id_usuario=a.id_usuario
GROUP BY
u.id_usuario,
u.nombres,
u.apellidos
ORDER BY actividades DESC;

SELECT
severidad,
COUNT(*) cantidad
FROM registro_error
GROUP BY severidad
ORDER BY
CASE severidad
WHEN 'Crítica' THEN 1
WHEN 'Alta' THEN 2
WHEN 'Media' THEN 3
WHEN 'Baja' THEN 4
END;
