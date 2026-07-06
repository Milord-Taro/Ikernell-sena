+-------------------------------------------------------------------------------------------------------------------------------------------------+
| **HISTORIA DE USUARIO**                                                                                                                         |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Código:**   | HU-21                         | **Nombre:**                   | Visualizar pantalla de bienvenida tras el inicio de sesión      |
+---------------+-------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Complejidad:**                              | Media                                                                                           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **HU Relacionada:**                           | HU-03, HU-04, HU-19                                                                             |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **Módulo:**                                   | Portal interno                                                                                  |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Descripción:**                              | **Yo como**                   | trabajador autenticado                                          |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Requiero**                  | visualizar una pantalla de bienvenida personalizada             |
|                                               |                               | inmediatamente después de iniciar sesión exitosamente           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Para**                      | confirmar el acceso al sistema, identificar el entorno de       |
|                                               |                               | trabajo y acceder posteriormente a las funcionalidades          |
|                                               |                               | disponibles desde el menú de navegación.                        |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Requerimiento:**                            | \- El sistema debe mostrar una pantalla de bienvenida después de un inicio de sesión exitoso.   |
|                                               |                                                                                                 |
|                                               | \- El sistema debe personalizar el saludo utilizando el nombre del trabajador autenticado.      |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar la identidad visual institucional de IKernell.                       |
|                                               |                                                                                                 |
|                                               | \- El sistema debe presentar un mensaje de bienvenida orientado al uso de la plataforma.        |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mostrar un elemento gráfico o animación decorativa de carácter profesional.  |
|                                               |                                                                                                 |
|                                               | \- El sistema debe adaptar automáticamente la apariencia según el tema claro u oscuro           |
|                                               | seleccionado.                                                                                   |
|                                               |                                                                                                 |
|                                               | \- El sistema no debe mostrar indicadores de gestión ni métricas en esta pantalla.              |
|                                               |                                                                                                 |
|                                               | \- El sistema debe permitir acceder a las demás funcionalidades únicamente mediante el menú     |
|                                               | lateral.                                                                                        |
|                                               |                                                                                                 |
|                                               | \- El sistema debe mantener una visualización responsive para diferentes resoluciones de        |
|                                               | pantalla.                                                                                       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CRITERIOS DE ACEPTACIÓN**                                                                                                                     |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 01**                              | **Dado:**                     | que el trabajador inicia sesión correctamente                   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | el sistema valida sus credenciales                              |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | se muestra automáticamente la pantalla de bienvenida            |
|                                               |                               | personalizada                                                   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 02**                              | **Dado:**                     | que el trabajador accede a la pantalla de bienvenida            |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | la interfaz termina de cargarse                                 |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra el saludo utilizando el nombre del           |
|                                               |                               | trabajador autenticado                                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 03**                              | **Dado:**                     | que el trabajador visualiza la pantalla                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | se renderiza el contenido principal                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema muestra la identidad visual de IKernell junto con un |
|                                               |                               | mensaje institucional de bienvenida                             |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 04**                              | **Dado:**                     | que el trabajador tiene configurado un tema de visualización    |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | se presenta la pantalla                                         |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema adapta automáticamente la apariencia al tema claro u |
|                                               |                               | oscuro seleccionado                                             |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 05**                              | **Dado:**                     | que el trabajador visualiza la pantalla de bienvenida           |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | observa el contenido principal                                  |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema presenta una animación decorativa sin afectar la     |
|                                               |                               | navegación ni el rendimiento de la aplicación                   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 06**                              | **Dado:**                     | que el trabajador utiliza el menú lateral                       |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | selecciona una funcionalidad del sistema                        |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema navega a la vista correspondiente abandonando la     |
|                                               |                               | pantalla de bienvenida                                          |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 07**                              | **Dado:**                     | que ocurre un error al cargar el contenido visual de bienvenida |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | la pantalla no puede mostrar alguno de sus elementos gráficos   |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema presenta la información institucional y mantiene     |
|                                               |                               | disponible la navegación sin interrumpir el acceso al sistema   |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **Condición 08**                              | **Dado:**                     | que el trabajador accede desde un dispositivo con diferente     |
|                                               |                               | resolución                                                      |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Cuando:**                   | visualiza la pantalla de bienvenida                             |
|                                               +-------------------------------+-----------------------------------------------------------------+
|                                               | **Entonces:**                 | el sistema adapta correctamente la distribución del contenido   |
|                                               |                               | para conservar la legibilidad y la experiencia de usuario.      |
+-----------------------------------------------+-------------------------------+-----------------------------------------------------------------+
| **TAREAS**                                                                                                                                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **No**                                        | **Descripción**                                                                                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 1                                             | Definir la estructura funcional de la pantalla de bienvenida posterior al inicio de sesión.     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 2                                             | Diseñar la interfaz de bienvenida siguiendo la identidad visual de IKernell.                    |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 3                                             | Diseñar la distribución del contenido para temas claro y oscuro.                                |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 4                                             | Implementar el saludo personalizado utilizando la información del trabajador autenticado.       |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 5                                             | Implementar la presentación del logotipo y mensaje institucional de bienvenida.                 |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 6                                             | Implementar el componente gráfico o animación decorativa optimizada para el portal interno.     |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 7                                             | Implementar la adaptación automática entre modo claro y modo oscuro.                            |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 8                                             | Garantizar que la navegación del sistema continúe realizándose desde el menú lateral.           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 9                                             | Implementar comportamiento responsive para diferentes tamaños de pantalla.                      |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 10                                            | Validar la correcta carga de la pantalla inmediatamente después del inicio de sesión.           |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 11                                            | Verificar el funcionamiento cuando existan errores de carga de elementos visuales.              |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| 12                                            | Realizar pruebas funcionales de la experiencia de bienvenida en diferentes resoluciones y temas |
|                                               | de visualización.                                                                               |
+-----------------------------------------------+-------------------------------------------------------------------------------------------------+
| **CONTROL DE VERSIONES**                                                                                                                        |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| **Versión**                   | **Fecha**                     | **Autor**                     | **Revisión**  | **Descripción** | **Aprobador** |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
| 1.0                           | 05/07/2026                    | Efrain Manotas                |               | Desarrollo de   |               |
|                               |                               |                               |               | HU-21           |               |
+-------------------------------+-------------------------------+-------------------------------+---------------+-----------------+---------------+
|                               |                               |                               |               |                 |               |
+===============+===============+===============+===============+===============+===============+===============+=================+===============+
