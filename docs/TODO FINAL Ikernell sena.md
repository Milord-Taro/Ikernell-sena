# TODO FINAL Ikernell-sena

## MUY URGENTE

- [x] Limpiar credenciales reales del proyecto.
  - Sacar contraseña de `ikernell-backend/src/main/resources/application.properties`.
  - Crear `application.properties.example`.
  - Usar variables de entorno o `application-local.properties` ignorado por Git.
  - Rotar la contraseña si ya fue subida al repositorio.

- [x] Crear índice principal de documentación en `docs/README.md`.
  - Explicar qué contiene cada carpeta.
  - Enlazar HU, requerimientos, casos de uso, diagramas, BD y Gantt.
  - Marcar documentos como: actualizado, parcial o pendiente de actualizar.

- [x] Crear matriz HU/RF contra implementación real.
  - HU-01 / RF-001: portal público.
  - HU-02 / RF-002: formulario de contacto.
  - HU-03 / RF-003: login.
  - HU-04 / RF-004: servicios internos.
  - HU-05 / RF-005: usuarios/desarrolladores.
  - HU-06 / RF-006: reporte de desempeño.
  - HU-07 / RF-007: proyectos.
  - HU-08 / RF-008: etapas.
  - HU-09 / RF-009: actividades.
  - HU-10 / RF-010: reportes de proyecto.
  - HU-11 / RF-011: ejecución de actividades.
  - HU-12 / RF-012: errores.
  - HU-13 / RF-013: interrupciones.
  - HU-14 / RF-014: mensajes de contacto.

- [x] Bloquear reglas críticas también en backend.
  - No permitir crear otro Coordinador desde API.
  - No permitir cambiar un usuario a rol Coordinador desde API.
  - No permitir inhabilitar Coordinadores.

- [x] Corregir respuestas `null` en controladores/servicios.
  - Usar `404 Not Found` si no existe.
  - Usar `400 Bad Request` para validaciones.
  - Evitar respuestas ambiguas al frontend.

## URGENTE

- [x] Actualizar documentación desalineada.
  - HU-14: aclarar si el sistema solo guarda respuesta o si enviará correo real.
  - HU-04: confirmar si correo/chat/biblioteca/tutoriales serán módulos reales o links externos.
  - RF-007: revisar si asignación de desarrolladores a proyecto está completamente implementada.
  - RF-010: confirmar alcance real de reportes y archivo plano para empresa aliada brasileña.

- [x] Crear matriz de roles y permisos.
  - Visitante.
  - Coordinador.
  - Líder.
  - Desarrollador.
  - Qué puede ver, crear, editar, inhabilitar y reportar.

- [x] Centralizar URL base del backend en frontend.
  - Crear helper central para construir URLs de API.
  - Crear `.env.example` con `VITE_API_URL=http://localhost:8080`.
  - Eliminar URLs hardcodeadas.

- [x] Unificar manejo de errores HTTP del frontend.
  - Crear `apiClient.ts` o evolucionar el helper actual.
  - Manejar errores HTTP de forma uniforme.

- [x] Mejorar autenticación básica y documentar limitación actual.
  - Login con errores claros.
  - Preparar token/sesión real o documentar limitación académica.

- [ ] Implementar permisos backend por rol.
  - Proteger endpoints de usuarios, proyectos, mensajes e informes.
  - Requiere definir autenticación real antes de aplicarlo de forma segura.
  - No depender solo de `RoleRoute` en frontend.

- [ ] Implementar autenticación real.
  - No depender solo de `localStorage`.
  - Definir JWT o sesión backend.
  - Integrar con permisos backend por rol.

- [x] Crear DTOs iniciales de respuesta.
  - `UsuarioResponse`.
  - `LoginResponse`.
  - `MensajeContactoResponse`.
  - Evitar exponer entidades JPA directamente.

- [ ] Crear DTOs de entrada.
  - `UsuarioRequest`.
  - `MensajeContactoRequest`.
  - Ajustar formularios y controladores gradualmente.

