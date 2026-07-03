# IKernell v2 — Funcionalidades de Valor Agregado

> Documento que define las funcionalidades incorporadas durante el proceso de evolución de IKernell que exceden los requerimientos funcionales establecidos originalmente por el caso de estudio.

---

# 1. Objetivo

El propósito de este documento consiste en documentar todas aquellas funcionalidades que representan una evolución del sistema más allá del alcance mínimo solicitado por el caso de estudio.

Cada funcionalidad deberá responder a una necesidad identificada durante el análisis del dominio y aportar valor real tanto para los usuarios como para la administración del sistema.

Las funcionalidades aquí descritas deberán integrarse de forma natural con el resto de la arquitectura, evitando implementaciones aisladas o únicamente demostrativas.

---

# 2. Criterios de Selección

Toda funcionalidad de valor agregado deberá cumplir al menos uno de los siguientes criterios.

- Mejorar la trazabilidad del sistema.
- Facilitar la administración.
- Incrementar la productividad de los usuarios.
- Mejorar la toma de decisiones.
- Representar mejor el dominio del negocio.
- Incrementar la escalabilidad del sistema.

No se implementarán funcionalidades únicamente por aumentar el número de características del proyecto.

---

# 3. Funcionalidades Propuestas

Actualmente se consideran candidatas las siguientes funcionalidades.

---

# 3.1 Auditoría Global del Sistema

## Descripción

Incorporar un mecanismo centralizado capaz de registrar todas las operaciones relevantes realizadas por los usuarios sobre la información del sistema.

La auditoría permitirá conocer quién realizó una acción, cuándo ocurrió, sobre qué entidad se ejecutó y cuál fue el cambio realizado.

---

## Objetivo

Incrementar la trazabilidad del sistema.

Facilitar procesos de seguimiento.

Apoyar futuras tareas de mantenimiento.

---

## Información registrada

La auditoría podrá almacenar información como:

- Usuario responsable.
- Fecha y hora.
- Tipo de operación.
- Entidad afectada.
- Identificador del registro.
- Estado anterior.
- Estado nuevo.
- Observaciones (cuando aplique).

---

## Ejemplos

- Usuario creado.
- Proyecto actualizado.
- Actividad asignada.
- Error corregido.
- Interrupción finalizada.
- Rol modificado.

---

## Beneficios

- Historial completo del sistema.
- Mayor transparencia.
- Mejor capacidad de diagnóstico.
- Base para futuras funcionalidades.

---

## Impacto esperado

Base de datos.

Backend.

Frontend.

Documentación.

---

# 3.2 Timeline del Proyecto

## Descripción

Cada proyecto contará con una línea de tiempo que represente cronológicamente los eventos más importantes ocurridos durante su ejecución.

La información será presentada de forma visual para facilitar el seguimiento del proyecto.

---

## Objetivo

Permitir reconstruir fácilmente la historia de un proyecto.

---

## Eventos candidatos

- Proyecto creado.
- Usuario asignado.
- Etapa creada.
- Actividad creada.
- Actividad iniciada.
- Error registrado.
- Error solucionado.
- Interrupción registrada.
- Proyecto finalizado.

---

## Beneficios

- Mejor comprensión del proyecto.
- Seguimiento cronológico.
- Facilita reuniones de revisión.
- Mejora la experiencia del usuario.

---

## Dependencia

La implementación podrá apoyarse parcialmente en el módulo de Auditoría.

---

# 3.3 Centro de Control

## Descripción

Construcción de un Dashboard Ejecutivo inspirado en el Design System definido para IKernell.

El objetivo será ofrecer una vista consolidada del estado general del sistema.

---

## Indicadores candidatos

- Usuarios activos.
- Proyectos activos.
- Actividades pendientes.
- Actividades finalizadas.
- Errores abiertos.
- Interrupciones registradas.
- Tiempo promedio de resolución.
- Avance promedio de proyectos.

---

## Beneficios

- Mayor capacidad de supervisión.
- Información ejecutiva.
- Toma de decisiones basada en indicadores.

---

## Impacto

Principalmente Frontend.

---

# 3.4 Sistema de Notificaciones (En evaluación)

## Descripción

Incorporar un mecanismo de notificaciones internas para informar eventos importantes a los usuarios.

---

## Eventos candidatos

- Nueva actividad asignada.
- Cambio de estado.
- Nuevo mensaje recibido.
- Error asignado.
- Proyecto finalizado.

---

## Estado

En evaluación.

No constituye prioridad para la versión inicial del overhaul.

---

# 4. Funcionalidades Descartadas

Durante el proceso de análisis podrán surgir propuestas que finalmente no sean implementadas.

Estas deberán registrarse aquí junto con la justificación correspondiente.

---

# 5. Criterios de Aprobación

Una funcionalidad será considerada oficialmente parte de IKernell v2 cuando:

- Responda a una necesidad del dominio.
- Se encuentre documentada.
- Posea impacto identificado.
- Haya sido implementada.
- Haya sido validada.

---

# 6. Estado del Documento

Este documento permanecerá abierto durante todo el proceso de evolución del sistema.

Nuevas funcionalidades podrán incorporarse siempre que respeten la visión general del proyecto y los principios arquitectónicos definidos para IKernell.

---

**Versión:** 2.0

**Estado:** En elaboración
