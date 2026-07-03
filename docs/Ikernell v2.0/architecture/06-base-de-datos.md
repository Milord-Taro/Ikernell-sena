# IKernell v2 — Arquitectura de Base de Datos

> Documento que define la arquitectura del modelo de datos de IKernell, los principios utilizados para su diseño y las decisiones tomadas durante el proceso de evolución del sistema.

---

# 1. Objetivo

Este documento describe la arquitectura del modelo relacional utilizado por IKernell.

Su propósito consiste en establecer los principios que gobiernan el diseño de la base de datos, garantizando consistencia, integridad, escalabilidad y fidelidad respecto al dominio del negocio.

No pretende reemplazar el Diccionario de Datos ni el DER, sino documentar las decisiones de diseño que justifican la estructura del modelo.

---

# 2. Objetivos del Modelo

El modelo de datos deberá cumplir los siguientes objetivos.

- Representar correctamente el dominio del negocio.
- Evitar redundancia de información.
- Garantizar integridad referencial.
- Facilitar futuras ampliaciones.
- Mantener consistencia entre entidades.
- Permitir la trazabilidad de la información.

---

# 3. Principios de Diseño

Toda modificación sobre la base de datos deberá respetar los siguientes principios.

## Fidelidad al dominio

Cada entidad deberá representar un concepto real del negocio.

No se crearán tablas únicamente por razones técnicas.

---

## Normalización

Siempre que sea posible se evitará duplicar información.

Las relaciones deberán expresar correctamente la dependencia entre entidades.

---

## Integridad

Toda relación deberá proteger la consistencia del sistema mediante claves primarias, claves foráneas y restricciones apropiadas.

---

## Escalabilidad

El modelo deberá permitir incorporar nuevas funcionalidades sin rediseñar completamente la base de datos.

---

## Auditabilidad

Las operaciones importantes deberán poder reconstruirse posteriormente.

Este principio servirá como base para el módulo de Auditoría Global.

---

# 4. Organización del Modelo

El modelo se organiza conceptualmente en los siguientes módulos.

## Seguridad

- Usuario
- Rol

---

## Información Organizacional

- Profesión
- Especialidad

---

## Gestión de Proyectos

- Proyecto
- AsignaciónProyecto
- Etapa
- Actividad

---

## Seguimiento

- RegistroError
- TipoError

- Interrupción
- TipoInterrupción

---

## Portal Público

- MensajeContacto

---

## Futuras Extensiones

- Auditoría
- Timeline
- Notificaciones

---

# 5. Integridad Referencial

Todas las relaciones deberán implementarse mediante claves foráneas.

No se permitirá almacenar información redundante cuando pueda obtenerse mediante una relación.

---

# 6. Estados del Sistema

Siempre que sea posible, los estados deberán modelarse explícitamente.

Ejemplos.

- Estado del Proyecto.
- Estado de la Actividad.
- Estado del Error.
- Estado de la Interrupción.
- Estado del Mensaje.

Durante el overhaul se evaluará si dichos estados continúan representándose mediante valores simples o mediante entidades independientes.

---

# 7. Catálogos

Los datos parametrizables deberán almacenarse en entidades independientes.

Ejemplos.

- Roles.
- Profesiones.
- Especialidades.
- Tipos de Error.
- Tipos de Interrupción.

Estos catálogos deberán administrarse mediante el sistema y no mediante modificaciones directas a la base de datos.

---

# 8. Historial

El modelo actual registra únicamente el estado presente de las entidades.

Durante el overhaul se evaluará incorporar mecanismos que permitan conservar el historial de cambios importantes sin afectar el rendimiento del sistema.

---

# 9. Auditoría

Se plantea incorporar una entidad especializada encargada de registrar todas las operaciones relevantes realizadas por los usuarios.

Entre otras.

- Creación.
- Actualización.
- Eliminación.
- Cambios de estado.
- Asignaciones.

Esta funcionalidad será transversal a todo el sistema.

---

# 10. Timeline

Como evolución del modelo se evaluará almacenar eventos relevantes del negocio que permitan reconstruir cronológicamente la evolución de un proyecto.

El Timeline no reemplaza la Auditoría.

Ambos cumplen responsabilidades distintas.

---

# 11. Estrategia de Migración

Toda modificación del modelo deberá cumplir el siguiente proceso.

1. Análisis del dominio.
2. Actualización del DER.
3. Actualización del Diccionario de Datos.
4. Actualización del Script SQL.
5. Adaptación del Backend.
6. Adaptación del Frontend.
7. Actualización de la documentación.

---

# 12. Riesgos

Las modificaciones al modelo de datos pueden afectar directamente.

- Backend.
- Frontend.
- API REST.
- Historias de Usuario.
- Casos de Uso.
- Scripts de carga.
- Documentación.

Por esta razón, toda modificación deberá encontrarse previamente documentada y aprobada.

---

# 13. Evolución

El presente documento evolucionará junto con el dominio del negocio.

Las nuevas entidades solo serán incorporadas cuando representen valor funcional para el sistema.

---

# Estado del Documento

Versión: 2.0

Estado: En construcción
