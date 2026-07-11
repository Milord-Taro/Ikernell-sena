# Base de datos IKernell

Esta carpeta contiene dos versiones de la base de datos: la vigente (`Base de Datos V2/`), que usa el sistema actual, y la del caso de estudio original SENA 2017 (`DB Legacy/`), conservada solo como referencia histórica.

Para los pasos de instalación (crear la base, ejecutar el esquema y cargar el seed) ve al [README de la raíz del repositorio](../../README.md#restaurar-la-base-de-datos).

---

## `Base de Datos V2/` (vigente)

- `ikernell_v2_FINAL.sql`: script consolidado que crea el esquema completo (`public`) — tablas, restricciones, tipos. Es la fuente de verdad de la estructura actual (documentada también en `docs/Ikernell v2.0/architecture/06.6-diseno-logico-base-de-datos.md`). Existe una copia idéntica en `ikernell-backend/schema.sql`, usada por las herramientas de auditoría del backend.
- `Seed_catalogos.sql`: datos base mínimos para que el sistema funcione (roles, profesiones, especialidades, tipos de error, tipos de interrupción).
- `Consultas_Ikernell_V2.sql`: consultas de verificación útiles para validar relaciones y reportes.
- `MER-ikernell_V2.png`: Modelo Entidad-Relación de referencia.

### Orden recomendado

1. Crear la base de datos en PostgreSQL.
2. Ejecutar `ikernell_v2_FINAL.sql`.
3. Ejecutar `Seed_catalogos.sql`.
4. Ejecutar `Consultas_Ikernell_V2.sql` para validar que todo cargó correctamente.

### Criterios de datos de prueba

- No usar datos reales de clientes, trabajadores ni empresas.
- Mantener códigos estables (`USR-010`, `PRY-010`, `ACT-010`) para que los scripts puedan leerse y depurarse fácilmente.
- Evitar depender de IDs numéricos generados por `SERIAL`; preferir relaciones por código.
- No agregar roles ficticios salvo que exista una necesidad funcional clara.

### Mejoras futuras recomendadas

- Agregar un script de datos demo/visuales (actividades, errores e interrupciones en distintos estados) separado del seed base de catálogos, para facilitar pruebas manuales de UI.
- Agregar índices para búsquedas frecuentes por correo, estado, proyecto, etapa y desarrollador.
- Crear scripts numerados de migración cuando haya cambios de schema, en vez de mantener un único script consolidado.

---

## `DB Legacy/` (histórico, no usar para levantar el sistema actual)

Esquema y datos del caso de estudio original (SENA 2017), previo al overhaul a V2:

- `DDL`, `DML`, `Consultas`: scripts de definición, carga y consulta de esa versión (archivos de texto plano sin extensión `.sql`).
- `MER IKERNELL`: modelo entidad-relación de esa versión.
- `Modelo Realcional Ikernell.png`: modelo relacional de esa versión.
- `Ikernell_Caso_Estudio_27062026.sql` / `Ikernell_Caso_Estudio_30062026.sql`: snapshots/backups tomados durante la transición hacia V2.

Se conservan por trazabilidad del proceso de overhaul, no porque describan la base de datos vigente.