- [x] Definir política de edición de usuarios.
  - El coordinador no cambia correo desde edición de usuario.
  - El coordinador no cambia contraseña desde edición de usuario.
  - El trabajador cambia su propia contraseña desde configuración.
  - Si el correo fue creado mal, se inhabilita la cuenta y se crea una nueva.

## ALTA PRIORIDAD

- [ ] Crear checklist de entrega SENA.
  - Backend compila.
  - Frontend construye.
  - BD restaura.
  - Login funciona.
  - Roles funcionan.
  - CRUDs principales funcionan.
  - Documentación enlazada.
  - Evidencias disponibles.

- [ ] Ordenar documentación de BD.
  - Confirmar que `docs/Base de datos/DDL`, `DML`, `Consultas` y modelo relacional coinciden con la BD actual.
  - Separar script inicial, datos de prueba y backup.
  - Documentar orden de restauración.

- [ ] Mejorar módulo de mensajes.
  - Incluir filtro `Leído` si se mantiene ese estado.
  - Usar endpoint `/leer` al abrir mensaje o quitarlo si no se usará.
  - Registrar responsable al atender mensaje.
  - Decidir si se implementa JavaMailSender o se documenta como pendiente.

- [ ] Mejorar UX de usuarios.
  - Ya iniciado: filtro Activos/Inhabilitados/Todos.
  - Ya iniciado: ocultar Coordinador en select.
  - Falta: ocultar botón de inhabilitar para Coordinadores.
  - Falta: contadores por estado.

- [ ] Agregar validaciones backend equivalentes al frontend.
  - Usuarios.
  - Proyectos.
  - Actividades.
  - Errores.
  - Interrupciones.
  - Mensajes.

## MEDIA PRIORIDAD

- [ ] Crear pruebas backend mínimas.
  - Login correcto/incorrecto.
  - Crear usuario.
  - Evitar correo duplicado.
  - Evitar crear Coordinador.
  - Inhabilitar/habilitar usuario.
  - No inhabilitar Coordinador.
  - Crear proyecto.
  - Registrar error/interrupción.

- [ ] Reducir `any` en frontend.
  - Servicios.
  - Dashboard.
  - Informes.
  - Mensajes.
  - Formularios de errores/interrupciones.

- [ ] Separar validaciones repetidas.
  - Crear helper/hook para validaciones de usuario.
  - Reutilizar en crear y editar.
  - Evitar duplicación de reglas.

- [ ] Revisar rutas.
  - Eliminar ruta duplicada `/dashboard/usuarios/nuevo`.
  - Limpiar `App.tsx`.
  - Agrupar rutas por módulo si conviene.

- [ ] Mejorar README principal.
  - Explicar contexto SENA.
  - Explicar estructura real del repo.
  - Agregar instalación Ubuntu casa/oficina.
  - Quitar credenciales.
  - Enlazar `docs/README.md`.

## BAJA PRIORIDAD / PULIMIENTO

- [ ] Agregar lint frontend.
  - Definir ESLint.
  - Crear `npm run lint`.
  - Corregir progresivamente.

- [ ] Optimizar bundle frontend.
  - Revisar aviso de Vite por chunk mayor a 500 kB.
  - Aplicar lazy loading en páginas grandes.

- [ ] Unificar estilos.
  - Reducir mezcla de inline styles, Tailwind y CSS.
  - Mantener dashboard consistente.
  - Revisar responsive.

- [ ] Mejorar estados vacíos y cargas.
  - Usuarios sin resultados.
  - Proyectos vacíos.
  - Actividades vacías.
  - Mensajes vacíos.
  - Skeletons o loaders más pulidos.

- [ ] Crear evidencias.
  - Capturas por HU.
  - Capturas por rol.
  - Capturas de BD.
  - Capturas de build/compile exitosos.

## FLUJO RECOMENDADO

1. Credenciales y configuración segura.
2. `docs/README.md` + matriz HU/RF.
3. Reglas críticas backend.
4. Cliente HTTP centralizado.
5. DTOs de usuarios/auth.
6. Mensajes HU-14: cerrar alcance real.
7. Validaciones backend.
8. Tests mínimos.
9. Limpieza frontend.
10. Evidencias y pulimiento.
