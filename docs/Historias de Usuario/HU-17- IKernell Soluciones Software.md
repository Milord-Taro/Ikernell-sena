+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-17                         | **Nombre:**                   | Gestionar equipo del proyecto                                   |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-05, HU-07, HU-09, HU-11                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Gestión de Proyectos                                                                            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | líder de proyectos                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | administrar el equipo de trabajo de cada proyecto mediante la   |
|                                               |                               | asignación y retiro de desarrolladores habilitados              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | garantizar que únicamente los integrantes del proyecto puedan   |
|                                               |                               | participar en las actividades y ejecución del mismo             |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir agregar desarrolladores habilitados al equipo de un proyecto.       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir retirar desarrolladores del equipo de un proyecto.                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar los integrantes del equipo de un proyecto.                |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar los desarrolladores disponibles para ser asignados.                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir agregar desarrolladores inhabilitados.                               |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir agregar un desarrollador más de una vez al mismo proyecto.           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir retirar desarrolladores que tengan actividades pendientes asociadas. |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar los proyectos a los que pertenece un desarrollador.       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe registrar la trazabilidad de las operaciones realizadas sobre la             |
|                                               | conformación del equipo.                                                                        |
|                                               |                                                                                                 |
|                                               | \- El sistema debe informar el resultado de cada operación realizada.                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | que el líder accede a la gestión del equipo de un proyecto      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | selecciona un desarrollador habilitado para agregarlo           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema incorpora el desarrollador al equipo del proyecto    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | que el líder consulta el equipo del proyecto                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | existen desarrolladores asignados                               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra el listado de integrantes con su información |
|                                               |                               | principal y estado                                              |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que un desarrollador ya pertenece al proyecto                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el líder intenta volver a agregarlo                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema impide la operación e informa que el desarrollador   |
|                                               |                               | ya hace parte del equipo                                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que un desarrollador posee actividades pendientes dentro del    |
|                                               |                               | proyecto                                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el líder intenta retirarlo del equipo                           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema bloquea la operación e informa que existen           |
|                                               |                               | actividades pendientes asignadas                                |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que un desarrollador no posee actividades pendientes            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el líder solicita retirarlo del equipo                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema elimina su pertenencia al equipo del proyecto y      |
|                                               |                               | conserva la trazabilidad de la operación                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que un desarrollador se encuentra inhabilitado                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el líder intenta agregarlo al proyecto                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema impide la asignación e informa que el desarrollador  |
|                                               |                               | no se encuentra disponible                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el líder consulta un desarrollador                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | visualiza su información                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra los proyectos activos a los que pertenece    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el líder realiza una operación sobre el equipo del proyecto |
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
| 1                                             | Definir las reglas de negocio para la administración del equipo de trabajo de los proyectos.    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz para gestionar los integrantes de cada proyecto.                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la vista de consulta del equipo asignado al proyecto.                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar la asignación de desarrolladores al equipo del proyecto.                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar el retiro de desarrolladores del equipo del proyecto.                               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la consulta de los integrantes del equipo de trabajo.                               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la consulta de desarrolladores disponibles para asignación.                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar la validación que impida asignar desarrolladores duplicados o inhabilitados.        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar la validación que impida retirar desarrolladores con actividades pendientes.        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Mostrar los proyectos activos asociados a cada desarrollador.                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Registrar automáticamente la trazabilidad de las operaciones realizadas sobre el equipo del     |
|                                               | proyecto.                                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Validar las reglas de negocio y los mensajes mostrados durante cada operación.                  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Realizar pruebas funcionales del flujo completo de administración del equipo del proyecto.      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Verificar la consistencia de las asignaciones entre proyectos, desarrolladores y actividades.   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 05/07/2026                    | Efrain Manotas                |               | Desarrollo de   |               |
|                               |                               |                               |               | HU-17           |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
|                               |                               |                               |               |                 |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
