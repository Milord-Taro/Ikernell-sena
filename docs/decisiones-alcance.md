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

**Estado actual (implementado):** el sistema ya cuenta con autenticacion real y autorizacion por rol de extremo a extremo. Concretamente:

- **Autenticacion JWT stateless.** `POST /api/auth/login` valida credenciales contra la tabla `usuario` (contrasenas con BCrypt, `PasswordEncoder`) y emite un JWT firmado (HS256) con el correo como subject y el rol como claim. `JwtAuthenticationFilter` valida ese token en cada peticion; la sesion es `STATELESS` (sin `HttpSession`).
- **Revalidacion del estado de la cuenta en cada peticion.** El filtro rechaza a un usuario inhabilitado (`isEnabled() == false`) aunque su token siga vigente, de modo que desactivar una cuenta surte efecto de inmediato y no al expirar el token.
- **Endpoints publicos acotados.** Solo son publicos `POST /api/auth/login`, `/api/auth/recuperar-contrasena`, `/api/auth/restablecer-contrasena` y `POST /api/mensajes-contacto` (RF-002: contacto anonimo). En perfil dev tambien Swagger/OpenAPI; en prod esos endpoints se desregistran. Todo lo demas exige un JWT valido (`anyRequest().authenticated()`).
- **Autorizacion por rol a nivel de metodo.** `@EnableMethodSecurity` esta activo y hay `@PreAuthorize` (hasRole/hasAnyRole) sobre los controllers, evaluando el rol organizacional (Coordinador, Lider de Proyecto, Desarrollador) por operacion.
- **Autorizacion por pertenencia (ownership).** Mas alla del rol, `AutorizacionProyectoService` decide "puede este usuario tocar este proyecto": el Coordinador gestiona cualquiera; un Lider solo el proyecto del que es lider vigente; un Desarrollador solo aquellos donde tiene asignacion vigente. Esto impide, por ejemplo, que un Lider edite el proyecto de otro Lider adivinando el id en la URL.

**Decision:** implementado. El filtrado de rutas por rol en el frontend es UX/comodidad; la fuente de verdad de la seguridad es el backend.

**Recomendacion:** mantener la matriz `docs/matriz-roles-permisos.md` como el mapa 1:1 de estos permisos y respaldarla con tests (ver backlog de pruebas de autorizacion).

## Brechas conocidas de produccion (fuera de alcance del caso de estudio)

Se documentan explicitamente las decisiones de alcance: son endurecimientos propios de un despliegue productivo, no exigidos para la evaluacion academica, y se dejan como pendientes justificados.

- **Rate limiting / bloqueo por intentos** en `POST /api/auth/login` y en el `POST /api/mensajes-contacto` publico (fuerza bruta y spam de contacto).
- **Cabecera CSP** y el trade-off de guardar el JWT en `localStorage` (alternativa: autenticacion con cookie `httpOnly`).
- **Envio real de correo** en la recuperacion de contrasena; hoy esta seamed en `TokenRecuperacionStore` para poder enchufar un `JavaMailSender` sin tocar la logica.
- **Observabilidad**: endpoint de salud (Actuator) y metricas.
- **Paginacion en servidor** de las tablas que crecen (el patron ya existe en trazabilidad).
- **Bloqueo optimista (`@Version`)** y automatizacion de dependencias (Dependabot/Renovate).
