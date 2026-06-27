# Matriz de roles y permisos

Esta matriz resume el comportamiento esperado por rol segun la documentacion del proyecto y el estado actual del aplicativo. Debe revisarse cuando se implemente seguridad real en backend.

## Roles

| Rol | Tipo de acceso | Descripcion |
| --- | --- | --- |
| Visitante | Publico / anonimo | Consulta informacion publica y envia mensajes de contacto. |
| Coordinador | Autenticado | Gestiona usuarios, mensajes, catalogos e informes generales. |
| Lider | Autenticado | Gestiona proyectos, etapas, actividades y reportes del proyecto. |
| Desarrollador | Autenticado | Consulta actividades asignadas y registra errores/interrupciones. |

## Permisos esperados

| Modulo / Accion | Visitante | Coordinador | Lider | Desarrollador | Estado actual |
| --- | --- | --- | --- | --- | --- |
| Ver portal publico | Si | Si | Si | Si | Implementado |
| Enviar mensaje de contacto | Si | Si | Si | Si | Implementado |
| Iniciar sesion | No aplica | Si | Si | Si | Parcial: login simple sin token/sesion |
| Ver dashboard | No | Si | Si | Si | Implementado en frontend |
| Gestionar usuarios | No | Si | No | No | Implementado en frontend; falta seguridad backend real |
| Crear usuario Coordinador | No | No | No | No | Bloqueado en frontend y backend |
| Inhabilitar Coordinador | No | No | No | No | Bloqueado en backend |
| Ver mensajes de contacto | No | Si | No | No | Implementado en frontend; falta seguridad backend real |
| Atender mensajes | No | Si | No | No | Parcial: guarda respuesta, falta definir correo real |
| Gestionar proyectos | No | Puede consultar | Si | Puede consultar asignados | Parcial: validar permisos exactos |
| Gestionar etapas | No | Puede consultar | Si | Puede consultar | Por validar |
| Gestionar actividades | No | Puede consultar | Si | Ejecuta asignadas | Parcial: validar restricciones reales |
| Registrar errores | No | Puede consultar | Puede consultar | Si | Implementado / por validar |
| Registrar interrupciones | No | Puede consultar | Puede consultar | Si | Implementado / por validar |
| Gestionar tipos de error | No | Si | No | No | Implementado en frontend; falta seguridad backend real |
| Gestionar tipos de interrupcion | No | Si | No | No | Implementado en frontend; falta seguridad backend real |
| Generar informes | No | Si | Si, segun proyecto | No | Parcial: validar alcance documental |

## Pendientes para seguridad real

- Definir mecanismo de autenticacion: token, sesion o alcance academico documentado.
- Proteger endpoints desde backend, no solo rutas del frontend.
- Evitar que usuarios sin permisos llamen endpoints directamente.
- Crear pruebas para permisos criticos.
- Documentar limitaciones si no se implementa seguridad completa.
