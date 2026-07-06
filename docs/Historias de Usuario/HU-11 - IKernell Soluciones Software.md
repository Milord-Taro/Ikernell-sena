+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-11                         | **Nombre:**                   | Ejecutar actividades del proyecto                               |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-09                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Desarrollador                                                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | desarrollador de software                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | consultar las actividades que me han sido asignadas y           |
|                                               |                               | actualizar su estado de ejecución.                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | registrar mi avance dentro del proyecto y mantener informado al |
|                                               |                               | líder sobre el estado de mis tareas                             |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir consultar únicamente las actividades asignadas al desarrollador     |
|                                               | autenticado.                                                                                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir actualizar el estado de una actividad asignada.                     |
|                                               |                                                                                                 |
|                                               | \- El sistema debe registrar la fecha y hora de cada cambio de estado.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir modificar actividades asignadas a otros desarrolladores.             |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir modificar actividades ya ejecutadas.                                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar cuando el desarrollador no tenga actividades asignadas.              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mantener el historial del último estado registrado.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe restringir esta funcionalidad a usuarios autenticados con rol Desarrollador. |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar la transición entre estados permitidos.                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el desarrollador inicia sesión y accede a su lista de           |
|                                               |                               | actividades                                                     |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | selecciona una actividad pendiente y la marca como "Ejecutada"  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema actualiza el estado de la actividad y registra la    |
|                                               |                               | fecha del cambio                                                |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el desarrollador intenta ejecutar una actividad que no le ha    |
|                                               |                               | sido asignada                                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | intenta acceder a ella                                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema deniega el acceso y muestra un mensaje de \'No       |
|                                               |                               | autorizado\'                                                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el desarrollador no tiene actividades asignadas             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | consulta su listado de actividades                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que actualmente no tiene actividades         |
|                                               |                               | asignadas                                                       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el desarrollador intenta marcar una actividad ya ejecutada  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | selecciona la opción de cambio de estado                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la actividad ya se encuentra finalizada  |
|                                               |                               | y no permite modificar nuevamente su estado                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el desarrollador cambia correctamente el estado de una      |
|                                               |                               | actividad                                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | confirma la actualización                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema registra el nuevo estado junto con la fecha y hora   |
|                                               |                               | del cambio                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que ocurre un error al actualizar el estado de la actividad     |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el desarrollador confirma la acción                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no fue posible actualizar la actividad y |
|                                               |                               | conserva el estado anterior                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el desarrollador intenta acceder directamente a una         |
|                                               |                               | actividad asignada a otro usuario                               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | solicita visualizarla                                           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema deniega el acceso e informa que no posee             |
|                                               |                               | autorización                                                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la ejecución de actividades, incluyendo el flujo de estados, |
|                                               | restricciones de actualización y trazabilidad de los cambios realizados.                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la vista de actividades asignadas mostrando el estado, la prioridad, la etapa y la      |
|                                               | información relevante para el desarrollador.                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar el flujo de actualización del estado de las actividades garantizando una experiencia    |
|                                               | clara y consistente para el usuario.                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio para consultar las actividades asignadas al desarrollador autenticado.  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar el servicio para actualizar el estado de una actividad validando las reglas de      |
|                                               | negocio establecidas.                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar el registro automático de la fecha, hora y responsable de cada cambio de estado     |
|                                               | realizado.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar las validaciones de permisos para garantizar que únicamente el desarrollador        |
|                                               | responsable pueda actualizar el estado de la actividad.                                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar las validaciones de transición de estados y la actualización automática del avance  |
|                                               | del proyecto cuando corresponda.                                                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar la vista de actividades asignadas mostrando únicamente las actividades              |
|                                               | correspondientes al desarrollador autenticado.                                                  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar la funcionalidad para actualizar el estado de una actividad mostrando los mensajes  |
|                                               | de confirmación y validación correspondientes.                                                  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Verificar la consulta de actividades asignadas y la actualización correcta de su estado.        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Validar las restricciones de acceso, las transiciones de estado y los escenarios sin            |
|                                               | actividades asignadas.                                                                          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Verificar el registro de la trazabilidad asociada a cada cambio de estado realizado sobre una   |
|                                               | actividad.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Ejecutar pruebas funcionales para validar el flujo completo de ejecución de actividades y la    |
|                                               | actualización automática del avance del proyecto.                                               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 09/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-11 -         |               |
|                               |                               |                               |               | Ejecutar        |               |
|                               |                               |                               |               | actividades del |               |
|                               |                               |                               |               | proyecto        |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-11           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
