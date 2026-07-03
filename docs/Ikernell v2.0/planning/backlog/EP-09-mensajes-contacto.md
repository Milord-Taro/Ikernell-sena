# EP-09 — Mensajes de Contacto

---

## Objetivo

Administrar los mensajes enviados por los usuarios desde el formulario de contacto y facilitar su seguimiento por parte del Coordinador.

---

## Alcance

Incluye:

- Registrar mensajes.
- Consultar mensajes.
- Responder mensajes.
- Cambiar estado.
- Asignar responsable.

---

## Actores

- Visitante.
- Coordinador.

---

## Features

- Enviar mensaje.
- Consultar mensajes.
- Ver detalle.
- Responder.
- Marcar como atendido.
- Buscar mensajes.
- Filtrar mensajes.

---

## Entidades

- MensajeContacto.
- Usuario.

---

## Reglas del negocio

- Todo mensaje deberá conservar su historial.
- Cada mensaje podrá tener un responsable.
- Solo el Coordinador podrá responder.

---

## Dependencias

EP-02 Gestión de Usuarios.

---

## Implementación Actual

CRUD implementado.

---

## Mejoras del Overhaul

- Mejor bandeja de entrada.
- Estados más claros.
- Indicadores.
- Auditoría.
- Mejor experiencia de respuesta.

---

## Prioridad

P2

---

## Estado

Pendiente.
