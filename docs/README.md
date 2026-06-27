# Documentacion Ikernell-sena

Esta carpeta contiene la documentacion academica, funcional y tecnica del aplicativo web Ikernell-sena, desarrollado como caso de estudio para la fabrica de software del SENA.

El `README.md` de la raiz sigue siendo la portada principal del repositorio en GitHub. Este archivo funciona como indice interno de la carpeta `docs`.

## Indice

| Seccion | Contenido | Estado |
| --- | --- | --- |
| [Requerimientos](./Requerimientos/) | Requerimientos funcionales, no funcionales y especiales del sistema | Revisar contra implementacion actual |
| [Historias de Usuario](./Historias%20de%20Usuario/) | HU-01 a HU-14 del proyecto | Revisar contra implementacion actual |
| [Casos de Uso](./Casos%20de%20Uso/) | Casos de uso extendidos y diagrama UML de alto nivel | Revisar nombres y consistencia |
| [Diagramas](./Diagramas/) | Diagrama de clases en formato drawio e imagen | Revisar contra entidades Java actuales |
| [Base de datos](./Base%20de%20datos/) | DDL, DML, consultas y modelo relacional | Revisar contra backup y schema actual |
| [Gantt](./GANTT%20PROYECTO%20IKERNELL.xlsx) | Planeacion del proyecto | Revisar fechas y avance real |
| [Caso guia](./Caso%20de%20Estudio%20ADSI%202017%20-%20Tomar%20como%20guia.pdf) | Documento guia del caso de estudio | Referencia academica |
| [TODO final](./TODO%20FINAL%20Ikernell%20sena.md) | Priorizacion general del trabajo pendiente | Vivo |
| [Matriz HU/RF](./matriz-hu-rf.md) | Trazabilidad entre HU, RF, modulos y estado del aplicativo | Vivo |
| [Matriz de roles](./matriz-roles-permisos.md) | Permisos esperados por rol y estado actual | Vivo |
| [Decisiones de alcance](./decisiones-alcance.md) | Desalineaciones detectadas entre documentacion y codigo | Vivo |
| [Seguridad y autenticacion](./seguridad-autenticacion.md) | Estado actual, limitaciones y camino recomendado | Vivo |
| [Politica de usuarios](./politica-usuarios.md) | Reglas de correo, contrasena y gestion de cuentas | Vivo |

## Lectura recomendada

1. Leer primero el [README principal](../README.md).
2. Revisar el [documento de requerimientos](./Requerimientos/Requerimientos_IKernell.docx).
3. Revisar las [historias de usuario](./Historias%20de%20Usuario/).
4. Consultar la [matriz HU/RF](./matriz-hu-rf.md) para saber que esta implementado, parcial o pendiente.
5. Revisar [decisiones de alcance](./decisiones-alcance.md) y [matriz de roles](./matriz-roles-permisos.md).
6. Usar el [TODO final](./TODO%20FINAL%20Ikernell%20sena.md) como guia de prioridades.

## Notas de actualizacion

- La documentacion fue importada desde Google Drive y puede contener partes desactualizadas frente al codigo actual.
- Las HU y RF deben mantenerse alineadas con los modulos reales del frontend, backend y base de datos.
- Los documentos pesados o de evidencia extensa pueden permanecer en Drive, pero el repositorio debe conservar la documentacion necesaria para entender, instalar y defender el proyecto.

## Pendientes documentales

- Crear una guia de instalacion por ambiente de trabajo: casa/oficina en Ubuntu.
- Confirmar si HU-04 se implementara como modulos reales o como enlaces externos.
- Confirmar si HU-14 enviara correo real o solo registrara respuesta en el sistema.
- Confirmar si los diagramas coinciden con las entidades y relaciones actuales del backend.
