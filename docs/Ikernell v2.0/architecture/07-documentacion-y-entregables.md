# IKernell v2 — Documentación y Entregables

> Documento que define la estrategia de mantenimiento, actualización y trazabilidad de todos los artefactos documentales del proyecto IKernell durante el proceso de evolución hacia la versión 2.

---

# 1. Objetivo

El propósito de este documento consiste en garantizar que toda modificación realizada sobre el sistema quede reflejada en la documentación correspondiente.

La documentación deberá evolucionar junto con el software, manteniendo consistencia entre el modelo del negocio, la implementación técnica y los entregables académicos.

La documentación será considerada parte integral del proyecto y no una actividad posterior al desarrollo.

---

# 2. Principios

Toda actualización documental deberá cumplir los siguientes principios.

## Consistencia

Todos los documentos deberán describir la misma versión del sistema.

No deberán existir contradicciones entre la documentación y la implementación.

---

## Trazabilidad

Cada cambio realizado en el software deberá poder rastrearse hasta los documentos afectados.

---

## Actualización Continua

La documentación deberá actualizarse durante el desarrollo y no únicamente al finalizar el proyecto.

---

## Claridad

Toda modificación deberá quedar suficientemente documentada para facilitar futuras revisiones y mantenimiento.

---

# 3. Artefactos del Proyecto

Los siguientes documentos hacen parte oficial de IKernell.

## Análisis

- Caso de estudio
- Documento de requerimientos
- Historias de Usuario
- Casos de Uso
- Diagrama de Casos de Uso

---

## Diseño

- Diagrama Entidad Relación (DER)
- Modelo Relacional
- Diccionario de Datos
- Diagrama de Clases
- Arquitectura del Sistema
- Design System

---

## Desarrollo

- Arquitectura Frontend
- Arquitectura Backend
- Arquitectura del Dominio
- Estándares del Proyecto

---

## Gestión

- Product Backlog
- Roadmap
- Checklist
- Observaciones
- Architecture Decision Records (ADR)

---

## Entregables

- Manual Técnico
- Manual de Usuario
- Scripts SQL
- Repositorio Git

---

# 4. Matriz de Trazabilidad

Toda modificación deberá analizar qué documentos requieren actualización.

| Cambio realizado | Documentos afectados |
|------------------|----------------------|
| Nueva entidad | DER, Diccionario de Datos, Script SQL, Backend, HU, Casos de Uso |
| Nuevo atributo | DER, Diccionario de Datos, Backend, Frontend |
| Nueva funcionalidad | HU, RF, Casos de Uso, Manual de Usuario |
| Cambio de interfaz | Design System, Manual de Usuario |
| Cambio de reglas de negocio | RF, RNF, Casos de Uso, Arquitectura del Dominio |
| Cambio de API | Backend, Manual Técnico |
| Nuevo módulo | Roadmap, Backlog, Arquitectura, Manual Técnico |

---

# 5. Historias de Usuario

Durante el overhaul las Historias de Usuario serán revisadas completamente.

Se buscará mejorar:

- Descripción funcional.
- Criterios de aceptación.
- Reglas de negocio.
- Casos alternativos.
- Dependencias.
- Priorización.
- Tareas técnicas.

Como objetivo mínimo, cada historia deberá contener un nivel de detalle suficiente para permitir su implementación sin ambigüedades.

---

# 6. Requerimientos Funcionales

Los Requerimientos Funcionales deberán mantenerse alineados con la versión final del sistema.

Cada requerimiento deberá representar una capacidad observable del sistema.

No deberán utilizarse para describir detalles de implementación.

---

# 7. Requerimientos No Funcionales

Los RNF serán revisados para reflejar mejoras relacionadas con:

- Arquitectura.
- Seguridad.
- Escalabilidad.
- Usabilidad.
- Mantenibilidad.
- Rendimiento.

---

# 8. Casos de Uso

Los Casos de Uso deberán actualizarse cuando cambien:

- Actores.
- Flujos principales.
- Flujos alternativos.
- Reglas de negocio.
- Responsabilidades.

---

# 9. Diagrama Entidad Relación

Toda modificación estructural sobre la base de datos deberá reflejarse inmediatamente en el DER.

El DER será considerado la representación oficial del modelo relacional.

---

# 10. Diccionario de Datos

Cada entidad deberá documentarse completamente.

Como mínimo:

- Nombre.
- Descripción.
- Atributos.
- Tipo de dato.
- Restricciones.
- Relaciones.
- Reglas especiales.

---

# 11. Manual Técnico

El Manual Técnico deberá evolucionar junto con la arquitectura.

Como mínimo documentará:

- Tecnologías.
- Arquitectura.
- Instalación.
- Configuración.
- Base de Datos.
- API REST.
- Estructura del proyecto.

---

# 12. Manual de Usuario

El Manual de Usuario deberá representar la versión final de la interfaz.

Toda modificación importante del frontend deberá reflejarse mediante:

- Capturas.
- Descripción.
- Flujo de uso.
- Recomendaciones.

---

# 13. Scripts SQL

Toda modificación realizada sobre el modelo de datos deberá mantenerse sincronizada con los scripts oficiales del proyecto.

No deberán existir diferencias entre la estructura documentada y la estructura implementada.

---

# 14. Versionado

Toda actualización documental deberá indicar como mínimo:

- Versión.
- Fecha.
- Autor.
- Descripción del cambio.

Cuando sea posible, deberá relacionarse con el commit correspondiente.

---

# 15. Definition of Done Documental

Una funcionalidad solo podrá considerarse completamente terminada cuando:

- Su implementación funcione correctamente.
- Se actualicen los documentos afectados.
- Se actualice el backlog.
- Se actualice el roadmap cuando corresponda.
- Se actualice el checklist.
- Se documenten las decisiones arquitectónicas si aplica.

---

# 16. Estado del Documento

Este documento permanecerá activo durante todo el ciclo de vida del proyecto.

Toda modificación relevante deberá analizar su impacto documental antes de considerarse finalizada.

---

**Versión:** 2.0

**Estado:** En elaboración
