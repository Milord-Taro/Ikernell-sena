# Documentacion Ikernell-sena

Esta carpeta contiene la documentacion academica, funcional y tecnica del aplicativo web Ikernell-sena, desarrollado como caso de estudio para la fabrica de software del SENA.

El `README.md` de la raiz sigue siendo la portada principal del repositorio en GitHub. Este archivo funciona como indice interno de la carpeta `docs`.

## Índice

| Sección | Contenido | Estado |
| --- | --- | --- |
| [Requerimientos](./Requerimientos/) | RF, RNF y RE del sistema (`Requerimientos_IKernell.md`, versión vigente; el `.docx` es la copia con la plantilla de entrega) | En corrección activa contra implementación actual |
| [Historias de Usuario](./Historias%20de%20Usuario/) | HU-01 a HU-23 del proyecto (versión `.md`, vigente; el `.docx` de cada una es la copia con la plantilla de entrega) | En corrección activa contra implementación actual |
| [Casos de Uso](./Casos%20de%20Uso/) | Casos de uso extendidos y diagrama UML de alto nivel | Pendiente de revisión (siguiente en la cola, después de HU/RF) |
| [Diagramas](./Diagramas/) | Diagrama de clases en formato drawio e imagen | Revisar contra entidades Java actuales |
| [Base de datos](./Base%20de%20datos/) | Esquema vigente V2, seed de catálogos y modelo E-R (`Base de Datos V2/`); esquema del caso de estudio original SENA 2017 conservado solo como histórico (`DB Legacy/`) — ver [su propio índice](./Base%20de%20datos/README.md) | Vigente |
| [Gantt](./GANTT%20PROYECTO%20IKERNELL.xlsx) | Planeación del proyecto | Revisar fechas y avance real |
| [Caso guía](./Caso%20de%20Estudio%20ADSI%202017%20-%20Tomar%20como%20guia.pdf) | Documento guía del caso de estudio | Referencia académica |
| [TODO final](./TODO%20FINAL%20Ikernell%20sena.md) | Priorización general del trabajo pendiente | Vivo |
| [Matriz HU/RF](./matriz-hu-rf.md) | Trazabilidad entre HU, RF, módulos y estado del aplicativo | Vivo — **incompleta**: solo cubre HU-01 a HU-14, falta extenderla a HU-15..HU-23 |
| [Matriz de roles](./matriz-roles-permisos.md) | Permisos esperados por rol y estado actual | Vivo — revisar: afirma que el login es "simple sin token/sesión", lo cual ya no es así en el código actual |
| [Decisiones de alcance](./decisiones-alcance.md) | Desalineaciones detectadas entre documentación y código | Vivo — algunos puntos ya resueltos en código (ver nota abajo) |
| [Seguridad y autenticación](./seguridad-autenticacion.md) | Estado actual, limitaciones y camino recomendado | Vivo |
| [Política de usuarios](./politica-usuarios.md) | Reglas de correo, contraseña y gestión de cuentas | Vivo |

## Lectura recomendada

1. Leer primero el [README principal](../README.md) (instalación y operación del aplicativo).
2. Revisar el [documento de requerimientos](./Requerimientos/Requerimientos_IKernell.md).
3. Revisar las [historias de usuario](./Historias%20de%20Usuario/).
4. Consultar la [matriz HU/RF](./matriz-hu-rf.md) para saber qué está implementado, parcial o pendiente (recordando que hoy solo cubre HU-01 a HU-14).
5. Revisar [decisiones de alcance](./decisiones-alcance.md) y [matriz de roles](./matriz-roles-permisos.md).
6. Usar el [TODO final](./TODO%20FINAL%20Ikernell%20sena.md) como guía de prioridades.

## Notas de actualización

- La documentación fue importada desde Google Drive y puede contener partes desactualizadas frente al código actual.
- Las HU y RF deben mantenerse alineadas con los módulos reales del frontend, backend y base de datos.
- Los documentos pesados o de evidencia extensa pueden permanecer en Drive, pero el repositorio debe conservar la documentación necesaria para entender, instalar y defender el proyecto.
- Los archivos `.md` de HU y Requerimientos son la fuente de verdad para revisión y edición; los `.docx` correspondientes son la plantilla de entrega formal, se actualizan copiando manualmente los cambios ya validados en el `.md`.

## Pendientes documentales

- Extender la [matriz HU/RF](./matriz-hu-rf.md) para cubrir HU-15 a HU-23 (hoy solo llega a HU-14).
- Actualizar [matriz de roles](./matriz-roles-permisos.md) y el punto 5 de [decisiones de alcance](./decisiones-alcance.md): ambos describen la autenticación como "simple, sin token/sesión real", pero el backend ya implementa JWT + BCrypt + refresco de sesión + `@PreAuthorize` por rol en la mayoría de controllers.
- Confirmar si HU-04 se implementará como módulos reales (correo, chat, biblioteca, tutoriales) o como enlaces externos — no se encontró evidencia de esto en el código actual.
- Confirmar si HU-14 enviará correo real al responder un mensaje de contacto, o si el alcance queda solo en registrar la respuesta en el sistema (hoy el código solo hace lo segundo).
- Confirmar si los diagramas coinciden con las entidades y relaciones actuales del backend.
- Revisar HU-11: exige que solo el desarrollador responsable pueda cambiar el estado de su actividad, pero el backend actual (`ActividadService.cambiarEstado`) lo permite a cualquier usuario autenticado por decisión explícita de diseño — decidir si se corrige el código o se documenta como excepción intencional en la HU.
