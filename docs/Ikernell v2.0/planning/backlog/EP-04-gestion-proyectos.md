# EP-04 — Gestión de Proyectos

---

## Objetivo

Administrar el ciclo de vida completo de los proyectos desarrollados por IKernell, permitiendo su creación, planificación, seguimiento y cierre, así como la asignación de líderes y participantes.

Esta épica constituye el núcleo funcional del sistema, ya que alrededor de los proyectos se organizan las etapas, actividades, errores e interrupciones.

---

## Problema que resuelve

Todo desarrollo de software requiere una estructura organizada para gestionar proyectos.

IKernell permite centralizar la información de cada proyecto y servir como punto de partida para la planificación y seguimiento del trabajo realizado por los equipos.

Durante el overhaul se busca mejorar la consistencia del módulo, fortalecer las validaciones, optimizar la experiencia de usuario y representar de manera más precisa el dominio del caso de estudio.

---

## Alcance

Incluye:

- Crear proyectos.
- Consultar proyectos.
- Editar proyectos.
- Cambiar estado.
- Asignar líder.
- Asignar participantes.
- Consultar detalle del proyecto.
- Buscar proyectos.
- Filtrar proyectos.
- Visualizar indicadores básicos.

No incluye la gestión de etapas ni actividades, las cuales pertenecen a épicas independientes.

---

## Actores involucrados

### Coordinador

- Administración completa de proyectos.

### Líder

- Consulta de proyectos asignados.
- Seguimiento del proyecto.

### Desarrollador

- Consulta de proyectos en los que participa.

---

## Features

### EP04-F01

Crear proyecto.

### EP04-F02

Editar proyecto.

### EP04-F03

Consultar proyectos.

### EP04-F04

Consultar detalle.

### EP04-F05

Asignar líder.

### EP04-F06

Asignar integrantes.

### EP04-F07

Cambiar estado.

### EP04-F08

Buscar proyectos.

### EP04-F09

Filtrar proyectos.

### EP04-F10

Visualizar indicadores generales.

---

## Entidades involucradas

- Proyecto
- Usuario
- AsignacionProyecto

---

## Reglas del negocio

- Todo proyecto deberá tener un líder asignado.
- Un líder deberá existir como usuario activo.
- Un proyecto podrá tener múltiples integrantes.
- Un usuario podrá participar en múltiples proyectos.
- No podrán existir proyectos duplicados.
- El estado del proyecto deberá respetar el flujo definido por el negocio.

---

## Dependencias

- EP-02 Gestión de Usuarios.
- EP-03 Gestión Organizacional.

---

## Criterios de aceptación

- CRUD completamente funcional.
- Validaciones implementadas.
- Asignación correcta de participantes.
- Consistencia con el modelo de dominio.
- Integración con etapas y actividades.

---

## Impacto Técnico

### Backend

- Proyecto
- AsignacionProyecto

### Frontend

- ProyectosPage
- ProyectoDetallePage
- ProyectoModal
- ProjectCard

### Base de Datos

- Proyecto
- AsignacionProyecto

### Documentación

- HU
- RF
- Casos de Uso
- DER

---

## Implementación Actual

### Backend

- CRUD implementado.

### Frontend

- Gestión básica implementada.

### Mejoras del Overhaul

- Aplicar Design System.
- Mejorar formularios.
- Mejorar visualización del detalle.
- Mejorar filtros.
- Mejorar búsqueda.
- Mejorar feedback visual.
- Estandarizar tablas y tarjetas.

---

## Observaciones conocidas

- Revisar representación del dominio del proyecto.
- Revisar flujo de estados.
- Revisar asignación de participantes.

---

## Prioridad

P0

---

## Estado

Pendiente.
