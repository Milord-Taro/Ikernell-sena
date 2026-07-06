+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-14                         | **Nombre:**                   | Gestionar mensajes de contacto                                  |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | N/A                                                                                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Coordinador                                                                           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | coordinador de proyectos                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | gestionar los mensajes enviados desde el formulario de          |
|                                               |                               | contacto, responderlos desde el sistema y registrar su          |
|                                               |                               | atención.                                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | dar seguimiento comercial a los interesados que contacten a     |
|                                               |                               | IKernell sin perder trazabilidad                                |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe mostrar la bandeja de mensajes ordenada por estado y fecha.                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar el detalle completo de un mensaje recibido.               |
|                                               |                                                                                                 |
|                                               | \- El sistema debe cambiar automáticamente el estado del mensaje a \"Leído\" cuando sea abierto |
|                                               | por primera vez.                                                                                |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir responder únicamente mensajes pendientes o leídos.                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar que la respuesta no esté vacía antes de enviarla.                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe registrar automáticamente la respuesta, la fecha de atención y el            |
|                                               | responsable.                                                                                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe cambiar el estado del mensaje a \"Atendido\" únicamente cuando la respuesta  |
|                                               | haya sido enviada correctamente.                                                                |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir responder mensajes que ya se encuentren atendidos.                   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mantener la trazabilidad completa de la atención realizada.                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe informar al coordinador el resultado del envío.                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | que hay mensajes pendientes                                     |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el coordinador accede a la bandeja                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | ve todos los mensajes organizados por estado y fecha            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | que el coordinador abre un mensaje pendiente                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | lo visualiza                                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el estado cambia automáticamente a "Leído"                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el coordinador escribe una respuesta y hace clic en         |
|                                               |                               | "Enviar"                                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el correo se envía exitosamente                                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el estado cambia a "Atendido\" y se registran respuesta, fecha  |
|                                               |                               | y responsable                                                   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el envío del correo falla                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | ocurre el error                                                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra mensaje de error y el estado no cambia       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el coordinador intenta enviar una respuesta vacía           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | presiona el botón Enviar                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la respuesta es obligatoria              |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el mensaje ya fue atendido                                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el coordinador intenta responder nuevamente                     |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema impide la operación e informa que el mensaje ya fue  |
|                                               |                               | gestionado                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el mensaje no existe o fue eliminado                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el coordinador intenta acceder al detalle                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que el mensaje no está disponible            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que la respuesta fue enviada correctamente                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el sistema finaliza el proceso                                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | registra automáticamente la fecha, el responsable y la          |
|                                               |                               | respuesta en el historial del mensaje                           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la gestión de mensajes, incluyendo el flujo de estados,      |
|                                               | validaciones y restricciones de atención.                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la bandeja de mensajes organizados por estado, fecha y responsable de atención.         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la vista de detalle del mensaje y el formulario para responder al interesado.           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio para consultar los mensajes y actualizar automáticamente el estado a    |
|                                               | \"Leído\" cuando corresponda.                                                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar el servicio para registrar la respuesta del coordinador y actualizar el estado del  |
|                                               | mensaje a \"Atendido\".                                                                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Integrar el servicio de envío de correo electrónico y validar el resultado antes de actualizar  |
|                                               | el estado del mensaje.                                                                          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Registrar automáticamente la respuesta, la fecha de atención y el responsable en el historial   |
|                                               | del mensaje.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar la bandeja de mensajes con filtros por estado y acceso al detalle de cada           |
|                                               | solicitud.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar el formulario de respuesta mostrando mensajes de validación, confirmación y errores |
|                                               | de envío.                                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Verificar el flujo completo de consulta, lectura, respuesta y atención de mensajes.             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Validar los escenarios de respuesta vacía, mensajes ya atendidos, errores de envío y accesos    |
|                                               | inválidos.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Ejecutar pruebas funcionales para confirmar la correcta persistencia de la información y la     |
|                                               | trazabilidad del proceso.                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 11/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-14 -         |               |
|                               |                               |                               |               | Gestionar       |               |
|                               |                               |                               |               | mensajes de     |               |
|                               |                               |                               |               | contacto        |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-14           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
