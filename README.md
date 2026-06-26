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

```bash
git clone https://github.com/Milord-Taro/Ikernell-sena.git
```

---

# Restaurar la base de datos

Dentro del proyecto se encuentra la carpeta:

```
ikernell-DB
```

Allí se incluye el archivo:

```
ikernell_solutions-actual-25062026.sql
```

Importe dicho archivo en PostgreSQL.

Posteriormente configure el archivo:

```
ikernell-backend/src/main/resources/application.properties
```

Ejemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ikernell_solutions
spring.datasource.username=postgres
spring.datasource.password=TU_PASSWORD
```

Reemplace **TU_PASSWORD** por la contraseña configurada en su instalación local de PostgreSQL.

---

# Ejecutar Backend

Abrir la carpeta

```
ikernell-backend
```

en IntelliJ IDEA.

Ejecutar la clase principal:

```
IkernellBackendApplication.java
```

El backend iniciará en:

```
http://localhost:8080
```

---

# Ejecutar Frontend

Abrir una terminal dentro de:

```
ikernell-frontend
```

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

## Coordinador

Correo

```
test@test.com
```

Contraseña

```
Testing2026*
```

---

## Líder

Correo

```
diana.herrera@ikernell.com
```

Contraseña

```
test
```

---

## Desarrollador

Correo

```
testbcrypt@ikernell.com
```

Contraseña

```
test
```

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

# Carpeta ikernell-DB

La carpeta contiene:

- Backup completo de la base de datos.
- Scripts DDL.
- Scripts DML.
- Consultas SQL.
- Modelo Entidad Relación (MER).
- Modelo Relacional.

---

# Documentación

La documentación completa del proyecto se encuentra disponible en:

https://drive.google.com/drive/folders/1OnvTFJ1jugodW-5ikjnausxOfQSWGa_T

Incluye:

- Documentación técnica.
- Diagramas.
- Casos de uso.
- Manuales.
- Modelo de base de datos.
- Evidencias del proyecto.
