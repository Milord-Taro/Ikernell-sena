+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-09                         | **Nombre:**                   | Registrar y modificar actividades del proyecto                  |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Alta                                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-07 / HU-08                                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Líder                                                                                 |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | líder de proyectos                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | registrar y administrar las actividades de un proyecto.         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | asignar responsabilidades claras a cada miembro del equipo      |
|                                               |                               | dentro del proyecto                                             |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir registrar actividades asociadas a una etapa del proyecto.           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar las actividades registradas.                              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir modificar la información de una actividad.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir asignar un desarrollador a una actividad.                           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir registrar actividades sin desarrollador asignado.                   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe asociar cada actividad a una única etapa.                                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar la información obligatoria antes del registro.                       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar la consistencia de las fechas de la actividad.                       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir asignar desarrolladores que no pertenezcan al proyecto.              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe establecer el estado inicial de la actividad según exista o no un            |
|                                               | desarrollador asignado.                                                                         |
|                                               |                                                                                                 |
|                                               | \- El sistema debe restringir la gestión de actividades a usuarios autorizados.                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el líder accede a un proyecto y registra una actividad          |
|                                               |                               | asignándole un desarrollador                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda la actividad                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema crea la actividad con estado \'pendiente\' y la      |
|                                               |                               | asocia al desarrollador y al proyecto                           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el líder busca una actividad existente                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | la selecciona y modifica su descripción, fechas o desarrollador |
|                                               |                               | asignado                                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema actualiza la actividad y notifica el cambio          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el líder registra una actividad sin asignar un              |
|                                               |                               | desarrollador                                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda la actividad                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema registra la actividad con estado \"Pendiente de      |
|                                               |                               | asignación\" y permite asignar posteriormente un desarrollador  |
|                                               |                               | autorizado                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el líder intenta registrar una actividad con información    |
|                                               |                               | incompleta                                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | selecciona la opción \"Guardar\"                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa los campos obligatorios pendientes           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que la fecha de finalización es anterior a la fecha de inicio   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el líder registra la actividad                                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa la inconsistencia y no registra la actividad |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el líder intenta asignar un desarrollador que no pertenece  |
|                                               |                               | al proyecto                                                     |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda la actividad                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que el desarrollador seleccionado no         |
|                                               |                               | pertenece al proyecto                                           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el líder intenta modificar una actividad inexistente        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda los cambios                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la actividad no se encuentra disponible  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el líder modifica correctamente una actividad               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | confirma los cambios                                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema actualiza la información y registra la modificación  |
|                                               |                               | exitosamente                                                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la gestión de actividades, incluyendo registro,              |
|                                               | actualización, asignación de responsables, estados y asociación con etapas del proyecto.        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar el formulario para el registro y edición de actividades con la información requerida    |
|                                               | por el negocio.                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la vista para la consulta de actividades mostrando su estado, responsable, etapa y      |
|                                               | proyecto asociado.                                                                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio para registrar nuevas actividades validando la información obligatoria  |
|                                               | y las reglas de negocio.                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar el servicio para consultar y actualizar actividades manteniendo la integridad de la |
|                                               | información.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la asociación de las actividades con la etapa correspondiente dentro del proyecto.  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la asignación del desarrollador responsable validando que pertenezca al equipo del  |
|                                               | proyecto y se encuentre activo.                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar las validaciones de negocio relacionadas con estados, fechas, responsables y        |
|                                               | restricciones de edición.                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar el formulario para la gestión de actividades siguiendo las reglas de negocio        |
|                                               | definidas.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar la búsqueda, consulta y edición de actividades mostrando la información relevante   |
|                                               | para el usuario.                                                                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Implementar la visualización del responsable asignado, el estado de la actividad y la etapa a   |
|                                               | la que pertenece.                                                                               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Verificar el registro, consulta, actualización y asignación de actividades con información      |
|                                               | válida.                                                                                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Validar las reglas de negocio relacionadas con responsables, estados, asociación a etapas y     |
|                                               | restricciones de asignación.                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Ejecutar pruebas funcionales para verificar el flujo completo de gestión de actividades y el    |
|                                               | cumplimiento de las reglas definidas.                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 09/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-09 -         |               |
|                               |                               |                               |               | Registrar y     |               |
|                               |                               |                               |               | modificar       |               |
|                               |                               |                               |               | actividades del |               |
|                               |                               |                               |               | proyecto        |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-09           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
