+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-04                         | **Nombre:**                   | Acceder al dashboard de servicios internos                      |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-03                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Módulo de Trabajadores                                                                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | trabajador autenticado (cualquier rol)                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | acceder desde el dashboard a los servicios internos disponibles |
|                                               |                               | para apoyar el desarrollo de mis actividades laborales.         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | realizar mis labores diarias, resolver dudas y comunicarme con  |
|                                               |                               | el equipo dentro de la plataforma                               |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe permitir al trabajador autenticado acceder al dashboard principal.           |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar los accesos a los servicios internos disponibles según el rol del    |
|                                               | trabajador.                                                                                     |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir consultar la biblioteca de programas y recursos.                    |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir acceder a los tutoriales de programación disponibles.               |
|                                               |                                                                                                 |
|                                               | \- El sistema debe restringir el acceso a los servicios internos a usuarios autenticados.       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe redirigir al formulario de inicio de sesión cuando un usuario no autenticado |
|                                               | intente acceder a un servicio privado.                                                          |
|                                               |                                                                                                 |
|                                               | \- El sistema debe informar cuando un servicio interno no se encuentre disponible.              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar únicamente los servicios habilitados para el trabajador.             |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir navegar entre los servicios internos desde el dashboard.            |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mantener una experiencia consistente entre los diferentes servicios          |
|                                               | internos.                                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | el trabajador ha iniciado sesión exitosamente                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | accede al dashboard básico principal                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra los accesos directos a correo, chat,         |
|                                               |                               | biblioteca y tutoriales, además de la información pública       |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | el trabajador accede a la biblioteca de programas               |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | navega por el catálogo                                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra los programas y recursos disponibles para    |
|                                               |                               | descarga o consultar                                            |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | el trabajador intenta acceder a servicios internos sin          |
|                                               |                               | autenticarse                                                    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | intenta navegar a la URL de servicios privados                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema redirige al formulario de inicio de sesión           |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que un servicio interno se encuentra temporalmente fuera de     |
|                                               |                               | servicio                                                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el trabajador intenta acceder                                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que el servicio no se encuentra disponible   |
|                                               |                               | temporalmente.                                                  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el trabajador no posee permisos para un servicio.           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | intenta acceder                                                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que no posee autorización para utilizar      |
|                                               |                               | dicho servicio                                                  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que la biblioteca no contiene recursos disponibles.             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el trabajador accede                                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema informa que actualmente no existen recursos          |
|                                               |                               | publicados                                                      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que el trabajador selecciona un recurso disponible              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | solicita consultarlo                                            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema permite visualizarlo o descargarlo según corresponda |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el trabajador navega entre los servicios internos           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | selecciona cualquiera de ellos                                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema mantiene una navegación consistente sin perder la    |
|                                               |                               | sesión activa.                                                  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir las reglas de negocio para el acceso a los servicios internos disponibles para los      |
|                                               | trabajadores, incluyendo permisos, disponibilidad y restricciones por rol.                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz del dashboard principal mostrando de forma organizada los servicios         |
|                                               | internos disponibles para el trabajador.                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la navegación entre los diferentes servicios internos garantizando una experiencia      |
|                                               | intuitiva y consistente.                                                                        |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el servicio para obtener los accesos y servicios habilitados según el rol del       |
|                                               | trabajador autenticado.                                                                         |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar las validaciones de permisos para restringir el acceso a servicios no autorizados.  |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar la gestión de disponibilidad de los servicios mostrando su estado cuando no puedan  |
|                                               | utilizarse.                                                                                     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar el dashboard principal mostrando los accesos a los servicios internos habilitados   |
|                                               | para el trabajador.                                                                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Implementar la navegación hacia los servicios disponibles respetando las restricciones          |
|                                               | definidas por el sistema.                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar la visualización de estados de disponibilidad y mensajes informativos cuando un     |
|                                               | servicio no esté disponible.                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Implementar la gestión de estados vacíos cuando el trabajador no tenga servicios disponibles    |
|                                               | para consultar.                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Verificar la navegación correcta entre los servicios habilitados para el trabajador.            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Validar las restricciones de acceso según el rol y los permisos asignados al usuario            |
|                                               | autenticado.                                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 13                                            | Verificar el comportamiento del sistema cuando un servicio se encuentre no disponible o         |
|                                               | temporalmente deshabilitado.                                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 14                                            | Ejecutar pruebas funcionales del dashboard interno verificando la navegación, la disponibilidad |
|                                               | de servicios y el comportamiento responsive.                                                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 09/06/2026                    | Efrain Manotas                |               | Desarrollo      |               |
|                               |                               |                               |               | completo de     |               |
|                               |                               |                               |               | HU-04 - Acceder |               |
|                               |                               |                               |               | a servicios     |               |
|                               |                               |                               |               | básicos         |               |
|                               |                               |                               |               | internos del    |               |
|                               |                               |                               |               | trabajador      |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 2.0                           | 09/06/2026                    | Efrain Manotas                |               | Revisión e      |               |
|                               |                               |                               |               | implementación  |               |
|                               |                               |                               |               | de mejoras      |               |
|                               |                               |                               |               | HU-04           |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
