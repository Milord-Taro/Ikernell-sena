1. # **Introduccion**

El presente documento describe la estructura lógica de la base de datos del sistema IKernell Soluciones Software. Su propósito es documentar las entidades, atributos, relaciones y restricciones implementadas en la base de datos PostgreSQL, sirviendo como referencia para desarrolladores, mantenedores y evaluadores del proyecto.

La información consignada en este documento corresponde al modelo de datos implementado en la versión actual del sistema y se encuentra alineada con el script oficial de creación de la base de datos y el modelo entidad–relación del proyecto.

2. # **Objetivo**

Documentar las entidades que conforman la base de datos de IKernell Soluciones Software, describiendo su propósito, atributos, claves primarias, claves foráneas y relaciones, con el fin de facilitar la comprensión, mantenimiento y evolución del sistema.

3. # **Alcance**

Este documento comprende todas las tablas pertenecientes al esquema principal de la base de datos del proyecto IKernell Soluciones Software implementado en PostgreSQL. Se documentan las estructuras persistentes utilizadas por el backend desarrollado en Spring Boot para soportar la gestión de usuarios, proyectos, actividades, errores, interrupciones y mensajes de contacto.

4. # **Convenciones**

| Símbolo | Significado |
| :---- | :---- |
| PK | Clave Primaria |
| FK | Clave Foránea |
| NN | No admite valores nulos |
| UQ | Valor único |
| AI | Autoincremental |

5. # **Diccionario de datos**

   1. ## **Rol**

La entidad **Rol** almacena los tipos de trabajador definidos dentro de IKernell Soluciones Software. Cada usuario debe pertenecer a un único rol, el cual determina los permisos y funcionalidades disponibles dentro del sistema.

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| :---- | :---- | :---- | :---- | :---- | :---- |
| idRol | SERIAL | ✔ |  | ✔ | Identificador único del rol. |
| codRol | VARCHAR(10) |  |  | ✔ | Código interno del rol. |
| nombreRol | VARCHAR(50) |  |  | ✔ | Nombre del rol. |
| descripcionRol | TEXT |  |  |  | Descripción funcional del rol. |

* **Relaciones**

| Entidad | Cardinalidad |
| :---- | :---- |
| Usuario | 1 : N |

* **Observaciones**

- Un rol puede estar asociado a múltiples usuarios.  
- Un usuario únicamente puede tener un rol.

  2. ## **Profesión**

     

La entidad **Profesión** almacena las profesiones registradas para los trabajadores de la empresa. Esta información forma parte del perfil del desarrollador y permite mantener información académica o profesional asociada al usuario. 

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| :---- | :---- | :---- | :---- | :---- | :---- |
| idProfesion | SERIAL | ✔ |  | ✔ | Identificador único de la profesión. |
| codProfesion | VARCHAR(10) |  |  | ✔ | Código interno de la profesión. |
| nombreProfesion | VARCHAR(100) |  |  | ✔ | Nombre de la profesión. |

* **Relaciones**

| Entidad | Cardinalidad |
| :---- | :---- |
| Usuario | 1 : N |

* Proyecto

- Una profesión puede estar asociada a múltiples usuarios.  
- Cada usuario posee una única profesión registrada.

  3. ## **Especialidad**

La entidad Especialidad registra las áreas de especialización técnica de los desarrolladores, permitiendo identificar el perfil profesional de cada trabajador y facilitar su asignación a proyectos según sus competencias.

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| :---- | :---- | :---- | :---- | :---- | :---- |
| idEspecialidad | SERIAL | ✔ |  | ✔ | Identificador único de la especialidad. |
| codEspecialidad | VARCHAR(10) |  |  | ✔ | Código interno de la especialidad. |
| nombreEspecialidad | VARCHAR(100) |  |  | ✔ | Nombre de la especialidad. |

* **Relaciones**

| Entidad | Cardinalidad |
| :---- | :---- |
| Usuario | 1 : N |

* **Observaciones**

- Una especialidad puede estar asociada a múltiples usuarios.  
- Cada usuario registra una única especialidad.

  4. ## **Usuario**

