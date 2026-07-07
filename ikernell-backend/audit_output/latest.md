# Auditoría — IKernell Backend (V2)
_Generado: 2026-07-07 13:45:18_

## 1. Entidades: plan vs. implementación
- Planeadas: 15 | Encontradas: 4

**Faltantes (planeadas, no creadas):**
- ❌ Actividad
- ❌ AsignacionProyecto
- ❌ Etapa
- ❌ Interrupcion
- ❌ MensajeContacto
- ❌ Notificacion
- ❌ Proyecto
- ❌ RegistroError
- ❌ TipoError
- ❌ TipoInterrupcion
- ❌ Trazabilidad

**Extra (creadas, no estaban en el plan — confirmar si es intencional):**
- (ninguna)

> Cruce con base de datos omitido: no se encontró `schema.sql`. Genera un dump con `pg_dump --schema-only tu_bd > schema.sql` para habilitarlo.

## 2. Controllers que acceden directo a un Repository
- (ninguna detectada)

## 3. Posibles métodos sin @Transactional (heurística, revisar manualmente)
- (ninguno detectado)

## 4. Cobertura de @PreAuthorize por Controller
| Controller | Endpoints | @PreAuthorize | Cobertura |
|---|---|---|---|
| `AuthController.java` | 2 | 0 | 0.0% 🔴 |
| `EspecialidadController.java` | 6 | 3 | 50.0% 🔴 |
| `ProfesionController.java` | 6 | 3 | 50.0% 🔴 |
| `RolController.java` | 6 | 1 | 16.7% 🔴 |
| `UsuarioController.java` | 6 | 3 | 50.0% 🔴 |

## 5. DTOs *Request sin Bean Validation
- (todos los DTO Request tienen al menos una validación)

## 6. `catch (Exception e)` genérico
- (ninguno detectado)

## 7. Entidades: @Data vs @Getter/@Setter/@Builder
- (todas las entidades cumplen la convención)

## 8. Cambios desde la última auditoría
_Primera auditoría registrada — no hay comparación previa._
