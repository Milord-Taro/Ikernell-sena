# IKernell v2 — Anti-Patrones

> Documento que identifica prácticas que deberán evitarse durante el desarrollo y evolución de IKernell.

---

# 1. Objetivo

El propósito de este documento consiste en identificar prácticas de desarrollo que incrementan la deuda técnica, dificultan el mantenimiento del sistema o contradicen la arquitectura definida para IKernell.

Todo desarrollador deberá conocer estos anti-patrones antes de implementar nuevas funcionalidades.

---

# 2. Principios

Los anti-patrones aquí descritos representan situaciones conocidas que generan problemas de mantenibilidad, escalabilidad o consistencia.

Cuando alguno de ellos aparezca durante el desarrollo, deberá corregirse antes de considerar la funcionalidad como finalizada.

---

# 3. Backend

## Controladores con lógica de negocio

❌ Incorrecto

Los Controllers no deberán contener reglas del negocio.

Toda decisión funcional pertenece al Service.

---

## Consultas complejas dentro del Controller

Los Controllers no deberán acceder directamente al Repository.

---

## Exponer entidades directamente

Las respuestas de la API deberán utilizar DTO.

---

## Duplicar validaciones

Las reglas de negocio deberán existir en un único lugar.

---

## Servicios excesivamente grandes

Si un Service comienza a concentrar múltiples responsabilidades deberá dividirse.

---

## Manejo inconsistente de excepciones

No utilizar RuntimeException genéricas cuando exista una excepción específica.

---

# 4. Frontend

## Componentes duplicados

Antes de crear un componente nuevo deberá verificarse si existe uno reutilizable.

---

## Componentes demasiado grandes

Los componentes deberán dividirse cuando acumulen múltiples responsabilidades.

---

## Hardcodear estilos

No utilizar colores, tamaños o espaciados directamente en los componentes.

Todo deberá provenir del Design System.

---

## CSS inconsistente

No crear estilos aislados para resolver problemas específicos cuando puedan resolverse mediante componentes compartidos.

---

## Lógica de negocio en Pages

Las páginas deberán ensamblar componentes.

La lógica deberá pertenecer a Features, Hooks o Services.

---

## Servicios manipulando interfaz

Los Services no deberán conocer componentes de React.

---

# 5. Base de Datos

## Información duplicada

No almacenar información derivable mediante relaciones.

---

## Relaciones sin integridad

Toda relación deberá implementarse mediante claves foráneas.

---

## Catálogos hardcodeados

Roles, profesiones, especialidades y tipos deberán administrarse mediante tablas.

---

## Campos sin propósito

Todo atributo deberá responder a una necesidad del dominio.

---

## Relaciones innecesarias

No crear relaciones únicamente porque sean técnicamente posibles.

---

# 6. API REST

## Endpoints inconsistentes

Todos los recursos deberán seguir convenciones REST.

---

## Respuestas diferentes para problemas equivalentes

La API deberá responder de forma uniforme.

---

## Códigos HTTP incorrectos

Cada operación deberá utilizar el código HTTP correspondiente.

---

# 7. Diseño

## Múltiples estilos para el mismo componente

Un mismo componente deberá mantener una única identidad visual.

---

## Componentes fuera del Design System

Todo componente nuevo deberá respetar el sistema de diseño.

---

## Inconsistencia visual

No introducir nuevos estilos sin una justificación documentada.

---

# 8. Documentación

## Código sin documentación

Toda modificación importante deberá reflejarse en los documentos correspondientes.

---

## Documentación desactualizada

No se considerará terminada una funcionalidad cuya documentación no haya sido actualizada.

---

## Cambios sin trazabilidad

Toda decisión importante deberá poder justificarse.

---

# 9. Gestión

## Implementar sin analizar

No desarrollar funcionalidades sin comprender previamente el dominio.

---

## Corregir sin documentar

Toda corrección significativa deberá registrarse.

---

## Ignorar observaciones

Las observaciones deberán analizarse antes de descartarse.

---

# 10. Filosofía

El objetivo del proyecto no consiste únicamente en que el software funcione.

El objetivo consiste en construir un sistema mantenible, coherente y preparado para evolucionar.

Los anti-patrones representan situaciones que alejan al proyecto de ese objetivo.

---

**Versión:** 2.0

**Estado:** En elaboración
