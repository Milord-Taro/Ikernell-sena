+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-13                         | **Nombre:**                   | Registrar interrupciones del proyecto                           |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-11                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Desarrollador                                                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | desarrollador de software                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | registrar las interrupciones que afecten la ejecución de una    |
|                                               |                               | actividad asignada durante el desarrollo del proyecto.          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | dejar constancia de los factores que afectan el cumplimiento de |
|                                               |                               | los tiempos del proyecto                                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir registrar interrupciones únicamente sobre actividades asignadas al  |
|                                               | desarrollador autenticado.                                                                      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe asociar automáticamente la interrupción con la actividad, etapa y proyecto   |
|                                               | correspondientes.                                                                               |
|                                               |                                                                                                 |
|                                               | \- El sistema debe registrar automáticamente la fecha y hora del registro.                      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir seleccionar el tipo de interrupción desde un catálogo previamente   |
|                                               | definido.                                                                                       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe solicitar la duración de la interrupción.                                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar todos los campos obligatorios antes de registrar la información.     |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir registrar interrupciones sobre actividades finalizadas.              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe restringir el registro de interrupciones a usuarios autenticados.            |
|                                               |                                                                                                 |
|                                               | \- El sistema debe confirmar el registro exitoso de la interrupción.                            |
|                                               |                                                                                                 |
|                                               | \- El sistema debe incorporar automáticamente la interrupción al historial de la actividad.     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el desarrollador experimenta una interrupción durante su        |
|                                               |                               | trabajo                                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | diligencia el formulario con tipo, fecha, duración y fase       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema registra la interrupción y la asocia al proyecto y   |
|                                               |                               | al desarrollador                                                |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el desarrollador omite el campos en el formulario               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | intenta guardar el formulario                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra validación indicando que es necesario llenar |
|                                               |                               | todos los campos con la información solicitada                  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el desarrollador intenta registrar una interrupción sin     |
|                                               |                               | seleccionar el tipo de interrupción                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | envía el formulario                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que el tipo de interrupción es obligatorio   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el desarrollador registra una duración igual o inferior a   |
|                                               |                               | cero                                                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | intenta guardar la información                                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la duración debe ser mayor que cero      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que ocurre un error durante el almacenamiento de la             |
|                                               |                               | interrupción                                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el desarrollador confirma el formulario                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no fue posible registrar la interrupción |
|                                               |                               | y conserva la información diligenciada                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el desarrollador registra correctamente una interrupción    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el sistema almacena la información                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | la interrupción queda incorporada al historial de la actividad  |
|                                               |                               | correspondiente                                                 |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el desarrollador intenta registrar una interrupción sobre   |
|                                               |                               | una actividad que no tiene asignada                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | envía el formulario                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema deniega el registro e informa que no posee           |
|                                               |                               | autorización para realizar la operación                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para el registro de interrupciones, incluyendo validaciones,      |
|                                               | restricciones y asociaciones con actividades.                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar el formulario para registrar interrupciones con los campos de tipo, duración y          |
|                                               | descripción.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar los mensajes de validación, confirmación y error del proceso de registro.               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio para registrar interrupciones asociadas a una actividad del             |
|                                               | desarrollador autenticado.                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar la asociación automática entre la interrupción, la actividad, la etapa y el         |
|                                               | proyecto correspondiente.                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar las validaciones de negocio para duración, actividad asignada y datos obligatorios. |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Restringir el registro de interrupciones a actividades activas asignadas al desarrollador       |
|                                               | autenticado.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar el formulario de registro de interrupciones siguiendo las reglas de negocio         |
|                                               | establecidas.                                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar los mensajes de confirmación y validación durante el registro.                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Actualizar la vista de la actividad para reflejar las interrupciones registradas.               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Verificar el registro exitoso de interrupciones y la correcta asociación con la actividad       |
|                                               | correspondiente.                                                                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Ejecutar pruebas funcionales para validar escenarios exitosos, errores de validación y          |
|                                               | restricciones de acceso.                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 09/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-13 -         |               |
|                               |                               |                               |               | Registrar       |               |
|                               |                               |                               |               | interrupciones  |               |
|                               |                               |                               |               | del proyecto    |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-13           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
