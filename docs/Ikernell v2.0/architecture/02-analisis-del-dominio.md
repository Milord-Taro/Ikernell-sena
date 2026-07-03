# IKernell v2 — Análisis del Dominio

> Documento de análisis del modelo de negocio y su representación dentro del sistema IKernell.

---

# 1. Objetivo

El propósito de este documento es evaluar si la implementación actual representa adecuadamente el dominio descrito en el caso de estudio.

El análisis no se limita a revisar la estructura de la base de datos, sino que busca validar que las entidades, relaciones y reglas del negocio reflejen correctamente el funcionamiento de la empresa IKernell Soluciones Software.

Todas las modificaciones propuestas deberán justificarse desde la perspectiva del negocio antes que desde criterios exclusivamente técnicos.

---

# 2. Alcance

Este análisis comprende:

- Modelo conceptual.
- Modelo relacional.
- Entidades.
- Relaciones.
- Reglas del negocio.
- Responsabilidades.
- Ciclo de vida de la información.
- Posibles oportunidades de mejora.

No contempla aspectos visuales ni decisiones de implementación específicas del frontend.

---

# 3. Principios del análisis

Toda propuesta deberá cumplir al menos uno de los siguientes principios.

## Representación del negocio

Las entidades deberán representar conceptos reales del dominio.

---

## Responsabilidad única

Cada entidad deberá representar una única responsabilidad claramente definida.

---

## Evitar redundancia

No deberán existir datos duplicados cuando puedan obtenerse mediante relaciones.

---

## Escalabilidad

El modelo deberá permitir incorporar nuevas funcionalidades sin afectar su estructura principal.

---

## Coherencia

Las relaciones entre entidades deberán reflejar relaciones existentes dentro del negocio.

---

# 4. Estado actual

Actualmente el sistema implementa las siguientes entidades principales.

## Seguridad

- Usuario
- Rol

---

## Información profesional

- Profesión
- Especialidad

---

## Gestión de proyectos

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

# 5. Análisis por entidad

Cada entidad será revisada individualmente.

Para cada una se documentará:

- Responsabilidad.
- Estado actual.
- Problemas detectados.
- Oportunidades de mejora.
- Cambios propuestos.
- Impacto.

---

# 6. Usuario

## Responsabilidad

Representa a cualquier trabajador registrado dentro del sistema.

Dependiendo de su rol podrá acceder a diferentes funcionalidades.

---

## Estado actual

Actualmente almacena información personal, profesional y de autenticación.

Se relaciona con:

- Rol.
- Profesión.
- Especialidad.
- Proyectos.
- Actividades.

---

## Aspectos positivos

- Buena separación respecto a profesión y especialidad.
- Centraliza la autenticación.
- Representa correctamente a los trabajadores.

---

## Aspectos a revisar

- Modelo de roles.
- Estado del usuario.
- Auditoría de cambios.
- Historial de modificaciones.

---

## Posibles mejoras

Pendiente de análisis.

---

# 7. Rol

## Responsabilidad

Determinar el tipo de trabajador y las funcionalidades disponibles dentro del sistema.

---

## Estado actual

Cada usuario posee un único rol.

---

## Aspectos positivos

Modelo simple.

Fácil de comprender.

---

## Aspectos a revisar

El caso de estudio indica que un líder puede desempeñar funciones de desarrollador en otro proyecto.

Antes de modificar la relación Usuario-Rol será necesario determinar si el comportamiento corresponde realmente a múltiples roles o a distintos roles desempeñados dentro de proyectos diferentes.

Esta decisión quedará registrada como ADR.

---

# 8. Proyecto

Pendiente de análisis detallado.

Aspectos previstos:

- Ciclo de vida.
- Estado.
- Avance.
- Indicadores.
- Métricas.

---

# 9. AsignaciónProyecto

Pendiente de revisión.

Especial atención a:

- Responsabilidades.
- Información adicional que debería almacenar.
- Posible incorporación del concepto "Rol dentro del proyecto".

---

# 10. Etapa

Pendiente de análisis.

---

# 11. Actividad

Pendiente de análisis.

Aspectos previstos:

- Estados.
- Flujo de trabajo.
- Prioridad.
- Fechas.
- Seguimiento.

---

# 12. RegistroError

Pendiente de análisis.

Aspectos previstos:

- Severidad.
- Estado.
- Responsable.
- Resolución.

---

# 13. Interrupción

Pendiente de análisis.

Aspectos previstos:

- Impacto.
- Duración.
- Estado.

---

# 14. Profesión

Pendiente de análisis.

Se revisará la necesidad de gestión completa mediante CRUD.

---

# 15. Especialidad

Pendiente de análisis.

Se revisará la necesidad de gestión completa mediante CRUD.

---

# 16. Mensaje de Contacto

Pendiente de análisis.

Se revisará:

- Flujo completo.
- Estados.
- Seguimiento.
- Historial.

---

# 17. Nuevas entidades candidatas

Actualmente se consideran candidatas las siguientes entidades.

## Auditoría

Registrar todas las modificaciones importantes realizadas dentro del sistema.

Estado:

En evaluación.

---

## Timeline

Representar cronológicamente la evolución de un proyecto.

Estado:

En evaluación.

---

## Notificaciones

Centralizar eventos importantes para los usuarios.

Estado:

En evaluación.

---

# 18. Decisiones pendientes

Las siguientes decisiones deberán resolverse durante el proceso de overhaul.

- Modelo de roles.
- Modelo de auditoría.
- Modelo de trazabilidad.
- Estados de actividades.
- Estados de proyectos.
- Estados de errores.
- Estados de interrupciones.

---

# 19. Riesgos

Toda modificación sobre el modelo de dominio puede impactar:

- Base de datos.
- Backend.
- Frontend.
- Historias de Usuario.
- Casos de Uso.
- Requerimientos.
- Diagramas.

Por esta razón, cualquier cambio deberá realizarse de manera planificada y documentada.

---

# 20. Estado del documento

Este documento permanecerá abierto durante todo el proceso de overhaul.

Cada decisión de arquitectura aprobada deberá reflejarse aquí antes de su implementación.

---

**Versión:** 2.0

**Estado:** En construcción
