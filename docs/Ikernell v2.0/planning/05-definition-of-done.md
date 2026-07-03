# IKernell v2 — Definition of Done (DoD)

> Criterios oficiales que determinan cuándo una funcionalidad, corrección o mejora puede considerarse completamente terminada dentro del proyecto IKernell v2.

---

# 1. Objetivo

El propósito de este documento consiste en establecer una definición única y objetiva de "terminado" para todas las actividades desarrolladas durante el overhaul de IKernell.

Una tarea no se considerará finalizada únicamente porque el código funcione.

Deberá cumplir criterios relacionados con calidad, arquitectura, documentación, experiencia de usuario y mantenibilidad.

La Definition of Done busca garantizar que todas las entregas mantengan un nivel consistente de calidad.

---

# 2. Principios

Toda funcionalidad deberá cumplir los siguientes principios antes de considerarse terminada.

- Calidad técnica.
- Consistencia arquitectónica.
- Consistencia visual.
- Integridad funcional.
- Trazabilidad.
- Documentación actualizada.

---

# 3. Nivel 1 — Implementación

La funcionalidad deberá encontrarse correctamente implementada.

## Criterios

- [ ] El código compila correctamente.
- [ ] La funcionalidad cumple el objetivo definido.
- [ ] No existen errores conocidos relacionados con el cambio.
- [ ] Se respetan las convenciones del proyecto.
- [ ] Se eliminaron pruebas temporales y código comentado.

---

# 4. Nivel 2 — Arquitectura

La implementación deberá respetar la arquitectura definida para IKernell.

## Backend

- [ ] La lógica de negocio se encuentra en Services.
- [ ] Los Controllers únicamente coordinan solicitudes.
- [ ] Se utilizan DTO cuando corresponde.
- [ ] Se reutilizan componentes existentes.
- [ ] No se introdujo deuda técnica evidente.

## Frontend

- [ ] La lógica se encuentra correctamente distribuida.
- [ ] Se reutilizan componentes del Design System.
- [ ] No existen componentes duplicados.
- [ ] Se respetó la estructura de carpetas.

---

# 5. Nivel 3 — Diseño y UX

La funcionalidad deberá integrarse visualmente con el resto del sistema.

## Criterios

- [ ] Respeta el Design System.
- [ ] Mantiene consistencia visual.
- [ ] Presenta estados de carga.
- [ ] Presenta estados vacíos cuando aplica.
- [ ] Presenta mensajes de error claros.
- [ ] Proporciona retroalimentación al usuario.

---

# 6. Nivel 4 — Dominio

La funcionalidad deberá representar correctamente el modelo del negocio.

## Criterios

- [ ] Se respetan las reglas del dominio.
- [ ] Las relaciones permanecen consistentes.
- [ ] No se rompe la integridad del modelo.
- [ ] La solución representa correctamente el caso de estudio.

---

# 7. Nivel 5 — Base de Datos

Cuando exista impacto sobre el modelo relacional.

## Criterios

- [ ] Script SQL actualizado.
- [ ] DER actualizado.
- [ ] Diccionario de Datos actualizado.
- [ ] Integridad referencial validada.

---

# 8. Nivel 6 — Documentación

Toda modificación relevante deberá encontrarse documentada.

## Revisar

- [ ] Historias de Usuario.
- [ ] RF.
- [ ] RNF.
- [ ] Casos de Uso.
- [ ] Manual Técnico.
- [ ] Manual de Usuario.
- [ ] Product Backlog.
- [ ] Checklist.
- [ ] Roadmap (si aplica).

---

# 9. Nivel 7 — Validación

Antes de cerrar la actividad deberá verificarse.

- [ ] Funcionamiento correcto.
- [ ] Flujo principal.
- [ ] Casos alternativos.
- [ ] Manejo de errores.
- [ ] Navegación.
- [ ] Permisos.
- [ ] Responsive (cuando aplique).

---

# 10. Nivel 8 — Revisión Final

Antes de marcar la tarea como finalizada deberá verificarse.

- [ ] No existen tareas pendientes relacionadas.
- [ ] La funcionalidad cumple el objetivo original.
- [ ] No rompe funcionalidades existentes.
- [ ] El código fue revisado.
- [ ] Se encuentra lista para entrega.

---

# 11. Definición de Terminado

Una funcionalidad únicamente podrá cambiar al estado **Finalizada** cuando todos los niveles anteriores hayan sido completados satisfactoriamente.

La ausencia de cualquiera de los criterios implicará que la tarea permanece abierta.

---

# 12. Excepciones

Cuando una funcionalidad no requiera alguno de los niveles anteriores, deberá justificarse explícitamente durante su revisión.

Ejemplo.

Una modificación exclusivamente visual probablemente no requerirá cambios en la base de datos.

---

# 13. Mejora Continua

La Definition of Done podrá evolucionar durante el proyecto.

Toda modificación deberá documentarse y mantenerse alineada con la arquitectura general de IKernell.

---

Versión

2.0

Estado

Activo
