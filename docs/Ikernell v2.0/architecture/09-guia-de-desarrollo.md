# IKernell v2 — Guía de Desarrollo

> Guía práctica para implementar nuevas funcionalidades dentro del proyecto.

---

# Objetivo

Definir el flujo de trabajo recomendado para desarrollar nuevas funcionalidades manteniendo consistencia con la arquitectura del proyecto.

---

# Flujo de Desarrollo

Toda funcionalidad seguirá el siguiente proceso.

```

Análisis

↓

Diseño

↓

Implementación Backend

↓

Implementación Frontend

↓

Pruebas

↓

Documentación

↓

Commit

```

---

# Paso 1

Analizar el dominio.

Preguntas.

- ¿Qué problema resuelve?
- ¿Existe una entidad relacionada?
- ¿Modifica reglas del negocio?
- ¿Impacta la base de datos?

---

# Paso 2

Actualizar documentación.

Cuando aplique.

- HU
- RF
- RNF
- Casos de Uso
- DER

---

# Paso 3

Actualizar Base de Datos

Si existen cambios estructurales.

Actualizar.

- SQL
- DER
- Diccionario

---

# Paso 4

Actualizar Backend

Orden recomendado.

Entity

↓

Repository

↓

DTO

↓

Mapper

↓

Service

↓

Controller

↓

Pruebas

---

# Paso 5

Actualizar Frontend

Orden recomendado.

Types

↓

Service

↓

Componentes

↓

Página

↓

Validaciones

↓

Pruebas

---

# Paso 6

Actualizar Documentación

Revisar.

- Manual Técnico
- Manual Usuario
- Product Backlog
- Checklist

---

# Commits

Se recomienda utilizar Conventional Commits.

Ejemplos.

feat:

fix:

refactor:

docs:

style:

test:

chore:

---

# Pull Requests

Todo Pull Request deberá responder.

¿Qué problema resuelve?

¿Qué cambia?

¿Qué documentos actualiza?

¿Qué impacto tiene?

---

# Checklist antes de finalizar

□ Compila correctamente.

□ No rompe funcionalidades existentes.

□ Cumple Design System.

□ Cumple Arquitectura.

□ Actualiza documentación.

□ Actualiza backlog.

□ Actualiza checklist.

---

# Estado

Versión 2.0

En elaboración.
