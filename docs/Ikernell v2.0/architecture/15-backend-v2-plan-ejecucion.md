# 15. Backend V2 - Plan de Ejecución

## Estado

**Versión:** 2.0

**Estado:** Planeación aprobada

---

# Objetivo

Este documento define el plan oficial para la construcción del Backend V2 de IKernell Solutions.

El objetivo es desarrollar un backend completamente alineado con el nuevo dominio de negocio, la Base de Datos V2 y la documentación funcional del proyecto.

La implementación priorizará:

- mantenibilidad
- escalabilidad
- separación de responsabilidades
- seguridad
- reutilización
- buenas prácticas de Spring Boot

---

# Situación actual

Durante el overhaul del proyecto se rediseñó completamente el dominio.

Los siguientes componentes cambiaron:

- entidades
- atributos
- relaciones
- reglas de negocio
- restricciones
- nombres de tablas
- nombres de columnas
- estructura de la Base de Datos

Como consecuencia, el backend desarrollado anteriormente dejó de representar correctamente el dominio.

La auditoría técnica concluye que la migración debe abordarse como una reconstrucción del backend sobre el nuevo dominio y no como un simple refactor.

---

# Fuente de verdad

Toda decisión del Backend V2 deberá basarse únicamente en:

- Base de Datos V2
- Diseño Lógico de Base de Datos
- Reglas de Negocio
- Requerimientos
- Historias de Usuario

El backend existente será utilizado únicamente como referencia técnica cuando corresponda.

Nunca como fuente funcional.

---

# Objetivos del Backend V2

El backend será responsable de:

- lógica de negocio
- seguridad
- autenticación
- autorización
- validaciones
- auditoría
- trazabilidad
- generación de reportes
- acceso a datos
- transacciones
- integridad del dominio

El frontend será responsable únicamente de:

- presentar información
- consumir la API REST
- interacción con el usuario

Las decisiones de negocio nunca dependerán del frontend.

---

# Arquitectura

Se seguirá una arquitectura por capas.

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

# Responsabilidades

## Entity

Representan las tablas de la Base de Datos.

No contienen lógica de negocio.

---

## Repository

Acceso a datos mediante Spring Data JPA.

No contienen validaciones.

No contienen reglas de negocio.

---

## DTO

Representan el contrato de comunicación entre cliente y servidor.

Inicialmente existirá un DTO por entidad.

En caso de ser necesario evolucionarán hacia:

- Request
- Update
- Response
- Summary

---

## Mapper

Conversión entre DTO y Entity.

Se utilizará MapStruct para centralizar todas las conversiones.

---

## Service

Contiene toda la lógica de negocio.

Ejemplos:

- validaciones funcionales
- reglas de negocio
- cambios de estado
- generación de notificaciones
- generación de trazabilidad
- exportaciones

Toda regla del dominio debe implementarse aquí.

---

## Controller

Expone la API REST.

Su responsabilidad será únicamente:

- recibir solicitudes HTTP
- validar DTOs
- invocar Services
- devolver ResponseEntity

No contendrá lógica de negocio.

---

## Validation

Validaciones personalizadas.

Se utilizará Bean Validation mediante:

- @Valid
- @NotBlank
- @NotNull
- @Email
- @Pattern
- @Size
- @Past
- @PastOrPresent
- @Min
- @Max

---

## Security

Responsable de:

- JWT
- autenticación
- autorización
- filtros
- control de acceso

Toda autorización será responsabilidad exclusiva del backend.

---

## Report

Responsable de generar:

- TXT
- CSV
- PDF
- Excel

Los archivos serán generados por Spring Boot.

El frontend únicamente iniciará la descarga.

---

## Audit

Responsable de registrar eventos en la entidad:

Trazabilidad

---

## Notification

Responsable de generar notificaciones del sistema.

---

## Constants

Constantes reutilizadas por el proyecto.

---

## Enums

Enumeraciones del dominio.

---

## Util

Clases auxiliares reutilizables.

---

# Manejo de errores

Toda la API utilizará un manejador global mediante:

@RestControllerAdvice

Se devolverán respuestas consistentes para toda la aplicación.

---

# Códigos HTTP

Se utilizarán los siguientes códigos:

| Código | Uso |
|---------|-----|
| 200 | Consulta o actualización exitosa |
| 201 | Creación exitosa |
| 204 | Eliminación exitosa |
| 400 | Error de validación |
| 401 | Usuario no autenticado |
| 403 | Usuario autenticado sin permisos |
| 404 | Recurso inexistente |
| 409 | Conflicto de negocio o restricción |
| 500 | Error interno del servidor |

