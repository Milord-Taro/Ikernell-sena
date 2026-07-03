# IKernell v2 — Overhaul Master Plan

> Arquitectura, planificación y evolución de la segunda versión del proyecto IKernell Soluciones Software.

---

# Introducción

Este directorio reúne toda la documentación de arquitectura correspondiente al proceso de evolución de **IKernell Soluciones Software** hacia su versión **2.0**.

A diferencia de la primera iteración del proyecto, cuyo objetivo principal fue cumplir los requerimientos funcionales establecidos en el caso de estudio del SENA, esta segunda versión busca consolidar una solución más robusta desde la perspectiva de ingeniería de software.

El propósito del overhaul no consiste únicamente en corregir observaciones o realizar mejoras puntuales, sino en revisar integralmente la arquitectura del sistema para incrementar su mantenibilidad, escalabilidad, consistencia visual y fidelidad respecto al dominio del negocio.

---

# Objetivos del Overhaul

La versión 2 de IKernell tiene como objetivos principales:

- Mejorar la representación del dominio del negocio.
- Estandarizar completamente la interfaz gráfica.
- Consolidar un Design System reutilizable.
- Mejorar la arquitectura del frontend y backend.
- Revisar y fortalecer el modelo de datos.
- Incorporar funcionalidades de valor agregado.
- Actualizar toda la documentación técnica del proyecto.
- Preparar el proyecto para futuras extensiones sin necesidad de rediseñar su arquitectura.

---

# Filosofía del proyecto

Todas las decisiones tomadas durante este overhaul deberán responder al menos a uno de los siguientes principios:

- Representar correctamente el dominio del negocio.
- Favorecer la reutilización de componentes.
- Reducir la complejidad técnica.
- Mejorar la experiencia de usuario.
- Facilitar el mantenimiento futuro.
- Mantener consistencia en toda la aplicación.

Las decisiones no se tomarán únicamente porque sean técnicamente posibles, sino porque aportan valor real al sistema.

---

# Alcance

Este proceso de overhaul contempla la revisión de todos los componentes del proyecto.

## Frontend

- Arquitectura React.
- Organización de componentes.
- Sistema de diseño.
- Layouts.
- Navegación.
- Experiencia de usuario.
- Componentes reutilizables.
- Formularios.
- Tablas.
- Dashboards.

## Backend

- Arquitectura Spring Boot.
- Servicios.
- DTOs.
- Validaciones.
- Manejo de excepciones.
- Organización del código.
- API REST.

## Base de Datos

- Modelo relacional.
- Relaciones entre entidades.
- Normalización.
- Restricciones.
- Nuevas entidades.
- Integridad de datos.

## Documentación

- Historias de Usuario.
- Requerimientos Funcionales.
- Requerimientos No Funcionales.
- Casos de Uso.
- Diagramas.
- Diccionario de Datos.
- Manual Técnico.
- Manual de Usuario.

---

# Estructura documental

La documentación se encuentra organizada por áreas de responsabilidad.

| Documento | Propósito |
|-----------|-----------|
| 00 - Visión y Objetivos | Define la visión general del proyecto y los objetivos del overhaul. |
| 01 - Estándares del Proyecto | Convenciones técnicas y reglas de desarrollo. |
| 02 - Análisis del Dominio | Revisión del modelo de negocio y propuestas de mejora. |
| 03 - Diseño y Design System | Identidad visual y sistema de componentes. |
| 04 - Arquitectura Frontend | Organización técnica del cliente React. |
| 05 - Arquitectura Backend | Organización técnica del backend Spring Boot. |
| 06 - Base de Datos | Evolución del modelo relacional. |
| 07 - Funcionalidades de Valor Agregado | Funcionalidades que exceden el caso de estudio original. |
| 08 - Documentación y Entregables | Impacto sobre la documentación oficial. |
| 09 - Roadmap | Plan de ejecución del overhaul. |
| Backlog | Lista general de tareas pendientes. |
| Decisiones de Arquitectura | Registro de decisiones técnicas (ADR). |
| Observaciones del Profesor | Seguimiento a las observaciones recibidas. |
| Checklist Overhaul | Seguimiento general del proyecto. |

---

# Estado del proyecto

Actualmente el proyecto dispone de una primera versión completamente funcional que implementa la mayor parte de los requerimientos definidos para el caso de estudio.

No obstante, durante la revisión técnica se identificaron oportunidades de mejora relacionadas con:

- Arquitectura.
- Experiencia de usuario.
- Consistencia visual.
- Representación del dominio.
- Calidad documental.
- Funcionalidades complementarias.

Estas oportunidades constituyen la base del presente proceso de evolución.

---

# Metodología

El overhaul se desarrollará de manera incremental.

Cada modificación deberá cumplir el siguiente ciclo:

1. Análisis.
2. Diseño.
3. Implementación.
4. Validación.
5. Documentación.

Ningún cambio importante será implementado sin una justificación previa.

---

# Resultado esperado

Al finalizar este proceso IKernell deberá representar una segunda versión significativamente más madura desde el punto de vista de ingeniería de software.

El objetivo no es únicamente cumplir el caso de estudio, sino construir una solución cuya arquitectura permita evolucionar el sistema de manera ordenada, mantenible y consistente.

---

**Versión del documento:** 2.0

**Estado:** En elaboración

**Autor:** Efraín Manotas

**Proyecto:** IKernell Soluciones Software
