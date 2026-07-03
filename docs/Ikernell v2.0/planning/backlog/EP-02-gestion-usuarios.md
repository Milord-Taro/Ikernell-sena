# EP-02 — Gestión de Usuarios

---

## Objetivo

Administrar el ciclo de vida completo de los usuarios dentro de IKernell, permitiendo su creación, consulta, actualización, activación, desactivación y administración de la información necesaria para participar en los proyectos del sistema.

Esta épica garantiza que el sistema disponga de información consistente sobre cada integrante de la organización y constituye la base para la asignación de responsabilidades dentro del dominio.

---

## Problema que resuelve

Todo proyecto requiere administrar correctamente las personas que participan en él.

El sistema debe permitir registrar usuarios, mantener actualizada su información y controlar su disponibilidad para participar en proyectos y actividades.

Actualmente el módulo cumple parcialmente estas necesidades, existiendo oportunidades para mejorar la experiencia de administración, validaciones, consistencia visual y organización del dominio.

---

## Alcance

Comprende toda la administración de usuarios del sistema.

Incluye:

- Registro de usuarios.
- Consulta.
- Edición.
- Eliminación lógica.
- Estados.
- Perfil.
- Información personal.
- Relación con profesión.
- Relación con especialidad.
- Relación con rol.
- Participación en proyectos.

No incluye autenticación, la cual pertenece a la Épica EP-01.

---

## Actores involucrados

### Coordinador

Administración completa de usuarios.

### Líder

Consulta de integrantes de proyectos.

### Desarrollador

Consulta y actualización de su perfil cuando corresponda.

---

# Features

## EP02-F01

Consultar usuarios.

---

## EP02-F02

Crear usuario.

---

## EP02-F03

Editar usuario.

---

## EP02-F04

Desactivar usuario.

---

## EP02-F05

Consultar detalle del usuario.

---

## EP02-F06

Administrar perfil.

---

## EP02-F07

Cambiar información personal.

---

## EP02-F08

Asignar rol.

---

## EP02-F09

Asignar profesión.

---

## EP02-F10

Asignar especialidad.

---

## EP02-F11

Buscar usuarios.

---

## EP02-F12

Filtrar usuarios.

---

## EP02-F13

Ordenar usuarios.

---

## EP02-F14

Validaciones del formulario.

---

## EP02-F15

Auditoría de modificaciones.

(Valor agregado.)

---

## Historias de Usuario relacionadas

Se asociarán las HU correspondientes a la administración de usuarios.

---

## Requerimientos relacionados

### Funcionales

- Registrar usuarios.
- Modificar usuarios.
- Consultar usuarios.
- Administrar estado.

### No Funcionales

- Seguridad.
- Usabilidad.
- Integridad.

---

## Casos de Uso

- Crear usuario.
- Modificar usuario.
- Consultar usuario.
- Desactivar usuario.

---

## Entidades involucradas

- Usuario
- Rol
- Profesión
- Especialidad
- AsignacionProyecto

---

## Reglas del negocio

- Todo usuario deberá tener un rol válido.
- Todo correo deberá ser único.
- El documento de identidad deberá ser único.
- No podrán existir usuarios duplicados.
- Solo el Coordinador podrá administrar usuarios.
- Los usuarios inactivos no podrán iniciar sesión.

---

## Dependencias

EP-01 Autenticación y Control de Acceso.

---

## Criterios de aceptación

- Crear usuarios correctamente.
- Editar usuarios.
- Validar duplicados.
- Consultar usuarios.
- Filtrar usuarios.
- Buscar usuarios.
- Mantener consistencia de relaciones.

---

## Impacto Técnico

### Backend

- Usuario
- DTO
- Service
- Controller
- Repository

### Frontend

- UsuariosPage
- UsuarioNuevoPage
- UsuarioEditarPage
- UsuarioDetallePage
- UserCard

### Base de Datos

- Usuario
- Rol
- Profesión
- Especialidad

### Documentación

- HU
- RF
- Casos de Uso
- Manual Técnico
- Manual Usuario

---

## Implementación Actual

### Backend

- CRUD básico implementado.
- DTO implementados.
- Mapper implementado.

### Frontend

- Lista de usuarios.
- Crear usuario.
- Editar usuario.
- Detalle.
- Integración con API.

### Mejoras previstas

- Mejorar experiencia de usuario.
- Mejorar validaciones.
- Mejorar búsqueda.
- Estandarizar formularios.
- Aplicar Design System.
- Integrar auditoría.

---

## Riesgos

- Inconsistencia de datos.
- Usuarios duplicados.
- Relaciones incorrectas.
- Validaciones insuficientes.

---

## Prioridad

P0

---

## Estado

Pendiente.