La entidad **Usuario** constituye la entidad principal del sistema. Almacena la información personal, laboral y de autenticación de los trabajadores registrados, incluyendo coordinadores, líderes de proyecto y desarrolladores. Además de los datos personales, mantiene las referencias al rol, profesión y especialidad del trabajador, permitiendo controlar el acceso al sistema y su participación en los procesos de negocio.

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| :---- | :---- | :---- | :---- | :---- | :---- |
| idUsuario | SERIAL | ✔ |  | ✔ | Identificador único del usuario. |
| codUsuario | VARCHAR(10) |  |  | ✔ | Código interno del trabajador. |
| nombre | VARCHAR(100) |  |  | ✔ | Nombres del trabajador. |
| apellido | VARCHAR(100) |  |  | ✔ | Apellidos del trabajador. |
| fechaNacimiento | DATE |  |  | ✔ | Fecha de nacimiento. |
| tipoIdentificacion | VARCHAR(20) |  |  | ✔ | Tipo de documento de identidad. |
| numeroIdentificacion | VARCHAR(20) |  |  | ✔ | Número del documento de identidad. |
| correoElectronico | VARCHAR(150) |  |  | ✔ | Correo electrónico institucional. |
| direccion | TEXT |  |  |  | Dirección de residencia. |
| contrasena | VARCHAR(255) |  |  | ✔ | Contraseña cifrada mediante BCrypt. |
| fotoPerfil | VARCHAR(255) |  |  |  | Ruta o nombre de la fotografía del usuario. |
| estado | BOOLEAN |  |  | ✔ | Estado del usuario (Activo/Inactivo). |
| idRol | INTEGER |  | ✔ | ✔ | Rol asignado al usuario. |
| idProfesion | INTEGER |  | ✔ | ✔ | Profesión registrada. |
| idEspecialidad | INTEGER |  | ✔ | ✔ | Especialidad registrada. |

* **Relaciones**

| Entidad | Cardinalidad |
| :---- | :---- |
| Rol | N : 1 |
| Profesión | N : 1 |
| Especialidad | N : 1 |
| Proyecto (como líder) | 1 : N |
| AsignaciónProyecto | 1 : N |
| Actividad | 1 : N |
| RegistroError | 1 : N |
| Interrupción | 1 : N |
| MensajeContacto (Responsable) | 1 : N |

* **Observaciones**

- Representa a todos los trabajadores autenticados del sistema.  
- La contraseña se almacena cifrada mediante BCrypt, conforme a los requerimientos de seguridad definidos para el proyecto.  
- La relación con los proyectos se implementa mediante la entidad AsignaciónProyecto, permitiendo la participación de un usuario en varios proyectos.


  5. ## **Proyecto**

La entidad **Proyecto** almacena la información general de los proyectos gestionados por la empresa. Cada proyecto es administrado por un líder responsable y constituye el eje sobre el cual se organizan las etapas, actividades, errores e interrupciones registrados durante su ejecución.

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| ----- | ----- | ----- | ----- | ----- | ----- |
| idProyecto | SERIAL | ✔ |  | ✔ | Identificador único del proyecto. |
| codProyecto | VARCHAR(10) |  |  | ✔ | Código interno del proyecto. |
| nombreProyecto | VARCHAR(150) |  |  | ✔ | Nombre del proyecto. |
| descripcionProyecto | TEXT |  |  |  | Descripción general del proyecto. |
| fechaInicioProyecto | DATE |  |  | ✔ | Fecha de inicio. |
| fechaFinProyecto | DATE |  |  |  | Fecha estimada o real de finalización. |
| estadoProyecto | BOOLEAN |  |  | ✔ | Estado del proyecto (Activo/Inactivo). |
| idLider | INTEGER |  | ✔ | ✔ | Usuario responsable del proyecto. |

* **Relaciones**

| Entidad | Cardinalidad |
| ----- | ----- |
| Usuario (Líder) | N : 1 |
| Etapa | 1 : N |
| AsignaciónProyecto | 1 : N |

* **Observaciones**

- Cada proyecto tiene un único líder responsable.  
- Un proyecto puede contener múltiples etapas y varios desarrolladores asociados mediante la tabla **AsignaciónProyecto**.

  ## 

  6. ## **AsignaciónProyecto**

