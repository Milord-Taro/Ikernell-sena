# IKernell v2 — Visión y Objetivos

> Documento de visión arquitectónica del proceso de evolución de IKernell Soluciones Software.

---

# 1. Introducción

La primera versión de IKernell tuvo como objetivo principal desarrollar una solución funcional que respondiera a los requerimientos establecidos por el caso de estudio del SENA.

Durante su construcción se implementó una arquitectura basada en Spring Boot, PostgreSQL y React, incorporando mecanismos de autenticación, control de acceso por roles, gestión de proyectos, actividades, errores, interrupciones y demás funcionalidades solicitadas.

Aunque el resultado obtenido cumple gran parte de los requerimientos funcionales planteados inicialmente, el proceso de revisión permitió identificar oportunidades de mejora relacionadas con la representación del dominio, la arquitectura del software, la experiencia de usuario, la consistencia visual y la calidad de la documentación.

El propósito de IKernell v2 consiste en transformar la primera iteración en una solución más madura desde el punto de vista técnico, sin perder compatibilidad con el alcance original del caso de estudio.

---

# 2. Visión

IKernell v2 busca convertirse en una plataforma cuya arquitectura permita evolucionar el sistema de manera sostenible, priorizando la claridad del dominio, la reutilización de componentes, la consistencia de la interfaz y la mantenibilidad del código.

El objetivo no consiste únicamente en implementar funcionalidades, sino en construir un producto cuya estructura facilite futuras ampliaciones sin requerir rediseños importantes.

---

# 3. Objetivos Estratégicos

El proceso de overhaul estará orientado a alcanzar los siguientes objetivos:

## OE-01

Representar de forma más precisa el dominio del negocio descrito por el caso de estudio.

---

## OE-02

Incrementar la reutilización del código mediante una arquitectura basada en componentes reutilizables.

---

## OE-03

Unificar completamente la experiencia visual del sistema mediante un Design System propio.

---

## OE-04

Reducir la complejidad técnica del proyecto mediante estándares comunes de desarrollo.

---

## OE-05

Incorporar funcionalidades que aporten valor real al sistema más allá de los requerimientos mínimos del caso de estudio.

---

## OE-06

Actualizar toda la documentación para mantener consistencia entre el software implementado y los documentos entregables.

---

# 4. Objetivos Técnicos

Durante el overhaul se buscará mejorar los siguientes aspectos técnicos.

## Frontend

- Arquitectura basada en componentes reutilizables.
- Reducción de duplicidad visual.
- Mejor organización del código.
- Consistencia en navegación.
- Mejor experiencia de usuario.
- Componentes desacoplados.
- Mejor soporte para futuras funcionalidades.

---

## Backend

- Servicios más consistentes.
- Validaciones homogéneas.
- Organización uniforme.
- Mejor separación de responsabilidades.
- Mejor representación del dominio.

---

## Base de Datos

- Revisión completa del modelo relacional.
- Validación de la normalización.
- Incorporación de nuevas entidades cuando representen valor para el dominio.
- Eliminación de redundancias.

---

## Documentación

- Mayor trazabilidad.
- Mejor nivel de detalle.
- Consistencia entre documentación y código.
- Actualización de todos los artefactos afectados por el overhaul.

---

# 5. Principios Arquitectónicos

Todas las decisiones tomadas durante esta segunda versión deberán respetar los siguientes principios.

## 5.1 Fidelidad al dominio

La arquitectura deberá representar correctamente el funcionamiento de IKernell como organización.

No se introducirán cambios únicamente por criterios técnicos si estos alteran innecesariamente el modelo del negocio.

---

## 5.2 Consistencia

Todo elemento equivalente deberá comportarse de la misma manera.

Esto incluye:

- botones
- formularios
- tablas
- navegación
- componentes
- validaciones
- respuestas del backend

---

## 5.3 Reutilización

Siempre que sea posible se favorecerá la creación de componentes reutilizables frente a implementaciones específicas.

---

## 5.4 Escalabilidad

Toda modificación deberá facilitar la incorporación de nuevas funcionalidades sin requerir cambios importantes en la arquitectura existente.

---

## 5.5 Simplicidad

Las soluciones deberán mantener el menor nivel de complejidad posible sin sacrificar flexibilidad.

---

## 5.6 Trazabilidad

Toda decisión importante deberá quedar documentada para facilitar el mantenimiento futuro del proyecto.

---

# 6. Alcance

El overhaul contempla la revisión de los siguientes aspectos:

- Modelo de dominio.
- Modelo relacional.
- Backend.
- Frontend.
- Diseño visual.
- Componentes reutilizables.
- Documentación.
- Funcionalidades adicionales.

---

# 7. Exclusiones

El overhaul no contempla modificar tecnologías principales utilizadas por el proyecto.

Se conservarán como base tecnológica:

- React
- TypeScript
- Spring Boot
- PostgreSQL
- Tailwind CSS
- Shadcn/UI

Las mejoras estarán orientadas principalmente a la arquitectura, organización y evolución funcional del sistema.

---

# 8. Criterios de éxito

El overhaul será considerado exitoso cuando:

- El dominio represente correctamente el negocio.
- Exista un Design System consistente.
- El frontend utilice componentes reutilizables.
- La arquitectura backend sea uniforme.
- El modelo de datos refleje correctamente las reglas del negocio.
- Las funcionalidades de valor agregado se integren naturalmente con el sistema.
- Toda la documentación esté sincronizada con la implementación final.

---

# 9. Filosofía de desarrollo

Durante este proceso se priorizará la calidad sobre la velocidad de implementación.

Cada modificación deberá justificarse desde tres perspectivas:

- Valor para el negocio.
- Valor técnico.
- Valor para el usuario.

El objetivo final no consiste únicamente en finalizar el proyecto, sino en construir una solución cuya arquitectura refleje buenas prácticas de ingeniería de software.

---

**Versión:** 2.0

**Estado:** En elaboración
