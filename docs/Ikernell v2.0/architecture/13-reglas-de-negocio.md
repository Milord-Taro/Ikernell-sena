# Reglas de Negocio

Este documento centraliza las reglas de negocio transversales del sistema IKernell.

Las historias de usuario podrán hacer referencia a estas reglas cuando corresponda.

---

# Gestión de Usuarios

RN-US-001

Un usuario podrá encontrarse Activo o Inactivo.

RN-US-002

Un usuario inactivo no podrá autenticarse.

RN-US-003

Un usuario podrá participar en múltiples proyectos.

RN-US-004

Todo usuario podrá existir en el sistema sin estar asignado a un proyecto.

La asignación a proyectos será una operación independiente de la creación del usuario.

RN-US-005

Todos los usuarios autenticados podrán consultar el perfil de otros usuarios del sistema.

La información visible estará limitada a los datos profesionales definidos por la organización.

RN-US-006

No podrá inhabilitarse un usuario que tenga actividades en estado Pendiente o En desarrollo.

RN-US-007

Los usuarios conservarán su historial de participación en proyectos aun cuando sean inhabilitados.

RN-US-008

Los usuarios únicamente podrán consultar la información correspondiente a los permisos definidos para su rol dentro del sistema.

---

# Gestión de Proyectos

RN-PY-001

Un proyecto podrá tener uno o varios integrantes.

RN-PY-002

Cada integrante desempeñará un rol dentro del proyecto.

RN-PY-003

El rol desempeñado será independiente para cada proyecto al que pertenezca el usuario.

RN-PY-004

Solo los integrantes del proyecto podrán recibir actividades pertenecientes a dicho proyecto.

RN-PY-005

No podrán asignarse usuarios inactivos a un proyecto.

RN-PY-006

La inhabilitación de un proyecto no eliminará su información histórica ni las relaciones existentes con etapas, actividades y equipo de trabajo.

RN-PY-007

No podrán registrarse proyectos con fechas inconsistentes.

RN-PY-008

La fecha de finalización de un proyecto no podrá ser anterior a su fecha de inicio.

---

# Gestión de Etapas

RN-ET-001

Una etapa deberá pertenecer a un único proyecto.

RN-ET-002

No podrá eliminarse una etapa que tenga actividades asociadas.

RN-ET-003

Las etapas de un proyecto deberán mantener un orden lógico.

---

# Gestión de Actividades

RN-AC-001

Toda actividad deberá pertenecer a una etapa.

RN-AC-002

Toda actividad deberá pertenecer a un proyecto.

RN-AC-003

Una actividad únicamente podrá asignarse a un integrante del proyecto.

RN-AC-004

Una actividad podrá permanecer sin desarrollador asignado.

RN-AC-005

Cuando una actividad no tenga responsable asignado, su estado será "Pendiente de asignación".

RN-AC-006

Las fechas de una actividad deberán ser consistentes.

La fecha de finalización no podrá ser anterior a la fecha de inicio.

RN-AC-007

Solo el desarrollador responsable de una actividad podrá actualizar su estado.

RN-AC-008

Una actividad ejecutada no podrá volver a un estado anterior.

RN-AC-009

Las actividades únicamente podrán cambiar siguiendo el flujo de estados definido por la organización.

RN-AC-010

Una actividad deberá registrar automáticamente la fecha y hora de cada cambio de estado.

RN-AC-011

Una actividad no podrá asignarse a un desarrollador inactivo.

RN-AC-012

Una actividad podrá contar con colaboradores adicionales, sin modificar el desarrollador responsable ni las reglas de autorización para el cambio de estado.

---

#Gestión de Estados

RN-ES-001

Cada entidad administrable del sistema deberá definir explícitamente los estados permitidos para su ciclo de vida.

RN-ES-002

Las transiciones entre estados únicamente podrán realizarse cuando cumplan las reglas de negocio definidas para cada entidad.

RN-ES-003

Los cambios de estado deberán registrarse automáticamente para garantizar la trazabilidad de las operaciones.

Esto nos cubre prácticamente toda la observación de Copilot.

RN-ES-004

Las entidades inhabilitadas no podrán participar en nuevas operaciones de negocio, pero conservarán su información histórica para garantizar la trazabilidad del sistema.

---
#Gestión del Equipo del Proyecto

RN-EQ-001

Un desarrollador podrá pertenecer simultáneamente a varios equipos de proyecto.

RN-EQ-002

Cada integrante del equipo deberá mantener un estado activo para recibir nuevas asignaciones.

RN-EQ-003

La desvinculación de un integrante del equipo no eliminará el historial de sus actividades ejecutadas.

RN-EQ-004

No podrá retirarse un integrante del equipo mientras tenga actividades pendientes o en desarrollo.

RN-EQ-005

Un integrante podrá abandonar un proyecto únicamente cuando no tenga actividades pendientes o en desarrollo asociadas a dicho proyecto.

---

#Gestión de Reportes

RN-RP-001

Los reportes únicamente podrán generarse sobre información existente y disponible del proyecto.

RN-RP-002

La información exportada deberá respetar el formato definido para la empresa aliada.

RN-RP-003

Los reportes únicamente mostrarán información autorizada según el rol del usuario.

RN-RP-004

Cuando no exista información para generar un reporte, el sistema deberá informar dicha condición sin generar errores.

RN-RP-005

Los reportes deberán presentar información consistente con el estado actual de los datos registrados en el sistema al momento de su generación.

---

#Gestión de Errores

RN-ER-001

Todo registro de error deberá estar asociado a una actividad.

RN-ER-002

El tipo de error deberá pertenecer al catálogo de tipos de error activos.

---

#Gestión de Interrupciones

RN-INT-001

Toda interrupción registrada deberá estar asociada obligatoriamente a una actividad asignada al desarrollador que la registra.

RN-INT-002

El tipo de interrupción deberá pertenecer al catálogo de tipos de interrupción activos.

RN-INT-003

La duración registrada para una interrupción deberá ser mayor que cero.

---

#Gestión de Mensajes

RN-MEN-001

Un mensaje de contacto solo podrá cambiar al estado "Atendido" cuando la respuesta haya sido enviada correctamente y el sistema haya registrado el responsable y la fecha de atención.

RN-MEN-002

Los mensajes de contacto seguirán el flujo de estados Pendiente → Leído → Atendido.

RN-MEN-003

Un mensaje atendido no podrá regresar a un estado anterior.

---

#Gestión de Permisos

RN-PR-001

Cada operación del sistema estará restringida según el rol del trabajador autenticado.

RN-PR-002

Los usuarios únicamente podrán ejecutar operaciones para las cuales tengan autorización.

RN-PR-003

Los permisos deberán validarse tanto en la interfaz de usuario como en los servicios del sistema.

---

#Gestión de Trazabilidad

RN-TR-001

Todas las operaciones de creación, actualización e inhabilitación lógica realizadas sobre las entidades auditables deberán registrarse automáticamente.

RN-TR-002

La trazabilidad deberá conservar como mínimo el usuario responsable, la fecha, la hora, la operación realizada y la entidad afectada.

RN-TR-003

Los registros de trazabilidad no podrán modificarse ni eliminarse mediante operaciones del sistema.

RN-TR-004

La consulta de la trazabilidad estará restringida a los usuarios autorizados según su rol.


Las actividades deberán planificarse de forma que exista un único desarrollador responsable de su ejecución. Cuando una tarea requiera la participación de varios desarrolladores, deberá dividirse en actividades independientes.
