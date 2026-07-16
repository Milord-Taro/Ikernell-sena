# AGENTS.md — Ikernell-sena

Sistema de gestión de proyectos de software para IKernell Soluciones Software.
Administra trabajadores (coordinadores, líderes y desarrolladores), proyectos,
etapas, actividades, errores e interrupciones. Incluye una sección pública
informativa para visitantes anónimos (portafolio, noticias, FAQ, contacto).

Monorepo con frontend React + TypeScript, backend Spring Boot y base de datos PostgreSQL.

---

## Estructura del proyecto

```
ikernell-sena-overhaul/
├── ikernell-backend/
│   ├── src/main/java/com/ikernell/backend/
│   │   ├── controller/   # Solo recibe request y delega — sin lógica de negocio
│   │   ├── service/      # Toda la lógica de negocio va aquí
│   │   ├── repository/   # Interfaces JPA — sin SQL manual salvo casos justificados
│   │   ├── entity/       # Entidades JPA
│   │   ├── dto/          # Objetos de transferencia de datos
│   │   ├── mapper/       # MapStruct: entity <-> DTO
│   │   ├── security/     # JWT, Spring Security
│   │   ├── exception/    # Excepciones de dominio + @RestControllerAdvice
│   │   └── audit/        # Trazabilidad (auditoría)
│   └── pom.xml
│
├── ikernell-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/     # Componentes específicos de un módulo de negocio
│   │   ├── pages/
│   │   ├── services/     # Llamadas HTTP al backend (fetch tipado en services/api.ts)
│   │   ├── context/
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
│
├── docs/                 # Documentación del overhaul (architecture/, planning/, audit/)
└── README.md
```

El backend y el frontend están en el mismo repositorio Git y forman un solo
proyecto. Analizarlos conjuntamente cuando una tarea involucre cambios full-stack.

---

## Stack técnico

| Capa       | Tecnología                                              |
| ---------- | ------------------------------------------------------- |
| Frontend   | React 18.3.1 + TypeScript 5.8.2, Vite 6.3.5             |
| Backend    | Java 17.0.19 (OpenJDK), Spring Boot 4.1.0, Maven 3.9.12 |
| ORM        | Spring Data JPA                                         |
| Seguridad  | Spring Security                                         |
| Base datos | PostgreSQL 18.4 — schema: `public`                      |
| Runtime    | Node.js v22.22.1, npm 9.2.0                             |
| Control    | Git — monorepo en GitHub                                |

---

## Comandos esenciales

### Backend

```bash
# Desde /ikernell-backend
./mvnw spring-boot:run     # Levantar el servidor (puerto 8080 por defecto)
./mvnw test                # Correr todos los tests
./mvnw compile             # Solo compilar — ejecutar antes de dar una tarea por terminada
./mvnw verify              # Build completo + tests + verificaciones
```

> Tests unitarios de Service/Mapper con JUnit 5 + Mockito + AssertJ (ya
> incluidos vía `spring-boot-starter-test`, nada que instalar). Para una
> guía paso a paso de cómo leer, correr y escribir estos tests —
> pensada para quien nunca escribió uno — ver `docs/GUIA_TESTING.md`.

### Frontend

```bash
# Desde /ikernell-frontend
npm install                # Instalar dependencias
npm run typecheck          # Verificación estricta de TypeScript (tsc -b --noEmit)
npm run dev                # Servidor de desarrollo (Vite — puerto 5173)
npm run build               # Build de producción
npm run lint                # oxlint — ejecutar antes de dar una tarea por terminada
```

> **Nota:** el proyecto todavía no tiene un framework de tests en el frontend
> (no existe `npm test`). Está en el backlog de calidad — ver
> `docs/Ikernell v2.0/planning/`. No inventar ese script hasta que se
> incorpore Vitest o equivalente.

### Base de datos

```bash
# La app se conecta a PostgreSQL local
# Credenciales en ikernell-backend/src/main/resources/application.properties
# NUNCA modificar application.properties ni commitear credenciales reales
```

> **Antes de declarar una tarea completa:**
>
> 1. Compilar backend:
>    ./mvnw compile

> 2. Verificar tipos TypeScript:
>    npm run typecheck
>    (o npx tsc --noEmit si el script no existe)

> 3. Ejecutar lint:
>    npm run lint

> 4. Generar build del frontend:
>    npm run build

