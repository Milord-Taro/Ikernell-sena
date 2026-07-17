# TODO — Audit follow-up (case-study scope)

Working list derived from `audit_output.md` (2026-07-16), re-prioritized for what this
project actually is: a **SENA case study**, not a production deployment. Priorities here
optimize for (a) nothing breaking during a demo/evaluation, (b) the documentation — which
IS part of the graded deliverable — telling the truth, and (c) demonstrable engineering
quality. Production-only hardening is intentionally parked at the bottom.

Effort: **S** = under an hour · **M** = half a day · **L** = a day or more

---

## P0 — Fix before any demo or delivery (defects + graded contradictions)

- [x] **1. Reject disabled users per-request in the JWT filter** — (S) ✅ DONE
  `JwtAuthenticationFilter` never checks `userDetails.isEnabled()`, so an inhabilitated
  user keeps working until their token expires (≤30 min). The seed data ships a disabled
  user (`mateo.salinas@ikernell.com`) *specifically to demo account deactivation* — an
  evaluator who disables a logged-in user will see the feature "not work".
  Fix: one condition in `autenticarSiHayTokenValido()` + a unit test.
  `ikernell-backend/src/main/java/com/ikernell/backend/security/JwtAuthenticationFilter.java:70`

- [x] **2. Make "one active leader per project" impossible in the DB** — (S) ✅ DONE (V3 verified live on PostgreSQL 14; also flushes leader-desvinculación before insert + 409 on race)
  Today it's check-then-act in `AsignacionProyectoService.crear` only. If two vigente
  Líder rows ever exist (race, manual SQL, bad seed), `ProyectoService.enriquecerConLider`
  throws on `Collectors.toMap` → **GET /api/proyectos is a 500 for every user** — a
  demo-killer on the app's main page.
  Fix: Flyway `V3__uq_lider_vigente.sql` partial unique index
  (`asignacion_proyecto(id_proyecto) WHERE rol_proyecto='Líder' AND fecha_desvinculacion IS NULL`)
  + merge function in the `toMap` so reads degrade gracefully.

