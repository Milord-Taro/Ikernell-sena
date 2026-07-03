# EP-07 — Registro de Errores

---

## Objetivo

Administrar el registro, seguimiento y consulta de los errores identificados durante el desarrollo de los proyectos.

---

## Alcance

Incluye:

- Registrar errores.
- Editar registros.
- Consultar historial.
- Clasificar por tipo.
- Buscar y filtrar registros.

---

## Actores

- Líder.
- Desarrollador.

---

## Features

- Registrar error.
- Editar registro.
- Eliminar registro.
- Consultar detalle.
- Clasificar por tipo.
- Buscar registros.
- Filtrar registros.

---

## Entidades

- RegistroError.
- TipoError.
- Actividad.
- Proyecto.

---

## Reglas del negocio

- Todo error deberá pertenecer a un proyecto.
- Todo error deberá tener un tipo.
- El historial deberá mantenerse disponible.

---

## Dependencias

- EP-04 Gestión de Proyectos.
- EP-06 Gestión de Actividades.

---

## Implementación Actual

CRUD funcional.

---

## Mejoras del Overhaul

- Mejor experiencia de registro.
- Historial más claro.
- Mejor búsqueda.
- Integración con auditoría.
- Consistencia visual.

---

## Prioridad

P0

---

## Estado

Pendiente.
