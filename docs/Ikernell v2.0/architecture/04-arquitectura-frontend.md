# IKernell v2 — Arquitectura Frontend

> Documento que define la arquitectura objetivo del frontend de IKernell v2, estableciendo la organización del código, responsabilidades de cada capa y las reglas para el desarrollo de nuevas funcionalidades.

---

# 1. Objetivo

Este documento define la arquitectura oficial del frontend de IKernell.

Su propósito es garantizar que el crecimiento del sistema se realice de manera consistente, evitando duplicidad de componentes, mezcla de responsabilidades y aumento innecesario de complejidad.

Todas las nuevas funcionalidades deberán respetar esta arquitectura.

---

# 2. Principios Arquitectónicos

La arquitectura del frontend estará basada en los siguientes principios.

## Separación de responsabilidades

Cada carpeta tendrá una única responsabilidad claramente definida.

---

## Reutilización

Todo componente susceptible de reutilización deberá abstraerse antes de ser duplicado.

---

## Escalabilidad

La incorporación de nuevos módulos no deberá requerir reorganizar la estructura existente.

---

## Legibilidad

La organización deberá facilitar que un desarrollador nuevo comprenda rápidamente el proyecto.

---

## Consistencia

Todos los módulos deberán seguir exactamente la misma estructura.

---

# 3. Arquitectura General

El frontend estará organizado por capas de responsabilidad.

```

Application

↓

Pages

↓

Layouts

↓

Features

↓

Shared Components

↓

UI Components

↓

Services

↓

Types

↓

Utils

```

Cada capa tendrá responsabilidades específicas y no deberá invadir las responsabilidades de otra.

---

# 4. Estructura objetivo

```
src

├── app
│
├── assets
│
├── components
│   ├── ui
│   ├── shared
│   ├── layout
│   ├── feedback
│   ├── forms
│   └── data-display
│
├── features
│   ├── usuarios
│   ├── proyectos
│   ├── actividades
│   ├── errores
│   ├── interrupciones
│   ├── dashboard
│   └── mensajes
│
├── hooks
│
├── layouts
│
├── pages
│
├── routes
│
├── services
│
├── styles
│
├── types
│
├── utils
│
└── constants
```

---

# 5. Responsabilidad de cada carpeta

## app

Configuración general de la aplicación.

- Providers.
- Inicialización.
- Contextos globales.
- Configuración.

---

## pages

Representan únicamente rutas.

Las páginas no deberán contener lógica de negocio compleja.

Su responsabilidad será ensamblar componentes.

---

## layouts

Definen estructuras reutilizables.

Ejemplos.

- DashboardLayout
- LandingLayout
- AuthLayout

---

## features

Cada módulo funcional del sistema tendrá su propio espacio.

Ejemplo.

```
usuarios

proyectos

errores

dashboard
```

Cada feature podrá contener.

- componentes propios
- hooks propios
- validaciones
- helpers

Siempre que no sean reutilizables por otros módulos.

---

## components

Contendrá únicamente componentes reutilizables.

Nunca deberá contener lógica específica de un módulo.

---

# 6. Componentes UI

Los componentes UI representan la capa más básica del sistema.

Ejemplos.

- Button
- Input
- Badge
- Modal
- Card
- Table
- Tabs

No conocerán absolutamente nada del negocio.

---

# 7. Componentes Shared

Representan componentes reutilizables que conocen ligeramente el dominio.

Ejemplos.

- SearchBar
- Filters
- ConfirmDeleteDialog
- EmptyProjects
- PageHeader

---

# 8. Features

Cada módulo encapsulará su lógica.

Ejemplo.

```
features

↓

usuarios

↓

UserTable

UserFilters

UserForm

UserDetails

UserValidators
```

Esto evita contaminar el resto del proyecto.

---

# 9. Servicios

Los servicios serán responsables únicamente de comunicarse con el backend.

No deberán contener lógica visual.

No deberán modificar componentes.

No deberán manipular estados de React.

---

# 10. Estados

El estado deberá mantenerse lo más cerca posible del componente que lo utiliza.

Solo se utilizará estado global cuando realmente exista información compartida.

---

# 11. Formularios

Todos los formularios deberán compartir el mismo patrón.

```
Header

↓

Campos

↓

Acciones

↓

Feedback
```

Los formularios no deberán implementar validaciones distintas para problemas equivalentes.

---

# 12. Tablas

Todas las tablas deberán utilizar un componente base.

Las diferencias deberán resolverse mediante configuración.

No mediante múltiples implementaciones.

---

# 13. Navegación

La navegación deberá mantenerse completamente desacoplada del contenido.

Los módulos no deberán conocer la implementación del Sidebar.

---

# 14. Layout Principal

Toda la aplicación autenticada utilizará un único Dashboard Layout.

Este layout administrará.

- Sidebar
- Header
- Breadcrumb
- Área de contenido

---

# 15. Manejo de Errores

Todos los errores deberán representarse mediante componentes reutilizables.

Ejemplos.

- ErrorPage
- EmptyState
- NotFound
- PermissionDenied

---

# 16. Loading

No deberán existir indicadores de carga distintos.

Todo loading utilizará los mismos Skeletons y componentes definidos por el Design System.

---

# 17. Feedback

Toda operación deberá informar al usuario.

Ejemplos.

- Toast.
- Alert.
- Confirm Dialog.
- Banner.

---

# 18. Accesibilidad

Todos los componentes reutilizables deberán cumplir requisitos mínimos de accesibilidad.

- Focus visible.
- Navegación por teclado.
- Etiquetas.
- Contraste.

---

# 19. Escalabilidad

Toda nueva funcionalidad deberá integrarse siguiendo esta arquitectura.

No deberán crearse nuevas carpetas sin una justificación documentada.

---

# 20. Objetivo Final

Al finalizar el overhaul el frontend deberá comportarse como un sistema de componentes reutilizables donde las páginas únicamente ensamblan piezas ya existentes.

La incorporación de nuevos módulos deberá implicar reutilizar la mayor cantidad posible de componentes ya implementados, reduciendo la duplicidad y favoreciendo la mantenibilidad del sistema.

---

**Versión:** 2.0

**Estado:** En elaboración