La entidad **AsignaciónProyecto** materializa la relación entre los usuarios y los proyectos. Su propósito es registrar qué desarrolladores participan en cada proyecto, la fecha en que fueron asignados y el estado de dicha asignación. Esta estructura permite que un usuario participe en varios proyectos y que un proyecto tenga múltiples integrantes, implementando una relación muchos a muchos de forma normalizada.

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| ----- | ----- | ----- | ----- | ----- | ----- |
| idAsignacion | SERIAL | ✔ |  | ✔ | Identificador único de la asignación. |
| fechaAsignacion | DATE |  |  | ✔ | Fecha en la que se realizó la asignación. |
| estadoAsignacion | BOOLEAN |  |  | ✔ | Estado de la asignación (Activa/Inactiva). |
| idUsuario | INTEGER |  | ✔ | ✔ | Usuario asignado al proyecto. |
| idProyecto | INTEGER |  | ✔ | ✔ | Proyecto al cual pertenece la asignación. |

* **Relaciones**

| Entidad | Cardinalidad |
| ----- | ----- |
| Usuario | N : 1 |
| Proyecto | N : 1 |

* **Observaciones**

- Implementa la relación muchos a muchos entre usuarios y proyectos.  
- Permite mantener el historial de participación de los desarrolladores.  
- Evita duplicar información dentro de las entidades Usuario y Proyecto.

  7. ## **Etapa**

La entidad **Etapa** representa las diferentes fases que conforman el ciclo de vida de un proyecto. Cada etapa pertenece a un único proyecto y sirve como mecanismo de organización para las actividades, errores e interrupciones registrados durante el desarrollo.

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| ----- | ----- | ----- | ----- | ----- | ----- |
| idEtapa | SERIAL | ✔ |  | ✔ | Identificador único de la etapa. |
| codEtapa | VARCHAR(10) |  |  | ✔ | Código interno de la etapa. |
| nombreEtapa | VARCHAR(150) |  |  | ✔ | Nombre de la etapa del proyecto. |
| descripcionEtapa | TEXT |  |  |  | Descripción de la etapa. |
| fechaEtapa | DATE |  |  | ✔ | Fecha de creación o registro de la etapa. |
| idProyecto | INTEGER |  | ✔ | ✔ | Proyecto al que pertenece la etapa. |

* **Relaciones**

| Entidad | Cardinalidad |
| ----- | ----- |
| Proyecto | N : 1 |
| Actividad | 1 : N |
| RegistroError | 1 : N |
| Interrupción | 1 : N |

* **Observaciones**

- Cada proyecto puede contener múltiples etapas.  
- Todas las actividades deben estar asociadas a una etapa.  
- Los errores e interrupciones se registran indicando la etapa en la que ocurrieron, permitiendo trazabilidad durante el desarrollo.

  8. ## **Actividad**

La entidad **Actividad** almacena las tareas asignadas por el líder de proyecto a los desarrolladores. Cada actividad pertenece a una etapa específica y registra información sobre su descripción, fechas de ejecución y estado, permitiendo realizar seguimiento al avance de los proyectos y al desempeño de cada integrante del equipo. 

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| ----- | ----- | ----- | ----- | ----- | ----- |
| idActividad | SERIAL | ✔ |  | ✔ | Identificador único de la actividad. |
| codActividad | VARCHAR(10) |  |  | ✔ | Código interno de la actividad. |
| nombreActividad | VARCHAR(150) |  |  | ✔ | Nombre de la actividad. |
| descripcionActividad | TEXT |  |  |  | Descripción detallada de la actividad. |
| fechaInicioActividad | DATE |  |  | ✔ | Fecha de inicio programada. |
| fechaFinActividad | DATE |  |  |  | Fecha estimada de finalización. |
| estadoActividad | VARCHAR(20) |  |  | ✔ | Estado actual de la actividad. |
| fechaEjecucionActividad | DATE |  |  |  | Fecha en que fue ejecutada. |
| idEtapa | INTEGER |  | ✔ | ✔ | Etapa del proyecto a la que pertenece. |
| idDesarrollador | INTEGER |  | ✔ | ✔ | Usuario responsable de ejecutar la actividad. |