- [x] **3. Truth pass over the docs that contradict the code** — (M) ✅ DONE (decisiones-alcance, matriz-roles-permisos, AGENTS.md, README all corrected)
  In an academic evaluation the documents are graded alongside the code, and today two of
  them describe a system with **no real authentication**:
  - `docs/decisiones-alcance.md` → "Seguridad y roles" section says token auth doesn't exist. Rewrite against reality (JWT + @PreAuthorize + ownership).
  - `docs/matriz-roles-permisos.md` → "Estado actual" column is pre-JWT. Refresh every row; this doc could be a *strength* (it maps 1:1 to what's implemented).
  - `AGENTS.md` stack table → says React 18.3.1 / Vite 6.3.5 / TS 5.8.2; actual is React 19.2 / Vite 8.1 / TS 6.0. Also the `docs/` layout it describes lives under `docs/Ikernell v2.0/`.
  - `README.md` → requires PostgreSQL 18, but the Flyway baseline was dumped from and runs on 14.x. State the truly supported version.

---

## P1 — Highest learning / grade value

- [x] **4. Tests for the authorization matrix and state machines** — (L) ✅ DONE (32 unit tests: +AsignacionProyectoServiceTest, +UsuarioServiceTest, +JwtAuthenticationFilterTest; existing Actividad/Proyecto/Autorizacion ladders already covered)
  The best engineering in the repo (ownership rules, Actividad/Proyecto state
  transitions, Usuario business rules) is unverified. Turning `matriz-roles-permisos.md`
  into passing tests makes the strongest part of the project *demonstrable*.
  Templates already exist (`AutorizacionProyectoServiceTest`, `ActividadServiceTest`) and
  `docs/GUIA_TESTING.md` documents the how. Suggested order:
  `ActividadService.cambiarEstado` permission ladder → `ProyectoService.cambiarEstado`
  (Cancelado lock) → `AsignacionProyectoService.crear` rules → `UsuarioService` rules.

- [x] **5. Make the test suite runnable on any machine** — (M) ✅ DONE (@Tag("integration") on the context test + surefire excludedGroups via test.excluded.groups property; `mvn test` now runs 32 unit tests with no DB)
  `IkernellBackendApplicationTests` (@SpringBootTest) boots against the developer's live
  local PostgreSQL — on a clean machine `./mvnw verify` fails. Cheapest fix for case-study
  scope: tag/exclude the context test unless a DB is present, keeping unit tests pure
  Mockito. Better (if time): Testcontainers. Prerequisite for item 6.

- [x] **6. Minimal CI (GitHub Actions)** — (M, after 5) ✅ DONE (.github/workflows/ci.yml: backend compile+tests, frontend typecheck+lint+build; all steps verified green locally)
  One workflow: backend compile + unit tests, frontend typecheck + lint + build.
  Protects the final stretch of changes before delivery and is visible professionalism
  (green checks on the repo). No DB needed if item 5 is done the cheap way.

- [x] **7. Cheap backend polish** — (S each) ✅ DONE (except one deliberate skip, noted)
  - [x] `spring.jpa.open-in-view=false` (verified: context boots with no WARN, no LazyInitializationException).
  - [x] Order `ActividadService.listarTodas()` / `InterrupcionService.listarTodas()` (now use the ordered repo finders).
  - [x] Extract copy-pasted `construirDetalle()` → `DetalleObjectMapper.serializar(Object)` across all 13 services.
  - [~] `guardarConCodigoUnico()` **intentionally left un-extracted**: each copy differs (distinct generator method, repository, and 409 message per entity), so a generic helper would be a leaky abstraction — the duplication is the clearer design here.

---

## P2 — Nice-to-have for the case study (do if time remains)

- [x] **8. Vitest + 2–3 first frontend tests** — (M) ✅ DONE (11 tests: `useCarga`, `formatDate`, `Sidebar` role-gating; `npm run test` wired into CI; tests excluded from `tsconfig.app.json` so build/typecheck unaffected)

- [x] **9. docker-compose for PostgreSQL + seed** — (S–M) ✅ DONE (`docker-compose.yml` = PostgreSQL 14 matching dev profile + mounted seed; README quick-start added. Also FIXED a stale-seed bug: `registro_error` INSERT was missing the NOT NULL `estado` column — seed now loads clean on the Flyway V1→V4 schema, verified).

- [x] **10. Refresh planning docs' status** — (S) ✅ DONE (checklist + backlog: EP-01..EP-13 → Completada, EP-14 → En desarrollo; Progreso General 14/15, backend 100%, valor agregado 2/2; delivery/manuals honestly left pending).

- [x] **11. Micro-polish** — (S) ✅ DONE (all four): V4 composite index `notificacion(id_usuario, leida, fecha_creacion DESC)` replacing the two weak single-column indexes (boot-verified); opportunistic purge of expired tokens in `TokenRecuperacionStore`; JWT config in a validated `@ConfigurationProperties` (`JwtProperties`, `@NotBlank`/`@Positive`, fails fast at startup); `CustomUserDetailsService.java` re-indented.

- [ ] **12. Comment cleanup — ONLY AFTER grading** — (M)
  The `CORREGIDO:/NUEVO:` changelog comments are evidence of the overhaul work and likely
  *valuable to the professor now*. Post-evaluation, trim to constraint-only comments (git
  history keeps the why).

---

## Parked — production-only concerns (document, don't build)

Not worth building for a case study; worth **listing in `docs/decisiones-alcance.md` as
known production gaps** — showing you know exactly what's missing is itself good
case-study material:

- Rate limiting / login lockout (brute force, contact-form spam)
- CSP header + the localStorage-JWT trade-off (or httpOnly-cookie auth)
- Real email delivery for password recovery (already seamed at `TokenRecuperacionStore`)
- Actuator health endpoint / observability
- Server-side pagination of the growth tables (pattern already exists in trazabilidad)
- TanStack Query migration, optimistic locking (@Version), Dependabot/Renovate
- Schema-copy consistency automation (`schema.sql` / docs copy vs Flyway baseline)
