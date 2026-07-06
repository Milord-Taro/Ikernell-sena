+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-06                         | **Nombre:**                   | Generar reporte de desempeño del desarrollador                  |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-05                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Coordinador                                                                           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | coordinador de proyectos                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | generar y consultar el reporte de desempeño de un desarrollador |
|                                               |                               | desde su ficha de perfil.                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | hacer seguimiento al rendimiento individual de cada miembro del |
|                                               |                               | equipo                                                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir al coordinador generar un reporte de desempeño de un desarrollador. |
|                                               |                                                                                                 |
|                                               | \- El reporte debe incluir las actividades registradas del desarrollador.                       |
|                                               |                                                                                                 |
|                                               | \- El reporte debe incluir los errores asociados al desarrollador.                              |
|                                               |                                                                                                 |
|                                               | \- El reporte debe incluir las interrupciones registradas.                                      |
|                                               |                                                                                                 |
|                                               | \- El reporte debe mostrar la información correspondiente al proyecto seleccionado o asignado.  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe informar cuando el desarrollador no posea información para generar el        |
|                                               | reporte.                                                                                        |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir visualizar el reporte en pantalla.                                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir exportar el reporte en formato PDF o archivo plano.                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar la fecha de generación del reporte.                                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe restringir la generación del reporte únicamente a usuarios autorizados.      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el coordinador tiene abierta la ficha de un desarrollador       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | hace clic en \'Generar reporte de desempeño\'                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra un reporte con las actividades realizadas,   |
|                                               |                               | errores reportados e interrupciones del desarrollador en su     |
|                                               |                               | proyecto asignado con trazabilidad                              |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el desarrollador no tiene actividades registradas               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | se genera el reporte                                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra el reporte vacío con el mensaje \'Sin        |
|                                               |                               | actividades registradas\'                                       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el desarrollador posee actividades, pero no tiene errores   |
|                                               |                               | ni interrupciones registradas                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el coordinador genera el reporte                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra las actividades registradas e indica que no  |
|                                               |                               | existen errores ni interrupciones asociadas                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que ocurre un error al consultar la información del             |
|                                               |                               | desarrollador                                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el coordinador genera el reporte                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no fue posible generar el reporte e      |
|                                               |                               | invita a intentarlo nuevamente                                  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el reporte fue generado correctamente                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el coordinador selecciona la opción de exportar                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema genera el archivo en el formato seleccionado         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que un usuario sin permisos intenta generar el reporte          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | accede a la opción correspondiente                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema deniega el acceso e informa que no posee             |
|                                               |                               | autorización                                                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el desarrollador posee información registrada durante       |
|                                               |                               | diferentes periodos                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el coordinador genera el reporte                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema organiza la información cronológicamente para        |
|                                               |                               | facilitar su consulta                                           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la generación del reporte de desempeño del desarrollador,    |
|                                               | incluyendo las métricas, criterios de evaluación y filtros disponibles.                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz para la consulta del reporte de desempeño mostrando la información de forma |
|                                               | clara y organizada.                                                                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la interfaz de exportación permitiendo seleccionar el formato del archivo antes de      |
|                                               | generarlo.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio para consultar las actividades ejecutadas por el desarrollador durante  |
|                                               | el período seleccionado.                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar el servicio para obtener los errores e interrupciones asociados al desarrollador.   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la consolidación de la información necesaria para generar el reporte de desempeño.  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la generación del reporte en los formatos de exportación soportados por el sistema. |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar la visualización del reporte de desempeño con la información consolidada del        |
|                                               | desarrollador.                                                                                  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar la opción para seleccionar el formato de exportación antes de generar el archivo.   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar la descarga del reporte generado y mostrar mensajes de confirmación o error según   |
|                                               | el resultado del proceso.                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Verificar la generación del reporte cuando el desarrollador posee información registrada para   |
|                                               | el período consultado.                                                                          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Validar el comportamiento del sistema cuando el desarrollador no posee actividades, errores o   |
|                                               | interrupciones registradas.                                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Verificar la generación y descarga de los diferentes formatos de exportación soportados.        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Ejecutar pruebas funcionales para validar la consistencia de la información presentada y        |
|                                               | exportada.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 09/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-06 - Generar |               |
|                               |                               |                               |               | reporte de      |               |
|                               |                               |                               |               | desempeño del   |               |
|                               |                               |                               |               | desarrollador   |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-06           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
