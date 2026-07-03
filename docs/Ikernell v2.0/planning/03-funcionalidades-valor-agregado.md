# IKernell v2 — Funcionalidades de Valor Agregado

> Documento que describe las funcionalidades incorporadas durante el proceso de evolución de IKernell que amplían el alcance del caso de estudio y aportan valor real al sistema.

---

# 1. Objetivo

El propósito de este documento consiste en justificar las funcionalidades implementadas durante IKernell v2 que exceden los requerimientos mínimos definidos por el caso de estudio.

Cada funcionalidad deberá responder a una necesidad identificada durante el análisis del dominio y contribuir a mejorar la trazabilidad, administración, experiencia de usuario o capacidad de evolución del sistema.

No se incorporarán funcionalidades únicamente por incrementar el número de características del proyecto.

---

# 2. Criterios de Evaluación

Toda funcionalidad candidata deberá responder afirmativamente, al menos, a una de las siguientes preguntas.

- ¿Resuelve un problema real?
- ¿Mejora la experiencia del usuario?
- ¿Incrementa la productividad?
- ¿Representa mejor el dominio?
- ¿Facilita el mantenimiento?
- ¿Incrementa la trazabilidad?
- ¿Reduce errores?
- ¿Hace más escalable el sistema?

---

# 3. Estado

| Estado | Significado |
|---------|-------------|
| Propuesta | Idea inicial |
| En análisis | Se está evaluando |
| Aprobada | Será implementada |
| Implementada | Finalizada |
| Descartada | No será implementada |

---

# 4. Plantilla

Toda funcionalidad deberá documentarse utilizando la siguiente estructura.

---

## Nombre

---

### Estado

---

### Objetivo

---

### Problema identificado

---

### Justificación

---

### Beneficio para el usuario

---

### Beneficio para la organización

---

### Impacto técnico

- Dominio
- Base de Datos
- Backend
- Frontend
- Documentación

---

### Complejidad

Baja

Media

Alta

---

### Prioridad

P0

P1

P2

P3

---

### Dependencias

---

### Riesgos

---

### Resultado esperado

---

# 5. Funcionalidades Aprobadas

---

# FA-001 Auditoría Global del Sistema

## Estado

Aprobada

---

## Objetivo

Registrar todas las operaciones relevantes realizadas por los usuarios dentro del sistema.

---

## Problema identificado

Actualmente el sistema únicamente conserva el estado actual de la información.

No existe un mecanismo que permita conocer:

- quién realizó una modificación;
- cuándo ocurrió;
- qué información fue modificada;
- cuál era el valor anterior.

Esto dificulta la trazabilidad, el mantenimiento y la identificación de errores operativos.

---

## Justificación

La auditoría constituye una práctica ampliamente utilizada en sistemas empresariales debido a que permite reconstruir la historia completa de la información.

Su incorporación representa un incremento significativo del valor funcional del sistema.

---

## Beneficio para el usuario

- Mayor transparencia.
- Historial de cambios.
- Seguimiento de actividades.
- Mejor diagnóstico.

---

## Beneficio para la organización

- Mayor control administrativo.
- Mejor mantenimiento.
- Base para futuras funcionalidades.
- Incremento de la seguridad.

---

## Impacto técnico

✔ Dominio

✔ Base de Datos

✔ Backend

✔ Frontend

✔ Documentación

---

## Complejidad

Alta

---

## Prioridad

P0

---

## Resultado esperado

El sistema será capaz de reconstruir completamente las modificaciones realizadas sobre las entidades principales.

---

# FA-002 Timeline de Proyectos

## Estado

Aprobada

---

## Objetivo

Representar cronológicamente los eventos más importantes ocurridos durante la ejecución de un proyecto.

---

## Problema identificado

Actualmente la información se encuentra distribuida entre distintas vistas.

No existe una forma sencilla de comprender la evolución de un proyecto.

---

## Justificación

El Timeline facilita la comprensión del estado del proyecto mediante una representación cronológica de los eventos más relevantes.

---

## Beneficio para el usuario

- Mayor comprensión del proyecto.
- Seguimiento cronológico.
- Mejor navegación.

---

## Beneficio para la organización

- Facilita auditorías.
- Apoya reuniones de seguimiento.
- Reduce tiempos de análisis.

---

## Impacto técnico

✔ Backend

✔ Frontend

✔ Base de Datos

---

## Complejidad

Media

---

## Prioridad

P1

---

## Resultado esperado

Cada proyecto dispondrá de una línea de tiempo que represente visualmente su evolución.

---

# 6. Funcionalidades en Evaluación

Las siguientes funcionalidades continúan en análisis.

---

## Dashboard Ejecutivo

Objetivo.

Consolidar indicadores globales del sistema.

Estado.

En análisis.

---

## Centro de Notificaciones

Objetivo.

Informar automáticamente eventos importantes a los usuarios.

Estado.

En análisis.

---

## Gestión Avanzada de Estados

Objetivo.

Modelar explícitamente el ciclo de vida de las entidades principales.

Estado.

En análisis.

---

# 7. Funcionalidades Descartadas

En este apartado se registrarán aquellas propuestas que, tras su análisis, no representen un beneficio suficiente para justificar su incorporación.

Toda funcionalidad descartada deberá conservar la justificación correspondiente.

---

# 8. Evolución

Este documento evolucionará durante todo el proceso de desarrollo de IKernell v2.

Las nuevas funcionalidades deberán incorporarse únicamente después de completar su análisis funcional y técnico.

---

Versión

2.0

Estado

Activo
