# EP-01 — Autenticación y Control de Acceso

---

## Objetivo

Garantizar que únicamente los usuarios autorizados puedan acceder a IKernell, proporcionando mecanismos seguros para autenticación, autorización y administración de sesiones.

Esta épica constituye el punto de entrada al sistema y representa la primera barrera de seguridad de la aplicación.

---

## Problema que resuelve

Todo sistema que administra información sensible requiere verificar la identidad de los usuarios antes de permitir el acceso a sus funcionalidades.

Además del proceso de autenticación, el sistema debe garantizar que cada usuario únicamente pueda acceder a las funcionalidades correspondientes a su rol.

---

## Alcance

Esta épica comprende todos los procesos relacionados con:

- Inicio de sesión.
- Cierre de sesión.
- Validación de credenciales.
- Administración de sesión.
- Cambio de contraseña.
- Control de acceso por roles.
- Protección de rutas del frontend.
- Protección de endpoints del backend.

No incluye la administración de usuarios, la cual pertenece a la Épica de Gestión de Usuarios.

---

## Actores involucrados

- Coordinador.
- Líder de Proyecto.
- Desarrollador.

---

# Features

## EP01-F01

Inicio de sesión.

---

## EP01-F02

Validación de credenciales.

---

## EP01-F03

Generación de sesión autenticada.

---

## EP01-F04

Protección de rutas privadas.

---

## EP01-F05

Control de acceso por roles.

---

## EP01-F06

Cambio de contraseña.

---

## EP01-F07

Cerrar sesión.

---

## EP01-F08

Expiración de sesión.

(En análisis.)

---

## EP01-F09

Recordar sesión.

(En análisis.)

---

## EP01-F10

Registro de accesos para auditoría.

(Valor agregado.)

---

## Historias de Usuario relacionadas

Se asociarán las historias correspondientes al módulo de autenticación.

---

## Requerimientos relacionados

### Funcionales

- Autenticar usuarios.
- Validar credenciales.
- Autorizar acceso según el rol.

### No Funcionales

- Seguridad.
- Disponibilidad.
- Integridad.

---

## Casos de Uso

- Iniciar sesión.
- Cambiar contraseña.
- Cerrar sesión.

---

## Entidades involucradas

- Usuario.
- Rol.

---

## Reglas del negocio

- Solo usuarios activos podrán iniciar sesión.
- Cada usuario deberá autenticarse utilizando sus credenciales.
- El sistema restringirá el acceso según el rol asignado.
- Toda autenticación fallida deberá registrarse cuando el sistema de auditoría se encuentre disponible.

---

## Dependencias

No requiere otras épicas funcionales.

Representa el punto de entrada del sistema.

---

## Criterios de aceptación

- El usuario puede autenticarse correctamente.
- Las credenciales inválidas son rechazadas.
- Las rutas protegidas no son accesibles sin autenticación.
- Los permisos funcionan según el rol.
- El cierre de sesión elimina la sesión activa.

---

## Impacto Técnico

### Backend

- Security.
- Usuario.
- Rol.

### Frontend

- Login.
- ProtectedRoute.
- RoleRoute.

### Base de Datos

- Usuario.
- Rol.

### Documentación

- HU.
- RF.
- Casos de Uso.
- Manual Técnico.
- Manual Usuario.

---

## Riesgos

- Errores de autorización.
- Exposición de rutas privadas.
- Manejo incorrecto de sesiones.

---

## Prioridad

P0

---

## Estado

Pendiente.
