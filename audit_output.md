# IKernell — Principal Engineer Audit

**Date:** 2026-07-16 · **Branch audited:** `refactor/overhaul-ikernell-sena` · **Verification:** `./mvnw verify` ✅ pass · `npm run typecheck` ✅ · `npm run lint` ✅ (8 fast-refresh warnings) · `npm run build` ✅ (707 ms, main chunk 314 kB / 95 kB gzip)

---

## Phase 2 — Verified understanding

**What it does.** IKernell is a project-management system for a fictional software company (SENA case study, now in a deliberate quality "overhaul"). It manages workers, projects, stages (etapas), activities, error reports, interruptions, contact messages from a public landing page, notifications, a global audit trail (trazabilidad), per-role metric dashboards, and PDF/XLSX reports.

**Users.** Three authenticated organizational roles — **Coordinador** (org-wide admin), **Líder de Proyecto** (manages only projects where they hold the active "Líder" assignment), **Desarrollador** (executes assigned activities, logs errors/interruptions) — plus anonymous visitors on the public landing (portfolio, FAQ, contact form).

**How it is organized.**
- `ikernell-backend/` — Spring Boot 4.1.0 / Java 17, classic layered monolith: `controller` (thin, `@PreAuthorize` role gates) → `service` (all business logic, `@Transactional`) → `repository` (Spring Data JPA) with `dto` + MapStruct `mapper`, centralized `@RestControllerAdvice`, `security` (stateless JWT, BCrypt), `audit` (write-side trazabilidad), `report` (PDFBox/POI).
- `ikernell-frontend/` — React 19 + TypeScript 6 + Vite 8 + Tailwind 4, no external component library: `pages` (lazy-loaded routes) / `features` (domain modules) / `components/ui` (own design system) / `services` (typed fetch wrapper) / `context` (Auth, Theme, Accessibility).
- PostgreSQL schema managed by **Flyway** (`V1__baseline.sql`, `V2__trazabilidad_detalle_anterior.sql`) with `ddl-auto=validate` as a drift tripwire.
- `docs/` — extensive academic + engineering documentation (architecture, planning, per-entity audits, HU/RF, DB models).

**Major architectural decisions (all defensible, most documented in-code):**
1. Two-tier authorization: coarse role gates in controllers + fine-grained project ownership in one reusable `AutorizacionProyectoService`.
2. Deliberate read-open policy (any authenticated user can read most resources) coupled with a **two-level user DTO policy** (`UsuarioResponse` full vs `UsuarioResumenResponse` without PII) — documented as a hard rule in AGENTS.md.
3. Hierarchical functional codes (`PRY-001-ETP-01-ACT-02`) generated from `MAX()` with the race window consciously accepted and converted to HTTP 409 via DB unique constraints.
4. Business rules duplicated as DB CHECK constraints (state enums, date ordering, conditional integrity like "Atendido requires responsable+fecha+respuesta") — the DB defends itself.
5. Password-recovery email delivery intentionally simulated (token returned in the response), flagged as temporary in code.

**Strengths worth calling out.** This is far above the bar for its context: exceptional cross-module consistency; N+1s actively hunted (`default_batch_fetch_size=50`, batched leader lookup, SQL-aggregated metrics per role); audit log paginated after a documented redesign (V2 backfill migration with window function); profile-per-environment config with fail-fast prod secrets; no secrets tracked in git; Swagger disabled in prod; lazy-loaded frontend routes; accessibility features (font scaling, high contrast, reduced motion); disciplined typed API client; honest "SIMULADO/TEMPORAL" markers where corners were cut.

---

## Phase 3 — Findings (verified against code, not docs)

### Correctness / Security

