**DOCUMENTO DE REQUERIMIENTOS FUNCIONALES, NO FUNCIONALES Y ESPECIALES**

# **ARQUITECTURA DEL SISTEMA** 

# APLICATIVO WEB IKERNELL SOLUCIONES SOFTWARE

> Bogota D.C. 09-06-2026
>
> Coordinación de Tecnología e Innovación
>
> Elaboró: Efrain A Manotas C

**TABLA DE CONTENIDO**

[**ARQUITECTURA DEL SISTEMA 1**](#arquitectura-del-sistema)

[**APLICATIVO WEB IKERNELL SOLUCIONES SOFTWARE
1**](#aplicativo-web-ikernell-soluciones-software)

[**1. INTRODUCCIÓN 4**](#introducción)

> [1.1 OBJETIVO DEL DOCUMENTO 4](#objetivo-del-documento)
>
> [1.2 AUDIENCIA DESTINATARIA 4](#audiencia-destinataria)
>
> [1.3 RELACIÓN CON OTROS DOCUMENTOS 4](#relación-con-otros-documentos)

[**2. MAPA DE ACTORES Y ESTRUCTURA DEL SISTEMA
5**](#mapa-de-actores-y-estructura-del-sistema)

[**3. METODOLOGÍA DE LEVANTAMIENTO 5**](#metodología-de-levantamiento)

> [3.1 ENFOQUE UTILIZADO 5](#enfoque-utilizado)
>
> [3.2 ESTRUCTURA DEL REQUERIMIENTO FUNCIONAL
> 5](#estructura-del-requerimiento-funcional)
>
> [3.3 ESTRUCTURA DEL REQUERIMIENTO NO FUNCIONAL DEL SISTEMA
> 6](#estructura-del-requerimiento-no-funcional-del-sistema)
>
> [3.4 ESTRUCTURA DEL REQUERIMIENTO ESPECIAL DEL SISTEMA
> 6](#estructura-del-requerimiento-especial-del-sistema)

[**4. REQUERIMIENTOS FUNCIONALES DEL SISTEMA
7**](#requerimientos-funcionales-del-sistema)

> [4.1 RF-001: 7](#rf-001)
>
> [4.2 RF-002: 7](#rf-002)
>
> [4.3 RF-003: 8](#rf-003)
>
> [4.4 RF-004: 8](#rf-004)
>
> [4.5 RF-005: 9](#rf-005)
>
> [4.6 RF-006: 9](#rf-006)
>
> [4.7 RF-007: 10](#rf-007)
>
> [4.8 RF-008: 10](#rf-008)
>
> [4.9 RF-009: 10](#rf-009)
>
> [4.10 RF-010: 11](#rf-010)
>
> [4.11 RF-011: 11](#rf-011)
>
> [4.12 RF-012: 12](#rf-012)
>
> [4.13 RF-013: 12](#rf-013)
>
> [4.14 RF-014: 13](#rf-014)
>
> [4.15 RF-015: 13](#rf-015)
>
> [4.16 RF-016: 14](#rf-016)
>
> [4.17 RF-017: 14](#rf-017)
>
> [4.18 RF-018: 14](#rf-018)
>
> [4.19 RF-019: 15](#rf-019)
>
> [4.20 RF-020: 15](#rf-020)
>
> [4.21 RF-021: 16](#rf-021)
>
> [4.22 RF-022: 16](#rf-022)
>
> [4.23 RF-023: 17](#rf-023)

[**5. REQUERIMIENTOS NO FUNCIONALES DEL SISTEMA
17**](#requerimientos-no-funcionales-del-sistema)

> [5.1 RNF-001: 17](#rnf-001)
>
> [5.2 RNF-002: 18](#rnf-002)
>
> [5.3 RNF-003: 18](#rnf-003)
>
> [5.4 RNF-004: 18](#rnf-004)
>
> [5.5 RNF-005: 19](#rnf-005)
>
> [5.6 RNF-006: 19](#rnf-006)

[**6. REQUERIMIENTOS ESPECIALES DEL SISTEMA
20**](#requerimientos-especiales-del-sistema)

> [6.1 RNF-006: 20](#re-001)

# **INTRODUCCIÓN**

## 1.1 OBJETIVO DEL DOCUMENTO

El objetivo del documento es especificar y consolidar de manera
estructurada los requerimientos funcionales, no funcionales y especiales
necesarios para el análisis, diseño, desarrollo e implementación de la
plataforma web IKernell Soluciones Software. Este sistema tiene como fin
automatizar y supervisar los procesos internos de la empresa IKernell
Soluciones Software para tener trazabilidad y control preciso sobre los
proyectos ejecutados, así como promocionar sus servicios a través de
internet.

## 1.2 AUDIENCIA DESTINATARIA

Este documento está dirigido a todos los actores involucrados en el
análisis, desarrollo, implementación y supervisión de proyectos que
utilicen los servicios IKernell Soluciones Software, incluyendo:

- Equipo de liderazgo del proyecto

- Analistas funcionales y de procesos

- Arquitectos de software y de soluciones

- Desarrolladores y personal técnico

- Coordinadores y líderes de proyectos de IKernell

## 1.3 RELACIÓN CON OTROS DOCUMENTOS

Este documento forma parte de un conjunto integrado de entregables del
proyecto y debe consultarse junto con:

- Documentos de Historias de Usuario (HU)

- Documento de Especificación de Casos de Uso

- Diagrama de Clases del sistema

- Modelo Relacional de la base de datos

# **MAPA DE ACTORES Y ESTRUCTURA DEL SISTEMA**

El aplicativo web IKernell contempla cuatro tipos de actores:

  -----------------------------------------------------------------------
  **ACTOR**       **TIPO DE ACCESO**   **DESCRIPCIÓN**
  --------------- -------------------- ----------------------------------
  Interesado      Anónimo (público)    Accede a información básica y
                                       pública de la empresa sin
                                       autenticación

  Coordinador     Autenticado - Nivel  Gestiona perfiles de
                  1                    desarrolladores y asigna proyectos

  Líder de        Autenticado - Nivel  Gestiona proyectos, etapas,
  proyectos       2                    actividades y reportes

  Desarrollador   Autenticado - Nivel  Ejecuta actividades, registra
                  3                    errores e interrupciones
  -----------------------------------------------------------------------

# **METODOLOGÍA DE LEVANTAMIENTO**

## ENFOQUE UTILIZADO

El levantamiento de requerimientos se realizó mediante análisis del caso
de estudio provisto, identificando los procesos, actores y
funcionalidades descritas en el enunciado. Se complementó con la
aplicación del estándar ISO/IEC/IEEE 29148:2018.

**ESTÁNDAR DE DOCUMENTACIÓN**

El documento se basa en el estándar ISO/IEC/IEEE 29148:2018 para la
especificación de requerimientos de software, estructurando los
requerimientos en: Funcionales, No Funcionales y Especiales.

## ESTRUCTURA DEL REQUERIMIENTO FUNCIONAL

Cada requerimiento está documentado con los siguientes campos:

- Requerimiento Funcional (RF)

- ID: Identificador único estructurado por requerimiento, consecutivo:

  - RF-CONSECUTIVO

- Nombre: Título del requerimiento

- Descripción Detallada

- Prioridad: Alta, Media o Baja

- Código de la Historia de Usuario asociada.

## ESTRUCTURA DEL REQUERIMIENTO NO FUNCIONAL DEL SISTEMA

Cada requerimiento está documentado con los siguientes campos:

- Requerimiento No Funcional (RNF)

- ID: Identificador único estructurado por requerimiento, consecutivo:

  - RNF-CONSECUTIVO

- Nombre: Título del requerimiento

- Categoría

- Descripción

- Prioridad: Alta, Media o Baja

- Método de verificación: (Inspección, Análisis, Prueba (Test),
  Demostración, Monitoreo/Auditoría)

## 3.4 ESTRUCTURA DEL REQUERIMIENTO ESPECIAL DEL SISTEMA

Cada requerimiento está documentado con los siguientes campos:

- Requerimiento Especial (RE)

- ID: Identificador único estructurado por requerimiento, consecutivo:

  - RE-CONSECUTIVO

- Tipo: (Legal, Regulatorio, Interoperabilidad, Política o Estándar,
  Contractuales,

- Entorno Operacional, Instalación, Ético o se Sostenibilidad)

- Descripción

- Método de verificación: (Inspección, Análisis, Prueba (Test),
  Demostración,

- Monitoreo/Auditoría)

# **REQUERIMIENTOS FUNCIONALES DEL SISTEMA**

## 4.1 RF-001: 

  -----------------------------------------------------------------------
  **Nombre**            Acceso público a información empresarial
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir que cualquier usuario no
  Detallada**           registrado (interesado) acceda al portal público
                        de IKernell sin necesidad de autenticarse,
                        consultando la información institucional de la
                        empresa, el portafolio de servicios, las noticias
                        publicadas, las preguntas frecuentes, los enlaces
                        de interés autorizados y la información de
                        contacto. El sistema debe restringir el acceso a
                        funcionalidades exclusivas para trabajadores,
                        informar cuando una sección pública no contenga
                        información disponible y garantizar una
                        navegación funcional desde dispositivos móviles y
                        de escritorio.

  **Prioridad**         Alta

  **Código HU**         HU-01
  -----------------------------------------------------------------------

## 4.2 RF-002:

  -----------------------------------------------------------------------
  **Nombre**            Envío de preguntas por parte del interesado
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir que un usuario no
  Detallada**           registrado envíe consultas a través del
                        formulario de contacto cuando no encuentre
                        respuesta en la sección de preguntas frecuentes.
                        El formulario deberá validar los campos
                        obligatorios, el formato del correo electrónico y
                        registrar correctamente la información para su
                        posterior gestión por parte del coordinador. El
                        sistema deberá informar al usuario el resultado
                        del envío y notificar cuando existan errores de
                        validación o persistencia.

  **Prioridad**         Media

  **Código HU**         HU-02
  -----------------------------------------------------------------------

## 4.3 RF-003: 

  -----------------------------------------------------------------------
  **Nombre**            Autenticación de trabajadores
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir que los trabajadores
  Detallada**           registrados inicien sesión mediante credenciales
                        válidas, validando su identidad y el estado de su
                        cuenta. Una vez autenticado, el sistema deberá
                        generar una sesión segura, identificar el rol del
                        trabajador y permitir únicamente el acceso a las
                        funcionalidades autorizadas según sus permisos.
                        En caso de autenticación fallida, deberá informar
                        el motivo sin comprometer la seguridad del
                        sistema.

  **Prioridad**         Alta

  **Código HU**         HU-03
  -----------------------------------------------------------------------

## 4.4 RF-004: 

  -----------------------------------------------------------------------
  **Nombre**            Acceso a servicios internos
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe proporcionar a los trabajadores
  Detallada**           autenticados acceso a los servicios internos
                        habilitados según su rol, presentando un portal
                        centralizado de navegación. Los servicios no
                        disponibles deberán informarse claramente al
                        usuario y el sistema deberá impedir el acceso a
                        funcionalidades para las cuales no posea
                        autorización.

  **Prioridad**         Alta

  **Código HU**         HU-04
  -----------------------------------------------------------------------

## 4.5 RF-005: 

  -----------------------------------------------------------------------
  **Nombre**            Gestión de perfiles de desarrolladores
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al coordinador
  Detallada**           administrar los perfiles de desarrolladores
                        mediante operaciones de registro, consulta,
                        actualización e inhabilitación lógica. Cada
                        perfil deberá cumplir las reglas de validación
                        definidas por el negocio, evitando registros
                        duplicados y permitiendo consultar la información
                        profesional, los proyectos asociados y el estado
                        del desarrollador. Todas las operaciones deberán
                        registrarse para efectos de trazabilidad.

  **Prioridad**         Alta

  **Código HU**         HU-05
  -----------------------------------------------------------------------

## 4.6 RF-006: 

  -----------------------------------------------------------------------
  **Nombre**            Consulta de reportes de desempeño
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al coordinador generar y
  Detallada**           consultar reportes de desempeño de los
                        desarrolladores a partir de las actividades
                        ejecutadas, errores registrados e interrupciones
                        reportadas. El reporte deberá consolidar la
                        información disponible, permitir su visualización
                        en pantalla y ofrecer opciones de exportación
                        cuando corresponda, informando adecuadamente los
                        casos en que no existan datos para el período
                        consultado.

  **Prioridad**         Media

  **Código HU**         HU-06
  -----------------------------------------------------------------------

## 4.7 RF-007: 

  -----------------------------------------------------------------------
  **Nombre**            Gestión de proyectos
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al líder de proyectos
  Detallada**           administrar los proyectos mediante operaciones de
                        registro, consulta, actualización e
                        inhabilitación lógica. Asimismo, deberá permitir
                        asignar desarrolladores habilitados al equipo de
                        trabajo del proyecto, consultar su estado y
                        visualizar el avance general del proyecto. Todas
                        las operaciones deberán cumplir las reglas de
                        negocio definidas y registrarse para efectos de
                        trazabilidad. Finalmente, el equipo del proyecto
                        administra la membresía y solo miembros activos
                        pueden recibir actividades.

  **Prioridad**         Alta

  **Código HU**         HU-07
  -----------------------------------------------------------------------

## 4.8 RF-008: 

  -----------------------------------------------------------------------
  **Nombre**            Gestión de etapas del proyecto
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al líder de proyectos
  Detallada**           administrar las etapas de cada proyecto mediante
                        operaciones de registro, consulta, actualización
                        y eliminación cuando las reglas de negocio lo
                        permitan. Cada etapa deberá pertenecer a un
                        proyecto válido y el sistema deberá impedir
                        operaciones que comprometan la integridad de la
                        información o las actividades asociadas.

  **Prioridad**         Alta

  **Código HU**         HU-08
  -----------------------------------------------------------------------

## 4.9 RF-009: 

  -----------------------------------------------------------------------
  **Nombre**            Gestión de actividades del proyecto
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al líder de proyectos
  Detallada**           registrar, consultar y actualizar las actividades
                        asociadas a las etapas del proyecto, asignándole
                        a desarrolladores pertenecientes al equipo del
                        proyecto. El sistema deberá validar las reglas de
                        negocio relacionadas con estados, reglas de
                        fechas, estados válidos, transición de estados,
                        asignaciones y dependencias, garantizando la
                        consistencia de la planificación y registrando la
                        trazabilidad de las operaciones realizadas.

  **Prioridad**         Alta

  **Código HU**         HU-09
  -----------------------------------------------------------------------

## 4.10 RF-010: 

  -----------------------------------------------------------------------
  **Nombre**            Generación de reportes del proyecto
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al líder de proyectos
  Detallada**           consultar reportes relacionados con las
                        actividades e interrupciones del proyecto,
                        consolidando la información registrada para
                        facilitar el seguimiento operativo. Asimismo,
                        deberá permitir exportar los reportes en los
                        formatos habilitados por el sistema, informando
                        cuando no existan datos disponibles para la
                        consulta solicitada.

  **Prioridad**         Media

  **Código HU**         HU-10
  -----------------------------------------------------------------------

## 4.11 RF-011: 

  -----------------------------------------------------------------------
  **Nombre**            Actualización del estado de las actividades
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al desarrollador
  Detallada**           consultar las actividades que le han sido
                        asignadas y actualizar su estado conforme al
                        flujo definido por el negocio. Cada cambio deberá
                        validar los permisos del usuario, registrar
                        automáticamente la fecha y hora de la
                        actualización, conservar la trazabilidad de las
                        transiciones realizadas sobre la actividad y no
                        permitir transiciones inválidas.. El cambio de
                        estado sólo puede realizarlo el desarrollador
                        responsable.

  **Prioridad**         Alta

  **Código HU**         HU-11
  -----------------------------------------------------------------------

## 4.12 RF-012: 

  -----------------------------------------------------------------------
  **Nombre**            Registro de errores de desarrollo
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al desarrollador
  Detallada**           registrar los errores identificados durante la
                        ejecución de sus actividades, asociándolos al
                        proyecto, la etapa y el tipo de error
                        correspondiente. El sistema deberá validar la
                        información ingresada, garantizar la consistencia
                        de los datos y conservar el historial del
                        registro para fines de seguimiento y análisis de
                        calidad.

  **Prioridad**         Media

  **Código HU**         HU-12
  -----------------------------------------------------------------------

## 4.13 RF-013: 

  -----------------------------------------------------------------------
  **Nombre**            Registro de interrupciones del proyecto
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al desarrollador
  Detallada**           registrar las interrupciones que afecten la
                        ejecución de sus actividades, asociándolas al
                        proyecto, la etapa y el tipo de interrupción
                        correspondiente. El sistema deberá validar la
                        información ingresada, garantizar la consistencia
                        de los datos registrados y conservar el historial
                        para apoyar el seguimiento operativo y el
                        análisis del proyecto.

  **Prioridad**         Media

  **Código HU**         HU-13
  -----------------------------------------------------------------------

## 4.14 RF-014: 

  -----------------------------------------------------------------------
  **Nombre**            Gestión de mensajes de contacto
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al coordinador
  Detallada**           consultar, responder y administrar los mensajes
                        enviados desde el formulario de contacto del
                        portal público. El sistema deberá gestionar el
                        ciclo de vida del mensaje mediante sus diferentes
                        estados, registrar el responsable de la atención,
                        conservar la trazabilidad de las respuestas
                        emitidas, el flujo de estados del mensaje e
                        informar el resultado de cada operación
                        realizada.

  **Prioridad**         Media

  **Código HU**         HU-14
  -----------------------------------------------------------------------

## 4.15 RF-015: 

  -----------------------------------------------------------------------
  **Nombre**            Gestión de profesiones
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al coordinador
  Detallada**           administrar el catálogo de profesiones mediante
                        operaciones de registro, consulta, actualización
                        e inhabilitación lógica. El sistema deberá
                        impedir registros duplicados, proteger la
                        integridad de la información utilizada por los
                        perfiles de trabajadores y registrar la
                        trazabilidad de todas las operaciones realizadas
                        sobre el catálogo.

  **Prioridad**         Media

  **Código HU**         HU-15
  -----------------------------------------------------------------------

## 4.16 RF-016: 

  -----------------------------------------------------------------------
  **Nombre**            Gestión de especialidades
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al coordinador
  Detallada**           administrar el catálogo de especialidades
                        mediante operaciones de registro, consulta,
                        actualización e inhabilitación lógica. El sistema
                        deberá garantizar la disponibilidad de
                        especialidades activas para la gestión de
                        trabajadores, impedir registros duplicados y
                        conservar la trazabilidad de las modificaciones
                        realizadas sobre el catálogo.

  **Prioridad**         Media

  **Código HU**         HU-16
  -----------------------------------------------------------------------

## 

## 4.17 RF-017: 

  -----------------------------------------------------------------------
  **Nombre**            Gestión del equipo de trabajo del proyecto
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al líder de proyectos
  Detallada**           administrar el equipo de trabajo asociado a cada
                        proyecto, incorporando o retirando
                        desarrolladores habilitados según las reglas de
                        negocio establecidas. Asimismo, deberá permitir
                        consultar los integrantes del equipo y garantizar
                        que únicamente los desarrolladores pertenecientes
                        al proyecto puedan ser asignados a sus
                        actividades, manteniendo la trazabilidad de las
                        operaciones realizadas.

  **Prioridad**         Alta

  **Código HU**         HU-17
  -----------------------------------------------------------------------

## 

## 4.18 RF-018: 

  -----------------------------------------------------------------------
  **Nombre**            Consulta del historial de cambios
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir consultar el historial
  Detallada**           de cambios realizados sobre las entidades
                        auditadas, registrando automáticamente las
                        operaciones de creación, actualización e
                        inhabilitación lógica efectuadas por los
                        trabajadores autorizados. La información deberá
                        conservar el usuario responsable, la fecha, la
                        hora, la operación realizada, qué entidades
                        generan trazabilidad y la entidad afectada para
                        garantizar la trazabilidad del sistema.

  **Prioridad**         Alta

  **Código HU**         HU-18
  -----------------------------------------------------------------------

## 

## 4.19 RF-019: 

  -----------------------------------------------------------------------
  **Nombre**            Gestión de tipos de error
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al coordinador
  Detallada**           administrar el catálogo de tipos de error
                        mediante operaciones de registro, consulta,
                        actualización e inhabilitación lógica. El sistema
                        deberá impedir registros duplicados, evitar la
                        inhabilitación de tipos asociados a registros
                        existentes, mostrar únicamente los tipos activos
                        durante el registro de errores y conservar la
                        trazabilidad de todas las operaciones realizadas.

  **Prioridad**         Media

  **Código HU**         HU-19
  -----------------------------------------------------------------------

## 

## 4.20 RF-020: 

  -----------------------------------------------------------------------
  **Nombre**            Gestión de tipos de interrupción
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe permitir al coordinador
  Detallada**           administrar el catálogo de tipos de interrupción
                        mediante operaciones de registro, consulta,
                        actualización e inhabilitación lógica. El sistema
                        deberá impedir registros duplicados, proteger la
                        integridad de la información utilizada en el
                        registro de interrupciones, mostrar únicamente
                        los tipos activos y registrar la trazabilidad de
                        las operaciones realizadas sobre el catálogo.

  **Prioridad**         Media

  **Código HU**         HU-20
  -----------------------------------------------------------------------

## 

## 4.21 RF-021: 

  -----------------------------------------------------------------------
  **Nombre**            Pantalla de bienvenida del portal interno
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe presentar una pantalla de
  Detallada**           bienvenida personalizada inmediatamente después
                        del inicio de sesión exitoso de un trabajador
                        autenticado. La vista deberá mostrar la identidad
                        visual de IKernell, un saludo personalizado y
                        contenido institucional orientado a la
                        experiencia de usuario, adaptándose
                        automáticamente al tema claro u oscuro
                        configurado y permitiendo el acceso a las demás
                        funcionalidades mediante el menú de navegación
                        del sistema.

  **Prioridad**         Media

  **Código HU**         HU-21
  -----------------------------------------------------------------------

## 

## 4.22 RF-022: 

  -----------------------------------------------------------------------
  **Nombre**            Dashboard ejecutivo
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe proporcionar un dashboard
  Detallada**           ejecutivo que consolide indicadores, métricas y
                        visualizaciones relevantes según el rol del
                        trabajador autenticado. La información deberá
                        presentarse mediante componentes gráficos claros
                        y actualizados, mostrando únicamente los
                        indicadores correspondientes al perfil del
                        usuario para facilitar el seguimiento operativo y
                        la toma de decisiones.

  **Prioridad**         Alta

  **Código HU**         HU-22
  -----------------------------------------------------------------------

## 

## 4.23 RF-023: 

  -----------------------------------------------------------------------
  **Nombre**            Centro de notificaciones
  --------------------- -------------------------------------------------
  **Descripción         El sistema debe proporcionar un centro de
  Detallada**           notificaciones que informe a cada trabajador
                        sobre los eventos relevantes asociados a sus
                        responsabilidades dentro del sistema. Las
                        notificaciones deberán generarse automáticamente
                        a partir de eventos definidos por el negocio,
                        permitir consultar su detalle, diferenciar los
                        estados de lectura y conservar un historial de
                        las notificaciones recientes del usuario.

  **Prioridad**         Media

  **Código HU**         HU-23
  -----------------------------------------------------------------------

# **REQUERIMIENTOS NO FUNCIONALES DEL SISTEMA**

## 5.1 RNF-001: 

  -----------------------------------------------------------------------
  **Nombre**            Seguridad en la autenticación
  --------------------- -------------------------------------------------
  **Categoría**         Seguridad

  **Descripción**       El sistema debe utilizar un mecanismo de
                        autenticación basado en tokens JWT. Las
                        contraseñas deben almacenarse utilizando el
                        algoritmo BCrypt. Las sesiones inactivas deberán
                        expirar después de 30 minutos. El acceso a las
                        funcionalidades deberá validarse mediante
                        autorización basada en roles tanto en el frontend
                        como en el backend. La comunicación entre cliente
                        y servidor deberá realizarse mediante protocolos
                        seguros y el sistema no deberá exponer
                        información sensible en los mensajes de error.

  **Prioridad**         Alta

  **Método de           Prueba (Test)
  verificación**        
  -----------------------------------------------------------------------

## 5.2 RNF-002:

  -----------------------------------------------------------------------
  **Nombre**            Disponibilidad del sistema
  --------------------- -------------------------------------------------
  **Categoría**         Disponibilidad

  **Descripción**       El sistema deberá mantenerse disponible durante
                        las pruebas funcionales y recuperarse de errores
                        inesperados mostrando mensajes informativos sin
                        comprometer la integridad de la información ni la
                        continuidad de la operación.

  **Prioridad**         Alta

  **Método de           Monitoreo/Auditoría
  verificación**        
  -----------------------------------------------------------------------

## 5.3 RNF-003:

  -----------------------------------------------------------------------
  **Nombre**            Rendimiento en la carga de páginas
  --------------------- -------------------------------------------------
  **Categoría**         Rendimiento

  **Descripción**       Las páginas deberán cargar en un tiempo máximo de
                        3 segundos bajo condiciones normales de operación
                        con un volumen de datos representativo del
                        proyecto. Las consultas estándar no deberán
                        superar los 2 segundos y la generación de
                        reportes o dashboards no deberá exceder los 5
                        segundos.

  **Prioridad**         Media

  **Método de           Prueba (Test)
  verificación**        
  -----------------------------------------------------------------------

## 5.4 RNF-004:

  -----------------------------------------------------------------------
  **Nombre**            Usabilidad de la interfaz
  --------------------- -------------------------------------------------
  **Categoría**         Usabilidad

  **Descripción**       La interfaz deberá ser intuitiva, responsive y
                        mantener una experiencia de usuario consistente
                        en dispositivos de escritorio y móviles. El
                        sistema deberá soportar temas claro y oscuro,
                        presentar mensajes claros de retroalimentación y
                        conservar una navegación uniforme en todos los
                        módulos.

  **Prioridad**         Media

  **Método de           Demostración
  verificación**        
  -----------------------------------------------------------------------

## 5.5 RNF-005:

  -----------------------------------------------------------------------
  **Nombre**            Compatibilidad con navegadores
  --------------------- -------------------------------------------------
  **Categoría**         Compatibilidad

  **Descripción**       El sistema debe ser compatible con los
                        navegadores Google Chrome , Mozilla Firefox y
                        Microsoft Edge en sus versiones actuales.

  **Prioridad**         Baja

  **Método de           Prueba (Test)
  verificación**        
  -----------------------------------------------------------------------

## 5.6 RNF-006:

  -----------------------------------------------------------------------
  **Nombre**            Mantenibilidad del código
  --------------------- -------------------------------------------------
  **Categoría**         Mantenibilidad

  **Descripción**       El código deberá favorecer la reutilización de
                        componentes, la separación de responsabilidades y
                        el cumplimiento de principios SOLID cuando sea
                        aplicable. Asimismo, deberá facilitar la
                        incorporación de pruebas y el mantenimiento
                        evolutivo del sistema.

  **Prioridad**         Media

  **Método de           Inspección
  verificación**        
  -----------------------------------------------------------------------

## 5.7 RNF-007:

  -----------------------------------------------------------------------
  **Nombre**            Accesibilidad
  --------------------- -------------------------------------------------
  **Categoría**         Usabilidad

  **Descripción**       El sistema deberá mantener una interfaz legible,
                        con contraste adecuado, navegación consistente y
                        elementos accesibles mediante teclado en las
                        funcionalidades principales.

  **Prioridad**         Media

  **Método de           Demostración
  verificación**        
  -----------------------------------------------------------------------

## 5.8 RNF-008:

  -----------------------------------------------------------------------
  **Nombre**            Integridad de la información
  --------------------- -------------------------------------------------
  **Categoría**         Integridad

  **Descripción**       El sistema deberá garantizar la consistencia de
                        la información durante las operaciones de
                        creación, actualización e inhabilitación lógica,
                        evitando la generación de registros huérfanos o
                        inconsistentes.

  **Prioridad**         Alta

  **Método de           Prueba
  verificación**        
  -----------------------------------------------------------------------

## 5.9 RNF-009:

  -----------------------------------------------------------------------
  **Nombre**            Trazabilidad
  --------------------- -------------------------------------------------
  **Categoría**         Auditoría

  **Descripción**       El sistema deberá registrar automáticamente las
                        operaciones auditables realizadas sobre las
                        entidades definidas, conservando la información
                        necesaria para garantizar la trazabilidad de las
                        acciones ejecutadas.

  **Prioridad**         Alta

  **Método de           Inspección
  verificación**        
  -----------------------------------------------------------------------

## 5.10 RNF-010:

  -----------------------------------------------------------------------
  **Nombre**            Escalabilidad
  --------------------- -------------------------------------------------
  **Categoría**         Mantenibilidad

  **Descripción**       La arquitectura del sistema deberá permitir
                        incorporar nuevos módulos, catálogos y
                        funcionalidades mediante componentes
                        desacoplados, minimizando el impacto sobre los
                        módulos existentes.

  **Prioridad**         Media

  **Método de           Inspección
  verificación**        
  -----------------------------------------------------------------------

## 5.11 RNF-011:

  -----------------------------------------------------------------------
  **Nombre**            Respaldo y recuperación de la información
  --------------------- -------------------------------------------------
  **Categoría**         Disponibilidad

  **Descripción**       El sistema deberá permitir realizar respaldos de
                        la información almacenada y disponer de
                        mecanismos que faciliten su recuperación en caso
                        de pérdida o falla de la base de datos.

  **Prioridad**         Alta

  **Método de           Inspección
  verificación**        
  -----------------------------------------------------------------------

## 5.12 RNF-012:

  -----------------------------------------------------------------------
  **Nombre**            Consistencia transaccional
  --------------------- -------------------------------------------------
  **Categoría**         Integridad

  **Descripción**       El sistema deberá garantizar que las operaciones
                        que involucren múltiples entidades se ejecuten de
                        manera consistente, evitando estados parciales o
                        información inconsistente cuando ocurra un error
                        durante la transacción.

  **Prioridad**         Alta

  **Método de           Prueba (Test)
  verificación**        
  -----------------------------------------------------------------------

## 5.13 RNF-013:

  -----------------------------------------------------------------------
  **Nombre**            Registro de eventos técnicos
  --------------------- -------------------------------------------------
  **Categoría**         Mantenibilidad

  **Descripción**       El sistema deberá registrar los errores y eventos
                        técnicos relevantes para facilitar el diagnóstico
                        de fallos, sin exponer información sensible a los
                        usuarios finales.

  **Prioridad**         Media

  **Método de           Inspección
  verificación**        
  -----------------------------------------------------------------------

# **REQUERIMIENTOS ESPECIALES DEL SISTEMA**

## 6.1 RE-001:

  -----------------------------------------------------------------------
  **Nombre**            Exportación de información para empresa aliada
  --------------------- -------------------------------------------------
  **Tipo**              Interoperabilidad

  **Descripción**       El sistema deberá generar archivos de exportación
                        compatibles con el formato acordado con la
                        empresa aliada, garantizando la correcta
                        interoperabilidad entre ambas organizaciones.

  **Prioridad**         Alta

  **Método de           Prueba (Test)
  verificación**        
  -----------------------------------------------------------------------

## 6.2 RE-002:

  -----------------------------------------------------------------------
  **Nombre**            Arquitectura de autenticación institucional
  --------------------- -------------------------------------------------
  **Tipo**              Política / Estándar

  **Descripción**       El sistema deberá implementar el mecanismo de
                        autenticación y autorización definido para
                        IKernell, utilizando control de acceso basado en
                        roles para proteger las funcionalidades de la
                        aplicación.

  **Prioridad**         Alta

  **Método de           Inspección
  verificación**        
  -----------------------------------------------------------------------

## 6.3 RE-003:

  -----------------------------------------------------------------------
  **Nombre**            Ejecución como aplicación web
  --------------------- -------------------------------------------------
  **Tipo**              Entorno Operacional

  **Descripción**       La solución deberá ejecutarse como una aplicación
                        web accesible desde navegadores compatibles, sin
                        requerir instalación de software adicional por
                        parte del usuario final.

  **Prioridad**         Alta

  **Método de           Demostración
  verificación**        
  -----------------------------------------------------------------------

## 6.4 RE-004:

  -----------------------------------------------------------------------
  **Nombre**            Plataforma tecnológica del sistema
  --------------------- -------------------------------------------------
  **Tipo**              Entorno Operacional

  **Descripción**       La solución deberá implementarse utilizando Java
                        17 y Spring Boot para el backend, React con
                        TypeScript para el frontend y PostgreSQL como
                        sistema gestor de base de datos.

  **Prioridad**         Alta

  **Método de           Inspección
  verificación**        
  -----------------------------------------------------------------------

## 6.1 RE-005:5

  -----------------------------------------------------------------------
  **Nombre**            Conservación de información histórica
  --------------------- -------------------------------------------------
  **Tipo**              Política / Estándar

  **Descripción**       Las operaciones de inhabilitación lógica deberán
                        conservar la información histórica y las
                        relaciones existentes, evitando la eliminación
                        física de los registros administrados por el
                        sistema.

  **Prioridad**         Alta

  **Método de           Inspección
  verificación**        
  -----------------------------------------------------------------------

## 6.6 RE-006:

  -----------------------------------------------------------------------
  **Nombre**            Compatibilidad de archivos exportados
  --------------------- -------------------------------------------------
  **Tipo**              Interoperabilidad

  **Descripción**       Los archivos exportados deberán utilizar una
                        codificación compatible con los sistemas de la
                        empresa aliada para garantizar la correcta
                        lectura e intercambio de información.

  **Prioridad**         Media

  **Método de           Prueba (Test)
  verificación**        
  -----------------------------------------------------------------------

## 6.7 RE-007:

  -----------------------------------------------------------------------
  **Nombre**            Protección del acceso a la información
  --------------------- -------------------------------------------------
  **Tipo**              Ético

  **Descripción**       El sistema deberá garantizar que cada usuario
                        acceda únicamente a la información autorizada
                        según su rol, evitando la exposición de datos no
                        permitidos y respetando el principio de mínimo
                        privilegio.

  **Prioridad**         Alta

  **Método de           Análisis
  verificación**        
  -----------------------------------------------------------------------

## 6.8 RE-008:

  -----------------------------------------------------------------------
  **Nombre**            Reutilización de componentes del sistema
  --------------------- -------------------------------------------------
  **Tipo**              Sostenibilidad

  **Descripción**       La solución deberá favorecer la reutilización de
                        componentes de software y evitar la duplicidad
                        funcional para facilitar el mantenimiento y la
                        evolución del sistema.

  **Prioridad**         Media

  **Método de           Inspección
  verificación**        
  -----------------------------------------------------------------------

## 6.9 RE-009:

  -----------------------------------------------------------------------
  **Nombre**            Despliegue estandarizado del sistema
  --------------------- -------------------------------------------------
  **Tipo**              Instalación

  **Descripción**       El sistema deberá poder desplegarse siguiendo la
                        estructura y dependencias definidas para el
                        proyecto, sin requerir configuraciones especiales
                        diferentes a las documentadas oficialmente.

  **Prioridad**         Media

  **Método de           Demostración
  verificación**        
  -----------------------------------------------------------------------
