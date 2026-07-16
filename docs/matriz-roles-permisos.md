# Matriz de roles y permisos

Esta matriz resume el comportamiento por rol segun la documentacion del proyecto y el estado actual del aplicativo. La seguridad esta implementada en backend (JWT + `@PreAuthorize` + reglas de pertenencia en los Services); la columna "Estado actual" refleja lo verificable en el codigo. El filtrado de rutas en el frontend es UX: la fuente de verdad es el backend.

## Roles

| Rol | Tipo de acceso | Descripcion |
| --- | --- | --- |
| Visitante | Publico / anonimo | Consulta informacion publica y envia mensajes de contacto. |
| Coordinador | Autenticado | Gestiona usuarios, mensajes, catalogos e informes generales. |
| Lider | Autenticado | Gestiona los proyectos de los que es lider vigente, sus etapas, actividades y reportes. |
| Desarrollador | Autenticado | Consulta actividades asignadas y registra errores/interrupciones. |

## Permisos esperados

Notacion: el rol organizacional se valida con `@PreAuthorize` (hasRole/hasAnyRole) en el controller; la *pertenencia* al proyecto (ownership) la valida `AutorizacionProyectoService` en el Service.

| Modulo / Accion | Visitante | Coordinador | Lider | Desarrollador | Estado actual |
| --- | --- | --- | --- | --- | --- |
| Ver portal publico | Si | Si | Si | Si | Implementado (endpoint publico) |
| Enviar mensaje de contacto | Si | Si | Si | Si | Implementado (`POST /api/mensajes-contacto` publico) |
| Iniciar sesion | No aplica | Si | Si | Si | Implementado: JWT firmado (HS256) + BCrypt, sesion stateless |
| Ver dashboard | No | Si | Si | Si | Implementado (requiere JWT valido) |
| Gestionar usuarios | No | Si | No | No | Implementado backend (`@PreAuthorize` Coordinador) |
| Crear usuario Coordinador | No | No | No | No | Bloqueado en backend |
| Inhabilitar Coordinador | No | No | No | No | Bloqueado en backend |
| Rechazo inmediato de cuenta inhabilitada | - | - | - | - | Implementado: el filtro valida `isEnabled()` en cada peticion |
| Ver mensajes de contacto | No | Si | No | No | Implementado backend (`@PreAuthorize` Coordinador) |
| Atender mensajes | No | Si | No | No | Implementado (guarda respuesta/estado); envio de correo real fuera de alcance |
| Gestionar proyectos | No | Cualquiera | Solo del que es lider vigente | Consulta asignados | Implementado: rol + ownership. Eliminar: solo Coordinador |
| Gestionar etapas | No | Cualquiera | Solo de sus proyectos | Consulta | Implementado: rol + ownership |
| Gestionar actividades | No | Cualquiera | Solo de sus proyectos | Ejecuta las asignadas (escalera de estados) | Implementado: rol + ownership en Service |
| Registrar errores | No | Consulta | Consulta | Si | Implementado (gate de registro en Service) |
| Registrar interrupciones | No | Consulta | Consulta | Si | Implementado (gate de registro en Service) |
| Gestionar tipos de error | No | Si | No | No | Implementado backend (`@PreAuthorize` Coordinador a nivel de clase) |
| Gestionar tipos de interrupcion | No | Si | No | No | Implementado backend (`@PreAuthorize` Coordinador a nivel de clase) |
| Generar informes / metricas | No | Si (org-wide) | Si, segun sus proyectos | Solo lo suyo | Implementado: endpoints de metricas separados por rol |

## Estado de la seguridad

- **Implementado:** autenticacion JWT stateless, `@EnableMethodSecurity` con `@PreAuthorize` por operacion, reglas de pertenencia (ownership) en los Services, y rechazo por peticion de cuentas inhabilitadas.
- **Endpoints protegidos desde backend**, no solo rutas del frontend: `anyRequest().authenticated()` mas los `@PreAuthorize` cierran el acceso directo por API a quien no tiene permiso.

## Pendientes

- **Pruebas automatizadas** de esta matriz (autorizacion por rol + ownership + escaleras de estado). Es el mayor valor pendiente: convierte esta tabla en garantia verificable en vez de afirmacion.
- Endurecimientos de produccion (rate limiting, CSP, correo real) documentados en `docs/decisiones-alcance.md` como fuera de alcance del caso de estudio.