| # | Finding | Evidence |
|---|---------|----------|
| F1 | **Deactivated users keep working tokens.** `JwtAuthenticationFilter` builds the auth token without checking `userDetails.isEnabled()`. Login and `/auth/refrescar` check `activo`, the per-request filter does not → an inhabilitated user retains full API access until JWT expiry (≤30 min). | `security/JwtAuthenticationFilter.java:70-75`, `security/CustomUserDetailsService.java:34` |
| F2 | **Single-active-leader invariant is app-only and its violation 500s the project list.** `AsignacionProyectoService.crear` does check-then-act with no lock and no DB constraint; two concurrent leader assignments can both commit. `ProyectoService.enriquecerConLider(List)` then throws (`Collectors.toMap` duplicate key) → `GET /api/proyectos` returns 500 **for every user**. | `service/AsignacionProyectoService.java:88-106`, `service/ProyectoService.java:252-256` |
| F3 | **No rate limiting / lockout** on `/api/auth/login` (BCrypt brute-force) or the anonymous `POST /api/mensajes-contacto` (spam/flooding). | `SecurityConfig.java:71-76` |
| F4 | JWT in `localStorage` → exfiltrable by any XSS; no CSP served. Known standard trade-off, but currently undocumented and unmitigated. | `services/api.ts:16-27` |
| F5 | Audit IP trusts `X-Forwarded-For` blindly — spoofable by direct clients; recovery-token store never purges expired unconsumed tokens (slow unbounded growth); both minor. | `audit/TrazabilidadService.java:90-93`, `security/TokenRecuperacionStore.java` |
| F6 | No optimistic locking (`@Version`) anywhere — concurrent edits are silent last-write-wins. Acceptable at current scale; note for multi-user growth. | all entities |

### Backend

- **OSIV is on** (Spring warns at startup). All services already return DTOs inside `@Transactional`, so `spring.jpa.open-in-view=false` is a free win (connections released earlier, lazy-load surprises surface in dev instead of prod).
- `ActividadService.listarTodas()` and `InterrupcionService` use unordered `findAll()` while every sibling list method orders by id — inconsistent ordering the frontend may repaint differently between loads.
- Only trazabilidad is paginated; `usuarios`, `proyectos`, `actividades`, `errores`, `interrupciones` return full tables. Fine today, and `PaginaResponse` already exists as the pattern to extend when tables grow.
- Five catalog services (`Rol/Profesion/Especialidad/TipoError/TipoInterrupcion`, ~170 lines each) are near-identical CRUD; the frontend already generalized this (`features/catalogos/config.ts`) but the backend didn't. Duplication is controlled, not dangerous.
- `construirDetalle()` try/catch and `guardarConCodigoUnico()` are copy-pasted across services — candidate for one small helper each.
- No `spring-boot-starter-actuator`: no health/readiness endpoint for any future deployment.
- `@Value` pairs (`jwt.secret`, `jwt.expiration-ms`) would be cleaner as one `@ConfigurationProperties` record with startup validation (e.g. reject HMAC keys < 32 bytes instead of failing on first token).

### Database

Genuinely strong: FKs all `ON DELETE RESTRICT` with intent, uniques, CHECK-encoded state machines, comments on nearly every column, sensible indexes (incl. composite `trazabilidad(entidad, codigo_registro)`). Gaps:
- Missing **partial unique index** for the F2 invariant: `asignacion_proyecto(id_proyecto) WHERE rol_proyecto='Líder' AND fecha_desvinculacion IS NULL`.
- `notificacion` is queried by `(id_usuario, leida)` but only has single-column indexes — composite would serve the badge-count query directly (micro).
- Three copies of the schema exist (Flyway baseline = source of truth, `schema.sql`, `docs/.../ikernell_v2_FINAL.sql`); README explains the hierarchy but nothing *enforces* the copies stay in sync.
- README requires PostgreSQL 18; the baseline was dumped from and runs on 14.23. Pick one story.

### Frontend

- Architecture is clean and consistent (pages/features/ui/services/types), `useCarga` centralizes load/error state, `ErrorBoundary` + lazy routes + session-expiry modal are all in place.
- **Zero tests and no test framework** (explicitly acknowledged in AGENTS.md). The riskiest untested surface is role-conditional rendering and form validation logic in the large modals (`ActividadesEtapaModal.tsx` 525 lines, `UsuarioFormModal.tsx` 377 lines).
- No `AbortController` on fetches → possible setState-after-navigation; benign today, cheap to add inside `useCarga`.
- All filtering/pagination is client-side over full lists — consistent with the unpaginated API; both sides must move together later.
- 8 oxlint fast-refresh warnings (contexts exporting hooks alongside components) — cosmetic.
- Auth state syncs via custom `window` events — pragmatic and fine at this size; a data-fetching library would subsume it later.

### Testing & CI (the weakest dimension)

