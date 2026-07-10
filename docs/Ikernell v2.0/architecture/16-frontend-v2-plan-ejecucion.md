# 16. Frontend V2 — Plan de Ejecución

## Estado

**Versión:** 1.1
**Estado:** En ejecución — Fases 0 a 7 completas, siguiente: Fase 8 (Actividades)

---

# Contexto

Este documento aplica al frontend el mismo enfoque que ya usamos para el backend: **construir de abajo hacia arriba, un bloque a la vez, validando cada uno antes de seguir** — nunca todo de golpe.

**Decisión confirmada:** V1 no se reutiliza como código. Se reconstruye todo desde cero sobre el Design System nuevo.

---

# Fase 0 — Bootstrap del proyecto ✅ COMPLETA

- [x] Crear el proyecto real en `ikernell-frontend/` (Vite + React 19 + TypeScript + Tailwind v4)
- [x] Copiar del shell de Figma Make al proyecto real (tokens, ThemeContext, componentes UI)
- [x] Descartar del shell: `TokensPage`/`ComponentsPage`/`ExamplePage`
- [x] Instalar dependencias adicionales (`react-router-dom`, `lucide-react`)
- [x] Configurar `.env` con la URL base del backend (+ `.env.example` para otras máquinas)
- [x] Confirmar que `npm run dev` corre

---

# Fase 1 — Capa de servicios ✅ COMPLETA

- [x] `services/api.ts` — cliente HTTP base
- [x] `services/auth.ts` — login, logout, estado de sesión
- [x] `types/` — DTOs base (`ApiResponse`, `ApiError`, `Usuario`, `Auth`)
- [x] Confirmado con `POST /api/auth/login` real

---

# Fase 2 — Home público (landing) ✅ COMPLETA

- [x] Secciones: Navbar, Hero, StatsBar, Lineamientos, Servicios, Noticias, Links de Interés, FAQ+Contacto (combinados), Footer
- [x] Formulario de contacto conectado a `POST /api/mensajes-contacto`
- [x] Modal de login conectado a `POST /api/auth/login`
- [x] Responsive básico, toggle de tema funcional
- [x] `PageContainer` y `SectionWave` como componentes compartidos de la landing
- [x] Decisión registrada: landing usa tipografía en `px` explícitos y más "vida visual" que el dashboard (pendiente formalizar en `03-diseno-y-design-system.md`)

---

# Fase 3 — Autenticación y layout autenticado (EP-01) ✅ COMPLETA

- [x] `AuthContext` — sesión global, se refresca en login/logout/401
- [x] `ProtectedRoute` / `RoleRoute`
- [x] `DashboardLayout` (Sidebar + Topbar + Outlet)
- [x] Sidebar dinámico según rol (filtra Usuarios/Catálogos)
- [x] `GET /api/usuarios/me` conectado al cargar la app
- [x] Aviso visible de "sesión expirada" (antes era silencioso)
- [x] Fix de condición de carrera en login → dashboard

---

# Fase 4 — Catálogos (EP-03) ✅ COMPLETA

- [x] `features/catalogos/` — tabla + formulario reutilizable entre las 3 entidades (fábrica de servicio genérica)
- [x] Rol, Profesión, Especialidad (solo Coordinador)
- [x] Estado vacío, loading, manejo de error

---

# Fase 5 — Usuarios (EP-02) ✅ COMPLETA

- [x] Lista (Coordinador y Líder de Proyecto)
- [x] Crear / Editar (Coordinador) — correo y contraseña excluidos de edición
- [x] Validaciones: solo letras en nombres/apellidos, identificación solo dígitos (6-10), contraseña con complejidad, edad mínima 18, ciudad como `<select>`
- [x] Confirmar correo / confirmar contraseña con validación en vivo
- [x] Ojo de mostrar/ocultar contraseña (en el componente `Input` compartido, no por formulario)
- [x] Búsqueda, responsive

---

# Fase 6 — Proyectos y Asignaciones (EP-04) ✅ COMPLETA

