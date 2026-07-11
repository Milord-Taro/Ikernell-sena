# IKernell Soluciones

Sistema web para la gestión de proyectos de desarrollo de software desarrollado como proyecto formativo del SENA.

---

# Tecnologías utilizadas

## Backend

- Java 17
- Spring Boot 4
- Spring Data JPA
- PostgreSQL

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

---

# Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

- Java 17
- PostgreSQL 18
- Node.js v22
- npm
- Git

---

# Clonar el repositorio

## Clonar la versión estable (`main`)

```bash
git clone https://github.com/Milord-Taro/Ikernell-sena.git
cd Ikernell-sena
```

---

## Clonar la rama con el desarrollo más reciente (`refactor-prueba`)

```bash
git clone --branch refactor-prueba --single-branch https://github.com/Milord-Taro/Ikernell-sena.git
cd Ikernell-sena
```

> **Nota:** La rama `refactor-prueba` contiene la versión más reciente del proyecto con mejoras y refactorizaciones que aún no han sido fusionadas a `main`.
---

# Restaurar la base de datos

1. Crea una base de datos vacía en PostgreSQL, por ejemplo `ikernell_solutions` (o `ikernell_v2`, ver nota de perfiles más abajo).

2. Ejecuta el script de esquema consolidado (crea tablas, restricciones y demás):

   ```
   docs/Base de datos/Base de Datos V2/ikernell_v2_FINAL.sql
   ```

   (Hay una copia idéntica en `ikernell-backend/schema.sql`, pensada para las herramientas de auditoría del backend — puedes usar cualquiera de las dos, son el mismo archivo.)

3. Carga los datos base de catálogos (roles, profesiones, especialidades, tipos de error, tipos de interrupción):

   ```
   docs/Base de datos/Base de Datos V2/Seed_catalogos.sql
   ```

> **Nota:** la carpeta `docs/Base de datos/DB Legacy/` contiene el esquema y los scripts de una versión anterior del caso de estudio (SENA 2017). No la uses para levantar el sistema actual — solo se conserva como referencia histórica.

---

# Configurar el backend

El proyecto usa variables de entorno para evitar credenciales reales en Git. La configuración vive en:

```
ikernell-backend/src/main/resources/application.properties        # base, común a todos los perfiles
ikernell-backend/src/main/resources/application-dev.properties     # perfil por defecto (desarrollo local)
ikernell-backend/src/main/resources/application-prod.properties    # producción, todo por variable de entorno
```

El perfil activo se controla con `SPRING_PROFILES_ACTIVE` (por defecto `dev`, no requiere configurarlo para desarrollo local).

**Variables de entorno relevantes** (todas tienen valor por defecto en el perfil `dev`, excepto en `prod` donde son obligatorias):

| Variable | Uso | Valor por defecto en `dev` |
|---|---|---|
| `DB_USERNAME` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | `postgres` |
| `DB_URL` | URL JDBC completa (solo se usa en `prod`; en `dev` la URL ya está fija a `ikernell_v2`) | — |
| `JWT_SECRET` | Secreto para firmar los tokens JWT | secreto de desarrollo embebido (**cámbialo en producción**, en `prod` la app falla al arrancar si falta) |
| `JWT_EXPIRATION_MS` | Duración de la sesión en milisegundos | `1800000` (30 minutos) |

Opción recomendada para trabajar en casa/oficina, si tu instalación local de PostgreSQL usa otro usuario, contraseña o nombre de base de datos distinto al de arriba:

1. Crea `ikernell-backend/application-local.properties` (puedes partir de `ikernell-backend/application-local.properties.example`).
2. Coloca allí solo los valores que necesites sobreescribir para tu máquina.
3. Este archivo ya está ignorado por Git — nunca se sube.

Ejemplo:

```properties
DB_USERNAME=postgres
DB_PASSWORD=TU_PASSWORD
spring.datasource.url=jdbc:postgresql://localhost:5432/ikernell_v2
```

---

# Ejecutar Backend

**Opción 1 — IntelliJ IDEA:**

Abrir la carpeta `ikernell-backend` en IntelliJ IDEA y ejecutar la clase principal `IkernellBackendApplication.java`.

**Opción 2 — línea de comandos (sin IDE), usando el wrapper de Maven incluido:**

```bash
cd ikernell-backend
./mvnw spring-boot:run
```

En ambos casos el backend iniciará en:

```
http://localhost:8080
```

---

# Ejecutar Frontend

Abrir una terminal dentro de:

```
ikernell-frontend
```

Configura las variables de entorno (solo la primera vez, o si cambian):

```bash
cp .env.example .env
```

Por defecto `VITE_API_URL=http://localhost:8080/api` ya apunta al backend levantado con los pasos anteriores; ajústalo en `.env` solo si tu backend corre en otro host o puerto. El archivo `.env` está ignorado por Git.

Ejecutar:

```bash
npm install

npm run dev
```

El frontend iniciará en:

```
http://localhost:5173
```

---

# Usuarios de prueba

Los usuarios de prueba se crean al ejecutar `Seed_catalogos.sql` (ver "Restaurar la base de datos" arriba). Todos comparten la misma contraseña de prueba:

Contraseña (todos)

```
test
```

## Coordinador

```
ana.martinez@ikernell.com
```

Hay un segundo coordinador disponible: `natalia.herrera@ikernell.com` (misma contraseña).

---

## Líder

```
carlos.rodriguez@ikernell.com
```

---

## Desarrollador

```
juan.perez@ikernell.com
```

---

> **Nota:** `Seed_catalogos.sql` también crea `mateo.salinas@ikernell.com` (rol Desarrollador) ya **inhabilitado** (`activo = false`), útil para probar el rechazo de login de cuentas inactivas.

---

# Roles implementados

- Coordinador
- Líder
- Desarrollador

---

# Funcionalidades implementadas

- Inicio de sesión
- Gestión de usuarios
- Gestión de proyectos
- Gestión de etapas
- Gestión de actividades
- Gestión de errores
- Gestión de interrupciones
- Gestión de mensajes
- Gestión de tipos de error
- Gestión de tipos de interrupción
- Panel principal con Dashboard

---

# Documentación de base de datos

```
docs/Base de datos/
```

Contiene:

- `Base de Datos V2/`: esquema consolidado (`ikernell_v2_FINAL.sql`), seed de catálogos (`Seed_catalogos.sql`), consultas de verificación y el Modelo Entidad-Relación (MER) vigente. Es la versión que usa el sistema actual — ver "Restaurar la base de datos" arriba.
- `DB Legacy/`: esquema, DDL/DML y modelo relacional del caso de estudio original (SENA 2017). Solo como referencia histórica, no se usa para levantar el sistema actual.

---

# Documentación

La documentación académica y técnica del proyecto está organizada en:

```
docs/
```

Índice principal:

```
docs/README.md
```

Allí se encuentran historias de usuario, requerimientos, casos de uso,
diagramas, documentación de base de datos, Gantt, matriz HU/RF y TODO final.

La carpeta de Google Drive se conserva como respaldo y para evidencias pesadas:

https://drive.google.com/drive/folders/1OnvTFJ1jugodW-5ikjnausxOfQSWGa_T

Incluye:

- Documentación técnica.
- Diagramas.
- Casos de uso.
- Manuales.
- Modelo de base de datos.
- Evidencias del proyecto.