- Backend: 4 test classes / ~600 lines (3 services + 1 mapper of ~20 services). Good style (JUnit5+Mockito+AssertJ, and a teaching guide `docs/GUIA_TESTING.md`), tiny footprint. The authorization matrix and state machines — the code's crown jewels — are mostly unverified by tests.
- `@SpringBootTest` boots against the developer's **live local PostgreSQL** — tests are unrunnable on a clean machine/CI without a hand-built DB.
- **No CI whatsoever** (`.github/` contains only an appmod assessment config). Every guarantee ("compile before done") is manual discipline.

### Documentation

The best and worst part of the repo simultaneously:
- Excellent: README setup flow, AGENTS.md conventions/security rules/PII policy, per-entity audit docs, migration policy explainer.
- **Dangerously stale:** `docs/decisiones-alcance.md` and `docs/matriz-roles-permisos.md` state "no real token/session auth exists; backend endpoints unprotected" — the opposite of the shipped code. `planning/00-checklist-overhaul.md` and the product backlog show nearly everything "Pendiente" though shipped. AGENTS.md's stack table says React 18.3.1/Vite 6.3.5/TS 5.8.2 vs actual React 19.2/Vite 8.1/TS 6.0, and describes a `docs/` layout that actually lives under `docs/Ikernell v2.0/`. Since AGENTS.md declares these docs the "source of truth" for (human and AI) contributors, stale docs are an active hazard: a future contributor could "re-implement" JWT auth or misjudge the security posture.
- Changelog-style comments (`CORREGIDO:/NUEVO:`) blanket the backend. They are valuable *for the academic evaluation*; long-term they are noise that will rot. Post-delivery, trim to constraint-only comments (git history already holds the "why").

---

## Phase 4 — Design challenges

**1. Layered monolith → keep.** Right-sized: one team, one DB, modest domain. Microservices would be strictly worse. No change.

**2. `MAX()`-based code generation.** Current: race window accepted, converted to 409 by unique constraints. Alternative: per-parent counter table with `SELECT … FOR UPDATE`, or PG advisory locks. Benefit: no user-visible 409 retries. Drawback: more moving parts for a collision that needs two same-parent, same-instant inserts. **Verdict: keep, it's honest engineering — but add the F2 partial unique index, which is the one place where the same check-then-act style has a real blast radius.**

**3. JWT in localStorage vs httpOnly cookie.** Current: simple, works with the `Authorization` header and CORS setup. Alternative: httpOnly SameSite cookie removes XSS token theft but reintroduces CSRF handling and complicates local dev. **Verdict: not worth migrating now; add a CSP and document the trade-off. Revisit only if the app ever faces the open internet.**

**4. Per-page fetch + Context vs a server-cache library (TanStack Query).** Current approach is fully understood by its author and consistent. A query library would give caching, request dedup, retry, and abort-on-unmount for free, deleting `useCarga` and the polling code. Migration is incremental (page by page), medium effort. **Verdict: worthwhile medium-term, not urgent.**

**5. In-memory recovery tokens + simulated email.** Already correctly designed as a seam (`TokenRecuperacionStore` is the only thing to swap). Keep the plan: DB-backed token table + real mail sender behind a profile flag when email arrives.

**6. Unpaginated collection endpoints.** Defensible today (an org has tens of projects, not thousands). The growth-sensitive tables are `actividad`, `registro_error`, `interrupcion`, `notificacion`. The pagination pattern already exists (trazabilidad). **Verdict: extend opportunistically, starting with whatever list first exceeds ~1–2k rows; don't big-bang it.**

---

## Phase 5 — Prioritized recommendations

Severity · Impact · Effort · Implementation risk · Long-term value

