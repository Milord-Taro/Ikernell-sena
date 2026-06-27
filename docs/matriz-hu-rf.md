# Matriz HU/RF contra implementacion

Esta matriz cruza las historias de usuario y requerimientos funcionales documentados con el estado observado en el aplicativo actual. Es un documento vivo: debe actualizarse cada vez que cambien pantallas, endpoints, reglas de negocio o alcance academico.

## Estados

- `Implementado`: existe flujo funcional principal en frontend/backend.
- `Parcial`: existe parte del flujo, pero falta una regla, validacion, permiso, reporte o integracion.
- `Pendiente`: no se observo implementacion clara.
- `Por validar`: existe codigo relacionado, pero hace falta prueba funcional o confirmacion documental.

## Matriz

| HU | RF | Nombre | Modulo | Estado | Evidencia en codigo | Observaciones |
| --- | --- | --- | --- | --- | --- | --- |
| HU-01 | RF-001 | Consultar informacion publica de la empresa | Portal publico | Implementado | `LandingPage`, `Hero`, `Services`, `Lineamientos`, `News`, `FAQ`, `LinksInteres`, `Contact` | Revisar enlaces externos y mantener textos actualizados. |
| HU-02 | RF-002 | Envio de preguntas de usuario interesado | Portal publico / Contacto | Implementado | `Contact`, `mensajeService`, `MensajeContactoController`, `MensajeContactoService` | Falta validar manejo de errores y campos requeridos desde backend. |
| HU-03 | RF-003 | Iniciar sesion como trabajador | Autenticacion | Parcial | `AuthModal`, `authService`, `UsuarioController`, `UsuarioService.login` | Funciona con usuario en `localStorage`, pero no hay seguridad backend real ni token/sesion formal. |
| HU-04 | RF-004 | Acceder a servicios basicos internos del trabajador | Servicios internos | Parcial | `DashboardLayout`, `DashboardSidebar`, `LinksInteres` | La documentacion menciona correo, chat, biblioteca y tutoriales. Confirmar si seran modulos reales o enlaces. |
| HU-05 | RF-005 | Registrar y gestionar perfil de desarrollador | Usuarios | Parcial | `UsuariosPage`, `UsuarioNuevoPage`, `UsuarioEditarPage`, `UsuarioDetallePage`, `UsuarioController`, `UsuarioService` | CRUD principal existe. Falta reforzar reglas en backend, DTOs, permisos reales y asignacion a proyectos si aplica. |
| HU-06 | RF-006 | Generar reporte de desempeno del desarrollador | Informes | Parcial | `InformesPage`, `exportService` | Confirmar si el reporte cumple criterios de HU y si se genera desde ficha del desarrollador. |
| HU-07 | RF-007 | Registrar y gestionar proyectos | Proyectos | Parcial | `ProyectosPage`, `ProyectoDetallePage`, `ProyectoController`, `ProyectoService` | CRUD existe. Revisar inhabilitacion vs eliminacion, asignacion de desarrolladores y permisos por rol. |
| HU-08 | RF-008 | Gestionar etapas del proyecto | Etapas | Implementado / Por validar | `EtapaDetallePage`, `EtapaModal`, `EtapaController`, `EtapaService` | Validar criterios completos: crear, modificar, eliminar y relacion con proyecto. |
| HU-09 | RF-009 | Registrar y modificar actividades del proyecto | Actividades | Implementado / Por validar | `ActividadesPage`, `ActividadDetallePage`, `ActividadModal`, `ActividadController`, `ActividadService` | Validar que solo lider cree/modifique y que desarrollador consulte solo lo asignado. |
| HU-10 | RF-010 | Generar reportes del proyecto | Informes | Parcial | `InformesPage`, `ProyectoHistorialErroresPage`, `ProyectoHistorialInterrupcionesPage`, `exportService` | Confirmar reporte de interrupciones, actividades y archivo plano para empresa aliada brasileña. |
| HU-11 | RF-011 | Ejecutar actividades del proyecto | Actividades / Desarrollador | Parcial | `ActividadesPage`, `ActividadDetallePage`, `ActividadService` | Falta validar flujo exacto de ejecucion por desarrollador y restricciones backend. |
| HU-12 | RF-012 | Registrar errores en el proyecto | Errores | Implementado / Por validar | `RegistroErroresPage`, `RegistroErrorNuevoPage`, `RegistroErrorEditarPage`, `RegistroErrorController`, `RegistroErrorService` | Validar permisos, tipos de error, etapa/fase y estados. |
| HU-13 | RF-013 | Registrar interrupciones del proyecto | Interrupciones | Implementado / Por validar | `InterrupcionesPage`, `RegistroInterrupcionNuevoPage`, `RegistroInterrupcionEditarPage`, `InterrupcionController`, `InterrupcionService` | Validar tipo, duracion, fecha, etapa/fase y permisos. |
| HU-14 | RF-014 | Gestionar mensajes de contacto | Mensajes | Parcial | `MensajesPage`, `MensajeDetallePage`, `MensajeContactoController`, `MensajeContactoService` | Existe bandeja, detalle y respuesta guardada. Falta confirmar envio real de correo, estado `Leido`, responsable y manejo de fallos. |

## Desalineaciones detectadas

- HU-14/RF-014 pide responder por correo desde el sistema. El codigo actual registra respuesta y marca `Atendido`, pero no se observo integracion de envio real de correo.
- HU-14 incluye estado `Leido`; backend tiene endpoint `/leer`, pero la vista de mensajes no lo usa claramente al abrir el detalle.
- HU-04 menciona servicios internos como correo corporativo, chat, biblioteca y tutoriales. En la app actual parecen no estar como modulos completos.
- RF-007 menciona asignacion de desarrolladores a proyectos. Existe entidad/controlador de asignacion, pero debe validarse el flujo completo en UI.
- Varias reglas de rol existen en frontend, pero falta reforzarlas en backend.
- La API expone entidades JPA directamente en varios controladores; esto puede desalinearse con documentacion profesional esperada.

## Proxima actualizacion sugerida

1. Confirmar cada estado ejecutando el flujo funcional en la app.
2. Agregar columna de evidencia visual cuando existan capturas.
3. Agregar columna de endpoints backend por HU.
4. Convertir pendientes importantes en tareas del `TODO FINAL Ikernell sena.md`.