Siempre que Spring Boot pueda generar automáticamente estos códigos, se aprovechará su comportamiento por defecto.

Los errores específicos del dominio serán manejados mediante excepciones personalizadas.

---

# Exportaciones

Toda exportación será responsabilidad del backend.

Formatos soportados:

- TXT
- CSV
- PDF
- Excel

El frontend únicamente descargará el archivo generado.

---

# Seguridad

La seguridad será implementada completamente en el backend.

El frontend únicamente mostrará u ocultará opciones de interfaz.

La autorización nunca dependerá del cliente.

---

# Estado de la auditoría

## Reutilizar

- estructura Maven
- configuración base Spring Boot
- PostgreSQL
- patrón Repository
- parte del manejo global de excepciones
- configuración Swagger (si aplica)

---

## Refactorizar

- Repositories
- Exception Handling
- estructura de Controllers

---

## Eliminar

- entidades legacy
- DTO antiguos
- Services del modelo anterior
- Controllers del dominio anterior
- reglas de negocio obsoletas

---

## Crear desde cero

- entidades V2
- DTO V2
- Mappers
- Services
- JWT
- Seguridad
- Reportes
- Auditoría
- Notificaciones

---

# Sprint 0

Antes de implementar funcionalidades se desarrollará la infraestructura del backend.

## Fase 1

Preparación del proyecto

- actualizar dependencias
- configurar MapStruct
- configurar Bean Validation
- configurar OpenAPI / Swagger
- configurar perfiles
- configurar CORS
- configurar estructura de paquetes

---

## Fase 2

Infraestructura transversal

- ApiResponse
- manejo global de errores
- JWT
- filtros
- utilidades
- constantes
- enums

---

## Fase 3

Dominio

Implementar una entidad completa como plantilla.

Orden propuesto:

1. Rol
2. Profesión
3. Especialidad
4. Usuario

Cada entidad deberá implementar:

- Entity
- Repository
- DTO
- Mapper
- Service
- Controller
- pruebas con Postman

Solo cuando una entidad esté completamente terminada se iniciará la siguiente.

---

# Checklist de ejecución — Backend V2 (Revisado)

> **Actualizado:** 07-jul-2026  
> **Revisión:** Auditoría de código

## Cambios respecto al checklist original

- Se añaden ítems faltantes (🆕).
- Se reordenan los catálogos de tipos antes del Sprint 5.
- Se agrega el Sprint 9 para contenido público, dashboard y notificaciones que no tenían sprint asignado.

---

# Sprint 0 — Infraestructura

## Fase 1 — Preparación del proyecto

- [ X] Revisar y actualizar `pom.xml`
- [ X] Incorporar Spring Security
- [ X] Incorporar MapStruct
- [ X] Incorporar JWT
- [ X] Incorporar OpenAPI / Swagger
- [ ] Revisar dependencias de pruebas
- [ X] Revisar Lombok (decisión final)
- [ X] Configurar perfiles (`dev`, `prod`, `local`)
- [ X] Revisar `application.properties`
- [ X] Configurar CORS para futura autenticación
- [ X] 🆕 **GAP CONFIRMADO:** `jwt.expiration-ms` actual (`dev = 8h`, `prod = 1h`) no coincide con **RNF-001 (30 min)**. Decidir:
  - [ Y] Ajustar a `1800000`
  - [ N] Documentar desviación justificada en RNF-001

---

## Fase 2 — Organización del proyecto

- [ X] Crear paquete `mapper`
- [ X] Crear paquete `validation`
- [ X] Crear paquete `security`
- [ X] Crear paquete `audit`
- [ X] Crear paquete `notification`
- [ X] Crear paquete `report`
- [ X] Crear paquete `constants`
- [ X] Crear paquete `enums`
- [ X] Crear paquete `util`

---

## Fase 3 — Infraestructura transversal

- [ X] Diseñar `ApiResponse`
- [ X] Diseñar `ApiError`
- [ X] Mejorar `GlobalExceptionHandler`
- [ X] Crear `BusinessException`
- [ X] Crear `ConflictException`
- [ X] Crear `UnauthorizedException`
- [ X] Crear `ForbiddenException`
- [ X] Crear `ValidationException`
- [ ] 🆕 Crear entidad/estrategia de auditoría (Trazabilidad). El paquete `audit/` continúa vacío (RF-018, RNF-009).

---

## Fase 4 — Convenciones

