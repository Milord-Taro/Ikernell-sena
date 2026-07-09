# 16. Frontend V2 — Plan de Ejecución

## Estado

**Versión:** 1.0
**Estado:** Planeación aprobada

---

# Contexto

Este documento aplica al frontend el mismo enfoque que ya usamos para el backend: **construir de abajo hacia arriba, un bloque a la vez, validando cada uno antes de seguir** — nunca todo de golpe.

Sigue el orden ya definido en tus propios documentos:
- `08-roadmap.md` → Fase 4 (Design System) antes de Fase 5 (Frontend).
- `04-arquitectura-frontend.md` → dependencia `UI → Shared → Features → Layouts → Pages`.
- `00-checklist-overhaul.md` → EP-01 a EP-14 como alcance funcional.

**Decisión confirmada:** V1 no se reutiliza como código. Se reconstruye todo desde cero sobre el Design System nuevo. El código de V1 solo se consulta como referencia puntual de contenido/copy cuando haga falta (ej. textos del home), nunca se copia su implementación.

**Decisión confirmada:** el shell generado por Figma Make (`Design_System_Foundation.zip`) se integra directo al proyecto real — no queda como sandbox aparte.

---

# Fase 0 — Bootstrap del proyecto

- [ X] Crear el proyecto real en `ikernell-frontend/` (Vite + React 19 + TypeScript + Tailwind v4), si no existe ya.
- [ X] Copiar del shell de Figma Make al proyecto real:
  - [ X] `src/index.css` (tokens + tipografía)
  - [ X] `src/context/ThemeContext.tsx` (toggle light/dark)
  - [ X] `src/components/ui/*` (Button, Card, FormControls, Badge, Table, DataDisplay, Feedback, Modal)
  - [ X] `src/components/layout/*` (Topbar, Sidebar, Navigation) — se ajustan en Fase 3, no se usan tal cual todavía
- [ X] Descartar del shell: `TokensPage.tsx`, `ComponentsPage.tsx`, `ExamplePage.tsx` (eran solo la vitrina de Figma, no vistas reales)
- [ X] Instalar dependencias adicionales necesarias: `react-router-dom`, cliente HTTP (fetch nativo o axios — decidir), manejo de formularios (decidir: react-hook-form o controlado a mano)
- [ X] Configurar `.env` con la URL base del backend (`VITE_API_URL`)
- [ X] Confirmar que `npm run dev` corre y se ve el toggle de tema funcionando

---

# Fase 1 — Capa de servicios (conexión con el backend)

> Antes de cualquier pantalla, la app necesita poder hablar con la API que ya construimos.

- [ X] `services/api.ts` — cliente HTTP base (maneja `Authorization: Bearer`, parsea `ApiResponse`/`ApiError`, maneja 401 global)
- [ X] `services/auth.ts` — login, logout, guardar/leer JWT
- [ X] `types/` — interfaces TypeScript que reflejen los DTOs reales del backend (`UsuarioResponse`, `ProyectoResponse`, etc.)
- [ X] Confirmar con un `POST /api/auth/login` real desde el navegador (no Postman) que la conexión funciona

---

# Fase 2 — Home público (landing, sin autenticación)

> RF-001 del caso de estudio: información empresarial visible para cualquier anónimo. Es la pantalla más simple y ejercita casi todos los componentes UI base de una vez.

- [ X] `layouts/LandingLayout.tsx`
- [ X] Secciones (contenido/estructura de referencia: V1, estilos: Design System nuevo):
  - [ X] Navbar (con botón "Iniciar sesión")
  - [ X] Hero
  - [ X] Lineamientos (misión/visión/valores)
  - [ X] Servicios / Portafolio
  - [ X] Noticias
  - [ X] Links de interés
  - [ X] FAQ
  - [ X] Formulario de contacto → conecta a `POST /api/mensajes-contacto` (público, ya existe en backend)
  - [ X] Footer
- [ X] Modal/página de login accesible desde el Navbar
- [ X] Responsive básico (desktop primero, según tu Design System)
- [ X] Toggle de tema visible y funcional en esta pantalla

---

# Fase 3 — Autenticación y layout autenticado (EP-01)

