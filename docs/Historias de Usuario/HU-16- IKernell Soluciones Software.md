+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-16                         | **Nombre:**                   | Gestionar especialidades                                        |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Baja                                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-05                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Administración de Catálogos                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | coordinador de proyectos                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | administrar el catálogo de especialidades disponibles en el     |
|                                               |                               | sistema mediante operaciones de registro, consulta,             |
|                                               |                               | actualización e inhabilitación lógica.                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | mantener actualizado el listado de especialidades utilizado     |
|                                               |                               | durante la gestión de los perfiles de los desarrolladores.      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir registrar nuevas especialidades.                                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar las especialidades registradas.                           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir modificar la información de una especialidad existente.             |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir realizar la inhabilitación lógica de una especialidad.              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir registrar especialidades duplicadas.                                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir eliminar físicamente especialidades que tengan desarrolladores       |
|                                               | asociados.                                                                                      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar únicamente las especialidades activas durante el registro y edición  |
|                                               | de desarrolladores.                                                                             |
|                                               |                                                                                                 |
|                                               | \- El sistema debe registrar la trazabilidad de las operaciones realizadas sobre las            |
|                                               | especialidades.                                                                                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe informar al usuario el resultado de cada operación realizada.                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | que el coordinador accede al módulo de especialidades           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | registra una nueva especialidad con información válida          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema almacena la especialidad y la incorpora al catálogo  |
|                                               |                               | disponible                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | que el coordinador consulta el listado de especialidades        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | existen especialidades registradas                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra la información correspondiente a cada        |
|                                               |                               | especialidad junto con su estado                                |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el coordinador selecciona una especialidad existente        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | actualiza su información con datos válidos                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema guarda los cambios y actualiza el catálogo           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el coordinador intenta registrar una especialidad           |
|                                               |                               | existente.                                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el nombre coincide con otra especialidad registrada             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema impide el registro e informa que la especialidad ya  |
|                                               |                               | existe                                                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el coordinador selecciona una especialidad activa           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | solicita su inhabilitación                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema cambia su estado a inactiva sin eliminar el registro |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que una especialidad posee desarrolladores asociados            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el coordinador intenta inhabilitarla                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la especialidad posee registros          |
|                                               |                               | asociados y bloquea la operación según las reglas de negocio    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el coordinador registra o modifica un desarrollador         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | consulta el listado de especialidades disponibles               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra únicamente las especialidades activas        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el coordinador realiza una operación sobre una especialidad |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | la operación finaliza correctamente                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema registra automáticamente la trazabilidad de la       |
|                                               |                               | acción realizada                                                |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la administración del catálogo de especialidades.            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz para registrar, consultar y editar especialidades.                          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la vista de administración del catálogo de especialidades.                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el registro de nuevas especialidades en el catálogo.                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar la consulta del catálogo de especialidades registradas.                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la actualización de la información de una especialidad existente.                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la inhabilitación lógica de especialidades sin eliminar su historial.               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar la validación que impida registrar especialidades con nombres duplicados.           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar el formulario de gestión utilizando las validaciones definidas.                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar la búsqueda y el filtrado del catálogo de especialidades para facilitar su          |
|                                               | administración.                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Validar que únicamente las especialidades activas estén disponibles durante el registro y       |
|                                               | edición de desarrolladores.                                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Registrar automáticamente la trazabilidad de las operaciones realizadas sobre las               |
|                                               | especialidades.                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Validar las reglas de negocio y los mensajes mostrados durante cada operación.                  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Realizar pruebas funcionales del flujo completo de administración del catálogo de               |
|                                               | especialidades.                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 05/07/2026                    | Efrain Manotas                |               | Desarrollo de   |               |
|                               |                               |                               |               | HU-16           |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
|                               |                               |                               |               |                 |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