- [ ] Definir formato estándar de respuestas
- [ ] Definir códigos HTTP
- [ ] Definir estrategia de transacciones
- [ ] Definir estrategia de paginación
- [ ] Definir convenciones REST
- [ ] Definir estrategia de auditoría
- [ ] Definir estrategia de reportes
- [ ] 🆕 Definir estrategia de autorización por rol mediante `@PreAuthorize` / `hasRole`  (no hay ningún controller con esto aún — solo permitAll() en /api/auth/**)
- [ ] 🆕 Definir estrategia de respaldo y recuperación de datos (RNF-011)

---

# Sprint 1 — Catálogos base

- [ X] Rol
- [ X] Profesión
- [ X] Especialidad
- [ ] 🆕 Tipo de Error (RF-019 / HU-19)
- [ ] 🆕 Tipo de Interrupción (RF-020 / HU-20)

> **Nota:** Los catálogos **Tipo de Error** y **Tipo de Interrupción** fueron adelantados a este sprint para evitar bloquear el desarrollo del Sprint 5 por dependencias de claves foráneas.

---

# Sprint 2 — Usuarios

- [ X] Usuario
- [ X] Login
- [ X] JWT
- [ ] Recuperación de contraseña
- [ ] 🆕 Implementar `@PreAuthorize` / `hasRole` en:
  - [ ] `UsuarioController`
  - [ ] `RolController`
  - [ ] `ProfesionController`
  - [ ] `EspecialidadController`
- [ ] 🆕 Implementar *rate limiting* o bloqueo tras intentos fallidos de inicio de sesión (RNF-001)

---

# Sprint 3 — Gestión de Proyectos

- [ ] Proyecto
- [ ] Asignación de Proyecto (equipo del proyecto / membresía activa) — RF-007, RF-017
- [ ] 🆕 Auditoría básica activada desde esta entidad en adelante (evitar deuda retroactiva)

---

# Sprint 4 — Planeación

- [ ] Etapa
- [ ] Actividad

---

# Sprint 5 — Seguimiento

- [ ] Registro de Error (FK → Tipo de Error)
- [ ] Interrupción (FK → Tipo de Interrupción)

---

# Sprint 6 — Comunicación

- [ ] Mensaje de Contacto

  > Flujo confirmado:
  >
  > - Cliente envía mensaje **sin autenticación** (RF-002 / HU-02).
  > - Coordinador gestiona y responde (RF-014 / HU-14).
  > - Un solo módulo, dos consumidores del mismo endpoint y entidad.

- [ ] Notificación (generación)
- [ ] Implementación completa de Trazabilidad (auditoría sobre todas las entidades)

---

# Sprint 7 — Reportes

- [ ] TXT
- [ ] CSV
- [ ] PDF
- [ ] Excel

---

# Sprint 8 — Calidad

- [ ] Pruebas funcionales
- [ ] Pruebas de seguridad
- [ ] Optimización
- [ ] Revisión final

---

# Sprint 9 — Portal público y experiencia de usuario 🆕

> **Sprints sin asignar en el plan original.**
>
> Corresponden a:
>
> - RF-001
> - RF-021
> - RF-022
> - RF-023
>
> CONFIRMADO: este backend sí sirve tanto el portal público del cliente como el portal interno de trabajadores (mismo sistema, dos frentes).

- [ ] 🆕 Contenido institucional público (portafolio, noticias, FAQ y contacto) — RF-001 / HU-01
- [ ] 🆕 Pantalla de bienvenida post-login (endpoint de datos de saludo y tema) — RF-021 / HU-21
- [ ] 🆕 Dashboard ejecutivo (endpoints de agregación y métricas por rol) — RF-022 / HU-22
- [ ] 🆕 Centro de notificaciones (consulta, leído/no leído e historial) — RF-023 / HU-23 (distinto de "Notificación" de Sprint 6, que es la generación)	

> **Nota:** Este módulo es distinto de **Notificación** del Sprint 6, que corresponde únicamente a la generación de notificaciones.

---

# Gaps abiertos (seguimiento continuo)

- [ ] 🆕 Verificar cobertura de **RNF-011** (respaldo y recuperación de datos).
  - Normalmente corresponde a infraestructura y operaciones, no únicamente al código.
  - Debe quedar documentado.



---

# Estrategia de desarrollo

El backend no se desarrollará por capas completas.

Se desarrollará por entidades.

Ejemplo:

Rol

↓

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

↓

Commit

↓

Siguiente entidad

Esto permitirá validar continuamente el funcionamiento del sistema y reducir el riesgo de errores acumulados.

---

# Principio rector

La Base de Datos V2 y la documentación funcional representan la única fuente de verdad del dominio.

Toda implementación del backend deberá mantenerse alineada con ellas.

El objetivo del Backend V2 no es reutilizar el mayor porcentaje posible del código anterior, sino construir una base sólida, mantenible y consistente para la evolución futura de IKernell Solutions.
