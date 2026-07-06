+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-02                         | **Nombre:**                   | Envío de preguntas de cualquier usuario interesado              |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Baja                                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU Relacionada: HU-01                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo Público / Portal Web                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | usuario interesado en los servicios de IKernell                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | enviar un mensaje con mi pregunta a través de un formulario de  |
|                                               |                               | contacto cuando no encuentro respuesta en las preguntas         |
|                                               |                               | frecuentes                                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | comunicar una consulta a la empresa cuando no encuentre         |
|                                               |                               | respuesta en las preguntas frecuentes.                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir a un usuario interesado enviar un mensaje mediante un formulario de |
|                                               | contacto.                                                                                       |
|                                               |                                                                                                 |
|                                               | \- El formulario debe estar disponible sin necesidad de autenticación.                          |
|                                               |                                                                                                 |
|                                               | \- El formulario debe solicitar como mínimo nombre, correo electrónico y mensaje.               |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar los campos obligatorios antes del envío.                             |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar el formato del correo electrónico.                                   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe almacenar el mensaje enviado correctamente.                                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar una confirmación cuando el mensaje sea enviado exitosamente.         |
|                                               |                                                                                                 |
|                                               | \- El sistema debe informar al usuario cuando ocurra un error durante el envío.                 |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir el envío de formularios con información incompleta.                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe registrar la fecha y hora de recepción del mensaje.                          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el usuario interesado no encuentra su duda en las FAQ           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | hace clic en "Escribenos" o en "Contactanos"                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra un formulario con campos de nombre, correo y |
|                                               |                               | mensaje a enviar                                                |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el usuario interesado diligencia el formulario completamente    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | hace clic en \'Enviar\'                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema registra el mensaje y muestra una confirmación de    |
|                                               |                               | envío exitoso                                                   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | el usuario interesado intenta enviar el formulario con campos   |
|                                               |                               | vacíos                                                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | presiona el botón de envío                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra mensajes de validación indicando los campos  |
|                                               |                               | obligatorios                                                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | el usuario diligencia un correo electrónico con formato         |
|                                               |                               | inválido.                                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | intenta enviar el formulario.                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que el correo electrónico no tiene un        |
|                                               |                               | formato válido y no permite el envío.                           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | el sistema presenta un error al registrar el mensaje.           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el usuario intenta enviarlo.                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la solicitud no pudo procesarse e invita |
|                                               |                               | a intentar nuevamente.                                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | el usuario intenta enviar un mensaje cuyo contenido supera el   |
|                                               |                               | límite permitido.                                               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | presiona el botón \"Enviar\".                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa el límite permitido y solicita corregir el   |
|                                               |                               | contenido.                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | el usuario envía correctamente el formulario.                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el mensaje es registrado.                                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el formulario se limpia y el sistema muestra la confirmación    |
|                                               |                               | del envío.                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para el formulario de contacto, incluyendo los campos             |
|                                               | obligatorios, validaciones y comportamiento esperado durante el envío.                          |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz del formulario de contacto garantizando una experiencia clara, accesible y  |
|                                               | fácil de utilizar.                                                                              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar los mensajes de validación, confirmación y error que se mostrarán durante el            |
|                                               | diligenciamiento y envío del formulario.                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el formulario de contacto permitiendo al usuario diligenciar y enviar su consulta   |
|                                               | desde el portal público.                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar las validaciones de los campos obligatorios antes de permitir el envío del          |
|                                               | formulario.                                                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la validación del formato del correo electrónico conforme a las reglas definidas    |
|                                               | por el negocio.                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la visualización de mensajes de error cuando la información ingresada no cumpla las |
|                                               | validaciones establecidas.                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar la confirmación visual del envío exitoso de la consulta al usuario.                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar el servicio para recibir y procesar las solicitudes enviadas desde el formulario de |
|                                               | contacto.                                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar las validaciones de negocio sobre la información recibida antes de registrar la     |
|                                               | solicitud.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Implementar el almacenamiento del mensaje de contacto y asociar automáticamente su estado       |
|                                               | inicial como **Pendiente**.                                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Verificar el envío exitoso de consultas con información válida.                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Validar el comportamiento del sistema ante campos obligatorios vacíos, formatos inválidos y     |
|                                               | datos inconsistentes.                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Ejecutar pruebas funcionales para verificar el registro de la solicitud, el manejo de errores y |
|                                               | la correcta persistencia de la información.                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 05/06/2026                    | Efrain Manotas                |               | Envío de        |               |
|                               |                               |                               |               | preguntas fuera |               |
|                               |                               |                               |               | del FAQ de      |               |
|                               |                               |                               |               | cualquier       |               |
|                               |                               |                               |               | usuario         |               |
|                               |                               |                               |               | interesado      |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-02           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
