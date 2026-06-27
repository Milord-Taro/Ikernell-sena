# Politica de usuarios y credenciales

Este documento registra las reglas de negocio recomendadas para la gestion de cuentas de trabajador en Ikernell-sena.

## Principios

- El correo electronico identifica la cuenta del trabajador.
- La contrasena es una credencial personal y no debe ser modificada por un coordinador desde la edicion general del perfil.
- La inhabilitacion conserva trazabilidad historica y evita borrar registros relacionados con proyectos, actividades, errores o interrupciones.

## Creacion de usuario

El coordinador puede crear trabajadores con:

- Datos personales.
- Datos profesionales.
- Rol asignable: Lider o Desarrollador.
- Correo inicial.
- Contrasena inicial temporal o entregada al trabajador.

No se permite crear otro usuario con rol Coordinador desde frontend ni backend.

## Edicion de usuario

El coordinador puede modificar:

- Nombre y apellido.
- Direccion.
- Tipo y numero de identificacion.
- Fecha de nacimiento.
- Rol asignable.
- Profesion.
- Especialidad.
- Foto/estado cuando aplique.

El coordinador no debe modificar:

- Correo electronico.
- Contrasena.
- Rol Coordinador.

Si el correo fue registrado incorrectamente, el flujo recomendado es:

1. Inhabilitar el usuario incorrecto.
2. Crear un nuevo usuario con el correo correcto.
3. Solicitar a IT o administracion de base de datos la revision/eliminacion solo si la politica institucional lo permite.

## Cambio de contrasena

El trabajador cambia su propia contrasena desde configuracion, usando:

- Contrasena actual.
- Nueva contrasena.
- Confirmacion de nueva contrasena.

Esto evita que el coordinador conozca o reemplace credenciales personales despues de entregar la cuenta.

## Pendiente futuro

Para un sistema productivo conviene agregar:

- Flujo de restablecimiento de contrasena por correo.
- Registro de auditoria para cambios sensibles.
- Permisos backend por rol.
- Politica formal para correccion de correo institucional.
