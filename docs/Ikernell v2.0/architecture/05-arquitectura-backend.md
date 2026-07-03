# IKernell v2 — Arquitectura Backend

> Documento que define la arquitectura objetivo del backend de IKernell Soluciones Software, estableciendo responsabilidades, organización del código, convenciones y principios que regirán el desarrollo de todos los módulos del sistema.

---

# 1. Objetivo

El backend de IKernell tiene como propósito implementar la lógica de negocio del sistema de manera desacoplada, mantenible y escalable.

La arquitectura deberá permitir incorporar nuevas funcionalidades sin afectar significativamente los módulos existentes, garantizando una clara separación de responsabilidades entre acceso a datos, lógica de negocio y exposición de servicios REST.

---

# 2. Arquitectura General

El backend seguirá una arquitectura por capas.

```

Cliente

↓

Controller

↓

Service

↓

Repository

↓

Base de Datos

```

Cada capa tendrá responsabilidades claramente definidas.

---

# 3. Principios Arquitectónicos

Toda modificación deberá respetar los siguientes principios.

## Responsabilidad Única

Cada clase tendrá una única responsabilidad.

---

## Bajo Acoplamiento

Las dependencias entre módulos deberán mantenerse al mínimo.

---

## Alta Cohesión

Las clases relacionadas deberán agruparse dentro del mismo módulo.

---

## Escalabilidad

El diseño deberá facilitar la incorporación de nuevas funcionalidades.

---

## Trazabilidad

Toda operación importante deberá poder reconstruirse posteriormente mediante mecanismos de auditoría.

---

# 4. Organización del Proyecto

La estructura objetivo será la siguiente.

```
config/

controller/

dto/

entity/

exception/

mapper/

repository/

security/

service/

validation/

audit/

notification/

timeline/

util/
```

No todos los paquetes existirán desde la primera iteración, pero representan la arquitectura objetivo.

---

# 5. Controller

Los Controllers representan la capa de exposición de la API.

Su responsabilidad será únicamente:

- recibir solicitudes
- validar parámetros básicos
- delegar al Service
- devolver respuestas HTTP

No deberán contener lógica de negocio.

---

# 6. Service

Toda regla del negocio deberá implementarse dentro de los Services.

Ejemplos.

- registrar proyecto
- asignar usuario
- finalizar actividad
- registrar interrupción
- registrar error

Los Services representan el corazón funcional del sistema.

---

# 7. Repository

Los Repository tendrán una única responsabilidad.

Acceder a la base de datos.

No deberán implementar lógica del negocio.

---

# 8. DTO

Toda comunicación entre API y cliente deberá realizarse mediante DTO.

Se evitará exponer directamente las entidades del dominio.

Se distinguirán claramente:

- Request DTO
- Response DTO

---

# 9. Mapper

Los Mapper serán responsables exclusivamente de transformar:

Entidad ↔ DTO

No deberán contener lógica del negocio.

---

# 10. Validaciones

Las validaciones deberán dividirse en dos niveles.

## Validaciones técnicas

- campos requeridos
- formatos
- tamaños
- tipos

---

## Validaciones de negocio

- reglas del dominio
- estados válidos
- permisos
- relaciones

Las primeras podrán implementarse mediante Bean Validation.

Las segundas pertenecerán al Service.

---

# 11. Manejo de Excepciones

Toda excepción deberá centralizarse.

Se evitará utilizar RuntimeException genéricas.

Las excepciones representarán situaciones específicas del negocio.

Ejemplo.

```
ProyectoNoEncontradoException

ActividadFinalizadaException

UsuarioSinPermisosException
```

---

# 12. API REST

Todos los endpoints deberán seguir convenciones REST.

Ejemplo.

```
GET

POST

PUT

PATCH

DELETE
```

Los recursos deberán representarse mediante sustantivos.

```
/usuarios

/proyectos

/actividades

/errores
```

---

# 13. Respuestas HTTP

Las respuestas deberán ser consistentes.

Ejemplo.

```
200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

500 Internal Server Error
```

---

# 14. Seguridad

La autenticación permanecerá basada en JWT.

El backend será responsable de:

- autenticar
- autorizar
- proteger endpoints
- validar permisos

La lógica del negocio nunca deberá depender del frontend.

---

# 15. Auditoría

Se plantea incorporar un módulo de auditoría encargado de registrar automáticamente todas las operaciones relevantes realizadas por los usuarios.

Ejemplos.

- creación
- modificación
- eliminación
- cambio de estado
- asignaciones

Este módulo será transversal y no dependerá de un único controlador.

---

# 16. Timeline

Las operaciones relevantes podrán alimentar un historial cronológico asociado a proyectos, actividades y demás entidades principales.

El Timeline permitirá reconstruir la evolución del sistema desde la perspectiva del negocio.

---

# 17. Notificaciones

Las notificaciones serán consideradas un servicio independiente.

No deberán implementarse directamente dentro de los Controllers.

El backend será responsable de generar eventos; el mecanismo de entrega podrá evolucionar en futuras versiones.

---

# 18. Transacciones

Toda operación que modifique múltiples entidades deberá ejecutarse dentro de una transacción.

Esto garantizará la consistencia del modelo de datos.

---

# 19. Registro de Eventos

El backend deberá ser capaz de registrar eventos importantes del dominio.

Ejemplos.

- Proyecto creado.
- Usuario asignado.
- Actividad iniciada.
- Error registrado.
- Interrupción finalizada.

Estos eventos podrán ser utilizados posteriormente por la Auditoría y el Timeline.

---

# 20. Escalabilidad

Toda nueva funcionalidad deberá integrarse siguiendo la arquitectura existente.

No se permitirá incorporar lógica directamente en Controllers ni duplicar reglas de negocio entre distintos Services.

---

# 21. Estado Objetivo

Al finalizar el overhaul el backend deberá representar una arquitectura limpia, desacoplada y fácilmente extensible, donde cada capa tenga responsabilidades claramente definidas y donde las funcionalidades transversales (auditoría, timeline y notificaciones) puedan incorporarse sin afectar significativamente el resto del sistema.

---

## Decisiones pendientes

Durante el overhaul deberán resolverse, entre otras, las siguientes decisiones arquitectónicas:

- Modelo definitivo de auditoría.
- Estrategia para el Timeline.
- Gestión de eventos del dominio.
- Revisión de relaciones entre Usuario, Rol y Proyecto.
- Estandarización completa de DTO y respuestas HTTP.

---

**Versión:** 2.0

**Estado:** En elaboración