- [x] Lista de proyectos + columna de Líder actual
- [x] Crear proyecto (Coordinador o Líder) + selector de líder inicial (solo Coordinador)
- [x] Detalle de proyecto (tabs: Etapas / Equipo)
- [x] Cambiar estado del proyecto
- [x] Gestión de equipo (asignar/desvincular), Coordinador excluido de la lista seleccionable
- [x] Regla de negocio: un solo Líder vigente por proyecto (reemplaza, no acumula) — implementada en backend

---

# Fase 7 — Etapas (EP-05) ✅ COMPLETA

- [x] CRUD de etapas dentro del detalle de un proyecto
- [x] Orden (campo numérico, siguiente valor sugerido automáticamente)
- [x] Cambio de estado inline (Select para Coordinador/Líder, Badge de solo lectura para los demás)
- [ ] Timeline visual (mencionado en el checklist original — pendiente, no bloqueante)

---

# Fase 8 — Actividades (EP-06) ⏳ SIGUIENTE

- [ ] CRUD dentro de una etapa
- [ ] Asignar desarrollador (selector de usuarios)
- [ ] Cambiar estado (el propio Desarrollador puede hacerlo — sin restricción de rol)
- [ ] Vista "mis actividades" para el Desarrollador logueado
- [ ] REGLA PENDIENTE DE BACKEND: bloquear cambio de estado si `proyecto.estado != 'En ejecución'`

---

# Fase 9 — Errores e Interrupciones (EP-07, EP-08)

- [ ] Registrar error (formulario simple: actividad + tipo + severidad + descripción)
- [ ] Historial de errores por actividad/proyecto
- [ ] Registrar interrupción
- [ ] Timeline de interrupciones

---

# Fase 10 — Mensajes de Contacto (EP-09)

- [ ] Bandeja de entrada (Coordinador)
- [ ] Responder mensaje
- [ ] Estados (Pendiente / Leído / Atendido)

---

# Fase 11 — Dashboard con KPIs (EP-10)

- [ ] Métricas por rol (reemplazar los ceros fijos de `DashboardHome`)
- [ ] Actividad reciente / feed
- [ ] Gráficas si aplica

---

# Fase 12 — Configuración (EP-11) y Reportes (EP-12)

- [ ] Vista de configuración/preferencias
- [ ] Cambio de contraseña propia (`PATCH /api/usuarios/me/contrasena`) — endpoint ya existe, frontend pendiente
- [ ] Botones de exportación (TXT/CSV/PDF/Excel)

---

# Fase 13 — Valor Agregado (EP-13) — únicamente lo aprobado

- [ ] Auditoría Global (`GET /api/trazabilidad`, Coordinador)
- [ ] Timeline del Proyecto

**No agregar ninguna otra funcionalidad sin aprobación explícita.**

---

# Fase 14 — Calidad, UX y Documentación (EP-14)

- [ ] Auditoría visual de consistencia
- [ ] Estados de carga y vacíos consistentes
- [ ] Confirmaciones en acciones destructivas
- [ ] Responsive: tablet y mobile
- [ ] Accesibilidad básica
- [ ] Actualizar HU/RF/Casos de Uso

---

# Validación final

- [ ] Cada pantalla probada con los 3 roles
- [ ] Ningún componente visual roto entre light/dark mode
- [ ] Repositorio limpio

---

# Pendientes sueltos detectados en el camino (no bloqueantes, no olvidar)

- [ ] Mirrorear en `UsuarioUpdateRequest.java` las mismas anotaciones de `UsuarioRequest.java` (`@Pattern` nombres/identificación, `@EdadMinima`)
- [ ] Aplicar el fix de una línea en `tools/frontend-audit/analyzers/coverageAnalyzer.js` (no descarta `?query` al comparar rutas)
- [ ] Confirmar con el usuario el alcance exacto de "solo el Coordinador puede cambiar quién es el líder de un proyecto" (¿ya cubierto con excluir a Coordinador del equipo, o se necesita separar el permiso de "gestionar equipo" vs "cambiar líder"?)
- [ ] Formalizar en `03-diseno-y-design-system.md` la distinción de estilo landing vs dashboard