| # | Recommendation | Sev | Impact | Effort | Risk | Value |
|---|----------------|-----|--------|--------|------|-------|
| R1 | Check `isEnabled()` in `JwtAuthenticationFilter` (reject disabled users per request) | **High** | Security | S | Low | High |
| R2 | Flyway V3: partial unique index for single active leader + merge-function in `enriquecerConLider` `toMap` | **High** | Reliability, Security | S | Low | High |
| R3 | Add CI (GitHub Actions): backend compile+test, frontend typecheck+lint+build | **High** | Reliability, DX | S–M | Low | Very high |
| R4 | Make backend tests self-contained (Testcontainers PostgreSQL; move `@SpringBootTest` off the dev DB) | **High** | Reliability, DX | M | Low | Very high |
| R5 | Fix stale governance docs (decisiones-alcance, matriz-roles-permisos, AGENTS.md stack table, planning checklist) or mark them superseded | **High** | DX, Security (misleading posture) | S | Low | High |
| R6 | `spring.jpa.open-in-view=false` | Med | Performance, Reliability | S | Low | Medium |
| R7 | Rate-limit `/api/auth/login` + anonymous contact POST (bucket4j or a simple filter) | Med | Security | M | Low | Medium–High |
| R8 | Grow the backend test suite around the authorization matrix and state machines (Actividad/Proyecto/Etapa transitions, Usuario rules) | Med | Reliability | M–L | Low | Very high |
| R9 | Introduce Vitest + React Testing Library; first targets: `useCarga`, role-gated rendering, `UsuarioFormModal` validation | Med | Reliability, DX | M | Low | High |
| R10 | Add `docker-compose.yml` (PostgreSQL + seed) for onboarding parity with Testcontainers | Med | DX | S | Low | High |
| R11 | Serve a CSP (and document the localStorage-JWT trade-off in AGENTS.md) | Med | Security | S–M | Med (CSP tuning) | Medium |
| R12 | Order `listarTodas()` results; extract shared `construirDetalle`/`guardarConCodigoUnico` helpers | Low | Maintainability | S | Low | Medium |
| R13 | Add actuator health endpoint (prod profile: health only) | Low | Reliability | S | Low | Medium |
| R14 | `@ConfigurationProperties` for JWT config + startup validation of key length | Low | Maintainability, Security | S | Low | Low–Med |
| R15 | Composite index `notificacion(id_usuario, leida)`; purge expired recovery tokens on write | Low | Performance | S | Low | Low |
| R16 | Paginate growth-prone list endpoints (actividades/errores/interrupciones/notificaciones) API+UI together | Low (today) | Scalability | L | Med | High (later) |
| R17 | Adopt TanStack Query incrementally; delete `useCarga`/manual polling | Low | Performance, DX | M–L | Low | Medium–High |
| R18 | Post-delivery: trim `CORREGIDO/NUEVO` changelog comments to constraint-only comments | Low | Maintainability | M | Low | Medium |
| R19 | Dependabot/Renovate for pom.xml + package.json | Low | Security, DX | S | Low | Medium |
| R20 | Consolidate schema copies: generate `schema.sql`/docs copy from migrations, or add a CI check that they match | Low | Maintainability | S–M | Low | Medium |

Also noted, no action urged: `@Version` optimistic locking (F6) — revisit if concurrent editing becomes real; X-Forwarded-For hardening — only matters once deployed behind a known proxy.

---

## Phase 6 — Roadmap

**Quick wins (a day or two, do before anything else)**
- R1 (enabled-check in filter) and R2 (leader unique index + toMap merge) — the only findings where a plausible event degrades or bypasses the system, and both are tiny.
- R6 (OSIV off) — one property; the codebase is already shaped for it.
- R5 (docs truth pass) — cheap, and it protects every future session of AI-assisted work from acting on a false security posture.
- R12, R13, R15 — mechanical.

**Short term (1–2 weeks)**
- R3 + R4 + R10 together — CI, Testcontainers, docker-compose are one coherent investment: after it, "it compiles and tests pass" is enforced by a machine on every push instead of by discipline. This is the single highest-leverage change in the repo.
- R7 (rate limiting) and R11 (CSP) — close the two obvious externally-facing gaps.

**Medium term (next month+)**
- R8 (backend test depth) then R9 (frontend tests) — write tests as the executable spec of the authorization matrix and state machines the team already documented so carefully.
- R19 (dependency updates), R14, R20.

**Long-term architectural evolution (only when triggered by growth)**
- R16 (server-side pagination) when the first table crosses a few thousand rows; R17 (query library) when data-fetching complexity grows; real email delivery replacing the simulated recovery flow (already seamed); httpOnly-cookie auth only if threat model changes. **No microservices, no CQRS, no event sourcing — nothing in this domain justifies them.**

---

## Executive summary — Top 20 by ROI