* **Relaciones**

| Entidad | Cardinalidad |
| ----- | ----- |
| Etapa | N : 1 |
| Usuario | N : 1 |

* **Observaciones**

- Cada actividad pertenece a una única etapa.  
- Una actividad es asignada a un único desarrollador.  
- El estado de la actividad permite controlar el progreso del proyecto.  
- La fecha de ejecución se registra cuando la actividad es marcada como ejecutada por el desarrollador.

  9. ## **TipoError**

La entidad **TipoError** almacena el catálogo de categorías de errores que pueden registrarse durante el desarrollo de un proyecto. Su utilización evita duplicidad de datos y garantiza la clasificación uniforme de las incidencias reportadas por los desarrolladores.

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| ----- | ----- | ----- | ----- | ----- | ----- |
| idTipoError | SERIAL | ✔ |  | ✔ | Identificador único del tipo de error. |
| codTipoError | VARCHAR(10) |  |  | ✔ | Código interno del tipo de error. |
| nombreTipoError | VARCHAR(100) |  |  | ✔ | Nombre del tipo de error. |

* **Relaciones**

| Entidad | Cardinalidad |
| ----- | ----- |
| RegistroError | 1 : N |

* **Observaciones**

- Centraliza la clasificación de errores del sistema.  
- Facilita la generación de reportes estadísticos por categoría de error.

  10. ## **RegistroError**

La entidad **RegistroError** almacena las incidencias detectadas por los desarrolladores durante la ejecución de un proyecto. Cada registro conserva información sobre el tipo de error, la etapa en la que fue identificado, su estado y cualquier comentario asociado, permitiendo realizar seguimiento y análisis de la calidad del desarrollo. Esta información constituye una de las bases para los reportes de desempeño y seguimiento del proyecto. 

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| ----- | ----- | ----- | ----- | ----- | ----- |
| idError | SERIAL | ✔ |  | ✔ | Identificador único del registro de error. |
| codError | VARCHAR(10) |  |  | ✔ | Código interno del error. |
| descripcionError | TEXT |  |  | ✔ | Descripción del error detectado. |
| fechaRegistroError | DATE |  |  | ✔ | Fecha del registro. |
| estadoError | VARCHAR(20) |  |  | ✔ | Estado actual del error. |
| comentarioError | TEXT |  |  |  | Observaciones adicionales. |
| idTipoError | INTEGER |  | ✔ | ✔ | Tipo de error registrado. |
| idEtapa | INTEGER |  | ✔ | ✔ | Etapa donde se detectó el error. |
| idDesarrollador | INTEGER |  | ✔ | ✔ | Usuario que reportó el error. |

* **Relaciones**

| Entidad | Cardinalidad |
| ----- | ----- |
| TipoError | N : 1 |
| Etapa | N : 1 |
| Usuario | N : 1 |

* **Observaciones**

- Cada error pertenece a una única categoría.  
- Los errores siempre están asociados a una etapa del proyecto.  
- Un desarrollador puede registrar múltiples errores durante la ejecución de un proyecto.  
- La información almacenada sirve como insumo para los reportes de seguimiento y desempeño del equipo de desarrollo.

  11. ## **TipoInterrupción**

La entidad **TipoInterrupción** almacena el catálogo de tipos de interrupciones que pueden afectar el desarrollo normal de un proyecto. Su finalidad es estandarizar la clasificación de las interrupciones registradas por los desarrolladores, facilitando el análisis de las causas que impactan la ejecución de las actividades y el cumplimiento de los cronogramas. 

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| ----- | ----- | ----- | ----- | ----- | ----- |
| idTipoInterrupcion | SERIAL | ✔ |  | ✔ | Identificador único del tipo de interrupción. |
| codTipoInterrupcion | VARCHAR(10) |  |  | ✔ | Código interno del tipo de interrupción. |
| nombreTipoInterrupcion | VARCHAR(100) |  |  | ✔ | Nombre del tipo de interrupción. |

* **Relaciones**

