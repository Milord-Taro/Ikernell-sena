+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-01                         | **Nombre:**                   | Consultar información pública de la empresa en aplicativo web   |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Baja                                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-03                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo Portal público                                                                           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | usuario anónimo                                                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | acceder a la información pública de IKernell: lineamientos,     |
|                                               |                               | portafolio de servicios, noticias, preguntas frecuentes, links  |
|                                               |                               | de interés e información de contacto, sin necesidad de          |
|                                               |                               | registrarme.                                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | conocer la empresa y los servicios que ofrece                   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir el acceso al portal público sin autenticación.                      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar la información institucional de la empresa.                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar el portafolio de servicios.                                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar las noticias disponibles para consulta pública.                      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar la sección de preguntas frecuentes.                       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir acceder a enlaces externos autorizados.                             |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar la información de contacto de la empresa.                            |
|                                               |                                                                                                 |
|                                               | \- El sistema debe restringir el acceso a contenido exclusivo para trabajadores.                |
|                                               |                                                                                                 |
|                                               | \- El sistema debe informar cuando un enlace público no se encuentre disponible.                |
|                                               |                                                                                                 |
|                                               | \- El portal debe ser accesible desde dispositivos móviles y de escritorio.                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | un usuario anónimo interesado ingresa al aplicativo web sin     |
|                                               |                               | autenticarse                                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | navega por las secciones públicas del portal                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra toda la información pública sin requerir     |
|                                               |                               | inicio de sesión                                                |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el usuario anónimo interesado accede a la sección de preguntas  |
|                                               |                               | frecuentes                                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | revisa el listado de preguntas disponibles                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra las preguntas más consultadas con sus        |
|                                               |                               | respectivas respuestas                                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | el usuario anónimo interesado hace clic a cualquier sección del |
|                                               |                               | portal                                                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el enlace es para trabajadores o esta caido                     |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema redirige al usuario al homepage o a la página de     |
|                                               |                               | inicio de sesión                                                |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | el usuario anónimo interesado hace clic en un link de interés   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el enlace es válido                                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema redirige al usuario al sitio externo en una nueva    |
|                                               |                               | pestaña                                                         |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el usuario accede a la sección de contacto.                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | consulta la información de contacto.                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra los canales oficiales de comunicación        |
|                                               |                               | disponibles.                                                    |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el usuario intenta acceder a una sección inexistente.       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | la URL solicitada no corresponde a una sección pública.         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra una página informativa y permite regresar al |
|                                               |                               | portal principal.                                               |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que una sección pública no contiene información disponible.     |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el usuario accede a dicha sección.                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que actualmente no existe contenido          |
|                                               |                               | publicado.                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el usuario accede desde un dispositivo móvil.               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | visualiza el portal público.                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema adapta correctamente la interfaz para mantener una   |
|                                               |                               | navegación funcional.                                           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir el contenido público que será visible en el portal, estableciendo las secciones         |
|                                               | obligatorias y la información que podrá ser consultada por usuarios no autenticados.            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz del portal público siguiendo la identidad visual de IKernell y criterios de |
|                                               | usabilidad.                                                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la estructura de navegación principal para facilitar el acceso a todas las secciones    |
|                                               | públicas del portal.                                                                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar la sección **\"Nosotros\"** mostrando la información institucional definida para la |
|                                               | empresa.                                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar la sección **\"Portafolio de Servicios\"** permitiendo consultar los servicios      |
|                                               | ofrecidos por IKernell.                                                                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la sección **\"Noticias\"** para visualizar las publicaciones e información de      |
|                                               | interés.                                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la sección **\"Preguntas Frecuentes (FAQ)\"** mostrando las consultas más comunes   |
|                                               | de los usuarios.                                                                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar la sección **\"Enlaces de Interés\"** validando el acceso a recursos internos y     |
|                                               | externos autorizados.                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar la sección **\"Contacto\"** con la información institucional y acceso al formulario |
|                                               | de contacto.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Verificar que el portal pueda ser consultado sin requerir autenticación y que las restricciones |
|                                               | de acceso se apliquen únicamente a funcionalidades internas.                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Validar el funcionamiento de la navegación, enlaces internos y enlaces externos disponibles en  |
|                                               | el portal.                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Verificar el comportamiento responsive del portal en diferentes resoluciones y dispositivos.    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Validar el cumplimiento de criterios básicos de accesibilidad, legibilidad y navegación.        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Ejecutar pruebas funcionales del portal público verificando el correcto funcionamiento de todas |
|                                               | las secciones.                                                                                  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 05/06/2026                    | Efrain Manotas                |               | Acceso general  |               |
|                               |                               |                               |               | a información   |               |
|                               |                               |                               |               | pública de la   |               |
|                               |                               |                               |               | empresa         |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 04/07/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras al   |               |
|                               |                               |                               |               | HU-01           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