- [ X] Página o modal de Login → `POST /api/auth/login`, guarda JWT
- [ X] Logout
- [ X] `ProtectedRoute` (requiere sesión válida)
- [ X] `RoleRoute` (requiere rol específico — Coordinador / Líder de Proyecto / Desarrollador)
- [ X] `DashboardLayout` real (Sidebar + Topbar + área de contenido), adaptando el `Sidebar`/`Topbar`/`Navigation` del shell de Figma Make
- [ X] Sidebar dinámico según rol del usuario logueado (ej. Desarrollador no ve "Usuarios")
- [ X] Endpoint "quién soy" (`GET /api/usuarios/me`) conectado al cargar la app, para poblar el estado de sesión tras un refresh

---

# Fase 4 — Catálogos (EP-03): Roles, Profesiones, Especialidades

> Primer CRUD real. Sirve de plantilla para el resto (mismo patrón: tabla + crear + editar + activar/desactivar).

- [ ] `features/catalogos/` — tabla + formulario reutilizable entre las 3 entidades
- [ ] Rol (solo Coordinador)
- [ ] Profesión (solo Coordinador)
- [ ] Especialidad (solo Coordinador) — recordar que existe el registro semilla "No aplica"
- [ ] Estado vacío, loading, manejo de error de cada tabla

---

# Fase 5 — Usuarios (EP-02)

- [ ] Lista (Coordinador y Líder de Proyecto, según backend)
- [ ] Crear (Coordinador) — selects de Rol/Profesión/Especialidad ya construidos en Fase 4
- [ ] Editar (Coordinador) — recordar: sin campo de correo ni contraseña en este formulario
- [ ] Detalle / perfil individual (abierto a cualquier autenticado)
- [ ] Activar/Desactivar
- [ ] "Mi perfil" (`/me`) + cambio de contraseña propia
- [ ] Búsqueda, filtros, responsive

---

# Fase 6 — Proyectos y Asignaciones (EP-04)

- [ ] Lista de proyectos
- [ ] Crear proyecto (Coordinador o Líder de Proyecto)
- [ ] Detalle de proyecto (con tabs: Actividades / Errores / Equipo / Historial — como en el mockup del shell)
- [ ] Cambiar estado del proyecto (máquina de 5 estados)
- [ ] Gestión de equipo (asignar/desvincular usuarios) — recordar: ownership por proyecto específico, no solo por rol
- [ ] Vista "mis proyectos" para Desarrollador/Líder

---

# Fase 7 — Etapas (EP-05)

- [ ] CRUD de etapas dentro del detalle de un proyecto
- [ ] Orden (drag-and-drop o campo numérico simple — decidir)
- [ ] Indicador visual de estado (Pendiente / En ejecución / Finalizada)
- [ ] Timeline visual (mencionado en tu checklist EP-05)

---

# Fase 8 — Actividades (EP-06)

- [ ] CRUD dentro de una etapa
- [ ] Asignar desarrollador (selector de usuarios)
- [ ] Cambiar estado (el propio Desarrollador puede hacerlo — sin restricción de rol)
- [ ] Vista "mis actividades" para el Desarrollador logueado

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

- [ ] Métricas por rol (usar los `Metric Card` del Design System)
- [ ] Actividad reciente / feed
- [ ] Gráficas si aplica

---

# Fase 12 — Configuración (EP-11) y Reportes (EP-12)

- [ ] Vista de configuración/preferencias
- [ ] Botones de exportación (TXT/CSV/PDF/Excel) conectados a `GET /api/reportes/actividades-por-proyecto/{id}?formato=...`

---

# Fase 13 — Valor Agregado (EP-13) — únicamente lo aprobado

- [ ] Auditoría Global (frontend sobre `GET /api/trazabilidad`, Coordinador)
- [ ] Timeline del Proyecto

**No agregar ninguna otra funcionalidad sin aprobación explícita** (regla de `CODEX_CONTEXT.md`).

---

# Fase 14 — Calidad, UX y Documentación (EP-14)

- [ ] Auditoría visual: todos los botones/cards/tablas/formularios comparten el mismo componente base (no hay duplicados)
- [ ] Estados de carga y vacíos consistentes en toda la app
- [ ] Confirmaciones en acciones destructivas (desactivar usuario, desvincular de proyecto, etc.)
- [ ] Responsive: tablet y mobile (después de validar desktop)
- [ ] Accesibilidad básica: navegación por teclado, contraste, focus visible
- [ ] Actualizar HU/RF/Casos de Uso que correspondan

---

# Validación final

- [ ] Cada pantalla probada con los 3 roles (Coordinador, Líder de Proyecto, Desarrollador)
- [ ] Ningún componente visual roto entre light/dark mode
- [ ] Repositorio limpio, sin el sandbox de Figma Make suelto
