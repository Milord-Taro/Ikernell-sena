# AGENTS.md — Ikernell-sena

Sistema de gestión de proyectos de software para IKernell Soluciones Software.
Administra trabajadores (coordinadores, líderes y desarrolladores), proyectos,
etapas, actividades, errores e interrupciones. Incluye una sección pública
informativa para visitantes anónimos (portafolio, noticias, FAQ, contacto).

Monorepo con frontend React + TypeScript, backend Spring Boot y base de datos PostgreSQL.

---

## Estructura del proyecto

```
/home/milord-taro/Proyectos_Sena/Ikernell-sena/
├── ikernell-backend/
│   ├── src/main/java/com/ikernell/
│   │   ├── controller/   # Solo recibe request y delega — sin lógica de negocio
│   │   ├── service/      # Toda la lógica de negocio va aquí
│   │   ├── repository/   # Interfaces JPA — sin SQL manual salvo casos justificados
│   │   ├── model/        # Entidades JPA
│   │   └── dto/          # Objetos de transferencia de datos
│   └── pom.xml
│
├── ikernell-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/     # Llamadas HTTP al backend (axios / fetch)
│   │   └── hooks/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

El backend y el frontend están en el mismo repositorio Git y forman un solo
proyecto. Analizarlos conjuntamente cuando una tarea involucre cambios full-stack.

---

## Stack técnico

| Capa       | Tecnología                                         |
|------------|----------------------------------------------------|
| Frontend   | React 18.3.1 + TypeScript 5.8.2, Vite 6.3.5       |
| Backend    | Java 17.0.19 (OpenJDK), Spring Boot 4.1.0, Maven 3.9.12 |
| ORM        | Spring Data JPA                                    |
| Seguridad  | Spring Security                                    |
| Base datos | PostgreSQL 18.4 — schema: `public`                 |
| Runtime    | Node.js v22.22.1, npm 9.2.0                        |
| Control    | Git — monorepo en GitHub                           |

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

### Frontend
```bash
# Desde /ikernell-frontend
npm install                # Instalar dependencias
npm run typecheck     	  # Verificación estricta de TypeScript
npm run dev                # Servidor de desarrollo (Vite — puerto 5173)
npm run build              # Build de producción
npm run lint               # ESLint — ejecutar antes de dar una tarea por terminada
npm test                   # Tests unitarios
```

### Base de datos
```bash
# La app se conecta a PostgreSQL local
# Credenciales en ikernell-backend/src/main/resources/application.properties
# NUNCA modificar application.properties ni commitear credenciales reales
```

> **Antes de declarar una tarea completa:**
> 1. Compilar backend:
   ./mvnw compile

> 2. Verificar tipos TypeScript:
   npm run typecheck
   (o npx tsc --noEmit si el script no existe)

> 3. Ejecutar lint:
   npm run lint

> 4. Generar build del frontend:
   npm run build

> 5. Solo si todos los pasos anteriores pasan sin errores,
   considerar la tarea finalizada.

> 6. Si aparece cualquier error de compilación o tipado,
   corregirlo antes de continuar con nuevas funcionalidades.

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
- Nombres de tablas en snake_case y en plural (`trabajadores`, `proyectos`, `actividades`)
- Toda migración de schema va como script SQL numerado en el directorio de migraciones
- No hacer cambios de schema sin el script de migración correspondiente
- No ejecutar DROP sobre datos sin confirmación explícita

---

## Seguridad — reglas inamovibles

- **NUNCA** escribir credenciales reales en `application.properties`
- **NUNCA** commitear tokens, contraseñas, API keys ni secrets
- No modificar configuración de Spring Security sin autorización explícita
- No agregar dependencias en `pom.xml` o `package.json` sin avisar primero

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
- Trabajar en branch `codex/[nombre-tarea]` — no tocar `main` directamente
- Máquina de desarrollo: Ubuntu, usuario `milord-taro`

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
