+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-20                         | **Nombre:**                   | Gestionar tipos de interrupción                                 |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Baja                                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-13                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Administración de Catálogos                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | coordinador de proyectos                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | administrar el catálogo de tipos de interrupción mediante       |
|                                               |                               | operaciones de registro, consulta, actualización e              |
|                                               |                               | inhabilitación lógica.                                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | mantener actualizado el listado de tipos de interrupción        |
|                                               |                               | utilizados durante el registro de interrupciones en los         |
|                                               |                               | proyectos.                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir registrar nuevos tipos de interrupción.                             |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar los tipos de interrupción registrados.                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir modificar la información de un tipo de interrupción existente.      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir realizar la inhabilitación lógica de un tipo de interrupción.       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir registrar tipos de interrupción duplicados.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir inhabilitar tipos de interrupción asociados a registros de           |
|                                               | interrupciones.                                                                                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar únicamente los tipos de interrupción activos durante el registro de  |
|                                               | interrupciones.                                                                                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe registrar la trazabilidad de las operaciones realizadas sobre el catálogo.   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe informar el resultado de cada operación realizada.                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | que el coordinador accede al módulo de tipos de interrupción    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | registra un nuevo tipo de interrupción con información válida   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema almacena el registro y lo incorpora al catálogo      |
|                                               |                               | disponible                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | que el coordinador consulta el catálogo de tipos de             |
|                                               |                               | interrupción                                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | existen registros disponibles                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra el listado con su información y estado       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el coordinador selecciona un tipo de interrupción existente |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | actualiza su información                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema guarda los cambios correctamente                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el coordinador intenta registrar un tipo de interrupción ya |
|                                               |                               | existente                                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el nombre coincide con otro registro activo                     |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema impide el registro e informa la duplicidad           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el coordinador selecciona un tipo de interrupción sin       |
|                                               |                               | registros asociados                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | solicita su inhabilitación                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema cambia su estado a inactivo conservando el historial |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que un tipo de interrupción posee registros asociados           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el coordinador intenta inhabilitarlo                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema bloquea la operación e informa que existen registros |
|                                               |                               | relacionados                                                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que un desarrollador registra una interrupción                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | consulta los tipos de interrupción disponibles                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra únicamente los tipos de interrupción activos |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el coordinador realiza una operación sobre un tipo de       |
|                                               |                               | interrupción                                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | la operación finaliza correctamente                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema registra automáticamente la trazabilidad             |
|                                               |                               | correspondiente                                                 |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la administración del catálogo de tipos de interrupción.     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz para registrar, consultar y editar tipos de interrupción.                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la vista de administración del catálogo de tipos de interrupción.                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el registro de nuevos tipos de interrupción en el catálogo.                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar la consulta del catálogo de tipos de interrupción registrados.                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la actualización de la información de un tipo de interrupción existente.            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la inhabilitación lógica de tipos de interrupción sin eliminar su historial.        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar la validación que impida registrar tipos de interrupción duplicados o inhabilitar   |
|                                               | registros asociados.                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar el formulario de gestión utilizando las validaciones definidas.                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar la búsqueda y el filtrado del catálogo de tipos de interrupción para facilitar su   |
|                                               | administración.                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Validar que únicamente los tipos de interrupción activos estén disponibles durante el registro  |
|                                               | de interrupciones.                                                                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Registrar automáticamente la trazabilidad de las operaciones realizadas sobre los tipos de      |
|                                               | interrupción.                                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Validar las reglas de negocio y los mensajes mostrados durante cada operación.                  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Realizar pruebas funcionales del flujo completo de administración del catálogo de tipos de      |
|                                               | interrupción.                                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 05/07/2026                    | Efrain Manotas                |               | Desarrollo de   |               |
|                               |                               |                               |               | HU-20           |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
|                               |                               |                               |               |                 |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
