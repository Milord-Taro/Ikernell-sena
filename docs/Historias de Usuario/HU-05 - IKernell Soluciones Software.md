+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-05                         | **Nombre:**                   | Registrar y gestionar perfil de desarrollador                   |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Alta                                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-03                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Coordinador                                                                           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | coordinador de proyectos                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | registrar y administrar la información de los desarrolladores   |
|                                               |                               | de la empresa.                                                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | mantener actualizado el directorio del equipo de trabajo de la  |
|                                               |                               | empresa                                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir al coordinador registrar un nuevo perfil de desarrollador.          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar perfiles de desarrolladores registrados.                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir modificar la información de un perfil existente.                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir inhabilitar lógicamente un perfil de desarrollador.                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar que los campos obligatorios sean diligenciados.                      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar que la identificación del desarrollador sea única.                   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar que el correo electrónico sea único.                                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir asociar una especialidad al desarrollador.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir asociar un proyecto cuando corresponda.                             |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir cargar una fotografía de perfil en un formato válido.               |
|                                               |                                                                                                 |
|                                               | \- El sistema debe registrar el estado del desarrollador (Activo/Inactivo).                     |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir buscar desarrolladores por diferentes criterios.                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir registrar desarrolladores sin asignarlos inmediatamente a un        |
|                                               | proyecto.                                                                                       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar los proyectos a los que pertenece un desarrollador.       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar cuando un desarrollador no tenga proyectos asignados.                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el coordinador diligencia el formulario de registro con todos   |
|                                               |                               | los datos requeridos incluyendo foto                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | hace clic en \'Guardar perfil\'                                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema almacena el perfil y muestra confirmación de         |
|                                               |                               | registro exitoso                                                |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el coordinador no llenó todos los campos requeridos o no        |
|                                               |                               | cumplen con los requisitos                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | hace clic en \'Guardar perfil\'                                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema lanza un mensaje de error señalando los problemas a  |
|                                               |                               | corregir                                                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | el coordinador busca un desarrollador por nombre o              |
|                                               |                               | identificación                                                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | se encuentran resultados                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra la ficha del desarrollador con opción de     |
|                                               |                               | modificar o inhabilitar                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | el coordinador decide inhabilitar a un desarrollador            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | confirma la acción de inhabilitación                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema marca al desarrollador como inactivo y ya no aparece |
|                                               |                               | en listas de asignación                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el coordinador intenta registrar un desarrollador con una   |
|                                               |                               | identificación ya existente                                     |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda el formulario                                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la identificación ya se encuentra        |
|                                               |                               | registrada                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el coordinador intenta registrar un desarrollador con un    |
|                                               |                               | correo electrónico ya registrado                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda el formulario                                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que el correo electrónico ya se encuentra    |
|                                               |                               | registrado                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el coordinador busca un desarrollador y no existen          |
|                                               |                               | coincidencias                                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | ejecuta la búsqueda                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no se encontraron resultados.            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el coordinador modifica correctamente un perfil existente   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | guarda los cambios                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema actualiza la información y confirma la modificación  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 09**                              | **Dado:**                     | que el coordinador intenta inhabilitar un perfil que ya se      |
|                                               |                               | encuentra inactivo                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | confirma la acción                                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que el perfil ya se encuentra inhabilitado   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 09**                              | **Dado:**                     | que el coordinador consulta el perfil de un desarrollador       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | visualiza la información del perfil                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra los proyectos a los que pertenece o informa  |
|                                               |                               | que actualmente no tiene proyectos asignados.                   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la gestión de desarrolladores, incluyendo registro,          |
|                                               | consulta, actualización, inhabilitación y asignación a proyectos.                               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar el formulario para el registro y edición de desarrolladores con los campos requeridos   |
|                                               | por el negocio.                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la vista de consulta de perfiles mostrando la información del desarrollador, su estado  |
|                                               | y los proyectos a los que pertenece.                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio para registrar nuevos desarrolladores validando la información          |
|                                               | obligatoria y las reglas de negocio.                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar el servicio para consultar, actualizar e inhabilitar desarrolladores manteniendo la |
|                                               | integridad de la información.                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar las validaciones de unicidad para identificación y correo electrónico, así como las |
|                                               | restricciones para la inhabilitación de desarrolladores con actividades pendientes.             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la consulta de los proyectos y equipos a los que pertenece cada desarrollador.      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar el formulario para el registro y edición de desarrolladores siguiendo las reglas de |
|                                               | negocio definidas.                                                                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar la búsqueda, filtrado y consulta de perfiles de desarrolladores.                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar la visualización del estado del desarrollador y de los proyectos a los que se       |
|                                               | encuentra asignado.                                                                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Implementar las acciones para actualizar e inhabilitar desarrolladores mostrando los mensajes   |
|                                               | de confirmación y validación correspondientes.                                                  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Verificar el registro exitoso de desarrolladores con información válida y el cumplimiento de    |
|                                               | las reglas de negocio.                                                                          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Validar la búsqueda, consulta, actualización e inhabilitación de desarrolladores, incluyendo    |
|                                               | los escenarios de error y restricciones.                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Ejecutar pruebas funcionales para verificar la correcta gestión de desarrolladores, la          |
|                                               | visualización de proyectos asociados y el cumplimiento de las reglas de negocio.                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 15                                            | Validar reglas de negocio y mensajes de error, asegurando los estándares de dominio             |
|                                               | establecidos.                                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 09/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-05 -         |               |
|                               |                               |                               |               | Registrar y     |               |
|                               |                               |                               |               | gestionar       |               |
|                               |                               |                               |               | perfil de       |               |
|                               |                               |                               |               | desarrollador   |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-05           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
