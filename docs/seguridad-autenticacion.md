# Seguridad y autenticacion

Este documento describe el estado actual de autenticacion y seguridad del aplicativo Ikernell-sena, junto con el camino recomendado para evolucionarlo.

## Estado actual

- El login valida correo y contrasena contra la base de datos.
- Las contrasenas se comparan usando BCrypt en backend.
- Si las credenciales son incorrectas, backend responde `401 Unauthorized`.
- El frontend guarda el usuario autenticado en `localStorage`.
- Las rutas del dashboard se protegen en frontend con `ProtectedRoute` y `RoleRoute`.
- Algunas reglas criticas ya se validan en backend:
  - No crear usuarios con rol `Coordinador`.
  - No cambiar usuarios existentes a rol `Coordinador`.
  - No inhabilitar usuarios con rol `Coordinador`.

## Limitaciones actuales

- No hay token JWT ni sesion backend formal.
- Los permisos por rol existen principalmente en frontend.
- Un usuario podria llamar endpoints directamente si conoce las rutas.
- No todos los endpoints validan permisos de Coordinador, Lider o Desarrollador desde backend.
- La API devuelve entidades JPA en varios endpoints; esto debe migrarse gradualmente a DTOs.

## Decision para la version academica actual

Para no romper flujos ya funcionales durante la etapa de pulimiento, la seguridad completa se deja como mejora urgente planificada. La version actual debe presentarse como:

- Autenticacion funcional basica.
- Control visual de acceso por rol en frontend.
- Reglas criticas de usuarios reforzadas en backend.
- Seguridad backend completa pendiente de implementacion.

## Camino recomendado

1. Crear DTOs de autenticacion:
   - `LoginRequest`
   - `LoginResponse`
   - `UsuarioResponse`
2. Definir mecanismo de autenticacion:
   - JWT, o
   - sesion backend, o
   - alcance academico documentado sin seguridad productiva.
3. Activar Spring Security de forma controlada.
4. Proteger endpoints por rol:
   - usuarios y mensajes: Coordinador.
   - proyectos, etapas y actividades: Lider.
   - ejecucion de actividades, errores e interrupciones: Desarrollador.
5. Agregar pruebas para permisos criticos.

## Riesgo si no se implementa

El sistema puede funcionar para demostracion local y flujo academico, pero no debe presentarse como listo para produccion mientras los permisos backend no esten protegidos con autenticacion real.
