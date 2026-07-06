+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-03                         | **Nombre:**                   | Iniciar sesión como trabajador                                  |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | N/A                                                                                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Autenticación                                                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | trabajador registrado (coordinador, líder o desarrollador)      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | iniciar sesión en el sistema con mi usuario y contraseña para   |
|                                               |                               | acceder a las funcionalidades de mi rol                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | acceder de forma segura a las funcionalidades autorizadas según |
|                                               |                               | mi rol dentro de la plataforma.                                 |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir el inicio de sesión únicamente a trabajadores registrados.          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe validar las credenciales ingresadas por el usuario.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe autenticar al usuario mediante un mecanismo seguro.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe generar un token JWT cuando la autenticación sea exitosa.                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe identificar el rol del trabajador autenticado.                               |
|                                               |                                                                                                 |
|                                               | \- El sistema debe redirigir al usuario al dashboard correspondiente según su rol.              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe impedir el acceso cuando las credenciales sean incorrectas.                  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar mensajes de validación cuando existan campos obligatorios sin        |
|                                               | diligenciar.                                                                                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe finalizar la sesión automáticamente después del tiempo de inactividad        |
|                                               | configurado.                                                                                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe proteger el acceso a las funcionalidades según el rol autenticado.           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | un trabajador registrado accede al login de inicio de sesión    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | ingresa sus credenciales correctas y hace clic en "Iniciar      |
|                                               |                               | sesión"                                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema valida las credenciales, genera un token JWT (JSON   |
|                                               |                               | Web Token) y redirige al dashboard según el rol del usuario     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el trabajador ingresa una contraseña incorrecta                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | intenta iniciar sesión                                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra el mensaje \'Usuario o contraseña            |
|                                               |                               | inválidos\' sin especificar cuál es incorrecto                  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | el trabajador deja campos vacíos en el formulario               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | intenta iniciar sesión                                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra mensajes de validación indicando que los     |
|                                               |                               | campos son obligatorios                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el trabajador intenta iniciar sesión con un usuario         |
|                                               |                               | inexistente.                                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | envía sus credenciales.                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que las credenciales son inválidas sin       |
|                                               |                               | indicar cuál de los datos es incorrecto.                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que la cuenta del trabajador se encuentra inactiva.             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | intenta iniciar sesión.                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que la cuenta no se encuentra habilitada     |
|                                               |                               | para acceder.                                                   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que ocurre un error durante el proceso de autenticación.        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el trabajador intenta iniciar sesión.                           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no fue posible completar el proceso y    |
|                                               |                               | solicita intentarlo nuevamente.                                 |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el trabajador inicia sesión correctamente.                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | accede a la plataforma.                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema permite únicamente el acceso a las funcionalidades   |
|                                               |                               | autorizadas para su rol.                                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que la sesión permanece inactiva durante el tiempo configurado. |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | expira el tiempo de inactividad.                                |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema finaliza la sesión y solicita nuevamente la          |
|                                               |                               | autenticación.                                                  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para la autenticación de trabajadores, incluyendo validación de   |
|                                               | credenciales, control de acceso por rol y manejo de sesiones.                                   |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz del formulario de inicio de sesión garantizando una experiencia clara,      |
|                                               | segura y fácil de utilizar.                                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar los mensajes de validación, autenticación y error que se mostrarán durante el proceso   |
|                                               | de inicio de sesión.                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio de autenticación para validar las credenciales del trabajador y         |
|                                               | permitir el acceso al sistema.                                                                  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar la generación del token JWT con la información del usuario autenticado y su rol     |
|                                               | correspondiente.                                                                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar las validaciones de negocio para credenciales inválidas, usuarios inactivos y       |
|                                               | restricciones de acceso.                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la configuración de expiración automática de la sesión según las políticas          |
|                                               | definidas por el sistema.                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar el formulario de inicio de sesión siguiendo las reglas de autenticación definidas   |
|                                               | para el negocio.                                                                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar el almacenamiento seguro del token de autenticación y la información necesaria para |
|                                               | mantener la sesión activa.                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar la redirección automática del usuario al módulo correspondiente según el rol        |
|                                               | autenticado.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Verificar el inicio de sesión exitoso con credenciales válidas y la generación correcta del     |
|                                               | token de autenticación.                                                                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Validar el comportamiento del sistema ante credenciales inválidas, usuarios sin autorización y  |
|                                               | errores de autenticación.                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Verificar la expiración automática de la sesión y el bloqueo del acceso a recursos protegidos   |
|                                               | una vez finalizada.                                                                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Ejecutar pruebas funcionales del flujo completo de autenticación, autorización y cierre         |
|                                               | automático de la sesión.                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 05/06/2026                    | Efrain Manotas                |               | Desarrollo de   |               |
|                               |                               |                               |               | HU-02 - Iniciar |               |
|                               |                               |                               |               | sesión como     |               |
|                               |                               |                               |               | trabajador      |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-03           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