> 5. Solo si todos los pasos anteriores pasan sin errores,
>    considerar la tarea finalizada.

> 6. Si aparece cualquier error de compilación o tipado,
>    corregirlo antes de continuar con nuevas funcionalidades.

---

## Dominio del negocio

El sistema maneja tres roles de trabajadores con permisos diferenciados:

- **Coordinador de proyectos**: gestiona perfiles de trabajadores (registro, búsqueda,
  modificación, inhabilitación, foto, asignación a proyectos)
- **Líder de proyectos**: gestiona proyectos (registro, etapas, asignación de
  desarrolladores, actividades por desarrollador, reportes, inhabilitación)
- **Desarrollador**: ejecuta actividades, registra errores e interrupciones del proyecto

Visitantes anónimos (interesados) solo acceden a la sección pública: lineamientos,
portafolio, noticias, FAQ, links y contacto.

---

## Convenciones del código

### Backend (Java / Spring Boot)

- Seguimos **principios SOLID** — cada clase tiene una sola responsabilidad
- **Controladores delgados**: solo reciben la request, llaman al service, retornan `ResponseEntity`
- **Sin lógica de negocio en controladores ni repositorios**
- DTOs para todo lo que entra y sale de la API — no exponer entidades JPA directamente
- Manejo de excepciones centralizado con `@ControllerAdvice`
- Respuestas de error consistentes — siempre con código HTTP apropiado y mensaje legible
- Logging con SLF4J: `private static final Logger log = LoggerFactory.getLogger(...)`
- Nombres de clases en inglés; nombres de dominio de negocio pueden estar en español

### Frontend (React + TypeScript)

- Componentes funcionales con hooks — sin class components
- Tipado estricto:
  - No usar any salvo casos excepcionales documentados.
  - No devolver Promise<unknown> desde services.
  - Todas las funciones del directorio /services deben declarar explícitamente su tipo de retorno (Promise<T>).
  - Todas las llamadas a apiRequest deben utilizar el genérico correspondiente.
- Separar lógica de UI: llamadas HTTP van en `/services`, lógica reutilizable en hooks
- Un componente por archivo; nombres de componentes en PascalCase, hooks con prefijo `use`
- No duplicar llamadas HTTP — centralizarlas en `/services`

### Base de datos

- Nombres de tablas en snake_case y en singular (`usuario`, `proyecto`, `actividad`)
- Las migraciones de schema van con Flyway, en `ikernell-backend/src/main/resources/db/migration/`,
  como `V{n}__descripcion.sql` (ver `docs/Ikernell v2.0/architecture/06-base-de-datos.md`)
- No hacer cambios de schema directamente en la base de datos: siempre a través de una
  migración nueva -- `spring.jpa.hibernate.ddl-auto=validate` hace que el backend
  falle al arrancar si el schema real no coincide con las entidades JPA
- No ejecutar DROP sobre datos sin confirmación explícita

---

## Seguridad — reglas inamovibles

- **NUNCA** escribir credenciales reales en `application.properties`
- **NUNCA** commitear tokens, contraseñas, API keys ni secrets
- No modificar configuración de Spring Security sin autorización explícita
- No agregar dependencias en `pom.xml` o `package.json` sin avisar primero

---

## Política de visibilidad de datos de Usuario

La mayoría de los endpoints de lectura (proyectos, actividades, errores,
interrupciones, equipo de un proyecto, auditoría) están abiertos a
**cualquier autenticado**, no solo a Coordinador/Líder -- es una decisión
de diseño deliberada (cualquier miembro de un equipo puede necesitar ver
en qué proyecto/actividad está su compañero). Pero eso significa que
**cualquier dato de Usuario embebido en esas respuestas queda expuesto a
todos los roles**, incluido un Desarrollador consultando la lista de
proyectos de la organización.

Por eso existen dos niveles de detalle de Usuario en la API:

- **`UsuarioResponse`** (completo: incluye `numeroIdentificacion` y
  `fechaNacimiento`) -- únicamente en endpoints ya restringidos a
  Coordinador/Líder (`/api/usuarios/**`) o cuando el usuario consulta su
  **propio** perfil (`/api/usuarios/me`, login).