**Verdict first:** this codebase is in unusually good shape — honestly better than many professional systems of this size. Architecture, database discipline, and security *design* are its strengths. Its three real weaknesses are: **almost no automated verification (tests/CI), two small but real security/reliability defects, and governance docs that lie about the system's security posture.** None of these require rewrites; the top-5 items below are days, not months.

1. **Add CI** (R3) — everything else only stays fixed if a machine checks it.
2. **Testcontainers for backend tests** (R4) — makes CI possible and tests trustworthy.
3. **Enabled-check in JWT filter** (R1) — one line; closes a real access-revocation gap.
4. **Partial unique index for single leader + toMap merge** (R2) — turns a race that 500s the app for everyone into an impossible state.
5. **Truth pass over stale docs** (R5) — the docs currently instruct future contributors (and AI agents) to solve already-solved problems.
6. **Backend tests for the authorization matrix** (R8) — the most valuable logic in the repo is unverified.
7. **Disable OSIV** (R6).
8. **docker-compose for dev DB** (R10).
9. **Rate limiting on login + contact form** (R7).
10. **Vitest + first frontend tests** (R9).
11. **CSP + documented token-storage trade-off** (R11).
12. **Dependabot/Renovate** (R19).
13. **Actuator health endpoint** (R13).
14. **Deterministic ordering + small DRY helpers** (R12).
15. **Schema-copy consistency check** (R20).
16. **JWT `@ConfigurationProperties` + key validation** (R14).
17. **notificacion composite index + token purge** (R15).
18. **Server-side pagination for growth tables** (R16) — deferred until triggered.
19. **TanStack Query migration** (R17) — deferred, incremental.
20. **Comment cleanup post-delivery** (R18).

*Uncertainty disclosures:* I could not exercise the running app end-to-end in this session (build/tests pass; the live system was not manually driven). Report-generation services (`ReporteGeneralService`, PDF/XLSX writers) and several large frontend modals were reviewed by pattern-sampling rather than line-by-line; the per-entity docs in `docs/Ikernell v2.0/audit/` suggest those were already individually reviewed. Findings F1–F5 were verified directly in source.

---
---

# Post-Fix Audit — 2026-07-16 (same day, after TODO-audit items 1–11)

Re-audit after the fix pass that closed every item in `TODO-audit.md` except the
deliberately deferred #12 (comment cleanup, post-grading). Every claim was re-verified
against source, and the DB-level fixes were verified **live** against PostgreSQL 14.23.

## Verification matrix (all green)

| Check | Result |
|---|---|
| `./mvnw clean verify` (default = no DB) | ✅ **32/32 unit tests**, integration test correctly excluded, BUILD SUCCESS |
| `./mvnw test -Dtest.excluded.groups=` (with DB) | ✅ **33/33** — @SpringBootTest booted, Flyway **applied V3 + V4 live** ("now at version v4"), `ddl-auto=validate` passed |
| Live DB probe: insert a 2nd vigente Líder via raw SQL | ✅ **Rejected by `uq_lider_vigente_por_proyecto`** (duplicate key, id_proyecto) |
| Live DB index inventory | ✅ `idx_notificacion_usuario_leida_fecha` present; old `idx_notificacion_usuario` / `idx_notificacion_leida` dropped |
| `npm run typecheck` / `lint` / `test` / `build` | ✅ / ✅ (same 8 cosmetic warnings) / ✅ **11/11 Vitest** / ✅ (bundle unchanged, 314 kB / 94.9 kB gzip) |

## Fix-by-fix verdicts

