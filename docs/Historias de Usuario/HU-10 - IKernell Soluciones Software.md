+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-10                         | **Nombre:**                   | Generar reportes del proyecto                                   |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Alta                                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-07                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Líder                                                                                 |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | líder de proyectos                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | generar reportes de seguimiento del proyecto, consultar la      |
|                                               |                               | información de actividades e interrupciones y exportar la       |
|                                               |                               | información requerida en el formato establecido para la empresa |
|                                               |                               | aliada.                                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | hacer seguimiento al estado del proyecto y cumplir con los      |
|                                               |                               | compromisos de reporte internacional                            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir generar reportes de interrupciones por proyecto.                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir generar reportes de actividades por proyecto.                       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar la información del reporte en pantalla antes de exportarla.          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir exportar la información del proyecto en el formato establecido.     |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar el tipo, fecha, duración y etapa de cada interrupción.               |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar el estado, responsable y fechas de cada actividad.                   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe informar cuando un proyecto no tenga información para generar un reporte.    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe restringir la generación de reportes a usuarios autorizados.                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe ordenar la información cronológicamente.                                     |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar la disponibilidad de la información antes de generar la exportación. |
|                                               |                                                                                                 |
|                                               | \- El sistema debe generar correctamente el archivo solicitado.                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el líder selecciona un proyecto y hace clic en \'Reporte de     |
|                                               |                               | interrupciones\'                                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | existen interrupciones registradas                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra un listado con tipo, fecha, duración y fase  |
|                                               |                               | de cada interrupción                                            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el líder solicita el reporte de actividades por proyecto        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el proyecto tiene actividades                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra todas las actividades con su estado,         |
|                                               |                               | responsable y fechas                                            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | el líder solicita generar el archivo plano para la empresa      |
|                                               |                               | brasileña                                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | hace clic en \'Exportar archivo\',                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema genera y descarga un archivo .txt o .csv con la      |
|                                               |                               | información del proyecto en el formato acordado                 |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el líder solicita un reporte de interrupciones              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el proyecto no registra interrupciones                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no existen interrupciones registradas    |
|                                               |                               | para el proyecto seleccionado                                   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el líder solicita el reporte de actividades                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el proyecto no tiene actividades registradas                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no existen actividades para mostrar      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el líder solicita exportar la información del proyecto      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el proyecto contiene información válida                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema genera el archivo en el formato establecido y        |
|                                               |                               | permite su descarga                                             |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que ocurre un error durante la generación del archivo           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el líder intenta exportar la información                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no fue posible generar el archivo y      |
|                                               |                               | permite volver a intentarlo                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que un usuario sin permisos intenta acceder a la generación de  |
|                                               |                               | reportes                                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | selecciona la opción correspondiente                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema deniega el acceso e informa que no posee permisos    |
|                                               |                               | suficientes                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la generación de reportes del proyecto, incluyendo la        |
|                                               | información, filtros y formatos de exportación disponibles.                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Definir la estructura y el contenido que deberán incluir los reportes de actividades e          |
|                                               | interrupciones del proyecto.                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la interfaz para la consulta de reportes del proyecto mostrando la información de       |
|                                               | manera clara y organizada.                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Diseñar la interfaz de exportación permitiendo seleccionar el formato del archivo antes de      |
|                                               | generar el reporte.                                                                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar el servicio para consultar las actividades e interrupciones asociadas al proyecto   |
|                                               | seleccionado.                                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la consolidación de la información necesaria para generar los reportes del          |
|                                               | proyecto.                                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la generación del reporte en los formatos de exportación soportados por el sistema. |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar las validaciones de negocio para escenarios sin información y restricciones de      |
|                                               | acceso al reporte.                                                                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar la visualización de los reportes de actividades e interrupciones del proyecto.      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar la selección del formato de exportación y la descarga del archivo generado.         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Implementar los mensajes de confirmación, advertencia y error durante la generación y           |
|                                               | exportación del reporte.                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Verificar la generación de reportes cuando el proyecto posee información registrada.            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Validar el comportamiento del sistema cuando el proyecto no posee actividades o interrupciones  |
|                                               | para el período consultado.                                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Verificar la generación y descarga de los diferentes formatos de exportación soportados por el  |
|                                               | sistema.                                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 15                                            | Ejecutar pruebas funcionales para validar la consistencia de la información presentada y        |
|                                               | exportada.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 09/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-10 - Generar |               |
|                               |                               |                               |               | reportes del    |               |
|                               |                               |                               |               | proyecto        |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-10           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