| Entidad | Cardinalidad |
| ----- | ----- |
| Interrupción | 1 : N |

* **Observaciones**

- Centraliza los tipos de interrupción disponibles.  
- Facilita la generación de reportes y estadísticas sobre las causas de retraso en los proyectos.


  12. ## **Interrupción**

La entidad **Interrupción** registra los eventos que afectan temporalmente el desarrollo de las actividades de un proyecto. Cada interrupción se encuentra asociada a un desarrollador, una etapa del proyecto y un tipo de interrupción, permitiendo identificar las causas que impactan el cumplimiento de los tiempos de desarrollo. Esta información es utilizada posteriormente para la generación de reportes de seguimiento y desempeño. 

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| ----- | ----- | ----- | ----- | ----- | ----- |
| idInterrupcion | SERIAL | ✔ |  | ✔ | Identificador único de la interrupción. |
| codInterrupcion | VARCHAR(10) |  |  | ✔ | Código interno de la interrupción. |
| descripcionInterrupcion | TEXT |  |  | ✔ | Descripción de la interrupción presentada. |
| fechaInterrupcion | DATE |  |  | ✔ | Fecha en la que ocurrió la interrupción. |
| duracionInterrupcion | INTEGER |  |  | ✔ | Duración de la interrupción expresada en minutos. |
| idTipoInterrupcion | INTEGER |  | ✔ | ✔ | Tipo de interrupción registrada. |
| idEtapa | INTEGER |  | ✔ | ✔ | Etapa del proyecto donde ocurrió la interrupción. |
| idDesarrollador | INTEGER |  | ✔ | ✔ | Usuario que reportó la interrupción. |

* **Relaciones**

| Entidad | Cardinalidad |
| ----- | ----- |
| TipoInterrupción | N : 1 |
| Etapa | N : 1 |
| Usuario | N : 1 |

* **Observaciones**

- Un desarrollador puede registrar múltiples interrupciones.  
- Cada interrupción pertenece a una única etapa del proyecto.  
- Las interrupciones sirven como insumo para los reportes de gestión y análisis del desempeño de los proyectos.

  13. ## **MensajeContacto**

La entidad **MensajeContacto** almacena las consultas enviadas por los usuarios interesados desde el formulario de contacto del portal público. Además del mensaje original, conserva el estado de atención, la respuesta enviada y el responsable que gestionó la solicitud, permitiendo mantener la trazabilidad del proceso de atención al cliente. 

* **Atributos**

| Campo | Tipo | PK | FK | NN | Descripción |
| ----- | ----- | ----- | ----- | ----- | ----- |
| idMensaje | SERIAL | ✔ |  | ✔ | Identificador único del mensaje. |
| codMensaje | VARCHAR(10) |  |  | ✔ | Código interno del mensaje. |
| nombreRemitente | VARCHAR(150) |  |  | ✔ | Nombre de la persona que envía la consulta. |
| correoRemitente | VARCHAR(150) |  |  | ✔ | Correo electrónico del remitente. |
| mensaje | TEXT |  |  | ✔ | Contenido del mensaje enviado. |
| fechaEnvio | TIMESTAMP |  |  | ✔ | Fecha y hora de recepción del mensaje. |
| estadoMensaje | VARCHAR(20) |  |  | ✔ | Estado actual del mensaje (Pendiente, Leído o Atendido). |
| respuesta | TEXT |  |  |  | Respuesta enviada al remitente. |
| fechaRespuesta | TIMESTAMP |  |  |  | Fecha y hora en que se respondió el mensaje. |
| idResponsable | INTEGER |  | ✔ |  | Usuario responsable de la atención del mensaje. |

* **Relaciones**

| Entidad | Cardinalidad |
| ----- | ----- |
| Usuario | N : 1 |

* **Observaciones**

- El responsable corresponde a un trabajador autenticado del sistema.  
- El estado del mensaje permite controlar el flujo de atención.  
- Una vez respondido, el sistema registra la fecha de atención y el usuario responsable.

6. # **Resumen del Modelo de Datos**

Como cierre del documento, incluiría una tabla que permita identificar rápidamente el propósito de cada entidad.

7. # **Control de Versiones**

