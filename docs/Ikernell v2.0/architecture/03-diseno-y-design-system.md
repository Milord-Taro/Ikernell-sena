# IKernell v2 — Design System

> Sistema de diseño oficial para la segunda versión de IKernell Soluciones Software.

---

# 1. Introducción

El presente documento define el lenguaje visual utilizado por IKernell.

Su propósito consiste en garantizar una experiencia consistente en toda la aplicación mediante la definición de componentes reutilizables, patrones visuales, reglas de interacción y principios de diseño.

Este documento constituye la fuente oficial para cualquier decisión relacionada con la interfaz de usuario.

Toda nueva pantalla deberá construirse respetando los lineamientos aquí definidos.

---

# 2. Filosofía del diseño

IKernell adopta una estética moderna inspirada en herramientas profesionales utilizadas en ingeniería de software.

La interfaz prioriza:

- Claridad.
- Consistencia.
- Legibilidad.
- Densidad de información.
- Bajo nivel de distracción.
- Escalabilidad visual.

No se busca una interfaz decorativa.

Se busca una herramienta profesional.

---

# 3. Principios del diseño

## Claridad

Cada elemento debe comunicar claramente su propósito.

---

## Consistencia

Componentes equivalentes deben verse y comportarse exactamente igual.

---

## Jerarquía

La importancia visual debe responder a la importancia funcional.

---

## Modularidad

La interfaz estará construida completamente mediante componentes reutilizables.

---

## Simplicidad

Cada pantalla mostrará únicamente la información necesaria para la tarea actual.

---

## Feedback

Toda acción importante deberá proporcionar retroalimentación al usuario.

---

# 4. Identidad visual

El sistema adopta un estilo denominado:

> Technical Precision System

Este estilo combina elementos de dashboards profesionales con principios de diseño minimalista orientados a herramientas corporativas.

---

# 5. Paleta de colores

La aplicación utilizará exclusivamente los colores definidos por el sistema.

Los colores representan estados funcionales y no elementos decorativos.

## Colores principales

- Primary
- Secondary
- Surface
- Background

---

## Colores semánticos

- Success
- Warning
- Error
- Information

---

## Colores neutros

- Surface
- Border
- Divider
- Text Primary
- Text Secondary

---

No se permitirá la utilización de colores arbitrarios.

---

# 6. Tipografía

El sistema utilizará una estrategia dual.

## IBM Plex Sans

Utilizada para:

- navegación
- formularios
- títulos
- botones
- contenido general

---

## JetBrains Mono

Reservada para:

- métricas
- estados
- identificadores
- logs
- información técnica
- códigos

---

# 7. Espaciado

Toda la interfaz seguirá una retícula basada en múltiplos de ocho.

Valores principales.

```

8

16

24

32

40

48

64

```

No deberán utilizarse valores arbitrarios.

---

# 8. Border Radius

Los radios deberán mantenerse consistentes.

Se evitará mezclar diferentes estilos dentro de una misma pantalla.

---

# 9. Elevación

La jerarquía visual se construirá principalmente mediante:

- bordes
- contraste
- color

No mediante sombras excesivas.

---

# 10. Iconografía

Toda la aplicación utilizará una única biblioteca de iconos.

Los iconos deberán:

- representar acciones
- mantener tamaño consistente
- utilizar color semántico únicamente cuando sea necesario

Nunca deberán utilizarse únicamente como decoración.

---

# 11. Componentes Fundamentales

Toda la aplicación deberá construirse utilizando los siguientes componentes.

## Foundation

- Button
- IconButton
- Input
- Textarea
- Select
- Checkbox
- Radio
- Switch

---

## Containers

- Card
- Panel
- Section
- Drawer
- Modal

---

## Navigation

- Sidebar
- Topbar
- Breadcrumb
- Tabs

---

## Data Display

- Table
- Badge
- Timeline
- Metric Card
- Avatar
- Empty State
- Skeleton
- Progress

---

## Feedback

- Toast
- Alert
- Confirm Dialog
- Loading
- Error State

---

# 12. Jerarquía de Botones

Solo existirán cuatro tipos.

## Primary

Acción principal.

Solo uno por sección.

---

## Secondary

Acciones importantes secundarias.

---

## Outline

Acciones neutrales.

---

## Ghost

Acciones de baja prioridad.

---

No se crearán nuevos estilos sin justificación.

---

# 13. Tarjetas

Las tarjetas constituyen el elemento principal del sistema.

Toda Card deberá incluir:

- encabezado
- contenido
- acciones (si aplica)

No deberán utilizarse tarjetas únicamente como decoración.

---

# 14. Tablas

Todas las tablas deberán compartir el mismo comportamiento.

Características mínimas.

- búsqueda
- ordenamiento
- paginación
- filtros
- estado vacío
- loading
- acciones

---

# 15. Formularios

Todos los formularios compartirán la misma estructura.

- título
- descripción
- grupos de campos
- acciones

Las validaciones deberán ser inmediatas.

---

# 16. Estados Visuales

Cada componente deberá contemplar como mínimo.

- Default
- Hover
- Focus
- Disabled
- Loading
- Error

---

# 17. Estados Vacíos

Toda pantalla deberá contemplar la ausencia de información.

No se mostrarán tablas completamente vacías.

Siempre deberá existir un Empty State explicando la situación.

---

# 18. Feedback

Toda acción deberá comunicar claramente su resultado.

Ejemplos.

- registro exitoso

- actualización

- eliminación

- error

- advertencia

---

# 19. Layout General

Toda la aplicación compartirá una estructura común.

```

Sidebar

↓

Topbar

↓

Header

↓

Content

↓

Footer (cuando aplique)

```

No deberán existir layouts completamente diferentes sin justificación.

---

# 20. Dashboards

Todos los dashboards deberán utilizar el mismo lenguaje visual.

Los indicadores utilizarán:

- Metric Cards
- Charts
- Timeline
- Activity Feed
- Tables

---

# 21. Responsive

Desktop será la experiencia principal.

Posteriormente.

Tablet.

Finalmente.

Mobile.

---

# 22. Accesibilidad

Todos los componentes deberán:

- ser navegables mediante teclado
- poseer contraste suficiente
- mostrar foco claramente
- evitar depender únicamente del color

---

# 23. Evolución

El presente documento evolucionará junto con el proyecto.

Todo nuevo componente aprobado deberá incorporarse aquí antes de utilizarse en producción.

---

# 24. Resultado esperado

Al finalizar el overhaul cualquier pantalla nueva deberá parecer diseñada por el mismo equipo, utilizando exactamente el mismo lenguaje visual y las mismas reglas de interacción.

El usuario nunca deberá percibir diferencias entre módulos debido a inconsistencias de diseño.

---

**Versión:** 2.0

**Estado:** En construcción

