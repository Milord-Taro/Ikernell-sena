+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-12                         | **Nombre:**                   | Registrar errores en el proyecto                                |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-11                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Desarrollador                                                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | desarrollador de software                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | registrar los errores detectados durante el desarrollo de una   |
|                                               |                               | actividad.                                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | llevar un registro de incidencias que permita al equipo         |
|                                               |                               | analizar y mejorar la calidad del desarrollo                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir registrar errores asociados a una actividad.                        |
|                                               |                                                                                                 |
|                                               | \- El sistema debe asociar automáticamente el error al proyecto correspondiente.                |
|                                               |                                                                                                 |
|                                               | \- El sistema debe asociar el error al desarrollador que lo registra.                           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir seleccionar el tipo de error.                                       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir seleccionar la etapa donde fue detectado.                           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe registrar automáticamente la fecha y hora del registro.                      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar la información obligatoria antes del registro.                       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir registrar errores en actividades que no pertenezcan al usuario       |
|                                               | autenticado.                                                                                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe restringir el registro de errores a usuarios autenticados.                   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe confirmar el registro exitoso del error.                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el desarrollador detecta un error durante su trabajo            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | diligencia el formulario con tipo de error, descripción y fase  |
|                                               |                               | del proyecto                                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema registra el error con fecha automática y lo asocia   |
|                                               |                               | al proyecto y al desarrollador                                  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el desarrollador intenta registrar un error sin seleccionar la  |
|                                               |                               | fase                                                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | envía el formulario                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra una validación indicando que la fase es      |
|                                               |                               | obligatoria                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el desarrollador intenta registrar un error sin seleccionar |
|                                               |                               | el tipo de error                                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | envía el formulario                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que el tipo de error es obligatorio          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el desarrollador intenta registrar un error con la          |
|                                               |                               | descripción vacía                                               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda el formulario                                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la descripción es obligatoria            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que ocurre un error durante el almacenamiento del registro      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el desarrollador confirma el formulario                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no fue posible registrar el error y      |
|                                               |                               | conserva la información diligenciada                            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el desarrollador registra correctamente un error            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el sistema almacena la información                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | confirma el registro e incorpora el error al historial de la    |
|                                               |                               | actividad                                                       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el desarrollador intenta registrar un error sobre una       |
|                                               |                               | actividad que no tiene asignada                                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | envía el formulario                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema deniega el registro e informa que no posee           |
|                                               |                               | autorización                                                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para el registro de errores, incluyendo validaciones,             |
|                                               | asociaciones con actividades y restricciones de acceso.                                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar el formulario de registro de errores con los campos requeridos para tipo de error,      |
|                                               | descripción y etapa del proyecto.                                                               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar los mensajes de validación, confirmación y error que se mostrarán durante el proceso de |
|                                               | registro.                                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio para registrar errores asociados a una actividad y al usuario           |
|                                               | autenticado.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar la validación que garantice que la actividad pertenece al desarrollador que         |
|                                               | registra el error.                                                                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la asociación automática del registro de error con la actividad, la etapa y el      |
|                                               | proyecto correspondiente.                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar las validaciones de negocio para campos obligatorios, tipos de error válidos y      |
|                                               | consistencia de la información.                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar el formulario de registro de errores utilizando las reglas de validación definidas  |
|                                               | para el negocio.                                                                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar la visualización de mensajes de confirmación y errores durante el registro.         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Verificar el registro exitoso de errores con información válida.                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Verificar el comportamiento del sistema ante formularios incompletos o información inválida.    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Ejecutar pruebas funcionales del flujo completo de registro de errores y validar su correcta    |
|                                               | persistencia.                                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 09/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-12 -         |               |
|                               |                               |                               |               | Registrar       |               |
|                               |                               |                               |               | errores en el   |               |
|                               |                               |                               |               | proyecto        |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-12           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
