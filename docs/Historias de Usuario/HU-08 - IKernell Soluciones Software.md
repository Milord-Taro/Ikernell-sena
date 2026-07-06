+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-08                         | **Nombre:**                   | Gestionar etapas del proyecto                                   |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-07                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Líder                                                                                 |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | líder de proyectos                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | registrar y administrar las etapas de un proyecto.              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | estructurar el ciclo de vida del proyecto en fases claramente   |
|                                               |                               | definidas                                                       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir registrar etapas asociadas a un proyecto.                           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar las etapas registradas de un proyecto.                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir modificar la información de una etapa.                              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir eliminar una etapa cuando las reglas de negocio lo permitan.        |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar los campos obligatorios del formulario.                              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir registrar etapas con nombres duplicados dentro del mismo proyecto.   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe asociar cada etapa a un único proyecto.                                      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe advertir cuando una etapa tenga actividades asociadas antes de eliminarla.   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mantener el orden de las etapas dentro del proyecto.                         |
|                                               |                                                                                                 |
|                                               | \- El sistema debe restringir la gestión de etapas a usuarios autorizados.                      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir la eliminación de etapas que tengan actividades asociadas.           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el líder accede a un proyecto registrado                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | hace clic en \'Agregar etapa\' y diligencia el formulario       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema crea la etapa asociada al proyecto y la muestra en   |
|                                               |                               | la lista de etapas                                              |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el líder selecciona una etapa existente y la modifica           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda los cambios                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema actualiza la información de la etapa correctamente   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | el líder procede a eliminar una etapa con actividades asociadas |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | confirma la eliminación                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la etapa no puede eliminarse porque      |
|                                               |                               | tiene actividades asociadas e indica que estas deben eliminarse |
|                                               |                               | o reasignarse antes de continuar.                               |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el líder intenta registrar una etapa con información        |
|                                               |                               | incompleta                                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | selecciona la opción \"Guardar\"                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa los campos obligatorios pendientes y no      |
|                                               |                               | registra la etapa                                               |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el líder intenta registrar una etapa cuyo nombre ya existe  |
|                                               |                               | dentro del mismo proyecto                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda la información                                           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que ya existe una etapa con ese nombre       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el líder intenta modificar una etapa inexistente            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda los cambios                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la etapa no se encuentra disponible      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el líder elimina una etapa sin actividades asociadas        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | confirma la eliminación                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema elimina la etapa correctamente y actualiza la lista  |
|                                               |                               | de etapas                                                       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el líder intenta eliminar una etapa con actividades         |
|                                               |                               | asociadas                                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | confirma la acción                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema bloquea la eliminación e informa que primero deben   |
|                                               |                               | eliminarse o reasignarse las actividades asociadas              |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la gestión de etapas, incluyendo registro, actualización,    |
|                                               | eliminación y asociación con los proyectos.                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar el formulario para el registro y edición de etapas con la información requerida por el  |
|                                               | negocio.                                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la vista para la consulta de etapas mostrando su información, estado y relación con el  |
|                                               | proyecto correspondiente.                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio para registrar nuevas etapas validando la información obligatoria y las |
|                                               | reglas de negocio.                                                                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar el servicio para consultar, actualizar y eliminar etapas manteniendo la integridad  |
|                                               | de la información.                                                                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar las validaciones de negocio para impedir registros duplicados y garantizar la       |
|                                               | correcta asociación con el proyecto.                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la restricción que impida eliminar etapas que tengan actividades asociadas.         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar el formulario para la gestión de etapas siguiendo las reglas de negocio definidas.  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar la consulta y visualización de las etapas asociadas a cada proyecto.                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar los mensajes de validación, confirmación y error durante las operaciones de         |
|                                               | gestión.                                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Verificar el registro, consulta, actualización y eliminación de etapas con información válida.  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Validar las reglas de negocio relacionadas con la asociación de etapas a proyectos y las        |
|                                               | restricciones de eliminación.                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Ejecutar pruebas funcionales para verificar el flujo completo de gestión de etapas y el         |
|                                               | cumplimiento de las reglas definidas.                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 09/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-08 -         |               |
|                               |                               |                               |               | Gestionar       |               |
|                               |                               |                               |               | etapas del      |               |
|                               |                               |                               |               | proyecto        |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-08           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
