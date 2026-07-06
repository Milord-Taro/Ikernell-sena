+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-07                         | **Nombre:**                   | Registrar y gestionar proyectos                                 |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Alta                                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-03                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Líder                                                                                 |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | líder de proyectos                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | registrar y administrar los proyectos bajo mi responsabilidad.  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | organizar y controlar los proyectos que están bajo mi           |
|                                               |                               | responsabilidad                                                 |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir al líder registrar nuevos proyectos.                                |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar los proyectos registrados.                                |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir modificar la información de un proyecto existente.                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir inhabilitar lógicamente un proyecto.                                |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir asignar desarrolladores a un proyecto.                              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar la información obligatoria antes de registrar un proyecto.           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar la consistencia de las fechas del proyecto.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir buscar proyectos por diferentes criterios.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe calcular y mostrar el porcentaje de avance del proyecto.                     |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar el estado general del proyecto.                                      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe restringir la gestión de proyectos a usuarios autorizados.                   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir la asignación de desarrolladores inactivos.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema solo debe permitir asignar desarrolladores que se encuentren activos.             |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir asignar un desarrollador inactivo a un proyecto.                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el líder diligencia el formulario de registro de proyecto con   |
|                                               |                               | nombre, descripción y fechas                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | hace clic en \'Registrar proyecto\'                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema crea el proyecto y permite asignarle desarrolladores |
|                                               |                               | desde el mismo formulario                                       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el líder busca un proyecto por nombre o ID                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el proyecto existe                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra la ficha del proyecto con opciones de        |
|                                               |                               | modificar, inhabilitar o consultar estado                       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | el líder consulta el estado de un proyecto                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el proyecto tiene actividades y etapas registradas              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra el porcentaje de avance, etapas completadas  |
|                                               |                               | y actividades pendientes                                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el líder intenta registrar un proyecto con información      |
|                                               |                               | incompleta                                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | selecciona la opción \"Registrar proyecto\"                     |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa los campos obligatorios que deben            |
|                                               |                               | completarse                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que la fecha de finalización es anterior a la fecha de inicio   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el líder registra el proyecto                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa la inconsistencia y no permite continuar     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el líder busca un proyecto y no existen coincidencias       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | ejecuta la búsqueda                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no se encontraron proyectos registrados  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el líder modifica correctamente la información de un        |
|                                               |                               | proyecto                                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda los cambios                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema actualiza la información y confirma la modificación  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el líder intenta inhabilitar un proyecto ya inactivo        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | confirma la acción                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que el proyecto ya se encuentra inhabilitado |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 09**                              | **Dado:**                     | que el proyecto posee etapas y actividades registradas          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el líder consulta el estado del proyecto                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema presenta el porcentaje de avance, las etapas         |
|                                               |                               | completadas y las actividades pendientes                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 10**                              | **Dado:**                     | que el líder intenta asignar un desarrollador inactivo a un     |
|                                               |                               | proyecto                                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda la asignación                                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que el desarrollador no puede ser asignado   |
|                                               |                               | porque se encuentra inactivo                                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la gestión de proyectos, incluyendo registro, actualización, |
|                                               | asignación de desarrolladores, estados y restricciones del proyecto.                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar el formulario para el registro y edición de proyectos con la información requerida por  |
|                                               | el negocio.                                                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la vista de consulta del proyecto mostrando su información general, equipo de trabajo,  |
|                                               | estado y avance.                                                                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio para registrar nuevos proyectos validando la información obligatoria y  |
|                                               | las reglas de negocio.                                                                          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar el servicio para consultar, actualizar e inhabilitar proyectos manteniendo la       |
|                                               | integridad de la información.                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la asignación y desvinculación de desarrolladores al equipo del proyecto validando  |
|                                               | las restricciones definidas por el negocio.                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar las validaciones para garantizar que únicamente desarrolladores activos puedan ser  |
|                                               | asignados al proyecto.                                                                          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar el cálculo automático del estado y porcentaje de avance del proyecto a partir del   |
|                                               | progreso de sus etapas y actividades.                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar el formulario para la gestión de proyectos siguiendo las reglas de negocio          |
|                                               | establecidas.                                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar la búsqueda, filtrado y consulta de proyectos.                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Implementar la gestión del equipo del proyecto permitiendo asignar y retirar desarrolladores    |
|                                               | autorizados.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Implementar la visualización del estado, porcentaje de avance y equipo asignado al proyecto.    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Verificar el registro, consulta, actualización e inhabilitación de proyectos con información    |
|                                               | válida.                                                                                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Validar las reglas de negocio relacionadas con fechas, datos obligatorios y asignación de       |
|                                               | desarrolladores.                                                                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 15                                            | Ejecutar pruebas funcionales para verificar el cálculo automático del avance, la gestión del    |
|                                               | equipo y el comportamiento general del proyecto.                                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 09/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-07 -         |               |
|                               |                               |                               |               | Registrar y     |               |
|                               |                               |                               |               | gestionar       |               |
|                               |                               |                               |               | proyectos       |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-07           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