- **F1 (disabled users keep tokens) — FIXED, confirmed.** `JwtAuthenticationFilter` now requires `userDetails.isEnabled()` on every request. `JwtAuthenticationFilterTest` covers exactly the right scenario — including a `lenient()` stub proving rejection is due to the disabled flag, not token validity.
- **F2 (dual-leader race → 500) — FIXED, confirmed end-to-end.** V3 partial unique index verified physically; `toMap` merge function degrades reads gracefully; `saveAndFlush` correctly forces the outgoing leader's UPDATE before the new INSERT (a real Hibernate flush-ordering trap — INSERTs flush before UPDATEs — that would have broken normal reassignment under the new index; caught and handled). Race path translates to 409; rollback semantics correct (the desvinculación rolls back if the insert fails). 7 new tests in `AsignacionProyectoServiceTest` including flush-order and 409-race assertions.
- **Docs truth pass — FIXED, confirmed.** `decisiones-alcance.md` now describes the real JWT/@PreAuthorize posture and gained a "Brechas conocidas de producción" section (the parked list, properly documented); `matriz-roles-permisos.md` rows now match the code (including a new row for the per-request `isEnabled()` behavior); AGENTS.md stack table corrected (React 19.2 / TS 6.0 / Vite 8.1 / PostgreSQL 14.x) and now documents the Vitest setup; README states PG 14 and gained a Docker quick-start.
- **Tests — DONE.** Backend: 32 unit tests across 6 classes (was 19 across 4): +7 `AsignacionProyectoServiceTest`, +3 `UsuarioServiceTest`, +3 `JwtAuthenticationFilterTest`. Frontend: Vitest wired cleanly (separate `vitest.config.ts`, jsdom, RTL cleanup in setup, tests excluded from `tsconfig.app.json` so build/typecheck are untouched), 11 tests over `useCarga`, `formatDate`, and Sidebar role-gating.
- **Suite runnable anywhere — DONE, verified both modes.** `@Tag("integration")` + surefire `excludedGroups` via the `test.excluded.groups` property; `mvn test` needs no database, and the opt-in flag runs everything.
- **CI — DONE (locally verified).** `.github/workflows/ci.yml` is correct: backend `mvnw clean verify` (DB-free by design), frontend `npm ci` + typecheck/lint/test/build, sensible caching and concurrency. Not yet observed running on GitHub (work is uncommitted), but every step passes locally.
- **Backend polish — DONE.** OSIV off (no startup WARN in the boot log this time); both `listarTodas()` now use ordered finders; `DetalleObjectMapper.serializar()` adopted by all 13 services (zero leftover `construirDetalle` methods). Leaving `guardarConCodigoUnico` un-extracted was the right call — the copies genuinely differ.
- **docker-compose + seed — DONE.** Compose matches the dev profile exactly (postgres:14, `ikernell_v2`, healthcheck, seed mounted read-only, honest port-conflict note). The seed's missing NOT NULL `estado` on `registro_error` is fixed with a sensible mix of estados.
- **Micro-polish — DONE.** V4 verified live; `TokenRecuperacionStore` purges expired tokens opportunistically on each generate; `JwtProperties` (`@Validated`, `@NotBlank`/`@Positive`, wired via `@EnableConfigurationProperties`) verified by the context boot; `CustomUserDetailsService` re-indent is whitespace-only.

## New findings from this pass (all minor)

| # | Finding | Severity |
|---|---------|----------|
| N1 | README:67 says Flyway creates "V1 + V2 + V3" and docker-compose.yml:13 says "V2 + V3" — already stale now that V4 exists. Suggest version-agnostic wording ("todas las migraciones") so it can't drift again. | Low |
| N2 | Frontend test files are typechecked by nobody: excluded from `tsconfig.app.json`, and Vitest/esbuild strips types without checking them. A `tsconfig.test.json` (or vitest's `typecheck` option) would close it. Acceptable at this scope. | Low |
| N3 | CI triggers on both `push: ['**']` and `pull_request` → same-repo PRs run twice (the concurrency group only dedups same-ref). Cheap fix: limit `push` to `main` or drop `pull_request`. Costs only runner minutes. | Nit |
| N4 | Running the opt-in integration test migrates the developer's live dev DB (that's how V3/V4 got applied here). Expected and documented; Testcontainers remains the eventual clean answer (already parked). | Info |

## Updated verdict

The three structural weaknesses from the first audit — **no automated verification, two real defects, and governance docs contradicting the code** — are all closed and were verified here rather than taken on faith. The repo now has: a machine-checkable green state (33 tests incl. integration, CI workflow ready), DB-enforced invariants, per-request account-status enforcement, truthful documentation with an explicit production-gap ledger, and one-command database onboarding. For its stated scope (case study, not production), this is now a genuinely finished-quality codebase; the remaining distance to production is exactly the documented "Brechas conocidas" list, plus deferred item #12 (comment cleanup after grading).

**Operational note:** all of this work (33 modified + 16 new files) is still uncommitted in the working tree — committing it (or splitting into a few thematic commits) is the immediate next step.
