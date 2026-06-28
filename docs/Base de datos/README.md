# Base de datos Ikernell-sena

Esta carpeta separa la estructura, los datos base y los datos de prueba visual del
proyecto.

## Archivos

- `DDL`: crea las tablas y restricciones del schema `public`.
- `DML`: carga los datos base minimos para que el sistema funcione.
- `02_seed_visual_tests.sql`: agrega datos realistas para probar pantallas,
  filtros, tarjetas, reportes y estados visuales.
- `Consultas`: consultas utiles para validar relaciones y reportes.
- `Modelo Realcional Ikernell.png`: modelo relacional de referencia.

## Orden recomendado

1. Crear la base de datos en PostgreSQL.
2. Ejecutar `DDL`.
3. Ejecutar `DML`.
4. Ejecutar `02_seed_visual_tests.sql` solo en ambientes locales o de demo.
5. Ejecutar las consultas de verificacion necesarias.

## Criterios de datos de prueba

- No usar datos reales de clientes, trabajadores ni empresas.
- Mantener codigos estables (`USR-010`, `PRY-010`, `ACT-010`) para que los
  scripts puedan ser leidos y depurados facil.
- Evitar depender de IDs numericos generados por `SERIAL`; preferir relaciones
  por codigo.
- No agregar roles ficticios salvo que exista una necesidad funcional clara.
- Los datos visuales pueden incluir registros activos, inactivos, pendientes,
  atendidos y corregidos para cubrir estados de UI.

## Mejoras futuras recomendadas

- Normalizar nombres fisicos a `snake_case` en una migracion controlada.
- Eliminar o documentar tablas de prueba que no pertenezcan al dominio.
- Agregar indices para busquedas frecuentes por correo, estado, proyecto,
  etapa y desarrollador.
- Crear scripts numerados de migracion cuando haya cambios de schema.
- Separar datos base obligatorios de datos demo.
