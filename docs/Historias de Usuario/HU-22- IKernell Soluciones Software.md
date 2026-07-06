+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-22                         | **Nombre:**                   | Consultar dashboard ejecutivo                                   |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-05, HU-06, HU-07, HU-09, HU-10, HU-11, HU-12 y HU-13                                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Dashboard Ejecutivo                                                                             |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | coordinador o líder de proyectos                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | consultar un tablero ejecutivo con indicadores relevantes del   |
|                                               |                               | sistema                                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | obtener una visión general del estado de los proyectos, el      |
|                                               |                               | equipo de trabajo y las actividades registradas que facilite la |
|                                               |                               | toma de decisiones                                              |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe mostrar un resumen ejecutivo con indicadores relevantes según el rol         |
|                                               | autenticado.                                                                                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar únicamente la información autorizada para el usuario autenticado.    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe presentar indicadores actualizados a partir de la información registrada en  |
|                                               | el sistema.                                                                                     |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar información resumida de proyectos, desarrolladores y actividades.    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar indicadores de errores e interrupciones registradas.                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar el detalle asociado a un indicador cuando corresponda.    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar mensajes informativos cuando no existan datos disponibles.           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe adaptarse automáticamente al tema claro u oscuro seleccionado.               |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mantener un diseño responsive para diferentes resoluciones.                  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | que el coordinador o líder inicia sesión correctamente          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | accede al Dashboard Ejecutivo                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra los indicadores correspondientes a su rol    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | que existen proyectos registrados                               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el usuario consulta el dashboard                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema presenta el resumen de proyectos activos,            |
|                                               |                               | finalizados e inactivos                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que existen desarrolladores registrados                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el dashboard carga la información                               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra la cantidad de desarrolladores activos,      |
|                                               |                               | inactivos y sin asignación a proyectos                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que existen actividades registradas                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el usuario consulta el dashboard                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra la cantidad de actividades pendientes, en    |
|                                               |                               | desarrollo y finalizadas                                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que existen registros de errores e interrupciones               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el dashboard genera los indicadores                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra el resumen correspondiente para facilitar el |
|                                               |                               | seguimiento del proyecto                                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el usuario selecciona un indicador                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el indicador permite navegación                                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema redirige a la vista relacionada manteniendo el       |
|                                               |                               | contexto de la consulta                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que no existen datos suficientes para alguno de los indicadores |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el dashboard carga la información                               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no existen datos disponibles sin generar |
|                                               |                               | errores en la interfaz                                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el usuario accede desde diferentes dispositivos             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | visualiza el Dashboard Ejecutivo                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema adapta correctamente la distribución de los          |
|                                               |                               | indicadores para conservar la legibilidad y la experiencia de   |
|                                               |                               | usuario                                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir los indicadores ejecutivos que estarán disponibles para cada rol autorizado.            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz del Dashboard Ejecutivo siguiendo la identidad visual de IKernell.          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la distribución responsive de los indicadores para diferentes resoluciones de pantalla. |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar la consulta consolidada de información para la generación de indicadores            |
|                                               | ejecutivos.                                                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar la visualización de indicadores relacionados con proyectos, desarrolladores y       |
|                                               | actividades.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la visualización de indicadores relacionados con errores e interrupciones           |
|                                               | registradas.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la navegación desde los indicadores hacia las vistas correspondientes cuando        |
|                                               | aplique.                                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar la adaptación automática del Dashboard Ejecutivo al tema claro u oscuro             |
|                                               | seleccionado.                                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar el manejo de escenarios donde no exista información para uno o varios indicadores.  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Validar que cada rol únicamente visualice la información autorizada dentro del Dashboard        |
|                                               | Ejecutivo.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Validar la consistencia de los indicadores mostrados con la información registrada en la base   |
|                                               | de datos.                                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Realizar pruebas funcionales del Dashboard Ejecutivo en diferentes resoluciones, temas y        |
|                                               | perfiles de usuario.                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Registrar automáticamente la trazabilidad de las consultas al Dashboard cuando corresponda.     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Verificar el rendimiento del Dashboard para garantizar tiempos de carga adecuados durante la    |
|                                               | consulta de indicadores.                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 05/07/2026                    | Efrain Manotas                |               | Desarrollo de   |               |
|                               |                               |                               |               | HU-22           |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
|                               |                               |                               |               |                 |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
