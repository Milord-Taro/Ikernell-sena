**DOCUMENTO DE CASOS DE USO**

# ARQUITECTURA DEL SISTEMA 

# APLICATIVO WEB IKERNELL SOLUCIONES SOFTWARE

> Bogota D.C. 09-06-2026
>
> Coordinación de Tecnología e Innovación
>
> Elaboró: Efrain A Manotas C

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Versión: V-01-2025

  -----------------------------------------------------------------------
  *Queda prohibido cualquier tipo de explotación y, en particular, la
  reproducción, distribución, comunicación pública y/o transformación,
  total o parcial, por cualquier medio, de este documento sin el previo
  consentimiento expreso, protegidas es la Ley 23 de 1982, conocida como
  la \"Ley de Derechos de Autor". Colombiana.*
  -----------------------------------------------------------------------

  -----------------------------------------------------------------------

**TABLA DE CONTENIDO**

[**ARQUITECTURA DEL SISTEMA 1**](#arquitectura-del-sistema)

[**APLICATIVO WEB IKERNELL SOLUCIONES SOFTWARE
1**](#aplicativo-web-ikernell-soluciones-software)

[**1. INTRODUCCIÓN 4**](#introducción)

[**2. ESTRUCTURA DE LOS CASOS DE USO
4**](#estructura-de-los-casos-de-uso)

> [2.1 CODIFICACIÓN CASOS DE USO 4](#codificación-casos-de-uso)

[**3. DIAGRAMA DE CASO DE USO DE ALTO NIVEL
5**](#diagrama-de-caso-de-uso-de-alto-nivel)

> [3.1 DIAGRAMAS DE CASO DE USO EXTENDIDO
> 6](#diagramas-de-caso-de-uso-extendido)
>
> [3.1.1 CASO DE USO SEG-CU-01 6](#caso-de-uso-seg-cu-01)
>
> [3.1.2 CASO DE USO PUB-CU-01 6](#caso-de-uso-pub-cu-01)
>
> [3.1.3 CASO DE USO PUB-CU-02 7](#caso-de-uso-pub-cu-02)
>
> [3.1.4 CASO DE USO COR-CU-01 7](#caso-de-uso-cor-cu-01)
>
> [3.1.5 CASO DE USO COR-CU-02 8](#caso-de-uso-cor-cu-02)
>
> [3.1.6 CASO DE USO COR-CU-03 8](#caso-de-uso-cor-cu-03)
>
> [3.1.7 CASO DE USO COR-CU-04 9](#caso-de-uso-cor-cu-04)
>
> [3.1.8 CASO DE USO LID-CU-01 9](#caso-de-uso-lid-cu-01)
>
> [3.1.9 CASO DE USO LID-CU-02 10](#caso-de-uso-lid-cu-02)
>
> [3.1.10 CASO DE USO LID-CU-03 10](#caso-de-uso-lid-cu-03)
>
> [3.1.11 CASO DE USO LID-CU-04 11](#caso-de-uso-lid-cu-04)
>
> [3.1.12 CASO DE USO LID-CU-05 11](#caso-de-uso-lid-cu-05)
>
> [3.1.13 CASO DE USO DEV-CU-01 12](#caso-de-uso-dev-cu-01)
>
> [3.1.14 CASO DE USO DEV-CU-02 12](#caso-de-uso-dev-cu-02)
>
> [3.1.15 CASO DE USO DEV-CU-03 13](#caso-de-uso-dev-cu-03)

[**4. DOCUMENTACIÓN DE CASOS DE USO
13**](#documentación-de-casos-de-uso)

> [4.1 HU-003 - MÓDULO AUTENTICACIÓN 13](#hu-003---módulo-autenticación)
>
> [4.1.1 SEG-CU-01 - INICIAR SESIÓN 13](#seg-cu-01---iniciar-sesión)
>
> [4.2 HU-01, HU-02 - MODULO PORTAL PÚBLICO 15](#_heading=)
>
> [4.2.1 PUB-CU-01 - CONSULTAR INFORMACIÓN PÚBLICA
> 15](#pub-cu-01---consultar-información-pública)
>
> [4.2.2 PUB-CU-02 - ENVIAR PREGUNTA AL EQUIPO
> 17](#pub-cu-02---enviar-pregunta-al-equipo)
>
> [4.3 HU-05, HU-06 - MÓDULO DE COORDINADOR
> 18](#hu-05-hu-06-hu-14---módulo-de-coordinador)
>
> [4.3.1 COR-CU-01 - REGISTRAR PERFIL DE DESARROLLADOR
> 18](#cor-cu-01---registrar-perfil-de-desarrollador)
>
> [4.3.2 COR-CU-02 - BUSCAR Y MODIFICAR PERFIL DE DESARROLLADOR
> 20](#cor-cu-02---buscar-y-modificar-perfil-de-desarrollador)
>
> [4.3.3 COR-CU-03 - INHABILITAR DESARROLLADOR
> 22](#cor-cu-03---inhabilitar-desarrollador)
>
> [4.3.4 COR-CU-04 - GENERAR REPORTE DE DESEMPEÑO DEL DESARROLLADOR
> 24](#cor-cu-04---generar-reporte-de-desempeño-del-desarrollador)
>
> [4.3.5 COR-CU-05 - GESTIONAR MENSAJES DE CONTACTO POR INTERESADOS
> 26](#cor-cu-05---gestionar-mensajes-de-contacto-por-interesados)
>
> [4.4 HU-07, HU-08, HU-09, HU-10 - MÓDULO DE LÍDER
> 27](#hu-07-hu-08-hu-09-hu-10---módulo-de-líder)
>
> [4.4.1 LID-CU-01 - REGISTRAR PROYECTO
> 27](#lid-cu-01---registrar-proyecto)
>
> [4.4.2 LID-CU-02 - BUSCAR Y GESTIONAR PROYECTO
> 29](#lid-cu-02---buscar-y-gestionar-proyecto)
>
> [4.4.3 LID-CU-03 - GESTIONAR ETAPAS DEL PROYECTO
> 31](#lid-cu-03---gestionar-etapas-del-proyecto)
>
> [4.4.4 LID-CU-04 - REGISTRAR Y MODIFICAR ACTIVIDADES DEL PROYECTO
> 32](#lid-cu-04---registrar-y-modificar-actividades-del-proyecto)
>
> [4.4.5 LID-CU-05 - GENERAR REPORTES DEL PROYECTO
> 34](#lid-cu-05---generar-reportes-del-proyecto)
>
> [4.5 HU-11, HU-12, HU-13 - MÓDULO DE DESARROLLADOR
> 35](#hu-11-hu-12-hu-13---módulo-de-desarrollador)
>
> [4.5.1 DEV-CU-01 - EJECUTAR ACTIVIDAD DEL PROYECTO
> 36](#dev-cu-01---ejecutar-actividad-del-proyecto)
>
> [4.5.2 DEV-CU-02 - REGISTRAR ERROR DEL PROYECTO
> 37](#dev-cu-02---registrar-error-del-proyecto)
>
> [4.5.3 DEV-CU-03 - REGISTRAR INTERRUPCIÓN DEL PROYECTO
> 39](#dev-cu-03---registrar-interrupción-del-proyecto)

[**5. DIAGRAMAS DE CASOS DE USO 41**](#diagramas-de-casos-de-uso)

> [5.1 ÍNDICE DIAGRAMAS DE CASOS DE USO
> 41](#índice-diagramas-de-casos-de-uso)

# INTRODUCCIÓN

Este documento presenta la especificación de los Casos de Uso del
sistema IKernell Web Platform, siguiendo el estándar UML 2.5 y alineado
con la norma ISO/IEC/IEEE 29148:2018. El objetivo es proporcionar una
descripción clara, estructurada y trazable de las funcionalidades del
sistema desde el punto de vista del usuario.

# ESTRUCTURA DE LOS CASOS DE USO

Este documento está organizado por módulos funcionales del sistema. Cada
módulo contiene los casos de uso asociados, documentados con una
planilla detallada que incluye actores, flujos, condiciones y
relaciones. Los diagramas UML se referencian en el índice de la sección
5.

## **CODIFICACIÓN CASOS DE USO**

Cada caso de uso está codificado con los siguientes elementos:

- Tres iniciales del módulo al que pertenece (SEG, PUB, COR, LID, DEV).

- Tipo: CU (caso de uso estándar) o AN-CU (caso de uso de alto nivel).

- Número consecutivo de dos dígitos.

Ejemplos:

- Caso de uso estándar: SEG-CU-01 Iniciar sesión

- Caso de uso alto nivel: LID-AN-CU-01 Gestionar proyectos

# DIAGRAMA DE CASO DE USO DE ALTO NIVEL

**[Figura 1. Diagrama UML Casos de usos de Alto Nivel - Aplicativo Web
IKernell]{.underline}**

![](media/image18.png){width="5.865625546806649in"
height="6.363555336832896in"}

*Fuente: Elaboración propia (2026)*

## **3.1 DIAGRAMAS DE CASO DE USO EXTENDIDO**

###  3.1.1 CASO DE USO SEG-CU-01

**[Figura 2: Caso de uso Iniciar sesión]{.underline}**

![](media/image12.png){width="4.178125546806649in"
height="2.418914041994751in"}

*Fuente: Elaboración propia (2026)*

### 3.1.2 CASO DE USO PUB-CU-01

**[Figura 3: Caso de uso Consultar información pública]{.underline}**

![](media/image6.png){width="4.553125546806649in"
height="2.26496719160105in"}

*Fuente: Elaboración propia (2026)*

### 3.1.3 CASO DE USO PUB-CU-02

**[Figura 4: Caso de uso Enviar pregunta]{.underline}**

![](media/image2.png){width="4.614583333333333in"
height="2.63419728783902in"}

*Fuente: Elaboración propia (2026)*

### 3.1.4 CASO DE USO COR-CU-01 

**[Figura 5: Caso de uso Registrar desarrollador]{.underline}**

![](media/image13.png){width="4.640625546806649in"
height="2.494336176727909in"}

*Fuente: Elaboración propia (2026)*

### 3.1.5 CASO DE USO COR-CU-02

**[Figura 6: Caso de uso Buscar y modificar desarrollador]{.underline}**

![](media/image1.png){width="4.713542213473316in"
height="2.6241360454943132in"}

*Fuente: Elaboración propia (2026)*

### 3.1.6 CASO DE USO COR-CU-03

**[Figura 7: Caso de uso Inhabilitar desarrollador]{.underline}**

![](media/image3.png){width="4.678125546806649in"
height="2.644847987751531in"}

*Fuente: Elaboración propia (2026)*

### 3.1.7 CASO DE USO COR-CU-04

**[Figura 8: Caso de uso Generar reporte de desempeño]{.underline}**

![](media/image14.png){width="4.8760422134733155in"
height="2.4918307086614173in"}

*Fuente: Elaboración propia (2026)*

### 3.1.8 CASO DE USO LID-CU-01

**[Figura 9: Caso de uso Registrar proyecto]{.underline}**

![](media/image5.png){width="4.390625546806649in"
height="2.559512248468941in"}

*Fuente: Elaboración propia (2026)*

### 3.1.9 CASO DE USO LID-CU-02

**[Figura 10: Caso de uso Buscar y gestionar proyecto]{.underline}**

![](media/image7.png){width="4.5625in" height="2.690200131233596in"}

*Fuente: Elaboración propia (2026)*

### 3.1.10 CASO DE USO LID-CU-03

**[Figura 11: Caso de uso Gestionar etapas]{.underline}**

![](media/image16.png){width="4.823958880139982in"
height="2.162181758530184in"}

*Fuente: Elaboración propia (2026)*

### 3.1.11 CASO DE USO LID-CU-04 

**[Figura 12: Caso de uso Registrar y modificar
actividades]{.underline}**

![](media/image15.png){width="4.667708880139982in"
height="2.4170647419072617in"}

*Fuente: Elaboración propia (2026)*

### 3.1.12 CASO DE USO LID-CU-05

**[Figura 13: Caso de uso Generar reportes del proyecto]{.underline}**

![](media/image4.png){width="4.553125546806649in"
height="2.40411198600175in"}

*Fuente: Elaboración propia (2026)*

### 3.1.13 CASO DE USO DEV-CU-01 

**[Figura 14: Caso de uso Ejecutar actividad]{.underline}**

![](media/image9.png){width="4.791666666666667in"
height="2.7281747594050745in"}

*Fuente: Elaboración propia (2026)*

### 3.1.14 CASO DE USO DEV-CU-02

**[Figura 15: Caso de uso Registrar error]{.underline}**

![](media/image8.png){width="4.980208880139982in"
height="2.697260498687664in"}

*Fuente: Elaboración propia (2026)*

### 3.1.15 CASO DE USO DEV-CU-03

**[Figura 16: Caso de uso Registrar interrupción]{.underline}**

![](media/image10.png){width="4.510416666666667in"
height="2.4279265091863516in"}

*Fuente: Elaboración propia (2026)*

### 3.1.16 CASO DE USO COR-CU-05 

**[Figura 16: Caso de uso Gestionar mensajes de contacto por
interesados]{.underline}**

![](media/image11.png){width="4.755208880139983in"
height="2.603530183727034in"}

*Fuente: Elaboración propia (2026)*

# 4. DOCUMENTACIÓN DE CASOS DE USO

## **4.1 HU-003 - MÓDULO AUTENTICACIÓN**

### **4.1.1 SEG-CU-01 - INICIAR SESIÓN** 

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | SEG-CU-01                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Iniciar Sesión                                                                |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El trabajador ingresa sus credenciales para autenticarse y acceder al sistema |
|                 | según su rol.                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Coordinador de proyectos, Líder de proyectos, Desarrollador                   |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El trabajador accede a la pantalla de inicio de sesión e intenta              |
|                 | autenticarse.                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El usuario debe estar registrado en el sistema con credenciales activas.    |
|                 |                                                                               |
|                 | - El sistema debe estar en funcionamiento y accesible.                        |
|                 |                                                                               |
|                 | - Debe existir conexión de red con el servidor de autenticación.              |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El usuario queda autenticado y obtiene acceso al dashboard según su rol.    |
| (éxito)         |                                                                               |
|                 | - El sistema genera un token JWT y redirige al usuario a la vista principal.  |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El usuario no obtiene acceso al sistema.                                    |
| (fallo)         |                                                                               |
|                 | - El sistema muestra un mensaje de error: credenciales inválidas, usuario no  |
|                 |   registrado o error del servidor.                                            |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El trabajador accede a la pantalla de El sistema renderiza el      |
|                 |            inicio de sesión.                     formulario de login.         |
|                 |                                                                               |
|                 |   2        El trabajador ingresa usuario y       El sistema valida el formato |
|                 |            contraseña.                           de las credenciales.         |
|                 |                                                                               |
|                 |   3        El trabajador hace clic en "Iniciar   El sistema valida las        |
|                 |            sesión".                              credenciales en la BD,       |
|                 |                                                  genera token JWT y redirige  |
|                 |                                                  al dashboard según rol.      |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        N/A                                   N/A                          |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El trabajador ingresa credenciales    El sistema muestra:          |
|                 |            inválidas.                            \"Usuario o contraseña       |
|                 |                                                  inválidos\".                 |
|                 |                                                                               |
|                 |   2        El trabajador deja campos vacíos.     El sistema muestra           |
|                 |                                                  validación: \"Los campos son |
|                 |                                                  obligatorios\".              |
|                 |                                                                               |
|                 |   3        El trabajador intenta iniciar sesión. El sistema detecta un error  |
|                 |                                                  interno y muestra: \"Error   |
|                 |                                                  interno, intente             |
|                 |                                                  nuevamente\".                |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-003, RNF-001                                                               |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-03                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | N/A                                                                           |
+=================+===============================================================================+

## **4.2 HU-01, HU-02 - MODULO PORTAL PÚBLICO**

### **4.2.1 PUB-CU-01 - CONSULTAR INFORMACIÓN PÚBLICA**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | PUB-CU-01                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Consultar información pública                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El interesado navega por el portal web y accede a la información empresarial  |
|                 | sin necesidad de autenticarse.                                                |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Interesado (usuario anónimo)                                                  |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El interesado ingresa a la URL del sistema.                                   |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El sistema debe estar en funcionamiento y accesible.                        |
|                 |                                                                               |
|                 | - La información empresarial debe estar publicada en el sistema.              |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El interesado visualiza la información pública: lineamientos, portafolio,   |
| (éxito)         |   noticias, FAQ, links e información de contacto.                             |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El sistema no está disponible. Se muestra página de error de conectividad.  |
| (fallo)         |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El interesado ingresa a la URL del    El sistema renderiza la      |
|                 |            sistema.                              página principal con menú    |
|                 |                                                  público.                     |
|                 |                                                                               |
|                 |   2        El interesado selecciona una sección  El sistema muestra el        |
|                 |            del menú.                             contenido correspondiente de |
|                 |                                                  la sección seleccionada.     |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El interesado hace clic en un link de El sistema abre el enlace    |
|                 |            interés.                              externo en una nueva pestaña |
|                 |                                                  del navegador.               |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El interesado intenta acceder al      El sistema no responde. Se   |
|                 |            sistema.                              muestra una página de error  |
|                 |                                                  500 con mensaje de           |
|                 |                                                  indisponibilidad.            |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-001, RNF-002                                                               |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-01                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Incluye: PUB-CU-02                                                            |
+=================+===============================================================================+

### **4.2.2 PUB-CU-02 - ENVIAR PREGUNTA AL EQUIPO**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | PUB-CU-02                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Enviar pregunta al equipo                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El interesado envía una pregunta personalizada a través del formulario de     |
|                 | contacto cuando no encuentra su duda en las FAQ.                              |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Interesado (usuario anónimo)                                                  |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El interesado hace clic en \"Enviar pregunta\" desde la sección de preguntas  |
|                 | frecuentes.                                                                   |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El interesado debe haber consultado las preguntas frecuentes.               |
|                 |                                                                               |
|                 | - El sistema debe estar en funcionamiento.                                    |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El mensaje queda registrado en el sistema.                                  |
| (éxito)         |                                                                               |
|                 | - El interesado recibe confirmación visual de envío exitoso.                  |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El mensaje no se registra. El sistema muestra un mensaje de error con       |
| (fallo)         |   indicación de los campos obligatorios incompletos o fallo de conexión.      |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El interesado hace clic en \"Enviar   El sistema muestra el        |
|                 |            pregunta\".                           formulario de contacto con   |
|                 |                                                  campos: nombre, correo,      |
|                 |                                                  pregunta.                    |
|                 |                                                                               |
|                 |   2        El interesado diligencia el           El sistema valida los campos |
|                 |            formulario y hace clic en \"Enviar\". y registra el mensaje en la  |
|                 |                                                  base de datos.               |
|                 |                                                                               |
|                 |   3        N/A                                   El sistema muestra           |
|                 |                                                  confirmación: \"Tu pregunta  |
|                 |                                                  fue enviada exitosamente\".  |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        N/A                                   N/A                          |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        1 El interesado deja campos           El sistema muestra           |
|                 |            obligatorios vacíos.                  validación indicando los     |
|                 |                                                  campos requeridos.           |
|                 |                                                                               |
|                 |   2        2 El interesado ingresa un correo con El sistema muestra:          |
|                 |            formato inválido.                     \"Ingrese un correo          |
|                 |                                                  electrónico válido\".        |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-002                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-02                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Extiende: PUB-CU-01                                                           |
+=================+===============================================================================+

## **4.3 HU-05, HU-06, HU-14 - MÓDULO DE COORDINADOR**

### **4.3.1 COR-CU-01 - REGISTRAR PERFIL DE DESARROLLADOR**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | COR-CU-01                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Registrar perfil de desarrollador                                             |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El coordinador registra la información personal, profesional y de rol de un   |
|                 | nuevo desarrollador en el sistema.                                            |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Coordinador de proyectos                                                      |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El coordinador hace clic en \"Registrar desarrollador\" desde su panel de     |
|                 | gestión.                                                                      |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El coordinador debe estar autenticado en el sistema.                        |
|                 |                                                                               |
|                 | - El desarrollador no debe estar previamente registrado con la misma          |
|                 |   identificación.                                                             |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El perfil del desarrollador queda registrado en la base de datos.           |
| (éxito)         |                                                                               |
|                 | - El sistema muestra confirmación de registro exitoso.                        |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El perfil no se registra. El sistema muestra el error correspondiente:      |
| (fallo)         |   campo faltante, identificación duplicada o fallo del servidor.              |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El coordinador accede a \"Registrar   El sistema muestra el        |
|                 |            desarrollador\".                      formulario de registro con   |
|                 |                                                  todos los campos.            |
|                 |                                                                               |
|                 |   2        El coordinador diligencia los datos y El sistema valida el formato |
|                 |            adjunta foto de perfil.               de los campos y de la        |
|                 |                                                  imagen.                      |
|                 |                                                                               |
|                 |   3        El coordinador hace clic en \"Guardar El sistema almacena el       |
|                 |            perfil\".                             perfil y muestra             |
|                 |                                                  confirmación de registro     |
|                 |                                                  exitoso.                     |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El coordinador asigna un proyecto al  El sistema vincula el        |
|                 |            desarrollador desde el formulario.    proyecto seleccionado al     |
|                 |                                                  perfil antes de guardar.     |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        1 El coordinador omite un campo       El sistema muestra           |
|                 |            obligatorio.                          validación indicando el      |
|                 |                                                  campo faltante.              |
|                 |                                                                               |
|                 |   2        2 El coordinador ingresa una          El sistema muestra: \"Ya     |
|                 |            identificación ya registrada.         existe un desarrollador con  |
|                 |                                                  esa identificación\".        |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-005                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-05                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Extiende: COR-CU-02, COR-CU-03                                                |
+=================+===============================================================================+

### **4.3.2 COR-CU-02 - BUSCAR Y MODIFICAR PERFIL DE DESARROLLADOR**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | COR-CU-02                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Buscar y modificar perfil de desarrollador                                    |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El coordinador busca un desarrollador existente por nombre o identificación y |
|                 | puede modificar sus datos.                                                    |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Coordinador de proyectos                                                      |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El coordinador ingresa un criterio en el buscador de desarrolladores.         |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El coordinador debe estar autenticado.                                      |
|                 |                                                                               |
|                 | - Debe existir al menos un desarrollador registrado en el sistema.            |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El sistema muestra los resultados de búsqueda.                              |
| (éxito)         |                                                                               |
|                 | - Los cambios realizados quedan persistidos en la base de datos.              |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - No se encuentran resultados. El sistema muestra: \"No se encontraron        |
| (fallo)         |   desarrolladores con ese criterio\".                                         |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El coordinador ingresa nombre o       El sistema consulta la BD y  |
|                 |            identificación en el buscador.        muestra la lista de          |
|                 |                                                  coincidencias.               |
|                 |                                                                               |
|                 |   2        El coordinador selecciona un          El sistema muestra el perfil |
|                 |            desarrollador de la lista.            completo del desarrollador   |
|                 |                                                  con opciones de edición.     |
|                 |                                                                               |
|                 |   3        El coordinador modifica los datos y   El sistema actualiza el      |
|                 |            hace clic en \"Guardar cambios\".     perfil y muestra             |
|                 |                                                  confirmación de modificación |
|                 |                                                  exitosa.                     |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        N/A                                   N/A                          |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El coordinador realiza la búsqueda y  El sistema muestra: \"No se  |
|                 |            no hay coincidencias.                 encontraron desarrolladores  |
|                 |                                                  con ese criterio\".          |
|                 |                                                                               |
|                 |   2                                                                           |
|                 |                                                                               |
|                 |   3                                                                           |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-005                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-05                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Incluye: COR-CU-03                                                            |
+=================+===============================================================================+

### **4.3.3 COR-CU-03 - INHABILITAR DESARROLLADOR**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | COR-CU-03                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Inhabilitar desarrollador                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El coordinador inhabilita a un desarrollador que ya no trabaja en la empresa, |
|                 | impidiendo su acceso y asignación.                                            |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Coordinador de proyectos                                                      |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El coordinador hace clic en \"Inhabilitar\" desde el perfil de un             |
|                 | desarrollador.                                                                |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El coordinador debe estar autenticado.                                      |
|                 |                                                                               |
|                 | - El desarrollador debe existir y estar activo en el sistema.                 |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El desarrollador queda marcado como inactivo.                               |
| (éxito)         |                                                                               |
|                 | - No aparece en listas de asignación de proyectos ni puede iniciar sesión.    |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - La inhabilitación no se completa. El sistema muestra un mensaje de error.   |
| (fallo)         |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El coordinador hace clic en           El sistema muestra un cuadro |
|                 |            \"Inhabilitar\" desde el perfil.      de confirmación: \"¿Confirma |
|                 |                                                  inhabilitar a este           |
|                 |                                                  desarrollador?\".            |
|                 |                                                                               |
|                 |   2        El coordinador confirma la acción.    El sistema marca al          |
|                 |                                                  desarrollador como inactivo  |
|                 |                                                  y actualiza su estado en la  |
|                 |                                                  BD.                          |
|                 |                                                                               |
|                 |   3        N/A                                   El sistema muestra           |
|                 |                                                  confirmación y redirige al   |
|                 |                                                  listado de desarrolladores.  |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El coordinador cancela la             El sistema cierra el diálogo |
|                 |            confirmación.                         sin realizar cambios.        |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        N/A                                   El sistema falla al          |
|                 |                                                  actualizar el estado.        |
|                 |                                                  Muestra: \"Error al          |
|                 |                                                  inhabilitar, intente         |
|                 |                                                  nuevamente\".                |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-005                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-05                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Extiende: COR-CU-02                                                           |
+=================+===============================================================================+

### **4.3.4 COR-CU-04 - GENERAR REPORTE DE DESEMPEÑO DEL DESARROLLADOR**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | COR-CU-04                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Generar reporte de desempeño del desarrollador                                |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El coordinador genera un reporte con las actividades, errores e               |
|                 | interrupciones de un desarrollador dentro de su proyecto asignado.            |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Coordinador de proyectos                                                      |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El coordinador hace clic en \"Generar reporte de desempeño\" desde el perfil  |
|                 | de un desarrollador.                                                          |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El coordinador debe estar autenticado.                                      |
|                 |                                                                               |
|                 | - El desarrollador debe tener un proyecto asignado.                           |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El sistema muestra el reporte de desempeño con actividades, errores e       |
| (éxito)         |   interrupciones del desarrollador.                                           |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El sistema no puede generar el reporte. Muestra mensaje de error de         |
| (fallo)         |   servidor.                                                                   |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El coordinador hace clic en \"Generar El sistema consulta las      |
|                 |            reporte de desempeño\".               actividades, errores e       |
|                 |                                                  interrupciones del           |
|                 |                                                  desarrollador en su          |
|                 |                                                  proyecto.                    |
|                 |                                                                               |
|                 |   2        N/A                                   El sistema muestra el        |
|                 |                                                  reporte con la información   |
|                 |                                                  consolidada del período.     |
|                 |                                                                               |
|                 |   3        El coordinador revisa el reporte y    El sistema genera el archivo |
|                 |            puede exportarlo.                     de exportación (PDF o        |
|                 |                                                  archivo plano) para          |
|                 |                                                  descarga.                    |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        1 El desarrollador no tiene           El sistema muestra el        |
|                 |            actividades registradas.              reporte con el mensaje:      |
|                 |                                                  \"Sin actividades            |
|                 |                                                  registradas para este        |
|                 |                                                  desarrollador\".             |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        1 N/A                                 El sistema falla al          |
|                 |                                                  consultar datos. Muestra:    |
|                 |                                                  \"Error al generar reporte,  |
|                 |                                                  intente nuevamente\".        |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-006                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-06                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Extiende: COR-CU-02                                                           |
+=================+===============================================================================+

### **4.3.5 COR-CU-05 - GESTIONAR MENSAJES DE CONTACTO POR INTERESADOS**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | COR-CU-05                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Gestionar mensajes de contacto por interesados                                |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El coordinador observa los mensajes de interesados y al responderlos desde el |
|                 | sistema, este los marcar como atendidos                                       |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Coordinador de proyectos                                                      |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El coordinador hace clic en \"Ver Mensajes" desde su perfil                   |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - Coordinador autenticado                                                     |
|                 |                                                                               |
|                 | - mensajes existentes en BD                                                   |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - Mensaje queda Atendido con respuesta y fecha registradas                    |
| (éxito)         |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - Estado no cambia, sistema muestra error de envío                            |
| (fallo)         |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El coordinador accede a bandeja de    El sistema lista mensajes    |
|                 |            mensajes                              ordenados por fecha,         |
|                 |                                                  agrupados por estado         |
|                 |                                                                               |
|                 |   2        El coordinador selecciona un mensaje  El sistema muestra el        |
|                 |                                                  detalle y cambia estado a    |
|                 |                                                  "Leído"                      |
|                 |                                                                               |
|                 |   3        El coordinador escribe respuesta y    El sistema envía correo al   |
|                 |            hace clic en Enviar                   remitente y cambia estado a  |
|                 |                                                  "Atendido"                   |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        Coordinador filtra bandeja por estado El sistema muestra el la     |
|                 |            (Pendiente/Leído/Atendido)            lista de mensajes según el   |
|                 |                                                  filtro seleccionado          |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        1 N/A                                 El sistema muestra error y   |
|                 |                                                  mantiene estado "Leído"      |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-014                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-14                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | N/A                                                                           |
+=================+===============================================================================+

## **4.4 HU-07, HU-08, HU-09, HU-10 - MÓDULO DE LÍDER**

### **4.4.1 LID-CU-01 - REGISTRAR PROYECTO**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | LID-CU-01                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Registrar proyecto                                                            |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El líder registra un nuevo proyecto en el sistema con su información básica y |
|                 | asigna desarrolladores.                                                       |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Líder de proyectos                                                            |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El líder hace clic en \"Registrar proyecto\" desde su panel.                  |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El líder debe estar autenticado.                                            |
|                 |                                                                               |
|                 | - Deben existir desarrolladores activos registrados para poder asignarlos.    |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El proyecto queda registrado en la base de datos.                           |
| (éxito)         |                                                                               |
|                 | - El sistema permite asignar desarrolladores al proyecto recién creado.       |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El proyecto no se registra. El sistema muestra el error correspondiente.    |
| (fallo)         |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El líder accede a \"Registrar         El sistema muestra el        |
|                 |            proyecto\".                           formulario con campos:       |
|                 |                                                  nombre, descripción, fechas  |
|                 |                                                  de inicio y fin.             |
|                 |                                                                               |
|                 |   2        El líder diligencia el formulario y   El sistema valida los datos  |
|                 |            hace clic en \"Registrar\".           y crea el proyecto en la BD. |
|                 |                                                                               |
|                 |   3        El líder selecciona los               El sistema vincula a los     |
|                 |            desarrolladores a asignar.            desarrolladores              |
|                 |                                                  seleccionados al proyecto y  |
|                 |                                                  confirma el registro.        |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        N/A                                   N/A                          |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El líder omite el nombre del          El sistema muestra           |
|                 |            proyecto.                             validación: \"El nombre del  |
|                 |                                                  proyecto es obligatorio\".   |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-007                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-07                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Incluye: LID-CU-02, LID-CU-03                                                 |
+=================+===============================================================================+

### **4.4.2 LID-CU-02 - BUSCAR Y GESTIONAR PROYECTO**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | LID-CU-02                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Buscar y gestionar proyecto                                                   |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El líder busca proyectos existentes y puede modificarlos, inhabilitarlos o    |
|                 | consultar su estado.                                                          |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Líder de proyectos                                                            |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El líder ingresa un criterio en el buscador de proyectos.                     |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El líder debe estar autenticado.                                            |
|                 |                                                                               |
|                 | - Debe existir al menos un proyecto registrado.                               |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El sistema muestra los proyectos que coinciden con el criterio de búsqueda. |
| (éxito)         |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - No se encuentran proyectos. El sistema muestra: \"No se encontraron         |
| (fallo)         |   proyectos con ese criterio\".                                               |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El líder ingresa un nombre o ID en el El sistema consulta la BD y  |
|                 |            buscador.                             lista los proyectos          |
|                 |                                                  coincidentes.                |
|                 |                                                                               |
|                 |   2        El líder selecciona un proyecto.      El sistema muestra el        |
|                 |                                                  detalle del proyecto con     |
|                 |                                                  opciones: modificar,         |
|                 |                                                  inhabilitar, ver estado.     |
|                 |                                                                               |
|                 |   3        El líder elige una acción.            El sistema ejecuta la acción |
|                 |                                                  seleccionada y confirma el   |
|                 |                                                  resultado.                   |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El líder consulta el estado del       El sistema muestra:          |
|                 |            proyecto.                             porcentaje de avance, etapas |
|                 |                                                  completadas y actividades    |
|                 |                                                  pendientes.                  |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        1 El líder busca un proyecto y no hay El sistema muestra: \"No se  |
|                 |            resultados.                           encontraron proyectos con    |
|                 |                                                  ese criterio\".              |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-007                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-07                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Incluye: LID-CU-03, LID-CU-04                                                 |
+=================+===============================================================================+

### **4.4.3 LID-CU-03 - GESTIONAR ETAPAS DEL PROYECTO**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | LID-CU-03                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Gestionar etapas del proyecto                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El líder registra, modifica y elimina etapas dentro de un proyecto para       |
|                 | estructurar su ciclo de vida.                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Líder de proyectos                                                            |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El líder accede a la sección de etapas desde el detalle de un proyecto.       |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El líder debe estar autenticado.                                            |
|                 |                                                                               |
|                 | - El proyecto debe existir y estar activo.                                    |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - La etapa queda creada, modificada o eliminada según la acción realizada.    |
| (éxito)         |                                                                               |
|                 | - El sistema actualiza la lista de etapas del proyecto.                       |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - La operación no se completa. El sistema muestra el error correspondiente.   |
| (fallo)         |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El líder hace clic en \"Agregar       El sistema muestra el        |
|                 |            etapa\".                              formulario de registro de    |
|                 |                                                  etapa con campos: nombre,    |
|                 |                                                  descripción, fecha.          |
|                 |                                                                               |
|                 |   2        El líder diligencia el formulario y   El sistema crea la etapa     |
|                 |            guarda.                               asociada al proyecto y la    |
|                 |                                                  muestra en la lista.         |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        1 El líder selecciona una etapa       El sistema actualiza los     |
|                 |            existente y la modifica.              datos de la etapa y muestra  |
|                 |                                                  confirmación.                |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El líder procede a eliminar una etapa El sistema muestra           |
|                 |            con actividades asociadas.            advertencia: \"¿Confirmas    |
|                 |                                                  eliminar esta etapa? Tiene   |
|                 |                                                  actividades asociadas\".     |
|                 |                                                  Requiere confirmación        |
|                 |                                                  explícita.                   |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-008                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-08                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Extiende: LID-CU-01                                                           |
+=================+===============================================================================+

### **4.4.4 LID-CU-04 - REGISTRAR Y MODIFICAR ACTIVIDADES DEL PROYECTO**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | LID-CU-04                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Registrar y modificar actividades del proyecto                                |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El líder registra actividades asignadas a desarrolladores y las modifica      |
|                 | cuando sea necesario.                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Líder de proyectos                                                            |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El líder accede a la sección de actividades desde el detalle de un proyecto.  |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El líder debe estar autenticado.                                            |
|                 |                                                                               |
|                 | - El proyecto debe tener al menos un desarrollador asignado.                  |
|                 |                                                                               |
|                 | - El proyecto debe tener al menos una etapa registrada.                       |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - La actividad queda registrada con estado \"Pendiente\" y asociada al        |
| (éxito)         |   desarrollador, etapa y proyecto.                                            |
|                 |                                                                               |
|                 | - El sistema muestra confirmación de la operación.                            |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - La actividad no se registra. El sistema muestra el error correspondiente.   |
| (fallo)         |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El líder hace clic en \"Registrar     El sistema muestra el        |
|                 |            actividad\".                          formulario con campos:       |
|                 |                                                  nombre, descripción,         |
|                 |                                                  desarrollador asignado,      |
|                 |                                                  etapa, fechas.               |
|                 |                                                                               |
|                 |   2        El líder diligencia el formulario y   El sistema crea la actividad |
|                 |            guarda.                               con estado \"Pendiente\" y   |
|                 |                                                  la asocia al proyecto.       |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El líder busca una actividad          El sistema actualiza los     |
|                 |            existente y la modifica.              datos de la actividad y      |
|                 |                                                  muestra confirmación.        |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El líder omite el desarrollador       El sistema muestra: \"Debe   |
|                 |            asignado.                             asignar un desarrollador a   |
|                 |                                                  la actividad\".              |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-009                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-09                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Extiende: LID-CU-01, LID-CU-03                                                |
+=================+===============================================================================+

### **4.4.5 LID-CU-05 - GENERAR REPORTES DEL PROYECTO**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | LID-CU-05                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Generar reportes del proyecto                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El líder genera reportes de interrupciones, actividades por proyecto y el     |
|                 | archivo plano para la empresa aliada brasileña.                               |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Líder de proyectos                                                            |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El líder hace clic en la opción de reportes desde el detalle del proyecto.    |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El líder debe estar autenticado.                                            |
|                 |                                                                               |
|                 | - El proyecto debe tener datos registrados (actividades o interrupciones).    |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El sistema muestra el reporte solicitado en pantalla.                       |
| (éxito)         |                                                                               |
|                 | - El archivo plano se descarga correctamente cuando se solicita.              |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El reporte no puede generarse. El sistema muestra un mensaje de error.      |
| (fallo)         |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El líder selecciona el tipo de        El sistema consulta los      |
|                 |            reporte a generar.                    datos del proyecto según el  |
|                 |                                                  tipo de reporte.             |
|                 |                                                                               |
|                 |   2        N/A                                   El sistema muestra el        |
|                 |                                                  reporte en pantalla con la   |
|                 |                                                  información consolidada.     |
|                 |                                                                               |
|                 |   3        El líder solicita exportar el archivo El sistema genera y descarga |
|                 |            plano para la empresa brasileña.      el archivo .txt o .csv con   |
|                 |                                                  el formato acordado.         |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El proyecto no tiene interrupciones   El sistema muestra el        |
|                 |            registradas.                          reporte de interrupciones    |
|                 |                                                  vacío con mensaje: \"Sin     |
|                 |                                                  interrupciones               |
|                 |                                                  registradas\".               |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        N/A                                   El sistema falla al generar  |
|                 |                                                  el archivo plano. Muestra:   |
|                 |                                                  \"Error al exportar, intente |
|                 |                                                  nuevamente\".                |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-010, RE-001                                                                |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-10                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Extiende: LID-CU-02                                                           |
+=================+===============================================================================+

## **4.5 HU-11, HU-12, HU-13 - MÓDULO DE DESARROLLADOR**

### **4.5.1 DEV-CU-01 - EJECUTAR ACTIVIDAD DEL PROYECTO**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | DEV-CU-01                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Ejecutar actividad del proyecto                                               |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El desarrollador consulta sus actividades asignadas y marca como ejecutada la |
|                 | que completó.                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Desarrollador                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El desarrollador accede a la sección \"Mis actividades\" desde su panel.      |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El desarrollador debe estar autenticado.                                    |
|                 |                                                                               |
|                 | - El líder debe haber registrado previamente actividades asignadas al         |
|                 |   desarrollador.                                                              |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - La actividad queda con estado \"Ejecutada\" y se registra la fecha de       |
| (éxito)         |   ejecución en la BD.                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - La actualización no se completa. El sistema muestra un mensaje de error.    |
| (fallo)         |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El desarrollador accede a \"Mis       El sistema lista las         |
|                 |            actividades\".                        actividades asignadas al     |
|                 |                                                  desarrollador con su estado  |
|                 |                                                  actual.                      |
|                 |                                                                               |
|                 |   2        El desarrollador selecciona una       El sistema solicita          |
|                 |            actividad pendiente y hace clic en    confirmación de la acción.   |
|                 |            \"Marcar como ejecutada\".                                         |
|                 |                                                                               |
|                 |   3        El desarrollador confirma.            El sistema actualiza el      |
|                 |                                                  estado a \"Ejecutada\" y     |
|                 |                                                  registra fecha y hora de     |
|                 |                                                  ejecución.                   |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        N/A                                   N/A                          |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El desarrollador intenta acceder a    El sistema deniega el acceso |
|                 |            una actividad no asignada.            y muestra: \"No está         |
|                 |                                                  autorizado para ver esta     |
|                 |                                                  actividad\".                 |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-011                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-11                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Incluye: DEV-CU-02, DEV-CU-03                                                 |
+=================+===============================================================================+

### **4.5.2 DEV-CU-02 - REGISTRAR ERROR DEL PROYECTO**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | DEV-CU-02                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Registrar error del proyecto                                                  |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El desarrollador registra un error detectado durante el desarrollo,           |
|                 | especificando su tipo y la fase del proyecto.                                 |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Desarrollador                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El desarrollador hace clic en \"Registrar error\" desde su panel.             |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El desarrollador debe estar autenticado.                                    |
|                 |                                                                               |
|                 | - Debe existir al menos una fase (etapa) registrada en el proyecto asignado.  |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El error queda registrado en la BD con fecha automática, asociado al        |
| (éxito)         |   desarrollador, etapa y proyecto.                                            |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - El error no se registra. El sistema muestra el error de validación o de     |
| (fallo)         |   servidor correspondiente.                                                   |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El desarrollador hace clic en         El sistema muestra el        |
|                 |            \"Registrar error\".                  formulario con campos: tipo  |
|                 |                                                  de error, descripción y fase |
|                 |                                                  del proyecto.                |
|                 |                                                                               |
|                 |   2        El desarrollador diligencia el        El sistema valida los campos |
|                 |            formulario y hace clic en             y registra el error con      |
|                 |            \"Guardar\".                          fecha automática.            |
|                 |                                                                               |
|                 |   3        N/A                                   El sistema muestra           |
|                 |                                                  confirmación de registro     |
|                 |                                                  exitoso.                     |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        N/A                                   N/A                          |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El desarrollador omite la fase del    El sistema muestra           |
|                 |            proyecto.                             validación: \"La fase del    |
|                 |                                                  proyecto es obligatoria\".   |
|                 |                                                                               |
|                 |   2        El desarrollador omite el tipo de     El sistema muestra           |
|                 |            error.                                validación: \"El tipo de     |
|                 |                                                  error es obligatorio\".      |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-012                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-12                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Extiende: DEV-CU-01                                                           |
+=================+===============================================================================+

### **4.5.3 DEV-CU-03 - REGISTRAR INTERRUPCIÓN DEL PROYECTO**

+-----------------+-------------------------------------------------------------------------------+
| **Campo**       | **Contenido**                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Identificador   | DEV-CU-03                                                                     |
+-----------------+-------------------------------------------------------------------------------+
| Nombre          | Registrar interrupción del proyecto                                           |
+-----------------+-------------------------------------------------------------------------------+
| Descripción     | El desarrollador registra una interrupción que afecta el desarrollo, con      |
|                 | tipo, fecha, duración y fase.                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Actores         | Desarrollador                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Desencadenante  | El desarrollador hace clic en \"Registrar interrupción\" desde su panel.      |
+-----------------+-------------------------------------------------------------------------------+
| Precondiciones  | - El desarrollador debe estar autenticado.                                    |
|                 |                                                                               |
|                 | - Debe existir al menos una fase (etapa) registrada en el proyecto asignado.  |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - La interrupción queda registrada en la BD asociada al desarrollador, etapa  |
| (éxito)         |   y proyecto.                                                                 |
+-----------------+-------------------------------------------------------------------------------+
| Postcondiciones | - La interrupción no se registra. El sistema muestra el error                 |
| (fallo)         |   correspondiente.                                                            |
+-----------------+-------------------------------------------------------------------------------+
| Flujo principal |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El desarrollador hace clic en         El sistema muestra el        |
|                 |            \"Registrar interrupción\".           formulario con campos: tipo, |
|                 |                                                  fecha, duración y fase del   |
|                 |                                                  proyecto.                    |
|                 |                                                                               |
|                 |   2        El desarrollador diligencia el        El sistema valida los campos |
|                 |            formulario y hace clic en             y registra la interrupción.  |
|                 |            \"Guardar\".                                                       |
|                 |                                                                               |
|                 |   3        N/A                                   El sistema muestra           |
|                 |                                                  confirmación de registro     |
|                 |                                                  exitoso.                     |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos alternos |   --------------------------------------------------------------------------- |
|                 |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        N/A                                   N/A                          |
|                 |                                                                               |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Flujos de       |   --------------------------------------------------------------------------- |
| excepción       |   **\#**   **Actor (Usuario)**                   **Acción (Sistema)**         |
|                 |   -------- ------------------------------------- ---------------------------- |
|                 |   1        El desarrollador omite el campo de    El sistema muestra           |
|                 |            duración.                             validación: \"La duración de |
|                 |                                                  la interrupción es           |
|                 |                                                  obligatoria\".               |
|                 |                                                                               |
|                 |   2        El desarrollador omite la fase del    El sistema muestra           |
|                 |            proyecto.                             validación: \"La fase del    |
|                 |                                                  proyecto es obligatoria\".   |
|                 |   --------------------------------------------------------------------------- |
+-----------------+-------------------------------------------------------------------------------+
| Requerimientos  | RF-013                                                                        |
| Asociados       |                                                                               |
+-----------------+-------------------------------------------------------------------------------+
| HU Asociada     | HU-13                                                                         |
+-----------------+-------------------------------------------------------------------------------+
| Relaciones      | Extiende: DEV-CU-01                                                           |
+=================+===============================================================================+

# DIAGRAMAS DE CASOS DE USO

Se presentan los diagramas de casos organizados por módulos. Cada
diagrama representa visualmente los procesos y funcionalidades clave
desde la perspectiva de los actores. Los diagramas están numerados y
referenciados mediante un ID único para facilitar su trazabilidad.

## **5.1 ÍNDICE DIAGRAMAS DE CASOS DE USO** 

  ---------------------------------------------------------------------------------------------------------------------
  **N.º**   **Módulo**      **Código del         **Imagen Diagrama**                         **Archivo Referenciado**
                            Diagrama**                                                       
  --------- --------------- -------------------- ------------------------------------------- --------------------------
  1         HU-03 -         SEG-CU-01-DIAGRAMA   /Diagramas/CLI-AN-CU-VENTA-0151-Gestionar   /DiagramasUML/CU-INICIAR
            AUTENTICACIÓN                        Solicitudes de Ingreso.png                  SESIÓN/NOMBRE DE
            DE TRABAJADORES                                                                  PLATAFORMA

  2         HU-01, HU-02 -  PUB-CU-01-DIAGRAMA                                               
            MODULO PORTAL                                                                    
            PÚBLICO                                                                          

  3         HU-01, HU-02 -  PUB-CU-02-DIAGRAMA                                               
            MODULO PORTAL                                                                    
            PÚBLICO                                                                          

  4         HU-05, HU-06 -  COR-CU-01-DIAGRAMA                                               
            MÓDULO DE                                                                        
            COORDINADOR                                                                      

  5         HU-05, HU-06 -  COR-CU-02-DIAGRAMA                                               
            MÓDULO DE                                                                        
            COORDINADOR                                                                      

  6         HU-05, HU-06 -  COR-CU-03-DIAGRAMA                                               
            MÓDULO DE                                                                        
            COORDINADOR                                                                      

  7         HU-05, HU-06 -  COR-CU-04-DIAGRAMA                                               
            MÓDULO DE                                                                        
            COORDINADOR                                                                      

  8         HU-07, HU-08,   LID-CU-01-DIAGRAMA                                               
            HU-09, HU-10 -                                                                   
            MÓDULO DE LÍDER                                                                  

  9         HU-07, HU-08,   LID-CU-02-DIAGRAMA                                               
            HU-09, HU-10 -                                                                   
            MÓDULO DE LÍDER                                                                  

  10        HU-07, HU-08,   LID-CU-03-DIAGRAMA                                               
            HU-09, HU-10 -                                                                   
            MÓDULO DE LÍDER                                                                  

  11        HU-07, HU-08,   LID-CU-04-DIAGRAMA                                               
            HU-09, HU-10 -                                                                   
            MÓDULO DE LÍDER                                                                  

  12        HU-07, HU-08,   LID-CU-05-DIAGRAMA                                               
            HU-09, HU-10 -                                                                   
            MÓDULO DE LÍDER                                                                  

  13        HU-11, HU-12,   DEV-CU-01-DIAGRAMA                                               
            HU-13 - MÓDULO                                                                   
            DE                                                                               
            DESARROLLADOR                                                                    

  14        HU-11, HU-12,   DEV-CU-02-DIAGRAMA                                               
            HU-13 - MÓDULO                                                                   
            DE                                                                               
            DESARROLLADOR                                                                    

  15        HU-11, HU-12,   DEV-CU-03-DIAGRAMA                                               
            HU-13 - MÓDULO                                                                   
            DE                                                                               
            DESARROLLADOR                                                                    
  ---------------------------------------------------------------------------------------------------------------------
