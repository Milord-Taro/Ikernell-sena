# IKernell v2 — Estándares del Proyecto

> Documento que define las convenciones, principios y estándares técnicos que regirán el desarrollo de IKernell durante el proceso de overhaul.

---

# 1. Introducción

El objetivo de este documento es establecer un conjunto único de estándares para garantizar la consistencia técnica y visual de todo el proyecto.

Estos lineamientos deberán ser respetados por cualquier desarrollador que participe en el proyecto, independientemente del módulo sobre el que trabaje.

Los estándares aquí definidos tienen prioridad sobre decisiones individuales de implementación.

---

# 2. Objetivos

Este documento busca:

- Reducir inconsistencias.
- Facilitar el mantenimiento.
- Mejorar la legibilidad.
- Favorecer la reutilización.
- Reducir la deuda técnica.
- Mantener una arquitectura uniforme.

---

# 3. Principios Generales

Todo desarrollo deberá seguir los siguientes principios.

## 3.1 Consistencia

Una misma acción debe verse y comportarse siempre de la misma manera.

Ejemplos:

- Todos los botones primarios deben compartir apariencia.
- Todas las tablas deben compartir estructura.
- Todos los formularios deben seguir la misma distribución.
- Todas las páginas CRUD deben compartir navegación y comportamiento.

---

## 3.2 Reutilización

Antes de crear un nuevo componente deberá verificarse si existe uno reutilizable.

No se crearán componentes duplicados únicamente para resolver un caso específico.

---

## 3.3 Responsabilidad Única

Cada componente deberá tener una responsabilidad claramente definida.

Un componente complejo deberá dividirse cuando cumpla múltiples funciones independientes.

---

## 3.4 Escalabilidad

Las soluciones deberán facilitar la incorporación de nuevas funcionalidades.

Se evitarán implementaciones rígidas que dificulten futuras modificaciones.

---

## 3.5 Simplicidad

Entre dos soluciones técnicamente correctas deberá preferirse aquella que resulte más sencilla de comprender y mantener.

---

# 4. Convenciones de Nombres

## Backend

### Clases

Utilizar PascalCase.

Ejemplos:

```
UsuarioService
ProyectoController
ActividadRepository
```

---

### Métodos

Utilizar camelCase.

```
buscarPorId()

registrarProyecto()

obtenerActividades()
```

---

### Variables

Utilizar nombres descriptivos.

Incorrecto

```
u

x

obj
```

Correcto

```
usuario

proyecto

actividadActual
```

---

## Frontend

Componentes

PascalCase.

```
ProjectCard

Sidebar

DashboardHeader
```

---

Hooks

```
useAuth

usePagination

useDashboard
```

---

Funciones

camelCase.

```
handleSubmit()

obtenerProyectos()

validarFormulario()
```

---

# 5. Organización del Código

## Backend

La arquitectura seguirá el patrón por capas.

```
Controller

↓

Service

↓

Repository

↓

Entity
```

Los controladores no deberán contener lógica de negocio.

Los servicios concentrarán toda la lógica funcional.

Los repositorios únicamente accederán a los datos.

---

## Frontend

La organización estará basada en responsabilidades.

```
Pages

Layouts

Features

Shared

UI

Hooks

Services

Utils

Types
```

Las páginas deberán contener la mínima lógica posible.

La mayor parte de la funcionalidad deberá encontrarse en componentes reutilizables y servicios.

---

# 6. Componentes Reutilizables

Todo componente reutilizable deberá cumplir las siguientes características.

- Desacoplado.
- Configurable mediante props.
- Sin dependencias innecesarias.
- Fácil de reutilizar.

No se crearán variantes visuales completas cuando puedan resolverse mediante propiedades.

---

# 7. Estándares Visuales

El sistema utilizará un único Design System.

Todos los elementos visuales deberán respetar:

- Colores.
- Tipografía.
- Espaciados.
- Bordes.
- Estados.
- Iconografía.

No se permitirán componentes que rompan la identidad visual del proyecto.

---

# 8. Formularios

Todos los formularios deberán seguir el mismo patrón.

- Etiquetas superiores.
- Campos alineados.
- Validaciones inmediatas.
- Mensajes de error consistentes.
- Confirmación visual al guardar.

---

# 9. Tablas

Todas las tablas deberán incluir, cuando aplique:

- Ordenamiento.
- Búsqueda.
- Paginación.
- Estado vacío.
- Estado de carga.
- Acciones agrupadas.

---

# 10. Feedback al Usuario

Toda acción importante deberá informar su resultado.

Ejemplos:

- Registro exitoso.
- Actualización exitosa.
- Eliminación.
- Error.
- Advertencia.
- Confirmación.

No deberán existir acciones silenciosas.

---

# 11. Navegación

Toda la aplicación deberá mantener una navegación consistente.

- Sidebar único.
- Encabezado uniforme.
- Breadcrumb cuando aplique.
- Títulos consistentes.

---

# 12. Accesibilidad

Se buscará cumplir buenas prácticas básicas.

- Contraste suficiente.
- Navegación mediante teclado.
- Etiquetas descriptivas.
- Iconos acompañados de texto cuando sea necesario.

---

# 13. Documentación

Toda funcionalidad nueva deberá actualizar, cuando corresponda:

- Historia de Usuario.
- Caso de Uso.
- Requerimientos.
- Modelo de Datos.
- Manual Técnico.

---

# 14. Proceso de Desarrollo

Toda nueva funcionalidad seguirá el siguiente flujo.

1. Análisis.
2. Diseño.
3. Implementación.
4. Validación.
5. Documentación.

No se implementarán cambios importantes sin una justificación documentada.

---

# 15. Definición de Terminado (Definition of Done)

Una tarea solo podrá considerarse terminada cuando:

- Funciona correctamente.
- Cumple los estándares visuales.
- Cumple los estándares arquitectónicos.
- No introduce deuda técnica conocida.
- Está documentada.
- Ha sido validada manualmente.

---

# 16. Evolución del Documento

Este documento podrá ampliarse durante el desarrollo del overhaul.

Toda modificación deberá responder a una necesidad identificada y mantenerse alineada con la visión general del proyecto.

---

**Versión:** 2.0

**Estado:** En elaboración
