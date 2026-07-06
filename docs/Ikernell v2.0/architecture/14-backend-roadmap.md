# 14. Backend Roadmap

## Objetivo

Este documento define la arquitectura, convenciones y lineamientos para el desarrollo del backend de IKernell Solutions.

El objetivo es construir un backend mantenible, escalable y alineado con las buenas prácticas de Spring Boot, respetando la separación de responsabilidades entre las distintas capas de la aplicación.

---

# Principios

- El backend concentra toda la lógica de negocio.
- El frontend únicamente consume la API REST y presenta la información.
- Ninguna regla de negocio dependerá del frontend.
- Toda validación importante será realizada por el backend.
- La Base de Datos representa la fuente de verdad del sistema.

---

# Arquitectura

El proyecto seguirá una arquitectura por capas.

```
Cliente (React)

↓

Controller

↓

Service

↓

Repository

↓

PostgreSQL
```

Cada capa tendrá una única responsabilidad.

---

# Organización del proyecto

```
config/

security/

controller/

service/

repository/

entity/

dto/

mapper/

exception/

validation/

report/

notification/

audit/

constants/

enums/

util/
```

---

# Responsabilidad de cada paquete

## entity

Representación de las tablas de la Base de Datos.

No contiene lógica de negocio.

---

## repository

Acceso a datos mediante Spring Data JPA.

No contiene reglas de negocio.

---

## dto

Objetos utilizados para recibir y devolver información entre cliente y servidor.

Como mínimo existirá un DTO por entidad.

En entidades complejas podrán existir DTO especializados:

- Create
- Update
- Response
- Summary

---

## mapper

Conversión entre Entity y DTO.

Se recomienda utilizar MapStruct para centralizar las conversiones.

---

## service

Implementa todas las reglas de negocio.

Ejemplos:

- validaciones funcionales
- creación de proyectos
- asignaciones
- generación de trazabilidad
- generación de notificaciones
- exportaciones

Toda la lógica del sistema reside aquí.

---

## controller

Expone los endpoints REST.

Debe limitarse a:

- recibir solicitudes HTTP
- validar DTOs
- llamar al Service
- devolver ResponseEntity

No contendrá lógica de negocio.

---

## validation

Contendrá validaciones personalizadas cuando las anotaciones estándar no sean suficientes.

---

## security

Configuración de Spring Security.

- JWT
- filtros
- autorización
- autenticación

---

## report

Generación de:

- TXT
- CSV
- PDF
- Excel

Todos los reportes serán generados por el backend.

El frontend únicamente descargará el archivo generado.

---

## audit

Servicios relacionados con la trazabilidad del sistema.

---

## constants

Constantes reutilizadas por el sistema.

Evitar cadenas de texto repetidas.

---

## enums

Enumeraciones utilizadas por el dominio.

---

## util

Clases auxiliares reutilizables.

---

# Validación de datos

Todos los DTO de entrada utilizarán Bean Validation.

Ejemplos:

- @NotBlank
- @NotNull
- @Email
- @Pattern
- @Size
- @Past
- @PastOrPresent
- @Min
- @Max

Todos los endpoints utilizarán:

```

@Valid

```

---

# Manejo de errores

La aplicación utilizará un manejador global mediante:

```

@RestControllerAdvice

```

El objetivo será devolver respuestas consistentes para toda la API.

---

# Códigos HTTP

Se utilizarán los siguientes códigos:

| Código | Uso |
|---------|-----|
| 200 OK | Consulta o actualización exitosa |
| 201 Created | Creación exitosa |
| 204 No Content | Eliminación exitosa |
| 400 Bad Request | Validaciones de entrada |
| 401 Unauthorized | Usuario no autenticado |
| 403 Forbidden | Usuario sin permisos |
| 404 Not Found | Recurso inexistente |
| 409 Conflict | Conflictos de negocio o restricciones |
| 500 Internal Server Error | Error inesperado |

Spring Boot gestionará automáticamente parte de estos códigos cuando sea posible. Los errores personalizados serán manejados mediante excepciones propias y un manejador global.

---

# Transacciones

Las operaciones que involucren múltiples modificaciones utilizarán:

```

@Transactional

```

Ejemplos:

- creación de proyectos
- asignación de integrantes
- cierre de proyectos
- operaciones compuestas

---

# Seguridad

La autorización será responsabilidad exclusiva del backend.

El frontend únicamente ocultará o mostrará opciones de la interfaz según la información recibida.

Las decisiones de acceso serán tomadas mediante Spring Security.

---

# Exportaciones

Toda exportación será responsabilidad del backend.

Formatos soportados:

- TXT
- CSV
- PDF
- Excel

El frontend únicamente iniciará la descarga del archivo.

---

# Objetivo final

Construir un backend modular, mantenible y escalable, donde cada componente tenga una responsabilidad claramente definida, facilitando la evolución del proyecto y el trabajo colaborativo.