- **`UsuarioResumenResponse`** (`idUsuario`, `codigoUsuario`, `nombres`,
  `apellidos`, `correoElectronico`, `rol`) -- en **todo** lugar donde un
  usuario va embebido dentro de otro recurso: `Proyecto.liderActual`,
  `Actividad.usuario`, `RegistroError.usuarioCreador`,
  `Interrupcion.usuarioCreador`, `AsignacionProyecto.usuario`,
  `MensajeContacto.responsable`, `Trazabilidad.usuario`.

**Regla:** si agregas un nuevo campo a `Usuario`/`UsuarioResponse`, o un
DTO nuevo que embeba un usuario dentro de otro recurso, usa
`UsuarioResumenResponse` (o amplíalo si el campo nuevo es genuinamente
no sensible) -- no `UsuarioResponse` completo, salvo que el endpoint ya
esté restringido a Coordinador/Líder o sea el propio perfil del
solicitante.

---

## Qué hacer antes de proponer cambios

1. Leer los archivos relevantes antes de editarlos
2. Para refactorizaciones: describir qué va a cambiar y por qué antes de hacerlo
3. Para nuevas clases: respetar la estructura de paquetes existente
4. Para cambios de schema SQL: generar el script de migración correspondiente
5. Si hay ambigüedad sobre el comportamiento esperado: preguntar, no asumir

---

## Qué NO hacer

- No reescribir lógica que ya funciona sin razón justificada
- No cambiar nombres de endpoints de la API (puede romper el frontend)
- No borrar métodos aunque parezcan sin usar — pueden estar siendo llamados
- No agregar librerías sin verificar si ya hay algo equivalente en el proyecto
- No modificar archivos de seguridad o configuración de BD sin confirmación

---

## Notas operativas

- Proyecto en fase de pulimiento — **priorizar no romper lo que ya funciona**
- Supervisión humana en todos los cambios — proponer antes de ejecutar cuando sea ambiguo
- Trabajar en una branch de feature/fix — no tocar `main` directamente

## Refactorizaciones

- Después de cualquier refactor que afecte servicios, DTOs o tipos compartidos:
  - ejecutar ./mvnw compile
  - ejecutar npm run typecheck
  - ejecutar npm run build

- No asumir tipos devueltos por la API.

- Toda llamada a apiRequest<T>() debe especificar explícitamente el tipo
  genérico correspondiente.

  Correcto:

      apiRequest<Usuario[]>()

  Incorrecto:

      apiRequest()

- No utilizar any cuando exista un tipo del dominio.

- Si un endpoint cambia su respuesta, actualizar inmediatamente el tipo
  del service correspondiente.

  ***

# Overhaul IKernell v2

El proyecto se encuentra actualmente en un proceso de overhaul integral cuyo objetivo es mejorar la calidad técnica, la experiencia de usuario y la documentación sin alterar el alcance funcional principal del caso de estudio.

Todas las decisiones deberán alinearse con la documentación ubicada en:

architecture/
planning/

Especialmente:

- architecture/03-diseno-y-design-system.md
- architecture/05.5-arquitectura-del-dominio.md
- planning/00-checklist-overhaul.md
- planning/01-product-backlog.md

---

## Principios del Overhaul

Antes de implementar una nueva funcionalidad verificar siempre:

1. ¿Ya existe una solución reutilizable?

2. ¿Puede convertirse en un componente compartido?

3. ¿Respeta el Design System?

4. ¿Respeta el dominio del negocio?

5. ¿Existe una observación del profesor relacionada?

6. ¿Debe actualizarse la documentación?

---

## Prioridades

Orden obligatorio de trabajo:

1. Dominio
2. Base de Datos
3. Backend
4. Frontend
5. UX
6. Documentación

No modificar el Frontend si previamente no se ha validado el impacto sobre el dominio y el backend.

---

## Objetivo del proyecto

El propósito del overhaul NO es agregar la mayor cantidad posible de funcionalidades.

El objetivo es aumentar la calidad general del sistema mediante:

- mayor consistencia
- mejor arquitectura
- mejor experiencia de usuario
- mejor representación del dominio
- mayor reutilización
- documentación consistente

---

## Valor agregado aprobado

Durante el overhaul únicamente se desarrollarán dos funcionalidades adicionales:

- Auditoría Global
- Timeline del Proyecto

# NOTA

No agregar nuevas funcionalidades de valor agregado sin justificación.

Fuente de verdad del proyecto

architecture/

planning/

audit/

CODEX_CONTEXT.md

Toda propuesta deberá alinearse con esos documentos.
