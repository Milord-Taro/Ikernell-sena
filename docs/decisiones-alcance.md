# Decisiones de alcance y desalineaciones

Este documento registra puntos donde la documentacion academica y el codigo actual no estan completamente alineados. La idea es decidir si cada punto se implementa, se ajusta en documentacion o se deja como pendiente justificado.

## HU-04 / RF-004 - Servicios internos del trabajador

**Documentacion:** el trabajador autenticado debe acceder a correo corporativo, chat corporativo, biblioteca de programas de la empresa y tutoriales de programacion.

**Estado actual observado:** el aplicativo tiene dashboard interno y navegacion protegida, pero no se observaron modulos completos de correo, chat, biblioteca o tutoriales.

**Decision pendiente:** definir si estos servicios seran:

- Enlaces externos desde la seccion de links/interes.
- Modulos internos reales.
- Alcance futuro documentado como pendiente.

**Recomendacion:** para entrega SENA, tratarlos como enlaces o alcance futuro, salvo que el instructor exija modulos completos.

## HU-07 / RF-007 - Asignacion de desarrolladores a proyectos

**Documentacion:** el lider de proyectos debe registrar proyectos y asignar desarrolladores.

**Estado actual observado:** existe entidad/controlador/servicio de asignacion de proyecto y paginas de proyectos, pero debe validarse el flujo completo en UI.

**Decision pendiente:** confirmar si la asignacion ya es usable desde la interfaz o si requiere una pantalla/accion visible en detalle de proyecto.

**Recomendacion:** validar manualmente el flujo antes de marcar HU-07 como implementada.

## HU-10 / RF-010 - Reportes de proyecto y archivo plano

**Documentacion:** el lider debe generar reportes de interrupciones, actividades y archivo plano para una empresa aliada brasileña.

**Estado actual observado:** existe `InformesPage`, paginas de historial de errores/interrupciones y `exportService`.

**Decision pendiente:** confirmar si los reportes cumplen el formato esperado y si el archivo plano existe con el contenido requerido.

**Recomendacion:** crear evidencia de cada reporte y documentar el formato exportado.

## HU-14 / RF-014 - Gestionar mensajes de contacto

**Documentacion:** el coordinador debe ver mensajes, marcarlos como leidos, responder desde el sistema, enviar correo al remitente y registrar responsable/fecha.

**Estado actual observado:** existe bandeja de mensajes, detalle, respuesta guardada, estado `Atendido` y endpoint para marcar como `Leido`. No se observo envio real de correo.

**Decision pendiente:** definir si la respuesta se guarda solamente en el sistema o si se implementara envio real con correo.

**Recomendacion:** para evitar configuracion sensible de correo, documentar como version academica sin envio real o implementar JavaMailSender solo con variables de entorno.

## Seguridad y roles

**Documentacion:** los roles tienen permisos diferenciados.

**Estado actual observado:** el frontend filtra rutas por rol, y ya se reforzaron reglas criticas de Coordinador en backend. Todavia no existe autenticacion real con token/sesion ni proteccion completa de endpoints por rol.

**Decision pendiente:** definir si se implementara Spring Security completo o si se documentara la limitacion academica actual.

**Recomendacion:** no activar permisos endpoint por endpoint hasta definir autenticacion real.
