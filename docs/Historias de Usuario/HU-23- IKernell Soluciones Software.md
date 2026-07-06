+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-23                         | **Nombre:**                   | Consultar centro de notificaciones                              |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-03, HU-05, HU-07, HU-09, HU-11, HU-12, HU-13, HU-18                                          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Centro de Notificaciones                                                                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | trabajador autenticado                                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | consultar un centro de notificaciones con los eventos           |
|                                               |                               | relevantes relacionados con mis responsabilidades dentro del    |
|                                               |                               | sistema                                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | mantenerme informado oportunamente sobre cambios, asignaciones  |
|                                               |                               | y eventos importantes sin necesidad de revisar manualmente cada |
|                                               |                               | módulo                                                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe mostrar un centro de notificaciones accesible desde cualquier módulo del     |
|                                               | portal interno.                                                                                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar únicamente las notificaciones correspondientes al trabajador         |
|                                               | autenticado.                                                                                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe generar notificaciones automáticamente cuando ocurra un evento relevante.    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe diferenciar visualmente las notificaciones leídas de las pendientes por      |
|                                               | leer.                                                                                           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir marcar una o varias notificaciones como leídas.                     |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar el detalle del evento asociado cuando aplique.            |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mantener un historial de notificaciones recientes del usuario.               |
|                                               |                                                                                                 |
|                                               | \- El sistema debe registrar la trazabilidad de las acciones realizadas sobre las               |
|                                               | notificaciones cuando corresponda.                                                              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe informar cuando el usuario no tenga notificaciones pendientes.               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | que el trabajador inicia sesión                                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | accede al Centro de Notificaciones                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra únicamente las notificaciones                |
|                                               |                               | correspondientes a su usuario                                   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | que ocurre un evento relevante para el trabajador.              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el sistema procesa dicho evento.                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | genera automáticamente una nueva notificación asociada al       |
|                                               |                               | usuario.                                                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el trabajador consulta una notificación pendiente.          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | visualiza su contenido.                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema cambia automáticamente su estado a leída.            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que una notificación posee información relacionada.             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el trabajador selecciona la opción de consulta.                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema redirige al módulo correspondiente.                  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el trabajador selecciona varias notificaciones.             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | elige marcarlas como leídas.                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema actualiza correctamente el estado de todas ellas.    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el trabajador no posee notificaciones registradas.          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | consulta el centro de notificaciones.                           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no existen notificaciones disponibles.   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que ocurre un error al consultar las notificaciones.            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el sistema no puede recuperar la información.                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | muestra un mensaje informativo sin afectar la navegación del    |
|                                               |                               | usuario.                                                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el trabajador accede desde diferentes dispositivos.         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | consulta el centro de notificaciones.                           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema adapta correctamente la interfaz manteniendo la      |
|                                               |                               | legibilidad y funcionalidad.                                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la generación y consulta de notificaciones del sistema.      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz del Centro de Notificaciones siguiendo la identidad visual de IKernell.     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la representación visual de los estados leída y pendiente.                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar la generación automática de notificaciones a partir de los eventos definidos por el |
|                                               | negocio.                                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar la consulta de notificaciones correspondientes al trabajador autenticado.           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la actualización del estado de las notificaciones al ser consultadas o marcadas     |
|                                               | como leídas.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la navegación hacia el módulo relacionado cuando una notificación lo permita.       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar el historial de notificaciones recientes del trabajador.                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar las validaciones de permisos para garantizar que cada usuario consulte únicamente   |
|                                               | sus notificaciones.                                                                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar el manejo de escenarios donde no existan notificaciones disponibles.                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Registrar automáticamente la trazabilidad de las acciones realizadas sobre las notificaciones   |
|                                               | cuando corresponda.                                                                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Validar las reglas de negocio y los mensajes informativos durante la gestión de notificaciones. |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Realizar pruebas funcionales del flujo completo de generación, consulta y actualización de      |
|                                               | notificaciones.                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Verificar el rendimiento del Centro de Notificaciones bajo múltiples eventos registrados.       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 05/07/2026                    | Efrain Manotas                |               | Desarrollo de   |               |
|                               |                               |                               |               | HU-23           |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
|                               |                               |                               |               |                 |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
